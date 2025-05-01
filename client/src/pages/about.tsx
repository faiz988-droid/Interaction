import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, Database, BookOpen, Globe, Microscope } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-sans font-bold text-neutral-900 mb-4">
          About plant miRNA and lncRNA interaction
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          A platform for plant miRNA-lncRNA interaction prediction
        </p>
      </header>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-[#2c6e49] mr-3" />
            <h2 className="text-2xl font-semibold">Features</h2>
          </div>
          <ul className="space-y-2 text-neutral-600 list-disc pl-5">
            <li>Advanced prediction tool for miRNA-lncRNA interactions</li>
            <li>Specialized algorithms for plant-specific interactions</li>
          </ul>
        </CardContent>
      </Card>

      <Separator className="my-12" />

      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900">Our Team</h2>
          <p className="text-lg text-neutral-600 mt-2">
            The people behind plant miRNA
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-semibold">Project Overview</h2>
              </div>
              <p className="text-neutral-600 mb-4">
                Plant miRNA is a web application designed for researchers and
                bioinformaticians studying plant genomics, specifically focusing
                on the interactions between microRNAs (miRNAs) and long
                non-coding RNAs (lncRNAs) in plant species.
              </p>
              <p className="text-neutral-600">
                Our platform integrates cutting-edge bioinformatics tools like
                RNAhybrid and Vienna RNA packages to provide accurate
                predictions of miRNA-lncRNA interactions, with a focus on
                expanding beyond model species like Arabidopsis thaliana to
                cover diverse plant genomes.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        <div className="text-center text-neutral-500 text-sm">
          <p>© 2025 plant miRNA. All rights reserved.</p>
          <p className="mt-1">
            Developed for the plant genomics research community.
          </p>
        </div>
      </section>
    </div>
  );
}
