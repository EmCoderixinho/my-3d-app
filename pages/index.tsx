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

  return (
    <>
    <div className='mb-2'>
      <Display mode="3D" cord_x = {0} cord_y = {0} cord_z= {0}/>
    </div>
    </>
  );
}
