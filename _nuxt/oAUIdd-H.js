import {ai as f, r as u, q as d, p as i, d as b} from "./CrBsXeJN.js";
const m = Symbol.for("nuxt:client-only")
  , h = f({
    name: "ClientOnly",
    inheritAttrs: !1,
    props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
    setup(p, {slots: e, attrs: r}) {
        const l = u(!1);
        return d( () => {
            l.value = !0
        }
        ),
        i(m, !0),
        a => {
            var t;
            if (l.value)
                return (t = e.default) == null ? void 0 : t.call(e);
            const n = e.fallback || e.placeholder;
            if (n)
                return n();
            const c = a.fallback || a.placeholder || ""
              , o = a.fallbackTag || a.placeholderTag || "span";
            return b(o, r, c)
        }
    }
});
export {h as _};
