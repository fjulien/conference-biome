const t = () => {
	let t;
	const e = {
		messageStyle: "none",
		tex2jax: {
			inlineMath: [
				["$", "$"],
				["\\(", "\\)"],
			],
			skipTags: ["script", "noscript", "style", "textarea", "pre"],
		},
		skipStartupTypeset: !0,
	};
	return {
		id: "mathjax2",
		init: (a) => {
			t = a;
			const n = t.getConfig().mathjax2 || t.getConfig().math || {};
			const i = { ...e, ...n };
			const s = `${
				i.mathjax || "https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js"
			}?config=${i.config || "TeX-AMS_HTML-full"}`;
			(i.tex2jax = { ...e.tex2jax, ...n.tex2jax }),
				(i.mathjax = i.config = null),
				(function (t, e) {
					const a = document.querySelector("head");
					const n = document.createElement("script");
					(n.type = "text/javascript"), (n.src = t);
					const i = () => {
						"function" === typeof e && (e.call(), (e = null));
					};
					(n.onload = i),
						(n.onreadystatechange = () => {
							"loaded" === this.readyState && i();
						}),
						a.appendChild(n);
				})(s, () => {
					MathJax.Hub.Config(i),
						MathJax.Hub.Queue(["Typeset", MathJax.Hub, t.getRevealElement()]),
						MathJax.Hub.Queue(t.layout),
						t.on("slidechanged", (t) => {
							MathJax.Hub.Queue(["Typeset", MathJax.Hub, t.currentSlide]);
						});
				});
		},
	};
};
const e = t;
/*!
 * This plugin is a wrapper for the MathJax2,
 * MathJax3 and KaTeX typesetter plugins.
 */
const a = (Plugin = Object.assign(e(), {
	KaTeX: () => {
		let t;
		const e = {
			version: "latest",
			delimiters: [
				{ left: "$$", right: "$$", display: !0 },
				{ left: "$", right: "$", display: !1 },
				{ left: "\\(", right: "\\)", display: !1 },
				{ left: "\\[", right: "\\]", display: !0 },
			],
			ignoredTags: ["script", "noscript", "style", "textarea", "pre"],
		};
		const a = (t) =>
			new Promise((e, a) => {
				const n = document.createElement("script");
				(n.type = "text/javascript"),
					(n.onload = e),
					(n.onerror = a),
					(n.src = t),
					document.head.append(n);
			});
		return {
			id: "katex",
			init: function (n) {
				t = n;
				const i = t.getConfig().katex || {};
				const s = { ...e, ...i };
				const { local: l, version: o, extensions: r, ...c } = s;
				const d = s.local || "https://cdn.jsdelivr.net/npm/katex";
				const p = s.local ? "" : `@${s.version}`;
				const u = `${d + p}/dist/katex.min.css`;
				const h = `${d + p}/dist/contrib/mhchem.min.js`;
				const x = `${d + p}/dist/contrib/auto-render.min.js`;
				const m = [`${d + p}/dist/katex.min.js`];
				s.extensions?.includes("mhchem") && m.push(h), m.push(x);
				const f = () => {
					renderMathInElement(n.getSlidesElement(), c), t.layout();
				};
				((t) => {
					const e = document.createElement("link");
					(e.rel = "stylesheet"), (e.href = t), document.head.appendChild(e);
				})(u),
					(async (t) => {
						for (const e of t) await a(e);
					})(m).then(() => {
						t.isReady() ? f() : t.on("ready", f.bind(this));
					});
			},
		};
	},
	MathJax2: t,
	MathJax3: () => {
		let t;
		const e = {
			tex: {
				inlineMath: [
					["$", "$"],
					["\\(", "\\)"],
				],
			},
			options: {
				skipHtmlTags: ["script", "noscript", "style", "textarea", "pre"],
			},
			startup: {
				ready: () => {
					MathJax.startup.defaultReady(),
						MathJax.startup.promise.then(() => {
							Reveal.layout();
						});
				},
			},
		};
		return {
			id: "mathjax3",
			init: (a) => {
				t = a;
				const n = t.getConfig().mathjax3 || {};
				const i = { ...e, ...n };
				(i.tex = { ...e.tex, ...n.tex }),
					(i.options = { ...e.options, ...n.options }),
					(i.startup = { ...e.startup, ...n.startup });
				const s =
					i.mathjax ||
					"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
				(i.mathjax = null),
					(window.MathJax = i),
					((t, e) => {
						const a = document.createElement("script");
						(a.type = "text/javascript"),
							(a.id = "MathJax-script"),
							(a.src = t),
							(a.async = !0),
							(a.onload = () => {
								"function" === typeof e && (e.call(), (e = null));
							}),
							document.head.appendChild(a);
					})(s, () => {
						Reveal.addEventListener("slidechanged", (t) => {
							MathJax.typeset();
						});
					});
			},
		};
	},
}));
export { a as default };
