<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="rows"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-switch
          v-model="singleSelect"
          label="Single select"
          class="pa-3"
        ></v-switch>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  layout: 'panel',

  methods: {
    getUsers() {
      this.$axios.get('/panel/users').then(res => {
        this.rows = res.data.data
      })
    }
  },
  mounted() {
    this.getUsers();
  },
  data() {
    return {

      singleSelect: false,
      selected: [],
      headers: [

        {text: 'firstname', value: 'firstname'},
        {text: 'lastname', value: 'lastname'},
        {text: 'email', value: 'email'},
        {text: 'role', value: 'role'},
      ],
      rows: [],
    }
  },
}
</script>
