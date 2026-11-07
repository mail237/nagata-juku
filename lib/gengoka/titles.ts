export function getStarTitle(stars: number): string {
  if (stars >= 10) return '十星レジェンド';
  if (stars >= 6) return '六つ星マスター';
  if (stars >= 3) return '三つ星ハンター';
  if (stars >= 1) return '星ひとつ';
  return 'はじめての星';
}
