"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { Upload, Camera, Scan, CheckCircle, AlertTriangle, DollarSign, Calendar, Tag, ImageIcon } from "lucide-react"

const platforms = [
  "Amazon",
  "Puma",
  "Starbucks",
  "Netflix",
  "Uber Eats",
  "Spotify",
  "Apple Store",
  "Google Play",
  "Target",
  "Walmart",
  "Best Buy",
  "Other",
]

const categories = ["Shopping", "Food & Drink", "Entertainment", "Travel", "Services", "Gaming", "Other"]

export default function PostCoupon() {
  const [step, setStep] = useState(1)
  const [couponData, setCouponData] = useState({
    platform: "",
    category: "",
    value: "",
    code: "",
    expiry: "",
    description: "",
    image: null as File | null,
  })
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    status: "success" | "warning" | "error" | null
    message: string
  }>({ status: null, message: "" })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setStep(2)
      setCouponData((prev) => ({ ...prev, image: file }))
      // Simulate OCR processing
      setIsVerifying(true)
      setTimeout(() => {
        setIsVerifying(false)
        setVerificationResult({
          status: "success",
          message: "Coupon verified! Details extracted successfully.",
        })
        // Simulate extracted data
        setCouponData((prev) => ({
          ...prev,
          platform: "Puma",
          value: "50%",
          code: "AIA4EWAGUT",
          expiry: "2025-06-29",
        }))
      }, 2000)
    }
  }

  const handleSubmit = async() => {
    // Simulate coupon submission
    try{
      const uid= localStorage.getItem("uid")
      const res = await fetch("http://localhost:5000/api/coupons/upload-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform:couponData.platform,
          value:couponData.value,
          expiry_date:couponData.expiry,
          category:couponData.category,
          description:couponData.description,
          uid:uid
        }),
      });
      const data = await res.json();
      if (data){
        setStep(4)
      }
    }catch(e: any) {
      console.log("Error", e)
    }
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navigation />

      <div className="pt-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">Post a Coupon</h1>
            <p className="text-xl text-gray-300">Share your unused coupons and start trading</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center">
            <div className="glass-strong rounded-full p-2">
              <div className="flex items-center space-x-4">
                {[
                  { step: 1, label: "Upload", icon: Upload },
                  { step: 2, label: "Verify", icon: Scan },
                  { step: 3, label: "Details", icon: Tag },
                  { step: 4, label: "Complete", icon: CheckCircle },
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center">
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ₹{
                        step >= item.step ? "bg-white text-black" : "text-gray-400"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="hidden md:inline text-sm font-medium">{item.label}</span>
                    </div>
                    {index < 3 && <div className={`w-8 h-0.5 mx-2 ₹{step > item.step ? "bg-white" : "bg-gray-600"}`} />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 1: Upload */}
          {step === 1 && (
            <Card className="glass-strong p-8 max-w-2xl mx-auto fade-in">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Upload Your Coupon</h2>
                <p className="text-gray-400">
                  Take a photo or upload an image of your coupon for automatic verification
                </p>

                <div className="flex justify-center">
                  <label className="glass p-6 rounded-lg cursor-pointer hover:bg-white/10 transition-all group">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <div className="text-center space-y-3">
                      <ImageIcon className="w-8 h-8 mx-auto text-gray-400 group-hover:text-white transition-colors" />
                      <div className="text-white font-medium">Upload Image</div>
                      <div className="text-sm text-gray-400">JPG, PNG, or HEIC</div>
                    </div>
                  </label>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => setStep(3)}
                    variant="outline"
                    className="glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Skip & Enter Manually
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Verification */}
          {step === 2 && (
            <Card className="glass-strong p-8 max-w-2xl mx-auto fade-in">
              <div className="text-center space-y-6">
                {isVerifying ? (
                  <>
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                      <Scan className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Verifying Coupon...</h2>
                    <p className="text-gray-400">Our AI is analyzing your coupon image</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse"
                        style={{ width: "60%" }}
                      />
                    </div>
                  </>
                ) : verificationResult.status ? (
                  <>
                    <div
                      className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ₹{
                        verificationResult.status === "success"
                          ? "bg-gradient-to-r from-green-500 to-green-600"
                          : verificationResult.status === "warning"
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                            : "bg-gradient-to-r from-red-500 to-red-600"
                      }`}
                    >
                      {verificationResult.status === "success" && <CheckCircle className="w-10 h-10 text-white" />}
                      {verificationResult.status === "warning" && <AlertTriangle className="w-10 h-10 text-white" />}
                      {verificationResult.status === "error" && <AlertTriangle className="w-10 h-10 text-white" />}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {verificationResult.status === "success"
                        ? "Verification Complete!"
                        : verificationResult.status === "warning"
                          ? "Verification Warning"
                          : "Verification Failed"}
                    </h2>
                    <p
                      className={`₹{
                        verificationResult.status === "success"
                          ? "text-green-400"
                          : verificationResult.status === "warning"
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {verificationResult.message}
                    </p>

                    {verificationResult.status === "success" && (
                      <div className="glass p-4 text-left space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Platform:</span>
                          <span className="text-white font-medium">{couponData.platform}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Value:</span>
                          <span className="text-white font-medium">₹{couponData.value}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Code:</span>
                          <span className="text-white font-mono">{couponData.code}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Expires:</span>
                          <span className="text-white">{couponData.expiry}</span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => setStep(3)}
                      className="bg-white text-black hover:bg-gray-100 font-semibold px-8"
                    >
                      Continue to Details
                    </Button>
                  </>
                ) : null}
              </div>
            </Card>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <Card className="glass-strong p-8 max-w-2xl mx-auto fade-in">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">Coupon Details</h2>
                  <p className="text-gray-400">Review and complete the coupon information</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Platform</label>
                    <select
                      value={couponData.platform}
                      onChange={(e) => setCouponData((prev) => ({ ...prev, platform: e.target.value }))}
                      className="w-full glass border-white/20 rounded-lg px-3 py-2 text-white bg-transparent"
                    >
                      <option value="" className="bg-gray-800">
                        Select Platform
                      </option>
                      {platforms.map((platform) => (
                        <option key={platform} value={platform} className="bg-gray-800">
                          {platform}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                    <select
                      value={couponData.category}
                      onChange={(e) => setCouponData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full glass border-white/20 rounded-lg px-3 py-2 text-white bg-transparent"
                    >
                      <option value="" className="bg-gray-800">
                        Select Category
                      </option>
                      {categories.map((category) => (
                        <option key={category} value={category} className="bg-gray-800">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Value (₹)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="number"
                        value={couponData.value}
                        onChange={(e) => setCouponData((prev) => ({ ...prev, value: e.target.value }))}
                        className="glass border-white/20 text-white pl-10"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="date"
                        value={couponData.expiry}
                        onChange={(e) => setCouponData((prev) => ({ ...prev, expiry: e.target.value }))}
                        className="glass border-white/20 text-white pl-10"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Coupon Code</label>
                    <Input
                      value={couponData.code}
                      onChange={(e) => setCouponData((prev) => ({ ...prev, code: e.target.value }))}
                      className="glass border-white/20 text-white font-mono"
                      placeholder="Enter coupon code"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Prefered Coupon</label>
                    <textarea
                      value={couponData.description}
                      onChange={(e) => setCouponData((prev) => ({ ...prev, description: e.target.value }))}
                      className="w-full glass border-white/20 rounded-lg px-3 py-2 text-white bg-transparent resize-none"
                      rows={3}
                      placeholder="Add any additional details about your coupon..."
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex-1 glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-white text-black hover:bg-gray-100 font-semibold"
                    disabled={!couponData.platform || !couponData.value || !couponData.code}
                  >
                    Post Coupon
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Step 4: Complete */}
          {step === 4 && (
            <Card className="glass-strong p-8 max-w-2xl mx-auto fade-in text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Coupon Posted Successfully!</h2>
                <p className="text-gray-400">Your coupon is now live and available for trading</p>

                <div className="glass p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Platform:</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{couponData.platform}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Value:</span>
                    <span className="text-white font-bold text-xl">₹{couponData.value}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => (window.location.href = "/marketplace")}
                    variant="outline"
                    className="flex-1 glass border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Browse Marketplace
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/wallet")}
                    className="flex-1 bg-white text-black hover:bg-gray-100 font-semibold"
                  >
                    View in Wallet
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
