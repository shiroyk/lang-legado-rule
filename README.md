# lang-legado-rule
## [Legado](https://github.com/gedoor/legado) rule support for the CodeMirror code editor
![NPM](https://img.shields.io/npm/l/lang-legado-rule) ![npm](https://img.shields.io/npm/v/lang-legado-rule)

![demo](demo/demo.gif)

## Usage

```typescript
import { autocompletion } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView, highlightActiveLine, lineNumbers, keymap } from '@codemirror/view';
import { rule } from 'lang-legado-rule'
import { standardKeymap, history, historyKeymap } from '@codemirror/commands';

window["view"] = new EditorView({
  parent: document.getElementById('editor'),
  state: EditorState.create({
    doc: 'class.app-0.-11@tag.li[!1:2]@tag.span[-1,10]<js>let a = 1;a = 2;</js>@text##\\d[a-z]##',
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
```

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile for Production

```sh
pnpm build
```