🚀 フロントエンド

AIベースのプロンプト最適化ウェブサービス

📂 Git / ブランチ戦略
🌿 ブランチ構成
main      → 本番（デプロイ専用）
develop   → 開発統合
feat/*    → 機能開発
fix/*     → バグ修正
main / develop に直接コミット禁止
必ずブランチで作業
1ブランチ = 1Issue
🏷 命名規則
type/feature-name-#issue番号

例

feat/login-#5
fix/register-form-bug-#6
💬 コミット規則
type: メッセージ (#issue番号)
✨ 種類
Type	内容
✨ feat	新機能追加
🐛 fix	バグ修正
♻️ refactor	リファクタリング
💄 style	UI修正
🔥 del	不要コード削除
📝 chore	ドキュメント
🚀 deploy	デプロイ
✅ test	テスト

例

git commit -m "✨ feat: テーマ機能追加 (#3)"
git commit -m "🐛 fix: ログインエラー修正 (#7)"
🔀 マージルール
PR（Pull Request）必須
1人以上の承認必要
作業前に最新化
git pull origin develop
🧑‍💻 コーディング規約
📌 命名
対象	ルール
コンポーネント	PascalCase
フォルダ	camelCase
変数 / 関数	camelCase
定数	BIG_SNAKE_CASE
📌 変数
var 禁止
const 優先
分割代入使用
const { name, age } = user;
📌 関数
const handleClick = () => {};
イベント命名
handle + 機能 + イベント
Boolean
is / can / should / has
📌 TypeScript
interface IntroductionPropTypes {
  name: string;
  age: number;
}
