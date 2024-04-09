import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UNIHIVE",
  description: "Plataforma de gerenciamento acadêmico para universidades.",
  keywords: [
    "universidade",
    "gerenciamento acadêmico",
    "ensino superior",
    "educação",
    "plataforma",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className={montserrat.className}>
          <Toaster position="top-right" reverseOrder={false} />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
