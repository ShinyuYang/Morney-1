<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="array2" :value.sync="type"/>
<!--    <Tabs class-prefix="interval" :data-source="array" :value.sync="interval"/>-->
      <ol v-if="groupedList.length>0">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}}<span>¥{{group.total}}</span></h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
                class="record">
              <span>{{tagString(item.tags)}}</span>
              <span class="detailNotes" :style="{marginRight:'auto'}">{{item.notes}}</span>
              <span>¥{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ol>
    <div v-else class="noResult">
      暂无记录
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.noResult{
  padding:16px;
  text-align: center;
}
::v-deep .type-tabs-item{
  background: #c4c4c4;
  box-shadow: 0 0 3px rgba(0,0,0,0.1);
  padding-top:1.5vh;
  padding-bottom: 1vh;
  &.selected{

    background: white;
    &::after{
      display: none;
    }
  }
}
 ::v-deep .interval-tabs-item{
   height:6vh;
   padding-top:2vh;
   padding-bottom:1.5vh;
   line-height:2vh;
   font-size: 18px;
 }
 %item{
   padding:1.5vh 1.5vh;
   line-height:5vh;
   background: rgba(245,245,246);
   display: flex;
   justify-content: space-between;
   align-content: center;
 }

.title{
  padding: 0 16px;
  @extend %item;
}
 .record{
   background:white;
   padding: 5px 16px;
   display: flex;
   justify-content: space-between;
   box-shadow: 0 0 2px rgba(0,0,0,0.1);
 }
 .detailNotes{
   margin-right: auto;
   margin-left: 16px;
   color:#999;
 }
</style>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Money/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';


const api=dayjs();

@Component({
  components:{Tabs},
})
export default class Details extends Vue{
  tagString(tags: Tag[]){
    return tags.length===0?'无' :
    tags.map(t => t. name).join(',');
  }
  beautify(string: string){
    const day=dayjs(string);
    const now=dayjs();
    if(day.isSame(now,'day')){
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'),'day')){
      return  '昨天';
    }else if(day.isSame(now.subtract(2, 'day'),'day')){
      return '前天'
    }else if(day.isSame(now,'year')){
      return day.format('M月D日');
    }
    else{
      return day.format('YYYY年MM月DD日');
    }
  }



  get recordList(){
    return (this.$store.state as RootState).recordList;
  }
  get groupedList(){
    const {recordList}=this;

    // type HashTableValue={title: string;items: RecordItem[] }

    // const hashTable: {title: string;items: RecordItem[]}[];
    const newList=clone(recordList).filter(r=>r.type === this.type).sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
    if(newList.length===0){return[];}
   type Result={title: string;total?: number;items: RecordItem[]}[]
    const result: Result=[{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items: [newList[0]]}]
   for(let i=1;i< newList.length;i++){
     const current =newList[i];
     const last=result[result.length-1];
     if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
        last.items.push(current)
     }else{
       result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'),items: [current]})
     }
   }
   result.map(group=>{group.total=group.items.reduce((sum,item)=>sum+item.amount,0)})
   return result;
  }
  beforeCreate(){
    this.$store.commit('fetchRecords');
  }
  type = '-'
  interval='day'
  array=intervalList;
  array2=recordTypeList
}
</script>
