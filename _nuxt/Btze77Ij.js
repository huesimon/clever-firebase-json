import {aG as f, aH as p, U as r} from "./CrBsXeJN.js";
const y = "$s";
function l(...t) {
    const a = typeof t[t.length - 1] == "string" ? t.pop() : void 0;
    typeof t[0] != "string" && t.unshift(a);
    const [n,e] = t;
    if (!n || typeof n != "string")
        throw new TypeError("[nuxt] [useState] key must be a string: " + n);
    if (e !== void 0 && typeof e != "function")
        throw new Error("[nuxt] [useState] init must be a function: " + e);
    const s = y + n
      , u = f()
      , i = p(u.payload.state, s);
    if (i.value === void 0 && e) {
        const o = e();
        if (r(o))
            return u.payload.state[s] = o,
            o;
        i.value = o
    }
    return i
}
export {l as u};
