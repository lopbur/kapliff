<template>
  <v-card class="post-wrap" tile>
    <post-represent-image
      :imageSource="
        /*'https://source.unsplash.com/1600x900/?programming'*/
        require('../../assets/banner/cafe.webp')
      "
      :innerText="post.title"
    />
    <main>
      <div class="post-action">
        <slot
          name="post-action"
          :modifyHandler="modifyHandler"
          :deleteHandler="deleteHandler"
        ></slot>
      </div>

      <post-inner-content :title="post.title" :content="post.content">
        <template v-slot:info>
          <span>
            <v-icon x-small>mdi-calendar</v-icon>
            Last modified: {{ post.updatedAt }}
          </span>
          <span>
            <v-icon x-small>mdi-account</v-icon>
            Author: {{ post.author }}
          </span>
          <span>
            <v-icon x-small>mdi-folder-open</v-icon>
            Category: {{ post.category }}
          </span>
        </template>
      </post-inner-content>

      <slot name="readmore" :id="post.id"></slot>
    </main>
  </v-card>
</template>

<script>
import PostService from '@/services/post.service'
import PostRepresentImage from '@/components/post/PostRepresentImage'
import PostInnerContent from '@/components/post/PostInnerContent'

export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  components: {
    PostRepresentImage,
    PostInnerContent
  },
  methods: {
    modifyHandler() {
      this.$router.push(`/posts/mod/${this.post.id}`)
    },
    deleteHandler() {
      PostService.delete(this.post.id).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.post-wrap {
  main {
    position: relative;
    padding: 40px;

    .post-action {
      position: absolute;
      top: 0;
      right: 0;
      margin: 5px;
    }
  }
}
</style>
