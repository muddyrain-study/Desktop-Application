export const rules = [
  // 横线
  [/^\s*---\s*$/gm, "<hr />"],

  // 标题规则
  [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
  [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
  [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
  [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
  [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
  [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],

  // 有序列表、无序列表
  [/((\n\d\..+)+)/g, '<ol style="margin-left:0%">$1</ol>'],
  [/((\n\+.+)+)/g, "<ul>$1</ul>"],
  [/\n\d\.([^\n]+)/g, "<li>$1</li>"],
  [/\n\+([^\n]+)/g, "<li>$1</li>"],
  // 加粗、斜体、段落
  [/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
  [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
  [/__([^_]+)__/g, "<b>$1</b>"],
  [/_([^_`]+)_/g, "<i>$1</i>"],
  [/^(?!\s*$).+/gm, "<p>$&</p>"],
  // 图片
  [/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" title="$3" />'],
  // 超链接
  [
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" style="color:#2A5DB0 ;text-decoration: none;">$1</a>',
  ],
  // 代码块
  [
    /```([\s\S]*?)```/g,
    '<pre style="background-color:grey;color:white;text-decoration: none;border-radius: 3px;margin-left:1%;padding:2px 10px;line-height:5px">$1</pre>',
  ],
  // 高亮
  [
    /(`)(\s?[^\n,]+\s?)(`)/g,
    '<a style="background-color:grey;color:white;text-decoration: none;border-radius: 3px;padding:0 4px;margin:0px 2px">$2</a>',
  ],
];
