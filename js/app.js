import React from 'react'
import {render} from 'react-dom'
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router'

import Home from './page/home.js'
import Article from './page/article.js'
import Tutorials from './page/tutorials.js'
import Note from './page/note.js'
import Detail from './page/detail.js'

const router =(
    <Router history={hashHistory}>
        <Route path="/">
            <IndexRoute component={Home} />
            <Route path="/article"  component={Article} />
            <Route path="/tutorials"  component={Tutorials} />
            <Route path="/note"  component={Note} />
            <Route path="/article/:id"  component={Detail} />
            <Route path="/tutorials/:id"  component={Detail} />
            <Route path="/note/:id"  component={Detail} />
        </Route>
    </Router>
);

render(router, document.getElementById('app'));