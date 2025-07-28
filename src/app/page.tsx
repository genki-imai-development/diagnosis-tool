export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            自己診断ツール
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            あなたの性格特性を分析します
          </p>
          
          {/* Tailwind v4のデフォルト色を使用 */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
            診断を開始する
          </button>
        </div>
        
        {/* 特徴セクション */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold mb-2">AI分析</h3>
            <p className="text-gray-600">最新のAI技術を使用</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">5つの特性</h3>
            <p className="text-gray-600">勤勉性、外向性、協調性、情動性、創造性</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">10パターン</h3>
            <p className="text-gray-600">ユニークな性格パターン</p>
          </div>
        </div>
      </div>
    </main>
  );
}
