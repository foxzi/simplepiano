import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { LESSONS } = await server.ssrLoadModule('/src/constants/lessons/index.js');
  const practices = LESSONS.flatMap(lesson => lesson.practices);
  assert.equal(LESSONS.length, 32);
  assert.equal(practices.length, 86);
  for (const lesson of LESSONS) {
    assert.equal(new Set(lesson.practices.map(p => p.id)).size, lesson.practices.length);
  }
  for (const practice of practices) {
    for (const midi of practice.notes || practice.chords?.flat() || []) {
      assert.ok(Number.isInteger(midi) && midi >= 48 && midi <= 84, practice.id);
    }
    if (practice.type === 'rhythm' && practice.beats) {
      assert.equal(practice.beats.length, practice.notes.length, practice.id);
      practice.beats.forEach((beat, i) => {
        assert.ok(Number.isInteger(beat), `${practice.id}: integer click positions required`);
        if (i) assert.ok(beat > practice.beats[i - 1], practice.id);
      });
    }
  }
  const eighths = practices.find(p => p.id === 'eighth-run');
  assert.deepEqual(eighths.beats, [0, 1, 2, 3, 4, 5, 6, 7]);
  assert.ok(eighths.staff.items.every(item => item.beats === 0.5));
  assert.deepEqual(eighths.requireBpm, { min: 100, max: 120 });
  assert.deepEqual(practices.find(p => p.id === 'chromatic').notes, [60, 61, 62, 63, 64, 65, 66]);
  const crescendo = LESSONS.flatMap(l => l.blocks).flatMap(b => b.variants || []).find(v => v.label === 'Крещендо');
  assert.equal(crescendo.gains.length, crescendo.notes.length);
  crescendo.gains.forEach((gain, i) => {
    assert.ok(gain > 0 && gain <= 1);
    if (i) assert.ok(gain > crescendo.gains[i - 1]);
  });
  console.log(`Passed: ${LESSONS.length} lessons, ${practices.length} practices; rhythm, chromatic and crescendo regressions.`);
} finally {
  await server.close();
}
