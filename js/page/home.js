import React from 'react'
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router'

const Home = () => (
    <div className="home">
        <ul className="directive-box">
            <li className="dir-article">
                <Link to="article"><span>文章</span></Link>
            </li>
            <li className="dir-demo">
                <Link to={`demo/${name}`} ><span>示例</span></Link>
            </li>
        </ul>
        <div className="home-bg"></div>
    </div>
);

export default Home;