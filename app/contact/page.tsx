import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lollipop, Mail, Phone } from "lucide-react";
import React from "react";

const ContactUsPage = () => {
  const CardData = [
    {
      icon: <Lollipop />,
      title: "Corporate Office 1",
      description:
        "13 No. Second Floor, City Court, Dhakoli, Zirakpur, Punjab",
    },
    {
      icon: <Lollipop />,
      title: "Corporate Office 2",
      description: "Ground Floor - Shop No. 19 Wadhawa Nagar, Dhakoli",
    },
    {
      icon: <Phone />,
      title: "Phone",
      description: "(+91) 7696291637 - 7696779637",
    },
    {
      icon: <Mail />,
      title: "Email",
      description: "bnspharma@gmail.com",
    },
  ];
  return (
    <div className="min-h-screen py-10">
      <div className="cont">
        <h1 className="text-3xl font-bold">Contact Us page</h1>

        {/* CARDS  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 gap-4">
          {CardData.map((card, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {card.icon} {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-mono">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
