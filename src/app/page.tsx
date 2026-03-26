import { PriceCalculator } from "@/components/calculator";
import type { CalculatorCopy } from "@/components/calculator";
import { Card, Section } from "@/components/ui";
import { SiteLayout } from "@/components/layout";
import { performRequest } from "@/lib/datocms";
import { cookies } from "next/headers";
import { ImageLightbox } from "@/components/image-lightbox";

const HOMEPAGE_CORE_QUERY = /* GraphQL */ `
  query HomepageCore {
    homepage {
      heroTitle: herotitle
      heroDescription: herodescription
    }
    allServices(orderBy: slug_ASC, first: 20) {
      slug
      title
      description
      serviceimage {
        url
      }
    }
  }
`;

type HomepageCoreQuery = {
  homepage: {
    heroTitle: string | null;
    heroDescription: string | null;
  } | null;
  allServices: Array<{
    slug: string;
    title: string;
    description: string | null;
    serviceimage?: { url?: string | null } | null;
  }>;
};

const HOMEPAGE_CONTACTS_SOCIAL_QUERY = /* GraphQL */ `
  query HomepageContactsSocial {
    homepage {
      contactsMaxUrl: contactsmax
      contactsTelegramUrl: contactstelegram
    }
  }
`;

type HomepageContactsSocialQuery = {
  homepage: {
    contactsMaxUrl: string | null;
    contactsTelegramUrl: string | null;
  } | null;
};

const HOMEPAGE_CONTACTS_DOCS_QUERY = /* GraphQL */ `
  query HomepageContactsDocs {
    homepage {
      contactsLicense1: license1 {
        url
      }
      contactsLicense2: license2 {
        url
      }
    }
  }
`;

type HomepageContactsDocsQuery = {
  homepage: {
    contactsLicense1: { url: string | null } | null;
    contactsLicense2: { url: string | null } | null;
  } | null;
};

const HOMEPAGE_CONTACTS_DOCS_TEXT_QUERY = /* GraphQL */ `
  query HomepageContactsDocsText {
    homepage {
      docsSubtitle: documentssubtitle
      license1Label: license1label
      license2Label: license2label
    }
  }
`;

type HomepageContactsDocsTextQuery = {
  homepage: {
    docsSubtitle: string | null;
    license1Label: string | null;
    license2Label: string | null;
  } | null;
};

const HOMEPAGE_FAQ_QUERY = /* GraphQL */ `
  query HomepageFaq {
    homepage {
      faqitem1question
      faqitem1answer
      faqitem2question
      faqitem2answer
      faqitem3question
      faqitem3answer
      faqitem4question
      faqitem4answer
      faqitem5question
      faqitem5answer
      faqitem6question
      faqitem6answer
      faqitem7question
      faqitem7answer
      faqitem8question
      faqitem8answer
      faqitem9question
      faqitem9answer
      faqitem10question
      faqitem10answer
      faqitem11question
      faqitem11answer
    }
  }
`;

type HomepageFaqQuery = {
  homepage: {
    faqitem1question: string | null;
    faqitem1answer: string | null;
    faqitem2question: string | null;
    faqitem2answer: string | null;
    faqitem3question: string | null;
    faqitem3answer: string | null;
    faqitem4question: string | null;
    faqitem4answer: string | null;
    faqitem5question: string | null;
    faqitem5answer: string | null;
    faqitem6question: string | null;
    faqitem6answer: string | null;
    faqitem7question: string | null;
    faqitem7answer: string | null;
    faqitem8question: string | null;
    faqitem8answer: string | null;
    faqitem9question: string | null;
    faqitem9answer: string | null;
    faqitem10question: string | null;
    faqitem10answer: string | null;
    faqitem11question: string | null;
    faqitem11answer: string | null;
  } | null;
};

const HOMEPAGE_QUERY = /* GraphQL */ `
  query Homepage {
    homepage {
      heroTitle: herotitle
      heroDescription: herodescription
      heroPill: heropill
      heroBadge1Title: herobadge1title
      heroBadge1Description: herobadge1description
      heroBadge2Title: herobadge2title
      heroBadge2Description: herobadge2description
      heroBadge3Title: herobadge3title
      heroBadge3Description: herobadge3description
      servicesTitle: servicestitle
      servicesSubtitle: servicessubtitle
      howWeWorkTitle: howweworktitle
      howWeWorkSubtitle: howweworksubtitle
      howWeWorkStep1Title: howweworkstep1title
      howWeWorkStep1Desc: howweworkstep1desc
      howWeWorkStep2Title: howweworkstep2title
      howWeWorkStep2Desc: howweworkstep2desc
      howWeWorkStep3Title: howweworkstep3title
      howWeWorkStep3Desc: howweworkstep3desc
      howWeWorkStep4Title: howweworkstep4title
      howWeWorkStep4Desc: howweworkstep4desc
      calculatorSectionTitle: calculatorsectiontitle
      calculatorSectionSubtitle: calculatorsectionsubtitle
      calculatorEyebrow: calculatoreyebrow
      calculatorTitle: calculatortitle
      calculatorWasteTypeLabel: calculatorwastetypelabel
      calculatorWasteTypeConstruction: calculatorwastetypeconstruction
      calculatorWasteTypeHousehold: calculatorwastetypehousehold
      calculatorWasteTypeBulky: calculatorwastetypebulky
      calculatorWasteTypeSnow: calculatorwastetypesnow
      calculatorCalculationLabel: calculatorcalculationlabel
      calculatorByVolume: calculatorbyvolume
      calculatorByContainer: calculatorbycontainer
      calculatorVolumeLabel: calculatorvolumelabel
      calculatorVolumeRangeLabel: calculatorvolumerangelabel
      calculatorAddressLabel: calculatoraddresslabel
      calculatorAddressPlaceholder: calculatoraddressplaceholder
      calculatorSubmitLabel: calculatorsubmitlabel
      calculatorConsentText: calculatorconsenttext
      calculatorResultEyebrow: calculatorresulteyebrow
      calculatorResultEmptyValue: calculatorresultemptyvalue
      calculatorResultHint: calculatorresulthint
      calculatorOrderCta: calculatorordercta
      calculatorOrderHint: calculatororderhint
      b2bTitle: b2btitle
      b2bSubtitle: b2bsubtitle
      b2bBenefitsTitle: b2bbenefitstitle
      b2bBenefit1: b2bbenefit1
      b2bBenefit2: b2bbenefit2
      b2bBenefit3: b2bbenefit3
      b2bBenefit4: b2bbenefit4
      b2bBenefit5: b2bbenefit5
      b2bBenefit6: b2bbenefit6
      b2bFormTitle: b2bformtitle
      b2bFormCompanyPlaceholder: b2bformcompanyplaceholder
      b2bFormNamePlaceholder: b2bformnameplaceholder
      b2bFormContactPlaceholder: b2bformcontactplaceholder
      b2bFormDetailsPlaceholder: b2bformdetailsplaceholder
      b2bFormSubmitLabel: b2bformsubmitlabel
      b2bFormHint: b2bformhint

      whyUsTitle: whyustitle
      whyUsSubtitle: whyussubtitle
      whyUsItem1: whyusitem1
      whyUsItem2: whyusitem2
      whyUsItem3: whyusitem3
      whyUsItem4: whyusitem4
      whyUsItem5: whyusitem5
      whyUsItem6: whyusitem6

      fleetTitle: fleettitle
      fleetSubtitle: fleetsubtitle
      fleetItem1Title: fleetitem1title
      fleetItem1Description: fleetitem1description
      fleetItem1Image: fleetitem1image {
        url
      }
      fleetItem2Title: fleetitem2title
      fleetItem2Description: fleetitem2description
      fleetItem2Image: fleetitem2image {
        url
      }
      fleetItem3Title: fleetitem3title
      fleetItem3Description: fleetitem3description
      fleetItem3Image: fleetitem3image {
        url
      }

      contactsTitle: contactstitle
      contactsSubtitle: contactssubtitle
      contactsCompanyName: contactscompanyname
      contactsOfficeAddress: contactsofficeaddress
      contactsPhone: contactsphone
      contactsEmail: contactsemail
      contactsHours: contactshours
      contactsMapNote: contactsmapnote
      contactsMapPlaceholder: contactsmapplaceholder
      contactsRouteImage1: contactsrouteimage1 {
        url
      }
      contactsRouteImage2: contactsrouteimage2 {
        url
      }
      contactsRouteImage3: contactsrouteimage3 {
        url
      }
      contactsFormTitle: contactsformtitle
      contactsFormNamePlaceholder: contactsformnameplaceholder
      contactsFormPhonePlaceholder: contactsformphoneplaceholder
      contactsFormMessagePlaceholder: contactsformmessageplaceholder
      contactsFormSubmitLabel: contactsformsubmitlabel
      contactsFormHint: contactsformhint
    }
    allServices(orderBy: slug_ASC, first: 20) {
      slug
      title
      description
    }
  }
`;

type HomepageQuery = {
  homepage: {
    heroTitle: string | null;
    heroDescription: string | null;
    heroPill: string | null;
    heroBadge1Title: string | null;
    heroBadge1Description: string | null;
    heroBadge2Title: string | null;
    heroBadge2Description: string | null;
    heroBadge3Title: string | null;
    heroBadge3Description: string | null;
    servicesTitle: string | null;
    servicesSubtitle: string | null;
    howWeWorkTitle: string | null;
    howWeWorkSubtitle: string | null;
    howWeWorkStep1Title: string | null;
    howWeWorkStep1Desc: string | null;
    howWeWorkStep2Title: string | null;
    howWeWorkStep2Desc: string | null;
    howWeWorkStep3Title: string | null;
    howWeWorkStep3Desc: string | null;
    howWeWorkStep4Title: string | null;
    howWeWorkStep4Desc: string | null;
    calculatorSectionTitle: string | null;
    calculatorSectionSubtitle: string | null;
    calculatorEyebrow: string | null;
    calculatorTitle: string | null;
    calculatorWasteTypeLabel: string | null;
    calculatorWasteTypeConstruction: string | null;
    calculatorWasteTypeHousehold: string | null;
    calculatorWasteTypeBulky: string | null;
    calculatorWasteTypeSnow: string | null;
    calculatorCalculationLabel: string | null;
    calculatorByVolume: string | null;
    calculatorByContainer: string | null;
    calculatorVolumeLabel: string | null;
    calculatorVolumeRangeLabel: string | null;
    calculatorAddressLabel: string | null;
    calculatorAddressPlaceholder: string | null;
    calculatorSubmitLabel: string | null;
    calculatorConsentText: string | null;
    calculatorResultEyebrow: string | null;
    calculatorResultEmptyValue: string | null;
    calculatorResultHint: string | null;
    calculatorOrderCta: string | null;
    calculatorOrderHint: string | null;
    b2bTitle: string | null;
    b2bSubtitle: string | null;
    b2bBenefitsTitle: string | null;
    b2bBenefit1: string | null;
    b2bBenefit2: string | null;
    b2bBenefit3: string | null;
    b2bBenefit4: string | null;
    b2bBenefit5: string | null;
    b2bBenefit6: string | null;
    b2bFormTitle: string | null;
    b2bFormCompanyPlaceholder: string | null;
    b2bFormNamePlaceholder: string | null;
    b2bFormContactPlaceholder: string | null;
    b2bFormDetailsPlaceholder: string | null;
    b2bFormSubmitLabel: string | null;
    b2bFormHint: string | null;

    whyUsTitle: string | null;
    whyUsSubtitle: string | null;
    whyUsItem1: string | null;
    whyUsItem2: string | null;
    whyUsItem3: string | null;
    whyUsItem4: string | null;
    whyUsItem5: string | null;
    whyUsItem6: string | null;

    fleetTitle: string | null;
    fleetSubtitle: string | null;
    fleetItem1Title: string | null;
    fleetItem1Description: string | null;
    fleetItem1Image: { url: string | null } | null;
    fleetItem2Title: string | null;
    fleetItem2Description: string | null;
    fleetItem2Image: { url: string | null } | null;
    fleetItem3Title: string | null;
    fleetItem3Description: string | null;
    fleetItem3Image: { url: string | null } | null;

    contactsTitle: string | null;
    contactsSubtitle: string | null;
    contactsCompanyName: string | null;
    contactsOfficeAddress: string | null;
    contactsPhone: string | null;
    contactsEmail: string | null;
    contactsHours: string | null;
    contactsMapNote: string | null;
    contactsMapPlaceholder: string | null;
    contactsRouteImage1: { url: string | null } | null;
    contactsRouteImage2: { url: string | null } | null;
    contactsRouteImage3: { url: string | null } | null;
    contactsFormTitle: string | null;
    contactsFormNamePlaceholder: string | null;
    contactsFormPhonePlaceholder: string | null;
    contactsFormMessagePlaceholder: string | null;
    contactsFormSubmitLabel: string | null;
    contactsFormHint: string | null;
  } | null;
  allServices: Array<{
    slug: string;
    title: string;
    description: string | null;
  }>;
};

export default async function Home() {
  const cookieStore = await cookies();
  const isDraft = cookieStore.get("datocms-draft")?.value === "true";

  let core: HomepageCoreQuery | null = null;
  try {
    core = await performRequest<HomepageCoreQuery>({
      query: HOMEPAGE_CORE_QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });
  } catch {
    core = null;
  }

  let dato: HomepageQuery | null = null;
  try {
    dato = await performRequest<HomepageQuery>({
      query: HOMEPAGE_QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });
  } catch {
    // Fallback to static content if Dato is not configured yet.
    dato = null;
  }

  // Social links (MAX / Telegram) are fetched separately so the page stays
  // working even if these fields are not yet created in DatoCMS.
  let contactsSocial: HomepageContactsSocialQuery | null = null;
  try {
    contactsSocial = await performRequest<HomepageContactsSocialQuery>({
      query: HOMEPAGE_CONTACTS_SOCIAL_QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });
  } catch {
    contactsSocial = null;
  }

  const contactsMaxUrl = contactsSocial?.homepage?.contactsMaxUrl ?? null;
  const contactsTelegramUrl =
    contactsSocial?.homepage?.contactsTelegramUrl ?? null;

  // Documents (2 licenses) + FAQ are also fetched separately for safety.
  let contactsDocs: HomepageContactsDocsQuery | null = null;
  try {
    contactsDocs = await performRequest<HomepageContactsDocsQuery>({
      query: HOMEPAGE_CONTACTS_DOCS_QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });
  } catch {
    contactsDocs = null;
  }

  let contactsDocsText: HomepageContactsDocsTextQuery | null = null;
  try {
    contactsDocsText = await performRequest<HomepageContactsDocsTextQuery>({
      query: HOMEPAGE_CONTACTS_DOCS_TEXT_QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });
  } catch {
    contactsDocsText = null;
  }

  let faqData: HomepageFaqQuery | null = null;
  try {
    faqData = await performRequest<HomepageFaqQuery>({
      query: HOMEPAGE_FAQ_QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });
  } catch {
    faqData = null;
  }

  const contactsLicense1Url = contactsDocs?.homepage?.contactsLicense1?.url ?? null;
  const contactsLicense2Url = contactsDocs?.homepage?.contactsLicense2?.url ?? null;

  const docsSubtitle =
    contactsDocsText?.homepage?.docsSubtitle ??
    "Лицензии и разрешительные документы (можно добавить в DatoCMS).";
  const license1Label =
    contactsDocsText?.homepage?.license1Label ?? "Лицензия 1";
  const license2Label =
    contactsDocsText?.homepage?.license2Label ?? "Лицензия 2";

  const faqItems = [
    {
      q:
        faqData?.homepage?.faqitem1question ??
        "По договору или без?",
      a:
        faqData?.homepage?.faqitem1answer ??
        "По договору.",
    },
    {
      q:
        faqData?.homepage?.faqitem2question ??
        "Электронный документооборот?",
      a:
        faqData?.homepage?.faqitem2answer ??
        "Да, электронный документооборот (ЭДО) используется.",
    },
    {
      q:
        faqData?.homepage?.faqitem3question ??
        "Можно ли без электронного документооборота?",
      a:
        faqData?.homepage?.faqitem3answer ??
        "Можно, но предпочтительно ЭДО.",
    },
    {
      q:
        faqData?.homepage?.faqitem4question ??
        "Подключенный ОССиГ?",
      a:
        faqData?.homepage?.faqitem4answer ??
        "Да.",
    },
    {
      q:
        faqData?.homepage?.faqitem5question ??
        "Можно ли без ОССиГ?",
      a:
        faqData?.homepage?.faqitem5answer ??
        "Нет.",
    },
    {
      q:
        faqData?.homepage?.faqitem6question ??
        "Нужна ли предоплата?",
      a:
        faqData?.homepage?.faqitem6answer ??
        "Да, от 200 т.р.",
    },
    {
      q:
        faqData?.homepage?.faqitem7question ??
        "Могут ли не принять груз при нарушениях по примеси отходов?",
      a:
        faqData?.homepage?.faqitem7answer ??
        "Да.",
    },
    {
      q:
        faqData?.homepage?.faqitem8question ??
        "Могут ли принять груз без договора?",
      a:
        faqData?.homepage?.faqitem8answer ??
        "Нет.",
    },
    {
      q:
        faqData?.homepage?.faqitem9question ??
        "Есть ли весы и лидары?",
      a:
        faqData?.homepage?.faqitem9answer ??
        "Да.",
    },
    {
      q:
        faqData?.homepage?.faqitem10question ??
        "Твердое ли покрытие на въезде?",
      a:
        faqData?.homepage?.faqitem10answer ??
        "Нет. Но подъездной путь и дороги внутри карьера поддерживаются в нормативном состоянии, чтобы снизить/исключить вероятность застревания транспорта.",
    },
    {
      q:
        faqData?.homepage?.faqitem11question ??
        "Возможен ли заезд грузового транспорта с прицепом?",
      a:
        faqData?.homepage?.faqitem11answer ??
        "Да.",
    },
  ];

  const heroTitle =
    core?.homepage?.heroTitle ??
    dato?.homepage?.heroTitle ??
    "Профессиональная утилизация мусора в Вашем городе.";
  const heroDescription =
    core?.homepage?.heroDescription ??
    dato?.homepage?.heroDescription ??
    "Оперативная утилизация строительного, бытового и крупногабаритного мусора. Своя спецтехника, лицензии, электронные документы для юридических лиц.";

  const heroPill =
    dato?.homepage?.heroPill ?? "Утилизация отходов I–IV классов";

  const heroBadges = [
    {
      title: dato?.homepage?.heroBadge1Title ?? "Приезжаем от 1 часа",
      desc:
        dato?.homepage?.heroBadge1Description ??
        "Работаем 24/7, подстраиваемся под график объекта",
    },
    {
      title: dato?.homepage?.heroBadge2Title ?? "Собственный парк техники",
      desc:
        dato?.homepage?.heroBadge2Description ??
        "Контейнеры 8–27 м³, самосвалы, манипуляторы",
    },
    {
      title: dato?.homepage?.heroBadge3Title ?? "ЭДО и НДС для юрлиц",
      desc:
        dato?.homepage?.heroBadge3Description ??
        "Договор, счета, закрывающие документы, ЭДО",
    },
  ];

  const servicesTitle =
    dato?.homepage?.servicesTitle ?? "Услуги по утилизации отходов";
  const servicesSubtitle =
    dato?.homepage?.servicesSubtitle ??
    "Работаем с частными и корпоративными клиентами, подбираем оптимальное решение под задачу и бюджет.";

  const howWeWorkTitle = dato?.homepage?.howWeWorkTitle ?? "Как мы работаем";
  const howWeWorkSubtitle =
    dato?.homepage?.howWeWorkSubtitle ??
    "Простая и прозрачная схема сотрудничества — от первичного расчета до закрывающих документов.";

  const calculatorSectionTitle =
    dato?.homepage?.calculatorSectionTitle ?? "Калькулятор стоимости утилизации";
  const calculatorSectionSubtitle =
    dato?.homepage?.calculatorSectionSubtitle ??
    "Оцените бюджет на утилизацию отходов онлайн за 1 минуту. Для точного расчета менеджер свяжется с вами после отправки заявки.";

  const calculatorCopy = {
    eyebrow: dato?.homepage?.calculatorEyebrow ?? "Онлайн-калькулятор",
    title:
      dato?.homepage?.calculatorTitle ??
      "Рассчитайте стоимость утилизации онлайн за 1 минуту",
    wasteTypeLabel: dato?.homepage?.calculatorWasteTypeLabel ?? "Тип отходов",
    wasteTypeConstruction:
      dato?.homepage?.calculatorWasteTypeConstruction ?? "Строительный",
    wasteTypeHousehold:
      dato?.homepage?.calculatorWasteTypeHousehold ?? "Бытовой",
    wasteTypeBulky:
      dato?.homepage?.calculatorWasteTypeBulky ?? "Крупногабарит",
    wasteTypeSnow: dato?.homepage?.calculatorWasteTypeSnow ?? "Снег",
    calculationLabel:
      dato?.homepage?.calculatorCalculationLabel ?? "Расчет по",
    calculationByVolume:
      dato?.homepage?.calculatorByVolume ?? "По объему, м³",
    calculationByContainer:
      dato?.homepage?.calculatorByContainer ?? "По контейнеру",
    volumeLabel: dato?.homepage?.calculatorVolumeLabel ?? "Объем, м³",
    volumeRangeLabel:
      dato?.homepage?.calculatorVolumeRangeLabel ?? "1–60 м³",
    addressLabel: dato?.homepage?.calculatorAddressLabel ?? "Адрес утилизации",
    addressPlaceholder:
      dato?.homepage?.calculatorAddressPlaceholder ??
      "Город, улица, дом, объект",
    submitLabel:
      dato?.homepage?.calculatorSubmitLabel ?? "Рассчитать стоимость",
    consentText:
      dato?.homepage?.calculatorConsentText ??
      "Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.",
    resultEyebrow:
      dato?.homepage?.calculatorResultEyebrow ?? "Результат расчета",
    resultEmptyValue:
      dato?.homepage?.calculatorResultEmptyValue ?? "—",
    resultHint:
      dato?.homepage?.calculatorResultHint ??
      "Итоговая стоимость зависит от удаленности объекта, сложности подъезда и графика работ. Точный расчет менеджер подтвердит по телефону.",
    orderCta: dato?.homepage?.calculatorOrderCta ?? "Заказать по этой цене",
    orderHint:
      dato?.homepage?.calculatorOrderHint ??
      "Отправьте заявку — мы перезвоним в течение 10 минут, подтвердим стоимость и подберем технику.",
  };

  const b2bTitle = dato?.homepage?.b2bTitle ?? "Для корпоративных клиентов";
  const b2bSubtitle =
    dato?.homepage?.b2bSubtitle ??
    "Работаем с застройщиками, управляющими компаниями, ТЦ, производственными и логистическими комплексами.";

  const servicesFromDato =
    core?.allServices
      ?.filter((s) => s?.slug && s?.title)
      .map((s) => ({
        slug: s.slug,
        title: s.title,
        description: s.description,
        imageUrl: s.serviceimage?.url ?? null,
      })) ??
    (dato?.allServices
      ?.filter((s) => s?.slug && s?.title)
      .map((s) => ({
        slug: s.slug,
        title: s.title,
        description: s.description,
        imageUrl: null,
      })) ??
      []);

  return (
    <SiteLayout>
      <HeroSection
        heroTitle={heroTitle}
        heroDescription={heroDescription}
        heroPill={heroPill}
        badges={heroBadges}
      />
      <ServicesSection
        services={servicesFromDato}
        title={servicesTitle}
        subtitle={servicesSubtitle}
      />
      <HowWeWorkSection
        title={howWeWorkTitle}
        subtitle={howWeWorkSubtitle}
        copy={dato?.homepage ?? null}
      />
      <B2BSection title={b2bTitle} subtitle={b2bSubtitle} copy={dato?.homepage ?? null} />
      <WhyUsSection copy={dato?.homepage ?? null} />
      <ContactsSection
        copy={dato?.homepage ?? null}
        contactsMaxUrl={contactsMaxUrl}
        contactsTelegramUrl={contactsTelegramUrl}
      />
      <DocumentsSection
        license1Url={contactsLicense1Url}
        license2Url={contactsLicense2Url}
        docsSubtitle={docsSubtitle}
        license1Label={license1Label}
        license2Label={license2Label}
      />
      <FaqSection items={faqItems} />
    </SiteLayout>
  );
}

function HeroSection({
  heroTitle,
  heroDescription,
  heroPill,
  badges,
}: {
  heroTitle: string;
  heroDescription: string;
  heroPill: string;
  badges: Array<{ title: string; desc: string }>;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 pb-16 pt-10 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.28),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),_transparent_60%)]" />
      <div className="container-max relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="max-w-xl space-y-6">
          <p className="inline-flex rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            {heroPill}
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            {heroTitle}
            <br />
            <span className="text-primary">
              Гарантируем утилизацию по&nbsp;закону.
            </span>
          </h1>
          <p className="max-w-lg text-sm sm:text-base text-slate-300">
            {heroDescription}
          </p>

          <div className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200 sm:grid-cols-3">
            {badges.map((b) => (
              <HeroBadge key={b.title} title={b.title} desc={b.desc} />
            ))}
          </div>
        </div>

        <Card className="mt-2 w-full max-w-md lg:ml-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-primary/80">
            Быстрая заявка
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">
            Оставьте заявку на утилизацию мусора
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Перезвоним в течение 10 минут, уточним детали и подберем технику.
          </p>
          <form className="mt-5 flex flex-col gap-3">
            <input
              className="h-10 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder="Имя"
            />
            <input
              className="h-10 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder="Телефон"
            />
            <input
              className="h-10 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder="Адрес или объект"
            />
            <button
              type="submit"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-lg font-bold text-[#0A2472] shadow-soft transition-colors hover:bg-[#7f8c8d] hover:text-white"
            >
              Оставить заявку
            </button>
            <p className="mt-1 text-[11px] leading-snug text-slate-500">
              Заполняя форму, вы соглашаетесь с обработкой персональных данных.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
}

interface HeroBadgeProps {
  title: string;
  desc: string;
}

function HeroBadge({ title, desc }: HeroBadgeProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold text-slate-50">{title}</p>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  );
}

type ServiceCard = {
  slug: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
};

function ServicesSection({
  services,
  title,
  subtitle,
}: {
  services: ServiceCard[];
  title: string;
  subtitle: string;
}) {
  const fallback: ServiceCard[] = [
    {
      slug: "construction",
      title: "Утилизация строительного мусора",
      description: "Контейнеры 8–27 м³ для демонтажа, ремонта и стройплощадок.",
      imageUrl: null,
    },
    {
      slug: "household",
      title: "Утилизация бытовых отходов (КГО)",
      description: "Регулярная и разовая утилизация ТКО и крупногабаритного мусора.",
      imageUrl: null,
    },
    {
      slug: "bulky",
      title: "Утилизация крупногабаритного мусора",
      description:
        "Мебель, оборудование, строительные конструкции, металлоконструкции.",
      imageUrl: null,
    },
    {
      slug: "snow",
      title: "Утилизация снега",
      description: "Уборка и утилизация снега с территорий, парковок, промплощадок.",
      imageUrl: null,
    },
    {
      slug: "flat-office",
      title: "Утилизация мусора из квартир и офисов",
      description:
        "Комплексная утилизация после переезда, ремонта, освобождения помещений.",
      imageUrl: null,
    },
    {
      slug: "hazardous",
      title: "Утилизация опасных отходов (I–IV класс)",
      description: "Работаем по лицензии, предоставляем полный пакет документов.",
      imageUrl: null,
    },
    {
      slug: "containers",
      title: "Аренда контейнеров (бункеров)",
      description: "Долгосрочная и разовая аренда контейнеров 8–27 м³.",
      imageUrl: null,
    },
  ];

  const list = services.length ? services : fallback;

  return (
    <Section
      id="services"
      title={title}
      subtitle={subtitle}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((service) => (
          <Card key={service.slug} className="flex flex-col justify-between">
            <div className="space-y-2">
              {service.imageUrl && (
                <div className="mb-2 h-32 overflow-hidden rounded-2xl bg-slate-800">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                {service.title}
              </h3>
              <p className="text-xs text-slate-400 sm:text-sm">
                {service.description ?? ""}
              </p>
            </div>
            <a
              href={`/services/${service.slug}`}
              className="mt-4 inline-flex items-center justify-center text-center whitespace-nowrap rounded-full border border-slate-700/80 bg-white px-3 py-1.5 text-xs font-medium text-[#0A2472] transition-colors hover:bg-[#7f8c8d] hover:text-white"
            >
              Подробнее об услуге
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function HowWeWorkSection({
  title,
  subtitle,
  copy,
}: {
  title: string;
  subtitle: string;
  copy: HomepageQuery["homepage"];
}) {
  const steps = [
    {
      title: copy?.howWeWorkStep1Title ?? "Заявка или звонок",
      desc:
        copy?.howWeWorkStep1Desc ??
        "Вы оставляете заявку на сайте или звоните нам.",
    },
    {
      title: copy?.howWeWorkStep2Title ?? "Расчет и согласование",
      desc: copy?.howWeWorkStep2Desc ?? "Уточняем объем, тип отходов, адрес, сроки.",
    },
    {
      title: copy?.howWeWorkStep3Title ?? "Условия утилизации",
      desc:
        copy?.howWeWorkStep3Desc ??
        "Согласовываем условия утилизации и заключаем договор.",
    },
    {
      title: copy?.howWeWorkStep4Title ?? "Утилизация и документы",
      desc:
        copy?.howWeWorkStep4Desc ??
        "Утилизируем отходы на лицензированные полигоны, предоставляем закрывающие документы.",
    },
  ];

  return (
    <Section
      id="about"
      title={title}
      subtitle={subtitle}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Card key={step.title}>
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {index + 1}
            </div>
            <h3 className="text-sm font-semibold text-slate-50">
              {step.title}
            </h3>
            <p className="mt-1 text-xs text-slate-400">{step.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function CalculatorSection({
  title,
  subtitle,
  calculatorCopy,
}: {
  title: string;
  subtitle: string;
  calculatorCopy: Record<string, unknown>;
}) {
  return (
    <Section
      id="calculator"
      title={title}
      subtitle={subtitle}
    >
      <PriceCalculator copy={calculatorCopy as any} />
    </Section>
  );
}

function B2BSection({
  title,
  subtitle,
  copy,
}: {
  title: string;
  subtitle: string;
  copy: HomepageQuery["homepage"];
}) {
  const benefitsTitle =
    copy?.b2bBenefitsTitle ?? "Полный цикл по обращению с отходами для бизнеса";
  const benefits = [
    copy?.b2bBenefit1 ?? "Заключаем долгосрочные и разовые договоры",
    copy?.b2bBenefit2 ?? "Работаем с НДС, ведем ЭДО",
    copy?.b2bBenefit3 ?? "Предоставляем полный пакет закрывающих документов",
    copy?.b2bBenefit4 ?? "Обслуживаем стройки, ТЦ, склады, заводы",
    copy?.b2bBenefit5 ?? "Индивидуальные условия и фиксированные тарифы",
    copy?.b2bBenefit6 ?? "Персональный менеджер и единая точка входа",
  ];
  const formTitle = copy?.b2bFormTitle ?? "Оставить заявку для юрлиц";
  const companyPlaceholder = copy?.b2bFormCompanyPlaceholder ?? "Компания";
  const namePlaceholder = copy?.b2bFormNamePlaceholder ?? "Имя";
  const contactPlaceholder =
    copy?.b2bFormContactPlaceholder ?? "Телефон / e-mail";
  const detailsPlaceholder =
    copy?.b2bFormDetailsPlaceholder ??
    "Объект, примерный объем отходов, график работ";
  const submitLabel = copy?.b2bFormSubmitLabel ?? "Оставить заявку для юрлица";
  const hint =
    copy?.b2bFormHint ??
    "Договор, КП и все документы подготовим в течение 1 рабочего дня.";

  return (
    <Section
      id="b2b"
      title={title}
      subtitle={subtitle}
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <Card className="space-y-3">
          <h3 className="text-base font-semibold text-slate-50">
            {benefitsTitle}
          </h3>
          <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            {benefits.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </Card>
        <Card className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-50">
            {formTitle}
          </h4>
          <form className="flex flex-col gap-2 text-sm">
            <input
              className="h-10 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder={companyPlaceholder}
            />
            <input
              className="h-10 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder={namePlaceholder}
            />
            <input
              className="h-10 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder={contactPlaceholder}
            />
            <textarea
              className="min-h-[72px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder={detailsPlaceholder}
            />
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-slate-700/80 bg-white px-5 py-2 text-xs font-medium text-[#0A2472] transition-colors hover:bg-[#7f8c8d] hover:text-white"
            >
              {submitLabel}
            </button>
            <p className="mt-1 text-[11px] leading-snug text-slate-500">
              {hint}
            </p>
          </form>
        </Card>
      </div>
    </Section>
  );
}

function WhyUsSection({ copy }: { copy: HomepageQuery["homepage"] }) {
  const title = copy?.whyUsTitle ?? "Почему выбирают ООО «ТЕХНОПАРК»";
  const subtitle =
    copy?.whyUsSubtitle ??
    "Мы берем на себя полный цикл по обращению с отходами и соблюдаем все требования законодательства.";

  const items = [
    copy?.whyUsItem1 ?? "Лицензия на обращение с отходами I–IV классов",
    copy?.whyUsItem2 ?? "Опыт работы более 5 лет в сфере утилизации отходов",
    copy?.whyUsItem3 ?? "Собственный парк техники и обученный персонал",
    copy?.whyUsItem4 ?? "Прозрачные и фиксированные цены, без скрытых платежей",
    copy?.whyUsItem5 ?? "Страхование груза и ответственность за утилизацию",
    copy?.whyUsItem6 ?? "Электронный документооборот и поддержка юристов",
  ];

  return (
    <Section title={title} subtitle={subtitle}>
      <div className="grid gap-5 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm">
            <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[11px] text-primary">
              ✓
            </span>
            <p className="text-slate-200">{item}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FleetSection({ copy }: { copy: HomepageQuery["homepage"] }) {
  const title = copy?.fleetTitle ?? "Техника и парк";
  const subtitle =
    copy?.fleetSubtitle ??
    "Современный парк спецтехники позволяет оперативно обслуживать частные объекты и крупные стройки.";

  const fleet = [
    {
      title: copy?.fleetItem1Title ?? "Контейнеровозы с мультилифтами",
      desc:
        copy?.fleetItem1Description ??
        "Для утилизации строительного и крупногабаритного мусора в контейнерах 8–27 м³.",
      imageUrl: copy?.fleetItem1Image?.url ?? null,
    },
    {
      title: copy?.fleetItem2Title ?? "Самосвалы",
      desc:
        copy?.fleetItem2Description ??
        "Утилизация сыпучих материалов, грунта, снега с объектов любой сложности.",
      imageUrl: copy?.fleetItem2Image?.url ?? null,
    },
    {
      title: copy?.fleetItem3Title ?? "Манипуляторы",
      desc:
        copy?.fleetItem3Description ??
        "Погрузка тяжелых и негабаритных отходов, металлолома, конструкций.",
      imageUrl: copy?.fleetItem3Image?.url ?? null,
    },
  ];

  return (
    <Section title={title} subtitle={subtitle}>
      <div className="grid gap-5 md:grid-cols-3">
        {fleet.map((item) => (
          <Card key={item.title}>
            {item.imageUrl ? (
              <div className="mb-3 h-28 overflow-hidden rounded-2xl bg-slate-800">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="mb-3 h-28 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900" />
            )}
            <h3 className="text-sm font-semibold text-slate-50">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function ContactsSection({
  copy,
  contactsMaxUrl,
  contactsTelegramUrl,
}: {
  copy: HomepageQuery["homepage"];
  contactsMaxUrl: string | null;
  contactsTelegramUrl: string | null;
}) {
  const title = copy?.contactsTitle ?? "Контакты";
  const subtitle =
    copy?.contactsSubtitle ??
    "Работаем по договору, принимаем заявки по телефону и через сайт.";

  const companyName = copy?.contactsCompanyName ?? "ООО «ТЕХНОПАРК»";
  const officeAddress =
    copy?.contactsOfficeAddress ??
    "Адрес: Московская область, Рузский г.о., д. Крюкова, земельный участок с кадастровым номером: 50:19:0050628:357";
  const phone = copy?.contactsPhone ?? "Телефон: +7 (800) 555-35-35";
  const email = copy?.contactsEmail ?? "E-mail: info@tehnopark.ru";
  const hours = copy?.contactsHours ?? "Режим работы: ежедневно, 8:00 — 22:00";

  const mapNote =
    copy?.contactsMapNote ??
    "Интеграция с Яндекс.Картами: добавьте JavaScript SDK и компонент карты по вашему API-ключу. В данный блок можно встроить интерактивную карту с меткой объекта.";
  const mapPlaceholder =
    copy?.contactsMapPlaceholder ?? "Здесь будет карта Яндекс с меткой объекта ООО «ТЕХНОПАРК».";

  const namePlaceholder = copy?.contactsFormNamePlaceholder ?? "Имя";
  const phonePlaceholder = copy?.contactsFormPhonePlaceholder ?? "Телефон";
  const messagePlaceholder = copy?.contactsFormMessagePlaceholder ?? "Опишите задачу и адрес";
  const submitLabel = copy?.contactsFormSubmitLabel ?? "Отправить запрос";
  const hint =
    copy?.contactsFormHint ??
    "Менеджер свяжется с вами в рабочее время, чтобы уточнить детали и предложить оптимальное решение.";

  const routeImages = [
    copy?.contactsRouteImage1?.url ?? null,
    copy?.contactsRouteImage2?.url ?? null,
    copy?.contactsRouteImage3?.url ?? null,
  ].filter((u): u is string => Boolean(u));

  return (
    <Section
      id="contacts"
      title={title}
      subtitle={subtitle}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
        <Card className="space-y-4">
          <div className="space-y-1 text-sm text-slate-200">
            <p className="font-medium">{companyName}</p>
            <p>{officeAddress}</p>
            <p>{phone}</p>
            <p>{email}</p>
            <p>{hours}</p>
            <div className="flex items-center gap-2 pt-1">
              {contactsMaxUrl ? (
                <a
                  href={contactsMaxUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex whitespace-nowrap rounded-full border border-slate-700/80 bg-white px-3 py-1.5 text-xs font-medium text-[#0A2472] transition-colors hover:bg-[#7f8c8d] hover:text-white"
                >
                  MAX
                </a>
              ) : (
                <span className="text-slate-400 text-xs whitespace-nowrap">
                  MAX: добавьте ссылку
                </span>
              )}
              {contactsTelegramUrl ? (
                <a
                  href={contactsTelegramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex whitespace-nowrap rounded-full border border-slate-700/80 bg-white px-3 py-1.5 text-xs font-medium text-[#0A2472] transition-colors hover:bg-[#7f8c8d] hover:text-white"
                >
                  Telegram
                </a>
              ) : (
                <span className="text-slate-400 text-xs whitespace-nowrap">
                  Telegram: добавьте ссылку
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-500">
            {mapNote}
          </p>

          {routeImages.length > 0 && (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
              {routeImages.map((src, idx) => (
                <ImageLightbox
                  key={src + idx}
                  src={src}
                  alt={`Схема проезда ${idx + 1}`}
                  className="h-[280px] w-full overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800"
                />
              ))}
            </div>
          )}
          <div className="h-56 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 overflow-hidden">
            <iframe
              src="https://yandex.ru/map-widget/v1/-/CLxP7WPr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={mapPlaceholder}
            />
          </div>
        </Card>
        <Card className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-50">
            {copy?.contactsFormTitle ?? "Быстрый запрос расчета"}
          </h3>
          <form className="flex flex-col gap-2 text-xs">
            <input
              className="h-9 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder={namePlaceholder}
            />
            <input
              className="h-9 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder={phonePlaceholder}
            />
            <textarea
              className="min-h-[72px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
              placeholder={messagePlaceholder}
            />
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-slate-700/80 bg-white px-4 py-2 text-xs font-medium text-[#0A2472] transition-colors hover:bg-[#7f8c8d] hover:text-white"
            >
              {submitLabel}
            </button>
            <p className="mt-1 text-[11px] leading-snug text-slate-500">
              {hint}
            </p>
          </form>
        </Card>
      </div>
    </Section>
  );
}

function DocumentsSection({
  license1Url,
  license2Url,
  docsSubtitle,
  license1Label,
  license2Label,
}: {
  license1Url: string | null;
  license2Url: string | null;
  docsSubtitle: string;
  license1Label: string;
  license2Label: string;
}) {
  return (
    <Section title="Документы" subtitle={docsSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="space-y-2">
          <div className="text-center text-sm font-semibold text-slate-50">
            {license1Url ? (
              <a
                href={license1Url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary-light break-all inline-block"
              >
                {license1Label}
              </a>
            ) : (
              license1Label
            )}
          </div>
          {license1Url ? (
            null
          ) : (
            <div className="text-sm text-slate-500">Добавьте файл в DatoCMS: `license1`</div>
          )}
        </Card>
        <Card className="space-y-2">
          <div className="text-sm font-semibold text-slate-50">
            {license2Url ? (
              <a
                href={license2Url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary-light break-all"
              >
                {license2Label}
              </a>
            ) : (
              license2Label
            )}
          </div>
          {license2Url ? (
            null
          ) : (
            <div className="text-sm text-slate-500">Добавьте файл в DatoCMS: `license2`</div>
          )}
        </Card>
      </div>
    </Section>
  );
}

function FaqSection({
  items,
}: {
  items: Array<{
    q: string;
    a: string;
  }>;
}) {
  return (
    <Section title="Часто задаваемые вопросы">
      <div className="space-y-3">
        {items.map((item, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border border-slate-800 bg-slate-900/30 p-4"
          >
            <summary className="cursor-pointer text-sm font-medium text-slate-50">
              {item.q}
            </summary>
            <div className="mt-2 whitespace-pre-line text-sm text-slate-300">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

