import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { Sprout, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Sprout className="text-[#4da375] h-6 w-6 mr-2" />
              <span className="font-sans font-bold text-xl">PlantmiRNA</span>
            </div>
            <p className="text-neutral-400 mb-4">
              A comprehensive database and prediction tool for miRNA-lncRNA interactions 
              in Arabidopsis thaliana.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-neutral-400 hover:text-white">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/browse">
                  <a className="text-neutral-400 hover:text-white">Browse Interactions</a>
                </Link>
              </li>
              <li>
                <Link href="/predict">
                  <a className="text-neutral-400 hover:text-white">Prediction Tool</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">API Documentation</a>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-neutral-400 hover:text-white">About the Project</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">Publications</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">Download Data</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">Related Databases</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 bg-neutral-800" />
        
        <div className="flex flex-col md:flex-row justify-between text-sm text-neutral-500">
          <p>© 2025 PlantmiRNA Database. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-neutral-400">Terms of Use</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
