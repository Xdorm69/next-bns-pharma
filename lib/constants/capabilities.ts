// /lib/constants/capabilities.ts

export const capabilities = {
  data: [
    {
      icon: "factory",
      title: "Precision Manufacturing",
      description:
        "Our facilities leverage automated synthesis and modular clean room environments to ensure molecule integrity at every stage of production.",
      footer: {
        type: "link",
        href: "/about",
        text: "View Manufacturing Standards",
      },
    },
    {
      icon: "box",
      title: "Global Logistics",
      description:
        "Cold-chain specialized distribution networks reaching over 120 countries",
      footer: {
        type: "text",
        text: "Operational 24/7",
      },
    },
    {
      icon: "shield-ellipsis",
      title: "Regulatory Data",
      description:
        "Real-time pharmacovigilance tracking and clinical data transparency protocols.",
      footer: null,
    },
    {
      title: "R&D Pipeline",
      description:
        "Focused on oncology, neurology and rare metabolic disorders.",
      footer: {
        type: "list",
        items: ["Phase 3: CP-8041 (oncology)", "Phase 3: CP-8042 (neurology)"],
      },
      image: "/hero2.webp",
    },
  ],
};
