import type { AppSyncResolverEvent, AppSyncResolverHandler } from 'aws-lambda';
import { createMessage } from './functions/createMessage';
import { getMessages } from './functions/getMessages';
import { updateMessage } from './functions/updateMessage';

const handlers = {
  getMessages,
  createMessage,
  updateMessage,
};

const isValidFieldName = (
  fieldName: string,
): fieldName is keyof typeof handlers => {
  return fieldName in handlers;
};

type HandlerArguments = (typeof handlers)[keyof typeof handlers];
type HandlerResult = Awaited<ReturnType<HandlerArguments>>;

type Handler = AppSyncResolverHandler<HandlerArguments, HandlerResult>;

export const handler: Handler = async (event, context, callback) => {
  // 何故か型と違う値が来るため、型アサーションを使っている
  const _event = event as AppSyncResolverEvent<
    HandlerArguments,
    Record<string, unknown>
  > & {
    fieldName: string;
  };

  const { fieldName } = _event;

  console.log(`fieldName: ${fieldName}`);

  // 型アサーションを使っているため、fieldNameがhandlersのキーに存在しない場合はエラーを投げる
  if (!isValidFieldName(fieldName)) {
    throw new Error(`Invalid field: ${fieldName}`);
  }

  const handler = handlers[fieldName];

  return await handler(
    // @ts-ignore
    event,
    context,
    callback,
  );
};
