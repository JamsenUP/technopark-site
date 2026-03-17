import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { performRequest } from "@/lib/datocms";

const HOMEPAGE_QUERY = /* GraphQL */ `
  query Homepage {
    homepage {
      herotitle
      herodescription
    }
    allServices(orderBy: slug_ASC, first: 20) {
      slug
      title
      description
    }
  }
`;

export async function GET() {
  const cookieStore = await cookies();
  const isDraft = cookieStore.get("datocms-draft")?.value === "true";

  try {
    const data = await performRequest({
      query: HOMEPAGE_QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });

    return NextResponse.json({
      ok: true,
      draft: isDraft,
      data,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        ok: false,
        draft: isDraft,
        error: message,
      },
      { status: 500 }
    );
  }
}

