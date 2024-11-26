## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# API Documentation: Post to Channel

## Endpoint

**POST** `/api/channel/post`

### Description

This API endpoint allows you to send a structured post to a specific channel. It accepts a JSON payload containing details about the post, such as its title, description, content, color, and an optional array of fields for additional data.

---

### Request Format

#### Headers

- `Content-Type: application/json`

#### Body (JSON)

The request body should conform to the following schema:

| **Field**     | **Type**           | **Required** | **Description**                                                                                                     |
| ------------- | ------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `channelId`   | `string` (enum)    | Yes          | The ID of the channel where the post will be sent. Acceptable values are determined by `allowedChannels` in `.env`. |
| `title`       | `string`           | Yes          | The title of the post.                                                                                              |
| `content`     | `string`           | No           | The main content of the post.                                                                                       |
| `color`       | `number`           | No           | An optional numerical value representing the color associated with the post.                                        |
| `description` | `string`           | No           | An optional description of the post.                                                                                |
| `fieldsArr`   | `array of objects` | No           | An optional array containing additional fields for the post. Each object has the following schema:                  |

#### `fieldsArr` Object Schema

| **Field** | **Type**  | **Required** | **Description**                               |
| --------- | --------- | ------------ | --------------------------------------------- |
| `name`    | `string`  | Yes          | The name of the field.                        |
| `value`   | `string`  | Yes          | The value of the field.                       |
| `inline`  | `boolean` | No           | Whether the field should be displayed inline. |

---

### Example Request

#### JSON Payload

```json
{
  "channelId": "general",
  "title": "Weekly Update",
  "content": "Here is the update for this week.",
  "color": 16711680,
  "description": "Summary of the week",
  "fieldsArr": [
    {
      "name": "Goal Achieved",
      "value": "75%",
      "inline": true
    },
    {
      "name": "Tasks Remaining",
      "value": "10",
      "inline": false
    }
  ]
}
```

---

### Response

#### Success Response

**Status Code:** `200 OK`  
**Body:**

```json
{
  "success": true,
  "message": "Post successfully sent to the channel."
}
```

#### Error Responses

| **Status Code**             | **Description**                                                  |
| --------------------------- | ---------------------------------------------------------------- |
| `400 Bad Request`           | The request body is invalid or missing required fields.          |
| `403 Forbidden`             | The provided `channelId` is not in the list of allowed channels. |
| `500 Internal Server Error` | An unexpected error occurred.                                    |

**Error Body:**

```json
{
  "success": false,
  "error": "Detailed error message here."
}
```

---

### Notes

- `allowedChannels` is dynamically defined in your `.env` file. Ensure it is properly configured to prevent validation errors.
- Optional fields can be omitted if not needed.
- Validate the payload carefully to ensure compliance with the schema.
