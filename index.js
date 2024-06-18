const tokenize = require("./tokenize");
const parse = require("./parse");
const generateHTML = require("./generateHTML");
const markdownText = `
## 标题
这是一个段落。

- 列表项 1
- 列表项 2

这是第二个段落。

1. 西瓜
2. 哈密瓜
`;

function markdownToHtml(markdownToHtml) {
  // 1. 分词 解析为 tokens
  const tokens = tokenize(markdownText);
  // 2. 解析 tokens 为 ast
  const ast = parse(tokens);
  // 3. 将 ast 转换为 html
  const html = generateHTML(ast);
  console.log(html);
}
markdownToHtml(markdownText);
