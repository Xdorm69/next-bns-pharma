import ProductPageCardRender from "@/components/ProductPageCardRender";

const page = () => {
  return (
    <section className="w-full min-h-screen my-10">
      <div className="cont">
        <ProductPageCardRender
          type="third-party"
          title="Third-Party Products"
          description="Explore our range of third-party products designed for quality and efficiency."
        />
      </div>
    </section>
  );
};

export default page;
