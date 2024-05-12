import hljs from "highlight.js";

/* highlightjs-line-numbers.js 2.8.0 | (C) 2018 Yauheni Pakala | MIT License | github.com/wcoder/highlightjs-line-numbers.js */
!((r, o) => {
	let e;
	const i = "hljs-ln";
	const l = "hljs-ln-line";
	const h = "hljs-ln-code";
	const s = "hljs-ln-numbers";
	let c = "hljs-ln-n";
	const m = "data-line-number";
	const a = /\r\n|\r|\n/g;
	function u(e) {
		for (let n = e.toString(), t = e.anchorNode; "TD" !== t.nodeName; )
			t = t.parentNode;
		for (let r = e.focusNode; "TD" !== r.nodeName; ) r = r.parentNode;
		let o = Number.parseInt(t.dataset.lineNumber);
		let a = Number.parseInt(r.dataset.lineNumber);
		if (o === a) return n;
		let i;
		let l = t.textContent;
		let s = r.textContent;
		for (
			a < o && ((i = o), (o = a), (a = i), (i = l), (l = s), (s = i));
			0 !== n.indexOf(l);
		)
			l = l.slice(1);
		while (-1 === n.lastIndexOf(s)) s = s.slice(0, -1);
		for (
			let c = l,
				u = ((e) => {
					for (let n = e; "TABLE" !== n.nodeName; ) n = n.parentNode;
					return n;
				})(t),
				d = o + 1;
			d < a;
			++d
		) {
			const f = p('.{0}[{1}="{2}"]', [h, m, d]);
			c += `\n${u.querySelector(f).textContent}`;
		}
		return (c += `\n${s}`);
	}
	function n(e) {
		try {
			const n = o.querySelectorAll("code.hljs,code.nohighlight");
			for (const t in n)
				n.hasOwnProperty(t) &&
					(n[t].classList.contains("nohljsln") || d(n[t], e));
		} catch (e) {
			r.console.error("LineNumbers error: ", e);
		}
	}
	function d(e, n) {
		if ("object" === typeof e) e.innerHTML = f(e, n);
	}
	function f(e, n) {
		let t;
		let r;
		const o =
			((t = e),
			{
				singleLine: ((e) => !!e.singleLine && e.singleLine)(
					(r = (r = n) || {}),
				),
				startFrom: ((e, n) => {
					let t = 1;
					Number.isFinite(n.startFrom) && (t = n.startFrom);
					const r = ((e, n) => (e.hasAttribute(n) ? e.getAttribute(n) : null))(
						e,
						"data-ln-start-from",
					);
					return (
						null !== r &&
							(t = ((e, n) => {
								if (!e) return n;
								const t = Number(e);
								return Number.isFinite(t) ? t : n;
							})(r, 1)),
						t
					);
				})(t, r),
			});
		return (
			(function e(n) {
				const t = n.childNodes;
				for (const r in t) {
					let o;
					t.hasOwnProperty(r) &&
						((o = t[r]),
						0 < (o.textContent.trim().match(a) || []).length &&
							(0 < o.childNodes.length ? e(o) : v(o.parentNode)));
				}
			})(e),
			((e, n) => {
				const t = g(e);
				"" === t[t.length - 1].trim() && t.pop();
				if (1 < t.length || n.singleLine) {
					for (let r = "", o = 0, a = t.length; o < a; o++)
						r += p(
							'<tr><td class="{0} {1}" {3}="{5}"><div class="{2}" {3}="{5}"></div></td><td class="{0} {4}" {3}="{5}">{6}</td></tr>',
							[l, s, c, m, h, o + n.startFrom, 0 < t[o].length ? t[o] : " "],
						);
					return p('<table class="{0}">{1}</table>', [i, r]);
				}
				return e;
			})(e.innerHTML, o)
		);
	}
	function v(e) {
		const n = e.className;
		if (/hljs-/.test(n)) {
			for (let t = g(e.innerHTML), r = 0, o = ""; r < t.length; r++) {
				o += p('<span class="{0}">{1}</span>\n', [
					n,
					0 < t[r].length ? t[r] : " ",
				]);
			}
			e.innerHTML = o.trim();
		}
	}
	function g(e) {
		return 0 === e.length ? [] : e.split(a);
	}
	function p(e, t) {
		return e.replace(/\{(\d+)\}/g, (e, n) => (void 0 !== t[n] ? t[n] : e));
	}
	hljs
		? ((hljs.initLineNumbersOnLoad = (e) => {
				"interactive" === o.readyState || "complete" === o.readyState
					? n(e)
					: r.addEventListener("DOMContentLoaded", () => {
							n(e);
						});
			}),
			(hljs.lineNumbersBlock = d),
			(hljs.lineNumbersValue = (e, n) => {
				if ("string" !== typeof e) return;
				const t = document.createElement("code");
				return (t.innerHTML = e), f(t, n);
			}),
			((e = o.createElement("style")).type = "text/css"),
			(e.innerHTML = p(
				".{0}{border-collapse:collapse}.{0} td{padding:0}.{1}:before{content:attr({2})}",
				[i, c, m],
			)),
			o.getElementsByTagName("head")[0].appendChild(e))
		: r.console.error("highlight.js not detected!"),
		document.addEventListener("copy", (e) => {
			let n;
			const t = window.getSelection();
			!((e) => {
				for (let n = e; n; ) {
					if (n.className && -1 !== n.className.indexOf("hljs-ln-code"))
						return 1;
					n = n.parentNode;
				}
			})(t.anchorNode) ||
				((n =
					-1 !== window.navigator.userAgent.indexOf("Edge")
						? u(t)
						: t.toString()),
				e.clipboardData.setData("text/plain", n),
				e.preventDefault());
		});
})(window, document);

/*!
 * reveal.js plugin that adds syntax highlight support.
 */

const Plugin = {
	id: "highlight",

	HIGHLIGHT_STEP_DELIMITER: "|",
	HIGHLIGHT_LINE_DELIMITER: ",",
	HIGHLIGHT_LINE_RANGE_DELIMITER: "-",

	hljs,

	/**
	 * Highlights code blocks within the given deck.
	 *
	 * Note that this can be called multiple times if
	 * there are multiple presentations on one page.
	 *
	 * @param {Reveal} reveal the reveal.js instance
	 */
	init: (reveal) => {
		// Read the plugin config options and provide fallbacks
		const config = reveal.getConfig().highlight || {};

		config.highlightOnLoad =
			typeof config.highlightOnLoad === "boolean"
				? config.highlightOnLoad
				: true;
		config.escapeHTML =
			typeof config.escapeHTML === "boolean" ? config.escapeHTML : true;

		Array.from(reveal.getRevealElement().querySelectorAll("pre code")).forEach(
			(block) => {
				block.parentNode.classList.add("code-wrapper");

				// Code can optionally be wrapped in script template to avoid
				// HTML being parsed by the browser (i.e. when you need to
				// include <, > or & in your code).
				const substitute = block.querySelector('script[type="text/template"]');
				if (substitute) {
					// textContent handles the HTML entity escapes for us
					block.textContent = substitute.innerHTML;
				}

				// Trim whitespace if the "data-trim" attribute is present
				if (
					block.hasAttribute("data-trim") &&
					typeof block.innerHTML.trim === "function"
				) {
					block.innerHTML = betterTrim(block);
				}

				// Escape HTML tags unless the "data-noescape" attrbute is present
				if (config.escapeHTML && !block.hasAttribute("data-noescape")) {
					block.innerHTML = block.innerHTML
						.replace(/</g, "&lt;")
						.replace(/>/g, "&gt;");
				}

				// Re-highlight when focus is lost (for contenteditable code)
				block.addEventListener(
					"focusout",
					(event) => {
						hljs.highlightElement(event.currentTarget);
					},
					false,
				);
			},
		);

		// Triggers a callback function before we trigger highlighting
		if (typeof config.beforeHighlight === "function") {
			config.beforeHighlight(hljs);
		}

		// Run initial highlighting for all code
		if (config.highlightOnLoad) {
			Array.from(
				reveal.getRevealElement().querySelectorAll("pre code"),
			).forEach((block) => {
				Plugin.highlightBlock(block);
			});
		}

		// If we're printing to PDF, scroll the code highlights of
		// all blocks in the deck into view at once
		reveal.on("pdf-ready", () => {
			[].slice
				.call(
					reveal
						.getRevealElement()
						.querySelectorAll("pre code[data-line-numbers].current-fragment"),
				)
				.forEach((block) => {
					Plugin.scrollHighlightedLineIntoView(block, {}, true);
				});
		});
	},

	/**
	 * Highlights a code block. If the <code> node has the
	 * 'data-line-numbers' attribute we also generate slide
	 * numbers.
	 *
	 * If the block contains multiple line highlight steps,
	 * we clone the block and create a fragment for each step.
	 */
	highlightBlock: (block) => {
		hljs.highlightElement(block);

		// Don't generate line numbers for empty code blocks
		if (block.innerHTML.trim().length === 0) return;

		if (block.hasAttribute("data-line-numbers")) {
			hljs.lineNumbersBlock(block, { singleLine: true });

			const scrollState = { currentBlock: block };

			// If there is more than one highlight step, generate
			// fragments
			const highlightSteps = Plugin.deserializeHighlightSteps(
				block.getAttribute("data-line-numbers"),
			);
			if (highlightSteps.length > 1) {
				// If the original code block has a fragment-index,
				// each clone should follow in an incremental sequence
				let fragmentIndex = Number.parseInt(
					block.getAttribute("data-fragment-index"),
					10,
				);

				if (typeof fragmentIndex !== "number" || Number.isNaN(fragmentIndex)) {
					fragmentIndex = null;
				}

				// Generate fragments for all steps except the original block
				highlightSteps.slice(1).forEach((highlight) => {
					const fragmentBlock = block.cloneNode(true);
					fragmentBlock.setAttribute(
						"data-line-numbers",
						Plugin.serializeHighlightSteps([highlight]),
					);
					fragmentBlock.classList.add("fragment");
					block.parentNode.appendChild(fragmentBlock);
					Plugin.highlightLines(fragmentBlock);

					if (typeof fragmentIndex === "number") {
						fragmentBlock.setAttribute("data-fragment-index", fragmentIndex);
						fragmentIndex += 1;
					} else {
						fragmentBlock.removeAttribute("data-fragment-index");
					}

					// Scroll highlights into view as we step through them
					fragmentBlock.addEventListener(
						"visible",
						Plugin.scrollHighlightedLineIntoView.bind(
							Plugin,
							fragmentBlock,
							scrollState,
						),
					);
					fragmentBlock.addEventListener(
						"hidden",
						Plugin.scrollHighlightedLineIntoView.bind(
							Plugin,
							fragmentBlock.previousElementSibling,
							scrollState,
						),
					);
				});

				block.removeAttribute("data-fragment-index");
				block.setAttribute(
					"data-line-numbers",
					Plugin.serializeHighlightSteps([highlightSteps[0]]),
				);
			}

			// Scroll the first highlight into view when the slide
			// becomes visible. Note supported in IE11 since it lacks
			// support for Element.closest.
			const slide =
				typeof block.closest === "function"
					? block.closest("section:not(.stack)")
					: null;
			if (slide) {
				const scrollFirstHighlightIntoView = () => {
					Plugin.scrollHighlightedLineIntoView(block, scrollState, true);
					slide.removeEventListener("visible", scrollFirstHighlightIntoView);
				};
				slide.addEventListener("visible", scrollFirstHighlightIntoView);
			}

			Plugin.highlightLines(block);
		}
	},

	/**
	 * Animates scrolling to the first highlighted line
	 * in the given code block.
	 */
	scrollHighlightedLineIntoView: function (block, scrollState, skipAnimation) {
		cancelAnimationFrame(scrollState.animationFrameID);

		// Match the scroll position of the currently visible
		// code block
		if (scrollState.currentBlock) {
			block.scrollTop = scrollState.currentBlock.scrollTop;
		}

		// Remember the current code block so that we can match
		// its scroll position when showing/hiding fragments
		scrollState.currentBlock = block;

		const highlightBounds = this.getHighlightedLineBounds(block);
		let viewportHeight = block.offsetHeight;

		// Subtract padding from the viewport height
		const blockStyles = getComputedStyle(block);
		viewportHeight -=
			Number.parseInt(blockStyles.paddingTop) +
			Number.parseInt(blockStyles.paddingBottom);

		// Scroll position which centers all highlights
		const startTop = block.scrollTop;
		let targetTop =
			highlightBounds.top +
			(Math.min(highlightBounds.bottom - highlightBounds.top, viewportHeight) -
				viewportHeight) /
				2;

		// Account for offsets in position applied to the
		// <table> that holds our lines of code
		const lineTable = block.querySelector(".hljs-ln");
		if (lineTable)
			targetTop +=
				lineTable.offsetTop - Number.parseInt(blockStyles.paddingTop);

		// Make sure the scroll target is within bounds
		targetTop = Math.max(
			Math.min(targetTop, block.scrollHeight - viewportHeight),
			0,
		);

		if (skipAnimation === true || startTop === targetTop) {
			block.scrollTop = targetTop;
		} else {
			// Don't attempt to scroll if there is no overflow
			if (block.scrollHeight <= viewportHeight) return;

			let time = 0;
			const animate = () => {
				time = Math.min(time + 0.02, 1);

				// Update our eased scroll position
				block.scrollTop =
					startTop + (targetTop - startTop) * Plugin.easeInOutQuart(time);

				// Keep animating unless we've reached the end
				if (time < 1) {
					scrollState.animationFrameID = requestAnimationFrame(animate);
				}
			};

			animate();
		}
	},

	/**
	 * The easing function used when scrolling.
	 */
	easeInOutQuart: (t) => {
		// easeInOutQuart
		return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
	},

	getHighlightedLineBounds: (block) => {
		const highlightedLines = block.querySelectorAll(".highlight-line");
		if (highlightedLines.length === 0) {
			return { top: 0, bottom: 0 };
		}
		const firstHighlight = highlightedLines[0];
		const lastHighlight = highlightedLines[highlightedLines.length - 1];

		return {
			top: firstHighlight.offsetTop,
			bottom: lastHighlight.offsetTop + lastHighlight.offsetHeight,
		};
	},

	/**
	 * Visually emphasize specific lines within a code block.
	 * This only works on blocks with line numbering turned on.
	 *
	 * @param {HTMLElement} block a <code> block
	 * @param {String} [linesToHighlight] The lines that should be
	 * highlighted in this format:
	 * "1" 		= highlights line 1
	 * "2,5"	= highlights lines 2 & 5
	 * "2,5-7"	= highlights lines 2, 5, 6 & 7
	 */
	highlightLines: (block, linesToHighlight) => {
		const highlightSteps = Plugin.deserializeHighlightSteps(
			linesToHighlight || block.getAttribute("data-line-numbers"),
		);

		if (highlightSteps.length) {
			highlightSteps[0].forEach((highlight) => {
				let elementsToHighlight = [];

				// Highlight a range
				if (typeof highlight.end === "number") {
					elementsToHighlight = [].slice.call(
						block.querySelectorAll(
							`table tr:nth-child(n+${highlight.start}):nth-child(-n+${highlight.end})`,
						),
					);
				}
				// Highlight a single line
				else if (typeof highlight.start === "number") {
					elementsToHighlight = [].slice.call(
						block.querySelectorAll(`table tr:nth-child(${highlight.start})`),
					);
				}

				if (elementsToHighlight.length) {
					elementsToHighlight.forEach((lineElement) => {
						lineElement.classList.add("highlight-line");
					});

					block.classList.add("has-highlights");
				}
			});
		}
	},

	/**
	 * Parses and formats a user-defined string of line
	 * numbers to highlight.
	 *
	 * @example
	 * Plugin.deserializeHighlightSteps( '1,2|3,5-10' )
	 * // [
	 * //   [ { start: 1 }, { start: 2 } ],
	 * //   [ { start: 3 }, { start: 5, end: 10 } ]
	 * // ]
	 */
	deserializeHighlightSteps: (highlightSteps) => {
		// Remove whitespace
		highlightSteps = highlightSteps.replace(/\s/g, "");

		// Divide up our line number groups
		highlightSteps = highlightSteps.split(Plugin.HIGHLIGHT_STEP_DELIMITER);

		return highlightSteps.map((highlights) =>
			highlights.split(Plugin.HIGHLIGHT_LINE_DELIMITER).map((highlight) => {
				// Parse valid line numbers
				if (/^[\d-]+$/.test(highlight)) {
					highlight = highlight.split(Plugin.HIGHLIGHT_LINE_RANGE_DELIMITER);

					const lineStart = Number.parseInt(highlight[0], 10);
					const lineEnd = Number.parseInt(highlight[1], 10);

					if (Number.isNaN(lineEnd)) {
						return {
							start: lineStart,
						};
					}
					return {
						start: lineStart,
						end: lineEnd,
					};
				}
				// If no line numbers are provided, no code will be highlighted

				return {};
			}),
		);
	},

	/**
	 * Serializes parsed line number data into a string so
	 * that we can store it in the DOM.
	 */
	serializeHighlightSteps: (highlightSteps) =>
		highlightSteps
			.map((highlights) =>
				highlights
					.map((highlight) => {
						// Line range
						if (typeof highlight.end === "number") {
							return (
								highlight.start +
								Plugin.HIGHLIGHT_LINE_RANGE_DELIMITER +
								highlight.end
							);
						}
						// Single line
						if (typeof highlight.start === "number") {
							return highlight.start;
						}
						// All lines

						return "";
					})
					.join(Plugin.HIGHLIGHT_LINE_DELIMITER),
			)
			.join(Plugin.HIGHLIGHT_STEP_DELIMITER),
};

// Function to perform a better "data-trim" on code snippets
// Will slice an indentation amount on each line of the snippet (amount based on the line having the lowest indentation length)
function betterTrim(snippetEl) {
	// Helper functions
	function trimLeft(val) {
		// Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
		return val.replace(/^[\s\uFEFF\xA0]+/g, "");
	}
	function trimLineBreaks(input) {
		const lines = input.split("\n");

		// Trim line-breaks from the beginning
		for (let i = 0; i < lines.length; i++) {
			if (lines[i].trim() === "") {
				lines.splice(i--, 1);
			} else break;
		}

		// Trim line-breaks from the end
		for (let i = lines.length - 1; i >= 0; i--) {
			if (lines[i].trim() === "") {
				lines.splice(i, 1);
			} else break;
		}

		return lines.join("\n");
	}

	// Main function for betterTrim()
	return ((snippetEl) => {
		const content = trimLineBreaks(snippetEl.innerHTML);
		const lines = content.split("\n");
		// Calculate the minimum amount to remove on each line start of the snippet (can be 0)
		const pad = lines.reduce((acc, line) => {
			if (
				line.length > 0 &&
				trimLeft(line).length > 0 &&
				acc > line.length - trimLeft(line).length
			) {
				return line.length - trimLeft(line).length;
			}
			return acc;
		}, Number.POSITIVE_INFINITY);
		// Slice each line with this amount
		return lines.map((line, index) => line.slice(pad)).join("\n");
	})(snippetEl);
}

export default () => Plugin;
