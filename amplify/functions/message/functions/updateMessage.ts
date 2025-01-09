import type { Schema } from '../../../data/resource';

type Handler = Schema['updateMessage']['functionHandler'];

export const updateMessage: Handler = async (event) => {
  const { id, message } = event.arguments;

  return {
    id,
    message,
  };
};
