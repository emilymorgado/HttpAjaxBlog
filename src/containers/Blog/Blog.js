import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';
// We no longer want this fully loaded, we're replacing it with asyncComponent

const AsyncNewPost = asyncComponent(() => {
  // dynamic import, will replace NewPost in <Route>
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true,
  }

  render () {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li><NavLink
                to='/posts'
                exact
                activeClassName='my-active'
                activeStyle={{
                  color: '#fa923f',
                  textDecoration: 'underline'
                }}>Home/Posts</NavLink></li>
              {/* <li><NavLink to='/new-post'>New Post</NavLink></li> */}
              {/* Cool things you can do with Link!  */}
                <li><NavLink to={{
                pathname: '/new-post',
                // pathname: this.props.match.url + '/new-post', //You can build a relative path
                hash: '#submit',
                search: '?quick-submit=true'
              }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>

        {/* // The first route will only render if the visiting the exact path
        // The second route will render for any path starting with that
        <Route path='/' exact render={() => <h1>Home</h1>} />
        <Route path='/' render={() => <h1>Home 2</h1>} />
        <Route path='/posts/:id' exact component={FullPost} />
        Use Switch when you only want one route loaded at a time
        The ternary condition checks whether or not a user is allowed to access a page
        Code Splitting && Lazy Loading is loading only what you need, nothing more */}
        <Switch>
          {this.state.auth ? <Route path='/new-post' component={AsyncNewPost} /> : null}
          <Route path='/posts' component={Posts} />
          <Route render={() => <h1>Route Not Found</h1>} />
          {/* <Redirect from='/' to='/posts' /> */}
          {/* <Route path='/' component={Posts} />  // This is a alertative to Redirect*/}
        </Switch>
      </div>
      );
    }
}

export default Blog;
