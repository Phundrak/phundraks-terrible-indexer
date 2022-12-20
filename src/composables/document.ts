import axios, { type AxiosRequestConfig } from "axios";

export interface Document {
  doc: string;
  title: string;
  description: string;
  hits: number;
  online: boolean;
}

export interface QueryResult {
  spelling_suggestion?: string;
  results: [Document];
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
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "X-User-Auth": auth,
  //   },
  // };
  // console.log(`Submitting URL ${url}`);
  // return fetch(`${endpoint}/docs/url/${url}`, options);
  return axios({
    url: `/docs/url/${url}`,
    baseUrl: endpoint,
    headers: {
      "Content-Type": file.type,
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
