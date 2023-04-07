import { z } from "zod";

export const slugSchema = z.object({
  current: z.string(),
});
