import React from 'react'
import {Router, Route, Link, hashHistory} from 'react-router'
import Head from '../component/head.js'
import Foot from '../component/foot.js'
import NoteList from '../component/note.list.js'

class Note extends React.Component {
    render(){
        return (
            <div>
                <div className="content-head">{<Head />}</div>
                <div className="content-box">{<NoteList />}</div>
                <div className="content-foot">{<Foot />}</div>
            </div>
        )
    }
}

export default Note;