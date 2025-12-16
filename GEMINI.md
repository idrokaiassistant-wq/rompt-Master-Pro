# Prompt Master Pro

**Prompt Master Pro** - bu professional AI prompt generator SaaS dasturi. Next.js, React, TypeScript va Tailwind CSS asosida qurilgan.

## Tech Stack

- **Framework**: Next.js 16.0.10 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui komponentlari
- **State Management**: Zustand
- **Internationalization**: next-intl (uz/en/ru/tr)
- **API Integration**: OpenRouter SDK va Google Generative AI
- **Testing**: Jest + React Testing Library
- **Animations**: Framer Motion

## Asosiy Funksiyalar

1. **Prompt Generator**: AI yordamida promptlar yaratish va yaxshilash
2. **History Management**: Yaratilgan promptlarni saqlash va boshqarish
3. **Templates**: Prompt shablonlarini saqlash va qayta ishlatish
4. **Multi-language**: 4 tilni qo'llab-quvvatlaydi (uzbek, ingliz, rus, turk)
5. **Voice Input**: Ovozli prompt kirish
6. **Advanced Settings**: Model, temperature, maxTokens sozlamalari

## Loyiha Strukturasi

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Bosh sahifa
│   │   ├── history/       # Tarix sahifasi
│   │   ├── templates/     # Shablonlar sahifasi
│   │   └── settings/      # Sozlamalar sahifasi
│   └── api/               # API routes
│       ├── generate/      # Prompt generate endpoint
│       ├── improve-text/  # Matn yaxshilash endpoint
│       └── credentials/   # API key management
├── components/            # React komponentlari
│   ├── ui/               # shadcn/ui komponentlari
│   ├── PromptInput.tsx   # Prompt input komponenti
│   ├── OutputCard.tsx    # Natija ko'rsatish
│   ├── AdvancedSettings.tsx
│   └── ...
├── store/                # Zustand store
│   └── promptStore.ts    # Global state management
├── lib/                  # Utility funksiyalar
│   ├── credentials.ts    # API key boshqaruvi
│   ├── utils.ts          # Helper funksiyalar
│   └── ...
├── messages/             # i18n fayllari
│   ├── uz.json
│   ├── en.json
│   ├── ru.json
│   └── tr.json
└── __tests__/            # Jest testlar
```

## Development Commands

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Production server
pnpm typecheck    # TypeScript check
pnpm lint         # ESLint check
pnpm test         # Jest testlar
pnpm test:coverage # Test coverage
```

## API Integration

Dastur OpenRouter API va Google Generative AI bilan integratsiya qilingan. API kalitlar `src/lib/credentials.ts` da boshqariladi.

## Testing

- Unit testlar: `src/__tests__/` katalogida
- Jest konfiguratsiyasi: `jest.config.js`
- Test coverage threshold: 50%

## Eslatmalar

- Dastur client-side rendering (CSR) va server-side rendering (SSR) qo'llab-quvvatlaydi
- Dark/Light mode mavjud
- PWA (Progressive Web App) qo'llab-quvvatlanadi
- Accessibility (a11y) standartlariga rioya qilinadi

