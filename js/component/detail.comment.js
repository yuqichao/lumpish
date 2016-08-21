import React from 'react'
import {Router, Route, Link, hashHistory} from 'react-router'

class DetailComment extends React.Component {
    constructor(props){
        super(props);
        this.page = 0;
        this.max = 0;
        this.data = [];
        this.state = {loading: true};
    }

    getAjaxData(){
            this.data = [
                {
                    "id": "0",
                    "content": "0在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
                    "img": "img/person.jpg",
                    "user": "solverpeng",
                    "time": "2016-08-10 14:15"
                },
                {
                    "id": "1",
                    "content": "0在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
                    "img": "img/person.jpg",
                    "user": "solverpeng",
                    "time": "2016-08-10 14:15"
                },
                {
                    "id": "2",
                    "content": "0在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
                    "img": "img/person.jpg",
                    "user": "solverpeng",
                    "time": "2016-08-10 14:15"
                },
                {
                    "id": "3",
                    "content": "0在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
                    "img": "img/person.jpg",
                    "user": "solverpeng",
                    "time": "2016-08-10 14:15"
                },
                {
                    "id": "4",
                    "content": "0在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
                    "img": "img/person.jpg",
                    "user": "solverpeng",
                    "time": "2016-08-10 14:15"
                },
                {
                    "id": "5",
                    "content": "0在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
                    "img": "img/person.jpg",
                    "user": "solverpeng",
                    "time": "2016-08-10 14:15"
                },
                {
                    "id": "6",
                    "content": "0在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
                    "img": "img/person.jpg",
                    "user": "solverpeng",
                    "time": "2016-08-10 14:15"
                },
                {
                    "id": "7",
                    "content": "0在开发过程中，难免遇到下面这种情况：两个（或多个）对象所拥有的大多数属性是重复的，我们需要在对象间进行映射（即将一个对象的属性值赋给另一个对象。通常我们可以进行如下操作： 但若对象拥有较多属性 ...",
                    "img": "img/person.jpg",
                    "user": "solverpeng",
                    "time": "2016-08-10 14:15"
                }
            ];
            this.max = Math.ceil(this.data.length / 3);
    }

    nextPage(){
        this.page < this.max ? this.page++: this.max;
        this.getAjaxData();
    }

    prevPage(){
        this.page > 0 ? this.page--: 0;
        this.getAjaxData();
    }

    componentDidMount(){
        this.getAjaxData();
        this.setState({loading: false});
    }

    render(){

        if(this.state.loading){
            console.log('loading comment');
            return <div></div>;
        }

        return (
            <div>
                <ul className="comment-list">
                    {
                        this.data.map(function(w) {
                            return (
                                <li className="comment-item" key={w.id}>
                                    <div className="comment-user clearfix">
                                        <div className="user-img"><img src={w.img}/></div>
                                        <div className="user-name">{w.user}</div>
                                    </div>
                                    <div className="comment-content">
                                        <p>{w.content}</p>
                                        <div className="comment-time">{w.time}</div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className="pagination clearfix">
                    <li>
                        <a href="javascript:;" aria-label="Previous" onClick={this.prevPage}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="current">{this.page}</li>
                    <li>
                        <a href="javascript:;" aria-label="Next" onClick={this.nextPage}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DetailComment;