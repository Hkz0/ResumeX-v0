"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { ScrollAnimation } from "@/components/scroll-animation";
import { login, register } from "@/app/api";
import { MessageNotification } from "@/components/notification";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get("tab") === "signup" ? "signup" : "login";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target as HTMLFormElement;
    let username = (form.username as HTMLInputElement).value;
    let password = (form.password as HTMLInputElement).value;
    username = username.trim().normalize('NFC');
    password = password.trim().normalize('NFC');
    const allowedPattern = /^[a-zA-Z0-9_.@#%-]+$/;
    if (username.length < 5) {
      setError("Username must be at least 5 characters.");
      setIsLoading(false);
      return;
    }
    if (!allowedPattern.test(username)) {
      setError("Username contains invalid characters. Only letters, numbers, underscore, dash, dot, and @#% are allowed.");
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }
    if (!allowedPattern.test(password)) {
      setError("Password contains invalid characters. Only letters, numbers, underscore, dash, dot, and @#% are allowed.");
      setIsLoading(false);
      return;
    }
    try {
      const res = await login(username, password);
      console.log('Login response:', res);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('loginSuccess', '1');
      }
      router.push("/");
    } catch (err: any) {
      console.error('Login error:', err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target as HTMLFormElement;
    let username = (form["signup-username"] as HTMLInputElement).value;
    let password = (form["signup-password"] as HTMLInputElement).value;
    username = username.trim().normalize('NFC');
    password = password.trim().normalize('NFC');
    const allowedPattern = /^[a-zA-Z0-9_.@#%-]+$/;
    if (username.length < 5) {
      setError("Username must be at least 5 characters.");
      setIsLoading(false);
      return;
    }
    if (!allowedPattern.test(username)) {
      setError("Username contains invalid characters. Only letters, numbers, underscore, dash, dot, and @#% are allowed.");
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }
    if (!allowedPattern.test(password)) {
      setError("Password contains invalid characters. Only letters, numbers, underscore, dash, dot, and @#% are allowed.");
      setIsLoading(false);
      return;
    }
    try {
      await register(username, password);
      setSignupSuccess(false);
      setAccountCreated(true);
      setActiveTab("login");
    } catch (err: any) {
      setError("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      <div className="max-w-md mx-auto px-4 py-8 sm:py-16">
        <ScrollAnimation direction="up">
          <div className="mb-4 sm:mb-6">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm sm:text-base">
              <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Back to Home
            </Link>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={0.2}>
          <Card>
            <CardHeader className="text-center">
              <img
                src="/favicon.png"
                alt="ResumeXpert Logo"
                className="mx-auto mb-2 w-32 h-32"
              />
              <CardTitle className="text-lg sm:text-xl">Welcome to ResumeXpert</CardTitle>
              <CardDescription className="text-sm">Sign in with your username and password</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={initialTab} className="w-full" value={activeTab} onValueChange={(tab) => {
                setActiveTab(tab);
                if (tab === "signup") {
                  setAccountCreated(false);
                  setSignupSuccess(false);
                }
              }}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" className="text-sm">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-sm">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <MessageNotification message="Account created! Please log in." type="success" show={activeTab === "login" && accountCreated} />
                  {error && <div className="text-red-600 text-sm text-center">{error}</div>}
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
                  <MessageNotification message="Account created! Please log in." type="success" show={activeTab === "signup" && signupSuccess} />
                  {error && <div className="text-red-600 text-sm text-center">{error}</div>}
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
                        placeholder="Choose a password"
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
        </ScrollAnimation>
      </div>
    </div>
  );
} 