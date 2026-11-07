export function isLocalDemoMode(): boolean {
  return !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
}
