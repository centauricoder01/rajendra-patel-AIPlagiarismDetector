import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaMap,
  FaMailBulk,
} from "react-icons/fa";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-[4rem]" id="footer">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              AI Plagiarism Detector
            </h3>
            <p className="text-sm">
              Ensuring academic integrity with cutting-edge AI technology.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <FaFacebookF className="h-6 w-6 hover:text-blue-400 transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <FaTwitter className="h-6 w-6 hover:text-blue-400 transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <FaInstagram className="h-6 w-6 hover:text-pink-400 transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <FaLinkedin className="h-6 w-6 hover:text-blue-400 transition-colors" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="flex items-center space-x-2">
              <FaMailBulk className="h-5 w-5" />
              <span>support@aiplagiarismdetector.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMap className="h-5 w-5" />
              <span>123 AI Street, Tech City, TC 12345</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} AI Plagiarism Detector. All rights
              reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <form className="flex space-x-2">
                <input
                  className="max-w-xs bg-gray-800 border-gray-700 text-white p-3 rounded"
                  placeholder="Enter your email"
                  type="email"
                />
                <button
                  type="submit"
                  className="bg-white rounded p-3 text-black"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
