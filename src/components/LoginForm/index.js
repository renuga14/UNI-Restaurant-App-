// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'

// import './index.css'

// class LoginForm extends Component {
//   state = {
//     username: '',
//     password: '',
//     showSubmitError: false,
//     errorMsg: '',
//   }

//   onChangeUsername = event => {
//     this.setState({username: event.target.value})
//   }

//   onChangePassword = event => {
//     this.setState({password: event.target.value})
//   }

//   onSubmitSuccess = jwtTkoken => {
//     const {history} = this.props

//     Cookies.set('jwt_token', jwtTkoken, {
//       expires: 30,
//       path: '/',
//     })
//     history.replace('/')
//   }

//   onSubmitFailure = errorMsg => {
//     console.log(errorMsg)
//     this.setState({showSubmitError: true, errorMsg})
//   }

//   submitForm = async event => {
//     event.preventDefault()
//     const {username, password} = this.state
//     const userDetails = {username, password}
//     const url = 'https://apis.ccbp.in/login'
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(userDetails),
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     if (response.ok === true) {
//       this.onSubmitSuccess(data.jwt_token)
//     } else {
//       this.onSubmitFailure(data.error_msg)
//     }
//   }

//   renderPasswordField = () => {
//     const {password} = this.state
//     return (
//       <>
//         <label className="input-label" htmlFor="password">
//           PASSWORD
//         </label>
//         <input
//           type="password"
//           id="password"
//           className="password-input-filed"
//           value={password}
//           onChange={this.onChangePassword}
//         />
//       </>
//     )
//   }

//   renderUsernameField = () => {
//     const {username} = this.state
//     return (
//       <>
//         <label className="input-label" htmlFor="username">
//           USERNAME
//         </label>
//         <input
//           type="text"
//           id="username"
//           className="username-input-filed"
//           value={username}
//           onChange={this.onChangeUsername}
//         />
//       </>
//     )
//   }

//   render() {
//     const {showSubmitError, errorMsg} = this.state
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }
//     return (
//       <div className="login-form-container">
//         <form className="form-container" onSubmit={this.submitForm}>
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
//             className="login-website-logo-desktop-image"
//             alt="website logo"
//           />
//           <div className="input-container">{this.renderUsernameField()}</div>
//           <div className="input-container">{this.renderPasswordField()}</div>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//           {showSubmitError && <p className="error-message">*{errorMsg}</p>}
//         </form>
//       </div>
//     )
//   }
// }

// export default LoginForm
/* eslint-disable import/no-extraneous-dependencies */
import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const LoginForm = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeHandler = event => {
    const {id, value} = event.target
    if (id === 'username') {
      setUsername(value)
    } else {
      setPassword(value)
    }
  }

  const onSuccessfulLogin = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const onFailedLogin = errorMessage => {
    setErrorMsg(errorMessage)
  }

  const onSubmitLogin = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok) {
      onSuccessfulLogin(data.jwt_token)
    } else {
      onFailedLogin(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-bg">
      <form onSubmit={onSubmitLogin} className="login-form">
        <h1 className="login-heading">Login</h1>
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          onChange={onChangeHandler}
          value={username}
        />
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          onChange={onChangeHandler}
          value={password}
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {errorMsg !== '' && <p className="text-danger">{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm
