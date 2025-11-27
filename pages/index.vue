<style>
.mainbg {
  background: linear-gradient(135deg, #2b3137 0%, #1a1f24 100%);
  background-size: cover;
  min-height: 500px;
  display: flex;
  align-items: center;
}

#line {
  background: rgba(255, 0, 0, 0.68);
  padding-top: 0.75em;
  height: 4px;
}

.greenbtn {
  box-shadow: 0 4px 12px rgb(77 186 151 / 50%);
  transition: all 0.3s ease;
}

.greenbtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgb(77 186 151 / 60%);
}

.rtl {
  direction: rtl;
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 3rem;
  position: relative;
  padding-bottom: 1rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #4d96e4, #77ba99);
  border-radius: 2px;
}

@media (max-width: 960px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 1.1rem;
  }
}

/* Bottom section - respect dark mode */
.home-bottom-section {
  background-color: #f5f5f5;
}

.theme--dark .home-bottom-section {
  background-color: #121212 !important;
}

.theme--dark .home-bottom-section .v-container {
  background-color: transparent;
}
</style>
<template>
  <div dir="ltr">


    <v-main class="mainbg">
      <v-container>
        <v-row align="center" justify="center">
          <v-col lg="5" cols="12" class="text-center text-lg-right" dir="ltr" style="direction: ltr;">
            <div dir="ltr" style="direction: ltr;">
              <CodeField code="    class Employee {
          public fullname;
          public sallary;

          function findJob();
          function passTest();
          function resiveSallary();
        }    " language="php" color="white--text"></CodeField>
            </div>
          </v-col>

          <v-col lg="7" cols="12" class="white--text text-center text-lg-right">
            <h1 class="hero-title">
              أختبر نفسك في مجالك وأبحث عن عمل
            </h1>
            <div class="hero-subtitle">
              😁 أفضل طريقة لتختبر نفسك في مجال عملك
            </div>
            <div class="mt-6">
              <v-btn 
                large
                dark 
                to="tests" 
                class="greenbtn mr-3 mb-3" 
                min-width="200" 
                min-height="56"
              >
                <v-icon left>mdi-test-tube</v-icon>
                الاختبارات
              </v-btn>
              <v-btn
                v-if="$auth.loggedIn"
                large
                dark
                to="/create-test"
                color="success"
                class="mb-3"
                min-width="200"
                min-height="56"
              >
                <v-icon left>mdi-plus-circle</v-icon>
                إنشاء اختبار
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <div id="line"></div>

    <v-main class="py-12">
      <v-container>
        <h2 class="section-title text-center rtl">ماهو الـ QuizzHunter؟</h2>

        <v-row class="mb-12">
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="feature-card elevation-3" height="100%">
              <v-card-text class="text-center pa-6">
                <v-avatar size="120" color="primary" class="mb-4">
                  <v-img 
                    :src="require(`~/assets/img/1328246.svg`)"
                    contain
                  ></v-img>
                </v-avatar>
                <h3 class="text-h6 mb-3 rtl">اختبارات احترافية</h3>
                <p class="text-body-1 rtl grey--text text--darken-1">
                  يتم وضع الاختبارات من قبل أشخاص ذوي خبرة، والشركات الباحثة عن موظفين.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="feature-card elevation-3" height="100%">
              <v-card-text class="text-center pa-6">
                <v-avatar size="120" color="success" class="mb-4">
                  <v-img 
                    :src="require(`~/assets/img/programing.png`)"
                    contain
                  ></v-img>
                </v-avatar>
                <h3 class="text-h6 mb-3 rtl">جميع لغات البرمجة</h3>
                <p class="text-body-1 rtl grey--text text--darken-1">
                  منصة إلكترونية تستطيع من خلالها اجتياز اختبارات في جميع لغات البرمجة.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <h2 class="section-title text-center rtl mt-12">لمن موجه الـ QuizzHunter؟</h2>

        <v-row class="mb-12">
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="feature-card elevation-3" height="100%">
              <v-card-text class="text-center pa-6">
                <v-avatar size="120" color="info" class="mb-4">
                  <v-img 
                    :src="require(`~/assets/img/choosing.png`)"
                    contain
                  ></v-img>
                </v-avatar>
                <h3 class="text-h6 mb-3 rtl">للشركات</h3>
                <p class="text-body-1 rtl grey--text text--darken-1">
                  موجه للشركات البرمجية الباحثة عن موظفين، يقدم QuizzHunter بيانات الاختبارات للشركات، لسهولة انتقاء الموظفين.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="feature-card elevation-3" height="100%">
              <v-card-text class="text-center pa-6">
                <v-avatar size="120" color="warning" class="mb-4">
                  <v-img 
                    :src="require(`~/assets/img/interview.png`)"
                    contain
                  ></v-img>
                </v-avatar>
                <h3 class="text-h6 mb-3 rtl">للباحثين عن عمل</h3>
                <p class="text-body-1 rtl grey--text text--darken-1">
                  موجه للمستجدين الباحثين عن عمل، يساعدك QuizzHunter على الاستعداد لمقابلات العمل.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>


    <v-main class="py-12 home-bottom-section">
      <v-container>
        <h2 class="section-title text-center rtl mb-8">ابدأ من هنا</h2>
        <v-row v-if="bestFive && bestFive.length > 0">
          <v-col 
            xl="3" 
            lg="4" 
            md="6" 
            cols="12" 
            v-for="(test,i) in bestFive" 
            :key="test.id"
            v-if="i !== 4"
          >
            <testCard :test="test"></testCard>
          </v-col>
        </v-row>
        <div v-else class="text-center py-12">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
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
