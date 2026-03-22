"use client";
import { useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react'

const SearchParamsProvider = ({children}: {children: ReactNode}) => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search");
    const take = searchParams.get('take');
    const skip = searchParams.get('skip');
    
  return (
    <div>{children}</div>
  )
}

export default SearchParamsProvider