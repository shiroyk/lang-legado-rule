export default String.raw`
@top Rule { Rules JavaScriptKeyword? }

Rules { 
  (JsoupRule | JsoupCSSRule | JSONPathRule | XPathRule | JavaScriptTag | RuleBracket)+ Regex? (LogicOperate Rules)?
}

JsoupRule {
  "@"?
  JsoupTypeStatement {
    ( kw<"children"> | kw<"class"> | kw<"tag"> | kw<"id"> | kw<"text">) 
    "." Word ("."? PathSelect)?
  } |
  JsoupContentStatement {
    ( kw<"text"> | kw<"textNodes"> |
      kw<"ownText"> | kw<"html"> | kw<"all"> |
      kw<"href"> | kw<"src">
    )
  }
}

JsoupCSSRule { 
  cssPrefix ("(" Int ")" | "," | ":" | "~" | "#" | "." | ArithOperate | Word)+
}

JSONPathRule {
  jsonPathPrefix (Word ("."? PathSelect)?)+
}

XPathRule {
  xPathPrefix (ArithOperate? Word PathSelect? "/")+
}

PathSelect {
  "[" ( Word | Int | ArithOperate | "@" | "?" | "!" | "." | ":" | "(" | ")" )* "]"
}

kw<key> { @specialize[@name={key}]<Word, key> }

@skip { spaces | newline }

@tokens {

  identifierChar { @asciiLetter | $[_$\u{a1}-\u{10ffff}] }

  Word { identifierChar (identifierChar | @digit | "-")* }

  Int { "-"? @digit+ }

  Regex { "##" (![\n])* "##"? (![\n])* "###"? }

  "#" ":" "@" "!" "." "?"
  "[" "]" "(" ")" "{" "}"

  ArithOperate { 
    "+" | "-" | "/" | 
    "%" | "=" | "*" | 
    "**" | ">" | "<"
  }

  LogicOperate { "||" | "&&" | "%%" }

  JavaScriptTag { "<js>" _+ "</js>" }
  
  RuleBracket { "{{" (![\n])* "}}" }

  xPathPrefix { "@" $[xX] $[pP] $[aA] $[tT] $[hH] ":" | "//" }

  cssPrefix { "@" $[cC] $[sS] $[sS] ":" }

  jsonPathPrefix { "$." | "$[" | "@" $[jJ] $[sS] $[oO] $[nN] ":" }

  JavaScriptKeyword { "@" $[jJ] $[sS] ":" _+ }

  spaces[@export] { $[\u0009 \u000b\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]+ }

  newline[@export] { $[\r\n\u2028\u2029] }

  @precedence { Int, ArithOperate }

  @precedence { spaces, newline, Word }

  @precedence { "#", ":", Regex }

  @precedence { JavaScriptKeyword, cssPrefix, jsonPathPrefix, xPathPrefix, "@", Word }

}

`;