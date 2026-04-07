import {createContext} from 'react';

type ApiKeyValueContextType = {
  apiKeyValue:string,
  setapiKeyValue:React.Dispatch<React.SetStateAction<string>>
}

export const ApiKeyValueContext = createContext<ApiKeyValueContextType | null>(null);