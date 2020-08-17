class GetPeriod {
  constructor() {
    this.now = new Date();
    this.nowYear = this.now.getYear(); //当前年 
    this.nowMonth = this.now.getMonth(); //当前月 
    this.nowDay = this.now.getDate(); //当前日 
    this.nowDayOfWeek = (this.now.getDay() == 0) ? 7 : this.now.getDay(); //今天是本周的第几天 
    this.nowYear += (this.nowYear < 2000) ? 1900 : 0;
  }
  //格式化数字
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  //格式化日期(年-月-日)
  formatDate(date) {
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();
    return [myyear, mymonth, myweekday].map(this.formatNumber).join('-');
  }
  //格式化日期（月-日）
  formatDate2(date) {
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();
    return [mymonth, myweekday].map(this.formatNumber).join('-');
  }
  //获取某月的天数
  getMonthDays(myMonth) {
    let monthStartDate = new Date(this.nowYear, myMonth, 1);
    let monthEndDate = new Date(this.nowYear, myMonth + 1, 1);
    let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }
  //获取本季度的开始月份
  getQuarterStartMonth() {
    let startMonth = 0;
    if (this.nowMonth < 3) {
      startMonth = 0;
    }
    if (2 < this.nowMonth && this.nowMonth < 6) {
      startMonth = 3;
    }
    if (5 < this.nowMonth && this.nowMonth < 9) {
      startMonth = 6;
    }
    if (this.nowMonth > 8) {
      startMonth = 9;
    }
    return startMonth;
  }
  //获取今天的日期
  getNowDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, this.nowDay));
  }
  //获取本周的开始日期
  getWeekStartDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, this.nowDay - this.nowDayOfWeek + 1));
  }
  //获取本周的结束日期
  getWeekEndDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, this.nowDay + (6 - this.nowDayOfWeek + 1)));
  }
  //获取本周7天的星期日期
  getNowWeeks() {
    let weekStartDay = this.nowDay - this.nowDayOfWeek + 1
    let weekEndDay = this.nowDay + (6 - this.nowDayOfWeek + 1)
    let weekName = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    let nowWeeks=[]
    for(var i=0; i<weekEndDay-weekStartDay+1; i++){
      nowWeeks[i] = { id:i+1, week: weekName[i], date: this.formatDate2(new Date(this.nowYear,this.nowMonth, weekStartDay+i))}
    }
    return nowWeeks
  }
  //获取上周7天的星期日期
  getLastWeeks() {
    let weekStartDay = this.nowDay - this.nowDayOfWeek + 1 - 7
    let weekEndDay = this.nowDay + (6 - this.nowDayOfWeek + 1) - 7
    let weekName = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    let nowWeeks = []
    for (var i = 0; i < weekEndDay - weekStartDay + 1; i++) {
      nowWeeks[i] = { id: i + 1, week: weekName[i], date: this.formatDate2(new Date(this.nowYear, this.nowMonth, weekStartDay + i)) }
    }
    return nowWeeks
  }
  //获取下周7天的星期日期
  getNextWeeks() {
    let weekStartDay = this.nowDay - this.nowDayOfWeek + 1 + 7
    let weekEndDay = this.nowDay + (6 - this.nowDayOfWeek + 1) + 7
    let weekName = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    let nowWeeks = []
    for (var i = 0; i < weekEndDay - weekStartDay + 1; i++) {
      nowWeeks[i] = { id: i + 1, week: weekName[i], date: this.formatDate2(new Date(this.nowYear, this.nowMonth, weekStartDay + i)) }
    }
    return nowWeeks
  }
  //获取本月的开始日期
  getMonthStartDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, 1));
  }
  //获取本月的结束日期
  getMonthEndDate() {
    return this.formatDate(new Date(this.nowYear, this.nowMonth, this.getMonthDays(this.nowMonth)));
  }
  //获取本季度的开始日期
  getQuarterStartDate() {
    return this.formatDate(new Date(this.nowYear, this.getQuarterStartMonth(), 1));
  }
  //获取本季度的结束日期 
  getQuarterEndDate() {
    return this.formatDate(new Date(this.nowYear, this.getQuarterStartMonth() + 2, this.getMonthDays(this.getQuarterStartMonth() + 2)));
  }
  //获取本年的开始日期
  getYearStartDate() {
    return this.formatDate(new Date(this.nowYear, 0, 1));
  }
  //获取本年的结束日期
  getYearEndDate() {
    return this.formatDate(new Date(this.nowYear, 11, 31));
  }
  //获取时段方法
  getPeriod(obj) {
    let opts = obj || {}, time = null;
    opts = {
      periodType: opts.periodType || 'now',
      spaceType: opts.spaceType || '~'
    }
    function formatNumber(param1, param2) {
      return [param1, param2].join(opts.spaceType);
    }
    if (opts.periodType == 'week') {
      time = formatNumber(this.getWeekStartDate(), this.getWeekEndDate());
    } else if (opts.periodType == 'month') {
      time = formatNumber(this.getMonthStartDate(), this.getMonthEndDate());
    } else if (opts.periodType == 'quarter') {
      time = formatNumber(this.getQuarterStartDate(), this.getQuarterEndDate());
    } else if (opts.periodType == 'year') {
      time = formatNumber(this.getYearStartDate(), this.getYearEndDate());
    } else {
      time = formatNumber(this.getNowDate(), this.getNowDate());
    }
    return time;
  }
}
module.exports = GetPeriod;