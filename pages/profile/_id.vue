<template>
  <v-container>

    <v-main>
      <div align="center">

        <v-avatar
          color="primary"
          size="128"
        >
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John">
        </v-avatar>
        <v-spacer></v-spacer>

        <div class="text-h5">{{ user.firstname }} {{ user.lastname }}</div>
        <NuxtLink v-if="this.$auth.user&&user.id===this.$auth.user.id" to="settings">الاعدادات</NuxtLink>
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
          النشاط الاخير
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

            <div class="text-right">
              <div
                v-if="session.questions_per_session ? session.totalPoints/session.questions_per_session>=0.5  : session.totalPoints/session.session_questions_count >=0.5">
                <v-icon color="green">✓</v-icon>
                نجح في الاختبار
              </div>
              <div v-else>
                <v-icon color="red">X</v-icon>
                لم ينجح في الاختبار
              </div>
            </div>

            <div class="text-right">
              و انهى الاختبار بنتيجة {{ session.totalPoints }}/{{ session.session_questions_count }}
              {{ session.test.category.category }} قد اختبر
              <div>
                <NuxtLink :to="'/result/'+session.id"> تفاصيل الاختبار</NuxtLink>
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
