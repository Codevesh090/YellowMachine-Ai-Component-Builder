import {createContext} from 'react';

export type GenerationState = 
  |{status:'idle'}
  |{status:'loading'}
  |{status:'success' , code:string , prompt:string}
  |{status:'error' , message:string}
//this type of type declaration is called as "discriminated unions"


type GenerationStateContextType = {
  generationState:GenerationState
  setgenerationState:React.Dispatch<React.SetStateAction<GenerationState>>
}

export const GenerationStateContext = createContext<GenerationStateContextType|null>(null);