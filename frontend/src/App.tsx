import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Context from "./Context";
import Login from "./routes/Login";
import Home from "./routes/Home";

function App() {
  const prov = useContext(Context);
  if(!prov.login) {
    return(
      <Routes>
        <Route path="*" element={<Login/>}/>
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="*" element={<Login/>}/>
      <Route path="/home"element={<Home/>}/>
    </Routes>
  )
}

export default App
