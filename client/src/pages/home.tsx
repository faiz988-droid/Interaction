import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FunctionSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Section */}
      <div className="relative">
        <div className="bg-[#2c6e49] rounded-xl p-8 text-white">
          <div className="max-w-3xl">            <h1 className="text-3xl md:text-4xl font-sans font-bold mb-4">
              Plant miRNA and lncRNA interaction
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

      {/* Introduction Card */}
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
      </div>
    </div>
  );
}
