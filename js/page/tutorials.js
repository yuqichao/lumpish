import React from 'react'
import Head from '../component/head.js'
import Foot from '../component/foot.js'
import TutorialsList from '../component/tutorials.list.js'

class Tutorials extends React.Component {
    render(){
        console.log(this.props);
        return (
            <div>
                <div className="content-head">{<Head />}</div>
                <div className="content-box">{<TutorialsList />}</div>
                <div className="content-foot">{<Foot />}</div>
            </div>
        )
    }
}

export default Tutorials;