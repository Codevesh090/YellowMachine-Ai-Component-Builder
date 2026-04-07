import {useState} from 'react';
import type{ReactNode} from 'react'
import {ShowPasswordContext} from './ShowPasswordContext'

type Props = {
  children : ReactNode
}

const ShowPasswordContextProvider = (props:Props) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <ShowPasswordContext.Provider value={{showPassword,setshowPassword}}>
     {props.children}
    </ShowPasswordContext.Provider>
  )
}

export default ShowPasswordContextProvider