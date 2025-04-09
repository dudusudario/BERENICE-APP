import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface Message {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInitialMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setMessages(data || []);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = async (content: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({ content })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setMessages(prev => [data, ...prev]);
      }

      return data;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  };

  const handleNewMessage = useCallback((newMessage: Message) => {
    setMessages(prev => [newMessage, ...prev]);
  }, []);

  useEffect(() => {
    // Carregar mensagens iniciais
    loadInitialMessages();

    // Inscrever para atualizações em tempo real
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages' 
      }, payload => {
        const newMessage = payload.new as Message;
        handleNewMessage(newMessage);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [loadInitialMessages, handleNewMessage]);

  return {
    messages,
    loading,
    sendMessage,
    loadInitialMessages,
    handleNewMessage,
  };
} 