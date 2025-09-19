import Link from "next/link";
import HomePageProductRender from "../HomePageProductRender";
import { Button } from "../ui/button";

export default function ProductsPage() {
  return (
    <section className=" w-full">
      <div className="cont">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold font-mono">
              PCD Popular Products
            </h1>
            <Link href={"/products/pcd"}>
              <Button variant="outline">View More</Button>
            </Link>
          </div>
          <HomePageProductRender type="pcd" />
        </div>
        {/* <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold font-mono">
              Third Party Popular Products
            </h1>
            <Link href={"/products/third-party"}>
              <Button variant="outline">View More</Button>
            </Link>
          </div>
          <HomePageProductRender type="third-party" />
        </div> */}
      </div>
    </section>
  );
}
