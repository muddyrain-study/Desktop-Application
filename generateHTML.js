/**
 * Generate HTML from the AST
 * @param ast
 */
function generateHTML(ast) {
  if (ast.type === "root") {
    return ast.children.map(generateHTML).join("");
  } else if (ast.type === "heading") {
    return `<h${ast.level}>${ast.text}</h${ast.level}>`;
  } else if (ast.type === "paragraph") {
    return `<p>${ast.text}</p>`;
  } else if (ast.type === "ordered-list") {
    return `<ol>${ast.children.map(generateHTML).join("")}</ol>`;
  } else if (ast.type === "unordered-list") {
    return `<ul>${ast.children.map(generateHTML).join("")}</ul>`;
  } else if (ast.type === "list-item") {
    return `<li>${ast.text}</li>`;
  }
}

module.exports = generateHTML;
