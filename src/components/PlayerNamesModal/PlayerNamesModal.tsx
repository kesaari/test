import React from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import s from './PlayerNamesModal.module.css';

interface PlayerNamesModalProps {
  isVisible: boolean;
  onSave: (names: { player1: string; player2: string }) => void;
  initialNames: { player1: string; player2: string };
}

const PlayerNamesModal: React.FC<PlayerNamesModalProps> = ({ 
  isVisible, 
  onSave, 
  initialNames 
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSave({
        player1: values.player1?.trim() || 'Игрок 1',
        player2: values.player2?.trim() || 'Игрок 2'
      });
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  React.useEffect(() => {
    if (isVisible) {
      form.setFieldsValue({
        player1: initialNames.player1,
        player2: initialNames.player2
      });
      // Автофокус на первое поле при открытии
      setTimeout(() => {
        const firstInput = document.querySelector('input[name="player1"]') as HTMLInputElement;
        firstInput?.focus();
      }, 100);
    }
  }, [isVisible, initialNames, form]);

  return (
    <Modal
      title="Введите имена игроков"
      open={isVisible}
      onCancel={() => {}}
      footer={[
        <div key="footer">
          <Button type="primary" onClick={handleSubmit} size="large">
            Начать игру
          </Button>
        </div>
      ]}
      closable={false}
      maskClosable={false}
      width={500}
    >
      <Form 
        form={form} 
        layout="vertical" 
      >
        <Form.Item
          name="player1"
          label="Игрок 1 (красные фишки)"
          rules={[
            { required: true, message: 'Введите имя первого игрока' },
            { min: 2, message: 'Имя должно содержать минимум 2 символа' },
            { max: 20, message: 'Имя не должно превышать 20 символов' }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Например: Алексей" 
            size="large"
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="player2"
          label="Игрок 2 (синие фишки)"
          rules={[
            { required: true, message: 'Введите имя второго игрока' },
            { min: 2, message: 'Имя должно содержать минимум 2 символа' },
            { max: 20, message: 'Имя не должно превышать 20 символов' }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Например: Мария" 
            size="large"
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PlayerNamesModal;