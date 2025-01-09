import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { api } from './functions/api/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  api,
});

/**
 * @see https://qiita.com/moritalous/items/76a05676a564960ac974
 * @see https://zenn.dev/marchan/scraps/582bfdf927a96a
 */

const authenticatedUserIamRole =
  backend.auth.resources.authenticatedUserIamRole;
backend.api.resources.lambda.grantInvoke(authenticatedUserIamRole);

const { cfnUserPool } = backend.auth.resources.cfnResources;
// passwordポリシーを緩く設定
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 6,
    requireLowercase: false,
    requireNumbers: false,
    requireSymbols: false,
    requireUppercase: false,
  },
};

// addOutputメソッドを使って、Amplifyのバックエンドリソースを使うための設定を追加します。
// amplify_outputs.jsonにLambda関数名（物理名）を出力するための設定です。
backend.addOutput({
  custom: {
    functions: {
      api: backend.api.resources.lambda.functionName,
    },
  },
});
