import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon, ArrowRight, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatAlignmentWithHighlighting, formatSequence } from "@/lib/alignment";

export default function BrowsePage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const query = useSearch();
  const searchParams = new URLSearchParams(query);

  // Form states
  const [searchTerm, setSearchTerm] = useState(searchParams.get("searchTerm") || "");
  const [searchType, setSearchType] = useState(searchParams.get("searchType") || "all");
  const [scoreFilter, setScoreFilter] = useState(searchParams.get("scoreFilter") || "0");
  const [methodFilter, setMethodFilter] = useState(searchParams.get("methodFilter") || "all");
  const [limit, setLimit] = useState(searchParams.get("limit") || "10");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Results fetching
  const {
    data: searchResults,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: [
      `/api/interactions/search?searchTerm=${searchTerm}&searchType=${searchType}&scoreFilter=${scoreFilter}&methodFilter=${methodFilter}&limit=${limit}&page=${page}`
    ],
    enabled: !!searchTerm || searchParams.has("searchTerm"),
  });

  // Update URL when search params change
  useEffect(() => {
    if (searchTerm) {
      const params = new URLSearchParams();
      params.set("searchTerm", searchTerm);
      params.set("searchType", searchType);
      params.set("scoreFilter", scoreFilter);
      params.set("methodFilter", methodFilter);
      params.set("limit", limit);
      params.set("page", String(page));
      setLocation(`/browse?${params.toString()}`);
    }
  }, [searchTerm, searchType, scoreFilter, methodFilter, limit, page, setLocation]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (searchResults && page < searchResults.totalPages) {
      setPage(prev => prev + 1);
    }
  };

  // Handle view details
  const handleViewDetails = (id: number) => {
    toast({
      title: "Feature in development",
      description: "Detailed view for interaction ID " + id + " will be available soon.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-sans font-bold text-neutral-900 mb-2">Browse miRNA-lncRNA Interactions</h1>
        <p className="text-neutral-700">
          Search for specific interactions by miRNA, lncRNA, or gene ID in Arabidopsis thaliana.
        </p>
      </div>

      {/* Search Form */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label htmlFor="search-term" className="block text-sm font-medium text-neutral-700 mb-1">
                  Search Term
                </label>
                <Input
                  id="search-term"
                  name="search-term"
                  placeholder="Enter miRNA (e.g., miR167), lncRNA name, or gene ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="search-type" className="block text-sm font-medium text-neutral-700 mb-1">
                  Search By
                </label>
                <Select defaultValue={searchType} onValueChange={setSearchType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Fields" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Fields</SelectItem>
                      <SelectItem value="mirna">miRNA</SelectItem>
                      <SelectItem value="lncrna">lncRNA</SelectItem>
                      <SelectItem value="gene">Gene ID</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-neutral-50 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Filter className="text-[#2c6e49] mr-2 h-4 w-4" />
                <h3 className="text-sm font-medium text-neutral-900">Advanced Filters</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="score-filter" className="block text-sm font-medium text-neutral-700 mb-1">
                    Minimum Score
                  </label>
                  <Select defaultValue={scoreFilter} onValueChange={setScoreFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">Any Score</SelectItem>
                        <SelectItem value="80">High (≥80)</SelectItem>
                        <SelectItem value="60">Medium (≥60)</SelectItem>
                        <SelectItem value="40">Low (≥40)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="method-filter" className="block text-sm font-medium text-neutral-700 mb-1">
                    Prediction Method
                  </label>
                  <Select defaultValue={methodFilter} onValueChange={setMethodFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Methods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="experimental">Experimental</SelectItem>
                        <SelectItem value="computational">Computational</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="limit" className="block text-sm font-medium text-neutral-700 mb-1">
                    Results Limit
                  </label>
                  <Select defaultValue={limit} onValueChange={setLimit}>
                    <SelectTrigger>
                      <SelectValue placeholder="10 Results" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="10">10 Results</SelectItem>
                        <SelectItem value="25">25 Results</SelectItem>
                        <SelectItem value="50">50 Results</SelectItem>
                        <SelectItem value="100">100 Results</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-[#2c6e49] hover:bg-[#1e4a31]"
                disabled={isLoading}
              >
                <SearchIcon className="mr-2 h-4 w-4" />
                Search Interactions
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-sans">Search Results</CardTitle>
            {searchResults && (
              <div className="text-sm text-neutral-700">
                Showing <span className="font-medium">{searchResults.results.length}</span>{" "}
                {searchResults.results.length === 1 ? "result" : "results"}
                {searchTerm && (
                  <>
                    {" "}for "<span className="font-medium">{searchTerm}</span>"
                  </>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="py-8 text-center">
              <p>Loading results...</p>
            </div>
          )}

          {error && (
            <div className="py-8 text-center text-red-500">
              <p>Error loading results. Please try again.</p>
            </div>
          )}

          {!isLoading && !error && searchResults?.results.length === 0 && (
            <div className="py-8 text-center">
              <p>No interactions found matching your search criteria.</p>
            </div>
          )}

          {!isLoading && !error && searchResults?.results.length > 0 && (
            <div className="space-y-4">
              {searchResults.results.map((interaction) => (
                <div key={interaction.id} className="border border-neutral-200 rounded-lg">
                  <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-[#1e4a31]">Interaction ID: INT-{interaction.id.toString().padStart(5, '0')}</span>
                      <h3 className="text-lg font-semibold">{interaction.mirna.name} — {interaction.lncrna.name}</h3>
                    </div>
                    <div className="bg-[#2c6e49] px-3 py-1 rounded-full text-white text-sm font-medium">
                      Score: {Number(interaction.score)}
                    </div>
                  </div>
                  <div className="p-4 grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-600 mb-1">miRNA Details</h4>
                      <p className="mb-1"><span className="font-medium">Name:</span> {interaction.mirna.name}</p>
                      <p className="mb-1"><span className="font-medium">Source:</span> {interaction.mirna.source}</p>
                      <div className="mb-1">
                        <span className="font-medium">Sequence:</span>
                        <div className="font-mono text-sm bg-neutral-50 p-2 rounded sequence-text mt-1">
                          {formatSequence(interaction.mirna.sequence)}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-600 mb-1">lncRNA Details</h4>
                      <p className="mb-1"><span className="font-medium">Name:</span> {interaction.lncrna.name}</p>
                      <p className="mb-1"><span className="font-medium">Location:</span> {interaction.lncrna.location}</p>
                      <p className="mb-1"><span className="font-medium">Function:</span> {interaction.lncrna.function}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-600 mb-1">Interaction Details</h4>
                      <p className="mb-1"><span className="font-medium">Method:</span> {interaction.method}</p>
                      <p className="mb-1"><span className="font-medium">Source:</span> {interaction.source}</p>
                      <p><span className="font-medium">First reported:</span> {interaction.first_reported 
                        ? new Date(interaction.first_reported).toLocaleDateString() 
                        : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 border-t border-neutral-200 bg-neutral-50">
                    <h4 className="text-sm font-medium text-neutral-600 mb-2">Binding Site Alignment</h4>
                    <div className="font-mono text-sm overflow-x-auto">
                      {interaction.alignment && (
                        <div dangerouslySetInnerHTML={{ 
                          __html: formatAlignmentWithHighlighting(interaction.alignment) 
                        }} />
                      )}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="link" 
                        className="p-0 text-[#2c6e49] hover:text-[#1e4a31]"
                        onClick={() => handleViewDetails(interaction.id)}
                      >
                        View Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {searchResults && searchResults.totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevPage}
                    disabled={page <= 1}
                  >
                    Previous
                  </Button>
                  <div className="text-sm text-neutral-600">
                    Page {page} of {searchResults.totalPages}
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={page >= searchResults.totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
