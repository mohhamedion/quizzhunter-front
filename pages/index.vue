<style>
.mainbg {
  background:   #2b3137;
  background-size: cover;
}

#line {
  background: rgba(255, 0, 0, 0.68);
  padding-top: 0.75em;
}

.greenbtn {
  box-shadow: 0 4px 12px rgb(77 186 151 / 50%);
}

.rtl {
  direction: rtl;
}


</style>
<template>
  <div>
    <v-main class="mainbg">
      <v-container>
        <v-row>
          <template v-if="isRtl">
            <v-col lg="4" cols="12">
              <CodeField code="    class Employee {
          public fullname;
          public sallary;

          function findJob();
          function passTest();
          function resiveSallary();
        }    " language="php" color="white--text"></CodeField>
            </v-col>

            <v-col    lg="8" cols="12" class="text-right white--text">
              <h1 class="text-h4 ">
                {{$t('test_your_skills')}}
              </h1>
              <div class="my-2">
                {{$t('best_way_to_test_skills')}}
              </div>
              <div class="my-5">
                <v-btn dark :to="localePath('/tests')" class="greenbtn" min-width="200" min-height="50">{{$t('tests')}}</v-btn>
                <!--              <v-btn class="red" min-width="100" min-height="50">HR</v-btn>-->
              </div>
            </v-col>

          </template>

          <template v-else>

            <v-col    lg="8" cols="12" class="text-left white--text">
              <h1 class="text-h4 ">
                {{$t('test_your_skills')}}
              </h1>
              <div class="my-2">
                {{$t('best_way_to_test_skills')}}
              </div>
              <div class="my-5">
                <v-btn dark to="tests" class="greenbtn" min-width="200" min-height="50">{{$t('tests')}}</v-btn>
                <!--              <v-btn class="red" min-width="100" min-height="50">HR</v-btn>-->
              </div>
            </v-col>


            <v-col lg="4" cols="12">
              <CodeField code="    class Employee {
          public fullname;
          public sallary;

          function findJob();
          function passTest();
          function resiveSallary();
        }    " language="php" color="white--text"></CodeField>
            </v-col>


          </template>

        </v-row>


      </v-container>
    </v-main>

    <div id="line"></div>

    <v-main>
      <v-container>

        <div class='text-h5 text-center' :class="textDirection">{{$t('what_is_quizz_hunter')}}</div>

        <v-row class="my-8">

          <v-col cols="12" lg="6" align="center">
            <v-img width="150" :src="require(`~/assets/img/1328246.svg`)"></v-img>
            <div class="mt-2 text-h6 rtl"> {{$t('info')[0]}}</div>
          </v-col>
          <v-col cols="12" lg="6" align="center">
            <v-img width="150" :src="require(`~/assets/img/programing.png`)"></v-img>
            <div class="mt-2 text-h6 rtl">
              {{$t('info')[1]}}            </div>
          </v-col>

        </v-row>
        <!--second row-->

        <div :class="['text-h5 text-center', textDirection] ">{{$t('for_whom_is_quizz_hunter')}}</div>

        <v-row class="my-8">

          <v-col cols="12" lg="6" align="center">
            <v-img width="150" :src="require(`~/assets/img/choosing.png`)"></v-img>
            <div class="mt-2 text-h6 rtl">
              {{$t('info')[2]}}            </div>
          </v-col>
          <v-col cols="12" lg="6" align="center">
            <v-img width="150" :src="require(`~/assets/img/interview.png`)"></v-img>
            <div class="mt-2 text-h6 rtl">
              {{$t('info')[3]}}            </div>
          </v-col>



        </v-row>


      </v-container>

    </v-main>


    <v-main>
      <div :class="['text-h5 text-center',textDirection]">{{$t('start')}}</div>

      <v-container aling="center">
        <v-row>
          <v-col xl="3" lg="3" cols="12" v-for="(test,i) in bestFive" :key="test.id">
            <testCard v-if="i!==4" :test="test"></testCard>
          </v-col>
        </v-row>
      </v-container>

    </v-main>
    <div id="line"></div>

    <v-footer dark padless>
      <v-col class="text-center">
        <v-btn :to="switchLocalePath('en')">English</v-btn>
        <v-btn :to="switchLocalePath('ar')">عربي</v-btn>
      </v-col>
      <v-col
        class="text-center "
        cols="12"
      >
        {{ 2020 }} - {{ new Date().getFullYear() }} — <strong>QuizzHunter</strong>
        <div>
          <NuxtLink :to="localePath('/contact-us')">{{ $t('call_us') }}</NuxtLink>
        </div>
      </v-col>
    </v-footer>
  </div>

</template>

<script>
import CodeField from "../components/UX-UI/code-field";
import testCard from "../components/tests/test-card";
import axios from "axios";

export default {

  components: {
    CodeField, testCard
  },
  data() {
    return {

      bestFive: [],
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }
  },
  methods: {
    getBestFive() {
      this.$axios.get(`${process.env.baseUrl}/api/tests/bestfive`).then(res => {
        this.bestFive = res.data
      })
    }

  },
    computed:{
      textDirection(){
        return this.$i18n.locale === 'ar' ? 'rtl' : 'ltr';

      },
      isRtl(){
        return this.$i18n.locale === 'ar';
      },
      textClass(){
        return this.$i18n.locale === 'ar' ? 'text-right' : 'text-left'
      }
    }
  ,
  mounted() {
    this.getBestFive();
  },
  head(){
    return{
      title: `الصفحة الرئيسية`,
      meta: [
        {
          hid: `موقع عربي للاختبارات البرمجية`,
          name: `QuizzHunter`,
          content: ` أول موقع عربي يحتوي على اختبارات في لغات البرمجة, يساعدك الموقع على تحسين ادائك في الغات البرمجية `
        }
      ]
    }
    }

}
</script>
