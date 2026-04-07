import {useState} from "react";
import type{ReactNode} from "react";
import {GalleryContext} from './GalleryContext'

type ComponentType = {
  id: string;
  prompt: string;
  code: string;
  title: string;
};


// provider
const GalleryContextProvider = ({ children }: { children: ReactNode }) => {
  const [gallery, setgallery] = useState<ComponentType[]>([]);

  return (
    <GalleryContext.Provider value={{ gallery, setgallery }}>
      {children}
    </GalleryContext.Provider>
  );
};

export default GalleryContextProvider;