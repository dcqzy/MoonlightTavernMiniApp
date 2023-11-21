<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useLocalTimeStore } from "./stores/localTime";

const localTimeStore = useLocalTimeStore();
onLaunch(() => {
  console.log("App Launch");
  uni.hideTabBar();
  // 初始化本地时间
  // useLocalTimeStore().setNowTime(new Date());
  localTimeStore.setNowTime(new Date(new Date().setTime(1700509965969 + 300000)))
  // 开启计时器 每1000ms刷新一次本地时间变量
  setInterval(()=>{
    // useLocalTimeStore().setNowTime(new Date());
    localTimeStore.setNowTime(new Date(new Date().setTime(localTimeStore.nowTime?.getTime()! + 1000)))
  },1000)
});
onShow(() => {
  console.log("App Show");
  uni.hideTabBar();
});
onHide(() => {
  console.log("App Hide");
})
</script>
<style>
uni-page-body,
html,
body,
page {
  height: 100%;
  background:linear-gradient(#476FB5 50%, #ffffff 50%)
}
</style>
