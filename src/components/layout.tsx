import Link from "next/link";
import { ReactNode } from "react";
import { NavLink } from "./ui";
import { performRequest } from "@/lib/datocms";
import { cookies } from "next/headers";

type SiteSettings = {
  companyName: string | null;
  headerTagline: string | null;
  navAboutLabel: string | null;
  navServicesLabel: string | null;
  navCalculatorLabel: string | null;
  navContactsLabel: string | null;
  phoneLabel: string | null;
  phoneDisplay: string | null;
  phoneHref: string | null;
  callbackCta: string | null;
  b2bCta: string | null;
  footerText: string | null;
  email: string | null;
  workHours: string | null;
  ogrn: string | null;
  inn: string | null;
  jurAddress: string | null;
  licenseNumber: string | null;
};

const SITE_SETTINGS_QUERY = /* GraphQL */ `
  query SiteSettings {
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

const SITE_SETTINGS_DOCS_QUERY = /* GraphQL */ `
  query SiteSettingsDocs {
    sitesetting {
      ogrn
      inn
      jurAddress: juraddress
      licenseNumber: licensenumber
    }
  }
`;

async function fetchSiteSettings(isDraft: boolean): Promise<SiteSettings | null> {
  try {
    const data = await performRequest<{ sitesetting: Omit<SiteSettings, "ogrn" | "inn" | "jurAddress" | "licenseNumber"> | null }>({
      query: SITE_SETTINGS_QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });

    // If new fields are not yet added in DatoCMS, keep the site working.
    let docs: { ogrn: string | null; inn: string | null; jurAddress: string | null; licenseNumber: string | null } =
      { ogrn: null, inn: null, jurAddress: null, licenseNumber: null };
    try {
      const docsData = await performRequest<{
        sitesetting: {
          ogrn: string | null;
          inn: string | null;
          jurAddress: string | null;
          licenseNumber: string | null;
        } | null;
      }>({
        query: SITE_SETTINGS_DOCS_QUERY,
        includeDrafts: isDraft,
        isVisualEditing: isDraft,
      });
      docs = {
        ogrn: docsData.sitesetting?.ogrn ?? null,
        inn: docsData.sitesetting?.inn ?? null,
        jurAddress: docsData.sitesetting?.jurAddress ?? null,
        licenseNumber: docsData.sitesetting?.licenseNumber ?? null,
      };
    } catch {
      // ignore
    }

    if (!data.sitesetting) {
      return null;
    }

    return {
      ...data.sitesetting,
      ...docs,
    };
  } catch {
    return null;
  }
}

export function Header({ settings }: { settings: SiteSettings | null }) {
  const companyName = settings?.companyName ?? "ООО «ТЕХНОПАРК»";
  const headerTagline = settings?.headerTagline ?? "Утилизация отходов";
  const navAboutLabel = settings?.navAboutLabel ?? "О нас";
  const navServicesLabel = settings?.navServicesLabel ?? "Услуги";
  const navCalculatorLabel = settings?.navCalculatorLabel ?? "Калькулятор";
  const navContactsLabel = settings?.navContactsLabel ?? "Контакты";
  const phoneLabel = settings?.phoneLabel ?? "Телефон для заявок";
  const phoneDisplay = settings?.phoneDisplay ?? "+7 (800) 555-35-35";
  const phoneHref = settings?.phoneHref ?? "tel:+78005553535";
  const callbackCta = settings?.callbackCta ?? "Заказать звонок";
  const b2bCta = settings?.b2bCta ?? "Вход для юрлиц";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="container-max flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.18em] text-slate-400">технопарк</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="#about">{navAboutLabel}</NavLink>
          <NavLink href="#services">{navServicesLabel}</NavLink>
          <NavLink href="#contacts">{navContactsLabel}</NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden flex-col text-right text-xs sm:flex">
            <span className="text-slate-400">{phoneLabel}</span>
            <a
              href={phoneHref}
              className="whitespace-nowrap font-semibold text-base text-white"
            >
              {phoneDisplay}
            </a>
          </div>
          <button
            type="button"
            data-open-callback
            className="hidden whitespace-nowrap rounded-full border border-slate-700/80 bg-white px-3 py-1.5 text-xs font-medium text-[#0A2472] hover:bg-[#7f8c8d] hover:text-white md:inline-flex"
          >
            {callbackCta}
          </button>

          <Link
            href="/#b2b"
            className="hidden whitespace-nowrap rounded-full border border-slate-700/80 bg-white px-3 py-1.5 text-xs font-medium text-[#0A2472] hover:bg-[#7f8c8d] hover:text-white md:inline-flex"
          >
            {b2bCta}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const companyName = settings?.companyName ?? "ООО «ТЕХНОПАРК»";
  const footerText =
    settings?.footerText ??
    "Профессиональная утилизация отходов I–IV классов в вашем городе.";
  const phoneDisplay = settings?.phoneDisplay ?? "+7 (800) 555-35-35";
  const phoneHref = settings?.phoneHref ?? "tel:+78005553535";
  const email = settings?.email ?? "info@tehnopark.ru";
  const workHours = settings?.workHours ?? "Ежедневно: 8:00 — 22:00";
  const ogrn = settings?.ogrn;
  const inn = settings?.inn;
  const jurAddress = settings?.jurAddress;
  const licenseNumber = settings?.licenseNumber;

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      <div className="container-max flex flex-col gap-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>© {new Date().getFullYear()} {companyName}</p>
          <p className="text-xs text-slate-500">{footerText}</p>
          {(ogrn || inn || jurAddress || licenseNumber) && (
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              {ogrn && <p>ОГРН: {ogrn}</p>}
              {inn && <p>ИНН: {inn}</p>}
              {jurAddress && <p>Юр. адрес: {jurAddress}</p>}
              {licenseNumber && <p>Лицензия: {licenseNumber}</p>}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          <a href={phoneHref} className="hover:text-white">
            {phoneDisplay}
          </a>
          <a href={`mailto:${email}`} className="hover:text-white">
            {email}
          </a>
          <span>{workHours}</span>
        </div>
      </div>
    </footer>
  );
}

interface SiteLayoutProps {
  children: ReactNode;
}

export async function SiteLayout({ children }: SiteLayoutProps) {
  const cookieStore = await cookies();
  const isDraft = cookieStore.get("datocms-draft")?.value === "true";
  const settings = await fetchSiteSettings(isDraft);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}

