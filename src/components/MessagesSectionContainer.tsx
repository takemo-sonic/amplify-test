'use client';

import { Suspense } from 'react';
import { MessagesSection } from './MessagesSection';

const MessagesSectionContainer = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessagesSection />
    </Suspense>
  );
};

export { MessagesSectionContainer };
