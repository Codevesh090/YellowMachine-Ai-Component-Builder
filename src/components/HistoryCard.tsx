import { useContext, useMemo, useState } from "react";
import { deleteComponent, isFirebaseConfigured, listComponents } from "../firebase";
import { GalleryContext } from "../context/GalleryContext";

const buildSrcDoc = (code: string) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <script src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
    <script src="https://cdn.tailwindcss.com"><\/script>

    <style>
      body {
        margin: 0;
        padding: 16px;
        font-family: sans-serif;
        background: black;
      }
    </style>
  </head>

  <body>
    <div id="root"></div>

    <script type="text/babel">
      try {
        const Component = () => (
          ${code}
        );

        ReactDOM.createRoot(document.getElementById("root"))
          .render(React.createElement(Component));
      } catch (err) {
        document.getElementById("root").innerHTML =
          '<pre style="color:red; padding:16px;">' + err.message + '</pre>';
      }
    <\/script>

    <script>
      window.onerror = function(msg) {
        document.getElementById("root").innerHTML =
          '<pre style="color:red; padding:16px;">Error: ' + msg + '</pre>';
      };
    <\/script>
  </body>
</html>
`;
};

type ComponentType = {
  id: string;
  prompt: string;
  code: string;
  title: string;
  createdAt:number;
};

export const HistoryCard = ({ component }: { component: ComponentType }) => {
  const galleryContext = useContext(GalleryContext)
  const [copied, setCopied] = useState(false);

  const srcdoc = useMemo(() => buildSrcDoc(component.code), [component.code,]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(component.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  async function fetchGallery() {
      if(!isFirebaseConfigured())return;
  
      const data = await listComponents();
      galleryContext?.setgallery(data);
    }

  const handleDelete = async(CompId:string) => {
   await deleteComponent(CompId);
   fetchGallery();
  }

  return (
    <div className="group rounded-lg border border-amber-200 overflow-y-auto hover:border-gray-600 transition cursor-pointer">
      
      {/* Thumbnail Container */}
      <div className="relative aspect-[3/4] bg-black overflow-hidden">

        {/* 🔥 Scaling trick */}
        <div className="absolute inset-0 origin-top-left" style={{transform: "scale(0.25)",width: "400%",height: "400%",}}>
          <iframe
            srcDoc={srcdoc}
            sandbox="allow-scripts"
            className="w-full h-full pointer-events-none"
            title={component.title}
          />
        </div>

        {/* 🔥 Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex flex-col gap-1 items-center justify-center">
         <button onClick={handleCopy} className={`opacity-0 group-hover:opacity-100 text-xs px-2.5 py-1 rounded-md font-medium transition ${copied ? "bg-amber-950 text-white" : "bg-amber-200 text-black"} hover:cursor-pointer`}>{copied ? "Copied!" : "Copy"}</button>
         <button onClick={()=>handleDelete(component.id)}  className="opacity-0 group-hover:opacity-100 text-xs px-2.5 py-1 rounded-md font-medium transition bg-red-600 text-white hover:bg-red-700 hover:cursor-pointer mt-1">Delete</button>
        </div>

      </div>

      {/* 🔥 Title */}
      <div className="px-2 py-1.5 bg-amber-200">
        <p className="text-xs text-black truncate">
          {component.title}
        </p>
      </div>
    </div>
  );
};


//Ab kya hoga kyuki Slide3 me humne .map lagaya hai toh ek ek karke object aayenge array se and component bankar niklenge and component banane kaa kaam yeh HistoryCard.tsx karega .
//Humne yaha sabse pehle ek big-box banaya jiske andar humne ek thumbnail container banaya 
//Then in that we rendered the sandbox .
//Then added two more features 1st. Title written below that card and which show what the user game the prompt in mini form.
//2nd one is we added a copy functionality , like if we hover then it show copy button and if we click copy the code of that card gets copied to our clipboard.
//Humne isme delete functionality bhi lagai hai . when we click delete -> deletecomponent function runs and delete the component from the db and then we call the fetch function which do what is that it fetches out the new array and then set it in the gallery state and change in gallery cause render to slide 3 and hence our change is visible . Agar hum yeh fetch nahi chalate toh db me toh delete ho jaata but as no change in gallery state Hence UI does not re-render and ui par show hi nahi karta untill we reload.