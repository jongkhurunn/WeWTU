const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//获取本周是第几周
const getWeekNum = s => {
  var dayDiff = parseInt((new Date() - new Date(s)) / (1000 * 3600 * 24))
  var dayOfWeek = (new Date(s).getDay() == 0) ? 7 : new Date(s).getDay()
  return Math.ceil((dayDiff - 7 + dayOfWeek) / 7 + 1)
}

module.exports = {
  formatTime: formatTime,
  getWeekNum: getWeekNum
}
