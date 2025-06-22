'use client';

import { useState, useEffect } from 'react';

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  // This effect will only run on the client
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // This ensures the component is only rendered on the client
  if (typeof window === 'undefined' || !hasMounted) {
    return null;
  }

  return <>{children}</>;
}
}
