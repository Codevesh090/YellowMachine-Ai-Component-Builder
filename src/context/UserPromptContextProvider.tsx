import {useState} from 'react';
import type{ReactNode} from 'react';
import {UserPromptContext} from './UserPromptContext'

type Props ={
  children:ReactNode //React Node hone ka matlab koi react me bana hua function hai like "<App.tsx />"
}

const UserPromptContextProvider = (prop:Props) => {
  const [userPrompt, setuserPrompt] = useState("")
  return (
    <UserPromptContext.Provider value={{userPrompt,setuserPrompt}}>
      {prop.children}
    </UserPromptContext.Provider>
  )
}

export default UserPromptContextProvider

//Jab hum context create karte hai toh Context create karne ke baad hi hume contextProvider ka access milta hai uske through