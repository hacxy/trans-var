import { OpenAIOutlined } from '@ant-design/icons';
import { Bubble, Sender, Welcome } from '@ant-design/x';
import { Card, Space, Spin, Typography } from 'antd';
import { useChat } from './hooks';
import './App.css';

function App() {
  const { request, content, loading, clearContent } = useChat();
  const types = [
    {
      key: 'lowerCamelCase',
      title: '小驼峰(lowerCamelCase)',
      format: (value: string) => {
        return value;
      },
    },
    {
      key: 'upperCamelCase',
      title: '大驼峰(upperCamelCase)',
      format: (value: string) => {
        return value.replace(/( |^)[a-z]/g, L => L.toUpperCase());
      },
    },
    {
      key: 'lowerSnakeCase',
      title: '小写蛇形(lowerSnakeCase)',
      format: (value: string) => {
        return value.replace(/([A-Z])/g, '_$1').toLowerCase();
      },
    },
    {
      key: 'upperSnakeCase',
      title: '大写蛇形(upperSnakeCase)',
      format: (value: string) => {
        return value.replace(/([A-Z])/g, '_$1').toUpperCase();
      },
    },
  ];
  return (
    <>
      <Welcome
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="Translate Variable"
        description="变量名称快捷翻译工具~"
        style={{
          background: 'linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)',
        }}
      />

      <Card style={{ marginTop: '10px' }}>
        <Sender
          onSubmit={request}
          style={{ marginBottom: '10px' }}
          actions={(_, info) => {
            const { SendButton, LoadingButton, ClearButton } = info.components;

            return (
              <Space size="small">
                <Typography.Text type="secondary">
                  <small>`Enter` to submit</small>
                </Typography.Text>
                <ClearButton onClick={clearContent} />
                {loading
                  ? (
                    <LoadingButton
                      type="default"
                      icon={<Spin size="small" />}
                      disabled={loading}
                    />
                  )
                  : (
                    <SendButton
                      type="primary"
                      icon={<OpenAIOutlined />}
                      disabled={loading}
                    />
                  )}
              </Space>
            );
          }}
        />
        <div className="var-content">
          {types.map((item) => {
            return (
              <div
                key={item.key}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <span
                  style={{
                    width: '190px',
                    marginRight: '10px',
                    textAlign: 'right',
                  }}
                >
                  {item.title}
                  :
                </span>
                <div
                  style={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Bubble
                    content={item.format(content)}
                    typing
                    loading={loading}
                  />
                  {!loading && !!content && (
                    <Typography.Paragraph
                      copyable={{ text: item.format(content) }}
                      style={{ marginBottom: '0' }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

export default App;
