import { z } from 'zod';

const preprocessDate = (arg: unknown) => {
  if (typeof arg === 'string' && arg === '') {
    return null;
  }
  if (typeof arg === 'string') {
    return new Date(arg);
  }
  return arg;
};

export const apiDate = z.preprocess(preprocessDate, z.date());
export const nullableApiDate = z.preprocess(preprocessDate, z.date().nullable());

export type ZodDate = typeof apiDate;
export type NullableZodDate = typeof nullableApiDate;
