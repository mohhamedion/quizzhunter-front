<template>


  <v-container>
    <v-row>
      <v-col lg="3" cols="12">

        <div class="bg-grey">

          <v-select
            :items="levels"
            item-value="id"
            item-text="level"
            v-model="search.level"
            :menu-props="{ maxHeight: '400' }"
            :label="$t('testsPage.level.text')"
            :hint="$t('testsPage.level.choose')"
            persistent-hint
            v-on:change="filter"
          ></v-select>

          <v-select
            :items="categories"
            item-value="id"
            item-text="category"
            v-model="search.category"
            :menu-props="{ maxHeight: '400' }"
            :label="$t('testsPage.category.text')"
            :hint="$t('testsPage.category.choose')"
            persistent-hint
            v-on:change="filter"
          ></v-select>

          <v-btn v-if="this.search.level||this.search.category" class="col-12" @click="clearFilter">

            {{$t('testsPage.clearFilter')}}
          </v-btn>
        </div>
      </v-col>

      <v-col lg="9" cols="12">
        <div v-if="notFound">
          <div class="text-h5 text-center">{{$t('testsPage.notFound')}}</div>
        </div>
        <v-row align="center">
          <v-col xl="3" lg="4" cols="12" class="my-6" v-if="!tests.length && !notFound">
            <v-skeleton-loader
              class="mx-auto border"
              max-width="220"
              type="card"
            ></v-skeleton-loader>
          </v-col>
          <v-col xl="3" lg="4" cols="12" v-for="test in tests" :key="test.id">
            <testCard :test="test"></testCard>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>


</template>
<script>
import testCard from "../../components/tests/test-card";

export default {
  loading: true,
  components: {testCard},
  data() {
    return {
      categories: [],
      levels: [],
      tests: [],
      notFound:false,
      search: {
        level: null,
        category: null
      },
      page: 1,
      lastPage: 0,
    }
  },
  created() {
    this.search.category = this.$route.query.category;
    this.search.level = this.$route.query.level;
  },
  methods: {
    clearFilter(){
      this.search = {
        level:null,
        category:null
      }
      this.addQueryToUrl()
      this.getTests();
    },
    addQueryToUrl() {
      this.$router.push({
        path: "tests",
        query: {
          level: this.search.level,
          category: this.search.category
        }
      });
    },

    async getTests() {
      this.notFound=false;

      let url = `/api/tests?
             filter[level]=${this.search.level ?? ''}
             &filter[category]=${this.search.category ?? ''}
             &page=${this.page}`;
      let result = await fetch(`${process.env.baseUrl}${url}`).then(res =>
        res.json()
      );
      this.tests =  result.data;
      if(!this.tests.length){
        this.notFound=true;
      }
    },

    async filter() {
      this.page = 1;
      this.lastPage = 0;
      this.tests = [];
      this.addQueryToUrl();
      await this.getTests();
    }
  },
  async fetch() {

    this.categories = await fetch(`${process.env.baseUrl}/api/categories`).then(res =>
      res.json()
    );

    this.levels = await fetch(`${process.env.baseUrl}/api/levels`).then(res =>
      res.json()
    );

    await this.getTests();

  },
  fetchOnServer: false

}
</script>
