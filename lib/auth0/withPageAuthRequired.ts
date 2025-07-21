import { redirect } from 'next/navigation';
import { auth0 } from './index';
import { User } from '@auth0/nextjs-auth0/types';

export async function withPageAuthRequired<T>(
  getPage: (session: User, returnTo: string) => Promise<T> | T,
  returnTo: string
): Promise<T> {
  const session = await auth0.getSession();
  if (!session || !session.user) {
    redirect(`/auth/login?returnTo=${returnTo}`);
  }
  return getPage(session.user, returnTo);
}
