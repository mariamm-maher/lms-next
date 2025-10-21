"use client";

import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

interface ChatMessage {
  id: number;
  type: "user" | "ai";
  message: string;
  timestamp: Date;
}

const mockChatHistory: ChatMessage[] = [
  {
    id: 1,
    type: "ai",
    message:
      "Hello! I'm your AI Learning Assistant. How can I help you with your studies today?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 2,
    type: "user",
    message: "Can you help me understand calculus derivatives?",
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
  },
  {
    id: 3,
    type: "ai",
    message:
      "Absolutely! Derivatives measure the rate of change of a function. Think of it as finding the slope of a curve at any point. Would you like me to explain with a specific example?",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
  },
];

const quickActions = [
  {
    id: 1,
    title: "Explain a Concept",
    icon: "💡",
    description: "Get detailed explanations on any topic",
  },
  {
    id: 2,
    title: "Practice Problems",
    icon: "🧮",
    description: "Generate practice exercises",
  },
  {
    id: 3,
    title: "Study Plan",
    icon: "📅",
    description: "Create a personalized study schedule",
  },
  {
    id: 4,
    title: "Quiz Me",
    icon: "❓",
    description: "Test your knowledge with questions",
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      message: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        type: "ai",
        message:
          "That's a great question! Let me help you with that. Based on your query, I can provide detailed explanations, examples, and practice problems to help you understand the concept better.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (action: (typeof quickActions)[0]) => {
    const quickMessage = `Help me with: ${action.title}`;
    setInputMessage(quickMessage);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <span>🤖</span>
          <span>AI Learning Assistant</span>
        </h2>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {quickActions.map((action) => (
            <Card
              key={action.id}
              hover
              onClick={() => handleQuickAction(action)}
              className="text-center p-4 cursor-pointer"
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="flex flex-col h-96">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.type === "user" ? "text-purple-100" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me anything about your studies..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </Button>
        </div>
      </Card>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
            <span>📊</span>
            <span>Study Analytics</span>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Questions Asked</span>
              <span className="font-semibold">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Concepts Learned</span>
              <span className="font-semibold">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Study Sessions</span>
              <span className="font-semibold">18</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
            <span>🎯</span>
            <span>Recommendations</span>
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-800">
                Practice more calculus derivatives
              </p>
              <p className="text-xs text-purple-600">
                Based on recent questions
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">
                Review JavaScript arrays
              </p>
              <p className="text-xs text-blue-600">
                Quiz performance suggests review needed
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
