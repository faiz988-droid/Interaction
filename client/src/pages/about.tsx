import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sprout, Users, Database, BookOpen, Globe, Microscope } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-sans font-bold text-neutral-900 mb-4">About PlantmiRNA</h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          A comprehensive platform for plant miRNA-lncRNA interaction prediction and analysis
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Sprout className="h-6 w-6 text-[#2c6e49] mr-3" />
              <h2 className="text-2xl font-semibold">Project Overview</h2>
            </div>
            <p className="text-neutral-600 mb-4">
              PlantmiRNA is a web application designed for researchers and bioinformaticians studying 
              plant genomics, specifically focusing on the interactions between microRNAs (miRNAs) and 
              long non-coding RNAs (lncRNAs) in plant species.
            </p>
            <p className="text-neutral-600">
              Our platform integrates cutting-edge bioinformatics tools like RNAhybrid and Vienna RNA 
              packages to provide accurate predictions of miRNA-lncRNA interactions, with a focus on 
              expanding beyond model species like Arabidopsis thaliana to cover diverse plant genomes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-[#2c6e49] mr-3" />
              <h2 className="text-2xl font-semibold">Features</h2>
            </div>
            <ul className="space-y-2 text-neutral-600 list-disc pl-5">
              <li>Browse extensive database of known miRNA-lncRNA interactions</li>
              <li>Advanced prediction tool integrating RNAhybrid and ViennaRNA algorithms</li>
              <li>Visualization of binding sites and secondary structures</li>
              <li>Search functionality to find interactions by RNA names, genes, or other criteria</li>
              <li>Downloadable results for further analysis</li>
              <li>REST API for programmatic access to prediction tools</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900">Our Team</h2>
          <p className="text-lg text-neutral-600 mt-2">The people behind PlantmiRNA</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#4da375] text-white flex items-center justify-center mb-4">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Muskan</h3>
                <p className="text-sm text-neutral-500 mt-1">Project Lead & Developer</p>
                <p className="text-neutral-600 mt-4">
                  Leading the development of PlantmiRNA with expertise in plant genomics and RNA biology
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#4da375] text-white flex items-center justify-center mb-4">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Research Collaborators</h3>
                <p className="text-sm text-neutral-500 mt-1">Scientific Advisors</p>
                <p className="text-neutral-600 mt-4">
                  Plant genomics researchers providing domain expertise and validation of prediction algorithms
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#4da375] text-white flex items-center justify-center mb-4">
                  <Globe className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">Open Source Community</h3>
                <p className="text-sm text-neutral-500 mt-1">Contributors</p>
                <p className="text-neutral-600 mt-4">
                  Developers and researchers contributing to improve the platform's capabilities
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900">Technology</h2>
          <p className="text-lg text-neutral-600 mt-2">Powered by state-of-the-art tools</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Microscope className="h-6 w-6 text-[#2c6e49] mr-3" />
                  <h3 className="text-xl font-semibold">Bioinformatics Tools</h3>
                </div>
                <ul className="space-y-2 text-neutral-600 list-disc pl-5">
                  <li><strong>RNAhybrid</strong> - Specialized for miRNA target prediction</li>
                  <li><strong>Vienna RNA Package</strong> - RNA secondary structure prediction</li>
                  <li><strong>Custom alignment algorithms</strong> - For plant-specific interactions</li>
                </ul>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="h-6 w-6 text-[#2c6e49] mr-3 flex items-center justify-center font-bold">&lt;/&gt;</div>
                  <h3 className="text-xl font-semibold">Development Stack</h3>
                </div>
                <ul className="space-y-2 text-neutral-600 list-disc pl-5">
                  <li><strong>Frontend</strong>: React, TypeScript, Tailwind CSS</li>
                  <li><strong>Backend</strong>: Node.js, Express</li>
                  <li><strong>Storage</strong>: PostgreSQL compatible database</li>
                  <li><strong>API</strong>: RESTful architecture</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="text-center text-neutral-500 text-sm">
        <p>© 2025 PlantmiRNA. All rights reserved.</p>
        <p className="mt-1">Developed with ❤️ for the plant genomics research community.</p>
      </div>
    </div>
  );
}