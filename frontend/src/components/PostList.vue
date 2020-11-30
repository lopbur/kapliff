<template>
  <v-list flat dense>
    <v-list-item-group class="mb-10">
      <v-list-item
        v-for="(post, index) in list"
        :key="index"
        @click="handleSelectPost(post.id)"
        class="pa-0 white--text text-left"
      >
        <!-- START List icon -->
        <v-list-item-avatar class="ma-0">
          <v-icon small>mdi-file-document-outline</v-icon>
        </v-list-item-avatar>
        <!-- END List icon -->

        <!-- START List content -->
        <v-list-item-content class="pr-5 font-weight-light">
          <v-list-item-subtitle>
            {{ post.title }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <!-- END List content -->
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import PostService from '@/services/post.service'

export default {
  name: 'PostList',
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    retrieveAll() {
      PostService.getAll().then(response => {
        if (response.data.length) {
          this.$store.dispatch('post.module/updatePostList', response.data)
        }
      })
    },
    handleSelectPost(id) {
      this.$store.state['post.module'].postId = id
      if (this.$router.currentRoute.path !== `/posts/${id}`) {
        this.$emit('select-post', id)
        this.$router.push({ path: `/posts/${id}` })
      } else {
        this.$router.go()
      }
    }
  },
  mounted() {
    this.retrieveAll()
  }
}
</script>

<style lang="scss"></style>
