import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ApiKeyDraftContextProvider from './context/ApiKeyDraftContextProvider.tsx'
import UserPromptContextProvider from './context/UserPromptContextProvider.tsx'
import ShowPasswordContextProvider from './context/ShowPasswordContextProvider.tsx'
import SaveLoadingContextProvider from './context/SaveLoadingContextProvider.tsx'
import ApiKeyValueContextProvider from './context/ApiKeyValueContextProvider.tsx'
import GenerationStateContextProvider from './context/GenerationStateContextProvider.tsx'
import CodePreviewContextProvider from './context/CodePreviewContextProvider.tsx'
import GalleryContextProvider from './context/GalleryContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GalleryContextProvider>
      <CodePreviewContextProvider>
        <GenerationStateContextProvider>
          <ApiKeyValueContextProvider> 
            <SaveLoadingContextProvider>
              <ShowPasswordContextProvider>
                <UserPromptContextProvider>
                  <ApiKeyDraftContextProvider>
                    <App />
                  </ApiKeyDraftContextProvider>
                </UserPromptContextProvider>
              </ShowPasswordContextProvider>
            </SaveLoadingContextProvider>
          </ApiKeyValueContextProvider>
        </GenerationStateContextProvider>
      </CodePreviewContextProvider>
    </GalleryContextProvider>
  </StrictMode>,
)
