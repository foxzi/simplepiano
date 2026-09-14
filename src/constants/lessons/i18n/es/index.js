// Испанские тексты уроков: один словарь на все модули, ключ — id урока.

import { BASICS_ES } from "./basics";
import { READING_ES } from "./reading";
import { SCALES_ES } from "./scales";
import { HARMONY_ES } from "./harmony";
import { HANDS_ES } from "./hands";
import { MASTERY_ES } from "./mastery";

export const ES_LESSONS = {
  ...BASICS_ES,
  ...READING_ES,
  ...SCALES_ES,
  ...HARMONY_ES,
  ...HANDS_ES,
  ...MASTERY_ES,
};
