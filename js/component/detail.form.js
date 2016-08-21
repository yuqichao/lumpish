import React from 'react'
import {Router, Route, Link, hashHistory} from 'react-router'

class DetailForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            submit: false,
            btn: '',
            nickname: {
                success: '',
                error: ''
            },
            content: {
                success: '',
                error: ''
            }
        };
    }

    submitComment(e){
        e.preventDefault();

        if(this.state.submit) return;

        let validContent = this.handleContent();
        let validNickname = this.handleNickname();
        let res = validContent && validNickname;
        console.log(res);
        if(res){
            this.setState({submit: true, btn: 'active'});
        }
        setTimeout(()=>{
            this.setState({submit: false, btn: ''});
        },2000)
    }

    handleNickname(e){
        console.log();
        let val = this.refs.nickname.value;
        let match = /[\w|\u4e00-\u9fa5]{6,10}$/i;
        let res = match.test(val);
        if(res){
            this.setState({nickname: { success: 'success', error: ''} });
        }else{
            this.setState({nickname: { success: '', error: 'error'} });
        }
        return res;
    }

    handleContent(e){
        let val = this.refs.content.value;
        let match = /[\w|\u4e00-\u9fa5]{15,100}$/i;
        let res = match.test(val);
        if(res){
            this.setState({content: { success: 'success', error: ''} });
        }else{
            this.setState({content: { success: '', error: 'error'} });
        }

        return res;
    }

    render(){
        return (
            <form name="comment_form">
                <div className={`form-item ${this.state.nickname.error} ${this.state.nickname.success}`}>
                    <input type="text" className="form-control" name="nickname" placeholder="请输入昵称" ref="nickname" onChange={this.handleNickname.bind(this)} />
                    <p className={this.state.nickname.error}>请输入6-10个字的非特殊字符昵称！</p>
                    <p className={this.state.nickname.success}><span className="glyphicon glyphicon-ok"></span></p>
                </div>
                <div className={`form-item ${this.state.content.error} ${this.state.content.success}`}>
                    <textarea className="form-control" name="content" placeholder="请输入评论内容" ref="content" onChange={this.handleContent.bind(this)}></textarea>
                    <p className={this.state.content.error}>请输入15-100个字以内的评论！</p>
                    <p className={this.state.content.success}><span className="glyphicon glyphicon-ok"></span></p>
                </div>
                <div className="form-item clearfix">
                    <button type="submit" className={`btn-submit ${this.state.btn}`} onClick={this.submitComment.bind(this)}>
                        <span className="normal">提交</span>
                        <span className="success glyphicon glyphicon-ok" ></span>
                    </button>
                </div>
            </form>
        )
    }

}

export default DetailForm;