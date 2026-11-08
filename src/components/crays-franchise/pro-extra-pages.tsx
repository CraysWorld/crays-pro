import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FranchiseShell } from "./franchise-shell";
import { ClubsContactPage } from "./club-public/clubs-contact-page";
import { ClubsPrivacyPolicyPage } from "./club-public/clubs-privacy-policy-page";
import { ImprintPage } from "./club-public/imprint-page";
import { DataProtectionPage } from "./club-public/data-protection-page";
import { TermsAndConditionsPage } from "./club-public/legal/terms-and-conditions-page";
import { ProLegalPage } from "./club-public/legal-page";
import styles from "./franchise-site.module.css";
export function ProExtraPage({page}:{page:string}){
 if(page==="contact")return <ClubsContactPage locale="en"/>;
 if(page==="legal/privacy-policy")return <ClubsPrivacyPolicyPage/>;
 if(page==="legal/imprint")return <ImprintPage/>;
 if(page==="legal/data-protection")return <DataProtectionPage/>;
 if(page==="legal/terms-and-conditions")return <TermsAndConditionsPage/>;
 if(page==="legal")return <ProLegalPage/>;
 return <FranchiseShell><div className={styles.site}><section className={styles.proSoonHero}><Image src="/assets/images/crays-pro-20261012/coming-soon-community.png" fill priority sizes="100vw" alt="The CRAYS community together in front of the CRAYS building"/><div><p className={styles.proKicker}>CRAYS PRO</p><h1>Coming soon.</h1><p>We&apos;re preparing your next chapter.<br/>More from CRAYS is on the way.</p><Link className={styles.proPrimary} href="/">Back to CRAYS<ArrowRight aria-hidden="true"/></Link></div></section></div></FranchiseShell>;
}
