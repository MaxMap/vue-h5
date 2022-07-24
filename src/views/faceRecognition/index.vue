<template>
  <div ref="face" class="pages" :class="aindex === 1 ? 'active' : ''">
    <van-nav-bar
      placeholder
      safe-area-inset-top
      :border="false"
      title="人脸识别"
      left-arrow
      @click-left="onClickLeft"
    />
    <processing v-if="aindex === 1"></processing>
    <status v-if="aindex === 2" :url="database64" :errMsg="err"></status>
  </div>
</template>

<script>
import processing from "./components/processing.vue";
import status from "./components/status.vue";
export default {
  name: "",
  data() {
    return {
      aindex: 1,
      database64: "",
      err: "",
    };
  },
  components: { processing, status },
  mounted() {
    this.$refs.face.style.height = window.innerHeight + "px";
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    goprocessing() {
      this.aindex = 1;
    },
    upfile(database64) {
      this.database64 = database64;
      this.aindex = 2;
    },
  },
};
</script>

<style scoped lang=scss>
/deep/.van-nav-bar .van-icon {
  color: #000;
}
.pages {
  width: 100%;
  height: 100%;
}
.active {
  background: #eff7fd;
  /deep/.van-nav-bar {
    background: #eff7fd;
  }
}
</style>