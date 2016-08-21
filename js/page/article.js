import React from 'react'
import Head from '../component/head.js'
import Foot from '../component/foot.js'
import ArticleList from '../component/article.list.js'

class Article extends React.Component {
    render(){
        console.log(this.props);
        return (
            <div>
                <div className="content-head">{<Head />}</div>
                <div className="content-box">{<ArticleList />}</div>
                <div className="content-foot">{<Foot />}</div>
            </div>
        )
    }
}

export default Article;