import { defineClientConfig } from "@vuepress/client";
    import { defineAsyncComponent } from "vue";
import "C:/Users/SeekWind/Documents/seekwindjh.github.io/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";
import Presentation from "C:/Users/SeekWind/Documents/seekwindjh.github.io/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation.js";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Presentation", Presentation);
    
  }
});