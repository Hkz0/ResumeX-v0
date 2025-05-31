"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trash2, Eye } from "lucide-react"
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

interface Job {
  id: string
  title: string
  description: string
  createdDate: string
  totalResumes: number
}

export function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    // Load jobs from localStorage
    const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]")
    setJobs(savedJobs)
  }, [])

  const handleDeleteJob = (jobId: string, jobTitle: string) => {
    const updatedJobs = jobs.filter((job) => job.id !== jobId)
    setJobs(updatedJobs)
    localStorage.setItem("jobs", JSON.stringify(updatedJobs))

    // Also remove associated rankings
    localStorage.removeItem(`rankings_${jobId}`)
  }

  if (jobs.length === 0) {
    return (
      <Card className="border-blue-100 shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <div className="text-blue-400 mb-4">
              <Users className="mx-auto h-16 w-16" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job positions yet</h3>
            <p className="text-gray-600 mb-6">Create your first job position to start ranking resumes</p>
            <Link href="/ranking/create-job">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Job Position</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-xl transition-shadow border-blue-100 shadow-lg">
          <CardHeader className="bg-blue-50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg text-blue-800">{job.title}</CardTitle>
                <CardDescription className="mt-1">Job ID: {job.id}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <Users className="mr-1 h-3 w-3" />
                  {job.totalResumes} resumes
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-4 w-4" />
                Created: {new Date(job.createdDate).toLocaleDateString()}
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/ranking/job/${job.id}`}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Job Position</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{job.title}"? This action cannot be undone and will also delete
                        all associated resume rankings ({job.totalResumes} resumes).
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteJob(job.id, job.title)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Job
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
