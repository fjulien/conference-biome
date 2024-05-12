!((t, e) => {
	"object" === typeof exports && "undefined" !== typeof module
		? (module.exports = e())
		: "function" === typeof define && define.amd
			? define(e)
			: ((t =
					"undefined" !== typeof globalThis
						? globalThis
						: t || self).RevealMath = e());
})(this, () => {
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
			init: (n) => {
				t = n;
				const a = t.getConfig().mathjax2 || t.getConfig().math || {};
				const i = { ...e, ...a };
				const s = `${
					i.mathjax || "https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js"
				}?config=${i.config || "TeX-AMS_HTML-full"}`;
				(i.tex2jax = { ...e.tex2jax, ...a.tex2jax }),
					(i.mathjax = i.config = null),
					(function (t, e) {
						const n = document.querySelector("head");
						const a = document.createElement("script");
						(a.type = "text/javascript"), (a.src = t);
						const i = () => {
							"function" === typeof e && (e.call(), (e = null));
						};
						(a.onload = i),
							(a.onreadystatechange = () => {
								"loaded" === this.readyState && i();
							}),
							n.appendChild(a);
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
	return (Plugin = Object.assign(e(), {
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
			const n = (t) =>
				new Promise((e, n) => {
					const a = document.createElement("script");
					(a.type = "text/javascript"),
						(a.onload = e),
						(a.onerror = n),
						(a.src = t),
						document.head.append(a);
				});
			return {
				id: "katex",
				init: function (a) {
					t = a;
					const i = t.getConfig().katex || {};
					const s = { ...e, ...i };
					const { local: o, version: l, extensions: r, ...c } = s;
					const d = s.local || "https://cdn.jsdelivr.net/npm/katex";
					const u = s.local ? "" : `@${s.version}`;
					const p = `${d + u}/dist/katex.min.css`;
					const h = `${d + u}/dist/contrib/mhchem.min.js`;
					const x = `${d + u}/dist/contrib/auto-render.min.js`;
					const m = [`${d + u}/dist/katex.min.js`];
					s.extensions?.includes("mhchem") && m.push(h), m.push(x);
					const f = () => {
						renderMathInElement(a.getSlidesElement(), c), t.layout();
					};
					((t) => {
						const e = document.createElement("link");
						(e.rel = "stylesheet"), (e.href = t), document.head.appendChild(e);
					})(p),
						(async (t) => {
							for (const e of t) await n(e);
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
				init: (n) => {
					t = n;
					const a = t.getConfig().mathjax3 || {};
					const i = { ...e, ...a };
					(i.tex = { ...e.tex, ...a.tex }),
						(i.options = { ...e.options, ...a.options }),
						(i.startup = { ...e.startup, ...a.startup });
					const s =
						i.mathjax ||
						"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
					(i.mathjax = null),
						(window.MathJax = i),
						((t, e) => {
							const n = document.createElement("script");
							(n.type = "text/javascript"),
								(n.id = "MathJax-script"),
								(n.src = t),
								(n.async = !0),
								(n.onload = () => {
									"function" === typeof e && (e.call(), (e = null));
								}),
								document.head.appendChild(n);
						})(s, () => {
							Reveal.addEventListener("slidechanged", (t) => {
								MathJax.typeset();
							});
						});
				},
			};
		},
	}));
});
