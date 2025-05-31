import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, TrendingUp, Lightbulb } from "lucide-react"

export function AnalysisResults({ result }: { result: any }) {
  const matchScore = result?.match_score ?? 0
  const missingKeywords = Array.isArray(result?.missing_keywords) && result.missing_keywords[0] !== "None" ? result.missing_keywords : []
  const keywordsToAdd = Array.isArray(result?.extra_keywords_to_add) && result.extra_keywords_to_add[0] !== "None" ? result.extra_keywords_to_add : []
  const improvements = Array.isArray(result?.suggested_improvements)
    ? (typeof result.suggested_improvements[0] === "object"
        ? result.suggested_improvements.map((imp: any) => `${imp.issue}: ${imp.suggestion}`)
        : (result.suggested_improvements[0] === "No issues found" ? [] : result.suggested_improvements))
    : []
  const bestMatch = result?.career_recommendations?.best_match
  const otherCareers = Array.isArray(result?.career_recommendations?.other_careers)
    ? result.career_recommendations.other_careers
    : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Match Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            Match Score
          </CardTitle>
          <CardDescription className="text-sm">How well your resume matches the job description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{matchScore}%</div>
            <Progress value={matchScore} className="w-full mb-4" />
            <p className="text-xs sm:text-sm text-gray-600">
              {matchScore >= 80
                ? "Excellent match!"
                : matchScore >= 60
                  ? "Good match with room for improvement"
                  : "Needs significant improvement"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Missing Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <XCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
            Missing Keywords
          </CardTitle>
          <CardDescription className="text-sm">Important keywords not found in your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword: string, index: number) => (
              <Badge key={index} variant="destructive" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Keywords to Add */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            Keywords to Add
          </CardTitle>
          <CardDescription className="text-sm">Recommended keywords to strengthen your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {keywordsToAdd.map((keyword: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Improvements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <Lightbulb className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
            Suggested Improvements
          </CardTitle>
          <CardDescription className="text-sm">AI-powered recommendations to enhance your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {improvements.map((improvement: string, index: number) => (
              <li key={index} className="text-xs sm:text-sm text-gray-700 flex items-start">
                <span className="text-yellow-600 mr-2 flex-shrink-0">•</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Career Recommendations */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Career Recommendations</CardTitle>
          <CardDescription className="text-sm">
            Suggested career paths based on your skills and experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {bestMatch && (
              <div className="p-3 sm:p-4 bg-green-50 rounded-lg text-center col-span-1 lg:col-span-2">
                <p className="font-medium text-green-800 text-sm sm:text-base">{bestMatch.title}</p>
                <p className="text-xs text-green-700 mt-1">{bestMatch.reason}</p>
              </div>
            )}
            {otherCareers.map((career: any, index: number) => (
              <div key={index} className="p-3 sm:p-4 bg-blue-50 rounded-lg text-center">
                <p className="font-medium text-blue-800 text-sm sm:text-base">{career.title}</p>
                <p className="text-xs text-blue-700 mt-1">{career.reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
