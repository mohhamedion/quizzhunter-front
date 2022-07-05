<template>
  <v-container>

    <v-main>
      <div align="center">

        <v-avatar
          color="primary"
          size="128"
        >
          <img
            :src="require(`~/assets/img/quizzhunter.png`)"
            alt="John">
        </v-avatar>
        <v-spacer></v-spacer>

        <div class="text-h5">{{ user.firstname }} {{ user.lastname }}</div>
        <NuxtLink v-if="this.$auth.user&&user.id===this.$auth.user.id" :to="localePath('settings')">{{$t('profile.settings')}}</NuxtLink>
        <!--        <div>-->
        <!--          <v-chip-->
        <!--            color="primary"-->
        <!--            link-->
        <!--            small-->
        <!--            text-color="white"-->
        <!--          >Front End-->
        <!--          </v-chip>-->
        <!--          <v-chip-->
        <!--            color="teal"-->
        <!--            link-->
        <!--            small-->
        <!--            text-color="white"-->
        <!--          >Back End-->
        <!--          </v-chip>-->
        <!--          <v-chip-->
        <!--            color="red"-->
        <!--            link-->
        <!--            small-->
        <!--            text-color="white"-->
        <!--          >سوريا-->
        <!--          </v-chip>-->
        <!--        </div>-->
      </div>
    </v-main>

    <v-main>
      <v-tabs
        fixed-tabs
        dark
      >
        <!--        <v-tab>-->
        <!--          الاختبارات-->
        <!--        </v-tab>-->
        <v-tab>

          {{$t('profile.lastActivity')}}
        </v-tab>

      </v-tabs>
    </v-main>

    <v-main>
      <v-row align="center">
        <v-col xl="3" lg="4" cols="12" v-for="test in tests" :key="test.id">
          <testCard :test="test"></testCard>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="12" v-for="session in testSeessions" :key="session.id">
          <v-alert
            dark
          >
            <div :class="textClass">
              <div
                v-if="session.questions_per_session ? session.totalPoints/session.questions_per_session>=0.5  : session.totalPoints/session.session_questions_count >=0.5">
                <v-icon color="green">✓</v-icon>
                {{$t('profile.passedTheTest')}}
              </div>
              <div v-else>
                <v-icon color="red">X</v-icon>
                {{$t('profile.didntPassTheTest')}}
              </div>
            </div>
            <div :class="textClass">
              <template v-if="siteIsRtl" >
                {{$t('profile.andFinishedWithResult')}} {{ session.totalPoints }}/{{ session.session_questions_count }}
                {{ session.test.category.category }} {{$t('profile.heTested')}}
              </template>
              <template v-else>
                {{$t('profile.heTested')}} {{ session.test.category.category }}
                {{$t('profile.andFinishedWithResult')}} {{ session.totalPoints }}/{{ session.session_questions_count }}
              </template>

              <div>
                <NuxtLink :to="localePath('/results/'+session.id)"> {{$t('profile.testDetails')}}</NuxtLink>
              </div>
            </div>
          </v-alert>
        </v-col>
      </v-row>

    </v-main>


  </v-container>
</template>

<script>
import testCard from "../../components/tests/test-card";
import axios from 'axios';

export default {
  components: {testCard},
  data() {
    return {
      tests: []
    }
  }
  ,
  mounted() {
    // this.getTests();
  },
  computed:{
    siteIsRtl(){
      return this.$languageHelper.siteIsRtl();
    },
    textClass(){
      return this.$languageHelper.textClass();
    },

  }
  ,
  methods: {
    getTests() {

      axios.get(`${process.env.baseUrl}/api/tests?user_id=${this.$route.params.id}`).then(res => {
        this.tests = res.data.data;
      });
    }
  }
  ,

  async asyncData({params}) {

    const testSeessions = await fetch(`${process.env.baseUrl}/api/testSessions/paginate?user_id=${params.id}`).then(res => res.json()).then(res => res.data);
    const user = await fetch(`${process.env.baseUrl}/api/profile/${params.id}`).then(res => res.json());
    return {user, testSeessions}
  }

}
</script>
