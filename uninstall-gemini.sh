#!/bin/bash
# Gemini CLI To'liq O'chirish Script

set -e

echo "═══════════════════════════════════════════════════════════"
echo "  GEMINI CLI - TO'LIQ O'CHIRISH"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "⚠️  DIQQAT: Bu script Gemini CLI ni to'liq o'chiradi!"
echo ""

# Tasdiqlash
read -p "Davom etasizmi? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ O'chirish bekor qilindi."
    exit 0
fi

echo ""
echo "1️⃣  Global paketni o'chirilmoqda..."
export PATH="$HOME/.npm-global/bin:$PATH"

if command -v gemini &> /dev/null; then
    npm uninstall -g @google/gemini-cli 2>/dev/null || echo "   Paket o'chirildi (yoki allaqachon yo'q)"
else
    echo "   ✅ Gemini CLI topilmadi (allaqachon o'chirilgan)"
fi

echo ""
echo "2️⃣  Konfiguratsiya fayllari o'chirilmoqda..."

GEMINI_DIR="$HOME/.gemini"
if [ -d "$GEMINI_DIR" ]; then
    echo "   O'chirilayotgan fayllar:"
    ls -la "$GEMINI_DIR" | grep -v "^d" | awk '{print "   - " $9}' | grep -v "^$" || true
    
    read -p "   ~/.gemini/ katalogini o'chirasizmi? (yes/no): " delete_config
    if [ "$delete_config" = "yes" ]; then
        rm -rf "$GEMINI_DIR"
        echo "   ✅ ~/.gemini/ katalogi o'chirildi"
    else
        echo "   ⚠️  ~/.gemini/ katalogi saqlandi"
    fi
else
    echo "   ✅ ~/.gemini/ katalogi topilmadi"
fi

echo ""
echo "3️⃣  Bin faylini tekshirish..."

BIN_FILE="$HOME/.npm-global/bin/gemini"
if [ -f "$BIN_FILE" ]; then
    rm -f "$BIN_FILE"
    echo "   ✅ Bin fayli o'chirildi: $BIN_FILE"
else
    echo "   ✅ Bin fayli topilmadi"
fi

echo ""
echo "4️⃣  Cache va temporary fayllar tozalash..."

# npm cache
npm cache clean --force 2>/dev/null || true

# Temporary fayllar
if [ -d "$GEMINI_DIR/tmp" ]; then
    rm -rf "$GEMINI_DIR/tmp"/*
    echo "   ✅ Temporary fayllar tozalandi"
fi

echo ""
echo "5️⃣  Environment variable tekshiruvi..."

if [ -n "$GEMINI_API_KEY" ]; then
    echo "   ⚠️  GEMINI_API_KEY environment variable o'rnatilgan"
    echo "      ~/.zshrc yoki ~/.bashrc faylidan o'chirishingiz mumkin"
fi

if [ -n "$GOOGLE_CLOUD_PROJECT" ]; then
    echo "   ⚠️  GOOGLE_CLOUD_PROJECT environment variable o'rnatilgan"
    echo "      ~/.zshrc yoki ~/.bashrc faylidan o'chirishingiz mumkin"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  O'CHIRISH YAKUNLANDI"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "✅ Gemini CLI to'liq o'chirildi!"
echo ""
echo "📝 Qo'shimcha qadamlar:"
echo ""
echo "1. ~/.zshrc yoki ~/.bashrc faylidan quyidagilarni o'chiring:"
echo "   - export GEMINI_API_KEY=..."
echo "   - export GOOGLE_CLOUD_PROJECT=..."
echo "   - alias gemini-pro=..."
echo ""
echo "2. Keyin shell ni yangilang:"
echo "   source ~/.zshrc"
echo ""
echo "3. Qayta o'rnatish uchun:"
echo "   npm install -g @google/gemini-cli"
echo ""
echo "═══════════════════════════════════════════════════════════"

