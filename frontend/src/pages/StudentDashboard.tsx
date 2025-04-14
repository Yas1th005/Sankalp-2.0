import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CourseCard } from '../components/CourseCard';
import { CourseDetails } from '../components/CourseDetails';
import { ProfileSettings } from '../components/ProfileSettings';
import { mockCourses } from '../data/mockData';
import { LogOut, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const handleProfileUpdate = (userData: Partial<User>) => {
    console.log('Updating user data:', userData);
    setShowSettings(false);
  };

  const course = selectedCourse ? mockCourses.find(c => c.id === selectedCourse) : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-300">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-dark-200 border-b border-primary-800/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-2xl font-bold text-primary-400"
              >
                Sankalp Training
              </motion.h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(true)}
                className="btn-secondary rounded-lg px-4 py-2 flex items-center"
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </motion.button>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center text-gray-400"
              >
                <User className="w-5 h-5 mr-2" />
                <span>{user?.name}</span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="btn-secondary rounded-lg px-4 py-2 flex items-center"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <AnimatePresence mode="wait">
            {showSettings ? (
              <ProfileSettings
                key="settings"
                user={user!}
                onSave={handleProfileUpdate}
                onClose={() => setShowSettings(false)}
              />
            ) : course ? (
              <motion.div
                key="course-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CourseDetails
                  course={course}
                  onBack={() => setSelectedCourse(null)}
                  email={user?.email}
                  name={user?.name}
                />
              </motion.div>
            ) : (
              <motion.div
                key="course-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-bold text-primary-400 mb-6"
                >
                  Available Courses
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockCourses.map((course) => (
                    <motion.div key={course.id} variants={itemVariants}>
                      <CourseCard
                        course={course}
                        onClick={() => setSelectedCourse(course.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};