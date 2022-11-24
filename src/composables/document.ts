export interface Document {
  doc: string;
  title: string;
  description: string;
  hits: number;
}

export interface QueryResult {
  spelling_suggestion?: string;
  results: [Document];
  using_suggestion: boolean;
}
