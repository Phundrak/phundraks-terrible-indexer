import { useFetch, type UseFetchOptions } from "@vueuse/core";

export interface Document {
  doc: string;
  url: string;
  title: string;
  description: string;
  hits: number;
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
  return axios({
    url: `/docs/file/${file.name}`,
    baseUrl: endpoint,
    headers: {
      "Content-Type": file.type,
      "X-User-Auth": auth,
    },
    data: file,
  } as AxiosRequestConfig<File>);
}

export function newOnlineDocument(url: string, endpoint: string, auth: string) {
  url = `${encodeURIComponent(url)}`;
  console.log(`Sending ${url} to be indexed`);
  return axios({
    url: `/docs/url/${url}`,
    baseUrl: endpoint,
    headers: {
      "X-User-Auth": auth,
    },
  } as AxiosRequestConfig);
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
