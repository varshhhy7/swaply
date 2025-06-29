"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { Search, Filter, Star, Clock, MessageCircle, Heart, CheckCircle, TrendingUp, X } from "lucide-react"
import Link from "next/link"

const categories = ["All", "Food & Drink", "Shopping", "Entertainment", "Travel", "Services"]
const platforms = ["Amazon", "Starbucks", "Netflix", "Uber", "Spotify", "Apple", "Google Play"]

const coupons = [
  {
    id: 1,
    platform: "Amazon",
    value: "₹75",
    originalValue: "₹75",
    category: "Shopping",
    expiry: "25 days",
    trader: "Sarah M.",
    rating: 4.9,
    trades: 23,
    verified: true,
    trending: true,
    image: "/amazon.jpeg",
    description: "Amazon Gift Card - Perfect for holiday shopping",
  },
  {
    id: 2,
    platform: "Starbucks",
    value: "₹20",
    originalValue: "₹25",
    category: "Food & Drink",
    expiry: "12 days",
    image: "/starbucks.jpeg",
    trader: "Mike R.",
    rating: 5.0,
    trades: 47,
    verified: true,
    trending: false,
    description: "Starbucks Gift Card - Great for coffee lovers",
  },
  {
    id: 3,
    platform: "Netflix",
    value: "₹15",
    originalValue: "₹15",
    category: "Entertainment",
    expiry: "30 days",
    trader: "Emma T.",
    image: "/netflix.jpeg",
    rating: 4.8,
    trades: 31,
    verified: true,
    trending: true,
    description: "Netflix Premium Subscription - 1 Month",
  },
  {
    id: 4,
    platform: "Uber Eats",
    value: "₹30",
    originalValue: "₹35",
    category: "Food & Drink",
    expiry: "8 days",
    trader: "Alex C.",
    rating: 4.7,
    trades: 19,
    verified: true,
    image: "/Uber.jpeg",
    trending: false,
    description: "Uber Eats Credit - Free delivery included",
  },
  {
    id: 5,
    platform: "Spotify",
    value: "₹12",
    originalValue: "₹12",
    category: "Entertainment",
    expiry: "45 days",
    trader: "Jordan P.",
    rating: 4.9,
    trades: 38,
    verified: true,
    trending: true,
    image: "/spotify.jpeg",
    description: "Spotify Premium - 1 Month Subscription",
  },
  {
    id: 6,
    platform: "Apple Store",
    value: "₹100",
    originalValue: "₹100",
    category: "Shopping",
    expiry: "60 days",
    trader: "Riley K.",
    rating: 5.0,
    trades: 52,
    verified: true,
    image: "/apple.jpeg",
    trending: false,
    description: "Apple Store Gift Card - Use for any Apple product",
  },
];

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesCategory = selectedCategory === "All" || coupon.category === selectedCategory
    const matchesSearch =
      coupon.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Marketplace
            </h1>
            <p className="text-xl text-gray-300">
              Discover amazing deals from verified traders
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search coupons, platforms, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-strong border-white/20 text-white placeholder-gray-400 pl-10 py-3"
                />
              </div>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="glass-strong border-white/20 text-white hover:bg-white/10"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={
                    selectedCategory === category
                      ? "bg-white text-black hover:bg-gray-100"
                      : "glass border-white/20 text-white hover:bg-white/10"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <Card className="glass-strong p-6 slide-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Advanced Filters
                  </h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Platform
                    </label>
                    <select className="w-full glass border-white/20 rounded-lg px-3 py-2 text-white bg-transparent">
                      <option value="">All Platforms</option>
                      {platforms.map((platform) => (
                        <option
                          key={platform}
                          value={platform}
                          className="bg-gray-800"
                        >
                          {platform}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Value Range
                    </label>
                    <select className="w-full glass border-white/20 rounded-lg px-3 py-2 text-white bg-transparent">
                      <option value="" className="bg-gray-800">
                        Any Value
                      </option>
                      <option value="0-25" className="bg-gray-800">
                        ₹0 - ₹25
                      </option>
                      <option value="25-50" className="bg-gray-800">
                        ₹25 - ₹50
                      </option>
                      <option value="50-100" className="bg-gray-800">
                        ₹50 - ₹100
                      </option>
                      <option value="100+" className="bg-gray-800">
                        ₹100+
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expiry
                    </label>
                    <select className="w-full glass border-white/20 rounded-lg px-3 py-2 text-white bg-transparent">
                      <option value="" className="bg-gray-800">
                        Any Time
                      </option>
                      <option value="7" className="bg-gray-800">
                        Within 7 days
                      </option>
                      <option value="30" className="bg-gray-800">
                        Within 30 days
                      </option>
                      <option value="60" className="bg-gray-800">
                        Within 60 days
                      </option>
                    </select>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-300">
              Showing {filteredCoupons.length} of {coupons.length} coupons
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <select className="glass border-white/20 rounded-lg px-3 py-1 text-white bg-transparent text-sm">
                <option value="trending" className="bg-gray-800">
                  Trending
                </option>
                <option value="value-high" className="bg-gray-800">
                  Value: High to Low
                </option>
                <option value="value-low" className="bg-gray-800">
                  Value: Low to High
                </option>
                <option value="expiry" className="bg-gray-800">
                  Expiring Soon
                </option>
                <option value="rating" className="bg-gray-800">
                  Highest Rated
                </option>
              </select>
            </div>
          </div>

          {/* Coupon Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoupons.map((coupon, index) => (
              <Card
                key={coupon.id}
                className="glass-strong p-6 group hover:glow-purple transition-all duration-300 cursor-pointer floating-animation"
                style={{ animationDelay: `₹{index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"> */}
                    <img
                      src={coupon.image}
                      className="rounded-full w-12 h-12"
                    />
                    {/* </div> */}
                    <div>
                      <h3 className="font-semibold text-white">
                        {coupon.platform}
                      </h3>
                      <p className="text-sm text-gray-400">{coupon.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {coupon.trending && (
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                    {coupon.verified && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-white">
                        {coupon.value}
                      </div>
                      {coupon.value !== coupon.originalValue && (
                        <div className="text-sm text-gray-400 line-through">
                          {coupon.originalValue}
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(coupon.id);
                      }}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Heart
                        className={`w-4 h-4 ₹{
                          favorites.includes(coupon.id)
                            ? "fill-red-400 text-red-400"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {coupon.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Expires in {coupon.expiry}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-300">{coupon.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
                        {coupon.trader
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm text-gray-300">
                        {coupon.trader}
                      </span>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      {coupon.trades} trades
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/trade/₹{coupon.id}`} className="flex-1">
                    <Button className="w-full bg-white text-black hover:bg-gray-100 font-semibold">
                      Trade Now
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          {/* <div className="text-center">
            <Button
              variant="outline"
              className="glass-strong border-white/20 text-white hover:bg-white/10 px-8 py-3 bg-transparent"
            >
              Load More Coupons
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
