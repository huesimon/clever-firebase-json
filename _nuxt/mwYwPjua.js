import v from "./Hr9o5av8.js";
import {n as x, q as b, j as u, c as p, t as w, u as k, v as t, l, d as c, m as s, e as a, I as L, x as _, F as C, y as H, z as m, L as f, C as M, A as S, D as T, E as A} from "./CrBsXeJN.js";
import {f as I} from "./CDBeVsbF.js";
import "./CuxRafCO.js";
const B = r => (T("data-v-f50b69a2"),
r = r(),
A(),
r)
  , N = {
    key: 0,
    class: "footer ly-main green-0"
}
  , j = {
    class: "wd-xxl ly-grid xs-cl-1 md-cl-4 ly-main-padding xs-rg-3"
}
  , D = {
    class: "footer-address"
}
  , E = ["innerHTML"]
  , F = {
    class: "footer-links"
}
  , P = {
    class: "xs-cl-1 green-10 footer-form"
}
  , V = {
    class: "footer-form-header"
}
  , q = ["innerHTML"]
  , O = B( () => s("hr", null, null, -1))
  , R = {
    class: "wd-xxl ly-grid xs-cl-1 ly-main-padding legal"
}
  , z = {
    class: "ly-flex ly-jc-spb ly-flex-wrap-reverse footer-legal"
}
  , J = ["innerHTML"]
  , W = {
    class: "ly-subflex ly-flex-wrap xs-pbe-2 md-pb-0"
}
  , $ = {
    __name: "RenderFooter",
    props: {
        content: {
            type: Object,
            required: !0
        }
    },
    setup(r) {
        const e = r.content;
        b( () => {
            u().hash.includes("permissions") && toggleSidePanel(),
            u().hash.includes("submitpermissions") && submitPermissions()
        }
        );
        const h = p( () => I(null, e == null ? void 0 : e.left.copyright, "Copyright &copy; {date:year} Clever"))
          , n = p( () => e == null ? void 0 : e.schema);
        return w( () => {
            n != null && n.value && k({
                script: [{
                    type: "application/ld+json",
                    children: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Corporation",
                        additionalType: "http://www.productontology.org/doc/Electric_vehicle_charging_network",
                        name: n.value.name,
                        url: n.value.url,
                        logo: n.value.reference[0].image.src.url,
                        sameAs: Array.from(n.value.sameas, o => o.url),
                        address: Array.from(n.value.address, o => ({
                            "@type": "PostalAddress",
                            streetAddress: o.street_address,
                            addressLocality: o.address_locality,
                            postalCode: o.postal_code,
                            addressCountry: o.address_country
                        }))
                    })
                }]
            })
        }
        ),
        (o, K) => {
            var i;
            const g = v;
            return t(e) ? (l(),
            c("footer", N, [s("div", j, [s("div", D, [a(L, {
                content: (i = t(e).left.reference[0]) == null ? void 0 : i.image
            }, null, 8, ["content"]), s("address", {
                class: "light xs-pbs-1 xs-pbe-0",
                innerHTML: t(_)(t(e).left.address)
            }, null, 8, E)]), (l(!0),
            c(C, null, H(t(e).columns, (d, y) => (l(),
            c("div", {
                key: y
            }, [s("h3", null, m(d.heading), 1), s("div", F, [a(f, {
                content: d.links
            }, null, 8, ["content"])])]))), 128)), s("div", null, [s("div", P, [s("h3", V, m(t(e).right.permissions.heading), 1), s("p", {
                class: "footer-form-body",
                innerHTML: t(_)(t(e).right.permissions.content)
            }, null, 8, q), a(M, {
                class: "stretch",
                content: t(e).right.permissions,
                configuration: {
                    cta_style: "button",
                    outline: !1,
                    inverted: !1
                }
            }, null, 8, ["content"])])])]), O, s("div", R, [a(g, {
                content: r.content.left.submodules
            }, null, 8, ["content"]), s("div", z, [s("span", {
                innerHTML: h.value
            }, null, 8, J), s("div", W, [a(f, {
                content: t(e).right.links
            }, null, 8, ["content"])])])])])) : S("", !0)
        }
    }
}
  , Z = x($, [["__scopeId", "data-v-f50b69a2"]]);
export {Z as default};
