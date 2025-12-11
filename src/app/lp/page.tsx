'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function LandingPage() {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setIsHeaderScrolled(scrollY > 50);
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
            setIsMenuOpen(false);
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
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : isHeaderScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-white/90 backdrop-blur-sm py-4'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8">
          <div className="flex items-center group cursor-pointer relative z-[80]">
            {/* ロゴ */}
            <div className="relative">
              <div className={`absolute inset-0 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full bg-indigo-500`}></div>
              <Image
                src="/images/patterns/logo.png"
                alt="Vision Me ロゴ"
                width={64}
                height={64}
                className="w-10 h-10 md:w-12 md:h-12 mr-3 relative z-10 transition-transform duration-300 group-hover:rotate-12"
              />
            </div>
            <span className="text-lg md:text-2xl font-bold tracking-tight transition-colors duration-300 text-slate-900">
              Vision Me
              <span className="text-[10px] md:text-xs ml-2 align-top font-medium px-2 py-0.5 rounded-full border border-indigo-200 text-indigo-600 bg-indigo-50">BETA</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <div className="flex items-center gap-4">
              <Link
                href="/lp/type"
                className="text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
              >
                性格タイプ一覧
              </Link>
              <Link
                target="_blank"
                href="https://mosh.jp/nareru/inquiry"
                className="text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
              >
                お問い合わせ
              </Link>
              <Link
                href="/"
                className="group relative px-6 py-2.5 text-sm font-bold rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-0.5 bg-slate-900 text-white hover:shadow-indigo-500/30"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  診断する
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[80] block md:hidden p-2 focus:outline-none"
            aria-label="メニュー"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 rounded-full transition-all duration-300 ease-in-out bg-slate-900 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 rounded-full transition-all duration-300 ease-in-out bg-slate-900 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 rounded-full transition-all duration-300 ease-in-out bg-slate-900 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu - Background Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-all duration-400 ease-in-out md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu - Slide Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[70] transition-all duration-400 ease-in-out md:hidden ${
        isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-slate-100 transition-all duration-300 group"
          aria-label="メニューを閉じる"
        >
          <svg
            className="w-6 h-6 text-slate-600 group-hover:text-slate-900 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col h-full pt-24 pb-8 px-6">
          <div className="flex-1 flex flex-col gap-2">
            <Link
              href="/lp/type"
              className={`text-lg font-bold text-slate-900 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 px-6 py-4 rounded-xl transform ${
                isMenuOpen
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '100ms' : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              性格タイプ一覧
            </Link>
            <Link
              target="_blank"
              href="https://mosh.jp/nareru/inquiry"
              className={`text-lg font-bold text-slate-900 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 px-6 py-4 rounded-xl transform ${
                isMenuOpen
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? '200ms' : '0ms' }}
              onClick={() => setIsMenuOpen(false)}
            >
              お問い合わせ
            </Link>
          </div>

          <Link
            href="/"
            className={`w-full px-8 py-4 bg-slate-900 text-white font-bold rounded-full shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center ${
              isMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
            onClick={() => setIsMenuOpen(false)}
          >
            診断する
          </Link>
        </nav>
      </div>
      
      {/* Hero Section */}
      <section className="relative w-full h-[100svh] pt-[72px] md:pt-[80px] bg-white overflow-hidden">
        <div className="relative w-full h-full">
          {/* PC Image */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <Image
              src="/images/patterns/lp-pc.png"
              alt="Vision Me Hero PC"
              fill
              className="object-cover object-top"
              priority
              quality={100}
            />
          </div>
          {/* SP Image - object-position: top を指定して上部の文字が見えるようにする */}
          <div className="block md:hidden absolute inset-0 w-full h-full">
            <Image
              src="/images/patterns/lp-sp.png"
              alt="Vision Me Hero SP"
              fill
              className="object-cover object-top"
              priority
              quality={100}
            />
          </div>

          {/* Overlay Content (CTA Button) */}
          <div className="absolute bottom-0 left-0 w-full z-20 pb-24 md:pb-20 bg-gradient-to-t from-white/90 via-white/50 to-transparent">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
              <div className="animate-fade-in-up animation-delay-400 w-full md:w-auto text-center">
                <Link href="/" className="group relative inline-flex items-center justify-center w-full md:w-auto min-w-[300px] px-8 py-4 bg-slate-900 text-white font-bold rounded-full text-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transform hover:-translate-y-1 overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-2 text-lg tracking-wide">
                    無料で診断を始める
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20 md:mb-24">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-4">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Vision Meの<br className="md:hidden" />3ステップ
            </h2>
          </div>
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-0 items-center mb-24 md:mb-32 group">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-indigo-100 rounded-[2.5rem] rotate-3 transform transition-transform duration-500 group-hover:rotate-6"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl transition-transform duration-500 group-hover:-translate-y-2 border border-slate-100">
                <Image 
                  src="/images/patterns/step01.png" 
                  alt="Big5診断" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 md:ml-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-xl shadow-lg shadow-indigo-200">1</span>
                <span className="text-indigo-600 font-bold tracking-wider text-sm">SELF AWARENESS</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Big5に基づく<br />性格特性診断
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                まずは自分を知ることから。<br/>
                簡単な質問に答えるだけで、外向性・協調性・勤勉性・情動性・創造性の5つの軸からあなたの性格を精緻に分析します。
              </p>
              <ul className="space-y-4">
                {["あなたを示すキャラクター判定", "5因子分析による特性チャート"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-0 items-center mb-24 md:mb-32 group">
            <div className="md:pl-10 md:mr-14">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-600 text-white font-bold text-xl shadow-lg shadow-purple-200">2</span>
                <span className="text-purple-600 font-bold tracking-wider text-sm">DEEP ANALYSIS</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                AIによる<br />ポテンシャル分析
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                あなたの回答をAIが分析。表面的な性格だけでなく、隠れた才能や、本当に向いている環境・避けるべき環境を明確にします。
              </p>
              <ul className="space-y-4">
                {["あなたを象徴するキーワード", "あなたの強み（才能）", "適職・避けるべき職業"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-100 rounded-[2.5rem] -rotate-3 transform transition-transform duration-500 group-hover:-rotate-6"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl transition-transform duration-500 group-hover:-translate-y-2 border border-slate-100">
                <Image 
                  src="/images/patterns/step02.png" 
                  alt="詳細分析" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-0 items-center group">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-pink-100 rounded-[2.5rem] rotate-3 transform transition-transform duration-500 group-hover:rotate-6"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl transition-transform duration-500 group-hover:-translate-y-2 border border-slate-100">
                <Image 
                  src="/images/patterns/step03.png" 
                  alt="行動計画" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 md:ml-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-600 text-white font-bold text-xl shadow-lg shadow-pink-200">3</span>
                <span className="text-pink-600 font-bold tracking-wider text-sm">ROADMAP</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                目標達成までの<br />ロードマップ作成
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                分析結果をもとに、あなたの理想の未来を実現するための具体的な行動計画を自動生成。
              </p>
              <ul className="space-y-4">
                {["あなたの現在地を整理", "あなたの目的地を整理", "実践的アクションプラン"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Detail Section */}
      <section className="py-24 md:py-32 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 md:mb-24">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-4">Flow</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
              診断の流れ
            </h2>
            <p className="text-slate-600 text-lg">
              わずか5分。シンプルな5つのステップで完了します。
            </p>
          </div>

          <div className="relative space-y-8 md:space-y-12">
            {/* Connecting Line */}
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-transparent hidden sm:block"></div>

            {[
              { num: "1", title: "20問の質問に回答", desc: "性格特性傾向を診断するためにYES/NOの質問にお答えください。", detail: "直感で答えるのがポイントです。（所要時間：約1-2分）", icon: "📝", color: "text-indigo-600", border: "border-indigo-100" },
              { num: "2", title: "あなたが重視する価値観を選択", desc: "仕事・健康・お金など、人生で大切にしている価値観を選択。", detail: "あなたの判断基準の核となる部分を明確にします。", icon: "💎", color: "text-purple-600", border: "border-purple-100" },
              { num: "3", title: "5問の具体的な質問に回答", desc: "選択した価値観について、より具体的な質問にお答えください。", detail: "AIがあなた独自の思考パターンを深く理解します。", icon: "✍️", color: "text-pink-600", border: "border-pink-100" },
              { num: "4", title: "AIポテンシャル分析", desc: "AIが回答内容を瞬時に分析。性格特性診断を実行。", detail: "あなたの「強み・才能」を言語化します。", icon: "🤖", color: "text-indigo-600", border: "border-indigo-100" },
              { num: "5", title: "ロードマップ完成", desc: "「理想の未来」「行動ストッパー」「ロードマップ」を完全生成。", detail: "あなただけの成長戦略レポートをお届けします。", icon: "🎯", color: "text-white", border: "border-transparent", bg: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white" }
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-6 md:gap-8 group">
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.bg ? 'bg-slate-900 text-white' : 'bg-white'} shadow-lg ${step.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`text-2xl font-bold ${!step.bg && step.color}`}>{step.num}</span>
                  </div>
                </div>
                <div className={`flex-1 rounded-[2rem] p-6 md:p-8 shadow-sm border transition-all duration-300 hover:shadow-xl ${step.bg ? step.bg : 'bg-white border-slate-100'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl font-bold ${step.bg ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
                    <span className="text-3xl opacity-80">{step.icon}</span>
                  </div>
                  <p className={`leading-relaxed mb-2 font-medium ${step.bg ? 'text-indigo-100' : 'text-slate-800'}`}>
                    {step.desc}
                  </p>
                  <p className={`text-sm ${step.bg ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 md:mt-24">
            <Link href="/" className="group inline-flex items-center px-12 py-6 bg-slate-900 text-white font-bold rounded-full hover:bg-indigo-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-900/20 transform hover:-translate-y-1">
              <span className="mr-3 text-2xl group-hover:rotate-12 transition-transform duration-300">🚀</span>
              <span className="text-lg">今すぐ診断を始める</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold text-slate-900 tracking-wide">運営組織</h2>
          </div>
          
          <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
            <div className="divide-y divide-slate-100">
              <div className="flex flex-col md:flex-row p-6 md:p-8 items-baseline">
                <div className="w-full md:w-48 font-bold text-slate-500 text-sm mb-2 md:mb-0 uppercase tracking-wider">Organization</div>
                <div className="flex-1 font-medium text-slate-900">Vision Me</div>
              </div>
              <div className="flex flex-col md:flex-row p-6 md:p-8 items-baseline">
                <div className="w-full md:w-48 font-bold text-slate-500 text-sm mb-2 md:mb-0 uppercase tracking-wider">Service</div>
                <div className="flex-1 font-medium text-slate-900">
                  <ul className="space-y-2 text-slate-600">
                    <li>・ナリタイ自分になれる『目標達成コーチング』</li>
                    <li>・Vision Meのシステム開発、運営</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row p-6 md:p-8 items-baseline">
                <div className="w-full md:w-48 font-bold text-slate-500 text-sm mb-2 md:mb-0 uppercase tracking-wider">URL</div>
                <div className="flex-1">
                  <a href="https://mosh.jp/647525/home" target="_blank" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors break-all font-medium">
                    https://mosh.jp/647525/home
                  </a>
                </div>
              </div>
              <div className="flex flex-col md:flex-row p-6 md:p-8 items-baseline">
                <div className="w-full md:w-48 font-bold text-slate-500 text-sm mb-2 md:mb-0 uppercase tracking-wider">Developer</div>
                <div className="flex-1">
                  <a href="https://nicky241103.com/" target="_blank" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors break-all font-medium">
                    https://nicky241103.com/
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 md:py-16 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold tracking-tight mb-2">
              Vision Me
            </div>
            <p className="text-slate-400 text-sm">
              あなたの可能性を最大化するパートナー
            </p>
          </div>
          <div className="text-sm text-slate-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} Vision Me All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-indigo-500/50 hover:bg-indigo-900 hover:scale-110 transition-all duration-300 z-50 border border-white/10 ${
          isScrollTopVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'
        }`}
        aria-label="ページトップへ戻る"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}