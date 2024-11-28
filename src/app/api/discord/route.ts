import { NextRequest } from "next/server";
import DiscordClient from "./discord";
import { validatePayloadAndReturnData } from "./validatePayloadAndReturnData";
import { sendValidationErrorNotification } from "./sendValidationErrorNotification";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const discordClient = DiscordClient();

  const validPayload = validatePayloadAndReturnData(body);
  if (!validPayload)
    return new Response("failed. invalid payload!", {
      status: 403,
    });

  const { content, embedData, channelId } = validPayload;
  try {
    await discordClient.sendEmbed(embedData, content, channelId);
  } catch (error) {
    sendValidationErrorNotification(`${JSON.stringify(error, null, 2)}`);
    return new Response("failed, you can see the log on discord.", {
      status: 403,
    });
  }

  return new Response("DONE.");
};
