export default (navigator = (window && window.navigator) || {}) => {
	let agent = navigator.userAgent,
		weixin = agent.indexOf('MicroMessenger') > -1,
		pad = /pad|tablet|kfapwi/.test(agent.toLowerCase()),
		mobile = !!agent.match(/AppleWebKit.*Mobile.*/) || /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod|Mobile|PlayBook|KFAPWI/i.test(agent) || weixin,
		terminal, kernel;
	if (agent.indexOf('Trident') > -1) {
		kernel = 'trident';
	} else if (agent.indexOf('Presto') > -1) {
		kernel = 'presto';
	} else if (agent.indexOf('AppleWebKit') > -1) {
		kernel = 'webKit';
	} else if (agent.indexOf('Gecko') > -1 && agent.indexOf('KHTML') == -1) kernel = 'gecko';
	if (!!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
		terminal = 'ios';
	} else if (agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1) {
		terminal = 'android';
	} else if (agent.indexOf('Windows') > -1) {
		terminal = 'windows';
	} else if (agent.indexOf("Linux") > -1) terminal = 'linux';
	return {
		// 内核
		kernel: kernel,
		// 移动端
		mobile: mobile,
		// 终端
		terminal: terminal,
		// web应用程序
		webApp: agent.indexOf('Safari') == -1,
		// 手机
		phone: mobile && !pad,
		// 平板
		pad: pad,
		// 微信浏览器
		weixin: weixin,
		// QQ浏览器
		qq: agent.match(/\sQQ/i) == " qq",
		// 语言
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
	};
};
