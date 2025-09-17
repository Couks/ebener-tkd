"use client";

// This loading file can re-use the skeleton component from the page
// ensuring consistency.

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function TableSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div>
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-80 mt-2" />
                </div>
                <Skeleton className="h-10 w-32" />
            </div>
            <Card className="bg-secondary-900/50 border-secondary-700">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function TestimonialsLoading() {
  return <TableSkeleton />;
}
