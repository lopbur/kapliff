<template>
  <v-row class="ma-0">
    <!-- START Post -->
    <v-col col="12" sm="9" class="px-0 pstcon">
      <v-card v-if="search" class="mb-3" color="transparent" flat>
        <h2>Search Results for: {{ search }}</h2>
      </v-card>
      <div v-for="(post, index) in prevPosts" :key="index" class="post-items">
        <post-item :post="post">
          <template v-slot:readmore="{ id }">
            <v-btn
              :to="`/posts/${id}`"
              color="blue-grey darken-1"
              small
              tile
              dark
            >
              Read More
            </v-btn>
          </template>
        </post-item>
      </div>
      <infinite-loading @infinite="infiniteHandler" spinner="waveDots" />
      <div class="d-flex justify-center">
        <v-btn
          v-if="search && !prevPosts.length"
          to="/"
          color="error"
          tile
          small
        >
          Back to Home
        </v-btn>
      </div>
    </v-col>
    <!-- END Post -->

    <!-- START Navigation -->
    <v-col col="12" sm="3" class="pr-0 d-none d-sm-block">
      <v-btn
        v-if="$store.state['auth.module'].isAdmin"
        class="postBtn mb-3"
        to="/posting"
        color="primary"
        tile
      >
        NEW POST
      </v-btn>
      <v-card tile>
        <v-card-actions>
          <v-text-field
            class="px-3"
            @keydown.enter="searchHandler($event.target.value)"
            :value="search"
            placeholder="Search..."
            prepend-inner-icon="mdi-magnify"
            hide-details
          />
        </v-card-actions>
        <post-list :list="$store.state['post.module'].postList" />
      </v-card>
    </v-col>
    <!-- END Navigation -->
  </v-row>
</template>

<script>
import PostService from '@/services/post.service'
import PostItem from '@/components/post/PostItem'
import PostList from '@/components/PostList'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'MainBoard',
  components: {
    PostItem,
    PostList,
    InfiniteLoading
  },
  data() {
    return {
      posts: null,
      prevPosts: [],
      postRange: 0,
      search: ''
    }
  },
  methods: {
    searchHandler(keyword) {
      if (this.$router.currentRoute.path !== `/post?s=${keyword}`)
        this.$router.push(`/posts?s=${keyword}`)
    },
    infiniteHandler($state) {
      const requestAmount = 2
      PostService.getSpecific(
        this.prevPosts.length,
        requestAmount,
        this.search
      ).then(response => {
        setTimeout(() => {
          if (response.data.length) {
            let newPosts = response.data.reduce((acc, cur) => {
              const body = new DOMParser()
                .parseFromString(cur.content, 'text/html')
                .querySelector('body')

              let previewContent = ''
              Array.from(body.children).every(el => {
                if (el.tagName === 'P' && !el.innerText) return false
                previewContent = previewContent.concat(el.outerHTML)

                return true
              })

              cur.content = previewContent
              acc.push(cur)

              return acc
            }, [])

            this.prevPosts = this.prevPosts.concat(newPosts)
            $state.loaded()

            if (!this.prevPosts.length / requestAmount) {
              $state.complete()
            }
          } else {
            $state.complete()
          }
        }, 800)
      })
    }
  },
  mounted() {
    if (this.$route.query.s) this.search = this.$route.query.s
  }
}
</script>

<style lang="scss">
.post-items {
  margin-bottom: 50px;
}

.pstcon {
  @media only screen and (max-width: 665px) {
    padding: 0 !important;
  }
}

.postBtn {
  width: 100%;
}
</style>
