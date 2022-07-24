<template>
  <div class="content">
    <div class="photo">
      <img class="imgPhoto" :src="url" alt="" />
    </div>

    <p class="success" v-if="!errMsg">打卡成功！</p>
    <p class="error" v-if="errMsg">打卡失败！{{ errMsg }}</p>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    url: String,
    errMsg: String,
  },
  methods: {},
};
</script>

<style scoped lang=scss>
.content {
  padding-top: 56px;
}
.photo-box {
  display: flex;
  flex-direction: center;
}
.photo {
  width: 600px;
  height: 600px;
  margin: 0 auto 38px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  /* img {
    width: 400px;
    height: 400px;
    border-radius: 50%;
  } */
  .imgPhoto {
    width: 600px;
    height: 750px;
    position: absolute;
    /* left: -300px;
    top: -375px; */
    /* transform: scale(0.8); */
  }
}

.success {
  font-size: 52px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #45ac15;
  text-align: center;
}
.error {
  font-size: 52px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ff0000;
  text-align: center;
}
</style>