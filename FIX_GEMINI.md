# Gemini CLI Muammosini Hal Qilish

## Muammo
Gemini CLI initialization qismida to'xtab qolgan va `/auth` buyrug'i navbatda turibdi.

## Tezkor Yechim

### 1-qadam: Joriy terminalni yopish

Terminalda (Gemini CLI oynasida):
- `Ctrl+C` bosib chiqish
- Yoki `/quit` yozib Enter bosing

### 2-qadam: To'g'ri katalogga o'tish va ishga tushirish

**YANGI terminal oynasida** quyidagilarni bajaring:

```bash
# 1. To'g'ri katalogga o'tish (MUHIM!)
cd /home/damir/Cursor/Prompt_Master_pro

# 2. PATH ni yangilash
export PATH="$HOME/.npm-global/bin:$PATH"

# 3. Gemini CLI ni ishga tushirish
gemini
```

### 3-qadam: Autentifikatsiya

Terminalda quyidagi buyruqlarni ketma-ket kiriting:

```
/auth
```

Keyin:
1. "Login with Google" ni tanlang
2. Brauzerda Google akkauntingizga kiring
3. Ruxsat bering
4. Terminalga qaytib keladi

### 4-qadam: Tekshirish

Autentifikatsiyadan keyin, terminalda savol bering:

```
Salom, bu loyiha haqida qisqacha ma'lumot bering
```

## Muammo hal qilinmasa

### Variant A: API Key bilan

```bash
# 1. API key oling: https://aistudio.google.com/apikey
export GEMINI_API_KEY="your_api_key_here"

# 2. Gemini CLI ni ishga tushiring
cd /home/damir/Cursor/Prompt_Master_pro
export PATH="$HOME/.npm-global/bin:$PATH"
gemini
```

### Variant B: Cache ni tozalash

```bash
# Cache ni tozalash
rm -rf ~/.gemini/tmp/*
rm -f ~/.gemini/state.json

# Qaytadan ishga tushirish
cd /home/damir/Cursor/Prompt_Master_pro
export PATH="$HOME/.npm-global/bin:$PATH"
gemini
```

## Muhim Eslatmalar

1. **DOIM loyiha katalogida ishlating**: `/home/damir/Cursor/Prompt_Master_pro`
2. **Home directory'da emas**: `~` katalogida ishlatmang
3. **Autentifikatsiya kerak**: Birinchi marta `/auth` buyrug'ini kiriting

