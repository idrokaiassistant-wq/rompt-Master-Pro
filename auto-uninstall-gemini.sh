#!/bin/bash
# Gemini CLI Avtomatik O'chirish (Non-interactive)

echo "═══════════════════════════════════════════════════════════"
echo "  GEMINI CLI - AVTOMATIK O'CHIRISH"
echo "═══════════════════════════════════════════════════════════"
echo ""

export PATH="$HOME/.npm-global/bin:$PATH"

# 1. Global paketni o'chirish
echo "1️⃣  Global paketni o'chirilmoqda..."
if command -v gemini &> /dev/null; then
    npm uninstall -g @google/gemini-cli 2>/dev/null && echo "   ✅ Paket o'chirildi" || echo "   ⚠️  Paket o'chirishda muammo"
else
    echo "   ✅ Gemini CLI topilmadi (allaqachon o'chirilgan)"
fi

# 2. Bin faylini o'chirish
echo ""
echo "2️⃣  Bin faylini o'chirilmoqda..."
BIN_FILE="$HOME/.npm-global/bin/gemini"
if [ -f "$BIN_FILE" ]; then
    rm -f "$BIN_FILE" && echo "   ✅ Bin fayli o'chirildi"
else
    echo "   ✅ Bin fayli topilmadi"
fi

# 3. Konfiguratsiya katalogini o'chirish
echo ""
echo "3️⃣  Konfiguratsiya fayllari o'chirilmoqda..."
GEMINI_DIR="$HOME/.gemini"
if [ -d "$GEMINI_DIR" ]; then
    rm -rf "$GEMINI_DIR" && echo "   ✅ ~/.gemini/ katalogi o'chirildi"
else
    echo "   ✅ ~/.gemini/ katalogi topilmadi"
fi

# 4. Cache ni tozalash
echo ""
echo "4️⃣  Cache tozalanmoqda..."
npm cache clean --force 2>/dev/null && echo "   ✅ npm cache tozalandi" || echo "   ⚠️  Cache tozalashda muammo"

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ✅ GEMINI CLI TO'LIQ O'CHIRILDI!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📝 Qo'shimcha qadam:"
echo "   ~/.zshrc faylidan GEMINI_API_KEY ni o'chirishingiz mumkin"
echo ""

