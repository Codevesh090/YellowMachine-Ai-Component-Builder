import {createContext} from 'react';

type SaveLoadingContext = {
  saveLoading:boolean;
  setsaveLoading:React.Dispatch<React.SetStateAction<boolean>>
}


export const SaveLoadingContext = createContext<SaveLoadingContext | null>(null);