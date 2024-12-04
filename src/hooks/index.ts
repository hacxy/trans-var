import OpenAI from 'openai'
import { useState } from 'react'

export function useChat() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const client = new OpenAI(
    {
      apiKey: import.meta.env.VITE_API_KEY,
      baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
      dangerouslyAllowBrowser: true,
    },
  )
  const request = async (message: string) => {
    setLoading(true)
    let content = ''
    const stream = await client.chat.completions.create({
      model: 'glm-4-flash',
      messages: [
        { role: 'system', content: `你是一个翻译工具, 你接收到的所有信息都需要将它翻译为英文,如果翻译结果为一个单词, 则直接输出这个单词, 如果翻译内容为多个单词组成, 则小驼峰的格式输出
       例如: "我需要一个叫'我的名字'的名字" -> "myName", "我需要一个叫'我的年龄'的名字" -> "myAge", "我需要一个叫'性别'的名字" -> "gender",  以此类推, 所有单词中间不要出现空格, 如果你接收到的是英文内容, 则直接输出这段英文, 所有翻译结果都将用作为变量名称, 你应该优先考虑将其翻译为软件开发经常会用到的词汇, 例如: '商品', 我们通常会使用: 'goods' 而不是 'product' ` },
        { role: 'user', content: message || '' },
      ],
      stream: true,
      top_p: 0.7,
      temperature: 0.9,

    })

    for await (const chunk of stream) {
      content += chunk.choices[0]?.delta?.content || ''
      setContent(content)
    }
    setLoading(false)
  }
  const clearContent = () => setContent('')
  return {
    request,
    content,
    clearContent,
    loading,
  }
}
