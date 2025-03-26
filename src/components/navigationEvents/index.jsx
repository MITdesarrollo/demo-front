'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return null;
}
