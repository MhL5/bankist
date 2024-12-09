# /api/discord POST

## Schema

```ts
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
```

## example

```ts
{
    "variant": "success",
    "title": "test",
    "description": "",
    "content": "test  <@649998586154844160>",
    "channelId":"XXXX",
    "fieldsArr": [
        {
            "name": "",
            "value": "",
            "inline": false
        }
    ]
}
```

## usage next js :

```ts
"use server";

import type { StringWithAutocompleteOptions } from "@/types/StringWithAutocompleteOptions";
import { publicEnv } from "@/utils/env/client";
import { serverEnv } from "@/utils/env/server";
import ky from "ky";

type DiscordLogParams = {
  variant: "success" | "error" | "info" | "warning";
  title: string;
  description: string;
  content?: StringWithAutocompleteOptions<" <@649998586154844160> ">;
  fieldsArr?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
};

export async function discordLog(params: DiscordLogParams): Promise<void> {
  const channelId =
    publicEnv.NEXT_PUBLIC_APPLICATION_MODE === "prod"
      ? serverEnv.DISCORD_CHANNEL_ID
      : serverEnv.DISCORD_TEST_CHANNEL_ID;

  ky.post("https://discord-bot-logger.vercel.app/api/discord", {
    json: { ...params, channelId },
  });
}
```
