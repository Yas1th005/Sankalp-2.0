import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Sparkles, Star } from 'lucide-react';
import * as THREE from 'three';

const faqs = [
  {
    question: "What is the duration of the training program?",
    answer: "Our training program typically runs for 12 weeks, with flexible timing options available for working professionals."
  },
  {
    question: "Is there a guaranteed placement after completion?",
    answer: "Yes, we offer 100% placement assistance and guarantee job opportunities with our partner companies upon successful completion of the program."
  },
  {
    question: "What is the eligibility criteria?",
    answer: "The program is open to both students and working professionals. Basic programming knowledge and a strong willingness to learn are the main requirements."
  },
  {
    question: "How much is the program fee?",
    answer: "Program fees vary based on the course selected. We offer flexible payment options and EMI facilities. Contact our counselors for detailed information."
  },
  {
    question: "Do you provide internship opportunities?",
    answer: "Yes, we provide paid internship opportunities with a stipend of up to ₹10,000 during the training period."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Track mouse movement for particle interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize ThreeJS scene
  useEffect(() => {
    // Set up scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Set up renderer with alpha for transparency
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
    rendererRef.current = renderer;
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    
    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 2500 : 5000; // Reduce particles on mobile
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material with custom shader for better performance
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false, // Optimization
      sizeAttenuation: true
    });
    
    // Create the particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    particlesMeshRef.current = particlesMesh;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x7c3aed, 0.5);
    scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x7c3aed, 0.8);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      if (!particlesMeshRef.current || !sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      particlesMeshRef.current.rotation.x += 0.0005;
      particlesMeshRef.current.rotation.y += 0.0005;
      
      // Add mouse interaction for particles
      particlesMeshRef.current.rotation.x += mousePosition.current.y * 0.0005;
      particlesMeshRef.current.rotation.y += mousePosition.current.x * 0.0005;
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (sceneRef.current && particlesMeshRef.current) {
        sceneRef.current.remove(particlesMeshRef.current);
      }
      
      if (particlesMeshRef.current) {
        particlesMeshRef.current.geometry.dispose();
        (particlesMeshRef.current.material as THREE.Material).dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Animation variants
  const headerAnimation = {
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
  
  const titleAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const letterAnimation = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    })
  };
  
  const faqItemAnimation = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1
      }
    })
  };

  const glowAnimation = {
    initial: { boxShadow: "0 0 0 rgba(124, 58, 237, 0)" },
    hover: { 
      boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
      transition: { duration: 0.3 }
    }
  };
  
  const sparkleAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  
  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  // Split text for character animation
  const SplitText = ({ text, animation }: { text: string, animation: any }) => {
    return (
      <span className="inline-block">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={animation}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <section className="py-20 bg-dark-200 relative overflow-hidden">
      {/* 3D Background container */}
      <div ref={mountRef} className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-block relative mb-4"
            variants={titleAnimation}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white font-display relative z-10"
              whileHover={{
                textShadow: "0 0 8px rgba(124, 58, 237, 0.6)",
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <SplitText text="Frequently Asked Questions" animation={letterAnimation} />
            </motion.h2>
            
            {/* Animated decoration elements */}
            <motion.div 
              className="absolute -left-6 -top-6 text-purple-400"
              initial="initial"
              animate="animate"
              variants={sparkleAnimation}
            >
              <Sparkles size={24} />
            </motion.div>
            
            <motion.div 
              className="absolute -right-6 -bottom-6 text-purple-400"
              initial="initial"
              animate="animate"
              variants={sparkleAnimation}
              style={{ animationDelay: "0.5s" }}
            >
              <Star size={20} />
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={headerAnimation}
            whileHover={{
              color: "#a78bfa",
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            Find answers to common questions about our training program and career opportunities.
          </motion.p>
        </motion.div>

        <motion.div 
          className="w-[90vw] flex flex-col justify-center items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={faqItemAnimation}
              className="relative"
              onHoverStart={() => setHoverIndex(index)}
              onHoverEnd={() => setHoverIndex(null)}
            >
              {/* Animated highlight effect when hovered */}
              <AnimatePresence>
                {hoverIndex === index && (
                  <motion.div 
                    className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl blur-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
              
              {/* Main FAQ item button */}
              <motion.button
                className={`text-left p-2 rounded-lg bg-transparent backdrop-blur-sm border border-dark-400 flex items-center justify-between relative z-10 w-[80vw] ${
                  activeIndex === index ? 'bg-dark-400/80' : 'hover:bg-dark-400/60'
                }`}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial="initial"
                variants={glowAnimation}
              >
                <motion.div 
                  className="text-base font-medium text-white flex items-center gap-2"
                  whileHover={{
                    color: "#a78bfa",
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Animated particles around the active question */}
                  {activeIndex === index && (
                    <motion.div
                      className="absolute left-0 text-purple-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: -20 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sparkles size={18} />
                    </motion.div>
                  )}
                  <span>{faq.question}</span>
                </motion.div>
                
                {/* Animated icon */}
                <motion.div
                  initial={false}
                  animate={{ 
                    rotate: activeIndex === index ? 180 : 0,
                    scale: activeIndex === index ? 1.2 : 1,
                    color: activeIndex === index ? "#a78bfa" : "#7c3aed"
                  }}
                  transition={{ 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="ml-4 flex-shrink-0 bg-dark-400/50 p-1 rounded-full"
                >
                  {activeIndex === index ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </motion.div>
              </motion.button>

              {/* Animated answer panel */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: {
                        height: {
                          duration: 0.4,
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        },
                        opacity: {
                          duration: 0.25,
                          delay: 0.15
                        }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: {
                          duration: 0.3
                        },
                        opacity: {
                          duration: 0.25
                        }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="p-6 bg-dark-300/50 backdrop-blur-sm rounded-b-lg border-t border-dark-400 relative"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: 0.1
                      }}
                    >
                      {/* Animated words in the answer */}
                      <motion.p className="text-gray-300">
                        {faq.answer.split(' ').map((word, i) => (
                          <motion.span
                            key={i}
                            className="inline-block mr-1"
                            custom={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.2 + (i * 0.01),
                              duration: 0.2
                            }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </motion.p>
                      
                      {/* Decorative element */}
                      <motion.div
                        className="absolute bottom-3 right-3"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0.5],
                          scale: [0, 1, 0.8],
                          rotate: [0, 45, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Interactive decorative elements */}
        <motion.div
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -10, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 10, 0],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 rounded-full bg-purple-400"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;