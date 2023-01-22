import { useFetch, type UseFetchOptions } from "@vueuse/core";

export interface Document {
  doc: string;
  url: string;
  title: string;
  description: string;
  hits?: number;
  online: boolean;
}

export interface QueryResult {
  spelling_suggestion?: string;
  results: Document[];
  using_suggestion: boolean;
}

export async function newOfflineDocument(
  file: File,
  endpoint: string,
  auth: string
) {
  return fetch(`${endpoint}/docs/file/${file.name}`, {
    body: file,
    method: "POST",
    headers: {
      "Content-Type": file.type,
      "X-User-Auth": auth,
    },
  });
}

export function newOnlineDocument(url: string, endpoint: string, auth: string) {
  url = `${encodeURIComponent(url)}`;
  console.log(`Sending ${url} to be indexed`);
  return useFetch(`${endpoint}/docs/url/${url}`, {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        "X-User-Auth": auth,
      };
      return {
        options,
      };
    },
  } as UseFetchOptions).post();
}

export function deleteDocument(
  document: Document,
  endpoint: string,
  auth: string
) {
  let id = document.online
    ? `${encodeURIComponent(document.doc)}`
    : document.doc;
  return fetch(`${endpoint}/docs/${id}`, {
    method: "DELETE",
    headers: {
      "X-User-Auth": auth,
    },
  });
}
