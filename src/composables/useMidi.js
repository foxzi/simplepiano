// Web MIDI — подключение устройства, список входов, обработка note on/off.
// note on с velocity 0 трактуется как note off, согласно спецификации MIDI.

import { reactive, onUnmounted } from "vue";
import { t } from "../i18n";

export function useMidi({ onNoteOn, onNoteOff } = {}) {
  const state = reactive({
    supported: true,
    status: t("midi.notConnected"),
    inputs: [], // [{ id, label }]
    selectedInputId: "",
    connected: false,
    busy: false,
  });

  let midiAccess = null;
  let currentInput = null;

  function featureCheck() {
    if (!("requestMIDIAccess" in navigator)) {
      state.supported = false;
      state.status = t("midi.unsupported");
      return false;
    }
    if (!window.isSecureContext) {
      state.supported = false;
      state.status = t("midi.insecure");
      return false;
    }
    return true;
  }

  function connect() {
    if (!featureCheck()) return;
    state.busy = true;
    state.status = t("midi.connecting");

    navigator.requestMIDIAccess({ sysex: false }).then(
      (access) => {
        midiAccess = access;
        midiAccess.onstatechange = onStateChange;
        state.busy = false;
        rebuildInputs();
      },
      (err) => {
        state.busy = false;
        state.status = t("midi.accessError", {
          message: err && err.message ? err.message : t("midi.requestDenied"),
        });
      }
    );
  }

  function rebuildInputs() {
    if (!midiAccess) return;
    const previousId = currentInput ? currentInput.id : null;
    const inputs = Array.from(midiAccess.inputs.values());
    state.inputs = inputs.map((input) => ({ id: input.id, label: input.name || input.id }));

    if (inputs.length === 0) {
      detachCurrent();
      state.status = t("midi.noDevices");
      return;
    }

    const toSelect = inputs.find((input) => input.id === previousId) || inputs[0];
    state.selectedInputId = toSelect.id;
    attachInput(toSelect);
  }

  function attachInput(input) {
    detachCurrent();
    currentInput = input;
    currentInput.onmidimessage = onMessage;
    state.connected = true;
    state.status = t("midi.connected", { name: input.name || input.id });
  }

  function detachCurrent() {
    if (currentInput) {
      currentInput.onmidimessage = null;
      currentInput = null;
    }
    state.connected = false;
  }

  function selectInput(id) {
    if (!midiAccess) return;
    const input = midiAccess.inputs.get(id);
    if (input) attachInput(input);
  }

  function onStateChange(event) {
    const port = event.port;
    if (port && port.type === "input") {
      if (port.state === "disconnected" && currentInput && port.id === currentInput.id) {
        state.status = t("midi.disconnected", { name: port.name || port.id });
        detachCurrent();
      }
      rebuildInputs();
    }
  }

  function onMessage(event) {
    const data = event.data;
    if (!data || data.length < 2) return;

    const status = data[0];
    const command = status & 0xf0;
    // канал = status & 0x0f — принимаем сообщения на любом канале
    const note = data[1];
    const velocity = data.length > 2 ? data[2] : 0;

    if (command === 0x90 && velocity > 0) {
      onNoteOn && onNoteOn(note, velocity);
    } else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
      onNoteOff && onNoteOff(note);
    }
  }

  onUnmounted(() => {
    detachCurrent();
    if (midiAccess) {
      midiAccess.onstatechange = null;
      midiAccess = null;
    }
  });

  return { state, featureCheck, connect, selectInput };
}
