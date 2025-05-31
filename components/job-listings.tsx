"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Building } from "lucide-react"

export function JobListings({ jobs, jobTitle }: { jobs: any[], jobTitle?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          {jobTitle ? `Recommended Job Listings for "${jobTitle}"` : "Recommended Job Listings"}
        </CardTitle>
        <CardDescription className="text-sm">Jobs that match your resume and skills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {jobs.map((job, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow border-blue-100">
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <img
                    src={job.employer_logo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-100 flex-shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base leading-tight mb-1">{job.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 flex items-center mb-2">
                      <Building className="mr-1 h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{job.company}</span>
                    </p>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
                      <MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="mr-1 h-3 w-3 flex-shrink-0" />
                      Posted {job.job_posted}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 font-medium">Apply on:</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(job.apply_options) && job.apply_options.map((option: any, index: number) => (
                      <Button
                        key={index}
                        size="sm"
                        className={`bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto min-w-[80px]`}
                        onClick={() => window.open(option.apply_link, "_blank")}
                      >
                        {option.publisher || "Apply"}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
