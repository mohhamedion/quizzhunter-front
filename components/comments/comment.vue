<template>

  <div>
    <v-alert
      colored-border
      color="deep-purple accent-4"
      elevation="2"
    >
      <div :class="this.$languageHelper.textClass()">
<!--        <DirectionSwitcherComponent :first="1" :second="2" >        </DirectionSwitcherComponent>-->

        <template v-if="this.$languageHelper.siteIsRtl()">

          <NuxtLink :to="'/profile/'+comment.user.id">{{ comment.user.firstname }} {{ comment.user.lastname }}</NuxtLink>
          <v-avatar>
            <img
              :src="require(`~/assets/img/quizzhunter.png`)"
              :alt="comment.user.firstname"
            >
          </v-avatar>
        </template>

        <template v-else>
          <v-avatar>
            <img
              :src="require(`~/assets/img/quizzhunter.png`)"
              :alt="comment.user.firstname"
            >
          </v-avatar>
          <NuxtLink :to="'/profile/'+comment.user.id">{{ comment.user.firstname }} {{ comment.user.lastname }}</NuxtLink>

        </template>


      </div>
      <v-spacer></v-spacer>
      <div :class="this.$languageHelper.isRtl(comment.comment) ? 'text-right' : ''" class="mt-2 mb-2">
        {{ comment.comment }}
      </div>
      <v-divider ></v-divider>
      <v-btn @click="()=>{ this.replayToComment = comment.id }">
        {{ $t('comment.replay') }}
      </v-btn>



      <div v-for="comment in replayComments">
        <SubComment :comment="comment"></SubComment>
      </div>

      <template v-if="replayToComment===comment.id">
        <v-textarea
          v-model="inputComment"
          name="input-7-1"
          filled
          class="text-right"
          :label="$t('comment.leaveComment')"
        ></v-textarea>

        <div class="text-right">
          <v-btn @click="()=>{replyComment(comment.id,inputComment,replayComments); inputComment=null}">
            {{ $t('comment.replay') }}
          </v-btn>
        </div>
      </template>

    </v-alert>

  </div>
</template>

<script>
import SubComment from './sub-comment';
import DirectionSwitcherComponent from '@/components/DirectionSwitcherComponent';

export default {
  components: {SubComment,DirectionSwitcherComponent},
  data() {
    return {
      replayComments: this.comment.comments,
      inputComment: '',
      replayToComment:''
    }
  },

  props: ['comment', 'replyComment'],

}
</script>
