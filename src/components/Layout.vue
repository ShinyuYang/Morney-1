<template>
  <div class="layout-wrapper" :class="classPrefix &&`${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix &&`${classPrefix}-content`">
      <slot/><!--插槽-->
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  props:['classPrefix'],
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.layout-wrapper{
  display:flex;
  flex-direction: column;
  height:100vh;
}
.content{
  overflow: auto;
  flex-grow: 1;//使内容高度尽量占满
}
.content::-webkit-scrollbar {
  display: none;
}
</style>