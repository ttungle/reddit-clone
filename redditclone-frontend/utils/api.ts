export const getApiUrl = (path?: string) =>
  `${process.env.NEXT_PUBLIC_API_URL}${path ?? ''}` || `http://localhost:8080${path ?? ''}`;
