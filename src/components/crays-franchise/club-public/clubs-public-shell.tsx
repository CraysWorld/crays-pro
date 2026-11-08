import type { ReactNode } from "react";
import { FranchiseShell } from "../franchise-shell";
export function ClubsPublicShell({children}:{children:ReactNode;availableLocales?:readonly string[];headerTone?:string;locale?:string}){return <FranchiseShell>{children}</FranchiseShell>}
