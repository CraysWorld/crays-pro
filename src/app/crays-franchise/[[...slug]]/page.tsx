import { ProExtraPage } from "@/components/crays-franchise/pro-extra-pages";
import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { FranchiseSite } from "@/components/crays-franchise/franchise-site";
import {
  CRAYS_PRO_PUBLIC_METADATA,
  CRAYS_PRO_PUBLIC_ORIGIN,
  getCraysProPublicCanonical,
  getCraysProPublicMetadata,
  type CraysProPublicPath,
} from "@/lib/crays-pro-public-metadata";

const validPages = new Set([
  "",
  "concepts",
  "concepts/gym",
  "concepts/coffee",
  "concepts/clubs",
  "concepts/retail",
  "property-owners",
  "property-owners/submit",
  "franchise-partners",
  "deals",
  "partners",
  "funding-partners",
  "investors",
  "suppliers",
  "how-it-works",
  "login",
]);

const canonicalMetadataPaths = {
  "": "/",
  "coming-soon": "/coming-soon",
  "legal": "/legal",
  "legal/privacy-policy": "/legal/privacy-policy",
  "legal/terms-and-conditions": "/legal/terms-and-conditions",
  "legal/data-protection": "/legal/data-protection",
  "legal/imprint": "/legal/imprint",
  contact: "/contact",
  concepts: "/concepts",
  "concepts/coffee": "/concepts/coffee",
  "concepts/retail": "/concepts/retail",
  "concepts/gym": "/concepts/gym",
  "concepts/clubs": "/concepts/clubs",
  "property-owners": "/real-estate",
  "property-owners/submit": "/real-estate/submit",
  "franchise-partners": "/franchise-partners",
  deals: "/deals",
  partners: "/partners",
  "funding-partners": "/funding-partners",
  investors: "/investors",
  suppliers: "/vendors",
  "how-it-works": "/how-it-works",
  login: "/portal",
} as const satisfies Partial<Record<string, CraysProPublicPath>>;

const breadcrumbNames: Partial<Record<CraysProPublicPath, string>> = {
  "/concepts": "Concepts",
  "/concepts/coffee": "CRAYS Coffee",
  "/concepts/retail": "CRAYS Retail",
  "/concepts/gym": "CRAYS Gym",
  "/concepts/clubs": "CRAYS Clubs",
  "/real-estate": "Real Estate",
  "/franchise-partners": "Franchise Partners",
  "/deals": "Deal Marketplace",
  "/partners": "Partner Ecosystem",
  "/funding-partners": "Funding Partners",
  "/investors": "Investors",
  "/vendors": "Vendors & Contractors",
  "/how-it-works": "How It Works",
};

function getStructuredData(path: CraysProPublicPath) {
  const canonical = getCraysProPublicCanonical(path);
  const page = CRAYS_PRO_PUBLIC_METADATA[path];
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${CRAYS_PRO_PUBLIC_ORIGIN}/#website` },
      about: { "@id": `${CRAYS_PRO_PUBLIC_ORIGIN}/#organization` },
      inLanguage: "en",
    },
  ];

  if (path === "/") {
    graph.push(
      {
        "@type": "WebSite",
        "@id": `${CRAYS_PRO_PUBLIC_ORIGIN}/#website`,
        url: `${CRAYS_PRO_PUBLIC_ORIGIN}/`,
        name: "CRAYS",
        alternateName: "CRAYS Franchise",
        publisher: { "@id": `${CRAYS_PRO_PUBLIC_ORIGIN}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "Organization",
        "@id": `${CRAYS_PRO_PUBLIC_ORIGIN}/#organization`,
        name: "CRAYS",
        alternateName: "CRAYS Franchise",
        url: `${CRAYS_PRO_PUBLIC_ORIGIN}/`,
        logo: `${CRAYS_PRO_PUBLIC_ORIGIN}/favicon.png`,
        description: CRAYS_PRO_PUBLIC_METADATA["/"].description,
      },
    );
  } else {
    const breadcrumbName = breadcrumbNames[path];
    if (breadcrumbName) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "CRAYS", item: `${CRAYS_PRO_PUBLIC_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: breadcrumbName, item: canonical },
        ],
      });
    }
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = slug.join("/");
  const canonicalPath =
    canonicalMetadataPaths[page as keyof typeof canonicalMetadataPaths];

  return canonicalPath ? getCraysProPublicMetadata(canonicalPath) : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const page = slug.join("/");
  if(page === "coming-soon" || page === "contact" || page === "legal" || page.startsWith("legal/")) return <ProExtraPage page={page}/>;
  if(page !== "" && !page.startsWith("concepts")) redirect("/coming-soon");
  if (!validPages.has(page)) notFound();
  const canonicalPath =
    canonicalMetadataPaths[page as keyof typeof canonicalMetadataPaths];
  const structuredData = canonicalPath && canonicalPath !== "/portal" && canonicalPath !== "/real-estate/submit"
    ? getStructuredData(canonicalPath)
    : null;

  return (
    <>
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <FranchiseSite page={page} />
    </>
  );
}
