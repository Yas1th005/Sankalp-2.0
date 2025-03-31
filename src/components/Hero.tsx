import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Rocket } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import * as THREE from 'three';

const Hero = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    
    // Create a geometry for particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a cube of particles
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add some ambient light
    const ambientLight = new THREE.AmbientLight(0x7c3aed, 0.5);
    scene.add(ambientLight);
    
    // Add a point light
    const pointLight = new THREE.PointLight(0x7c3aed, 0.8);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      // Add mouse interaction
      const mouseX = 0;
      const mouseY = 0;
      particlesMesh.position.x += (mouseX - particlesMesh.position.x) * 0.05;
      particlesMesh.position.y += (-mouseY - particlesMesh.position.y) * 0.05;
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  const titleAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const subtitleAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2
      }
    }
  };

  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <section id="home" className="pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden relative">
      {/* 3D Background container */}
      <div ref={mountRef} className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="inline-block bg-primary-900/30 text-primary-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              variants={titleAnimation}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)"
              }}
            >
              Training Program
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 font-display"
              variants={titleAnimation}
            >
              <motion.span
                className="inline-block"
                variants={subtitleAnimation}
              >
                <Typewriter
                  options={{
                    strings: ['Sankalp 2.0', 'Transform Your Career', 'Learn. Grow. Succeed.'],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    delay: 80,
                  }}
                />
              </motion.span>
              <motion.div 
                className="text-primary-400 mt-2"
                variants={subtitleAnimation}
                whileHover={{
                  scale: 1.02,
                  textShadow: "0 0 8px rgba(124, 58, 237, 0.6)"
                }}
              >
                Bridging Silence, Building Connections
              </motion.div>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-xl"
              variants={titleAnimation}
            >
              Join our comprehensive training program and master the skills that top tech companies demand. Get hands-on experience, mentorship, and guaranteed placement opportunities.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={titleAnimation}
            >
              <motion.button
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(124, 58, 237, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-white/30"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                Get Started 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </motion.button>
              
              <motion.button
                className="border-2 border-dark-400 text-gray-300 px-8 py-3 rounded-full font-medium hover:border-primary-600 hover:text-primary-400 transition-colors relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(124, 58, 237, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-primary-600/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial="hidden"
            animate="visible"
            variants={cardAnimation}
          >
            <motion.div 
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Students collaborating" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                initial={{ filter: "brightness(0.8)" }}
                whileHover={{ filter: "brightness(1)" }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-600/20 to-transparent"
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            <motion.div 
              className="absolute -top-10 -left-10 bg-dark-300 p-4 rounded-xl shadow-lg flex items-center gap-3 z-20 border border-dark-400"
              variants={cardAnimation}
              whileHover={{ 
                scale: 1.05,
                rotate: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}
            >
              <motion.div 
                className="bg-primary-900/30 p-2 rounded-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Rocket className="h-6 w-6 text-primary-400" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-white">100% Placement</p>
                <p className="text-xs text-gray-400">Guaranteed Success</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-8 -right-8 bg-dark-300 p-4 rounded-xl shadow-lg flex items-center gap-3 z-20 border border-dark-400"
              variants={cardAnimation}
              whileHover={{ 
                scale: 1.05,
                rotate: 5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}
            >
              <motion.div 
                className="bg-primary-900/30 p-2 rounded-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Code className="h-6 w-6 text-primary-400" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-white">Real Projects</p>
                <p className="text-xs text-gray-400">Industry Experience</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;