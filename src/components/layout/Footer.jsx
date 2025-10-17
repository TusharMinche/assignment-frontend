import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">CreditDetails</h3>
            <p className="text-gray-400 text-sm">
              A modern credit report management system built with MERN stack.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/upload" className="hover:text-white transition">Upload Report</a></li>
              <li><a href="/reports" className="hover:text-white transition">All Reports</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com/TusharMinche" className="text-gray-400 hover:text-white transition">
                <FiGithub className="text-xl" />
              </a>
              <a href="https://www.linkedin.com/in/tusharminche/" className="text-gray-400 hover:text-white transition">
                <FiLinkedin className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} TusharMinche. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;