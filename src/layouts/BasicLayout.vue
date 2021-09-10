<template>
  <div>
    <Header />
    <Footer />
    <SideMenu />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SideMenu from "./SideMenu.vue";
export default {
  name: "BasicLayout",
  components: {
    Header,
    Footer,
    SideMenu,
  },
};
</script>

<style></style>
