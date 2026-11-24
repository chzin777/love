# Nossa História

Página pessoal e interativa para casal: linha do tempo, contador de tempo juntos, contagem regressiva, histórias em formato "stories", jogo de palavras e lista de motivos — com efeitos visuais (pétalas, estrelas cadentes, véu animado).

**Produção:** https://love-flax-six.vercel.app

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- GSAP, Motion e Lenis (animações e rolagem)
- OGL (efeitos WebGL do fundo)

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

Sem variáveis de ambiente — site estático.

## Estrutura

```
app/                 layout e página única
components/
  Timeline.tsx       linha do tempo do relacionamento
  TogetherCounter.tsx / CountUp.tsx   tempo juntos
  Countdown.tsx      contagem regressiva para a próxima data
  Stories.tsx / ScrollStack.tsx / Stack.tsx   cards e histórias
  WordGame.tsx       jogo de palavras
  FinalStory.tsx     encerramento
  PetalEffect, ShootingStars, DarkVeil, FallingFeather   efeitos visuais
utils/reasons.ts     lista de motivos exibida na página
public/              fotos e mídias
```

Para personalizar, troque as fotos em `public/`, os textos nos componentes e a lista em `utils/reasons.ts`.

## Deploy

Vercel — cada push na branch padrão publica automaticamente.
