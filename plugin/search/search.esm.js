/*!
 * Handles finding a text string anywhere in the slides and showing the next occurrence to the user
 * by navigatating to that slide and highlighting it.
 *
 * @author Jon Snyder <snyder.jon@gmail.com>, February 2013
 */
const e = () => {
	let e;
	let t;
	let n;
	let l;
	let i;
	let o;
	let r;
	function s() {
		(t = document.createElement("div")),
			t.classList.add("searchbox"),
			(t.style.position = "absolute"),
			(t.style.top = "10px"),
			(t.style.right = "10px"),
			(t.style.zIndex = 10),
			(t.innerHTML =
				'<input type="search" class="searchinput" placeholder="Search..." style="vertical-align: top;"/>\n\t\t</span>'),
			(n = t.querySelector(".searchinput")),
			(n.style.width = "240px"),
			(n.style.fontSize = "14px"),
			(n.style.padding = "4px 6px"),
			(n.style.color = "#000"),
			(n.style.background = "#fff"),
			(n.style.borderRadius = "2px"),
			(n.style.border = "0"),
			(n.style.outline = "0"),
			(n.style.boxShadow = "0 2px 18px rgba(0, 0, 0, 0.2)"),
			(n.style["-webkit-appearance"] = "none"),
			e.getRevealElement().appendChild(t),
			n.addEventListener(
				"keyup",
				(t) => {
					if (13 === t.keyCode)
						t.preventDefault(),
							(() => {
								if (o) {
									const t = n.value;
									"" === t
										? (r?.remove(), (l = null))
										: ((r = new c("slidecontent")), (l = r.apply(t)), (i = 0));
								}
								l &&
									(l.length && l.length <= i && (i = 0),
									l.length > i && (e.slide(l[i].h, l[i].v), i++));
							})(),
							(o = !1);
					else o = !0;
				},
				!1,
			),
			d();
	}
	function a() {
		t || s(), (t.style.display = "inline"), n.focus(), n.select();
	}
	function d() {
		t || s(), (t.style.display = "none"), r?.remove();
	}
	function c(t, n) {
		const l = document.getElementById(t) || document.body;
		const i = n || "EM";
		const o = new RegExp(`^(?:${i}|SCRIPT|FORM)$`);
		const r = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
		const s = [];
		let a = 0;
		let d = "";
		const c = [];
		(this.setRegex = (e) => {
			(e = e.trim()), (d = new RegExp(`(${e})`, "i"));
		}),
			(this.getRegex = () =>
				d
					.toString()
					.replace(/^\/\\b\(|\)\\b\/i$/g, "")
					.replace(/\|/g, " ")),
			(this.hiliteWords = function (t) {
				if (null != t && t && d && !o.test(t.nodeName)) {
					if (t.hasChildNodes())
						for (let n = 0; n < t.childNodes.length; n++)
							this.hiliteWords(t.childNodes[n]);
					let l;
					let p;
					if (3 === t.nodeType)
						if ((l = t.nodeValue) && (p = d.exec(l))) {
							for (let u = t; null != u && "SECTION" !== u.nodeName; )
								u = u.parentNode;
							const h = e.getIndices(u);
							const f = c.length;
							let y = !1;
							for (n = 0; n < f; n++)
								c[n].h === h.h && c[n].v === h.v && (y = !0);
							y || c.push(h),
								s[p[0].toLowerCase()] ||
									(s[p[0].toLowerCase()] = r[a++ % r.length]);
							const g = document.createElement(i);
							g.appendChild(document.createTextNode(p[0])),
								(g.style.backgroundColor = s[p[0].toLowerCase()]),
								(g.style.fontStyle = "inherit"),
								(g.style.color = "#000");
							const v = t.splitText(p.index);
							(v.nodeValue = v.nodeValue.substring(p[0].length)),
								t.parentNode.insertBefore(g, v);
						}
				}
			}),
			(this.remove = () => {
				for (
					let e, t = document.getElementsByTagName(i);
					t.length && (e = t[0]);
				)
					e.parentNode.replaceChild(e.firstChild, e);
			}),
			(this.apply = function (e) {
				if (null != e && e)
					return this.remove(), this.setRegex(e), this.hiliteWords(l), c;
			});
	}
	return {
		id: "search",
		init: (n) => {
			(e = n),
				e.registerKeyboardShortcut("CTRL + Shift + F", "Search"),
				document.addEventListener(
					"keydown",
					(e) => {
						"F" === e.key &&
							(e.ctrlKey || e.metaKey) &&
							(e.preventDefault(),
							t || s(),
							"inline" !== t.style.display ? a() : d());
					},
					!1,
				);
		},
		open: a,
	};
};
export { e as default };
