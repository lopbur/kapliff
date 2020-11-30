<template>
  <validation-provider
    :name="$attrs.label"
    :rules="rules"
    :vid="$attrs.vid"
    v-slot="{ errors }"
  >
    <v-text-field
      v-model="innerValue"
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
      @input="$emit('input', innerValue)"
    />
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  props: {
    rules: {
      type: [Object, String],
      default: ''
    },
    value: {
      type: null
    }
  },
  computed: {
    innerValue: {
      get() {
        return this.value
      },
      set() {}
    }
  }
}
</script>

<style></style>
