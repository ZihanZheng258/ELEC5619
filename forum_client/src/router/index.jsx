import { React, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import Login from '../pages/Login/index'
import Home from '../pages/Home'
import Discussion from "../pages/Discussion";
import DiscussionDetail from '../pages/DiscussionDetailPage'
import Note from '../pages/Note'
import NoteDetailPage from "../pages/NoteDetailPage";
import Search from '../pages/Search'
import Register from '../pages/Register/index'
import FourZeroFour from '../pages/ErrorPage/page_404'
import FourZeroThree from '../pages/ErrorPage/page_403'
import FiveZeroZero from '../pages/ErrorPage/page_500'

// router guard
import RouteGuard from '../components/RouteGuard'
import setAuthToken from '../pages/Login/setAuthToken'
import api from '../api'

import User from '../pages/User'
import PostLike from './../pages/User/posts/like'
import PostSent from './../pages/User/posts/sent'
import UserInfo from '../pages/User/userInfo/index'
import Comment from '../pages/User/comment/index'
import Notice from '../pages/User/notice/index'
import Setting from '../pages/User/settings/index'
import NoteLike from './../pages/User/note/like'
import NoteSent from './../pages/User/note/sent'
import NoteBuy from './../pages/User/note/buy'
import NoteHave from './../pages/User/note/hava'




const AppRouter = () => {
    //check jwt token
    const [authOK, setAuthOK] = useState(false);
    useEffect(() => {
        api.getSelf().then((response) => {
            setAuthOK(response.data.flag)
        })

        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token);
            console.log('auth runned login')
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                {/*In V6, you can't use the component prop anymore. It was replaced in favor of element:*/}

                <Route
                    exact
                    path='/'
                    element={
                        <RouteGuard>
                            <Home />
                        </RouteGuard>
                    }
                ></Route>

                <Route
                    path='/user'
                    element={
                        <RouteGuard>
                            <User />
                        </RouteGuard>
                    }
                >
                    <Route exact path='notelike' element={<NoteLike />} />
                    <Route path='notesent' element={<NoteSent />} />
                    <Route path='notebuy' element={<NoteBuy />} />
                    <Route path='notehave' element={<NoteHave />} />
                    <Route exact path='postlike' element={<PostLike />} />
                    <Route path='postsent' element={<PostSent />} />
                    <Route path='*' element={<PostLike />} />
                    <Route path='userinfo' element={<UserInfo />} />
                    <Route path='comment' element={<Comment />} />
                    <Route path='notice' element={<Notice />} />
                    <Route path='setting' element={<Setting />} />
                </Route>

                <Route
                    path='/search/:type/:searchContent/:page'
                    element={
                        <RouteGuard>
                            <Search />
                        </RouteGuard>
                    }
                ></Route>

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

                {/*<Route path="/discussion:id" element={<DiscussionDetail />}></Route>*/}
                <Route path='/page_404' element={<FourZeroFour />}></Route>
                <Route path='/page_403' element={<FourZeroThree />}></Route>
                <Route path='/page_500' element={<FiveZeroZero />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter