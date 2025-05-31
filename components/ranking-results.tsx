"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Trash2, Trophy, Medal, Award } from "lucide-react"
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

interface RankingResult {
  id: string
  candidateName: string
  score: number
  summary: string
  filename: string
  createdDate: string
}

interface RankingResultsProps {
  jobId: string
}

export function RankingResults({ jobId }: RankingResultsProps) {
  const [rankings, setRankings] = useState<RankingResult[]>([])

  useEffect(() => {
    // Load rankings from localStorage
    const savedRankings = JSON.parse(localStorage.getItem(`rankings_${jobId}`) || "[]")
    setRankings(savedRankings)
  }, [jobId])

  const handleDeleteRanking = (rankingId: string, candidateName: string) => {
    const updatedRankings = rankings.filter((ranking) => ranking.id !== rankingId)
    setRankings(updatedRankings)
    localStorage.setItem(`rankings_${jobId}`, JSON.stringify(updatedRankings))

    // Update job's total resumes count
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]")
    const updatedJobs = jobs.map((job: any) =>
      job.id === jobId ? { ...job, totalResumes: updatedRankings.length } : job,
    )
    localStorage.setItem("jobs", JSON.stringify(updatedJobs))
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-blue-100 text-blue-800"
    if (score >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  if (rankings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rankings yet</h3>
            <p className="text-gray-600">Upload resumes to see ranking results</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Ranking Results</CardTitle>
        <CardDescription className="text-sm">
          {rankings.length} candidate{rankings.length !== 1 ? "s" : ""} ranked by AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rankings.map((ranking, index) => (
            <div
              key={ranking.id}
              className={`p-4 border rounded-lg ${
                index === 0
                  ? "border-yellow-200 bg-yellow-50"
                  : index === 1
                    ? "border-gray-200 bg-gray-50"
                    : index === 2
                      ? "border-amber-200 bg-amber-50"
                      : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1">{getRankIcon(index)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="font-semibold text-lg truncate">{ranking.candidateName}</h3>
                      <Badge className={getScoreColor(ranking.score)}>Score: {ranking.score}%</Badge>
                    </div>

                    <p className="text-gray-600 mb-3 text-sm sm:text-base">{ranking.summary}</p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FileText className="mr-1 h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{ranking.filename}</span>
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3 flex-shrink-0" />
                        {new Date(ranking.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Resume Ranking</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete the ranking for "{ranking.candidateName}"? This action cannot be
                        undone and will remove this candidate from the ranking list.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteRanking(ranking.id, ranking.candidateName)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Ranking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
