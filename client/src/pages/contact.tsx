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
            {/* Contact: Muskan */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Muskan</h2>
              <div className="space-y-2">
                <p className="text-neutral-600">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:muskan39771@gmail.com"
                    className="text-[#2c6e49] hover:underline"
                  >
                    muskan39771@gmail.com
                  </a>
                </p>
                <p className="text-neutral-600">
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:7084461234"
                    className="text-[#2c6e49] hover:underline"
                  >
                    7084461234
                  </a>
                </p>
              </div>
            </div>

            {/* Contact: Dr. Noopur Singh */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Dr. Noopur Singh</h2>
              <div className="space-y-2">
                <p className="text-neutral-600">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:singh.rajpoot.noopur@gmail.com"
                    className="text-[#2c6e49] hover:underline"
                  >
                    singh.rajpoot.noopur@gmail.com
                  </a>
                </p>
                <p className="text-neutral-600">
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+919651770378"
                    className="text-[#2c6e49] hover:underline"
                  >
                    +91 9651770378
                  </a>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
