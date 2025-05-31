"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, CheckCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ResumeFile {
  id: string
  file: File
  status: "pending" | "uploaded" | "processing" | "completed"
}

interface ResumeUploadProps {
  jobId: string
  onComplete: () => void
  onCancel: () => void
}

export function ResumeUpload({ jobId, onComplete, onCancel }: ResumeUploadProps) {
  const [resumes, setResumes] = useState<ResumeFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const pdfFiles = files.filter((file) => file.type === "application/pdf")

    const newResumes = pdfFiles.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      file,
      status: "pending" as const,
    }))

    setResumes((prev) => [...prev, ...newResumes])
  }

  const removeResume = (id: string, filename: string) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id))
  }

  const handleProcessResumes = async () => {
    if (resumes.length === 0) return

    setIsProcessing(true)

    // Simulate processing each resume
    for (let i = 0; i < resumes.length; i++) {
      setResumes((prev) => prev.map((resume, index) => (index === i ? { ...resume, status: "processing" } : resume)))

      await new Promise((resolve) => setTimeout(resolve, 1500))

      setResumes((prev) => prev.map((resume, index) => (index === i ? { ...resume, status: "completed" } : resume)))
    }

    // Generate ranking results with AI-detected candidate names
    const candidateNames = [
      "John Smith",
      "Sarah Johnson",
      "Michael Chen",
      "Emily Davis",
      "David Wilson",
      "Jessica Brown",
      "Robert Taylor",
      "Amanda Garcia",
      "Christopher Lee",
      "Maria Rodriguez",
    ]

    const rankings = resumes.map((resume, index) => ({
      id: resume.id,
      candidateName: candidateNames[index % candidateNames.length] || `Candidate ${index + 1}`,
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      summary: `Strong candidate with relevant experience. ${Math.random() > 0.5 ? "Excellent technical skills and proven track record." : "Good cultural fit with leadership potential."}`,
      filename: resume.file.name,
      createdDate: new Date().toISOString(),
    }))

    // Sort by score (highest first)
    rankings.sort((a, b) => b.score - a.score)

    // Save rankings to localStorage
    localStorage.setItem(`rankings_${jobId}`, JSON.stringify(rankings))

    setIsProcessing(false)
    onComplete()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Upload Resumes</CardTitle>
          <CardDescription className="text-sm">
            Upload multiple PDF resumes to rank against this job position
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload-multiple"
              disabled={isProcessing}
            />
            <label htmlFor="resume-upload-multiple" className="cursor-pointer">
              <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
              <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop multiple resumes</p>
              <p className="text-xs text-gray-500">PDF files only</p>
            </label>
          </div>
        </CardContent>
      </Card>

      {resumes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Uploaded Resumes ({resumes.length})</CardTitle>
            <CardDescription className="text-sm">
              AI will automatically detect candidate names from resumes during processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {resumes.map((resume) => (
                <div key={resume.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {resume.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : resume.status === "processing" ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    ) : (
                      <FileText className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">{resume.file.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{(resume.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    {resume.status === "processing" && (
                      <p className="text-xs text-blue-600 mt-1">Analyzing resume and extracting candidate name...</p>
                    )}
                    {resume.status === "completed" && (
                      <p className="text-xs text-green-600 mt-1">✓ Analysis complete</p>
                    )}
                  </div>

                  {!isProcessing && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <X className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Resume</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove "{resume.file.name}" from the upload list? This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeResume(resume.id, resume.file.name)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Remove Resume
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}
            </div>

            {isProcessing && (
              <div className="mt-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    AI is processing resumes and extracting candidate information...
                  </p>
                </div>
                <Progress value={75} className="w-full" />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <Button onClick={onCancel} variant="outline" disabled={isProcessing} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button
                onClick={handleProcessResumes}
                disabled={resumes.length === 0 || isProcessing}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:flex-1"
              >
                {isProcessing
                  ? "Processing..."
                  : `Rank ${resumes.length} Resume${resumes.length !== 1 ? "s" : ""} with AI`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
