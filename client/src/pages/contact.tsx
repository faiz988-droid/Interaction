
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-sans font-bold text-neutral-900 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Get in touch with our team
        </p>
      </header>

      <Card>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-neutral-600 mb-4">
                For questions about plant miRNA and lncRNA interaction tool, please reach out:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> contact@plantmirna.example.org</p>
                <p><strong>Location:</strong> Research Institute</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Research Team</h2>
              <p className="text-neutral-600 mb-4">
                For academic collaborations and research inquiries:
              </p>
              <div className="space-y-2">
                <p><strong>Principal Investigator:</strong> Muskan</p>
                <p><strong>Department:</strong> Bioinformatics</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
