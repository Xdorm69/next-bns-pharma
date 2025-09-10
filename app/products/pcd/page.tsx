import ProductPageCardRender from "@/components/ProductPageCardRender";

const page = () => {
  return (
    <section className="w-full min-h-screen my-10">
      <div className="cont">
        <div className="mb-4">
          <h1 className="text-4xl font-bold my-2 text-center font-mono">
            PCD Products
          </h1>
          <p className="text-xl w-1/2 mx-auto text-muted-foreground text-center">
            Explore our range of Pharmaseutical Contract Development (PCD)
            products designed for quality and efficiency.
          </p>
        </div>
        <div className="mt-4">
          <ProductPageCardRender type="pcd" />
        </div>
      </div>
    </section>
  );
};

export default page;
