import {useState, type ReactNode} from 'react'
import {ApiKeyValueContext} from './ApiKeyValueContext'

type Prop = {
  children:ReactNode
}

const ApiKeyValueContextProvider = (props:Prop) => {
  const [apiKeyValue, setapiKeyValue] = useState(()=>localStorage.getItem("geminiApiKey") ?? "")
  return (
    <ApiKeyValueContext.Provider value={{apiKeyValue,setapiKeyValue}}>
      {props.children}
    </ApiKeyValueContext.Provider>
  )
}

export default ApiKeyValueContextProvider