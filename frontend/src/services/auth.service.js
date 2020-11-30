import http from '../http-common'

class AuthService {
  login(user) {
    return http
      .post('/auth/signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.success)
          localStorage.setItem('user', JSON.stringify(response.data.user))
        return response
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return http.post('/auth/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
