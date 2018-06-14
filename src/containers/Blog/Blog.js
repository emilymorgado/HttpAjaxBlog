import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import Post from './FullPost/FullPost';
import './Blog.css';

class Blog extends Component {
  render () {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li><NavLink
                to='/'
                exact
                activeClassName='my-active'
                activeStyle={{
                  color: '#fa923f',
                  textDecoration: 'underline'
                }}>Home</NavLink></li>
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
        <Route path='/' render={() => <h1>Home 2</h1>} /> */}
        <Route path='/' exact component={Posts} />
        <Route path='/new-post' component={NewPost} />
        <Route path='/:id' exact component={Post} />
      </div>
      );
    }
}

export default Blog;



{/* <section>
    <FullPost id={this.state.selectedPostId}/>
</section>
<section>
    <NewPost />
</section> */}
