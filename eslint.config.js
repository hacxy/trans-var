import antfu from '@antfu/eslint-config'
// import format from 'eslint-plugin-format'

export default antfu({
  react: true,
  typescript: true,
  yaml: true,
  formatters: {
    css: true,
    html: true,
    markdown: true,
  },
  rules: {
    // 禁止行尾空格
    'style/no-trailing-spaces': 2,
    // 禁止使用 tab 缩进
    'style/no-tabs': 2,
    // 缩进规则，使用2个空格缩进
    'style/indent': [2, 2],
    // 强制使用 unix 换行符
    'style/linebreak-style': [2, 'unix'],
  },
  ignores: ['public/**/*'],
},
// format css
// {
//   files: ['**/*.css'],
//   languageOptions: {
//     parser: format.parserPlain,
//   },
//   plugins: {
//     format,
//   },
//   rules: {
//     'format/prettier': ['error', { parser: 'css', tabWidth: 2 }],
//   },
)
