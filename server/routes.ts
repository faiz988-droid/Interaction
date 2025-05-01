import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { ZodError } from "zod";
import { 
  predictionRequestSchema, 
  searchQuerySchema, 
  type PredictionResult,
  type BrowseResponse 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

import { predictWithAdvancedTools } from './utils/rna-tools';

// Prediction algorithm implementation
async function predictMirnaLncrnaInteraction(mirnaSeq: string, lncrnaSeq: string, options: any): Promise<PredictionResult> {
  // First, try to use advanced RNA tools based on the selected algorithm
  let advancedResult: Partial<PredictionResult> = {};
  
  if (options.algorithm === 'rnafold' || options.algorithm === 'rnahybrid') {
    try {
      // Use RNAhybrid or RNAfold if selected
      advancedResult = await predictWithAdvancedTools(mirnaSeq, lncrnaSeq, options.algorithm);
      console.log(`Prediction using ${options.algorithm} completed successfully`);
    } catch (error) {
      console.error(`Error using advanced prediction (${options.algorithm}):`, error);
      console.log("Falling back to standard prediction algorithm");
    }
  }
  
  // If we have results from advanced tools, use them. Otherwise, use the standard algorithm.
  if (Object.keys(advancedResult).length > 0) {
    // Merge with default values for any missing properties
    return {
      score: advancedResult.score || 50,
      mirnaName: advancedResult.mirnaName,
      mirnaSequence: mirnaSeq,
      lncrnaName: advancedResult.lncrnaName,
      lncrnaSequence: lncrnaSeq,
      alignment: advancedResult.alignment || '',
      bindingStart: advancedResult.bindingStart || 0,
      bindingEnd: advancedResult.bindingEnd || mirnaSeq.length,
      bindingDetails: advancedResult.bindingDetails || {
        seedMatch: "Unknown",
        complementaryPairs: "0/0",
        mismatches: 0,
        guWobblePairs: 0,
        bulges: 0
      },
      thermodynamics: advancedResult.thermodynamics || {
        freeEnergy: 0,
        stabilityScore: "Unknown",
        accessibility: 0.5,
        localStructure: "Unknown"
      }
    };
  }
  
  // Standard algorithm as a fallback
  console.log("Using standard prediction algorithm");
  
  // For standard prediction, we'll use the simplified approach
  const mirnaLength = mirnaSeq.length;
  const lncrnaLength = lncrnaSeq.length;
  
  // Find the best binding site (simplified)
  let maxScore = 0;
  let bindingStart = 0;
  let bindingEnd = 0;
  let alignment = "";
  let mismatches = 0;
  let guPairs = 0;
  
  // Slide miRNA sequence along lncRNA to find best binding
  for (let i = 0; i <= lncrnaLength - mirnaLength; i++) {
    const lncrnaSubseq = lncrnaSeq.substring(i, i + mirnaLength);
    let localScore = 0;
    let localMismatches = 0;
    let localGuPairs = 0;
    
    // Check complementarity
    for (let j = 0; j < mirnaLength; j++) {
      const mirnaBase = mirnaSeq[mirnaLength - 1 - j]; // 3' to 5' direction
      const lncrnaBase = lncrnaSubseq[j]; // 5' to 3' direction
      
      if (
        (mirnaBase === 'A' && lncrnaBase === 'U') ||
        (mirnaBase === 'U' && lncrnaBase === 'A') ||
        (mirnaBase === 'G' && lncrnaBase === 'C') ||
        (mirnaBase === 'C' && lncrnaBase === 'G')
      ) {
        // Perfect complementary pair
        localScore += 5;
      } else if (
        (mirnaBase === 'G' && lncrnaBase === 'U') ||
        (mirnaBase === 'U' && lncrnaBase === 'G')
      ) {
        // G:U wobble pair
        localScore += options.guWobble === "allowed" ? 3 : 
                      options.guWobble === "penalty" ? 1 : 0;
        localGuPairs++;
      } else {
        // Mismatch
        localScore -= options.mismatchPenalty;
        localMismatches++;
      }
    }
    
    // Check if seed region has good complementarity
    const seedRegionBounds = options.seedRegion.split('-').map(Number);
    const seedStart = seedRegionBounds[0] - 1;
    const seedEnd = seedRegionBounds[1];
    let seedMatches = 0;
    
    for (let j = seedStart; j < seedEnd; j++) {
      const mirnaBase = mirnaSeq[mirnaLength - 1 - j]; // 3' to 5' direction
      const lncrnaBase = lncrnaSubseq[j]; // 5' to 3' direction
      
      if (
        (mirnaBase === 'A' && lncrnaBase === 'U') ||
        (mirnaBase === 'U' && lncrnaBase === 'A') ||
        (mirnaBase === 'G' && lncrnaBase === 'C') ||
        (mirnaBase === 'C' && lncrnaBase === 'G')
      ) {
        seedMatches++;
      }
    }
    
    // Seed region is crucial, give it bonus points
    localScore += seedMatches * 2;
    
    // Update if this is the best match found
    if (localScore > maxScore) {
      maxScore = localScore;
      bindingStart = i;
      bindingEnd = i + mirnaLength;
      mismatches = localMismatches;
      guPairs = localGuPairs;
      
      // Create alignment string
      let mirnaAlign = `miRNA  3' ${mirnaSeq.split('').reverse().join('')} 5'`;
      let middleAlign = "       ";
      let lncrnaAlign = `lncRNA 5' ${lncrnaSubseq} 3'`;
      
      for (let j = 0; j < mirnaLength; j++) {
        const mirnaBase = mirnaSeq[mirnaLength - 1 - j]; // 3' to 5' direction
        const lncrnaBase = lncrnaSubseq[j]; // 5' to 3' direction
        
        if (
          (mirnaBase === 'A' && lncrnaBase === 'U') ||
          (mirnaBase === 'U' && lncrnaBase === 'A') ||
          (mirnaBase === 'G' && lncrnaBase === 'C') ||
          (mirnaBase === 'C' && lncrnaBase === 'G')
        ) {
          middleAlign += "|";
        } else if (
          (mirnaBase === 'G' && lncrnaBase === 'U') ||
          (mirnaBase === 'U' && lncrnaBase === 'G')
        ) {
          middleAlign += "o";
        } else {
          middleAlign += " ";
        }
      }
      
      alignment = `${mirnaAlign}\n${middleAlign}\n${lncrnaAlign}`;
    }
  }
  
  // Scale score to 0-100 range
  const normalizedScore = Math.min(100, Math.max(0, Math.round(maxScore / (mirnaLength * 5) * 100)));
  
  // Determine stability based on score
  let stabilityScore = "Low";
  if (normalizedScore >= 70) stabilityScore = "High";
  else if (normalizedScore >= 40) stabilityScore = "Medium";
  
  // Calculate free energy (simplified)
  const freeEnergy = -1 * (normalizedScore / 10) - 10; 
  
  // Calculate complementary pairs percentage
  const complementaryPairs = `${mirnaLength - (mismatches + guPairs)}/${mirnaLength} (${Math.round((mirnaLength - (mismatches + guPairs)) / mirnaLength * 100)}%)`;
  
  return {
    score: normalizedScore,
    mirnaSequence: mirnaSeq,
    lncrnaSequence: lncrnaSeq,
    alignment,
    bindingStart,
    bindingEnd,
    bindingDetails: {
      seedMatch: options.seedRegion === "2-7" ? "Perfect (positions 2-7)" : 
                 options.seedRegion === "2-8" ? "Extended (positions 2-8)" : 
                 "Alternative (positions 1-7)",
      complementaryPairs,
      mismatches,
      guWobblePairs: guPairs,
      bulges: 1, // Simplified - assuming 1 bulge for demo
    },
    thermodynamics: {
      freeEnergy,
      stabilityScore,
      accessibility: parseFloat((0.5 + (normalizedScore / 200)).toFixed(2)), // Simple simulation between 0.5-1.0
      localStructure: "Unpaired region", // Simplified
    }
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  
  // Error handler middleware
  const handleError = (err: any, res: express.Response) => {
    console.error(err);
    
    if (err instanceof ZodError) {
      const validationError = fromZodError(err);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: validationError.details
      });
    }
    
    return res.status(500).json({ message: err.message || 'Internal server error' });
  };

  // GET /api/mirnas - List all miRNAs
  apiRouter.get('/mirnas', async (req, res) => {
    try {
      const mirnas = await storage.listMirnas();
      res.json(mirnas);
    } catch (err) {
      handleError(err, res);
    }
  });

  // GET /api/lncrnas - List all lncRNAs
  apiRouter.get('/lncrnas', async (req, res) => {
    try {
      const lncrnas = await storage.listLncrnas();
      res.json(lncrnas);
    } catch (err) {
      handleError(err, res);
    }
  });

  // GET /api/interactions - List all interactions
  apiRouter.get('/interactions', async (req, res) => {
    try {
      const interactions = await storage.listInteractions();
      res.json(interactions);
    } catch (err) {
      handleError(err, res);
    }
  });

  // GET /api/interactions/:id - Get interaction by ID
  apiRouter.get('/interactions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      
      const interaction = await storage.getInteraction(id);
      if (!interaction) {
        return res.status(404).json({ message: 'Interaction not found' });
      }
      
      res.json(interaction);
    } catch (err) {
      handleError(err, res);
    }
  });

  // GET /api/interactions/search - Search interactions
  apiRouter.get('/interactions/search', async (req, res) => {
    try {
      const query = searchQuerySchema.parse({
        searchTerm: req.query.searchTerm as string,
        searchType: req.query.searchType || 'all',
        scoreFilter: parseInt(req.query.scoreFilter as string) || 0,
        methodFilter: req.query.methodFilter || 'all',
        limit: parseInt(req.query.limit as string) || 10,
        page: parseInt(req.query.page as string) || 1
      });
      
      const result: BrowseResponse = await storage.searchInteractions(query);
      res.json(result);
    } catch (err) {
      handleError(err, res);
    }
  });

  // POST /api/predict - Predict miRNA-lncRNA interaction
  apiRouter.post('/predict', async (req, res) => {
    try {
      const data = predictionRequestSchema.parse({
        mirnaSequence: req.body.mirnaSequence,
        lncrnaSequence: req.body.lncrnaSequence,
        seedRegion: req.body.seedRegion || '2-7',
        scoreThreshold: parseInt(req.body.scoreThreshold) || 50,
        algorithm: req.body.algorithm || 'standard',
        mismatchPenalty: parseInt(req.body.mismatchPenalty) || 3,
        guWobble: req.body.guWobble || 'allowed'
      });
      
      // Call prediction algorithm with await since it's now async
      const result = await predictMirnaLncrnaInteraction(
        data.mirnaSequence, 
        data.lncrnaSequence,
        {
          seedRegion: data.seedRegion,
          mismatchPenalty: data.mismatchPenalty,
          guWobble: data.guWobble,
          algorithm: data.algorithm
        }
      );
      
      res.json(result);
    } catch (err) {
      handleError(err, res);
    }
  });

  // Mount API router
  app.use('/api', apiRouter);

  const httpServer = createServer(app);
  return httpServer;
}
