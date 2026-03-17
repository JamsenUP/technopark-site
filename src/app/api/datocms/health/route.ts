import { NextResponse } from "next/server";
import { performRequest } from "@/lib/datocms";

const HEALTH_QUERY = /* GraphQL */ `
  query DatoHealth {
    __typename
  }
`;

export async function GET() {
  try {
    const data = await performRequest<{
      __typename: string;
    }>({
      query: HEALTH_QUERY,
      includeDrafts: false,
      isVisualEditing: false,
    });

    return NextResponse.json({
      ok: true,
      typename: data.__typename,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

