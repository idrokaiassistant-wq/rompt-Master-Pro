#!/bin/bash
# Gemini CLI Avtomatik Ishga Tushirish Script

set -e

echo "═══════════════════════════════════════════════════════════"
echo "  GEMINI CLI - AVTOMATIK ISHGA TUSHIRISH"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Katalog tekshiruvi
PROJECT_DIR="/home/damir/Cursor/Prompt_Master_pro"
cd "$PROJECT_DIR" || {
    echo "❌ Xatolik: $PROJECT_DIR katalogiga o'tib bo'lmadi!"
    exit 1
}

# PATH ni yangilash
export PATH="$HOME/.npm-global/bin:$PATH"

# Gemini CLI mavjudligini tekshirish
if ! command -v gemini &> /dev/null; then
    echo "❌ Gemini CLI topilmadi!"
    echo "   Quyidagi buyruqni ishlating:"
    echo "   npm install -g @google/gemini-cli"
    exit 1
fi

echo "✅ Katalog: $(pwd)"
echo "✅ Gemini CLI versiyasi: $(gemini --version)"
echo ""

# Autentifikatsiya holatini tekshirish
AUTH_FILE="$HOME/.gemini/auth.json"
API_KEY_SET=false

if [ -n "$GEMINI_API_KEY" ]; then
    echo "✅ GEMINI_API_KEY mavjud"
    API_KEY_SET=true
elif [ -f "$AUTH_FILE" ]; then
    echo "✅ Autentifikatsiya fayli mavjud: $AUTH_FILE"
else
    echo "⚠️  Autentifikatsiya talab qilinadi"
    echo ""
    echo "Ikkita variant:"
    echo "1. API Key (Tezkor):"
    echo "   export GEMINI_API_KEY='your_api_key'"
    echo "   ./start-gemini.sh"
    echo ""
    echo "2. OAuth Login:"
    echo "   Terminalda '/auth' buyrug'ini kiriting"
    echo ""
fi

# Gemini 3 ni faollashtirish (agar mavjud bo'lsa)
if [ -z "$GOOGLE_CLOUD_PROJECT" ]; then
    echo ""
    echo "💡 Gemini 3 ni ishlatish uchun (ixtiyoriy):"
    echo "   export GOOGLE_CLOUD_PROJECT='your_project_id'"
    echo ""
fi

echo "═══════════════════════════════════════════════════════════"
echo "  GEMINI CLI ISHGA TUSHIYAPTI..."
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📝 Maslahat:"
echo "   - Terminalda '/auth' yozing (agar autentifikatsiya kerak bo'lsa)"
echo "   - '/help' yordam olish uchun"
echo "   - 'Ctrl+C' chiqish uchun"
echo ""
echo "───────────────────────────────────────────────────────────"
echo ""

# Gemini CLI ni ishga tushirish
exec gemini

