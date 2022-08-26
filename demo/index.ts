import { autocompletion } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, highlightActiveLine, lineNumbers, keymap } from '@codemirror/view';
import { rule } from '../src'
import { standardKeymap, history, historyKeymap } from '@codemirror/commands';

window["view"] = new EditorView({
  parent: document.getElementById('editor'),
  state: EditorState.create({
    doc: 'class.app-0.-11@tag.li[!1:2]@tag.span[-1,10]<js>let a = 1;a = 2;</js>@text##\\d[a-z]##@@\n' +
      'class.app.0&&class.app.1{{let b = 1}}||@class.app.2%%class.app.3||\n' +
      '@css:body div p:eq(2)>a@text@@\n' +
      '$.app.main[?(@.width > 10)]||\n' +
      '//ul[count(../ul)>10]//li[@class="item-0"]@@\n' +
      'class.app.0{{let d = 1}}@tag.li[!1:2]@text@js:let e = 1;\n' +
      'e = 2;`${e} == 2`',
    extensions: [
      rule(),
      lineNumbers(),
      history(),
      keymap.of([...standardKeymap, ...historyKeymap]),
      highlightActiveLine(),
      autocompletion(),
      oneDark,
    ],
  }),
});
