"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Store, MessageCircle, Wallet, User, Bell, Menu, X, Gift, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/post-coupon", label: "Post", icon: Plus },
  { href: "/chat", label: "Chat", icon: MessageCircle, badge: 3 },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/promotions", label: "Deals", icon: Gift },
  { href: "/profile", label: "Profile", icon: User },
]

interface IconButtonProps {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: number
  isActive: boolean
}

function IconButton({ href, icon: Icon, label, badge, isActive }: IconButtonProps) {
  return (
    <Link href={href} className="group relative">
      <div
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
          "hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]",
          isActive
            ? "bg-white/20 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)] ring-1 ring-blue-400/50"
            : "text-gray-400 hover:text-white hover:bg-white/10",
        )}
      >
        <Icon className="w-5 h-5" />
        {badge && (
          <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
            {badge}
          </Badge>
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {label}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
      </div>
    </Link>
  )
}

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16">
        <div className="w-full bg-[rgba(10,10,30,0.6)] backdrop-blur-md border-b border-white/10 shadow-md">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-gradient">
              Swaply
            </Link>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <IconButton
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  badge={item.badge}
                  isActive={pathname === item.href}
                />
              ))}
            </div>

            {/* Right Side - Notifications & Profile */}
            <div className="flex items-center space-x-3">
              <Button
                size="sm"
                variant="ghost"
                className="relative text-gray-400 hover:text-white hover:bg-white/10 w-10 h-10 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              <Link href="/profile" className="group relative">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm transition-all duration-200",
                    "hover:scale-105 hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]",
                    pathname === "/profile" && "ring-2 ring-purple-400/50 shadow-[0_0_10px_rgba(147,51,234,0.6)]",
                  )}
                >
                  AR
                </div>

                {/* Profile Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  Profile
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 h-16">
        <div className="w-full bg-[rgba(10,10,30,0.6)] backdrop-blur-md border-b border-white/10 shadow-md">
          <div className="px-4 h-full flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gradient">
              Swaply
            </Link>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white w-10 h-10 rounded-xl hover:bg-white/10"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-[rgba(10,10,30,0.95)] backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                    pathname === item.href
                      ? "bg-white/20 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                      : "text-gray-300 hover:text-white hover:bg-white/10",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-blue-500 text-white text-xs px-2 py-1 ml-auto">{item.badge}</Badge>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-[rgba(10,10,30,0.6)] backdrop-blur-md border-t border-white/10 shadow-md">
          <div className="px-4 py-3">
            <div className="flex items-center justify-around">
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200",
                    pathname === item.href ? "text-white" : "text-gray-400 hover:text-white",
                  )}
                >
                  <div className="relative">
                    <item.icon className="w-5 h-5" />
                    {item.badge && (
                      <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 min-w-[16px] h-[16px] flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content Spacer for Fixed Navigation */}
      <div className="h-16" />
    </>
  )
}
