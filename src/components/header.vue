<template>
  <div class="header-box">
    <div class="logo-box">logo</div>
    <div class="menu-box">
      <p class="menu-item" v-for="(item, index) in list" :key="index">{{ item.label }}</p>
    </div>
  </div>
</template>

<script setup>
const list = [
  { label: "首页", value: "home" },
  { label: "产品", value: "product" },
  { label: "方案应用", value: "application" },
  { label: "服务支持", value: "service" },
  { label: "关于我们", value: "aboutUs" },
];
</script>

<style lang="scss" scoped>
.header-box {
  width: 100%;
  height: 50px;
  // background: pink;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .logo-box {
    width: 20%;
    height: 100%;
    // background: pink;
  }
  .menu-box {
    display: flex;
    justify-content: space-around;
    width: 80%;
    // background: yellow;
    .menu-item {
        // margin-left: 40px;
        cursor: pointer;
        font-size: 18px;
    }
  }
}
</style>
