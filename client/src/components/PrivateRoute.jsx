import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({children, ...rest}) {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem('access_token')) {
          return children
        } else {
          return <Redirect to="/login" />
        }
      }}
    />
  )
};

export function LoginAndRegisterRoute({children, ...rest}) {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem('access_token')) {
          return <Redirect to="/home" />
        } else {
          return children
        }
      }}
    />
  )
};