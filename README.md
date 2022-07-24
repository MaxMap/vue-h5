# vue-h5 :star::star::star::star::star:

> 用于实现vue在移动端浏览器的交互功能

## 以实现的功能

- [人脸识别](#人脸识别) :heavy_check_mark:
- [定位/实时定位](#实时定位) :heavy_check_mark:
- [JSbridge桥接原生app](#JSbridge桥接原生app) :heavy_check_mark:

## 人脸识别 :art:

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

## 实时定位 :art:

> 采用 [腾讯定位webjs](https://lbs.qq.com/service/webService/webServiceGuide/webServiceOverview)

> 注意点：定位结果需要在https协议下才可以看到，这是浏览器硬要求
> 可以使用内网穿透办法达到这个要求，作者使用的是ngrolk  
> 这里说明下，为什么使用腾讯定位吗，而没有使用其他定位
      1.高德定位与实际位置偏差过大，
      2.百度地图捣鼓半天没成功，放弃了

### 使用方法

1.在index.html 添加外链

```html
  <script src="https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
```


2. 在对应组件添加相关方法

```js
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

```

## JSbridge桥接原生app :art:

### 使用方法

1. 在src/utils 创建jsJSbridge.js
2. 添加内容
```js
let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

//这是必须要写的，用来创建一些设置
function setupWebViewJavascriptBridge(callback) {
    //Android使用
    if (isAndroid) {
        if (window.WebViewJavascriptBridge) {
            console.log('回调信息1')
            callback(window.WebViewJavascriptBridge);
        } else {
            console.log('回调信息2')
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                () => {
                    callback(window.WebViewJavascriptBridge);
                },
                false
            );
        }
        console.log('tag', '安卓');
        sessionStorage.phoneType = 'android';
    }

    //iOS使用
    if (isiOS) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(() => {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
        console.log('tag', 'ios');
        sessionStorage.phoneType = 'ios';
    }
}
//注册回调函数，第一次连接时调用 初始化函数(android需要初始化,ios不用)
setupWebViewJavascriptBridge((bridge) => {
    if (isAndroid) {
        //初始化
        bridge.init((message, responseCallback) => {
            var data = {
                'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
        });
    }
});

export default {
    // js调APP方法 （参数分别为:app提供的方法名  传给app的数据  回调）
    callHandler(name, data, callback) {
        setupWebViewJavascriptBridge((bridge) => {
            console.log('开始调用安卓方法了')
            bridge.callHandler(name, data, callback);
        });
    },
    // APP调js方法 （参数分别为:js提供的方法名  回调）
    registerHandler(name, callback) {
        setupWebViewJavascriptBridge((bridge) => {
            bridge.registerHandler(name, (data, responseCallback) => {
                callback(data, responseCallback);
            });
        });
    }
};

```

3. 在main.js添加
```js
import Bridge from './utils/JSbridge'
app.config.globalProperties.$bridge = Bridge
```

4. 组件中使用
```js
/**
 * 调用app方法
 * name 方法名
 * val 传给app的参数
 * callback 回调函数 
 * */

this.$bridge.callHandler("name", val, (res) => {
      const data = JSON.parse(res);
    });

/**
 * app调用前端方法
 * name js方法名
 * callback 回调函数 
 * */

this.$bridge.registerHandler("name", (res) => {
      console.log('我调用了前端方法')
    });
```


