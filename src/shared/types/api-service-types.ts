
export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface RequestOptions extends RequestInit {
  params?: QueryParams;
}