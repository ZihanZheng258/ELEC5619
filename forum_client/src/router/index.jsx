import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from '../pages/Home'
import User from '../pages/User'
import Note from '../pages/Note'
import Discussion from '../pages/Discussion'
import HeadingNav from "../components/HeadingNav";
import BottomNav from "../components/BottomNav";
import SidebarMenu from "../components/SidebarMenu";


const AppRouter = () =>{
    return(
        <BrowserRouter>
            <HeadingNav/>
            <SidebarMenu/>
            <BottomNav/>
            <Routes>
                {/*In V6, you can't use the component prop anymore. It was replaced in favor of element:*/}
                <Route exact path="/" element={<Home/>}></Route>
                <Route path="/user" element={< User/>}></Route>
                <Route path="/note" element={< Note/>}></Route>
                <Route path="/discussion" element={<Discussion/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter