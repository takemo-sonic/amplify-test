'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { UserSection, type UserSectionProps } from './UserSection';

export type UserSectionContainerProps = Omit<
  UserSectionProps,
  'onSignOut' | 'username'
>;

const UserSectionContainer = ({
  message,
  count,
}: UserSectionContainerProps) => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <UserSection
      username={user?.username ?? 'noname'}
      message={message}
      count={count}
      onSignOut={signOut}
    />
  );
};

export { UserSectionContainer };
