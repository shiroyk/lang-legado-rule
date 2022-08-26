import { autocompletion } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, highlightActiveLine, lineNumbers, keymap } from '@codemirror/view';
import { rule } from '../src'
import { standardKeymap, history, historyKeymap } from '@codemirror/commands';

const extensions = [
  rule(),
  lineNumbers(),
  history(),
  keymap.of([...standardKeymap, ...historyKeymap]),
  highlightActiveLine(),
  autocompletion(),
  oneDark,
];

const rules = [
  "class.app-0.-11@tag.li[!1:2]@tag.span[-1,10]<js>let a = 1;a = 2;</js>@text##\\d[a-z]##",
  "@class.app.0&&class.app.1{{let b = 1}}||@class.app.2%%class.app.3",
  "@CSS:body div p:eq(2)>a@text##/add/(\\d+)##https://$1###",
  "$.app.main[?(@.width > 10)]@Json:.url##$##,{\"webView\":true}",
  "//*[@id=\"box\"]@Xpath:/dl",
  'class.app.0{{let d = 1}}@tag.li[!1:2]@text@js:let e = 1;\ne = 2;`${e} == 2`'
]

const box = document.getElementById('box')

const createEditor = () => {
  const editor = document.createElement('div');
  editor.classList.add("editor")
  box.appendChild(editor);
  return editor;
}

for (let i = 0; i < rules.length; i++) {
  const rule = rules[i];
  new EditorView({
    parent: createEditor(),
    state: EditorState.create({
      doc: rule,
      extensions: extensions,
    }),
  });
}
