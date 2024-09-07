// app/page.tsx
import { redirect,useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  // if (! [ 'linkedin' ,'github' ,'mail'].some(substring => router._.includes(substring)) ) {

    

    redirect('/documents');
  // }
  return null; // No need to render anything
}
