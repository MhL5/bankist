import DiscordClient from "./discord";
import { validatePayloadAndReturnData } from "./validatePayloadAndReturnData";

export const POST = async (request: Request) => {
  const body = await request.json();

  const validPayload = validatePayloadAndReturnData(body);
  if (!validPayload) return "failed, you can see the log on discord.";

  const discordClient = DiscordClient();
  const { content, embedData, channelId } = validPayload;
  discordClient.sendEmbed(embedData, content, channelId);

  return new Response("DONE.");
};
