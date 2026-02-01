import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'TypeScript Utils',
  description: 'A comprehensive collection of type-safe utility types for TypeScript',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/core' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Usage Examples', link: '/guide/usage' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Core Types', link: '/api/core' },
          { text: 'String Types', link: '/api/string' },
          { text: 'Function Types', link: '/api/function' },
          { text: 'Type Guards', link: '/api/guards' },
          { text: 'Object Types', link: '/api/object' },
          { text: 'Array Types', link: '/api/array' },
          { text: 'Promise Types', link: '/api/promise' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/username/typescript-utils' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    }
  }
})
