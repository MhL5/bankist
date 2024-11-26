export type DiscordEventsColorVariants =
  keyof typeof discordEventsColorVariants;

export const discordEventsColorVariants = {
  success: 0x00ff00,
  error: 0xff0000,
  warning: 0xffff00,
  info: 0x0000ff,
  unknown: 0x808080,
};
