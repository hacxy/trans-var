import {
  formatSmallHump,
  formatPascalCase,
  formatUpperCaseWithUnderscore,
  formatLowerCaseWithUnderscore,
  containsEnglish
} from 'tianjie';
/**
 * @name 通过金山词霸翻译变量
 * @param text 需要翻译的文本
 * @returns
 */
export const getVarByCiba = async (text: string) => {
  let varText: string | undefined = '';
  if (!containsEnglish(text)) {
    const request = await fetch(`https://ciba-service.hacxy.cn?text=${text}`);
    const result = await request.json().then((res) => res.data);

    varText = result?.symbols?.[0]?.parts?.[0]?.means?.[0]?.word_mean;
  } else {
    varText = text;
  }

  if (varText) {
    varText = varText.split(';')[0];
    varText = varText.replace(/['"]/g, '');
    varText = varText.replace(/\[.*?\]/g, '');
  }

  if (varText) {
    return {
      smallHump: formatSmallHump(varText || ''),
      bigHump: formatPascalCase(varText || ''),
      uppercaseSnakelike: formatUpperCaseWithUnderscore(varText || ''),
      lowercaseSnakelike: formatLowerCaseWithUnderscore(varText || '')
    };
  }
};
