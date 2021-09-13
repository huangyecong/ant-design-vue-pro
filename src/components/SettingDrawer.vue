<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width="300px"
    >
      <template slot="handle">
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h2>整体风格</h2>
        <a-radio-group
          name="radioGroup"
          @change="(e) => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio value="dark"> 黑色 </a-radio>
          <a-radio value="light"> 白色 </a-radio>
        </a-radio-group>
        <h2>导航模式</h2>
        <a-radio-group
          :value="$route.query.navLayout || 'left'"
          name="radioGroup"
          @change="(e) => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio value="left"> 左侧 </a-radio>
          <a-radio value="top"> 顶部 </a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      navTheme: "drak",
      navLayout: "left",
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    // 主题设置,选择主题相关参数保存到路由中
    // 比如：/dashboard/analysis?navTheme=dark&navLayout=left
    handleSettingChange(type, value) {
      console.log(type, value);
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
      console.log(this.$route);
    },
  },
};
</script>
<style scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  background-color: #1890ff;
  width: 48px;
  height: 48px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
