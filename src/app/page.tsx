import { UserSectionContainer } from '../components';
import { TodoSection } from '../features/todo/components';
import { serverClient } from '../utils';
import './app.css';

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

  return (
    <main>
      <TodoSection />
      <UserSectionContainer message={message} count={count} />
    </main>
  );
}

export default App;
