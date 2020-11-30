<template>
  <div class="icon">
    <v-img class="icon__svg" :src="require(`@/assets/icons/${name}.svg`)" />
  </div>
</template>

<script>
export default {
  props: {
    name: {},
    size: {
      default: 'normal'
    },
    modifier: {
      default: null
    },
    fixAlign: {
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  top: -0.05rem;
  fill: currentColor;

  &__svg {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
  }

  &:before {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>
