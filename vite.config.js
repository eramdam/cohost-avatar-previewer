import minifyHTML from "rollup-plugin-minify-html-literals";

/** @type {import('vite').UserConfig} */
export default {
  build: {
    assetsInlineLimit: 0,
  },
  plugins: [minifyHTML.default()],
};
