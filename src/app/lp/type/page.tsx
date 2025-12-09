'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DIAGNOSIS_PATTERNS } from '@/lib/diagnosis';

export default function TypeListPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Texture/Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white/80 py-4 shadow-sm backdrop-blur-xl transition-all duration-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          <Link href="/lp" className="flex items-center group cursor-pointer">
            {/* ロゴ */}
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-full"></div>
              <Image
                src="/images/patterns/logo.png"
                alt="Vision Me ロゴ"
                width={64}
                height={64}
                className="w-10 h-10 md:w-12 md:h-12 mr-3 relative z-10 transition-transform duration-300 group-hover:rotate-12"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              Vision Me
              <span className="ml-2 align-top text-[10px] font-semibold px-2 py-0.5 rounded-full border border-indigo-100 text-indigo-500 bg-indigo-50/50">
                BETA
              </span>
            </span>
          </Link>

          <nav className="hidden md:block">
            <div className="flex items-center gap-6">
              <Link
                href="/lp"
                className="text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-indigo-600"
              >
                トップへ戻る
              </Link>
              <Link
                href="/"
                className="group relative overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/20"
              >
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative z-10 flex items-center gap-2">
                  診断する
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-24 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero Area */}
          <div className="mb-8 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-100 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span className="text-xs font-medium text-slate-500 tracking-wider uppercase">Personality Types</span>
            </div>
            <h1 className="mb-6 text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900">
                性格タイプ一覧
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500">
              Vision Meは、あなたの性格特性を32種類のキャラクターで表現します。<br className="hidden md:block" />
              それぞれのタイプが持つ独自の強みと可能性を発見しましょう。
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DIAGNOSIS_PATTERNS.map((pattern) => (
              <div
                key={pattern.id}
                id={pattern.id}
                className="group relative flex flex-col h-full bg-white rounded-[2rem] p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 border border-slate-100 scroll-mt-32"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-slate-50 mb-5">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"></div>
                  <Image
                    src={pattern.image}
                    alt={pattern.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* English Name Overlay */}
                  <div className="absolute bottom-3 right-4 z-20 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-xs font-bold text-white bg-black/20 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest">
                      {pattern.id}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col px-2">
                  <div className="mb-auto">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                        {pattern.name}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-indigo-500 mb-3">
                      {pattern.description}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 mb-4 group-hover:text-slate-700 transition-colors">
                      {pattern.short_description}
                    </p>

                    {/* Compatibility Info */}
                    {(pattern.bestCompatibility || pattern.worstCompatibility) && (
                      <div className="space-y-2 mb-3">
                        {pattern.bestCompatibility && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-green-600">◎最高の相性:</span>
                            <a
                              href={`#${pattern.bestCompatibility.id}`}
                              className="text-xs text-slate-700 font-medium underline hover:text-indigo-600 transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(pattern.bestCompatibility!.id)?.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center'
                                });
                              }}
                            >
                              {pattern.bestCompatibility.name}
                            </a>
                          </div>
                        )}
                        {pattern.worstCompatibility && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-red-600">×最悪の相性:</span>
                            <a
                              href={`#${pattern.worstCompatibility.id}`}
                              className="text-xs text-slate-700 font-medium underline hover:text-indigo-600 transition-colors cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(pattern.worstCompatibility!.id)?.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center'
                                });
                              }}
                            >
                              {pattern.worstCompatibility.name}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Keywords Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-50">
                    {pattern.keywords.split(',').slice(0, 3).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-medium text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300"
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 md:px-8 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-bold text-white tracking-tight mb-2">
              Vision Me
            </div>
            <p className="text-sm text-slate-500">
              あなたの可能性を最大化するパートナー
            </p>
          </div>
          <div className="text-sm font-medium">
            &copy; {new Date().getFullYear()} Vision Me All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
