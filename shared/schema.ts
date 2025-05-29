import { pgTable, text, serial, integer, numeric, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const mirnas = pgTable("mirnas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sequence: text("sequence").notNull(),
  species: text("species").notNull().default("Arabidopsis thaliana"),
  source: text("source"),
});

export const insertMirnaSchema = createInsertSchema(mirnas).omit({
  id: true,
});

export const lncrnas = pgTable("lncrnas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sequence: text("sequence").notNull(),
  species: text("species").notNull().default("Arabidopsis thaliana"),
  location: text("location"),
  function: text("function"),
});

export const insertLncrnaSchema = createInsertSchema(lncrnas).omit({
  id: true,
});

export const interactions = pgTable("interactions", {
  id: serial("id").primaryKey(),
  mirna_id: integer("mirna_id").notNull(),
  lncrna_id: integer("lncrna_id").notNull(),
  alignment: text("alignment"),
  binding_site: text("binding_site"),
  score: numeric("score").notNull(),
  method: text("method"),
  source: text("source"),
  first_reported: timestamp("first_reported"),
});

export const insertInteractionSchema = createInsertSchema(interactions).omit({
  id: true,
});

// Schema for prediction request
export const predictionRequestSchema = z.object({
  mirnaSequence: z.string().min(1, "miRNA sequence is required"),
  lncrnaSequence: z.string().min(1, "lncRNA sequence is required"),
  seedRegion: z.enum(["2-7", "2-8", "1-7"]).default("2-7"),
  scoreThreshold: z.number().int().default(50),
  algorithm: z.enum(["standard", "rnafold", "rnahybrid"]).default("standard"),
  mismatchPenalty: z.number().min(1).max(5).default(3),
  guWobble: z.enum(["allowed", "penalty", "disallowed"]).default("allowed"),
});

// Types
export type Mirna = typeof mirnas.$inferSelect;
export type InsertMirna = z.infer<typeof insertMirnaSchema>;

export type Lncrna = typeof lncrnas.$inferSelect;
export type InsertLncrna = z.infer<typeof insertLncrnaSchema>;

export type Interaction = typeof interactions.$inferSelect;
export type InsertInteraction = z.infer<typeof insertInteractionSchema>;

export type PredictionRequest = z.infer<typeof predictionRequestSchema>;

// Prediction response type
export type PredictionResult = {
  score: number;
  mirnaName?: string;
  mirnaSequence: string;
  lncrnaName?: string;
  lncrnaSequence: string;
  alignment: string;
  bindingStart: number;
  bindingEnd: number;
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
};

export interface StoredPrediction extends PredictionResult {
  id: string;
  timestamp: string;
  metadata?: {
    ip?: string;
    userAgent?: string;
  };
}

// Search query schema
export const searchQuerySchema = z.object({
  searchTerm: z.string().optional(),
  searchType: z.enum(["all", "mirna", "lncrna", "gene"]).default("all"),
  scoreFilter: z.number().int().min(0).max(100).default(0),
  methodFilter: z.enum(["all", "experimental", "computational"]).default("all"),
  limit: z.number().int().min(1).max(100).default(10),
  page: z.number().int().min(1).default(1),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;

// Browser response type with pagination
export type BrowseResponse = {
  results: (Interaction & { mirna: Mirna; lncrna: Lncrna })[];
  total: number;
  page: number;
  totalPages: number;
};
