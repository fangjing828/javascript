/**
 * JQuery.event.add 是 JQuery 事件绑定最终实现。
 * 执行过程
 * 1. JQuery._data 从 JQuery.cache 获取已有的事件缓存。
 * 2. 如果 DOM 元素第一次绑定该类型事件句柄，则DOM 元素绑定 JQuery.event.handler 作为统一事件的响应入口。
 * 3. 将封装后事件句柄放入缓存。
 * 4. DOM 事件句柄 elementData.handle = JQuery.event.handle
 */
 
 /** 
  * 缓存 $.cache 事件句柄数据结构
  */
 elementData = {
	events: {
		'click':[
			{
				guid:5,
				type:'click',
				namespaces:'',
				data:undefined,
				handle:{
					guid: 5,
					prototype:{}
				},
				{...}
			}
		],
		'keypress':[...]
	},
	/* DOM event handle */
	handle: {
		elem: elem,
		prototype:{}
	}
 }
 
 /* JQuery.event.add */
 JQuery.event = {
	/* bind event to an element */
	add: function(elem, types, handler, data) {
		/* ignore text comment */
		if (elem.nodeType === 3 || elem.nodeType === 8) {
			return;
		}
		
		/* bind(eventType, [eventData], preventBubble)*/
		if (handler === false) {
			handler = returnFalse;
		} else if (!handler) {
			return; // if handler is undefined or null or '', stop execute after code.
		}
		
		var handleObjIn, handleObj;
		
		/* if handler boxed by JQuery */
		if (handler.handler) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}
		
		if (!handler.guid) {
			handler.guid = JQuery.guid++;
		}
		
		var elemData = JQuery._data(elem);
		
		/* if no elemData is found then we must be trying to bind to one of the banned  noData element*/
		if (! elemData) {
			return;
		}
		
		var events = elemData.events,
			eventHandle = elemData.handle;
			
		if (!events) {
			elemData.handle = eventHandle = function(e) {
				return typeof JQuery !== "undefined" && (!e || JQuery.event.triggered !== e.type) ?
					JQuery.event.handle.apply(eventHandle.elem, arguments) :
					undefined;
			};
		}
		
		eventHandle.elem = elem;
		types = types.split(" ");
		
		for (var i = 0, len = types.length; i < len; i++) {
			var type = types[i];
			handleObj = handleObjIn ? JQuery.extend({}, handleObjIn) :
				{handler:handler, data:data};
			
			var namespaces;
			if (type.indexOf(".") > -1) {
				namespaces = type.split(".");
				handleObj.namespace = namespaces.slice(0).sort().join(".");
			} else {
				namespaces = [];
				handleObj.namespace = "";
			}
			
			handleObj.type = type;
			if (!handleObj.guid) {
				handleObj.guid = handler.guid;
			}
			
			/* get the current list of function bound to this event*/
			var handlers = events[type],
				special = JQuery.event.special[type] || {};
			
			if (!handlers) {
				handlers = event[type]=[];
				
				/**
				 * check for a special event handler
				 * only use addEventListener/attachEvent if the special events handler return false.
				 */
				 
				 if (!special.setUp || special.setup.call(elem, data, namespaces, eventHandle) == false) {
					if （elem.addEventListener) {
						elem.addEventListener(type, eventHandle, false);
					} else if (elem.attachEvent) {
						elem.attachEvent("on" + type, eventHandle);
					}
				 }
			}
			
			if (special.add) {
				special.add.call(elem, handleObj);
				
				if (!handleObj.handler.guid) {
					handleObj.handler.guid = handler.guid;
				}
			}
			
			handler.push(handleObj);
			
			JQuery.event.global[type] = true;
		}
		/* set elem as null to avoid memory leak in ie explore*/
		elem = null;
	},
	...
 }