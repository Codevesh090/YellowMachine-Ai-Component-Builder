import { createContext } from "react";

type ComponentType = {
  id: string;
  prompt: string;
  code: string;
  title: string;
  createdAt:number
};

type GalleryContextType = {
  gallery: ComponentType[];
  setgallery: React.Dispatch<React.SetStateAction<ComponentType[]>>;
};

export const GalleryContext = createContext<GalleryContextType | null>(null);