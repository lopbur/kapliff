<template>
  <v-app id="app">
    <!-- START Navigation bar -->
    <v-app-bar class="main-navbar" color="primary" dark app>
      <!-- START Title -->
      <v-toolbar-title class="main-title" @click="gotohome">
        <router-link to="/">
          <h1 class="white--text text-h6 text-sm-h4 font-weight-thin">
            KAPLIFF DEV BLOG
          </h1>
        </router-link>
      </v-toolbar-title>
      <!-- END Title -->

      <v-spacer></v-spacer>

      <v-menu
        offset-y
        left
        tile
        :close-on-content-click="false"
        :close-on-click="false"
        :value="$store.state['auth.module'].accountUi"
      >
        <!-- eslint-disable -->
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            depressed
            tile
            small
            @click="accountHandler"
            class="font-weight-light accountBtn"
            style="height: 100%"
            v-text="$store.state['auth.module'].status.loggedIn ? 'profile' : 'login'"
          />
        </template>
        <div v-if="accountView === 'profile'">
          <tab-profile @logout="handleLogout" />
        </div>
        <div v-else>
          <tab-account @login="handleLoginSuccess" />
        </div>
      </v-menu>

      <v-progress-linear
        :active="$store.state.loading"
        :indeterminate="$store.state.loading"
        absolute
        bottom
        color="deep-purple darken-1"
      ></v-progress-linear>
    </v-app-bar>
    <!-- END Navigation bar -->

    <!-- START Content -->
    <v-main app>
      <v-slide-y-transition>
        <v-btn
          v-if="$vuetify.breakpoint.smAndDown"
          class="ma-5"
          color="primary"
          dark
          absolute
          fab
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>
      </v-slide-y-transition>
      <v-container class="pa-0 align-start main-view">
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
    </v-main>
    <!-- END Content -->

    <v-footer
      padless
    >
      <v-card
        flat
        tile
        width="100%"
        color="primary"
        class="lighten-1 text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            icon
          >
            <v-icon size="24px" color="white">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          <strong>Kapliff</strong> - {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import TabAccount from '@/components/Tab.Account'
import TabProfile from '@/components/Tab.Profile'

export default {
  name: 'App',
  components: {
    TabAccount,
    TabProfile
  },
  data() {
    return {
      themes: this.$vuetify.theme.themes,
      showLogin: true,
      accountOpen: false,
      accountView: 'login',
      icons: ['mdi-home', 'mdi-email', 'mdi-instagram', 'mdi-facebook']
    }
  },
  methods: {
    gotohome() {
      if (this.$router.currentRoute.path === `/`) this.$router.go()
    },
    handleLoginSuccess() {
      this.$store.dispatch('auth.module/handleUi', false)
      this.$router.go()
      setTimeout(() => {
        this.accountView = 'profile'
      }, 100)
    },
    handleLogout() {
      this.$store.dispatch('auth.module/handleUi', false)
      this.$store.dispatch('auth.module/logout')
      this.$router.go()
      setTimeout(() => {
        this.accountView = 'login'
      }, 100)
    },
    accountHandler() {
      const flag = !this.$store.state['auth.module'].accountUi
      this.$store.dispatch('auth.module/handleUi', flag)
    }
  },
  mounted() {
    this.accountView = this.$store.state['auth.module'].status.loggedIn
      ? 'profile'
      : 'login'
  }
}
</script>
<style lang="scss">
#app {
  background: #fafafa;
}

.main {
  &-view {
    max-width: 950px;
  }

  @media only screen and (max-width: #{map-get($grid-breakpoints, 'md')}) {
    &-view {
      max-width: 870px;
    }
  }

  @media only screen and (max-width: #{map-get($grid-breakpoints, 'sm')}) {
    &-view {
      max-width: 650px;
    }
  }
}

.v-toolbar__content {
  padding: 0 16px !important;
}
</style>
