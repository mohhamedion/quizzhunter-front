<template>
  <v-container>
    <v-row>
      <!-- Draft Tests Sidebar -->
      <v-col v-if="draftTests.length > 0" cols="12" md="4">
        <v-card>
          <v-card-title class="text-h6">
            الاختبارات المعلقة
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(test, index) in draftTests"
                :key="test.id"
                class="mb-2"
              >
                <v-card outlined>
                  <v-card-text>
                    <div class="d-flex justify-space-between align-center">
                      <div>
                        <div class="font-weight-bold">{{ (test.category && test.category.category) || 'غير محدد' }}</div>
                        <div class="text-caption">{{ (test.level && test.level.level) || 'غير محدد' }}</div>
                        <div class="text-caption">{{ test.second_per_question }} ثانية لكل سؤال</div>
                      </div>
                      <div class="d-flex flex-column">
                        <v-btn
                          small
                          color="primary"
                          class="mb-1"
                          :to="'/test/' + test.id + '/add-questions'"
                        >
                          إضافة أسئلة
                        </v-btn>
                        <v-btn
                          small
                          color="error"
                          @click="deleteDraftTest(test.id, index)"
                        >
                          حذف
                        </v-btn>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Test Creation Form -->
      <v-col :cols="draftTests.length > 0 ? 12 : 12" :md="draftTests.length > 0 ? 8 : 12">
        <v-card>
          <v-card-title class="text-h5">
            إنشاء اختبار جديد
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.category"
                    :items="categories"
                    item-text="category"
                    item-value="id"
                    label="الفئة *"
                    :error-messages="errors.category"
                    :rules="[v => !!v || 'الفئة مطلوبة']"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="formData.level"
                    :items="levels"
                    item-text="level"
                    item-value="id"
                    label="الصعوبة *"
                    :error-messages="errors.level"
                    :rules="[v => !!v || 'الصعوبة مطلوبة']"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="formData.second_per_question"
                    label="عدد الثواني لكل سؤال *"
                    type="number"
                    :error-messages="errors.second_per_question"
                    :rules="[v => !!v || 'عدد الثواني لكل سؤال مطلوب']"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model.number="formData.questions_per_session"
                    label="عدد الأسئلة لكل جلسة *"
                    type="number"
                    :error-messages="errors.questions_per_session"
                    :rules="[v => (!!v && v >= 2) || 'الحد الأدنى سؤالين مطلوب']"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="formData.title"
                    label="العنوان"
                    hint="اختياري: وصف موضوع الاختبار (مثل: المصفوفات، الدوال)"
                    persistent-hint
                    :error-messages="errors.title"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="formData.description"
                    label="الشرح *"
                    rows="3"
                    hint="اشرح ما هو هذا الاختبار ولمن هو مخصص"
                    persistent-hint
                    :error-messages="errors.description"
                    :rules="[v => !!v || 'الشرح مطلوب']"
                    required
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <span>إضافة فيديو يوتيوب</span>
                        <template v-slot:actions>
                          <v-icon color="error">mdi-youtube</v-icon>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-text-field
                          v-model="formData.video"
                          label="رابط الفيديو"
                          hint="الصق رابط فيديو يوتيوب"
                          persistent-hint
                          :error-messages="errors.video"
                        ></v-text-field>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              large
              :loading="loading"
              :disabled="!valid || loading"
              @click="createTest"
            >
              إنشاء الاختبار وإضافة الأسئلة
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      valid: false,
      loading: false,
      categories: [],
      levels: [],
      draftTests: [],
      formData: {
        category: null,
        level: null,
        title: null,
        description: null,
        second_per_question: null,
        questions_per_session: null,
        video: null,
        price: 0
      },
      errors: {}
    }
  },
  async fetch() {
    try {
      // Fetch categories and levels
      const [categoriesRes, levelsRes, draftsRes] = await Promise.all([
        this.$axios.get('/api/categories'),
        this.$axios.get('/api/levels'),
        this.$axios.get('/api/tests/getDraftTests')
      ])
      
      this.categories = categoriesRes.data
      this.levels = levelsRes.data
      this.draftTests = draftsRes.data
    } catch (error) {
      console.error('Error fetching data:', error)
        this.$toast.error('فشل تحميل البيانات')
    }
  },
  methods: {
    handleApiError(error, action = 'تنفيذ العملية') {
      // Reset errors
      this.errors = {}
      
      if (error.response && error.response.data) {
        const errorData = error.response.data
        
        // Handle Laravel validation errors
        if (errorData.errors && typeof errorData.errors === 'object') {
          // Check if it's validation errors (object with field names as keys)
          const isValidationErrors = Object.keys(errorData.errors).some(key => 
            Array.isArray(errorData.errors[key])
          )
          
          if (isValidationErrors) {
            // Map Laravel validation errors to form field errors
            Object.keys(errorData.errors).forEach(field => {
              // Convert field names to match form data (e.g., 'second_per_question' stays the same)
              const fieldName = field
              if (errorData.errors[field] && Array.isArray(errorData.errors[field])) {
                this.errors[fieldName] = errorData.errors[field]
              }
            })
            
            // Show first error as toast
            const firstError = Object.values(errorData.errors)[0]
            if (firstError && firstError[0]) {
              this.$toast.error(firstError[0])
            }
          } else {
            // Custom exception error (errors is a string)
            const errorMessage = typeof errorData.errors === 'string' 
              ? errorData.errors 
              : errorData.message || `فشل ${action}`
            this.$toast.error(errorMessage)
          }
        } else if (errorData.message) {
          // Generic error message
          this.$toast.error(errorData.message)
        } else if (errorData.error) {
          // Alternative error format
          this.$toast.error(typeof errorData.error === 'string' ? errorData.error : 'حدث خطأ')
        } else {
          this.$toast.error(`فشل ${action}`)
        }
      } else {
        this.$toast.error(`فشل ${action}: ${error.message || 'خطأ غير معروف'}`)
      }
      
      console.error(`Error ${action}:`, error)
    },
    async createTest() {
      if (!this.$refs.form.validate()) {
        return
      }

      this.loading = true
      this.errors = {}

      try {
        const response = await this.$axios.post('/api/tests', this.formData)
        
        // Response is an array like the old frontend
        if (response.data && response.data.length > 0 && response.data[0]) {
          this.$toast.success('تم إنشاء الاختبار بنجاح!')
          // Redirect to add questions page
          this.$router.push(`/test/${response.data[0].id}/add-questions`)
        } else {
          this.$toast.error('فشل إنشاء الاختبار: استجابة غير صحيحة')
        }
      } catch (error) {
        this.handleApiError(error, 'إنشاء الاختبار')
      } finally {
        this.loading = false
      }
    },
    async deleteDraftTest(testId, index) {
      if (!confirm('هل أنت متأكد من حذف هذا الاختبار المسودة؟')) {
        return
      }

      try {
        await this.$axios.delete(`/api/tests/deleteDraftTest/${testId}`)
        this.draftTests.splice(index, 1)
        this.$toast.success('تم حذف الاختبار المسودة')
      } catch (error) {
        this.$toast.error('فشل حذف الاختبار المسودة')
        console.error('Error deleting draft:', error)
      }
    }
  }
}
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>

