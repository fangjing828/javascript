/**
 * bind:
 * bind(eventType, [eventData], handler(eventObject)) 在匹配的元素上绑定指定类型的事件函数
 * bind(eventType, [eventData], preventBubble)        preventBubble 若为 false, 阻止浏览器默认行为并停止事件冒泡，默认 true
 * bind(events) 绑定多个事件， events 的键为事件类型，值为对应事件的处理函数。
 * one(eventType, [eventData], handler(eventObject))  在匹配的元素上绑定指定类型的事件函数，此函数最多执行一次。
 *
 * 调用过程
 * JQuery.fn.bind -> JQuery.event.add
 * JQuery.fn.bind -> JQuery.event.add
 */
 
 JQuery.each(["bind", "one"], function(i, name) {
	JQuery.fn[name] = function(type, data, fn) {
		var handler;
		
		/* bind(events) */
		if (typeof type === "object") {
			for (var key in type) {
				this[name](key, data, type[key], fn);
			}
			return this;
		}
		
		/**
		 * bind(eventType, [eventData], handler(eventObject))
		 * bind(eventType, [eventData], preventBubble)
		 *
		 * bind(a, b) => bind(a, undefined, b)
		 * bind(a, false) => bind(a, undefined, false)
		 */
		if (arguments.length === 2 || data = false) {
			fn = data;
			data = undefined;
		}
		
		if (name === "one") {
			handler = function(event) {\
				JQuery(this).unbind(event, handler);
				return fn.apply(this, arguments);
			}
			/* synchronize handler guid from fn guid*/
			handler.guid = fn.guid || JQuery.guid++;
		} else {
			handler = fn;
		}
		
		/* process unload event */
		if (type === "unload" && name != "one") {
			this.one(type, data, fn);
		} else {
			/*bind event to match elements*/
			for (var i = 0, l = this.length; i < l; i++) {
				JQuery.event.add(this[i], type, handler, data);
			}
		}
		
		return this;
	};
 });