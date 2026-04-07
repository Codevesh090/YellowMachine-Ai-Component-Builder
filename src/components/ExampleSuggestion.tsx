import {motion} from 'motion/react'
import { useContext } from 'react';
import { UserPromptContext } from '../context/UserPromptContext';

const ExampleSuggestion = () => {
  const userPromptContext = useContext(UserPromptContext);

  const suggestions = [
     "A dark pricing card with monthly/annual toggle",
     "A user profile card with avatar and social links",
     "A notification toast with progress bar",
     "A login form with email and password",
     "A testimonial card with star ratings",
     "A stats dashboard card with charts",
   ];
    return (
    <div className="w-full max-w-md">
      <p className="text-white/60 text-sm mb-1 ml-3.5">Try an example:</p>
      <div className="flex flex-col gap-2">
        {suggestions.map((item, index) => (
          <motion.div key={index} className="bg-amber-100 w-55 px-2 py-1 mx-3 text-sm text-black rounded-lg cursor-pointer hover:bg-[#181818] transition-all duration-200" onClick={()=>userPromptContext?.setuserPrompt(item)}>
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ExampleSuggestion