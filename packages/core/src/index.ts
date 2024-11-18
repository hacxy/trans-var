import { Ollama } from 'ollama/browser';
import { MODEL_NAME, OLLAMA_API_URl } from './constants';
/**
 * @name 变量名转换
 * @param text 需要翻译的文本
 * @returns
 */
const transVar = async (text: string) => {
  const ollama = new Ollama({ host: OLLAMA_API_URl });

  let varText: string | undefined = '';
  const response = await ollama.chat({
    model: MODEL_NAME,
    messages: [{ role: 'user', content: text }]
  });

  varText = response.message.content;

  if (varText) {
    varText = varText.split(';')[0];
    varText = varText.replace(/['"]/g, '');
    varText = varText.replace(/\[.*?\]/g, '');
  }

  if (varText) {
    ollama.abort();
    return {
      // 小驼峰
      lowerCamelCase: varText,
      // 大驼峰
      upperCamelCase: varText.replace(/( |^)[a-z]/g, (L) => L.toUpperCase()),
      // 小写下划线
      lowerSnakeCase: varText.replace(/([A-Z])/g, '_$1').toLowerCase(),
      // 大写下划线
      upperSnakeCase: varText.replace(/([A-Z])/g, '_$1').toUpperCase()
    };
  }
};

export default transVar;
