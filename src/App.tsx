import React from 'react';
import './App.css'
import PostLIst from "./Components/PostList/PostLIst";
import {Route,Routes} from 'react-router-dom'
import Main from "./Components/Main/Main";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import CreateArticle from "./Components/CreateArticle/CreateArticle";
import SinglePage from "./Components/SinglePage/SinglePage";
import EditUser from "./Components/EditUser/EditUser";
import UpdatePost from "./Components/UpdatePost/UpdatePost";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Main/>}>
                <Route index element={<PostLIst/>}/>
                <Route path={":id"} element={<SinglePage/>}/>
                <Route path={":id/update"} element={<UpdatePost/>}/>

                <Route path={"sign-up"} element={<SignUp/>}/>
                <Route path={'edit-user'} element={<EditUser/>}/>
                <Route path={"sign-in"} element={<SignIn/>}/>
                <Route path={"create-article"} element={<CreateArticle/>}/>
            </Route>
        </Routes>
    );
}

export default App;