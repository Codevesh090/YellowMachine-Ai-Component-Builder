import {createContext} from 'react';

type CodePreviewContextType = {
  codePreview:boolean,
  setcodePreview:React.Dispatch<React.SetStateAction<boolean>>
}


export const CodePreviewContext = createContext<CodePreviewContextType|null>(null);