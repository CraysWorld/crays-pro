import "@/components/crays-franchise/club-public/legal/terms-and-conditions-page.module.css";
import "@/components/crays-franchise/club-public/data-protection-page.module.css";
import "@/components/crays-franchise/club-public/clubs-privacy-policy-page.module.css";
import "@/components/crays-franchise/club-public/imprint-page.module.css";
import "@/components/crays-franchise/club-public/legal-page.module.css";
import "@/components/crays-franchise/club-public/legal-family-layout.module.css";
import "@/components/crays-franchise/club-public/contact-screen-one.module.css";
import "@/components/crays-franchise/franchise-site.module.css";
import type { Metadata } from "next";
import { CRAYS_PRO_PUBLIC_ORIGIN } from "@/lib/crays-pro-public-metadata";

export const metadata: Metadata = {
  metadataBase: new URL(CRAYS_PRO_PUBLIC_ORIGIN),
  title: {
    default: "CRAYS Franchise — One property. Four possibilities.",
    template: "%s — CRAYS Franchise",
  },
  description:
    "CRAYS matches properties, franchise partners and capital across four connected concepts.",
  applicationName: "CRAYS",
  creator: "CRAYS",
  publisher: "CRAYS",
  category: "business",
  formatDetection: { telephone: false, email: false, address: false },
};

export default function CraysFranchiseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
