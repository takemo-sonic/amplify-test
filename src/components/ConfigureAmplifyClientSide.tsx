'use client';

import { Amplify } from 'aws-amplify';
import outputs from '~/amplify_outputs.json';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/server-side-rendering/
 */
Amplify.configure(outputs, {
  ssr: true, // NextjsのクライアントでAmplifyライブラリを使う場合は `ssr: true` にする
});

export const ConfigureAmplifyClientSide = () => {
  return null;
};
