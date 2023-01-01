export const data = JSON.parse("{\"key\":\"v-08107d30\",\"path\":\"/tech/best-practice/string-mutiple-value-judge.html\",\"title\":\"字符串全匹配的最佳实践\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"字符串全匹配的最佳实践\",\"date\":\"2022-12-14T13:50:20.000Z\",\"tag\":[\"string\"],\"category\":[\"best practice\"],\"summary\":\"1. 多个字符串的匹配 在业务逻辑中，不乏包含这类逻辑：判断标志位flag是否为\\\"ONE\\\"或\\\"TWO\\\"或\\\"THREE\\\"。 事实上，我们可以使用Arrays.asList()方法来优化它，而不是使用stream api： 2. 多个字符的匹配 这种业务逻辑更特殊：判断标志位flag是否为'O'或'T'或\\\"R\\\"。 虽然这种方法很特殊，只能用在字符的匹配上，而不能\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-v2-demo.mrhope.site/tech/best-practice/string-mutiple-value-judge.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"风の跡\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"字符串全匹配的最佳实践\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"string\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-12-14T13:50:20.000Z\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"1. 多个字符串的匹配\",\"slug\":\"_1-多个字符串的匹配\",\"link\":\"#_1-多个字符串的匹配\",\"children\":[]},{\"level\":2,\"title\":\"2. 多个字符的匹配\",\"slug\":\"_2-多个字符的匹配\",\"link\":\"#_2-多个字符的匹配\",\"children\":[]}],\"readingTime\":{\"minutes\":0.67,\"words\":201},\"filePathRelative\":\"tech/best-practice/string-mutiple-value-judge.md\",\"localizedDate\":\"2022年12月14日\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
