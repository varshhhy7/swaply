"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Plus, TrendingUp, MessageCircle, Zap, ArrowRight, Star, Clock, Users } from "lucide-react"

const trendingTrades = [
  {
    id: 1,
    platform: "Amazon",
    value: "₹75",
    category: "Shopping",
    expiry: "25 days",
    trader: "Sarah M.",
    rating: 4.9,
    verified: true,
  },
  {
    id: 2,
    platform: "Starbucks",
    value: "₹20",
    category: "Food & Drink",
    expiry: "12 days",
    trader: "Mike R.",
    rating: 5.0,
    verified: true,
  },
  {
    id: 3,
    platform: "Spotify",
    value: "₹12",
    category: "Entertainment",
    expiry: "30 days",
    trader: "Emma T.",
    rating: 4.8,
    verified: true,
  },
]

const yourMatches = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "AC",
    wants: "Amazon ₹50",
    offers: "Netflix ₹15 + Uber ₹25",
    matchScore: 95,
    online: true,
  },
  {
    id: 2,
    name: "Jordan Smith",
    avatar: "JS",
    wants: "Starbucks ₹25",
    offers: "DoorDash ₹30",
    matchScore: 88,
    online: false,
  },
  {
    id: 3,
    name: "Riley Park",
    avatar: "RP",
    wants: "Apple Store ₹100",
    offers: "Amazon ₹75 + Tokens",
    matchScore: 92,
    online: true,
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="text-center space-y-4 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">Welcome back, Trader</h1>
            <p className="text-xl text-gray-300">Ready to make some smart trades today?</p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/post-coupon">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold glow group"
              >
                <Plus className="mr-2 w-5 h-5" />
                Post a Coupon
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                size="lg"
                variant="outline"
                className="glass-strong border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
              >
                <TrendingUp className="mr-2 w-5 h-5" />
                Browse Marketplace
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Coupons", value: "12", icon: Clock, color: "blue" },
              { label: "Completed Trades", value: "47", icon: TrendingUp, color: "green" },
              { label: "New Matches", value: "8", icon: Users, color: "purple" },
              { label: "Messages", value: "3", icon: MessageCircle, color: "pink" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="glass-strong p-6 text-center floating-animation glow-purple"
                style={{ animationDelay: `₹{index * 0.1}s` }}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-₹{stat.color}-500 to-₹{stat.color}-600 flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Trending Trades Carousel */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Trades</h2>
              <Link href="/marketplace">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  View All
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {trendingTrades.map((trade, index) => (
                <Card
                  key={trade.id}
                  className="glass-strong p-6 group hover:glow-purple transition-all duration-300 cursor-pointer floating-animation"
                  style={{ animationDelay: `₹{index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold">{trade.platform[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{trade.platform}</h3>
                        <p className="text-sm text-gray-400">{trade.category}</p>
                      </div>
                    </div>
                    {trade.verified && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Verified</Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">{trade.value}</div>
                      <div className="text-sm text-gray-400">Expires in {trade.expiry}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
                          {trade.trader
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm text-gray-300">{trade.trader}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{trade.rating}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-white/20" onClick={()=>window.location.href="/trade/1"}>
                    View Trade
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Your Matches */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Your Matches</h2>
              <Link href="/chat">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  View All Chats
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {yourMatches.map((match, index) => (
                <Card
                  key={match.id}
                  className="glass-strong p-6 group hover:glow transition-all duration-300 cursor-pointer floating-animation"
                  style={{ animationDelay: `₹{index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                        {match.avatar}
                      </div>
                      {match.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{match.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          {match.matchScore}% match
                        </Badge>
                        <Zap className="w-3 h-3 text-yellow-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="text-gray-400">Wants: </span>
                      <span className="text-white font-medium">{match.wants}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Offers: </span>
                      <span className="text-white font-medium">{match.offers}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {/* <Button size="sm" className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button> */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={()=>window.location.href='/chat'}
                      className="flex-1 glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Negotiate
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
