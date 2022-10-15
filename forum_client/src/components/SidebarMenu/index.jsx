import React from "react";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import './index.less'
import '../../fonts/bptypewrite.damaged-italic.otf'
import {SettingOutlined} from "@ant-design/icons";
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import  api from "../../api"
import Geolocation from 'ol/Geolocation';
import View from "ol/View"
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import axios from "axios";


const SidebarMenu = ()=>{
    const [isNotesActive, setNotesIsActive] = useState(false);
    const [weather, setWeather] = useState('')
    const [location, setLocation] = useState('')
    const axios = require("axios");

    const options = {
        method: 'GET',
        url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/',
        headers: {
            'X-RapidAPI-Key': 'b794479549mshca26bdcf7583ae1p1ea069jsn56c6c989077b',
            'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
        }
    };


    useEffect(()=>{
        api.getWeather()
            .then((response)=>{
                setWeather(response.data.data.weather)
            })
        axios.request(options).then(function (response) {
            console.log(response.data);
            setLocation(response.data.city)
        }).catch(function (error) {
            console.error(error);
        });


    })


    return(
        <div className="sideBar">

            <div className="navList">
                <div className="announcement">
                    <Link to={"/discussion/category/announcement"}>
                        <div className={"accountSettingBtn"}>
                            <CampaignOutlinedIcon/>
                            <span>
                                Announcement
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="Category">
                    <ul>
                        <li>
                            <Link to={"/"}>
                                All
                            </Link>
                        </li>
                        <li>
                            <Link to={"/discussion/category/life"}>
                                Life
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname:"/discussion/category/entertainment",state:{category: "entertainment"}}}>
                                Entertainment
                            </Link>
                        </li>

                        {/*Notes*/}
                        <li onClick={(e)=>setNotesIsActive(!isNotesActive)}>
                            <Link to="">
                                Notes
                            </Link>
                        </li>

                        {isNotesActive && (
                            <ul>
                                <li>
                                    <Link to="/notes">
                                        All
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{pathname:"/notes/category/Art and social sciences",state:{category: "Art and social sciences"}}}>
                                        Art and social sciences
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{pathname:"/notes/category/Engineering",state:{category: "Engineering"}}}>
                                        Engineering
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{pathname:"/notes/category/Medicine and health",state:{category: "Medicine and health"}}}>
                                        Medicine and health
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{pathname:"/notes/category/Science",state:{category: "Science"}}}>
                                        Science
                                    </Link>
                                </li>
                                {/*<li>*/}
                                {/*    <Link to={{pathname:"/notes/category/Architecture, design and planning",state:{category: "Architecture, design and planning"}}}>*/}
                                {/*        Architecture, design and planning*/}
                                {/*    </Link>*/}
                                {/*</li>*/}
                                <li>
                                    <Link to={{pathname:"/notes/category/Business",state:{category: "Business"}}}>
                                        Business
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{pathname:"/notes/category/Law",state:{category: "Law"}}}>
                                        Law
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{pathname:"/notes/category/Music",state:{category: "Music"}}}>
                                        Music
                                    </Link>
                                </li>


                            </ul>
                        )}


                        {/*Our Uni*/}
                        <li>
                            <Link to={"/discussion/category/uni"}>
                                Our Uni
                            </Link>
                        </li>
                    </ul>
                </div>


            </div>

            <div className={"weatherLocation"}>
                <div className={"location"}>
                    Current Location: {location}
                </div>
                <div className={"weather"}>
                    Weather (Sydney): {weather}
                </div>
            </div>

            <div className="setting">
                <Link to={"/user/myProfile"}>
                    <div className={"accountSettingBtn"}>
                        <SettingOutlined/>
                        <span>Settings</span>
                    </div>

                </Link>
            </div>
        </div>
    )
}

export default SidebarMenu