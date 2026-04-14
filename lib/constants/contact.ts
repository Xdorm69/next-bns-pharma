const CardData = [
  {
    icon: "MapPin",
    title: "Corporate Office 1",
    description: "13 No. Second Floor, City Court, Dhakoli, Zirakpur, Punjab",
  },
  {
    icon: "MapPin",
    title: "Corporate Office 2",
    description: "Ground Floor – Shop No. 19 Wadhawa Nagar, Dhakoli",
  },
  {
    icon: "Phone",
    title: "Phone",
    description: "(+91) 7696291637\n7696779637",
  },
  {
    icon: "Mail",
    title: "Email",
    description: "bnspharma@gmail.com",
  },
];

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "You can book an appointment by calling us at (+91) 7696291637, sending an email to bnspharma@gmail.com, or by filling the contact form above. We usually respond within a few hours.",
  },
  {
    q: "Do you offer home delivery for medicines?",
    a: "Yes, we offer home delivery within select areas in Zirakpur and the Tricity region. Please contact us to check availability in your area.",
  },
  {
    q: "Which insurance plans do you accept?",
    a: "We work with most major health insurance providers. Please bring your insurance card when you visit or contact us in advance to verify coverage.",
  },
  {
    q: "Can I get a prescription refill online?",
    a: "For refills, simply email your prescription to bnspharma@gmail.com or WhatsApp us. We'll confirm availability before preparing your order.",
  },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM", closed: false },
  { day: "Saturday", time: "10:00 AM – 5:00 PM", closed: false },
  { day: "Sunday", time: "Closed", closed: true },
];

export const contact = {
  availability: "Available Mon–Sat · 9AM – 7PM",
  title: "We're Here to Help You Feel Better, Faster",
  description:
    "Reach out to our medical team — whether you have questions, need to book an appointment, or want to learn more about our services.",
  cards: CardData,
  faqs: faqs,
  hours: hours,
};
