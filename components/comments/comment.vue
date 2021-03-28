<template>

  <div>
    <v-alert
      colored-border
      color="deep-purple accent-4"
      elevation="2"
    >
      <div class="text-right">
        <NuxtLink :to="'/profile/'+comment.user.id">{{ comment.user.firstname }} {{ comment.user.lastname }}</NuxtLink>

        <v-avatar>
          <img
            :src="require(`~/assets/img/quizzhunter.png`)"
            alt="John"
          >
        </v-avatar>
      </div>
      <v-spacer></v-spacer>

      <div class="text-right">
        {{ comment.comment }}
      </div>
      <v-divider></v-divider>
      <div v-for="comment in replayComments">
        <SubComment :comment="comment"></SubComment>
      </div>

      <v-textarea
        v-model="inputComment"
        name="input-7-1"
        filled
        class="text-right"
        label="علق"
      ></v-textarea>

      <div class="text-right">
        <v-btn @click="()=>{replyComment(comment.id,inputComment,replayComments); inputComment=null}">
          رد
        </v-btn>
      </div>

    </v-alert>

  </div>
</template>

<script>
import SubComment from './sub-comment';

export default {
  components: {SubComment},
  data() {
    return {
      replayComments: this.comment.comments,
      inputComment: null
    }
  },

  props: ['comment', 'replyComment'],

}
</script>
