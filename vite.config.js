import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import UnpluginComponents from 'unplugin-vue-components/vite'
import UnpluginIcons from 'unplugin-icons/vite'
import UnpluginIconsResolver from 'unplugin-icons/resolver'

import ViteFonts from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnpluginComponents({
            resolvers: UnpluginIconsResolver(),
        }),
        UnpluginIcons({
            autoInstall: true
        }),
        ViteFonts({
            google: {
                preconnect: true,
                display: 'block',
                families: [
                    {
                        name: 'Red Hat Display',
                        styles: 'ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900'
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@@': '/',
            '@': '/src',
            '@assets': '/src/assets',
            '@components': '/src/components',
            '@blocks': '/src/components/blocks',
            '@layouts': '/src/components/layouts',
            '@pages': '/src/components/pages',
            '@reusables': '/src/components/reusables',
            '@global': '/src/global',
            '@modules': '/src/modules',
            '@router': '/src/router',
            '@utils': '/src/utils',
            '@store': '/src/store',
        }
    }
})
