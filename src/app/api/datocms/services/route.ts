import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { performRequest } from "@/lib/datocms";

const QUERY = /* GraphQL */ `
  query ServicesDebug {
    allServices(orderBy: slug_ASC, first: 50) {
      slug
      title
      serviceimage {
        url
      }
    }
  }
`;

export async function GET() {
  const cookieStore = await cookies();
  const isDraft = cookieStore.get("datocms-draft")?.value === "true";

  try {
    const data = await performRequest<{
      allServices: Array<{
        slug: string;
        title: string;
        serviceimage?: { url?: string | null } | null;
      }>;
    }>({
      query: QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });

    return NextResponse.json({
      ok: true,
      draft: isDraft,
      services: data.allServices.map((s) => ({
        slug: s.slug,
        title: s.title,
        imageUrl: s.serviceimage?.url ?? null,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { ok: false, draft: isDraft, error: message },
      { status: 500 }
    );
  }
}

