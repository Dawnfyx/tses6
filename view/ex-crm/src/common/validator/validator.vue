<template>
  <div>
    <h2>这是验证页面</h2>
    <p>正在进行验证测试</p>
    <input type="text">
    <button @click="validator(this)"> 确定</button>
  </div>
</template>

<script>

  import validator from "scripts/validator";

  export default {
    name: "validator",
    methods: {
      validator(obj){
        debugger
      }
    }
  }

</script>

<style scoped>
  input{
    border: 1px solid red
  }
</style>
