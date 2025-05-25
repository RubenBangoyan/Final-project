import React, { useEffect, useState, useRef } from 'react';
import {
  Drawer,
  FloatButton,
  Button,
  Input,
  Typography,
  Space,
  Card,
} from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import './ChatHelper.css';

const { TextArea } = Input;
const { Text } = Typography;

interface Message {
  id: number;
  text: string;
  from: 'user' | 'bot';
  time: string;
}

const ChatHelper: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const savedMessages = sessionStorage.getItem('chatMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
        setMessages(parsedMessages);
        return;
      }
    }

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const welcomeMessage: Message = {
      id: Date.now(),
      text: 'Здравствуйте! Чем могу помочь?',
      from: 'bot',
      time: `${hours}:${minutes < 10 ? '0' : ''}${minutes}`,
    };

    const timer = setTimeout(() => {
      setMessages([welcomeMessage]);
      setShowPreview(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
    setShowPreview(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      from: 'user',
      time: `${hours}:${minutes < 10 ? '0' : ''}${minutes}`,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
  };

  return (
    <>
      <Drawer
        open={open}
        maskClosable
        size="default"
        placement="right"
        title="AI Assistant"
        onClose={toggleDrawer}
      >
        <Space
          direction="vertical"
          style={{ width: '100%', maxHeight: '60vh', overflowY: 'auto' }}
        >
          {messages.map((msg) => (
            <Card
              key={msg.id}
              type="inner"
              size="small"
              style={{
                backgroundColor: msg.from === 'user' ? '#e6f7ff' : '#f6ffed',
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <Text type="secondary" style={{ fontSize: 12 }}>
                {msg.time}
              </Text>
              <br />
              <Text>{msg.text}</Text>
            </Card>
          ))}
        </Space>

        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
          <TextArea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="Введите сообщение..."
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button type="primary" onClick={handleSend}>
            Отправить
          </Button>
        </Space>
      </Drawer>

      {showPreview && !open && (
        <Card
          className="chat-preview-message"
          style={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            cursor: 'pointer',
            backgroundColor: '#f6ffed',
            borderColor: '#b7eb8f',
            width: 230,
            height: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={toggleDrawer}
        >
          <Text>Здравствуйте! Чем могу помочь?</Text>
        </Card>
      )}

      <FloatButton
        type="primary"
        onClick={toggleDrawer}
        style={{
          width: 70,
          height: 70,
          right: 24,
          bottom: 24,
        }}
        icon={<MessageOutlined style={{ fontSize: 22, color: 'white' }} />}
      />
    </>
  );
};

export default ChatHelper;
