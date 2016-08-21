import React from 'react'
import {Router, Route, Link, hashHistory} from 'react-router'
import Head from '../component/head.js'
import Foot from '../component/foot.js'
import DetailContent from '../component/detail.content.js'
import DetailForm from '../component/detail.form.js'
import DetailComment from '../component/detail.comment.js'

class Detail extends React.Component {
    render(){
        return (
            <div>
                <div className="content-head">{<Head />}</div>
                <div className="content-box">
                    <div className="container">
                        {<DetailContent />}
                        <div className="article-form">
                            <h2 className="comment-title">评论</h2>
                            <div className="comment-form">{<DetailForm />}</div>
                        </div>
                        <div className="article-comment">{<DetailComment />}</div>
                    </div>
                </div>
                <div className="content-foot">{<Foot />}</div>
            </div>
        );
    }
}

export default Detail;