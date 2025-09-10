import React from 'react'
import AddProductsForm from '../_components/AddProductsForm';
import { ProtectAdmin } from '@/lib/utils/protectAdmin';

const page = async () => {
  const session = await ProtectAdmin();
  return (
    <section className="h-screen w-full">
      <div className="cont">
        <div className="my-10 flex items-center justify-center flex-col gap-4">
          <h1 className="text-xl font-bold">Welcome, {session?.user?.name}</h1>
          <AddProductsForm />
        </div>
      </div>
    </section>
  );
}

export default page