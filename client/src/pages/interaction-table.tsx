import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Trash2 } from "lucide-react";

interface StoredPrediction {
  id: string;
  timestamp: string;
  metadata?: {
    ip?: string;
    userAgent?: string;
  };
  mirnaSequence: string;
  lncrnaSequence: string;
  score: number;
  alignment: string;
  bindingStart: number;
  bindingEnd: number;
  mirnaName?: string;
  lncrnaName?: string;
  bindingDetails: {
    seedMatch: string;
    complementaryPairs: string;
    mismatches: number;
    guWobblePairs: number;
    bulges: number;
  };
  thermodynamics: {
    freeEnergy: number;
    stabilityScore: string;
    accessibility: number;
    localStructure: string;
  };
}

// Inspection Dialog Component
function InspectionDialog({ prediction }: { prediction: StoredPrediction }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Prediction Details</DialogTitle>
          <DialogDescription>
            Detailed view of prediction results including technical information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-medium">Date</div>
            <div>{new Date(prediction.timestamp).toLocaleString()}</div>
            
            <div className="font-medium">Client IP</div>
            <div>{prediction.metadata?.ip || 'Not available'}</div>
            
            <div className="font-medium">Score</div>
            <div>{prediction.score}</div>
            
            <div className="font-medium">Algorithm</div>
            <div>
              {prediction.thermodynamics.localStructure?.includes('RNAhybrid')
                ? 'RNAhybrid'
                : prediction.thermodynamics.localStructure?.includes('RNAfold')
                ? 'Vienna RNAfold'
                : 'Standard Algorithm'}
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Sequences</h4>
            <div className="bg-neutral-50 p-3 rounded-md space-y-2">
              <div>
                <div className="text-xs text-neutral-500">miRNA Sequence</div>
                <div className="font-mono text-sm">{prediction.mirnaSequence}</div>
              </div>
              <div>
                <div className="text-xs text-neutral-500">lncRNA Sequence</div>
                <div className="font-mono text-sm">{prediction.lncrnaSequence}</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">Technical Details</h4>
            <div className="bg-neutral-50 p-3 rounded-md">
              <div className="font-mono text-xs whitespace-pre-wrap overflow-auto max-h-[200px]">
                {JSON.stringify({
                  bindingDetails: prediction.bindingDetails,
                  thermodynamics: prediction.thermodynamics,
                  metadata: prediction.metadata
                }, null, 2)}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
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

const deletePrediction = (id: string, predictions: StoredPrediction[], setPredictions: React.Dispatch<React.SetStateAction<StoredPrediction[]>>) => {
  const updatedPredictions = predictions.filter(pred => pred.id !== id);
  localStorage.setItem("predictions", JSON.stringify(updatedPredictions));
  setPredictions(updatedPredictions);
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
          <h2 className="text-2xl font-bold text-center">Interaction History</h2>
          <p className="text-neutral-600 text-center">View your recent miRNA-lncRNA interaction predictions</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Score</TableHead>
                  <TableHead>Sequences</TableHead>
                  <TableHead className="w-[200px]">Binding</TableHead>
                  <TableHead className="w-[150px]">Energy</TableHead>
                  <TableHead className="w-[150px]">Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {predictions.length > 0 ? (
                  predictions.map((pred) => (
                    <TableRow key={pred.id}>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-white text-xs font-medium w-fit ${
                          pred.score >= 70 ? "bg-green-600" :
                          pred.score >= 50 ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}>
                          {pred.score}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-neutral-500">miRNA:</span>{" "}
                            <span className="font-mono">
                              {pred.mirnaSequence.length > 20
                                ? `${pred.mirnaSequence.slice(0, 20)}...`
                                : pred.mirnaSequence}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-neutral-500">lncRNA:</span>{" "}
                            <span className="font-mono">
                              {pred.lncrnaSequence.length > 20
                                ? `${pred.lncrnaSequence.slice(0, 20)}...`
                                : pred.lncrnaSequence}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>Match: {pred.bindingDetails.complementaryPairs}</div>
                          <div>Mismatches: {pred.bindingDetails.mismatches}</div>
                          <div>Region: {pred.bindingStart + 1}-{pred.bindingEnd}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div>{pred.thermodynamics.freeEnergy.toFixed(1)} kcal/mol</div>
                          <div className="text-neutral-500">
                            {pred.thermodynamics.stabilityScore}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(pred.timestamp).toLocaleDateString()}
                          <div className="text-xs text-neutral-500">
                            {new Date(pred.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <InspectionDialog prediction={pred} />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => deletePrediction(pred.id, predictions, setPredictions)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
