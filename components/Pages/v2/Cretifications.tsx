import { certifications } from "@/lib/constants/certifications";
import { ShieldAlert, ShieldCheck } from "lucide-react";

const certificationIconMap = {
  "sheild-check": <ShieldCheck />,
  "sheild-alert": <ShieldAlert />,
};

const Cretifications = () => {
  return (
    <section className="py-12 bg-muted-foreground/10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {certifications.certifications.map((certification) => (
            <div
              key={certification.title}
              className="text-sm md:text-base text-muted-foreground mx-auto"
            >
              <div className="flex items-center gap-2 md:flex-col md:items-start">
                <div className="flex items-center">
                  {
                    certificationIconMap[
                      certification.icon as keyof typeof certificationIconMap
                    ]
                  }
                  <h3 className="uppercase font-primary">
                    {certification.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cretifications;
