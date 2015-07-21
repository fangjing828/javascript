/**
 * date format
 * Date 转变成指定格式的 String
 * y - year
 * M - month
 * d - day
 * h - hour
 * m - minute
 * s - second
 * S - millisecond
 *
 * sample
 * new Date().format("yyyy-MM-dd hh:mm:ss.S") -> 2006-07-02 08-09:04.423
 * new Date().format("yyyy-M-d h:m:s.S") -> 2006-7-2 8:9:4.18
 */
 
 Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDay(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"S"  : this.getMilliseconds()
	};
	
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length));
	}
	
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 || o[k] >= 10 ? 
				o[k] : "0" + o[k].toString());
		}
	}
 };
 
 /** NOTE:RegExp
  * RegExp 是 java script 内置对象， 为正则表达式。
  * RegExp.$1 是 RegExp 的一个属性，指的是与正则表达式第一个子匹配(以括号为标志)的字符串。
  * 以此类推， RegExp.$2, RegExp.$3, ..., RegExp.$99 总共可以有 99 个匹配。
  */
  
  /**
   * parseDate("1987-11-21") ->{year:1987,month:11,day:21}
   */
function parseDate(dateStr) {
	var date = {
		year : null,
		month : null,
		day : null
	};
	var r = /^(\d{4})-(\d{1,2})-(\d{1,2})$/
	r.exec(dateStr);
	date.year = RegExp.$1;
	date.month = RegExp.$2;
	date.day = RegExp.$3;

	return date;
}