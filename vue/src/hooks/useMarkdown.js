import { ref, watchEffect } from "vue";
import { rules } from "../rules/index.js";
export const useMarkdown = (markdownText) => {
  const markdownResult = ref(null);
  watchEffect(() => {
    if (markdownText.value) {
      let html = markdownText.value;
      rules.forEach(([rule, template]) => {
        html = html.replace(rule, template);
        console.log(html);
      });
      markdownResult.value.innerHTML = html;
    }
  });
  return markdownResult;
};
