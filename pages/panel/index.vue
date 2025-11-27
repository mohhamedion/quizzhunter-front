<template>
  <v-container>

    <div>
      <template>
        <div class="text-center">
          <v-chip
            class="ma-2"
            color="indigo"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            users {{this.dashboard.usersCount}}
          </v-chip>

          <v-chip
            class="ma-2"
            color="orange"
            text-color="white"
          >
            sessions {{this.dashboard.sessionsCount}}

          </v-chip>

          <v-chip
            class="ma-2"
            color="primary"
            text-color="white"
          >
            tests  {{this.dashboard.testsCount}}

          </v-chip>

          <v-chip
            class="ma-2"
            color="green"
            text-color="white"
          >

            comments  {{this.dashboard.commentsCount}}

          </v-chip>


        </div>
      </template>
      <template>
        <div class="text-center">
          <v-chip
            class="ma-2"
            color="indigo"
            text-color="white"
          >
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            users {{this.dashboard.usersCountToday}}
          </v-chip>

          <v-chip
            class="ma-2"
            color="orange"
            text-color="white"
          >
            sessions {{this.dashboard.sessionsCountToday}}

          </v-chip>

          <v-chip
            class="ma-2"
            color="primary"
            text-color="white"
          >
            tests  {{this.dashboard.testsCountToday}}

          </v-chip>

          <v-chip
            class="ma-2"
            color="green"
            text-color="white"
          >

            comments  {{this.dashboard.commentsCountToday}}

          </v-chip>


        </div>
      </template>

    </div>


    <h2>Users</h2>

    <v-sparkline
      :value="userStatistic"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
    ></v-sparkline>

    <h2>sessions</h2>
    <v-sparkline
      :value="sessionStatistics"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
    ></v-sparkline>

  </v-container>
</template>
<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]


export default {
  layout: 'panel',

  data: () => ({
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[5],
    userStatistic: [],
    sessionStatistics: [],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false,
    dashboard: {}
  }),

  methods: {
    getData() {
      this.$axios.get('/panel/').then(res => {
        this.dashboard = res.data;
        this.dashboard.users.map(el => {
          this.userStatistic.push(el.total);
        });
        this.dashboard.sessions.map(el => {
          this.sessionStatistics.push(el.total);
        })
      })
    }
  }

  ,
  mounted() {
    this.getData();
  }
}
</script>
