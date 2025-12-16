# Gemini CLI To'liq O'chirish Qo'llanmasi

## 🗑️ Avtomatik O'chirish (Tavsiya etiladi)

```bash
cd /home/damir/Cursor/Prompt_Master_pro
./uninstall-gemini.sh
```

Bu script:
- ✅ Global paketni o'chiradi
- ✅ Konfiguratsiya fayllarini tozalaydi
- ✅ Cache ni tozalaydi
- ✅ Bin faylini o'chiradi

## 📝 Qo'lda O'chirish

### 1. Global paketni o'chirish

```bash
export PATH="$HOME/.npm-global/bin:$PATH"
npm uninstall -g @google/gemini-cli
```

### 2. Konfiguratsiya fayllarini o'chirish

```bash
# Butun konfiguratsiya katalogini o'chirish
rm -rf ~/.gemini/

# Yoki faqat bazi fayllarni
rm -f ~/.gemini/auth.json
rm -f ~/.gemini/oauth_creds.json
rm -f ~/.gemini/settings.json
rm -rf ~/.gemini/tmp/
```

### 3. Bin faylini o'chirish

```bash
rm -f ~/.npm-global/bin/gemini
```

### 4. Environment Variable'larni o'chirish

`~/.zshrc` faylini tahrirlang va quyidagi qatorlarni o'chiring:

```bash
# O'chirish kerak bo'lgan qatorlar:
export GEMINI_API_KEY="..."
export GOOGLE_CLOUD_PROJECT="..."
alias gemini-pro='...'
```

Keyin:
```bash
source ~/.zshrc
```

### 5. Cache ni tozalash

```bash
npm cache clean --force
```

## ✅ Tekshirish

O'chirishdan keyin tekshiring:

```bash
# Gemini CLI topilmasligi kerak
which gemini

# Paket topilmasligi kerak
npm list -g @google/gemini-cli

# Konfiguratsiya katalogi yo'q bo'lishi kerak
ls ~/.gemini/ 2>&1
```

## 🔄 Qayta O'rnatish

Agar keyinroq qayta o'rnatmoqchi bo'lsangiz:

```bash
npm install -g @google/gemini-cli
```

## ⚠️ Diqqat

O'chirishdan oldin:
- Autentifikatsiya ma'lumotlarini saqlashni istasangiz, `~/.gemini/` katalogini backup qiling
- API Key'larni saqlang (agar kerak bo'lsa)

## 📁 Yaratilgan Scriptlar

Agar loyihadagi scriptlarni ham o'chirmoqchi bo'lsangiz:

```bash
cd /home/damir/Cursor/Prompt_Master_pro
rm -f start-gemini.sh
rm -f .gemini-auto.sh
rm -f uninstall-gemini.sh
rm -f GEMINI3_SETUP.md
rm -f UNINSTALL.md
rm -f FIX_GEMINI.md
rm -f GEMINI_SETUP.md

# package.json dan scriptni o'chirish (ixtiyoriy)
# "gemini" scriptini o'chiring
```

