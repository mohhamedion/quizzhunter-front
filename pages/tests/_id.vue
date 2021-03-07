<template>
  <v-container>
    <v-row>
      <v-col md="4" cols="12" align="center">
        <v-card
          :loading="loading"
          class="my-4"
          max-width="374"
        >
          <template slot="progress">
            <v-progress-linear
              color="primary"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="220"
            :src="test.category.image"
          ></v-img>

          <v-card-title>{{ test.category.category }}</v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="test.totalRate"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">
                {{ test.totalRate }} ({{ test.sessions_count }})
              </div>
            </v-row>

            <div class="my-4 subtitle-1"></div>

            <div class="text-right">
              {{ test.description }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <!--      <v-card-title>Tonight's availability</v-card-title>-->

          <v-card-text
            class=""
          >
            <v-chip-group
              active-class="accent-4 white--text "
              column
            >

              <v-chip
                class="red"
                text-color="white"
                small
              >{{ test.level.level }}
              </v-chip>
              <v-chip
                color="primary"
                text-color="white"
                small
              >{{ test.questions_per_session }} اسألة
              </v-chip>

              <v-chip
                color="badge-category"
                text-color="dark"
                small
              >{{ test.second_per_question * test.questions_per_session }} ثانية
              </v-chip>

            </v-chip-group>
          </v-card-text>

          <v-list>
            <v-list-item>
              {{ test.user.firstname }} {{ test.user.lastname }}
              <v-spacer></v-spacer>
              : الكاتب
            </v-list-item>
          </v-list>


          <v-card-actions>

            <v-btn
              width="100%"
              color="primary white--text"
              @click="reserve"
            >
              <v-card-text>اختبر الان</v-card-text>
            </v-btn>


          </v-card-actions>


          <v-card-actions>
            <v-btn
              width="100%"
              color="green white--text"
              v-if="sessionExist"
              to="/session"
            >
              <v-card-text>اكمال الاختبار السابق</v-card-text>
            </v-btn>

          </v-card-actions>


        </v-card>
      </v-col>

      <v-col md="8" cols="12">


        <v-list v-if="bestUsers.length">
          <h2 class="text-right">الافضل اخر 30 يوما</h2>

          <v-list-item-group
          >
            <v-list-item
              align="center"

              v-for="(item, i) in bestUsers"
              :key="i"
            >
              <v-list-item-icon>
                {{ badges[i] }}
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.user.firstname"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>{{ item.totalPoints }}/{{ item.session_questions_count }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>{{ item.inTime }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>10px</v-list-item-title>
              </v-list-item-content>

            </v-list-item>


          </v-list-item-group>


        </v-list>

        <v-list v-if="lastSessions.length">
          <h2 class="text-right">اخر المختبرين</h2>

          <v-list-item-group
          >
            <v-list-item
              align="center"
              v-for="(item, i) in lastSessions"
              :key="i"
            >


              <v-list-item-content>
                <v-list-item-title v-text="item.user.firstname +' '+ item.user.lastname"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>{{ item.totalPoints }}/{{ item.session_questions_count }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>{{ item.created_at.substr(0, item.created_at.indexOf('T')) }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-title>
                  <v-icon :color="(item.totalPoints/item.session_questions_count>=0.5) ?  'green' : 'red' ">
                    {{ (item.totalPoints / item.session_questions_count >= 0.5) ? 'mdi-check' : 'mdi-alpha-x' }}
                  </v-icon>
                </v-list-item-title>
              </v-list-item-content>

            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div>
          <h2 class="text-right">التعليقات</h2>
          <v-textarea
            v-model="inputComment"
            name="input-7-1"
            filled
            class="text-right"
            label="علق"
          ></v-textarea>

          <div class="text-right">
            <v-btn
              class="dark--text"
              @click="createComment"
              depressed
            >
              علق
            </v-btn>
          </div>
          <div class="my-5">
            <div v-for="comment in comments" :key="comment.id">
              <Comment :comment="comment" :replyComment="replyComment"></Comment>
            </div>
          </div>
        </div>

      </v-col>

    </v-row>
    <v-dialog
      @click:outside="closeDialog"
      v-model="login"
      persistent
      max-width="290"
    >
      <RegisterForm :callbackFunction="closeDialog"></RegisterForm>
    </v-dialog>

  </v-container>
</template>


<script>
import Comment from "../../components/comments/comment";
import RegisterForm from '../../components/register-form/register-form';

export default {
  components: {Comment, RegisterForm},

  data: () => ({
    loading: false,
    login: false,
    selection: 1,
    inputComment: '',

    badges: ['🥇', '🥈', '🥉'],


    items: [
      {
        icon: 'mdi-inbox',
        text: 'Inbox',
      },
      {
        icon: 'mdi-star',
        text: 'Star',
      },
      {
        icon: 'mdi-send',
        text: 'Send',
      },
      {
        icon: 'mdi-email-open',
        text: 'Drafts',
      },
    ],
  }),

  async asyncData({$axios, $auth, params}) {
    let lastSessions = await fetch(`${process.env.baseUrl}/api/testSessions/get-users-result/${params.id}`).then(res =>
      res.json()
    );
    let bestUsers = await fetch(`${process.env.baseUrl}/api/testSessions/best-users/${params.id}`).then(res =>
      res.json()
    );
    const result = await $axios.get(`${process.env.baseUrl}/api/tests/${params.id}`);
    const test = result.data.data;
    const comments = test.comments;
    let sessionExist;
    if ($auth.loggedIn) {
      sessionExist = (await $axios.get(`${process.env.baseUrl}/api/testSessions/current-session-exist`)).data;
    }


    return {test, bestUsers, lastSessions, sessionExist, comments};
  },

  methods: {
    closeDialog() {
      this.login = false;
    },
    createComment() {
      this.$axios
        .post(`${process.env.baseUrl}/api/comments`, {
          test_id: this.test.id,
          comment: this.inputComment,
        })
        .then(response => {
          this.unshiftComment(response.data);
          this.inputComment = '';
        });
    },
    replyComment(commentId, input, replayComments) {
      this.$axios
        .post(`${process.env.baseUrl}/api/comments`, {
          test_id: this.test.id,
          comment: input,
          comment_id: commentId,
          tagging: []
        })
        .then(response => {
          replayComments.unshift(response.data);
        });
    },

    unshiftComment(comment) {
      this.comments.unshift(comment);
    },
    reserve() {
      this.startSession();

    },
    startSession() {

      if (!this.$auth.loggedIn) {
        this.login = true;
        return;
      }
      this.loading = true;


      this.$axios.post(`${process.env.baseUrl}/api/testSessions`,
        {
          test_id: this.$route.params.id
        }).then(res => {
        this.$router.push({path: '/session'});

      }).catch(err => {
        alert('err')
      });
    }
  },


  head() {

    return {
      title: `${this.test.category.category} اختبار في الـ `,
      meta: [
        {
          hid: `${this.test.description}`,
          name: `${this.test.description}`,
          content: `${this.test.category.category}  يحتوي هذا الاختبار على اسألة في لغة الـ `
        }
      ]
    }
  }
}
</script>
