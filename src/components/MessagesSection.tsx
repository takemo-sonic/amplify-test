import type { Schema } from '@amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

let messages: {
  id: string;
  message: string;
}[] = [];

const MessagesSection = () => {
  const getMessages = async () => {
    const { data: messagesResult, errors: messagesErrors } =
      await client.queries.getMessages();

    if (messagesErrors) {
      throw new Error(messagesErrors[0].message, {
        cause: messagesErrors[0],
      });
    }

    if (!messagesResult) {
      throw new Error('No messages');
    }

    return messagesResult.messages ?? [];
  };

  if (messages.length === 0) {
    throw getMessages().then((_messages) => {
      messages = _messages;
    });
  }

  const createMessage = async () => {
    const { data: createMessageResult, errors: createMessageErrors } =
      await client.mutations.createMessage({ message: 'Hello, World!' });

    console.log(createMessageResult);

    if (createMessageErrors) {
      throw new Error(createMessageErrors[0].message, {
        cause: createMessageErrors[0],
      });
    }

    if (!createMessageResult) {
      throw new Error('No message');
    }

    console.log(createMessageResult);
  };

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.message}</li>
        ))}
      </ul>
      <button type="button" onClick={createMessage}>
        Create Message
      </button>
    </>
  );
};

export { MessagesSection };
