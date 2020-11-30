<template>
  <div>
    <v-row class="ma-0">
      <v-col col="12" sm="9" class="px-0">
        <post-item :post="post">
          <template v-slot:post-action="{ modifyHandler, deleteHandler }">
            <v-menu v-if="$store.state['auth.module'].isAdmin" offset-y tile>
              <template v-slot:activator="{ on }">
                <v-btn icon small v-on="on">
                  <v-icon small>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list class="text-caption">
                <v-list-item @click="modifyHandler" dense>
                  Modify
                </v-list-item>
                <v-list-item @click="deleteHandler" dense>
                  Delete
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </post-item>
      </v-col>

      <!-- START Navigation -->
      <v-col cols="12" sm="3" class="pr-0 d-none d-sm-block">
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
              hide-details
            />
          </v-card-actions>
          <post-list :list="$store.state['post.module'].postList" />
        </v-card>
      </v-col>
      <!-- END Navigation -->
    </v-row>
    <v-row class="ma-0">
      <v-col cols="12">
        <div id="disqus_thread"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PostService from '@/services/post.service'
import PostItem from '@/components/post/PostItem'
import PostList from '@/components/PostList'

export default {
  name: 'PostDetail',
  components: {
    PostItem,
    PostList
  },
  data() {
    return {
      post: {},
      search: ''
    }
  },
  methods: {
    retrieve(id) {
      PostService.get(id).then(response => {
        if (response.data) {
          this.post = response.data
        }
      })
    },
    searchHandler(keyword) {
      if (this.$router.currentRoute.path !== `/post?s=${keyword}`)
        this.$router.push(`/posts?s=${keyword}`)
    }
  },
  mounted() {
    this.retrieve(this.$route.params.id)

    /* eslint-disable */
    try {
      (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://kapliff.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
    } catch (error) {
      console.log(error)
    }
    /* eslint-enable */
  }
}
</script>

<style lang="scss">
.postBtn {
  width: 100%;
}
</style>
