import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Neon Wave : Your Todo List",
  description: "Todo List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div> {children}</div>;
}
