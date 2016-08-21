import React from 'react'
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router'

class TutorialsList extends React.Component {

    constructor(props){
        super(props);
        this.state = {loading: true};
    }

    getAjaxData(){
        setTimeout(()=>{
            this.data = [
                {id: 0, title: '12231', desc: 'dsadsadsa56465s4a56d', user: 'layman', publish: '2016-08-20', comment: '456', read: '456988'},
                {id: 1, title: '12231', desc: 'dsadsadsa56465s4a56d', user: 'layman', publish: '2016-08-20', comment: '456', read: '456988'},
                {id: 2, title: '12231', desc: 'dsadsadsa56465s4a56d', user: 'layman', publish: '2016-08-20', comment: '456', read: '456988'}
            ];
            this.setState({loading: false});
        },3000);
    }

    componentDidMount(){
        this.getAjaxData();
    }

    render(){

        if(this.state.loading){
            return (
                <div className="article-loading">
                    <div className="la-pacman la-3x">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="container">
                    <ul className="list tutorials-list row">
                        {
                            this.data.map(function(w){
                                return (
                                    <li className="col-md-6" key={w.id}>
                                        <div className="item">
                                            <div className="media">
                                                <div className="media-heading">
                                                    <h4><Link to={`tutorials/${w.id}`}>{w.title}</Link></h4>
                                                    <div>
                                                        <Link to={`user/${w.id}`}>{w.user}</Link> 发布于 {w.publish}
                                                        评论 <a href="javascript:;">{w.comment}</a>
                                                        阅读 {w.read}
                                                    </div>
                                                </div>
                                                <div className="media-left">
                                                    <Link to={`tutorials/${w.id}`}>
                                                        <img className="media-object" />
                                                    </Link>
                                                </div>
                                                <div className="media-body">
                                                    <p>{w.desc}</p>
                                                </div>
                                            </div>
                                            <div className="active-box">
                                                <span className="ab-left"></span>
                                                <span className="ab-right"></span>
                                                <span className="ab-top"></span>
                                                <span className="ab-bottom"></span>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default TutorialsList;