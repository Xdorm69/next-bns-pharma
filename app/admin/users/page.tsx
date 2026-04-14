import React from "react";
import RenderUserTable from "./_components/RenderUserTable";

const page = () => {
  return (
    <section className="my-16 w-full h-screen">
      <div className="container">
        <h2 className="heading-2">Users List</h2>
        <p className="description">This is a list of all the users in our database.</p>

        <RenderUserTable />
      </div>
    </section>
  );
};

export default page;
