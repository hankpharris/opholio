'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { MessageSquare, X, Send, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { Button } from './buttons/Button';
import { useChat } from 'ai/react';
import { useRouter } from 'next/navigation';
import { useChatStore } from '../store/chatStore';
import SpeechRecognitionLib, { useSpeechRecognition } from 'react-speech-recognition';

const OPHOLIO_REPO_URL = 'https://github.com/hankpharris/opholio';
const LINK_PLACEHOLDER = '{{LINK}}';

const welcomeMessage = {
  id: 'welcome',
  role: 'assistant' as const,
  content: `Hi! I'm Ophelia, an AI assistant for this portfolio site. I was built using OpenAI's GPT 4o-mini and 4o-mini-tts models, and have been included in this portfolio site for free with a template called "Opholio" by Henry Pharris, found ${LINK_PLACEHOLDER}. I can help you:

• Navigate through different sections (About, Projects, etc)
• Find specific projects or information
• Answer questions about the portfolio
• Guide you to relevant pages

How can I help you today?`
};

type Message = {
  id?: string;
  role: string;
  content: string;
};

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function ChatBot() {
  const { isMessaging, setIsMessaging, isListening, setIsListening, isOpen, setIsOpen } = useChatStore();
  const [showNavigationConfirm, setShowNavigationConfirm] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(10);
  const [isTTSEnabled, setIsTTSEnabled] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatPosition, setChatPosition] = useState({ top: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Update chat position when header height changes
  useEffect(() => {
    const updatePosition = () => {
      const header = document.querySelector('header');
      if (header) {
        const headerHeight = header.getBoundingClientRect().height;
        setChatPosition({ top: headerHeight + 8 }); // 8px padding
      }
    };

    // Initial position
    updatePosition();

    // Update on resize
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  // Handle navigation with confirmation
  const handleNavigation = useCallback((path: string) => {
    if (messages.length > 1) {
      // Reset countdown before showing dialog
      setCountdown(10);
      setPendingNavigation(path);
      setShowNavigationConfirm(true);
    } else {
      router.push(path);
    }
  }, [messages.length, router]);

  // Handle speech recognition commands
  useEffect(() => {
    if (!listening) return;

    const lowerTranscript = transcript.toLowerCase();
    console.log('Current transcript:', lowerTranscript);
    console.log('Is messaging:', isMessaging);

    // Handle commands
    if (lowerTranscript.includes('hey ophelia') || lowerTranscript.includes('hi ophelia') || lowerTranscript.includes('hello ophelia') || lowerTranscript.includes('open ophelia')) {
      console.log('Hey Ophelia command detected');
      setIsOpen(true);
      resetTranscript();
      return;
    }

    if (lowerTranscript.includes('close ophelia') || lowerTranscript.includes('goodbye ophelia') || lowerTranscript.includes('bye ophelia')) {
      console.log('Close Ophelia command detected');
      setIsOpen(false);
      resetTranscript();
      return;
    }

    if (lowerTranscript.includes('start message') || lowerTranscript.includes('begin message')) {
      console.log('Start message command detected');
      setIsMessaging(true);
      resetTranscript();
      return;
    }

    if (lowerTranscript.includes('reset message')) {
      console.log('Reset message command detected');
      setIsMessaging(false);
      setInput('');
      resetTranscript();
      return;
    }

    if ((lowerTranscript.includes('send message') || lowerTranscript.includes('send') || lowerTranscript.includes('send a message')) && isMessaging && input.trim()) {
      console.log('Send message command detected');
      const messageContent = input.trim();
      // Remove "send" from the message if it's at the start
      const cleanMessage = messageContent.replace(/^send\s+/i, '');
      if (cleanMessage) {
        const form = document.querySelector('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
      setIsMessaging(false);
      setInput('');
      resetTranscript();
      return;
    }

    // Update input if in messaging mode
    if (isMessaging) {
      console.log('In messaging mode, updating input');
      const cleanTranscript = lowerTranscript
        .replace(/hey ophelia|close ophelia|start message|reset message|send message|send a message|send/gi, '')
        .trim();
      
      if (cleanTranscript) {
        console.log('Setting input to:', cleanTranscript);
        setInput(cleanTranscript);
      }
    }
  }, [transcript, listening, isMessaging, setIsMessaging, resetTranscript, setIsOpen, input]);

  // Toggle speech recognition
  const toggleListening = useCallback(() => {
    if (listening) {
      SpeechRecognitionLib.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognitionLib.startListening({ continuous: true });
      setIsListening(true);
    }
  }, [listening]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get chat response
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!chatRes.ok) throw new Error('Chat request failed');
      
      // Add assistant message with empty content
      const assistantMessage = { role: 'assistant', content: '' };
      setMessages(prev => [...prev, assistantMessage]);

      // Handle streaming response
      const reader = chatRes.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          fullContent += chunk;

          // Update the last message with the new content
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              ...newMessages[newMessages.length - 1],
              content: fullContent,
            };
            return newMessages;
          });
        }
      }

      // Handle TTS if enabled
      if (isTTSEnabled) {
        try {
          const ttsRes = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: fullContent }),
          });

          if (!ttsRes.ok) throw new Error('TTS request failed');

          // Create a MediaSource
          const mediaSource = new MediaSource();
          const audioUrl = URL.createObjectURL(mediaSource);
          
          if (audioRef.current) {
            // Clean up previous audio URL
            if (audioRef.current.src) {
              URL.revokeObjectURL(audioRef.current.src);
            }
            
            audioRef.current.src = audioUrl;
            
            // Wait for MediaSource to be ready
            await new Promise((resolve) => {
              mediaSource.addEventListener('sourceopen', resolve, { once: true });
            });

            // Create a SourceBuffer
            const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
            
            // Handle streaming audio data
            const reader = ttsRes.body?.getReader();
            if (reader) {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // Append the chunk to the SourceBuffer
                await new Promise((resolve) => {
                  sourceBuffer.addEventListener('updateend', resolve, { once: true });
                  sourceBuffer.appendBuffer(value);
                });
              }
            }

            // End the stream
            mediaSource.endOfStream();
            
            try {
              await audioRef.current.play();
              console.log('Playing audio');
            } catch (playError) {
              console.error('Error playing audio:', playError);
            }
          }
        } catch (error) {
          console.error('TTS Error:', error);
        }
      }

      // Check for navigation
      const navigationMatch = fullContent.match(/^Navigating you to (?:project )?(\d+|\/\w+|\w+)/i);
      if (navigationMatch) {
        const path = extractNavigationPath(navigationMatch[0]);
        if (path) {
          setPendingNavigation(path);
          setShowNavigationConfirm(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractNavigationPath = (content: string): string | null => {
    const navigationPatterns = [
      { pattern: /^Navigating you to (\/\w+)/i, path: '$1' },
      { pattern: /^Navigating you to (about)/i, path: '/about' },
      { pattern: /^Navigating you to (projects)/i, path: '/projects' },
      { pattern: /^Navigating you to (admin)/i, path: '/admin' },
      // Project-specific navigation patterns
      { pattern: /^Navigating you to project (\d+)/i, path: (match: RegExpMatchArray) => `/projects/${match[1]}` }
    ];

    for (const { pattern, path } of navigationPatterns) {
      const match = content.match(pattern);
      if (match) {
        if (typeof path === 'function') {
          return path(match);
        }
        return path.startsWith('/') ? path : `/${path}`;
      }
    }
    return null;
  };

  const handleConfirmNavigation = useCallback(() => {
    if (pendingNavigation) {
      router.push(pendingNavigation);
      setShowNavigationConfirm(false);
      setPendingNavigation(null);
      setCountdown(10); // Reset countdown after navigation
    }
  }, [pendingNavigation, router]);

  const handleCancelNavigation = useCallback(() => {
    setShowNavigationConfirm(false);
    setPendingNavigation(null);
    setCountdown(10); // Reset countdown on cancel
  }, []);

  // Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showNavigationConfirm && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (showNavigationConfirm && countdown === 0) {
      handleConfirmNavigation();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showNavigationConfirm, countdown, handleConfirmNavigation]);

  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeEvent = new CustomEvent('ai:message', {
        detail: welcomeMessage
      });
      window.dispatchEvent(welcomeEvent);
    }
  }, [isOpen, messages.length]);

  // Handle TTS
  useEffect(() => {
    if (!isTTSEnabled) return;

    const handleMessage = async (event: Event) => {
      const customEvent = event as CustomEvent<{ role: string; content: string }>;
      const message = customEvent.detail;
      if (message.role === 'assistant') {
        try {
          const textForTTS = message.content.replace(LINK_PLACEHOLDER, 'here');
          console.log('Sending TTS request for:', textForTTS);
          const response = await fetch(`/api/chat?text=${encodeURIComponent(textForTTS)}`);

          if (!response.ok) {
            const errorText = await response.text();
            console.error('TTS request failed:', errorText);
            throw new Error(`TTS request failed: ${errorText}`);
          }
          
          const audioBlob = await response.blob();
          console.log('Received audio blob:', audioBlob.size, 'bytes');
          
          if (audioBlob.size === 0) {
            console.error('Received empty audio blob');
            return;
          }

          const audioUrl = URL.createObjectURL(audioBlob);
          
          if (audioRef.current) {
            // Clean up previous audio URL
            if (audioRef.current.src) {
              URL.revokeObjectURL(audioRef.current.src);
            }
            
            audioRef.current.src = audioUrl;
            
            try {
              await audioRef.current.play();
              console.log('Playing audio');
            } catch (playError) {
              console.error('Error playing audio:', playError);
            }
          }
        } catch (error) {
          console.error('Error in TTS handling:', error);
        }
      }
    };

    window.addEventListener('ai:message', handleMessage);
    return () => {
      window.removeEventListener('ai:message', handleMessage);
      if (audioRef.current) {
        audioRef.current.pause();
        if (audioRef.current.src) {
          URL.revokeObjectURL(audioRef.current.src);
        }
        audioRef.current.src = '';
      }
    };
  }, [isTTSEnabled]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <Dialog.Trigger asChild>
        <Button variant="nav">
          <MessageSquare className="w-5 h-5 mr-2" />
          Chat
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="hidden" />
        <Dialog.Content 
          className="fixed w-[95%] max-w-[95%] h-[60vh] bg-white/30 backdrop-blur-md rounded-xl shadow-xl z-[101] flex flex-col overflow-hidden
            left-1/2 -translate-x-1/2
            md:left-auto md:translate-x-0 md:right-4 md:w-full md:max-w-md md:h-[600px]"
          style={{ top: `${chatPosition.top}px` }}
        >
          <div className="p-4 border-b border-gray-200/50">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">Chat with Ophelia</Dialog.Title>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                  className={`p-2 rounded-lg transition-colors ${
                    isTTSEnabled
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  title={isTTSEnabled ? 'Disable Text-to-Speech' : 'Enable Text-to-Speech'}
                >
                  {isTTSEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
                {browserSupportsSpeechRecognition && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-2 rounded-lg transition-colors ${
                      isListening
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'text-gray-300 hover:text-white'
                    }`}
                    title={isListening ? 'Disable Voice Input' : 'Enable Voice Input'}
                  >
                    {isListening ? <Mic size={20} /> : <MicOff size={20} />}
                  </button>
                )}
                <Dialog.Close className="text-gray-300 hover:text-white">
                  <X size={20} />
                </Dialog.Close>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/30 backdrop-blur-md">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'assistant' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.role === 'assistant'
                      ? 'bg-gray-700 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  {message.id === 'welcome' ? (
                    (() => {
                      const [before, after] = message.content.split(LINK_PLACEHOLDER);
                      return (
                        <span className="whitespace-pre-wrap">
                          {before}
                          <a href={OPHOLIO_REPO_URL} target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-200">
                            here
                          </a>
                          {after}
                        </span>
                      );
                    })()
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Navigation Confirmation Dialog */}
          <Dialog.Root 
            open={showNavigationConfirm} 
            onOpenChange={(open) => {
              if (!open) {
                setShowNavigationConfirm(false);
                setPendingNavigation(null);
                setCountdown(10);
              }
            }}
          >
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-xl max-w-md w-full z-[201]">
                <Dialog.Title className="text-lg font-semibold mb-4">
                  Confirm Navigation
                </Dialog.Title>
                <p className="mb-4">
                  Are you sure you want to navigate to {pendingNavigation}?
                  You will be redirected in {countdown} seconds.
                </p>
                <div className="flex justify-end gap-4">
                  <Button variant="nav" onClick={handleCancelNavigation}>
                    Stay
                  </Button>
                  <Button variant="nav" onClick={handleConfirmNavigation}>
                    Navigate
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200/50 bg-white/30 backdrop-blur-md">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 rounded-lg border border-gray-300/50 bg-white/50 backdrop-blur-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-900 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
      <audio ref={audioRef} className="hidden" />
    </Dialog.Root>
  );
} 