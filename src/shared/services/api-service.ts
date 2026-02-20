import { toast } from "sonner";
import { API_URL } from "../config/environments";
import { getErrorMessages } from "../utils/get-error-messages";
import type { QueryParams, RequestOptions } from "../types/api-service-types";

const buildUrl = (path: string, params?: QueryParams): string => {
  const url = new URL(`${API_URL}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    }
  }

  return url.toString();
};

const request = async <T>(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<{ data: T; headers: Headers }> => {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(path, params);

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      ...fetchOptions,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API Error ${response.status}]:`, errorText);
      const message = getErrorMessages(response.status);
      toast.error(message);
      throw new Error(message);
    }

    const data = await response.json();
    return { data, headers: response.headers };
  } catch (error) {
    if (error instanceof TypeError) {
      toast.error("Error de red. Por favor, verifica tu conexión");
    } else if (!(error instanceof Error)) {
      toast.error("Ocurrió un error inesperado.");
    }
    throw error;
  }
};

export const API_SERVICE = {
  GET: <T>(path: string, params?: QueryParams) =>
    request<T>("GET", path, { params }),

  POST: <T>(path: string, body: unknown) =>
    request<T>("POST", path, { body: JSON.stringify(body) }),

  PUT: <T>(path: string, body: unknown) =>
    request<T>("PUT", path, { body: JSON.stringify(body) }),

  DELETE: <T>(path: string) => request<T>("DELETE", path),
};
