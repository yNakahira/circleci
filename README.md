Github-CircleCi連携
================

## 機能一覧
 - Githubのpushを契機にCircleCIでESLintチェックを実行し、結果をSlackへ通知する
 - SaddlerからESLintの結果をPRに直接コメントする

## インストール＆起動方法

事前に Node.jsをインストールしておく必要があります。

### パッケージのインストールとビルド

```zsh
$ npm install

# ES2015 のトランスパイル
$ npm run build
```

## CircleCI→Slack連携

### GitHubリポジトリの準備

CircleCIと連携するためにGitHubのリポジトリを登録します。

### CircleCI

 - https://circleci.comを開き、[Authorize GitHub]を選択
 - [Add Project]から対象のリポジトリを選択

### Slackとの連携

 - 参考:http://qiita.com/su-kun1899/items/640f6fa8b48749396c16

## Saddlerからプルリクエストに直接コメントする

### GitHub
 - [Settings] > [Developer settings] > [Personal Access Tokens]でアクセストークンを作成

### CircleCI
 - 対象プロジェクトの設定画面から[Environment Variables]を選択
 - 下記の値で設定する
  - Name: GITHUB_ACCESS_TOKEN
  - Value: 上で作成したアクセストークン

### run-eslint.shの説明

下記を参考にEslintで実行できるように修正しています。
 - https://github.com/packsaddle/ruby-saddler
 - http://qiita.com/noboru_i/items/2f30296db1c8a6dfbd9b
