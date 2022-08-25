export default String.raw`
@top Rule { Rules JavaScriptKeyword? }

Rules { 
  LogicOperate? (JsoupRule | JSONPathRule | XPathRule) Rules?
}
JavaScriptTag { "<js>" Word* "</js>" }
RuleBracket { "{{" Word* "}}" }

JsoupRule {
  At?
  JsoupTypeStatement { 
    ( kw<"class"> | kw<"id"> | kw<"tag"> | kw<"children">) 
    dot Word (dot? PathSelect)? (JavaScriptTag | RuleBracket)?
  } |
  JsoupContentStatement {
    ( kw<"text"> | kw<"textNodes"> |
      kw<"ownText"> | kw<"html"> | kw<"all"> |
      kw<"href"> | kw<"src">
    ) (Regex | JavaScriptTag | RuleBracket)?
  } |
  JsoupCSSStatement { cssPrefix (Word CSSOperate+?)+ }
}

JSONPathRule {
  jsonPathPrefix (Word (dot? PathSelect)?)+
}

XPathRule {
  xPathPrefix (Word PathSelect?)+
}

CSSOperate { 
  "(" Int ")" | "," |  ":" | "~" | "#" | 
  ArithOperate | dot
}

PathSelect {
  "[" ( Word | Int | At | Not | ArithOperate | dot | ":" | "(" | ")" )* "]"
}

kw<key> { @specialize[@name={key}]<Word, key> }

@skip { spaces | newline }

@tokens {

  identifierChar { @asciiLetter | $[_$\u{a1}-\u{10ffff}] }

  Word { identifierChar (identifierChar | @digit | "-")* }

  Int { "-"? @digit+ }

  Regex { "##" (![/\\\n[] | "\\" ![\n] | "[" (![\n\\\]] | "\\" ![\n])* "]")+ "##" Word? "###"? }

  dot { "." }

  Not { "!" }

  ArithOperate { 
    "+" | "-" | "*" | 
    "/" | "%" | "=" | 
    "*" | "**" | ">" | 
    "<" | "?" 
  }

  LogicOperate { "||" | "&&" | "%%" }

  At { "@" }

  xPathPrefix { "@XPath:" | "//" }

  cssPrefix { "@css:" }

  jsonPathPrefix { "$." | "@json:" }

  JavaScriptKeyword { "@js:" _+ }

  spaces[@export] { $[\u0009 \u000b\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]+ }

  newline[@export] { $[\r\n\u2028\u2029] }

  @precedence { Int, ArithOperate }

  @precedence { spaces, newline, Word }

  @precedence { JavaScriptKeyword, cssPrefix, jsonPathPrefix, At, Word }

}

`;