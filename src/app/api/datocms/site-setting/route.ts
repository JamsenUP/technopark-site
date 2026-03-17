import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { performRequest } from "@/lib/datocms";

const QUERY = /* GraphQL */ `
  query SiteSettingDebug {
    sitesetting {
      companyName: companyname
      headerTagline: headertagline
      navAboutLabel: navaboutlabel
      navServicesLabel: navserviceslabel
      navCalculatorLabel: navcalculatorlabel
      navContactsLabel: navcontactslabel
      phoneLabel: phonelabel
      phoneDisplay: phonedisplay
      phoneHref: phonehref
      callbackCta: callbackcta
      b2bCta: b2bcta
      footerText: footertext
      email
      workHours: workhours
    }
  }
`;

export async function GET() {
  const cookieStore = await cookies();
  const isDraft = cookieStore.get("datocms-draft")?.value === "true";

  try {
    const data = await performRequest<{ sitesetting: Record<string, unknown> | null }>({
      query: QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });

    return NextResponse.json({ ok: true, draft: isDraft, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, draft: isDraft, error: message }, { status: 500 });
  }
}

