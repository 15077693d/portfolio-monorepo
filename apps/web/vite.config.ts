import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { default as viteReact } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
    plugins: [TanStackRouterVite(), tailwindcss(), viteReact()],
    //envDir: '../../',
})
