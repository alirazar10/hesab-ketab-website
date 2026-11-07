import type { Metadata, Viewport } from "next";
import { Document, localeMetadata } from "@/components/document";

export const generateMetadata = (): Promise<Metadata> => localeMetadata("fa");

export const viewport: Viewport = { themeColor: "#00796b" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document locale="fa">{children}</Document>;
}
