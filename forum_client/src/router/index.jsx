import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../pages/Home'
import User from '../pages/User'
import Note from '../pages/Note'
import NoteDetailPage from '../pages/NoteDetailPage'
import NoteDetail from "../components/NoteDetail";
import Discussion from '../pages/Discussion'
import HeadingNav from "../components/HeadingNav";
import BottomNav from "../components/BottomNav";
import SidebarMenu from "../components/SidebarMenu";

import Login from "../pages/Login/index"
import Register from "../pages/Register/index"
import FourZeroFour from "../pages/ErrorPage/page_404"
import FourZeroThree from "../pages/ErrorPage/page_403"
import FiveZeroZero from "../pages/ErrorPage/page_500"
import Search from "../pages/Search";
import DiscussionDetail from "../pages/DiscussionDetailPage";

const AppRouter = () => {
    return (
        <BrowserRouter>

            <Routes>
                {/*In V6, you can't use the component prop anymore. It was replaced in favor of element:*/}
                <Route exact path="/" element={<Home />}></Route>
                <Route path="/user" element={< User />}></Route>
                <Route path="/search" element={< Search />}></Route>
                <Route path="/notes" element={< Note />}></Route>
                <Route path="/notedetail" element={< NoteDetail />}></Route>
                <Route path="/discussion" element={<DiscussionDetail />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                {/*<Route path="/discussion:id" element={<DiscussionDetail />}></Route>*/}
                <Route path="/page_404" element={<FourZeroFour />}></Route>
                <Route path="/page_403" element={<FourZeroThree />}></Route>
                <Route path="/page_500" element={<FiveZeroZero />}></Route>

                

            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter