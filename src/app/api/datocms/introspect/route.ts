import { NextRequest, NextResponse } from "next/server";
import { performRequest } from "@/lib/datocms";

const INTROSPECT_QUERY = /* GraphQL */ `
  query IntrospectType($typeName: String!) {
    __type(name: $typeName) {
      name
      fields {
        name
        type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
            }
          }
        }
      }
    }
  }
`;

function unwrapType(t: any): string {
  // Produce readable signature like String!, [String!]!
  const kind = t?.kind;
  if (!kind) return "Unknown";

  if (kind === "NON_NULL") return `${unwrapType(t.ofType)}!`;
  if (kind === "LIST") return `[${unwrapType(t.ofType)}]`;
  return t.name ?? kind;
}

export async function GET(request: NextRequest) {
  const typeName = request.nextUrl.searchParams.get("type");
  if (!typeName) {
    return NextResponse.json(
      { ok: false, error: 'Missing required query param "type"' },
      { status: 400 }
    );
  }

  try {
    const data = await performRequest<{
      __type: { name: string; fields: Array<{ name: string; type: unknown }> } | null;
    }>({
      query: INTROSPECT_QUERY,
      variables: { typeName },
      // Avoid stale schema responses while you're actively editing models in DatoCMS.
      // This also disables caching in our GraphQL client.
      includeDrafts: true,
      isVisualEditing: false,
    });

    if (!data.__type) {
      return NextResponse.json(
        { ok: false, error: `Type not found: ${typeName}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      type: data.__type.name,
      fields: data.__type.fields.map((f) => ({ name: f.name, type: unwrapType(f.type) })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

