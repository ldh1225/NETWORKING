import React, { useContext } from 'react'
import { LoginContext } from '../../contexts/LoginContextProvider'
import './LoginForm.css'

const LoginForm = () => {

    const { login } = useContext(LoginContext)

    const onLogin = (e) => {
        e.preventDefault()

        const form = e.target
        const username = form.username.value
        const password = form.password.value

        login( username, password )
    }

    return (
        <div className="form">
            <h2 className="login-title">로그인</h2>

            <form className='login-form' onSubmit={ (e) => onLogin(e) }>
                <div>
                    <label htmlFor="name">아이디</label>
                    <input type="text"
                           id='username'
                           placeholder='아이디'
                           name='username'
                           autoComplete='username'
                           required
                    />
                </div>

                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password"
                           id='passowrd'
                           placeholder='비밀번호'
                           name='password'
                           autoComplete='password'
                           required
                    />
                </div>

                <button type='submit' className='btn btn--form btn-login'>
                    로그인                    
                </button>
            </form>
        </div>
    )
}

export default LoginForm