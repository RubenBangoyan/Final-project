import { Button, Dropdown } from 'antd';
import React, { useState } from 'react';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: 'en',
    label: 'English',
  },
  {
    key: 'ru',
    label: 'Русский',
  },
  {
    key: 'hy',
    label: 'Հայերեն',
  },
];

const LanguageSelector: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState('en');

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedLang(e.key);
  };

  const getLabel = (key: string) => {
    const found = items.find(
      (item): item is { key: string; label: React.ReactNode } =>
        item !== null &&
        typeof item === 'object' &&
        'key' in item &&
        item.key === key
    );
    return found ? found.label : 'Language';
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
      <Button>{getLabel(selectedLang)}</Button>
    </Dropdown>
  );
};

export default LanguageSelector;
