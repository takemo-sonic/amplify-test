import { MessagesSectionContainer, UserSectionContainer } from '@/components';
import { TodoSection } from '@/features/todo/components';
import { runWithAmplifyServerContext, serverClient } from '@/utils';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import './app.css';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';
import outputs from '~/amplify_outputs.json';

async function App() {
  // サーバーサイドでデータを取得する場合はgenerateServerClientUsingCookies<Schema>()で取得できるServerClientを利用する
  // クライアントサイドでデータを取得する場合はgenerateClient<Schema>()で取得できるClientを利用する
  // 両方とも使い方は一緒
  const { data: sayHelloResult, errors: sayHelloErrors } =
    await serverClient.queries.sayHello({
      name: 'world',
    });

  if (sayHelloErrors) {
    throw new Error(sayHelloErrors[0].message, { cause: sayHelloErrors[0] });
  }

  const message = sayHelloResult?.message ?? '';

  const { data: countResult, errors: countErrors } =
    await serverClient.queries.count();

  if (countErrors) {
    throw new Error(countErrors[0].message, { cause: countErrors[0] });
  }

  const count = countResult?.count ?? 0;

  /**
   * @see https://zenn.dev/marchan/scraps/582bfdf927a96a
   * @see https://dev.classmethod.jp/articles/invoke-existing-lambda-from-amplify-and-react/
   */
  async function invoke() {
    'use server';

    // サーバーサイドで実行する場合はrunWithAmplifyServerContextを利用する
    const credentials = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        const { credentials } = await fetchAuthSession(contextSpec, {});

        if (credentials !== undefined) {
          return credentials;
        }

        throw new Error('Not authenticated');
      },
    });

    const awsRegion = outputs.auth.aws_region;
    const functionName = outputs.custom.functions.api;

    const labmda = new LambdaClient({
      credentials: credentials,
      region: awsRegion,
    });
    const command = new InvokeCommand({
      FunctionName: functionName,
    });
    const response = await labmda.send(command);

    if (response.Payload) {
      const payload = JSON.parse(
        new TextDecoder('utf-8').decode(response.Payload),
      ) as { message: string };

      // サーバーのコンソール側に出力される
      console.log(payload);
    }
  }

  return (
    <main>
      <button type="button" onClick={invoke}>
        Invoke Rest
      </button>
      <MessagesSectionContainer />
      <TodoSection />
      <UserSectionContainer message={message} count={count} />
    </main>
  );
}

export default App;
