# Gemini CLI - Sozlash Qo'llanmasi

## Muammo
Gemini CLI initialization qismida to'xtab qolmoqda, chunki autentifikatsiya qilinmagan.

## Yechim: Autentifikatsiya

### 1-qadam: To'g'ri katalogga o'tish

```bash
cd /home/damir/Cursor/Prompt_Master_pro
export PATH="$HOME/.npm-global/bin:$PATH"
```

### 2-qadam: Gemini CLI ni ishga tushirish

```bash
gemini
```

### 3-qadam: Autentifikatsiya

Terminalda quyidagilardan birini qiling:

#### Variant A: OAuth Login (Tavsiya etiladi - Bepul tier)

1. Terminalda `/auth` yozing va Enter bosing
2. "Login with Google" ni tanlang
3. Brauzerda Google akkauntingizga kiring
4. Ruxsat bering
5. Terminalga qaytib keladi va autentifikatsiya muvaffaqiyatli bo'ladi

**Afzalliklari:**
- Bepul tier: 60 requests/min va 1,000 requests/day
- Gemini 2.5 Pro bilan 1M token context window
- API key boshqarishning hojati yo'q

#### Variant B: API Key

```bash
# API key oling: https://aistudio.google.com/apikey
export GEMINI_API_KEY="your_api_key_here"
gemini
```

**Afzalliklari:**
- Bepul tier: 100 requests/day
- Model tanlash imkoniyati
- To'lovli tierga o'tish mumkin

#### Variant C: Vertex AI (Enterprise)

```bash
export GOOGLE_API_KEY="your_api_key"
export GOOGLE_GENAI_USE_VERTEXAI=true
gemini
```

### 4-qadam: Tekshirish

Autentifikatsiyadan keyin, terminalda savol bering:

```
Salom, bu loyiha haqida qisqacha ma'lumot bering
```

Yoki:

```
src/components/PromptInput.tsx faylini tahlil qil
```

## Qo'shimcha Buyruqlar

- `/help` - Barcha buyruqlar ro'yxati
- `/quit` yoki `Ctrl+C` - Chiqish
- `/chat` - Yangi suhbat boshlash
- `/clear` - Ekranni tozalash

## Maslahatlar

1. **Loyiha katalogida ishlash**: Gemini CLI loyiha katalogida (`Prompt_Master_pro`) ishga tushirilishi kerak, home directory'da emas
2. **GEMINI.md**: Loyiha haqida ma'lumotlar `GEMINI.md` faylida - bu fayl CLI tomonidan avtomatik o'qiladi
3. **Aniq savollar**: Qanchalik aniqroq savol bersangiz, javob shunchalik yaxshi bo'ladi

## Muammo hal qilinmaganmi?

Agar hali ham muammo bo'lsa:

1. Terminalni to'liq yopib, yangi terminal oching
2. `source ~/.zshrc` buyrug'ini ishlating
3. `cd /home/damir/Cursor/Prompt_Master_pro` bilan katalogga o'ting
4. `gemini` ni qaytadan ishga tushiring
5. `/auth` bilan autentifikatsiya qiling

