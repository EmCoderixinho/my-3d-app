// Home.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../hooks/useAuthContext';
import Display from '../components/Display';

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();

  if (!user) {
    router.push('/login');
    return null;
  }

  //console.log(documents);

  return (
    <>
    <div className='mb-2'>
      <Display/>
    </div>
    </>
  );
}
