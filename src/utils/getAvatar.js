export default function getAvatar({ discordId, avatarHash }) {
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.png`
}
