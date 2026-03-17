type ApiFetchOptions<TBody> = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  headers?: HeadersInit;
};

export async function apiFetch<TResponse, TBody = undefined>({
  url,
  method = "GET",
  body,
  headers = {},
}: ApiFetchOptions<TBody>): Promise<TResponse> {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message ?? "Something went wrong");
    }

    return data as TResponse;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Unable to connect to server. Server is Down.");
    }

    throw error;
  }
}