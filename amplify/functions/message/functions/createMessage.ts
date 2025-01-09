import type { Schema } from '../../../data/resource';

type Handler = Schema['createMessage']['functionHandler'];

export const createMessage: Handler = async (event) => {
  const message = event.arguments.message;

  return {
    id: '1',
    message,
  };
};
