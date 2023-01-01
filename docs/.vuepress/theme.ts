import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: "SeekWind",
    url: "/",
  },

  iconAssets: "iconfont",

  logo: "/avatar.webp",

  repo: "seekwindJH/seekwindjh.github.io",

  docsDir: "demo/src",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "默认页脚",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "一个有梦想的技术宅",
    intro: "/intro.html",
    medias: {
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=1207629368&site=qq&menu=yes",
      Wechat: "weixin://contacts/profile/XK17703404293",
      GitHub: "https://github.com/seekwindJH",
      Email: "mailto:seekwind@foxmail.com",
      // Baidu: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      // Gitlab: "https://example.com",
      // Gmail: "https://example.com",
      // Instagram: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "seekwindJH/seekwindjh.github.io",
      repoId: "R_kgDOICDxMw",
      category: "Announcements",
      categoryId: "DIC_kwDOICDxM84CRiVS",
    },
    '@vuepress/search': {
      searchMaxSuggestions: 10
    },
    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
