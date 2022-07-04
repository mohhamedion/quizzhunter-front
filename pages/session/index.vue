<template>
  <v-container>

    <div class="my-10 mx-4">
      <v-row>
        <div class="text-h5" v-text="test.category.category"></div>
        <v-spacer></v-spacer>
        <div class="h1">
          <div class="text-h5" v-text="timeLeftString"></div>
        </div>
      </v-row>
    </div>
    <v-divider></v-divider>

    <div>

      <div>
        <div class=" "
             v-text="'questions '+(questionsCount-questions.length+1 + this.questionIndex) + '/' + questionsCount "></div>
        <div class="text-h5  "
             :class="[!questionDirectionIsRtl ? 'rtl text-right' : '',]"
             v-text="questions[this.questionIndex].question.question"></div>
      </div>

      <v-spacer></v-spacer>

      <CodeField v-if="questions[this.questionIndex].question.code" :code="questions[this.questionIndex].question.code"
                 :language="test.category.category.toLowerCase"></CodeField>

      <div class="my-5">

        <div v-for="answer in questions[this.questionIndex].question.answers" class="mt-4"
             @click="chooseAnswer(answer.id)">
          <Answer :answer="answer.answer" :choosen="answers_ids.includes(answer.id)"></Answer>
        </div>

      </div>

      <div class="text-right">
        <v-btn color="primary" @click="answerQuestion">
          {{ $t('session.theAnswer') }}
        </v-btn>
      </div>

    </div>

  </v-container>

</template>

<script>
import Answer from "../../components/sessions/answer";
import CodeField from "../../components/UX-UI/code-field";

export default {

  components: {
    Answer, CodeField
  },
  async asyncData({$axios,redirect}) {
    try{
      const result = await $axios.get(`${process.env.baseUrl}/api/testSessions`);

      let timeLeftString = result.data.timeString;
      let timeInteger = result.data.timeInteger;
      const session = result.data.session;
      const test = session.test;
      const questionsCount = session.session_questions.length;
      const questions = session.session_questions.filter((el) => {
        return !el.answered
      });

      return {session, test, questionsCount, questions, timeLeftString, timeInteger};
    }catch (ex){
      redirect('/');
    }

  },
  methods: {
    chooseAnswer(id) {
      if (this.answers_ids.includes(id)) {
        this.answers_ids.splice(this.answers_ids.indexOf(id), 1);
      } else {
        this.answers_ids.push(id);
      }
    },
    answerQuestion() {
      if(!this.answers_ids.length){
         return;
      }
      this.$axios.post(`${process.env.baseUrl}/api/testSessions/answerQuestion`, {
        answer_ids: this.answers_ids,
        session_question_id: this.questions[this.questionIndex].id
      }).then(res => {
        if (!this.questions[this.questionIndex + 1]) {
          this.endSession();
        } else {
          this.questionIndex++;
          this.answers_ids = [];

        }
      })
    },

    setTimer() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.timeInteger = this.timeInteger - 1;
        if (this.timeInteger <= 0) {
          clearInterval(this.interval)
          this.endSession();
        }
        this.timeLeftString = new Date(this.timeInteger * 1000)
          .toISOString()
          .substr(11, 8);
      }, 1000);
    },

    endSession() {
      clearInterval(this.interval);
      if (this.$router.currentRoute.path == "/session") {
        this.$router.push({path: `/results/${this.session.id}`});
      }
    },


    isRtl(string) {
      let english = /^[A-Za-z0-9]*$/;
      return english.test(string);
    }

  },
  computed:{
    questionDirectionIsRtl(){
     return !this.isRtl(this.questions[this.questionIndex].question.question);
    }

  },
  mounted() {
    this.setTimer();
  },
  data() {
    return {
      interval: null,
      answers_ids: [],
      questionIndex: 0,
      time: '00:50:00',
    }
  }
}
</script>
