import React, { useEffect, useState } from 'react';
import { Course } from '../types';
import { Book, Video, ArrowLeft } from 'lucide-react';

interface CourseDetailsProps {
  course: Course;
  onBack: () => void;
  email:string;
  name:string;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onBack, email, name }) => {

  const sendToPending = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name,email,transid,courseName,amt }),
      });
  
      const data = await response.json();
      console.log('Login response:', data);
      setReg(0)
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      // Optional: Do something after successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(()=>{
    const checkPending = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pending-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
    
        const data = await response.json();
        setReg(data.value)
        
        console.log('Login response:', data.value);
    
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }
    
        // Optional: Do something after successful login
      } catch (error) {
        console.error('Login error:', error);
      }
    };
    checkPending()
  },[])
  
  

  const [transid,setTransid]=useState(0);
  const [courseName,setCourse]=useState("Computer Science");
  const [amt,setAmt]=useState(100);
  const [reg,setReg]=useState(-1);


  return (
    <div className="card p-6">
      <button
        onClick={onBack}
        className="mb-4 text-primary-400 hover:text-primary-300 font-medium flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Courses
      </button>

      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h2 className="text-3xl font-bold text-primary-400 mb-4">{course.title}</h2>
      <p className="text-gray-400 mb-6">{course.description}</p>
    {(reg===-1)?<>
      <div className="flex items-center text-gray-400 mb-8">
        <div>
          <button onClick={()=>sendToPending()}>Register</button>
          <input type='text' value={transid} onChange={(e)=>setTransid(e.target.value)}></input>
        </div>
      </div>
    </>
      :
      <>
      {(reg===0)?<>
        <div className="flex items-center text-gray-400 mb-8">
        Under Review
      </div>
      </>:
      <>
      <div className="flex items-center text-gray-400 mb-8">
        Approved
      </div>
      </>}
      
      </>}


      <div className="border-t border-primary-800/20 pt-6">
        <h3 className="text-xl font-bold text-primary-400 mb-4">Course Modules</h3>
        {course.modules.map((module) => (
          <div key={module.id} className="mb-6 bg-dark-100 rounded-lg p-4 border border-primary-800/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-gray-200">
                Day {module.day}: {module.title}
              </h4>
            </div>
            
            <div className="flex items-center text-primary-400 mb-2">
              <Video className="w-4 h-4 mr-2" />
              <a href={module.videoUrl} className="hover:text-primary-300">
                Watch Video Lecture
              </a>
            </div>

            <div className="mt-2">
              <div className="flex items-center text-gray-300 mb-1">
                <Book className="w-4 h-4 mr-2" />
                <span className="font-medium">Study Materials:</span>
              </div>
              <ul className="ml-6 list-disc text-gray-400">
                {module.materials.map((material, index) => (
                  <li key={index} className="mt-1">
                    <a href="#" className="hover:text-primary-400">
                      {material}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};