"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Set auth state in localStorage for demo
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", "demouser")
    localStorage.setItem("userName", "demouser")

    setIsLoading(false)
    router.push("/ranking")
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Set auth state in localStorage for demo
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", "demouser")
    localStorage.setItem("userName", "demouser")

    setIsLoading(false)
    router.push("/ranking")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      <div className="max-w-md mx-auto px-4 py-8 sm:py-16">
        <div className="mb-4 sm:mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm sm:text-base">
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-lg sm:text-xl">Welcome to ResumeXpert</CardTitle>
            <CardDescription className="text-sm">Sign in with your username and password</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="text-sm">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-sm">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username" className="text-sm">
                      Username
                    </Label>
                    <Input id="username" type="text" placeholder="Enter your username" required className="text-sm" />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="text-sm"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-username" className="text-sm">
                      Username
                    </Label>
                    <Input
                      id="signup-username"
                      type="text"
                      placeholder="Choose a username"
                      required
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password" className="text-sm">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      required
                      className="text-sm"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
