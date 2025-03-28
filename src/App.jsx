import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
function App() {

  return (
    <div className = "min-h-screen w-full flex flex-col">
      <Navbar/>
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  )
}

export default App
