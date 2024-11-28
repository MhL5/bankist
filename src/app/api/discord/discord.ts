import { serverEnv } from "@/utils/env/serverEnv";
import { REST } from "@discordjs/rest";
import {
  Routes,
  type APIEmbed,
  type RESTPostAPIChannelMessageResult,
  type RESTPostAPICurrentUserCreateDMChannelResult,
} from "discord-api-types/v10";

/**
 * Provides a Discord client with methods to create a DM channel and send an embed message to a Discord channel.
 */
export default function DiscordClient() {
  /**
   * Creates a new REST client instance with the specified Discord bot token.
   * This REST client is used to interact with the Discord API, such as creating
   * DM channels and sending messages to Discord channels.
   */
  const rest = new REST({ version: "10" }).setToken(
    serverEnv.DISCORD_BOT_TOKEN
  );

  /**
   * Creates a new direct message (DM) channel with the specified user.
   */
  async function createDM(
    userId: string
  ): Promise<RESTPostAPICurrentUserCreateDMChannelResult> {
    return rest.post(Routes.userChannels(), {
      body: { recipient_id: userId },
    }) as Promise<RESTPostAPICurrentUserCreateDMChannelResult>;
  }

  /**
   * Sends an embed message to the specified Discord channel.
   */
  async function sendEmbed(
    embed: APIEmbed,
    content: string,
    channelId: string
  ): Promise<RESTPostAPIChannelMessageResult> {
    return (await rest.post(Routes.channelMessages(channelId ?? ""), {
      body: {
        // example for pinging a user: `<@YOUR_USER_ID>`
        // example: `hey <@520465292271288322>`
        content,
        embeds: [embed],
      },
    })) as Promise<RESTPostAPIChannelMessageResult>;
  }

  return {
    createDM,
    sendEmbed,
  };
}
