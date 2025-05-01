import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Radar, Download, RefreshCw, Settings } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { type PredictionResult } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { highlightBindingSite } from "@/lib/alignment";

export default function PredictPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("input-sequences");
  const [mismatchPenalty, setMismatchPenalty] = useState(3);
  
  // Form state
  const [formData, setFormData] = useState({
    mirnaSequence: "UGAAGCUGCCAGCAUGAUCUA", // miR167a example
    lncrnaSequence: "UGAUCGAUGAGUAUGGCGUUGAUGAUCUCAGGCAUAGCGGGAGCGC",
    seedRegion: "2-7",
    scoreThreshold: "50",
    algorithm: "standard",
    guWobble: "allowed",
  });
  
  // Result state
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  // Mutation for prediction API
  const {
    mutate: runPrediction,
    isPending
  } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest(
        "POST", 
        "/api/predict", 
        {
          ...formData,
          mismatchPenalty
        }
      );
      return res.json();
    },
    onSuccess: (data: PredictionResult) => {
      setPredictionResult(data);
      toast({
        title: "Prediction complete",
        description: `Interaction predicted with score: ${data.score}/100`,
      });
    },
    onError: (error) => {
      toast({
        title: "Prediction failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runPrediction();
  };

  // Handle new prediction
  const handleNewPrediction = () => {
    setPredictionResult(null);
  };

  // Handle download results
  const handleDownloadResults = () => {
    if (!predictionResult) return;
    
    const dataStr = JSON.stringify(predictionResult, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'prediction_results.json');
    linkElement.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-sans font-bold text-neutral-900 mb-2">
          miRNA-lncRNA Interaction Prediction Tool
        </h1>
        <p className="text-neutral-700">
          Predict potential interactions between miRNAs and lncRNAs by entering or uploading sequences.
        </p>
      </div>

      {!predictionResult ? (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sequence Input Tabs */}
              <div>
                <Tabs defaultValue="input-sequences" value={activeTab} onValueChange={setActiveTab}>
                  <div className="border-b border-neutral-200 mb-4">
                    <TabsList className="bg-transparent border-b h-auto p-0">
                      <TabsTrigger 
                        value="input-sequences"
                        className="data-[state=active]:border-[#2c6e49] data-[state=active]:text-[#2c6e49] rounded-none border-b-2 border-transparent px-1 py-2"
                      >
                        Enter Sequences
                      </TabsTrigger>
                      <TabsTrigger 
                        value="upload-files"
                        className="data-[state=active]:border-[#2c6e49] data-[state=active]:text-[#2c6e49] rounded-none border-b-2 border-transparent px-1 py-2"
                      >
                        Upload FASTA Files
                      </TabsTrigger>
                      <TabsTrigger 
                        value="select-database"
                        className="data-[state=active]:border-[#2c6e49] data-[state=active]:text-[#2c6e49] rounded-none border-b-2 border-transparent px-1 py-2"
                      >
                        Select from Database
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="input-sequences" className="mt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="mirnaSequence" className="text-sm font-medium text-neutral-700 mb-1">
                          miRNA Sequence
                        </Label>
                        <Textarea 
                          id="mirnaSequence"
                          name="mirnaSequence"
                          placeholder="Enter miRNA sequence (5'-3')"
                          className="font-mono h-24"
                          value={formData.mirnaSequence}
                          onChange={handleInputChange}
                        />
                        <p className="mt-1 text-sm text-neutral-500">
                          Example: UGAAGCUGCCAGCAUGAUCUA (miR167a)
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="lncrnaSequence" className="text-sm font-medium text-neutral-700 mb-1">
                          lncRNA Sequence
                        </Label>
                        <Textarea 
                          id="lncrnaSequence"
                          name="lncrnaSequence"
                          placeholder="Enter lncRNA sequence fragment (5'-3')"
                          className="font-mono h-24"
                          value={formData.lncrnaSequence}
                          onChange={handleInputChange}
                        />
                        <p className="mt-1 text-sm text-neutral-500">
                          Enter full sequence or a specific region of interest
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="upload-files" className="mt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="mirna-file" className="text-sm font-medium text-neutral-700 mb-1">
                          miRNA FASTA File
                        </Label>
                        <div className="border-2 border-dashed border-neutral-300 rounded-md px-6 py-8 text-center">
                          <div className="space-y-2">
                            <p className="text-sm text-neutral-500">
                              Upload a FASTA file containing miRNA sequences
                            </p>
                            <Button variant="outline" disabled className="mt-2">
                              Select File
                            </Button>
                          </div>
                          <p className="mt-2 text-xs text-neutral-500">
                            (Feature coming soon)
                          </p>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="lncrna-file" className="text-sm font-medium text-neutral-700 mb-1">
                          lncRNA FASTA File
                        </Label>
                        <div className="border-2 border-dashed border-neutral-300 rounded-md px-6 py-8 text-center">
                          <div className="space-y-2">
                            <p className="text-sm text-neutral-500">
                              Upload a FASTA file containing lncRNA sequences
                            </p>
                            <Button variant="outline" disabled className="mt-2">
                              Select File
                            </Button>
                          </div>
                          <p className="mt-2 text-xs text-neutral-500">
                            (Feature coming soon)
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="select-database" className="mt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="mirna-db" className="text-sm font-medium text-neutral-700 mb-1">
                          Select miRNA from Database
                        </Label>
                        <Select disabled>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a miRNA" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mir167a">ath-miR167a</SelectItem>
                            <SelectItem value="mir156a">ath-miR156a</SelectItem>
                            <SelectItem value="mir319a">ath-miR319a</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="mt-1 text-sm text-neutral-500">
                          (Feature coming soon)
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="lncrna-db" className="text-sm font-medium text-neutral-700 mb-1">
                          Select lncRNA from Database
                        </Label>
                        <Select disabled>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a lncRNA" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blil1">BLIL1</SelectItem>
                            <SelectItem value="elena1">ELENA1</SelectItem>
                            <SelectItem value="coldair">COLDAIR</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="mt-1 text-sm text-neutral-500">
                          (Feature coming soon)
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Prediction Parameters */}
              <div className="bg-neutral-50 p-4 rounded-md">
                <div className="flex items-center mb-4">
                  <Settings className="text-[#2c6e49] mr-2 h-4 w-4" />
                  <h3 className="text-sm font-medium text-neutral-900">Prediction Parameters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="seedRegion" className="text-sm font-medium text-neutral-700 mb-1">
                      Seed Region
                    </Label>
                    <Select 
                      defaultValue={formData.seedRegion}
                      onValueChange={(value) => setFormData({...formData, seedRegion: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="2-7 (Default)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-7">2-7 (Default)</SelectItem>
                        <SelectItem value="2-8">2-8 (Extended)</SelectItem>
                        <SelectItem value="1-7">1-7 (Alternative)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="scoreThreshold" className="text-sm font-medium text-neutral-700 mb-1">
                      Score Threshold
                    </Label>
                    <Select 
                      defaultValue={formData.scoreThreshold}
                      onValueChange={(value) => setFormData({...formData, scoreThreshold: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Medium (≥50)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">Medium (≥50)</SelectItem>
                        <SelectItem value="70">High (≥70)</SelectItem>
                        <SelectItem value="30">Low (≥30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="algorithm" className="text-sm font-medium text-neutral-700 mb-1">
                      Algorithm
                    </Label>
                    <Select 
                      defaultValue={formData.algorithm}
                      onValueChange={(value) => setFormData({...formData, algorithm: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Standard Alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Alignment</SelectItem>
                        <SelectItem value="rnafold">Vienna RNAfold (Energy-based)</SelectItem>
                        <SelectItem value="rnahybrid">RNAhybrid (Specialized for miRNA)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-1 text-xs text-neutral-500">
                      {formData.algorithm === "standard" ? 
                        "Simple sequence-based alignment with seed region emphasis" :
                       formData.algorithm === "rnafold" ? 
                        "Vienna RNA tools for thermodynamic prediction with energy minimization" :
                        "RNAhybrid for specialized miRNA-target hybridization prediction"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mismatchPenalty" className="text-sm font-medium text-neutral-700 mb-1">
                      Mismatch Penalty
                    </Label>
                    <div className="pt-2">
                      <Slider
                        id="mismatchPenalty"
                        min={1}
                        max={5}
                        step={1}
                        value={[mismatchPenalty]}
                        onValueChange={(value) => setMismatchPenalty(value[0])}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                      <span>Low (1)</span>
                      <span>Medium (3)</span>
                      <span>High (5)</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-neutral-700 mb-1">
                      G:U Wobble Pairs
                    </Label>
                    <RadioGroup 
                      defaultValue={formData.guWobble}
                      onValueChange={(value) => setFormData({...formData, guWobble: value})}
                      className="flex items-center space-x-4 pt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="allowed" id="gu-allowed" />
                        <Label htmlFor="gu-allowed" className="text-sm text-neutral-700">Allowed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="penalty" id="gu-penalty" />
                        <Label htmlFor="gu-penalty" className="text-sm text-neutral-700">With Penalty</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="disallowed" id="gu-disallowed" />
                        <Label htmlFor="gu-disallowed" className="text-sm text-neutral-700">Disallowed</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-[#2c6e49] hover:bg-[#1e4a31]"
                  disabled={isPending || !formData.mirnaSequence || !formData.lncrnaSequence}
                >
                  <Radar className="mr-2 h-4 w-4" />
                  {isPending ? "Running Prediction..." : "Run Prediction"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-sans font-semibold">Prediction Results</h2>
              <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                predictionResult.score >= 70 ? "bg-[#198754]" : 
                predictionResult.score >= 50 ? "bg-[#ffc107]" : "bg-[#dc3545]"
              }`}>
                Score: {predictionResult.score}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Prediction Summary</h3>
              <div className="bg-neutral-50 p-4 rounded-md">
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium">miRNA:</p>
                    <p>{predictionResult.mirnaName || "Custom sequence"} ({predictionResult.mirnaSequence.length} nt)</p>
                  </div>
                  <div>
                    <p className="font-medium">lncRNA Region:</p>
                    <p>{predictionResult.lncrnaName || "Fragment"} ({predictionResult.lncrnaSequence.length} nt)</p>
                  </div>
                  <div>
                    <p className="font-medium">Binding Position:</p>
                    <p>{predictionResult.bindingStart + 1}-{predictionResult.bindingEnd}</p>
                  </div>
                  <div>
                    <p className="font-medium">Prediction Tool:</p>
                    <p className="flex items-center">
                      {predictionResult.thermodynamics.localStructure?.includes("RNAhybrid") ? (
                        <span className="text-blue-600 font-medium">RNAhybrid</span>
                      ) : predictionResult.thermodynamics.localStructure?.includes("RNAfold") ? (
                        <span className="text-green-600 font-medium">Vienna RNAfold</span>
                      ) : (
                        <span className="text-neutral-600">Standard Algorithm</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Sequence Alignment</h3>
              <div className="bg-neutral-50 p-4 rounded-md overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  {`lncRNA  5' ${highlightBindingSite(
                    predictionResult.lncrnaSequence,
                    predictionResult.bindingStart,
                    predictionResult.bindingEnd
                  )} 3'`}
                </pre>
                <div className="mt-1" dangerouslySetInnerHTML={{ 
                  __html: predictionResult.alignment.replace(/\n/g, '<br>') 
                }} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Detailed Binding Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="bg-neutral-50 p-4 rounded-md h-full">
                    <h4 className="text-sm font-medium mb-3">Binding Site Details</h4>
                    <table className="w-full text-sm text-left">
                      <tbody>
                        <tr>
                          <td className="py-1 font-medium">Seed match:</td>
                          <td>{predictionResult.bindingDetails.seedMatch}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Complementary pairs:</td>
                          <td>{predictionResult.bindingDetails.complementaryPairs}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Mismatches:</td>
                          <td>{predictionResult.bindingDetails.mismatches}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">G:U wobble pairs:</td>
                          <td>{predictionResult.bindingDetails.guWobblePairs}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Bulges:</td>
                          <td>{predictionResult.bindingDetails.bulges} (lncRNA)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <div className="bg-neutral-50 p-4 rounded-md h-full">
                    <h4 className="text-sm font-medium mb-3">Thermodynamic Properties</h4>
                    <table className="w-full text-sm text-left">
                      <tbody>
                        <tr>
                          <td className="py-1 font-medium">Free energy (ΔG):</td>
                          <td>{predictionResult.thermodynamics.freeEnergy.toFixed(1)} kcal/mol</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Stability score:</td>
                          <td>{predictionResult.thermodynamics.stabilityScore}</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Accessibility:</td>
                          <td>{predictionResult.thermodynamics.accessibility.toFixed(2)} (Highly accessible)</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-medium">Local structure:</td>
                          <td>{predictionResult.thermodynamics.localStructure}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Structure Visualization */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Interaction Structure</h3>
              <div className="bg-neutral-50 p-4 rounded-md">
                {predictionResult.thermodynamics.localStructure?.includes("RNAhybrid") || 
                 predictionResult.thermodynamics.localStructure?.includes("RNAfold") || 
                 predictionResult.thermodynamics.localStructure?.includes("(") ? (
                  <div className="flex flex-col items-center p-4">
                    <p className="font-medium mb-3 text-sm">RNA Structure Notation</p>
                    <pre className="font-mono text-sm bg-black text-green-400 p-4 rounded-md w-full overflow-x-auto whitespace-pre-wrap">
                      {predictionResult.thermodynamics.localStructure}
                    </pre>
                    <p className="mt-3 text-xs text-neutral-500">
                      {predictionResult.thermodynamics.localStructure?.includes("RNAhybrid") ? 
                        "Structure predicted by RNAhybrid - specialized for miRNA-target interactions" :
                       predictionResult.thermodynamics.localStructure?.includes("RNAfold") ?
                        "Structure predicted by Vienna RNAfold - using energy minimization algorithm" :
                        "Dot-bracket notation: ( ) denote paired bases, . denotes unpaired bases"}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="border-2 border-dashed border-neutral-300 p-8 rounded-md">
                      <p className="text-neutral-600">
                        Structure visualization is not available for the standard algorithm
                      </p>
                      <p className="text-neutral-500 text-sm mt-2">
                        Use RNAhybrid or RNAfold algorithm for structure prediction
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6 mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-md font-medium mb-1">Prediction Confidence</h3>
                  <p className="text-sm text-neutral-700">
                    <span className={`font-medium ${
                      predictionResult.score >= 70 ? "text-[#198754]" : 
                      predictionResult.score >= 50 ? "text-[#ffc107]" : "text-[#dc3545]"
                    }`}>
                      {predictionResult.score >= 70 ? "High" : 
                       predictionResult.score >= 50 ? "Medium" : "Low"} confidence prediction ({predictionResult.score}/100)
                    </span> - 
                    {predictionResult.score >= 70 ? " This interaction is likely to occur in vivo." :
                     predictionResult.score >= 50 ? " This interaction may occur under specific conditions." :
                     " This interaction is less likely to be biologically relevant."}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    className="bg-[#2c6e49] hover:bg-[#1e4a31]"
                    onClick={handleDownloadResults}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Results
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleNewPrediction}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    New Prediction
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
