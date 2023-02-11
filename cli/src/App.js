import './App.css';
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import IndexPage from './Components/pages/IndexPages';
import LoginPage from './Components/pages/LoginPage';
import RegisterPage from './Components/pages/RegisterPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Le contenu de "element" est dans "<Outlet/>" */}
        <Route index element={ <IndexPage/> }/>
        <Route path={'/login'} element={ <LoginPage/> } />
        <Route path={'/register'} element={ <RegisterPage/> } />
      </Route>
    </Routes>

    
  );
}

export default App;
