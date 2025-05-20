import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Database, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-sans font-bold text-neutral-900 mb-4">
          About Plant miRNA and lncRNA interaction
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          A platform for Plant miRNA-lncRNA interaction prediction
        </p>
      </header>

      <section className="mb-12 grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-[#2c6e49] mr-3" />
              <h2 className="text-2xl font-semibold">Project Overview</h2>
            </div>
            <p className="text-neutral-600">
              Plant miRNA and lncRNA interaction database is a web application designed for researchers and
              bioinformaticians studying plant genomics, specifically focusing
              on the interactions between microRNAs (miRNAs) and long non-coding
              RNAs (lncRNAs) in plant species.
            </p>
            <p className="text-neutral-600">
              Our platform integrates cutting-edge bioinformatics tools like
              RNAhybrid and Vienna RNA packages to provide accurate predictions
              of miRNA-lncRNA interactions, with a focus on expanding beyond
              model species like Arabidopsis thaliana to cover diverse plant
              genomes.
            </p>
          </CardContent>
        </Card>
      </section>

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
    </div>
  );
}
