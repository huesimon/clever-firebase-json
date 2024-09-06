import c from "./81dVy7k4.js";
import {c as p, l as n, d as s, F as d, y as m, z as f, A as r, e as v, J as x} from "./CrBsXeJN.js";
import "./3Strz8Vu.js";
import "./M6O-Go2M.js";
const y = {
    key: 0
}
  , b = {
    __name: "Values",
    props: {
        content: {
            type: Object,
            required: !0
        },
        options: {
            type: Object,
            default: void 0
        }
    },
    setup(t) {
        const o = t
          , i = p( () => {
            var a;
            return (a = o.options) != null && a.mode ? o.options.mode : "inline"
        }
        );
        return (a, k) => {
            var l;
            return (l = t.content) != null && l.list && t.content.list[0] ? (n(),
            s("div", {
                key: 0,
                class: x(["values", "values--" + i.value])
            }, [(n(!0),
            s(d, null, m(t.content.list, (e, u) => (n(),
            s("div", {
                key: `value_${u}`,
                class: "values-content"
            }, [e.heading ? (n(),
            s("span", y, f(e.heading), 1)) : r("", !0), v(c, {
                prefix: e.prefix,
                value: e.value,
                postfix: e.postfix
            }, null, 8, ["prefix", "value", "postfix"])]))), 128))], 2)) : r("", !0)
        }
    }
};
export {b as default};
