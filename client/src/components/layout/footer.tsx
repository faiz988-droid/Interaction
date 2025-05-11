import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="font-sans font-bold text-xl">
                Plant miRNA and lncRNA interaction
              </span>
            </div>
            <p className="text-neutral-400 mb-4">
              A comprehensive database and prediction tool for miRNA-lncRNA
              interactions in Arabidopsis thaliana.
            </p>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-neutral-400 hover:text-white">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/predict">
                  <a className="text-neutral-400 hover:text-white">
                    Prediction Tool
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-neutral-400 hover:text-white">
                    About the Project
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a className="text-neutral-400 hover:text-white">Contact Us</a>
              </li>
            </ul>
            <div className="text-neutral-400 mt-4">
              <h4 className="font-semibold hover:text-white">Muskan</h4>
              <p>
                Email:{" "}
                <a
                  href="mailto:muskan39771@gmail.com"
                  className="text-neutral-300 hover:underline"
                >
                  muskan39771@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:7084461234"
                  className="text-neutral-300 hover:underline"
                >
                  7084461234
                </a>
              </p>
            </div>
            <div className="text-neutral-400 mt-4">
              <h4 className="font-semibold">Noopur Singh</h4>
              <p>
                Email:{" "}
                <a
                  href="mailto:singh.rajpoot.noopur@gmail.com"
                  className="text-neutral-300 hover:underline"
                >
                  singh.rajpoot.noopur@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+919651770378"
                  className="text-neutral-300 hover:underline"
                >
                  +919651770378
                </a>
              </p>
              <p>
                Alternate Phone:{" "}
                <a
                  href="tel:+919651770378"
                  className="text-neutral-300 hover:underline"
                >
                  +919651770378
                </a>
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-neutral-800" />

        <div className="flex flex-col md:flex-row justify-between text-sm text-neutral-500">
          <p>© 2025 plant miRNA Database. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            <a href="#" className="hover:text-neutral-400">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-neutral-400">
              Terms of Use
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
