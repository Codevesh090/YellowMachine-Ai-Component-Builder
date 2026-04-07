import type React from "react";
import ExampleSuggestion from "./ExampleSuggestion"
import {motion} from 'motion/react';
import {useContext } from "react";
import { ApiKeyDraftContext } from "../context/ApiKeyDraftContext";
import { UserPromptContext } from "../context/UserPromptContext";
import { ShowPasswordContext } from "../context/ShowPasswordContext";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { SaveLoadingContext } from "../context/SaveLoadingContext";
import { ApiKeyValueContext } from "../context/ApiKeyValueContext";
import { GenerationStateContext } from "../context/GenerationStateContext";
import {GoogleGenerativeAI} from '@google/generative-ai'

const Slide1 = () => {
  const apiKeyDraftContext = useContext(ApiKeyDraftContext);
  const userPromptContext = useContext(UserPromptContext);
  const showPasswordContext = useContext(ShowPasswordContext);
  const saveLoadingContext = useContext(SaveLoadingContext);
  const apiKeyValueContext = useContext(ApiKeyValueContext);
  const generationStateContext = useContext(GenerationStateContext);

  //is it using useCallback is optimal here ?
  function handleSaveClick(){
  if(!apiKeyDraftContext?.apiKeyDraft)return;

  saveLoadingContext?.setsaveLoading(true);

  apiKeyValueContext?.setapiKeyValue(apiKeyDraftContext.apiKeyDraft);

  localStorage.setItem("geminiApiKey",apiKeyDraftContext?.apiKeyDraft || "")

  setTimeout(() => {
    apiKeyDraftContext.setapiKeyDraft("");
    saveLoadingContext?.setsaveLoading(false);
  }, 500);

  }
  //To read about this function☝️ working see Case101 on Readme.md


  //This function handles the generate component function
  async function handleGenerateComponentClick(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(!apiKeyValueContext?.apiKeyValue)return; //agar nahi hai api key stop here only
  generationStateContext?.setgenerationState({status:'loading'})//loading start kar di 
  
  try{
    const genAI = new GoogleGenerativeAI(apiKeyValueContext.apiKeyValue); //we created the client , and humne to create client yeh kiya new GoogleGenerativeAI(apiKeyValueContext.apiKeyValue) jo kya karega ki ek "class" ko apikey dega and then wo apikey lekar hume ek object dega and wo object hum is variable genAI me save kar lenge .
    const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"});//uske baad humne model choose kiya

    const systemPrompt = 'Return only raw JSX for a single React component. No imports, no exports, no function wrapper, no explanations, no markdown code fences. Use only Tailwind CSS classes for styling. The JSX should be a single root element. Use realistic placeholder content.Prefer concise UI over long content.Keep the component reasonably sized to fit within the response limit.Avoid very large lists or repeated elements';
    //Now we are giving the instructions to the system to set how it behaves when it gets the prompt .
    
    const result = await model.generateContent({
     contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser request: ${userPromptContext?.userPrompt}` }],
        },
      ],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 20000,
      },
    })
    //Now ab humne kya kiya ki , model ke andar ek function hota hai "generateContent()" Toh humne usi function ko pakda and parameter me use body paas ki , jisse wo function lega and process karke hume result dega which we saves in our variable "result".
    //Now body me hum kya dete hai , toh hum body me do cheeze dete hai , 1st "contents" which is a array and it always contains only one element and that element is object which contains "role" and "parts" and yeh jo parts hota hai isme jo text hum dete hai "remember usme always hum systemPrompt + userPrompt dono ko saath dete hai isiliye humne ${systemPrompt}\n\nUser request: ${prompt} ese likha , (here /n/n means leaves two lines and User request is to show that this is user prompt) in one single text" and 2nd cheez hai generationconfiguration jisme pehla aata hai temperature jiski limit 0-1 hai and hum 0 se jitna jyada badate hai ai utna creative hota jaata hai and then max tokens means the response ai will give up to 2000 tokens in the output.Yaani response ka size .
    
    const raw = result.response.text(); //.text() it converts the response into string 
    console.log(raw);

    generationStateContext?.setgenerationState({
      status:'success',
      code:raw,
      prompt:userPromptContext?.userPrompt ?? ""
    })
  }catch{
    generationStateContext?.setgenerationState({
      status: "error",
      message: "Failed to generate",
    })
  }
}
//To read about this function☝️ working see Case102 on Readme.md


  return (
    <div className="flex flex-col h-full">
      {/*box-1*/}
      <div className="border border-white/10 h-14">
        <div className="w-full h-full flex justify-baseline ml-3 items-center gap-2">
          <div className="w-8 h-8 border-amber-400 rounded-sm overflow-hidden"><img src="/shape.png" alt="ai-component-builder-logo" className="w-full h-full object-cover" /></div>
          <h1 className="text-white font-medium">Yellow Machine</h1>
        </div>
      </div>{/*box-1*/}

      {/*box-2*/}
      <div className="border border-white/10 h-20">
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          <h1 className="text-white/30 text-[13px] pr-33">Gemini Api Key</h1>
          <div className="flex gap-1 items-center">
            <input type={showPasswordContext?.showPassword ? "text":"password"} placeholder="AIza..." value={apiKeyDraftContext?.apiKeyDraft ||""} onChange={(e)=>apiKeyDraftContext?.setapiKeyDraft(e.target.value)} className="w-30 h-8 rounded-lg bg-[#000000] border border-[#FFC501] focus:outline-none focus:ring-1 focus:ring-amber-400 pl-2 placeholder:text-white/50 caret-white placeholder:text-sm text-white"/>
            <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-lg bg-amber-100 w-12 h-8 text-sm hover:bg-white/50 flex items-center justify-center text-black" onClick={()=>showPasswordContext?.setshowPassword(!showPasswordContext.showPassword)}>{showPasswordContext?.showPassword ? (<IoEyeOff className="text-3xl text-amber-900"/>):(<IoEye className="text-3xl text-amber-900"/>)}</motion.button>
            <motion.button type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-lg bg-[#FFC501] w-12 h-8 flex items-center font-medium justify-center" onClick={handleSaveClick}>{saveLoadingContext?.saveLoading ? (<div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin border-amber-900 "></div>):("Save")}</motion.button>
          </div>
        </div>
      </div>{/*box-2*/}

      {/*box-3*/}
      <div className="border border-white/10 flex-12">
        <div className="w-full h-150 flex flex-col items-center gap-4 justify-center">
          <form onSubmit={handleGenerateComponentClick} className="flex flex-col items-center justify-center gap-3 mt-4">
          <textarea placeholder="Describe a UI component..." value={userPromptContext?.userPrompt || ""} onChange={(e)=>userPromptContext?.setuserPrompt(e.target.value)} className="bg-[#0c0c0c] w-52 h-34 mt-3 resize-none text-white text-sm placeholder:text-white/50 placeholder:text-[13px] px-4 py-3 rounded-2xl outline-none border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"/>
          <motion.button disabled={generationStateContext?.generationState.status=="loading"} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} type="submit" className="rounded-lg bg-[#FFC501] w-45 h-10 flex items-center font-medium justify-center">{generationStateContext?.generationState.status =="loading" ?(<div className="w-6 h-6 rounded-full border-3 border-t-transparent animate-spin border-amber-900 "></div>):("Generate") }</motion.button>
          </form>
          <div className="w-full h-100"><ExampleSuggestion /></div>
        </div>
      </div>{/*box-3*/}

      {/*box-4*/}
      <div className="border border-white/10 flex-1">
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-[11px] font-medium text-white/20">Key stored locally in browser only</h1>
        </div>
      </div>{/*box-4*/}
    </div>
  )
}

export default Slide1

{/* 
  If we wrote this :
      obj?.prop

  then here ? means 
        	•	If obj is NOT null/undefined → return "obj.prop"
	        •	If obj is null or undefined → return "undefined"
  
  */}

  // 



//learn react.memo , usememo , usecallback and read the doc and understand it .
//bits - course


//Some idea to add in it
//Give components that is made through a particular UI library like acertinity or ShadCn etc.
//Choose in which theme you want your component like dark theme or light theme or whatever theme.



//What I am learning in this ?
//How to write code in a profeesional manner like parent and child have a gap when written line after line.
//Using context-Api not doing it by prop drilling