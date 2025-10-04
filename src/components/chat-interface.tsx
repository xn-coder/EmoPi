'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type ChatInterfaceProps = {
  onSendMessage: (message: string) => void;
  isSending: boolean;
};

export default function ChatInterface({ onSendMessage, isSending }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSending) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message to the AI..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending}
            className="flex-grow"
          />
          <Button type="submit" disabled={isSending || !message.trim()} size="icon">
            {isSending ? <Loader className="animate-spin" /> : <Send />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
