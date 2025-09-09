import ProductPageCardRender from "@/components/ProductPageCardRender";



const page = () => {
  return (
    <section className="w-full min-h-screen my-10">
      <div className="cont">
        <h1 className="text-4xl font-bold my-8">PCD Products</h1>
        <ProductPageCardRender type="pcd"/>
      </div>
    </section>
  );
};

export default page;
