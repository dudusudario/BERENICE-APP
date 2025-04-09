import Toast from './Toast';

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Tipo da notificação que define sua cor e ícone'
    },
    message: {
      control: 'text',
      description: 'Mensagem a ser exibida na notificação'
    },
    duration: {
      control: 'number',
      description: 'Duração em milissegundos que a notificação ficará visível'
    },
    onRemove: {
      description: 'Função chamada quando a notificação é removida'
    }
  }
};

export const Success = {
  args: {
    type: 'success',
    message: 'Operação realizada com sucesso!',
    duration: 3000
  }
};

export const Error = {
  args: {
    type: 'error',
    message: 'Ocorreu um erro ao processar a solicitação.',
    duration: 3000
  }
};

export const Warning = {
  args: {
    type: 'warning',
    message: 'Atenção! Esta ação não pode ser desfeita.',
    duration: 3000
  }
};

export const Info = {
  args: {
    type: 'info',
    message: 'Esta é uma mensagem informativa.',
    duration: 3000
  }
}; 