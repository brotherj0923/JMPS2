import { Outlet } from "react-router-dom";


function App() { 

  return (
    <div className="w-screen h-screen bg-white ">
      <Outlet />
    </div>
  );
}

export default App;