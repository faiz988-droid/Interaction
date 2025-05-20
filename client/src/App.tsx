import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/navbar";
import HomePage from "@/pages/home";
import BrowsePage from "@/pages/browse";
import PredictPage from "@/pages/predict";
import AboutPage from "@/pages/about";
import ResourcesPage from "@/pages/resources";
import ContactPage from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/browse" component={BrowsePage} />
      <Route path="/predict" component={PredictPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-neutral-50">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
