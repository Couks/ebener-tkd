import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GalleryHorizontal, MessageSquareQuote, Loader2 } from "lucide-react";
import { cookies } from "next/headers";

async function getStats() {
    const cookieStore = cookies();
    // Re-using the logic from the API route directly in a Server Component
    // This is a common pattern to avoid creating an extra API layer for internal data fetching.
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/stats`, {
        headers: { 'Authorization': 'Basic ' + btoa('admin:123') },
        cache: 'no-store', // Ensure fresh data on every load
    });

    if (!response.ok) {
        // Silently fail for the component, error is logged in the API route if needed
        return { galleries: 0, testimonials: 0 };
    }
    return response.json();
}

const StatCard = ({ title, value, icon: Icon }: { title: string, value: number, icon: React.ElementType }) => (
    <Card className="bg-secondary-900/50 border-secondary-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        <Icon className="h-5 w-5 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
);

export default async function StatCards() {
    const stats = await getStats();

    return (
        <>
            <StatCard title="Galerias Criadas" value={stats.galleries} icon={GalleryHorizontal} />
            <StatCard title="Depoimentos" value={stats.testimonials} icon={MessageSquareQuote} />
        </>
    );
}

export function StatCardsSkeleton() {
    const CardSkeleton = () => (
        <Card className="bg-secondary-900/50 border-secondary-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12" />
          </CardContent>
        </Card>
    );

    return (
        <>
            <CardSkeleton />
            <CardSkeleton />
        </>
    );
}
