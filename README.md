# vue-h5 :star:

> 用于实现vue在移动端浏览器的交互功能

## 以实现的功能

- [人脸识别](#人脸识别) :heavy_check_mark:
- [定位/实时定位](#实时定位) :heavy_check_mark:

## 人脸识别

> 采用了[tracking.js](https://trackingjs.com/) 技术  
> 该功能兼容**ios浏览器** 和 **安卓浏览器**

### 使用方法

1.在官网下载包放入public/tracking (可以直接用我现在的这个)

2.在public/index.html引入

```html
<script src="./tracking/build/tracking-min.js"></script>
<script src="./tracking/build/data/face-min.js"></script>
<script src="./tracking/examples/assets/stats.min.js"></script>

```

3.创建相关div
```html
<!-- 具体内容看相关组件 -->
<template>
... 
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
...
</template>
```
4.调用方法
```js
//具体内容看相关组件
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
          }
        }
      });
    },

```


