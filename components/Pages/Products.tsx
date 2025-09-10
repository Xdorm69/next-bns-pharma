import HomePageProductRender from "../HomePageProductRender";

export default function ProductsPage() {
  return (
    <section className="min-h-screen w-full">
      <div className="cont">
        <div className="mb-4">
          <h1 className="text-4xl font-bold mb-4">PCD Popular Products</h1>
          <HomePageProductRender type="pcd" />
        </div>
        <div className="mt-12">
          <h1 className="text-4xl font-bold mb-4">Third Party Popular Products</h1>
          <HomePageProductRender type="third-party" />
        </div>
      </div>
    </section>
  );
}

