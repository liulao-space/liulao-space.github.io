import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3({
      prefix: 'u-',
    }),
  ],
  shortcuts: {
    'u-flex-center': 'u-flex u-items-center u-justify-center',
    'u-text-brand': 'u-text-[#3E94FF]',
    'u-page': 'u-min-h-screen u-flex-center u-bg-#f7f9fc',
  },
})
