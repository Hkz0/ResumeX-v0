import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">ResumeXpert</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              AI-powered resume analysis and ranking to help you land your dream job.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <Link href="/analyzer" className="text-sm text-gray-500 hover:text-blue-600">
                Resume Analyzer
              </Link>
              <Link href="/ranking" className="text-sm text-gray-500 hover:text-blue-600">
                Resume Ranking
              </Link>
              <a
                href="https://forms.gle/3FhDZPmULh6nCVDS6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Feedback
              </a>
              <Link href="/about" className="text-sm text-gray-500 hover:text-blue-600">
                About Us
              </Link>
            </div>
          </div>

          {/* Social and Contact */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/Hkz0/ResumeXpert-dev" className="text-gray-400 hover:text-blue-600">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="mailto:contact@resumexpert.com" className="text-gray-400 hover:text-blue-600">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">contact@resumexpert.com</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">ResumeXpert.</p>
        </div>
      </div>
    </footer>
  )
}
