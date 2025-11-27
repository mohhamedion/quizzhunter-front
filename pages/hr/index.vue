<template >
  <v-container >

<div class="text-center">
  ماهو نوع الاختصاص الذي تبحث عنه؟
<div>
  تساعدك هذه الاداة على البحث عن الموظفين بأختصاصات معينة
</div>

  <div class="text-center my-1">
    <v-select
      v-model="selectedItems"
      :items="['Php','Javascript','Sql','Laravel']"
      chips
      label="الاختصاصات"
      multiple
      solo
    ></v-select>
  </div>

  <v-btn>أبحث</v-btn>

</div>

<div class="my-5">
  <template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:item.points="{ item }">
          <div class="green--text">{{ formatPoints(item.points) }}</div>
      </template>
      <template v-slot:item.id="{ item }">
         <v-btn class="green--text">أرسل دعوة لأنجاز اختبار</v-btn>
        <v-btn class="red--text">تواصل</v-btn>
      </template>
    </v-data-table>
  </template>
</div>


</v-container>

</template>
<script>

export default{
  layout:'hr',
  data(){
    return{
      selectedItems:[],

      headers: [
        {
          text: 'FirstName',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'lastname', value: 'lastname' },
        { text: 'points', value: 'points' },
        { text: 'country', value: 'country' },
        { text: 'option', value: 'id' },
      ],
      desserts: [
        {
          name: 'First Yogurt',
          lastname: 'Frozen Yogurt',
          points: 100,
          country: 'syria',
          id: '1',
        },
        {
          name: 'First Yogurt',
          lastname: 'Frozen Yogurt',
          points: 76,
          country: 'syria',
          id: '1',
        },
      ],
    }
  },
  methods: {
    formatPoints(value) {
      return parseFloat(value).toFixed(1);
    }
  }
}

</script>
