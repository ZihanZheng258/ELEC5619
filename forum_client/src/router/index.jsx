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
import UserInfo from '../pages/User/userInfo/index'
import Comment from '../pages/User/comment/index'
import Notice from '../pages/User/notice/index'
import Setting from '../pages/User/settings/index'
//User Notes
import OwnedNote from '../pages/User/note/owned'
import WishlistNote from '../pages/User/note/wishlist'
import PublishedNote from '../pages/User/note/published'
import NoteEdit from "../pages/User/note/noteEdit";
import NotePost from "../pages/User/note/notePost";

//User Discussions
import MyDiscussions from "../pages/User/discussion/post";
import DiscussionLiked from "../pages/User/discussion/like";
import DiscussionPost from "../pages/User/discussion/discussionPost";
import DiscussionEdit from "../pages/User/discussion/discussionEdit";



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
                    {/*Note*/}
                    <Route path={"publishedNotes"} element={<RouteGuard><PublishedNote/></RouteGuard>}/>
                    <Route path={"myNotes"} element={<RouteGuard><OwnedNote/></RouteGuard>}/>
                    <Route path={"notesWishlist"} element={<RouteGuard><WishlistNote/></RouteGuard>}/>
                    <Route path={"editNote/:id"} element={<RouteGuard><NoteEdit/></RouteGuard>}/>
                    <Route path={"postNote"} element={<RouteGuard><NotePost/></RouteGuard>}/>


                    {/*Discussion*/}
                    <Route path={"myDiscussions"} element={<RouteGuard><MyDiscussions/></RouteGuard>}/>
                    <Route path={"discussionLiked"} element={<RouteGuard><DiscussionLiked/></RouteGuard>}/>
                    <Route path={"editDiscussion/:id"} element={<RouteGuard><DiscussionEdit/></RouteGuard>}/>
                    <Route path={"postDiscussion"} element={<RouteGuard><DiscussionPost/></RouteGuard>}/>



                    <Route path='myProfile' element={<RouteGuard><UserInfo /></RouteGuard>} />
                    <Route path='comment' element={<RouteGuard><Comment /></RouteGuard>} />
                    <Route path='notice' element={<RouteGuard><Notice /></RouteGuard>} />
                    <Route path='setting' element={<RouteGuard><Setting /></RouteGuard>} />
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
                <Route path="/notes/category/:category" element={
                    <RouteGuard>
                        <Note />
                    </RouteGuard>
                }></Route>
                <Route path="/login" element={
                    <Login />
                }></Route>
                <Route path="/register" element={
                        <Register />
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