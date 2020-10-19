import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import BlogDetails from './components/BlogDetails/BlogDetails';
import Blogs from './components/Blogs/Blogs';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import UserBlogs from './components/UserBlogs/UserBlogs';
import Users from './components/Users/Users';


function App() {
  // const [{ }, dispatch] = useStateValue();
  const [loggedUser, setloggedUser] = useState('')
  useEffect(() => {

    // if (authUser) {
    // dispatch({
    //   type: 'SET_USER',
    //   user: authUser
    // })
    setloggedUser(localStorage.length > 0 ? localStorage.getItem('userName') : '')
    if (localStorage.length < 0) {
      localStorage.removeItem("userName")
    }
    // } else {
    // dispatch({
    //   type: 'SET_USER',
    //   user: null
    // })

    // }

    return () => {

    }
  }, [])

  return (
    <Router>
      <div className="app">
        <div className="app__body">
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>

            <Route path='/users'>
              <Header />
              <Users />
            </Route>
            <Route path='/blogs'>
              <Header />
              <Blogs />
            </Route>
            <Route path="/blog/:id">
              <Header />
              <BlogDetails />
            </Route>
            <Route path="/user/:id">
              <Header />
              <UserBlogs />
            </Route>
          </Switch>
          <Route path='/home'>
            <Header />
            <Home />
          </Route>
          {/* <Route path='/'>
            <Header />
            <Home />
          </Route> */}

        </div>
      </div>
    </Router>
  );
}

export default App;
