import "./App.css";
import Posts from "./components/Posts";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Header from './components/Header';
import Login from "./components/login";
import Logout from "./components/logout";
import SinglePost from "./components/SinglePost";
function App() {
  return (
    <div className="App">
    <Header/>

      <Routes>
        
        <Route path="/" element={<Posts />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login/>} />
        <Route path="logout" element={<Logout/>} />
        <Route path="post/:slug" element={<SinglePost/>} />

      </Routes>
    </div>
  );
}

export default App;
