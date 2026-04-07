import {createContext} from 'react';

type ApiKeyDraftContextType = {
  apiKeyDraft: string;
  setapiKeyDraft: React.Dispatch<React.SetStateAction<string>>;
};

export const ApiKeyDraftContext = createContext<ApiKeyDraftContextType | null>(null);