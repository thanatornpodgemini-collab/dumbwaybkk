import dynamic from 'next/dynamic';
import { Header } from '@/components/Header';
import { CategoryFilter } from '@/components/CategoryFilter';
import { isSeedDataset, incidents } from '@/lib/incidents';
import { SeedNotice } from '@/components/SeedNotice';

const IncidentMap = dynamic(
  () => import('@/components/IncidentMap').then((m) => m.IncidentMap),
  { ssr: false },
);

export default function HomePage() {
  return (
    <main className="h-dvh flex flex-col bg-dwtd-cream">
      <Header />
      <SeedNotice isSeed={isSeedDataset} count={incidents.length} />
      <div className="flex-1 flex min-h-0">
        <CategoryFilter />
        <section className="flex-1 relative">
          <IncidentMap />
        </section>
      </div>
    </main>
  );
}
