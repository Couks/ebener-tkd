import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle } from "lucide-react";

export default function GalleryLoading() {
  const GalleryCardSkeleton = () => (
    <Card className="bg-secondary-900/50 border-secondary-700 flex flex-col overflow-hidden">
      <CardHeader className="p-0 relative h-48 w-full">
        <Skeleton className="h-full w-full" />
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Galerias de Eventos</h1>
          <p className="text-gray-400">Gerencie as fotos dos eventos do site.</p>
        </div>
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <GalleryCardSkeleton />
        <GalleryCardSkeleton />
        <GalleryCardSkeleton />
        <GalleryCardSkeleton />
      </div>
    </div>
  );
}
