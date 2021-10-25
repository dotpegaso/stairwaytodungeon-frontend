export default function getLevelByExperienceCrystals(experienceCrystals) {
  if (experienceCrystals <= 4) {
    return 1
  }
  if (experienceCrystals <= 8) {
    return 2
  }
  if (experienceCrystals <= 12) {
    return 3
  }
  if (experienceCrystals <= 16) {
    return 4
  }
  if (experienceCrystals <= 22) {
    return 5
  }
  if (experienceCrystals <= 28) {
    return 6
  }
  if (experienceCrystals <= 34) {
    return 7
  }
  if (experienceCrystals <= 40) {
    return 8
  }
  if (experienceCrystals <= 48) {
    return 9
  }
  if (experienceCrystals <= 56) {
    return 10
  }
  if (experienceCrystals <= 64) {
    return 11
  }
  if (experienceCrystals <= 72 || experienceCrystals > 72) {
    return 12
  }
}
