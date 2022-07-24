<template>
  <div class="home" ref="home">
    <van-nav-bar
      title="移动端功能展示"
      border
      fixed
      placeholder
      safe-area-inset-top
    />
    <div class="content">
      <van-button
        v-for="(item, index) in routerArr"
        :disabled="item.path === '/' ? true : false"
        :key="index"
        type="default"
        @click="details(item.path)"
      >
        {{ item.meta ? item.meta.title : "" }}
        <van-icon v-if="item.path === '/'" name="wap-home" />
        <van-icon v-else name="star" color="#ffe104" />
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      routerArr: [],
    };
  },
  mounted() {
    this.routerArr = this.$router.options.routes;
    this.$refs.home.style.height = window.innerHeight + "px";
  },
  methods: {
    details(path) {
      this.$router.push({
        path,
      });
    },
  },
};
</script>

<style scoped lang=scss>
.home {
  width: 100%;
  background: linear-gradient(300deg, #e4f6ff, #f9feff);
}
.content {
  width: 100%;
  height: auto;
  padding: 16px;
  box-sizing: border-box;
  /deep/.van-button {
    display: block;
    width: 100%;
    margin-bottom: 40px;
  }
}
</style>