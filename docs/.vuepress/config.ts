import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "zh-CN",
  title: "风の跡",
  description: "SeekWind uultimate blog!!!",
  base: "/",
  theme,
  head: [
    [
      'link',
      { rel: 'icon', href: 'favicon.png' }
    ]
  ],
});
