// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/documents');
  return null; // No need to render anything
}
