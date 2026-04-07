import {useState} from 'react';
import type { ReactNode } from 'react';
import {ApiKeyDraftContext} from './ApiKeyDraftContext'

type Props = {
  children: ReactNode;
};

const ApiKeyDraftContextProvider = (props:Props) => {
  const [apiKeyDraft, setapiKeyDraft] = useState("");
  return (
    <ApiKeyDraftContext.Provider value={{apiKeyDraft,setapiKeyDraft}}>
    {props.children}
    </ApiKeyDraftContext.Provider>
  )
}

export default ApiKeyDraftContextProvider