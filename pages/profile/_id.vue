<template>
  <v-container>
    <!-- Profile Header Card -->
    <v-card class="mb-6 elevation-3" color="primary" dark>
      <v-card-text class="pa-6">
        <v-row align="center" justify="center">
          <v-col cols="12" md="auto" class="text-center">
            <v-avatar
              color="white"
              size="120"
              class="elevation-4 mb-4"
            >
              <img
                v-if="user.image"
                :src="user.image"
                :alt="user.firstname + ' ' + user.lastname"
              >
              <v-icon v-else size="60" color="primary">mdi-account</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="8" class="text-center text-md-right">
            <h1 class="text-h4 mb-2">{{ user.firstname }} {{ user.lastname }}</h1>
            <div v-if="user.email" class="text-subtitle-1 mb-3">
              <v-icon small class="mr-2">mdi-email</v-icon>
              {{ user.email }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Tabs Section -->
    <v-card class="mb-6">
      <v-tabs
        v-model="activeTab"
        color="primary"
        slider-color="primary"
        centered
        class="elevation-1"
      >
        <v-tab>
          <v-icon left>mdi-history</v-icon>
          النشاط الأخير
        </v-tab>
        <v-tab v-if="tests.length > 0">
          <v-icon left>mdi-test-tube</v-icon>
          الاختبارات المنشورة
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <!-- Recent Activity Tab -->
        <v-tab-item>
          <v-card-text>
            <div v-if="testSeessions && testSeessions.length > 0">
              <v-row>
                <v-col
                  cols="12"
                  v-for="session in testSeessions"
                  :key="session.id"
                  class="mb-4"
                >
                  <v-card
                    outlined
                    class="elevation-2"
                    :class="session.questions_per_session ? (session.totalPoints/session.questions_per_session >= 0.5 ? 'border-success' : 'border-error') : (session.totalPoints/session.session_questions_count >= 0.5 ? 'border-success' : 'border-error')"
                  >
                    <v-card-text>
                      <v-row align="center">
                        <v-col cols="12" md="1" class="text-center">
                          <v-icon 
                            size="40"
                            :color="session.questions_per_session ? (session.totalPoints/session.questions_per_session >= 0.5 ? 'success' : 'error') : (session.totalPoints/session.session_questions_count >= 0.5 ? 'success' : 'error')"
                          >
                            {{ session.questions_per_session ? (session.totalPoints/session.questions_per_session >= 0.5 ? 'mdi-check' : 'mdi-close') : (session.totalPoints/session.session_questions_count >= 0.5 ? 'mdi-check' : 'mdi-close') }}
                          </v-icon>
                        </v-col>
                        <v-col cols="12" md="8">
                          <div class="text-h6 mb-2">
                            {{ session.test ? session.test.category.category : 'اختبار' }}
                          </div>
                          <div class="text-body-2 mb-2">
                            <v-icon small class="mr-1">mdi-chart-line</v-icon>
                            النتيجة: {{ session.totalPoints }} / {{ session.session_questions_count }}
                          </div>
                          <div class="text-body-2" v-if="session.test">
                            <v-icon small class="mr-1">mdi-clock-outline</v-icon>
                            {{ formatDate(session.created_at) }}
                          </div>
                        </v-col>
                        <v-col cols="12" md="3" class="text-center text-md-left">
                          <v-btn
                            color="primary"
                            outlined
                            :to="'/results/' + session.id"
                            block
                            class="mt-2"
                          >
                            <v-icon left small>mdi-eye</v-icon>
                            تفاصيل الاختبار
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <div v-else class="text-center py-12">
              <v-icon size="64" color="grey lighten-1">mdi-information-outline</v-icon>
              <div class="text-h6 mt-4 grey--text">لا يوجد نشاط حديث</div>
              <div class="text-body-2 grey--text mt-2">ابدأ باجتياز الاختبارات لرؤية نشاطك هنا</div>
            </div>
          </v-card-text>
        </v-tab-item>

        <!-- Published Tests Tab -->
        <v-tab-item>
          <v-card-text>
            <v-row v-if="tests.length > 0">
              <v-col
                xl="3"
                lg="4"
                md="6"
                cols="12"
                v-for="test in tests"
                :key="test.id"
              >
                <testCard :test="test"></testCard>
              </v-col>
            </v-row>
            <div v-else class="text-center py-12">
              <v-icon size="64" color="grey lighten-1">mdi-test-tube</v-icon>
              <div class="text-h6 mt-4 grey--text">لا توجد اختبارات منشورة</div>
            </div>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import testCard from "../../components/tests/test-card";
import axios from 'axios';

export default {
  components: {testCard},
  data() {
    return {
      tests: [],
      activeTab: 0
    }
  },
  async mounted() {
    await this.getTests();
  },
  methods: {
    async getTests() {
      try {
        const response = await axios.get(`${process.env.baseUrl}/api/tests?user_id=${this.$route.params.id}`);
        this.tests = response.data.data || [];
      } catch (error) {
        console.error('Error fetching tests:', error);
        this.tests = [];
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
  async asyncData({params, $axios}) {
    try {
      const [testSeessionsRes, userRes, testsRes] = await Promise.all([
        fetch(`${process.env.baseUrl || 'http://localhost:8080'}/api/testSessions/paginate?user_id=${params.id}`)
          .then(res => res.json())
          .then(res => res.data || []),
        fetch(`${process.env.baseUrl || 'http://localhost:8080'}/api/profile/${params.id}`)
          .then(res => res.json()),
        fetch(`${process.env.baseUrl || 'http://localhost:8080'}/api/tests?user_id=${params.id}`)
          .then(res => res.json())
          .then(res => res.data || [])
      ]);

      return {
        user: userRes,
        testSeessions: testSeessionsRes,
        tests: testsRes
      };
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return {
        user: {},
        testSeessions: [],
        tests: []
      };
    }
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}

.v-avatar {
  border: 4px solid white;
}

.border-success {
  border-left: 4px solid #4caf50 !important;
}

.border-error {
  border-left: 4px solid #f44336 !important;
}
</style>
