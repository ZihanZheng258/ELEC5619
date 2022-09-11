import React from "react"
import {NavLink} from "react-router-dom";
import {ExternalLink} from "react-external-link";
import "./style.less"

const BottomNav = () =>{
    return(
        <div className="nav-footer">

            <div className="footer_contents">

                <div className="contents">
                    <figure>
                        <img src={require("./assets/USYD_logo.png")} alt="logo" width="200"/>
                    </figure>
                    <p className="contents_contents">
                        Notepile USYD Student Forum: <br/>
                        The forum provide a communicate platform for the <br/> students of University of Sydney
                    </p>
                </div>


            </div>
                <div className="notepile_links">
                    <div>
                        <p>Quick Links</p>
                        <ul>
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to ="/notes">Notes</NavLink></li>
                            <li><NavLink to="/user/:{userID}">Account</NavLink></li>
                            <li><NavLink to="/discussion">Discussion</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="uni_links">
                    <p>Uni Links</p>
                    <ul>
                        <li>
                            <ExternalLink href="https://canvas.sydney.edu.au/">
                            <span>Canvas</span>
                            </ExternalLink>
                        </li>
                        <li>
                            <ExternalLink href="https://timetable.sydney.edu.au/even/student">
                                <span>Allocate+</span>
                            </ExternalLink>
                        </li>
                        <li>
                            <ExternalLink href="https://myuni.sydney.edu.au/">
                                <span>myUni Portal</span>
                            </ExternalLink>
                        </li>
                        <li>
                            <ExternalLink href="https://cusp.sydney.edu.au/">
                                <span>Course & Unit of Study Portal</span>
                            </ExternalLink>
                        </li>


                    </ul>
                </div>

            </div>
    )
}

export default BottomNav