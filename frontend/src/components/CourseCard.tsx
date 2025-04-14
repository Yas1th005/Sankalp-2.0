import React from 'react';
import { Course } from '../types';
import { Clock, ChevronRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
  showCurriculum?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick, showCurriculum = false }) => {
  return (
    <div className="card overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary-400 mb-2">{course.title}</h3>
        <p className="text-gray-400 mb-4">{course.description}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span>{course.duration}</span>
        </div>

        {showCurriculum && (
          <div className="mt-4 border-t border-primary-800/20 pt-4">
            <h4 className="font-semibold text-primary-300 mb-2">Curriculum Overview</h4>
            {course.curriculum.map((item, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-center text-gray-300 font-medium">
                  <ChevronRight className="w-4 h-4 mr-1 text-primary-500" />
                  {item.title} ({item.duration})
                </div>
                <ul className="ml-6 mt-1 text-sm text-gray-400">
                  {item.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="list-disc ml-4">{topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {onClick && (
          <button
            onClick={onClick}
            className="mt-4 w-full btn-primary py-2 px-4 rounded shadow-lg shadow-primary-500/30"
          >
            View Course Details
          </button>
        )}
      </div>
    </div>
  );
};