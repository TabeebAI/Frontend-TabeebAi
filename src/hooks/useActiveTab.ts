import { useState } from 'react';

export const useActiveTab = (initialId: string) => {
  const [activeId, setActiveId] = useState<string>(initialId);
  return { activeId, setActiveId };
};