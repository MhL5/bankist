import { z } from "zod";

const discordPayloadSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  color: z.number().optional(),
  description: z.string().optional(),
  fieldsArr: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
        inline: z.boolean().optional(),
      })
    )
    .optional(),
});

export type DiscordPayloadSchema = z.infer<typeof discordPayloadSchema>;
export default discordPayloadSchema;
