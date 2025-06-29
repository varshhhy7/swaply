"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Minus, Scale, CheckCircle, AlertTriangle } from "lucide-react"

interface NegotiationDrawerProps {
  isOpen: boolean
  onClose: () => void
  trade: {
    partner: string
    wants: string[]
    offers: string[]
    wantValue: number
    offerValue: number
  }
}

export function NegotiationDrawer({ isOpen, onClose, trade }: NegotiationDrawerProps) {
  const [yourItems, setYourItems] = useState(trade.wants)
  const [theirItems, setTheirItems] = useState(trade.offers)
  const [tokens, setTokens] = useState(0)

  const yourValue = yourItems.reduce((sum, item) => sum + Number.parseInt(item.split("₹")[1] || "0"), 0)
  const theirValue = theirItems.reduce((sum, item) => sum + Number.parseInt(item.split("₹")[1] || "0"), 0) + tokens
  const fairness = Math.round((theirValue / yourValue) * 100)

  const getFairnessColor = () => {
    if (fairness >= 95 && fairness <= 105) return "text-green-400"
    if (fairness >= 85 && fairness <= 115) return "text-yellow-400"
    return "text-red-400"
  }

  const getFairnessIcon = () => {
    if (fairness >= 95 && fairness <= 105) return CheckCircle
    if (fairness >= 85 && fairness <= 115) return AlertTriangle
    return X
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <Card className="glass-strong w-full max-w-2xl max-h-[80vh] overflow-y-auto slide-in">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Negotiate Trade</h2>
            <Button size="sm" variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-gray-400 mt-2">Adjust the trade to make it fair for both parties</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Fairness Meter */}
          <Card className="glass p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-300">Trade Fairness</span>
              <div className="flex items-center space-x-2">
                {React.createElement(getFairnessIcon(), {
                  className: `w-4 h-4 ₹{getFairnessColor()}`,
                })}
                <span className={`font-bold ₹{getFairnessColor()}`}>{fairness}%</span>
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ₹{
                  fairness >= 95 && fairness <= 105
                    ? "bg-green-500"
                    : fairness >= 85 && fairness <= 115
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `₹{Math.min(fairness, 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>Your Value: ₹{yourValue}</span>
              <span>Their Value: ₹{theirValue}</span>
            </div>
          </Card>

          {/* Your Items */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">You Give</h3>
            <div className="space-y-2">
              {yourItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between glass p-3 rounded-lg">
                  <span className="text-white">{item}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setYourItems((prev) => prev.filter((_, i) => i !== index))}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full glass border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Coupon
              </Button>
            </div>
          </div>

          {/* Their Items */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">You Receive</h3>
            <div className="space-y-2">
              {theirItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between glass p-3 rounded-lg">
                  <span className="text-white">{item}</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Offered</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Token Balancer */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Balance with Tokens</h3>
            <Card className="glass p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300">Add tokens to balance trade</span>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setTokens(Math.max(0, tokens - 5))}
                    className="text-gray-400 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white font-bold w-16 text-center">{tokens} tokens</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setTokens(tokens + 5)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-400">Current balance: 247 tokens available</div>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              className="flex-1 bg-white text-black hover:bg-gray-100 font-semibold"
              disabled={fairness < 85 || fairness > 115}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Trade
            </Button>
            <Button
              variant="outline"
              className="flex-1 glass border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <Scale className="w-4 h-4 mr-2" />
              Send Counter-Offer
            </Button>
          </div>

          {fairness < 85 || fairness > 115 ? (
            <div className="text-center text-sm text-yellow-400">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              Trade needs to be more balanced to proceed
            </div>
          ) : (
            <div className="text-center text-sm text-green-400">
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Trade is fair and ready to confirm
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
