'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function LandingPage() {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setIsHeaderScrolled(scrollY > 100);
      setIsScrollTopVisible(scrollY > 300);
    };

    // スムーススクロール
    const setupSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
          const target = href ? document.querySelector(href) : null;
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    };

    window.addEventListener('scroll', handleScroll);
    setupSmoothScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isHeaderScrolled ? 'bg-white/98' : 'bg-white/95'
      } backdrop-blur-md shadow-sm`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:px-8">
          <div className="flex items-center">
            {/* ロゴ */}
            <img
              src="/images/patterns/logo.svg"
              alt="ロゴ"
              className="w-16 h-16 mr-3"
            />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              ライフコーチAI（ベータ版）
            </span>
          </div>
          
          <nav className="hidden md:block">
            <div className="flex gap-4">
              <Link
                href="/"
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                診断する
              </Link>
              <Link
                href="https://nicky241103.com/contact"
                className="px-6 py-2 border-2 border-indigo-500 text-indigo-600 font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                お問い合わせ
              </Link>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="hero relative min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center overflow-hidden">
        {/* メインのアニメーション背景 */}
        <div className="absolute inset-0 animate-background-shift opacity-20">
          <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent" style={{background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'}} />
        </div>
        
        {/* 浮遊する光の粒子 */}
        <div className="absolute inset-0 overflow-hidden animate-sparkle opacity-40">
          <div className="absolute w-2 h-2 bg-white/40 rounded-full" style={{top: '20px', left: '30px'}} />
          <div className="absolute w-2 h-2 bg-white/30 rounded-full" style={{top: '40px', left: '70px'}} />
          <div className="absolute w-1 h-1 bg-white/50 rounded-full" style={{top: '90px', left: '40px'}} />
          <div className="absolute w-1 h-1 bg-white/30 rounded-full" style={{top: '130px', left: '80px'}} />
          <div className="absolute w-2 h-2 bg-white/40 rounded-full" style={{top: '160px', left: '30px'}} />
        </div>
        
        {/* 動的なオーバーレイ */}
        <div className="absolute inset-0 animate-sweep opacity-30" style={{background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)'}} />
        
        {/* 波紋エフェクト */}
        <div className="absolute inset-0">
          <div className="ripple absolute w-80 h-80 rounded-full bg-gradient-radial from-white/10 to-transparent animate-ripple" style={{top: '20%', left: '10%', animationDelay: '0s'}} />
          <div className="ripple absolute w-52 h-52 rounded-full bg-gradient-radial from-white/10 to-transparent animate-ripple" style={{top: '60%', right: '15%', animationDelay: '2s'}} />
          <div className="ripple absolute w-96 h-96 rounded-full bg-gradient-radial from-white/10 to-transparent animate-ripple" style={{bottom: '10%', left: '30%', animationDelay: '1s'}} />
        </div>
        
        <div className="hero-container relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="hero-content text-white">
            <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-shadow-lg opacity-0 animate-fade-in-up">
              なりたい自分への道筋<br />5分で見える化。<br />ライフコーチAIで。
            </h1>
            <p className="hero-subtitle text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up animation-delay-200">
              大切にしている価値観から理想の未来を描き、<br />
              今いる場所から目標までの具体的な道筋を作成します。
            </p>
            <div className="mb-6 text-white/90 opacity-0 animate-fade-in-up animation-delay-300">
              <div className="flex items-center mb-2">
                <span className="mr-3">✅</span>
                <span>科学的なBig5診断で客観的な自己理解</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="mr-3">✅</span>
                <span>あなたの価値観に基づいた現実的な目標設定</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">✅</span>
                <span>迷わず行動できる段階的なロードマップ</span>
              </div>
            </div>
            <p className="hero-subtitle text-lg md:text-xl mb-8 opacity-0 animate-fade-in-up animation-delay-200">
              「変わりたい」から「変われる」へ。<br />
              あなたの人生を動かす第一歩を、今ここから。
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-fade-in-up animation-delay-400">
              <Link href="/#diagnosis" className="btn btn-primary px-6 md:px-8 py-3 md:py-4 bg-white text-indigo-600 rounded-full font-semibold text-base md:text-lg hover:transform hover:scale-105 transition-all duration-300 shadow-2xl relative overflow-hidden group text-center">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                無料で診断を始める
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero Visual */}
        <div className="hero-visual absolute left-1/3 top-1/2 transform -translate-y-1/2 z-5 animate-fade-in-right animation-delay-600 hidden md:block">
          <Image
            src="/images/patterns/lp.png"
            alt="特性診断・未来予想システムのイメージ"
            width={1200}
            height={720}
            className="hero-image min-w-[1000px] lg:min-w-[1200px] rounded-3xl hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        
        {/* スクロールアイコン */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 cursor-pointer">
            <span className="text-sm mb-2 font-medium">下にスクロール</span>
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-1 h-3 bg-white/60 rounded-full animate-scroll-line"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              こんな悩みはありませんか？
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8 md:mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">😔</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">自分の○○な部分が好きになれない</h3>
              <p className="text-gray-600">自分の性格や行動パターンに満足できず、コンプレックスを感じている</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">🤔</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">自分の○○な部分を直したい</h3>
              <p className="text-gray-600">変わりたい気持ちはあるけれど、具体的に何をどう改善すれば良いか分からない</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">自分を変えたい</h3>
              <p className="text-gray-600">漠然と「変わりたい」と思うものの、何をどうすれば良いのか分からない</p>
            </div>
          </div>

          <div className="text-center mb-8 md:mb-16">
            <div className="mb-8 flex justify-center">
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-indigo-500"
              >
                <path 
                  d="M12 4v16m0 0l-6-6m6 6l6-6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              3つのステップで解決します
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 md:p-8 text-white text-center relative">
              <div className="absolute top-4 right-4 bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
              <div className="text-4xl mb-4">🔍</div>
              <h4 className="text-xl font-bold mb-4">自己理解</h4>
              <p className="mb-4">Big5診断であなたの強み・才能を発見</p>
              <ul className="text-base text-left">
                <li>✔︎ 科学的根拠に基づく性格特性分析</li>
                <li>✔︎ あなた独自の強みパターンを可視化</li>
                <li>✔︎ 才能の活かし方をアドバイス</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 md:p-8 text-white text-center relative">
              <div className="absolute top-4 right-4 bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-bold mb-4">目標設定</h4>
              <p className="mb-4">現状と理想の未来のギャップを明確化</p>
              <ul className="text-base text-left">
                <li>✔︎ 人生で大切にしたい価値観の選択</li>
                <li>✔︎ 現状と理想のギャップ解説</li>
                <li>✔︎ ギャップレベルの判定（大・中・小）</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl p-4 md:p-8 text-white text-center relative">
              <div className="absolute top-4 right-4 bg-white text-pink-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
              <div className="text-4xl mb-4">🗺️</div>
              <h4 className="text-xl font-bold mb-4">行動計画</h4>
              <p className="mb-4">目標達成までのロードマップ作成</p>
              <ul className="text-base text-left">
                <li>✔︎ 具体的なアクションプランの提示</li>
                <li>✔︎ 段階的な成長ステップの設計</li>
                <li>✔︎ 継続可能な行動指針の提供</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
                Big5診断で<br />あなたの強み・才能を<br />科学的に発見
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                「ライフコーチAI」は、心理学の5因子モデル（Big5）に基づく科学的なアプローチで、あなたの性格特性を正確に分析します。たった5つの質問に答えるだけで、あなたが持つ強みと才能を明確に把握できます。
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Big5診断では、<strong>開放性・誠実性・外向性・協調性・神経症傾向</strong>の5つの軸であなたの性格を多角的に分析。それぞれの特性がどのような場面で活かされるか、どんな環境で力を発揮できるかを具体的にお伝えします。
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                単なる診断結果ではなく、あなたの人生で大切にしている価値観と組み合わせることで、現状と理想の未来との間にあるギャップを明確にし、目標達成への道筋を描き出します。
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl opacity-30">🧠</div>
              <h3 className="text-2xl font-bold mb-4">Big5診断の特徴</h3>
              <div className="text-left space-y-3">
                <div className="flex items-center">
                  <span className="mr-3">✅</span>
                  <span>科学的根拠に基づく心理学理論</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">✅</span>
                  <span>わずか5問で正確な分析</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">✅</span>
                  <span>あなた独自の強み・才能を発見</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">✅</span>
                  <span>価値観と組み合わせた総合分析</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            3つのステップで理想の未来へ
          </h2>
          
          {/* Feature 1 - 自己理解 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-8 md:mb-24">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">1</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  <div className="hidden md:block">自己理解：</div>Big5診断で強み・才能を発見
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                まずは、自分を知ることから始めましょう。5つの質問に答えるだけで、科学的根拠に基づくBig5診断があなたの性格特性を正確に分析します。開放性、誠実性、外向性、協調性、神経症傾向の5つの軸で、あなた独自の強みパターンを発見できます。
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-indigo-600 mr-3">📊</span>
                  <span className="text-gray-700">5つの質問で性格特性を科学的に分析</span>
                </div>
                <div className="flex items-center">
                  <span className="text-indigo-600 mr-3">💎</span>
                  <span className="text-gray-700">あなただけの強み・才能を明確化</span>
                </div>
                <div className="flex items-center">
                  <span className="text-indigo-600 mr-3">📈</span>
                  <span className="text-gray-700">レーダーチャートで視覚的に理解</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="/images/patterns/step01.png" 
                alt="Big5診断 - 科学的根拠に基づく性格特性分析" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Feature 2 - 目標設定 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-8 md:mb-24">
            <div className="md:order-2">
              <div className="flex items-center mb-6">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">2</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                <div className="hidden md:block">目標設定：</div>現状と理想のギャップを明確化
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                今の自分と理想の自分の違いを明確にしましょう。人生で大切にしている価値観を10個から3個選択し、それぞれについて現状と理想の未来を入力します。AIがギャップを分析し、大・中・小のレベルで目標の難易度を判定します。
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-purple-600 mr-3">💝</span>
                  <span className="text-gray-700">人生で大切にしたい価値観を3つ選択</span>
                </div>
                <div className="flex items-center">
                  <span className="text-purple-600 mr-3">📏</span>
                  <span className="text-gray-700">現状と理想のギャップを定量化</span>
                </div>
                <div className="flex items-center">
                  <span className="text-purple-600 mr-3">🎯</span>
                  <span className="text-gray-700">ギャップレベル（大・中・小）を判定</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="/images/patterns/step02.png" 
                alt="Big5診断 - 科学的根拠に基づく性格特性分析" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Feature 3 - 行動計画 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">3</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                <div className="hidden md:block">行動計画：</div>目標達成までのロードマップ作成
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                やるべきことを整理しましょう。性格診断の結果と価値観の入力内容をもとに、AIが「現状と未来のギャップ解説」「ギャップレベル」「目標達成までのロードマップ」を生成します。具体的で実行可能な行動指針をお届けします。
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-pink-600 mr-3">🗺️</span>
                  <span className="text-gray-700">目標達成までの具体的ロードマップ</span>
                </div>
                <div className="flex items-center">
                  <span className="text-pink-600 mr-3">📋</span>
                  <span className="text-gray-700">段階的なアクションプラン</span>
                </div>
                <div className="flex items-center">
                  <span className="text-pink-600 mr-3">🚀</span>
                  <span className="text-gray-700">継続可能な成長戦略の提示</span>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="/images/patterns/step03.png" 
                alt="Big5診断 - 科学的根拠に基づく性格特性分析" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Detail Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              診断の流れ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              シンプルな5つのステップで、あなたの理想の未来への道筋を明確にします
            </p>
          </div>

          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-4 md:p-8">
              <div className="flex-shrink-0">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-bold text-2xl">1</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Big5診断・強み才能の質問に回答</h3>
                <p className="text-gray-600 text-base md:text-lg">
                  まず、Big5診断と強み・才能を発見するための<strong>5つの質問</strong>にお答えください。科学的根拠に基づく質問で、あなたの性格特性を正確に分析します。所要時間は約3分です。
                </p>
              </div>
              <div className="text-6xl opacity-60">📝</div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-4 md:p-8">
              <div className="flex-shrink-0">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-bold text-2xl">2</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">人生で大事にしている価値を選択</h3>
                <p className="text-gray-600 text-base md:text-lg">
                  人生で大切にしている価値観を<strong>10個の選択肢から3個</strong>選んでください。家族、キャリア、健康、創造性など、あなたが最も重視する価値観を明確にします。
                </p>
              </div>
              <div className="text-6xl opacity-60">💎</div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-gradient-to-r from-pink-50 to-red-50 rounded-3xl p-4 md:p-8">
              <div className="flex-shrink-0">
                <div className="bg-pink-600 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-bold text-2xl">3</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">各価値の現状と理想の未来を入力</h3>
                <p className="text-gray-600 text-base md:text-lg">
                  選択した3つの価値観について、<strong>それぞれの現状と理想の未来</strong>を具体的に入力してください。現在の状況と将来なりたい姿を明確にすることで、ギャップを可視化します。
                </p>
              </div>
              <div className="text-6xl opacity-60">✍️</div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-4 md:p-8">
              <div className="flex-shrink-0">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-bold text-2xl">4</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">AIがBig5診断をスコアリング</h3>
                <p className="text-gray-600 text-base md:text-lg">
                  AIが回答内容を分析し、<strong>Big5診断のスコアリング</strong>を実行。あなたの「強み・才能」を生成し、性格診断の結果をレーダーチャート形式で分かりやすく表示します。
                </p>
              </div>
              <div className="text-6xl opacity-60">🤖</div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-4 md:p-8">
              <div className="flex-shrink-0">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-bold text-2xl">5</div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">総合分析結果とロードマップを表示</h3>
                <p className="text-gray-600 text-base md:text-lg">
                  性格診断の結果と価値観の入力内容をもとに、AIが<strong>「現状と未来のギャップ解説」「ギャップレベル」「目標達成までのロードマップ」</strong>を生成。あなた専用の成長戦略をお届けします。
                </p>
              </div>
              <div className="text-6xl opacity-60">🎯</div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span className="mr-2">🚀</span>
              今すぐ診断を始める
            </Link>
          </div>
        </div>
      </section>

      {/* Next Action Section */}
      {/* <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            診断後のネクストアクション
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            診断結果を活用して、更なる成長を目指しませんか？
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">目標達成の専門家にアドバイスを聞く</h3>
              <p className="text-gray-600 mb-6">
                診断結果をもとに、目標達成の専門家から具体的なアドバイスを受けることで、より効果的な成長戦略を描けます。
              </p>
              <div className="text-sm text-gray-500">※ 別途料金が発生します</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">ライフコーチに伴走してもらう</h3>
              <p className="text-gray-600 mb-6">
                プロのライフコーチが継続的にサポートすることで、迷いが減り、目標達成まで確実に歩み続けることができます。
              </p>
              <div className="text-sm text-gray-500">※ 別途料金が発生します</div>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl">
            <p className="text-lg text-gray-700">
              <strong>プロの視点が入ることで、迷いが減り、継続もしやすくなります。</strong><br />
              まずは無料診断で、あなたの現状と目標を明確にしてみましょう。
            </p>
          </div>
        </div>
      </section> */}

      {/* Organization Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-16 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            運営組織
          </h2>
          <div className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            LIFE UP by YUKI IMAI
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-100">
                  <th className="bg-gray-50 px-4 md:px-6 py-4 md:py-6 text-left font-semibold text-gray-800 w-24 md:w-36 text-sm md:text-base">組織名</th>
                  <td className="px-4 md:px-6 py-4 md:py-6 text-gray-600 text-sm md:text-base">LIFE UP by YUKI IMAI</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <th className="bg-gray-50 px-4 md:px-6 py-4 md:py-6 text-left font-semibold text-gray-800 text-sm md:text-base">事業内容</th>
                  <td className="px-4 md:px-6 py-4 md:py-6 text-gray-600 text-sm md:text-base">
                    ・ナリタイ自分になれる『目標達成コーチング』<br/>
                    ・ライフコーチAIのシステム開発、運営</td>
                </tr>
                <tr>
                  <th className="bg-gray-50 px-4 md:px-6 py-4 md:py-6 text-left font-semibold text-gray-800 text-sm md:text-base">URL</th>
                  <td className="px-4 md:px-6 py-4 md:py-6">
                    <a href="https://mosh.jp/647525/home" target="_blank" className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm md:text-base break-all">
                      https://mosh.jp/647525/home
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <th className="bg-gray-50 px-4 md:px-6 py-4 md:py-6 text-left font-semibold text-gray-800 w-24 md:w-36 text-sm md:text-base">開発者</th>
                  <td className="px-4 md:px-6 py-4 md:py-6 text-gray-600 text-sm md:text-base">
                    <a href="https://nicky241103.com/" target="_blank" className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm md:text-base break-all">
                      https://nicky241103.com/
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-xl font-bold mb-4">
            LIFE UP by YUKI IMAI
          </div>
          {/* <div className="mb-8">
            <Link
              href="#"
              className="text-white/80 hover:text-white transition-colors duration-300 mx-4"
            >
              個人情報保護方針
            </Link>
          </div> */}
          <div className="text-sm text-white/60 border-t border-white/10 pt-4">
            Copyright(c)Future Tech Research Institute Co.,Ltd. all rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 z-50 ${
          isScrollTopVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="ページトップへ戻る"
      >
        ↑
      </button>
    </div>
  );
}

 