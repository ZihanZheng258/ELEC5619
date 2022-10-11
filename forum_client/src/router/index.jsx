import {React, useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import Login from "../pages/Login/index";
import Register from "../pages/Register/index";

import Home from "../pages/Home";
import Search from "../pages/Search";
import User from "../pages/User";
import Note from "../pages/Note";
import Discussion from "../pages/Discussion";
import DiscussionDetail from "../pages/DiscussionDetailPage";

import NoteDetailPage from "../pages/NoteDetailPage";
import FourZeroFour from "../pages/ErrorPage/page_404";
import FourZeroThree from "../pages/ErrorPage/page_403";
import FiveZeroZero from "../pages/ErrorPage/page_500";
import MyPosts from "../pages/MyPosts";
// router guard authentication
import RouteGuard from "../components/RouteGuard";
import setAuthToken from "../pages/Login/setAuthToken";
import api from "../api"

const AppRouter = () => {
//check jwt token
    const [authOK, setAuthOK] = useState(false);
    useEffect(() => {
        api.getSelf()
            .then((response)=>{
                setAuthOK(response.data.flag)
            })

        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
            console.log('auth runned login')
        }

    }, []);



    return (
        <BrowserRouter>
            <Routes>
                {/*In V6, you can't use the component prop anymore. It was replaced in favor of element:*/}

                <Route exact path="/" element={
                    <RouteGuard>
                        <Home/>
                    </RouteGuard>
                }></Route>

                <Route path="/user" element={
                    <RouteGuard>
                        < User />
                    </RouteGuard>}></Route>

                <Route path="/search/:type/:searchContent/:page" element={
                    <RouteGuard>
                    < Search />
                    </RouteGuard>
                }></Route>

                <Route path="/notes" element={
                    <RouteGuard>
                    < Note />
                    </RouteGuard>
                }></Route>

                <Route path="/note/:id" element={
                    <RouteGuard>
                    < NoteDetailPage />
                    </RouteGuard>
                }></Route>


                <Route path="/discussion/:id" element={
                    <RouteGuard>
                    <DiscussionDetail />
                    </RouteGuard>
                }></Route>

                <Route path="/discussion/category/:category" element={
                    <RouteGuard>
                    <Discussion />
                    </RouteGuard>
                }></Route>

                <Route path="/login" element={
                    <Login />
                }></Route>
                <Route path="/register" element={
                    <RouteGuard>
                        <Register />
                    </RouteGuard>
                }></Route>
                <Route path="/myPosts" element={
                        <RouteGuard>
                            <MyPosts />
                        </RouteGuard>
                    }></Route>
                {/*<Route path="/discussion:id" element={<DiscussionDetail />}></Route>*/}
                <Route path="/page_404" element={<FourZeroFour />}></Route>
                <Route path="/page_403" element={<FourZeroThree />}></Route>
                <Route path="/page_500" element={<FiveZeroZero />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter