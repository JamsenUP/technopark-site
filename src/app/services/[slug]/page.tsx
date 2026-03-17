import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout";
import { Card, Section } from "@/components/ui";
import { performRequest } from "@/lib/datocms";
import { cookies } from "next/headers";

const SERVICE_CONTENT = {
  construction: {
    title: "Вывоз строительного мусора",
    description:
      "Организуем вывоз строительного мусора с частных объектов и стройплощадок. Предоставляем контейнеры 8–27 м³, самосвалы и погрузку.",
    variants: [
      "Контейнер 8 м³ — для небольших ремонтов и частных домов",
      "Контейнер 20 м³ — для средних объектов и демонтажа перегородок",
      "Контейнер 27 м³ — для крупных строек и ТРЦ",
    ],
  },
  household: {
    title: "Вывоз бытовых отходов (КГО)",
    description:
      "Вывоз крупногабаритного и бытового мусора во дворах, на территориях ЖК и коммерческих объектах. Работаем разово и по абонентским договорам.",
    variants: [
      "Разовый вывоз КГО по заявке УК или ТСЖ",
      "Регулярный вывоз по графику",
      "Ликвидация несанкционированных свалок",
    ],
  },
  bulky: {
    title: "Вывоз крупногабаритного мусора",
    description:
      "Забираем и утилизируем мебель, оборудование, витрины, металлические конструкции и прочие крупногабаритные отходы.",
    variants: [
      "Вывоз мебели и интерьера при переездах",
      "Демонтаж и вывоз торгового оборудования",
      "Вывоз металлоконструкций и нестандартных грузов",
    ],
  },
  snow: {
    title: "Вывоз снега",
    description:
      "Уборка и вывоз снега с территорий, парковок, складских и промышленных площадок. Работаем ночью и в выходные.",
    variants: [
      "Разовый вывоз снега после обильных осадков",
      "Сезонное обслуживание территорий",
      "Уборка спецтехникой с последующим вывозом",
    ],
  },
  "flat-office": {
    title: "Вывоз мусора из квартир и офисов",
    description:
      "Комплексный вывоз мусора из квартир, офисов и складов после ремонта, переезда или ликвидации.",
    variants: [
      "Вывоз после ремонта квартиры или офиса",
      "Освобождение помещений под сдачу или продажу",
      "Вывоз стеллажей, мебели и архивов",
    ],
  },
  hazardous: {
    title: "Утилизация опасных отходов (I–IV класс)",
    description:
      "Сбор, вывоз и утилизация опасных отходов по лицензии. Обеспечиваем полное соответствие требованиям законодательства.",
    variants: [
      "Разработка схемы обращения с отходами",
      "Вывоз и утилизация по утвержденному графику",
      "Полный пакет документов для проверяющих органов",
    ],
  },
  containers: {
    title: "Аренда контейнеров (бункеров)",
    description:
      "Аренда контейнеров 8–27 м³ с возможностью длительного размещения на объекте. Гибкие условия для строек и промпредприятий.",
    variants: [
      "Краткосрочная аренда контейнеров под проект",
      "Долгосрочное размещение контейнеров на объекте",
      "Индивидуальные условия по тарифам и графику вывоза",
    ],
  },
} as const;

type ServiceKey = keyof typeof SERVICE_CONTENT;

const ALL_SERVICE_SLUGS_QUERY = /* GraphQL */ `
  query AllServiceSlugs {
    allServices(orderBy: slug_ASC, first: 100) {
      slug
    }
  }
`;

export async function generateStaticParams() {
  try {
    const data = await performRequest<{ allServices: Array<{ slug: string }> }>({
      query: ALL_SERVICE_SLUGS_QUERY,
      includeDrafts: false,
      isVisualEditing: false,
    });
    return data.allServices
      .map((s) => s.slug)
      .filter(Boolean)
      .map((slug) => ({ slug }));
  } catch {
    // Fallback to local slugs if Dato isn't configured yet
    return Object.keys(SERVICE_CONTENT).map((slug) => ({ slug }));
  }
}

interface ServicePageProps {
  params: { slug: string };
}

const SERVICE_BY_SLUG_QUERY = /* GraphQL */ `
  query ServiceBySlug($slug: String) {
    service(filter: { slug: { eq: $slug } }) {
      title
      description
      slug
    }
  }
`;

type ServiceBySlugQuery = {
  service: { title: string; description?: string | null; slug: string } | null;
};

export default async function ServicePage({ params }: ServicePageProps) {
  const key = params.slug as ServiceKey;
  const cookieStore = await cookies();
  const isDraft = cookieStore.get("datocms-draft")?.value === "true";

  let service:
    | { title: string; description?: string | null; variants?: string[] }
    | null = null;

  try {
    const data = await performRequest<ServiceBySlugQuery>({
      query: SERVICE_BY_SLUG_QUERY,
      variables: { slug: params.slug },
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });

    if (data.service?.title) {
      service = {
        title: data.service.title,
        description: data.service.description ?? "",
      };
    }
  } catch {
    service = null;
  }

  const local = SERVICE_CONTENT[key];
  const resolved = service ?? local;

  if (!resolved) {
    return notFound();
  }

  const related = Object.entries(SERVICE_CONTENT)
    .filter(([k]) => k !== key)
    .slice(0, 3);

  return (
    <SiteLayout>
      <Section
        title={resolved.title}
        subtitle="Подберем подходящий формат вывоза и предложим прозрачный тариф под ваш объем и график."
      >
        <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
          <Card className="space-y-4">
            <p className="text-sm text-slate-200">{resolved.description}</p>
            <div className="space-y-2 text-sm text-slate-200">
              <p className="font-medium">Тарифы и варианты:</p>
              <ul className="space-y-1 text-sm text-slate-300">
                {(local?.variants ?? []).map((v) => (
                  <li key={v}>• {v}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-slate-500">
              Конечная стоимость зависит от объема, класса опасности, удаленности
              объекта и графика работы. Для точного расчета оставьте заявку или
              свяжитесь с менеджером.
            </p>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-50">
              Оставить заявку на услугу
            </h3>
            <form className="flex flex-col gap-2 text-xs">
              <input
                className="h-9 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                placeholder="Имя"
              />
              <input
                className="h-9 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                placeholder="Телефон"
              />
              <textarea
                className="min-h-[80px] rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/60"
                placeholder="Опишите задачу, объем и адрес"
              />
              <button
                type="submit"
                className="mt-1 inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-xs font-medium text-white hover:bg-primary-dark"
              >
                Отправить заявку
              </button>
              <p className="mt-1 text-[11px] leading-snug text-slate-500">
                Менеджер свяжется с вами в ближайшее время, предложит варианты и
                вышлет коммерческое предложение.
              </p>
            </form>
          </Card>
        </div>

        <div className="mt-10">
          <h3 className="text-sm font-semibold text-slate-100">
            Похожие услуги
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map(([key, value]) => (
              <Card key={key} className="space-y-2 text-xs">
                <p className="font-semibold text-slate-50">{value.title}</p>
                <p className="text-slate-400 line-clamp-3">
                  {value.description}
                </p>
                <a
                  href={`/services/${key}`}
                  className="inline-flex text-[11px] font-medium text-primary hover:text-primary-light"
                >
                  Перейти к услуге
                </a>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}

