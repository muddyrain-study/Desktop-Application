// 主要负责分词的功能

const markdownText = `
## 标题
这是一个段落。

- 列表项 1
- 列表项 2

这是第二个段落。

1. 西瓜
2. 哈密瓜
`;

function tokenize(markdownText) {
  // 1. 将 markdownText 按行分割
  const lines = markdownText.split("\n");
  // 2. 用于存储解析的结果
  const tokens = [];

  for (const line of lines) {
    if (line.startsWith("#")) {
      // 3. 解析标题
      // 4. 确定标题的级别
      const level = line.match(/^#+/)[0].length;
      const text = line.slice(level).trim();
      // 5. 将解析结果存储到 tokens 中
      tokens.push({
        type: "heading",
        level,
        text,
      });
    } else if (line.startsWith("-")) {
      // 6. 解析列表
      const text = line.slice(2).trim();
      tokens.push({
        type: "list-item",
        text,
      });
    } else if (line.match(/^\d+\./)) {
      // 7. 解析有序列表
      const text = line.slice(2).trim();
      tokens.push({
        type: "list-item",
        ordered: true,
        text,
      });
    } else if (line.trim() !== "") {
      // 8. 解析段落
      tokens.push({
        type: "paragraph",
        text: line.trim(),
      });
    }
  }
  return tokens;
}

module.exports = tokenize;
