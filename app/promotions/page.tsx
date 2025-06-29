"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import {
  Coins,
  Clock,
  Gift,
  ShoppingBag,
  Coffee,
  Music,
  Plane,
  Gamepad2,
  Search,
  Filter,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Plus,
} from "lucide-react"

const categories = [
  { id: "all", label: "All", icon: Gift },
  { id: "food", label: "Food & Drink", icon: Coffee },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "entertainment", label: "Entertainment", icon: Music },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
]

const promotions = [
  {
    id: 1,
    brand: "Starbucks",
    title: "₹10 Starbucks Gift Card",
    description: "Perfect for your daily coffee fix",
    tokenCost: 150,
    originalValue: 10,
    category: "food",
    expiresIn: "2 days",
    featured: true,
    logo: "/starbucks.jpeg",
    availability: "Limited Time",
    redeemed: 1247,
  },
  {
    id: 2,
    brand: "Amazon",
    title: "₹25 Amazon Credit",
    description: "Use for any purchase on Amazon",
    tokenCost: 350,
    originalValue: 25,
    category: "shopping",
    expiresIn: "5 days",
    featured: true,
    logo: "amazon.jpeg",
    availability: "Popular",
    redeemed: 892,
  },
  {
    id: 3,
    brand: "Netflix",
    title: "1 Month Netflix Premium",
    description: "Stream unlimited movies and shows",
    tokenCost: 200,
    originalValue: 15,
    category: "entertainment",
    expiresIn: "7 days",
    featured: false,
    logo: "netflix.jpeg",
    availability: "New",
    redeemed: 456,
  },
  {
    id: 4,
    brand: "Uber",
    title: "₹20 Uber Rides Credit",
    description: "Free rides anywhere in the city",
    tokenCost: 280,
    originalValue: 20,
    category: "travel",
    expiresIn: "3 days",
    featured: false,
    logo: "Uber.jpeg",
    availability: "Hot Deal",
    redeemed: 623,
  },
  {
    id: 5,
    brand: "Spotify",
    title: "3 Months Spotify Premium",
    description: "Ad-free music streaming",
    tokenCost: 450,
    originalValue: 30,
    category: "entertainment",
    expiresIn: "1 day",
    featured: true,
    logo: "spotify.jpeg",
    availability: "Ending Soon",
    redeemed: 234,
  },
]

const userTokens = 847
const redemptionHistory = [
  { id: 1, brand: "Starbucks", amount: "₹5", date: "2 days ago", tokens: 75 },
  { id: 2, brand: "Amazon", amount: "₹10", date: "1 week ago", tokens: 150 },
  { id: 3, brand: "Netflix", amount: "1 Month", date: "2 weeks ago", tokens: 200 },
]

export default function PromotionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filterTab, setFilterTab] = useState("available")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [showRedemptionModal, setShowRedemptionModal] = useState(false)
  const [redeemingPromotion, setRedeemingPromotion] = useState<any>(null)
  const [redemptionSuccess, setRedemptionSuccess] = useState(false)

  const filteredPromotions = promotions.filter((promo) => {
    const matchesCategory = selectedCategory === "all" || promo.category === selectedCategory
    const matchesSearch =
      promo.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRedeem = (promotion: any) => {
    setRedeemingPromotion(promotion)
    setShowRedemptionModal(true)
  }

  const confirmRedemption = () => {
    setShowRedemptionModal(false)
    setRedemptionSuccess(true)
    setTimeout(() => {
      setRedemptionSuccess(false)
      setRedeemingPromotion(null)
    }, 3000)
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Limited Time":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "Popular":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "New":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Hot Deal":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "Ending Soon":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen relative pt-20">
      <AnimatedBackground />
      <Navigation />

      <div className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-8 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Brand Deals
            </h1>
            <p className="text-xl text-gray-300">
              Redeem your tokens for exclusive rewards and offers
            </p>
          </div>

          {/* Token Balance Header */}
          <Card className="glass-strong p-6 mb-8 glow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {userTokens} Tokens
                  </h2>
                  <p className="text-gray-400">Available for redemption</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-white text-black hover:bg-gray-100 font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Buy More Tokens
                </Button>
                <Button
                  variant="outline"
                  className="glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Earn Tokens
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Left Panel - Categories */}
            <div className="lg:col-span-1">
              <Card className="glass-strong p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ₹{
                        selectedCategory === category.id
                          ? "bg-white/20 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {category.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-sm font-medium text-gray-300">
                    Your Stats
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">
                        Total Redeemed
                      </span>
                      <span className="text-sm text-white font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">
                        Tokens Spent
                      </span>
                      <span className="text-sm text-white font-medium">
                        2,340
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Value Saved</span>
                      <span className="text-sm text-green-400 font-medium">
                        ₹156
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Center Panel - Promotions */}
            <div className="lg:col-span-2">
              {/* Search and Filter */}
              <div className="space-y-4 mb-6">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search promotions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="glass-strong border-white/20 text-white placeholder-gray-400 pl-10"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-2">
                  {["available", "expiring", "redeemed"].map((tab) => (
                    <Button
                      key={tab}
                      onClick={() => setFilterTab(tab)}
                      variant={filterTab === tab ? "default" : "outline"}
                      className={
                        filterTab === tab
                          ? "bg-white text-black hover:bg-gray-100"
                          : "glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                      }
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Featured Promotions Carousel */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Featured Deals
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredPromotions
                    .filter((p) => p.featured)
                    .map((promo, index) => (
                      <Card
                        key={promo.id}
                        className="glass-strong p-6 group hover:glow-purple transition-all duration-300 cursor-pointer floating-animation"
                        style={{ animationDelay: `₹{index * 0.1}s` }}
                        onMouseEnter={() => setSelectedPromotion(promo)}
                        onMouseLeave={() => setSelectedPromotion(null)}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img src={promo.logo} className="w-10 h-10" />
                            <div>
                              <h4 className="font-semibold text-white">
                                {promo.brand}
                              </h4>
                              <p className="text-sm text-gray-400">
                                {promo.title}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={getAvailabilityColor(promo.availability)}
                          >
                            {promo.availability}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-300 mb-4">
                          {promo.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Coins className="w-4 h-4 text-yellow-400" />
                            <span className="text-white font-bold">
                              {promo.tokenCost} tokens
                            </span>
                          </div>
                          <div className="text-sm text-gray-400">
                            Value: ₹{promo.originalValue}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>Expires in {promo.expiresIn}</span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {promo.redeemed} redeemed
                          </div>
                        </div>

                        {selectedPromotion?.id === promo.id && (
                          <Button
                            onClick={() => handleRedeem(promo)}
                            disabled={userTokens < promo.tokenCost}
                            className="w-full bg-white text-black hover:bg-gray-100 font-semibold slide-in"
                          >
                            <Gift className="w-4 h-4 mr-2" />
                            Redeem Now
                          </Button>
                        )}
                      </Card>
                    ))}
                </div>
              </div>

              {/* All Promotions Grid */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  All Promotions
                </h3>
                <div className="grid gap-4">
                  {filteredPromotions.map((promo, index) => (
                    <Card
                      key={promo.id}
                      className="glass-strong p-4 group hover:glow transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setSelectedPromotion(promo)}
                      onMouseLeave={() => setSelectedPromotion(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img src={promo.logo} className="w-10 h-10" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">
                              {promo.title}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {promo.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1">
                                <Coins className="w-3 h-3 text-yellow-400" />
                                <span className="text-sm text-white font-medium">
                                  {promo.tokenCost}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>{promo.expiresIn}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {selectedPromotion?.id === promo.id && (
                          <Button
                            onClick={() => handleRedeem(promo)}
                            disabled={userTokens < promo.tokenCost}
                            className="bg-white text-black hover:bg-gray-100 font-semibold slide-in"
                          >
                            Redeem
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Token Info & History */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Token Balance Card */}
                <Card className="glass-strong p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Token Balance
                  </h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-white mb-2">
                      {userTokens}
                    </div>
                    <p className="text-sm text-gray-400">Available Tokens</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold">
                    <Plus className="w-4 h-4 mr-2" />
                    Buy More Tokens
                  </Button>
                </Card>

                {/* Redemption History */}
                <Card className="glass-strong p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recent Redemptions
                  </h3>
                  <div className="space-y-3">
                    {redemptionHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">
                            {item.brand}
                          </p>
                          <p className="text-xs text-gray-400">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white">{item.amount}</p>
                          <p className="text-xs text-yellow-400">
                            {item.tokens} tokens
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 glass border-white/20 text-white hover:bg-white/10 bg-transparent text-sm"
                  >
                    View All History
                  </Button>
                </Card>

                {/* Earn More Tokens */}
                <Card className="glass-strong p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Earn More Tokens
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">
                        Complete Trade
                      </span>
                      <span className="text-sm text-green-400">+5 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">
                        Refer Friend
                      </span>
                      <span className="text-sm text-green-400">+25 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Daily Login</span>
                      <span className="text-sm text-green-400">+2 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">
                        Verify Coupon
                      </span>
                      <span className="text-sm text-green-400">+3 tokens</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Redemption Modal */}
          {showRedemptionModal && redeemingPromotion && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <Card className="glass-strong p-8 max-w-md mx-4">
                <div className="text-center space-y-6">
                  <div className="text-4xl">{redeemingPromotion.logo}</div>
                  <h2 className="text-2xl font-bold text-white">
                    Confirm Redemption
                  </h2>
                  <div className="space-y-2">
                    <p className="text-white font-medium">
                      {redeemingPromotion.title}
                    </p>
                    <p className="text-gray-400">
                      {redeemingPromotion.description}
                    </p>
                  </div>

                  <div className="glass p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Cost:</span>
                      <div className="flex items-center space-x-1">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-bold">
                          {redeemingPromotion.tokenCost} tokens
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Remaining Balance:</span>
                      <span className="text-white font-bold">
                        {userTokens - redeemingPromotion.tokenCost} tokens
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => setShowRedemptionModal(false)}
                      variant="outline"
                      className="flex-1 glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={confirmRedemption}
                      className="flex-1 bg-white text-black hover:bg-gray-100 font-semibold"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Success Animation */}
          {redemptionSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <Card className="glass-strong p-8 text-center max-w-md mx-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Successfully Redeemed!
                </h2>
                <p className="text-gray-400 mb-4">
                  Your reward has been added to your account
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <Gift className="w-5 h-5 text-green-400 animate-bounce" />
                  <span className="text-green-400">
                    Check your wallet for details
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
