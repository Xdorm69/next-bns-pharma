import Skeleton from "@/components/ui/skeleton";

export default function Load() {
  return (
    <div className="container py-24">
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-64 w-full mb-4" />
      <Skeleton className="h-6 w-1/2" />
    </div>
  );
}
