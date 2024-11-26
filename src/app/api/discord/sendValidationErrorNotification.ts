import { serverEnv } from "@/utils/env/serverEnv";
import { discordEventsColorVariants } from "./constants";
import DiscordClient from "./discord";

/**
 * Sends a Discord notification for validation errors.
 *
 * @param {object} error - The validation error details.
 */
export function sendValidationErrorNotification(error: unknown): void {
  const discordClient = DiscordClient();
  discordClient.sendEmbed(
    {
      title: "A request failed!",
      description: `Error while validating the payload:\n\`\`\`json\n${JSON.stringify(
        error,
        null,
        2
      )}\n\`\`\``,
      color: discordEventsColorVariants["error"],
    },
    `# Error notification <@649998586154844160>`,
    serverEnv.DISCORD_BOT_ERROR_LOGS_CHANNEL_ID
  );
}
