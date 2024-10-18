import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Moon, Stars, Book, Wand2, CloudMoon } from 'lucide-react'
import hero from '../../assets/images/hero.jpeg';

// ... existing code ...

export default function Hero({navigateToStart}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Animated stars background */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          initial={{
            opacity: Math.random(),
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: Math.random() * 3 + 'px',
            height: Math.random() * 3 + 'px',
          }}
        />
      ))}

      {/* Hero content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:w-1/2"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
              Wonder Tales
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-8">
              Where imagination comes to life in magical bedtime stories
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center">
                <Book className="text-yellow-300 w-6 h-6 mr-2" />
                <span className="text-white">Personalized Stories</span>
              </div>
              <div className="flex items-center">
                <Wand2 className="text-yellow-300 w-6 h-6 mr-2" />
                <span className="text-white">AI-Powered Magic</span>
              </div>
              <div className="flex items-center">
                <CloudMoon className="text-yellow-300 w-6 h-6 mr-2" />
                <span className="text-white">Peaceful Bedtimes</span>
              </div>
            </div>
            <button
                onClick={navigateToStart}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Start Your Adventure
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 lg:mt-0 lg:w-1/2"
          >
            <img 
              src={hero}
              alt="Magical storybook with characters coming to life" 
              className="rounded-lg shadow-2xl max-w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-1/4"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
      >
        <Moon className="text-yellow-200 w-12 h-12 opacity-75" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-1/4"
        animate={{
          x: mousePosition.x * -0.01,
          y: mousePosition.y * -0.01,
        }}
      >
        <Stars className="text-yellow-200 w-16 h-16 opacity-75" />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/3"
        animate={{
          x: mousePosition.x * 0.03,
          y: mousePosition.y * 0.03,
        }}
      >
        <Sparkles className="text-yellow-200 w-8 h-8 opacity-75" />
      </motion.div>
    </div>
  )
}