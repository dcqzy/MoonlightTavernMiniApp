<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
  uni.hideTabBar();
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
