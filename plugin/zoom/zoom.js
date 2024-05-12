!((e, t) => {
	"object" === typeof exports && "undefined" !== typeof module
		? (module.exports = t())
		: "function" === typeof define && define.amd
			? define(t)
			: ((e =
					"undefined" !== typeof globalThis
						? globalThis
						: e || self).RevealZoom = t());
})(this, () => {
	/*!
	 * reveal.js Zoom plugin
	 */ const e = {
		id: "zoom",
		init: (e) => {
			e.getRevealElement().addEventListener("mousedown", (o) => {
				const n = /Linux/.test(window.navigator.platform) ? "ctrl" : "alt";
				const i = `${e.getConfig().zoomKey ? e.getConfig().zoomKey : n}Key`;
				const d = e.getConfig().zoomLevel ? e.getConfig().zoomLevel : 2;
				o[i] &&
					!e.isOverview() &&
					(o.preventDefault(),
					t.to({ x: o.clientX, y: o.clientY, scale: d, pan: !1 }));
			});
		},
		destroy: () => {
			t.reset();
		},
	};
	const t = (() => {
		let e = 1;
		let o = 0;
		let n = 0;
		let i = -1;
		let d = -1;
		const l = "transform" in document.body.style;
		function s(t, o) {
			const n = r();
			if (
				((t.width = t.width || 1),
				(t.height = t.height || 1),
				(t.x -= (window.innerWidth - t.width * o) / 2),
				(t.y -= (window.innerHeight - t.height * o) / 2),
				l)
			)
				if (1 === o) document.body.style.transform = "";
				else {
					const i = `${n.x}px ${n.y}px`;
					const d = `translate(${-t.x}px,${-t.y}px) scale(${o})`;
					(document.body.style.transformOrigin = i),
						(document.body.style.transform = d);
				}
			else
				1 === o
					? ((document.body.style.position = ""),
						(document.body.style.left = ""),
						(document.body.style.top = ""),
						(document.body.style.width = ""),
						(document.body.style.height = ""),
						(document.body.style.zoom = ""))
					: ((document.body.style.position = "relative"),
						(document.body.style.left = `${-(n.x + t.x) / o}px`),
						(document.body.style.top = `${-(n.y + t.y) / o}px`),
						(document.body.style.width = `${100 * o}%`),
						(document.body.style.height = `${100 * o}%`),
						(document.body.style.zoom = o));
			(e = o),
				document.documentElement.classList &&
					(1 !== e
						? document.documentElement.classList.add("zoomed")
						: document.documentElement.classList.remove("zoomed"));
		}
		function c() {
			const t = 0.12 * window.innerWidth;
			const i = 0.12 * window.innerHeight;
			const d = r();
			n < i
				? window.scroll(d.x, d.y - (14 / e) * (1 - n / i))
				: n > window.innerHeight - i &&
					window.scroll(
						d.x,
						d.y + (1 - (window.innerHeight - n) / i) * (14 / e),
					),
				o < t
					? window.scroll(d.x - (14 / e) * (1 - o / t), d.y)
					: o > window.innerWidth - t &&
						window.scroll(
							d.x + (1 - (window.innerWidth - o) / t) * (14 / e),
							d.y,
						);
		}
		function r() {
			return {
				x: void 0 !== window.scrollX ? window.scrollX : window.pageXOffset,
				y: void 0 !== window.scrollY ? window.scrollY : window.pageYOffset,
			};
		}
		return (
			l && (document.body.style.transition = "transform 0.8s ease"),
			document.addEventListener("keyup", (o) => {
				1 !== e && 27 === o.keyCode && t.out();
			}),
			document.addEventListener("mousemove", (t) => {
				1 !== e && ((o = t.clientX), (n = t.clientY));
			}),
			{
				to: (o) => {
					if (1 !== e) t.out();
					else {
						if (((o.x = o.x || 0), (o.y = o.y || 0), o.element)) {
							const n = o.element.getBoundingClientRect();
							(o.x = n.left - 20),
								(o.y = n.top - 20),
								(o.width = n.width + 40),
								(o.height = n.height + 40);
						}
						void 0 !== o.width &&
							void 0 !== o.height &&
							(o.scale = Math.max(
								Math.min(
									window.innerWidth / o.width,
									window.innerHeight / o.height,
								),
								1,
							)),
							o.scale > 1 &&
								((o.x *= o.scale),
								(o.y *= o.scale),
								s(o, o.scale),
								!1 !== o.pan &&
									(i = setTimeout(() => {
										d = setInterval(c, 1e3 / 60);
									}, 800)));
					}
				},
				out: () => {
					clearTimeout(i), clearInterval(d), s({ x: 0, y: 0 }, 1), (e = 1);
				},
				magnify: function (e) {
					this.to(e);
				},
				reset: function () {
					this.out();
				},
				zoomLevel: () => e,
			}
		);
	})();
	/*!
	 * zoom.js 0.3 (modified for use with reveal.js)
	 * http://lab.hakim.se/zoom-js
	 * MIT licensed
	 *
	 * Copyright (C) 2011-2014 Hakim El Hattab, http://hakim.se
	 */ return () => e;
});
