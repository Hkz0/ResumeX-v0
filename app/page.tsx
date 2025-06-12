import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Target, Zap } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <Navigation currentPage="home" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <ScrollAnimation direction="up" className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            AI-Powered Resume 
            <span
              className="ml-2 bg-blue-gradient bg-clip-text text-transparent animate-gradient-x-slow bg-[length:400%_100%]"
            >
              Analysis
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Get instant feedback on your resume, discover missing keywords, and find the perfect job matches with our
            advanced AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/analyzer">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Analyze Resume
              </Button>
            </Link>
            <Link href="/ranking">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <BarChart3 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Rank Resumes
              </Button>
            </Link>
          </div>
        </ScrollAnimation>

        {/* Features */}
        <div className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4">
          <ScrollAnimation direction="left" delay={0.2}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Target className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  Resume Analyzer
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Upload your resume and job description to get detailed analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Match score calculation</li>
                  <li>• Missing keywords identification</li>
                  <li>• Improvement suggestions</li>
                  <li>• Career recommendations</li>
                  <li>• Relevant job listings</li>
                </ul>
                <Link href="/analyzer">
                  <Button className="mt-4 w-full">Try Analyzer</Button>
                </Link>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={0.4}>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <BarChart3 className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  Resume Ranking
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Compare multiple resumes and rank them for specific positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Multi-resume comparison</li>
                  <li>• Scoring algorithms</li>
                  <li>• Detailed rankings</li>
                  <li>• Performance metrics</li>
                  <li>• Candidate insights</li>
                </ul>
                <Link href="/ranking">
                  <Button className="mt-4 w-full" variant="outline">
                    Try Ranking
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}
