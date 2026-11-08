import type {Metadata} from "next";
import {AccountEntry} from "@/components/aws-account/AccountEntry";
import {FranchiseShell} from "@/components/crays-franchise/franchise-shell";
import styles from "./pro-account-frame.module.css";

export const metadata: Metadata = {
  title: "Account & Sign-in | CRAYS",
  description: "Secure access to your CRAYS account and authorized services.",
};

export default function AccountPage() {
  return <FranchiseShell contentElement="div">
    <div className={styles.frame}><AccountEntry locale="en" header={null} links={{
      login: "https://member.crays.world/auth/login",
      signup: "https://member.crays.world/auth/login?screen_hint=signup",
      team: "https://member.crays.world/work/auth/login",
    }}/></div>
  </FranchiseShell>;
}
