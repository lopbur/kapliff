<template>
  <v-row class="ma-0 justify-center">
    <v-col col="12" md="9" class="px-0">
      <v-card tile>
        <v-card-title class="font-weight-light">
          <v-icon>mdi-plus</v-icon>
          Add New Post
        </v-card-title>
        <div class="post" style="position: relative">
          <v-text-field
            class="post__title"
            placeholder="Title"
            v-model="post.title"
          />
          <basic-post-editor v-model="post.content" tabindex="0 " />
          <div>
            <span
              v-if="errorMessage"
              v-text="errorMessage"
              class="red--text text-caption"
            />
            <div class="post__btn">
              <v-btn @click="doPost" color="primary" small>post</v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PostService from '@/services/post.service'
import BasicPostEditor from '@/components/tiptap/BasicPostEditor'

export default {
  name: 'WritePost',
  components: {
    BasicPostEditor
  },
  data: () => ({
    post: {
      title: '',
      content: '',
      author: 'kapliff',
      category: 'VueJS'
    },
    errorMessage: ''
  }),
  methods: {
    doPost() {
      if (this.post.title && this.post.content) {
        PostService.create(this.post).then(response => {
          this.$router.push(`/posts/${response.data.id}`)
        })
      } else {
        this.errorMessage = 'Can not empty the title or content field!'
      }
    }
  }
}
</script>

<style lang="scss">
.post {
  padding: 8px;
  position: relative;

  &__title {
    ::-webkit-input-placeholder {
      font-style: italic;
    }
    :-moz-placeholder {
      font-style: italic;
    }
    ::-moz-placeholder {
      font-style: italic;
    }
    :-ms-input-placeholder {
      font-style: italic;
    }
  }

  &__btn {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 8px;
  }
}
</style>
