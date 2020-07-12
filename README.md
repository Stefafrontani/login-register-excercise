Flow:

1- Try to access `localhost:3000`
2- App will render app.js
3- In the return (inside app.js), the router will try to match rooutes in order:

```
  <Route path="/login" component={LoginPage} />
  <Route path="/register" component={RegisterPage} />
  <PrivateRoute ... >
```

Finally entering to the PrivateRoute component

4- PrivateRoute component will look for a user inside the (localStorage)
5a- Does not find it
6a- Push another url - /login.
7a- The callback inside the .listen(callback) will be called.
8a-
It's not coming from `/login` -> location !== `/login`
Its coming from home `/` -> locationg.state.from.pathname === `/`
9a- SetState({ redirectedToLogin })
10a- Component Render called again
11a- Route path="/login" is matched
LOGIN PROCESS

5b- Does find it
6a- Returns the Home component
HOME COMPONENT
7a- Show some information and logout feature
LOGOUT PROCESS

LOGIN PROCESS
1- You are on `/login` url
2- Fill up fields
3- Send - Calls this.props.login(username, password)
4- It dispatch request action to make the reducer to know we are doing this login process (to show spinner for example)
5- Called user service: This is made to make the api called and handle an !ok response (i.e.: There was not an network error)
5- Do the request
6a- It works (passed authentication)

6b- It does not work

LOGOUT PROCESS
1- Press button logout
2- Called function clearSesssion
3- Calling cleanSession will do these things:
Preventdefault -- bleh
call logout action => clean user from reducer
history.push('/login') -> Change url to login
LOGIN PROCESS AGAIN
