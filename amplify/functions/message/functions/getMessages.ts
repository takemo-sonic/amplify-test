import type { Schema } from '../../../data/resource';

type Handler = Schema['getMessages']['functionHandler'];

export const getMessages: Handler = async () => {
  return {
    messages: [
      {
        id: '1',
        message: 'Hello, world!',
      },
      {
        id: '2',
        message: 'Goodbye, world!',
      },
    ],
  };
};
