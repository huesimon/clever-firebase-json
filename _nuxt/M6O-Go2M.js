const I = Math.min
  , $ = Math.max
  , nt = Math.round
  , et = Math.floor
  , N = t => ({
    x: t,
    y: t
})
  , Dt = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
}
  , kt = {
    start: "end",
    end: "start"
};
function lt(t, e, o) {
    return $(t, I(e, o))
}
function Q(t, e) {
    return typeof t == "function" ? t(e) : t
}
function H(t) {
    return t.split("-")[0]
}
function Z(t) {
    return t.split("-")[1]
}
function vt(t) {
    return t === "x" ? "y" : "x"
}
function ut(t) {
    return t === "y" ? "height" : "width"
}
function X(t) {
    return ["top", "bottom"].includes(H(t)) ? "y" : "x"
}
function dt(t) {
    return vt(X(t))
}
function Ft(t, e, o) {
    o === void 0 && (o = !1);
    const n = Z(t)
      , i = dt(t)
      , r = ut(i);
    let s = i === "x" ? n === (o ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
    return e.reference[r] > e.floating[r] && (s = ot(s)),
    [s, ot(s)]
}
function Nt(t) {
    const e = ot(t);
    return [ft(t), e, ft(e)]
}
function ft(t) {
    return t.replace(/start|end/g, e => kt[e])
}
function Bt(t, e, o) {
    const n = ["left", "right"]
      , i = ["right", "left"]
      , r = ["top", "bottom"]
      , s = ["bottom", "top"];
    switch (t) {
    case "top":
    case "bottom":
        return o ? e ? i : n : e ? n : i;
    case "left":
    case "right":
        return e ? r : s;
    default:
        return []
    }
}
function Mt(t, e, o, n) {
    const i = Z(t);
    let r = Bt(H(t), o === "start", n);
    return i && (r = r.map(s => s + "-" + i),
    e && (r = r.concat(r.map(ft)))),
    r
}
function ot(t) {
    return t.replace(/left|right|bottom|top/g, e => Dt[e])
}
function Vt(t) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...t
    }
}
function bt(t) {
    return typeof t != "number" ? Vt(t) : {
        top: t,
        right: t,
        bottom: t,
        left: t
    }
}
function it(t) {
    const {x: e, y: o, width: n, height: i} = t;
    return {
        width: n,
        height: i,
        top: o,
        left: e,
        right: e + n,
        bottom: o + i,
        x: e,
        y: o
    }
}
function ht(t, e, o) {
    let {reference: n, floating: i} = t;
    const r = X(e)
      , s = dt(e)
      , c = ut(s)
      , l = H(e)
      , f = r === "y"
      , d = n.x + n.width / 2 - i.width / 2
      , u = n.y + n.height / 2 - i.height / 2
      , g = n[c] / 2 - i[c] / 2;
    let a;
    switch (l) {
    case "top":
        a = {
            x: d,
            y: n.y - i.height
        };
        break;
    case "bottom":
        a = {
            x: d,
            y: n.y + n.height
        };
        break;
    case "right":
        a = {
            x: n.x + n.width,
            y: u
        };
        break;
    case "left":
        a = {
            x: n.x - i.width,
            y: u
        };
        break;
    default:
        a = {
            x: n.x,
            y: n.y
        }
    }
    switch (Z(e)) {
    case "start":
        a[s] -= g * (o && f ? -1 : 1);
        break;
    case "end":
        a[s] += g * (o && f ? -1 : 1);
        break
    }
    return a
}
const Wt = async (t, e, o) => {
    const {placement: n="bottom", strategy: i="absolute", middleware: r=[], platform: s} = o
      , c = r.filter(Boolean)
      , l = await (s.isRTL == null ? void 0 : s.isRTL(e));
    let f = await s.getElementRects({
        reference: t,
        floating: e,
        strategy: i
    })
      , {x: d, y: u} = ht(f, n, l)
      , g = n
      , a = {}
      , m = 0;
    for (let p = 0; p < c.length; p++) {
        const {name: w, fn: h} = c[p]
          , {x, y, data: b, reset: v} = await h({
            x: d,
            y: u,
            initialPlacement: n,
            placement: g,
            strategy: i,
            middlewareData: a,
            rects: f,
            platform: s,
            elements: {
                reference: t,
                floating: e
            }
        });
        d = x ?? d,
        u = y ?? u,
        a = {
            ...a,
            [w]: {
                ...a[w],
                ...b
            }
        },
        v && m <= 50 && (m++,
        typeof v == "object" && (v.placement && (g = v.placement),
        v.rects && (f = v.rects === !0 ? await s.getElementRects({
            reference: t,
            floating: e,
            strategy: i
        }) : v.rects),
        {x: d, y: u} = ht(f, g, l)),
        p = -1)
    }
    return {
        x: d,
        y: u,
        placement: g,
        strategy: i,
        middlewareData: a
    }
}
;
async function At(t, e) {
    var o;
    e === void 0 && (e = {});
    const {x: n, y: i, platform: r, rects: s, elements: c, strategy: l} = t
      , {boundary: f="clippingAncestors", rootBoundary: d="viewport", elementContext: u="floating", altBoundary: g=!1, padding: a=0} = Q(e, t)
      , m = bt(a)
      , w = c[g ? u === "floating" ? "reference" : "floating" : u]
      , h = it(await r.getClippingRect({
        element: (o = await (r.isElement == null ? void 0 : r.isElement(w))) == null || o ? w : w.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(c.floating)),
        boundary: f,
        rootBoundary: d,
        strategy: l
    }))
      , x = u === "floating" ? {
        x: n,
        y: i,
        width: s.floating.width,
        height: s.floating.height
    } : s.reference
      , y = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c.floating))
      , b = await (r.isElement == null ? void 0 : r.isElement(y)) ? await (r.getScale == null ? void 0 : r.getScale(y)) || {
        x: 1,
        y: 1
    } : {
        x: 1,
        y: 1
    }
      , v = it(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements: c,
        rect: x,
        offsetParent: y,
        strategy: l
    }) : x);
    return {
        top: (h.top - v.top + m.top) / b.y,
        bottom: (v.bottom - h.bottom + m.bottom) / b.y,
        left: (h.left - v.left + m.left) / b.x,
        right: (v.right - h.right + m.right) / b.x
    }
}
const $t = t => ({
    name: "arrow",
    options: t,
    async fn(e) {
        const {x: o, y: n, placement: i, rects: r, platform: s, elements: c, middlewareData: l} = e
          , {element: f, padding: d=0} = Q(t, e) || {};
        if (f == null)
            return {};
        const u = bt(d)
          , g = {
            x: o,
            y: n
        }
          , a = dt(i)
          , m = ut(a)
          , p = await s.getDimensions(f)
          , w = a === "y"
          , h = w ? "top" : "left"
          , x = w ? "bottom" : "right"
          , y = w ? "clientHeight" : "clientWidth"
          , b = r.reference[m] + r.reference[a] - g[a] - r.floating[m]
          , v = g[a] - r.reference[a]
          , E = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(f));
        let M = E ? E[y] : 0;
        (!M || !await (s.isElement == null ? void 0 : s.isElement(E))) && (M = c.floating[y] || r.floating[m]);
        const U = b / 2 - v / 2
          , V = M / 2 - p[m] / 2 - 1
          , D = I(u[h], V)
          , K = I(u[x], V)
          , W = D
          , G = M - p[m] - K
          , A = M / 2 - p[m] / 2 + U
          , _ = lt(W, A, G)
          , S = !l.arrow && Z(i) != null && A !== _ && r.reference[m] / 2 - (A < W ? D : K) - p[m] / 2 < 0
          , T = S ? A < W ? A - W : A - G : 0;
        return {
            [a]: g[a] + T,
            data: {
                [a]: _,
                centerOffset: A - _ - T,
                ...S && {
                    alignmentOffset: T
                }
            },
            reset: S
        }
    }
})
  , Ht = function(t) {
    return t === void 0 && (t = {}),
    {
        name: "flip",
        options: t,
        async fn(e) {
            var o, n;
            const {placement: i, middlewareData: r, rects: s, initialPlacement: c, platform: l, elements: f} = e
              , {mainAxis: d=!0, crossAxis: u=!0, fallbackPlacements: g, fallbackStrategy: a="bestFit", fallbackAxisSideDirection: m="none", flipAlignment: p=!0, ...w} = Q(t, e);
            if ((o = r.arrow) != null && o.alignmentOffset)
                return {};
            const h = H(i)
              , x = X(c)
              , y = H(c) === c
              , b = await (l.isRTL == null ? void 0 : l.isRTL(f.floating))
              , v = g || (y || !p ? [ot(c)] : Nt(c))
              , E = m !== "none";
            !g && E && v.push(...Mt(c, p, m, b));
            const M = [c, ...v]
              , U = await At(e, w)
              , V = [];
            let D = ((n = r.flip) == null ? void 0 : n.overflows) || [];
            if (d && V.push(U[h]),
            u) {
                const A = Ft(i, s, b);
                V.push(U[A[0]], U[A[1]])
            }
            if (D = [...D, {
                placement: i,
                overflows: V
            }],
            !V.every(A => A <= 0)) {
                var K, W;
                const A = (((K = r.flip) == null ? void 0 : K.index) || 0) + 1
                  , _ = M[A];
                if (_)
                    return {
                        data: {
                            index: A,
                            overflows: D
                        },
                        reset: {
                            placement: _
                        }
                    };
                let S = (W = D.filter(T => T.overflows[0] <= 0).sort( (T, k) => T.overflows[1] - k.overflows[1])[0]) == null ? void 0 : W.placement;
                if (!S)
                    switch (a) {
                    case "bestFit":
                        {
                            var G;
                            const T = (G = D.filter(k => {
                                if (E) {
                                    const F = X(k.placement);
                                    return F === x || F === "y"
                                }
                                return !0
                            }
                            ).map(k => [k.placement, k.overflows.filter(F => F > 0).reduce( (F, Pt) => F + Pt, 0)]).sort( (k, F) => k[1] - F[1])[0]) == null ? void 0 : G[0];
                            T && (S = T);
                            break
                        }
                    case "initialPlacement":
                        S = c;
                        break
                    }
                if (i !== S)
                    return {
                        reset: {
                            placement: S
                        }
                    }
            }
            return {}
        }
    }
};
async function zt(t, e) {
    const {placement: o, platform: n, elements: i} = t
      , r = await (n.isRTL == null ? void 0 : n.isRTL(i.floating))
      , s = H(o)
      , c = Z(o)
      , l = X(o) === "y"
      , f = ["left", "top"].includes(s) ? -1 : 1
      , d = r && l ? -1 : 1
      , u = Q(e, t);
    let {mainAxis: g, crossAxis: a, alignmentAxis: m} = typeof u == "number" ? {
        mainAxis: u,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: 0,
        crossAxis: 0,
        alignmentAxis: null,
        ...u
    };
    return c && typeof m == "number" && (a = c === "end" ? m * -1 : m),
    l ? {
        x: a * d,
        y: g * f
    } : {
        x: g * f,
        y: a * d
    }
}
const _t = function(t) {
    return t === void 0 && (t = 0),
    {
        name: "offset",
        options: t,
        async fn(e) {
            var o, n;
            const {x: i, y: r, placement: s, middlewareData: c} = e
              , l = await zt(e, t);
            return s === ((o = c.offset) == null ? void 0 : o.placement) && (n = c.arrow) != null && n.alignmentOffset ? {} : {
                x: i + l.x,
                y: r + l.y,
                data: {
                    ...l,
                    placement: s
                }
            }
        }
    }
}
  , jt = function(t) {
    return t === void 0 && (t = {}),
    {
        name: "shift",
        options: t,
        async fn(e) {
            const {x: o, y: n, placement: i} = e
              , {mainAxis: r=!0, crossAxis: s=!1, limiter: c={
                fn: w => {
                    let {x: h, y: x} = w;
                    return {
                        x: h,
                        y: x
                    }
                }
            }, ...l} = Q(t, e)
              , f = {
                x: o,
                y: n
            }
              , d = await At(e, l)
              , u = X(H(i))
              , g = vt(u);
            let a = f[g]
              , m = f[u];
            if (r) {
                const w = g === "y" ? "top" : "left"
                  , h = g === "y" ? "bottom" : "right"
                  , x = a + d[w]
                  , y = a - d[h];
                a = lt(x, a, y)
            }
            if (s) {
                const w = u === "y" ? "top" : "left"
                  , h = u === "y" ? "bottom" : "right"
                  , x = m + d[w]
                  , y = m - d[h];
                m = lt(x, m, y)
            }
            const p = c.fn({
                ...e,
                [g]: a,
                [u]: m
            });
            return {
                ...p,
                data: {
                    x: p.x - o,
                    y: p.y - n
                }
            }
        }
    }
};
function q(t) {
    return Ot(t) ? (t.nodeName || "").toLowerCase() : "#document"
}
function O(t) {
    var e;
    return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window
}
function P(t) {
    var e;
    return (e = (Ot(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement
}
function Ot(t) {
    return t instanceof Node || t instanceof O(t).Node
}
function R(t) {
    return t instanceof Element || t instanceof O(t).Element
}
function L(t) {
    return t instanceof HTMLElement || t instanceof O(t).HTMLElement
}
function wt(t) {
    return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof O(t).ShadowRoot
}
function tt(t) {
    const {overflow: e, overflowX: o, overflowY: n, display: i} = C(t);
    return /auto|scroll|overlay|hidden|clip/.test(e + n + o) && !["inline", "contents"].includes(i)
}
function It(t) {
    return ["table", "td", "th"].includes(q(t))
}
function st(t) {
    return [":popover-open", ":modal"].some(e => {
        try {
            return t.matches(e)
        } catch {
            return !1
        }
    }
    )
}
function mt(t) {
    const e = gt()
      , o = R(t) ? C(t) : t;
    return o.transform !== "none" || o.perspective !== "none" || (o.containerType ? o.containerType !== "normal" : !1) || !e && (o.backdropFilter ? o.backdropFilter !== "none" : !1) || !e && (o.filter ? o.filter !== "none" : !1) || ["transform", "perspective", "filter"].some(n => (o.willChange || "").includes(n)) || ["paint", "layout", "strict", "content"].some(n => (o.contain || "").includes(n))
}
function Xt(t) {
    let e = B(t);
    for (; L(e) && !Y(e); ) {
        if (mt(e))
            return e;
        if (st(e))
            return null;
        e = B(e)
    }
    return null
}
function gt() {
    return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none")
}
function Y(t) {
    return ["html", "body", "#document"].includes(q(t))
}
function C(t) {
    return O(t).getComputedStyle(t)
}
function rt(t) {
    return R(t) ? {
        scrollLeft: t.scrollLeft,
        scrollTop: t.scrollTop
    } : {
        scrollLeft: t.scrollX,
        scrollTop: t.scrollY
    }
}
function B(t) {
    if (q(t) === "html")
        return t;
    const e = t.assignedSlot || t.parentNode || wt(t) && t.host || P(t);
    return wt(e) ? e.host : e
}
function Rt(t) {
    const e = B(t);
    return Y(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : L(e) && tt(e) ? e : Rt(e)
}
function J(t, e, o) {
    var n;
    e === void 0 && (e = []),
    o === void 0 && (o = !0);
    const i = Rt(t)
      , r = i === ((n = t.ownerDocument) == null ? void 0 : n.body)
      , s = O(i);
    if (r) {
        const c = at(s);
        return e.concat(s, s.visualViewport || [], tt(i) ? i : [], c && o ? J(c) : [])
    }
    return e.concat(i, J(i, [], o))
}
function at(t) {
    return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null
}
function Ct(t) {
    const e = C(t);
    let o = parseFloat(e.width) || 0
      , n = parseFloat(e.height) || 0;
    const i = L(t)
      , r = i ? t.offsetWidth : o
      , s = i ? t.offsetHeight : n
      , c = nt(o) !== r || nt(n) !== s;
    return c && (o = r,
    n = s),
    {
        width: o,
        height: n,
        $: c
    }
}
function pt(t) {
    return R(t) ? t : t.contextElement
}
function j(t) {
    const e = pt(t);
    if (!L(e))
        return N(1);
    const o = e.getBoundingClientRect()
      , {width: n, height: i, $: r} = Ct(e);
    let s = (r ? nt(o.width) : o.width) / n
      , c = (r ? nt(o.height) : o.height) / i;
    return (!s || !Number.isFinite(s)) && (s = 1),
    (!c || !Number.isFinite(c)) && (c = 1),
    {
        x: s,
        y: c
    }
}
const Yt = N(0);
function Et(t) {
    const e = O(t);
    return !gt() || !e.visualViewport ? Yt : {
        x: e.visualViewport.offsetLeft,
        y: e.visualViewport.offsetTop
    }
}
function qt(t, e, o) {
    return e === void 0 && (e = !1),
    !o || e && o !== O(t) ? !1 : e
}
function z(t, e, o, n) {
    e === void 0 && (e = !1),
    o === void 0 && (o = !1);
    const i = t.getBoundingClientRect()
      , r = pt(t);
    let s = N(1);
    e && (n ? R(n) && (s = j(n)) : s = j(t));
    const c = qt(r, o, n) ? Et(r) : N(0);
    let l = (i.left + c.x) / s.x
      , f = (i.top + c.y) / s.y
      , d = i.width / s.x
      , u = i.height / s.y;
    if (r) {
        const g = O(r)
          , a = n && R(n) ? O(n) : n;
        let m = g
          , p = at(m);
        for (; p && n && a !== m; ) {
            const w = j(p)
              , h = p.getBoundingClientRect()
              , x = C(p)
              , y = h.left + (p.clientLeft + parseFloat(x.paddingLeft)) * w.x
              , b = h.top + (p.clientTop + parseFloat(x.paddingTop)) * w.y;
            l *= w.x,
            f *= w.y,
            d *= w.x,
            u *= w.y,
            l += y,
            f += b,
            m = O(p),
            p = at(m)
        }
    }
    return it({
        width: d,
        height: u,
        x: l,
        y: f
    })
}
function Ut(t) {
    let {elements: e, rect: o, offsetParent: n, strategy: i} = t;
    const r = i === "fixed"
      , s = P(n)
      , c = e ? st(e.floating) : !1;
    if (n === s || c && r)
        return o;
    let l = {
        scrollLeft: 0,
        scrollTop: 0
    }
      , f = N(1);
    const d = N(0)
      , u = L(n);
    if ((u || !u && !r) && ((q(n) !== "body" || tt(s)) && (l = rt(n)),
    L(n))) {
        const g = z(n);
        f = j(n),
        d.x = g.x + n.clientLeft,
        d.y = g.y + n.clientTop
    }
    return {
        width: o.width * f.x,
        height: o.height * f.y,
        x: o.x * f.x - l.scrollLeft * f.x + d.x,
        y: o.y * f.y - l.scrollTop * f.y + d.y
    }
}
function Kt(t) {
    return Array.from(t.getClientRects())
}
function Tt(t) {
    return z(P(t)).left + rt(t).scrollLeft
}
function Gt(t) {
    const e = P(t)
      , o = rt(t)
      , n = t.ownerDocument.body
      , i = $(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth)
      , r = $(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
    let s = -o.scrollLeft + Tt(t);
    const c = -o.scrollTop;
    return C(n).direction === "rtl" && (s += $(e.clientWidth, n.clientWidth) - i),
    {
        width: i,
        height: r,
        x: s,
        y: c
    }
}
function Jt(t, e) {
    const o = O(t)
      , n = P(t)
      , i = o.visualViewport;
    let r = n.clientWidth
      , s = n.clientHeight
      , c = 0
      , l = 0;
    if (i) {
        r = i.width,
        s = i.height;
        const f = gt();
        (!f || f && e === "fixed") && (c = i.offsetLeft,
        l = i.offsetTop)
    }
    return {
        width: r,
        height: s,
        x: c,
        y: l
    }
}
function Qt(t, e) {
    const o = z(t, !0, e === "fixed")
      , n = o.top + t.clientTop
      , i = o.left + t.clientLeft
      , r = L(t) ? j(t) : N(1)
      , s = t.clientWidth * r.x
      , c = t.clientHeight * r.y
      , l = i * r.x
      , f = n * r.y;
    return {
        width: s,
        height: c,
        x: l,
        y: f
    }
}
function xt(t, e, o) {
    let n;
    if (e === "viewport")
        n = Jt(t, o);
    else if (e === "document")
        n = Gt(P(t));
    else if (R(e))
        n = Qt(e, o);
    else {
        const i = Et(t);
        n = {
            ...e,
            x: e.x - i.x,
            y: e.y - i.y
        }
    }
    return it(n)
}
function Lt(t, e) {
    const o = B(t);
    return o === e || !R(o) || Y(o) ? !1 : C(o).position === "fixed" || Lt(o, e)
}
function Zt(t, e) {
    const o = e.get(t);
    if (o)
        return o;
    let n = J(t, [], !1).filter(c => R(c) && q(c) !== "body")
      , i = null;
    const r = C(t).position === "fixed";
    let s = r ? B(t) : t;
    for (; R(s) && !Y(s); ) {
        const c = C(s)
          , l = mt(s);
        !l && c.position === "fixed" && (i = null),
        (r ? !l && !i : !l && c.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || tt(s) && !l && Lt(t, s)) ? n = n.filter(d => d !== s) : i = c,
        s = B(s)
    }
    return e.set(t, n),
    n
}
function te(t) {
    let {element: e, boundary: o, rootBoundary: n, strategy: i} = t;
    const s = [...o === "clippingAncestors" ? st(e) ? [] : Zt(e, this._c) : [].concat(o), n]
      , c = s[0]
      , l = s.reduce( (f, d) => {
        const u = xt(e, d, i);
        return f.top = $(u.top, f.top),
        f.right = I(u.right, f.right),
        f.bottom = I(u.bottom, f.bottom),
        f.left = $(u.left, f.left),
        f
    }
    , xt(e, c, i));
    return {
        width: l.right - l.left,
        height: l.bottom - l.top,
        x: l.left,
        y: l.top
    }
}
function ee(t) {
    const {width: e, height: o} = Ct(t);
    return {
        width: e,
        height: o
    }
}
function ne(t, e, o) {
    const n = L(e)
      , i = P(e)
      , r = o === "fixed"
      , s = z(t, !0, r, e);
    let c = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const l = N(0);
    if (n || !n && !r)
        if ((q(e) !== "body" || tt(i)) && (c = rt(e)),
        n) {
            const u = z(e, !0, r, e);
            l.x = u.x + e.clientLeft,
            l.y = u.y + e.clientTop
        } else
            i && (l.x = Tt(i));
    const f = s.left + c.scrollLeft - l.x
      , d = s.top + c.scrollTop - l.y;
    return {
        x: f,
        y: d,
        width: s.width,
        height: s.height
    }
}
function ct(t) {
    return C(t).position === "static"
}
function yt(t, e) {
    return !L(t) || C(t).position === "fixed" ? null : e ? e(t) : t.offsetParent
}
function St(t, e) {
    const o = O(t);
    if (st(t))
        return o;
    if (!L(t)) {
        let i = B(t);
        for (; i && !Y(i); ) {
            if (R(i) && !ct(i))
                return i;
            i = B(i)
        }
        return o
    }
    let n = yt(t, e);
    for (; n && It(n) && ct(n); )
        n = yt(n, e);
    return n && Y(n) && ct(n) && !mt(n) ? o : n || Xt(t) || o
}
const oe = async function(t) {
    const e = this.getOffsetParent || St
      , o = this.getDimensions
      , n = await o(t.floating);
    return {
        reference: ne(t.reference, await e(t.floating), t.strategy),
        floating: {
            x: 0,
            y: 0,
            width: n.width,
            height: n.height
        }
    }
};
function ie(t) {
    return C(t).direction === "rtl"
}
const se = {
    convertOffsetParentRelativeRectToViewportRelativeRect: Ut,
    getDocumentElement: P,
    getClippingRect: te,
    getOffsetParent: St,
    getElementRects: oe,
    getClientRects: Kt,
    getDimensions: ee,
    getScale: j,
    isElement: R,
    isRTL: ie
};
function re(t, e) {
    let o = null, n;
    const i = P(t);
    function r() {
        var c;
        clearTimeout(n),
        (c = o) == null || c.disconnect(),
        o = null
    }
    function s(c, l) {
        c === void 0 && (c = !1),
        l === void 0 && (l = 1),
        r();
        const {left: f, top: d, width: u, height: g} = t.getBoundingClientRect();
        if (c || e(),
        !u || !g)
            return;
        const a = et(d)
          , m = et(i.clientWidth - (f + u))
          , p = et(i.clientHeight - (d + g))
          , w = et(f)
          , x = {
            rootMargin: -a + "px " + -m + "px " + -p + "px " + -w + "px",
            threshold: $(0, I(1, l)) || 1
        };
        let y = !0;
        function b(v) {
            const E = v[0].intersectionRatio;
            if (E !== l) {
                if (!y)
                    return s();
                E ? s(!1, E) : n = setTimeout( () => {
                    s(!1, 1e-7)
                }
                , 1e3)
            }
            y = !1
        }
        try {
            o = new IntersectionObserver(b,{
                ...x,
                root: i.ownerDocument
            })
        } catch {
            o = new IntersectionObserver(b,x)
        }
        o.observe(t)
    }
    return s(!0),
    r
}
function ce(t, e, o, n) {
    n === void 0 && (n = {});
    const {ancestorScroll: i=!0, ancestorResize: r=!0, elementResize: s=typeof ResizeObserver == "function", layoutShift: c=typeof IntersectionObserver == "function", animationFrame: l=!1} = n
      , f = pt(t)
      , d = i || r ? [...f ? J(f) : [], ...J(e)] : [];
    d.forEach(h => {
        i && h.addEventListener("scroll", o, {
            passive: !0
        }),
        r && h.addEventListener("resize", o)
    }
    );
    const u = f && c ? re(f, o) : null;
    let g = -1
      , a = null;
    s && (a = new ResizeObserver(h => {
        let[x] = h;
        x && x.target === f && a && (a.unobserve(e),
        cancelAnimationFrame(g),
        g = requestAnimationFrame( () => {
            var y;
            (y = a) == null || y.observe(e)
        }
        )),
        o()
    }
    ),
    f && !l && a.observe(f),
    a.observe(e));
    let m, p = l ? z(t) : null;
    l && w();
    function w() {
        const h = z(t);
        p && (h.x !== p.x || h.y !== p.y || h.width !== p.width || h.height !== p.height) && o(),
        p = h,
        m = requestAnimationFrame(w)
    }
    return o(),
    () => {
        var h;
        d.forEach(x => {
            i && x.removeEventListener("scroll", o),
            r && x.removeEventListener("resize", o)
        }
        ),
        u == null || u(),
        (h = a) == null || h.disconnect(),
        a = null,
        l && cancelAnimationFrame(m)
    }
}
const le = _t
  , fe = jt
  , ae = Ht
  , ue = $t
  , de = (t, e, o) => {
    const n = new Map
      , i = {
        platform: se,
        ...o
    }
      , r = {
        ...i.platform,
        _c: n
    };
    return Wt(t, e, {
        ...i,
        platform: r
    })
}
  , me = () => {
    const t = document.getElementsByClassName("tool-tip-container");
    for (const o of t) {
        const n = o.getElementsByClassName("tool-tip")[0]
          , i = o.getElementsByClassName("tool-tip-button")[0]
          , r = o.getElementsByClassName("tool-tip-arrow")[0];
        e(i, n, r)
    }
    function e(o, n, i) {
        ce(o, n, () => {
            de(o, n, {
                placement: "top",
                middleware: [fe({
                    padding: 25
                }), ae(), le(4), ue({
                    element: i
                })]
            }).then( ({x: c, y: l, placement: f, middlewareData: d}) => {
                Object.assign(n.style, {
                    left: `${c}px`,
                    top: `${l}px`
                });
                const {x: u, y: g} = d.arrow
                  , a = {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right"
                }[f.split("-")[0]];
                Object.assign(i.style, {
                    left: u != null ? `${u}px` : "",
                    top: g != null ? `${g}px` : "",
                    right: "",
                    bottom: "",
                    [a]: "-4px"
                })
            }
            )
        }
        );
        function r() {
            n.style.display = "block"
        }
        function s() {
            n.style.display = ""
        }
        [["mouseenter", r], ["mouseleave", s], ["focus", r], ["blur", s]].forEach( ([c,l]) => {
            o.addEventListener(c, l)
        }
        )
    }
}
;
export {me as s};
