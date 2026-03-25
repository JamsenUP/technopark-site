import { SiteLayout } from "@/components/layout";
import { Card, Section } from "@/components/ui";
import { performRequest } from "@/lib/datocms";
import { cookies } from "next/headers";

type ServiceCard = {
  slug: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
};

const SERVICES: ServiceCard[] = [
  {
    slug: "construction",
    title: "Утилизация строительного мусора",
    description:
      "Контейнеры 8–27 м³ для утилизации отходов после демонтажа, ремонта и строительства. Работаем с подрядчиками и частными лицами.",
    imageUrl: null,
  },
  {
    slug: "household",
    title: "Утилизация бытовых отходов (КГО)",
    description:
      "Разовая и регулярная утилизация крупногабаритных и бытовых отходов из дворов, ЖК, коммерческих объектов.",
    imageUrl: null,
  },
  {
    slug: "bulky",
    title: "Утилизация крупногабаритного мусора",
    description:
      "Утилизация мебели, техники, оборудования и иных крупногабаритных отходов с последующей утилизацией.",
    imageUrl: null,
  },
  {
    slug: "snow",
    title: "Утилизация снега",
    description:
      "Комплексная уборка и утилизация снега с территорий, парковок и промышленных площадок.",
    imageUrl: null,
  },
  {
    slug: "flat-office",
    title: "Утилизация мусора из квартир и офисов",
    description:
      "Оперативное освобождение квартир, офисов и складов после ремонта, переезда или ликвидации.",
    imageUrl: null,
  },
  {
    slug: "hazardous",
    title: "Утилизация опасных отходов (I–IV класс)",
    description:
      "Работаем по лицензии, обеспечиваем безопасный сбор и утилизацию опасных отходов.",
    imageUrl: null,
  },
  {
    slug: "containers",
    title: "Аренда контейнеров (бункеров)",
    description:
      "Аренда контейнеров 8–27 м³ с возможностью долгосрочного размещения на объекте.",
    imageUrl: null,
  },
];

const ALL_SERVICES_QUERY = /* GraphQL */ `
  query AllServicesPage {
    allServices(orderBy: slug_ASC, first: 100) {
      slug
      title
      description
      serviceimage {
        url
      }
    }
  }
`;

type AllServicesQuery = {
  allServices: Array<{
    slug: string;
    title: string;
    description: string | null;
    serviceimage?: { url?: string | null } | null;
  }>;
};

export default async function ServicesPage() {
  let services = SERVICES;

  const cookieStore = await cookies();
  const isDraft = cookieStore.get("datocms-draft")?.value === "true";

  try {
    const data = await performRequest<AllServicesQuery>({
      query: ALL_SERVICES_QUERY,
      includeDrafts: isDraft,
      isVisualEditing: isDraft,
    });
    const fromDato =
      data.allServices
        ?.filter((s) => s?.slug && s?.title)
        .map((s) => ({
          slug: s.slug,
          title: s.title,
          description: s.description ?? null,
          imageUrl: s.serviceimage?.url ?? null,
        })) ?? [];
    if (fromDato.length) services = fromDato;
  } catch {
    services = SERVICES;
  }

  return (
    <SiteLayout>
      <Section
        title="Услуги компании «ТЕХНОПАРК»"
        subtitle="Выберите услугу, чтобы узнать подробные условия, тарифы и оставить заявку на утилизацию."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
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
                <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                  {service.title}
                </h2>
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
    </SiteLayout>
  );
}

