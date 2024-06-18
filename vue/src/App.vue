<script setup>
import { ref } from "vue";
import { useMarkdown } from "./hooks/useMarkdown.js";

const markdown = ref("");

const markdownResult = useMarkdown(markdown);
</script>

<template>
  <div class="container">
    <!-- 标题 -->
    <h1 class="heading">Markdown 解析器</h1>
    <div class="preview">
      <!-- 输入 -->
      <div>
        <h2 class="align">Markdown文本</h2>
        <textarea class="inf" v-model="markdown"></textarea>
      </div>
      <!-- 预览 -->
      <div>
        <h2 class="align">效果预览</h2>
        <div class="info" ref="markdownResult"></div>
      </div>
    </div>
  </div>
</template>
