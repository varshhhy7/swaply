"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { Plus, Clock, CheckCircle, AlertTriangle, Filter, Download, Upload, Coins, DollarSign } from "lucide-react"
import Link from "next/link"

const coupons = [
  {
    id: 1,
    platform: "Puma",
    value: "50%",
    code: "AIA4EWAGUT",
    category: "Shopping",
    expiry: "2025-06-29",
    daysLeft: 25,
    status: "active",
    verified: true,
    addedDate: "2024-01-10",
  },
  {
    id: 2,
    platform: "Starbucks",
    value: "₹20",
    code: "SBX-4K8L-9N2Q",
    category: "Food & Drink",
    expiry: "2024-02-05",
    daysLeft: 12,
    status: "expiring",
    verified: true,
    addedDate: "2024-01-08",
  },
  {
    id: 3,
    platform: "Netflix",
    value: "₹15",
    code: "NFX-8M3P-5R7T",
    category: "Entertainment",
    expiry: "2024-03-01",
    daysLeft: 45,
    status: "active",
    verified: true,
    addedDate: "2024-01-12",
  },
  {
    id: 4,
    platform: "Uber Eats",
    value: "₹30",
    code: "UBR-2Q6W-8E4R",
    category: "Food & Drink",
    expiry: "2024-01-28",
    daysLeft: 3,
    status: "expiring",
    verified: true,
    addedDate: "2024-01-05",
  },
];

const tradeHistory = [
  {
    id: 1,
    type: "completed",
    partner: "Alex Chen",
    gave: "Spotify ₹12",
    received: "Netflix ₹15",
    date: "2024-01-20",
    profit: "+₹3",
  },
  {
    id: 2,
    type: "completed",
    partner: "Jordan Smith",
    gave: "Amazon ₹25",
    received: "Starbucks ₹20 + ₹8 tokens",
    date: "2024-01-18",
    profit: "+₹3",
  },
  {
    id: 3,
    type: "pending",
    partner: "Riley Park",
    gave: "Apple Store ₹50",
    received: "Amazon ₹45 + ₹10 tokens",
    date: "2024-01-22",
    profit: "+₹5",
  },
  {
    id: 4,
    type: "expired",
    partner: "Sam Wilson",
    gave: "Netflix ₹15",
    received: "Cancelled",
    date: "2024-01-15",
    profit: "₹0",
  },
]

export default function Wallet() {
  const [activeTab, setActiveTab] = useState("coupons")
  const [filterStatus, setFilterStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "expiring":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "expired":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return CheckCircle
      case "expiring":
        return AlertTriangle
      case "expired":
        return Clock
      default:
        return Clock
    }
  }

  const getTradeStatusColor = (type: string) => {
    switch (type) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "expired":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const filteredCoupons = filterStatus === "all" ? coupons : coupons.filter((coupon) => coupon.status === filterStatus)

  const totalValue = coupons.reduce((sum, coupon) => sum + Number.parseInt(coupon.value.replace("₹", "")), 0)
  const activeCoupons = coupons.filter((c) => c.status === "active").length
  const expiringCoupons = coupons.filter((c) => c.status === "expiring").length

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">Your Wallet</h1>
            <p className="text-xl text-gray-300">Manage your coupons and track your trading history</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass-strong p-6 text-center floating-animation glow">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">₹{totalValue}</div>
              <div className="text-sm text-gray-400">Total Value</div>
            </Card>

            <Card
              className="glass-strong p-6 text-center floating-animation glow-purple"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{activeCoupons}</div>
              <div className="text-sm text-gray-400">Active Coupons</div>
            </Card>

            <Card className="glass-strong p-6 text-center floating-animation glow" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{expiringCoupons}</div>
              <div className="text-sm text-gray-400">Expiring Soon</div>
            </Card>

            <Card
              className="glass-strong p-6 text-center floating-animation glow-purple"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">247</div>
              <div className="text-sm text-gray-400">Tokens</div>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="glass-strong rounded-full p-2">
              <div className="flex space-x-2">
                <Button
                  onClick={() => setActiveTab("coupons")}
                  className={
                    activeTab === "coupons" ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/10"
                  }
                >
                  My Coupons
                </Button>
                <Button
                  onClick={() => setActiveTab("history")}
                  className={
                    activeTab === "history" ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/10"
                  }
                >
                  Trade History
                </Button>
                <Button
                  onClick={() => setActiveTab("tokens")}
                  className={
                    activeTab === "tokens" ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/10"
                  }
                >
                  Tokens
                </Button>
              </div>
            </div>
          </div>

          {/* Coupons Tab */}
          {activeTab === "coupons" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <Link href="/post-coupon">
                    <Button className="bg-white text-black hover:bg-gray-100 font-semibold">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Coupon
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Bulk Import
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="glass border-white/20 rounded-lg px-3 py-2 text-white bg-transparent text-sm"
                  >
                    <option value="all" className="bg-gray-800">
                      All Status
                    </option>
                    <option value="active" className="bg-gray-800">
                      Active
                    </option>
                    <option value="expiring" className="bg-gray-800">
                      Expiring Soon
                    </option>
                    <option value="expired" className="bg-gray-800">
                      Expired
                    </option>
                  </select>
                  <Button
                    variant="outline"
                    className="glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoupons.map((coupon, index) => {
                  const StatusIcon = getStatusIcon(coupon.status)
                  return (
                    <Card
                      key={coupon.id}
                      className="glass-strong p-6 floating-animation hover:glow-purple transition-all duration-300"
                      style={{ animationDelay: `₹{index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold">{coupon.platform[0]}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{coupon.platform}</h3>
                            <p className="text-sm text-gray-400">{coupon.category}</p>
                          </div>
                        </div>
                        <Badge className={`₹{getStatusColor(coupon.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {coupon.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-white">{coupon.value}</div>
                          {coupon.verified && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Code:</span>
                            <span className="text-white font-mono">{coupon.code}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Expires:</span>
                            <span className={`₹{coupon.daysLeft <= 7 ? "text-red-400" : "text-white"}`}>
                              {coupon.daysLeft} days
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Added:</span>
                            <span className="text-white">{new Date(coupon.addedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="flex-1 bg-white text-black hover:bg-gray-100">
                          Trade Now
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Trade History Tab */}
          {activeTab === "history" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Trade History</h2>
                <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/10 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="space-y-4">
                {tradeHistory.map((trade, index) => (
                  <Card
                    key={trade.id}
                    className="glass-strong p-6 floating-animation"
                    style={{ animationDelay: `₹{index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm">
                          {trade.partner
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{trade.partner}</h3>
                          <p className="text-sm text-gray-400">{new Date(trade.date).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge className={getTradeStatusColor(trade.type)}>{trade.type}</Badge>
                        <div
                          className={`text-sm font-semibold ₹{trade.profit.startsWith("+") ? "text-green-400" : "text-gray-400"}`}
                        >
                          {trade.profit}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">You gave: </span>
                        <span className="text-white font-medium">{trade.gave}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">You received: </span>
                        <span className="text-white font-medium">{trade.received}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tokens Tab */}
          {activeTab === "tokens" && (
            <div className="space-y-6">
              <div className="text-center">
                <Card className="glass-strong p-8 max-w-md mx-auto glow">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <Coins className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">247 Tokens</div>
                  <p className="text-gray-400 mb-6">Use tokens to balance trades and unlock premium features</p>
                  <Button className="bg-white text-black hover:bg-gray-100 font-semibold">Buy More Tokens</Button>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-strong p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Token Usage</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trade Balancing</span>
                      <span className="text-white">45 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Premium Features</span>
                      <span className="text-white">12 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Priority Matching</span>
                      <span className="text-white">8 tokens</span>
                    </div>
                  </div>
                </Card>

                <Card className="glass-strong p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Earn Tokens</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Complete Trades</span>
                      <span className="text-green-400">+5 per trade</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Verify Coupons</span>
                      <span className="text-green-400">+2 per coupon</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Referrals</span>
                      <span className="text-green-400">+25 per referral</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
