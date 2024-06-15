import TextEditor from './TextEditor';
import { BrowserRouter as Router , Navigate , Route , Routes } from "react-router-dom";
import {v4 as uuidv4 } from "uuid"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to={`/documents/${uuidv4()}`} />} >
        </Route>
        <Route path="/documents/:id" element =  {<TextEditor />}>
         
        </Route>
      </Routes>
    </Router>
  )
}
export default App
//