import React from "react";
import RenderProductTable from "./_components/RenderProductTable";

const page = () => {
  return (
    <section className="my-16 w-full h-screen">
      <div className="cont">
        <h1 className="text-3xl font-bold font-mono">Products List</h1>
        <p className="text-muted-foreground leading-relaxed">
          Here you can manage all the products in our database.
        </p>
        <RenderProductTable />
      </div>
    </section>
  );
};

export default page;
