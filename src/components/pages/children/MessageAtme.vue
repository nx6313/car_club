<template>
  <div>
    <div class="list-item" v-for="(item, index) in dataList" :key="index"></div>
  </div>
</template>

<script>
export default {
  name: 'message-atme',
  data () {
    return {
      dataList: []
    }
  }
}
</script>

<style scoped>
#content-wrap {
    height: 100vh;
    z-index: 9;
    background: rgb(30, 20, 54);
}
</style>
