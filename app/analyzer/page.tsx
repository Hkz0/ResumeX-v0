"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, ArrowLeft } from "lucide-react"
import { AnalysisResults } from "@/components/analysis-results"
import { JobListings } from "@/components/job-listings"
import { Navigation } from "@/components/navigation"
import { uploadResume, analyze, jobMatching } from "@/app/api"

export default function AnalyzerPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [jobListings, setJobListings] = useState<any[]>([])
  const [jobListingsTitle, setJobListingsTitle] = useState<string>("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setResumeFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) return

    setIsAnalyzing(true)
    try {
      // 1. Upload resume and get text
      const uploadRes = await uploadResume(resumeFile, jobDescription)
      // Expecting: { job_desc_text, resume_text }
      const { job_desc_text, resume_text } = uploadRes.data
      // 2. Analyze
      const analysisRes = await analyze(resume_text, job_desc_text)
      setAnalysisResult(analysisRes.data)
      // 3. Job matching using best match job title
      const bestMatchTitle = analysisRes.data?.career_recommendations?.best_match?.title
      let jobs: any[] = []
      if (bestMatchTitle) {
        setJobListingsTitle(bestMatchTitle)
        const jobMatchRes = await jobMatching(bestMatchTitle, "")
        jobs = Array.isArray(jobMatchRes.data) ? jobMatchRes.data : []
      } else {
        setJobListingsTitle("")
      }
      setJobListings(jobs)
      setShowResults(true)
    } catch (error) {
      alert("Failed to analyze resume. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation currentPage="analyzer" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm sm:text-base">
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Back to Home
          </Link>
        </div>

        {!showResults ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Resume Analyzer</h1>
              <p className="text-gray-600 text-sm sm:text-base px-4">
                Upload your resume and paste the job description to get AI-powered analysis
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Resume Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Upload Resume</CardTitle>
                  <CardDescription className="text-sm">Upload your resume in PDF format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
                      <p className="text-sm text-gray-600 mb-2 px-2">
                        {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500">PDF files only</p>
                    </label>
                  </div>
                  {resumeFile && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800 flex items-center">
                        <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{resumeFile.name} uploaded successfully</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Job Description</CardTitle>
                  <CardDescription className="text-sm">
                    Paste the job description you want to match against
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the complete job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="mt-2 min-h-[150px] sm:min-h-[200px] text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">{jobDescription.length} characters</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-6 sm:mt-8 px-4">
              <Button
                onClick={handleAnalyze}
                disabled={!resumeFile || !jobDescription.trim() || isAnalyzing}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  "Analyze Resume"
                )}
              </Button>
            </div>

            {isAnalyzing && (
              <Card className="mt-6 sm:mt-8">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">AI is analyzing your resume...</p>
                    <Progress value={66} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analysis Results</h1>
              <Button onClick={() => setShowResults(false)} variant="outline" className="w-full sm:w-auto">
                New Analysis
              </Button>
            </div>

            <AnalysisResults result={analysisResult} />
            <JobListings jobs={jobListings} jobTitle={jobListingsTitle} />
          </div>
        )}
      </div>
    </div>
  )
}
