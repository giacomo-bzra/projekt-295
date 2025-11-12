import { z } from "zod";

export const CounterLog = z.object({
  value: z.number(),
  createdAt: z.date(),
});

export type CounterLogType = z.infer<typeof CounterLog>;
