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
    <div className="min-h-screen bg-[#0B1221] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header */}
      <header className={`fixed z-50 top-0 w-full transition-all duration-500 ${
        isHeaderScrolled 
          ? 'bg-[#0B1221]/90 backdrop-blur-md shadow-lg shadow-black/20 py-3 border-b border-white/5' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8">
          <div className="flex items-center group cursor-pointer relative z-50">
            {/* ロゴ */}
            <div className="relative">
              <div className={`absolute inset-0 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full bg-indigo-500`}></div>
              <Image
                src="/images/patterns/logo.png"
                alt="Vision Me ロゴ"
                width={64}
                height={64}
                className="w-8 h-8 md:w-12 md:h-12 mr-3 relative z-10 transition-transform duration-300 group-hover:rotate-12"
              />
            </div>
            <span className="text-lg md:text-2xl font-bold tracking-tight transition-colors duration-300 text-white">
              Vision Me
              <span className="text-[10px] md:text-xs ml-2 align-top font-medium px-2 py-0.5 rounded-full border border-indigo-400/30 text-indigo-300 bg-indigo-500/10">BETA</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <div className="flex items-center gap-2">
              <Link
                href="/lp/type"
                className="text-sm font-medium transition-all duration-300 px-5 py-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/5"
              >
                性格タイプ一覧
              </Link>
              <Link
                target="_blank"
                href="https://mosh.jp/nareru/inquiry"
                className="text-sm font-medium transition-all duration-300 px-5 py-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/5"
              >
                お問い合わせ
              </Link>
              <Link
                href="/"
                className="group relative px-6 py-2.5 text-sm font-bold rounded-full overflow-hidden shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 bg-white text-[#0B1221] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            className="relative z-50 block md:hidden p-2 focus:outline-none"
            aria-label="メニュー"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 rounded-full transition-all duration-300 bg-white ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 rounded-full transition-all duration-300 bg-white ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 rounded-full transition-all duration-300 bg-white ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-[#0B1221]/95 backdrop-blur-xl z-40 transition-all duration-300 md:hidden flex flex-col justify-center items-center ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
            <nav className="flex flex-col items-center gap-8 p-8">
              <Link
                href="/lp/type"
                className="text-xl font-bold text-slate-200 hover:text-indigo-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                性格タイプ一覧
              </Link>
              <Link
                target="_blank"
                href="https://mosh.jp/nareru/inquiry"
                className="text-xl font-bold text-slate-200 hover:text-indigo-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
              </Link>
              <Link
                href="/"
                className="px-8 py-4 bg-white text-[#0B1221] font-bold rounded-full shadow-lg hover:shadow-white/20 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                診断する
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative w-full h-[100dvh] pt-[100px] md:pt-[120px] bg-[#0B1221] overflow-hidden">
        <div className="relative w-full h-full rounded-t-[2.5rem] md:rounded-t-[4rem] overflow-hidden border-t border-white/5 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)] bg-[#0B1221]">
          {/* PC Image */}
          <div className="hidden md:block absolute inset-0 w-full h-full">
            <Image
              src="/images/patterns/lp-pc.png"
              alt="Vision Me Hero PC"
              fill
              className="object-cover object-center opacity-90"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-transparent opacity-80"></div>
          </div>
          {/* SP Image */}
          <div className="block md:hidden absolute inset-0 w-full h-full">
            <Image
              src="/images/patterns/lp-sp.png"
              alt="Vision Me Hero SP"
              fill
              className="object-cover object-center opacity-90"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-transparent opacity-80"></div>
          </div>

          {/* Overlay Content (CTA Button) */}
          <div className="absolute bottom-0 left-0 w-full z-20 pb-24 md:pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
              <div className="animate-fade-in-up animation-delay-400 w-full md:w-auto text-center">
                <Link href="/" className="group relative inline-flex items-center justify-center w-full md:w-auto min-w-[300px] px-8 py-4 bg-white text-[#0B1221] font-bold rounded-full text-center transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.6)] transform hover:-translate-y-1 overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-indigo-50 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                  <span className="text-lg tracking-wide">無料で診断を始める</span>
                  <div className="ml-3 bg-indigo-50 rounded-full p-1.5 group-hover:translate-x-1 transition-transform">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
                <p className="text-slate-400 text-sm mt-4 font-medium tracking-wide">
                  登録不要・約5分で完了
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/40 z-20">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="about" className="py-32 bg-[#0B1221] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-40 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow"></div>
          <div className="absolute top-40 -right-20 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow animation-delay-200"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-4">Current Challenges</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                こんな悩み、抱えていませんか？
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              多くの人が抱える将来への不安や自己認識の課題。<br className="hidden md:block"/>
              Vision Meがその霧を晴らすお手伝いをします。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {[
              { icon: "😔", title: "自己肯定感の低迷", desc: "自分の性格や行動パターンに満足できず、つい他人と比較してコンプレックスを感じてしまう。", bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
              { icon: "🤔", title: "強みがわからない", desc: "自分にはどんな才能があるのか、どんな仕事が向いているのか、客観的なポテンシャルが見えない。", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
              { icon: "❓", title: "方針が見えない", desc: "変わりたいという強い思いはあるけれど、具体的に何をどう変えれば良いのか、最初の一歩が踏み出せない。", bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" }
            ].map((item, idx) => (
              <div key={idx} className="group bg-[#161E32] rounded-[2rem] p-8 shadow-lg border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/10">
                <div className={`w-16 h-16 ${item.bg} ${item.text} border ${item.border} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-3xl`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-1 rounded-full bg-white/5 border border-white/10 shadow-sm mb-8">
              <div className="px-6 py-2 bg-[#161E32] rounded-full text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                Solution
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              3つのステップで<br className="md:hidden"/>解決します
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "自己理解", subtitle: "Big5に基づく性格診断", items: ["あなたのキャラクター判定", "性格特性5因子の分析", "やる気スイッチの特定"], color: "from-indigo-500 to-purple-600", bg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
              { step: "2", title: "詳細分析", subtitle: "AIによる深層分析", items: ["象徴するキーワード抽出", "強みと才能の解説", "適職・避けるべき職業"], color: "from-purple-500 to-pink-500", bg: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
              { step: "3", title: "行動計画", subtitle: "目標達成ロードマップ", items: ["理想の未来の具体化", "メンタルブロックの特定", "具体的アクションプラン"], color: "from-pink-500 to-red-500", bg: "bg-pink-500/10 text-pink-400 border-pink-500/20" }
            ].map((item, idx) => (
              <div key={idx} className={`relative group rounded-[2rem] p-[1px] bg-gradient-to-b ${item.color} bg-opacity-50 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)] transition-shadow duration-300`}>
                <div className="bg-[#161E32] h-full rounded-[2rem] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <span className="text-9xl font-black text-white">{item.step}</span>
                  </div>
                  <div className="relative z-10">
                    <div className={`w-12 h-12 ${item.bg} border rounded-2xl flex items-center justify-center font-bold text-xl mb-6`}>
                      {item.step}
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-slate-100">{item.title}</h4>
                    <p className="text-xs text-slate-500 mb-6 font-bold tracking-wide uppercase">{item.subtitle}</p>
                    <ul className="space-y-3">
                      {item.items.map((listItem, listIdx) => (
                        <li key={listIdx} className="flex items-start text-sm text-slate-400">
                          <span className={`mr-2 mt-0.5 ${item.bg.split(' ')[1]}`}>✔</span>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-32 bg-[#080C17]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-24">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-4">Features</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              理想の未来へ導く<br className="md:hidden" />3つの鍵
            </h2>
          </div>
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 group">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-[2.5rem] rotate-3 transform transition-transform duration-500 group-hover:rotate-6 blur-xl"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 border border-white/10 bg-[#161E32]">
                <Image 
                  src="/images/patterns/step01.png" 
                  alt="Big5診断" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-xl shadow-lg shadow-indigo-900/50">1</span>
                <span className="text-indigo-400 font-bold tracking-wider text-sm">SELF AWARENESS</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                科学的根拠に基づく<br />性格特性診断
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                まずは自分を知ることから。簡単な質問に答えるだけで、外向性・協調性・勤勉性・情動性・創造性の5つの軸からあなたの性格を精緻に分析します。
              </p>
              <ul className="space-y-4">
                {["あなたを示すキャラクター判定", "5因子分析による特性チャート", "モチベーション源泉の解説"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center mb-32 group">
            <div className="md:pl-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-600 text-white font-bold text-xl shadow-lg shadow-purple-900/50">2</span>
                <span className="text-purple-400 font-bold tracking-wider text-sm">DEEP ANALYSIS</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                AIによる<br />深層ポテンシャル分析
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                あなたの回答をAIが深く分析。表面的な性格だけでなく、隠れた才能や、本当に向いている環境・避けるべき環境を明確にします。
              </p>
              <ul className="space-y-4">
                {["象徴するキーワードの抽出", "隠れた強み・才能の発見", "適職・キャリアパスの提案"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-[2.5rem] -rotate-3 transform transition-transform duration-500 group-hover:-rotate-6 blur-xl"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl transition-transform duration-500 group-hover:-translate-y-2 border border-white/10 bg-[#161E32]">
                <Image 
                  src="/images/patterns/step02.png" 
                  alt="詳細分析" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center group">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-pink-500/20 rounded-[2.5rem] rotate-3 transform transition-transform duration-500 group-hover:rotate-6 blur-xl"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-xl transition-transform duration-500 group-hover:-translate-y-2 border border-white/10 bg-[#161E32]">
                <Image 
                  src="/images/patterns/step03.png" 
                  alt="行動計画" 
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-600 text-white font-bold text-xl shadow-lg shadow-pink-900/50">3</span>
                <span className="text-pink-400 font-bold tracking-wider text-sm">ROADMAP</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                目標達成までの<br />具体的ロードマップ
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                分析結果をもとに、あなたの理想の未来を実現するための具体的な行動計画を自動生成。心理的なブロックへの対処法も提示します。
              </p>
              <ul className="space-y-4">
                {["理想の未来の言語化", "行動ストッパーの特定と対策", "実践的アクションプラン"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
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
      <section className="py-32 bg-[#0B1221] relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-24">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-4">Flow</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              診断の流れ
            </h2>
            <p className="text-slate-400 text-lg">
              わずか5分。シンプルな5つのステップで完了します。
            </p>
          </div>

          <div className="relative space-y-12">
            {/* Connecting Line */}
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-900 via-purple-900 to-transparent hidden sm:block"></div>

            {[
              { num: "1", title: "質問に回答", desc: "性格特性傾向を診断するためにYES/NOの質問にお答えください。", detail: "直感で答えるのがポイントです。（所要時間：約1-2分）", icon: "📝", color: "text-indigo-400", border: "border-indigo-500/30", iconBg: "bg-indigo-500/10" },
              { num: "2", title: "価値観を選択", desc: "仕事・健康・お金など、人生で大切にしている価値観を選択。", detail: "あなたの判断基準の核となる部分を明確にします。", icon: "💎", color: "text-purple-400", border: "border-purple-500/30", iconBg: "bg-purple-500/10" },
              { num: "3", title: "詳細入力", desc: "選択した価値観について、より具体的な質問にお答えください。", detail: "AIがあなた独自の思考パターンを深く理解します。", icon: "✍️", color: "text-pink-400", border: "border-pink-500/30", iconBg: "bg-pink-500/10" },
              { num: "4", title: "AI分析", desc: "AIが回答内容を瞬時に分析。性格特性診断を実行。", detail: "あなたの「強み・才能」を言語化します。", icon: "🤖", color: "text-indigo-400", border: "border-indigo-500/30", iconBg: "bg-indigo-500/10" },
              { num: "5", title: "ロードマップ完成", desc: "「理想の未来」「行動ストッパー」「ロードマップ」を完全生成。", detail: "あなただけの成長戦略レポートをお届けします。", icon: "🎯", color: "text-white", border: "border-transparent", bg: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)]" }
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-8 group">
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.bg ? 'bg-white text-[#0B1221]' : 'bg-[#161E32]'} shadow-lg ${step.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`text-2xl font-bold ${!step.bg && step.color}`}>{step.num}</span>
                  </div>
                </div>
                <div className={`flex-1 rounded-[2rem] p-8 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${step.bg ? step.bg : 'bg-[#161E32] border-white/5 hover:border-white/10'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl font-bold ${step.bg ? 'text-white' : 'text-slate-100'}`}>{step.title}</h3>
                    <span className={`text-3xl ${step.bg ? 'opacity-100' : 'opacity-80'} ${step.iconBg} p-2 rounded-lg`}>{step.icon}</span>
                  </div>
                  <p className={`leading-relaxed mb-2 font-medium ${step.bg ? 'text-indigo-100' : 'text-slate-300'}`}>
                    {step.desc}
                  </p>
                  <p className={`text-sm ${step.bg ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-24">
            <Link href="/" className="group inline-flex items-center px-12 py-6 bg-white text-[#0B1221] font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)] transform hover:-translate-y-1">
              <span className="mr-3 text-2xl group-hover:rotate-12 transition-transform duration-300">🚀</span>
              <span className="text-lg">今すぐ診断を始める</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section className="py-24 bg-[#080C17] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold text-slate-200 tracking-wide">運営組織</h2>
          </div>
          
          <div className="bg-[#161E32] rounded-3xl overflow-hidden border border-white/5">
            <div className="divide-y divide-white/5">
              <div className="flex flex-col md:flex-row p-8 items-baseline">
                <div className="w-full md:w-48 font-bold text-slate-500 text-sm mb-2 md:mb-0 uppercase tracking-wider">Organization</div>
                <div className="flex-1 font-medium text-slate-200">Vision Me</div>
              </div>
              <div className="flex flex-col md:flex-row p-8 items-baseline">
                <div className="w-full md:w-48 font-bold text-slate-500 text-sm mb-2 md:mb-0 uppercase tracking-wider">Service</div>
                <div className="flex-1 font-medium text-slate-200">
                  <ul className="space-y-2 text-slate-400">
                    <li>・ナリタイ自分になれる『目標達成コーチング』</li>
                    <li>・Vision Meのシステム開発、運営</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row p-8 items-baseline">
                <div className="w-full md:w-48 font-bold text-slate-500 text-sm mb-2 md:mb-0 uppercase tracking-wider">URL</div>
                <div className="flex-1">
                  <a href="https://mosh.jp/647525/home" target="_blank" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors break-all font-medium">
                    https://mosh.jp/647525/home
                  </a>
                </div>
              </div>
              <div className="flex flex-col md:flex-row p-8 items-baseline">
                <div className="w-full md:w-48 font-bold text-slate-500 text-sm mb-2 md:mb-0 uppercase tracking-wider">Developer</div>
                <div className="flex-1">
                  <a href="https://nicky241103.com/" target="_blank" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors break-all font-medium">
                    https://nicky241103.com/
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1221] text-white py-16 px-4 md:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-bold tracking-tight mb-2 text-white">
              Vision Me
            </div>
            <p className="text-slate-500 text-sm">
              あなたの可能性を最大化するパートナー
            </p>
          </div>
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Vision Me All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-white text-[#0B1221] rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] hover:scale-110 transition-all duration-300 z-50 border border-white/10 ${
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