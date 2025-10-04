'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader, Shuffle, Pause } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';


type ChatInterfaceProps = {
  onSendMessage: (message: string) => void;
  isSending: boolean;
  onToggleRandomPlay: () => void;
  isPlayingRandom: boolean;
};

export default function ChatInterface({ onSendMessage, isSending, onToggleRandomPlay, isPlayingRandom }: ChatInterfaceProps) {
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
            disabled={isSending || isPlayingRandom}
            className="flex-grow"
          />
          <Button type="submit" disabled={isSending || !message.trim() || isPlayingRandom} size="icon">
            {isSending ? <Loader className="animate-spin" /> : <Send />}
            <span className="sr-only">Send</span>
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onToggleRandomPlay} 
                  disabled={isSending} 
                  size="icon"
                >
                  {isPlayingRandom ? <Pause /> : <Shuffle />}
                  <span className="sr-only">{isPlayingRandom ? 'Stop Random Play' : 'Start Random Play'}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlayingRandom ? 'Stop random playback' : 'Play all emojis randomly'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

        </form>
      </CardContent>
    </Card>
  );
}
