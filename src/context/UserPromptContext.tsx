import {createContext} from 'react'

type UserPromptContextType = {
  userPrompt:string,
  setuserPrompt:React.Dispatch<React.SetStateAction<string>>
}

export const UserPromptContext = createContext<UserPromptContextType | null>(null);

//yaha jo bhi hum createContext ke andar () me dete hai like we gave here either "UserPromptContextType" hoga yaa "null" .
//Toh yeh value={{userPrompt,setuserPrompt}} iske according banaya jaata hai .