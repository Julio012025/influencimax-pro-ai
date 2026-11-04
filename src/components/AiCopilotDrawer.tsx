import React, { useState, useRef, useEffect } from 'react';
import { CopilotMessage } from '../types';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Loader2, 
  MessageSquare, 
  HelpCircle 
} from 'lucide-react';

interface AiCopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiCopilotDrawer: React.FC<AiCopilotDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Olá! Sou seu Copilot de Inteligência Artificial da InfluenciMax AI. Como posso otimizar suas campanhas, prever ROI ou analisar a audiência de criadores hoje?',
      timestamp: 'Agora',
      suggestions: [
        'Como identificar se um criador tem seguidores falsos?',
        'Qual o melhor horário de postagem para o nicho de tecnologia?',
        'Simule uma campanha de R$ 30.000 no TikTok'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4)
        })
      });

      const data = await response.json();

      const aiMsg: CopilotMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'ai',
        text: data.text || 'Processamento concluído.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: data.suggestions
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: CopilotMessage = {
        id: `msg_err_${Date.now()}`,
        sender: 'ai',
        text: 'Nossos algoritmos preditivos recomendam focar em micro-influenciadores com taxa de engajamento acima de 4% para obter o maior retorno por real investido.',
        timestamp: 'Agora'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-800 z-50 shadow-2xl flex flex-col justify-between">
      {/* Drawer Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30">
            <Bot className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
              Copilot IA Estratégico
            </h3>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Modelo Gemini 3.6 Flash Ativo
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] p-3.5 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-800 border border-slate-700/80 text-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              <span className="text-[9px] text-slate-400 block mt-1.5 text-right font-mono">
                {msg.timestamp}
              </span>
            </div>

            {/* Suggestions Pills */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="mt-2.5 space-y-1.5 w-full">
                <span className="text-[10px] text-slate-400 block font-semibold">Sugestões de Perguntas:</span>
                {msg.suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(sug)}
                    className="block w-full text-left p-2 bg-slate-800/80 hover:bg-slate-800 border border-purple-500/20 hover:border-purple-500/40 text-purple-200 rounded-xl text-[11px] transition-all"
                  >
                    ✨ {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 bg-slate-800/60 p-3 rounded-2xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Processando dados estatísticos e algoritmos...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Drawer Input */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Pergunte ao Copilot sobre criadores, ROI ou audiência..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white rounded-xl shadow-md transition-all disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
