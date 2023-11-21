// 艾欧泽亚时间 : 现实时间
const E_TIME_RATIO = 144 / 7

export function getEorzeaTime(utcTime: Date) {
  const NOW_TIME = new Date().getTime() // 取当前时间
  // (时间粒子 x 当前时间) 的结果 向下取整
  // 取后的值大约3秒一变
  const FLOOR_TIME = new Date().setTime(Math.floor(NOW_TIME * E_TIME_RATIO))
  const eorzeaTime = new Date(new Date().setTime(FLOOR_TIME))
  return eorzeaTime
}

export function getHourMinuteToString(time: Date) {
  let hh = time.getHours()
  let mm = time.getHours()
  let ss = time.getSeconds()
  let hourToString = hh < 10 ? "0" + hh : hh
  let minuteToString = mm < 10 ? "0" + mm : mm

  let secondsToString = ss < 10 ? `0${ss}` : ss

  //   return hourToString + ":" + minuteToString
  return `${hourToString}:${minuteToString}:${secondsToString}`
}
