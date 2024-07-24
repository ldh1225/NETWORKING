import React from 'react'

const JoinForm = ({ join }) => {

    const onJoin = (e) => {
        e.preventDefault()      // submit 기본 동작 방지
        const form = e.target
        const userId = form.username.value
        const userPw = form.password.value
        const name = form.name.value
        const email = form.email.value
        const area = form.area.value
        const status = form.status.value
        const industry = form.industry.value
        const edu = form.edu.value
        const skill = form.skill. value
        const cert = form.cert.value
        const bio = form.bio.value
        const company = form.company.value
        const title = form.title.value

        console.log(userId, userPw, name, email, area, status, industry, edu, skill, cert, bio, company, title);

        join( {userId, userPw, name, email, area, status, industry, edu, skill, cert, bio, company, title} )
    }

  return (
    <div className="form">
        <h2 className="login-title">회원 가입</h2>

        <form className='login-form' onSubmit={ (e) => onJoin(e) }>
            <div>
                <label htmlFor="name">아이디 (변경불가)</label>
                <input type="text"
                        id='username'
                        placeholder='필수사항'
                        name='username'
                        autoComplete='username'
                        required
                />
            </div>

            <div>
                <label htmlFor="password">비밀번호 (변경불가)</label>
                <input type="password"
                        id='password'
                        placeholder='필수사항'
                        name='password'
                        autoComplete='password'
                        required
                />
            </div>

            <div>
                <label htmlFor="name">이름</label>
                <input type="text"
                        id='name'
                        placeholder='실명 혹은 별명 (필수사항)'
                        name='name'
                        autoComplete='name'
                        required
                />
            </div>

            <div>
                <label htmlFor="name">이메일</label>
                <input type="text"
                        id='email'
                        placeholder='필수사항'
                        name='email'
                        autoComplete='email'
                        required
                />
            </div>

            <div>
                <label htmlFor="name">지역</label>
                <input type="text"
                        id='area'
                        placeholder='근무중이거나 취업을 희망하는 지역 (선택사항)'
                        name='area'
                        autoComplete='area'
                />
            </div>

            <div>
                <label htmlFor="name">구직여부</label>
                <input type="text"
                        id='status'
                        placeholder='예) 재직중, 구직중, ... (선택사항)'
                        name='status'
                        autoComplete='status'
                />
            </div>

            <div>
                <label htmlFor="name">직무분야</label>
                <input type="text"
                        id='industry'
                        placeholder='재직중이거나 취업을 희망하는 분야 (선택사항)'
                        name='industry'
                        autoComplete='industry'
                />
            </div>

            <div>
                <label htmlFor="name">학력</label>
                <input type="text"
                        id='edu'
                        placeholder='선택사항'
                        name='edu'
                        autoComplete='edu'
                />
            </div>

            <div>
                <label htmlFor="name">스킬</label>
                <input type="text"
                        id='skill'
                        placeholder='보유기술 (예. 자바, SQL 등...) (선택사항)'
                        name='skill'
                        autoComplete='skill'
                />
            </div>

            <div>
                <label htmlFor="name">자격증</label>
                <input type="text"
                        id='cert'
                        placeholder='선택사항'
                        name='cert'
                        autoComplete='cert'
                />
            </div>

            <div>
                <label htmlFor="name">경력사항</label>
                <input type="text"
                        id='bio'
                        placeholder='선택사항'
                        name='bio'
                        autoComplete='bio'
                />
            </div>

            <div>
                <label htmlFor="name">소속</label>
                <input type="text"
                        id='company'
                        placeholder='선택사항'
                        name='company'
                        autoComplete='company'
                />
            </div>

            <div>
                <label htmlFor="name">직급</label>
                <input type="text"
                        id='title'
                        placeholder='선택사항'
                        name='title'
                        autoComplete='title'
                />
            </div>

            <button type='submit' className='btn btn--form btn-login'>
                회원 가입                
            </button>
        </form>
    </div>
  )
}

export default JoinForm