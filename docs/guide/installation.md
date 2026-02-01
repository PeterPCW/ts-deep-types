# Installation

## npm

```bash
npm install ts-deep-types
```

## pnpm

```bash
pnpm add ts-deep-types
```

## yarn

```bash
yarn add ts-deep-types
```

## TypeScript Version

Requires TypeScript 5.0+ with `strict` mode enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "moduleResolution": "bundler"
  }
}
```

## CDN Usage

For quick prototyping, use via ESM CDN:

```typescript
import { DeepPartial, CamelCase } from 'https://esm.sh/ts-deep-types';
```
