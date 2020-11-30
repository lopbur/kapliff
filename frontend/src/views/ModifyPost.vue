<template>
  <v-row class="ma-0 justify-center">
    <v-col col="12" md="9" class="px-0">
      <v-card tile>
        <v-card-title class="font-weight-light">
          <v-icon>mdi-plus</v-icon>
          Modify Post
        </v-card-title>
        <div class="post" style="position: relative">
          <v-text-field
            class="post__title"
            placeholder="Title"
            v-model="post.title"
          />
          <basic-post-editor
            :initialContent="post.originContent"
            v-model="post.modifyContent"
            @input="isModified = true"
            tabindex="0"
          />
          <div class="post__btn">
            <div
              v-if="errorMessage"
              v-text="errorMessage"
              class="red--text text-caption"
            />
            <v-btn @click="doModify" color="primary" small>post</v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable */
import PostService from '@/services/post.service'
import BasicPostEditor from '@/components/tiptap/BasicPostEditor'

export default {
  name: 'ModifyPost',
  data() {
    return {
      post: {
        id: null,
        title: '',
        originContent: '',
        modifyContent: ''
      },
      errorMessage: '',
      isModified: false
    }
  },
  components: {
    BasicPostEditor
  },
  methods: {
    doModify() {
      if (!this.isModified) {
        this.$router.push(`/posts/${this.post.id}`)
        return;
      }

      if (this.post.title && this.post.modifyContent !== '<p></p>') {
        const commitPost = {
          title: this.post.title,
          content: this.post.modifyContent
        }

        PostService.update(this.post.id, commitPost).then(() => {
          this.$router.push(`/posts/${this.post.id}`)
        })
      } else {
        this.errorMessage = 'Can not empty the title or content field!'
      }
    }
  },
  mounted() {
    this.post.id = this.$route.params.id

    PostService.get(this.post.id)
      .then(response => {
        this.post.title = response.data.title
        this.post.originContent = response.data.content
      })
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
