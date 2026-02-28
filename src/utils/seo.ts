type SchemaNode = Record<string, unknown>;

export const DEFAULT_SITE_ORIGIN = "https://www.el-ensueno.com";

export const HOTEL_PROFILE = {
  name: "El Ensueño",
  alternateName: "El Ensueno",
  logoPath: "/logo/el-ensueno-logo.webp",
  email: "sales.reservations@lacasaquecanta.com",
  reservationsPhone: "+52 755 555 7000",
  salesPhone: "+52 55 2564 1838",
  tripAdvisorUrl:
    "https://www.tripadvisor.com/ShowUserReviews-g150795-d152932-r121555894-La_Casa_Que_Canta-Zihuatanejo_Pacific_Coast.html",
  address: {
    streetAddress: "Camino Escénico a Playa La Ropa S/N",
    addressLocality: "Zihuatanejo",
    addressRegion: "Guerrero",
    postalCode: "40880",
    addressCountry: "MX",
  },
  geo: {
    latitude: 17.6398,
    longitude: -101.5548,
  },
} as const;

export function getSiteOrigin(site?: URL | string): string {
  const raw = typeof site === "string" ? site : site?.toString();
  return (raw ?? DEFAULT_SITE_ORIGIN).replace(/\/+$/, "");
}

export function withTrailingSlash(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return `${pathname.replace(/\/+$/, "")}/`;
}

export function absoluteUrl(pathname: string, site?: URL | string): string {
  const origin = getSiteOrigin(site);
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, `${origin}/`).toString();
}

function stripContext(schema: SchemaNode): SchemaNode {
  const { "@context": _context, ...rest } = schema;
  return rest;
}

export function normalizeSchemaGraph(
  schema?: SchemaNode | SchemaNode[],
): SchemaNode[] {
  if (!schema) {
    return [];
  }

  const items = Array.isArray(schema) ? schema : [schema];

  return items
    .flatMap((item) => {
      const graph = item["@graph"];
      if (Array.isArray(graph)) {
        return graph
          .filter((entry): entry is SchemaNode => Boolean(entry) && typeof entry === "object")
          .map((entry) => stripContext(entry));
      }

      return [stripContext(item)];
    })
    .filter((entry) => Object.keys(entry).length > 0);
}

export function buildOrganizationSchema(site?: URL | string): SchemaNode {
  const origin = getSiteOrigin(site);

  return {
    "@type": "LodgingBusiness",
    "@id": `${origin}/#organization`,
    name: HOTEL_PROFILE.name,
    alternateName: HOTEL_PROFILE.alternateName,
    url: `${origin}/`,
    logo: absoluteUrl(HOTEL_PROFILE.logoPath, site),
    image: absoluteUrl(HOTEL_PROFILE.logoPath, site),
    telephone: HOTEL_PROFILE.reservationsPhone,
    email: HOTEL_PROFILE.email,
    address: {
      "@type": "PostalAddress",
      ...HOTEL_PROFILE.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...HOTEL_PROFILE.geo,
    },
    sameAs: [HOTEL_PROFILE.tripAdvisorUrl],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        telephone: HOTEL_PROFILE.reservationsPhone,
        email: HOTEL_PROFILE.email,
        availableLanguage: ["en", "es"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: HOTEL_PROFILE.salesPhone,
        email: HOTEL_PROFILE.email,
        availableLanguage: ["en", "es"],
      },
    ],
  };
}

export function buildWebSiteSchema(site?: URL | string): SchemaNode {
  const origin = getSiteOrigin(site);

  return {
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    url: `${origin}/`,
    name: HOTEL_PROFILE.name,
    description: "Intimate four-suite boutique hotel on La Ropa Beach, Zihuatanejo",
    publisher: {
      "@id": `${origin}/#organization`,
    },
    inLanguage: ["en-US", "es-MX"],
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  site?: URL | string,
): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url, site),
    })),
  };
}
