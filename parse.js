// 该文件根据传入的tokens 解析成抽象语法树
function parse(tokens) {
  const ast = {
    type: "root",
    children: [],
  };
  let currentList = null;

  tokens.forEach((token) => {
    switch (token.type) {
      case "heading":
      case "paragraph":
        currentList = null;
        ast.children.push(token);
        break;
      case "list-item":
        if (!currentList) {
          currentList = {
            type: token.ordered ? "ordered-list" : "unordered-list",
            ordered: !!token.ordered,
            children: [],
          };
          ast.children.push(currentList);
        }
        currentList.children.push({
          type: "list-item",
          text: token.text,
        });
        break;
    }
  });
  return ast;
}

module.exports = parse;
