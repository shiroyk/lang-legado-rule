import { LanguageSupport, LRLanguage } from '@codemirror/language';
import { buildParser } from '@lezer/generator';
import { styleTags, tags as t } from '@lezer/highlight';
import { default as grammar } from './grammar';
import { javascriptLanguage, javascript } from '@codemirror/lang-javascript';
import { parseMixed } from '@lezer/common';
import { javascriptComplete } from './completions';

const ruleParser = buildParser(grammar);

export const ruleLanguage = LRLanguage.define({
  parser: ruleParser.configure({
    wrap: parseMixed((node) => {
      if (node.name == 'RuleBracket') {
        return {
          parser: javascriptLanguage.parser,
          overlay: [{ from: node.from + 2, to: node.to - 2 }],
        };
      }
      if (node.name == 'JavaScriptTag') {
        return {
          parser: javascriptLanguage.parser,
          overlay: [{ from: node.from + 4, to: node.to - 5 }],
        };
      }
      if (node.name == 'JavaScriptKeyword') {
        return {
          parser: javascriptLanguage.parser,
          overlay: [{ from: node.from + 4, to: node.to }],
        };
      }
      return null;
    }),
    props: [
      styleTags({
        'class id tag children text textNodes ownText html all href src':
          t.definitionKeyword,
        'Word Pos': t.labelName,
        LogicOperate: t.operator,
        Regex: t.regexp,
        Int: t.number,
        'At Paren Not': t.variableName,
        JSONPathRule: t.propertyName,
        XPathRule: t.operatorKeyword,
        'JavaScriptTag JavaScriptKeyword RuleBracket ArithOperate': t.atom,
        'JsoupCSSRule PathSelect LogicOperate': t.inserted,
      }),
    ],
  }),
});

export const rule = () => {
  return new LanguageSupport(ruleLanguage, [
    javascriptLanguage.data.of({ autocomplete: javascriptComplete }),
    javascript().support,
  ]);
};
