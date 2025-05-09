import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FunctionSquare,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-[#2c6e49] rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-sans font-bold mb-4">
              plant miRNA and lncRNA interaction
            </h1>
            <p className="text-lg mb-6">
              Predict potential new interactions between microRNA and long
              non-coding RNA in Arabidopsis thaliana with our specialized tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/predict">
                <Button className="flex items-center bg-[#1e4a31] hover:bg-opacity-90">
                     Prediction Tool
                  <FunctionSquare className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-[#2c6e49] mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M4 18V12.5A2.5 2.5 0 0 1 6.5 10H10" />
                <path d="M4 12v-1.5A2.5 2.5 0 0 1 6.5 8H10" />
                <rect width="8" height="8" x="12" y="12" rx="2" />
                <path d="M12 12V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
              </svg>
            </div>
            <h3 className="text-xl font-sans font-semibold mb-2">
              Plant miRNA and lncRNA Interaction
            </h3>
            <p className="text-neutral-700">
              Access a curated collection of experimentally validated and
              computationally predicted miRNA-lncRNA interactions in Arabidopsis
              thaliana, focusing on plant-specific regulatory mechanisms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-[#2c6e49] mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h3 className="text-xl font-sans font-semibold mb-2">
              Prediction Algorithm
            </h3>
            <p className="text-neutral-700">
              Utilize our specialized algorithm for predicting miRNA-lncRNA
              interactions based on sequence complementarity features specific
              to plant RNA interactions.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Section */}
      <section className="bg-neutral-100 rounded-lg p-6">
        <h2 className="text-2xl font-sans font-semibold mb-6 text-center">
          Database at a Glance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-[#2c6e49] text-3xl font-bold mb-2">342</div>
            <div className="text-neutral-700">miRNAs</div>
          </div>
          <div className="text-center p-4">
            <div className="text-[#2c6e49] text-3xl font-bold mb-2">1,256</div>
            <div className="text-neutral-700">lncRNAs</div>
          </div>
          <div className="text-center p-4">
            <div className="text-[#2c6e49] text-3xl font-bold mb-2">5,721</div>
            <div className="text-neutral-700">Interactions</div>
          </div>
          <div className="text-center p-4">
            <div className="text-[#2c6e49] text-3xl font-bold mb-2">78%</div>
            <div className="text-neutral-700">Experimentally validated</div>
          </div>
        </div>
      </section>
    </div>
  );
}
