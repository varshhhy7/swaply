"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { Send, Paperclip, MoreVertical, Phone, Video, Star, Gift, Zap, Clock, CheckCircle2 } from "lucide-react"
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const chats = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "AC",
    lastMessage: "Sounds good! Let me add another coupon to balance it out.",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    trade: {
      wants: "Amazon ₹50",
      offers: "Netflix ₹15 + Uber ₹25",
      status: "negotiating",
    },
  },
  {
    id: 2,
    name: "Jordan Smith",
    avatar: "JS",
    lastMessage: "Perfect! Ready to confirm the trade?",
    timestamp: "15m ago",
    unread: 0,
    online: false,
    trade: {
      wants: "Starbucks ₹25",
      offers: "DoorDash ₹30",
      status: "ready",
    },
  },
  {
    id: 3,
    name: "Riley Park",
    avatar: "RP",
    lastMessage: "Thanks for the quick response!",
    timestamp: "1h ago",
    unread: 1,
    online: true,
    trade: {
      wants: "Apple Store ₹100",
      offers: "Amazon ₹75 + Tokens",
      status: "completed",
    },
  },
  {
    id: 4,
    name: "Sam Wilson",
    avatar: "SW",
    lastMessage: "Hey! Interested in your Netflix coupon.",
    timestamp: "3h ago",
    unread: 0,
    online: false,
    trade: {
      wants: "Netflix ₹15",
      offers: "Spotify ₹12 + ₹5 tokens",
      status: "pending",
    },
  },
]

let messages = [
  {
    id: 1,
    sender: "Alex Chen",
    content: "Hey! I saw your Amazon ₹50 coupon. I have Netflix ₹15 and Uber ₹25 to trade.",
    timestamp: "10:30 AM",
    isMe: false,
    type: "text",
  },
  {
    id: 2,
    sender: "Me",
    content:
      "Hi Alex! That sounds interesting. The values don't quite match though - mine is ₹50 and yours totals ₹40.",
    timestamp: "10:32 AM",
    isMe: true,
    type: "text",
  },
  {
    id: 3,
    sender: "Alex Chen",
    content: "You're right! Let me add a Starbucks ₹15 coupon to make it fair.",
    timestamp: "10:35 AM",
    isMe: false,
    type: "text",
  },
  {
    id: 4,
    sender: "Alex Chen",
    content: "",
    timestamp: "10:36 AM",
    isMe: false,
    type: "trade-proposal",
    tradeData: {
      wants: ["Amazon ₹50"],
      offers: ["Netflix ₹15", "Uber ₹25", "Starbucks ₹15"],
      totalWants: 50,
      totalOffers: 55,
      fairness: 110,
    },
  },
  {
    id: 5,
    sender: "Me",
    content: "That looks much better! The extra ₹5 value works for me.",
    timestamp: "10:38 AM",
    isMe: true,
    type: "text",
  },
  {
    id: 6,
    sender: "Alex Chen",
    content: "Sounds good! Let me add another coupon to balance it out.",
    timestamp: "10:40 AM",
    isMe: false,
    type: "text",
  },
]

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [newMessage, setNewMessage] = useState("")

  const roomId = `room_${Date.now()}`;
  
  useEffect(() => {
    const uid=localStorage.getItem('uid');
    socket.emit("join_room", roomId);

    socket.on("receive_message", (data) => {
       const message = {
         roomId,
         sender: uid,
         message: newMessage,
         timestamp: new Date().toLocaleTimeString([], {
           hour: "2-digit",
           minute: "2-digit",
         }),
         isMe: true,
         type: "text",
       };

       socket.emit("send_message", message);
    });

    socket.on("trade_update", (data) => {
      console.log("Trade updated:", data);
      // Optionally show status in UI
    });

    return () => {
      socket.off("receive_message");
      socket.off("trade_update");
    };
  }, [roomId]);

  const sendMessage = () => {
    const uid=localStorage.getItem('uid')
    const message = {
      roomId,
      sender: uid,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
      type: "text",
    };

    socket.emit("send_message", message);
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setNewMessage((prev) => [...prev, data]); // message from other user
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);


  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "ready":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "negotiating":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle2
      case "ready":
        return Zap
      case "negotiating":
        return Clock
      default:
        return Gift
    }
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Chat List */}
            <div className="lg:col-span-1">
              <Card className="glass-strong h-full flex flex-col">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
                  <div className="relative">
                    <Input
                      placeholder="Search conversations..."
                      className="glass border-white/20 text-white placeholder-gray-400 pl-4"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {chats.map((chat) => {
                    const StatusIcon = getStatusIcon(chat.trade.status)
                    return (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-200 hover:bg-white/5 ₹{
                          selectedChat.id === chat.id ? "bg-white/10 border-l-4 border-l-blue-500" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                              {chat.avatar}
                            </div>
                            {chat.online && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-white truncate">{chat.name}</h3>
                              <div className="flex items-center space-x-2">
                                {chat.unread > 0 && (
                                  <Badge className="bg-blue-500 text-white text-xs px-2 py-1">{chat.unread}</Badge>
                                )}
                                <span className="text-xs text-gray-400">{chat.timestamp}</span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-400 truncate mb-2">{chat.lastMessage}</p>

                            <div className="flex items-center justify-between">
                              <Badge className={`text-xs ₹{getStatusColor(chat.trade.status)}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {chat.trade.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              <Card className="glass-strong h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                          {selectedChat.avatar}
                        </div>
                        {selectedChat.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{selectedChat.name}</h3>
                        <p className="text-sm text-gray-400">
                          {selectedChat.online ? "Online now" : "Last seen 2h ago"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Trade Summary */}
                  <div className="mt-4 p-4 glass rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Current Trade</span>
                      <Badge className={`text-xs ₹{getStatusColor(selectedChat.trade.status)}`}>
                        {selectedChat.trade.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">You want: </span>
                        <span className="text-white font-medium">{selectedChat.trade.wants}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">They offer: </span>
                        <span className="text-white font-medium">{selectedChat.trade.offers}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ₹{message.isMe ? "justify-end" : "justify-start"}`}>
                      {message.type === "trade-proposal" ? (
                        <Card className="glass-strong p-4 max-w-md glow-purple">
                          <div className="flex items-center space-x-2 mb-3">
                            <Gift className="w-5 h-5 text-purple-400" />
                            <span className="font-semibold text-white">Trade Proposal</span>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <span className="text-sm text-gray-400">Wants:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {message.tradeData?.wants.map((item, index) => (
                                  <Badge key={index} className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="text-sm text-gray-400">Offers:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {message.tradeData?.offers.map((item, index) => (
                                  <Badge
                                    key={index}
                                    className="bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                                  >
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/10">
                              <div className="text-sm">
                                <span className="text-gray-400">Fairness: </span>
                                <span
                                  className={`font-semibold ₹{message.tradeData?.fairness === 100 ? "text-green-400" : message.tradeData?.fairness! > 100 ? "text-blue-400" : "text-yellow-400"}`}
                                >
                                  {message.tradeData?.fairness}%
                                </span>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                                >
                                  Counter
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="text-xs text-gray-400 mt-2">{message.timestamp}</div>
                        </Card>
                      ) : (
                        <div className={`max-w-md ₹{message.isMe ? "text-right" : "text-left"}`}>
                          <div
                            className={`inline-block p-3 rounded-2xl ₹{
                              message.isMe ? "bg-blue-600 text-white" : "glass-strong text-white"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{message.timestamp}</div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* AI Suggestions */}
                  <div className="flex justify-center">
                    <Card className="glass p-3 max-w-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-300">Smart Suggestion</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        Consider adding a ₹10 token to make this trade perfectly balanced.
                      </p>
                      <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white text-xs">
                        Add Suggestion
                      </Button>
                    </Card>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-white/10">
                  <div className="flex items-center space-x-3">
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="glass border-white/20 text-white placeholder-gray-400 pr-12"
                      />
                      <Button
                        size="sm"
                        onClick={sendMessage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-white/20 text-white hover:bg-white/10 text-xs bg-transparent"
                    >
                      <Gift className="w-3 h-3 mr-1" />
                      Propose Trade
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-white/20 text-white hover:bg-white/10 text-xs bg-transparent"
                    >
                      <Star className="w-3 h-3 mr-1" />
                      View Profile
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-white/20 text-white hover:bg-white/10 text-xs bg-transparent"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Start Negotiation
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
