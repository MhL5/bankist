import DiscordClient from "./discord";
import { validatePayloadAndReturnData } from "./validatePayloadAndReturnData";

export const POST = async (request: Request) => {
  const body = await request.json();

  const validPayload = validatePayloadAndReturnData(body);
  if (!validPayload)
    return new Response("failed, you can see the log on discord.", {
      status: 403,
    });

  const discordClient = DiscordClient();
  const { content, embedData, channelId } = validPayload;
  discordClient.sendEmbed(embedData, content, channelId);

  return new Response("DONE.");
};
