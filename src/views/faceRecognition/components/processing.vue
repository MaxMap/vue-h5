<template>
  <div class="ai-content">
    <div class="box"></div>
    <div class="video-box">
      <!-- playsinline
      布尔属性，指明视频将内联（inline）播放，即在元素的播放区域内。请注意，没有此属性并不意味着视频始终是全屏播放的 -->
      <div class="demo-container">
        <video
          ref="video"
          playsinline
          id="video"
          preload
          autoplay
          loop
          muted
        ></video>
        <canvas id="canvas" height="750"></canvas>
        <canvas id="canvas-face-upload" height="500" width="375"></canvas>
      </div>
    </div>
    <p class="text">{{ database64 ? "正在上传…" : "识别中…" }}</p>

    <div class="showImg">
      <img :src="database64" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "processing",
  data() {
    return {
      trackerTask: null,
      trackering: null,
      mediaStreamTrack: null,
      database64: null,
    };
  },
  mounted() {
    this.getCompetence();
  },
  methods: {
    getCompetence() {
      var _this = this;
      let flag = true;
      var video = document.getElementById("video");
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      var tracker = new window.tracking.ObjectTracker("face");
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      window.tracking.track("#video", tracker, { camera: true });

      tracker.on("track", function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function (rect) {
          context.strokeStyle = "#ff0000";
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        });
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function (rect) {
          context.strokeStyle = "#a64ceb";
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = "11px Helvetica";
          context.fillStyle = "#fff";
          context.fillText(
            "x: " + rect.x + "px",
            rect.x + rect.width + 5,
            rect.y + 11
          );
          context.fillText(
            "y: " + rect.y + "px",
            rect.x + rect.width + 5,
            rect.y + 22
          );
        });
        if (event.data.length) {
          if (flag) {
            // 裁剪出人脸并绘制下来
            const canvasUpload = document.getElementById("canvas-face-upload");
            const contextUpload = canvasUpload.getContext("2d");
            contextUpload.drawImage(video, 0, 0, 375, 500);
            flag = false;
            // 人脸的basa64
            _this.database64 = canvasUpload.toDataURL("image/jpeg");
            if (_this.database64) {
              setTimeout(() => {
                _this.$parent.upfile(_this.database64);
              }, 1000);
            }
            // console.log("dataURL", _this.database64);
            // ajax请求
            // dataURL.slice(23), // 我们后台需要的basa64不要前缀
          }
        }
      });
    },
  },
};
</script>

<style scoped lang=scss>
.ai-content {
  width: 100%;
  position: relative;
  .showImg {
    position: relative;
    top: 750px;
  }
  .box {
    width: 100%;
    height: 750px;
    background: url("../image/ai-2.png") no-repeat center;
    background-size: cover;
    position: relative;
    z-index: 1;
    /* opacity: 0; */
  }
  .video-box {
    width: 100%;
    height: 750px;
    position: absolute;
    top: 0;
    video {
      object-fit: cover;
    }
    video,
    canvas {
      width: 100vw;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      /* border: #000000 5px solid; */
    }
  }
  .text {
    font-size: 52px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    margin-top: 30px;
    text-align: center;
  }
}
</style>