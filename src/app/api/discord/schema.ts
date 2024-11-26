import { serverEnv } from "@/utils/env/serverEnv";
import { z } from "zod";

const allowedChannels = serverEnv.DISCORD_ALLOWED_CHANNELS.split(", ");

const discordPayloadSchema = z.object({
  // @ts-expect-error this is an enum but since it comes from .env we can not type it correctly
  channelId: z.enum(allowedChannels),
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
