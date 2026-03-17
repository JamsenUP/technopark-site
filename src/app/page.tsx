import { PriceCalculator } from "@/components/calculator";
import type { CalculatorCopy } from "@/components/calculator";
import { Card, Section } from "@/components/ui";
import { SiteLayout } from "@/components/layout";
import { performRequest } from "@/lib/datocms";
import { cookies } from "next/headers";

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
  }>;
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
      fleetItem2Title: fleetitem2title
      fleetItem2Description: fleetitem2description
      fleetItem3Title: fleetitem3title
      fleetItem3Description: fleetitem3description

      contactsTitle: contactstitle
      contactsSubtitle: contactssubtitle
      contactsCompanyName: contactscompanyname
      contactsOfficeAddress: contactsofficeaddress
      contactsPhone: contactsphone
      contactsEmail: contactsemail
      contactsHours: contactshours
      contactsMapNote: contactsmapnote
      contactsMapPlaceholder: contactsmapplaceholder
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
    fleetItem2Title: string | null;
    fleetItem2Description: string | null;
    fleetItem3Title: string | null;
    fleetItem3Description: string | null;

    contactsTitle: string | null;
    contactsSubtitle: string | null;
    contactsCompanyName: string | null;
    contactsOfficeAddress: string | null;
    contactsPhone: string | null;
    contactsEmail: string | null;
    contactsHours: string | null;
    contactsMapNote: string | null;
    contactsMapPlaceholder: string | null;
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

  const heroTitle =
    core?.homepage?.heroTitle ??
    dato?.homepage?.heroTitle ??
    "Профессиональный вывоз мусора в Вашем городе.";
  const heroDescription =
    core?.homepage?.heroDescription ??
    dato?.homepage?.heroDescription ??
    "Оперативный вывоз строительного, бытового и крупногабаритного мусора. Своя спецтехника, лицензии, электронные документы для юридических лиц.";

  const heroPill =
    dato?.homepage?.heroPill ?? "Вывоз и утилизация отходов I–IV классов";

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
    dato?.homepage?.servicesTitle ?? "Услуги по вывозу и утилизации отходов";
  const servicesSubtitle =
    dato?.homepage?.servicesSubtitle ??
    "Работаем с частными и корпоративными клиентами, подбираем оптимальное решение под задачу и бюджет.";

  const howWeWorkTitle = dato?.homepage?.howWeWorkTitle ?? "Как мы работаем";
  const howWeWorkSubtitle =
    dato?.homepage?.howWeWorkSubtitle ??
    "Простая и прозрачная схема сотрудничества — от первичного расчета до закрывающих документов.";

  const calculatorSectionTitle =
    dato?.homepage?.calculatorSectionTitle ?? "Калькулятор стоимости вывоза";
  const calculatorSectionSubtitle =
    dato?.homepage?.calculatorSectionSubtitle ??
    "Оцените бюджет на вывоз отходов онлайн за 1 минуту. Для точного расчета менеджер свяжется с вами после отправки заявки.";

  const calculatorCopy = {
    eyebrow: dato?.homepage?.calculatorEyebrow ?? "Онлайн-калькулятор",
    title:
      dato?.homepage?.calculatorTitle ??
      "Рассчитайте стоимость вывоза онлайн за 1 минуту",
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
    addressLabel: dato?.homepage?.calculatorAddressLabel ?? "Адрес вывоза",
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
    core?.allServices?.filter((s) => s?.slug && s?.title) ??
    dato?.allServices?.filter((s) => s?.slug && s?.title) ??
    [];

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
      <CalculatorSection
        title={calculatorSectionTitle}
        subtitle={calculatorSectionSubtitle}
        calculatorCopy={calculatorCopy}
      />
      <B2BSection title={b2bTitle} subtitle={b2bSubtitle} copy={dato?.homepage ?? null} />
      <WhyUsSection copy={dato?.homepage ?? null} />
      <FleetSection copy={dato?.homepage ?? null} />
      <ContactsSection copy={dato?.homepage ?? null} />
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
            Оставьте заявку на вывоз мусора
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

type ServiceCard = { slug: string; title: string; description?: string | null };

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
      title: "Вывоз строительного мусора",
      description: "Контейнеры 8–27 м³ для демонтажа, ремонта и стройплощадок.",
    },
    {
      slug: "household",
      title: "Вывоз бытовых отходов (КГО)",
      description: "Регулярный и разовый вывоз ТКО и крупногабаритного мусора.",
    },
    {
      slug: "bulky",
      title: "Вывоз крупногабаритного мусора",
      description:
        "Мебель, оборудование, строительные конструкции, металлоконструкции.",
    },
    {
      slug: "snow",
      title: "Вывоз снега",
      description: "Уборка и вывоз снега с территорий, парковок, промплощадок.",
    },
    {
      slug: "flat-office",
      title: "Вывоз мусора из квартир и офисов",
      description:
        "Комплексный вывоз после переезда, ремонта, освобождения помещений.",
    },
    {
      slug: "hazardous",
      title: "Утилизация опасных отходов (I–IV класс)",
      description: "Работаем по лицензии, предоставляем полный пакет документов.",
    },
    {
      slug: "containers",
      title: "Аренда контейнеров (бункеров)",
      description: "Долгосрочная и разовая аренда контейнеров 8–27 м³.",
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
              <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                {service.title}
              </h3>
              <p className="text-xs text-slate-400 sm:text-sm">
                {service.description ?? ""}
              </p>
            </div>
            <a
              href={`/services/${service.slug}`}
              className="mt-4 inline-flex text-xs font-medium text-primary hover:text-primary-light"
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
      title: copy?.howWeWorkStep3Title ?? "Условия вывоза",
      desc:
        copy?.howWeWorkStep3Desc ??
        "Согласовываем условия вывоза и утилизации, заключаем договор.",
    },
    {
      title: copy?.howWeWorkStep4Title ?? "Утилизация и документы",
      desc:
        copy?.howWeWorkStep4Desc ??
        "Вывозим отходы на лицензированные полигоны, предоставляем закрывающие документы.",
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
    copy?.whyUsItem2 ?? "Опыт работы более 5 лет в сфере вывоза и утилизации",
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
        "Для вывоза строительного и крупногабаритного мусора в контейнерах 8–27 м³.",
    },
    {
      title: copy?.fleetItem2Title ?? "Самосвалы",
      desc:
        copy?.fleetItem2Description ??
        "Вывоз сыпучих материалов, грунта, снега с объектов любой сложности.",
    },
    {
      title: copy?.fleetItem3Title ?? "Манипуляторы",
      desc:
        copy?.fleetItem3Description ??
        "Погрузка тяжелых и негабаритных отходов, металлолома, конструкций.",
    },
  ];

  return (
    <Section title={title} subtitle={subtitle}>
      <div className="grid gap-5 md:grid-cols-3">
        {fleet.map((item) => (
          <Card key={item.title}>
            <div className="mb-3 h-28 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900" />
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

function ContactsSection({ copy }: { copy: HomepageQuery["homepage"] }) {
  const title = copy?.contactsTitle ?? "Контакты и офис";
  const subtitle =
    copy?.contactsSubtitle ??
    "Работаем по договору, принимаем заявки по телефону и через сайт.";

  const companyName = copy?.contactsCompanyName ?? "ООО «ТЕХНОПАРК»";
  const officeAddress =
    copy?.contactsOfficeAddress ?? "Адрес офиса: г. [Ваш город], ул. Примерная, д. 10";
  const phone = copy?.contactsPhone ?? "Телефон: +7 (800) 555-35-35";
  const email = copy?.contactsEmail ?? "E-mail: info@tehnopark.ru";
  const hours = copy?.contactsHours ?? "Режим работы: ежедневно, 8:00 — 22:00";

  const mapNote =
    copy?.contactsMapNote ??
    "Интеграция с Яндекс.Картами: добавьте JavaScript SDK и компонент карты по вашему API-ключу. В данный блок можно встроить интерактивную карту с меткой офиса.";
  const mapPlaceholder =
    copy?.contactsMapPlaceholder ?? "Здесь будет карта Яндекс с меткой офиса ООО «ТЕХНОПАРК».";

  const namePlaceholder = copy?.contactsFormNamePlaceholder ?? "Имя";
  const phonePlaceholder = copy?.contactsFormPhonePlaceholder ?? "Телефон";
  const messagePlaceholder = copy?.contactsFormMessagePlaceholder ?? "Опишите задачу и адрес";
  const submitLabel = copy?.contactsFormSubmitLabel ?? "Отправить запрос";
  const hint =
    copy?.contactsFormHint ??
    "Менеджер свяжется с вами в рабочее время, чтобы уточнить детали и предложить оптимальное решение.";

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
          </div>
          <p className="text-xs text-slate-500">
            {mapNote}
          </p>
          <div className="h-56 rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 text-xs text-slate-500 flex items-center justify-center text-center px-4">
            {mapPlaceholder}
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

