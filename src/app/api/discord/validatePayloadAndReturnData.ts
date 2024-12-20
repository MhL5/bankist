import { type APIEmbed } from "discord-api-types/v10";
import {
  discordEventsColorVariants,
  type DiscordEventsColorVariants,
} from "./constants";
import discordPayloadSchema, { type DiscordPayloadSchema } from "./schema";
import { sendValidationErrorNotification } from "./sendValidationErrorNotification";
import { serverEnv } from "@/utils/env/serverEnv";

type ValidatePayloadAndReturnData = (
  data: DiscordPayloadSchema & {
    variant: DiscordEventsColorVariants;
    channelId: string;
  }
) => { embedData: APIEmbed; content: string; channelId: string } | null;

/**
 * Validates the provided payload, constructs embed data if valid,
 * and sends an error notification if validation fails.
 */
export const validatePayloadAndReturnData: ValidatePayloadAndReturnData = (
  data
) => {
  // Validate the payload
  const validationResult = discordPayloadSchema.safeParse({
    ...data,
    color:
      discordEventsColorVariants[
        data?.variant as keyof typeof discordEventsColorVariants
      ] || discordEventsColorVariants["unknown"],
  });

  const allowedChannels = serverEnv.DISCORD_ALLOWED_CHANNELS.split(",");

  if (!validationResult.success || !allowedChannels.includes(data.channelId)) {
    sendValidationErrorNotification(validationResult.error);
    return null;
  }

  // If validation is successful, construct the embed data
  const validPayload = validationResult.data;

  return {
    channelId: data.channelId,
    embedData: {
      title: validPayload.title,
      color: validPayload.color,
      description: validPayload.description,
      timestamp: new Date().toISOString(),
      fields: validPayload.fieldsArr,
    },
    content: validPayload.content || "",
  };
};
