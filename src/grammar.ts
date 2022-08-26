export default String.raw`
@top Rule { Rules JavaScriptKeyword? }

Rules { 
  (JsoupRule | JsoupCSSRule | JSONPathRule | XPathRule)+ Regex? (LogicOperate Rules)?
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
    ) (JavaScriptTag | RuleBracket)?
  }
}

JsoupCSSRule { 
  cssPrefix ("(" Int ")" | "," | ":" | "~" | "#" | ArithOperate | dot | Word)+
}

JSONPathRule {
  jsonPathPrefix (Word (dot? PathSelect)?)+
}

XPathRule {
  xPathPrefix (ArithOperate? Word PathSelect? "/")+
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

  Regex { "##" (![\n])* "##" (![\n])* "###"? }

  dot { "." }

  Not { "!" }

  "#" ":" "/"

  ArithOperate { 
    "+" | "-" | "*" | 
    "/" | "%" | "=" | 
    "*" | "**" | ">" | 
    "<" | "?" 
  }

  LogicOperate { "||" | "&&" | "%%" }

  At { "@" }

  xPathPrefix { "@" $[xX] $[pP] $[aA] $[tT] $[hH] ":" | "//" }

  cssPrefix { "@" $[cC] $[sS] $[sS] ":" }

  jsonPathPrefix { "$." | "@" $[jJ] $[sS] $[oO] $[nN] ":" }

  JavaScriptKeyword { "@" $[jJ] $[sS] ":" _+ }

  spaces[@export] { $[\u0009 \u000b\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]+ }

  newline[@export] { $[\r\n\u2028\u2029] }

  @precedence { Int, ArithOperate }

  @precedence { spaces, newline, Word }

  @precedence { "#", ":", Regex }

  @precedence { JavaScriptKeyword, cssPrefix, jsonPathPrefix, At, Word }

}

`;