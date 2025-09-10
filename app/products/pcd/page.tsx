import ProductPageCardRender from "@/components/ProductPageCardRender";

const page = () => {
  return (
    <section className="w-full min-h-screen my-10">
      <div className="cont">
        <div className="mt-4">
          <ProductPageCardRender
            type="pcd"
            title={"PCD Products"}
            description={
              "Explore our range of Pharmaseutical Contract Development (PCD) products designed for quality and efficiency."
            }
          />
        </div>
      </div>
    </section>
  );
};

export default page;
