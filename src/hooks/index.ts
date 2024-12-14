import { useState } from 'react';

export function useChat() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const request = async (message: string) => {
    setLoading(true);
    let content = '';

    const stream = await fetch('http://116.198.229.205:1118/openai/chat/stream', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      mode: 'cors',
      redirect: 'follow',
      body: JSON.stringify({
        messages: [
          { role: 'system', content: `你是一个翻译工具, 你接收到的所有信息都需要将它翻译为英文,如果翻译结果为一个单词, 则直接输出这个单词, 如果翻译内容为多个单词组成, 则小驼峰的格式输出
       例如: "我需要一个叫'我的名字'的名字" -> "myName", "我需要一个叫'我的年龄'的名字" -> "myAge", "我需要一个叫'性别'的名字" -> "gender",  以此类推, 所有单词中间不要出现空格, 如果你接收到的是英文内容, 则直接输出这段英文, 所有翻译结果都将用作为变量名称, 你应该优先考虑将其翻译为软件开发经常会用到的词汇, 例如: '商品', 我们通常会使用: 'goods' 而不是 'product', 请确保首字母一定为小写 ` },
          { role: 'user', content: message || '' },
        ],
      }),
    });
    // const stream = await response.json()
    const reader = stream.body!.getReader();
    const decoder = new TextDecoder('utf-8');
    const buffer = '';

    async function readStream(reader: any, decoder: any, buffer: any) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      const text = decoder.decode(value);
      const match = text.match(/data:\s*(\{.*\})/);
      if (match && match[1]) {
        const jsonStr = match[1];
        if (jsonStr) {
          const chunk = JSON.parse(jsonStr);
          content += chunk.choices[0]?.delta?.content || '';
          setContent(content);
        }
      }
      return readStream(reader, decoder, buffer);
    }

    await readStream(reader, decoder, buffer);

    setLoading(false);
  };
  const clearContent = () => setContent('');
  return {
    request,
    content,
    clearContent,
    loading,
  };
}
