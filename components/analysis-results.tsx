'use client';

import { motion, Variants, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, TrendingUp, Lightbulb } from "lucide-react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

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

  // Create refs for each section
  const topSectionRef = useRef(null);
  const improvementsRef = useRef(null);
  const careersRef = useRef(null);
  const feedbackRef = useRef(null);

  // Use useInView for each section
  const isTopSectionInView = useInView(topSectionRef, { once: true, margin: "-100px" });
  const isImprovementsInView = useInView(improvementsRef, { once: true, margin: "-100px" });
  const isCareersInView = useInView(careersRef, { once: true, margin: "-100px" });
  const isFeedbackInView = useInView(feedbackRef, { once: true, margin: "-100px" });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 items-stretch">
      {/* Top Section (Match Score, Missing Keywords, Keywords to Add) */}
      <motion.div 
        ref={topSectionRef}
        className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 items-stretch lg:col-span-3"
        variants={containerVariants}
        initial="hidden"
        animate={isTopSectionInView ? "visible" : "hidden"}
      >
        {/* Match Score */}
        <motion.div variants={itemVariants}>
          <Card className="compact-card p-2 h-full">
            <CardHeader className="pb-2 px-2">
              <CardTitle className="flex items-center text-base sm:text-lg mb-1">
                <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                Match Score
              </CardTitle>
              <CardDescription className="text-xs">How well your resume matches the job description</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-0 pb-2">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{matchScore}%</div>
                <Progress value={matchScore} className="w-full mb-2" />
                <p className="text-xs text-gray-600">
                  {matchScore >= 80
                    ? "Excellent match!"
                    : matchScore >= 60
                      ? "Good match with room for improvement"
                      : "Needs significant improvement"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Missing Keywords */}
        <motion.div variants={itemVariants}>
          <Card className="compact-card p-2 h-full">
            <CardHeader className="pb-2 px-2">
              <CardTitle className="flex items-center text-base sm:text-lg mb-1">
                <XCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                Missing Keywords
              </CardTitle>
              <CardDescription className="text-xs">Important keywords not found in your resume</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-0 pb-2">
              <div className="flex flex-wrap gap-1">
                {missingKeywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="destructive" className="text-xs px-2 py-0.5">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Keywords to Add */}
        <motion.div variants={itemVariants}>
          <Card className="compact-card p-2 h-full">
            <CardHeader className="pb-2 px-2">
              <CardTitle className="flex items-center text-base sm:text-lg mb-1">
                <CheckCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                Keywords to Add
              </CardTitle>
              <CardDescription className="text-xs">Recommended keywords to strengthen your resume</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-0 pb-2">
              <div className="flex flex-wrap gap-1">
                {keywordsToAdd.map((keyword: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Suggested Improvements */}
      <motion.div 
        ref={improvementsRef}
        variants={containerVariants}
        initial="hidden"
        animate={isImprovementsInView ? "visible" : "hidden"}
        className="lg:col-span-3"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-xl sm:text-2xl">
              <Lightbulb className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
              Suggested Improvements
            </CardTitle>
            <CardDescription className="text-sm">AI-powered recommendations to enhance your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {improvements.map((improvement: string, index: number) => (
                <motion.li 
                  key={index} 
                  className="text-base sm:text-lg text-gray-700 flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isImprovementsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <span className="text-yellow-600 mr-2 flex-shrink-0">•</span>
                  <span>{improvement}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Career Recommendations */}
      <motion.div 
        ref={careersRef}
        variants={containerVariants}
        initial="hidden"
        animate={isCareersInView ? "visible" : "hidden"}
        className="lg:col-span-3 mt-2 bg-transparent shadow-none border-none"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Career Recommendations</CardTitle>
            <CardDescription className="text-sm">
              Suggested career paths based on your skills and experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {bestMatch && (
                <motion.div 
                  className="w-full bg-green-50 border border-green-200 rounded-xl shadow-md p-6 flex flex-col items-center justify-center transition-transform hover:scale-[1.02] mb-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isCareersInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-semibold text-green-800 text-lg sm:text-xl text-center mb-2">{bestMatch.title}</p>
                  <p className="text-sm text-green-700 text-center">{bestMatch.reason}</p>
                </motion.div>
              )}
              {otherCareers.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherCareers.map((career: any, index: number) => (
                    <motion.div 
                      key={index} 
                      className="bg-blue-50 border border-blue-200 rounded-xl shadow-md p-6 flex flex-col items-center justify-center transition-transform hover:scale-[1.02] h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isCareersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <p className="font-semibold text-blue-800 text-base sm:text-lg text-center mb-2">{career.title}</p>
                      <p className="text-sm text-blue-700 text-center">{career.reason}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feedback Card */}
      <motion.div 
        ref={feedbackRef}
        variants={containerVariants}
        initial="hidden"
        animate={isFeedbackInView ? "visible" : "hidden"}
        className="lg:col-span-3"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">We Value Your Feedback</CardTitle>
            <CardDescription className="text-sm">
              Help us improve ResumeXpert by sharing your thoughts!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <a
                href="https://forms.gle/3FhDZPmULh6nCVDS6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-md inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base text-center"
              >
                Give Feedback
              </a>
              <p className="mt-2 text-xs text-gray-500">Your feedback helps us make ResumeXpert better for everyone.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
