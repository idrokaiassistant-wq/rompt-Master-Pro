import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenRouter } from '@openrouter/sdk';
import { readCredentials } from '@/lib/credentials';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function callOpenRouter(apiKey: string, model: string, messages: any[], temperature: number, maxTokens: number) {
  const openrouter = new OpenRouter({
    apiKey: apiKey,
    httpReferer: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    xTitle: 'Prompt Master Pro',
  });

  try {
    const response = await openrouter.chat.send({
      model: model,
      messages: messages as any,
      temperature: temperature,
      maxTokens: maxTokens,
      stream: false,
    });

    return response as any;
  } catch (error: any) {
    const errorMessage = error.message || error.toString() || 'Noma\'lum xatolik';
    throw new Error(`OpenRouter API xatosi: ${errorMessage}`);
  }
}

async function callGoogleGemini(apiKey: string, prompt: string, temperature: number, maxTokens: number) {
  const genAI = new GoogleGenerativeAI(apiKey);

  const modelNames = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
  let lastError: any = null;

  for (const modelName of modelNames) {
    try {
      const genModel = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: Math.min(Math.max(temperature, 0), 1),
          maxOutputTokens: Math.min(Math.max(maxTokens, 1), 2048),
        },
      });

      const result = await genModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text || text.trim() === '') {
        throw new Error('Javob bo\'sh. Iltimos, qayta urinib ko\'ring.');
      }

      return text;
    } catch (error: any) {
      lastError = error;
      const errorMessage = error.message || error.toString() || '';
      const isQuotaError = errorMessage.includes('quota') ||
                          errorMessage.includes('Quota exceeded') ||
                          errorMessage.includes('free_tier') ||
                          errorMessage.includes('RESOURCE_EXHAUSTED');

      if (isQuotaError && modelNames.indexOf(modelName) < modelNames.length - 1) {
        continue;
      }

      if (!isQuotaError) {
        throw error;
      }
    }
  }

  if (lastError) {
    throw new Error(`Google Gemini API xatosi: ${lastError.message || 'Xatolik yuz berdi'}`);
  }

  throw new Error('Google Gemini API xatosi: Barcha modellar muvaffaqiyatsiz.');
}

function buildImprovePrompt(text: string, languageName: string): string {
  return `Siz professional matn muharriri va redaktori sifatida ishlaysiz.
Til: ${languageName}.

Vazifa: Tartibsiz yoki noaniq matnni aniqlik, mantiq va uslub bo'yicha yaxshilang.
Chiqish: faqat yaxshilangan matnni bering, izoh, salomlashuv yoki qo'shimcha sharhlarsiz.

Cheklovlar:
- Kod bloklari, inline code, markdown, HTML taglar, URL, {{placeholder}}, {{token}}, <tag> va shunga o'xshash strukturalarni o'zgartirmang.
- Raqamlangan/bullet ro'yxat tuzilmasini saqlang.
- Agar ma'lumot yetishmasa, o'zingizcha to'ldirmang; mavjudini yaxshilang.
- Ton va tilni saqlang, faqat tushunarlilik va izchillikni oshiring.

Tartibsiz matn:
${text}

Yaxshilangan matn (${languageName}):`;
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const configuredLimit = Number.parseInt(process.env.PMPRO_RATE_LIMIT_MAX || '20', 10);
    const configuredWindowMs = Number.parseInt(process.env.PMPRO_RATE_LIMIT_WINDOW_MS || '60000', 10);
    const limit = Number.isFinite(configuredLimit) && configuredLimit > 0 ? configuredLimit : 20;
    const windowMs = Number.isFinite(configuredWindowMs) && configuredWindowMs > 0 ? configuredWindowMs : 60000;
    const ip = getClientIp(request);
    const rate = checkRateLimit(`improve:${ip}`, limit, windowMs);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Juda ko'p so'rov yuborildi. Iltimos, birozdan keyin qayta urinib ko'ring." },
        {
          status: 429,
          headers: {
            'Retry-After': rate.retryAfterSeconds.toString(),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(rate.resetAt / 1000)),
          },
        }
      );
    }

    const body = await request.json();
    const { text, language } = body;

    if (!text || !language) {
      return NextResponse.json(
        { error: 'Matn va til talab qilinadi' },
        { status: 400 }
      );
    }

    const creds = readCredentials(request);

    // Try Google Gemini first (faster and free)
    const googleApiKey = creds.googleGeminiKey || process.env.GOOGLE_GEMINI_API_KEY || '';

    if (googleApiKey && googleApiKey.trim().startsWith('AIza')) {
      const languageNames: Record<string, string> = {
        uz: "o'zbek",
        en: 'ingliz',
        ru: 'rus',
        tr: 'turk',
      };

      const languageName = languageNames[language] || "o'zbek";
      const prompt = buildImprovePrompt(text, languageName);

      try {
        const output = await callGoogleGemini(googleApiKey, prompt, 0.3, 1024);
        return NextResponse.json({ output: output.trim() });
      } catch (error: any) {
        console.error('Google Gemini error, trying OpenRouter:', error);
      }
    }

    // Fallback to OpenRouter
    const openRouterApiKey = creds.openRouterKey || process.env.OPENROUTER_API_KEY || '';
    if (!openRouterApiKey) {
      return NextResponse.json(
        { error: 'API key topilmadi. Iltimos, Settings sahifasida API key kiriting.' },
        { status: 500 }
      );
    }

    const languageNames: Record<string, string> = {
      uz: "o'zbek",
      en: 'ingliz',
      ru: 'rus',
      tr: 'turk',
    };

    const languageName = languageNames[language] || "o'zbek";

    const systemPrompt = buildImprovePrompt(text, languageName);

    const data = await callOpenRouter(
      openRouterApiKey,
      'google/gemini-2.5-flash',
      [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Matnni yaxshilang.`,
        },
      ],
      0.3,
      1024
    );

    const output = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({ output: output.trim() });
  } catch (error: any) {
    console.error('Improve text error:', error);
    return NextResponse.json(
      { error: error.message || 'Xatolik yuz berdi' },
      { status: 500 }
    );
  }
}
