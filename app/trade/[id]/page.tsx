"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import {
  MessageCircle,
  Plus,
  Minus,
  Scale,
  CheckCircle,
  AlertTriangle,
  Star,
  Shield,
  Coins,
  Send,
  ArrowLeftRight,
} from "lucide-react"

// Mock data for the trade
const tradeData = {
  initiator: {
    id: 1,
    name: "You",
    avatar: "YU",
    rating: 4.9,
    trades: 47,
    verified: true,
    coupons: [
      { id: 1, platform: "Amazon", value: 50, code: "AMZ-50-XYZ", category: "Shopping" },
      { id: 2, platform: "Starbucks", value: 25, code: "SBX-25-ABC", category: "Food" },
      { id: 3, platform: "Netflix", value: 15, code: "NFX-15-DEF", category: "Entertainment" },
    ],
    tokens: 247,
  },
  partner: {
    id: 2,
    name: "Alex Chen",
    avatar: "AC",
    rating: 4.8,
    trades: 23,
    verified: true,
    coupons: [
      { id: 4, platform: "Uber Eats", value: 30, code: "UBR-30-GHI", category: "Food" },
      { id: 5, platform: "Spotify", value: 12, code: "SPT-12-JKL", category: "Entertainment" },
      { id: 6, platform: "Apple Store", value: 100, code: "APL-100-MNO", category: "Shopping" },
    ],
    tokens: 156,
  },
}

export default function TradePage() {
  const [yourOffer, setYourOffer] = useState<any[]>([])
  const [theirOffer, setTheirOffer] = useState<any[]>([])
  const [yourTokens, setYourTokens] = useState(0)
  const [theirTokens, setTheirTokens] = useState(0)
  const [yourConfirmed, setYourConfirmed] = useState(false)
  const [theirConfirmed, setTheirConfirmed] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [tradeCompleted, setTradeCompleted] = useState(false)

  const yourValue = yourOffer.reduce((sum, item) => sum + item.value, 0) + yourTokens
  const theirValue = theirOffer.reduce((sum, item) => sum + item.value, 0) + theirTokens
  const fairness = theirValue > 0 ? Math.round((yourValue / theirValue) * 100) : 0

  const getFairnessStatus = () => {
    if (fairness >= 95 && fairness <= 105) return { status: "Fair", color: "text-green-400", bgColor: "bg-green-500" }
    if (fairness >= 85 && fairness <= 115)
      return { status: "Close", color: "text-yellow-400", bgColor: "bg-yellow-500" }
    return { status: "Imbalanced", color: "text-red-400", bgColor: "bg-red-500" }
  }

  const addToOffer = (item: any, isYours: boolean) => {
    if (isYours) {
      setYourOffer((prev) => [...prev, item])
    } else {
      setTheirOffer((prev) => [...prev, item])
    }
  }

  const removeFromOffer = (itemId: number, isYours: boolean) => {
    if (isYours) {
      setYourOffer((prev) => prev.filter((item) => item.id !== itemId))
    } else {
      setTheirOffer((prev) => prev.filter((item) => item.id !== itemId))
    }
  }

  const handleConfirmTrade = () => {
    if (yourConfirmed && theirConfirmed) {
      setTradeCompleted(true)
      setTimeout(() => {
        // Redirect to success page or back to marketplace
      }, 3000)
    } else {
      setYourConfirmed(true)
    }
  }

  const autoBalance = () => {
    const difference = Math.abs(yourValue - theirValue)
    if (yourValue < theirValue) {
      setYourTokens(Math.ceil(difference))
    } else {
      setTheirTokens(Math.ceil(difference))
    }
  }

  const fairnessData = getFairnessStatus()

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">Live Trading Session</h1>
            <p className="text-gray-300">Negotiate and finalize your coupon exchange</p>
          </div>

          {/* Trade Completion Animation */}
          {tradeCompleted && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <Card className="glass-strong p-8 text-center max-w-md mx-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Trade Completed Successfully!</h2>
                <p className="text-gray-400 mb-4">Your coupons have been exchanged</p>
                <div className="flex items-center justify-center space-x-2">
                  <ArrowLeftRight className="w-5 h-5 text-blue-400 animate-pulse" />
                  <span className="text-blue-400">Processing exchange...</span>
                </div>
              </Card>
            </div>
          )}

          {/* Main Trading Interface */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Your Side */}
            <Card className="glass-strong p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {tradeData.initiator.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{tradeData.initiator.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{tradeData.initiator.rating}</span>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      {tradeData.initiator.trades} trades
                    </Badge>
                    {tradeData.initiator.verified && <Shield className="w-4 h-4 text-green-400" />}
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Coins className="w-4 h-4" />
                  <span className="font-semibold">{tradeData.initiator.tokens}</span>
                </div>
              </div>

              {/* Your Inventory */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-300">Your Coupons</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {tradeData.initiator.coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="glass p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                      onClick={() => addToOffer(coupon, true)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-medium">{coupon.platform}</span>
                          <span className="text-sm text-gray-400 ml-2">₹{coupon.value}</span>
                        </div>
                        <Plus className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Offer Zone */}
              <div className="glass p-4 rounded-lg border-2 border-blue-500/30 glow">
                <h4 className="font-medium text-white mb-3">Your Offer</h4>
                <div className="space-y-2 min-h-[100px]">
                  {yourOffer.map((item) => (
                    <div key={item.id} className="flex items-center justify-between glass-strong p-2 rounded">
                      <span className="text-white">
                        {item.platform} ₹{item.value}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromOffer(item.id, true)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  {/* Token Input */}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Tokens:</span>
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setYourTokens(Math.max(0, yourTokens - 5))}
                        className="text-gray-400"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-white font-medium w-12 text-center">{yourTokens}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setYourTokens(yourTokens + 5)}
                        className="text-gray-400"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Value:</span>
                    <span className="text-white font-bold">₹{yourValue}</span>
                  </div>
                </div>
              </div>

              {/* Your Actions */}
              <div className="mt-6 space-y-3">
                <Button
                  onClick={handleConfirmTrade}
                  disabled={yourOffer.length === 0 || (yourConfirmed && !theirConfirmed)}
                  className={`w-full font-semibold ₹{
                    yourConfirmed ? "bg-green-600 hover:bg-green-700" : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {yourConfirmed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Waiting for Partner
                    </>
                  ) : (
                    "Confirm Trade"
                  )}
                </Button>

                <div className="flex space-x-2">
                  <Button
                    onClick={autoBalance}
                    variant="outline"
                    className="flex-1 glass border-white/20 text-white hover:bg-white/10 bg-transparent text-sm"
                  >
                    <Scale className="w-4 h-4 mr-1" />
                    Auto Balance
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 glass border-white/20 text-white hover:bg-white/10 bg-transparent text-sm"
                  >
                    Counter Offer
                  </Button>
                </div>
              </div>
            </Card>

            {/* Their Side */}
            <Card className="glass-strong p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                  {tradeData.partner.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{tradeData.partner.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{tradeData.partner.rating}</span>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                      {tradeData.partner.trades} trades
                    </Badge>
                    {tradeData.partner.verified && <Shield className="w-4 h-4 text-green-400" />}
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Coins className="w-4 h-4" />
                  <span className="font-semibold">{tradeData.partner.tokens}</span>
                </div>
              </div>

              {/* Their Inventory */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-300">Their Coupons</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {tradeData.partner.coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="glass p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                      onClick={() => addToOffer(coupon, false)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white font-medium">{coupon.platform}</span>
                          <span className="text-sm text-gray-400 ml-2">₹{coupon.value}</span>
                        </div>
                        <Plus className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Their Offer Zone */}
              <div className="glass p-4 rounded-lg border-2 border-purple-500/30 glow-purple">
                <h4 className="font-medium text-white mb-3">Their Offer</h4>
                <div className="space-y-2 min-h-[100px]">
                  {theirOffer.map((item) => (
                    <div key={item.id} className="flex items-center justify-between glass-strong p-2 rounded">
                      <span className="text-white">
                        {item.platform} ₹{item.value}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromOffer(item.id, false)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  {/* Token Display */}
                  {theirTokens > 0 && (
                    <div className="flex items-center justify-between glass-strong p-2 rounded">
                      <span className="text-white">Tokens: {theirTokens}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Value:</span>
                    <span className="text-white font-bold">₹{theirValue}</span>
                  </div>
                </div>
              </div>

              {/* Their Status */}
              <div className="mt-6">
                <div
                  className={`w-full p-3 rounded-lg text-center ₹{
                    theirConfirmed ? "bg-green-600/20 border border-green-500/30" : "glass border-white/20"
                  }`}
                >
                  {theirConfirmed ? (
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirmed</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Waiting for confirmation...</span>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Trade Balance Bar */}
          <Card className="glass-strong p-6 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Trade Balance</h3>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-sm text-gray-400">Your Value: ₹{yourValue}</span>
                <ArrowLeftRight className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">Their Value: ₹{theirValue}</span>
              </div>
            </div>

            <div className="relative">
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-300 ₹{fairnessData.bgColor}`}
                  style={{ width: `₹{Math.min(fairness, 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">Imbalanced</span>
                <div className={`px-3 py-1 rounded-full glass ₹{fairnessData.color}`}>
                  <span className="text-sm font-semibold">{fairnessData.status}</span>
                </div>
                <span className="text-xs text-gray-400">Fair</span>
              </div>
            </div>

            {fairness < 85 || fairness > 115 ? (
              <div className="text-center mt-4">
                <p className="text-yellow-400 text-sm">
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  Consider adding tokens to balance this trade
                </p>
              </div>
            ) : (
              <div className="text-center mt-4">
                <p className="text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Trade is well balanced
                </p>
              </div>
            )}
          </Card>

          {/* Chat Widget */}
          <div className="fixed bottom-4 right-4 z-40">
            {chatOpen ? (
              <Card className="glass-strong w-80 h-96 flex flex-col">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h4 className="font-semibold text-white">Trade Chat</h4>
                  <Button size="sm" variant="ghost" onClick={() => setChatOpen(false)} className="text-gray-400">
                    ×
                  </Button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="text-gray-400">Alex:</span>
                      <span className="text-white ml-2">Hey! Ready to trade?</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">You:</span>
                      <span className="text-white ml-2">Yes! Let me add my items</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="glass border-white/20 text-white text-sm"
                    />
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Button
                onClick={() => setChatOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 rounded-full w-12 h-12 p-0"
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
