import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'This Field must be a valid email'
})

extend('confirmedBy', {
  params: ['target'],

  validate(value, { target }) {
    return value === target
  },

  message: 'The {_field_} does not match the {target}'
})
