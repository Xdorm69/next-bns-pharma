import Capabilities from "@/components/Pages/v2/Capabilities";
import {
  Box,
  Factory,
  ShieldAlert,
  ShieldCheck,
  ShieldEllipsis,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export const ITEMS_PER_PAGE = 12;

export const Images = {
  hero: "/hero2.jpeg",
};

export const PageData = {
  hero: {
    banner: "institutional grade healthcare",
    heading: "Delivering Quality Healthcare Solutions",
    description:
      "Advancing global health through rigrous clinical research, percision manufacturing, and strategic therapeutic distribution. Our protocols define next generation of medical excellence.",
    image: Images.hero,
  },
  productDisplay: {
    products: [
      {
        id: "1d4e66b8-e37e-4169-87a0-5bcef083e4f6",
        title: "MC-Q-10",
        category: "CAPSULE",
        description:
          "Co-Enzyme-Q10, Lycopene , VitaminS ,Zinc Sulphate, Dha & L-Arginine",
        image:
          "https://ik.imagekit.io/amitoj24/products/MC-Q-10-1757578737464_n1hF-zh2p.jpg",
      },
      {
        id: "5f2e882b-bde3-4386-acd2-92679c5a4b24",
        title: "Bitoxvit",
        category: "CAPSULE",
        description:
          "Antioxidant, lycopene ,Multivitamins & Multi-Mineral capsules",
        image:
          "https://ik.imagekit.io/amitoj24/products/Bitoxvit_-1757578494953_u99w_E2SP.jpg",
      },
      {
        id: "e7d799bd-9b89-40b2-a8f5-ce680435726c",
        title: "BMULTI-VIT",
        category: "TABLET",
        description: "Multivitamin & Multiminerals & Antioxidat syrup",
        image:
          "https://ik.imagekit.io/amitoj24/products/BMULTI-VIT-1757577885472_Z6mmojVmL.jpg",
      },
    ],
  },
  trust: {
    heading: "Institutional Trust",
    description:
      "Our partnerships with leading academic institutions and research organizations demonstrate our commitment to scientific excellence and innovation.",
    testimonials: [
      {
        id: 1,
        author: "Dr. Elena",
        dignitary: "Professor of Pharmacology",
        review:
          "BNS Pharma's commitment to research and development has significantly advanced our understanding of drug delivery systems.",
      },
      {
        id: 2,
        author: "Dr. Maria",
        dignitary: "Associate Professor",
        review:
          "BNS Pharma's state-of-the-art manufacturing facilities and rigorous quality control processes have consistently delivered high-quality products.",
      },
      {
        id: 3,
        author: "Dr. Elena2",
        dignitary: "Professor of Pharmacology",
        review:
          "BNS Pharma's commitment to research and development has significantly advanced our understanding of drug delivery systems.",
      },
      {
        id: 4,
        author: "Dr. Maria2",
        dignitary: "Associate Professor",
        review:
          "BNS Pharma's state-of-the-art manufacturing facilities and rigorous quality control processes have consistently delivered high-quality products.",
      },
    ],
  },
  certifications: {
    certifications: [
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
    ],
  },
  capabilities: {
    data: [
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
              src="/hero2.webp"
              alt="Capabilities"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-xs"
            />
            <Link
              href={"/about"}
              className="text-primary absolute bottom-2 left-2 bg-accent px-2 py-1 rounded-xs"
            >
              Active Research Data
            </Link>
          </div>
        ),
      },
    ],
  },
};
