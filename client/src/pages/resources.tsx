
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      name: "PLncDB",
      description: "Database of plant lncRNAs with annotations and expression profiles.",
      link: "http://plncdb.example.org"
    },
    {
      name: "miRBase",
      description: "Repository of plant and animal miRNA sequences and annotations.",
      link: "http://mirbase.example.org"
    },
    {
      name: "PmiREN",
      description: "Plant miRNA database with regulation and expression profiles.",
      link: "http://pmiren.example.org"
    },
    {
      name: "psRNATarget",
      description: "Predicts miRNA targets in plants, including lncRNAs.",
      link: "http://psrnatarget.example.org"
    },
    {
      name: "Cytoscape",
      description: "Software for network visualization and analysis.",
      link: "http://cytoscape.example.org"
    },
    {
      name: "GreenC",
      description: "Plant lncRNA database related to abiotic stress regulation.",
      link: "http://greenc.example.org"
    }
  ];

  const citations = [
    "Wang, M., Wang, Q., & Zhang, B. (2018). Response of miRNAs and their targets to salt and drought stresses in cotton (Gossypium hirsutum L.). Gene, 642, 135–143.",
    "Liu, J., Jung, C., Xu, J., Wang, H., Deng, S., Bernad, L., ... & Zhang, H. (2012). Genome-wide analysis uncovers regulation of long intergenic noncoding RNAs in Arabidopsis. The Plant Cell, 24(11), 4333–4345.",
    "Franco-Zorrilla, J. M., Valli, A., Todesco, M., Mateos, I., Puga, M. I., Rubio-Somoza, I., ... & Paz-Ares, J. (2007). Target mimicry provides a new mechanism for regulation of microRNA activity. Nature Genetics, 39(8), 1033–1037.",
    "Zhou, Y., Xu, J., Yin, Y., Yu, F., Ni, L., & Lu, Y. (2021). Plant lncRNAs: New players in gene regulation and stress response. Frontiers in Plant Science, 12, 676502."
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-sans font-bold text-neutral-900 mb-2">
          Resources and References
        </h1>
        <p className="text-neutral-700">
          Comprehensive collection of tools, databases, and academic references for lncRNA–miRNA interactions in plants.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Online Resources and Tools</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <div key={resource.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{resource.name}</h3>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2c6e49] hover:text-[#1e4a31] inline-flex items-center"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-neutral-600">{resource.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Selected Academic Citations</h2>
          <div className="space-y-4">
            {citations.map((citation, index) => (
              <div key={index} className="text-sm text-neutral-700">
                {citation}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
