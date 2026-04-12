import { ShieldAlert, ShieldCheck } from "lucide-react";
const Cretifications = () => {
  const certifications = [
    {
      title: "WHO Compilant",
      icon: <ShieldCheck />,
    },
    {
      title: "GMP Certified",
      icon: <ShieldCheck />,
    },
    {
      title: "ISO 13458",
      icon: <ShieldAlert />,
    },
    {
      title: "FDA Registered",
      icon: <ShieldCheck />,
    },
  ];
  return (
    <section className="py-12 bg-muted-foreground/10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {certifications.map((certification) => (
            <div
              key={certification.title}
              className="text-sm md:text-base text-muted-foreground mx-auto"
            >
              <div className="flex items-center gap-2 md:flex-col md:items-start">
                <div className="flex items-center">
                  {certification.icon}
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
