<template>
<div></div>
</template>

<script lang="ts">
import Vue from'vue';
import {Component,Prop} from'vue-property-decorator';
import "echarts"
@Component
export default class Chart extends Vue {
  @Prop() options: any
}
</script>

<style lang="scss" scoped>

</style>