import { useContext ,useState,useEffect} from "react"
import { GenerationStateContext } from "../context/GenerationStateContext"
import CodeComponent from "./CodeComponent";
import { CodePreviewContext } from "../context/CodePreviewContext";
import PreviewComponent from "./PreviewComponent";
import { saveComponent, listComponents, isFirebaseConfigured } from "../firebase";
import { GalleryContext } from "../context/GalleryContext";

const Slide2 = () => {
  const generationStateContext = useContext(GenerationStateContext);
  const codePreviewContext = useContext(CodePreviewContext);
  const galleryContext = useContext(GalleryContext)
  const [copied, setcopied] = useState(false);
  
  async function handleCopyClick(){
     if(generationStateContext?.generationState.status!=="success")return //if success nahi hai toh ruk jao wahi don't copy the code.
     await navigator.clipboard.writeText(generationStateContext?.generationState.code); //uske baad humne navigator.clipboard.writeText WHICH IS PROVIDED BY WEBAPI OR BROWSER ITSELF. to copy code in clipboard.
     setcopied(true);

     setTimeout(() => {
      setcopied(false)
     },2000); //kyuki agar hum false nahi karnge toh wo hamesha ke liye waha true hi rahega and "copied" hi likha dikhai dega on button all the time even if we generated the new response.

  }

  async function fetchGallery() {
    if(!isFirebaseConfigured())return;

    const data = await listComponents();
    galleryContext?.setgallery(data);
  }

  useEffect(() => {
  fetchGallery();
  }, []);

  async function handleSaveComponentClick(){
     if (generationStateContext?.generationState.status !== "success") return;
    if(!isFirebaseConfigured())return;
    //Sabse pehle checks kiye and then humne ek small title generate kiya from the userPrompt.
   try{
    const title = generationStateContext.generationState.prompt.split(" ").slice(0, 5).join(" ");

    //Uske baad hume parameters paas karke function call kiya jo hamare is data ko lega and put it in the db.
   await saveComponent({
    prompt: generationStateContext.generationState.prompt,
    code: generationStateContext.generationState.code,
    title: title
   });
   
    //uske baad humne hamare data ko db me dalne ke baad fetch kiya to show that saved thing in the gallery.
    await fetchGallery();
   }catch(err){
    console.error("Save failed", err);
   }

   }


  return (
    <>
    {/*This is navbar*/}
    <div className="w-full h-14.25 border-b border-white/10 bg-black flex items-center justify-between px-4">
    <div className="flex gap-3">
    <button className={`rounded-lg w-14 h-7 flex items-center justify-center ${!codePreviewContext?.codePreview ? "bg-amber-950 text-white" : "bg-amber-200"}`} onClick={() => codePreviewContext?.setcodePreview(true)}>Code</button>
    <button className={`rounded-lg w-18 h-7 flex items-center justify-center ${codePreviewContext?.codePreview ? "bg-amber-950 text-white" : "bg-amber-200"}`} onClick={() => codePreviewContext?.setcodePreview(false)}>Preview</button>
    </div>
    {codePreviewContext?.codePreview ? (<button className={`rounded-lg w-14 h-7 flex items-center justify-center ${copied ? "bg-amber-950 text-white w-16" : "bg-amber-200 hover:bg-amber-950 hover:text-white"}`}onClick={handleCopyClick}>{copied ? "Copied" : "Copy"}</button>):(<button disabled={generationStateContext?.generationState.status !== "success"} onClick={handleSaveComponentClick}  className={`rounded-lg w-14 h-7 flex items-center justify-center ${generationStateContext?.generationState.status==="success" ? ("bg-amber-200 hover:bg-amber-950 hover:text-white"):("bg-[#666666]")}`}>Save</button>)}
    </div>
    {/*This is navbar*/}

    {/*This is main content*/}
    <div className="flex items-center justify-center w-full h-screen">

    {generationStateContext?.generationState.status=="idle" && 
    <div className="flex flex-col items-center justify-center">
      <img src="/shape.png" alt="write prompt img" className="w-50 h-50"/>
      <p className="text-white text-5xl max-w-xl mx-auto text-center ">Write prompt to generate components </p>
    </div>
    }

    {generationStateContext?.generationState.status=="loading" && <p className="text-amber-400 text-5xl animate-pulse">Generating...</p>}

    {generationStateContext?.generationState.status=="success" && codePreviewContext?.codePreview && (<CodeComponent code={generationStateContext.generationState.code}/>)}

    {generationStateContext?.generationState.status=="success" && !codePreviewContext?.codePreview && (<PreviewComponent code={generationStateContext.generationState.code}/>)}

    {generationStateContext?.generationState.status=="error" && <p className="text-red-500 font-mono text-3xl animate-bounce">{generationStateContext.generationState.message}</p>}
    </div>
    {/*This is main content*/}
    </>
  )
}

export default Slide2

//Humne yaha kya kiya hai , uska pura concept samjhate hai , Toh yaha hua yeh ki 
//When we click on Generate toh , gemini ke paas request jaayegi wo response karega .
//And it sets the generation success and Now ab humne kya kiya hai ki Slide 2 ke contents
//Ko Humne GenerationContext ke hisaab se banaya hai , Taaki yeh slide 2 ke contents 
//Generation State par depend kare . So,that any change in generationState can cause slide 2 to render
//Toh jab generation State success hoga toh kya hoga ki <CodeComponent> call hoga and hum usme
//parameter bhi paas karenge code ka , kyuki bhale hi we are using context api but tab bhi jo
//default state hoti hai wo state=idle rahegi toh wo toh code contain nahi karta hai , hence we cannot use 
//code through context api , we need to pass it in case of success .
//So now what happened till now is that -> when we click generate -> If success , idle , loading or error 
//Slide 2 will render accordingly . So, if success then <CodeComponent/> will also render .
//Now go to <CodeComponent> page to see what we did there . 