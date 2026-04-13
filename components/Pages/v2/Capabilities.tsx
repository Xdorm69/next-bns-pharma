
import { PageData } from "@/lib/Constants";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CapabilitiesData {
  icon?: ReactNode;
  title: string;
  description: string;
  footer: ReactNode;
  image?: ReactNode;
}

const Capabilities = () => {
  return (
    <section className="py-12">
      <div className="container">
        {/* HEADING  */}
        <div className="relative w-fit">
          <h2 className="heading-2">Institutional Capabilities</h2>
          {/* BORDER  */}
          <div className="absolute h-1 w-1/2 bg-primary mt-2" />
        </div>

        {/* CONTENT  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-8">
          {PageData.capabilities.data.map((item: CapabilitiesData, index) => (
            <div
              key={index}
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
