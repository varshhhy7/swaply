"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { Edit, Star, Trophy, Shield, TrendingUp, Settings, Bell, Lock, CreditCard, Users, Award } from "lucide-react"

const achievements = [
  { id: 1, name: "First Trade", description: "Complete your first successful trade", earned: true, icon: Trophy },
  { id: 2, name: "Verified Trader", description: "Verify your identity and phone number", earned: true, icon: Shield },
  { id: 3, name: "Top Trader", description: "Complete 50+ successful trades", earned: true, icon: Star },
  { id: 4, name: "Community Helper", description: "Help 10+ new traders", earned: false, icon: Users },
  { id: 5, name: "Value Master", description: "Trade over ₹1000 in value", earned: true, icon: TrendingUp },
  { id: 6, name: "Speed Trader", description: "Complete 5 trades in one day", earned: false, icon: Award },
]

const recentActivity = [
  { id: 1, action: "Completed trade with Alex Chen", time: "2 hours ago", type: "trade" },
  { id: 2, action: "Added new Amazon ₹75 coupon", time: "1 day ago", type: "coupon" },
  { id: 3, action: 'Earned "Top Trader" achievement', time: "3 days ago", type: "achievement" },
  { id: 4, action: "Updated profile preferences", time: "1 week ago", type: "profile" },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 pb-20 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="glass-strong p-8 fade-in">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white text-4xl font-bold">
                  AR
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Amrutha Rokkam</h1>
                    <p className="text-gray-400 mb-4">Premium Trader • Member since Jan 2024</p>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="glass border-white/20 text-white hover:bg-white/10"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">4.9</div>
                    <div className="text-sm text-gray-400 flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      Rating
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">47</div>
                    <div className="text-sm text-gray-400">Trades</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">₹2,340</div>
                    <div className="text-sm text-gray-400">Value Traded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-sm text-gray-400">Success Rate</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                    <Trophy className="w-3 h-3 mr-1" />
                    Top Trader
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="glass-strong rounded-full p-2">
              <div className="flex space-x-2">
                {[
                  { id: "profile", label: "Profile", icon: Edit },
                  { id: "achievements", label: "Achievements", icon: Trophy },
                  { id: "activity", label: "Activity", icon: TrendingUp },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 ₹{
                      activeTab === tab.id ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/10"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{tab.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-strong p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <Input defaultValue="Amrutha Rokkam" disabled={!isEditing} className="glass border-white/20 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <Input
                      defaultValue="amrutharokkam573@gmail.com"
                      disabled={!isEditing}
                      className="glass border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <Input
                      defaultValue="+91 1234567892"
                      disabled={!isEditing}
                      className="glass border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <Input
                      defaultValue="Vizag, India"
                      disabled={!isEditing}
                      className="glass border-white/20 text-white"
                    />
                  </div>
                </div>
              </Card>

              <Card className="glass-strong p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Trading Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {["Shopping", "Food & Drink", "Entertainment", "Travel"].map((category) => (
                        <Badge
                          key={category}
                          className="bg-blue-500/20 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-500/30"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Trade Value</label>
                    <select
                      className="w-full glass border-white/20 rounded-lg px-3 py-2 text-white bg-transparent"
                      defaultValue="25"
                    >
                      <option value="5" className="bg-gray-800">
                        ₹5
                      </option>
                      <option value="10" className="bg-gray-800">
                        ₹10
                      </option>
                      <option value="25" className="bg-gray-800">
                        ₹25
                      </option>
                      <option value="50" className="bg-gray-800">
                        ₹50
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Auto-Accept Threshold</label>
                    <select
                      className="w-full glass border-white/20 rounded-lg px-3 py-2 text-white bg-transparent"
                      defaultValue="95"
                    >
                      <option value="90" className="bg-gray-800">
                        90% match
                      </option>
                      <option value="95" className="bg-gray-800">
                        95% match
                      </option>
                      <option value="100" className="bg-gray-800">
                        100% match only
                      </option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Your Achievements</h2>
                <p className="text-gray-400">Unlock badges by completing trades and helping the community</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon
                  return (
                    <Card
                      key={achievement.id}
                      className={`glass-strong p-6 text-center floating-animation ₹{
                        achievement.earned ? "glow" : "opacity-50"
                      }`}
                      style={{ animationDelay: `₹{index * 0.1}s` }}
                    >
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ₹{
                          achievement.earned ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : "bg-gray-600"
                        }`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{achievement.name}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{achievement.description}</p>
                      {achievement.earned && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-3">Earned</Badge>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
                <Button variant="outline" className="glass border-white/20 text-white hover:bg-white/10 bg-transparent">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <Card
                    key={activity.id}
                    className="glass-strong p-4 floating-animation"
                    style={{ animationDelay: `₹{index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ₹{
                          activity.type === "trade"
                            ? "bg-green-500/20"
                            : activity.type === "coupon"
                              ? "bg-blue-500/20"
                              : activity.type === "achievement"
                                ? "bg-yellow-500/20"
                                : "bg-purple-500/20"
                        }`}
                      >
                        {activity.type === "trade" && <TrendingUp className="w-5 h-5 text-green-400" />}
                        {activity.type === "coupon" && <CreditCard className="w-5 h-5 text-blue-400" />}
                        {activity.type === "achievement" && <Trophy className="w-5 h-5 text-yellow-400" />}
                        {activity.type === "profile" && <Edit className="w-5 h-5 text-purple-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass-strong p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "New trade matches", enabled: true },
                    { label: "Trade proposals", enabled: true },
                    { label: "Chat messages", enabled: true },
                    { label: "Coupon expiry alerts", enabled: true },
                    { label: "Marketing emails", enabled: false },
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-300">{setting.label}</span>
                      <div
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ₹{
                          setting.enabled ? "bg-blue-600" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform ₹{
                            setting.enabled ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-strong p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Privacy & Security
                </h3>
                <div className="space-y-4">
                  <Button className="w-full justify-start glass border-white/20 text-white hover:bg-white/10">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button className="w-full justify-start glass border-white/20 text-white hover:bg-white/10">
                    <Shield className="w-4 h-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                  <Button className="w-full justify-start glass border-white/20 text-white hover:bg-white/10">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button className="w-full justify-start glass border-white/20 text-white hover:bg-white/10">
                    <Users className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
