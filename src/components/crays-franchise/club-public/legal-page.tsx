import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { ClubsPublicShell } from "./clubs-public-shell";
import { LegalFamilyNav } from "./legal-family-layout";
import { legalUiCopy, legalDocumentSlugs, getLegalDocumentTitle } from "./legal-copy-v1";
import family from "./legal-family-layout.module.css";
import styles from "./legal-page.module.css";
export function ProLegalPage(){
 const ui=legalUiCopy.en;
 const documents=legalDocumentSlugs.map(slug=>({slug,title:getLegalDocumentTitle("en",slug),href:`/legal/${slug}`}));
 return <ClubsPublicShell>
        <main className={`${styles.main} ${family.root}`} id="legal-main">
          <section className={styles.hero}>
            <div className={styles.heroInner}>
              <p className={styles.eyebrow}>{ui.eyebrow}</p>
              <h1 className={styles.heroTitle}>{ui.hubTitle}</h1>
              <p className={styles.heroIntro}>{ui.hubIntro}</p>
            </div>
          </section>
          <LegalFamilyNav current="legal"/><section className={styles.hubSection} aria-label="Operating Entity"><p>Operating Entity</p><h3>Crays AG</h3><address>Schindellegistrasse 73<br />CH-8808 Pfäffikon<br />Switzerland</address><p>CEO: Kai Thorben Biesenbach</p></section>
          <section
            className={styles.hubSection}
            aria-labelledby="legal-document-index"
          >
            <div className={styles.hubHeading}>
              <p className={styles.sectionKicker}>01 / 04</p>
              <h2 id="legal-document-index">{ui.documentIndex}</h2>
            </div>
            <div className={styles.hubList}>
              {documents.map((item, index) => (
                <Link
                  className={styles.hubEntry}
                  href={item.href}
                  key={item.slug}
                >
                  <span className={styles.hubNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={family.hubTitleGroup}><FileText aria-hidden="true" size={32} strokeWidth={1.5}/><span className={styles.hubEntryTitle}>{item.title}</span></span>
                  <span className={styles.hubAction}>{ui.openDocument}<ArrowRight aria-hidden="true" size={20}/></span>
                </Link>
              ))}
            </div>
          </section>
        </main>
</ClubsPublicShell>;
}
