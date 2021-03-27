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
    getTests() {
      this.$axios.get(`${process.env.baseUrl}/api/panel/` + 'tests').then(res => {
        this.rows = res.data.data
      })
    }
  },
  mounted() {
    this.getTests();
  },
  data() {
    return {

      singleSelect: false,
      selected: [],
      headers: [

        {text: 'category', value: 'the_category.category'},
        {text: 'description', value: 'description'},
        {text: 'published', value: 'published'},
        {text: 'sessions', value: 'sessions_count'},
      ],
      rows: [],
    }
  },
}
</script>
