# Gemini 3 ni Faollashtirish va Avtomatik Ishga Tushirish

## 🚀 Tezkor Ishga Tushirish

### Variant 1: Script orqali (Tavsiya etiladi)

```bash
cd /home/damir/Cursor/Prompt_Master_pro
./start-gemini.sh
```

Yoki:

```bash
pnpm run gemini
```

### Variant 2: To'g'ridan-to'g'ri

```bash
cd /home/damir/Cursor/Prompt_Master_pro
export PATH="$HOME/.npm-global/bin:$PATH"
gemini
```

## 🔐 Autentifikatsiya

### OAuth Login (Birinchi marta)

Terminalda:
```
/auth
```

Keyin brauzerda autentifikatsiya qiling.

### API Key bilan (Tezkor)

```bash
export GEMINI_API_KEY="your_api_key_here"
./start-gemini.sh
```

## 🌟 Gemini 3 ni Faollashtirish

Gemini 3 ni ishlatish uchun (waitlist ga qo'shiling: https://goo.gle/enable-preview-features):

```bash
# 1. Google Cloud Project ID ni o'rnating
export GOOGLE_CLOUD_PROJECT="your_project_id"

# 2. Gemini CLI ni ishga tushiring
./start-gemini.sh
```

Yoki `start-gemini.sh` faylini tahrirlang va `GOOGLE_CLOUD_PROJECT` ni qo'shing.

## 📝 Scriptlar

### start-gemini.sh
- Avtomatik katalog o'zgartirish
- PATH yangilash
- Autentifikatsiya tekshiruvi
- Gemini CLI ni ishga tushirish

### .gemini-auto.sh
- Minimal konfiguratsiya
- Background ishlatish uchun

## ⚙️ Avtomatik Sozlash

`~/.zshrc` yoki `~/.bashrc` fayliga qo'shing:

```bash
# Gemini CLI
alias gemini-pro='cd /home/damir/Cursor/Prompt_Master_pro && export PATH="$HOME/.npm-global/bin:$PATH" && gemini'

# Gemini 3 bilan
alias gemini3='cd /home/damir/Cursor/Prompt_Master_pro && export PATH="$HOME/.npm-global/bin:$PATH" && export GOOGLE_CLOUD_PROJECT="your_project_id" && gemini'
```

Keyin:
```bash
source ~/.zshrc
gemini-pro  # Yoki gemini3
```

## 🐛 Muammo Hal Qilish

### Initialization to'xtab qolgan

1. Terminalni yoping (`Ctrl+C`)
2. Cache ni tozalash:
   ```bash
   rm -rf ~/.gemini/tmp/*
   ```
3. Qaytadan ishga tushiring:
   ```bash
   ./start-gemini.sh
   ```

### Autentifikatsiya muammosi

```bash
# OAuth creds ni tozalash
rm -f ~/.gemini/oauth_creds.json

# Qaytadan autentifikatsiya
./start-gemini.sh
# Terminalda: /auth
```

## 📚 Qo'shimcha Ma'lumot

- Gemini CLI Docs: https://geminicli.com/docs
- Gemini 3 Waitlist: https://goo.gle/enable-preview-features
- API Key olish: https://aistudio.google.com/apikey

