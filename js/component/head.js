import React from 'react'
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router'

class Head extends React.Component {
    render(){
        return (
            <div className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Brand</Link>
                        <button className="collapsed navbar-toggle">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="article"><span className="txt">文章</span><span className="bg"></span></Link></li>
                            <li><Link to="tutorials"><span className="txt">教程</span><span className="bg"></span></Link></li>
                            <li><Link to="note"><span className="txt">笔记</span><span className="bg"></span></Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="javascript:;"><span className="txt">登录</span><span className="bg"></span></a></li>
                            <li><a href="javascript:;"><span className="txt">注册</span><span className="bg"></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Head;