<style>
@import '~/assets/css/results.css';
</style>
<template>
  <v-container>

    <div class="text-h4 text-right">
      "{{ result.test.category.category }}: {{ result.test.level.level }}" نتائج الاختبار
    </div>

    <v-alert :type="percent >= 50 ? 'passed' : 'fail' " class="my-5">
      <div class="text-h4 text-center my-5">
        <div v-if="percent >= 50">
          نجحت في الاختبار
        </div>
        <div v-else>
          لم تنجح في الاختبار
        </div>
      </div>
    </v-alert>

    <div class="text-center text-h5"
         v-if="result.showRate"
    >
      ماهو تقييمك لهذا الاختبار؟
      <v-rating
        hover
        length="5"
        size="57"
        background-color="grey lighten-2"
        :color="percent>=50 ? 'green' : 'red'"
        @input="rate"
      ></v-rating>
    </div>


    <div class="my-9">


      <v-row class="text-center">
        <v-col>
          <div class="text-h3">{{ marks }}</div>
          <span class="text--disabled">marks</span>

        </v-col>
        <v-col>
          <div class="text-h3">{{ percent }}%</div>
          <span class="text--disabled">percent</span>

        </v-col>

        <v-col>
          <div class="text-h3">{{ points }}</div>
          <span class="text--disabled">wining point</span>
        </v-col>
      </v-row>

    </div>

    <div v-for="sessionQuestion in sessionQuestions">

      <div class="py-5">
        <Question
          :question="sessionQuestion.question.question"
          :code="sessionQuestion.question.code"
          :correct="(sessionQuestion.mark>=0.5)"
        ></Question>
        <div v-for="answer in sessionQuestion.question.answers">
          <Answer
            :answer="answer.answer"
            :choosen="sessionQuestion.session_answers.filter(el=> el.answer_id===answer.id).length" :correct="answer.correct"></Answer>
        </div>


        <Explanation
          v-if="sessionQuestion.question.explanation"
          :explanation="sessionQuestion.question.explanation"
        ></Explanation>

      </div>
    </div>

  </v-container>
</template>

<script>
import Answer from "../../components/results/answer";
import Question from "../../components/results/question";
import Explanation from "../../components/results/note";

export default {

  components: {
    Answer,
    Question,
    Explanation
  },

  async asyncData({$axios, params}) {
    const response = await $axios.get(`${process.env.baseUrl}/api/result/${params.id}`);
    const result = response.data;

    const sessionQuestions = result.session_questions;
    const marks =
      sessionQuestions
        .map(el => el.mark)
        .reduce((x, y) => {
          return x + y;
        }) || 0;
    const percent = Math.trunc((marks * 100) / sessionQuestions.length);
    const points = marks / 2;
    return {result, sessionQuestions, marks, percent, points};
  },
  methods: {
    rate(rate) {
      this.$axios.post(`${process.env.baseUrl}/api/rate`, {
        rate: rate,
        test_id: parseInt(this.result.test_id)
      }).then(res=>{
        this.result.showRate=false;
      })
    }
  },
  data() {
    return {
      correct: {
        icon: 'mdi-check',
        color: 'correct'
      },
      incorrect: {
        icon: 'mdi-alpha-x',
        color: 'incorrect'
      },
    }
  }
}
</script>
