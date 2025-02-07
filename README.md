# フロントエンド学習　 React & Firebase でアプリ構築

フロントエンドの勉強の応用として、React と Firebase を用いてサーバーレスのアプリ構築しました。  
成果物は、Discord を模倣したチャットアプリです。
Google アカウントでログインし、チャンネルの作成からチャットメッセージの送信が出来ます。  
チャットメッセージはリアルタイムでやり取りが出来ます。

## 完成系のイメージ

![成果物](成果物.gif)

## 主な機能

- ユーザー認証: Google 認証（Firebase Authentication）
- チャット機能: Firestore を使ったリアルタイムチャット
- チャンネル管理: Redux でチャットチャンネルを管理

## 開発環境

- フレームワーク: React + TypeScript
- パッケージマネージャー: npm
- 環境構築: Vite, Docker（DevContainer）

## 技術スタック

- ライブラリ: React, Vite, TypeScript, React-Redux
- 状態管理: redux Toolkit
- スタイリング:Material UI, SCSS

## バックエンド

- プラットフォーム: Firebase
- 認証: Firebase Authentication
- データベース: Firestore
