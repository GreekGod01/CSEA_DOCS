import React, { useCallback, useEffect , useRef} from 'react'
import Quill from "quill" ;
import "quill/dist/quill.snow.css" ;    //stylesheet comes inbuilt from quill 


export default function TextEditor() {
  const wrapperRef = useCallback( wrapper=>{
    if(wrapper== null) return ""
    wrapper.innerHTML = ""
    const editor  = document.createElement("div") ;
    wrapper.append(editor);
    new  Quill(editor , {theme: "snow" } ) //quill doesnt work like a react component . So we instantiate a selector to be our new text editor object


  } , [])
   
  return (
    <div className = "container" ref = {wrapperRef}>
    </div>
  )
}
