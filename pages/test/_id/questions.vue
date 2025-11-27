<template>
  <v-container v-if="test">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h5">
            الاختبار: {{ test.category && test.category.category }} - {{ test.level && test.level.level }}
          </v-card-title>
          <v-card-subtitle>
            {{ test.second_per_question }} ثانية لكل سؤال | 
            {{ test.questions_per_session }} سؤال لكل جلسة
            <span v-if="test.price > 0">| السعر: <span>$</span>{{ test.price }}</span>
          </v-card-subtitle>
          <v-card-text>
            <div v-if="test.description" class="mb-4">
              <strong>الشرح:</strong> {{ test.description }}
            </div>
            <div v-if="test.title" class="mb-4">
              <strong>العنوان:</strong> {{ test.title }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="testForm = !testForm"
            >
              {{ testForm ? 'إلغاء التعديل' : 'تعديل تفاصيل الاختبار' }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="questions.length > 0"
              color="success"
              :disabled="!canPublish"
              @click="publishTest"
            >
              نشر الاختبار
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Edit Test Form -->
        <v-expand-transition>
          <v-card v-if="testForm" class="mt-4">
            <v-card-title>تعديل تفاصيل الاختبار</v-card-title>
            <v-card-text>
              <v-form ref="testFormRef">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="editForm.category"
                      :items="categories"
                      item-text="category"
                      item-value="id"
                      label="الفئة *"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="editForm.level"
                      :items="levels"
                      item-text="level"
                      item-value="id"
                      label="الصعوبة *"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.number="editForm.second_per_question"
                      label="عدد الثواني لكل سؤال *"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.number="editForm.questions_per_session"
                      label="عدد الأسئلة لكل جلسة *"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model.number="editForm.price"
                      label="السعر"
                      type="number"
                      step="0.01"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editForm.title"
                      label="العنوان"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="editForm.description"
                      label="الشرح *"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="testForm = false">إلغاء</v-btn>
              <v-btn color="primary" @click="updateTest">حفظ التغييرات</v-btn>
            </v-card-actions>
          </v-card>
        </v-expand-transition>
      </v-col>
    </v-row>

    <!-- Add Question Form -->
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="text-h6">
            {{ editingQuestion ? 'تعديل السؤال' : 'إضافة سؤال جديد' }}
          </v-card-title>
          <v-card-text>
            <v-form ref="questionForm">
              <v-row>
                <v-col cols="12" md="6">
                  <v-textarea
                    v-model="questionForm.code"
                    label="الكود (اختياري)"
                    rows="5"
                    hint="أضف مقتطف الكود إذا لزم الأمر"
                    persistent-hint
                    class="code-textarea"
                    dir="ltr"
                    style="direction: ltr;"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                  <v-textarea
                    v-model="questionForm.question"
                    label="السؤال *"
                    rows="5"
                    :rules="[v => !!v || 'السؤال مطلوب']"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        إضافة الشرح (اختياري)
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-textarea
                          v-model="questionForm.explanation"
                          label="الشرح"
                          rows="3"
                          hint="سيتم عرض هذا بعد الاختبار"
                          persistent-hint
                        ></v-textarea>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-col>
              </v-row>

              <!-- Answers Section -->
              <v-divider class="my-4"></v-divider>
              <div class="text-h6 mb-4">الإجابات</div>
              
              <v-row>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="newAnswer"
                    label="إضافة إجابة"
                    @keyup.enter="addAnswer"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    color="primary"
                    block
                    :disabled="!newAnswer"
                    @click="addAnswer"
                  >
                    إضافة إجابة
                  </v-btn>
                </v-col>
              </v-row>

              <div class="text-caption mb-2">
                انقر على إجابة لتحديدها كصحيحة. إجابة صحيحة واحدة على الأقل مطلوبة.
              </div>

              <v-list>
                <v-list-item
                  v-for="(answer, index) in questionForm.answers"
                  :key="index"
                  :class="answer.correct ? 'success lighten-4' : ''"
                  @click="answer.correct = !answer.correct"
                  style="cursor: pointer;"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      <span v-html="renderAnswer(answer.answer)"></span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      :value="answer.correct"
                      :input-value="answer.correct"
                      @click.stop="answer.correct = !answer.correct"
                    ></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn
                      icon
                      small
                      color="error"
                      @click.stop="removeAnswer(index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="editingQuestion"
              @click="cancelEdit"
            >
              إلغاء
            </v-btn>
            <v-btn
              color="success"
              :disabled="!canSaveQuestion"
              @click="editingQuestion ? updateQuestion() : createQuestion()"
            >
              {{ editingQuestion ? 'تحديث السؤال' : 'إنشاء السؤال' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Questions List -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            الأسئلة ({{ questions.length }})
          </v-card-title>
          <v-card-text>
            <div v-if="questions.length === 0" class="text-center py-8">
              <v-icon size="64" color="grey">mdi-help-circle-outline</v-icon>
              <div class="text-h6 mt-4">لا توجد أسئلة بعد</div>
              <div class="text-caption">أضف سؤالك الأول أعلاه</div>
            </div>
            <v-list v-else>
              <v-list-item
                v-for="(question, index) in questions"
                :key="question.id"
                class="mb-4"
              >
                <v-card outlined style="width: 100%;">
                  <v-card-title>
                    السؤال رقم {{ index + 1 }}
                    <v-spacer></v-spacer>
                    <v-btn
                      icon
                      small
                      color="primary"
                      @click="editQuestion(question, index)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      small
                      color="error"
                      @click="deleteQuestion(question.id, index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div v-if="question.code" class="mb-2" dir="ltr" style="direction: ltr;">
                      <v-card dark color="grey darken-4">
                        <v-card-text>
                          <pre style="margin: 0; white-space: pre-wrap; direction: ltr; text-align: left;">{{ question.code }}</pre>
                        </v-card-text>
                      </v-card>
                    </div>
                    <div class="text-h6 mb-2">{{ question.question }}</div>
                    <div v-if="question.explanation" class="text-caption mb-2">
                      <strong>الشرح:</strong> {{ question.explanation }}
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="text-subtitle-2 mb-2">الإجابات:</div>
                    <v-chip
                      v-for="answer in question.answers"
                      :key="answer.id"
                      :color="answer.correct ? 'success' : 'default'"
                      class="mr-2 mb-2"
                    >
                      <span v-html="renderAnswer(answer.answer)"></span>
                      <v-icon v-if="answer.correct" small class="ml-1">mdi-check</v-icon>
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <div class="mt-4">جاري تحميل الاختبار...</div>
          </v-card-text>
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
      test: null,
      questions: [],
      categories: [],
      levels: [],
      testForm: false,
      loading: false,
      editingQuestion: false,
      editingIndex: null,
      questionForm: {
        question: null,
        code: null,
        explanation: null,
        answers: []
      },
      newAnswer: '',
      editForm: {}
    }
  },
  computed: {
    canPublish() {
      return this.questions.length >= 2
    },
    canSaveQuestion() {
      return (
        this.questionForm.question &&
        this.questionForm.answers.length >= 2 &&
        this.questionForm.answers.some(a => a.correct)
      )
    }
  },
  async fetch() {
    try {
      const testId = this.$route.params.id
      
      // Fetch test data, categories, and levels
      const [testRes, categoriesRes, levelsRes] = await Promise.all([
        this.$axios.get(`/api/tests/getDraftTestsById/${testId}`),
        this.$axios.get('/api/categories'),
        this.$axios.get('/api/levels')
      ])
      
      if (testRes.data && testRes.data[0]) {
        this.test = testRes.data[0]
        this.questions = this.test.questions || []
        this.editForm = {
          category: this.test.category && this.test.category.id,
          level: this.test.level && this.test.level.id,
          title: this.test.title,
          description: this.test.description,
          second_per_question: this.test.second_per_question,
          questions_per_session: this.test.questions_per_session,
          price: this.test.price || 0
        }
      }
      
      this.categories = categoriesRes.data
      this.levels = levelsRes.data
    } catch (error) {
      console.error('Error fetching test:', error)
      this.$toast.error('فشل تحميل الاختبار')
    }
  },
  methods: {
    renderAnswer(answerText) {
      if (!answerText || typeof answerText !== 'string') {
        return answerText || '';
      }
      
      // Replace <code> tags with styled code containers
      // Handle multi-line code by preserving newlines
      return answerText.replace(
        /<code>(.*?)<\/code>/gs,
        (match, codeContent) => {
          // Escape HTML entities but preserve newlines and formatting
          const escaped = codeContent
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          
          // Check if code has newlines - if so, render as block
          const hasNewlines = /[\r\n]/.test(codeContent);
          const wrapperClass = hasNewlines ? 'answer-code-wrapper-block' : 'answer-code-wrapper';
          const codeClass = hasNewlines ? 'answer-code-block' : 'answer-code';
          
          return `<span class="${wrapperClass}"><code class="${codeClass}">${escaped}</code></span>`;
        }
      );
    },
    addAnswer() {
      if (!this.newAnswer.trim()) return
      
      this.questionForm.answers.push({
        answer: this.newAnswer.trim(),
        correct: false
      })
      this.newAnswer = ''
    },
    removeAnswer(index) {
      this.questionForm.answers.splice(index, 1)
    },
    async createQuestion() {
      if (!this.$refs.questionForm.validate()) return
      
      if (this.questionForm.answers.length < 2) {
        this.$toast.error('إجابتان على الأقل مطلوبتان')
        return
      }
      
      if (!this.questionForm.answers.some(a => a.correct)) {
        this.$toast.error('إجابة صحيحة واحدة على الأقل مطلوبة')
        return
      }
      
      this.loading = true
      
      try {
        const response = await this.$axios.post('/api/questions', {
          question: this.questionForm.question,
          explanation: this.questionForm.explanation,
          code: this.questionForm.code,
          answers: this.questionForm.answers,
          test_id: this.$route.params.id
        })
        
        this.questions.unshift(response.data[0])
        this.clearQuestionForm()
        this.$toast.success('تم إنشاء السؤال بنجاح!')
      } catch (error) {
        console.error('Error creating question:', error)
        this.$toast.error('فشل إنشاء السؤال')
      } finally {
        this.loading = false
      }
    },
    async updateQuestion() {
      if (!this.editingQuestion || this.editingIndex === null) return
      
      this.loading = true
      
      try {
        const question = this.questions[this.editingIndex]
        const response = await this.$axios.patch(`/api/questions/${question.id}`, {
          question: this.questionForm.question,
          explanation: this.questionForm.explanation,
          code: this.questionForm.code,
          answers: this.questionForm.answers,
          test_id: this.$route.params.id
        })
        
        this.questions[this.editingIndex] = response.data
        this.cancelEdit()
        this.$toast.success('تم تحديث السؤال بنجاح!')
      } catch (error) {
        console.error('Error updating question:', error)
        this.$toast.error('فشل تحديث السؤال')
      } finally {
        this.loading = false
      }
    },
    editQuestion(question, index) {
      this.editingQuestion = true
      this.editingIndex = index
      this.questionForm = {
        question: question.question,
        code: question.code || null,
        explanation: question.explanation || null,
        answers: question.answers.map(a => ({
          answer: a.answer,
          correct: a.correct
        }))
      }
      
      // Scroll to form
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    },
    cancelEdit() {
      this.editingQuestion = false
      this.editingIndex = null
      this.clearQuestionForm()
    },
    clearQuestionForm() {
      this.questionForm = {
        question: null,
        code: null,
        explanation: null,
        answers: []
      }
      this.newAnswer = ''
    },
    async deleteQuestion(questionId, index) {
      if (!confirm('هل أنت متأكد من حذف هذا السؤال؟')) return
      
      try {
        await this.$axios.delete(`/api/questions/delete/${questionId}`)
        this.questions.splice(index, 1)
        this.$toast.success('تم حذف السؤال')
      } catch (error) {
        console.error('Error deleting question:', error)
        this.$toast.error('فشل حذف السؤال')
      }
    },
    async updateTest() {
      this.loading = true
      
      try {
        await this.$axios.patch(`/api/tests/${this.test.id}`, this.editForm)
        await this.$fetch() // Refresh test data
        this.testForm = false
        this.$toast.success('تم تحديث الاختبار بنجاح!')
      } catch (error) {
        console.error('Error updating test:', error)
        this.$toast.error('فشل تحديث الاختبار')
      } finally {
        this.loading = false
      }
    },
    async publishTest() {
      if (!this.canPublish) {
        this.$toast.error('تحتاج إلى سؤالين على الأقل للنشر')
        return
      }
      
      if (!confirm('هل أنت متأكد من نشر هذا الاختبار؟ سيتم إرساله للموافقة من قبل المشرف.')) {
        return
      }
      
      this.loading = true
      
      try {
        await this.$axios.patch(`/api/tests/publish/${this.test.id}`)
        this.$toast.success('تم نشر الاختبار بنجاح! في انتظار موافقة المشرف.')
        this.$router.push(`/tests/${this.test.id}`)
      } catch (error) {
        console.error('Error publishing test:', error)
        this.$toast.error('فشل نشر الاختبار')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
::v-deep .answer-code-wrapper {
  display: inline-block;
  margin: 2px 4px;
  vertical-align: middle;
}

::v-deep .answer-code-wrapper-block {
  display: block;
  margin: 4px 0;
}

::v-deep .answer-code {
  display: inline-block;
  background-color: #2d2d2d;
  color: #f8f8f2;
  border: 1px solid #404040;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.5;
  direction: ltr;
  text-align: left;
  unicode-bidi: embed;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  overflow-x: auto;
}

::v-deep .answer-code-block {
  display: block;
  background-color: #2d2d2d;
  color: #f8f8f2;
  border: 1px solid #404040;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 4px 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.6;
  direction: ltr;
  text-align: left;
  unicode-bidi: embed;
  white-space: pre;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  overflow-x: auto;
}

::v-deep .v-chip .answer-code {
  background-color: #2d2d2d;
  color: #f8f8f2;
  border-color: #404040;
}

/* Dark mode support */
.theme--dark ::v-deep .answer-code,
.theme--dark ::v-deep .answer-code-block {
  background-color: #1e1e1e;
  color: #d4d4d4;
  border-color: #3e3e3e;
}

.theme--dark ::v-deep .v-chip .answer-code,
.theme--dark ::v-deep .v-chip .answer-code-block {
  background-color: #1e1e1e;
  color: #d4d4d4;
  border-color: #3e3e3e;
}
</style>

<style scoped>
.code-textarea {
  font-family: 'Courier New', monospace;
}
</style>

