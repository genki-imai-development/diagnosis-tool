import React from 'react';

interface RoadmapRendererProps {
  markdown: string;
}

export const RoadmapRenderer: React.FC<RoadmapRendererProps> = ({ markdown }) => {
  // Markdownを解析してJSXに変換する関数
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // H1 (#)
      if (line.startsWith('# ')) {
        elements.push(
          <div key={key++} className="relative mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 relative inline-block">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mr-3 transition-transform  bg-gradient-to-r from-blue-500 to-purple-500">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <h4 className="text-base md:text-xl font-bold">
                  {line.substring(2)}
                </h4>
              </div>
            </h1>
          </div>
        );
      }
      // H2 (##)
      else if (line.startsWith('## ')) {
        elements.push(
          <div key={key++} className="flex items-center mt-8 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700 leading-tight">
              {line.substring(3)}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent ml-4"></div>
          </div>
        );
      }
      // H3 (###)
      else if (line.startsWith('### ')) {
        const content = line.substring(4);
        elements.push(
          <div key={key++} className="mt-6 mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-gray-700 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-gray-200/50">
              {parseInlineMarkdown(content)}
            </h3>
          </div>
        );
      }
      // H4 (####)
      else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={key++} className="text-base md:text-lg font-medium text-gray-600 mt-4 mb-2 pl-4 border-l-3 border-gradient-to-b from-blue-400 to-purple-400">
            {parseInlineMarkdown(line.substring(5))}
          </h4>
        );
      }
      // 区切り線 (---)
      else if (line.trim() === '---') {
        elements.push(
          <div key={key++} className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="mx-4 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        );
      }
      // リスト項目 (-)
      else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const indent = line.length - line.trimLeft().length;
        let indentClass = '';
        let bulletColor = '';
        
        if (indent >= 4) {
          indentClass = 'ml-8';
          bulletColor = 'bg-purple-400';
        } else if (indent >= 2) {
          indentClass = 'ml-4';
          bulletColor = 'bg-blue-400';
        } else {
          indentClass = 'ml-0';
          bulletColor = 'bg-gradient-to-r from-blue-500 to-purple-500';
        }
        
        const content = parseInlineMarkdown(line.trim().substring(2));
        
        elements.push(
          <div key={key++} className={`flex items-start ${indentClass} mb-3 group`}>
            <div className={`w-2 h-2 ${bulletColor} rounded-full mr-3 mt-2 flex-shrink-0 transition-transform duration-200`}></div>
            <span className="text-gray-700 leading-relaxed transition-colors duration-200">{content}</span>
          </div>
        );
      }
      // 数字付きリスト (1.)
      else if (line.trim().match(/^\d+\.\s/)) {
        const indent = line.length - line.trimLeft().length;
        const indentClass = indent >= 2 ? 'ml-4' : 'ml-0';
        const match = line.trim().match(/^(\d+)\.\s(.+)$/);
        
        if (match) {
          const number = match[1];
          const content = parseInlineMarkdown(match[2]);
          
          elements.push(
            <div key={key++} className={`flex items-start ${indentClass} mb-3 group`}>
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 mt-0.5 flex-shrink-0 flex items-center justify-center text-white text-sm font-medium transition-transform duration-200">
                {number}
              </div>
              <span className="text-gray-700 leading-relaxed transition-colors duration-200">{content}</span>
            </div>
          );
        }
      }
      // 通常のテキスト
      else {
        const content = parseInlineMarkdown(line.trim());
        if (content && content.toString().trim()) {
          elements.push(
            <p key={key++} className="text-gray-700 mb-3 leading-relaxed pl-4 border-l border-gray-200">
              {content}
            </p>
          );
        }
      }
    }

    return elements;
  };

  // インライン要素（太字など）を解析する関数
  const parseInlineMarkdown = (text: string) => {
    // **太字** を処理
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const parts = text.split(boldRegex);
    
    return parts.map((part, index) => {
      // 奇数インデックスは太字の内容
      if (index % 2 === 1) {
        return (
          <strong key={index} className="font-semibold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {part}
          </strong>
        );
      }
      return part;
    });
  };



  return (
    <div 
      className="rounded-2xl p-4 md:p-6 transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, #ffebee 0%, #f3e5f5 20%, #e8eaf6 40%, #e3f2fd 60%, #e0f2f1 80%, #f1f8e9 100%)'
      }}
    >
      {/* 装飾的な背景要素 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -mr-16 -mt-16 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full -ml-12 -mb-12 transition-transform duration-700"></div>
      
      {/* メインコンテンツ */}
      <div className="relative z-10 roadmap-content">
        {parseMarkdown(markdown)}
      </div>
      
      {/* 下部のアクセント */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-b-2xl"></div>
    </div>
  );
}; 