# 🧠 性格診断・未来予測ツール

AIを活用した性格診断と未来予測アプリケーションです。ユーザーの自由記述回答から性格傾向を分析し、将来の可能性を予測します。

## 🚀 機能

- **性格診断**: 5つの質問への回答から性格特性を分析
- **価値観診断**: 3つの価値項目を選択し、詳細を入力
- **未来予測**: 性格と価値観から現実的・理想的な未来を予測
- **レーダーチャート**: 5つの性格特性を視覚化

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **状態管理**: React Hooks

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── personality-diagnosis/
│   │   └── future-prediction/
│   ├── layout.tsx         # レイアウト
│   └── page.tsx          # メインページ
├── components/            # Reactコンポーネント
│   ├── forms/            # フォーム関連
│   ├── layout/           # レイアウト関連
│   └── ui/               # UI部品
├── hooks/                # カスタムフック
│   ├── useApi.ts         # API関連フック
│   └── useDiagnosis.ts   # 診断フロー管理
├── lib/                  # ライブラリ・ユーティリティ
│   ├── api.ts            # API呼び出し関数
│   ├── constants.ts      # 定数
│   ├── diagnosis.ts      # 診断ロジック
│   └── prompts.ts        # AIプロンプト
├── types/                # 型定義
│   └── diagnosis.ts
└── utils/                # ユーティリティ関数
    └── validation.ts
```

## 🎯 設計思想

### 1. **初心者にやさしい設計**
- 各ファイルの役割を明確に分離
- 豊富なコメントとJSDoc
- 一貫した命名規則

### 2. **保守性重視**
- 共通処理の関数化
- 状態管理の分離
- 型安全性の確保

### 3. **可読性重視**
- シンプルなコンポーネント構造
- 明確なファイル配置
- 統一されたコーディングスタイル

## 💡 主要な設計パターン

### **カスタムフックによる状態管理**
```typescript
// 複雑な診断フローを分離
const useDiagnosis = () => {
  // 状態管理
  // アクション関数
  // 戻り値
}
```

### **共通API関数**
```typescript
// OpenAI API呼び出しを統一
export async function callOpenAiApi(
  systemPrompt: string,
  userPrompt: string,
  temperature?: number
): Promise<any>
```

### **型安全性**
```typescript
// すべての型をtype-only importで統一
import type { DiagnosisResult } from '@/types/diagnosis';
```

## 🔧 開発環境

1. **依存関係のインストール**
   ```bash
   npm install
   ```

2. **環境変数の設定**
   ```bash
   # .env.local
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

## 🎨 コンポーネント設計

### **メインページ（page.tsx）**
- 各ステップのコンポーネントを条件分岐で表示
- `useDiagnosis`フックで状態管理

### **フォームコンポーネント**
- `QuestionForm`: 基本質問
- `ValueSelectionForm`: 価値選択
- `ValueDetailsForm`: 価値詳細入力

### **結果表示コンポーネント**
- `RadarChart`: 性格特性の可視化
- `FuturePrediction`: 未来予測結果

## 🧪 テストの考え方

- **単体テスト**: 各関数の動作確認
- **統合テスト**: API連携の確認
- **E2Eテスト**: ユーザーフローの確認

## 📚 学習リソース

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/docs/)
- [React Hooks 公式ガイド](https://react.dev/reference/react)

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
