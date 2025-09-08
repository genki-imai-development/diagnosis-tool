import { NextRequest, NextResponse } from 'next/server';

// レート制限の設定
interface RateLimitConfig {
  windowMs: number;  // 時間窓（ミリ秒）
  maxRequests: number;  // 最大リクエスト数
}

// IPごとのリクエスト履歴を保存
const requestHistory = new Map<string, number[]>();

// デフォルト設定：1分間に10リクエスト
const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 60 * 1000,  // 1分
  maxRequests: 10
};

/**
 * IPアドレスを取得する関数
 */
function getClientIP(request: NextRequest): string {
  // X-Forwarded-For ヘッダーから取得（プロキシ経由の場合）
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // X-Real-IP ヘッダーから取得
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // 直接接続の場合（開発環境等）
  return '127.0.0.1';
}

/**
 * 古いリクエスト履歴をクリーンアップする関数
 */
function cleanupOldRequests(timestamps: number[], windowMs: number): number[] {
  const now = Date.now();
  return timestamps.filter(timestamp => now - timestamp < windowMs);
}

/**
 * レート制限をチェックする関数
 */
export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig = DEFAULT_CONFIG
): { isAllowed: boolean; remaining: number; resetTime: number } {
  const clientIP = getClientIP(request);
  const now = Date.now();

  // 現在のIP の履歴を取得
  let timestamps = requestHistory.get(clientIP) || [];

  // 古いリクエストを削除
  timestamps = cleanupOldRequests(timestamps, config.windowMs);

  // 制限をチェック
  const isAllowed = timestamps.length < config.maxRequests;
  
  if (isAllowed) {
    // 新しいリクエストを記録
    timestamps.push(now);
    requestHistory.set(clientIP, timestamps);
  }

  // 残りリクエスト数を計算
  const remaining = Math.max(0, config.maxRequests - timestamps.length);

  // リセット時間を計算（最も古いリクエストから窓時間後）
  const resetTime = timestamps.length > 0 
    ? timestamps[0] + config.windowMs
    : now + config.windowMs;

  return { isAllowed, remaining, resetTime };
}

/**
 * レート制限エラーレスポンスを作成する関数
 */
export function createRateLimitResponse(remaining: number, resetTime: number): NextResponse {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
  
  return NextResponse.json(
    {
      error: 'rate_limit_exceeded',
      message: 'リクエスト制限に達しました。しばらく時間をおいてから再度お試しください。',
      retryAfter
    },
    {
      status: 429,
      headers: {
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': Math.floor(resetTime / 1000).toString(),
        'Retry-After': retryAfter.toString()
      }
    }
  );
}

/**
 * レスポンスにレート制限ヘッダーを追加する関数
 */
export function addRateLimitHeaders(
  response: NextResponse,
  remaining: number,
  resetTime: number
): NextResponse {
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', Math.floor(resetTime / 1000).toString());
  return response;
}

// 定期的なクリーンアップ（メモリリーク防止）
setInterval(() => {
  for (const [ip, timestamps] of requestHistory.entries()) {
    const cleaned = cleanupOldRequests(timestamps, DEFAULT_CONFIG.windowMs);
    if (cleaned.length === 0) {
      requestHistory.delete(ip);
    } else {
      requestHistory.set(ip, cleaned);
    }
  }
}, DEFAULT_CONFIG.windowMs); 