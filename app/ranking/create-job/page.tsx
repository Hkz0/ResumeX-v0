"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ScrollAnimation } from "@/components/scroll-animation"
import { createJob } from "@/app/api"

export default function CreateJobPage() {
  const router = useRouter()
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobTitle.trim() || !jobDescription.trim()) return

    setIsCreating(true)
    try {
      await createJob(jobTitle.trim(), jobDescription.trim())
      router.push("/ranking")
    } catch (err) {
      // Optionally show error notification
      alert("Failed to create job. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <Navigation currentPage="ranking" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ScrollAnimation direction="up">
          <div className="mb-6">
            <Link href="/ranking" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ranking
            </Link>
          </div>
        </ScrollAnimation>

        <div className="max-w-2xl mx-auto">
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Job Position</h1>
              <p className="text-gray-600">Create a new job position to rank resumes against</p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={0.4}>
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Enter the job title and description for resume ranking</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateJob} className="space-y-6">
                  <div>
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input
                      id="job-title"
                      type="text"
                      placeholder="e.g., Senior Full Stack Developer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="job-description">Job Description</Label>
                    <Textarea
                      id="job-description"
                      placeholder="Paste the complete job description here..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="mt-2 min-h-[300px]"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">{jobDescription.length} characters</p>
                  </div>

                  <div className="flex gap-4">
                    <Link href="/ranking" className="flex-1">
                      <Button type="button" variant="outline" className="w-full">
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      disabled={!jobTitle.trim() || !jobDescription.trim() || isCreating}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {isCreating ? "Creating..." : "Create Job Position"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}
