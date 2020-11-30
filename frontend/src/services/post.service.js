import http from '../http-common'
import authHeader from './auth.header'

class PostService {
  getAll() {
    return http.get('/posts')
  }

  getSpecific(_offset, _limit, search) {
    const url = search ? `/posts?s=${search}` : '/posts'
    return http.get(url, { params: { offset: _offset, limit: _limit } })
  }

  get(id) {
    return http.get(`/posts/${id}`)
  }

  create(data) {
    return http.post('/posts', data, { headers: authHeader() })
  }

  update(id, data) {
    return http.put(`/posts/${id}`, data, { headers: authHeader() })
  }

  delete(id) {
    return http.delete(`/posts/${id}`, { headers: authHeader() })
  }

  findByTitle(title) {
    return http.get(`/posts?title=${title}`)
  }
}

export default new PostService()
