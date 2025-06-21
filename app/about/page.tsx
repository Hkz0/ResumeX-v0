"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Zap, BarChart3, CheckCircle, FileText, Search, Briefcase, Brain, Shield, Scale } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* About Section */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* Hero Section */}
          <ScrollAnimation direction="up" className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              About ResumeXpert
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Empowering job seekers with AI-driven resume analysis and career insights
            </p>
          </ScrollAnimation>

          {/* Who We Are Section */}
          <div className="mt-12 sm:mt-20">
            <ScrollAnimation direction="up" delay={0.2}>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Who We Are</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    At ResumeXpert, we are a passionate team of technologists and educators committed to empowering job seekers, especially fresh graduates and early - career professionals to take control of their career journeys. Developed at the Centre for Diploma Studies, Universiti Tun Hussein Onn Malaysia, our mission is to bridge the gap between talent and opportunity using cutting edge AI technologies.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          {/* What We Do Section */}
          <div className="mt-12 sm:mt-20">
            <ScrollAnimation direction="up" delay={0.3}>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">What We Do</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    ResumeXpert is an AI-powered platform designed to help users create, evaluate, and optimize their resumes. Our intelligent system analyzes resume content, suggests improvements, and matches candidates with relevant job openings,maximizing their chances of getting noticed by employers.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-6 w-6 text-blue-600 mt-1" />
                      <span className="text-gray-600">Upload and analyze your resume</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Search className="h-6 w-6 text-blue-600 mt-1" />
                      <span className="text-gray-600">Receive AI-generated feedback and keyword suggestions</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BarChart3 className="h-6 w-6 text-blue-600 mt-1" />
                      <span className="text-gray-600">Rank and compare multiple resumes for job applications</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Briefcase className="h-6 w-6 text-blue-600 mt-1" />
                      <span className="text-gray-600">Get matched with suitable jobs from portals like LinkedIn, JobStreet, and Glassdoor</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          {/* Vision & Mission Section */}
          <div className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <ScrollAnimation direction="left" delay={0.4}>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                  To bridge the gap between job seekers and employers by using intelligent systems that optimize resumes, improve job matching, and enhance employment opportunities especially for fresh graduates and the unemployed.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.5}>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                      <span>Provide intelligent, real-time resume feedback using AI and NLP</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                      <span>Improve visibility and compatibility with Applicant Tracking Systems (ATS)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                      <span>Offer meaningful job recommendations based on user profiles</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                      <span>Reduce the gap between job seeker capabilities and employer expectations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-12 sm:mt-20">
            <ScrollAnimation direction="up" delay={0.6}>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-3">
                      <Brain className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">AI-Powered Accuracy</h4>
                        <p className="text-gray-600">Leverages Google Gemini and NLP to provide insightful analysis.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">User-Centric Design</h4>
                        <p className="text-gray-600">Clean, intuitive interface built with React and Next.js.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <BarChart3 className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Data-Driven Matching</h4>
                        <p className="text-gray-600">Recommends job listings tailored to your resume content.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Secure & Scalable</h4>
                        <p className="text-gray-600">Hosted securely on Vercel and Render with PostgreSQL database support.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          {/* Our Story Section */}
          <div className="mt-12 sm:mt-20">
            <ScrollAnimation direction="up" delay={0.7}>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Our Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    ResumeXpert started as a university research project aimed at solving a real-world problem: why do capable graduates get overlooked during the hiring process? Recognizing the gaps in traditional resume tools, we built ResumeXpert as a smart, feedback-driven alternative—with a commitment to usability, accessibility, and innovation.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          {/* Team Section */}
          <div className="mt-12 sm:mt-20">
            <ScrollAnimation direction="up" delay={0.8}>
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Meet the Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Led by Nazmi Syahmi Noor Mohd, Muhammad Haikhal Mohd. Rapi, Ammar Aqasyah Abd. Jalil, and our supervisor, Ts. Inv. Dr. Rafizah Mohd Hanifa, our multidisciplinary team brings together deep knowledge in AI, software engineering, and education to create impactful technology.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  )
}

