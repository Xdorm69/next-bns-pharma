"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    title: "The Future of Pharma in India",
    excerpt: "A deep dive into innovation, R&D, and global opportunities...",
  },
  {
    title: "Why Affordable Medicine Matters",
    excerpt: "Making healthcare accessible to everyone through innovation...",
  },
  {
    title: "Partnering for Success",
    excerpt: "How distributors can benefit from third-party manufacturing...",
  },
];

export function BlogPreview() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="cont">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Resources & Insights
          </h2>
          <p className="text-muted-foreground mt-2">
            Stay updated with the latest in healthcare and pharma.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <Card
              key={idx}
              className="hover:shadow-md transition-shadow border-none"
            >
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
