import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from "@/components/ui/table";
import { type PredictionResult } from "@shared/schema";

interface InteractionTableProps {
  interactions: PredictionResult[];
}

export function InteractionTable({ interactions }: InteractionTableProps) {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">lncRNA - miRNA Interaction Data</h2>
          <p className="text-neutral-600 text-center">Showing both database entries and prediction results</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>miRNA</TableHead>
                  <TableHead>lncRNA</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Binding Site</TableHead>
                  <TableHead>Pattern</TableHead>
                  <TableHead>Energy (kcal/mol)</TableHead>
                  <TableHead>Stability</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interactions.map((interaction, idx) => (
                  <TableRow key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-neutral-50"}>
                    <TableCell>{interaction.algorithm || "standard"}</TableCell>
                    <TableCell className="font-mono text-sm">
                      <div className="flex flex-col">
                        <span>{interaction.mirnaName || "Unknown"}</span>
                        <span className="opacity-60">{interaction.mirnaSequence}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      <div className="flex flex-col">
                        <span>{interaction.lncrnaName || "Unknown"}</span>
                        <span className="opacity-60">{interaction.lncrnaSequence}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-white text-sm ${
                        interaction.score >= 70 ? "bg-green-600" :
                        interaction.score >= 50 ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}>
                        {interaction.score}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {interaction.alignment?.split('\n')[0] || "-"}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {interaction.alignment?.split('\n')[1] || "-"}
                    </TableCell>
                    <TableCell>{interaction.thermodynamics?.freeEnergy.toFixed(2) || "-"}</TableCell>
                    <TableCell>{interaction.thermodynamics?.stabilityScore || "-"}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex flex-col gap-1">
                        <span>{interaction.thermodynamics?.accessibility.toFixed(2)} accessibility</span>
                        {interaction.bindingDetails && (
                          <>
                            <span>{interaction.bindingDetails.complementaryPairs} pairs</span>
                            <span>{interaction.bindingDetails.mismatches} mismatches</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
