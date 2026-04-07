import {useState, type ReactNode} from 'react'
import {GenerationStateContext} from './GenerationStateContext'
import type{GenerationState} from './GenerationStateContext'

type Prop = {
  children:ReactNode
}

const GenerationStateContextProvider = (props:Prop) => {
  const [generationState, setgenerationState] = useState<GenerationState>({status:'idle'})
  return (
    <GenerationStateContext.Provider value={{generationState,setgenerationState}}>
      {props.children}
    </GenerationStateContext.Provider>
  )
}

export default GenerationStateContextProvider