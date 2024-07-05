export function isNonBrowserUserAgent(userAgent: string): boolean {
  const nonBrowserUserAgents = process.env.ALLOWED_ORIGINS;
  const regex = new RegExp(nonBrowserUserAgents.replace(/,/g, '|'), 'ig');

  return regex.test(userAgent);
}
