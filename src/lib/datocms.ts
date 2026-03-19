export type PerformRequestArgs<TVariables extends Record<string, unknown> = Record<string, unknown>> =
  Readonly<{
    query: string;
    variables?: TVariables;
    includeDrafts?: boolean;
    isVisualEditing?: boolean;
  }>;

type GraphQLErrorLike = { message?: string };

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLErrorLike[];
};

function getDatoToken() {
  return process.env.DATOCMS_API_TOKEN;
}

export async function performRequest<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  args: PerformRequestArgs<TVariables>
): Promise<TData> {
  const { query, variables = {} as TVariables, includeDrafts = false, isVisualEditing = false } = args;

  const token = getDatoToken();
  if (!token) {
    throw new Error(
      "DatoCMS token is missing. Set DATOCMS_API_TOKEN in your environment (server-only)."
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // Allow targeting a non-primary DatoCMS environment (e.g. sandbox).
  // Set DATOCMS_ENVIRONMENT in your environment if you created fields outside "primary".
  if (process.env.DATOCMS_ENVIRONMENT) {
    headers["X-Environment"] = process.env.DATOCMS_ENVIRONMENT;
  }

  // Include drafts (preview) + Visual Editing headers
  if (includeDrafts) {
    headers["X-Include-Drafts"] = "true";
    headers["X-Exclude-Invalid"] = "true";
  }

  if (includeDrafts && isVisualEditing) {
    const baseEditingUrl = process.env.DATOCMS_BASE_EDITING_URL;
    if (!baseEditingUrl) {
      throw new Error("DATOCMS_BASE_EDITING_URL is missing (required for Visual Editing).");
    }

    headers["X-Visual-Editing"] = "v1";
    headers["X-Base-Editing-Url"] = baseEditingUrl;
  }

  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    // Avoid caching in preview; keep default caching otherwise.
    cache: includeDrafts ? "no-store" : "force-cache",
  });

  let body: GraphQLResponse<TData>;
  try {
    body = (await res.json()) as GraphQLResponse<TData>;
  } catch {
    throw new Error(`DatoCMS GraphQL: failed to parse JSON response (HTTP ${res.status}).`);
  }

  if (!res.ok) {
    throw new Error(`DatoCMS GraphQL: HTTP ${res.status} ${res.statusText}: ${JSON.stringify(body)}`);
  }

  if (body.errors?.length) {
    const messages = body.errors.map((e) => e.message).filter(Boolean).join("; ");
    throw new Error(`DatoCMS GraphQL errors: ${messages || JSON.stringify(body.errors)}`);
  }

  if (!body.data) {
    throw new Error("DatoCMS GraphQL: response has no data.");
  }

  return body.data;
}

