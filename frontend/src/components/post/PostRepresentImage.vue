<template>
  <v-img
    class="rp-image align-center text-center pa-12"
    :src="imageSource"
    dark
  >
    <h1 class="ma-0 font-weight-thin">{{ innerText }}</h1>
    <div class="background-cover" :style="{ background: gradstr }" />
  </v-img>
</template>

<script>
/* esline-disable */

export default {
  name: 'PostRepresentImage',
  props: {
    imageSource: {
      type: String,
      default: ''
    },
    innerText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      gradient: [
        { top: '#7474BFE6', bottom: '#348AC7E6' },
        { top: '#283048E6', bottom: '#859398E6' },
        { top: '#2b5876E6', bottom: '#4e4376E6' }
      ],
      gradstr: ''
    }
  },
  mounted() {
    const n = Math.floor(Math.random() * this.gradient.length)
    this.gradstr = `linear-gradient(${this.gradient[n].top}, ${this.gradient[n].bottom})`
  }
}
</script>

<style lang="scss" scoped>
.rp-image {
  height: 300px;
  background: rgb(97, 37, 37);

  @media only screen and (max-width: #{map-get($grid-breakpoints, 'semi-sm') - 1}) {
    h1 {
      font-size: 1.5em;
    }
  }

  @media only screen and (max-width: #{map-get($grid-breakpoints, 'semi-sm') - 201}) {
    h1 {
      font-size: 1.25em;
    }
  }
}

.background-cover {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}
</style>
