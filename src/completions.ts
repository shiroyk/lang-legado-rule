import { syntaxTree } from '@codemirror/language';
import {
  Completion,
  CompletionContext,
  CompletionResult
} from '@codemirror/autocomplete';

const jsExtensionsCompletions: Completion[] = [
  { label: 'ajax', type: 'function', info: '访问网络, 返回String' },
  { label: 'ajaxAll', type: 'function', info: '并发访问网络' },
  {
    label: 'connect',
    type: 'function',
    info: '访问网络, 返回Response<String>',
  },
  {
    label: 'webView',
    type: 'function',
    info: () => {
      const pre = document.createElement('pre');
      pre.innerHTML =
        '使用webView访问网络\n' +
        'Params: html - 直接用webView载入的html, 如果html为空直接访问url\n' +
        'url - html内如果有相对路径的资源不传入url访问不了\n' +
        'js - 用来取返回值的js语句, 没有就返回整个源代码\n' +
        'Returns: 返回js获取的内容';
      return pre;
    },
  },
  {
    label: 'importScript',
    type: 'function',
    info: '可从网络, 本地文件导入JavaScript脚本',
  },
  {
    label: 'cacheFile',
    type: 'function',
    info: '缓存以文本方式保存的文件 如.js .txt等',
  },
  { label: 'getCookie', type: 'function', info: 'js实现读取cookie' },
  { label: 'downloadFile', type: 'function', info: '实现16进制字符串转文件' },
  { label: 'get', type: 'function', info: 'js实现重定向拦截, 网络访问get' },
  {
    label: 'head',
    type: 'function',
    info: 'js实现重定向拦截, 网络访问head, 不返回Response Body更省流量',
  },
  { label: 'post', type: 'function', info: '网络访问post' },
  { label: 'base64Decode', type: 'function', info: 'base64解码' },
  { label: 'base64DecodeToByteArray', type: 'function', info: 'base64解码' },
  { label: 'base64Encode', type: 'function', info: 'base64编码' },
  { label: 'timeFormatUTC', type: 'function', info: '格式化时间' },
  { label: 'timeFormat', type: 'function', info: '格式化时间' },
  { label: 'utf8ToGbk', type: 'function', info: 'utf8编码转gbk编码' },
  { label: 'encodeURI', type: 'function', info: 'url编码' },
  { label: 'htmlFormat', type: 'function', info: 'html格式化' },
  { label: 'getFile', type: 'function', info: '获取本地文件' },
  { label: 'readFile', type: 'function', info: '读取本地文件' },
  { label: 'readTxtFile', type: 'function', info: '读取本地文件' },
  { label: 'deleteFile', type: 'function', info: '删除本地文件' },
  { label: 'unzipFile', type: 'function', info: '解压本地文件' },
  { label: 'getTxtInFolder', type: 'function', info: '文件夹内所有文件读取' },
  {
    label: 'getZipStringContent',
    type: 'function',
    info: '获取网络zip文件里面的数据',
  },
  {
    label: 'getZipByteArrayContent',
    type: 'function',
    info: '获取网络zip文件里面的数据',
  },
  { label: 'log', type: 'function', info: '输出调试日志' },
  { label: 'logType', type: 'function', info: '输出对象类型' },
  { label: 'randomUUID', type: 'function', info: '生成UUID' },
  { label: 'securityKey', type: 'function', info: '密钥' },
  {
    label: 'aesDecodeToByteArray',
    type: 'function',
    info: 'AES 解码为 ByteArray',
  },
  { label: 'aesDecodeToString', type: 'function', info: 'AES 解码为 String' },
  {
    label: 'aesDecodeArgsBase64Str',
    type: 'function',
    info: 'AES解码为String, Base64编码',
  },
  {
    label: 'aesBase64DecodeToByteArray',
    type: 'function',
    info: '已经base64的AES 解码为 ByteArray',
  },
  {
    label: 'aesBase64DecodeToString',
    type: 'function',
    info: '已经base64的AES 解码为 String',
  },
  {
    label: 'aesEncodeToByteArray',
    type: 'function',
    info: '加密aes为ByteArray',
  },
  { label: 'aesEncodeToString', type: 'function', info: '加密aes为String' },
  {
    label: 'aesEncodeToBase64ByteArray',
    type: 'function',
    info: '加密aes后Base64化的ByteArray',
  },
  {
    label: 'aesEncodeToBase64String',
    type: 'function',
    info: '加密aes后Base64化的String',
  },
  {
    label: 'aesEncodeArgsBase64Str',
    type: 'function',
    info: 'AES加密并转为Base64',
  },
  { label: 'desDecodeToString', type: 'function', info: 'DES解密' },
  { label: 'desBase64DecodeToString', type: 'function', info: 'DES解密' },
  { label: 'desEncodeToString', type: 'function', info: 'DES加密' },
  { label: 'desEncodeToBase64String', type: 'function', info: 'DES加密' },
  { label: 'tripleDESDecodeStr', type: 'function', info: '3DES解密' },
  {
    label: 'tripleDESDecodeArgsBase64Str',
    type: 'function',
    info: '3DES解密',
  },
  { label: 'tripleDESEncodeBase64Str', type: 'function', info: '3DES加密' },
  {
    label: 'tripleDESEncodeArgsBase64Str',
    type: 'function',
    info: '3DES加密',
  },
  { label: 'digestHex', type: 'function', info: '生成摘要' },
  { label: 'digestBase64Str', type: 'function', info: '生成摘要' },
  { label: 'HMacHex', type: 'function', info: '生成散列消息鉴别码' },
  { label: 'HMacBase64', type: 'function', info: '生成散列消息鉴别码' },
  { label: 'md5Encode', type: 'function', info: 'MD5' },
  { label: 'md5Encode16', type: 'function', info: 'MD5' },
];

const javaCompletions: Completion[] = [
  ...jsExtensionsCompletions,
  { label: 'put', type: 'function', info: '变量存放' },
  { label: 'get', type: 'function', info: '变量获取' },
  { label: 'content', type: 'variable', info: '内容' },
  { label: 'getElement', type: 'function', info: '获取Element' },
  { label: 'getElements', type: 'function', info: '获取Element列表' },
  { label: 'getString', type: 'function', info: '获取文本' },
  { label: 'getStringList', type: 'function', info: '获取文本列表' },
  { label: 'setContent', type: 'function', info: '设置内容' },
  { label: 'splitSourceRule', type: 'function', info: '分解规则列表' },
];

const cookieCompletions: Completion[] = [
  { label: 'setCookie', type: 'function', info: '保存cookie' },
  { label: 'replaceCookie', type: 'function', info: '替换cookie' },
  { label: 'getCookie', type: 'function', info: '获取cookie' },
  { label: 'removeCookie', type: 'function', info: '移除cookie' },
  { label: 'cookieToMap', type: 'function' },
  { label: 'mapToCookie', type: 'function' },
  { label: 'getKey', type: 'function' },
];

const cacheCompletions: Completion[] = [
  { label: 'delete', type: 'function' },
  { label: 'deleteMemory', type: 'function' },
  { label: 'get', type: 'function' },
  { label: 'getByteArray', type: 'function' },
  { label: 'getDouble', type: 'function' },
  { label: 'getFile', type: 'function' },
  { label: 'getFloat', type: 'function' },
  { label: 'getFromMemory', type: 'function' },
  { label: 'getInt', type: 'function' },
  { label: 'getLong', type: 'function' },
  { label: 'put', type: 'function' },
  { label: 'putFile', type: 'function' },
  { label: 'putMemory', type: 'function' },
];

const classCompletions: Record<string, Completion[]> = {
  java: javaCompletions,
  cookie: cookieCompletions,
  cache: cacheCompletions,
  source: [],
  result: [],
  baseUrl: [],
  src: [],
};

const completePropertyAfter = ["PropertyName", ".", "?."]
const dontCompleteIn = ["TemplateString", "LineComment", "BlockComment",
                        "VariableDefinition", "PropertyDefinition"]

function completeProperties<T>(from: number, object: T): CompletionResult {
  let options = []
  
  if (object instanceof Array) {
    options = object;
  } else {
    for (const name in object) {
      options.push({
        label: name,
        type: typeof object[name] == "function" ? "function" : "variable"
      })
    }
  }
  
  return {
    from,
    options,
    validFor: /^[\w$]*$/
  }
}

export function javascriptComplete(context: CompletionContext) {
  const nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const ParentName = nodeBefore.context?.parent?.parent?.name;
  
  if (completePropertyAfter.includes(nodeBefore.name) &&
      nodeBefore.parent?.name == "MemberExpression") {
    const object = nodeBefore.parent.getChild("Expression")
    if (object?.name == "VariableName") {
      const from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from
      const variableName = context.state.sliceDoc(object.from, object.to)
      
      if (ParentName == "JavaScriptKeyword") {
        if (typeof window[variableName] == "object")
          return completeProperties(from, window[variableName])
      } else {
        if (typeof classCompletions[variableName] == "object" )
          return completeProperties(from, classCompletions[variableName])
      }
    }
  } else if (nodeBefore.name == "VariableName") {
    if (ParentName == "JavaScriptKeyword") {
      return completeProperties(nodeBefore.from, window)
    } else {
      return completeProperties(nodeBefore.from, classCompletions)
    }
  } else if (context.explicit && !dontCompleteIn.includes(nodeBefore.name)) {
    if (ParentName == "JavaScriptKeyword") {
      return completeProperties(context.pos, window)
    } else {
      return completeProperties(context.pos, classCompletions)
    }
  }
  return null
}