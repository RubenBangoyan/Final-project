import React, { useEffect, useState } from 'react';
import { Drawer, FloatButton, Button, Input } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import './ChatHelper.css';

const { TextArea } = Input;

interface Message {
  id: number;
  text: string;
  from: 'user' | 'bot';
}

const ChatHelper: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const welcomeMessage: Message = {
        id: Date.now(),
        text: 'Здравствуйте! Чем могу помочь?',
        from: 'bot',
      };
      setMessages((prev) => [...prev, welcomeMessage]);
      setShowPreview(true);
    }, 9000); 

    return () => clearTimeout(timer);
  }, []);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
    setShowPreview(false); 
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      from: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
  };

  return (
    <>

      <Drawer
        title="Онлайн-помощник"
        placement="right"
        onClose={toggleDrawer}
        open={open}
        size="default"
        maskClosable={true}
      >
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.from === 'user' ? 'user' : 'bot'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input-wrapper">
          <TextArea
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
          <Button type="primary" onClick={handleSend} style={{ marginTop: 8 }}>
            Отправить
          </Button>
        </div>
      </Drawer>

      {/* Preview Message */}
      {showPreview && !open && (
        <div className="chat-preview-message" onClick={toggleDrawer}>
          Здравствуйте! Чем могу помочь?
        </div>
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
