export const data = JSON.parse("{\"key\":\"v-454de1b1\",\"path\":\"/tech/best-practice/string-multiple-prefix-judge.html\",\"title\":\"字符串前缀判断的最佳实践\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"字符串前缀判断的最佳实践\",\"date\":\"2022-10-25T22:40:32.000Z\",\"tag\":[\"string\",\"algo\"],\"category\":[\"best practice\"],\"summary\":\"经常面临一类问题，判断该字符串是否以某些字符串开头。例如，输入一个字符串str，判断该字符串是否以字符串数组{\\\"33123\\\",\\\"33124\\\",\\\"32123\\\",\\\"32\\\",\\\"53\\\",\\\"33226\\\"}的任意一个字符串为前缀。在那些烂代码中，我们经常见到这样的实现： 这样的代码，虽然在后续的项目维护中，也算还行，但是一旦情况的数量变多以后，函数将变得非常臃肿。我们可\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vuepress-theme-hope-v2-demo.mrhope.site/tech/best-practice/string-multiple-prefix-judge.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"风の跡\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"字符串前缀判断的最佳实践\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"string\"}],[\"meta\",{\"property\":\"article:tag\",\"content\":\"algo\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-10-25T22:40:32.000Z\"}]]},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"1. 索引的思考\",\"slug\":\"_1-索引的思考\",\"link\":\"#_1-索引的思考\",\"children\":[]},{\"level\":2,\"title\":\"2. 前缀树\",\"slug\":\"_2-前缀树\",\"link\":\"#_2-前缀树\",\"children\":[]},{\"level\":2,\"title\":\"3. Benchmark\",\"slug\":\"_3-benchmark\",\"link\":\"#_3-benchmark\",\"children\":[]}],\"readingTime\":{\"minutes\":3.96,\"words\":1189},\"filePathRelative\":\"tech/best-practice/string-multiple-prefix-judge.md\",\"localizedDate\":\"2022年10月26日\"}")

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
