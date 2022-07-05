<template>

  <v-card
    :to="localePath('/tests/'+test.id)"
    link
    :loading="loading"
    class="mx-auto my-12"
    max-width="220"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="130"
      :src="test.category.image"
    ></v-img>

    <v-card-title>{{ test.category.category }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="parseFloat(test.totalRate)"
          color="amber"
          dense
          half-increments
          readonly
          size="10"
        ></v-rating>

        <div class="grey--text ml-1">
          {{ test.totalRate }} ({{ test.sessions_count }})
        </div>
      </v-row>

      <v-row
        align="center"
        class="mx-0"
      >
        <v-chip-group
        >

          <v-chip
            small
            link
          >{{ test.category.category }}</v-chip>
          <v-chip
            color="white--text"

            :class="test.level.level==='Junior' ? 'primary' : test.level.level==='Middle' ? 'warning' : test.level.level==='Senior' ? 'red' : '' "
            link
            small
          >{{ test.level.level }}</v-chip>

        </v-chip-group>
      </v-row>

    </v-card-text>


  </v-card>
</template>

<script>
export default {
  props: ['test'],
  data: () => ({
    loading: false,
  }),

  methods: {
    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>
