import { z } from 'zod';

const cronRegex = /^([*]|[0-5]?\d|\*\/\d+)\s+([*]|1?\d|2[0-3]|\*\/\d+)\s+([*]|[1-9]|[12]\d|3[01]|\*\/\d+)\s+([*]|[1-9]|1[0-2]|\*\/\d+)\s+([*]|[0-6]|\*\/\d+)$/;

export const createScheduleSchema = z.object({
  guildId: z.string().min(1),
  name: z.string().min(3).max(80),
  cron: z.string().regex(cronRegex),
  channelId: z.string().min(5).max(32),
  actionType: z.string().min(3).max(32),
  payloadAr: z.string().min(1).max(1000),
  payloadEn: z.string().min(1).max(1000),
  timezone: z.string().min(1).max(64)
});

export const updateScheduleSchema = createScheduleSchema.partial().extend({
  guildId: z.string().min(1),
  id: z.string().min(1)
});

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
export type UpdateScheduleInput = z.infer<typeof updateScheduleSchema>;
