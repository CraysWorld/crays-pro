import Link from "next/link";

import styles from "./franchise-footer.module.css";

export const franchiseFooterConcepts = [
  { label: "Compare All Concepts", href: "/concepts" },
  { label: "Coffee Franchise Concept", href: "/concepts/coffee" },
  { label: "Retail Franchise Concept", href: "/concepts/retail" },
  { label: "Gym Franchise Concept", href: "/concepts/gym" },
  { label: "Clubs Franchise Concept", href: "/concepts/clubs" },
] as const;

export const franchiseFooterStakeholders = [
  { label: "Real Estate Owners", href: "/coming-soon" },
  { label: "Franchise Partners", href: "/coming-soon" },
  { label: "Deal Marketplace", href: "/coming-soon" },
  { label: "Funding Partners", href: "/coming-soon" },
  { label: "Vendors & Contractors", href: "/coming-soon" },
] as const;

export const franchiseFooterSupport = [
  {label:"Contact",href:"/contact"},
  {label:"Legal",href:"/legal"},
  {label:"Imprint",href:"/legal/imprint"},
] as const;

type InternalFooterGroupProps = {
  label: string;
  items: readonly { label: string; href: string }[];
};

function InternalFooterGroup({ label, items }: InternalFooterGroupProps) {
  const headingId = `crays-pro-footer-${label
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("&", "and")}`;

  return (
    <nav className={styles.group} aria-labelledby={headingId}>
      <h2 className={styles.groupHeading} id={headingId}>
        {label}
      </h2>
      <ol className={styles.linkList}>
        {items.map((item) => (
          <li key={item.label}>
            <Link className={styles.footerLink} href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type FranchiseFooterLegalOwner =
  | { status: "confirmed"; text: string }
  | { status: "pending"; placeholder?: string };

export function FranchiseFooter() {
  return (
    <footer className={styles.footer} aria-label="CRAYS.pro footer">
      <div className={styles.inner}>
        <Link
          className={styles.logoLink}
          href="/"
          aria-label="CRAYS.pro home"
        >
          {/* The approved local light-surface master is not LCP content. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/assets/images/crays-franchise/crays-logo-light.svg"
            alt=""
            width={172}
            height={43}
          />
        </Link>

        <div className={styles.columns}>
          <InternalFooterGroup
            label="CONCEPTS"
            items={franchiseFooterConcepts}
          />
          <InternalFooterGroup
            label="STAKEHOLDERS"
            items={franchiseFooterStakeholders}
          />
          <div className={styles.thirdColumn}>
            <InternalFooterGroup
              label="SUPPORT & LEGAL"
              items={franchiseFooterSupport}
            />


          </div>
        </div>

      </div>
    </footer>
  );
}
