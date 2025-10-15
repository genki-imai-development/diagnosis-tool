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

      // H1 (#) - メインタイトル
      if (line.startsWith('# ')) {
        elements.push(
          <div key={key++} className="mt-8 mb-8">
            <h1 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
              {line.substring(2)}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          </div>
        );
      }
      // H2 (##) - セクションタイトル
      else if (line.startsWith('## ')) {
        elements.push(
          <div key={key++} className="mt-10 mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2">
              {line.substring(3)}
            </h2>
            <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
          </div>
        );
      }
      // H3 (###) - サブセクション
      else if (line.startsWith('### ')) {
        const content = line.substring(4);
        elements.push(
          <div key={key++} className="mt-8 mb-4">
            <h3 className="text-lg md:text-xl font-medium text-slate-800 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3"></div>
              {parseInlineMarkdown(content)}
            </h3>
          </div>
        );
      }
      // H4 (####) - 小見出し
      else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={key++} className="text-base md:text-lg font-medium text-slate-600 mt-6 mb-3 flex items-center">
            <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
            {parseInlineMarkdown(line.substring(5))}
          </h4>
        );
      }
      // 区切り線 (---)
      // else if (line.trim() === '---') {
      //   elements.push(
      //     <div key={key++} className="my-12 flex items-center justify-center">
      //       <div className="flex items-center space-x-2">
      //         <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
      //         <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
      //         <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
      //       </div>
      //     </div>
      //   );
      // }
      // リスト項目 (-)
      else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const indent = line.length - line.trimLeft().length;
        let indentClass = '';
        let bulletStyle = '';
        
        if (indent >= 4) {
          indentClass = 'ml-8';
          bulletStyle = 'w-1.5 h-1.5 bg-purple-400';
        } else if (indent >= 2) {
          indentClass = 'ml-6';
          bulletStyle = 'w-1.5 h-1.5 bg-indigo-400';
        } else {
          indentClass = 'ml-0';
          bulletStyle = 'w-2 h-2 bg-indigo-500';
        }
        
        const content = parseInlineMarkdown(line.trim().substring(2));
        
        elements.push(
          <div key={key++} className={`flex items-start ${indentClass} mb-3`}>
            <div className={`${bulletStyle} rounded-full mt-2.5 mr-4 flex-shrink-0`}></div>
            <span className="text-slate-700 leading-relaxed text-sm md:text-base">{content}</span>
          </div>
        );
      }
      // 数字付きリスト (1.)
      else if (line.trim().match(/^\d+\.\s/)) {
        const indent = line.length - line.trimLeft().length;
        const indentClass = indent >= 2 ? 'ml-6' : 'ml-0';
        const match = line.trim().match(/^(\d+)\.\s(.+)$/);
        
        if (match) {
          const number = match[1];
          const content = parseInlineMarkdown(match[2]);
          
          elements.push(
            <div key={key++} className={`flex items-start ${indentClass} mb-3`}>
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mr-4 mt-0.5 flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                {number}
              </div>
              <span className="text-slate-700 leading-relaxed text-sm md:text-base">{content}</span>
            </div>
          );
        }
      }
      // 通常のテキスト（キャッチコピー的な表示）
      else {
        const content = parseInlineMarkdown(line.trim());
        if (content && content.toString().trim()) {
          elements.push(
            <p key={key++} className="text-slate-600 mb-4 leading-relaxed text-base md:text-lg font-medium underline decoration-slate-400 decoration-2 underline-offset-4">
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
          <strong key={index} className="font-semibold text-slate-900">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="roadmap-content max-w-none prose-slate">
      <div className="space-y-1">
        {parseMarkdown(markdown)}
      </div>
    </div>
  );
};