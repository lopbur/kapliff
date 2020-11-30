<template>
  <v-card tile>
    <v-card-text>
      <header>
        <h3>{{ currentUser.username }} Profile</h3>
      </header>
      <p>{{ currentUser.email }}</p>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-btn color="primary" class="grow" tile small>Setting</v-btn>
      <v-btn color="primary" class="grow" tile small @click="$emit('logout')">
        Logout
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Tab_Profile',
  computed: {
    currentUser() {
      return this.$store.state['auth.module'].user
    }
  }
}
</script>

<style></style>
