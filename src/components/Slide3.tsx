import { HistoryCard} from "./HistoryCard";
import { GalleryContext } from "../context/GalleryContext";
import { useContext} from "react"


const Slide3 = () => {
  const galleryContext = useContext(GalleryContext);

  return (
    <div className="h-screen flex flex-col">
      
      {/* Header (fixed inside panel) */}
      <div className="px-3 py-3 border-b border-white/10 flex items-center justify-center shrink-0">
        <span className="text-[15px] text-gray-300 font-medium bg-linear-to-l from-amber-700 to-amber-950  rounded-sm px-2 py-1">
          History
        </span>
      </div>

      {/* Scrollable container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {galleryContext?.gallery.length === 0 ? (<p className="text-xs text-gray-500 text-center mt-4">No saved components</p>) : (galleryContext?.gallery.map((component) => (<HistoryCard key={component.id} component={component} />)))}
      </div>

    </div>
  );
};

export default Slide3;

//After Setting up the Slide 2 linking with the save button then Uske baad humne Slide 3 ko setup kiya 
//Yha par humne sabse pehle ek header banaya and then humne ek scrollable container banaya using this "overflow-y-auto"
//And then usi container ke andar humne .map se conponents render kar diye <HistoryCard> and if there is no component then it shows "No saved components". 