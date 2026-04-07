import {useState, type ReactNode} from 'react';
import {CodePreviewContext} from './CodePreviewContext'

type Prop = {
  children:ReactNode
}

const CodePreviewContextProvider = ({children}:Prop) => {
  const [codePreview, setcodePreview] = useState(false);
  return (
    <CodePreviewContext.Provider value={{codePreview,setcodePreview}}>
      {children}
    </CodePreviewContext.Provider>
  )
}

export default CodePreviewContextProvider