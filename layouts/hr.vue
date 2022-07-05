<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="localePath(item.link)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-chip color="red">
          <div class="white--text">HR</div>
        </v-chip>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>

      <nuxt></nuxt>

    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {icon: 'mdi-account', title: 'أداة البحث', link:'/hr'},
      {icon: 'mdi-account', title: 'الوظائف', link:'hr/jobs'},
      {icon: 'mdi-account', title: 'hello', link:''}
    ]
  }),
}
</script>
