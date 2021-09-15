<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-theme-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        v-model="collapsed"
        :trigger="null"
        collapsible
        :theme="navTheme"
        width="256px"
      >
        <div class="logo">HYC{{ navTheme }}-{{ navLayout }}</div>
        <SideMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 修改主题 -->
    <SettingDrawer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SideMenu from "./SideMenu.vue";
import SettingDrawer from "../components/SettingDrawer.vue";
export default {
  name: "BasicLayout",
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
  components: {
    Header,
    Footer,
    SideMenu,
    SettingDrawer,
  },
  created() {
    console.log(this.$route.query);
  },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
.logo {
  height: 32px;
  margin: 16px;
  line-height: 32px;
  text-align: center;
  overflow: hidden;
}
/* >>> 深度作用选择器 ，只作用于css，但如果是sass/less的话可能无法识别，这时候需要使用 /deep/ 选择器。 */
.nav-theme-dark >>> .logo {
  color: white;
}
</style>
