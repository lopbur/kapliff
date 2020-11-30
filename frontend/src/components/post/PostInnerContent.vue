<template>
  <article class="text-left post">
    <header class="post-header">
      <h1 class="post-header-top">{{ title }}</h1>
      <section class="post-header-bottom">
        <slot name="info"></slot>
      </section>
    </header>
    <hr class="my-5" />
    <section class="post-content" v-html="content" />
  </article>
</template>

<script>
export default {
  name: 'PostInnerContent',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  font-size: 18px;
  color: #2c2c2c;

  &-header {
    &-top {
      margin: 0 0 15px;
    }

    &-bottom {
      font-size: 0.7em;

      span:not(:last-child) {
        margin-right: 5px;
      }
    }
  }

  &-content {
    font-size: 16px;
    margin-bottom: 30px;
  }
}
</style>
