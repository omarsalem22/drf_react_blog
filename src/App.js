import "./App.css";
import Posts from "./components/Posts";
import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Header from './components/Header';
import Login from "./components/login";
import Logout from "./components/logout";
import SinglePost from "./components/SinglePost";
import Search from "./components/search";
import AdminPosts from "./components/admin";
import CreatePost from "./components/admin/create";
import EditPost from "./components/admin/editPost";
import DeletePost from "./components/admin/delete";
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
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<AdminPosts />} />
        <Route path="/admin/create" element={<CreatePost/>} />
        <Route path="/admin/edit/:id" element={<EditPost/>} />
        <Route path="/admin/delete/:id" element={<DeletePost/>} />





      </Routes>
    </div>
  );
}

export default App;
