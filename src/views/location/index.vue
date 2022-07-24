<template>
  <div class="poition">
    <div id="container" style="height: 200px; display: none"></div>
    <van-nav-bar
      title="腾讯定位"
      border
      fixed
      placeholder
      safe-area-inset-top
    />
    <!-- <p>tips:之前使用高德地图结果与真实位置相差太远，3，400米的距离</p> -->
    定位结果：
    <p>latitude:{{ latitude }}</p>
    <p>longitude:{{ longitude }}</p>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  name: "",
  data() {
    return {
      mIndex: 0,
      map: {},
      latitude: "",
      longitude: "",
      getLocation: "",
      time: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 腾讯地图应用开发平台创建，左边密钥，右面时应用名称
      var geolocation = new window.qq.maps.Geolocation(
        "AT2BZ-YJKCS-LSYOQ-6HMGS-BQ5QJ-IRBQH",
        "zhao"
      );
      // 回调的第一次参数为成功后具体的位置信息
      geolocation.getLocation(
        (postion) => {
          // console.log("成功getLocation", postion);
          geolocation.watchPosition(() => {
            // console.log("watchPosition", postion);
            this.latitude = postion.lat;
            this.longitude = postion.lng;
            geolocation.clearWatch();
          });
        },
        () => {
          // console.log("定位失败", err);
          Notify({
            type: "danger",
            message: "获取用户经纬度失败",
            duration: 1000,
          });
        }
      );
    },
  },
};
</script>

<style scoped lang=scss>
.poition {
  background: linear-gradient(300deg, #e4f6ff, #f9feff);
  width: 100vw;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
}
</style>