import {g as i} from "./CuxRafCO.js";
function u(t, o) {
    if (o != null && o.layouts)
        for (const n of o.layouts)
            for (const r of n.layout.content_areas)
                for (const e of r.content.modules) {
                    const f = c(e, t);
                    if (f)
                        return f
                }
}
function l(t, o) {
    let n = [];
    if (o != null && o.layouts)
        for (const r of o.layouts)
            for (const e of r.layout.content_areas)
                for (const f of e.content.modules) {
                    const s = c(f, t);
                    s && n.push(s)
                }
    return n
}
function c(t, o) {
    for (const n of o) {
        if (t[n])
            return t[n];
        const r = i(t);
        if (r != null && r[n])
            return r[n]
    }
}
function d(t) {
    var o;
    return (o = u(["partner_subscriptions"], t)) == null ? void 0 : o.partner[0]
}
function y(t) {
    return u(["hero", "brand_hero", "product_hero", "article_hero", "partner_hero"], t)
}
function _(t) {
    return u(["card_overwrite"], t)
}
export {u as a, l as b, _ as c, d, y as f};
