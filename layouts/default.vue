<template>
  <v-app id="inspire" dir="rtl">
    <v-navigation-drawer
      v-model="drawer"
      disable-resize-watcher
      default="false"
      app
      right
      class="sidebar-drawer"
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
              :src="require(`~/assets/img/quizzhunter.png`)"
              alt="John"
            >
          </v-avatar>
        </div>
        <div class="mt-3" v-if="this.$auth.loggedIn">
          {{ this.$auth.user.firstname }} {{ this.$auth.user.lastname }}
        </div>

      </v-col>


      <div class="sidebar-content">
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
            <v-list-item
              to="/create-test"
            >
              <v-list-item-content>
                <v-list-item-title class="text-right">إنشاء اختبار</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-plus-circle</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
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

        <div>
          <v-list-item
            to="/tests"
          >
            <v-list-item-content>
              <v-list-item-title class="text-right">الاختبارات</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-test-tube</v-icon>

            </v-list-item-icon>
          </v-list-item>
        </div>
      </div>

      <div class="sidebar-footer" v-if="this.$auth.loggedIn">
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

    </v-navigation-drawer>

<style scoped>
::v-deep .sidebar-drawer .v-navigation-drawer__content {
  display: flex !important;
  flex-direction: column !important;
  height: 100%;
}

.sidebar-content {
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
}

.sidebar-footer {
  flex-shrink: 0;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 0;
}

.theme--dark .sidebar-footer {
  border-top-color: rgba(255, 255, 255, 0.12);
}

.theme--light .sidebar-footer {
  border-top-color: rgba(0, 0, 0, 0.12);
}

/* Dark mode switcher - keep LTR in toolbar */
.dark-mode-switcher {
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-right: 8px;
  direction: ltr !important;
}

::v-deep .dark-mode-switch {
  direction: ltr !important;
  margin: 0;
  padding: 0;
}

::v-deep .dark-mode-switch .v-input__control {
  direction: ltr !important;
}

::v-deep .dark-mode-switch .v-input__slot {
  direction: ltr !important;
  flex-direction: row !important;
}

::v-deep .dark-mode-switch .v-input--selection-controls__input {
  margin-right: 8px !important;
  margin-left: 0 !important;
}

::v-deep .dark-mode-switch .v-input__prepend-outer {
  margin-right: 8px !important;
  margin-left: 0 !important;
}

::v-deep .dark-mode-switch .v-input--switch__thumb {
  left: 0 !important;
  right: auto !important;
}

::v-deep .dark-mode-switch.v-input--is-dirty .v-input--switch__thumb {
  left: 20px !important;
  right: auto !important;
}
</style>

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

<!--        <v-tabs align-with-title color="white">-->
<!--          <v-tab to="/tests">الاختبارات</v-tab>-->
<!--        </v-tabs>-->

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
      <div class="dark-mode-switcher" dir="ltr" style="direction: ltr !important;">
        <v-switch
          @change="changeMode"
          :input-value="$vuetify.theme.dark"
          class="dark-mode-switch"
          hide-details
          dense
          color="white"
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
