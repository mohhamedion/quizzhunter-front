<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item
        to="/panel"
      >
        <v-list-item-content>
          <v-list-item-title  >Panel</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>mdi-panel</v-icon>

        </v-list-item-icon>
      </v-list-item>

      <v-list-item-group
        color="primary"
      >
      <v-list-item
        to="/panel/users"
      >
        <v-list-item-content>
          <v-list-item-title  >users</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>

        </v-list-item-icon>
      </v-list-item>


        <v-list-item
          to="/panel/tests"

        >
          <v-list-item-content>
            <v-list-item-title  >Tests</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>

          </v-list-item-icon>
        </v-list-item>


        <v-list-item
          to="/panel/sessions"
        >
          <v-list-item-content>
            <v-list-item-title  >Sessions</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>

          </v-list-item-icon>
        </v-list-item>


        <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title  >Comments</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>

          </v-list-item-icon>
        </v-list-item>

        <v-list-item
        >
          <v-list-item-content>
            <v-list-item-title  >Ads</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>

          </v-list-item-icon>
        </v-list-item>


      </v-list-item-group>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>QH panel</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <Nuxt/>

    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware({$auth, redirect}) {
    // If the user is not authenticated
    if ($auth.user.role !== 'admin') {
      return redirect('/')
    }
  },
  data: () => ({drawer: null}),
}
</script>
