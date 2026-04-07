import {useState, type ReactNode} from 'react'
import {SaveLoadingContext} from './SaveLoadingContext'

type Props = {
  children:ReactNode
}

const SaveLoadingContextProvider = (props:Props) => {
  const [saveLoading, setsaveLoading] = useState(false);
  return (
    <SaveLoadingContext.Provider value={{saveLoading,setsaveLoading}}>
      {props.children}
    </SaveLoadingContext.Provider>
  )
}

export default SaveLoadingContextProvider