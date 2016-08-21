import React from 'react'
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router'

class Foot extends React.Component {
    render(){
        return (
            <div className="footer">
                <a href="https://github.com/yuqichao/lumpish" target="_blank" >·GitHub For Lumpish</a> ·E-mail: 447338341@qq.com
            </div>
        )
    }
}

export default Foot;