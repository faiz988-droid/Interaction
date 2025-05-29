import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from "@/components/ui/table";
import type { PredictionResult } from "@shared/schema";

interface StoredPrediction extends PredictionResult {
  timestamp: string;
  id: string;
}

// Helper function to load predictions from localStorage
const loadStoredPredictions = (): StoredPrediction[] => {
  try {
    const stored = localStorage.getItem("predictions");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load predictions:", error);
    return [];
  }
};

export default function InteractionTablePage() {
  const [predictions, setPredictions] = useState<StoredPrediction[]>([]);

  useEffect(() => {
    setPredictions(loadStoredPredictions());
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">lncRNA - miRNA Interaction History</h2>
          <p className="text-neutral-600 text-center">View your recent predictions and analysis results</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Score</TableHead>
                  <TableHead>miRNA Sequence</TableHead>
                  <TableHead>lncRNA Sequence</TableHead>
                  <TableHead>Binding Details</TableHead>
                  <TableHead>Energy</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictions.length > 0 ? (
                  predictions.map((pred) => (
                    <TableRow key={pred.id} className="hover:bg-neutral-50">
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-white text-sm ${
                          pred.score >= 70 ? "bg-green-600" :
                          pred.score >= 50 ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}>
                          {pred.score}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        <div className="flex flex-col">
                          <span>{pred.mirnaName || "Custom sequence"}</span>
                          <span className="opacity-60">
                            {pred.mirnaSequence.length > 20
                              ? `${pred.mirnaSequence.slice(0, 20)}...`
                              : pred.mirnaSequence}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        <div className="flex flex-col">
                          <span>{pred.lncrnaName || "Custom sequence"}</span>
                          <span className="opacity-60">
                            {pred.lncrnaSequence.length > 20
                              ? `${pred.lncrnaSequence.slice(0, 20)}...`
                              : pred.lncrnaSequence}
                          </span>
                          <span className="text-xs text-neutral-500">
                            Position: {pred.bindingStart + 1}-{pred.bindingEnd}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <span>Match: {pred.bindingDetails.complementaryPairs}</span>
                          <span>Mismatches: {pred.bindingDetails.mismatches}</span>
                          <span>G:U pairs: {pred.bindingDetails.guWobblePairs}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex flex-col">
                          <span>{pred.thermodynamics.freeEnergy.toFixed(1)} kcal/mol</span>
                          <span className="text-neutral-500">
                            {pred.thermodynamics.stabilityScore} stability
                          </span>
                          <span className="text-neutral-500">
                            {(pred.thermodynamics.accessibility * 100).toFixed(0)}% accessible
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex flex-col">
                          <span>{new Date(pred.timestamp).toLocaleDateString()}</span>
                          <span className="text-neutral-500">
                            {new Date(pred.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="text-neutral-500">No predictions yet</div>
                      <div className="text-sm text-neutral-400 mt-1">
                        Make predictions using the prediction tool to see them here
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
