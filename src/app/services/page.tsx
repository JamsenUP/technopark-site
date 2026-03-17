import { SiteLayout } from "@/components/layout";
import { Card, Section } from "@/components/ui";
import { performRequest } from "@/lib/datocms";

type ServiceCard = {
  slug: string;
  title: string;
  description: string | null;
};

const SERVICES: ServiceCard[] = [
  {
    slug: "construction",
    title: "Вывоз строительного мусора",
    description:
      "Контейнеры 8–27 м³ для вывоза отходов после демонтажа, ремонта и строительства. Работаем с подрядчиками и частными лицами.",
  },
  {
    slug: "household",
    title: "Вывоз бытовых отходов (КГО)",
    description:
      "Разовый и регулярный вывоз крупногабаритных и бытовых отходов из дворов, ЖК, коммерческих объектов.",
  },
  {
    slug: "bulky",
    title: "Вывоз крупногабаритного мусора",
    description:
      "Вывоз мебели, техники, оборудования и иных крупногабаритных отходов с последующей утилизацией.",
  },
  {
    slug: "snow",
    title: "Вывоз снега",
    description:
      "Комплексная уборка и вывоз снега с территорий, парковок и промышленных площадок.",
  },
  {
    slug: "flat-office",
    title: "Вывоз мусора из квартир и офисов",
    description:
      "Оперативное освобождение квартир, офисов и складов после ремонта, переезда или ликвидации.",
  },
  {
    slug: "hazardous",
    title: "Утилизация опасных отходов (I–IV класс)",
    description:
      "Работаем по лицензии, обеспечиваем безопасный сбор, вывоз и утилизацию опасных отходов.",
  },
  {
    slug: "containers",
    title: "Аренда контейнеров (бункеров)",
    description:
      "Аренда контейнеров 8–27 м³ с возможностью долгосрочного размещения на объекте.",
  },
];

const ALL_SERVICES_QUERY = /* GraphQL */ `
  query AllServicesPage {
    allServices(orderBy: slug_ASC, first: 100) {
      slug
      title
      description
    }
  }
`;

type AllServicesQuery = {
  allServices: ServiceCard[];
};

export default async function ServicesPage() {
  let services = SERVICES;
  try {
    const data = await performRequest<AllServicesQuery>({
      query: ALL_SERVICES_QUERY,
      includeDrafts: false,
      isVisualEditing: false,
    });
    const fromDato =
      data.allServices?.filter((s) => s?.slug && s?.title) ?? [];
    if (fromDato.length) services = fromDato;
  } catch {
    services = SERVICES;
  }

  return (
    <SiteLayout>
      <Section
        title="Услуги компании «ТЕХНОПАРК»"
        subtitle="Выберите услугу, чтобы узнать подробные условия, тарифы и оставить заявку на вывоз."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.slug} className="flex flex-col justify-between">
              <div className="space-y-2">
                <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
                  {service.title}
                </h2>
                <p className="text-xs text-slate-400 sm:text-sm">
                  {service.description}
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
    </SiteLayout>
  );
}

