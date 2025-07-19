import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fetchClient(url: string, options: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return fetch(`${baseUrl}${url}`, options).then((res) => res.json());
}
