import {createContext} from 'react';

type ShowPasswordContextType = {
  showPassword : boolean,
  setshowPassword :React.Dispatch<React.SetStateAction<boolean>> 
}

export const ShowPasswordContext = createContext<ShowPasswordContextType | null>(null);