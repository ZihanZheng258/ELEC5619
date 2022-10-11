import React from "react"
import {NavLink} from "react-router-dom";
import {ExternalLink} from "react-external-link";
import "./index.less"

const BottomNav = () =>{
    return(
        <div className="nav-footer">

            <div className="footer_contents">

                <div className="contents">
                    <figure>
                        <NavLink to="/">
                            <img src={require("./assets/USYD_logo.png")} alt="logo" width="200"/>

                        </NavLink>

                    </figure>
                    <p className="contents_contents">
                        Notepile USYD Student Forum: <br/>
                        The forum provide a communicate platform for the <br/> students of University of Sydney
                    </p>
                </div>


            </div>
                <div className="notepile_links">
                    <div>
                        <dl>
                            <dt>Quick Links</dt>
                            <dd><NavLink to="/">Home</NavLink></dd>
                            <dd><NavLink to ="/notes">Notes</NavLink></dd>
                            <dd><NavLink to="/user/:{userID}">Account</NavLink></dd>
                            <dd><NavLink to="/discussion">Discussion</NavLink></dd>
                        </dl>
                    </div>
                </div>
                <div className="uni_links">
                    <dl>
                        <dt>Uni Links</dt>
                        <dd>
                            <ExternalLink href="https://canvas.sydney.edu.au/">
                                <span>Canvas</span>
                            </ExternalLink>
                        </dd>
                        <dd>
                            <ExternalLink href="https://timetable.sydney.edu.au/even/student">
                                <span>Allocate+</span>
                            </ExternalLink>
                        </dd>
                        <dd>
                            <ExternalLink href="https://myuni.sydney.edu.au/">
                                <span>myUni Portal</span>
                            </ExternalLink>
                        </dd>
                        <dd>
                            <ExternalLink href="https://cusp.sydney.edu.au/">
                                <span>Course & Unit of Study Portal</span>
                            </ExternalLink>
                        </dd>
                    </dl>
                </div>

            </div>
    )
}

export default BottomNav