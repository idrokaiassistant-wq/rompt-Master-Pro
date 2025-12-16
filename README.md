# Prompt Master Pro

Professional prompt engineering tool built with Next.js, TypeScript, and AI models.

## Features

- 🤖 Multiple AI model support (OpenRouter, Google Gemini)
- 🌍 Multi-language support (UZ, EN, RU, TR)
- �� Modern UI with Tailwind CSS
- 📝 Prompt templates and history
- ⚙️ Advanced settings (temperature, max tokens)
- 🔒 Secure credential storage

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Internationalization**: next-intl

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Prompt_Master_pro
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
- `OPENROUTER_API_KEY` - Get from [OpenRouter](https://openrouter.ai/)
- `GOOGLE_GEMINI_API_KEY` - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- `PMPRO_CREDENTIALS_SECRET` - Generate with: `openssl rand -base64 32`

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run tests
- `pnpm test:coverage` - Run tests with coverage

## Environment Variables

See `.env.example` for all available environment variables.

## Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Railway will automatically deploy on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Vercel
- Netlify
- AWS
- DigitalOcean

## License

Private - All rights reserved
