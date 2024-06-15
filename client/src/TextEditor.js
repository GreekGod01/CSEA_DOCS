import React, { useCallback, useEffect , useState, useRef} from 'react'
import Quill from "quill" ;
import "quill/dist/quill.snow.css" ;    //stylesheet comes inbuilt from quill 
import { io } from "socket.io-client"
import { useParams } from 'react-router';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

const SAVE_INTERVAL_MS = 2000

export default function TextEditor() {
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const {id: documentId} = useParams()
  useEffect(()=>{
    if (socket == null || quill == null) return
    socket.emit("get-document", documentId)

    socket.once( "load-document" , document =>{
      quill.setContents(document)
      quill.enable()
    })
  } , [socket , quill, documentId] )
  useEffect(()=>{
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document" , quill.getContents() )
      
    }, SAVE_INTERVAL_MS);

  }, [socket, quill])


  useEffect( ()=>{
    const s  = io("http://localhost:3001" , {
      transports: ["websocket"], // Force WebSocket transport
      reconnectionAttempts: 5, // Try to reconnect 5 times
    })

    // console.log(s.connected);
    console.log("here",s)
    setSocket(s)
  
    // s.emit("message", "hi")
    // return ()=>{s.disconnect()}


  } , [])
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])


  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      console.log(delta) ; 
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])


  const wrapperRef = useCallback( wrapper=>{
    if(wrapper== null) return ""
    wrapper.innerHTML = ""
    const editor  = document.createElement("div") ;
    wrapper.append(editor);
    const q = new  Quill(editor , {theme: "snow" , modules :{
      toolbar : TOOLBAR_OPTIONS 
    } } ) //quill doesnt work like a react component . So we instantiate a selector to be our new text editor object
    q.disable();
    q.setText("Loading...")
    setQuill(q); 

  } , [])
   
  return (
    <div className = "container" ref = {wrapperRef}>
    </div>
  )
}
