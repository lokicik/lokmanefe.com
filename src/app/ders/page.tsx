import { Metadata } from "next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Ders Notları",
  description: "Final ders notları ve çalışma özetleri.",
  alternates: {
    canonical: "/ders",
  },
};

type Ders = {
  title: string;
  description: string;
  href: string;
};

const dersler: Ders[] = [
  {
    title: "Veri Analizi - Final",
    description: "SAS Programlama - Kapsamlı Ders Notları",
    href: "/ders/Veri%20Analizi%20-%20Final.html",
  },
  {
    title: "BTSE - Final",
    description: "BTSE Final – Çalışma Notu",
    href: "/ders/btse-final.html",
  },
  {
    title: "YSA - Final",
    description: "YSA Final Özeti — 8. Hafta ve Sonrası",
    href: "/ders/ysa_final_ozeti.html",
  },
];

export default function DerslerPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Ders Notları</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Final çalışma notları ve özetleri. Aşağıdaki dersi seçerek notu açın.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
        {dersler.map((ders) => (
          <a key={ders.href} href={ders.href} className="group block">
            <Card className="transition-colors hover:border-primary hover:bg-accent/40">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      {ders.title}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </CardTitle>
                    <CardDescription>{ders.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
