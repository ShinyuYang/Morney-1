<template>
<Layout class-prefix="layout">
  <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  <Tabs :data-source="recordTypeList"
        :value.sync="record.type"/>
  <Notes field-name="日期"
         type="date"
         placeholder="输入日期"
         :value.sync="record.createdAt"
        />
<!--  自选时间-->
  <Notes field-name="备注"
         placeholder="点击填写备注~"
         :value="record.notes"
         @update:value="onUpdateNotes"/>
  <Tags2 @update:value="record.tags=$event"/>
<!--  前者传给子组件数据,后者是从子组件传进来-->
<!--  onUpdateTags是本组件的一个方法,update:value是子组件的事件(传入value)-->
</Layout>
</template>


<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags2 from '@/components/Money/Tags2.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Money/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';




@Component({
  components: {Tabs, Tags2,Notes,NumberPad},
})
export default class Money extends Vue  {
  get recordList(){
    return this.$store.state.recordList;
  }

recordTypeList = recordTypeList;

      record: RecordItem={
        tags: [],
        notes: '',
        type: '-',
        amount: 0,
        createdAt: new Date().toISOString()
      };

      created(){
        this.$store.commit('fetchRecords')
      }

     onUpdateNotes(value: string){
        this.record.notes=value;
     }
  onUpdateAmount(value: string){
    this.record.amount= parseFloat(value);
  }
  saveRecord(){
    if(!this.record.tags||this.record.tags.length===0){
      return window.alert('请至少选择一个标签');
        }
    this.$store.commit('createRecord',this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      this.record.notes='';
    }
  }
}
</script>

<style lang="scss" >
  .layout-content{
    display:flex;
    flex-direction: column-reverse;
  }
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

</style>