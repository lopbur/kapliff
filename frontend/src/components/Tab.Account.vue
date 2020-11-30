<template>
  <v-card tile>
    <v-tabs-items v-model="tab">
      <!-- START Login Tab -->
      <validation-observer v-slot="{ handleSubmit, reset }">
        <v-tab-item value="login">
          <v-card-text class="pb-0">
            <v-text-field-validation
              rules="required|email"
              v-model="user.email"
              dense
              label="Email"
            />
            <v-text-field-validation
              type="password"
              rules="required"
              v-model="user.password"
              dense
              label="Password"
            />
            <div v-if="message" class="error--text text-caption">
              {{ message }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              small
              color="success"
              tile
              @click="
                clearField()
                reset()
                showLogin = false
              "
              :loading="loading"
            >
              Sign up
            </v-btn>
            <v-btn
              small
              color="primary"
              tile
              @click="handleSubmit(handleLogIn)"
              :loading="loading"
            >
              Log in
            </v-btn>
          </v-card-actions>
        </v-tab-item>
      </validation-observer>
      <!-- END Login Tab -->

      <!-- START Register Tab -->
      <validation-observer ref="obs" v-slot="{ handleSubmit, reset }">
        <v-tab-item value="register">
          <v-card-text class="pb-0">
            <v-text-field-validation
              rules="required|email"
              v-model="user.email"
              dense
              label="Email"
            />
            <v-text-field-validation
              rules="required"
              v-model="user.username"
              dense
              label="Username"
            />
            <v-text-field-validation
              type="password"
              rules="required"
              v-model="user.password"
              dense
              label="Password"
              vid="password"
            />
            <v-text-field-validation
              type="password"
              rules="required|confirmedBy:@password"
              v-model="confirmPassword"
              dense
              label="Confirm password"
            />
            <div
              v-if="message"
              class="text-caption"
              :class="successful ? 'success--text' : 'error--text'"
            >
              {{ message }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              small
              color="primary"
              tile
              @click="
                clearField()
                reset()
                showLogin = true
              "
              :loading="loading"
            >
              Log in
            </v-btn>
            <v-btn
              small
              color="success"
              tile
              @click="handleSubmit(handleSignUp)"
              :loading="loading"
            >
              Sign up
            </v-btn>
          </v-card-actions>
        </v-tab-item>
      </validation-observer>
      <!-- END Register Tab -->
    </v-tabs-items>
  </v-card>
</template>

<script>
import User from '@/models/user'
import { ValidationObserver } from 'vee-validate'
import VTextFieldValidation from '@/components/inputs/VTextField-Validation'

export default {
  name: 'Tab_Account',
  components: {
    ValidationObserver,
    VTextFieldValidation
  },
  data: () => ({
    user: new User('', '', ''),
    confirmPassword: '',
    message: '',
    successful: true,
    showLogin: true,
    loading: false
  }),
  computed: {
    tab() {
      return this.showLogin ? 'login' : 'register'
    }
  },
  /* eslint-disable */
  methods: {
    handleLogIn() {
      this.loading = true
      this.$store
        .dispatch('auth.module/login', this.user)
        .then(() => {
          this.$emit('login')
        })
        .catch(error => {
          this.message = error.message
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSignUp() {
      this.loading = true
      this.$store
        .dispatch('auth.module/register', this.user)
        .then(
          data => {
            this.message = data.message
            this.successful = data.success
          },
          error => {
            this.message = error.message
            this.successful = error.success
          })
        .finally(() => {
          this.loading = false
        })
    },
    clearField() {
      this.user.username
      = this.user.email
      = this.user.password
      = this.confirmPassword
      = ''
    }
  }
}
</script>

<style lang="scss">
.v-input {
  &:first-child {
    margin-bottom: 5px !important;
  }
}
</style>
