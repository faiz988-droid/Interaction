import {
  type Mirna,
  type InsertMirna,
  type Lncrna,
  type InsertLncrna,
  type Interaction,
  type InsertInteraction,
  type SearchQuery,
  type BrowseResponse,
} from "@shared/schema";

export interface IStorage {
  // miRNA methods
  getMirna(id: number): Promise<Mirna | undefined>;
  getMirnaByName(name: string): Promise<Mirna | undefined>;
  createMirna(mirna: InsertMirna): Promise<Mirna>;
  listMirnas(): Promise<Mirna[]>;

  // lncRNA methods
  getLncrna(id: number): Promise<Lncrna | undefined>;
  getLncrnaByName(name: string): Promise<Lncrna | undefined>;
  createLncrna(lncrna: InsertLncrna): Promise<Lncrna>;
  listLncrnas(): Promise<Lncrna[]>;

  // Interaction methods
  getInteraction(id: number): Promise<(Interaction & { mirna: Mirna; lncrna: Lncrna }) | undefined>;
  createInteraction(interaction: InsertInteraction): Promise<Interaction>;
  listInteractions(): Promise<(Interaction & { mirna: Mirna; lncrna: Lncrna })[]>;
  searchInteractions(query: SearchQuery): Promise<BrowseResponse>;
}

export class MemStorage implements IStorage {
  private mirnas: Map<number, Mirna>;
  private lncrnas: Map<number, Lncrna>;
  private interactions: Map<number, Interaction>;
  private mirnaCurrentId: number;
  private lncrnaCurrentId: number;
  private interactionCurrentId: number;

  constructor() {
    this.mirnas = new Map();
    this.lncrnas = new Map();
    this.interactions = new Map();
    this.mirnaCurrentId = 1;
    this.lncrnaCurrentId = 1;
    this.interactionCurrentId = 1;

    // Initialize with example data
    this.initializeData();
  }

  private initializeData() {
    // Example miRNAs
    const mirna1 = this.createMirna({
      name: "ath-miR167a",
      sequence: "UGAAGCUGCCAGCAUGAUCUA",
      species: "Arabidopsis thaliana",
      source: "miRBase (MIMAT0000195)",
    });

    const mirna2 = this.createMirna({
      name: "ath-miR156a",
      sequence: "UGACAGAAGAGAGUGAGCAC",
      species: "Arabidopsis thaliana",
      source: "miRBase",
    });

    const mirna3 = this.createMirna({
      name: "ath-miR319a",
      sequence: "UUGGACUGAAGGGAGCUCCU",
      species: "Arabidopsis thaliana",
      source: "miRBase",
    });

    // Example lncRNAs
    const lncrna1 = this.createLncrna({
      name: "BLIL1",
      sequence: "UGAUCGAUGAGUAUGGCGUUGAUGAUCUCAGGCAUAGCGGGAGCGC",
      species: "Arabidopsis thaliana",
      location: "Chr 1: 4567890-4572345",
      function: "Leaf development regulation",
    });

    const lncrna2 = this.createLncrna({
      name: "ELENA1",
      sequence: "ACGUGCUAGCUAGCUAGUAGCUAGAUGAGGGAUGCUACGAUGCAUGG",
      species: "Arabidopsis thaliana",
      location: "Chr 3: 12345678-12350000",
      function: "Stress response",
    });

    const lncrna3 = this.createLncrna({
      name: "COLDAIR",
      sequence: "GUAGCUAGCUAGCUAGUCAUGCUAGUCAGUCAGUCGAUCGAUUCGAU",
      species: "Arabidopsis thaliana",
      location: "Chr 5: 23456789-23460000",
      function: "Flowering time regulation",
    });

    // Example interactions
    this.createInteraction({
      mirna_id: mirna1.id, // miR167a
      lncrna_id: lncrna1.id, // BLIL1
      alignment: "miRNA 3' AUCUAGUAG--GUCGUA 5'\n       | | ||| | |||||| \nlncRNA 5' UGAUGUUC--CAGGAU 3'",
      binding_site: "16-38",
      score: 92,
      method: "Experimental (CLASH)",
      source: "Zhang et al., 2022",
      first_reported: new Date("2019-06-15"),
    });

    this.createInteraction({
      mirna_id: mirna2.id, // miR156a
      lncrna_id: lncrna2.id, // ELENA1
      alignment: "miRNA 3' CACGAGUG--AGAGAAGACAGU 5'\n       || ||  | |||| |||\nlncRNA 5' GUGCUUUGCUUCUCAUUCUCA 3'",
      binding_site: "23-45",
      score: 78,
      method: "Computational",
      source: "Liu et al., 2021",
      first_reported: new Date("2021-03-10"),
    });

    this.createInteraction({
      mirna_id: mirna3.id, // miR319a
      lncrna_id: lncrna3.id, // COLDAIR
      alignment: "miRNA 3' UCCUCGAG--GGGAAGUCAGGU 5'\n       |||||  | || |||||\nlncRNA 5' AGGAGUUUCACCCAUCAGUCA 3'",
      binding_site: "12-34",
      score: 85,
      method: "Experimental (RIP-seq)",
      source: "Wang et al., 2020",
      first_reported: new Date("2020-09-22"),
    });
  }

  // miRNA methods
  async getMirna(id: number): Promise<Mirna | undefined> {
    return this.mirnas.get(id);
  }

  async getMirnaByName(name: string): Promise<Mirna | undefined> {
    return Array.from(this.mirnas.values()).find(
      (mirna) => mirna.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async createMirna(insertMirna: InsertMirna): Promise<Mirna> {
    const id = this.mirnaCurrentId++;
    const mirna: Mirna = { ...insertMirna, id };
    this.mirnas.set(id, mirna);
    return mirna;
  }

  async listMirnas(): Promise<Mirna[]> {
    return Array.from(this.mirnas.values());
  }

  // lncRNA methods
  async getLncrna(id: number): Promise<Lncrna | undefined> {
    return this.lncrnas.get(id);
  }

  async getLncrnaByName(name: string): Promise<Lncrna | undefined> {
    return Array.from(this.lncrnas.values()).find(
      (lncrna) => lncrna.name.toLowerCase() === name.toLowerCase(),
    );
  }

  async createLncrna(insertLncrna: InsertLncrna): Promise<Lncrna> {
    const id = this.lncrnaCurrentId++;
    const lncrna: Lncrna = { ...insertLncrna, id };
    this.lncrnas.set(id, lncrna);
    return lncrna;
  }

  async listLncrnas(): Promise<Lncrna[]> {
    return Array.from(this.lncrnas.values());
  }

  // Interaction methods
  async getInteraction(id: number): Promise<(Interaction & { mirna: Mirna; lncrna: Lncrna }) | undefined> {
    const interaction = this.interactions.get(id);
    if (!interaction) return undefined;

    const mirna = await this.getMirna(interaction.mirna_id);
    const lncrna = await this.getLncrna(interaction.lncrna_id);

    if (!mirna || !lncrna) return undefined;

    return { ...interaction, mirna, lncrna };
  }

  async createInteraction(insertInteraction: InsertInteraction): Promise<Interaction> {
    const id = this.interactionCurrentId++;
    const interaction: Interaction = { ...insertInteraction, id };
    this.interactions.set(id, interaction);
    return interaction;
  }

  async listInteractions(): Promise<(Interaction & { mirna: Mirna; lncrna: Lncrna })[]> {
    const results: (Interaction & { mirna: Mirna; lncrna: Lncrna })[] = [];

    for (const interaction of this.interactions.values()) {
      const mirna = await this.getMirna(interaction.mirna_id);
      const lncrna = await this.getLncrna(interaction.lncrna_id);

      if (mirna && lncrna) {
        results.push({ ...interaction, mirna, lncrna });
      }
    }

    return results;
  }

  async searchInteractions(query: SearchQuery): Promise<BrowseResponse> {
    const { searchTerm, searchType, scoreFilter, methodFilter, limit, page } = query;
    
    let allInteractions = await this.listInteractions();
    
    // Filter by search term if provided
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      
      allInteractions = allInteractions.filter(interaction => {
        if (searchType === "all") {
          return (
            interaction.mirna.name.toLowerCase().includes(term) || 
            interaction.lncrna.name.toLowerCase().includes(term)
          );
        } else if (searchType === "mirna") {
          return interaction.mirna.name.toLowerCase().includes(term);
        } else if (searchType === "lncrna") {
          return interaction.lncrna.name.toLowerCase().includes(term);
        } else if (searchType === "gene") {
          // In real implementation, you'd search by gene ID
          // For now, we'll search in both miRNA and lncRNA names
          return (
            interaction.mirna.name.toLowerCase().includes(term) || 
            interaction.lncrna.name.toLowerCase().includes(term)
          );
        }
        return true;
      });
    }
    
    // Filter by score
    if (scoreFilter > 0) {
      allInteractions = allInteractions.filter(
        interaction => Number(interaction.score) >= scoreFilter
      );
    }
    
    // Filter by method
    if (methodFilter !== "all") {
      allInteractions = allInteractions.filter(interaction => {
        const method = interaction.method?.toLowerCase() || "";
        return methodFilter === "experimental" 
          ? method.includes("experimental") 
          : method.includes("computational");
      });
    }
    
    // Calculate pagination
    const total = allInteractions.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    
    // Get paginated results
    const results = allInteractions.slice(offset, offset + limit);
    
    return {
      results,
      total,
      page,
      totalPages,
    };
  }
}

export const storage = new MemStorage();
