import { cn } from "@/lib/utils";
import { Box, Factory, ShieldEllipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface CapabilitiesData {
  icon?: ReactNode;
  title: string;
  description: string;
  footer: ReactNode;
  image?: ReactNode;
}

const Capabilities = () => {
  const data: CapabilitiesData[] = [
    {
      icon: <Factory className="text-blue-800" />,
      title: "Precison Manufacturing",
      description:
        "Our facilities leverages automated synthesis and modular clean room enviornments to ensure molecule integrity at every stage of production.",
      footer: (
        <>
          <Link className="text-blue-800" href={"/about"}>
            View Manufacturing Standards
          </Link>
        </>
      ),
    },

    {
      icon: <Box className="text-green-800" />,
      title: "Global Logistics",
      description:
        "Cold-chain speacialized distribution networks reaching over 120 countries",
      footer: (
        <>
          <p className="text-muted-foreground">Operational 24/7</p>
        </>
      ),
    },
    {
      icon: <ShieldEllipsis className="text-fuchsia-800" />,
      title: "Regulatory Data",
      description:
        "Real-time pharmacovigilence tracking and clinical data transparency protocols.",
      footer: <></>,
    },
    {
      title: "R&D Pipeline",
      description:
        "Focused on oncology, neurology and rare metabolic disorders.",
      footer: (
        <ul className="list-disc list-inside">
          <li>Phase 3: CP-8041 (oncology)</li>
          <li>Phase 3: CP-8042 (neurology)</li>
        </ul>
      ),
      image: (
        <div className="shadow bg-muted-foreground/10 max-h-36 overflow-hidden relative">
          <Image
            src="/hero2.jpg"
            alt="Capabilities"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-xs"
          />
          <Link href={"/about"} className="text-primary absolute bottom-2 left-2 bg-accent px-2 py-1 rounded-xs">
            Active Research Data
          </Link>
        </div>
      ),
    },
  ];
  return (
    <section className="py-12">
      <div className="container">
        {/* HEADING  */}
        <div className="relative w-fit">
          <h2 className="heading-2">
            Institutional Capabilities
          </h2>
          {/* BORDER  */}
          <div className="absolute h-1 w-1/2 bg-primary mt-2" />
        </div>

        {/* CONTENT  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-8">
          {data.map((item, index) => (
            <div
              className={cn(
                "bg-white shadow-sm rounded-xs px-4 py-8 flex gap-4",
                (index === 0 || index === 3) && "md:col-span-2",
              )}
            >
              <div>
                {/* ICON  */}
                {item.icon && <div className="text-4xl mb-2">{item.icon}</div>}
                {/* TITLE  */}
                <h2 className="text-2xl font-semibold font-primary">
                  {item.title}
                </h2>
                {/* DESCRIPTION  */}
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                {/* FOOTER  */}
                {item.footer && <div className="text-sm">{item.footer}</div>}
              </div>
              {/* IMAGE   */}
              {item.image && <div>{item.image}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
