import React from 'react'
import {Router, Route, Link, hashHistory} from 'react-router'

class NoteList extends React.Component {
    constructor(props){
        super(props);
        this.data = [];
        this.state = {loading: true};
    }

    getAjaxData(){
        setTimeout(()=>{
            this.data = [
                {id: 0, title: '12231', desc: 'dsadsadsa56465s4a56d', user: 'layman', publish: '2016-08-20', comment: '456', read: '456988', img: '/img/default.jpg'},
                {id: 1, title: '12231', desc: 'dsadsadsa56465s4a56d', user: 'layman', publish: '2016-08-20', comment: '456', read: '456988', img: '/img/default.jpg'},
                {id: 2, title: '12231', desc: 'dsadsadsa56465s4a56d', user: 'layman', publish: '2016-08-20', comment: '456', read: '456988', img: '/img/default.jpg'}
            ];
            this.setState({loading: false});
        },3000);
    }

    componentDidMount(){
        this.getAjaxData();
        this.setState({loading: false});
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
                <div className="note-list clearfix" >
                    {
                        this.data.map(function(w){
                            return (
                                <div className="masonry-brick item" key={w.id}>
                                    <div className="item-box">
                                        <div className="item-img">
                                            <div className="img-size"><img src={w.img} /></div>
                                        </div>
                                        <div className="item-info">
                                            <h4><Link to={`note/${w.id}`}>{w.title}</Link></h4>
                                            <p className="clearfix"><span>{w.user}</span><span>{w.publish}</span></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="la-ball-beat la-2x">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default NoteList;