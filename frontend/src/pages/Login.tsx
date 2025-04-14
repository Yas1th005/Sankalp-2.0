import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { CourseCard } from '../components/CourseCard';
import { mockCourses } from '../data/mockData';
import { GraduationCap, Shield, BookOpen } from 'lucide-react';

export const Login: React.FC = () => {
  const [view, setView] = useState<'student-login' | 'admin-login' | 'register' | 'curriculum'>('student-login');

  return (
    <div className="min-h-screen bg-gradient-radial from-dark-100 via-dark-200 to-dark-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-400 mb-4">Sankalp Training Portal</h1>
          <p className="text-xl text-gray-400">Empowering minds through quality education</p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setView('student-login')}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              view === 'student-login'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'btn-secondary'
            }`}
          >
            <GraduationCap className="w-5 h-5 mr-2" />
            Student Login
          </button>
          <button
            onClick={() => setView('admin-login')}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              view === 'admin-login'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'btn-secondary'
            }`}
          >
            <Shield className="w-5 h-5 mr-2" />
            Admin Login
          </button>
          <button
            onClick={() => setView('curriculum')}
            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
              view === 'curriculum'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'btn-secondary'
            }`}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            View Curriculum
          </button>
        </div>

        <div className="flex justify-center">
          {view === 'student-login' && (
            <LoginForm
              type="student"
              onRegisterClick={() => setView('register')}
            />
          )}
          {view === 'admin-login' && <LoginForm type="admin" />}
          {view === 'register' && (
            <RegisterForm onLoginClick={() => setView('student-login')} />
          )}
          {view === 'curriculum' && (
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    showCurriculum={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};