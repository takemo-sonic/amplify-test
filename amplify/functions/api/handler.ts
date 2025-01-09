import type { Handler } from 'aws-lambda';

export const handler: Handler = async () => {
  return {
    message: 'hello!',
  };
};
