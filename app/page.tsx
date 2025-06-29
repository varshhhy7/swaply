"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/animated-background"
import Link from "next/link"
import { ArrowRight, Zap, Star, CheckCircle, Gift, MessageSquare, Coins } from "lucide-react"

const features = [
  {
    icon: Gift,
    title: "Post a Coupon",
    description: "Upload your unused coupons with smart OCR validation",
  },
  {
    icon: Zap,
    title: "Smart Matchmaking",
    description: "AI-powered matching based on preferences and value",
  },
  {
    icon: MessageSquare,
    title: "Negotiation Chat",
    description: "Real-time chat with built-in fairness calculator",
  },
  {
    icon: Coins,
    title: "Token System",
    description: "Balance trades with our secure token economy",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Verified Trader",
    content: "Traded ₹500+ worth of coupons. The platform is incredibly smooth!",
    rating: 5,
    trades: 23,
  },
  {
    name: "Mike Rodriguez",
    role: "Top Trader",
    content: "Smart matching saved me hours. Found exactly what I needed.",
    rating: 5,
    trades: 47,
  },
  {
    name: "Emma Thompson",
    role: "Power User",
    content: "Love the negotiation system. Fair trades every time.",
    rating: 5,
    trades: 31,
  },
]

const stats = [
  { label: "Active Traders", value: "12.5K+" },
  { label: "Successful Trades", value: "89.2K+" },
  { label: "Value Exchanged", value: "₹2.1M+" },
  { label: "Satisfaction Rate", value: "98.7%" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 fade-in">
            <Badge className="glass px-4 py-2 text-sm font-medium border-blue-500/30 glow">
              ✨ Now in Beta - Join Early Access
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gradient leading-tight">
              Trade Smarter,
              <br />
              Not Harder
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The premium peer-to-peer platform for exchanging coupons, gift cards, and deals with verified traders
              worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold glow group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="glass-strong border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="glass p-6 text-center floating-animation glow-purple"
                style={{ animationDelay: `₹{index * 0.2}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">How Swaply Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Four simple steps to unlock the value of your unused coupons
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="glass-strong p-8 text-center group hover:glow transition-all duration-300 floating-animation"
                style={{ animationDelay: `₹{index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Coupons Preview */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Trending Trades</h2>
            <p className="text-xl text-gray-300">See what's hot in the marketplace right now</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { platform: "Amazon", value: "₹50", category: "Shopping", expiry: "30 days", verified: true },
              { platform: "Uber Eats", value: "₹25", category: "Food", expiry: "15 days", verified: true },
              { platform: "Netflix", value: "₹15", category: "Entertainment", expiry: "45 days", verified: true },
            ].map((coupon, index) => (
              <Card
                key={index}
                className="glass-strong p-6 group hover:glow-purple transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{coupon.platform[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{coupon.platform}</h3>
                      <p className="text-sm text-gray-400">{coupon.category}</p>
                    </div>
                  </div>
                  {coupon.verified && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">{coupon.value}</div>
                  <div className="text-sm text-gray-400">Expires in {coupon.expiry}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Trusted by Traders</h2>
            <p className="text-xl text-gray-300">Join thousands of satisfied users who trade smarter with Swaply</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="glass-strong p-8 floating-animation"
                style={{ animationDelay: `₹{index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{testimonial.trades} trades</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-strong p-12 glow">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">Ready to Start Trading?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the future of coupon trading. Secure, smart, and profitable.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-12 py-4 text-lg font-semibold glow group"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gradient mb-4">Swaply</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The premium platform for peer-to-peer coupon trading.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Swaply. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
