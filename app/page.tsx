import { Button } from '@/components/ui/button';
import { auth0 } from '@/lib/auth0';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  console.log(user);

  return (
    <div>
      <main className="flex flex-col gap-4 items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">NightOwl</h1>
        <Button className="cursor-pointer" variant="outline">
          <Link href="/auth/login?returnTo=/registration">Get Started</Link>
        </Button>
        {user && <p>Welcome {user.name}</p>}
        {user && (
          <Button className="cursor-pointer" variant="outline">
            <Link href="/auth/logout">Logout</Link>
          </Button>
        )}
      </main>
    </div>
  );
}
