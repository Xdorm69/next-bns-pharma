// components/StructuredData.tsx
// This tells Google detailed info about your business → can appear in Knowledge Panel.

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BNS Pharma",
    alternateName: "BNS Pharmaceuticals",
    url: "https://bnspharmaceuticals.com",
    logo: "https://bnspharmaceuticals.com/company_logo.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-7696291637",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Punjabi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-7696779637",
        contactType: "sales",
        areaServed: "IN",
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "13 No. Second Floor, City Court, Dhakoli",
        addressLocality: "Zirakpur",
        addressRegion: "Punjab",
        postalCode: "140603",
        addressCountry: "IN",
      },
    ],
    email: "bnspharma@gmail.com",
    sameAs: [
      // Add your social profiles here when you create them:
      // "https://www.facebook.com/bnspharma",
      // "https://www.linkedin.com/company/bnspharma",
      // "https://www.instagram.com/bnspharma",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bnspharmaceuticals.com",
    name: "BNS Pharma",
    image: "https://bnspharmaceuticals.com/company_logo.png",
    telephone: "+91-7696291637",
    email: "bnspharma@gmail.com",
    url: "https://bnspharmaceuticals.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "13 No. Second Floor, City Court, Dhakoli",
      addressLocality: "Zirakpur",
      addressRegion: "Punjab",
      postalCode: "140603",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.6436,
      longitude: 76.8214,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    priceRange: "₹₹",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
