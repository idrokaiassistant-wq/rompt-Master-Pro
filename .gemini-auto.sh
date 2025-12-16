#!/bin/bash
# Gemini CLI - Avtomatik Background Ishlatish

PROJECT_DIR="/home/damir/Cursor/Prompt_Master_pro"
cd "$PROJECT_DIR" || exit 1

export PATH="$HOME/.npm-global/bin:$PATH"

# Gemini 3 ni faollashtirish (agar kerak bo'lsa)
# export GOOGLE_CLOUD_PROJECT="your_project_id"

# API Key bilan ishlash (agar kerak bo'lsa)
# export GEMINI_API_KEY="your_api_key"

# Gemini CLI ni ishga tushirish
gemini

