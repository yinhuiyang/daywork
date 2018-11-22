/** kit_admin-v1.0.4 MIT License By http://kit/zhengjinfan.cn */ ;
layui.define(["jquery", "laytpl", "element"], function(e) {
	var i = layui.jquery,
		n = (i(window), i(document)),
		t = layui.laytpl;
	e("onelevel", {
		v: "1.0.0",
		config: {
			elem: void 0,
			data: void 0,
			remote: {
				url: void 0,
				type: "GET"
			},
			onClicked: void 0
		},
		set: function(e) {
			var n = this;
			return i.extend(!0, n.config, e), n
		},
		hasElem: function() {
			var e = this.config;
			return void 0 !== e.elem || 0 !== n.find("ul[kit-one-level]").length || !i(e.elem) || (console.log("One-Level error:请配置One-Level容器."), !1)
		},
		getElem: function() {
			var e = this.config;
			return void 0 !== e.elem && i(e.elem).length > 0 ? i(e.elem) : n.find("ul[kit-one-level]")
		},
		render: function() {
			var e = this,
				n = e.config,
				l = n.remote,
				a = ["{{# layui.each(d,function(index, item){ }}", '<li class="layui-nav-item">', '<a href="javascript:;" data-title="{{item.title}}" data-icon="{{item.icon}}" data-id="{{item.id}}" >', '{{# if (item.icon.indexOf("fa-") !== -1) { }}', '<i class="fa {{item.icon}}" aria-hidden="true"></i>', "{{# } else { }}", '<i class="layui-icon">{{item.icon}}</i>', "{{# } }}", "<span> {{item.title}}</span>", "</a>", "</li>", "{{# }); }}"],
				o = [],
				r = layer.load(2);
			if(!e.hasElem()) return e;
			var c = e.getElem();
			if(void 0 !== n.data && n.data.length > 0) o = n.data;
			else {
				l.jsonp;
				var d = {
					url: l.url,
					type: l.type,
					error: function(e, i, n) {
						layui.hint().error("One-Level error:AJAX请求出错." + n)
					},
					success: function(e) {
						o = e
					}
				};
				i.extend(!0, d, l.jsonp ? {
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "jsonpCallback"
				} : {
					dataType: "json"
				}), i.support.cors = !0, i.ajax(d)
			}
			var u = setInterval(function() {
				o.length > 0 && clearInterval(u), t(a.join("")).render(o, function(e) {
					c.html(e), layui.element.init(), "function" == typeof n.onClicked && c.children("li.layui-nav-item").off("click").on("click", function() {
						var e = i(this).children("a").data("id");
						n.onClicked(e)
					}), r && layer.close(r)
				})
			}, 50);
			return e
		}
	})
});