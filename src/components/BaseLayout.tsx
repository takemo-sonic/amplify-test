'use client';

import '@aws-amplify/ui-react/styles.css';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};

const BaseLayoutWithAuthenticator = withAuthenticator(BaseLayout);

export { BaseLayoutWithAuthenticator as BaseLayout };
