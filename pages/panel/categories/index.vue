<template>
  <v-container>
    <!--    <v-data-table-->
    <!--      v-model="selected"-->
    <!--      :headers="headers"-->
    <!--      :items="rows"-->
    <!--      :single-select="singleSelect"-->
    <!--      item-key="name"-->
    <!--      show-select-->
    <!--      class="elevation-1"-->
    <!--    >-->
    <!--      <template v-slot:item.crud="{ item }">-->
    <!--        <v-chip-->
    <!--          color="red"-->
    <!--          dark-->
    <!--        >-->
    <!--          {{ item.image }}-->
    <!--        </v-chip>-->
    <!--      </template>-->

    <!--      <template v-slot:top>-->
    <!--        <v-switch-->
    <!--          v-model="singleSelect"-->
    <!--          label="Single select"-->
    <!--          class="pa-3"-->
    <!--        ></v-switch>-->
    <!--      </template>-->
    <!--    </v-data-table>-->

    <v-btn @click="add=true">
      add
    </v-btn>

    <div v-for="row in  rows">
      <div  >
        <div>{{ row.category }} <v-btn v-on:click="editForm(row)">edit</v-btn></div>
        <v-img :src="row.image" width="200"></v-img>
      </div>

    </div>




    <v-dialog
      v-model="edit"
      width="500"
    >


      <v-card>
        <v-card-title class="headline grey lighten-2">
          edit
        </v-card-title>
        <v-divider></v-divider>
        <v-card>


          <div>
            category
            <v-text-field
              v-model="rowToEdit.category"
              label="Outlined"
              outlined
              clearable
            ></v-text-field>


          </div>
          <div>
            image
            <v-text-field
              v-model="rowToEdit.image"
              label="Outlined"
              outlined
              clearable
            ></v-text-field>
          </div>
          <div>
            image file
            <v-file-input
              label="File input"
              outlined
              dense
            ></v-file-input>
          </div>

        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="update()">
            Change
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <v-dialog
      v-model="add"
      width="500"
    >

      <v-card>
        <v-card-title class="headline grey lighten-2">
          add
        </v-card-title>
        <v-divider></v-divider>
        <v-card>


          <div>
            category
            <v-text-field
              v-model="newCategory.category"
              label="Outlined"
              outlined
              clearable
            ></v-text-field>
          </div>

          <div>
            image
            <v-text-field
              v-model="newCategory.image"
              label="Outlined"
              outlined
              clearable
            ></v-text-field>
          </div>

          <div>
            image
            <v-file-input
              label="File input"
              outlined
              dense
            ></v-file-input>
          </div>

        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="create">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
export default {

  layout: 'panel',

  methods: {
    getCategories() {
      this.$axios.get(`${process.env.baseUrl}/api/panel/` + 'categories').then(res => {
        this.rows = res.data
        console.log(res.data);
      })
    },
    editForm(row){
      this.edit=true;
      this.rowToEdit = row;

    },

    update(){
      this.$axios.patch(`${process.env.baseUrl}/api/panel/` + 'categories/'+row.id,{
        image:this.rowToEdit.image,
        category:this.rowToEdit.category
      }).then(res => {
        this.rowToEdit = {};
      })
    },
    create(){
      this.$axios.post(`${process.env.baseUrl}/api/panel/` + 'categories',{
        image:this.newCategory.image,
        category:this.newCategory.category
      }).then(res => {
        this.newCategory = {};
      })
    }
  },

  mounted() {
    this.getCategories();
  },

  data() {
    return {

      singleSelect: false,
      selected: [],
      headers: [
        {text: 'category', value: 'category'},
        {text: 'image', value: 'image'},
        {text: 'crud', value: ''},
      ],
      rows: [],
      edit: false,
      add: false,
      rowToEdit:{},
      newCategory:{
        image:'',
        category:''
      }
    }
  },
}
</script>
