"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Users, FileText } from "lucide-react"
import { ResumeUpload } from "@/components/resume-upload"
import { RankingResults } from "@/components/ranking-results"
import { Navigation } from "@/components/navigation"
import { getJobs } from "@/app/api"

interface Job {
  id: string
  title: string
  description: string
  createdDate: string
  totalResumes: number
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [showUpload, setShowUpload] = useState(false)
  const [showResults, setShowResults] = useState(true)

  useEffect(() => {
    getJobs()
      .then((res) => {
        const jobs = Array.isArray(res.data?.jobs)
          ? res.data.jobs.map((job: any) => ({
              id: job.id,
              title: job.title,
              description: job.description,
              createdDate: job.created_at,
              totalResumes: job.rankings_count || 0,
            }))
          : [];
        const currentJob = jobs.find((j: Job) => String(j.id) === String(params.id))
        if (currentJob) {
          setJob(currentJob)
        } else {
          router.push("/ranking")
        }
      })
      .catch(() => router.push("/ranking"))
  }, [params.id, router])

  const handleUploadComplete = () => {
    setShowUpload(false)
    setShowResults(true)
    // Optionally, refetch job details or rankings from backend here
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation currentPage="ranking" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <Link
            href="/ranking"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm sm:text-base"
          >
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Back to Jobs
          </Link>
        </div>

        {/* Job Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">Job ID: {job.id}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mb-6">
            <span>Created: {new Date(job.createdDate).toLocaleDateString()}</span>
            <span className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              {job.totalResumes} resumes ranked
            </span>
          </div>
        </div>

        {/* Job Description Card */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <FileText className="mr-2 h-5 w-5 text-blue-600" />
              Job Description
            </CardTitle>
            <CardDescription className="text-sm">
              Complete job description used for resume ranking analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <pre className="whitespace-pre-wrap text-sm sm:text-base text-gray-700 font-sans leading-relaxed">
                {job.description}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Upload/Results Section */}
        {showUpload ? (
          <ResumeUpload jobId={job.id} onComplete={handleUploadComplete} onCancel={() => setShowUpload(false)} />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Ranking Results</h2>
              <Button onClick={() => setShowUpload(true)} variant="outline" className="w-full sm:w-auto">
                <Upload className="mr-2 h-4 w-4" />
                Upload Resumes
              </Button>
            </div>
            <RankingResults jobId={job.id} />
          </div>
        )}
      </div>
    </div>
  )
}
