// Английские тексты уроков: один словарь на все модули, ключ — id урока.

import { BASICS_EN } from "./basics";
import { READING_EN } from "./reading";
import { SCALES_EN } from "./scales";
import { HARMONY_EN } from "./harmony";
import { HANDS_EN } from "./hands";
import { MASTERY_EN } from "./mastery";

export const EN_LESSONS = {
  ...BASICS_EN,
  ...READING_EN,
  ...SCALES_EN,
  ...HARMONY_EN,
  ...HANDS_EN,
  ...MASTERY_EN,
};
