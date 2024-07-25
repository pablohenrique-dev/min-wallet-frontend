export function addParamsToUrl<T>(baseUrl: string, params: T) {
  let url = baseUrl;
  const queryStrings: string[] = [];

  for (const key in params) {
    if (params[key as keyof T] !== undefined) {
      queryStrings.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(
          params[key as keyof T]!.toString(),
        )}`,
      );
    }
  }

  if (queryStrings.length > 0) {
    url += "?" + queryStrings.join("&");
  }

  return url;
}
