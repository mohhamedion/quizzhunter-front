<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      disable-resize-watcher
      default="false"
      app
      right
    >
      <v-col
        class="text-center mt-5 "
      >

        <div class="m-3" v-if="this.$auth.loggedIn">
          <v-avatar
            color="primary"
            size="128"
            v-ripple
            class="text-center elevation-2 pa-12 headline"
          >
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
        </div>
        <div class="mt-3" v-if="this.$auth.loggedIn">
          {{ this.$auth.user.firstname }} {{ this.$auth.user.lastname }}
        </div>

      </v-col>


      <div v-if="this.$auth.loggedIn">
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            :to="'/profile/'+this.$auth.user.id"
          >
            <v-list-item-content>
              <v-list-item-title class="text-right">الملف الشخصي</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>

        <v-list-item
          @click="logout"
        >
          <v-list-item-content>
            <v-list-item-title class="text-right">تسجيل خروج</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-door</v-icon>

          </v-list-item-icon>
        </v-list-item>
      </div>

      <div v-else>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            to="/login"
          >
            <v-list-item-content>
              <v-list-item-title class="text-right">تسجيل الدخول</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-lock</v-icon>

            </v-list-item-icon>
          </v-list-item>
          <v-list-item
            to="/register"
          >
            <v-list-item-content>
              <v-list-item-title class="text-right">سجل حساب</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
          </v-list-item>

        </v-list-item-group>
      </div>

    </v-navigation-drawer>

    <v-app-bar dark app>

      <template>
        <NuxtLink to="/" class="remove-link-style white--text">

          <v-col>
            <v-toolbar-title>QH
<!--              <v-chip-->
<!--                color="red"-->
<!--                text-color="white"-->
<!--                small-->
<!--              >Beta-->
<!--              </v-chip>-->
            </v-toolbar-title>
          </v-col>
        </NuxtLink>

        <v-tabs align-with-title color="white">
          <v-tab to="/tests">الاختبارات</v-tab>
        </v-tabs>

      </template>

      <v-spacer></v-spacer>

      <div v-if="this.$auth.loggedIn">
        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="getNotifications"

              icon
              v-bind="attrs"
              v-on="on"
            >


              <v-badge
                :color="notificationsCount ? 'red' : ''"
                :content="notificationsCount"
                overlap
              >
                <v-icon
                  medium
                  color="  darken-2"
                >
                  mdi-bell
                </v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-list
          >
            <v-list-item v-if="!notifications.length">

              <v-list-item-title v-if="notificationsLoading">
                <v-list-item-icon>
                  <v-icon>mdi-bell</v-icon>
                </v-list-item-icon>
                loading...
              </v-list-item-title>

              <v-list-item-title v-if="!notificationsLoading && !notifications.length">
                <v-list-item-icon>
                  <v-icon>mdi-bell</v-icon>
                </v-list-item-icon>
                No Results
              </v-list-item-title>

            </v-list-item>

            <v-list-item

              v-for="(item, index) in notifications"
              :key="index"
              :to="item.link || '#'"
            >
              <v-list-item-title>
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                {{ item.title }}
              </v-list-item-title>

            </v-list-item>
          </v-list>
        </v-menu>


      </div>
      <div class="ml-2">

        <v-switch class="mt-5"
                  @click="changeMode"
                  inset
                  persistent-hint
                  :value="$vuetify.theme.dark"
                  prepend-icon="mdi-theme-light-dark"
        ></v-switch>
      </div>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>


    </v-app-bar>
    <v-main>
      <nuxt></nuxt>
    </v-main>
  </v-app>
</template>
<script>

export default {
  // loading: true,
  methods: {
    changeMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("darkMode", this.$vuetify.theme.dark.toString());

    },
    unreadNotificationsCount() {
      this.$axios.get(`${process.env.baseUrl}/api/notifications/count-unread`).then(res => {
        this.notificationsCount = res.data;
      });
    },
    getNotifications() {
      this.notificationsLoading = true;
      this.$axios.get(`${process.env.baseUrl}/api/notifications`).then(res => {
        this.notifications = res.data.data.map(el => {
          return {title: el.data.message, icon: 'mdi-account', link: el.data.link}
        });
        this.notificationsLoading = false;

      })
    },

    logout() {
      this.$auth.logout('local')
    }

  },

  mounted() {

    const theme = localStorage.getItem("darkMode");
    if (theme) {
      if (theme == "true") {
        this.$vuetify.theme.dark = true;
      } else this.$vuetify.theme.dark = false;
    }
    if (this.$auth.loggedIn) {
      this.unreadNotificationsCount();
    }

  },
  data: () => ({
    notificationsLoading: false,
    drawer: false,
    selectedItem: null,
    notificationsCount: 0,
    items: [
      {text: 'الملف الشخصي', icon: 'mdi-account', to: `/profile/`},
    ],
    notifications: [],
  }),
}
</script>
