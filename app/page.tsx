import { Button } from '@/components/ui/button';
import { headers } from 'next/headers';
import Link from 'next/link';
export default async function Home() {
  // Get the host from headers for server-side fetch
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const res = await fetch(`${protocol}://${host}/api/me`, {
    cache: 'no-store',
  });
  const data = await res.json();

  return (
    <div>
      <main className="flex flex-col gap-4 items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">NightOwl</h1>
        <Button
          className="cursor-pointer"
          variant="outline"
        >
          <Link href="/login">Get Started</Link>
        </Button>
      </main>
    </div>
  );
}
