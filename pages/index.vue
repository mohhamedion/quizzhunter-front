<style>
.mainbg {
  background: url(https://quizzhunter.com/background/background.svg), #2b3137;
  background-size: cover;
}

#line {
  background: #ff0000ad;
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
            <div class="text-h4 ">
              أختبر نفسك في وأبحث عن عمل
            </div>
            <div class="my-2">
              😁 افضل طريقة لتختبر نفسك في مجال عملك
            </div>
            <div class="my-5">
              <v-btn dark to="tests" class="greenbtn" min-width="200" min-height="50">الاختبارات</v-btn>
<!--              <v-btn class="red" min-width="100" min-height="50">HR</v-btn>-->
            </div>
          </v-col>

        </v-row>


      </v-container>
    </v-main>

    <div id="line"></div>

    <v-main>
      <v-container>

        <div class="text-h5 text-center rtl ">ماهو الـ QuizzHunter؟</div>

        <v-row class="my-8">

          <v-col cols="12" lg="6" align="center">
            <v-img width="150" :src="require(`~/assets/img/1328246.svg`)"></v-img>
            <div class="mt-2 text-h6 rtl">
              يتم وضع الاختبارات من قبل اشخاص ذو خبرة, والشركات الباحثة عن موظفين.
            </div>
          </v-col>
          <v-col cols="12" lg="6" align="center">
            <v-img width="150" src="https://www.flaticon.com/svg/static/icons/svg/3400/3400705.svg"></v-img>
            <div class="mt-2 text-h6 rtl">
              هي منصة الكترونية تستطيع من خلالها اجتياز اختبارات في جميع لغات البرمجة.
            </div>
          </v-col>

        </v-row>
        <!--second row-->

        <div class="text-h5 text-center rtl ">لمن موجه الـ QuizzHunter ؟</div>

        <v-row class="my-8">

          <v-col cols="12" lg="6" align="center">
            <v-img width="150" src="https://www.flaticon.com/svg/static/icons/svg/3135/3135682.svg"></v-img>
            <div class="mt-2 text-h6 rtl">
              موجه للشركات البرمجية الباحثة عن موظفين, يقدم QuizzHunter بيانات الاختبارات للشركات, لسهولة انتقاء الموظفين.
            </div>
          </v-col>
          <v-col cols="12" lg="6" align="center">
            <v-img width="150" src="https://www.flaticon.com/svg/static/icons/svg/2463/2463510.svg"></v-img>
            <div class="mt-2 text-h6 rtl">
              موجه للمستجدين الباحثين عن عمل, يساعدك QuizzHunter على الاستعداد لمقابلات العمل.
            </div>
          </v-col>



        </v-row>


      </v-container>

    </v-main>


    <v-main>
      <div class="text-h5 text-center rtl ">ابدأ من هنا.</div>

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
      <v-col
        class="text-center "
        cols="12"
      >
        {{ 2020 }} - {{ new Date().getFullYear() }} — <strong>QuizzHunter</strong>
        <div>
          <NuxtLink to="/contact-us">اتصل بنا</NuxtLink>
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

  }
  ,
  mounted() {
    this.getBestFive();
  }
}
</script>
