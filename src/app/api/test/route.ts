// src/app/api/test/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // ✅ サーバー側のコンソールにログ出力
  console.log('🚀 =================================');
  console.log('📍 API Route called at:', new Date().toISOString());
  console.log('🖥️  Running on SERVER - NOT browser');
  console.log('📁 Current working directory:', process.cwd());
  console.log('⚡ Node.js version:', process.version);
  console.log('🔧 Process ID:', process.pid);
  console.log('🚀 =================================');
  
  return NextResponse.json({
    message: 'Check your TERMINAL for server logs!',
    instruction: 'Look at the npm run dev terminal window',
    timestamp: new Date().toISOString()
  });
}