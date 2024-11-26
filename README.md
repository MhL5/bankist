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
    "channelId":"1305144390540595290",
    "fieldsArr": [
        {
            "name": "",
            "value": "",
            "inline": false
        }
    ]
}
```
