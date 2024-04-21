import { formatSmallHump } from 'tianjie';
/**
 * @name 通过金山词霸翻译变量
 * @param text 需要翻译的文本
 * @returns
 */
export const getVarByCiba = async (text: string) => {
  const request = await fetch(`https://ciba-service.hacxy.cn?text=${text}`);
  const result = await request.json().then((res) => res.data);

  let varText: string | undefined = result?.symbols?.[0]?.parts?.[0]?.means?.[0]?.word_mean;

  if (varText) {
    varText = varText.split(';')[0];
    varText = varText.replace(/\[.*?\]/g, '');
    varText = formatSmallHump(varText);
  }
  return varText;
};
