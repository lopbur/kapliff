export default {
  namespaced: true,
  state: {
    post: [],
    postList: [],
    postId: null
  },
  actions: {
    /* eslint-disable */
    updatePost({ commit }, newPost) {
      commit('post', newPost)
    },
    updatePostList({ commit }, posts) {
      const list = posts.map(v => ({ id: v.id, title: v.title }))
      commit('postList', list)
    }
  },
  mutations : {
    post(state, newPost) {
      state.post = state.post.concat(newPost)
    },
    postList(state, list) {
      state.postList = list
    }
  }
}