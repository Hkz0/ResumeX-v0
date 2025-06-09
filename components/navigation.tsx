"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, User, LogOut, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { checkSession, logout as apiLogout } from "@/app/api"
import { MessageNotification } from "@/components/notification"

interface NavigationProps {
  currentPage?: "home" | "analyzer" | "ranking"
}

export function Navigation({ currentPage }: NavigationProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [logoutMsg, setLogoutMsg] = useState(false)
  const [loginMsg, setLoginMsg] = useState(false)

  useEffect(() => {
    // Show login success message if redirected from login
    if (typeof window !== 'undefined' && sessionStorage.getItem('loginSuccess')) {
      setLoginMsg(true)
      sessionStorage.removeItem('loginSuccess')
      setTimeout(() => setLoginMsg(false), 4000)
    }
    // Check authentication status from backend
    checkSession()
      .then((res) => {
        if (res?.data?.username) {
          setIsAuthenticated(true)
          setUsername(res.data.username)
        } else {
          setIsAuthenticated(false)
          setUsername("")
        }
      })
      .catch(() => {
        setIsAuthenticated(false)
        setUsername("")
      })
  }, [])

  const handleLogout = () => {
    apiLogout()
      .finally(() => {
        setIsAuthenticated(false)
        setUsername("")
        setIsOpen(false)
        router.push("/")
        setLogoutMsg(true)
        setTimeout(() => setLogoutMsg(false), 4000)
      })
  }

  const closeSheet = () => setIsOpen(false)

  return (
    <>
      <nav className="bg-white shadow-sm border-b relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img src="/ResumeXpert.png" alt="ResumeXpert Logo" className="h-10 w-10" style={{ maxHeight: 40 }} />
                <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">ResumeXpert</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/analyzer">
                <Button variant={currentPage === "analyzer" ? "default" : "ghost"}>Analyzer</Button>
              </Link>
              <Link href="/ranking">
                <Button variant={currentPage === "ranking" ? "default" : "ghost"}>Ranking</Button>
              </Link>
              <a
                href="https://forms.gle/3FhDZPmULh6nCVDS6"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                <Button variant="ghost">Feedback</Button>
              </a>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem disabled>
                      <User className="mr-2 h-4 w-4" />
                      {username}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/login?tab=signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Link href="/analyzer" onClick={closeSheet}>
                      <Button variant={currentPage === "analyzer" ? "default" : "ghost"} className="w-full justify-start">
                        Analyzer
                      </Button>
                    </Link>
                    <Link href="/ranking" onClick={closeSheet}>
                      <Button variant={currentPage === "ranking" ? "default" : "ghost"} className="w-full justify-start">
                        Ranking
                      </Button>
                    </Link>
                    <a
                      href="https://forms.gle/3FhDZPmULh6nCVDS6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" className="w-full justify-start">Feedback</Button>
                    </a>

                    <div className="border-t pt-4">
                      {isAuthenticated ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            {username}
                          </div>
                          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Link href="/login" onClick={closeSheet}>
                            <Button variant="ghost" className="w-full justify-start">
                              Login
                            </Button>
                          </Link>
                          <Link href="/login?tab=signup" onClick={closeSheet}>
                            <Button className="w-full">Sign Up</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <MessageNotification message="You have been logged out." type="error" show={logoutMsg} />
      <MessageNotification message="Logged in successfully!" type="success" show={loginMsg} />
    </>
  )
}
