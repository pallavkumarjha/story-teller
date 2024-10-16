import { useState, useRef } from 'react';
import { Moon, Stars, Play, Pause, Download, Sparkles, Rocket, Crown } from 'lucide-react';
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: This is not recommended for production
})

const StoryGenerator = () => {
  const [story, setStory] = useState('');
  const [, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [age, setAge] = useState('5-7');
  const [genre, setGenre] = useState('fantasy');
  const audioRef = useRef(null);

  const genreIcons = {
    fantasy: <Crown className="w-5 h-5 text-purple-300" />,
    adventure: <Rocket className="w-5 h-5 text-blue-300" />,
    animals: <Crown className="w-5 h-5 text-amber-300" />,
    ocean: <Rocket className="w-5 h-5 text-cyan-300" />
  };

  const generateStory = async () => {
    setIsLoading(true)
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a creative storyteller who specializes in creating engaging, age-appropriate bedtime stories for kids."
          },
          {
            role: "user",
            content: `Create a bedtime story for a child aged ${age} based on the genre '${genre}'. The story should be between 7 to 10 minutes long, contain elements appropriate for children, and have a calming tone to help them fall asleep. The story should also include a positive message or moral at the end.`
          }
        ],
        model: "gpt-3.5-turbo",
      });
      
      const response: any = completion.choices[0].message.content;
      try {
        setStory(response)
      } catch (parseError) {
        setError("There was an error.");
      }
    } catch (aiError) {
      setError('Failed to get AI fix: ' + (aiError as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-indigo-900 text-white p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`
            }}
          />
        ))}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-indigo-900/50 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full">
            <div className="relative w-full h-32">
              <Moon className="absolute top-0 left-[20%] text-yellow-200 w-8 h-8 animate-bounce" />
              <Stars className="absolute top-12 right-[25%] text-yellow-200 w-6 h-6 animate-pulse" />
              <Sparkles className="absolute top-4 right-[15%] text-yellow-200 w-5 h-5 animate-bounce" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 text-transparent bg-clip-text mb-4">
            Magical Bedtime Stories
          </h1>
          <p className="text-lg text-purple-200">Where dreams and imagination come to life!</p>
        </div>
        <div className="bg-gradient-to-br from-purple-800/90 to-indigo-800/90 backdrop-blur-lg border-2 border-purple-400/30 shadow-xl mb-8 rounded-xl overflow-hidden">
          <div className="p-8">
            <div className="space-y-8">
              <div className="bg-indigo-800/50 rounded-xl p-6 border border-purple-400/30">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {/* <Bear className="w-6 h-6 text-yellow-300" /> */}
                  Choose Your Age
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {['3-4', '5-7', '8-10'].map((ageGroup) => (
                    <button
                      key={ageGroup}
                      onClick={() => setAge(ageGroup)}
                      className={`h-16 ${age === ageGroup 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg' 
                        : 'bg-indigo-700/50 hover:bg-indigo-600/50'}`}
                    >
                      {ageGroup} years
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-indigo-800/50 rounded-xl p-6 border border-purple-400/30">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Crown className="w-6 h-6 text-yellow-300" />
                  Pick Your Adventure
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(genreIcons).map(([genreKey, icon]) => (
                   <button
                   key={genreKey}
                   onClick={() => setGenre(genreKey)}
                   className={`h-20 flex flex-col items-center justify-center gap-2 rounded-md transition-all duration-300 ${
                     genre === genreKey
                       ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg scale-105'
                       : 'bg-indigo-700/50 hover:bg-indigo-600/50 hover:shadow-md'
                   }`}
                 >
                   {icon}
                   <span className="capitalize text-sm font-medium text-white">{genreKey}</span>
                 </button>
                 
                  ))}
                </div>
              </div>
              <button
                className={`w-full h-16 text-lg font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                  hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-xl rounded-md transition-all duration-300 
                  ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-2xl'}`}
                onClick={generateStory}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span className="text-white">Creating Magic...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6 text-white" />
                    <span className="text-white">Create Your Story</span>
                  </div>
                )}
              </button>

            </div>
          </div>
        </div>
        {story && (
          <div className="bg-gradient-to-br from-purple-800/90 to-indigo-800/90 backdrop-blur-lg border-2 border-purple-400/30 shadow-xl rounded-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-center gap-6 mb-8">
              <button
                onClick={togglePlayPause}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg transition-all duration-300 transform hover:scale-105 text-white font-medium"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                {isPlaying ? 'Pause Story' : 'Play Story'}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg transition-all duration-300 transform hover:scale-105 text-white font-medium"
              >
                <Download className="w-6 h-6" />
                Download Story
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-xl leading-relaxed text-white">{story}</p>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default StoryGenerator;