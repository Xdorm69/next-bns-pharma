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
    q: "What is PCD Pharma Franchise?",
    a: "PCD Pharma Franchise is a business model where a pharmaceutical company grants rights to distributors or individuals to promote and sell its products in a specific area.",
  },
  {
    q: "Do you offer monopoly rights?",
    a: "Yes, we provide monopoly-based PCD pharma franchise to our partners, ensuring exclusive marketing rights in their area.",
  },
  {
    q: "What products do you offer?",
    a: "We offer a wide range of pharmaceutical products including tablets, capsules, syrups, injections, ointments, and more across multiple therapeutic segments.",
  },
  {
    q: "Is your company WHO-GMP certified?",
    a: "Yes, our products are manufactured in WHO-GMP certified facilities, ensuring high quality and safety standards.",
  },
  {
    q: "What is the minimum order requirement?",
    a: "The minimum order depends on product selection, but we offer flexible and affordable investment options for new distributors.",
  },
  {
    q: "Do you provide promotional support?",
    a: "Yes, we provide promotional materials like visual aids, MR bags, product cards, and other marketing support.",
  },
];

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM", closed: false },
  { day: "Saturday", time: "9:00 AM – 5:00 PM", closed: false },
  { day: "Sunday", time: "Closed", closed: true },
];

export const contact = {
  availability: "Available Mon–Fri · 9AM – 6PM",
  title: "We're Here to Help You Feel Better, Faster",
  description:
    "Reach out to our medical team — whether you have questions, need to book an appointment, or want to learn more about our services.",
  cards: CardData,
  faqs: faqs,
  hours: hours,
};
