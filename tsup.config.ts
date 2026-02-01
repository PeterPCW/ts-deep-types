import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: false,
  splitting: false,
  minify: false,
  external: [],
  onSuccess: 'echo "Build complete!"'
})
