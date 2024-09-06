var Sl = {};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ih = {
    NODE_CLIENT: !1,
    NODE_ADMIN: !1,
    SDK_VERSION: "${JSCORE_VERSION}"
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const N = function(n, t) {
    if (!n)
        throw vn(t)
}
  , vn = function(n) {
    return new Error("Firebase Database (" + ih.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + n)
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const sh = function(n) {
    const t = [];
    let e = 0;
    for (let i = 0; i < n.length; i++) {
        let s = n.charCodeAt(i);
        s < 128 ? t[e++] = s : s < 2048 ? (t[e++] = s >> 6 | 192,
        t[e++] = s & 63 | 128) : (s & 64512) === 55296 && i + 1 < n.length && (n.charCodeAt(i + 1) & 64512) === 56320 ? (s = 65536 + ((s & 1023) << 10) + (n.charCodeAt(++i) & 1023),
        t[e++] = s >> 18 | 240,
        t[e++] = s >> 12 & 63 | 128,
        t[e++] = s >> 6 & 63 | 128,
        t[e++] = s & 63 | 128) : (t[e++] = s >> 12 | 224,
        t[e++] = s >> 6 & 63 | 128,
        t[e++] = s & 63 | 128)
    }
    return t
}
  , bf = function(n) {
    const t = [];
    let e = 0
      , i = 0;
    for (; e < n.length; ) {
        const s = n[e++];
        if (s < 128)
            t[i++] = String.fromCharCode(s);
        else if (s > 191 && s < 224) {
            const r = n[e++];
            t[i++] = String.fromCharCode((s & 31) << 6 | r & 63)
        } else if (s > 239 && s < 365) {
            const r = n[e++]
              , a = n[e++]
              , l = n[e++]
              , h = ((s & 7) << 18 | (r & 63) << 12 | (a & 63) << 6 | l & 63) - 65536;
            t[i++] = String.fromCharCode(55296 + (h >> 10)),
            t[i++] = String.fromCharCode(56320 + (h & 1023))
        } else {
            const r = n[e++]
              , a = n[e++];
            t[i++] = String.fromCharCode((s & 15) << 12 | (r & 63) << 6 | a & 63)
        }
    }
    return t.join("")
}
  , Eo = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + "+/="
    },
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + "-_."
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(n, t) {
        if (!Array.isArray(n))
            throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        const e = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_
          , i = [];
        for (let s = 0; s < n.length; s += 3) {
            const r = n[s]
              , a = s + 1 < n.length
              , l = a ? n[s + 1] : 0
              , h = s + 2 < n.length
              , d = h ? n[s + 2] : 0
              , f = r >> 2
              , _ = (r & 3) << 4 | l >> 4;
            let m = (l & 15) << 2 | d >> 6
              , A = d & 63;
            h || (A = 64,
            a || (m = 64)),
            i.push(e[f], e[_], e[m], e[A])
        }
        return i.join("")
    },
    encodeString(n, t) {
        return this.HAS_NATIVE_SUPPORT && !t ? btoa(n) : this.encodeByteArray(sh(n), t)
    },
    decodeString(n, t) {
        return this.HAS_NATIVE_SUPPORT && !t ? atob(n) : bf(this.decodeStringToByteArray(n, t))
    },
    decodeStringToByteArray(n, t) {
        this.init_();
        const e = t ? this.charToByteMapWebSafe_ : this.charToByteMap_
          , i = [];
        for (let s = 0; s < n.length; ) {
            const r = e[n.charAt(s++)]
              , l = s < n.length ? e[n.charAt(s)] : 0;
            ++s;
            const d = s < n.length ? e[n.charAt(s)] : 64;
            ++s;
            const _ = s < n.length ? e[n.charAt(s)] : 64;
            if (++s,
            r == null || l == null || d == null || _ == null)
                throw new Nf;
            const m = r << 2 | l >> 4;
            if (i.push(m),
            d !== 64) {
                const A = l << 4 & 240 | d >> 2;
                if (i.push(A),
                _ !== 64) {
                    const S = d << 6 & 192 | _;
                    i.push(S)
                }
            }
        }
        return i
    },
    init_() {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {},
            this.charToByteMap_ = {},
            this.byteToCharMapWebSafe_ = {},
            this.charToByteMapWebSafe_ = {};
            for (let n = 0; n < this.ENCODED_VALS.length; n++)
                this.byteToCharMap_[n] = this.ENCODED_VALS.charAt(n),
                this.charToByteMap_[this.byteToCharMap_[n]] = n,
                this.byteToCharMapWebSafe_[n] = this.ENCODED_VALS_WEBSAFE.charAt(n),
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]] = n,
                n >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)] = n,
                this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)] = n)
        }
    }
};
class Nf extends Error {
    constructor() {
        super(...arguments),
        this.name = "DecodeBase64StringError"
    }
}
const rh = function(n) {
    const t = sh(n);
    return Eo.encodeByteArray(t, !0)
}
  , ps = function(n) {
    return rh(n).replace(/\./g, "")
}
  , Fr = function(n) {
    try {
        return Eo.decodeString(n, !0)
    } catch (t) {
        console.error("base64Decode failed: ", t)
    }
    return null
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Df(n) {
    return oh(void 0, n)
}
function oh(n, t) {
    if (!(t instanceof Object))
        return t;
    switch (t.constructor) {
    case Date:
        const e = t;
        return new Date(e.getTime());
    case Object:
        n === void 0 && (n = {});
        break;
    case Array:
        n = [];
        break;
    default:
        return t
    }
    for (const e in t)
        !t.hasOwnProperty(e) || !kf(e) || (n[e] = oh(n[e], t[e]));
    return n
}
function kf(n) {
    return n !== "__proto__"
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function xf() {
    if (typeof self < "u")
        return self;
    if (typeof window < "u")
        return window;
    if (typeof global < "u")
        return global;
    throw new Error("Unable to locate global object.")
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Vf = () => xf().__FIREBASE_DEFAULTS__
  , Of = () => {
    if (typeof process > "u" || typeof Sl > "u")
        return;
    const n = Sl.__FIREBASE_DEFAULTS__;
    if (n)
        return JSON.parse(n)
}
  , Mf = () => {
    if (typeof document > "u")
        return;
    let n;
    try {
        n = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
    } catch {
        return
    }
    const t = n && Fr(n[1]);
    return t && JSON.parse(t)
}
  , To = () => {
    try {
        return Vf() || Of() || Mf()
    } catch (n) {
        console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);
        return
    }
}
  , Lf = n => {
    var t, e;
    return (e = (t = To()) === null || t === void 0 ? void 0 : t.emulatorHosts) === null || e === void 0 ? void 0 : e[n]
}
  , ah = n => {
    const t = Lf(n);
    if (!t)
        return;
    const e = t.lastIndexOf(":");
    if (e <= 0 || e + 1 === t.length)
        throw new Error(`Invalid host ${t} with no separate hostname and port!`);
    const i = parseInt(t.substring(e + 1), 10);
    return t[0] === "[" ? [t.substring(1, e - 1), i] : [t.substring(0, e), i]
}
  , lh = () => {
    var n;
    return (n = To()) === null || n === void 0 ? void 0 : n.config
}
;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Io {
    constructor() {
        this.reject = () => {}
        ,
        this.resolve = () => {}
        ,
        this.promise = new Promise( (t, e) => {
            this.resolve = t,
            this.reject = e
        }
        )
    }
    wrapCallback(t) {
        return (e, i) => {
            e ? this.reject(e) : this.resolve(i),
            typeof t == "function" && (this.promise.catch( () => {}
            ),
            t.length === 1 ? t(e) : t(e, i))
        }
    }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ch(n, t) {
    if (n.uid)
        throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
    const e = {
        alg: "none",
        type: "JWT"
    }
      , i = t || "demo-project"
      , s = n.iat || 0
      , r = n.sub || n.user_id;
    if (!r)
        throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
    const a = Object.assign({
        iss: `https://securetoken.google.com/${i}`,
        aud: i,
        iat: s,
        exp: s + 3600,
        auth_time: s,
        sub: r,
        user_id: r,
        firebase: {
            sign_in_provider: "custom",
            identities: {}
        }
    }, n);
    return [ps(JSON.stringify(e)), ps(JSON.stringify(a)), ""].join(".")
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function hh() {
    return typeof navigator < "u" && typeof navigator.userAgent == "string" ? navigator.userAgent : ""
}
function uh() {
    return typeof window < "u" && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(hh())
}
function Ff() {
    var n;
    const t = (n = To()) === null || n === void 0 ? void 0 : n.forceEnvironment;
    if (t === "node")
        return !0;
    if (t === "browser")
        return !1;
    try {
        return Object.prototype.toString.call(globalThis.process) === "[object process]"
    } catch {
        return !1
    }
}
function Uf() {
    return typeof navigator == "object" && navigator.product === "ReactNative"
}
function dh() {
    return ih.NODE_ADMIN === !0
}
function Bf() {
    return !Ff() && !!navigator.userAgent && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")
}
function qf() {
    try {
        return typeof indexedDB == "object"
    } catch {
        return !1
    }
}
function jf() {
    return new Promise( (n, t) => {
        try {
            let e = !0;
            const i = "validate-browser-context-for-indexeddb-analytics-module"
              , s = self.indexedDB.open(i);
            s.onsuccess = () => {
                s.result.close(),
                e || self.indexedDB.deleteDatabase(i),
                n(!0)
            }
            ,
            s.onupgradeneeded = () => {
                e = !1
            }
            ,
            s.onerror = () => {
                var r;
                t(((r = s.error) === null || r === void 0 ? void 0 : r.message) || "")
            }
        } catch (e) {
            t(e)
        }
    }
    )
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $f = "FirebaseError";
class En extends Error {
    constructor(t, e, i) {
        super(e),
        this.code = t,
        this.customData = i,
        this.name = $f,
        Object.setPrototypeOf(this, En.prototype),
        Error.captureStackTrace && Error.captureStackTrace(this, fh.prototype.create)
    }
}
class fh {
    constructor(t, e, i) {
        this.service = t,
        this.serviceName = e,
        this.errors = i
    }
    create(t, ...e) {
        const i = e[0] || {}
          , s = `${this.service}/${t}`
          , r = this.errors[t]
          , a = r ? Wf(r, i) : "Error"
          , l = `${this.serviceName}: ${a} (${s}).`;
        return new En(s,l,i)
    }
}
function Wf(n, t) {
    return n.replace(zf, (e, i) => {
        const s = t[i];
        return s != null ? String(s) : `<${i}?>`
    }
    )
}
const zf = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ci(n) {
    return JSON.parse(n)
}
function ft(n) {
    return JSON.stringify(n)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ph = function(n) {
    let t = {}
      , e = {}
      , i = {}
      , s = "";
    try {
        const r = n.split(".");
        t = ci(Fr(r[0]) || ""),
        e = ci(Fr(r[1]) || ""),
        s = r[2],
        i = e.d || {},
        delete e.d
    } catch {}
    return {
        header: t,
        claims: e,
        data: i,
        signature: s
    }
}
  , Gf = function(n) {
    const t = ph(n)
      , e = t.claims;
    return !!e && typeof e == "object" && e.hasOwnProperty("iat")
}
  , Hf = function(n) {
    const t = ph(n).claims;
    return typeof t == "object" && t.admin === !0
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function re(n, t) {
    return Object.prototype.hasOwnProperty.call(n, t)
}
function an(n, t) {
    if (Object.prototype.hasOwnProperty.call(n, t))
        return n[t]
}
function Pl(n) {
    for (const t in n)
        if (Object.prototype.hasOwnProperty.call(n, t))
            return !1;
    return !0
}
function _s(n, t, e) {
    const i = {};
    for (const s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (i[s] = t.call(e, n[s], s, n));
    return i
}
function Ur(n, t) {
    if (n === t)
        return !0;
    const e = Object.keys(n)
      , i = Object.keys(t);
    for (const s of e) {
        if (!i.includes(s))
            return !1;
        const r = n[s]
          , a = t[s];
        if (bl(r) && bl(a)) {
            if (!Ur(r, a))
                return !1
        } else if (r !== a)
            return !1
    }
    for (const s of i)
        if (!e.includes(s))
            return !1;
    return !0
}
function bl(n) {
    return n !== null && typeof n == "object"
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Kf(n) {
    const t = [];
    for (const [e,i] of Object.entries(n))
        Array.isArray(i) ? i.forEach(s => {
            t.push(encodeURIComponent(e) + "=" + encodeURIComponent(s))
        }
        ) : t.push(encodeURIComponent(e) + "=" + encodeURIComponent(i));
    return t.length ? "&" + t.join("&") : ""
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Qf {
    constructor() {
        this.chain_ = [],
        this.buf_ = [],
        this.W_ = [],
        this.pad_ = [],
        this.inbuf_ = 0,
        this.total_ = 0,
        this.blockSize = 512 / 8,
        this.pad_[0] = 128;
        for (let t = 1; t < this.blockSize; ++t)
            this.pad_[t] = 0;
        this.reset()
    }
    reset() {
        this.chain_[0] = 1732584193,
        this.chain_[1] = 4023233417,
        this.chain_[2] = 2562383102,
        this.chain_[3] = 271733878,
        this.chain_[4] = 3285377520,
        this.inbuf_ = 0,
        this.total_ = 0
    }
    compress_(t, e) {
        e || (e = 0);
        const i = this.W_;
        if (typeof t == "string")
            for (let _ = 0; _ < 16; _++)
                i[_] = t.charCodeAt(e) << 24 | t.charCodeAt(e + 1) << 16 | t.charCodeAt(e + 2) << 8 | t.charCodeAt(e + 3),
                e += 4;
        else
            for (let _ = 0; _ < 16; _++)
                i[_] = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3],
                e += 4;
        for (let _ = 16; _ < 80; _++) {
            const m = i[_ - 3] ^ i[_ - 8] ^ i[_ - 14] ^ i[_ - 16];
            i[_] = (m << 1 | m >>> 31) & 4294967295
        }
        let s = this.chain_[0], r = this.chain_[1], a = this.chain_[2], l = this.chain_[3], h = this.chain_[4], d, f;
        for (let _ = 0; _ < 80; _++) {
            _ < 40 ? _ < 20 ? (d = l ^ r & (a ^ l),
            f = 1518500249) : (d = r ^ a ^ l,
            f = 1859775393) : _ < 60 ? (d = r & a | l & (r | a),
            f = 2400959708) : (d = r ^ a ^ l,
            f = 3395469782);
            const m = (s << 5 | s >>> 27) + d + h + f + i[_] & 4294967295;
            h = l,
            l = a,
            a = (r << 30 | r >>> 2) & 4294967295,
            r = s,
            s = m
        }
        this.chain_[0] = this.chain_[0] + s & 4294967295,
        this.chain_[1] = this.chain_[1] + r & 4294967295,
        this.chain_[2] = this.chain_[2] + a & 4294967295,
        this.chain_[3] = this.chain_[3] + l & 4294967295,
        this.chain_[4] = this.chain_[4] + h & 4294967295
    }
    update(t, e) {
        if (t == null)
            return;
        e === void 0 && (e = t.length);
        const i = e - this.blockSize;
        let s = 0;
        const r = this.buf_;
        let a = this.inbuf_;
        for (; s < e; ) {
            if (a === 0)
                for (; s <= i; )
                    this.compress_(t, s),
                    s += this.blockSize;
            if (typeof t == "string") {
                for (; s < e; )
                    if (r[a] = t.charCodeAt(s),
                    ++a,
                    ++s,
                    a === this.blockSize) {
                        this.compress_(r),
                        a = 0;
                        break
                    }
            } else
                for (; s < e; )
                    if (r[a] = t[s],
                    ++a,
                    ++s,
                    a === this.blockSize) {
                        this.compress_(r),
                        a = 0;
                        break
                    }
        }
        this.inbuf_ = a,
        this.total_ += e
    }
    digest() {
        const t = [];
        let e = this.total_ * 8;
        this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        for (let s = this.blockSize - 1; s >= 56; s--)
            this.buf_[s] = e & 255,
            e /= 256;
        this.compress_(this.buf_);
        let i = 0;
        for (let s = 0; s < 5; s++)
            for (let r = 24; r >= 0; r -= 8)
                t[i] = this.chain_[s] >> r & 255,
                ++i;
        return t
    }
}
function _h(n, t) {
    return `${n} failed: ${t} argument `
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Yf = function(n) {
    const t = [];
    let e = 0;
    for (let i = 0; i < n.length; i++) {
        let s = n.charCodeAt(i);
        if (s >= 55296 && s <= 56319) {
            const r = s - 55296;
            i++,
            N(i < n.length, "Surrogate pair missing trail surrogate.");
            const a = n.charCodeAt(i) - 56320;
            s = 65536 + (r << 10) + a
        }
        s < 128 ? t[e++] = s : s < 2048 ? (t[e++] = s >> 6 | 192,
        t[e++] = s & 63 | 128) : s < 65536 ? (t[e++] = s >> 12 | 224,
        t[e++] = s >> 6 & 63 | 128,
        t[e++] = s & 63 | 128) : (t[e++] = s >> 18 | 240,
        t[e++] = s >> 12 & 63 | 128,
        t[e++] = s >> 6 & 63 | 128,
        t[e++] = s & 63 | 128)
    }
    return t
}
  , Vs = function(n) {
    let t = 0;
    for (let e = 0; e < n.length; e++) {
        const i = n.charCodeAt(e);
        i < 128 ? t++ : i < 2048 ? t += 2 : i >= 55296 && i <= 56319 ? (t += 4,
        e++) : t += 3
    }
    return t
};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gT = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, n => {
        const t = Math.random() * 16 | 0;
        return (n === "x" ? t : t & 3 | 8).toString(16)
    }
    )
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Xf = 1e3
  , Jf = 2
  , Zf = 4 * 60 * 60 * 1e3
  , tp = .5;
function mT(n, t=Xf, e=Jf) {
    const i = t * Math.pow(e, n)
      , s = Math.round(tp * i * (Math.random() - .5) * 2);
    return Math.min(Zf, i + s)
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ne(n) {
    return n && n._delegate ? n._delegate : n
}
class ln {
    constructor(t, e, i) {
        this.name = t,
        this.instanceFactory = e,
        this.type = i,
        this.multipleInstances = !1,
        this.serviceProps = {},
        this.instantiationMode = "LAZY",
        this.onInstanceCreated = null
    }
    setInstantiationMode(t) {
        return this.instantiationMode = t,
        this
    }
    setMultipleInstances(t) {
        return this.multipleInstances = t,
        this
    }
    setServiceProps(t) {
        return this.serviceProps = t,
        this
    }
    setInstanceCreatedCallback(t) {
        return this.onInstanceCreated = t,
        this
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const be = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ep {
    constructor(t, e) {
        this.name = t,
        this.container = e,
        this.component = null,
        this.instances = new Map,
        this.instancesDeferred = new Map,
        this.instancesOptions = new Map,
        this.onInitCallbacks = new Map
    }
    get(t) {
        const e = this.normalizeInstanceIdentifier(t);
        if (!this.instancesDeferred.has(e)) {
            const i = new Io;
            if (this.instancesDeferred.set(e, i),
            this.isInitialized(e) || this.shouldAutoInitialize())
                try {
                    const s = this.getOrInitializeService({
                        instanceIdentifier: e
                    });
                    s && i.resolve(s)
                } catch {}
        }
        return this.instancesDeferred.get(e).promise
    }
    getImmediate(t) {
        var e;
        const i = this.normalizeInstanceIdentifier(t == null ? void 0 : t.identifier)
          , s = (e = t == null ? void 0 : t.optional) !== null && e !== void 0 ? e : !1;
        if (this.isInitialized(i) || this.shouldAutoInitialize())
            try {
                return this.getOrInitializeService({
                    instanceIdentifier: i
                })
            } catch (r) {
                if (s)
                    return null;
                throw r
            }
        else {
            if (s)
                return null;
            throw Error(`Service ${this.name} is not available`)
        }
    }
    getComponent() {
        return this.component
    }
    setComponent(t) {
        if (t.name !== this.name)
            throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
        if (this.component)
            throw Error(`Component for ${this.name} has already been provided`);
        if (this.component = t,
        !!this.shouldAutoInitialize()) {
            if (ip(t))
                try {
                    this.getOrInitializeService({
                        instanceIdentifier: be
                    })
                } catch {}
            for (const [e,i] of this.instancesDeferred.entries()) {
                const s = this.normalizeInstanceIdentifier(e);
                try {
                    const r = this.getOrInitializeService({
                        instanceIdentifier: s
                    });
                    i.resolve(r)
                } catch {}
            }
        }
    }
    clearInstance(t=be) {
        this.instancesDeferred.delete(t),
        this.instancesOptions.delete(t),
        this.instances.delete(t)
    }
    async delete() {
        const t = Array.from(this.instances.values());
        await Promise.all([...t.filter(e => "INTERNAL"in e).map(e => e.INTERNAL.delete()), ...t.filter(e => "_delete"in e).map(e => e._delete())])
    }
    isComponentSet() {
        return this.component != null
    }
    isInitialized(t=be) {
        return this.instances.has(t)
    }
    getOptions(t=be) {
        return this.instancesOptions.get(t) || {}
    }
    initialize(t={}) {
        const {options: e={}} = t
          , i = this.normalizeInstanceIdentifier(t.instanceIdentifier);
        if (this.isInitialized(i))
            throw Error(`${this.name}(${i}) has already been initialized`);
        if (!this.isComponentSet())
            throw Error(`Component ${this.name} has not been registered yet`);
        const s = this.getOrInitializeService({
            instanceIdentifier: i,
            options: e
        });
        for (const [r,a] of this.instancesDeferred.entries()) {
            const l = this.normalizeInstanceIdentifier(r);
            i === l && a.resolve(s)
        }
        return s
    }
    onInit(t, e) {
        var i;
        const s = this.normalizeInstanceIdentifier(e)
          , r = (i = this.onInitCallbacks.get(s)) !== null && i !== void 0 ? i : new Set;
        r.add(t),
        this.onInitCallbacks.set(s, r);
        const a = this.instances.get(s);
        return a && t(a, s),
        () => {
            r.delete(t)
        }
    }
    invokeOnInitCallbacks(t, e) {
        const i = this.onInitCallbacks.get(e);
        if (i)
            for (const s of i)
                try {
                    s(t, e)
                } catch {}
    }
    getOrInitializeService({instanceIdentifier: t, options: e={}}) {
        let i = this.instances.get(t);
        if (!i && this.component && (i = this.component.instanceFactory(this.container, {
            instanceIdentifier: np(t),
            options: e
        }),
        this.instances.set(t, i),
        this.instancesOptions.set(t, e),
        this.invokeOnInitCallbacks(i, t),
        this.component.onInstanceCreated))
            try {
                this.component.onInstanceCreated(this.container, t, i)
            } catch {}
        return i || null
    }
    normalizeInstanceIdentifier(t=be) {
        return this.component ? this.component.multipleInstances ? t : be : t
    }
    shouldAutoInitialize() {
        return !!this.component && this.component.instantiationMode !== "EXPLICIT"
    }
}
function np(n) {
    return n === be ? void 0 : n
}
function ip(n) {
    return n.instantiationMode === "EAGER"
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class sp {
    constructor(t) {
        this.name = t,
        this.providers = new Map
    }
    addComponent(t) {
        const e = this.getProvider(t.name);
        if (e.isComponentSet())
            throw new Error(`Component ${t.name} has already been registered with ${this.name}`);
        e.setComponent(t)
    }
    addOrOverwriteComponent(t) {
        this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
        this.addComponent(t)
    }
    getProvider(t) {
        if (this.providers.has(t))
            return this.providers.get(t);
        const e = new ep(t,this);
        return this.providers.set(t, e),
        e
    }
    getProviders() {
        return Array.from(this.providers.values())
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var W;
(function(n) {
    n[n.DEBUG = 0] = "DEBUG",
    n[n.VERBOSE = 1] = "VERBOSE",
    n[n.INFO = 2] = "INFO",
    n[n.WARN = 3] = "WARN",
    n[n.ERROR = 4] = "ERROR",
    n[n.SILENT = 5] = "SILENT"
}
)(W || (W = {}));
const rp = {
    debug: W.DEBUG,
    verbose: W.VERBOSE,
    info: W.INFO,
    warn: W.WARN,
    error: W.ERROR,
    silent: W.SILENT
}
  , op = W.INFO
  , ap = {
    [W.DEBUG]: "log",
    [W.VERBOSE]: "log",
    [W.INFO]: "info",
    [W.WARN]: "warn",
    [W.ERROR]: "error"
}
  , lp = (n, t, ...e) => {
    if (t < n.logLevel)
        return;
    const i = new Date().toISOString()
      , s = ap[t];
    if (s)
        console[s](`[${i}]  ${n.name}:`, ...e);
    else
        throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)
}
;
class wo {
    constructor(t) {
        this.name = t,
        this._logLevel = op,
        this._logHandler = lp,
        this._userLogHandler = null
    }
    get logLevel() {
        return this._logLevel
    }
    set logLevel(t) {
        if (!(t in W))
            throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
        this._logLevel = t
    }
    setLogLevel(t) {
        this._logLevel = typeof t == "string" ? rp[t] : t
    }
    get logHandler() {
        return this._logHandler
    }
    set logHandler(t) {
        if (typeof t != "function")
            throw new TypeError("Value assigned to `logHandler` must be a function");
        this._logHandler = t
    }
    get userLogHandler() {
        return this._userLogHandler
    }
    set userLogHandler(t) {
        this._userLogHandler = t
    }
    debug(...t) {
        this._userLogHandler && this._userLogHandler(this, W.DEBUG, ...t),
        this._logHandler(this, W.DEBUG, ...t)
    }
    log(...t) {
        this._userLogHandler && this._userLogHandler(this, W.VERBOSE, ...t),
        this._logHandler(this, W.VERBOSE, ...t)
    }
    info(...t) {
        this._userLogHandler && this._userLogHandler(this, W.INFO, ...t),
        this._logHandler(this, W.INFO, ...t)
    }
    warn(...t) {
        this._userLogHandler && this._userLogHandler(this, W.WARN, ...t),
        this._logHandler(this, W.WARN, ...t)
    }
    error(...t) {
        this._userLogHandler && this._userLogHandler(this, W.ERROR, ...t),
        this._logHandler(this, W.ERROR, ...t)
    }
}
const cp = (n, t) => t.some(e => n instanceof e);
let Nl, Dl;
function hp() {
    return Nl || (Nl = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
}
function up() {
    return Dl || (Dl = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])
}
const gh = new WeakMap
  , Br = new WeakMap
  , mh = new WeakMap
  , Ir = new WeakMap
  , Co = new WeakMap;
function dp(n) {
    const t = new Promise( (e, i) => {
        const s = () => {
            n.removeEventListener("success", r),
            n.removeEventListener("error", a)
        }
          , r = () => {
            e(pe(n.result)),
            s()
        }
          , a = () => {
            i(n.error),
            s()
        }
        ;
        n.addEventListener("success", r),
        n.addEventListener("error", a)
    }
    );
    return t.then(e => {
        e instanceof IDBCursor && gh.set(e, n)
    }
    ).catch( () => {}
    ),
    Co.set(t, n),
    t
}
function fp(n) {
    if (Br.has(n))
        return;
    const t = new Promise( (e, i) => {
        const s = () => {
            n.removeEventListener("complete", r),
            n.removeEventListener("error", a),
            n.removeEventListener("abort", a)
        }
          , r = () => {
            e(),
            s()
        }
          , a = () => {
            i(n.error || new DOMException("AbortError","AbortError")),
            s()
        }
        ;
        n.addEventListener("complete", r),
        n.addEventListener("error", a),
        n.addEventListener("abort", a)
    }
    );
    Br.set(n, t)
}
let qr = {
    get(n, t, e) {
        if (n instanceof IDBTransaction) {
            if (t === "done")
                return Br.get(n);
            if (t === "objectStoreNames")
                return n.objectStoreNames || mh.get(n);
            if (t === "store")
                return e.objectStoreNames[1] ? void 0 : e.objectStore(e.objectStoreNames[0])
        }
        return pe(n[t])
    },
    set(n, t, e) {
        return n[t] = e,
        !0
    },
    has(n, t) {
        return n instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in n
    }
};
function pp(n) {
    qr = n(qr)
}
function _p(n) {
    return n === IDBDatabase.prototype.transaction && !("objectStoreNames"in IDBTransaction.prototype) ? function(t, ...e) {
        const i = n.call(wr(this), t, ...e);
        return mh.set(i, t.sort ? t.sort() : [t]),
        pe(i)
    }
    : up().includes(n) ? function(...t) {
        return n.apply(wr(this), t),
        pe(gh.get(this))
    }
    : function(...t) {
        return pe(n.apply(wr(this), t))
    }
}
function gp(n) {
    return typeof n == "function" ? _p(n) : (n instanceof IDBTransaction && fp(n),
    cp(n, hp()) ? new Proxy(n,qr) : n)
}
function pe(n) {
    if (n instanceof IDBRequest)
        return dp(n);
    if (Ir.has(n))
        return Ir.get(n);
    const t = gp(n);
    return t !== n && (Ir.set(n, t),
    Co.set(t, n)),
    t
}
const wr = n => Co.get(n);
function mp(n, t, {blocked: e, upgrade: i, blocking: s, terminated: r}={}) {
    const a = indexedDB.open(n, t)
      , l = pe(a);
    return i && a.addEventListener("upgradeneeded", h => {
        i(pe(a.result), h.oldVersion, h.newVersion, pe(a.transaction), h)
    }
    ),
    e && a.addEventListener("blocked", h => e(h.oldVersion, h.newVersion, h)),
    l.then(h => {
        r && h.addEventListener("close", () => r()),
        s && h.addEventListener("versionchange", d => s(d.oldVersion, d.newVersion, d))
    }
    ).catch( () => {}
    ),
    l
}
const yp = ["get", "getKey", "getAll", "getAllKeys", "count"]
  , vp = ["put", "add", "delete", "clear"]
  , Cr = new Map;
function kl(n, t) {
    if (!(n instanceof IDBDatabase && !(t in n) && typeof t == "string"))
        return;
    if (Cr.get(t))
        return Cr.get(t);
    const e = t.replace(/FromIndex$/, "")
      , i = t !== e
      , s = vp.includes(e);
    if (!(e in (i ? IDBIndex : IDBObjectStore).prototype) || !(s || yp.includes(e)))
        return;
    const r = async function(a, ...l) {
        const h = this.transaction(a, s ? "readwrite" : "readonly");
        let d = h.store;
        return i && (d = d.index(l.shift())),
        (await Promise.all([d[e](...l), s && h.done]))[0]
    };
    return Cr.set(t, r),
    r
}
pp(n => ({
    ...n,
    get: (t, e, i) => kl(t, e) || n.get(t, e, i),
    has: (t, e) => !!kl(t, e) || n.has(t, e)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ep {
    constructor(t) {
        this.container = t
    }
    getPlatformInfoString() {
        return this.container.getProviders().map(e => {
            if (Tp(e)) {
                const i = e.getImmediate();
                return `${i.library}/${i.version}`
            } else
                return null
        }
        ).filter(e => e).join(" ")
    }
}
function Tp(n) {
    const t = n.getComponent();
    return (t == null ? void 0 : t.type) === "VERSION"
}
const jr = "@firebase/app"
  , xl = "0.10.8";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Le = new wo("@firebase/app")
  , Ip = "@firebase/app-compat"
  , wp = "@firebase/analytics-compat"
  , Cp = "@firebase/analytics"
  , Ap = "@firebase/app-check-compat"
  , Rp = "@firebase/app-check"
  , Sp = "@firebase/auth"
  , Pp = "@firebase/auth-compat"
  , bp = "@firebase/database"
  , Np = "@firebase/database-compat"
  , Dp = "@firebase/functions"
  , kp = "@firebase/functions-compat"
  , xp = "@firebase/installations"
  , Vp = "@firebase/installations-compat"
  , Op = "@firebase/messaging"
  , Mp = "@firebase/messaging-compat"
  , Lp = "@firebase/performance"
  , Fp = "@firebase/performance-compat"
  , Up = "@firebase/remote-config"
  , Bp = "@firebase/remote-config-compat"
  , qp = "@firebase/storage"
  , jp = "@firebase/storage-compat"
  , $p = "@firebase/firestore"
  , Wp = "@firebase/vertexai-preview"
  , zp = "@firebase/firestore-compat"
  , Gp = "firebase"
  , Hp = "10.12.5";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $r = "[DEFAULT]"
  , Kp = {
    [jr]: "fire-core",
    [Ip]: "fire-core-compat",
    [Cp]: "fire-analytics",
    [wp]: "fire-analytics-compat",
    [Rp]: "fire-app-check",
    [Ap]: "fire-app-check-compat",
    [Sp]: "fire-auth",
    [Pp]: "fire-auth-compat",
    [bp]: "fire-rtdb",
    [Np]: "fire-rtdb-compat",
    [Dp]: "fire-fn",
    [kp]: "fire-fn-compat",
    [xp]: "fire-iid",
    [Vp]: "fire-iid-compat",
    [Op]: "fire-fcm",
    [Mp]: "fire-fcm-compat",
    [Lp]: "fire-perf",
    [Fp]: "fire-perf-compat",
    [Up]: "fire-rc",
    [Bp]: "fire-rc-compat",
    [qp]: "fire-gcs",
    [jp]: "fire-gcs-compat",
    [$p]: "fire-fst",
    [zp]: "fire-fst-compat",
    [Wp]: "fire-vertex",
    "fire-js": "fire-js",
    [Gp]: "fire-js-all"
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gs = new Map
  , Qp = new Map
  , Wr = new Map;
function Vl(n, t) {
    try {
        n.container.addComponent(t)
    } catch (e) {
        Le.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`, e)
    }
}
function hi(n) {
    const t = n.name;
    if (Wr.has(t))
        return Le.debug(`There were multiple attempts to register component ${t}.`),
        !1;
    Wr.set(t, n);
    for (const e of gs.values())
        Vl(e, n);
    for (const e of Qp.values())
        Vl(e, n);
    return !0
}
function yh(n, t) {
    const e = n.container.getProvider("heartbeat").getImmediate({
        optional: !0
    });
    return e && e.triggerHeartbeat(),
    n.container.getProvider(t)
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Yp = {
    "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options": "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument": "First argument to `onLog` must be null or a function.",
    "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments."
}
  , _e = new fh("app","Firebase",Yp);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xp {
    constructor(t, e, i) {
        this._isDeleted = !1,
        this._options = Object.assign({}, t),
        this._config = Object.assign({}, e),
        this._name = e.name,
        this._automaticDataCollectionEnabled = e.automaticDataCollectionEnabled,
        this._container = i,
        this.container.addComponent(new ln("app", () => this,"PUBLIC"))
    }
    get automaticDataCollectionEnabled() {
        return this.checkDestroyed(),
        this._automaticDataCollectionEnabled
    }
    set automaticDataCollectionEnabled(t) {
        this.checkDestroyed(),
        this._automaticDataCollectionEnabled = t
    }
    get name() {
        return this.checkDestroyed(),
        this._name
    }
    get options() {
        return this.checkDestroyed(),
        this._options
    }
    get config() {
        return this.checkDestroyed(),
        this._config
    }
    get container() {
        return this._container
    }
    get isDeleted() {
        return this._isDeleted
    }
    set isDeleted(t) {
        this._isDeleted = t
    }
    checkDestroyed() {
        if (this.isDeleted)
            throw _e.create("app-deleted", {
                appName: this._name
            })
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const vh = Hp;
function Jp(n, t={}) {
    let e = n;
    typeof t != "object" && (t = {
        name: t
    });
    const i = Object.assign({
        name: $r,
        automaticDataCollectionEnabled: !1
    }, t)
      , s = i.name;
    if (typeof s != "string" || !s)
        throw _e.create("bad-app-name", {
            appName: String(s)
        });
    if (e || (e = lh()),
    !e)
        throw _e.create("no-options");
    const r = gs.get(s);
    if (r) {
        if (Ur(e, r.options) && Ur(i, r.config))
            return r;
        throw _e.create("duplicate-app", {
            appName: s
        })
    }
    const a = new sp(s);
    for (const h of Wr.values())
        a.addComponent(h);
    const l = new Xp(e,i,a);
    return gs.set(s, l),
    l
}
function Eh(n=$r) {
    const t = gs.get(n);
    if (!t && n === $r && lh())
        return Jp();
    if (!t)
        throw _e.create("no-app", {
            appName: n
        });
    return t
}
function xe(n, t, e) {
    var i;
    let s = (i = Kp[n]) !== null && i !== void 0 ? i : n;
    e && (s += `-${e}`);
    const r = s.match(/\s|\//)
      , a = t.match(/\s|\//);
    if (r || a) {
        const l = [`Unable to register library "${s}" with version "${t}":`];
        r && l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),
        r && a && l.push("and"),
        a && l.push(`version name "${t}" contains illegal characters (whitespace or "/")`),
        Le.warn(l.join(" "));
        return
    }
    hi(new ln(`${s}-version`, () => ({
        library: s,
        version: t
    }),"VERSION"))
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Zp = "firebase-heartbeat-database"
  , t_ = 1
  , ui = "firebase-heartbeat-store";
let Ar = null;
function Th() {
    return Ar || (Ar = mp(Zp, t_, {
        upgrade: (n, t) => {
            switch (t) {
            case 0:
                try {
                    n.createObjectStore(ui)
                } catch (e) {
                    console.warn(e)
                }
            }
        }
    }).catch(n => {
        throw _e.create("idb-open", {
            originalErrorMessage: n.message
        })
    }
    )),
    Ar
}
async function e_(n) {
    try {
        const e = (await Th()).transaction(ui)
          , i = await e.objectStore(ui).get(Ih(n));
        return await e.done,
        i
    } catch (t) {
        if (t instanceof En)
            Le.warn(t.message);
        else {
            const e = _e.create("idb-get", {
                originalErrorMessage: t == null ? void 0 : t.message
            });
            Le.warn(e.message)
        }
    }
}
async function Ol(n, t) {
    try {
        const i = (await Th()).transaction(ui, "readwrite");
        await i.objectStore(ui).put(t, Ih(n)),
        await i.done
    } catch (e) {
        if (e instanceof En)
            Le.warn(e.message);
        else {
            const i = _e.create("idb-set", {
                originalErrorMessage: e == null ? void 0 : e.message
            });
            Le.warn(i.message)
        }
    }
}
function Ih(n) {
    return `${n.name}!${n.options.appId}`
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const n_ = 1024
  , i_ = 30 * 24 * 60 * 60 * 1e3;
class s_ {
    constructor(t) {
        this.container = t,
        this._heartbeatsCache = null;
        const e = this.container.getProvider("app").getImmediate();
        this._storage = new o_(e),
        this._heartbeatsCachePromise = this._storage.read().then(i => (this._heartbeatsCache = i,
        i))
    }
    async triggerHeartbeat() {
        var t, e;
        const s = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString()
          , r = Ml();
        if (!(((t = this._heartbeatsCache) === null || t === void 0 ? void 0 : t.heartbeats) == null && (this._heartbeatsCache = await this._heartbeatsCachePromise,
        ((e = this._heartbeatsCache) === null || e === void 0 ? void 0 : e.heartbeats) == null)) && !(this._heartbeatsCache.lastSentHeartbeatDate === r || this._heartbeatsCache.heartbeats.some(a => a.date === r)))
            return this._heartbeatsCache.heartbeats.push({
                date: r,
                agent: s
            }),
            this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(a => {
                const l = new Date(a.date).valueOf();
                return Date.now() - l <= i_
            }
            ),
            this._storage.overwrite(this._heartbeatsCache)
    }
    async getHeartbeatsHeader() {
        var t;
        if (this._heartbeatsCache === null && await this._heartbeatsCachePromise,
        ((t = this._heartbeatsCache) === null || t === void 0 ? void 0 : t.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0)
            return "";
        const e = Ml()
          , {heartbeatsToSend: i, unsentEntries: s} = r_(this._heartbeatsCache.heartbeats)
          , r = ps(JSON.stringify({
            version: 2,
            heartbeats: i
        }));
        return this._heartbeatsCache.lastSentHeartbeatDate = e,
        s.length > 0 ? (this._heartbeatsCache.heartbeats = s,
        await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [],
        this._storage.overwrite(this._heartbeatsCache)),
        r
    }
}
function Ml() {
    return new Date().toISOString().substring(0, 10)
}
function r_(n, t=n_) {
    const e = [];
    let i = n.slice();
    for (const s of n) {
        const r = e.find(a => a.agent === s.agent);
        if (r) {
            if (r.dates.push(s.date),
            Ll(e) > t) {
                r.dates.pop();
                break
            }
        } else if (e.push({
            agent: s.agent,
            dates: [s.date]
        }),
        Ll(e) > t) {
            e.pop();
            break
        }
        i = i.slice(1)
    }
    return {
        heartbeatsToSend: e,
        unsentEntries: i
    }
}
class o_ {
    constructor(t) {
        this.app = t,
        this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()
    }
    async runIndexedDBEnvironmentCheck() {
        return qf() ? jf().then( () => !0).catch( () => !1) : !1
    }
    async read() {
        if (await this._canUseIndexedDBPromise) {
            const e = await e_(this.app);
            return e != null && e.heartbeats ? e : {
                heartbeats: []
            }
        } else
            return {
                heartbeats: []
            }
    }
    async overwrite(t) {
        var e;
        if (await this._canUseIndexedDBPromise) {
            const s = await this.read();
            return Ol(this.app, {
                lastSentHeartbeatDate: (e = t.lastSentHeartbeatDate) !== null && e !== void 0 ? e : s.lastSentHeartbeatDate,
                heartbeats: t.heartbeats
            })
        } else
            return
    }
    async add(t) {
        var e;
        if (await this._canUseIndexedDBPromise) {
            const s = await this.read();
            return Ol(this.app, {
                lastSentHeartbeatDate: (e = t.lastSentHeartbeatDate) !== null && e !== void 0 ? e : s.lastSentHeartbeatDate,
                heartbeats: [...s.heartbeats, ...t.heartbeats]
            })
        } else
            return
    }
}
function Ll(n) {
    return ps(JSON.stringify({
        version: 2,
        heartbeats: n
    })).length
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function a_(n) {
    hi(new ln("platform-logger",t => new Ep(t),"PRIVATE")),
    hi(new ln("heartbeat",t => new s_(t),"PRIVATE")),
    xe(jr, xl, n),
    xe(jr, xl, "esm2017"),
    xe("fire-js", "")
}
a_("");
var Fl = {};
const Ul = "@firebase/database"
  , Bl = "1.0.7";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let wh = "";
function l_(n) {
    wh = n
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class c_ {
    constructor(t) {
        this.domStorage_ = t,
        this.prefix_ = "firebase:"
    }
    set(t, e) {
        e == null ? this.domStorage_.removeItem(this.prefixedName_(t)) : this.domStorage_.setItem(this.prefixedName_(t), ft(e))
    }
    get(t) {
        const e = this.domStorage_.getItem(this.prefixedName_(t));
        return e == null ? null : ci(e)
    }
    remove(t) {
        this.domStorage_.removeItem(this.prefixedName_(t))
    }
    prefixedName_(t) {
        return this.prefix_ + t
    }
    toString() {
        return this.domStorage_.toString()
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class h_ {
    constructor() {
        this.cache_ = {},
        this.isInMemoryStorage = !0
    }
    set(t, e) {
        e == null ? delete this.cache_[t] : this.cache_[t] = e
    }
    get(t) {
        return re(this.cache_, t) ? this.cache_[t] : null
    }
    remove(t) {
        delete this.cache_[t]
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ch = function(n) {
    try {
        if (typeof window < "u" && typeof window[n] < "u") {
            const t = window[n];
            return t.setItem("firebase:sentinel", "cache"),
            t.removeItem("firebase:sentinel"),
            new c_(t)
        }
    } catch {}
    return new h_
}
  , De = Ch("localStorage")
  , u_ = Ch("sessionStorage");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const en = new wo("@firebase/database")
  , d_ = function() {
    let n = 1;
    return function() {
        return n++
    }
}()
  , Ah = function(n) {
    const t = Yf(n)
      , e = new Qf;
    e.update(t);
    const i = e.digest();
    return Eo.encodeByteArray(i)
}
  , Ci = function(...n) {
    let t = "";
    for (let e = 0; e < n.length; e++) {
        const i = n[e];
        Array.isArray(i) || i && typeof i == "object" && typeof i.length == "number" ? t += Ci.apply(null, i) : typeof i == "object" ? t += ft(i) : t += i,
        t += " "
    }
    return t
};
let ti = null
  , ql = !0;
const f_ = function(n, t) {
    N(!t, "Can't turn on custom loggers persistently."),
    en.logLevel = W.VERBOSE,
    ti = en.log.bind(en)
}
  , Nt = function(...n) {
    if (ql === !0 && (ql = !1,
    ti === null && u_.get("logging_enabled") === !0 && f_()),
    ti) {
        const t = Ci.apply(null, n);
        ti(t)
    }
}
  , Ai = function(n) {
    return function(...t) {
        Nt(n, ...t)
    }
}
  , zr = function(...n) {
    const t = "FIREBASE INTERNAL ERROR: " + Ci(...n);
    en.error(t)
}
  , ie = function(...n) {
    const t = `FIREBASE FATAL ERROR: ${Ci(...n)}`;
    throw en.error(t),
    new Error(t)
}
  , Ut = function(...n) {
    const t = "FIREBASE WARNING: " + Ci(...n);
    en.warn(t)
}
  , p_ = function() {
    typeof window < "u" && window.location && window.location.protocol && window.location.protocol.indexOf("https:") !== -1 && Ut("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")
}
  , Rh = function(n) {
    return typeof n == "number" && (n !== n || n === Number.POSITIVE_INFINITY || n === Number.NEGATIVE_INFINITY)
}
  , __ = function(n) {
    if (document.readyState === "complete")
        n();
    else {
        let t = !1;
        const e = function() {
            if (!document.body) {
                setTimeout(e, Math.floor(10));
                return
            }
            t || (t = !0,
            n())
        };
        document.addEventListener ? (document.addEventListener("DOMContentLoaded", e, !1),
        window.addEventListener("load", e, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", () => {
            document.readyState === "complete" && e()
        }
        ),
        window.attachEvent("onload", e))
    }
}
  , cn = "[MIN_NAME]"
  , Fe = "[MAX_NAME]"
  , Tn = function(n, t) {
    if (n === t)
        return 0;
    if (n === cn || t === Fe)
        return -1;
    if (t === cn || n === Fe)
        return 1;
    {
        const e = jl(n)
          , i = jl(t);
        return e !== null ? i !== null ? e - i === 0 ? n.length - t.length : e - i : -1 : i !== null ? 1 : n < t ? -1 : 1
    }
}
  , g_ = function(n, t) {
    return n === t ? 0 : n < t ? -1 : 1
}
  , zn = function(n, t) {
    if (t && n in t)
        return t[n];
    throw new Error("Missing required key (" + n + ") in object: " + ft(t))
}
  , Ao = function(n) {
    if (typeof n != "object" || n === null)
        return ft(n);
    const t = [];
    for (const i in n)
        t.push(i);
    t.sort();
    let e = "{";
    for (let i = 0; i < t.length; i++)
        i !== 0 && (e += ","),
        e += ft(t[i]),
        e += ":",
        e += Ao(n[t[i]]);
    return e += "}",
    e
}
  , Sh = function(n, t) {
    const e = n.length;
    if (e <= t)
        return [n];
    const i = [];
    for (let s = 0; s < e; s += t)
        s + t > e ? i.push(n.substring(s, e)) : i.push(n.substring(s, s + t));
    return i
};
function Mt(n, t) {
    for (const e in n)
        n.hasOwnProperty(e) && t(e, n[e])
}
const Ph = function(n) {
    N(!Rh(n), "Invalid JSON number");
    const t = 11
      , e = 52
      , i = (1 << t - 1) - 1;
    let s, r, a, l, h;
    n === 0 ? (r = 0,
    a = 0,
    s = 1 / n === -1 / 0 ? 1 : 0) : (s = n < 0,
    n = Math.abs(n),
    n >= Math.pow(2, 1 - i) ? (l = Math.min(Math.floor(Math.log(n) / Math.LN2), i),
    r = l + i,
    a = Math.round(n * Math.pow(2, e - l) - Math.pow(2, e))) : (r = 0,
    a = Math.round(n / Math.pow(2, 1 - i - e))));
    const d = [];
    for (h = e; h; h -= 1)
        d.push(a % 2 ? 1 : 0),
        a = Math.floor(a / 2);
    for (h = t; h; h -= 1)
        d.push(r % 2 ? 1 : 0),
        r = Math.floor(r / 2);
    d.push(s ? 1 : 0),
    d.reverse();
    const f = d.join("");
    let _ = "";
    for (h = 0; h < 64; h += 8) {
        let m = parseInt(f.substr(h, 8), 2).toString(16);
        m.length === 1 && (m = "0" + m),
        _ = _ + m
    }
    return _.toLowerCase()
}
  , m_ = function() {
    return !!(typeof window == "object" && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href))
}
  , y_ = function() {
    return typeof Windows == "object" && typeof Windows.UI == "object"
};
function v_(n, t) {
    let e = "Unknown Error";
    n === "too_big" ? e = "The data requested exceeds the maximum size that can be accessed with a single request." : n === "permission_denied" ? e = "Client doesn't have permission to access the desired data." : n === "unavailable" && (e = "The service is unavailable");
    const i = new Error(n + " at " + t._path.toString() + ": " + e);
    return i.code = n.toUpperCase(),
    i
}
const E_ = new RegExp("^-?(0*)\\d{1,10}$")
  , T_ = -2147483648
  , I_ = 2147483647
  , jl = function(n) {
    if (E_.test(n)) {
        const t = Number(n);
        if (t >= T_ && t <= I_)
            return t
    }
    return null
}
  , Ri = function(n) {
    try {
        n()
    } catch (t) {
        setTimeout( () => {
            const e = t.stack || "";
            throw Ut("Exception was thrown by user callback.", e),
            t
        }
        , Math.floor(0))
    }
}
  , w_ = function() {
    return (typeof window == "object" && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0
}
  , ei = function(n, t) {
    const e = setTimeout(n, t);
    return typeof e == "number" && typeof Deno < "u" && Deno.unrefTimer ? Deno.unrefTimer(e) : typeof e == "object" && e.unref && e.unref(),
    e
};
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class C_ {
    constructor(t, e) {
        this.appName_ = t,
        this.appCheckProvider = e,
        this.appCheck = e == null ? void 0 : e.getImmediate({
            optional: !0
        }),
        this.appCheck || e == null || e.get().then(i => this.appCheck = i)
    }
    getToken(t) {
        return this.appCheck ? this.appCheck.getToken(t) : new Promise( (e, i) => {
            setTimeout( () => {
                this.appCheck ? this.getToken(t).then(e, i) : e(null)
            }
            , 0)
        }
        )
    }
    addTokenChangeListener(t) {
        var e;
        (e = this.appCheckProvider) === null || e === void 0 || e.get().then(i => i.addTokenListener(t))
    }
    notifyForInvalidToken() {
        Ut(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class A_ {
    constructor(t, e, i) {
        this.appName_ = t,
        this.firebaseOptions_ = e,
        this.authProvider_ = i,
        this.auth_ = null,
        this.auth_ = i.getImmediate({
            optional: !0
        }),
        this.auth_ || i.onInit(s => this.auth_ = s)
    }
    getToken(t) {
        return this.auth_ ? this.auth_.getToken(t).catch(e => e && e.code === "auth/token-not-initialized" ? (Nt("Got auth/token-not-initialized error.  Treating as null token."),
        null) : Promise.reject(e)) : new Promise( (e, i) => {
            setTimeout( () => {
                this.auth_ ? this.getToken(t).then(e, i) : e(null)
            }
            , 0)
        }
        )
    }
    addTokenChangeListener(t) {
        this.auth_ ? this.auth_.addAuthTokenListener(t) : this.authProvider_.get().then(e => e.addAuthTokenListener(t))
    }
    removeTokenChangeListener(t) {
        this.authProvider_.get().then(e => e.removeAuthTokenListener(t))
    }
    notifyForInvalidToken() {
        let t = 'Provided authentication credentials for the app named "' + this.appName_ + '" are invalid. This usually indicates your app was not initialized correctly. ';
        "credential"in this.firebaseOptions_ ? t += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : "serviceAccount"in this.firebaseOptions_ ? t += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.' : t += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',
        Ut(t)
    }
}
class ls {
    constructor(t) {
        this.accessToken = t
    }
    getToken(t) {
        return Promise.resolve({
            accessToken: this.accessToken
        })
    }
    addTokenChangeListener(t) {
        t(this.accessToken)
    }
    removeTokenChangeListener(t) {}
    notifyForInvalidToken() {}
}
ls.OWNER = "owner";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ro = "5"
  , bh = "v"
  , Nh = "s"
  , Dh = "r"
  , kh = "f"
  , xh = /(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/
  , Vh = "ls"
  , Oh = "p"
  , Gr = "ac"
  , Mh = "websocket"
  , Lh = "long_polling";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fh {
    constructor(t, e, i, s, r=!1, a="", l=!1, h=!1) {
        this.secure = e,
        this.namespace = i,
        this.webSocketOnly = s,
        this.nodeAdmin = r,
        this.persistenceKey = a,
        this.includeNamespaceInQueryParams = l,
        this.isUsingEmulator = h,
        this._host = t.toLowerCase(),
        this._domain = this._host.substr(this._host.indexOf(".") + 1),
        this.internalHost = De.get("host:" + t) || this._host
    }
    isCacheableHost() {
        return this.internalHost.substr(0, 2) === "s-"
    }
    isCustomHost() {
        return this._domain !== "firebaseio.com" && this._domain !== "firebaseio-demo.com"
    }
    get host() {
        return this._host
    }
    set host(t) {
        t !== this.internalHost && (this.internalHost = t,
        this.isCacheableHost() && De.set("host:" + this._host, this.internalHost))
    }
    toString() {
        let t = this.toURLString();
        return this.persistenceKey && (t += "<" + this.persistenceKey + ">"),
        t
    }
    toURLString() {
        const t = this.secure ? "https://" : "http://"
          , e = this.includeNamespaceInQueryParams ? `?ns=${this.namespace}` : "";
        return `${t}${this.host}/${e}`
    }
}
function R_(n) {
    return n.host !== n.internalHost || n.isCustomHost() || n.includeNamespaceInQueryParams
}
function Uh(n, t, e) {
    N(typeof t == "string", "typeof type must == string"),
    N(typeof e == "object", "typeof params must == object");
    let i;
    if (t === Mh)
        i = (n.secure ? "wss://" : "ws://") + n.internalHost + "/.ws?";
    else if (t === Lh)
        i = (n.secure ? "https://" : "http://") + n.internalHost + "/.lp?";
    else
        throw new Error("Unknown connection type: " + t);
    R_(n) && (e.ns = n.namespace);
    const s = [];
    return Mt(e, (r, a) => {
        s.push(r + "=" + a)
    }
    ),
    i + s.join("&")
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class S_ {
    constructor() {
        this.counters_ = {}
    }
    incrementCounter(t, e=1) {
        re(this.counters_, t) || (this.counters_[t] = 0),
        this.counters_[t] += e
    }
    get() {
        return Df(this.counters_)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Rr = {}
  , Sr = {};
function So(n) {
    const t = n.toString();
    return Rr[t] || (Rr[t] = new S_),
    Rr[t]
}
function P_(n, t) {
    const e = n.toString();
    return Sr[e] || (Sr[e] = t()),
    Sr[e]
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class b_ {
    constructor(t) {
        this.onMessage_ = t,
        this.pendingResponses = [],
        this.currentResponseNum = 0,
        this.closeAfterResponse = -1,
        this.onClose = null
    }
    closeAfter(t, e) {
        this.closeAfterResponse = t,
        this.onClose = e,
        this.closeAfterResponse < this.currentResponseNum && (this.onClose(),
        this.onClose = null)
    }
    handleResponse(t, e) {
        for (this.pendingResponses[t] = e; this.pendingResponses[this.currentResponseNum]; ) {
            const i = this.pendingResponses[this.currentResponseNum];
            delete this.pendingResponses[this.currentResponseNum];
            for (let s = 0; s < i.length; ++s)
                i[s] && Ri( () => {
                    this.onMessage_(i[s])
                }
                );
            if (this.currentResponseNum === this.closeAfterResponse) {
                this.onClose && (this.onClose(),
                this.onClose = null);
                break
            }
            this.currentResponseNum++
        }
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $l = "start"
  , N_ = "close"
  , D_ = "pLPCommand"
  , k_ = "pRTLPCB"
  , Bh = "id"
  , qh = "pw"
  , jh = "ser"
  , x_ = "cb"
  , V_ = "seg"
  , O_ = "ts"
  , M_ = "d"
  , L_ = "dframe"
  , $h = 1870
  , Wh = 30
  , F_ = $h - Wh
  , U_ = 25e3
  , B_ = 3e4;
class Ze {
    constructor(t, e, i, s, r, a, l) {
        this.connId = t,
        this.repoInfo = e,
        this.applicationId = i,
        this.appCheckToken = s,
        this.authToken = r,
        this.transportSessionId = a,
        this.lastSessionId = l,
        this.bytesSent = 0,
        this.bytesReceived = 0,
        this.everConnected_ = !1,
        this.log_ = Ai(t),
        this.stats_ = So(e),
        this.urlFn = h => (this.appCheckToken && (h[Gr] = this.appCheckToken),
        Uh(e, Lh, h))
    }
    open(t, e) {
        this.curSegmentNum = 0,
        this.onDisconnect_ = e,
        this.myPacketOrderer = new b_(t),
        this.isClosed_ = !1,
        this.connectTimeoutTimer_ = setTimeout( () => {
            this.log_("Timed out trying to connect."),
            this.onClosed_(),
            this.connectTimeoutTimer_ = null
        }
        , Math.floor(B_)),
        __( () => {
            if (this.isClosed_)
                return;
            this.scriptTagHolder = new Po( (...r) => {
                const [a,l,h,d,f] = r;
                if (this.incrementIncomingBytes_(r),
                !!this.scriptTagHolder)
                    if (this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_),
                    this.connectTimeoutTimer_ = null),
                    this.everConnected_ = !0,
                    a === $l)
                        this.id = l,
                        this.password = h;
                    else if (a === N_)
                        l ? (this.scriptTagHolder.sendNewPolls = !1,
                        this.myPacketOrderer.closeAfter(l, () => {
                            this.onClosed_()
                        }
                        )) : this.onClosed_();
                    else
                        throw new Error("Unrecognized command received: " + a)
            }
            , (...r) => {
                const [a,l] = r;
                this.incrementIncomingBytes_(r),
                this.myPacketOrderer.handleResponse(a, l)
            }
            , () => {
                this.onClosed_()
            }
            ,this.urlFn);
            const i = {};
            i[$l] = "t",
            i[jh] = Math.floor(Math.random() * 1e8),
            this.scriptTagHolder.uniqueCallbackIdentifier && (i[x_] = this.scriptTagHolder.uniqueCallbackIdentifier),
            i[bh] = Ro,
            this.transportSessionId && (i[Nh] = this.transportSessionId),
            this.lastSessionId && (i[Vh] = this.lastSessionId),
            this.applicationId && (i[Oh] = this.applicationId),
            this.appCheckToken && (i[Gr] = this.appCheckToken),
            typeof location < "u" && location.hostname && xh.test(location.hostname) && (i[Dh] = kh);
            const s = this.urlFn(i);
            this.log_("Connecting via long-poll to " + s),
            this.scriptTagHolder.addTag(s, () => {}
            )
        }
        )
    }
    start() {
        this.scriptTagHolder.startLongPoll(this.id, this.password),
        this.addDisconnectPingFrame(this.id, this.password)
    }
    static forceAllow() {
        Ze.forceAllow_ = !0
    }
    static forceDisallow() {
        Ze.forceDisallow_ = !0
    }
    static isAvailable() {
        return Ze.forceAllow_ ? !0 : !Ze.forceDisallow_ && typeof document < "u" && document.createElement != null && !m_() && !y_()
    }
    markConnectionHealthy() {}
    shutdown_() {
        this.isClosed_ = !0,
        this.scriptTagHolder && (this.scriptTagHolder.close(),
        this.scriptTagHolder = null),
        this.myDisconnFrame && (document.body.removeChild(this.myDisconnFrame),
        this.myDisconnFrame = null),
        this.connectTimeoutTimer_ && (clearTimeout(this.connectTimeoutTimer_),
        this.connectTimeoutTimer_ = null)
    }
    onClosed_() {
        this.isClosed_ || (this.log_("Longpoll is closing itself"),
        this.shutdown_(),
        this.onDisconnect_ && (this.onDisconnect_(this.everConnected_),
        this.onDisconnect_ = null))
    }
    close() {
        this.isClosed_ || (this.log_("Longpoll is being closed."),
        this.shutdown_())
    }
    send(t) {
        const e = ft(t);
        this.bytesSent += e.length,
        this.stats_.incrementCounter("bytes_sent", e.length);
        const i = rh(e)
          , s = Sh(i, F_);
        for (let r = 0; r < s.length; r++)
            this.scriptTagHolder.enqueueSegment(this.curSegmentNum, s.length, s[r]),
            this.curSegmentNum++
    }
    addDisconnectPingFrame(t, e) {
        this.myDisconnFrame = document.createElement("iframe");
        const i = {};
        i[L_] = "t",
        i[Bh] = t,
        i[qh] = e,
        this.myDisconnFrame.src = this.urlFn(i),
        this.myDisconnFrame.style.display = "none",
        document.body.appendChild(this.myDisconnFrame)
    }
    incrementIncomingBytes_(t) {
        const e = ft(t).length;
        this.bytesReceived += e,
        this.stats_.incrementCounter("bytes_received", e)
    }
}
class Po {
    constructor(t, e, i, s) {
        this.onDisconnect = i,
        this.urlFn = s,
        this.outstandingRequests = new Set,
        this.pendingSegs = [],
        this.currentSerial = Math.floor(Math.random() * 1e8),
        this.sendNewPolls = !0;
        {
            this.uniqueCallbackIdentifier = d_(),
            window[D_ + this.uniqueCallbackIdentifier] = t,
            window[k_ + this.uniqueCallbackIdentifier] = e,
            this.myIFrame = Po.createIFrame_();
            let r = "";
            this.myIFrame.src && this.myIFrame.src.substr(0, 11) === "javascript:" && (r = '<script>document.domain="' + document.domain + '";<\/script>');
            const a = "<html><body>" + r + "</body></html>";
            try {
                this.myIFrame.doc.open(),
                this.myIFrame.doc.write(a),
                this.myIFrame.doc.close()
            } catch (l) {
                Nt("frame writing exception"),
                l.stack && Nt(l.stack),
                Nt(l)
            }
        }
    }
    static createIFrame_() {
        const t = document.createElement("iframe");
        if (t.style.display = "none",
        document.body) {
            document.body.appendChild(t);
            try {
                t.contentWindow.document || Nt("No IE domain setting required")
            } catch {
                const i = document.domain;
                t.src = "javascript:void((function(){document.open();document.domain='" + i + "';document.close();})())"
            }
        } else
            throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
        return t.contentDocument ? t.doc = t.contentDocument : t.contentWindow ? t.doc = t.contentWindow.document : t.document && (t.doc = t.document),
        t
    }
    close() {
        this.alive = !1,
        this.myIFrame && (this.myIFrame.doc.body.textContent = "",
        setTimeout( () => {
            this.myIFrame !== null && (document.body.removeChild(this.myIFrame),
            this.myIFrame = null)
        }
        , Math.floor(0)));
        const t = this.onDisconnect;
        t && (this.onDisconnect = null,
        t())
    }
    startLongPoll(t, e) {
        for (this.myID = t,
        this.myPW = e,
        this.alive = !0; this.newRequest_(); )
            ;
    }
    newRequest_() {
        if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
            this.currentSerial++;
            const t = {};
            t[Bh] = this.myID,
            t[qh] = this.myPW,
            t[jh] = this.currentSerial;
            let e = this.urlFn(t)
              , i = ""
              , s = 0;
            for (; this.pendingSegs.length > 0 && this.pendingSegs[0].d.length + Wh + i.length <= $h; ) {
                const a = this.pendingSegs.shift();
                i = i + "&" + V_ + s + "=" + a.seg + "&" + O_ + s + "=" + a.ts + "&" + M_ + s + "=" + a.d,
                s++
            }
            return e = e + i,
            this.addLongPollTag_(e, this.currentSerial),
            !0
        } else
            return !1
    }
    enqueueSegment(t, e, i) {
        this.pendingSegs.push({
            seg: t,
            ts: e,
            d: i
        }),
        this.alive && this.newRequest_()
    }
    addLongPollTag_(t, e) {
        this.outstandingRequests.add(e);
        const i = () => {
            this.outstandingRequests.delete(e),
            this.newRequest_()
        }
          , s = setTimeout(i, Math.floor(U_))
          , r = () => {
            clearTimeout(s),
            i()
        }
        ;
        this.addTag(t, r)
    }
    addTag(t, e) {
        setTimeout( () => {
            try {
                if (!this.sendNewPolls)
                    return;
                const i = this.myIFrame.doc.createElement("script");
                i.type = "text/javascript",
                i.async = !0,
                i.src = t,
                i.onload = i.onreadystatechange = function() {
                    const s = i.readyState;
                    (!s || s === "loaded" || s === "complete") && (i.onload = i.onreadystatechange = null,
                    i.parentNode && i.parentNode.removeChild(i),
                    e())
                }
                ,
                i.onerror = () => {
                    Nt("Long-poll script failed to load: " + t),
                    this.sendNewPolls = !1,
                    this.close()
                }
                ,
                this.myIFrame.doc.body.appendChild(i)
            } catch {}
        }
        , Math.floor(1))
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const q_ = 16384
  , j_ = 45e3;
let ms = null;
typeof MozWebSocket < "u" ? ms = MozWebSocket : typeof WebSocket < "u" && (ms = WebSocket);
class qt {
    constructor(t, e, i, s, r, a, l) {
        this.connId = t,
        this.applicationId = i,
        this.appCheckToken = s,
        this.authToken = r,
        this.keepaliveTimer = null,
        this.frames = null,
        this.totalFrames = 0,
        this.bytesSent = 0,
        this.bytesReceived = 0,
        this.log_ = Ai(this.connId),
        this.stats_ = So(e),
        this.connURL = qt.connectionURL_(e, a, l, s, i),
        this.nodeAdmin = e.nodeAdmin
    }
    static connectionURL_(t, e, i, s, r) {
        const a = {};
        return a[bh] = Ro,
        typeof location < "u" && location.hostname && xh.test(location.hostname) && (a[Dh] = kh),
        e && (a[Nh] = e),
        i && (a[Vh] = i),
        s && (a[Gr] = s),
        r && (a[Oh] = r),
        Uh(t, Mh, a)
    }
    open(t, e) {
        this.onDisconnect = e,
        this.onMessage = t,
        this.log_("Websocket connecting to " + this.connURL),
        this.everConnected_ = !1,
        De.set("previous_websocket_failure", !0);
        try {
            let i;
            dh(),
            this.mySock = new ms(this.connURL,[],i)
        } catch (i) {
            this.log_("Error instantiating WebSocket.");
            const s = i.message || i.data;
            s && this.log_(s),
            this.onClosed_();
            return
        }
        this.mySock.onopen = () => {
            this.log_("Websocket connected."),
            this.everConnected_ = !0
        }
        ,
        this.mySock.onclose = () => {
            this.log_("Websocket connection was disconnected."),
            this.mySock = null,
            this.onClosed_()
        }
        ,
        this.mySock.onmessage = i => {
            this.handleIncomingFrame(i)
        }
        ,
        this.mySock.onerror = i => {
            this.log_("WebSocket error.  Closing connection.");
            const s = i.message || i.data;
            s && this.log_(s),
            this.onClosed_()
        }
    }
    start() {}
    static forceDisallow() {
        qt.forceDisallow_ = !0
    }
    static isAvailable() {
        let t = !1;
        if (typeof navigator < "u" && navigator.userAgent) {
            const e = /Android ([0-9]{0,}\.[0-9]{0,})/
              , i = navigator.userAgent.match(e);
            i && i.length > 1 && parseFloat(i[1]) < 4.4 && (t = !0)
        }
        return !t && ms !== null && !qt.forceDisallow_
    }
    static previouslyFailed() {
        return De.isInMemoryStorage || De.get("previous_websocket_failure") === !0
    }
    markConnectionHealthy() {
        De.remove("previous_websocket_failure")
    }
    appendFrame_(t) {
        if (this.frames.push(t),
        this.frames.length === this.totalFrames) {
            const e = this.frames.join("");
            this.frames = null;
            const i = ci(e);
            this.onMessage(i)
        }
    }
    handleNewFrameCount_(t) {
        this.totalFrames = t,
        this.frames = []
    }
    extractFrameCount_(t) {
        if (N(this.frames === null, "We already have a frame buffer"),
        t.length <= 6) {
            const e = Number(t);
            if (!isNaN(e))
                return this.handleNewFrameCount_(e),
                null
        }
        return this.handleNewFrameCount_(1),
        t
    }
    handleIncomingFrame(t) {
        if (this.mySock === null)
            return;
        const e = t.data;
        if (this.bytesReceived += e.length,
        this.stats_.incrementCounter("bytes_received", e.length),
        this.resetKeepAlive(),
        this.frames !== null)
            this.appendFrame_(e);
        else {
            const i = this.extractFrameCount_(e);
            i !== null && this.appendFrame_(i)
        }
    }
    send(t) {
        this.resetKeepAlive();
        const e = ft(t);
        this.bytesSent += e.length,
        this.stats_.incrementCounter("bytes_sent", e.length);
        const i = Sh(e, q_);
        i.length > 1 && this.sendString_(String(i.length));
        for (let s = 0; s < i.length; s++)
            this.sendString_(i[s])
    }
    shutdown_() {
        this.isClosed_ = !0,
        this.keepaliveTimer && (clearInterval(this.keepaliveTimer),
        this.keepaliveTimer = null),
        this.mySock && (this.mySock.close(),
        this.mySock = null)
    }
    onClosed_() {
        this.isClosed_ || (this.log_("WebSocket is closing itself"),
        this.shutdown_(),
        this.onDisconnect && (this.onDisconnect(this.everConnected_),
        this.onDisconnect = null))
    }
    close() {
        this.isClosed_ || (this.log_("WebSocket is being closed"),
        this.shutdown_())
    }
    resetKeepAlive() {
        clearInterval(this.keepaliveTimer),
        this.keepaliveTimer = setInterval( () => {
            this.mySock && this.sendString_("0"),
            this.resetKeepAlive()
        }
        , Math.floor(j_))
    }
    sendString_(t) {
        try {
            this.mySock.send(t)
        } catch (e) {
            this.log_("Exception thrown from WebSocket.send():", e.message || e.data, "Closing connection."),
            setTimeout(this.onClosed_.bind(this), 0)
        }
    }
}
qt.responsesRequiredToBeHealthy = 2;
qt.healthyTimeout = 3e4;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class di {
    constructor(t) {
        this.initTransports_(t)
    }
    static get ALL_TRANSPORTS() {
        return [Ze, qt]
    }
    static get IS_TRANSPORT_INITIALIZED() {
        return this.globalTransportInitialized_
    }
    initTransports_(t) {
        const e = qt && qt.isAvailable();
        let i = e && !qt.previouslyFailed();
        if (t.webSocketOnly && (e || Ut("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),
        i = !0),
        i)
            this.transports_ = [qt];
        else {
            const s = this.transports_ = [];
            for (const r of di.ALL_TRANSPORTS)
                r && r.isAvailable() && s.push(r);
            di.globalTransportInitialized_ = !0
        }
    }
    initialTransport() {
        if (this.transports_.length > 0)
            return this.transports_[0];
        throw new Error("No transports available")
    }
    upgradeTransport() {
        return this.transports_.length > 1 ? this.transports_[1] : null
    }
}
di.globalTransportInitialized_ = !1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $_ = 6e4
  , W_ = 5e3
  , z_ = 10 * 1024
  , G_ = 100 * 1024
  , Pr = "t"
  , Wl = "d"
  , H_ = "s"
  , zl = "r"
  , K_ = "e"
  , Gl = "o"
  , Hl = "a"
  , Kl = "n"
  , Ql = "p"
  , Q_ = "h";
class Y_ {
    constructor(t, e, i, s, r, a, l, h, d, f) {
        this.id = t,
        this.repoInfo_ = e,
        this.applicationId_ = i,
        this.appCheckToken_ = s,
        this.authToken_ = r,
        this.onMessage_ = a,
        this.onReady_ = l,
        this.onDisconnect_ = h,
        this.onKill_ = d,
        this.lastSessionId = f,
        this.connectionCount = 0,
        this.pendingDataMessages = [],
        this.state_ = 0,
        this.log_ = Ai("c:" + this.id + ":"),
        this.transportManager_ = new di(e),
        this.log_("Connection created"),
        this.start_()
    }
    start_() {
        const t = this.transportManager_.initialTransport();
        this.conn_ = new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),
        this.primaryResponsesRequired_ = t.responsesRequiredToBeHealthy || 0;
        const e = this.connReceiver_(this.conn_)
          , i = this.disconnReceiver_(this.conn_);
        this.tx_ = this.conn_,
        this.rx_ = this.conn_,
        this.secondaryConn_ = null,
        this.isHealthy_ = !1,
        setTimeout( () => {
            this.conn_ && this.conn_.open(e, i)
        }
        , Math.floor(0));
        const s = t.healthyTimeout || 0;
        s > 0 && (this.healthyTimeout_ = ei( () => {
            this.healthyTimeout_ = null,
            this.isHealthy_ || (this.conn_ && this.conn_.bytesReceived > G_ ? (this.log_("Connection exceeded healthy timeout but has received " + this.conn_.bytesReceived + " bytes.  Marking connection healthy."),
            this.isHealthy_ = !0,
            this.conn_.markConnectionHealthy()) : this.conn_ && this.conn_.bytesSent > z_ ? this.log_("Connection exceeded healthy timeout but has sent " + this.conn_.bytesSent + " bytes.  Leaving connection alive.") : (this.log_("Closing unhealthy connection after timeout."),
            this.close()))
        }
        , Math.floor(s)))
    }
    nextTransportId_() {
        return "c:" + this.id + ":" + this.connectionCount++
    }
    disconnReceiver_(t) {
        return e => {
            t === this.conn_ ? this.onConnectionLost_(e) : t === this.secondaryConn_ ? (this.log_("Secondary connection lost."),
            this.onSecondaryConnectionLost_()) : this.log_("closing an old connection")
        }
    }
    connReceiver_(t) {
        return e => {
            this.state_ !== 2 && (t === this.rx_ ? this.onPrimaryMessageReceived_(e) : t === this.secondaryConn_ ? this.onSecondaryMessageReceived_(e) : this.log_("message on old connection"))
        }
    }
    sendRequest(t) {
        const e = {
            t: "d",
            d: t
        };
        this.sendData_(e)
    }
    tryCleanupConnection() {
        this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_ && (this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId),
        this.conn_ = this.secondaryConn_,
        this.secondaryConn_ = null)
    }
    onSecondaryControl_(t) {
        if (Pr in t) {
            const e = t[Pr];
            e === Hl ? this.upgradeIfSecondaryHealthy_() : e === zl ? (this.log_("Got a reset on secondary, closing it"),
            this.secondaryConn_.close(),
            (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) && this.close()) : e === Gl && (this.log_("got pong on secondary."),
            this.secondaryResponsesRequired_--,
            this.upgradeIfSecondaryHealthy_())
        }
    }
    onSecondaryMessageReceived_(t) {
        const e = zn("t", t)
          , i = zn("d", t);
        if (e === "c")
            this.onSecondaryControl_(i);
        else if (e === "d")
            this.pendingDataMessages.push(i);
        else
            throw new Error("Unknown protocol layer: " + e)
    }
    upgradeIfSecondaryHealthy_() {
        this.secondaryResponsesRequired_ <= 0 ? (this.log_("Secondary connection is healthy."),
        this.isHealthy_ = !0,
        this.secondaryConn_.markConnectionHealthy(),
        this.proceedWithUpgrade_()) : (this.log_("sending ping on secondary."),
        this.secondaryConn_.send({
            t: "c",
            d: {
                t: Ql,
                d: {}
            }
        }))
    }
    proceedWithUpgrade_() {
        this.secondaryConn_.start(),
        this.log_("sending client ack on secondary"),
        this.secondaryConn_.send({
            t: "c",
            d: {
                t: Hl,
                d: {}
            }
        }),
        this.log_("Ending transmission on primary"),
        this.conn_.send({
            t: "c",
            d: {
                t: Kl,
                d: {}
            }
        }),
        this.tx_ = this.secondaryConn_,
        this.tryCleanupConnection()
    }
    onPrimaryMessageReceived_(t) {
        const e = zn("t", t)
          , i = zn("d", t);
        e === "c" ? this.onControl_(i) : e === "d" && this.onDataMessage_(i)
    }
    onDataMessage_(t) {
        this.onPrimaryResponse_(),
        this.onMessage_(t)
    }
    onPrimaryResponse_() {
        this.isHealthy_ || (this.primaryResponsesRequired_--,
        this.primaryResponsesRequired_ <= 0 && (this.log_("Primary connection is healthy."),
        this.isHealthy_ = !0,
        this.conn_.markConnectionHealthy()))
    }
    onControl_(t) {
        const e = zn(Pr, t);
        if (Wl in t) {
            const i = t[Wl];
            if (e === Q_) {
                const s = Object.assign({}, i);
                this.repoInfo_.isUsingEmulator && (s.h = this.repoInfo_.host),
                this.onHandshake_(s)
            } else if (e === Kl) {
                this.log_("recvd end transmission on primary"),
                this.rx_ = this.secondaryConn_;
                for (let s = 0; s < this.pendingDataMessages.length; ++s)
                    this.onDataMessage_(this.pendingDataMessages[s]);
                this.pendingDataMessages = [],
                this.tryCleanupConnection()
            } else
                e === H_ ? this.onConnectionShutdown_(i) : e === zl ? this.onReset_(i) : e === K_ ? zr("Server Error: " + i) : e === Gl ? (this.log_("got pong on primary."),
                this.onPrimaryResponse_(),
                this.sendPingOnPrimaryIfNecessary_()) : zr("Unknown control packet command: " + e)
        }
    }
    onHandshake_(t) {
        const e = t.ts
          , i = t.v
          , s = t.h;
        this.sessionId = t.s,
        this.repoInfo_.host = s,
        this.state_ === 0 && (this.conn_.start(),
        this.onConnectionEstablished_(this.conn_, e),
        Ro !== i && Ut("Protocol version mismatch detected"),
        this.tryStartUpgrade_())
    }
    tryStartUpgrade_() {
        const t = this.transportManager_.upgradeTransport();
        t && this.startUpgrade_(t)
    }
    startUpgrade_(t) {
        this.secondaryConn_ = new t(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),
        this.secondaryResponsesRequired_ = t.responsesRequiredToBeHealthy || 0;
        const e = this.connReceiver_(this.secondaryConn_)
          , i = this.disconnReceiver_(this.secondaryConn_);
        this.secondaryConn_.open(e, i),
        ei( () => {
            this.secondaryConn_ && (this.log_("Timed out trying to upgrade."),
            this.secondaryConn_.close())
        }
        , Math.floor($_))
    }
    onReset_(t) {
        this.log_("Reset packet received.  New host: " + t),
        this.repoInfo_.host = t,
        this.state_ === 1 ? this.close() : (this.closeConnections_(),
        this.start_())
    }
    onConnectionEstablished_(t, e) {
        this.log_("Realtime connection established."),
        this.conn_ = t,
        this.state_ = 1,
        this.onReady_ && (this.onReady_(e, this.sessionId),
        this.onReady_ = null),
        this.primaryResponsesRequired_ === 0 ? (this.log_("Primary connection is healthy."),
        this.isHealthy_ = !0) : ei( () => {
            this.sendPingOnPrimaryIfNecessary_()
        }
        , Math.floor(W_))
    }
    sendPingOnPrimaryIfNecessary_() {
        !this.isHealthy_ && this.state_ === 1 && (this.log_("sending ping on primary."),
        this.sendData_({
            t: "c",
            d: {
                t: Ql,
                d: {}
            }
        }))
    }
    onSecondaryConnectionLost_() {
        const t = this.secondaryConn_;
        this.secondaryConn_ = null,
        (this.tx_ === t || this.rx_ === t) && this.close()
    }
    onConnectionLost_(t) {
        this.conn_ = null,
        !t && this.state_ === 0 ? (this.log_("Realtime connection failed."),
        this.repoInfo_.isCacheableHost() && (De.remove("host:" + this.repoInfo_.host),
        this.repoInfo_.internalHost = this.repoInfo_.host)) : this.state_ === 1 && this.log_("Realtime connection lost."),
        this.close()
    }
    onConnectionShutdown_(t) {
        this.log_("Connection shutdown command received. Shutting down..."),
        this.onKill_ && (this.onKill_(t),
        this.onKill_ = null),
        this.onDisconnect_ = null,
        this.close()
    }
    sendData_(t) {
        if (this.state_ !== 1)
            throw "Connection is not connected";
        this.tx_.send(t)
    }
    close() {
        this.state_ !== 2 && (this.log_("Closing realtime connection."),
        this.state_ = 2,
        this.closeConnections_(),
        this.onDisconnect_ && (this.onDisconnect_(),
        this.onDisconnect_ = null))
    }
    closeConnections_() {
        this.log_("Shutting down all connections"),
        this.conn_ && (this.conn_.close(),
        this.conn_ = null),
        this.secondaryConn_ && (this.secondaryConn_.close(),
        this.secondaryConn_ = null),
        this.healthyTimeout_ && (clearTimeout(this.healthyTimeout_),
        this.healthyTimeout_ = null)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zh {
    put(t, e, i, s) {}
    merge(t, e, i, s) {}
    refreshAuthToken(t) {}
    refreshAppCheckToken(t) {}
    onDisconnectPut(t, e, i) {}
    onDisconnectMerge(t, e, i) {}
    onDisconnectCancel(t, e) {}
    reportStats(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Gh {
    constructor(t) {
        this.allowedEvents_ = t,
        this.listeners_ = {},
        N(Array.isArray(t) && t.length > 0, "Requires a non-empty array")
    }
    trigger(t, ...e) {
        if (Array.isArray(this.listeners_[t])) {
            const i = [...this.listeners_[t]];
            for (let s = 0; s < i.length; s++)
                i[s].callback.apply(i[s].context, e)
        }
    }
    on(t, e, i) {
        this.validateEventType_(t),
        this.listeners_[t] = this.listeners_[t] || [],
        this.listeners_[t].push({
            callback: e,
            context: i
        });
        const s = this.getInitialEvent(t);
        s && e.apply(i, s)
    }
    off(t, e, i) {
        this.validateEventType_(t);
        const s = this.listeners_[t] || [];
        for (let r = 0; r < s.length; r++)
            if (s[r].callback === e && (!i || i === s[r].context)) {
                s.splice(r, 1);
                return
            }
    }
    validateEventType_(t) {
        N(this.allowedEvents_.find(e => e === t), "Unknown event: " + t)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ys extends Gh {
    constructor() {
        super(["online"]),
        this.online_ = !0,
        typeof window < "u" && typeof window.addEventListener < "u" && !uh() && (window.addEventListener("online", () => {
            this.online_ || (this.online_ = !0,
            this.trigger("online", !0))
        }
        , !1),
        window.addEventListener("offline", () => {
            this.online_ && (this.online_ = !1,
            this.trigger("online", !1))
        }
        , !1))
    }
    static getInstance() {
        return new ys
    }
    getInitialEvent(t) {
        return N(t === "online", "Unknown event type: " + t),
        [this.online_]
    }
    currentlyOnline() {
        return this.online_
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Yl = 32
  , Xl = 768;
class Z {
    constructor(t, e) {
        if (e === void 0) {
            this.pieces_ = t.split("/");
            let i = 0;
            for (let s = 0; s < this.pieces_.length; s++)
                this.pieces_[s].length > 0 && (this.pieces_[i] = this.pieces_[s],
                i++);
            this.pieces_.length = i,
            this.pieceNum_ = 0
        } else
            this.pieces_ = t,
            this.pieceNum_ = e
    }
    toString() {
        let t = "";
        for (let e = this.pieceNum_; e < this.pieces_.length; e++)
            this.pieces_[e] !== "" && (t += "/" + this.pieces_[e]);
        return t || "/"
    }
}
function K() {
    return new Z("")
}
function j(n) {
    return n.pieceNum_ >= n.pieces_.length ? null : n.pieces_[n.pieceNum_]
}
function ye(n) {
    return n.pieces_.length - n.pieceNum_
}
function et(n) {
    let t = n.pieceNum_;
    return t < n.pieces_.length && t++,
    new Z(n.pieces_,t)
}
function Hh(n) {
    return n.pieceNum_ < n.pieces_.length ? n.pieces_[n.pieces_.length - 1] : null
}
function X_(n) {
    let t = "";
    for (let e = n.pieceNum_; e < n.pieces_.length; e++)
        n.pieces_[e] !== "" && (t += "/" + encodeURIComponent(String(n.pieces_[e])));
    return t || "/"
}
function Kh(n, t=0) {
    return n.pieces_.slice(n.pieceNum_ + t)
}
function Qh(n) {
    if (n.pieceNum_ >= n.pieces_.length)
        return null;
    const t = [];
    for (let e = n.pieceNum_; e < n.pieces_.length - 1; e++)
        t.push(n.pieces_[e]);
    return new Z(t,0)
}
function pt(n, t) {
    const e = [];
    for (let i = n.pieceNum_; i < n.pieces_.length; i++)
        e.push(n.pieces_[i]);
    if (t instanceof Z)
        for (let i = t.pieceNum_; i < t.pieces_.length; i++)
            e.push(t.pieces_[i]);
    else {
        const i = t.split("/");
        for (let s = 0; s < i.length; s++)
            i[s].length > 0 && e.push(i[s])
    }
    return new Z(e,0)
}
function q(n) {
    return n.pieceNum_ >= n.pieces_.length
}
function Ot(n, t) {
    const e = j(n)
      , i = j(t);
    if (e === null)
        return t;
    if (e === i)
        return Ot(et(n), et(t));
    throw new Error("INTERNAL ERROR: innerPath (" + t + ") is not within outerPath (" + n + ")")
}
function Yh(n, t) {
    if (ye(n) !== ye(t))
        return !1;
    for (let e = n.pieceNum_, i = t.pieceNum_; e <= n.pieces_.length; e++,
    i++)
        if (n.pieces_[e] !== t.pieces_[i])
            return !1;
    return !0
}
function jt(n, t) {
    let e = n.pieceNum_
      , i = t.pieceNum_;
    if (ye(n) > ye(t))
        return !1;
    for (; e < n.pieces_.length; ) {
        if (n.pieces_[e] !== t.pieces_[i])
            return !1;
        ++e,
        ++i
    }
    return !0
}
class J_ {
    constructor(t, e) {
        this.errorPrefix_ = e,
        this.parts_ = Kh(t, 0),
        this.byteLength_ = Math.max(1, this.parts_.length);
        for (let i = 0; i < this.parts_.length; i++)
            this.byteLength_ += Vs(this.parts_[i]);
        Xh(this)
    }
}
function Z_(n, t) {
    n.parts_.length > 0 && (n.byteLength_ += 1),
    n.parts_.push(t),
    n.byteLength_ += Vs(t),
    Xh(n)
}
function tg(n) {
    const t = n.parts_.pop();
    n.byteLength_ -= Vs(t),
    n.parts_.length > 0 && (n.byteLength_ -= 1)
}
function Xh(n) {
    if (n.byteLength_ > Xl)
        throw new Error(n.errorPrefix_ + "has a key path longer than " + Xl + " bytes (" + n.byteLength_ + ").");
    if (n.parts_.length > Yl)
        throw new Error(n.errorPrefix_ + "path specified exceeds the maximum depth that can be written (" + Yl + ") or object contains a cycle " + Ne(n))
}
function Ne(n) {
    return n.parts_.length === 0 ? "" : "in property '" + n.parts_.join(".") + "'"
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bo extends Gh {
    constructor() {
        super(["visible"]);
        let t, e;
        typeof document < "u" && typeof document.addEventListener < "u" && (typeof document.hidden < "u" ? (e = "visibilitychange",
        t = "hidden") : typeof document.mozHidden < "u" ? (e = "mozvisibilitychange",
        t = "mozHidden") : typeof document.msHidden < "u" ? (e = "msvisibilitychange",
        t = "msHidden") : typeof document.webkitHidden < "u" && (e = "webkitvisibilitychange",
        t = "webkitHidden")),
        this.visible_ = !0,
        e && document.addEventListener(e, () => {
            const i = !document[t];
            i !== this.visible_ && (this.visible_ = i,
            this.trigger("visible", i))
        }
        , !1)
    }
    static getInstance() {
        return new bo
    }
    getInitialEvent(t) {
        return N(t === "visible", "Unknown event type: " + t),
        [this.visible_]
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Gn = 1e3
  , eg = 60 * 5 * 1e3
  , Jl = 30 * 1e3
  , ng = 1.3
  , ig = 3e4
  , sg = "server_kill"
  , Zl = 3;
class ee extends zh {
    constructor(t, e, i, s, r, a, l, h) {
        if (super(),
        this.repoInfo_ = t,
        this.applicationId_ = e,
        this.onDataUpdate_ = i,
        this.onConnectStatus_ = s,
        this.onServerInfoUpdate_ = r,
        this.authTokenProvider_ = a,
        this.appCheckTokenProvider_ = l,
        this.authOverride_ = h,
        this.id = ee.nextPersistentConnectionId_++,
        this.log_ = Ai("p:" + this.id + ":"),
        this.interruptReasons_ = {},
        this.listens = new Map,
        this.outstandingPuts_ = [],
        this.outstandingGets_ = [],
        this.outstandingPutCount_ = 0,
        this.outstandingGetCount_ = 0,
        this.onDisconnectRequestQueue_ = [],
        this.connected_ = !1,
        this.reconnectDelay_ = Gn,
        this.maxReconnectDelay_ = eg,
        this.securityDebugCallback_ = null,
        this.lastSessionId = null,
        this.establishConnectionTimer_ = null,
        this.visible_ = !1,
        this.requestCBHash_ = {},
        this.requestNumber_ = 0,
        this.realtime_ = null,
        this.authToken_ = null,
        this.appCheckToken_ = null,
        this.forceTokenRefresh_ = !1,
        this.invalidAuthTokenCount_ = 0,
        this.invalidAppCheckTokenCount_ = 0,
        this.firstConnection_ = !0,
        this.lastConnectionAttemptTime_ = null,
        this.lastConnectionEstablishedTime_ = null,
        h && !dh())
            throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
        bo.getInstance().on("visible", this.onVisible_, this),
        t.host.indexOf("fblocal") === -1 && ys.getInstance().on("online", this.onOnline_, this)
    }
    sendRequest(t, e, i) {
        const s = ++this.requestNumber_
          , r = {
            r: s,
            a: t,
            b: e
        };
        this.log_(ft(r)),
        N(this.connected_, "sendRequest call when we're not connected not allowed."),
        this.realtime_.sendRequest(r),
        i && (this.requestCBHash_[s] = i)
    }
    get(t) {
        this.initConnection_();
        const e = new Io
          , s = {
            action: "g",
            request: {
                p: t._path.toString(),
                q: t._queryObject
            },
            onComplete: a => {
                const l = a.d;
                a.s === "ok" ? e.resolve(l) : e.reject(l)
            }
        };
        this.outstandingGets_.push(s),
        this.outstandingGetCount_++;
        const r = this.outstandingGets_.length - 1;
        return this.connected_ && this.sendGet_(r),
        e.promise
    }
    listen(t, e, i, s) {
        this.initConnection_();
        const r = t._queryIdentifier
          , a = t._path.toString();
        this.log_("Listen called for " + a + " " + r),
        this.listens.has(a) || this.listens.set(a, new Map),
        N(t._queryParams.isDefault() || !t._queryParams.loadsAllData(), "listen() called for non-default but complete query"),
        N(!this.listens.get(a).has(r), "listen() called twice for same path/queryId.");
        const l = {
            onComplete: s,
            hashFn: e,
            query: t,
            tag: i
        };
        this.listens.get(a).set(r, l),
        this.connected_ && this.sendListen_(l)
    }
    sendGet_(t) {
        const e = this.outstandingGets_[t];
        this.sendRequest("g", e.request, i => {
            delete this.outstandingGets_[t],
            this.outstandingGetCount_--,
            this.outstandingGetCount_ === 0 && (this.outstandingGets_ = []),
            e.onComplete && e.onComplete(i)
        }
        )
    }
    sendListen_(t) {
        const e = t.query
          , i = e._path.toString()
          , s = e._queryIdentifier;
        this.log_("Listen on " + i + " for " + s);
        const r = {
            p: i
        }
          , a = "q";
        t.tag && (r.q = e._queryObject,
        r.t = t.tag),
        r.h = t.hashFn(),
        this.sendRequest(a, r, l => {
            const h = l.d
              , d = l.s;
            ee.warnOnListenWarnings_(h, e),
            (this.listens.get(i) && this.listens.get(i).get(s)) === t && (this.log_("listen response", l),
            d !== "ok" && this.removeListen_(i, s),
            t.onComplete && t.onComplete(d, h))
        }
        )
    }
    static warnOnListenWarnings_(t, e) {
        if (t && typeof t == "object" && re(t, "w")) {
            const i = an(t, "w");
            if (Array.isArray(i) && ~i.indexOf("no_index")) {
                const s = '".indexOn": "' + e._queryParams.getIndex().toString() + '"'
                  , r = e._path.toString();
                Ut(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)
            }
        }
    }
    refreshAuthToken(t) {
        this.authToken_ = t,
        this.log_("Auth token refreshed"),
        this.authToken_ ? this.tryAuth() : this.connected_ && this.sendRequest("unauth", {}, () => {}
        ),
        this.reduceReconnectDelayIfAdminCredential_(t)
    }
    reduceReconnectDelayIfAdminCredential_(t) {
        (t && t.length === 40 || Hf(t)) && (this.log_("Admin auth credential detected.  Reducing max reconnect time."),
        this.maxReconnectDelay_ = Jl)
    }
    refreshAppCheckToken(t) {
        this.appCheckToken_ = t,
        this.log_("App check token refreshed"),
        this.appCheckToken_ ? this.tryAppCheck() : this.connected_ && this.sendRequest("unappeck", {}, () => {}
        )
    }
    tryAuth() {
        if (this.connected_ && this.authToken_) {
            const t = this.authToken_
              , e = Gf(t) ? "auth" : "gauth"
              , i = {
                cred: t
            };
            this.authOverride_ === null ? i.noauth = !0 : typeof this.authOverride_ == "object" && (i.authvar = this.authOverride_),
            this.sendRequest(e, i, s => {
                const r = s.s
                  , a = s.d || "error";
                this.authToken_ === t && (r === "ok" ? this.invalidAuthTokenCount_ = 0 : this.onAuthRevoked_(r, a))
            }
            )
        }
    }
    tryAppCheck() {
        this.connected_ && this.appCheckToken_ && this.sendRequest("appcheck", {
            token: this.appCheckToken_
        }, t => {
            const e = t.s
              , i = t.d || "error";
            e === "ok" ? this.invalidAppCheckTokenCount_ = 0 : this.onAppCheckRevoked_(e, i)
        }
        )
    }
    unlisten(t, e) {
        const i = t._path.toString()
          , s = t._queryIdentifier;
        this.log_("Unlisten called for " + i + " " + s),
        N(t._queryParams.isDefault() || !t._queryParams.loadsAllData(), "unlisten() called for non-default but complete query"),
        this.removeListen_(i, s) && this.connected_ && this.sendUnlisten_(i, s, t._queryObject, e)
    }
    sendUnlisten_(t, e, i, s) {
        this.log_("Unlisten on " + t + " for " + e);
        const r = {
            p: t
        }
          , a = "n";
        s && (r.q = i,
        r.t = s),
        this.sendRequest(a, r)
    }
    onDisconnectPut(t, e, i) {
        this.initConnection_(),
        this.connected_ ? this.sendOnDisconnect_("o", t, e, i) : this.onDisconnectRequestQueue_.push({
            pathString: t,
            action: "o",
            data: e,
            onComplete: i
        })
    }
    onDisconnectMerge(t, e, i) {
        this.initConnection_(),
        this.connected_ ? this.sendOnDisconnect_("om", t, e, i) : this.onDisconnectRequestQueue_.push({
            pathString: t,
            action: "om",
            data: e,
            onComplete: i
        })
    }
    onDisconnectCancel(t, e) {
        this.initConnection_(),
        this.connected_ ? this.sendOnDisconnect_("oc", t, null, e) : this.onDisconnectRequestQueue_.push({
            pathString: t,
            action: "oc",
            data: null,
            onComplete: e
        })
    }
    sendOnDisconnect_(t, e, i, s) {
        const r = {
            p: e,
            d: i
        };
        this.log_("onDisconnect " + t, r),
        this.sendRequest(t, r, a => {
            s && setTimeout( () => {
                s(a.s, a.d)
            }
            , Math.floor(0))
        }
        )
    }
    put(t, e, i, s) {
        this.putInternal("p", t, e, i, s)
    }
    merge(t, e, i, s) {
        this.putInternal("m", t, e, i, s)
    }
    putInternal(t, e, i, s, r) {
        this.initConnection_();
        const a = {
            p: e,
            d: i
        };
        r !== void 0 && (a.h = r),
        this.outstandingPuts_.push({
            action: t,
            request: a,
            onComplete: s
        }),
        this.outstandingPutCount_++;
        const l = this.outstandingPuts_.length - 1;
        this.connected_ ? this.sendPut_(l) : this.log_("Buffering put: " + e)
    }
    sendPut_(t) {
        const e = this.outstandingPuts_[t].action
          , i = this.outstandingPuts_[t].request
          , s = this.outstandingPuts_[t].onComplete;
        this.outstandingPuts_[t].queued = this.connected_,
        this.sendRequest(e, i, r => {
            this.log_(e + " response", r),
            delete this.outstandingPuts_[t],
            this.outstandingPutCount_--,
            this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = []),
            s && s(r.s, r.d)
        }
        )
    }
    reportStats(t) {
        if (this.connected_) {
            const e = {
                c: t
            };
            this.log_("reportStats", e),
            this.sendRequest("s", e, i => {
                if (i.s !== "ok") {
                    const r = i.d;
                    this.log_("reportStats", "Error sending stats: " + r)
                }
            }
            )
        }
    }
    onDataMessage_(t) {
        if ("r"in t) {
            this.log_("from server: " + ft(t));
            const e = t.r
              , i = this.requestCBHash_[e];
            i && (delete this.requestCBHash_[e],
            i(t.b))
        } else {
            if ("error"in t)
                throw "A server-side error has occurred: " + t.error;
            "a"in t && this.onDataPush_(t.a, t.b)
        }
    }
    onDataPush_(t, e) {
        this.log_("handleServerMessage", t, e),
        t === "d" ? this.onDataUpdate_(e.p, e.d, !1, e.t) : t === "m" ? this.onDataUpdate_(e.p, e.d, !0, e.t) : t === "c" ? this.onListenRevoked_(e.p, e.q) : t === "ac" ? this.onAuthRevoked_(e.s, e.d) : t === "apc" ? this.onAppCheckRevoked_(e.s, e.d) : t === "sd" ? this.onSecurityDebugPacket_(e) : zr("Unrecognized action received from server: " + ft(t) + `
Are you using the latest client?`)
    }
    onReady_(t, e) {
        this.log_("connection ready"),
        this.connected_ = !0,
        this.lastConnectionEstablishedTime_ = new Date().getTime(),
        this.handleTimestamp_(t),
        this.lastSessionId = e,
        this.firstConnection_ && this.sendConnectStats_(),
        this.restoreState_(),
        this.firstConnection_ = !1,
        this.onConnectStatus_(!0)
    }
    scheduleConnect_(t) {
        N(!this.realtime_, "Scheduling a connect when we're already connected/ing?"),
        this.establishConnectionTimer_ && clearTimeout(this.establishConnectionTimer_),
        this.establishConnectionTimer_ = setTimeout( () => {
            this.establishConnectionTimer_ = null,
            this.establishConnection_()
        }
        , Math.floor(t))
    }
    initConnection_() {
        !this.realtime_ && this.firstConnection_ && this.scheduleConnect_(0)
    }
    onVisible_(t) {
        t && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_ && (this.log_("Window became visible.  Reducing delay."),
        this.reconnectDelay_ = Gn,
        this.realtime_ || this.scheduleConnect_(0)),
        this.visible_ = t
    }
    onOnline_(t) {
        t ? (this.log_("Browser went online."),
        this.reconnectDelay_ = Gn,
        this.realtime_ || this.scheduleConnect_(0)) : (this.log_("Browser went offline.  Killing connection."),
        this.realtime_ && this.realtime_.close())
    }
    onRealtimeDisconnect_() {
        if (this.log_("data client disconnected"),
        this.connected_ = !1,
        this.realtime_ = null,
        this.cancelSentTransactions_(),
        this.requestCBHash_ = {},
        this.shouldReconnect_()) {
            this.visible_ ? this.lastConnectionEstablishedTime_ && (new Date().getTime() - this.lastConnectionEstablishedTime_ > ig && (this.reconnectDelay_ = Gn),
            this.lastConnectionEstablishedTime_ = null) : (this.log_("Window isn't visible.  Delaying reconnect."),
            this.reconnectDelay_ = this.maxReconnectDelay_,
            this.lastConnectionAttemptTime_ = new Date().getTime());
            const t = new Date().getTime() - this.lastConnectionAttemptTime_;
            let e = Math.max(0, this.reconnectDelay_ - t);
            e = Math.random() * e,
            this.log_("Trying to reconnect in " + e + "ms"),
            this.scheduleConnect_(e),
            this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * ng)
        }
        this.onConnectStatus_(!1)
    }
    async establishConnection_() {
        if (this.shouldReconnect_()) {
            this.log_("Making a connection attempt"),
            this.lastConnectionAttemptTime_ = new Date().getTime(),
            this.lastConnectionEstablishedTime_ = null;
            const t = this.onDataMessage_.bind(this)
              , e = this.onReady_.bind(this)
              , i = this.onRealtimeDisconnect_.bind(this)
              , s = this.id + ":" + ee.nextConnectionId_++
              , r = this.lastSessionId;
            let a = !1
              , l = null;
            const h = function() {
                l ? l.close() : (a = !0,
                i())
            }
              , d = function(_) {
                N(l, "sendRequest call when we're not connected not allowed."),
                l.sendRequest(_)
            };
            this.realtime_ = {
                close: h,
                sendRequest: d
            };
            const f = this.forceTokenRefresh_;
            this.forceTokenRefresh_ = !1;
            try {
                const [_,m] = await Promise.all([this.authTokenProvider_.getToken(f), this.appCheckTokenProvider_.getToken(f)]);
                a ? Nt("getToken() completed but was canceled") : (Nt("getToken() completed. Creating connection."),
                this.authToken_ = _ && _.accessToken,
                this.appCheckToken_ = m && m.token,
                l = new Y_(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,t,e,i,A => {
                    Ut(A + " (" + this.repoInfo_.toString() + ")"),
                    this.interrupt(sg)
                }
                ,r))
            } catch (_) {
                this.log_("Failed to get token: " + _),
                a || (this.repoInfo_.nodeAdmin && Ut(_),
                h())
            }
        }
    }
    interrupt(t) {
        Nt("Interrupting connection for reason: " + t),
        this.interruptReasons_[t] = !0,
        this.realtime_ ? this.realtime_.close() : (this.establishConnectionTimer_ && (clearTimeout(this.establishConnectionTimer_),
        this.establishConnectionTimer_ = null),
        this.connected_ && this.onRealtimeDisconnect_())
    }
    resume(t) {
        Nt("Resuming connection for reason: " + t),
        delete this.interruptReasons_[t],
        Pl(this.interruptReasons_) && (this.reconnectDelay_ = Gn,
        this.realtime_ || this.scheduleConnect_(0))
    }
    handleTimestamp_(t) {
        const e = t - new Date().getTime();
        this.onServerInfoUpdate_({
            serverTimeOffset: e
        })
    }
    cancelSentTransactions_() {
        for (let t = 0; t < this.outstandingPuts_.length; t++) {
            const e = this.outstandingPuts_[t];
            e && "h"in e.request && e.queued && (e.onComplete && e.onComplete("disconnect"),
            delete this.outstandingPuts_[t],
            this.outstandingPutCount_--)
        }
        this.outstandingPutCount_ === 0 && (this.outstandingPuts_ = [])
    }
    onListenRevoked_(t, e) {
        let i;
        e ? i = e.map(r => Ao(r)).join("$") : i = "default";
        const s = this.removeListen_(t, i);
        s && s.onComplete && s.onComplete("permission_denied")
    }
    removeListen_(t, e) {
        const i = new Z(t).toString();
        let s;
        if (this.listens.has(i)) {
            const r = this.listens.get(i);
            s = r.get(e),
            r.delete(e),
            r.size === 0 && this.listens.delete(i)
        } else
            s = void 0;
        return s
    }
    onAuthRevoked_(t, e) {
        Nt("Auth token revoked: " + t + "/" + e),
        this.authToken_ = null,
        this.forceTokenRefresh_ = !0,
        this.realtime_.close(),
        (t === "invalid_token" || t === "permission_denied") && (this.invalidAuthTokenCount_++,
        this.invalidAuthTokenCount_ >= Zl && (this.reconnectDelay_ = Jl,
        this.authTokenProvider_.notifyForInvalidToken()))
    }
    onAppCheckRevoked_(t, e) {
        Nt("App check token revoked: " + t + "/" + e),
        this.appCheckToken_ = null,
        this.forceTokenRefresh_ = !0,
        (t === "invalid_token" || t === "permission_denied") && (this.invalidAppCheckTokenCount_++,
        this.invalidAppCheckTokenCount_ >= Zl && this.appCheckTokenProvider_.notifyForInvalidToken())
    }
    onSecurityDebugPacket_(t) {
        this.securityDebugCallback_ ? this.securityDebugCallback_(t) : "msg"in t && console.log("FIREBASE: " + t.msg.replace(`
`, `
FIREBASE: `))
    }
    restoreState_() {
        this.tryAuth(),
        this.tryAppCheck();
        for (const t of this.listens.values())
            for (const e of t.values())
                this.sendListen_(e);
        for (let t = 0; t < this.outstandingPuts_.length; t++)
            this.outstandingPuts_[t] && this.sendPut_(t);
        for (; this.onDisconnectRequestQueue_.length; ) {
            const t = this.onDisconnectRequestQueue_.shift();
            this.sendOnDisconnect_(t.action, t.pathString, t.data, t.onComplete)
        }
        for (let t = 0; t < this.outstandingGets_.length; t++)
            this.outstandingGets_[t] && this.sendGet_(t)
    }
    sendConnectStats_() {
        const t = {};
        let e = "js";
        t["sdk." + e + "." + wh.replace(/\./g, "-")] = 1,
        uh() ? t["framework.cordova"] = 1 : Uf() && (t["framework.reactnative"] = 1),
        this.reportStats(t)
    }
    shouldReconnect_() {
        const t = ys.getInstance().currentlyOnline();
        return Pl(this.interruptReasons_) && t
    }
}
ee.nextPersistentConnectionId_ = 0;
ee.nextConnectionId_ = 0;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class B {
    constructor(t, e) {
        this.name = t,
        this.node = e
    }
    static Wrap(t, e) {
        return new B(t,e)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Os {
    getCompare() {
        return this.compare.bind(this)
    }
    indexedValueChanged(t, e) {
        const i = new B(cn,t)
          , s = new B(cn,e);
        return this.compare(i, s) !== 0
    }
    minPost() {
        return B.MIN
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let es;
class Jh extends Os {
    static get __EMPTY_NODE() {
        return es
    }
    static set __EMPTY_NODE(t) {
        es = t
    }
    compare(t, e) {
        return Tn(t.name, e.name)
    }
    isDefinedOn(t) {
        throw vn("KeyIndex.isDefinedOn not expected to be called.")
    }
    indexedValueChanged(t, e) {
        return !1
    }
    minPost() {
        return B.MIN
    }
    maxPost() {
        return new B(Fe,es)
    }
    makePost(t, e) {
        return N(typeof t == "string", "KeyIndex indexValue must always be a string."),
        new B(t,es)
    }
    toString() {
        return ".key"
    }
}
const nn = new Jh;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let ns = class {
    constructor(t, e, i, s, r=null) {
        this.isReverse_ = s,
        this.resultGenerator_ = r,
        this.nodeStack_ = [];
        let a = 1;
        for (; !t.isEmpty(); )
            if (t = t,
            a = e ? i(t.key, e) : 1,
            s && (a *= -1),
            a < 0)
                this.isReverse_ ? t = t.left : t = t.right;
            else if (a === 0) {
                this.nodeStack_.push(t);
                break
            } else
                this.nodeStack_.push(t),
                this.isReverse_ ? t = t.right : t = t.left
    }
    getNext() {
        if (this.nodeStack_.length === 0)
            return null;
        let t = this.nodeStack_.pop(), e;
        if (this.resultGenerator_ ? e = this.resultGenerator_(t.key, t.value) : e = {
            key: t.key,
            value: t.value
        },
        this.isReverse_)
            for (t = t.left; !t.isEmpty(); )
                this.nodeStack_.push(t),
                t = t.right;
        else
            for (t = t.right; !t.isEmpty(); )
                this.nodeStack_.push(t),
                t = t.left;
        return e
    }
    hasNext() {
        return this.nodeStack_.length > 0
    }
    peek() {
        if (this.nodeStack_.length === 0)
            return null;
        const t = this.nodeStack_[this.nodeStack_.length - 1];
        return this.resultGenerator_ ? this.resultGenerator_(t.key, t.value) : {
            key: t.key,
            value: t.value
        }
    }
}
  , Ft = class Yn {
    constructor(t, e, i, s, r) {
        this.key = t,
        this.value = e,
        this.color = i ?? Yn.RED,
        this.left = s ?? Ht.EMPTY_NODE,
        this.right = r ?? Ht.EMPTY_NODE
    }
    copy(t, e, i, s, r) {
        return new Yn(t ?? this.key,e ?? this.value,i ?? this.color,s ?? this.left,r ?? this.right)
    }
    count() {
        return this.left.count() + 1 + this.right.count()
    }
    isEmpty() {
        return !1
    }
    inorderTraversal(t) {
        return this.left.inorderTraversal(t) || !!t(this.key, this.value) || this.right.inorderTraversal(t)
    }
    reverseTraversal(t) {
        return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t)
    }
    min_() {
        return this.left.isEmpty() ? this : this.left.min_()
    }
    minKey() {
        return this.min_().key
    }
    maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey()
    }
    insert(t, e, i) {
        let s = this;
        const r = i(t, s.key);
        return r < 0 ? s = s.copy(null, null, null, s.left.insert(t, e, i), null) : r === 0 ? s = s.copy(null, e, null, null, null) : s = s.copy(null, null, null, null, s.right.insert(t, e, i)),
        s.fixUp_()
    }
    removeMin_() {
        if (this.left.isEmpty())
            return Ht.EMPTY_NODE;
        let t = this;
        return !t.left.isRed_() && !t.left.left.isRed_() && (t = t.moveRedLeft_()),
        t = t.copy(null, null, null, t.left.removeMin_(), null),
        t.fixUp_()
    }
    remove(t, e) {
        let i, s;
        if (i = this,
        e(t, i.key) < 0)
            !i.left.isEmpty() && !i.left.isRed_() && !i.left.left.isRed_() && (i = i.moveRedLeft_()),
            i = i.copy(null, null, null, i.left.remove(t, e), null);
        else {
            if (i.left.isRed_() && (i = i.rotateRight_()),
            !i.right.isEmpty() && !i.right.isRed_() && !i.right.left.isRed_() && (i = i.moveRedRight_()),
            e(t, i.key) === 0) {
                if (i.right.isEmpty())
                    return Ht.EMPTY_NODE;
                s = i.right.min_(),
                i = i.copy(s.key, s.value, null, null, i.right.removeMin_())
            }
            i = i.copy(null, null, null, null, i.right.remove(t, e))
        }
        return i.fixUp_()
    }
    isRed_() {
        return this.color
    }
    fixUp_() {
        let t = this;
        return t.right.isRed_() && !t.left.isRed_() && (t = t.rotateLeft_()),
        t.left.isRed_() && t.left.left.isRed_() && (t = t.rotateRight_()),
        t.left.isRed_() && t.right.isRed_() && (t = t.colorFlip_()),
        t
    }
    moveRedLeft_() {
        let t = this.colorFlip_();
        return t.right.left.isRed_() && (t = t.copy(null, null, null, null, t.right.rotateRight_()),
        t = t.rotateLeft_(),
        t = t.colorFlip_()),
        t
    }
    moveRedRight_() {
        let t = this.colorFlip_();
        return t.left.left.isRed_() && (t = t.rotateRight_(),
        t = t.colorFlip_()),
        t
    }
    rotateLeft_() {
        const t = this.copy(null, null, Yn.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, t, null)
    }
    rotateRight_() {
        const t = this.copy(null, null, Yn.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, t)
    }
    colorFlip_() {
        const t = this.left.copy(null, null, !this.left.color, null, null)
          , e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e)
    }
    checkMaxDepth_() {
        const t = this.check_();
        return Math.pow(2, t) <= this.count() + 1
    }
    check_() {
        if (this.isRed_() && this.left.isRed_())
            throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
        if (this.right.isRed_())
            throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
        const t = this.left.check_();
        if (t !== this.right.check_())
            throw new Error("Black depths differ");
        return t + (this.isRed_() ? 0 : 1)
    }
}
;
Ft.RED = !0;
Ft.BLACK = !1;
class rg {
    copy(t, e, i, s, r) {
        return this
    }
    insert(t, e, i) {
        return new Ft(t,e,null)
    }
    remove(t, e) {
        return this
    }
    count() {
        return 0
    }
    isEmpty() {
        return !0
    }
    inorderTraversal(t) {
        return !1
    }
    reverseTraversal(t) {
        return !1
    }
    minKey() {
        return null
    }
    maxKey() {
        return null
    }
    check_() {
        return 0
    }
    isRed_() {
        return !1
    }
}
let Ht = class cs {
    constructor(t, e=cs.EMPTY_NODE) {
        this.comparator_ = t,
        this.root_ = e
    }
    insert(t, e) {
        return new cs(this.comparator_,this.root_.insert(t, e, this.comparator_).copy(null, null, Ft.BLACK, null, null))
    }
    remove(t) {
        return new cs(this.comparator_,this.root_.remove(t, this.comparator_).copy(null, null, Ft.BLACK, null, null))
    }
    get(t) {
        let e, i = this.root_;
        for (; !i.isEmpty(); ) {
            if (e = this.comparator_(t, i.key),
            e === 0)
                return i.value;
            e < 0 ? i = i.left : e > 0 && (i = i.right)
        }
        return null
    }
    getPredecessorKey(t) {
        let e, i = this.root_, s = null;
        for (; !i.isEmpty(); )
            if (e = this.comparator_(t, i.key),
            e === 0) {
                if (i.left.isEmpty())
                    return s ? s.key : null;
                for (i = i.left; !i.right.isEmpty(); )
                    i = i.right;
                return i.key
            } else
                e < 0 ? i = i.left : e > 0 && (s = i,
                i = i.right);
        throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")
    }
    isEmpty() {
        return this.root_.isEmpty()
    }
    count() {
        return this.root_.count()
    }
    minKey() {
        return this.root_.minKey()
    }
    maxKey() {
        return this.root_.maxKey()
    }
    inorderTraversal(t) {
        return this.root_.inorderTraversal(t)
    }
    reverseTraversal(t) {
        return this.root_.reverseTraversal(t)
    }
    getIterator(t) {
        return new ns(this.root_,null,this.comparator_,!1,t)
    }
    getIteratorFrom(t, e) {
        return new ns(this.root_,t,this.comparator_,!1,e)
    }
    getReverseIteratorFrom(t, e) {
        return new ns(this.root_,t,this.comparator_,!0,e)
    }
    getReverseIterator(t) {
        return new ns(this.root_,null,this.comparator_,!0,t)
    }
}
;
Ht.EMPTY_NODE = new rg;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function og(n, t) {
    return Tn(n.name, t.name)
}
function No(n, t) {
    return Tn(n, t)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Hr;
function ag(n) {
    Hr = n
}
const Zh = function(n) {
    return typeof n == "number" ? "number:" + Ph(n) : "string:" + n
}
  , tu = function(n) {
    if (n.isLeafNode()) {
        const t = n.val();
        N(typeof t == "string" || typeof t == "number" || typeof t == "object" && re(t, ".sv"), "Priority must be a string or number.")
    } else
        N(n === Hr || n.isEmpty(), "priority of unexpected type.");
    N(n === Hr || n.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.")
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let tc;
class _t {
    constructor(t, e=_t.__childrenNodeConstructor.EMPTY_NODE) {
        this.value_ = t,
        this.priorityNode_ = e,
        this.lazyHash_ = null,
        N(this.value_ !== void 0 && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value."),
        tu(this.priorityNode_)
    }
    static set __childrenNodeConstructor(t) {
        tc = t
    }
    static get __childrenNodeConstructor() {
        return tc
    }
    isLeafNode() {
        return !0
    }
    getPriority() {
        return this.priorityNode_
    }
    updatePriority(t) {
        return new _t(this.value_,t)
    }
    getImmediateChild(t) {
        return t === ".priority" ? this.priorityNode_ : _t.__childrenNodeConstructor.EMPTY_NODE
    }
    getChild(t) {
        return q(t) ? this : j(t) === ".priority" ? this.priorityNode_ : _t.__childrenNodeConstructor.EMPTY_NODE
    }
    hasChild() {
        return !1
    }
    getPredecessorChildName(t, e) {
        return null
    }
    updateImmediateChild(t, e) {
        return t === ".priority" ? this.updatePriority(e) : e.isEmpty() && t !== ".priority" ? this : _t.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t, e).updatePriority(this.priorityNode_)
    }
    updateChild(t, e) {
        const i = j(t);
        return i === null ? e : e.isEmpty() && i !== ".priority" ? this : (N(i !== ".priority" || ye(t) === 1, ".priority must be the last token in a path"),
        this.updateImmediateChild(i, _t.__childrenNodeConstructor.EMPTY_NODE.updateChild(et(t), e)))
    }
    isEmpty() {
        return !1
    }
    numChildren() {
        return 0
    }
    forEachChild(t, e) {
        return !1
    }
    val(t) {
        return t && !this.getPriority().isEmpty() ? {
            ".value": this.getValue(),
            ".priority": this.getPriority().val()
        } : this.getValue()
    }
    hash() {
        if (this.lazyHash_ === null) {
            let t = "";
            this.priorityNode_.isEmpty() || (t += "priority:" + Zh(this.priorityNode_.val()) + ":");
            const e = typeof this.value_;
            t += e + ":",
            e === "number" ? t += Ph(this.value_) : t += this.value_,
            this.lazyHash_ = Ah(t)
        }
        return this.lazyHash_
    }
    getValue() {
        return this.value_
    }
    compareTo(t) {
        return t === _t.__childrenNodeConstructor.EMPTY_NODE ? 1 : t instanceof _t.__childrenNodeConstructor ? -1 : (N(t.isLeafNode(), "Unknown node type"),
        this.compareToLeafNode_(t))
    }
    compareToLeafNode_(t) {
        const e = typeof t.value_
          , i = typeof this.value_
          , s = _t.VALUE_TYPE_ORDER.indexOf(e)
          , r = _t.VALUE_TYPE_ORDER.indexOf(i);
        return N(s >= 0, "Unknown leaf type: " + e),
        N(r >= 0, "Unknown leaf type: " + i),
        s === r ? i === "object" ? 0 : this.value_ < t.value_ ? -1 : this.value_ === t.value_ ? 0 : 1 : r - s
    }
    withIndex() {
        return this
    }
    isIndexed() {
        return !0
    }
    equals(t) {
        if (t === this)
            return !0;
        if (t.isLeafNode()) {
            const e = t;
            return this.value_ === e.value_ && this.priorityNode_.equals(e.priorityNode_)
        } else
            return !1
    }
}
_t.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let eu, nu;
function lg(n) {
    eu = n
}
function cg(n) {
    nu = n
}
class hg extends Os {
    compare(t, e) {
        const i = t.node.getPriority()
          , s = e.node.getPriority()
          , r = i.compareTo(s);
        return r === 0 ? Tn(t.name, e.name) : r
    }
    isDefinedOn(t) {
        return !t.getPriority().isEmpty()
    }
    indexedValueChanged(t, e) {
        return !t.getPriority().equals(e.getPriority())
    }
    minPost() {
        return B.MIN
    }
    maxPost() {
        return new B(Fe,new _t("[PRIORITY-POST]",nu))
    }
    makePost(t, e) {
        const i = eu(t);
        return new B(e,new _t("[PRIORITY-POST]",i))
    }
    toString() {
        return ".priority"
    }
}
const ot = new hg;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ug = Math.log(2);
class dg {
    constructor(t) {
        const e = r => parseInt(Math.log(r) / ug, 10)
          , i = r => parseInt(Array(r + 1).join("1"), 2);
        this.count = e(t + 1),
        this.current_ = this.count - 1;
        const s = i(this.count);
        this.bits_ = t + 1 & s
    }
    nextBitIsOne() {
        const t = !(this.bits_ & 1 << this.current_);
        return this.current_--,
        t
    }
}
const vs = function(n, t, e, i) {
    n.sort(t);
    const s = function(h, d) {
        const f = d - h;
        let _, m;
        if (f === 0)
            return null;
        if (f === 1)
            return _ = n[h],
            m = e ? e(_) : _,
            new Ft(m,_.node,Ft.BLACK,null,null);
        {
            const A = parseInt(f / 2, 10) + h
              , S = s(h, A)
              , x = s(A + 1, d);
            return _ = n[A],
            m = e ? e(_) : _,
            new Ft(m,_.node,Ft.BLACK,S,x)
        }
    }
      , r = function(h) {
        let d = null
          , f = null
          , _ = n.length;
        const m = function(S, x) {
            const k = _ - S
              , Y = _;
            _ -= S;
            const X = s(k + 1, Y)
              , tt = n[k]
              , lt = e ? e(tt) : tt;
            A(new Ft(lt,tt.node,x,null,X))
        }
          , A = function(S) {
            d ? (d.left = S,
            d = S) : (f = S,
            d = S)
        };
        for (let S = 0; S < h.count; ++S) {
            const x = h.nextBitIsOne()
              , k = Math.pow(2, h.count - (S + 1));
            x ? m(k, Ft.BLACK) : (m(k, Ft.BLACK),
            m(k, Ft.RED))
        }
        return f
    }
      , a = new dg(n.length)
      , l = r(a);
    return new Ht(i || t,l)
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let br;
const Qe = {};
class te {
    constructor(t, e) {
        this.indexes_ = t,
        this.indexSet_ = e
    }
    static get Default() {
        return N(Qe && ot, "ChildrenNode.ts has not been loaded"),
        br = br || new te({
            ".priority": Qe
        },{
            ".priority": ot
        }),
        br
    }
    get(t) {
        const e = an(this.indexes_, t);
        if (!e)
            throw new Error("No index defined for " + t);
        return e instanceof Ht ? e : null
    }
    hasIndex(t) {
        return re(this.indexSet_, t.toString())
    }
    addIndex(t, e) {
        N(t !== nn, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
        const i = [];
        let s = !1;
        const r = e.getIterator(B.Wrap);
        let a = r.getNext();
        for (; a; )
            s = s || t.isDefinedOn(a.node),
            i.push(a),
            a = r.getNext();
        let l;
        s ? l = vs(i, t.getCompare()) : l = Qe;
        const h = t.toString()
          , d = Object.assign({}, this.indexSet_);
        d[h] = t;
        const f = Object.assign({}, this.indexes_);
        return f[h] = l,
        new te(f,d)
    }
    addToIndexes(t, e) {
        const i = _s(this.indexes_, (s, r) => {
            const a = an(this.indexSet_, r);
            if (N(a, "Missing index implementation for " + r),
            s === Qe)
                if (a.isDefinedOn(t.node)) {
                    const l = []
                      , h = e.getIterator(B.Wrap);
                    let d = h.getNext();
                    for (; d; )
                        d.name !== t.name && l.push(d),
                        d = h.getNext();
                    return l.push(t),
                    vs(l, a.getCompare())
                } else
                    return Qe;
            else {
                const l = e.get(t.name);
                let h = s;
                return l && (h = h.remove(new B(t.name,l))),
                h.insert(t, t.node)
            }
        }
        );
        return new te(i,this.indexSet_)
    }
    removeFromIndexes(t, e) {
        const i = _s(this.indexes_, s => {
            if (s === Qe)
                return s;
            {
                const r = e.get(t.name);
                return r ? s.remove(new B(t.name,r)) : s
            }
        }
        );
        return new te(i,this.indexSet_)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Hn;
class L {
    constructor(t, e, i) {
        this.children_ = t,
        this.priorityNode_ = e,
        this.indexMap_ = i,
        this.lazyHash_ = null,
        this.priorityNode_ && tu(this.priorityNode_),
        this.children_.isEmpty() && N(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority")
    }
    static get EMPTY_NODE() {
        return Hn || (Hn = new L(new Ht(No),null,te.Default))
    }
    isLeafNode() {
        return !1
    }
    getPriority() {
        return this.priorityNode_ || Hn
    }
    updatePriority(t) {
        return this.children_.isEmpty() ? this : new L(this.children_,t,this.indexMap_)
    }
    getImmediateChild(t) {
        if (t === ".priority")
            return this.getPriority();
        {
            const e = this.children_.get(t);
            return e === null ? Hn : e
        }
    }
    getChild(t) {
        const e = j(t);
        return e === null ? this : this.getImmediateChild(e).getChild(et(t))
    }
    hasChild(t) {
        return this.children_.get(t) !== null
    }
    updateImmediateChild(t, e) {
        if (N(e, "We should always be passing snapshot nodes"),
        t === ".priority")
            return this.updatePriority(e);
        {
            const i = new B(t,e);
            let s, r;
            e.isEmpty() ? (s = this.children_.remove(t),
            r = this.indexMap_.removeFromIndexes(i, this.children_)) : (s = this.children_.insert(t, e),
            r = this.indexMap_.addToIndexes(i, this.children_));
            const a = s.isEmpty() ? Hn : this.priorityNode_;
            return new L(s,a,r)
        }
    }
    updateChild(t, e) {
        const i = j(t);
        if (i === null)
            return e;
        {
            N(j(t) !== ".priority" || ye(t) === 1, ".priority must be the last token in a path");
            const s = this.getImmediateChild(i).updateChild(et(t), e);
            return this.updateImmediateChild(i, s)
        }
    }
    isEmpty() {
        return this.children_.isEmpty()
    }
    numChildren() {
        return this.children_.count()
    }
    val(t) {
        if (this.isEmpty())
            return null;
        const e = {};
        let i = 0
          , s = 0
          , r = !0;
        if (this.forEachChild(ot, (a, l) => {
            e[a] = l.val(t),
            i++,
            r && L.INTEGER_REGEXP_.test(a) ? s = Math.max(s, Number(a)) : r = !1
        }
        ),
        !t && r && s < 2 * i) {
            const a = [];
            for (const l in e)
                a[l] = e[l];
            return a
        } else
            return t && !this.getPriority().isEmpty() && (e[".priority"] = this.getPriority().val()),
            e
    }
    hash() {
        if (this.lazyHash_ === null) {
            let t = "";
            this.getPriority().isEmpty() || (t += "priority:" + Zh(this.getPriority().val()) + ":"),
            this.forEachChild(ot, (e, i) => {
                const s = i.hash();
                s !== "" && (t += ":" + e + ":" + s)
            }
            ),
            this.lazyHash_ = t === "" ? "" : Ah(t)
        }
        return this.lazyHash_
    }
    getPredecessorChildName(t, e, i) {
        const s = this.resolveIndex_(i);
        if (s) {
            const r = s.getPredecessorKey(new B(t,e));
            return r ? r.name : null
        } else
            return this.children_.getPredecessorKey(t)
    }
    getFirstChildName(t) {
        const e = this.resolveIndex_(t);
        if (e) {
            const i = e.minKey();
            return i && i.name
        } else
            return this.children_.minKey()
    }
    getFirstChild(t) {
        const e = this.getFirstChildName(t);
        return e ? new B(e,this.children_.get(e)) : null
    }
    getLastChildName(t) {
        const e = this.resolveIndex_(t);
        if (e) {
            const i = e.maxKey();
            return i && i.name
        } else
            return this.children_.maxKey()
    }
    getLastChild(t) {
        const e = this.getLastChildName(t);
        return e ? new B(e,this.children_.get(e)) : null
    }
    forEachChild(t, e) {
        const i = this.resolveIndex_(t);
        return i ? i.inorderTraversal(s => e(s.name, s.node)) : this.children_.inorderTraversal(e)
    }
    getIterator(t) {
        return this.getIteratorFrom(t.minPost(), t)
    }
    getIteratorFrom(t, e) {
        const i = this.resolveIndex_(e);
        if (i)
            return i.getIteratorFrom(t, s => s);
        {
            const s = this.children_.getIteratorFrom(t.name, B.Wrap);
            let r = s.peek();
            for (; r != null && e.compare(r, t) < 0; )
                s.getNext(),
                r = s.peek();
            return s
        }
    }
    getReverseIterator(t) {
        return this.getReverseIteratorFrom(t.maxPost(), t)
    }
    getReverseIteratorFrom(t, e) {
        const i = this.resolveIndex_(e);
        if (i)
            return i.getReverseIteratorFrom(t, s => s);
        {
            const s = this.children_.getReverseIteratorFrom(t.name, B.Wrap);
            let r = s.peek();
            for (; r != null && e.compare(r, t) > 0; )
                s.getNext(),
                r = s.peek();
            return s
        }
    }
    compareTo(t) {
        return this.isEmpty() ? t.isEmpty() ? 0 : -1 : t.isLeafNode() || t.isEmpty() ? 1 : t === Si ? -1 : 0
    }
    withIndex(t) {
        if (t === nn || this.indexMap_.hasIndex(t))
            return this;
        {
            const e = this.indexMap_.addIndex(t, this.children_);
            return new L(this.children_,this.priorityNode_,e)
        }
    }
    isIndexed(t) {
        return t === nn || this.indexMap_.hasIndex(t)
    }
    equals(t) {
        if (t === this)
            return !0;
        if (t.isLeafNode())
            return !1;
        {
            const e = t;
            if (this.getPriority().equals(e.getPriority()))
                if (this.children_.count() === e.children_.count()) {
                    const i = this.getIterator(ot)
                      , s = e.getIterator(ot);
                    let r = i.getNext()
                      , a = s.getNext();
                    for (; r && a; ) {
                        if (r.name !== a.name || !r.node.equals(a.node))
                            return !1;
                        r = i.getNext(),
                        a = s.getNext()
                    }
                    return r === null && a === null
                } else
                    return !1;
            else
                return !1
        }
    }
    resolveIndex_(t) {
        return t === nn ? null : this.indexMap_.get(t.toString())
    }
}
L.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
class fg extends L {
    constructor() {
        super(new Ht(No), L.EMPTY_NODE, te.Default)
    }
    compareTo(t) {
        return t === this ? 0 : 1
    }
    equals(t) {
        return t === this
    }
    getPriority() {
        return this
    }
    getImmediateChild(t) {
        return L.EMPTY_NODE
    }
    isEmpty() {
        return !1
    }
}
const Si = new fg;
Object.defineProperties(B, {
    MIN: {
        value: new B(cn,L.EMPTY_NODE)
    },
    MAX: {
        value: new B(Fe,Si)
    }
});
Jh.__EMPTY_NODE = L.EMPTY_NODE;
_t.__childrenNodeConstructor = L;
ag(Si);
cg(Si);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pg = !0;
function Tt(n, t=null) {
    if (n === null)
        return L.EMPTY_NODE;
    if (typeof n == "object" && ".priority"in n && (t = n[".priority"]),
    N(t === null || typeof t == "string" || typeof t == "number" || typeof t == "object" && ".sv"in t, "Invalid priority type found: " + typeof t),
    typeof n == "object" && ".value"in n && n[".value"] !== null && (n = n[".value"]),
    typeof n != "object" || ".sv"in n) {
        const e = n;
        return new _t(e,Tt(t))
    }
    if (!(n instanceof Array) && pg) {
        const e = [];
        let i = !1;
        if (Mt(n, (a, l) => {
            if (a.substring(0, 1) !== ".") {
                const h = Tt(l);
                h.isEmpty() || (i = i || !h.getPriority().isEmpty(),
                e.push(new B(a,h)))
            }
        }
        ),
        e.length === 0)
            return L.EMPTY_NODE;
        const r = vs(e, og, a => a.name, No);
        if (i) {
            const a = vs(e, ot.getCompare());
            return new L(r,Tt(t),new te({
                ".priority": a
            },{
                ".priority": ot
            }))
        } else
            return new L(r,Tt(t),te.Default)
    } else {
        let e = L.EMPTY_NODE;
        return Mt(n, (i, s) => {
            if (re(n, i) && i.substring(0, 1) !== ".") {
                const r = Tt(s);
                (r.isLeafNode() || !r.isEmpty()) && (e = e.updateImmediateChild(i, r))
            }
        }
        ),
        e.updatePriority(Tt(t))
    }
}
lg(Tt);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _g extends Os {
    constructor(t) {
        super(),
        this.indexPath_ = t,
        N(!q(t) && j(t) !== ".priority", "Can't create PathIndex with empty path or .priority key")
    }
    extractChild(t) {
        return t.getChild(this.indexPath_)
    }
    isDefinedOn(t) {
        return !t.getChild(this.indexPath_).isEmpty()
    }
    compare(t, e) {
        const i = this.extractChild(t.node)
          , s = this.extractChild(e.node)
          , r = i.compareTo(s);
        return r === 0 ? Tn(t.name, e.name) : r
    }
    makePost(t, e) {
        const i = Tt(t)
          , s = L.EMPTY_NODE.updateChild(this.indexPath_, i);
        return new B(e,s)
    }
    maxPost() {
        const t = L.EMPTY_NODE.updateChild(this.indexPath_, Si);
        return new B(Fe,t)
    }
    toString() {
        return Kh(this.indexPath_, 0).join("/")
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gg extends Os {
    compare(t, e) {
        const i = t.node.compareTo(e.node);
        return i === 0 ? Tn(t.name, e.name) : i
    }
    isDefinedOn(t) {
        return !0
    }
    indexedValueChanged(t, e) {
        return !t.equals(e)
    }
    minPost() {
        return B.MIN
    }
    maxPost() {
        return B.MAX
    }
    makePost(t, e) {
        const i = Tt(t);
        return new B(e,i)
    }
    toString() {
        return ".value"
    }
}
const mg = new gg;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function iu(n) {
    return {
        type: "value",
        snapshotNode: n
    }
}
function hn(n, t) {
    return {
        type: "child_added",
        snapshotNode: t,
        childName: n
    }
}
function fi(n, t) {
    return {
        type: "child_removed",
        snapshotNode: t,
        childName: n
    }
}
function pi(n, t, e) {
    return {
        type: "child_changed",
        snapshotNode: t,
        childName: n,
        oldSnap: e
    }
}
function yg(n, t) {
    return {
        type: "child_moved",
        snapshotNode: t,
        childName: n
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Do {
    constructor(t) {
        this.index_ = t
    }
    updateChild(t, e, i, s, r, a) {
        N(t.isIndexed(this.index_), "A node must be indexed if only a child is updated");
        const l = t.getImmediateChild(e);
        return l.getChild(s).equals(i.getChild(s)) && l.isEmpty() === i.isEmpty() || (a != null && (i.isEmpty() ? t.hasChild(e) ? a.trackChildChange(fi(e, l)) : N(t.isLeafNode(), "A child remove without an old child only makes sense on a leaf node") : l.isEmpty() ? a.trackChildChange(hn(e, i)) : a.trackChildChange(pi(e, i, l))),
        t.isLeafNode() && i.isEmpty()) ? t : t.updateImmediateChild(e, i).withIndex(this.index_)
    }
    updateFullNode(t, e, i) {
        return i != null && (t.isLeafNode() || t.forEachChild(ot, (s, r) => {
            e.hasChild(s) || i.trackChildChange(fi(s, r))
        }
        ),
        e.isLeafNode() || e.forEachChild(ot, (s, r) => {
            if (t.hasChild(s)) {
                const a = t.getImmediateChild(s);
                a.equals(r) || i.trackChildChange(pi(s, r, a))
            } else
                i.trackChildChange(hn(s, r))
        }
        )),
        e.withIndex(this.index_)
    }
    updatePriority(t, e) {
        return t.isEmpty() ? L.EMPTY_NODE : t.updatePriority(e)
    }
    filtersNodes() {
        return !1
    }
    getIndexedFilter() {
        return this
    }
    getIndex() {
        return this.index_
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _i {
    constructor(t) {
        this.indexedFilter_ = new Do(t.getIndex()),
        this.index_ = t.getIndex(),
        this.startPost_ = _i.getStartPost_(t),
        this.endPost_ = _i.getEndPost_(t),
        this.startIsInclusive_ = !t.startAfterSet_,
        this.endIsInclusive_ = !t.endBeforeSet_
    }
    getStartPost() {
        return this.startPost_
    }
    getEndPost() {
        return this.endPost_
    }
    matches(t) {
        const e = this.startIsInclusive_ ? this.index_.compare(this.getStartPost(), t) <= 0 : this.index_.compare(this.getStartPost(), t) < 0
          , i = this.endIsInclusive_ ? this.index_.compare(t, this.getEndPost()) <= 0 : this.index_.compare(t, this.getEndPost()) < 0;
        return e && i
    }
    updateChild(t, e, i, s, r, a) {
        return this.matches(new B(e,i)) || (i = L.EMPTY_NODE),
        this.indexedFilter_.updateChild(t, e, i, s, r, a)
    }
    updateFullNode(t, e, i) {
        e.isLeafNode() && (e = L.EMPTY_NODE);
        let s = e.withIndex(this.index_);
        s = s.updatePriority(L.EMPTY_NODE);
        const r = this;
        return e.forEachChild(ot, (a, l) => {
            r.matches(new B(a,l)) || (s = s.updateImmediateChild(a, L.EMPTY_NODE))
        }
        ),
        this.indexedFilter_.updateFullNode(t, s, i)
    }
    updatePriority(t, e) {
        return t
    }
    filtersNodes() {
        return !0
    }
    getIndexedFilter() {
        return this.indexedFilter_
    }
    getIndex() {
        return this.index_
    }
    static getStartPost_(t) {
        if (t.hasStart()) {
            const e = t.getIndexStartName();
            return t.getIndex().makePost(t.getIndexStartValue(), e)
        } else
            return t.getIndex().minPost()
    }
    static getEndPost_(t) {
        if (t.hasEnd()) {
            const e = t.getIndexEndName();
            return t.getIndex().makePost(t.getIndexEndValue(), e)
        } else
            return t.getIndex().maxPost()
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vg {
    constructor(t) {
        this.withinDirectionalStart = e => this.reverse_ ? this.withinEndPost(e) : this.withinStartPost(e),
        this.withinDirectionalEnd = e => this.reverse_ ? this.withinStartPost(e) : this.withinEndPost(e),
        this.withinStartPost = e => {
            const i = this.index_.compare(this.rangedFilter_.getStartPost(), e);
            return this.startIsInclusive_ ? i <= 0 : i < 0
        }
        ,
        this.withinEndPost = e => {
            const i = this.index_.compare(e, this.rangedFilter_.getEndPost());
            return this.endIsInclusive_ ? i <= 0 : i < 0
        }
        ,
        this.rangedFilter_ = new _i(t),
        this.index_ = t.getIndex(),
        this.limit_ = t.getLimit(),
        this.reverse_ = !t.isViewFromLeft(),
        this.startIsInclusive_ = !t.startAfterSet_,
        this.endIsInclusive_ = !t.endBeforeSet_
    }
    updateChild(t, e, i, s, r, a) {
        return this.rangedFilter_.matches(new B(e,i)) || (i = L.EMPTY_NODE),
        t.getImmediateChild(e).equals(i) ? t : t.numChildren() < this.limit_ ? this.rangedFilter_.getIndexedFilter().updateChild(t, e, i, s, r, a) : this.fullLimitUpdateChild_(t, e, i, r, a)
    }
    updateFullNode(t, e, i) {
        let s;
        if (e.isLeafNode() || e.isEmpty())
            s = L.EMPTY_NODE.withIndex(this.index_);
        else if (this.limit_ * 2 < e.numChildren() && e.isIndexed(this.index_)) {
            s = L.EMPTY_NODE.withIndex(this.index_);
            let r;
            this.reverse_ ? r = e.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_) : r = e.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
            let a = 0;
            for (; r.hasNext() && a < this.limit_; ) {
                const l = r.getNext();
                if (this.withinDirectionalStart(l))
                    if (this.withinDirectionalEnd(l))
                        s = s.updateImmediateChild(l.name, l.node),
                        a++;
                    else
                        break;
                else
                    continue
            }
        } else {
            s = e.withIndex(this.index_),
            s = s.updatePriority(L.EMPTY_NODE);
            let r;
            this.reverse_ ? r = s.getReverseIterator(this.index_) : r = s.getIterator(this.index_);
            let a = 0;
            for (; r.hasNext(); ) {
                const l = r.getNext();
                a < this.limit_ && this.withinDirectionalStart(l) && this.withinDirectionalEnd(l) ? a++ : s = s.updateImmediateChild(l.name, L.EMPTY_NODE)
            }
        }
        return this.rangedFilter_.getIndexedFilter().updateFullNode(t, s, i)
    }
    updatePriority(t, e) {
        return t
    }
    filtersNodes() {
        return !0
    }
    getIndexedFilter() {
        return this.rangedFilter_.getIndexedFilter()
    }
    getIndex() {
        return this.index_
    }
    fullLimitUpdateChild_(t, e, i, s, r) {
        let a;
        if (this.reverse_) {
            const _ = this.index_.getCompare();
            a = (m, A) => _(A, m)
        } else
            a = this.index_.getCompare();
        const l = t;
        N(l.numChildren() === this.limit_, "");
        const h = new B(e,i)
          , d = this.reverse_ ? l.getFirstChild(this.index_) : l.getLastChild(this.index_)
          , f = this.rangedFilter_.matches(h);
        if (l.hasChild(e)) {
            const _ = l.getImmediateChild(e);
            let m = s.getChildAfterChild(this.index_, d, this.reverse_);
            for (; m != null && (m.name === e || l.hasChild(m.name)); )
                m = s.getChildAfterChild(this.index_, m, this.reverse_);
            const A = m == null ? 1 : a(m, h);
            if (f && !i.isEmpty() && A >= 0)
                return r != null && r.trackChildChange(pi(e, i, _)),
                l.updateImmediateChild(e, i);
            {
                r != null && r.trackChildChange(fi(e, _));
                const x = l.updateImmediateChild(e, L.EMPTY_NODE);
                return m != null && this.rangedFilter_.matches(m) ? (r != null && r.trackChildChange(hn(m.name, m.node)),
                x.updateImmediateChild(m.name, m.node)) : x
            }
        } else
            return i.isEmpty() ? t : f && a(d, h) >= 0 ? (r != null && (r.trackChildChange(fi(d.name, d.node)),
            r.trackChildChange(hn(e, i))),
            l.updateImmediateChild(e, i).updateImmediateChild(d.name, L.EMPTY_NODE)) : t
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ko {
    constructor() {
        this.limitSet_ = !1,
        this.startSet_ = !1,
        this.startNameSet_ = !1,
        this.startAfterSet_ = !1,
        this.endSet_ = !1,
        this.endNameSet_ = !1,
        this.endBeforeSet_ = !1,
        this.limit_ = 0,
        this.viewFrom_ = "",
        this.indexStartValue_ = null,
        this.indexStartName_ = "",
        this.indexEndValue_ = null,
        this.indexEndName_ = "",
        this.index_ = ot
    }
    hasStart() {
        return this.startSet_
    }
    isViewFromLeft() {
        return this.viewFrom_ === "" ? this.startSet_ : this.viewFrom_ === "l"
    }
    getIndexStartValue() {
        return N(this.startSet_, "Only valid if start has been set"),
        this.indexStartValue_
    }
    getIndexStartName() {
        return N(this.startSet_, "Only valid if start has been set"),
        this.startNameSet_ ? this.indexStartName_ : cn
    }
    hasEnd() {
        return this.endSet_
    }
    getIndexEndValue() {
        return N(this.endSet_, "Only valid if end has been set"),
        this.indexEndValue_
    }
    getIndexEndName() {
        return N(this.endSet_, "Only valid if end has been set"),
        this.endNameSet_ ? this.indexEndName_ : Fe
    }
    hasLimit() {
        return this.limitSet_
    }
    hasAnchoredLimit() {
        return this.limitSet_ && this.viewFrom_ !== ""
    }
    getLimit() {
        return N(this.limitSet_, "Only valid if limit has been set"),
        this.limit_
    }
    getIndex() {
        return this.index_
    }
    loadsAllData() {
        return !(this.startSet_ || this.endSet_ || this.limitSet_)
    }
    isDefault() {
        return this.loadsAllData() && this.index_ === ot
    }
    copy() {
        const t = new ko;
        return t.limitSet_ = this.limitSet_,
        t.limit_ = this.limit_,
        t.startSet_ = this.startSet_,
        t.startAfterSet_ = this.startAfterSet_,
        t.indexStartValue_ = this.indexStartValue_,
        t.startNameSet_ = this.startNameSet_,
        t.indexStartName_ = this.indexStartName_,
        t.endSet_ = this.endSet_,
        t.endBeforeSet_ = this.endBeforeSet_,
        t.indexEndValue_ = this.indexEndValue_,
        t.endNameSet_ = this.endNameSet_,
        t.indexEndName_ = this.indexEndName_,
        t.index_ = this.index_,
        t.viewFrom_ = this.viewFrom_,
        t
    }
}
function Eg(n) {
    return n.loadsAllData() ? new Do(n.getIndex()) : n.hasLimit() ? new vg(n) : new _i(n)
}
function ec(n) {
    const t = {};
    if (n.isDefault())
        return t;
    let e;
    if (n.index_ === ot ? e = "$priority" : n.index_ === mg ? e = "$value" : n.index_ === nn ? e = "$key" : (N(n.index_ instanceof _g, "Unrecognized index type!"),
    e = n.index_.toString()),
    t.orderBy = ft(e),
    n.startSet_) {
        const i = n.startAfterSet_ ? "startAfter" : "startAt";
        t[i] = ft(n.indexStartValue_),
        n.startNameSet_ && (t[i] += "," + ft(n.indexStartName_))
    }
    if (n.endSet_) {
        const i = n.endBeforeSet_ ? "endBefore" : "endAt";
        t[i] = ft(n.indexEndValue_),
        n.endNameSet_ && (t[i] += "," + ft(n.indexEndName_))
    }
    return n.limitSet_ && (n.isViewFromLeft() ? t.limitToFirst = n.limit_ : t.limitToLast = n.limit_),
    t
}
function nc(n) {
    const t = {};
    if (n.startSet_ && (t.sp = n.indexStartValue_,
    n.startNameSet_ && (t.sn = n.indexStartName_),
    t.sin = !n.startAfterSet_),
    n.endSet_ && (t.ep = n.indexEndValue_,
    n.endNameSet_ && (t.en = n.indexEndName_),
    t.ein = !n.endBeforeSet_),
    n.limitSet_) {
        t.l = n.limit_;
        let e = n.viewFrom_;
        e === "" && (n.isViewFromLeft() ? e = "l" : e = "r"),
        t.vf = e
    }
    return n.index_ !== ot && (t.i = n.index_.toString()),
    t
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Es extends zh {
    constructor(t, e, i, s) {
        super(),
        this.repoInfo_ = t,
        this.onDataUpdate_ = e,
        this.authTokenProvider_ = i,
        this.appCheckTokenProvider_ = s,
        this.log_ = Ai("p:rest:"),
        this.listens_ = {}
    }
    reportStats(t) {
        throw new Error("Method not implemented.")
    }
    static getListenId_(t, e) {
        return e !== void 0 ? "tag$" + e : (N(t._queryParams.isDefault(), "should have a tag if it's not a default query."),
        t._path.toString())
    }
    listen(t, e, i, s) {
        const r = t._path.toString();
        this.log_("Listen called for " + r + " " + t._queryIdentifier);
        const a = Es.getListenId_(t, i)
          , l = {};
        this.listens_[a] = l;
        const h = ec(t._queryParams);
        this.restRequest_(r + ".json", h, (d, f) => {
            let _ = f;
            if (d === 404 && (_ = null,
            d = null),
            d === null && this.onDataUpdate_(r, _, !1, i),
            an(this.listens_, a) === l) {
                let m;
                d ? d === 401 ? m = "permission_denied" : m = "rest_error:" + d : m = "ok",
                s(m, null)
            }
        }
        )
    }
    unlisten(t, e) {
        const i = Es.getListenId_(t, e);
        delete this.listens_[i]
    }
    get(t) {
        const e = ec(t._queryParams)
          , i = t._path.toString()
          , s = new Io;
        return this.restRequest_(i + ".json", e, (r, a) => {
            let l = a;
            r === 404 && (l = null,
            r = null),
            r === null ? (this.onDataUpdate_(i, l, !1, null),
            s.resolve(l)) : s.reject(new Error(l))
        }
        ),
        s.promise
    }
    refreshAuthToken(t) {}
    restRequest_(t, e={}, i) {
        return e.format = "export",
        Promise.all([this.authTokenProvider_.getToken(!1), this.appCheckTokenProvider_.getToken(!1)]).then( ([s,r]) => {
            s && s.accessToken && (e.auth = s.accessToken),
            r && r.token && (e.ac = r.token);
            const a = (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host + t + "?ns=" + this.repoInfo_.namespace + Kf(e);
            this.log_("Sending REST request for " + a);
            const l = new XMLHttpRequest;
            l.onreadystatechange = () => {
                if (i && l.readyState === 4) {
                    this.log_("REST Response for " + a + " received. status:", l.status, "response:", l.responseText);
                    let h = null;
                    if (l.status >= 200 && l.status < 300) {
                        try {
                            h = ci(l.responseText)
                        } catch {
                            Ut("Failed to parse JSON response for " + a + ": " + l.responseText)
                        }
                        i(null, h)
                    } else
                        l.status !== 401 && l.status !== 404 && Ut("Got unsuccessful REST response for " + a + " Status: " + l.status),
                        i(l.status);
                    i = null
                }
            }
            ,
            l.open("GET", a, !0),
            l.send()
        }
        )
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tg {
    constructor() {
        this.rootNode_ = L.EMPTY_NODE
    }
    getNode(t) {
        return this.rootNode_.getChild(t)
    }
    updateSnapshot(t, e) {
        this.rootNode_ = this.rootNode_.updateChild(t, e)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ts() {
    return {
        value: null,
        children: new Map
    }
}
function su(n, t, e) {
    if (q(t))
        n.value = e,
        n.children.clear();
    else if (n.value !== null)
        n.value = n.value.updateChild(t, e);
    else {
        const i = j(t);
        n.children.has(i) || n.children.set(i, Ts());
        const s = n.children.get(i);
        t = et(t),
        su(s, t, e)
    }
}
function Kr(n, t, e) {
    n.value !== null ? e(t, n.value) : Ig(n, (i, s) => {
        const r = new Z(t.toString() + "/" + i);
        Kr(s, r, e)
    }
    )
}
function Ig(n, t) {
    n.children.forEach( (e, i) => {
        t(i, e)
    }
    )
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wg {
    constructor(t) {
        this.collection_ = t,
        this.last_ = null
    }
    get() {
        const t = this.collection_.get()
          , e = Object.assign({}, t);
        return this.last_ && Mt(this.last_, (i, s) => {
            e[i] = e[i] - s
        }
        ),
        this.last_ = t,
        e
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ic = 10 * 1e3
  , Cg = 30 * 1e3
  , Ag = 5 * 60 * 1e3;
class Rg {
    constructor(t, e) {
        this.server_ = e,
        this.statsToReport_ = {},
        this.statsListener_ = new wg(t);
        const i = ic + (Cg - ic) * Math.random();
        ei(this.reportStats_.bind(this), Math.floor(i))
    }
    reportStats_() {
        const t = this.statsListener_.get()
          , e = {};
        let i = !1;
        Mt(t, (s, r) => {
            r > 0 && re(this.statsToReport_, s) && (e[s] = r,
            i = !0)
        }
        ),
        i && this.server_.reportStats(e),
        ei(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * Ag))
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var $t;
(function(n) {
    n[n.OVERWRITE = 0] = "OVERWRITE",
    n[n.MERGE = 1] = "MERGE",
    n[n.ACK_USER_WRITE = 2] = "ACK_USER_WRITE",
    n[n.LISTEN_COMPLETE = 3] = "LISTEN_COMPLETE"
}
)($t || ($t = {}));
function ru() {
    return {
        fromUser: !0,
        fromServer: !1,
        queryId: null,
        tagged: !1
    }
}
function xo() {
    return {
        fromUser: !1,
        fromServer: !0,
        queryId: null,
        tagged: !1
    }
}
function Vo(n) {
    return {
        fromUser: !1,
        fromServer: !0,
        queryId: n,
        tagged: !0
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Is {
    constructor(t, e, i) {
        this.path = t,
        this.affectedTree = e,
        this.revert = i,
        this.type = $t.ACK_USER_WRITE,
        this.source = ru()
    }
    operationForChild(t) {
        if (q(this.path)) {
            if (this.affectedTree.value != null)
                return N(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths."),
                this;
            {
                const e = this.affectedTree.subtree(new Z(t));
                return new Is(K(),e,this.revert)
            }
        } else
            return N(j(this.path) === t, "operationForChild called for unrelated child."),
            new Is(et(this.path),this.affectedTree,this.revert)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gi {
    constructor(t, e) {
        this.source = t,
        this.path = e,
        this.type = $t.LISTEN_COMPLETE
    }
    operationForChild(t) {
        return q(this.path) ? new gi(this.source,K()) : new gi(this.source,et(this.path))
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ue {
    constructor(t, e, i) {
        this.source = t,
        this.path = e,
        this.snap = i,
        this.type = $t.OVERWRITE
    }
    operationForChild(t) {
        return q(this.path) ? new Ue(this.source,K(),this.snap.getImmediateChild(t)) : new Ue(this.source,et(this.path),this.snap)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mi {
    constructor(t, e, i) {
        this.source = t,
        this.path = e,
        this.children = i,
        this.type = $t.MERGE
    }
    operationForChild(t) {
        if (q(this.path)) {
            const e = this.children.subtree(new Z(t));
            return e.isEmpty() ? null : e.value ? new Ue(this.source,K(),e.value) : new mi(this.source,K(),e)
        } else
            return N(j(this.path) === t, "Can't get a merge for a child not on the path of the operation"),
            new mi(this.source,et(this.path),this.children)
    }
    toString() {
        return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")"
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ve {
    constructor(t, e, i) {
        this.node_ = t,
        this.fullyInitialized_ = e,
        this.filtered_ = i
    }
    isFullyInitialized() {
        return this.fullyInitialized_
    }
    isFiltered() {
        return this.filtered_
    }
    isCompleteForPath(t) {
        if (q(t))
            return this.isFullyInitialized() && !this.filtered_;
        const e = j(t);
        return this.isCompleteForChild(e)
    }
    isCompleteForChild(t) {
        return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(t)
    }
    getNode() {
        return this.node_
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Sg {
    constructor(t) {
        this.query_ = t,
        this.index_ = this.query_._queryParams.getIndex()
    }
}
function Pg(n, t, e, i) {
    const s = []
      , r = [];
    return t.forEach(a => {
        a.type === "child_changed" && n.index_.indexedValueChanged(a.oldSnap, a.snapshotNode) && r.push(yg(a.childName, a.snapshotNode))
    }
    ),
    Kn(n, s, "child_removed", t, i, e),
    Kn(n, s, "child_added", t, i, e),
    Kn(n, s, "child_moved", r, i, e),
    Kn(n, s, "child_changed", t, i, e),
    Kn(n, s, "value", t, i, e),
    s
}
function Kn(n, t, e, i, s, r) {
    const a = i.filter(l => l.type === e);
    a.sort( (l, h) => Ng(n, l, h)),
    a.forEach(l => {
        const h = bg(n, l, r);
        s.forEach(d => {
            d.respondsTo(l.type) && t.push(d.createEvent(h, n.query_))
        }
        )
    }
    )
}
function bg(n, t, e) {
    return t.type === "value" || t.type === "child_removed" || (t.prevName = e.getPredecessorChildName(t.childName, t.snapshotNode, n.index_)),
    t
}
function Ng(n, t, e) {
    if (t.childName == null || e.childName == null)
        throw vn("Should only compare child_ events.");
    const i = new B(t.childName,t.snapshotNode)
      , s = new B(e.childName,e.snapshotNode);
    return n.index_.compare(i, s)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ms(n, t) {
    return {
        eventCache: n,
        serverCache: t
    }
}
function ni(n, t, e, i) {
    return Ms(new ve(t,e,i), n.serverCache)
}
function ou(n, t, e, i) {
    return Ms(n.eventCache, new ve(t,e,i))
}
function ws(n) {
    return n.eventCache.isFullyInitialized() ? n.eventCache.getNode() : null
}
function Be(n) {
    return n.serverCache.isFullyInitialized() ? n.serverCache.getNode() : null
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Nr;
const Dg = () => (Nr || (Nr = new Ht(g_)),
Nr);
class it {
    constructor(t, e=Dg()) {
        this.value = t,
        this.children = e
    }
    static fromObject(t) {
        let e = new it(null);
        return Mt(t, (i, s) => {
            e = e.set(new Z(i), s)
        }
        ),
        e
    }
    isEmpty() {
        return this.value === null && this.children.isEmpty()
    }
    findRootMostMatchingPathAndValue(t, e) {
        if (this.value != null && e(this.value))
            return {
                path: K(),
                value: this.value
            };
        if (q(t))
            return null;
        {
            const i = j(t)
              , s = this.children.get(i);
            if (s !== null) {
                const r = s.findRootMostMatchingPathAndValue(et(t), e);
                return r != null ? {
                    path: pt(new Z(i), r.path),
                    value: r.value
                } : null
            } else
                return null
        }
    }
    findRootMostValueAndPath(t) {
        return this.findRootMostMatchingPathAndValue(t, () => !0)
    }
    subtree(t) {
        if (q(t))
            return this;
        {
            const e = j(t)
              , i = this.children.get(e);
            return i !== null ? i.subtree(et(t)) : new it(null)
        }
    }
    set(t, e) {
        if (q(t))
            return new it(e,this.children);
        {
            const i = j(t)
              , r = (this.children.get(i) || new it(null)).set(et(t), e)
              , a = this.children.insert(i, r);
            return new it(this.value,a)
        }
    }
    remove(t) {
        if (q(t))
            return this.children.isEmpty() ? new it(null) : new it(null,this.children);
        {
            const e = j(t)
              , i = this.children.get(e);
            if (i) {
                const s = i.remove(et(t));
                let r;
                return s.isEmpty() ? r = this.children.remove(e) : r = this.children.insert(e, s),
                this.value === null && r.isEmpty() ? new it(null) : new it(this.value,r)
            } else
                return this
        }
    }
    get(t) {
        if (q(t))
            return this.value;
        {
            const e = j(t)
              , i = this.children.get(e);
            return i ? i.get(et(t)) : null
        }
    }
    setTree(t, e) {
        if (q(t))
            return e;
        {
            const i = j(t)
              , r = (this.children.get(i) || new it(null)).setTree(et(t), e);
            let a;
            return r.isEmpty() ? a = this.children.remove(i) : a = this.children.insert(i, r),
            new it(this.value,a)
        }
    }
    fold(t) {
        return this.fold_(K(), t)
    }
    fold_(t, e) {
        const i = {};
        return this.children.inorderTraversal( (s, r) => {
            i[s] = r.fold_(pt(t, s), e)
        }
        ),
        e(t, this.value, i)
    }
    findOnPath(t, e) {
        return this.findOnPath_(t, K(), e)
    }
    findOnPath_(t, e, i) {
        const s = this.value ? i(e, this.value) : !1;
        if (s)
            return s;
        if (q(t))
            return null;
        {
            const r = j(t)
              , a = this.children.get(r);
            return a ? a.findOnPath_(et(t), pt(e, r), i) : null
        }
    }
    foreachOnPath(t, e) {
        return this.foreachOnPath_(t, K(), e)
    }
    foreachOnPath_(t, e, i) {
        if (q(t))
            return this;
        {
            this.value && i(e, this.value);
            const s = j(t)
              , r = this.children.get(s);
            return r ? r.foreachOnPath_(et(t), pt(e, s), i) : new it(null)
        }
    }
    foreach(t) {
        this.foreach_(K(), t)
    }
    foreach_(t, e) {
        this.children.inorderTraversal( (i, s) => {
            s.foreach_(pt(t, i), e)
        }
        ),
        this.value && e(t, this.value)
    }
    foreachChild(t) {
        this.children.inorderTraversal( (e, i) => {
            i.value && t(e, i.value)
        }
        )
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wt {
    constructor(t) {
        this.writeTree_ = t
    }
    static empty() {
        return new Wt(new it(null))
    }
}
function ii(n, t, e) {
    if (q(t))
        return new Wt(new it(e));
    {
        const i = n.writeTree_.findRootMostValueAndPath(t);
        if (i != null) {
            const s = i.path;
            let r = i.value;
            const a = Ot(s, t);
            return r = r.updateChild(a, e),
            new Wt(n.writeTree_.set(s, r))
        } else {
            const s = new it(e)
              , r = n.writeTree_.setTree(t, s);
            return new Wt(r)
        }
    }
}
function sc(n, t, e) {
    let i = n;
    return Mt(e, (s, r) => {
        i = ii(i, pt(t, s), r)
    }
    ),
    i
}
function rc(n, t) {
    if (q(t))
        return Wt.empty();
    {
        const e = n.writeTree_.setTree(t, new it(null));
        return new Wt(e)
    }
}
function Qr(n, t) {
    return We(n, t) != null
}
function We(n, t) {
    const e = n.writeTree_.findRootMostValueAndPath(t);
    return e != null ? n.writeTree_.get(e.path).getChild(Ot(e.path, t)) : null
}
function oc(n) {
    const t = []
      , e = n.writeTree_.value;
    return e != null ? e.isLeafNode() || e.forEachChild(ot, (i, s) => {
        t.push(new B(i,s))
    }
    ) : n.writeTree_.children.inorderTraversal( (i, s) => {
        s.value != null && t.push(new B(i,s.value))
    }
    ),
    t
}
function ge(n, t) {
    if (q(t))
        return n;
    {
        const e = We(n, t);
        return e != null ? new Wt(new it(e)) : new Wt(n.writeTree_.subtree(t))
    }
}
function Yr(n) {
    return n.writeTree_.isEmpty()
}
function un(n, t) {
    return au(K(), n.writeTree_, t)
}
function au(n, t, e) {
    if (t.value != null)
        return e.updateChild(n, t.value);
    {
        let i = null;
        return t.children.inorderTraversal( (s, r) => {
            s === ".priority" ? (N(r.value !== null, "Priority writes must always be leaf nodes"),
            i = r.value) : e = au(pt(n, s), r, e)
        }
        ),
        !e.getChild(n).isEmpty() && i !== null && (e = e.updateChild(pt(n, ".priority"), i)),
        e
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ls(n, t) {
    return uu(t, n)
}
function kg(n, t, e, i, s) {
    N(i > n.lastWriteId, "Stacking an older write on top of newer ones"),
    s === void 0 && (s = !0),
    n.allWrites.push({
        path: t,
        snap: e,
        writeId: i,
        visible: s
    }),
    s && (n.visibleWrites = ii(n.visibleWrites, t, e)),
    n.lastWriteId = i
}
function xg(n, t) {
    for (let e = 0; e < n.allWrites.length; e++) {
        const i = n.allWrites[e];
        if (i.writeId === t)
            return i
    }
    return null
}
function Vg(n, t) {
    const e = n.allWrites.findIndex(l => l.writeId === t);
    N(e >= 0, "removeWrite called with nonexistent writeId.");
    const i = n.allWrites[e];
    n.allWrites.splice(e, 1);
    let s = i.visible
      , r = !1
      , a = n.allWrites.length - 1;
    for (; s && a >= 0; ) {
        const l = n.allWrites[a];
        l.visible && (a >= e && Og(l, i.path) ? s = !1 : jt(i.path, l.path) && (r = !0)),
        a--
    }
    if (s) {
        if (r)
            return Mg(n),
            !0;
        if (i.snap)
            n.visibleWrites = rc(n.visibleWrites, i.path);
        else {
            const l = i.children;
            Mt(l, h => {
                n.visibleWrites = rc(n.visibleWrites, pt(i.path, h))
            }
            )
        }
        return !0
    } else
        return !1
}
function Og(n, t) {
    if (n.snap)
        return jt(n.path, t);
    for (const e in n.children)
        if (n.children.hasOwnProperty(e) && jt(pt(n.path, e), t))
            return !0;
    return !1
}
function Mg(n) {
    n.visibleWrites = lu(n.allWrites, Lg, K()),
    n.allWrites.length > 0 ? n.lastWriteId = n.allWrites[n.allWrites.length - 1].writeId : n.lastWriteId = -1
}
function Lg(n) {
    return n.visible
}
function lu(n, t, e) {
    let i = Wt.empty();
    for (let s = 0; s < n.length; ++s) {
        const r = n[s];
        if (t(r)) {
            const a = r.path;
            let l;
            if (r.snap)
                jt(e, a) ? (l = Ot(e, a),
                i = ii(i, l, r.snap)) : jt(a, e) && (l = Ot(a, e),
                i = ii(i, K(), r.snap.getChild(l)));
            else if (r.children) {
                if (jt(e, a))
                    l = Ot(e, a),
                    i = sc(i, l, r.children);
                else if (jt(a, e))
                    if (l = Ot(a, e),
                    q(l))
                        i = sc(i, K(), r.children);
                    else {
                        const h = an(r.children, j(l));
                        if (h) {
                            const d = h.getChild(et(l));
                            i = ii(i, K(), d)
                        }
                    }
            } else
                throw vn("WriteRecord should have .snap or .children")
        }
    }
    return i
}
function cu(n, t, e, i, s) {
    if (!i && !s) {
        const r = We(n.visibleWrites, t);
        if (r != null)
            return r;
        {
            const a = ge(n.visibleWrites, t);
            if (Yr(a))
                return e;
            if (e == null && !Qr(a, K()))
                return null;
            {
                const l = e || L.EMPTY_NODE;
                return un(a, l)
            }
        }
    } else {
        const r = ge(n.visibleWrites, t);
        if (!s && Yr(r))
            return e;
        if (!s && e == null && !Qr(r, K()))
            return null;
        {
            const a = function(d) {
                return (d.visible || s) && (!i || !~i.indexOf(d.writeId)) && (jt(d.path, t) || jt(t, d.path))
            }
              , l = lu(n.allWrites, a, t)
              , h = e || L.EMPTY_NODE;
            return un(l, h)
        }
    }
}
function Fg(n, t, e) {
    let i = L.EMPTY_NODE;
    const s = We(n.visibleWrites, t);
    if (s)
        return s.isLeafNode() || s.forEachChild(ot, (r, a) => {
            i = i.updateImmediateChild(r, a)
        }
        ),
        i;
    if (e) {
        const r = ge(n.visibleWrites, t);
        return e.forEachChild(ot, (a, l) => {
            const h = un(ge(r, new Z(a)), l);
            i = i.updateImmediateChild(a, h)
        }
        ),
        oc(r).forEach(a => {
            i = i.updateImmediateChild(a.name, a.node)
        }
        ),
        i
    } else {
        const r = ge(n.visibleWrites, t);
        return oc(r).forEach(a => {
            i = i.updateImmediateChild(a.name, a.node)
        }
        ),
        i
    }
}
function Ug(n, t, e, i, s) {
    N(i || s, "Either existingEventSnap or existingServerSnap must exist");
    const r = pt(t, e);
    if (Qr(n.visibleWrites, r))
        return null;
    {
        const a = ge(n.visibleWrites, r);
        return Yr(a) ? s.getChild(e) : un(a, s.getChild(e))
    }
}
function Bg(n, t, e, i) {
    const s = pt(t, e)
      , r = We(n.visibleWrites, s);
    if (r != null)
        return r;
    if (i.isCompleteForChild(e)) {
        const a = ge(n.visibleWrites, s);
        return un(a, i.getNode().getImmediateChild(e))
    } else
        return null
}
function qg(n, t) {
    return We(n.visibleWrites, t)
}
function jg(n, t, e, i, s, r, a) {
    let l;
    const h = ge(n.visibleWrites, t)
      , d = We(h, K());
    if (d != null)
        l = d;
    else if (e != null)
        l = un(h, e);
    else
        return [];
    if (l = l.withIndex(a),
    !l.isEmpty() && !l.isLeafNode()) {
        const f = []
          , _ = a.getCompare()
          , m = r ? l.getReverseIteratorFrom(i, a) : l.getIteratorFrom(i, a);
        let A = m.getNext();
        for (; A && f.length < s; )
            _(A, i) !== 0 && f.push(A),
            A = m.getNext();
        return f
    } else
        return []
}
function $g() {
    return {
        visibleWrites: Wt.empty(),
        allWrites: [],
        lastWriteId: -1
    }
}
function Cs(n, t, e, i) {
    return cu(n.writeTree, n.treePath, t, e, i)
}
function Oo(n, t) {
    return Fg(n.writeTree, n.treePath, t)
}
function ac(n, t, e, i) {
    return Ug(n.writeTree, n.treePath, t, e, i)
}
function As(n, t) {
    return qg(n.writeTree, pt(n.treePath, t))
}
function Wg(n, t, e, i, s, r) {
    return jg(n.writeTree, n.treePath, t, e, i, s, r)
}
function Mo(n, t, e) {
    return Bg(n.writeTree, n.treePath, t, e)
}
function hu(n, t) {
    return uu(pt(n.treePath, t), n.writeTree)
}
function uu(n, t) {
    return {
        treePath: n,
        writeTree: t
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zg {
    constructor() {
        this.changeMap = new Map
    }
    trackChildChange(t) {
        const e = t.type
          , i = t.childName;
        N(e === "child_added" || e === "child_changed" || e === "child_removed", "Only child changes supported for tracking"),
        N(i !== ".priority", "Only non-priority child changes can be tracked.");
        const s = this.changeMap.get(i);
        if (s) {
            const r = s.type;
            if (e === "child_added" && r === "child_removed")
                this.changeMap.set(i, pi(i, t.snapshotNode, s.snapshotNode));
            else if (e === "child_removed" && r === "child_added")
                this.changeMap.delete(i);
            else if (e === "child_removed" && r === "child_changed")
                this.changeMap.set(i, fi(i, s.oldSnap));
            else if (e === "child_changed" && r === "child_added")
                this.changeMap.set(i, hn(i, t.snapshotNode));
            else if (e === "child_changed" && r === "child_changed")
                this.changeMap.set(i, pi(i, t.snapshotNode, s.oldSnap));
            else
                throw vn("Illegal combination of changes: " + t + " occurred after " + s)
        } else
            this.changeMap.set(i, t)
    }
    getChanges() {
        return Array.from(this.changeMap.values())
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Gg {
    getCompleteChild(t) {
        return null
    }
    getChildAfterChild(t, e, i) {
        return null
    }
}
const du = new Gg;
class Lo {
    constructor(t, e, i=null) {
        this.writes_ = t,
        this.viewCache_ = e,
        this.optCompleteServerCache_ = i
    }
    getCompleteChild(t) {
        const e = this.viewCache_.eventCache;
        if (e.isCompleteForChild(t))
            return e.getNode().getImmediateChild(t);
        {
            const i = this.optCompleteServerCache_ != null ? new ve(this.optCompleteServerCache_,!0,!1) : this.viewCache_.serverCache;
            return Mo(this.writes_, t, i)
        }
    }
    getChildAfterChild(t, e, i) {
        const s = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : Be(this.viewCache_)
          , r = Wg(this.writes_, s, e, 1, i, t);
        return r.length === 0 ? null : r[0]
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Hg(n) {
    return {
        filter: n
    }
}
function Kg(n, t) {
    N(t.eventCache.getNode().isIndexed(n.filter.getIndex()), "Event snap not indexed"),
    N(t.serverCache.getNode().isIndexed(n.filter.getIndex()), "Server snap not indexed")
}
function Qg(n, t, e, i, s) {
    const r = new zg;
    let a, l;
    if (e.type === $t.OVERWRITE) {
        const d = e;
        d.source.fromUser ? a = Xr(n, t, d.path, d.snap, i, s, r) : (N(d.source.fromServer, "Unknown source."),
        l = d.source.tagged || t.serverCache.isFiltered() && !q(d.path),
        a = Rs(n, t, d.path, d.snap, i, s, l, r))
    } else if (e.type === $t.MERGE) {
        const d = e;
        d.source.fromUser ? a = Xg(n, t, d.path, d.children, i, s, r) : (N(d.source.fromServer, "Unknown source."),
        l = d.source.tagged || t.serverCache.isFiltered(),
        a = Jr(n, t, d.path, d.children, i, s, l, r))
    } else if (e.type === $t.ACK_USER_WRITE) {
        const d = e;
        d.revert ? a = tm(n, t, d.path, i, s, r) : a = Jg(n, t, d.path, d.affectedTree, i, s, r)
    } else if (e.type === $t.LISTEN_COMPLETE)
        a = Zg(n, t, e.path, i, r);
    else
        throw vn("Unknown operation type: " + e.type);
    const h = r.getChanges();
    return Yg(t, a, h),
    {
        viewCache: a,
        changes: h
    }
}
function Yg(n, t, e) {
    const i = t.eventCache;
    if (i.isFullyInitialized()) {
        const s = i.getNode().isLeafNode() || i.getNode().isEmpty()
          , r = ws(n);
        (e.length > 0 || !n.eventCache.isFullyInitialized() || s && !i.getNode().equals(r) || !i.getNode().getPriority().equals(r.getPriority())) && e.push(iu(ws(t)))
    }
}
function fu(n, t, e, i, s, r) {
    const a = t.eventCache;
    if (As(i, e) != null)
        return t;
    {
        let l, h;
        if (q(e))
            if (N(t.serverCache.isFullyInitialized(), "If change path is empty, we must have complete server data"),
            t.serverCache.isFiltered()) {
                const d = Be(t)
                  , f = d instanceof L ? d : L.EMPTY_NODE
                  , _ = Oo(i, f);
                l = n.filter.updateFullNode(t.eventCache.getNode(), _, r)
            } else {
                const d = Cs(i, Be(t));
                l = n.filter.updateFullNode(t.eventCache.getNode(), d, r)
            }
        else {
            const d = j(e);
            if (d === ".priority") {
                N(ye(e) === 1, "Can't have a priority with additional path components");
                const f = a.getNode();
                h = t.serverCache.getNode();
                const _ = ac(i, e, f, h);
                _ != null ? l = n.filter.updatePriority(f, _) : l = a.getNode()
            } else {
                const f = et(e);
                let _;
                if (a.isCompleteForChild(d)) {
                    h = t.serverCache.getNode();
                    const m = ac(i, e, a.getNode(), h);
                    m != null ? _ = a.getNode().getImmediateChild(d).updateChild(f, m) : _ = a.getNode().getImmediateChild(d)
                } else
                    _ = Mo(i, d, t.serverCache);
                _ != null ? l = n.filter.updateChild(a.getNode(), d, _, f, s, r) : l = a.getNode()
            }
        }
        return ni(t, l, a.isFullyInitialized() || q(e), n.filter.filtersNodes())
    }
}
function Rs(n, t, e, i, s, r, a, l) {
    const h = t.serverCache;
    let d;
    const f = a ? n.filter : n.filter.getIndexedFilter();
    if (q(e))
        d = f.updateFullNode(h.getNode(), i, null);
    else if (f.filtersNodes() && !h.isFiltered()) {
        const A = h.getNode().updateChild(e, i);
        d = f.updateFullNode(h.getNode(), A, null)
    } else {
        const A = j(e);
        if (!h.isCompleteForPath(e) && ye(e) > 1)
            return t;
        const S = et(e)
          , k = h.getNode().getImmediateChild(A).updateChild(S, i);
        A === ".priority" ? d = f.updatePriority(h.getNode(), k) : d = f.updateChild(h.getNode(), A, k, S, du, null)
    }
    const _ = ou(t, d, h.isFullyInitialized() || q(e), f.filtersNodes())
      , m = new Lo(s,_,r);
    return fu(n, _, e, s, m, l)
}
function Xr(n, t, e, i, s, r, a) {
    const l = t.eventCache;
    let h, d;
    const f = new Lo(s,t,r);
    if (q(e))
        d = n.filter.updateFullNode(t.eventCache.getNode(), i, a),
        h = ni(t, d, !0, n.filter.filtersNodes());
    else {
        const _ = j(e);
        if (_ === ".priority")
            d = n.filter.updatePriority(t.eventCache.getNode(), i),
            h = ni(t, d, l.isFullyInitialized(), l.isFiltered());
        else {
            const m = et(e)
              , A = l.getNode().getImmediateChild(_);
            let S;
            if (q(m))
                S = i;
            else {
                const x = f.getCompleteChild(_);
                x != null ? Hh(m) === ".priority" && x.getChild(Qh(m)).isEmpty() ? S = x : S = x.updateChild(m, i) : S = L.EMPTY_NODE
            }
            if (A.equals(S))
                h = t;
            else {
                const x = n.filter.updateChild(l.getNode(), _, S, m, f, a);
                h = ni(t, x, l.isFullyInitialized(), n.filter.filtersNodes())
            }
        }
    }
    return h
}
function lc(n, t) {
    return n.eventCache.isCompleteForChild(t)
}
function Xg(n, t, e, i, s, r, a) {
    let l = t;
    return i.foreach( (h, d) => {
        const f = pt(e, h);
        lc(t, j(f)) && (l = Xr(n, l, f, d, s, r, a))
    }
    ),
    i.foreach( (h, d) => {
        const f = pt(e, h);
        lc(t, j(f)) || (l = Xr(n, l, f, d, s, r, a))
    }
    ),
    l
}
function cc(n, t, e) {
    return e.foreach( (i, s) => {
        t = t.updateChild(i, s)
    }
    ),
    t
}
function Jr(n, t, e, i, s, r, a, l) {
    if (t.serverCache.getNode().isEmpty() && !t.serverCache.isFullyInitialized())
        return t;
    let h = t, d;
    q(e) ? d = i : d = new it(null).setTree(e, i);
    const f = t.serverCache.getNode();
    return d.children.inorderTraversal( (_, m) => {
        if (f.hasChild(_)) {
            const A = t.serverCache.getNode().getImmediateChild(_)
              , S = cc(n, A, m);
            h = Rs(n, h, new Z(_), S, s, r, a, l)
        }
    }
    ),
    d.children.inorderTraversal( (_, m) => {
        const A = !t.serverCache.isCompleteForChild(_) && m.value === null;
        if (!f.hasChild(_) && !A) {
            const S = t.serverCache.getNode().getImmediateChild(_)
              , x = cc(n, S, m);
            h = Rs(n, h, new Z(_), x, s, r, a, l)
        }
    }
    ),
    h
}
function Jg(n, t, e, i, s, r, a) {
    if (As(s, e) != null)
        return t;
    const l = t.serverCache.isFiltered()
      , h = t.serverCache;
    if (i.value != null) {
        if (q(e) && h.isFullyInitialized() || h.isCompleteForPath(e))
            return Rs(n, t, e, h.getNode().getChild(e), s, r, l, a);
        if (q(e)) {
            let d = new it(null);
            return h.getNode().forEachChild(nn, (f, _) => {
                d = d.set(new Z(f), _)
            }
            ),
            Jr(n, t, e, d, s, r, l, a)
        } else
            return t
    } else {
        let d = new it(null);
        return i.foreach( (f, _) => {
            const m = pt(e, f);
            h.isCompleteForPath(m) && (d = d.set(f, h.getNode().getChild(m)))
        }
        ),
        Jr(n, t, e, d, s, r, l, a)
    }
}
function Zg(n, t, e, i, s) {
    const r = t.serverCache
      , a = ou(t, r.getNode(), r.isFullyInitialized() || q(e), r.isFiltered());
    return fu(n, a, e, i, du, s)
}
function tm(n, t, e, i, s, r) {
    let a;
    if (As(i, e) != null)
        return t;
    {
        const l = new Lo(i,t,s)
          , h = t.eventCache.getNode();
        let d;
        if (q(e) || j(e) === ".priority") {
            let f;
            if (t.serverCache.isFullyInitialized())
                f = Cs(i, Be(t));
            else {
                const _ = t.serverCache.getNode();
                N(_ instanceof L, "serverChildren would be complete if leaf node"),
                f = Oo(i, _)
            }
            f = f,
            d = n.filter.updateFullNode(h, f, r)
        } else {
            const f = j(e);
            let _ = Mo(i, f, t.serverCache);
            _ == null && t.serverCache.isCompleteForChild(f) && (_ = h.getImmediateChild(f)),
            _ != null ? d = n.filter.updateChild(h, f, _, et(e), l, r) : t.eventCache.getNode().hasChild(f) ? d = n.filter.updateChild(h, f, L.EMPTY_NODE, et(e), l, r) : d = h,
            d.isEmpty() && t.serverCache.isFullyInitialized() && (a = Cs(i, Be(t)),
            a.isLeafNode() && (d = n.filter.updateFullNode(d, a, r)))
        }
        return a = t.serverCache.isFullyInitialized() || As(i, K()) != null,
        ni(t, d, a, n.filter.filtersNodes())
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class em {
    constructor(t, e) {
        this.query_ = t,
        this.eventRegistrations_ = [];
        const i = this.query_._queryParams
          , s = new Do(i.getIndex())
          , r = Eg(i);
        this.processor_ = Hg(r);
        const a = e.serverCache
          , l = e.eventCache
          , h = s.updateFullNode(L.EMPTY_NODE, a.getNode(), null)
          , d = r.updateFullNode(L.EMPTY_NODE, l.getNode(), null)
          , f = new ve(h,a.isFullyInitialized(),s.filtersNodes())
          , _ = new ve(d,l.isFullyInitialized(),r.filtersNodes());
        this.viewCache_ = Ms(_, f),
        this.eventGenerator_ = new Sg(this.query_)
    }
    get query() {
        return this.query_
    }
}
function nm(n) {
    return n.viewCache_.serverCache.getNode()
}
function im(n) {
    return ws(n.viewCache_)
}
function sm(n, t) {
    const e = Be(n.viewCache_);
    return e && (n.query._queryParams.loadsAllData() || !q(t) && !e.getImmediateChild(j(t)).isEmpty()) ? e.getChild(t) : null
}
function hc(n) {
    return n.eventRegistrations_.length === 0
}
function rm(n, t) {
    n.eventRegistrations_.push(t)
}
function uc(n, t, e) {
    const i = [];
    if (e) {
        N(t == null, "A cancel should cancel all event registrations.");
        const s = n.query._path;
        n.eventRegistrations_.forEach(r => {
            const a = r.createCancelEvent(e, s);
            a && i.push(a)
        }
        )
    }
    if (t) {
        let s = [];
        for (let r = 0; r < n.eventRegistrations_.length; ++r) {
            const a = n.eventRegistrations_[r];
            if (!a.matches(t))
                s.push(a);
            else if (t.hasAnyCallback()) {
                s = s.concat(n.eventRegistrations_.slice(r + 1));
                break
            }
        }
        n.eventRegistrations_ = s
    } else
        n.eventRegistrations_ = [];
    return i
}
function dc(n, t, e, i) {
    t.type === $t.MERGE && t.source.queryId !== null && (N(Be(n.viewCache_), "We should always have a full cache before handling merges"),
    N(ws(n.viewCache_), "Missing event cache, even though we have a server cache"));
    const s = n.viewCache_
      , r = Qg(n.processor_, s, t, e, i);
    return Kg(n.processor_, r.viewCache),
    N(r.viewCache.serverCache.isFullyInitialized() || !s.serverCache.isFullyInitialized(), "Once a server snap is complete, it should never go back"),
    n.viewCache_ = r.viewCache,
    pu(n, r.changes, r.viewCache.eventCache.getNode(), null)
}
function om(n, t) {
    const e = n.viewCache_.eventCache
      , i = [];
    return e.getNode().isLeafNode() || e.getNode().forEachChild(ot, (r, a) => {
        i.push(hn(r, a))
    }
    ),
    e.isFullyInitialized() && i.push(iu(e.getNode())),
    pu(n, i, e.getNode(), t)
}
function pu(n, t, e, i) {
    const s = i ? [i] : n.eventRegistrations_;
    return Pg(n.eventGenerator_, t, e, s)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Ss;
class _u {
    constructor() {
        this.views = new Map
    }
}
function am(n) {
    N(!Ss, "__referenceConstructor has already been defined"),
    Ss = n
}
function lm() {
    return N(Ss, "Reference.ts has not been loaded"),
    Ss
}
function cm(n) {
    return n.views.size === 0
}
function Fo(n, t, e, i) {
    const s = t.source.queryId;
    if (s !== null) {
        const r = n.views.get(s);
        return N(r != null, "SyncTree gave us an op for an invalid query."),
        dc(r, t, e, i)
    } else {
        let r = [];
        for (const a of n.views.values())
            r = r.concat(dc(a, t, e, i));
        return r
    }
}
function gu(n, t, e, i, s) {
    const r = t._queryIdentifier
      , a = n.views.get(r);
    if (!a) {
        let l = Cs(e, s ? i : null)
          , h = !1;
        l ? h = !0 : i instanceof L ? (l = Oo(e, i),
        h = !1) : (l = L.EMPTY_NODE,
        h = !1);
        const d = Ms(new ve(l,h,!1), new ve(i,s,!1));
        return new em(t,d)
    }
    return a
}
function hm(n, t, e, i, s, r) {
    const a = gu(n, t, i, s, r);
    return n.views.has(t._queryIdentifier) || n.views.set(t._queryIdentifier, a),
    rm(a, e),
    om(a, e)
}
function um(n, t, e, i) {
    const s = t._queryIdentifier
      , r = [];
    let a = [];
    const l = Ee(n);
    if (s === "default")
        for (const [h,d] of n.views.entries())
            a = a.concat(uc(d, e, i)),
            hc(d) && (n.views.delete(h),
            d.query._queryParams.loadsAllData() || r.push(d.query));
    else {
        const h = n.views.get(s);
        h && (a = a.concat(uc(h, e, i)),
        hc(h) && (n.views.delete(s),
        h.query._queryParams.loadsAllData() || r.push(h.query)))
    }
    return l && !Ee(n) && r.push(new (lm())(t._repo,t._path)),
    {
        removed: r,
        events: a
    }
}
function mu(n) {
    const t = [];
    for (const e of n.views.values())
        e.query._queryParams.loadsAllData() || t.push(e);
    return t
}
function me(n, t) {
    let e = null;
    for (const i of n.views.values())
        e = e || sm(i, t);
    return e
}
function yu(n, t) {
    if (t._queryParams.loadsAllData())
        return Fs(n);
    {
        const i = t._queryIdentifier;
        return n.views.get(i)
    }
}
function vu(n, t) {
    return yu(n, t) != null
}
function Ee(n) {
    return Fs(n) != null
}
function Fs(n) {
    for (const t of n.views.values())
        if (t.query._queryParams.loadsAllData())
            return t;
    return null
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Ps;
function dm(n) {
    N(!Ps, "__referenceConstructor has already been defined"),
    Ps = n
}
function fm() {
    return N(Ps, "Reference.ts has not been loaded"),
    Ps
}
let pm = 1;
class fc {
    constructor(t) {
        this.listenProvider_ = t,
        this.syncPointTree_ = new it(null),
        this.pendingWriteTree_ = $g(),
        this.tagToQueryMap = new Map,
        this.queryToTagMap = new Map
    }
}
function _m(n, t, e, i, s) {
    return kg(n.pendingWriteTree_, t, e, i, s),
    s ? bi(n, new Ue(ru(),t,e)) : []
}
function tn(n, t, e=!1) {
    const i = xg(n.pendingWriteTree_, t);
    if (Vg(n.pendingWriteTree_, t)) {
        let r = new it(null);
        return i.snap != null ? r = r.set(K(), !0) : Mt(i.children, a => {
            r = r.set(new Z(a), !0)
        }
        ),
        bi(n, new Is(i.path,r,e))
    } else
        return []
}
function Pi(n, t, e) {
    return bi(n, new Ue(xo(),t,e))
}
function gm(n, t, e) {
    const i = it.fromObject(e);
    return bi(n, new mi(xo(),t,i))
}
function mm(n, t) {
    return bi(n, new gi(xo(),t))
}
function ym(n, t, e) {
    const i = Uo(n, e);
    if (i) {
        const s = Bo(i)
          , r = s.path
          , a = s.queryId
          , l = Ot(r, t)
          , h = new gi(Vo(a),l);
        return qo(n, r, h)
    } else
        return []
}
function Eu(n, t, e, i, s=!1) {
    const r = t._path
      , a = n.syncPointTree_.get(r);
    let l = [];
    if (a && (t._queryIdentifier === "default" || vu(a, t))) {
        const h = um(a, t, e, i);
        cm(a) && (n.syncPointTree_ = n.syncPointTree_.remove(r));
        const d = h.removed;
        if (l = h.events,
        !s) {
            const f = d.findIndex(m => m._queryParams.loadsAllData()) !== -1
              , _ = n.syncPointTree_.findOnPath(r, (m, A) => Ee(A));
            if (f && !_) {
                const m = n.syncPointTree_.subtree(r);
                if (!m.isEmpty()) {
                    const A = Im(m);
                    for (let S = 0; S < A.length; ++S) {
                        const x = A[S]
                          , k = x.query
                          , Y = Au(n, x);
                        n.listenProvider_.startListening(si(k), yi(n, k), Y.hashFn, Y.onComplete)
                    }
                }
            }
            !_ && d.length > 0 && !i && (f ? n.listenProvider_.stopListening(si(t), null) : d.forEach(m => {
                const A = n.queryToTagMap.get(Us(m));
                n.listenProvider_.stopListening(si(m), A)
            }
            ))
        }
        wm(n, d)
    }
    return l
}
function Tu(n, t, e, i) {
    const s = Uo(n, i);
    if (s != null) {
        const r = Bo(s)
          , a = r.path
          , l = r.queryId
          , h = Ot(a, t)
          , d = new Ue(Vo(l),h,e);
        return qo(n, a, d)
    } else
        return []
}
function vm(n, t, e, i) {
    const s = Uo(n, i);
    if (s) {
        const r = Bo(s)
          , a = r.path
          , l = r.queryId
          , h = Ot(a, t)
          , d = it.fromObject(e)
          , f = new mi(Vo(l),h,d);
        return qo(n, a, f)
    } else
        return []
}
function Em(n, t, e, i=!1) {
    const s = t._path;
    let r = null
      , a = !1;
    n.syncPointTree_.foreachOnPath(s, (m, A) => {
        const S = Ot(m, s);
        r = r || me(A, S),
        a = a || Ee(A)
    }
    );
    let l = n.syncPointTree_.get(s);
    l ? (a = a || Ee(l),
    r = r || me(l, K())) : (l = new _u,
    n.syncPointTree_ = n.syncPointTree_.set(s, l));
    let h;
    r != null ? h = !0 : (h = !1,
    r = L.EMPTY_NODE,
    n.syncPointTree_.subtree(s).foreachChild( (A, S) => {
        const x = me(S, K());
        x && (r = r.updateImmediateChild(A, x))
    }
    ));
    const d = vu(l, t);
    if (!d && !t._queryParams.loadsAllData()) {
        const m = Us(t);
        N(!n.queryToTagMap.has(m), "View does not exist, but we have a tag");
        const A = Cm();
        n.queryToTagMap.set(m, A),
        n.tagToQueryMap.set(A, m)
    }
    const f = Ls(n.pendingWriteTree_, s);
    let _ = hm(l, t, e, f, r, h);
    if (!d && !a && !i) {
        const m = yu(l, t);
        _ = _.concat(Am(n, t, m))
    }
    return _
}
function Iu(n, t, e) {
    const s = n.pendingWriteTree_
      , r = n.syncPointTree_.findOnPath(t, (a, l) => {
        const h = Ot(a, t)
          , d = me(l, h);
        if (d)
            return d
    }
    );
    return cu(s, t, r, e, !0)
}
function Tm(n, t) {
    const e = t._path;
    let i = null;
    n.syncPointTree_.foreachOnPath(e, (d, f) => {
        const _ = Ot(d, e);
        i = i || me(f, _)
    }
    );
    let s = n.syncPointTree_.get(e);
    s ? i = i || me(s, K()) : (s = new _u,
    n.syncPointTree_ = n.syncPointTree_.set(e, s));
    const r = i != null
      , a = r ? new ve(i,!0,!1) : null
      , l = Ls(n.pendingWriteTree_, t._path)
      , h = gu(s, t, l, r ? a.getNode() : L.EMPTY_NODE, r);
    return im(h)
}
function bi(n, t) {
    return wu(t, n.syncPointTree_, null, Ls(n.pendingWriteTree_, K()))
}
function wu(n, t, e, i) {
    if (q(n.path))
        return Cu(n, t, e, i);
    {
        const s = t.get(K());
        e == null && s != null && (e = me(s, K()));
        let r = [];
        const a = j(n.path)
          , l = n.operationForChild(a)
          , h = t.children.get(a);
        if (h && l) {
            const d = e ? e.getImmediateChild(a) : null
              , f = hu(i, a);
            r = r.concat(wu(l, h, d, f))
        }
        return s && (r = r.concat(Fo(s, n, i, e))),
        r
    }
}
function Cu(n, t, e, i) {
    const s = t.get(K());
    e == null && s != null && (e = me(s, K()));
    let r = [];
    return t.children.inorderTraversal( (a, l) => {
        const h = e ? e.getImmediateChild(a) : null
          , d = hu(i, a)
          , f = n.operationForChild(a);
        f && (r = r.concat(Cu(f, l, h, d)))
    }
    ),
    s && (r = r.concat(Fo(s, n, i, e))),
    r
}
function Au(n, t) {
    const e = t.query
      , i = yi(n, e);
    return {
        hashFn: () => (nm(t) || L.EMPTY_NODE).hash(),
        onComplete: s => {
            if (s === "ok")
                return i ? ym(n, e._path, i) : mm(n, e._path);
            {
                const r = v_(s, e);
                return Eu(n, e, null, r)
            }
        }
    }
}
function yi(n, t) {
    const e = Us(t);
    return n.queryToTagMap.get(e)
}
function Us(n) {
    return n._path.toString() + "$" + n._queryIdentifier
}
function Uo(n, t) {
    return n.tagToQueryMap.get(t)
}
function Bo(n) {
    const t = n.indexOf("$");
    return N(t !== -1 && t < n.length - 1, "Bad queryKey."),
    {
        queryId: n.substr(t + 1),
        path: new Z(n.substr(0, t))
    }
}
function qo(n, t, e) {
    const i = n.syncPointTree_.get(t);
    N(i, "Missing sync point for query tag that we're tracking");
    const s = Ls(n.pendingWriteTree_, t);
    return Fo(i, e, s, null)
}
function Im(n) {
    return n.fold( (t, e, i) => {
        if (e && Ee(e))
            return [Fs(e)];
        {
            let s = [];
            return e && (s = mu(e)),
            Mt(i, (r, a) => {
                s = s.concat(a)
            }
            ),
            s
        }
    }
    )
}
function si(n) {
    return n._queryParams.loadsAllData() && !n._queryParams.isDefault() ? new (fm())(n._repo,n._path) : n
}
function wm(n, t) {
    for (let e = 0; e < t.length; ++e) {
        const i = t[e];
        if (!i._queryParams.loadsAllData()) {
            const s = Us(i)
              , r = n.queryToTagMap.get(s);
            n.queryToTagMap.delete(s),
            n.tagToQueryMap.delete(r)
        }
    }
}
function Cm() {
    return pm++
}
function Am(n, t, e) {
    const i = t._path
      , s = yi(n, t)
      , r = Au(n, e)
      , a = n.listenProvider_.startListening(si(t), s, r.hashFn, r.onComplete)
      , l = n.syncPointTree_.subtree(i);
    if (s)
        N(!Ee(l.value), "If we're adding a query, it shouldn't be shadowed");
    else {
        const h = l.fold( (d, f, _) => {
            if (!q(d) && f && Ee(f))
                return [Fs(f).query];
            {
                let m = [];
                return f && (m = m.concat(mu(f).map(A => A.query))),
                Mt(_, (A, S) => {
                    m = m.concat(S)
                }
                ),
                m
            }
        }
        );
        for (let d = 0; d < h.length; ++d) {
            const f = h[d];
            n.listenProvider_.stopListening(si(f), yi(n, f))
        }
    }
    return a
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jo {
    constructor(t) {
        this.node_ = t
    }
    getImmediateChild(t) {
        const e = this.node_.getImmediateChild(t);
        return new jo(e)
    }
    node() {
        return this.node_
    }
}
class $o {
    constructor(t, e) {
        this.syncTree_ = t,
        this.path_ = e
    }
    getImmediateChild(t) {
        const e = pt(this.path_, t);
        return new $o(this.syncTree_,e)
    }
    node() {
        return Iu(this.syncTree_, this.path_)
    }
}
const Rm = function(n) {
    return n = n || {},
    n.timestamp = n.timestamp || new Date().getTime(),
    n
}
  , pc = function(n, t, e) {
    if (!n || typeof n != "object")
        return n;
    if (N(".sv"in n, "Unexpected leaf node or priority contents"),
    typeof n[".sv"] == "string")
        return Sm(n[".sv"], t, e);
    if (typeof n[".sv"] == "object")
        return Pm(n[".sv"], t);
    N(!1, "Unexpected server value: " + JSON.stringify(n, null, 2))
}
  , Sm = function(n, t, e) {
    switch (n) {
    case "timestamp":
        return e.timestamp;
    default:
        N(!1, "Unexpected server value: " + n)
    }
}
  , Pm = function(n, t, e) {
    n.hasOwnProperty("increment") || N(!1, "Unexpected server value: " + JSON.stringify(n, null, 2));
    const i = n.increment;
    typeof i != "number" && N(!1, "Unexpected increment value: " + i);
    const s = t.node();
    if (N(s !== null && typeof s < "u", "Expected ChildrenNode.EMPTY_NODE for nulls"),
    !s.isLeafNode())
        return i;
    const a = s.getValue();
    return typeof a != "number" ? i : a + i
}
  , bm = function(n, t, e, i) {
    return Wo(t, new $o(e,n), i)
}
  , Nm = function(n, t, e) {
    return Wo(n, new jo(t), e)
};
function Wo(n, t, e) {
    const i = n.getPriority().val()
      , s = pc(i, t.getImmediateChild(".priority"), e);
    let r;
    if (n.isLeafNode()) {
        const a = n
          , l = pc(a.getValue(), t, e);
        return l !== a.getValue() || s !== a.getPriority().val() ? new _t(l,Tt(s)) : n
    } else {
        const a = n;
        return r = a,
        s !== a.getPriority().val() && (r = r.updatePriority(new _t(s))),
        a.forEachChild(ot, (l, h) => {
            const d = Wo(h, t.getImmediateChild(l), e);
            d !== h && (r = r.updateImmediateChild(l, d))
        }
        ),
        r
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zo {
    constructor(t="", e=null, i={
        children: {},
        childCount: 0
    }) {
        this.name = t,
        this.parent = e,
        this.node = i
    }
}
function Go(n, t) {
    let e = t instanceof Z ? t : new Z(t)
      , i = n
      , s = j(e);
    for (; s !== null; ) {
        const r = an(i.node.children, s) || {
            children: {},
            childCount: 0
        };
        i = new zo(s,i,r),
        e = et(e),
        s = j(e)
    }
    return i
}
function In(n) {
    return n.node.value
}
function Ru(n, t) {
    n.node.value = t,
    Zr(n)
}
function Su(n) {
    return n.node.childCount > 0
}
function Dm(n) {
    return In(n) === void 0 && !Su(n)
}
function Bs(n, t) {
    Mt(n.node.children, (e, i) => {
        t(new zo(e,n,i))
    }
    )
}
function Pu(n, t, e, i) {
    e && !i && t(n),
    Bs(n, s => {
        Pu(s, t, !0, i)
    }
    ),
    e && i && t(n)
}
function km(n, t, e) {
    let i = n.parent;
    for (; i !== null; ) {
        if (t(i))
            return !0;
        i = i.parent
    }
    return !1
}
function Ni(n) {
    return new Z(n.parent === null ? n.name : Ni(n.parent) + "/" + n.name)
}
function Zr(n) {
    n.parent !== null && xm(n.parent, n.name, n)
}
function xm(n, t, e) {
    const i = Dm(e)
      , s = re(n.node.children, t);
    i && s ? (delete n.node.children[t],
    n.node.childCount--,
    Zr(n)) : !i && !s && (n.node.children[t] = e.node,
    n.node.childCount++,
    Zr(n))
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Vm = /[\[\].#$\/\u0000-\u001F\u007F]/
  , Om = /[\[\].#$\u0000-\u001F\u007F]/
  , Dr = 10 * 1024 * 1024
  , bu = function(n) {
    return typeof n == "string" && n.length !== 0 && !Vm.test(n)
}
  , Nu = function(n) {
    return typeof n == "string" && n.length !== 0 && !Om.test(n)
}
  , Mm = function(n) {
    return n && (n = n.replace(/^\/*\.info(\/|$)/, "/")),
    Nu(n)
}
  , Du = function(n, t, e) {
    const i = e instanceof Z ? new J_(e,n) : e;
    if (t === void 0)
        throw new Error(n + "contains undefined " + Ne(i));
    if (typeof t == "function")
        throw new Error(n + "contains a function " + Ne(i) + " with contents = " + t.toString());
    if (Rh(t))
        throw new Error(n + "contains " + t.toString() + " " + Ne(i));
    if (typeof t == "string" && t.length > Dr / 3 && Vs(t) > Dr)
        throw new Error(n + "contains a string greater than " + Dr + " utf8 bytes " + Ne(i) + " ('" + t.substring(0, 50) + "...')");
    if (t && typeof t == "object") {
        let s = !1
          , r = !1;
        if (Mt(t, (a, l) => {
            if (a === ".value")
                s = !0;
            else if (a !== ".priority" && a !== ".sv" && (r = !0,
            !bu(a)))
                throw new Error(n + " contains an invalid key (" + a + ") " + Ne(i) + `.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
            Z_(i, a),
            Du(n, l, i),
            tg(i)
        }
        ),
        s && r)
            throw new Error(n + ' contains ".value" child ' + Ne(i) + " in addition to actual children.")
    }
}
  , ku = function(n, t, e, i) {
    if (!Nu(e))
        throw new Error(_h(n, t) + 'was an invalid path = "' + e + `". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)
}
  , Lm = function(n, t, e, i) {
    e && (e = e.replace(/^\/*\.info(\/|$)/, "/")),
    ku(n, t, e)
}
  , Fm = function(n, t) {
    const e = t.path.toString();
    if (typeof t.repoInfo.host != "string" || t.repoInfo.host.length === 0 || !bu(t.repoInfo.namespace) && t.repoInfo.host.split(":")[0] !== "localhost" || e.length !== 0 && !Mm(e))
        throw new Error(_h(n, "url") + `must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Um {
    constructor() {
        this.eventLists_ = [],
        this.recursionDepth_ = 0
    }
}
function Bm(n, t) {
    let e = null;
    for (let i = 0; i < t.length; i++) {
        const s = t[i]
          , r = s.getPath();
        e !== null && !Yh(r, e.path) && (n.eventLists_.push(e),
        e = null),
        e === null && (e = {
            events: [],
            path: r
        }),
        e.events.push(s)
    }
    e && n.eventLists_.push(e)
}
function Ce(n, t, e) {
    Bm(n, e),
    qm(n, i => jt(i, t) || jt(t, i))
}
function qm(n, t) {
    n.recursionDepth_++;
    let e = !0;
    for (let i = 0; i < n.eventLists_.length; i++) {
        const s = n.eventLists_[i];
        if (s) {
            const r = s.path;
            t(r) ? (jm(n.eventLists_[i]),
            n.eventLists_[i] = null) : e = !1
        }
    }
    e && (n.eventLists_ = []),
    n.recursionDepth_--
}
function jm(n) {
    for (let t = 0; t < n.events.length; t++) {
        const e = n.events[t];
        if (e !== null) {
            n.events[t] = null;
            const i = e.getEventRunner();
            ti && Nt("event: " + e.toString()),
            Ri(i)
        }
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $m = "repo_interrupt"
  , Wm = 25;
class zm {
    constructor(t, e, i, s) {
        this.repoInfo_ = t,
        this.forceRestClient_ = e,
        this.authTokenProvider_ = i,
        this.appCheckProvider_ = s,
        this.dataUpdateCount = 0,
        this.statsListener_ = null,
        this.eventQueue_ = new Um,
        this.nextWriteId_ = 1,
        this.interceptServerDataCallback_ = null,
        this.onDisconnect_ = Ts(),
        this.transactionQueueTree_ = new zo,
        this.persistentConnection_ = null,
        this.key = this.repoInfo_.toURLString()
    }
    toString() {
        return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host
    }
}
function Gm(n, t, e) {
    if (n.stats_ = So(n.repoInfo_),
    n.forceRestClient_ || w_())
        n.server_ = new Es(n.repoInfo_, (i, s, r, a) => {
            _c(n, i, s, r, a)
        }
        ,n.authTokenProvider_,n.appCheckProvider_),
        setTimeout( () => gc(n, !0), 0);
    else {
        if (typeof e < "u" && e !== null) {
            if (typeof e != "object")
                throw new Error("Only objects are supported for option databaseAuthVariableOverride");
            try {
                ft(e)
            } catch (i) {
                throw new Error("Invalid authOverride provided: " + i)
            }
        }
        n.persistentConnection_ = new ee(n.repoInfo_,t, (i, s, r, a) => {
            _c(n, i, s, r, a)
        }
        ,i => {
            gc(n, i)
        }
        ,i => {
            Km(n, i)
        }
        ,n.authTokenProvider_,n.appCheckProvider_,e),
        n.server_ = n.persistentConnection_
    }
    n.authTokenProvider_.addTokenChangeListener(i => {
        n.server_.refreshAuthToken(i)
    }
    ),
    n.appCheckProvider_.addTokenChangeListener(i => {
        n.server_.refreshAppCheckToken(i.token)
    }
    ),
    n.statsReporter_ = P_(n.repoInfo_, () => new Rg(n.stats_,n.server_)),
    n.infoData_ = new Tg,
    n.infoSyncTree_ = new fc({
        startListening: (i, s, r, a) => {
            let l = [];
            const h = n.infoData_.getNode(i._path);
            return h.isEmpty() || (l = Pi(n.infoSyncTree_, i._path, h),
            setTimeout( () => {
                a("ok")
            }
            , 0)),
            l
        }
        ,
        stopListening: () => {}
    }),
    Ho(n, "connected", !1),
    n.serverSyncTree_ = new fc({
        startListening: (i, s, r, a) => (n.server_.listen(i, r, s, (l, h) => {
            const d = a(l, h);
            Ce(n.eventQueue_, i._path, d)
        }
        ),
        []),
        stopListening: (i, s) => {
            n.server_.unlisten(i, s)
        }
    })
}
function Hm(n) {
    const e = n.infoData_.getNode(new Z(".info/serverTimeOffset")).val() || 0;
    return new Date().getTime() + e
}
function xu(n) {
    return Rm({
        timestamp: Hm(n)
    })
}
function _c(n, t, e, i, s) {
    n.dataUpdateCount++;
    const r = new Z(t);
    e = n.interceptServerDataCallback_ ? n.interceptServerDataCallback_(t, e) : e;
    let a = [];
    if (s)
        if (i) {
            const h = _s(e, d => Tt(d));
            a = vm(n.serverSyncTree_, r, h, s)
        } else {
            const h = Tt(e);
            a = Tu(n.serverSyncTree_, r, h, s)
        }
    else if (i) {
        const h = _s(e, d => Tt(d));
        a = gm(n.serverSyncTree_, r, h)
    } else {
        const h = Tt(e);
        a = Pi(n.serverSyncTree_, r, h)
    }
    let l = r;
    a.length > 0 && (l = Yo(n, r)),
    Ce(n.eventQueue_, l, a)
}
function gc(n, t) {
    Ho(n, "connected", t),
    t === !1 && Xm(n)
}
function Km(n, t) {
    Mt(t, (e, i) => {
        Ho(n, e, i)
    }
    )
}
function Ho(n, t, e) {
    const i = new Z("/.info/" + t)
      , s = Tt(e);
    n.infoData_.updateSnapshot(i, s);
    const r = Pi(n.infoSyncTree_, i, s);
    Ce(n.eventQueue_, i, r)
}
function Qm(n) {
    return n.nextWriteId_++
}
function Ym(n, t, e) {
    const i = Tm(n.serverSyncTree_, t);
    return i != null ? Promise.resolve(i) : n.server_.get(t).then(s => {
        const r = Tt(s).withIndex(t._queryParams.getIndex());
        Em(n.serverSyncTree_, t, e, !0);
        let a;
        if (t._queryParams.loadsAllData())
            a = Pi(n.serverSyncTree_, t._path, r);
        else {
            const l = yi(n.serverSyncTree_, t);
            a = Tu(n.serverSyncTree_, t._path, r, l)
        }
        return Ce(n.eventQueue_, t._path, a),
        Eu(n.serverSyncTree_, t, e, null, !0),
        r
    }
    , s => (Ko(n, "get for query " + ft(t) + " failed: " + s),
    Promise.reject(new Error(s))))
}
function Xm(n) {
    Ko(n, "onDisconnectEvents");
    const t = xu(n)
      , e = Ts();
    Kr(n.onDisconnect_, K(), (s, r) => {
        const a = bm(s, r, n.serverSyncTree_, t);
        su(e, s, a)
    }
    );
    let i = [];
    Kr(e, K(), (s, r) => {
        i = i.concat(Pi(n.serverSyncTree_, s, r));
        const a = ey(n, s);
        Yo(n, a)
    }
    ),
    n.onDisconnect_ = Ts(),
    Ce(n.eventQueue_, K(), i)
}
function Jm(n) {
    n.persistentConnection_ && n.persistentConnection_.interrupt($m)
}
function Ko(n, ...t) {
    let e = "";
    n.persistentConnection_ && (e = n.persistentConnection_.id + ":"),
    Nt(e, ...t)
}
function Vu(n, t, e) {
    return Iu(n.serverSyncTree_, t, e) || L.EMPTY_NODE
}
function Qo(n, t=n.transactionQueueTree_) {
    if (t || qs(n, t),
    In(t)) {
        const e = Mu(n, t);
        N(e.length > 0, "Sending zero length transaction queue"),
        e.every(s => s.status === 0) && Zm(n, Ni(t), e)
    } else
        Su(t) && Bs(t, e => {
            Qo(n, e)
        }
        )
}
function Zm(n, t, e) {
    const i = e.map(d => d.currentWriteId)
      , s = Vu(n, t, i);
    let r = s;
    const a = s.hash();
    for (let d = 0; d < e.length; d++) {
        const f = e[d];
        N(f.status === 0, "tryToSendTransactionQueue_: items in queue should all be run."),
        f.status = 1,
        f.retryCount++;
        const _ = Ot(t, f.path);
        r = r.updateChild(_, f.currentOutputSnapshotRaw)
    }
    const l = r.val(!0)
      , h = t;
    n.server_.put(h.toString(), l, d => {
        Ko(n, "transaction put response", {
            path: h.toString(),
            status: d
        });
        let f = [];
        if (d === "ok") {
            const _ = [];
            for (let m = 0; m < e.length; m++)
                e[m].status = 2,
                f = f.concat(tn(n.serverSyncTree_, e[m].currentWriteId)),
                e[m].onComplete && _.push( () => e[m].onComplete(null, !0, e[m].currentOutputSnapshotResolved)),
                e[m].unwatcher();
            qs(n, Go(n.transactionQueueTree_, t)),
            Qo(n, n.transactionQueueTree_),
            Ce(n.eventQueue_, t, f);
            for (let m = 0; m < _.length; m++)
                Ri(_[m])
        } else {
            if (d === "datastale")
                for (let _ = 0; _ < e.length; _++)
                    e[_].status === 3 ? e[_].status = 4 : e[_].status = 0;
            else {
                Ut("transaction at " + h.toString() + " failed: " + d);
                for (let _ = 0; _ < e.length; _++)
                    e[_].status = 4,
                    e[_].abortReason = d
            }
            Yo(n, t)
        }
    }
    , a)
}
function Yo(n, t) {
    const e = Ou(n, t)
      , i = Ni(e)
      , s = Mu(n, e);
    return ty(n, s, i),
    i
}
function ty(n, t, e) {
    if (t.length === 0)
        return;
    const i = [];
    let s = [];
    const a = t.filter(l => l.status === 0).map(l => l.currentWriteId);
    for (let l = 0; l < t.length; l++) {
        const h = t[l]
          , d = Ot(e, h.path);
        let f = !1, _;
        if (N(d !== null, "rerunTransactionsUnderNode_: relativePath should not be null."),
        h.status === 4)
            f = !0,
            _ = h.abortReason,
            s = s.concat(tn(n.serverSyncTree_, h.currentWriteId, !0));
        else if (h.status === 0)
            if (h.retryCount >= Wm)
                f = !0,
                _ = "maxretry",
                s = s.concat(tn(n.serverSyncTree_, h.currentWriteId, !0));
            else {
                const m = Vu(n, h.path, a);
                h.currentInputSnapshot = m;
                const A = t[l].update(m.val());
                if (A !== void 0) {
                    Du("transaction failed: Data returned ", A, h.path);
                    let S = Tt(A);
                    typeof A == "object" && A != null && re(A, ".priority") || (S = S.updatePriority(m.getPriority()));
                    const k = h.currentWriteId
                      , Y = xu(n)
                      , X = Nm(S, m, Y);
                    h.currentOutputSnapshotRaw = S,
                    h.currentOutputSnapshotResolved = X,
                    h.currentWriteId = Qm(n),
                    a.splice(a.indexOf(k), 1),
                    s = s.concat(_m(n.serverSyncTree_, h.path, X, h.currentWriteId, h.applyLocally)),
                    s = s.concat(tn(n.serverSyncTree_, k, !0))
                } else
                    f = !0,
                    _ = "nodata",
                    s = s.concat(tn(n.serverSyncTree_, h.currentWriteId, !0))
            }
        Ce(n.eventQueue_, e, s),
        s = [],
        f && (t[l].status = 2,
        function(m) {
            setTimeout(m, Math.floor(0))
        }(t[l].unwatcher),
        t[l].onComplete && (_ === "nodata" ? i.push( () => t[l].onComplete(null, !1, t[l].currentInputSnapshot)) : i.push( () => t[l].onComplete(new Error(_), !1, null))))
    }
    qs(n, n.transactionQueueTree_);
    for (let l = 0; l < i.length; l++)
        Ri(i[l]);
    Qo(n, n.transactionQueueTree_)
}
function Ou(n, t) {
    let e, i = n.transactionQueueTree_;
    for (e = j(t); e !== null && In(i) === void 0; )
        i = Go(i, e),
        t = et(t),
        e = j(t);
    return i
}
function Mu(n, t) {
    const e = [];
    return Lu(n, t, e),
    e.sort( (i, s) => i.order - s.order),
    e
}
function Lu(n, t, e) {
    const i = In(t);
    if (i)
        for (let s = 0; s < i.length; s++)
            e.push(i[s]);
    Bs(t, s => {
        Lu(n, s, e)
    }
    )
}
function qs(n, t) {
    const e = In(t);
    if (e) {
        let i = 0;
        for (let s = 0; s < e.length; s++)
            e[s].status !== 2 && (e[i] = e[s],
            i++);
        e.length = i,
        Ru(t, e.length > 0 ? e : void 0)
    }
    Bs(t, i => {
        qs(n, i)
    }
    )
}
function ey(n, t) {
    const e = Ni(Ou(n, t))
      , i = Go(n.transactionQueueTree_, t);
    return km(i, s => {
        kr(n, s)
    }
    ),
    kr(n, i),
    Pu(i, s => {
        kr(n, s)
    }
    ),
    e
}
function kr(n, t) {
    const e = In(t);
    if (e) {
        const i = [];
        let s = []
          , r = -1;
        for (let a = 0; a < e.length; a++)
            e[a].status === 3 || (e[a].status === 1 ? (N(r === a - 1, "All SENT items should be at beginning of queue."),
            r = a,
            e[a].status = 3,
            e[a].abortReason = "set") : (N(e[a].status === 0, "Unexpected transaction status in abort"),
            e[a].unwatcher(),
            s = s.concat(tn(n.serverSyncTree_, e[a].currentWriteId, !0)),
            e[a].onComplete && i.push(e[a].onComplete.bind(null, new Error("set"), !1, null))));
        r === -1 ? Ru(t, void 0) : e.length = r + 1,
        Ce(n.eventQueue_, Ni(t), s);
        for (let a = 0; a < i.length; a++)
            Ri(i[a])
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ny(n) {
    let t = "";
    const e = n.split("/");
    for (let i = 0; i < e.length; i++)
        if (e[i].length > 0) {
            let s = e[i];
            try {
                s = decodeURIComponent(s.replace(/\+/g, " "))
            } catch {}
            t += "/" + s
        }
    return t
}
function iy(n) {
    const t = {};
    n.charAt(0) === "?" && (n = n.substring(1));
    for (const e of n.split("&")) {
        if (e.length === 0)
            continue;
        const i = e.split("=");
        i.length === 2 ? t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]) : Ut(`Invalid query segment '${e}' in query '${n}'`)
    }
    return t
}
const mc = function(n, t) {
    const e = sy(n)
      , i = e.namespace;
    e.domain === "firebase.com" && ie(e.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),
    (!i || i === "undefined") && e.domain !== "localhost" && ie("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),
    e.secure || p_();
    const s = e.scheme === "ws" || e.scheme === "wss";
    return {
        repoInfo: new Fh(e.host,e.secure,i,s,t,"",i !== e.subdomain),
        path: new Z(e.pathString)
    }
}
  , sy = function(n) {
    let t = ""
      , e = ""
      , i = ""
      , s = ""
      , r = ""
      , a = !0
      , l = "https"
      , h = 443;
    if (typeof n == "string") {
        let d = n.indexOf("//");
        d >= 0 && (l = n.substring(0, d - 1),
        n = n.substring(d + 2));
        let f = n.indexOf("/");
        f === -1 && (f = n.length);
        let _ = n.indexOf("?");
        _ === -1 && (_ = n.length),
        t = n.substring(0, Math.min(f, _)),
        f < _ && (s = ny(n.substring(f, _)));
        const m = iy(n.substring(Math.min(n.length, _)));
        d = t.indexOf(":"),
        d >= 0 ? (a = l === "https" || l === "wss",
        h = parseInt(t.substring(d + 1), 10)) : d = t.length;
        const A = t.slice(0, d);
        if (A.toLowerCase() === "localhost")
            e = "localhost";
        else if (A.split(".").length <= 2)
            e = A;
        else {
            const S = t.indexOf(".");
            i = t.substring(0, S).toLowerCase(),
            e = t.substring(S + 1),
            r = i
        }
        "ns"in m && (r = m.ns)
    }
    return {
        host: t,
        port: h,
        domain: e,
        subdomain: i,
        secure: a,
        scheme: l,
        pathString: s,
        namespace: r
    }
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ry {
    constructor(t, e, i, s) {
        this.eventType = t,
        this.eventRegistration = e,
        this.snapshot = i,
        this.prevName = s
    }
    getPath() {
        const t = this.snapshot.ref;
        return this.eventType === "value" ? t._path : t.parent._path
    }
    getEventType() {
        return this.eventType
    }
    getEventRunner() {
        return this.eventRegistration.getEventRunner(this)
    }
    toString() {
        return this.getPath().toString() + ":" + this.eventType + ":" + ft(this.snapshot.exportVal())
    }
}
class oy {
    constructor(t, e, i) {
        this.eventRegistration = t,
        this.error = e,
        this.path = i
    }
    getPath() {
        return this.path
    }
    getEventType() {
        return "cancel"
    }
    getEventRunner() {
        return this.eventRegistration.getEventRunner(this)
    }
    toString() {
        return this.path.toString() + ":cancel"
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ay {
    constructor(t, e) {
        this.snapshotCallback = t,
        this.cancelCallback = e
    }
    onValue(t, e) {
        this.snapshotCallback.call(null, t, e)
    }
    onCancel(t) {
        return N(this.hasCancelCallback, "Raising a cancel event on a listener with no cancel callback"),
        this.cancelCallback.call(null, t)
    }
    get hasCancelCallback() {
        return !!this.cancelCallback
    }
    matches(t) {
        return this.snapshotCallback === t.snapshotCallback || this.snapshotCallback.userCallback !== void 0 && this.snapshotCallback.userCallback === t.snapshotCallback.userCallback && this.snapshotCallback.context === t.snapshotCallback.context
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Xo {
    constructor(t, e, i, s) {
        this._repo = t,
        this._path = e,
        this._queryParams = i,
        this._orderByCalled = s
    }
    get key() {
        return q(this._path) ? null : Hh(this._path)
    }
    get ref() {
        return new oe(this._repo,this._path)
    }
    get _queryIdentifier() {
        const t = nc(this._queryParams)
          , e = Ao(t);
        return e === "{}" ? "default" : e
    }
    get _queryObject() {
        return nc(this._queryParams)
    }
    isEqual(t) {
        if (t = ne(t),
        !(t instanceof Xo))
            return !1;
        const e = this._repo === t._repo
          , i = Yh(this._path, t._path)
          , s = this._queryIdentifier === t._queryIdentifier;
        return e && i && s
    }
    toJSON() {
        return this.toString()
    }
    toString() {
        return this._repo.toString() + X_(this._path)
    }
}
class oe extends Xo {
    constructor(t, e) {
        super(t, e, new ko, !1)
    }
    get parent() {
        const t = Qh(this._path);
        return t === null ? null : new oe(this._repo,t)
    }
    get root() {
        let t = this;
        for (; t.parent !== null; )
            t = t.parent;
        return t
    }
}
class vi {
    constructor(t, e, i) {
        this._node = t,
        this.ref = e,
        this._index = i
    }
    get priority() {
        return this._node.getPriority().val()
    }
    get key() {
        return this.ref.key
    }
    get size() {
        return this._node.numChildren()
    }
    child(t) {
        const e = new Z(t)
          , i = to(this.ref, t);
        return new vi(this._node.getChild(e),i,ot)
    }
    exists() {
        return !this._node.isEmpty()
    }
    exportVal() {
        return this._node.val(!0)
    }
    forEach(t) {
        return this._node.isLeafNode() ? !1 : !!this._node.forEachChild(this._index, (i, s) => t(new vi(s,to(this.ref, i),ot)))
    }
    hasChild(t) {
        const e = new Z(t);
        return !this._node.getChild(e).isEmpty()
    }
    hasChildren() {
        return this._node.isLeafNode() ? !1 : !this._node.isEmpty()
    }
    toJSON() {
        return this.exportVal()
    }
    val() {
        return this._node.val()
    }
}
function ly(n, t) {
    return n = ne(n),
    n._checkNotDeleted("ref"),
    n._root
}
function to(n, t) {
    return n = ne(n),
    j(n._path) === null ? Lm("child", "path", t) : ku("child", "path", t),
    new oe(n._repo,pt(n._path, t))
}
function cy(n) {
    n = ne(n);
    const t = new ay( () => {}
    )
      , e = new Jo(t);
    return Ym(n._repo, n, e).then(i => new vi(i,new oe(n._repo,n._path),n._queryParams.getIndex()))
}
class Jo {
    constructor(t) {
        this.callbackContext = t
    }
    respondsTo(t) {
        return t === "value"
    }
    createEvent(t, e) {
        const i = e._queryParams.getIndex();
        return new ry("value",this,new vi(t.snapshotNode,new oe(e._repo,e._path),i))
    }
    getEventRunner(t) {
        return t.getEventType() === "cancel" ? () => this.callbackContext.onCancel(t.error) : () => this.callbackContext.onValue(t.snapshot, null)
    }
    createCancelEvent(t, e) {
        return this.callbackContext.hasCancelCallback ? new oy(this,t,e) : null
    }
    matches(t) {
        return t instanceof Jo ? !t.callbackContext || !this.callbackContext ? !0 : t.callbackContext.matches(this.callbackContext) : !1
    }
    hasAnyCallback() {
        return this.callbackContext !== null
    }
}
am(oe);
dm(oe);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const hy = "FIREBASE_DATABASE_EMULATOR_HOST"
  , eo = {};
let uy = !1;
function dy(n, t, e, i) {
    n.repoInfo_ = new Fh(`${t}:${e}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),
    i && (n.authTokenProvider_ = i)
}
function fy(n, t, e, i, s) {
    let r = i || n.options.databaseURL;
    r === void 0 && (n.options.projectId || ie("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),
    Nt("Using default host for project ", n.options.projectId),
    r = `${n.options.projectId}-default-rtdb.firebaseio.com`);
    let a = mc(r, s), l = a.repoInfo, h;
    typeof process < "u" && Fl && (h = Fl[hy]),
    h ? (r = `http://${h}?ns=${l.namespace}`,
    a = mc(r, s),
    l = a.repoInfo) : a.repoInfo.secure;
    const d = new A_(n.name,n.options,t);
    Fm("Invalid Firebase Database URL", a),
    q(a.path) || ie("Database URL must point to the root of a Firebase Database (not including a child path).");
    const f = _y(l, n, d, new C_(n.name,e));
    return new gy(f,n)
}
function py(n, t) {
    const e = eo[t];
    (!e || e[n.key] !== n) && ie(`Database ${t}(${n.repoInfo_}) has already been deleted.`),
    Jm(n),
    delete e[n.key]
}
function _y(n, t, e, i) {
    let s = eo[t.name];
    s || (s = {},
    eo[t.name] = s);
    let r = s[n.toURLString()];
    return r && ie("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),
    r = new zm(n,uy,e,i),
    s[n.toURLString()] = r,
    r
}
class gy {
    constructor(t, e) {
        this._repoInternal = t,
        this.app = e,
        this.type = "database",
        this._instanceStarted = !1
    }
    get _repo() {
        return this._instanceStarted || (Gm(this._repoInternal, this.app.options.appId, this.app.options.databaseAuthVariableOverride),
        this._instanceStarted = !0),
        this._repoInternal
    }
    get _root() {
        return this._rootInternal || (this._rootInternal = new oe(this._repo,K())),
        this._rootInternal
    }
    _delete() {
        return this._rootInternal !== null && (py(this._repo, this.app.name),
        this._repoInternal = null,
        this._rootInternal = null),
        Promise.resolve()
    }
    _checkNotDeleted(t) {
        this._rootInternal === null && ie("Cannot call " + t + " on a deleted database.")
    }
}
function my(n=Eh(), t) {
    const e = yh(n, "database").getImmediate({
        identifier: t
    });
    if (!e._instanceStarted) {
        const i = ah("database");
        i && yy(e, ...i)
    }
    return e
}
function yy(n, t, e, i={}) {
    n = ne(n),
    n._checkNotDeleted("useEmulator"),
    n._instanceStarted && ie("Cannot call useEmulator() after instance has already been initialized.");
    const s = n._repoInternal;
    let r;
    if (s.repoInfo_.nodeAdmin)
        i.mockUserToken && ie('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),
        r = new ls(ls.OWNER);
    else if (i.mockUserToken) {
        const a = typeof i.mockUserToken == "string" ? i.mockUserToken : ch(i.mockUserToken, n.app.options.projectId);
        r = new ls(a)
    }
    dy(s, t, e, r)
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function vy(n) {
    l_(vh),
    hi(new ln("database", (t, {instanceIdentifier: e}) => {
        const i = t.getProvider("app").getImmediate()
          , s = t.getProvider("auth-internal")
          , r = t.getProvider("app-check-internal");
        return fy(i, s, r, e)
    }
    ,"PUBLIC").setMultipleInstances(!0)),
    xe(Ul, Bl, n),
    xe(Ul, Bl, "esm2017")
}
ee.prototype.simpleListen = function(n, t) {
    this.sendRequest("q", {
        p: n
    }, t)
}
;
ee.prototype.echo = function(n, t) {
    this.sendRequest("echo", {
        d: n
    }, t)
}
;
vy();
var yc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/
var Ve, Fu;
(function() {
    var n;
    /** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    function t(I, g) {
        function v() {}
        v.prototype = g.prototype,
        I.D = g.prototype,
        I.prototype = new v,
        I.prototype.constructor = I,
        I.C = function(E, T, C) {
            for (var y = Array(arguments.length - 2), Xt = 2; Xt < arguments.length; Xt++)
                y[Xt - 2] = arguments[Xt];
            return g.prototype[T].apply(E, y)
        }
    }
    function e() {
        this.blockSize = -1
    }
    function i() {
        this.blockSize = -1,
        this.blockSize = 64,
        this.g = Array(4),
        this.B = Array(this.blockSize),
        this.o = this.h = 0,
        this.s()
    }
    t(i, e),
    i.prototype.s = function() {
        this.g[0] = 1732584193,
        this.g[1] = 4023233417,
        this.g[2] = 2562383102,
        this.g[3] = 271733878,
        this.o = this.h = 0
    }
    ;
    function s(I, g, v) {
        v || (v = 0);
        var E = Array(16);
        if (typeof g == "string")
            for (var T = 0; 16 > T; ++T)
                E[T] = g.charCodeAt(v++) | g.charCodeAt(v++) << 8 | g.charCodeAt(v++) << 16 | g.charCodeAt(v++) << 24;
        else
            for (T = 0; 16 > T; ++T)
                E[T] = g[v++] | g[v++] << 8 | g[v++] << 16 | g[v++] << 24;
        g = I.g[0],
        v = I.g[1],
        T = I.g[2];
        var C = I.g[3]
          , y = g + (C ^ v & (T ^ C)) + E[0] + 3614090360 & 4294967295;
        g = v + (y << 7 & 4294967295 | y >>> 25),
        y = C + (T ^ g & (v ^ T)) + E[1] + 3905402710 & 4294967295,
        C = g + (y << 12 & 4294967295 | y >>> 20),
        y = T + (v ^ C & (g ^ v)) + E[2] + 606105819 & 4294967295,
        T = C + (y << 17 & 4294967295 | y >>> 15),
        y = v + (g ^ T & (C ^ g)) + E[3] + 3250441966 & 4294967295,
        v = T + (y << 22 & 4294967295 | y >>> 10),
        y = g + (C ^ v & (T ^ C)) + E[4] + 4118548399 & 4294967295,
        g = v + (y << 7 & 4294967295 | y >>> 25),
        y = C + (T ^ g & (v ^ T)) + E[5] + 1200080426 & 4294967295,
        C = g + (y << 12 & 4294967295 | y >>> 20),
        y = T + (v ^ C & (g ^ v)) + E[6] + 2821735955 & 4294967295,
        T = C + (y << 17 & 4294967295 | y >>> 15),
        y = v + (g ^ T & (C ^ g)) + E[7] + 4249261313 & 4294967295,
        v = T + (y << 22 & 4294967295 | y >>> 10),
        y = g + (C ^ v & (T ^ C)) + E[8] + 1770035416 & 4294967295,
        g = v + (y << 7 & 4294967295 | y >>> 25),
        y = C + (T ^ g & (v ^ T)) + E[9] + 2336552879 & 4294967295,
        C = g + (y << 12 & 4294967295 | y >>> 20),
        y = T + (v ^ C & (g ^ v)) + E[10] + 4294925233 & 4294967295,
        T = C + (y << 17 & 4294967295 | y >>> 15),
        y = v + (g ^ T & (C ^ g)) + E[11] + 2304563134 & 4294967295,
        v = T + (y << 22 & 4294967295 | y >>> 10),
        y = g + (C ^ v & (T ^ C)) + E[12] + 1804603682 & 4294967295,
        g = v + (y << 7 & 4294967295 | y >>> 25),
        y = C + (T ^ g & (v ^ T)) + E[13] + 4254626195 & 4294967295,
        C = g + (y << 12 & 4294967295 | y >>> 20),
        y = T + (v ^ C & (g ^ v)) + E[14] + 2792965006 & 4294967295,
        T = C + (y << 17 & 4294967295 | y >>> 15),
        y = v + (g ^ T & (C ^ g)) + E[15] + 1236535329 & 4294967295,
        v = T + (y << 22 & 4294967295 | y >>> 10),
        y = g + (T ^ C & (v ^ T)) + E[1] + 4129170786 & 4294967295,
        g = v + (y << 5 & 4294967295 | y >>> 27),
        y = C + (v ^ T & (g ^ v)) + E[6] + 3225465664 & 4294967295,
        C = g + (y << 9 & 4294967295 | y >>> 23),
        y = T + (g ^ v & (C ^ g)) + E[11] + 643717713 & 4294967295,
        T = C + (y << 14 & 4294967295 | y >>> 18),
        y = v + (C ^ g & (T ^ C)) + E[0] + 3921069994 & 4294967295,
        v = T + (y << 20 & 4294967295 | y >>> 12),
        y = g + (T ^ C & (v ^ T)) + E[5] + 3593408605 & 4294967295,
        g = v + (y << 5 & 4294967295 | y >>> 27),
        y = C + (v ^ T & (g ^ v)) + E[10] + 38016083 & 4294967295,
        C = g + (y << 9 & 4294967295 | y >>> 23),
        y = T + (g ^ v & (C ^ g)) + E[15] + 3634488961 & 4294967295,
        T = C + (y << 14 & 4294967295 | y >>> 18),
        y = v + (C ^ g & (T ^ C)) + E[4] + 3889429448 & 4294967295,
        v = T + (y << 20 & 4294967295 | y >>> 12),
        y = g + (T ^ C & (v ^ T)) + E[9] + 568446438 & 4294967295,
        g = v + (y << 5 & 4294967295 | y >>> 27),
        y = C + (v ^ T & (g ^ v)) + E[14] + 3275163606 & 4294967295,
        C = g + (y << 9 & 4294967295 | y >>> 23),
        y = T + (g ^ v & (C ^ g)) + E[3] + 4107603335 & 4294967295,
        T = C + (y << 14 & 4294967295 | y >>> 18),
        y = v + (C ^ g & (T ^ C)) + E[8] + 1163531501 & 4294967295,
        v = T + (y << 20 & 4294967295 | y >>> 12),
        y = g + (T ^ C & (v ^ T)) + E[13] + 2850285829 & 4294967295,
        g = v + (y << 5 & 4294967295 | y >>> 27),
        y = C + (v ^ T & (g ^ v)) + E[2] + 4243563512 & 4294967295,
        C = g + (y << 9 & 4294967295 | y >>> 23),
        y = T + (g ^ v & (C ^ g)) + E[7] + 1735328473 & 4294967295,
        T = C + (y << 14 & 4294967295 | y >>> 18),
        y = v + (C ^ g & (T ^ C)) + E[12] + 2368359562 & 4294967295,
        v = T + (y << 20 & 4294967295 | y >>> 12),
        y = g + (v ^ T ^ C) + E[5] + 4294588738 & 4294967295,
        g = v + (y << 4 & 4294967295 | y >>> 28),
        y = C + (g ^ v ^ T) + E[8] + 2272392833 & 4294967295,
        C = g + (y << 11 & 4294967295 | y >>> 21),
        y = T + (C ^ g ^ v) + E[11] + 1839030562 & 4294967295,
        T = C + (y << 16 & 4294967295 | y >>> 16),
        y = v + (T ^ C ^ g) + E[14] + 4259657740 & 4294967295,
        v = T + (y << 23 & 4294967295 | y >>> 9),
        y = g + (v ^ T ^ C) + E[1] + 2763975236 & 4294967295,
        g = v + (y << 4 & 4294967295 | y >>> 28),
        y = C + (g ^ v ^ T) + E[4] + 1272893353 & 4294967295,
        C = g + (y << 11 & 4294967295 | y >>> 21),
        y = T + (C ^ g ^ v) + E[7] + 4139469664 & 4294967295,
        T = C + (y << 16 & 4294967295 | y >>> 16),
        y = v + (T ^ C ^ g) + E[10] + 3200236656 & 4294967295,
        v = T + (y << 23 & 4294967295 | y >>> 9),
        y = g + (v ^ T ^ C) + E[13] + 681279174 & 4294967295,
        g = v + (y << 4 & 4294967295 | y >>> 28),
        y = C + (g ^ v ^ T) + E[0] + 3936430074 & 4294967295,
        C = g + (y << 11 & 4294967295 | y >>> 21),
        y = T + (C ^ g ^ v) + E[3] + 3572445317 & 4294967295,
        T = C + (y << 16 & 4294967295 | y >>> 16),
        y = v + (T ^ C ^ g) + E[6] + 76029189 & 4294967295,
        v = T + (y << 23 & 4294967295 | y >>> 9),
        y = g + (v ^ T ^ C) + E[9] + 3654602809 & 4294967295,
        g = v + (y << 4 & 4294967295 | y >>> 28),
        y = C + (g ^ v ^ T) + E[12] + 3873151461 & 4294967295,
        C = g + (y << 11 & 4294967295 | y >>> 21),
        y = T + (C ^ g ^ v) + E[15] + 530742520 & 4294967295,
        T = C + (y << 16 & 4294967295 | y >>> 16),
        y = v + (T ^ C ^ g) + E[2] + 3299628645 & 4294967295,
        v = T + (y << 23 & 4294967295 | y >>> 9),
        y = g + (T ^ (v | ~C)) + E[0] + 4096336452 & 4294967295,
        g = v + (y << 6 & 4294967295 | y >>> 26),
        y = C + (v ^ (g | ~T)) + E[7] + 1126891415 & 4294967295,
        C = g + (y << 10 & 4294967295 | y >>> 22),
        y = T + (g ^ (C | ~v)) + E[14] + 2878612391 & 4294967295,
        T = C + (y << 15 & 4294967295 | y >>> 17),
        y = v + (C ^ (T | ~g)) + E[5] + 4237533241 & 4294967295,
        v = T + (y << 21 & 4294967295 | y >>> 11),
        y = g + (T ^ (v | ~C)) + E[12] + 1700485571 & 4294967295,
        g = v + (y << 6 & 4294967295 | y >>> 26),
        y = C + (v ^ (g | ~T)) + E[3] + 2399980690 & 4294967295,
        C = g + (y << 10 & 4294967295 | y >>> 22),
        y = T + (g ^ (C | ~v)) + E[10] + 4293915773 & 4294967295,
        T = C + (y << 15 & 4294967295 | y >>> 17),
        y = v + (C ^ (T | ~g)) + E[1] + 2240044497 & 4294967295,
        v = T + (y << 21 & 4294967295 | y >>> 11),
        y = g + (T ^ (v | ~C)) + E[8] + 1873313359 & 4294967295,
        g = v + (y << 6 & 4294967295 | y >>> 26),
        y = C + (v ^ (g | ~T)) + E[15] + 4264355552 & 4294967295,
        C = g + (y << 10 & 4294967295 | y >>> 22),
        y = T + (g ^ (C | ~v)) + E[6] + 2734768916 & 4294967295,
        T = C + (y << 15 & 4294967295 | y >>> 17),
        y = v + (C ^ (T | ~g)) + E[13] + 1309151649 & 4294967295,
        v = T + (y << 21 & 4294967295 | y >>> 11),
        y = g + (T ^ (v | ~C)) + E[4] + 4149444226 & 4294967295,
        g = v + (y << 6 & 4294967295 | y >>> 26),
        y = C + (v ^ (g | ~T)) + E[11] + 3174756917 & 4294967295,
        C = g + (y << 10 & 4294967295 | y >>> 22),
        y = T + (g ^ (C | ~v)) + E[2] + 718787259 & 4294967295,
        T = C + (y << 15 & 4294967295 | y >>> 17),
        y = v + (C ^ (T | ~g)) + E[9] + 3951481745 & 4294967295,
        I.g[0] = I.g[0] + g & 4294967295,
        I.g[1] = I.g[1] + (T + (y << 21 & 4294967295 | y >>> 11)) & 4294967295,
        I.g[2] = I.g[2] + T & 4294967295,
        I.g[3] = I.g[3] + C & 4294967295
    }
    i.prototype.u = function(I, g) {
        g === void 0 && (g = I.length);
        for (var v = g - this.blockSize, E = this.B, T = this.h, C = 0; C < g; ) {
            if (T == 0)
                for (; C <= v; )
                    s(this, I, C),
                    C += this.blockSize;
            if (typeof I == "string") {
                for (; C < g; )
                    if (E[T++] = I.charCodeAt(C++),
                    T == this.blockSize) {
                        s(this, E),
                        T = 0;
                        break
                    }
            } else
                for (; C < g; )
                    if (E[T++] = I[C++],
                    T == this.blockSize) {
                        s(this, E),
                        T = 0;
                        break
                    }
        }
        this.h = T,
        this.o += g
    }
    ,
    i.prototype.v = function() {
        var I = Array((56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h);
        I[0] = 128;
        for (var g = 1; g < I.length - 8; ++g)
            I[g] = 0;
        var v = 8 * this.o;
        for (g = I.length - 8; g < I.length; ++g)
            I[g] = v & 255,
            v /= 256;
        for (this.u(I),
        I = Array(16),
        g = v = 0; 4 > g; ++g)
            for (var E = 0; 32 > E; E += 8)
                I[v++] = this.g[g] >>> E & 255;
        return I
    }
    ;
    function r(I, g) {
        var v = l;
        return Object.prototype.hasOwnProperty.call(v, I) ? v[I] : v[I] = g(I)
    }
    function a(I, g) {
        this.h = g;
        for (var v = [], E = !0, T = I.length - 1; 0 <= T; T--) {
            var C = I[T] | 0;
            E && C == g || (v[T] = C,
            E = !1)
        }
        this.g = v
    }
    var l = {};
    function h(I) {
        return -128 <= I && 128 > I ? r(I, function(g) {
            return new a([g | 0],0 > g ? -1 : 0)
        }) : new a([I | 0],0 > I ? -1 : 0)
    }
    function d(I) {
        if (isNaN(I) || !isFinite(I))
            return _;
        if (0 > I)
            return k(d(-I));
        for (var g = [], v = 1, E = 0; I >= v; E++)
            g[E] = I / v | 0,
            v *= 4294967296;
        return new a(g,0)
    }
    function f(I, g) {
        if (I.length == 0)
            throw Error("number format error: empty string");
        if (g = g || 10,
        2 > g || 36 < g)
            throw Error("radix out of range: " + g);
        if (I.charAt(0) == "-")
            return k(f(I.substring(1), g));
        if (0 <= I.indexOf("-"))
            throw Error('number format error: interior "-" character');
        for (var v = d(Math.pow(g, 8)), E = _, T = 0; T < I.length; T += 8) {
            var C = Math.min(8, I.length - T)
              , y = parseInt(I.substring(T, T + C), g);
            8 > C ? (C = d(Math.pow(g, C)),
            E = E.j(C).add(d(y))) : (E = E.j(v),
            E = E.add(d(y)))
        }
        return E
    }
    var _ = h(0)
      , m = h(1)
      , A = h(16777216);
    n = a.prototype,
    n.m = function() {
        if (x(this))
            return -k(this).m();
        for (var I = 0, g = 1, v = 0; v < this.g.length; v++) {
            var E = this.i(v);
            I += (0 <= E ? E : 4294967296 + E) * g,
            g *= 4294967296
        }
        return I
    }
    ,
    n.toString = function(I) {
        if (I = I || 10,
        2 > I || 36 < I)
            throw Error("radix out of range: " + I);
        if (S(this))
            return "0";
        if (x(this))
            return "-" + k(this).toString(I);
        for (var g = d(Math.pow(I, 6)), v = this, E = ""; ; ) {
            var T = lt(v, g).g;
            v = Y(v, T.j(g));
            var C = ((0 < v.g.length ? v.g[0] : v.h) >>> 0).toString(I);
            if (v = T,
            S(v))
                return C + E;
            for (; 6 > C.length; )
                C = "0" + C;
            E = C + E
        }
    }
    ,
    n.i = function(I) {
        return 0 > I ? 0 : I < this.g.length ? this.g[I] : this.h
    }
    ;
    function S(I) {
        if (I.h != 0)
            return !1;
        for (var g = 0; g < I.g.length; g++)
            if (I.g[g] != 0)
                return !1;
        return !0
    }
    function x(I) {
        return I.h == -1
    }
    n.l = function(I) {
        return I = Y(this, I),
        x(I) ? -1 : S(I) ? 0 : 1
    }
    ;
    function k(I) {
        for (var g = I.g.length, v = [], E = 0; E < g; E++)
            v[E] = ~I.g[E];
        return new a(v,~I.h).add(m)
    }
    n.abs = function() {
        return x(this) ? k(this) : this
    }
    ,
    n.add = function(I) {
        for (var g = Math.max(this.g.length, I.g.length), v = [], E = 0, T = 0; T <= g; T++) {
            var C = E + (this.i(T) & 65535) + (I.i(T) & 65535)
              , y = (C >>> 16) + (this.i(T) >>> 16) + (I.i(T) >>> 16);
            E = y >>> 16,
            C &= 65535,
            y &= 65535,
            v[T] = y << 16 | C
        }
        return new a(v,v[v.length - 1] & -2147483648 ? -1 : 0)
    }
    ;
    function Y(I, g) {
        return I.add(k(g))
    }
    n.j = function(I) {
        if (S(this) || S(I))
            return _;
        if (x(this))
            return x(I) ? k(this).j(k(I)) : k(k(this).j(I));
        if (x(I))
            return k(this.j(k(I)));
        if (0 > this.l(A) && 0 > I.l(A))
            return d(this.m() * I.m());
        for (var g = this.g.length + I.g.length, v = [], E = 0; E < 2 * g; E++)
            v[E] = 0;
        for (E = 0; E < this.g.length; E++)
            for (var T = 0; T < I.g.length; T++) {
                var C = this.i(E) >>> 16
                  , y = this.i(E) & 65535
                  , Xt = I.i(T) >>> 16
                  , Sn = I.i(T) & 65535;
                v[2 * E + 2 * T] += y * Sn,
                X(v, 2 * E + 2 * T),
                v[2 * E + 2 * T + 1] += C * Sn,
                X(v, 2 * E + 2 * T + 1),
                v[2 * E + 2 * T + 1] += y * Xt,
                X(v, 2 * E + 2 * T + 1),
                v[2 * E + 2 * T + 2] += C * Xt,
                X(v, 2 * E + 2 * T + 2)
            }
        for (E = 0; E < g; E++)
            v[E] = v[2 * E + 1] << 16 | v[2 * E];
        for (E = g; E < 2 * g; E++)
            v[E] = 0;
        return new a(v,0)
    }
    ;
    function X(I, g) {
        for (; (I[g] & 65535) != I[g]; )
            I[g + 1] += I[g] >>> 16,
            I[g] &= 65535,
            g++
    }
    function tt(I, g) {
        this.g = I,
        this.h = g
    }
    function lt(I, g) {
        if (S(g))
            throw Error("division by zero");
        if (S(I))
            return new tt(_,_);
        if (x(I))
            return g = lt(k(I), g),
            new tt(k(g.g),k(g.h));
        if (x(g))
            return g = lt(I, k(g)),
            new tt(k(g.g),g.h);
        if (30 < I.g.length) {
            if (x(I) || x(g))
                throw Error("slowDivide_ only works with positive integers.");
            for (var v = m, E = g; 0 >= E.l(I); )
                v = Yt(v),
                E = Yt(E);
            var T = yt(v, 1)
              , C = yt(E, 1);
            for (E = yt(E, 2),
            v = yt(v, 2); !S(E); ) {
                var y = C.add(E);
                0 >= y.l(I) && (T = T.add(v),
                C = y),
                E = yt(E, 1),
                v = yt(v, 1)
            }
            return g = Y(I, T.j(g)),
            new tt(T,g)
        }
        for (T = _; 0 <= I.l(g); ) {
            for (v = Math.max(1, Math.floor(I.m() / g.m())),
            E = Math.ceil(Math.log(v) / Math.LN2),
            E = 48 >= E ? 1 : Math.pow(2, E - 48),
            C = d(v),
            y = C.j(g); x(y) || 0 < y.l(I); )
                v -= E,
                C = d(v),
                y = C.j(g);
            S(C) && (C = m),
            T = T.add(C),
            I = Y(I, y)
        }
        return new tt(T,I)
    }
    n.A = function(I) {
        return lt(this, I).h
    }
    ,
    n.and = function(I) {
        for (var g = Math.max(this.g.length, I.g.length), v = [], E = 0; E < g; E++)
            v[E] = this.i(E) & I.i(E);
        return new a(v,this.h & I.h)
    }
    ,
    n.or = function(I) {
        for (var g = Math.max(this.g.length, I.g.length), v = [], E = 0; E < g; E++)
            v[E] = this.i(E) | I.i(E);
        return new a(v,this.h | I.h)
    }
    ,
    n.xor = function(I) {
        for (var g = Math.max(this.g.length, I.g.length), v = [], E = 0; E < g; E++)
            v[E] = this.i(E) ^ I.i(E);
        return new a(v,this.h ^ I.h)
    }
    ;
    function Yt(I) {
        for (var g = I.g.length + 1, v = [], E = 0; E < g; E++)
            v[E] = I.i(E) << 1 | I.i(E - 1) >>> 31;
        return new a(v,I.h)
    }
    function yt(I, g) {
        var v = g >> 5;
        g %= 32;
        for (var E = I.g.length - v, T = [], C = 0; C < E; C++)
            T[C] = 0 < g ? I.i(C + v) >>> g | I.i(C + v + 1) << 32 - g : I.i(C + v);
        return new a(T,I.h)
    }
    i.prototype.digest = i.prototype.v,
    i.prototype.reset = i.prototype.s,
    i.prototype.update = i.prototype.u,
    Fu = i,
    a.prototype.add = a.prototype.add,
    a.prototype.multiply = a.prototype.j,
    a.prototype.modulo = a.prototype.A,
    a.prototype.compare = a.prototype.l,
    a.prototype.toNumber = a.prototype.m,
    a.prototype.toString = a.prototype.toString,
    a.prototype.getBits = a.prototype.i,
    a.fromNumber = d,
    a.fromString = f,
    Ve = a
}
).apply(typeof yc < "u" ? yc : typeof self < "u" ? self : typeof window < "u" ? window : {});
var is = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/
var Uu, Bu, Xn, qu, hs, no, ju, $u, Wu;
(function() {
    var n, t = typeof Object.defineProperties == "function" ? Object.defineProperty : function(o, c, u) {
        return o == Array.prototype || o == Object.prototype || (o[c] = u.value),
        o
    }
    ;
    function e(o) {
        o = [typeof globalThis == "object" && globalThis, o, typeof window == "object" && window, typeof self == "object" && self, typeof is == "object" && is];
        for (var c = 0; c < o.length; ++c) {
            var u = o[c];
            if (u && u.Math == Math)
                return u
        }
        throw Error("Cannot find global object")
    }
    var i = e(this);
    function s(o, c) {
        if (c)
            t: {
                var u = i;
                o = o.split(".");
                for (var p = 0; p < o.length - 1; p++) {
                    var w = o[p];
                    if (!(w in u))
                        break t;
                    u = u[w]
                }
                o = o[o.length - 1],
                p = u[o],
                c = c(p),
                c != p && c != null && t(u, o, {
                    configurable: !0,
                    writable: !0,
                    value: c
                })
            }
    }
    function r(o, c) {
        o instanceof String && (o += "");
        var u = 0
          , p = !1
          , w = {
            next: function() {
                if (!p && u < o.length) {
                    var R = u++;
                    return {
                        value: c(R, o[R]),
                        done: !1
                    }
                }
                return p = !0,
                {
                    done: !0,
                    value: void 0
                }
            }
        };
        return w[Symbol.iterator] = function() {
            return w
        }
        ,
        w
    }
    s("Array.prototype.values", function(o) {
        return o || function() {
            return r(this, function(c, u) {
                return u
            })
        }
    });
    /** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var a = a || {}
      , l = this || self;
    function h(o) {
        var c = typeof o;
        return c = c != "object" ? c : o ? Array.isArray(o) ? "array" : c : "null",
        c == "array" || c == "object" && typeof o.length == "number"
    }
    function d(o) {
        var c = typeof o;
        return c == "object" && o != null || c == "function"
    }
    function f(o, c, u) {
        return o.call.apply(o.bind, arguments)
    }
    function _(o, c, u) {
        if (!o)
            throw Error();
        if (2 < arguments.length) {
            var p = Array.prototype.slice.call(arguments, 2);
            return function() {
                var w = Array.prototype.slice.call(arguments);
                return Array.prototype.unshift.apply(w, p),
                o.apply(c, w)
            }
        }
        return function() {
            return o.apply(c, arguments)
        }
    }
    function m(o, c, u) {
        return m = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? f : _,
        m.apply(null, arguments)
    }
    function A(o, c) {
        var u = Array.prototype.slice.call(arguments, 1);
        return function() {
            var p = u.slice();
            return p.push.apply(p, arguments),
            o.apply(this, p)
        }
    }
    function S(o, c) {
        function u() {}
        u.prototype = c.prototype,
        o.aa = c.prototype,
        o.prototype = new u,
        o.prototype.constructor = o,
        o.Qb = function(p, w, R) {
            for (var D = Array(arguments.length - 2), J = 2; J < arguments.length; J++)
                D[J - 2] = arguments[J];
            return c.prototype[w].apply(p, D)
        }
    }
    function x(o) {
        const c = o.length;
        if (0 < c) {
            const u = Array(c);
            for (let p = 0; p < c; p++)
                u[p] = o[p];
            return u
        }
        return []
    }
    function k(o, c) {
        for (let u = 1; u < arguments.length; u++) {
            const p = arguments[u];
            if (h(p)) {
                const w = o.length || 0
                  , R = p.length || 0;
                o.length = w + R;
                for (let D = 0; D < R; D++)
                    o[w + D] = p[D]
            } else
                o.push(p)
        }
    }
    class Y {
        constructor(c, u) {
            this.i = c,
            this.j = u,
            this.h = 0,
            this.g = null
        }
        get() {
            let c;
            return 0 < this.h ? (this.h--,
            c = this.g,
            this.g = c.next,
            c.next = null) : c = this.i(),
            c
        }
    }
    function X(o) {
        return /^[\s\xa0]*$/.test(o)
    }
    function tt() {
        var o = l.navigator;
        return o && (o = o.userAgent) ? o : ""
    }
    function lt(o) {
        return lt[" "](o),
        o
    }
    lt[" "] = function() {}
    ;
    var Yt = tt().indexOf("Gecko") != -1 && !(tt().toLowerCase().indexOf("webkit") != -1 && tt().indexOf("Edge") == -1) && !(tt().indexOf("Trident") != -1 || tt().indexOf("MSIE") != -1) && tt().indexOf("Edge") == -1;
    function yt(o, c, u) {
        for (const p in o)
            c.call(u, o[p], p, o)
    }
    function I(o, c) {
        for (const u in o)
            c.call(void 0, o[u], u, o)
    }
    function g(o) {
        const c = {};
        for (const u in o)
            c[u] = o[u];
        return c
    }
    const v = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function E(o, c) {
        let u, p;
        for (let w = 1; w < arguments.length; w++) {
            p = arguments[w];
            for (u in p)
                o[u] = p[u];
            for (let R = 0; R < v.length; R++)
                u = v[R],
                Object.prototype.hasOwnProperty.call(p, u) && (o[u] = p[u])
        }
    }
    function T(o) {
        var c = 1;
        o = o.split(":");
        const u = [];
        for (; 0 < c && o.length; )
            u.push(o.shift()),
            c--;
        return o.length && u.push(o.join(":")),
        u
    }
    function C(o) {
        l.setTimeout( () => {
            throw o
        }
        , 0)
    }
    function y() {
        var o = Js;
        let c = null;
        return o.g && (c = o.g,
        o.g = o.g.next,
        o.g || (o.h = null),
        c.next = null),
        c
    }
    class Xt {
        constructor() {
            this.h = this.g = null
        }
        add(c, u) {
            const p = Sn.get();
            p.set(c, u),
            this.h ? this.h.next = p : this.g = p,
            this.h = p
        }
    }
    var Sn = new Y( () => new Hd,o => o.reset());
    class Hd {
        constructor() {
            this.next = this.g = this.h = null
        }
        set(c, u) {
            this.h = c,
            this.g = u,
            this.next = null
        }
        reset() {
            this.next = this.g = this.h = null
        }
    }
    let Pn, bn = !1, Js = new Xt, Sa = () => {
        const o = l.Promise.resolve(void 0);
        Pn = () => {
            o.then(Kd)
        }
    }
    ;
    var Kd = () => {
        for (var o; o = y(); ) {
            try {
                o.h.call(o.g)
            } catch (u) {
                C(u)
            }
            var c = Sn;
            c.j(o),
            100 > c.h && (c.h++,
            o.next = c.g,
            c.g = o)
        }
        bn = !1
    }
    ;
    function le() {
        this.s = this.s,
        this.C = this.C
    }
    le.prototype.s = !1,
    le.prototype.ma = function() {
        this.s || (this.s = !0,
        this.N())
    }
    ,
    le.prototype.N = function() {
        if (this.C)
            for (; this.C.length; )
                this.C.shift()()
    }
    ;
    function Ct(o, c) {
        this.type = o,
        this.g = this.target = c,
        this.defaultPrevented = !1
    }
    Ct.prototype.h = function() {
        this.defaultPrevented = !0
    }
    ;
    var Qd = function() {
        if (!l.addEventListener || !Object.defineProperty)
            return !1;
        var o = !1
          , c = Object.defineProperty({}, "passive", {
            get: function() {
                o = !0
            }
        });
        try {
            const u = () => {}
            ;
            l.addEventListener("test", u, c),
            l.removeEventListener("test", u, c)
        } catch {}
        return o
    }();
    function Nn(o, c) {
        if (Ct.call(this, o ? o.type : ""),
        this.relatedTarget = this.g = this.target = null,
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0,
        this.key = "",
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1,
        this.state = null,
        this.pointerId = 0,
        this.pointerType = "",
        this.i = null,
        o) {
            var u = this.type = o.type
              , p = o.changedTouches && o.changedTouches.length ? o.changedTouches[0] : null;
            if (this.target = o.target || o.srcElement,
            this.g = c,
            c = o.relatedTarget) {
                if (Yt) {
                    t: {
                        try {
                            lt(c.nodeName);
                            var w = !0;
                            break t
                        } catch {}
                        w = !1
                    }
                    w || (c = null)
                }
            } else
                u == "mouseover" ? c = o.fromElement : u == "mouseout" && (c = o.toElement);
            this.relatedTarget = c,
            p ? (this.clientX = p.clientX !== void 0 ? p.clientX : p.pageX,
            this.clientY = p.clientY !== void 0 ? p.clientY : p.pageY,
            this.screenX = p.screenX || 0,
            this.screenY = p.screenY || 0) : (this.clientX = o.clientX !== void 0 ? o.clientX : o.pageX,
            this.clientY = o.clientY !== void 0 ? o.clientY : o.pageY,
            this.screenX = o.screenX || 0,
            this.screenY = o.screenY || 0),
            this.button = o.button,
            this.key = o.key || "",
            this.ctrlKey = o.ctrlKey,
            this.altKey = o.altKey,
            this.shiftKey = o.shiftKey,
            this.metaKey = o.metaKey,
            this.pointerId = o.pointerId || 0,
            this.pointerType = typeof o.pointerType == "string" ? o.pointerType : Yd[o.pointerType] || "",
            this.state = o.state,
            this.i = o,
            o.defaultPrevented && Nn.aa.h.call(this)
        }
    }
    S(Nn, Ct);
    var Yd = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    Nn.prototype.h = function() {
        Nn.aa.h.call(this);
        var o = this.i;
        o.preventDefault ? o.preventDefault() : o.returnValue = !1
    }
    ;
    var Li = "closure_listenable_" + (1e6 * Math.random() | 0)
      , Xd = 0;
    function Jd(o, c, u, p, w) {
        this.listener = o,
        this.proxy = null,
        this.src = c,
        this.type = u,
        this.capture = !!p,
        this.ha = w,
        this.key = ++Xd,
        this.da = this.fa = !1
    }
    function Fi(o) {
        o.da = !0,
        o.listener = null,
        o.proxy = null,
        o.src = null,
        o.ha = null
    }
    function Ui(o) {
        this.src = o,
        this.g = {},
        this.h = 0
    }
    Ui.prototype.add = function(o, c, u, p, w) {
        var R = o.toString();
        o = this.g[R],
        o || (o = this.g[R] = [],
        this.h++);
        var D = tr(o, c, p, w);
        return -1 < D ? (c = o[D],
        u || (c.fa = !1)) : (c = new Jd(c,this.src,R,!!p,w),
        c.fa = u,
        o.push(c)),
        c
    }
    ;
    function Zs(o, c) {
        var u = c.type;
        if (u in o.g) {
            var p = o.g[u], w = Array.prototype.indexOf.call(p, c, void 0), R;
            (R = 0 <= w) && Array.prototype.splice.call(p, w, 1),
            R && (Fi(c),
            o.g[u].length == 0 && (delete o.g[u],
            o.h--))
        }
    }
    function tr(o, c, u, p) {
        for (var w = 0; w < o.length; ++w) {
            var R = o[w];
            if (!R.da && R.listener == c && R.capture == !!u && R.ha == p)
                return w
        }
        return -1
    }
    var er = "closure_lm_" + (1e6 * Math.random() | 0)
      , nr = {};
    function Pa(o, c, u, p, w) {
        if (Array.isArray(c)) {
            for (var R = 0; R < c.length; R++)
                Pa(o, c[R], u, p, w);
            return null
        }
        return u = Da(u),
        o && o[Li] ? o.K(c, u, d(p) ? !!p.capture : !!p, w) : Zd(o, c, u, !1, p, w)
    }
    function Zd(o, c, u, p, w, R) {
        if (!c)
            throw Error("Invalid event type");
        var D = d(w) ? !!w.capture : !!w
          , J = sr(o);
        if (J || (o[er] = J = new Ui(o)),
        u = J.add(c, u, p, D, R),
        u.proxy)
            return u;
        if (p = tf(),
        u.proxy = p,
        p.src = o,
        p.listener = u,
        o.addEventListener)
            Qd || (w = D),
            w === void 0 && (w = !1),
            o.addEventListener(c.toString(), p, w);
        else if (o.attachEvent)
            o.attachEvent(Na(c.toString()), p);
        else if (o.addListener && o.removeListener)
            o.addListener(p);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        return u
    }
    function tf() {
        function o(u) {
            return c.call(o.src, o.listener, u)
        }
        const c = ef;
        return o
    }
    function ba(o, c, u, p, w) {
        if (Array.isArray(c))
            for (var R = 0; R < c.length; R++)
                ba(o, c[R], u, p, w);
        else
            p = d(p) ? !!p.capture : !!p,
            u = Da(u),
            o && o[Li] ? (o = o.i,
            c = String(c).toString(),
            c in o.g && (R = o.g[c],
            u = tr(R, u, p, w),
            -1 < u && (Fi(R[u]),
            Array.prototype.splice.call(R, u, 1),
            R.length == 0 && (delete o.g[c],
            o.h--)))) : o && (o = sr(o)) && (c = o.g[c.toString()],
            o = -1,
            c && (o = tr(c, u, p, w)),
            (u = -1 < o ? c[o] : null) && ir(u))
    }
    function ir(o) {
        if (typeof o != "number" && o && !o.da) {
            var c = o.src;
            if (c && c[Li])
                Zs(c.i, o);
            else {
                var u = o.type
                  , p = o.proxy;
                c.removeEventListener ? c.removeEventListener(u, p, o.capture) : c.detachEvent ? c.detachEvent(Na(u), p) : c.addListener && c.removeListener && c.removeListener(p),
                (u = sr(c)) ? (Zs(u, o),
                u.h == 0 && (u.src = null,
                c[er] = null)) : Fi(o)
            }
        }
    }
    function Na(o) {
        return o in nr ? nr[o] : nr[o] = "on" + o
    }
    function ef(o, c) {
        if (o.da)
            o = !0;
        else {
            c = new Nn(c,this);
            var u = o.listener
              , p = o.ha || o.src;
            o.fa && ir(o),
            o = u.call(p, c)
        }
        return o
    }
    function sr(o) {
        return o = o[er],
        o instanceof Ui ? o : null
    }
    var rr = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
    function Da(o) {
        return typeof o == "function" ? o : (o[rr] || (o[rr] = function(c) {
            return o.handleEvent(c)
        }
        ),
        o[rr])
    }
    function At() {
        le.call(this),
        this.i = new Ui(this),
        this.M = this,
        this.F = null
    }
    S(At, le),
    At.prototype[Li] = !0,
    At.prototype.removeEventListener = function(o, c, u, p) {
        ba(this, o, c, u, p)
    }
    ;
    function xt(o, c) {
        var u, p = o.F;
        if (p)
            for (u = []; p; p = p.F)
                u.push(p);
        if (o = o.M,
        p = c.type || c,
        typeof c == "string")
            c = new Ct(c,o);
        else if (c instanceof Ct)
            c.target = c.target || o;
        else {
            var w = c;
            c = new Ct(p,o),
            E(c, w)
        }
        if (w = !0,
        u)
            for (var R = u.length - 1; 0 <= R; R--) {
                var D = c.g = u[R];
                w = Bi(D, p, !0, c) && w
            }
        if (D = c.g = o,
        w = Bi(D, p, !0, c) && w,
        w = Bi(D, p, !1, c) && w,
        u)
            for (R = 0; R < u.length; R++)
                D = c.g = u[R],
                w = Bi(D, p, !1, c) && w
    }
    At.prototype.N = function() {
        if (At.aa.N.call(this),
        this.i) {
            var o = this.i, c;
            for (c in o.g) {
                for (var u = o.g[c], p = 0; p < u.length; p++)
                    Fi(u[p]);
                delete o.g[c],
                o.h--
            }
        }
        this.F = null
    }
    ,
    At.prototype.K = function(o, c, u, p) {
        return this.i.add(String(o), c, !1, u, p)
    }
    ,
    At.prototype.L = function(o, c, u, p) {
        return this.i.add(String(o), c, !0, u, p)
    }
    ;
    function Bi(o, c, u, p) {
        if (c = o.i.g[String(c)],
        !c)
            return !0;
        c = c.concat();
        for (var w = !0, R = 0; R < c.length; ++R) {
            var D = c[R];
            if (D && !D.da && D.capture == u) {
                var J = D.listener
                  , vt = D.ha || D.src;
                D.fa && Zs(o.i, D),
                w = J.call(vt, p) !== !1 && w
            }
        }
        return w && !p.defaultPrevented
    }
    function ka(o, c, u) {
        if (typeof o == "function")
            u && (o = m(o, u));
        else if (o && typeof o.handleEvent == "function")
            o = m(o.handleEvent, o);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(c) ? -1 : l.setTimeout(o, c || 0)
    }
    function xa(o) {
        o.g = ka( () => {
            o.g = null,
            o.i && (o.i = !1,
            xa(o))
        }
        , o.l);
        const c = o.h;
        o.h = null,
        o.m.apply(null, c)
    }
    class nf extends le {
        constructor(c, u) {
            super(),
            this.m = c,
            this.l = u,
            this.h = null,
            this.i = !1,
            this.g = null
        }
        j(c) {
            this.h = arguments,
            this.g ? this.i = !0 : xa(this)
        }
        N() {
            super.N(),
            this.g && (l.clearTimeout(this.g),
            this.g = null,
            this.i = !1,
            this.h = null)
        }
    }
    function Dn(o) {
        le.call(this),
        this.h = o,
        this.g = {}
    }
    S(Dn, le);
    var Va = [];
    function Oa(o) {
        yt(o.g, function(c, u) {
            this.g.hasOwnProperty(u) && ir(c)
        }, o),
        o.g = {}
    }
    Dn.prototype.N = function() {
        Dn.aa.N.call(this),
        Oa(this)
    }
    ,
    Dn.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented")
    }
    ;
    var or = l.JSON.stringify
      , sf = l.JSON.parse
      , rf = class {
        stringify(o) {
            return l.JSON.stringify(o, void 0)
        }
        parse(o) {
            return l.JSON.parse(o, void 0)
        }
    }
    ;
    function ar() {}
    ar.prototype.h = null;
    function Ma(o) {
        return o.h || (o.h = o.i())
    }
    function La() {}
    var kn = {
        OPEN: "a",
        kb: "b",
        Ja: "c",
        wb: "d"
    };
    function lr() {
        Ct.call(this, "d")
    }
    S(lr, Ct);
    function cr() {
        Ct.call(this, "c")
    }
    S(cr, Ct);
    var Ae = {}
      , Fa = null;
    function qi() {
        return Fa = Fa || new At
    }
    Ae.La = "serverreachability";
    function Ua(o) {
        Ct.call(this, Ae.La, o)
    }
    S(Ua, Ct);
    function xn(o) {
        const c = qi();
        xt(c, new Ua(c))
    }
    Ae.STAT_EVENT = "statevent";
    function Ba(o, c) {
        Ct.call(this, Ae.STAT_EVENT, o),
        this.stat = c
    }
    S(Ba, Ct);
    function Vt(o) {
        const c = qi();
        xt(c, new Ba(c,o))
    }
    Ae.Ma = "timingevent";
    function qa(o, c) {
        Ct.call(this, Ae.Ma, o),
        this.size = c
    }
    S(qa, Ct);
    function Vn(o, c) {
        if (typeof o != "function")
            throw Error("Fn must not be null and must be a function");
        return l.setTimeout(function() {
            o()
        }, c)
    }
    function On() {
        this.g = !0
    }
    On.prototype.xa = function() {
        this.g = !1
    }
    ;
    function of(o, c, u, p, w, R) {
        o.info(function() {
            if (o.g)
                if (R)
                    for (var D = "", J = R.split("&"), vt = 0; vt < J.length; vt++) {
                        var H = J[vt].split("=");
                        if (1 < H.length) {
                            var Rt = H[0];
                            H = H[1];
                            var St = Rt.split("_");
                            D = 2 <= St.length && St[1] == "type" ? D + (Rt + "=" + H + "&") : D + (Rt + "=redacted&")
                        }
                    }
                else
                    D = null;
            else
                D = R;
            return "XMLHTTP REQ (" + p + ") [attempt " + w + "]: " + c + `
` + u + `
` + D
        })
    }
    function af(o, c, u, p, w, R, D) {
        o.info(function() {
            return "XMLHTTP RESP (" + p + ") [ attempt " + w + "]: " + c + `
` + u + `
` + R + " " + D
        })
    }
    function ze(o, c, u, p) {
        o.info(function() {
            return "XMLHTTP TEXT (" + c + "): " + cf(o, u) + (p ? " " + p : "")
        })
    }
    function lf(o, c) {
        o.info(function() {
            return "TIMEOUT: " + c
        })
    }
    On.prototype.info = function() {}
    ;
    function cf(o, c) {
        if (!o.g)
            return c;
        if (!c)
            return null;
        try {
            var u = JSON.parse(c);
            if (u) {
                for (o = 0; o < u.length; o++)
                    if (Array.isArray(u[o])) {
                        var p = u[o];
                        if (!(2 > p.length)) {
                            var w = p[1];
                            if (Array.isArray(w) && !(1 > w.length)) {
                                var R = w[0];
                                if (R != "noop" && R != "stop" && R != "close")
                                    for (var D = 1; D < w.length; D++)
                                        w[D] = ""
                            }
                        }
                    }
            }
            return or(u)
        } catch {
            return c
        }
    }
    var ji = {
        NO_ERROR: 0,
        gb: 1,
        tb: 2,
        sb: 3,
        nb: 4,
        rb: 5,
        ub: 6,
        Ia: 7,
        TIMEOUT: 8,
        xb: 9
    }, ja = {
        lb: "complete",
        Hb: "success",
        Ja: "error",
        Ia: "abort",
        zb: "ready",
        Ab: "readystatechange",
        TIMEOUT: "timeout",
        vb: "incrementaldata",
        yb: "progress",
        ob: "downloadprogress",
        Pb: "uploadprogress"
    }, hr;
    function $i() {}
    S($i, ar),
    $i.prototype.g = function() {
        return new XMLHttpRequest
    }
    ,
    $i.prototype.i = function() {
        return {}
    }
    ,
    hr = new $i;
    function ce(o, c, u, p) {
        this.j = o,
        this.i = c,
        this.l = u,
        this.R = p || 1,
        this.U = new Dn(this),
        this.I = 45e3,
        this.H = null,
        this.o = !1,
        this.m = this.A = this.v = this.L = this.F = this.S = this.B = null,
        this.D = [],
        this.g = null,
        this.C = 0,
        this.s = this.u = null,
        this.X = -1,
        this.J = !1,
        this.O = 0,
        this.M = null,
        this.W = this.K = this.T = this.P = !1,
        this.h = new $a
    }
    function $a() {
        this.i = null,
        this.g = "",
        this.h = !1
    }
    var Wa = {}
      , ur = {};
    function dr(o, c, u) {
        o.L = 1,
        o.v = Hi(Jt(c)),
        o.m = u,
        o.P = !0,
        za(o, null)
    }
    function za(o, c) {
        o.F = Date.now(),
        Wi(o),
        o.A = Jt(o.v);
        var u = o.A
          , p = o.R;
        Array.isArray(p) || (p = [String(p)]),
        rl(u.i, "t", p),
        o.C = 0,
        u = o.j.J,
        o.h = new $a,
        o.g = wl(o.j, u ? c : null, !o.m),
        0 < o.O && (o.M = new nf(m(o.Y, o, o.g),o.O)),
        c = o.U,
        u = o.g,
        p = o.ca;
        var w = "readystatechange";
        Array.isArray(w) || (w && (Va[0] = w.toString()),
        w = Va);
        for (var R = 0; R < w.length; R++) {
            var D = Pa(u, w[R], p || c.handleEvent, !1, c.h || c);
            if (!D)
                break;
            c.g[D.key] = D
        }
        c = o.H ? g(o.H) : {},
        o.m ? (o.u || (o.u = "POST"),
        c["Content-Type"] = "application/x-www-form-urlencoded",
        o.g.ea(o.A, o.u, o.m, c)) : (o.u = "GET",
        o.g.ea(o.A, o.u, null, c)),
        xn(),
        of(o.i, o.u, o.A, o.l, o.R, o.m)
    }
    ce.prototype.ca = function(o) {
        o = o.target;
        const c = this.M;
        c && Zt(o) == 3 ? c.j() : this.Y(o)
    }
    ,
    ce.prototype.Y = function(o) {
        try {
            if (o == this.g)
                t: {
                    const St = Zt(this.g);
                    var c = this.g.Ba();
                    const Ke = this.g.Z();
                    if (!(3 > St) && (St != 3 || this.g && (this.h.h || this.g.oa() || dl(this.g)))) {
                        this.J || St != 4 || c == 7 || (c == 8 || 0 >= Ke ? xn(3) : xn(2)),
                        fr(this);
                        var u = this.g.Z();
                        this.X = u;
                        e: if (Ga(this)) {
                            var p = dl(this.g);
                            o = "";
                            var w = p.length
                              , R = Zt(this.g) == 4;
                            if (!this.h.i) {
                                if (typeof TextDecoder > "u") {
                                    Re(this),
                                    Mn(this);
                                    var D = "";
                                    break e
                                }
                                this.h.i = new l.TextDecoder
                            }
                            for (c = 0; c < w; c++)
                                this.h.h = !0,
                                o += this.h.i.decode(p[c], {
                                    stream: !(R && c == w - 1)
                                });
                            p.length = 0,
                            this.h.g += o,
                            this.C = 0,
                            D = this.h.g
                        } else
                            D = this.g.oa();
                        if (this.o = u == 200,
                        af(this.i, this.u, this.A, this.l, this.R, St, u),
                        this.o) {
                            if (this.T && !this.K) {
                                e: {
                                    if (this.g) {
                                        var J, vt = this.g;
                                        if ((J = vt.g ? vt.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !X(J)) {
                                            var H = J;
                                            break e
                                        }
                                    }
                                    H = null
                                }
                                if (u = H)
                                    ze(this.i, this.l, u, "Initial handshake response via X-HTTP-Initial-Response"),
                                    this.K = !0,
                                    pr(this, u);
                                else {
                                    this.o = !1,
                                    this.s = 3,
                                    Vt(12),
                                    Re(this),
                                    Mn(this);
                                    break t
                                }
                            }
                            if (this.P) {
                                u = !0;
                                let Bt;
                                for (; !this.J && this.C < D.length; )
                                    if (Bt = hf(this, D),
                                    Bt == ur) {
                                        St == 4 && (this.s = 4,
                                        Vt(14),
                                        u = !1),
                                        ze(this.i, this.l, null, "[Incomplete Response]");
                                        break
                                    } else if (Bt == Wa) {
                                        this.s = 4,
                                        Vt(15),
                                        ze(this.i, this.l, D, "[Invalid Chunk]"),
                                        u = !1;
                                        break
                                    } else
                                        ze(this.i, this.l, Bt, null),
                                        pr(this, Bt);
                                if (Ga(this) && this.C != 0 && (this.h.g = this.h.g.slice(this.C),
                                this.C = 0),
                                St != 4 || D.length != 0 || this.h.h || (this.s = 1,
                                Vt(16),
                                u = !1),
                                this.o = this.o && u,
                                !u)
                                    ze(this.i, this.l, D, "[Invalid Chunked Response]"),
                                    Re(this),
                                    Mn(this);
                                else if (0 < D.length && !this.W) {
                                    this.W = !0;
                                    var Rt = this.j;
                                    Rt.g == this && Rt.ba && !Rt.M && (Rt.j.info("Great, no buffering proxy detected. Bytes received: " + D.length),
                                    Er(Rt),
                                    Rt.M = !0,
                                    Vt(11))
                                }
                            } else
                                ze(this.i, this.l, D, null),
                                pr(this, D);
                            St == 4 && Re(this),
                            this.o && !this.J && (St == 4 ? vl(this.j, this) : (this.o = !1,
                            Wi(this)))
                        } else
                            Sf(this.g),
                            u == 400 && 0 < D.indexOf("Unknown SID") ? (this.s = 3,
                            Vt(12)) : (this.s = 0,
                            Vt(13)),
                            Re(this),
                            Mn(this)
                    }
                }
        } catch {} finally {}
    }
    ;
    function Ga(o) {
        return o.g ? o.u == "GET" && o.L != 2 && o.j.Ca : !1
    }
    function hf(o, c) {
        var u = o.C
          , p = c.indexOf(`
`, u);
        return p == -1 ? ur : (u = Number(c.substring(u, p)),
        isNaN(u) ? Wa : (p += 1,
        p + u > c.length ? ur : (c = c.slice(p, p + u),
        o.C = p + u,
        c)))
    }
    ce.prototype.cancel = function() {
        this.J = !0,
        Re(this)
    }
    ;
    function Wi(o) {
        o.S = Date.now() + o.I,
        Ha(o, o.I)
    }
    function Ha(o, c) {
        if (o.B != null)
            throw Error("WatchDog timer not null");
        o.B = Vn(m(o.ba, o), c)
    }
    function fr(o) {
        o.B && (l.clearTimeout(o.B),
        o.B = null)
    }
    ce.prototype.ba = function() {
        this.B = null;
        const o = Date.now();
        0 <= o - this.S ? (lf(this.i, this.A),
        this.L != 2 && (xn(),
        Vt(17)),
        Re(this),
        this.s = 2,
        Mn(this)) : Ha(this, this.S - o)
    }
    ;
    function Mn(o) {
        o.j.G == 0 || o.J || vl(o.j, o)
    }
    function Re(o) {
        fr(o);
        var c = o.M;
        c && typeof c.ma == "function" && c.ma(),
        o.M = null,
        Oa(o.U),
        o.g && (c = o.g,
        o.g = null,
        c.abort(),
        c.ma())
    }
    function pr(o, c) {
        try {
            var u = o.j;
            if (u.G != 0 && (u.g == o || _r(u.h, o))) {
                if (!o.K && _r(u.h, o) && u.G == 3) {
                    try {
                        var p = u.Da.g.parse(c)
                    } catch {
                        p = null
                    }
                    if (Array.isArray(p) && p.length == 3) {
                        var w = p;
                        if (w[0] == 0) {
                            t: if (!u.u) {
                                if (u.g)
                                    if (u.g.F + 3e3 < o.F)
                                        Ji(u),
                                        Yi(u);
                                    else
                                        break t;
                                vr(u),
                                Vt(18)
                            }
                        } else
                            u.za = w[1],
                            0 < u.za - u.T && 37500 > w[2] && u.F && u.v == 0 && !u.C && (u.C = Vn(m(u.Za, u), 6e3));
                        if (1 >= Ya(u.h) && u.ca) {
                            try {
                                u.ca()
                            } catch {}
                            u.ca = void 0
                        }
                    } else
                        Pe(u, 11)
                } else if ((o.K || u.g == o) && Ji(u),
                !X(c))
                    for (w = u.Da.g.parse(c),
                    c = 0; c < w.length; c++) {
                        let H = w[c];
                        if (u.T = H[0],
                        H = H[1],
                        u.G == 2)
                            if (H[0] == "c") {
                                u.K = H[1],
                                u.ia = H[2];
                                const Rt = H[3];
                                Rt != null && (u.la = Rt,
                                u.j.info("VER=" + u.la));
                                const St = H[4];
                                St != null && (u.Aa = St,
                                u.j.info("SVER=" + u.Aa));
                                const Ke = H[5];
                                Ke != null && typeof Ke == "number" && 0 < Ke && (p = 1.5 * Ke,
                                u.L = p,
                                u.j.info("backChannelRequestTimeoutMs_=" + p)),
                                p = u;
                                const Bt = o.g;
                                if (Bt) {
                                    const ts = Bt.g ? Bt.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                                    if (ts) {
                                        var R = p.h;
                                        R.g || ts.indexOf("spdy") == -1 && ts.indexOf("quic") == -1 && ts.indexOf("h2") == -1 || (R.j = R.l,
                                        R.g = new Set,
                                        R.h && (gr(R, R.h),
                                        R.h = null))
                                    }
                                    if (p.D) {
                                        const Tr = Bt.g ? Bt.g.getResponseHeader("X-HTTP-Session-Id") : null;
                                        Tr && (p.ya = Tr,
                                        nt(p.I, p.D, Tr))
                                    }
                                }
                                u.G = 3,
                                u.l && u.l.ua(),
                                u.ba && (u.R = Date.now() - o.F,
                                u.j.info("Handshake RTT: " + u.R + "ms")),
                                p = u;
                                var D = o;
                                if (p.qa = Il(p, p.J ? p.ia : null, p.W),
                                D.K) {
                                    Xa(p.h, D);
                                    var J = D
                                      , vt = p.L;
                                    vt && (J.I = vt),
                                    J.B && (fr(J),
                                    Wi(J)),
                                    p.g = D
                                } else
                                    ml(p);
                                0 < u.i.length && Xi(u)
                            } else
                                H[0] != "stop" && H[0] != "close" || Pe(u, 7);
                        else
                            u.G == 3 && (H[0] == "stop" || H[0] == "close" ? H[0] == "stop" ? Pe(u, 7) : yr(u) : H[0] != "noop" && u.l && u.l.ta(H),
                            u.v = 0)
                    }
            }
            xn(4)
        } catch {}
    }
    var uf = class {
        constructor(o, c) {
            this.g = o,
            this.map = c
        }
    }
    ;
    function Ka(o) {
        this.l = o || 10,
        l.PerformanceNavigationTiming ? (o = l.performance.getEntriesByType("navigation"),
        o = 0 < o.length && (o[0].nextHopProtocol == "hq" || o[0].nextHopProtocol == "h2")) : o = !!(l.chrome && l.chrome.loadTimes && l.chrome.loadTimes() && l.chrome.loadTimes().wasFetchedViaSpdy),
        this.j = o ? this.l : 1,
        this.g = null,
        1 < this.j && (this.g = new Set),
        this.h = null,
        this.i = []
    }
    function Qa(o) {
        return o.h ? !0 : o.g ? o.g.size >= o.j : !1
    }
    function Ya(o) {
        return o.h ? 1 : o.g ? o.g.size : 0
    }
    function _r(o, c) {
        return o.h ? o.h == c : o.g ? o.g.has(c) : !1
    }
    function gr(o, c) {
        o.g ? o.g.add(c) : o.h = c
    }
    function Xa(o, c) {
        o.h && o.h == c ? o.h = null : o.g && o.g.has(c) && o.g.delete(c)
    }
    Ka.prototype.cancel = function() {
        if (this.i = Ja(this),
        this.h)
            this.h.cancel(),
            this.h = null;
        else if (this.g && this.g.size !== 0) {
            for (const o of this.g.values())
                o.cancel();
            this.g.clear()
        }
    }
    ;
    function Ja(o) {
        if (o.h != null)
            return o.i.concat(o.h.D);
        if (o.g != null && o.g.size !== 0) {
            let c = o.i;
            for (const u of o.g.values())
                c = c.concat(u.D);
            return c
        }
        return x(o.i)
    }
    function df(o) {
        if (o.V && typeof o.V == "function")
            return o.V();
        if (typeof Map < "u" && o instanceof Map || typeof Set < "u" && o instanceof Set)
            return Array.from(o.values());
        if (typeof o == "string")
            return o.split("");
        if (h(o)) {
            for (var c = [], u = o.length, p = 0; p < u; p++)
                c.push(o[p]);
            return c
        }
        c = [],
        u = 0;
        for (p in o)
            c[u++] = o[p];
        return c
    }
    function ff(o) {
        if (o.na && typeof o.na == "function")
            return o.na();
        if (!o.V || typeof o.V != "function") {
            if (typeof Map < "u" && o instanceof Map)
                return Array.from(o.keys());
            if (!(typeof Set < "u" && o instanceof Set)) {
                if (h(o) || typeof o == "string") {
                    var c = [];
                    o = o.length;
                    for (var u = 0; u < o; u++)
                        c.push(u);
                    return c
                }
                c = [],
                u = 0;
                for (const p in o)
                    c[u++] = p;
                return c
            }
        }
    }
    function Za(o, c) {
        if (o.forEach && typeof o.forEach == "function")
            o.forEach(c, void 0);
        else if (h(o) || typeof o == "string")
            Array.prototype.forEach.call(o, c, void 0);
        else
            for (var u = ff(o), p = df(o), w = p.length, R = 0; R < w; R++)
                c.call(void 0, p[R], u && u[R], o)
    }
    var tl = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    function pf(o, c) {
        if (o) {
            o = o.split("&");
            for (var u = 0; u < o.length; u++) {
                var p = o[u].indexOf("=")
                  , w = null;
                if (0 <= p) {
                    var R = o[u].substring(0, p);
                    w = o[u].substring(p + 1)
                } else
                    R = o[u];
                c(R, w ? decodeURIComponent(w.replace(/\+/g, " ")) : "")
            }
        }
    }
    function Se(o) {
        if (this.g = this.o = this.j = "",
        this.s = null,
        this.m = this.l = "",
        this.h = !1,
        o instanceof Se) {
            this.h = o.h,
            zi(this, o.j),
            this.o = o.o,
            this.g = o.g,
            Gi(this, o.s),
            this.l = o.l;
            var c = o.i
              , u = new Un;
            u.i = c.i,
            c.g && (u.g = new Map(c.g),
            u.h = c.h),
            el(this, u),
            this.m = o.m
        } else
            o && (c = String(o).match(tl)) ? (this.h = !1,
            zi(this, c[1] || "", !0),
            this.o = Ln(c[2] || ""),
            this.g = Ln(c[3] || "", !0),
            Gi(this, c[4]),
            this.l = Ln(c[5] || "", !0),
            el(this, c[6] || "", !0),
            this.m = Ln(c[7] || "")) : (this.h = !1,
            this.i = new Un(null,this.h))
    }
    Se.prototype.toString = function() {
        var o = []
          , c = this.j;
        c && o.push(Fn(c, nl, !0), ":");
        var u = this.g;
        return (u || c == "file") && (o.push("//"),
        (c = this.o) && o.push(Fn(c, nl, !0), "@"),
        o.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        u = this.s,
        u != null && o.push(":", String(u))),
        (u = this.l) && (this.g && u.charAt(0) != "/" && o.push("/"),
        o.push(Fn(u, u.charAt(0) == "/" ? mf : gf, !0))),
        (u = this.i.toString()) && o.push("?", u),
        (u = this.m) && o.push("#", Fn(u, vf)),
        o.join("")
    }
    ;
    function Jt(o) {
        return new Se(o)
    }
    function zi(o, c, u) {
        o.j = u ? Ln(c, !0) : c,
        o.j && (o.j = o.j.replace(/:$/, ""))
    }
    function Gi(o, c) {
        if (c) {
            if (c = Number(c),
            isNaN(c) || 0 > c)
                throw Error("Bad port number " + c);
            o.s = c
        } else
            o.s = null
    }
    function el(o, c, u) {
        c instanceof Un ? (o.i = c,
        Ef(o.i, o.h)) : (u || (c = Fn(c, yf)),
        o.i = new Un(c,o.h))
    }
    function nt(o, c, u) {
        o.i.set(c, u)
    }
    function Hi(o) {
        return nt(o, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36)),
        o
    }
    function Ln(o, c) {
        return o ? c ? decodeURI(o.replace(/%25/g, "%2525")) : decodeURIComponent(o) : ""
    }
    function Fn(o, c, u) {
        return typeof o == "string" ? (o = encodeURI(o).replace(c, _f),
        u && (o = o.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        o) : null
    }
    function _f(o) {
        return o = o.charCodeAt(0),
        "%" + (o >> 4 & 15).toString(16) + (o & 15).toString(16)
    }
    var nl = /[#\/\?@]/g
      , gf = /[#\?:]/g
      , mf = /[#\?]/g
      , yf = /[#\?@]/g
      , vf = /#/g;
    function Un(o, c) {
        this.h = this.g = null,
        this.i = o || null,
        this.j = !!c
    }
    function he(o) {
        o.g || (o.g = new Map,
        o.h = 0,
        o.i && pf(o.i, function(c, u) {
            o.add(decodeURIComponent(c.replace(/\+/g, " ")), u)
        }))
    }
    n = Un.prototype,
    n.add = function(o, c) {
        he(this),
        this.i = null,
        o = Ge(this, o);
        var u = this.g.get(o);
        return u || this.g.set(o, u = []),
        u.push(c),
        this.h += 1,
        this
    }
    ;
    function il(o, c) {
        he(o),
        c = Ge(o, c),
        o.g.has(c) && (o.i = null,
        o.h -= o.g.get(c).length,
        o.g.delete(c))
    }
    function sl(o, c) {
        return he(o),
        c = Ge(o, c),
        o.g.has(c)
    }
    n.forEach = function(o, c) {
        he(this),
        this.g.forEach(function(u, p) {
            u.forEach(function(w) {
                o.call(c, w, p, this)
            }, this)
        }, this)
    }
    ,
    n.na = function() {
        he(this);
        const o = Array.from(this.g.values())
          , c = Array.from(this.g.keys())
          , u = [];
        for (let p = 0; p < c.length; p++) {
            const w = o[p];
            for (let R = 0; R < w.length; R++)
                u.push(c[p])
        }
        return u
    }
    ,
    n.V = function(o) {
        he(this);
        let c = [];
        if (typeof o == "string")
            sl(this, o) && (c = c.concat(this.g.get(Ge(this, o))));
        else {
            o = Array.from(this.g.values());
            for (let u = 0; u < o.length; u++)
                c = c.concat(o[u])
        }
        return c
    }
    ,
    n.set = function(o, c) {
        return he(this),
        this.i = null,
        o = Ge(this, o),
        sl(this, o) && (this.h -= this.g.get(o).length),
        this.g.set(o, [c]),
        this.h += 1,
        this
    }
    ,
    n.get = function(o, c) {
        return o ? (o = this.V(o),
        0 < o.length ? String(o[0]) : c) : c
    }
    ;
    function rl(o, c, u) {
        il(o, c),
        0 < u.length && (o.i = null,
        o.g.set(Ge(o, c), x(u)),
        o.h += u.length)
    }
    n.toString = function() {
        if (this.i)
            return this.i;
        if (!this.g)
            return "";
        const o = []
          , c = Array.from(this.g.keys());
        for (var u = 0; u < c.length; u++) {
            var p = c[u];
            const R = encodeURIComponent(String(p))
              , D = this.V(p);
            for (p = 0; p < D.length; p++) {
                var w = R;
                D[p] !== "" && (w += "=" + encodeURIComponent(String(D[p]))),
                o.push(w)
            }
        }
        return this.i = o.join("&")
    }
    ;
    function Ge(o, c) {
        return c = String(c),
        o.j && (c = c.toLowerCase()),
        c
    }
    function Ef(o, c) {
        c && !o.j && (he(o),
        o.i = null,
        o.g.forEach(function(u, p) {
            var w = p.toLowerCase();
            p != w && (il(this, p),
            rl(this, w, u))
        }, o)),
        o.j = c
    }
    function Tf(o, c) {
        const u = new On;
        if (l.Image) {
            const p = new Image;
            p.onload = A(ue, u, "TestLoadImage: loaded", !0, c, p),
            p.onerror = A(ue, u, "TestLoadImage: error", !1, c, p),
            p.onabort = A(ue, u, "TestLoadImage: abort", !1, c, p),
            p.ontimeout = A(ue, u, "TestLoadImage: timeout", !1, c, p),
            l.setTimeout(function() {
                p.ontimeout && p.ontimeout()
            }, 1e4),
            p.src = o
        } else
            c(!1)
    }
    function If(o, c) {
        const u = new On
          , p = new AbortController
          , w = setTimeout( () => {
            p.abort(),
            ue(u, "TestPingServer: timeout", !1, c)
        }
        , 1e4);
        fetch(o, {
            signal: p.signal
        }).then(R => {
            clearTimeout(w),
            R.ok ? ue(u, "TestPingServer: ok", !0, c) : ue(u, "TestPingServer: server error", !1, c)
        }
        ).catch( () => {
            clearTimeout(w),
            ue(u, "TestPingServer: error", !1, c)
        }
        )
    }
    function ue(o, c, u, p, w) {
        try {
            w && (w.onload = null,
            w.onerror = null,
            w.onabort = null,
            w.ontimeout = null),
            p(u)
        } catch {}
    }
    function wf() {
        this.g = new rf
    }
    function Cf(o, c, u) {
        const p = u || "";
        try {
            Za(o, function(w, R) {
                let D = w;
                d(w) && (D = or(w)),
                c.push(p + R + "=" + encodeURIComponent(D))
            })
        } catch (w) {
            throw c.push(p + "type=" + encodeURIComponent("_badmap")),
            w
        }
    }
    function Bn(o) {
        this.l = o.Ub || null,
        this.j = o.eb || !1
    }
    S(Bn, ar),
    Bn.prototype.g = function() {
        return new Ki(this.l,this.j)
    }
    ,
    Bn.prototype.i = function(o) {
        return function() {
            return o
        }
    }({});
    function Ki(o, c) {
        At.call(this),
        this.D = o,
        this.o = c,
        this.m = void 0,
        this.status = this.readyState = 0,
        this.responseType = this.responseText = this.response = this.statusText = "",
        this.onreadystatechange = null,
        this.u = new Headers,
        this.h = null,
        this.B = "GET",
        this.A = "",
        this.g = !1,
        this.v = this.j = this.l = null
    }
    S(Ki, At),
    n = Ki.prototype,
    n.open = function(o, c) {
        if (this.readyState != 0)
            throw this.abort(),
            Error("Error reopening a connection");
        this.B = o,
        this.A = c,
        this.readyState = 1,
        jn(this)
    }
    ,
    n.send = function(o) {
        if (this.readyState != 1)
            throw this.abort(),
            Error("need to call open() first. ");
        this.g = !0;
        const c = {
            headers: this.u,
            method: this.B,
            credentials: this.m,
            cache: void 0
        };
        o && (c.body = o),
        (this.D || l).fetch(new Request(this.A,c)).then(this.Sa.bind(this), this.ga.bind(this))
    }
    ,
    n.abort = function() {
        this.response = this.responseText = "",
        this.u = new Headers,
        this.status = 0,
        this.j && this.j.cancel("Request was aborted.").catch( () => {}
        ),
        1 <= this.readyState && this.g && this.readyState != 4 && (this.g = !1,
        qn(this)),
        this.readyState = 0
    }
    ,
    n.Sa = function(o) {
        if (this.g && (this.l = o,
        this.h || (this.status = this.l.status,
        this.statusText = this.l.statusText,
        this.h = o.headers,
        this.readyState = 2,
        jn(this)),
        this.g && (this.readyState = 3,
        jn(this),
        this.g)))
            if (this.responseType === "arraybuffer")
                o.arrayBuffer().then(this.Qa.bind(this), this.ga.bind(this));
            else if (typeof l.ReadableStream < "u" && "body"in o) {
                if (this.j = o.body.getReader(),
                this.o) {
                    if (this.responseType)
                        throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
                    this.response = []
                } else
                    this.response = this.responseText = "",
                    this.v = new TextDecoder;
                ol(this)
            } else
                o.text().then(this.Ra.bind(this), this.ga.bind(this))
    }
    ;
    function ol(o) {
        o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))
    }
    n.Pa = function(o) {
        if (this.g) {
            if (this.o && o.value)
                this.response.push(o.value);
            else if (!this.o) {
                var c = o.value ? o.value : new Uint8Array(0);
                (c = this.v.decode(c, {
                    stream: !o.done
                })) && (this.response = this.responseText += c)
            }
            o.done ? qn(this) : jn(this),
            this.readyState == 3 && ol(this)
        }
    }
    ,
    n.Ra = function(o) {
        this.g && (this.response = this.responseText = o,
        qn(this))
    }
    ,
    n.Qa = function(o) {
        this.g && (this.response = o,
        qn(this))
    }
    ,
    n.ga = function() {
        this.g && qn(this)
    }
    ;
    function qn(o) {
        o.readyState = 4,
        o.l = null,
        o.j = null,
        o.v = null,
        jn(o)
    }
    n.setRequestHeader = function(o, c) {
        this.u.append(o, c)
    }
    ,
    n.getResponseHeader = function(o) {
        return this.h && this.h.get(o.toLowerCase()) || ""
    }
    ,
    n.getAllResponseHeaders = function() {
        if (!this.h)
            return "";
        const o = []
          , c = this.h.entries();
        for (var u = c.next(); !u.done; )
            u = u.value,
            o.push(u[0] + ": " + u[1]),
            u = c.next();
        return o.join(`\r
`)
    }
    ;
    function jn(o) {
        o.onreadystatechange && o.onreadystatechange.call(o)
    }
    Object.defineProperty(Ki.prototype, "withCredentials", {
        get: function() {
            return this.m === "include"
        },
        set: function(o) {
            this.m = o ? "include" : "same-origin"
        }
    });
    function al(o) {
        let c = "";
        return yt(o, function(u, p) {
            c += p,
            c += ":",
            c += u,
            c += `\r
`
        }),
        c
    }
    function mr(o, c, u) {
        t: {
            for (p in u) {
                var p = !1;
                break t
            }
            p = !0
        }
        p || (u = al(u),
        typeof o == "string" ? u != null && encodeURIComponent(String(u)) : nt(o, c, u))
    }
    function rt(o) {
        At.call(this),
        this.headers = new Map,
        this.o = o || null,
        this.h = !1,
        this.v = this.g = null,
        this.D = "",
        this.m = 0,
        this.l = "",
        this.j = this.B = this.u = this.A = !1,
        this.I = null,
        this.H = "",
        this.J = !1
    }
    S(rt, At);
    var Af = /^https?$/i
      , Rf = ["POST", "PUT"];
    n = rt.prototype,
    n.Ha = function(o) {
        this.J = o
    }
    ,
    n.ea = function(o, c, u, p) {
        if (this.g)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + this.D + "; newUri=" + o);
        c = c ? c.toUpperCase() : "GET",
        this.D = o,
        this.l = "",
        this.m = 0,
        this.A = !1,
        this.h = !0,
        this.g = this.o ? this.o.g() : hr.g(),
        this.v = this.o ? Ma(this.o) : Ma(hr),
        this.g.onreadystatechange = m(this.Ea, this);
        try {
            this.B = !0,
            this.g.open(c, String(o), !0),
            this.B = !1
        } catch (R) {
            ll(this, R);
            return
        }
        if (o = u || "",
        u = new Map(this.headers),
        p)
            if (Object.getPrototypeOf(p) === Object.prototype)
                for (var w in p)
                    u.set(w, p[w]);
            else if (typeof p.keys == "function" && typeof p.get == "function")
                for (const R of p.keys())
                    u.set(R, p.get(R));
            else
                throw Error("Unknown input type for opt_headers: " + String(p));
        p = Array.from(u.keys()).find(R => R.toLowerCase() == "content-type"),
        w = l.FormData && o instanceof l.FormData,
        !(0 <= Array.prototype.indexOf.call(Rf, c, void 0)) || p || w || u.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        for (const [R,D] of u)
            this.g.setRequestHeader(R, D);
        this.H && (this.g.responseType = this.H),
        "withCredentials"in this.g && this.g.withCredentials !== this.J && (this.g.withCredentials = this.J);
        try {
            ul(this),
            this.u = !0,
            this.g.send(o),
            this.u = !1
        } catch (R) {
            ll(this, R)
        }
    }
    ;
    function ll(o, c) {
        o.h = !1,
        o.g && (o.j = !0,
        o.g.abort(),
        o.j = !1),
        o.l = c,
        o.m = 5,
        cl(o),
        Qi(o)
    }
    function cl(o) {
        o.A || (o.A = !0,
        xt(o, "complete"),
        xt(o, "error"))
    }
    n.abort = function(o) {
        this.g && this.h && (this.h = !1,
        this.j = !0,
        this.g.abort(),
        this.j = !1,
        this.m = o || 7,
        xt(this, "complete"),
        xt(this, "abort"),
        Qi(this))
    }
    ,
    n.N = function() {
        this.g && (this.h && (this.h = !1,
        this.j = !0,
        this.g.abort(),
        this.j = !1),
        Qi(this, !0)),
        rt.aa.N.call(this)
    }
    ,
    n.Ea = function() {
        this.s || (this.B || this.u || this.j ? hl(this) : this.bb())
    }
    ,
    n.bb = function() {
        hl(this)
    }
    ;
    function hl(o) {
        if (o.h && typeof a < "u" && (!o.v[1] || Zt(o) != 4 || o.Z() != 2)) {
            if (o.u && Zt(o) == 4)
                ka(o.Ea, 0, o);
            else if (xt(o, "readystatechange"),
            Zt(o) == 4) {
                o.h = !1;
                try {
                    const D = o.Z();
                    t: switch (D) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var c = !0;
                        break t;
                    default:
                        c = !1
                    }
                    var u;
                    if (!(u = c)) {
                        var p;
                        if (p = D === 0) {
                            var w = String(o.D).match(tl)[1] || null;
                            !w && l.self && l.self.location && (w = l.self.location.protocol.slice(0, -1)),
                            p = !Af.test(w ? w.toLowerCase() : "")
                        }
                        u = p
                    }
                    if (u)
                        xt(o, "complete"),
                        xt(o, "success");
                    else {
                        o.m = 6;
                        try {
                            var R = 2 < Zt(o) ? o.g.statusText : ""
                        } catch {
                            R = ""
                        }
                        o.l = R + " [" + o.Z() + "]",
                        cl(o)
                    }
                } finally {
                    Qi(o)
                }
            }
        }
    }
    function Qi(o, c) {
        if (o.g) {
            ul(o);
            const u = o.g
              , p = o.v[0] ? () => {}
            : null;
            o.g = null,
            o.v = null,
            c || xt(o, "ready");
            try {
                u.onreadystatechange = p
            } catch {}
        }
    }
    function ul(o) {
        o.I && (l.clearTimeout(o.I),
        o.I = null)
    }
    n.isActive = function() {
        return !!this.g
    }
    ;
    function Zt(o) {
        return o.g ? o.g.readyState : 0
    }
    n.Z = function() {
        try {
            return 2 < Zt(this) ? this.g.status : -1
        } catch {
            return -1
        }
    }
    ,
    n.oa = function() {
        try {
            return this.g ? this.g.responseText : ""
        } catch {
            return ""
        }
    }
    ,
    n.Oa = function(o) {
        if (this.g) {
            var c = this.g.responseText;
            return o && c.indexOf(o) == 0 && (c = c.substring(o.length)),
            sf(c)
        }
    }
    ;
    function dl(o) {
        try {
            if (!o.g)
                return null;
            if ("response"in o.g)
                return o.g.response;
            switch (o.H) {
            case "":
            case "text":
                return o.g.responseText;
            case "arraybuffer":
                if ("mozResponseArrayBuffer"in o.g)
                    return o.g.mozResponseArrayBuffer
            }
            return null
        } catch {
            return null
        }
    }
    function Sf(o) {
        const c = {};
        o = (o.g && 2 <= Zt(o) && o.g.getAllResponseHeaders() || "").split(`\r
`);
        for (let p = 0; p < o.length; p++) {
            if (X(o[p]))
                continue;
            var u = T(o[p]);
            const w = u[0];
            if (u = u[1],
            typeof u != "string")
                continue;
            u = u.trim();
            const R = c[w] || [];
            c[w] = R,
            R.push(u)
        }
        I(c, function(p) {
            return p.join(", ")
        })
    }
    n.Ba = function() {
        return this.m
    }
    ,
    n.Ka = function() {
        return typeof this.l == "string" ? this.l : String(this.l)
    }
    ;
    function $n(o, c, u) {
        return u && u.internalChannelParams && u.internalChannelParams[o] || c
    }
    function fl(o) {
        this.Aa = 0,
        this.i = [],
        this.j = new On,
        this.ia = this.qa = this.I = this.W = this.g = this.ya = this.D = this.H = this.m = this.S = this.o = null,
        this.Ya = this.U = 0,
        this.Va = $n("failFast", !1, o),
        this.F = this.C = this.u = this.s = this.l = null,
        this.X = !0,
        this.za = this.T = -1,
        this.Y = this.v = this.B = 0,
        this.Ta = $n("baseRetryDelayMs", 5e3, o),
        this.cb = $n("retryDelaySeedMs", 1e4, o),
        this.Wa = $n("forwardChannelMaxRetries", 2, o),
        this.wa = $n("forwardChannelRequestTimeoutMs", 2e4, o),
        this.pa = o && o.xmlHttpFactory || void 0,
        this.Xa = o && o.Tb || void 0,
        this.Ca = o && o.useFetchStreams || !1,
        this.L = void 0,
        this.J = o && o.supportsCrossDomainXhr || !1,
        this.K = "",
        this.h = new Ka(o && o.concurrentRequestLimit),
        this.Da = new wf,
        this.P = o && o.fastHandshake || !1,
        this.O = o && o.encodeInitMessageHeaders || !1,
        this.P && this.O && (this.O = !1),
        this.Ua = o && o.Rb || !1,
        o && o.xa && this.j.xa(),
        o && o.forceLongPolling && (this.X = !1),
        this.ba = !this.P && this.X && o && o.detectBufferingProxy || !1,
        this.ja = void 0,
        o && o.longPollingTimeout && 0 < o.longPollingTimeout && (this.ja = o.longPollingTimeout),
        this.ca = void 0,
        this.R = 0,
        this.M = !1,
        this.ka = this.A = null
    }
    n = fl.prototype,
    n.la = 8,
    n.G = 1,
    n.connect = function(o, c, u, p) {
        Vt(0),
        this.W = o,
        this.H = c || {},
        u && p !== void 0 && (this.H.OSID = u,
        this.H.OAID = p),
        this.F = this.X,
        this.I = Il(this, null, this.W),
        Xi(this)
    }
    ;
    function yr(o) {
        if (pl(o),
        o.G == 3) {
            var c = o.U++
              , u = Jt(o.I);
            if (nt(u, "SID", o.K),
            nt(u, "RID", c),
            nt(u, "TYPE", "terminate"),
            Wn(o, u),
            c = new ce(o,o.j,c),
            c.L = 2,
            c.v = Hi(Jt(u)),
            u = !1,
            l.navigator && l.navigator.sendBeacon)
                try {
                    u = l.navigator.sendBeacon(c.v.toString(), "")
                } catch {}
            !u && l.Image && (new Image().src = c.v,
            u = !0),
            u || (c.g = wl(c.j, null),
            c.g.ea(c.v)),
            c.F = Date.now(),
            Wi(c)
        }
        Tl(o)
    }
    function Yi(o) {
        o.g && (Er(o),
        o.g.cancel(),
        o.g = null)
    }
    function pl(o) {
        Yi(o),
        o.u && (l.clearTimeout(o.u),
        o.u = null),
        Ji(o),
        o.h.cancel(),
        o.s && (typeof o.s == "number" && l.clearTimeout(o.s),
        o.s = null)
    }
    function Xi(o) {
        if (!Qa(o.h) && !o.s) {
            o.s = !0;
            var c = o.Ga;
            Pn || Sa(),
            bn || (Pn(),
            bn = !0),
            Js.add(c, o),
            o.B = 0
        }
    }
    function Pf(o, c) {
        return Ya(o.h) >= o.h.j - (o.s ? 1 : 0) ? !1 : o.s ? (o.i = c.D.concat(o.i),
        !0) : o.G == 1 || o.G == 2 || o.B >= (o.Va ? 0 : o.Wa) ? !1 : (o.s = Vn(m(o.Ga, o, c), El(o, o.B)),
        o.B++,
        !0)
    }
    n.Ga = function(o) {
        if (this.s)
            if (this.s = null,
            this.G == 1) {
                if (!o) {
                    this.U = Math.floor(1e5 * Math.random()),
                    o = this.U++;
                    const w = new ce(this,this.j,o);
                    let R = this.o;
                    if (this.S && (R ? (R = g(R),
                    E(R, this.S)) : R = this.S),
                    this.m !== null || this.O || (w.H = R,
                    R = null),
                    this.P)
                        t: {
                            for (var c = 0, u = 0; u < this.i.length; u++) {
                                e: {
                                    var p = this.i[u];
                                    if ("__data__"in p.map && (p = p.map.__data__,
                                    typeof p == "string")) {
                                        p = p.length;
                                        break e
                                    }
                                    p = void 0
                                }
                                if (p === void 0)
                                    break;
                                if (c += p,
                                4096 < c) {
                                    c = u;
                                    break t
                                }
                                if (c === 4096 || u === this.i.length - 1) {
                                    c = u + 1;
                                    break t
                                }
                            }
                            c = 1e3
                        }
                    else
                        c = 1e3;
                    c = gl(this, w, c),
                    u = Jt(this.I),
                    nt(u, "RID", o),
                    nt(u, "CVER", 22),
                    this.D && nt(u, "X-HTTP-Session-Id", this.D),
                    Wn(this, u),
                    R && (this.O ? c = "headers=" + encodeURIComponent(String(al(R))) + "&" + c : this.m && mr(u, this.m, R)),
                    gr(this.h, w),
                    this.Ua && nt(u, "TYPE", "init"),
                    this.P ? (nt(u, "$req", c),
                    nt(u, "SID", "null"),
                    w.T = !0,
                    dr(w, u, null)) : dr(w, u, c),
                    this.G = 2
                }
            } else
                this.G == 3 && (o ? _l(this, o) : this.i.length == 0 || Qa(this.h) || _l(this))
    }
    ;
    function _l(o, c) {
        var u;
        c ? u = c.l : u = o.U++;
        const p = Jt(o.I);
        nt(p, "SID", o.K),
        nt(p, "RID", u),
        nt(p, "AID", o.T),
        Wn(o, p),
        o.m && o.o && mr(p, o.m, o.o),
        u = new ce(o,o.j,u,o.B + 1),
        o.m === null && (u.H = o.o),
        c && (o.i = c.D.concat(o.i)),
        c = gl(o, u, 1e3),
        u.I = Math.round(.5 * o.wa) + Math.round(.5 * o.wa * Math.random()),
        gr(o.h, u),
        dr(u, p, c)
    }
    function Wn(o, c) {
        o.H && yt(o.H, function(u, p) {
            nt(c, p, u)
        }),
        o.l && Za({}, function(u, p) {
            nt(c, p, u)
        })
    }
    function gl(o, c, u) {
        u = Math.min(o.i.length, u);
        var p = o.l ? m(o.l.Na, o.l, o) : null;
        t: {
            var w = o.i;
            let R = -1;
            for (; ; ) {
                const D = ["count=" + u];
                R == -1 ? 0 < u ? (R = w[0].g,
                D.push("ofs=" + R)) : R = 0 : D.push("ofs=" + R);
                let J = !0;
                for (let vt = 0; vt < u; vt++) {
                    let H = w[vt].g;
                    const Rt = w[vt].map;
                    if (H -= R,
                    0 > H)
                        R = Math.max(0, w[vt].g - 100),
                        J = !1;
                    else
                        try {
                            Cf(Rt, D, "req" + H + "_")
                        } catch {
                            p && p(Rt)
                        }
                }
                if (J) {
                    p = D.join("&");
                    break t
                }
            }
        }
        return o = o.i.splice(0, u),
        c.D = o,
        p
    }
    function ml(o) {
        if (!o.g && !o.u) {
            o.Y = 1;
            var c = o.Fa;
            Pn || Sa(),
            bn || (Pn(),
            bn = !0),
            Js.add(c, o),
            o.v = 0
        }
    }
    function vr(o) {
        return o.g || o.u || 3 <= o.v ? !1 : (o.Y++,
        o.u = Vn(m(o.Fa, o), El(o, o.v)),
        o.v++,
        !0)
    }
    n.Fa = function() {
        if (this.u = null,
        yl(this),
        this.ba && !(this.M || this.g == null || 0 >= this.R)) {
            var o = 2 * this.R;
            this.j.info("BP detection timer enabled: " + o),
            this.A = Vn(m(this.ab, this), o)
        }
    }
    ,
    n.ab = function() {
        this.A && (this.A = null,
        this.j.info("BP detection timeout reached."),
        this.j.info("Buffering proxy detected and switch to long-polling!"),
        this.F = !1,
        this.M = !0,
        Vt(10),
        Yi(this),
        yl(this))
    }
    ;
    function Er(o) {
        o.A != null && (l.clearTimeout(o.A),
        o.A = null)
    }
    function yl(o) {
        o.g = new ce(o,o.j,"rpc",o.Y),
        o.m === null && (o.g.H = o.o),
        o.g.O = 0;
        var c = Jt(o.qa);
        nt(c, "RID", "rpc"),
        nt(c, "SID", o.K),
        nt(c, "AID", o.T),
        nt(c, "CI", o.F ? "0" : "1"),
        !o.F && o.ja && nt(c, "TO", o.ja),
        nt(c, "TYPE", "xmlhttp"),
        Wn(o, c),
        o.m && o.o && mr(c, o.m, o.o),
        o.L && (o.g.I = o.L);
        var u = o.g;
        o = o.ia,
        u.L = 1,
        u.v = Hi(Jt(c)),
        u.m = null,
        u.P = !0,
        za(u, o)
    }
    n.Za = function() {
        this.C != null && (this.C = null,
        Yi(this),
        vr(this),
        Vt(19))
    }
    ;
    function Ji(o) {
        o.C != null && (l.clearTimeout(o.C),
        o.C = null)
    }
    function vl(o, c) {
        var u = null;
        if (o.g == c) {
            Ji(o),
            Er(o),
            o.g = null;
            var p = 2
        } else if (_r(o.h, c))
            u = c.D,
            Xa(o.h, c),
            p = 1;
        else
            return;
        if (o.G != 0) {
            if (c.o)
                if (p == 1) {
                    u = c.m ? c.m.length : 0,
                    c = Date.now() - c.F;
                    var w = o.B;
                    p = qi(),
                    xt(p, new qa(p,u)),
                    Xi(o)
                } else
                    ml(o);
            else if (w = c.s,
            w == 3 || w == 0 && 0 < c.X || !(p == 1 && Pf(o, c) || p == 2 && vr(o)))
                switch (u && 0 < u.length && (c = o.h,
                c.i = c.i.concat(u)),
                w) {
                case 1:
                    Pe(o, 5);
                    break;
                case 4:
                    Pe(o, 10);
                    break;
                case 3:
                    Pe(o, 6);
                    break;
                default:
                    Pe(o, 2)
                }
        }
    }
    function El(o, c) {
        let u = o.Ta + Math.floor(Math.random() * o.cb);
        return o.isActive() || (u *= 2),
        u * c
    }
    function Pe(o, c) {
        if (o.j.info("Error code " + c),
        c == 2) {
            var u = m(o.fb, o)
              , p = o.Xa;
            const w = !p;
            p = new Se(p || "//www.google.com/images/cleardot.gif"),
            l.location && l.location.protocol == "http" || zi(p, "https"),
            Hi(p),
            w ? Tf(p.toString(), u) : If(p.toString(), u)
        } else
            Vt(2);
        o.G = 0,
        o.l && o.l.sa(c),
        Tl(o),
        pl(o)
    }
    n.fb = function(o) {
        o ? (this.j.info("Successfully pinged google.com"),
        Vt(2)) : (this.j.info("Failed to ping google.com"),
        Vt(1))
    }
    ;
    function Tl(o) {
        if (o.G = 0,
        o.ka = [],
        o.l) {
            const c = Ja(o.h);
            (c.length != 0 || o.i.length != 0) && (k(o.ka, c),
            k(o.ka, o.i),
            o.h.i.length = 0,
            x(o.i),
            o.i.length = 0),
            o.l.ra()
        }
    }
    function Il(o, c, u) {
        var p = u instanceof Se ? Jt(u) : new Se(u);
        if (p.g != "")
            c && (p.g = c + "." + p.g),
            Gi(p, p.s);
        else {
            var w = l.location;
            p = w.protocol,
            c = c ? c + "." + w.hostname : w.hostname,
            w = +w.port;
            var R = new Se(null);
            p && zi(R, p),
            c && (R.g = c),
            w && Gi(R, w),
            u && (R.l = u),
            p = R
        }
        return u = o.D,
        c = o.ya,
        u && c && nt(p, u, c),
        nt(p, "VER", o.la),
        Wn(o, p),
        p
    }
    function wl(o, c, u) {
        if (c && !o.J)
            throw Error("Can't create secondary domain capable XhrIo object.");
        return c = o.Ca && !o.pa ? new rt(new Bn({
            eb: u
        })) : new rt(o.pa),
        c.Ha(o.J),
        c
    }
    n.isActive = function() {
        return !!this.l && this.l.isActive(this)
    }
    ;
    function Cl() {}
    n = Cl.prototype,
    n.ua = function() {}
    ,
    n.ta = function() {}
    ,
    n.sa = function() {}
    ,
    n.ra = function() {}
    ,
    n.isActive = function() {
        return !0
    }
    ,
    n.Na = function() {}
    ;
    function Zi() {}
    Zi.prototype.g = function(o, c) {
        return new Lt(o,c)
    }
    ;
    function Lt(o, c) {
        At.call(this),
        this.g = new fl(c),
        this.l = o,
        this.h = c && c.messageUrlParams || null,
        o = c && c.messageHeaders || null,
        c && c.clientProtocolHeaderRequired && (o ? o["X-Client-Protocol"] = "webchannel" : o = {
            "X-Client-Protocol": "webchannel"
        }),
        this.g.o = o,
        o = c && c.initMessageHeaders || null,
        c && c.messageContentType && (o ? o["X-WebChannel-Content-Type"] = c.messageContentType : o = {
            "X-WebChannel-Content-Type": c.messageContentType
        }),
        c && c.va && (o ? o["X-WebChannel-Client-Profile"] = c.va : o = {
            "X-WebChannel-Client-Profile": c.va
        }),
        this.g.S = o,
        (o = c && c.Sb) && !X(o) && (this.g.m = o),
        this.v = c && c.supportsCrossDomainXhr || !1,
        this.u = c && c.sendRawJson || !1,
        (c = c && c.httpSessionIdParam) && !X(c) && (this.g.D = c,
        o = this.h,
        o !== null && c in o && (o = this.h,
        c in o && delete o[c])),
        this.j = new He(this)
    }
    S(Lt, At),
    Lt.prototype.m = function() {
        this.g.l = this.j,
        this.v && (this.g.J = !0),
        this.g.connect(this.l, this.h || void 0)
    }
    ,
    Lt.prototype.close = function() {
        yr(this.g)
    }
    ,
    Lt.prototype.o = function(o) {
        var c = this.g;
        if (typeof o == "string") {
            var u = {};
            u.__data__ = o,
            o = u
        } else
            this.u && (u = {},
            u.__data__ = or(o),
            o = u);
        c.i.push(new uf(c.Ya++,o)),
        c.G == 3 && Xi(c)
    }
    ,
    Lt.prototype.N = function() {
        this.g.l = null,
        delete this.j,
        yr(this.g),
        delete this.g,
        Lt.aa.N.call(this)
    }
    ;
    function Al(o) {
        lr.call(this),
        o.__headers__ && (this.headers = o.__headers__,
        this.statusCode = o.__status__,
        delete o.__headers__,
        delete o.__status__);
        var c = o.__sm__;
        if (c) {
            t: {
                for (const u in c) {
                    o = u;
                    break t
                }
                o = void 0
            }
            (this.i = o) && (o = this.i,
            c = c !== null && o in c ? c[o] : void 0),
            this.data = c
        } else
            this.data = o
    }
    S(Al, lr);
    function Rl() {
        cr.call(this),
        this.status = 1
    }
    S(Rl, cr);
    function He(o) {
        this.g = o
    }
    S(He, Cl),
    He.prototype.ua = function() {
        xt(this.g, "a")
    }
    ,
    He.prototype.ta = function(o) {
        xt(this.g, new Al(o))
    }
    ,
    He.prototype.sa = function(o) {
        xt(this.g, new Rl)
    }
    ,
    He.prototype.ra = function() {
        xt(this.g, "b")
    }
    ,
    Zi.prototype.createWebChannel = Zi.prototype.g,
    Lt.prototype.send = Lt.prototype.o,
    Lt.prototype.open = Lt.prototype.m,
    Lt.prototype.close = Lt.prototype.close,
    Wu = function() {
        return new Zi
    }
    ,
    $u = function() {
        return qi()
    }
    ,
    ju = Ae,
    no = {
        mb: 0,
        pb: 1,
        qb: 2,
        Jb: 3,
        Ob: 4,
        Lb: 5,
        Mb: 6,
        Kb: 7,
        Ib: 8,
        Nb: 9,
        PROXY: 10,
        NOPROXY: 11,
        Gb: 12,
        Cb: 13,
        Db: 14,
        Bb: 15,
        Eb: 16,
        Fb: 17,
        ib: 18,
        hb: 19,
        jb: 20
    },
    ji.NO_ERROR = 0,
    ji.TIMEOUT = 8,
    ji.HTTP_ERROR = 6,
    hs = ji,
    ja.COMPLETE = "complete",
    qu = ja,
    La.EventType = kn,
    kn.OPEN = "a",
    kn.CLOSE = "b",
    kn.ERROR = "c",
    kn.MESSAGE = "d",
    At.prototype.listen = At.prototype.K,
    Xn = La,
    Bu = Bn,
    rt.prototype.listenOnce = rt.prototype.L,
    rt.prototype.getLastError = rt.prototype.Ka,
    rt.prototype.getLastErrorCode = rt.prototype.Ba,
    rt.prototype.getStatus = rt.prototype.Z,
    rt.prototype.getResponseJson = rt.prototype.Oa,
    rt.prototype.getResponseText = rt.prototype.oa,
    rt.prototype.send = rt.prototype.ea,
    rt.prototype.setWithCredentials = rt.prototype.Ha,
    Uu = rt
}
).apply(typeof is < "u" ? is : typeof self < "u" ? self : typeof window < "u" ? window : {});
const vc = "@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bt {
    constructor(t) {
        this.uid = t
    }
    isAuthenticated() {
        return this.uid != null
    }
    toKey() {
        return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user"
    }
    isEqual(t) {
        return t.uid === this.uid
    }
}
bt.UNAUTHENTICATED = new bt(null),
bt.GOOGLE_CREDENTIALS = new bt("google-credentials-uid"),
bt.FIRST_PARTY = new bt("first-party-uid"),
bt.MOCK_USER = new bt("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let wn = "10.12.5";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const qe = new wo("@firebase/firestore");
function Qn() {
    return qe.logLevel
}
function V(n, ...t) {
    if (qe.logLevel <= W.DEBUG) {
        const e = t.map(Zo);
        qe.debug(`Firestore (${wn}): ${n}`, ...e)
    }
}
function se(n, ...t) {
    if (qe.logLevel <= W.ERROR) {
        const e = t.map(Zo);
        qe.error(`Firestore (${wn}): ${n}`, ...e)
    }
}
function dn(n, ...t) {
    if (qe.logLevel <= W.WARN) {
        const e = t.map(Zo);
        qe.warn(`Firestore (${wn}): ${n}`, ...e)
    }
}
function Zo(n) {
    if (typeof n == "string")
        return n;
    try {
        /**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
        return function(e) {
            return JSON.stringify(e)
        }(n)
    } catch {
        return n
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function U(n="Unexpected state") {
    const t = `FIRESTORE (${wn}) INTERNAL ASSERTION FAILED: ` + n;
    throw se(t),
    new Error(t)
}
function dt(n, t) {
    n || U()
}
function z(n, t) {
    return n
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const b = {
    OK: "ok",
    CANCELLED: "cancelled",
    UNKNOWN: "unknown",
    INVALID_ARGUMENT: "invalid-argument",
    DEADLINE_EXCEEDED: "deadline-exceeded",
    NOT_FOUND: "not-found",
    ALREADY_EXISTS: "already-exists",
    PERMISSION_DENIED: "permission-denied",
    UNAUTHENTICATED: "unauthenticated",
    RESOURCE_EXHAUSTED: "resource-exhausted",
    FAILED_PRECONDITION: "failed-precondition",
    ABORTED: "aborted",
    OUT_OF_RANGE: "out-of-range",
    UNIMPLEMENTED: "unimplemented",
    INTERNAL: "internal",
    UNAVAILABLE: "unavailable",
    DATA_LOSS: "data-loss"
};
class O extends En {
    constructor(t, e) {
        super(t, e),
        this.code = t,
        this.message = e,
        this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Oe {
    constructor() {
        this.promise = new Promise( (t, e) => {
            this.resolve = t,
            this.reject = e
        }
        )
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zu {
    constructor(t, e) {
        this.user = e,
        this.type = "OAuth",
        this.headers = new Map,
        this.headers.set("Authorization", `Bearer ${t}`)
    }
}
class Ey {
    getToken() {
        return Promise.resolve(null)
    }
    invalidateToken() {}
    start(t, e) {
        t.enqueueRetryable( () => e(bt.UNAUTHENTICATED))
    }
    shutdown() {}
}
class Ty {
    constructor(t) {
        this.token = t,
        this.changeListener = null
    }
    getToken() {
        return Promise.resolve(this.token)
    }
    invalidateToken() {}
    start(t, e) {
        this.changeListener = e,
        t.enqueueRetryable( () => e(this.token.user))
    }
    shutdown() {
        this.changeListener = null
    }
}
class Iy {
    constructor(t) {
        this.t = t,
        this.currentUser = bt.UNAUTHENTICATED,
        this.i = 0,
        this.forceRefresh = !1,
        this.auth = null
    }
    start(t, e) {
        let i = this.i;
        const s = h => this.i !== i ? (i = this.i,
        e(h)) : Promise.resolve();
        let r = new Oe;
        this.o = () => {
            this.i++,
            this.currentUser = this.u(),
            r.resolve(),
            r = new Oe,
            t.enqueueRetryable( () => s(this.currentUser))
        }
        ;
        const a = () => {
            const h = r;
            t.enqueueRetryable(async () => {
                await h.promise,
                await s(this.currentUser)
            }
            )
        }
          , l = h => {
            V("FirebaseAuthCredentialsProvider", "Auth detected"),
            this.auth = h,
            this.auth.addAuthTokenListener(this.o),
            a()
        }
        ;
        this.t.onInit(h => l(h)),
        setTimeout( () => {
            if (!this.auth) {
                const h = this.t.getImmediate({
                    optional: !0
                });
                h ? l(h) : (V("FirebaseAuthCredentialsProvider", "Auth not yet detected"),
                r.resolve(),
                r = new Oe)
            }
        }
        , 0),
        a()
    }
    getToken() {
        const t = this.i
          , e = this.forceRefresh;
        return this.forceRefresh = !1,
        this.auth ? this.auth.getToken(e).then(i => this.i !== t ? (V("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."),
        this.getToken()) : i ? (dt(typeof i.accessToken == "string"),
        new zu(i.accessToken,this.currentUser)) : null) : Promise.resolve(null)
    }
    invalidateToken() {
        this.forceRefresh = !0
    }
    shutdown() {
        this.auth && this.auth.removeAuthTokenListener(this.o)
    }
    u() {
        const t = this.auth && this.auth.getUid();
        return dt(t === null || typeof t == "string"),
        new bt(t)
    }
}
class wy {
    constructor(t, e, i) {
        this.l = t,
        this.h = e,
        this.P = i,
        this.type = "FirstParty",
        this.user = bt.FIRST_PARTY,
        this.I = new Map
    }
    T() {
        return this.P ? this.P() : null
    }
    get headers() {
        this.I.set("X-Goog-AuthUser", this.l);
        const t = this.T();
        return t && this.I.set("Authorization", t),
        this.h && this.I.set("X-Goog-Iam-Authorization-Token", this.h),
        this.I
    }
}
class Cy {
    constructor(t, e, i) {
        this.l = t,
        this.h = e,
        this.P = i
    }
    getToken() {
        return Promise.resolve(new wy(this.l,this.h,this.P))
    }
    start(t, e) {
        t.enqueueRetryable( () => e(bt.FIRST_PARTY))
    }
    shutdown() {}
    invalidateToken() {}
}
class Ay {
    constructor(t) {
        this.value = t,
        this.type = "AppCheck",
        this.headers = new Map,
        t && t.length > 0 && this.headers.set("x-firebase-appcheck", this.value)
    }
}
class Ry {
    constructor(t) {
        this.A = t,
        this.forceRefresh = !1,
        this.appCheck = null,
        this.R = null
    }
    start(t, e) {
        const i = r => {
            r.error != null && V("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);
            const a = r.token !== this.R;
            return this.R = r.token,
            V("FirebaseAppCheckTokenProvider", `Received ${a ? "new" : "existing"} token.`),
            a ? e(r.token) : Promise.resolve()
        }
        ;
        this.o = r => {
            t.enqueueRetryable( () => i(r))
        }
        ;
        const s = r => {
            V("FirebaseAppCheckTokenProvider", "AppCheck detected"),
            this.appCheck = r,
            this.appCheck.addTokenListener(this.o)
        }
        ;
        this.A.onInit(r => s(r)),
        setTimeout( () => {
            if (!this.appCheck) {
                const r = this.A.getImmediate({
                    optional: !0
                });
                r ? s(r) : V("FirebaseAppCheckTokenProvider", "AppCheck not yet detected")
            }
        }
        , 0)
    }
    getToken() {
        const t = this.forceRefresh;
        return this.forceRefresh = !1,
        this.appCheck ? this.appCheck.getToken(t).then(e => e ? (dt(typeof e.token == "string"),
        this.R = e.token,
        new Ay(e.token)) : null) : Promise.resolve(null)
    }
    invalidateToken() {
        this.forceRefresh = !0
    }
    shutdown() {
        this.appCheck && this.appCheck.removeTokenListener(this.o)
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Sy(n) {
    const t = typeof self < "u" && (self.crypto || self.msCrypto)
      , e = new Uint8Array(n);
    if (t && typeof t.getRandomValues == "function")
        t.getRandomValues(e);
    else
        for (let i = 0; i < n; i++)
            e[i] = Math.floor(256 * Math.random());
    return e
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Py {
    static newId() {
        const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
          , e = Math.floor(256 / t.length) * t.length;
        let i = "";
        for (; i.length < 20; ) {
            const s = Sy(40);
            for (let r = 0; r < s.length; ++r)
                i.length < 20 && s[r] < e && (i += t.charAt(s[r] % t.length))
        }
        return i
    }
}
function Q(n, t) {
    return n < t ? -1 : n > t ? 1 : 0
}
function fn(n, t, e) {
    return n.length === t.length && n.every( (i, s) => e(i, t[s]))
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mt {
    constructor(t, e) {
        if (this.seconds = t,
        this.nanoseconds = e,
        e < 0)
            throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: " + e);
        if (e >= 1e9)
            throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: " + e);
        if (t < -62135596800)
            throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: " + t);
        if (t >= 253402300800)
            throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: " + t)
    }
    static now() {
        return mt.fromMillis(Date.now())
    }
    static fromDate(t) {
        return mt.fromMillis(t.getTime())
    }
    static fromMillis(t) {
        const e = Math.floor(t / 1e3)
          , i = Math.floor(1e6 * (t - 1e3 * e));
        return new mt(e,i)
    }
    toDate() {
        return new Date(this.toMillis())
    }
    toMillis() {
        return 1e3 * this.seconds + this.nanoseconds / 1e6
    }
    _compareTo(t) {
        return this.seconds === t.seconds ? Q(this.nanoseconds, t.nanoseconds) : Q(this.seconds, t.seconds)
    }
    isEqual(t) {
        return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds
    }
    toString() {
        return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")"
    }
    toJSON() {
        return {
            seconds: this.seconds,
            nanoseconds: this.nanoseconds
        }
    }
    valueOf() {
        const t = this.seconds - -62135596800;
        return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0")
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class F {
    constructor(t) {
        this.timestamp = t
    }
    static fromTimestamp(t) {
        return new F(t)
    }
    static min() {
        return new F(new mt(0,0))
    }
    static max() {
        return new F(new mt(253402300799,999999999))
    }
    compareTo(t) {
        return this.timestamp._compareTo(t.timestamp)
    }
    isEqual(t) {
        return this.timestamp.isEqual(t.timestamp)
    }
    toMicroseconds() {
        return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3
    }
    toString() {
        return "SnapshotVersion(" + this.timestamp.toString() + ")"
    }
    toTimestamp() {
        return this.timestamp
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ei {
    constructor(t, e, i) {
        e === void 0 ? e = 0 : e > t.length && U(),
        i === void 0 ? i = t.length - e : i > t.length - e && U(),
        this.segments = t,
        this.offset = e,
        this.len = i
    }
    get length() {
        return this.len
    }
    isEqual(t) {
        return Ei.comparator(this, t) === 0
    }
    child(t) {
        const e = this.segments.slice(this.offset, this.limit());
        return t instanceof Ei ? t.forEach(i => {
            e.push(i)
        }
        ) : e.push(t),
        this.construct(e)
    }
    limit() {
        return this.offset + this.length
    }
    popFirst(t) {
        return t = t === void 0 ? 1 : t,
        this.construct(this.segments, this.offset + t, this.length - t)
    }
    popLast() {
        return this.construct(this.segments, this.offset, this.length - 1)
    }
    firstSegment() {
        return this.segments[this.offset]
    }
    lastSegment() {
        return this.get(this.length - 1)
    }
    get(t) {
        return this.segments[this.offset + t]
    }
    isEmpty() {
        return this.length === 0
    }
    isPrefixOf(t) {
        if (t.length < this.length)
            return !1;
        for (let e = 0; e < this.length; e++)
            if (this.get(e) !== t.get(e))
                return !1;
        return !0
    }
    isImmediateParentOf(t) {
        if (this.length + 1 !== t.length)
            return !1;
        for (let e = 0; e < this.length; e++)
            if (this.get(e) !== t.get(e))
                return !1;
        return !0
    }
    forEach(t) {
        for (let e = this.offset, i = this.limit(); e < i; e++)
            t(this.segments[e])
    }
    toArray() {
        return this.segments.slice(this.offset, this.limit())
    }
    static comparator(t, e) {
        const i = Math.min(t.length, e.length);
        for (let s = 0; s < i; s++) {
            const r = t.get(s)
              , a = e.get(s);
            if (r < a)
                return -1;
            if (r > a)
                return 1
        }
        return t.length < e.length ? -1 : t.length > e.length ? 1 : 0
    }
}
class st extends Ei {
    construct(t, e, i) {
        return new st(t,e,i)
    }
    canonicalString() {
        return this.toArray().join("/")
    }
    toString() {
        return this.canonicalString()
    }
    toUriEncodedString() {
        return this.toArray().map(encodeURIComponent).join("/")
    }
    static fromString(...t) {
        const e = [];
        for (const i of t) {
            if (i.indexOf("//") >= 0)
                throw new O(b.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);
            e.push(...i.split("/").filter(s => s.length > 0))
        }
        return new st(e)
    }
    static emptyPath() {
        return new st([])
    }
}
const by = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class kt extends Ei {
    construct(t, e, i) {
        return new kt(t,e,i)
    }
    static isValidIdentifier(t) {
        return by.test(t)
    }
    canonicalString() {
        return this.toArray().map(t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"),
        kt.isValidIdentifier(t) || (t = "`" + t + "`"),
        t)).join(".")
    }
    toString() {
        return this.canonicalString()
    }
    isKeyField() {
        return this.length === 1 && this.get(0) === "__name__"
    }
    static keyField() {
        return new kt(["__name__"])
    }
    static fromServerFormat(t) {
        const e = [];
        let i = ""
          , s = 0;
        const r = () => {
            if (i.length === 0)
                throw new O(b.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
            e.push(i),
            i = ""
        }
        ;
        let a = !1;
        for (; s < t.length; ) {
            const l = t[s];
            if (l === "\\") {
                if (s + 1 === t.length)
                    throw new O(b.INVALID_ARGUMENT,"Path has trailing escape character: " + t);
                const h = t[s + 1];
                if (h !== "\\" && h !== "." && h !== "`")
                    throw new O(b.INVALID_ARGUMENT,"Path has invalid escape sequence: " + t);
                i += h,
                s += 2
            } else
                l === "`" ? (a = !a,
                s++) : l !== "." || a ? (i += l,
                s++) : (r(),
                s++)
        }
        if (r(),
        a)
            throw new O(b.INVALID_ARGUMENT,"Unterminated ` in path: " + t);
        return new kt(e)
    }
    static emptyPath() {
        return new kt([])
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class M {
    constructor(t) {
        this.path = t
    }
    static fromPath(t) {
        return new M(st.fromString(t))
    }
    static fromName(t) {
        return new M(st.fromString(t).popFirst(5))
    }
    static empty() {
        return new M(st.emptyPath())
    }
    get collectionGroup() {
        return this.path.popLast().lastSegment()
    }
    hasCollectionId(t) {
        return this.path.length >= 2 && this.path.get(this.path.length - 2) === t
    }
    getCollectionGroup() {
        return this.path.get(this.path.length - 2)
    }
    getCollectionPath() {
        return this.path.popLast()
    }
    isEqual(t) {
        return t !== null && st.comparator(this.path, t.path) === 0
    }
    toString() {
        return this.path.toString()
    }
    static comparator(t, e) {
        return st.comparator(t.path, e.path)
    }
    static isDocumentKey(t) {
        return t.length % 2 == 0
    }
    static fromSegments(t) {
        return new M(new st(t.slice()))
    }
}
function Ny(n, t) {
    const e = n.toTimestamp().seconds
      , i = n.toTimestamp().nanoseconds + 1
      , s = F.fromTimestamp(i === 1e9 ? new mt(e + 1,0) : new mt(e,i));
    return new Te(s,M.empty(),t)
}
function Dy(n) {
    return new Te(n.readTime,n.key,-1)
}
class Te {
    constructor(t, e, i) {
        this.readTime = t,
        this.documentKey = e,
        this.largestBatchId = i
    }
    static min() {
        return new Te(F.min(),M.empty(),-1)
    }
    static max() {
        return new Te(F.max(),M.empty(),-1)
    }
}
function ky(n, t) {
    let e = n.readTime.compareTo(t.readTime);
    return e !== 0 ? e : (e = M.comparator(n.documentKey, t.documentKey),
    e !== 0 ? e : Q(n.largestBatchId, t.largestBatchId))
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const xy = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
class Vy {
    constructor() {
        this.onCommittedListeners = []
    }
    addOnCommittedListener(t) {
        this.onCommittedListeners.push(t)
    }
    raiseOnCommittedEvent() {
        this.onCommittedListeners.forEach(t => t())
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ta(n) {
    if (n.code !== b.FAILED_PRECONDITION || n.message !== xy)
        throw n;
    V("LocalStore", "Unexpectedly lost primary lease")
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class P {
    constructor(t) {
        this.nextCallback = null,
        this.catchCallback = null,
        this.result = void 0,
        this.error = void 0,
        this.isDone = !1,
        this.callbackAttached = !1,
        t(e => {
            this.isDone = !0,
            this.result = e,
            this.nextCallback && this.nextCallback(e)
        }
        , e => {
            this.isDone = !0,
            this.error = e,
            this.catchCallback && this.catchCallback(e)
        }
        )
    }
    catch(t) {
        return this.next(void 0, t)
    }
    next(t, e) {
        return this.callbackAttached && U(),
        this.callbackAttached = !0,
        this.isDone ? this.error ? this.wrapFailure(e, this.error) : this.wrapSuccess(t, this.result) : new P( (i, s) => {
            this.nextCallback = r => {
                this.wrapSuccess(t, r).next(i, s)
            }
            ,
            this.catchCallback = r => {
                this.wrapFailure(e, r).next(i, s)
            }
        }
        )
    }
    toPromise() {
        return new Promise( (t, e) => {
            this.next(t, e)
        }
        )
    }
    wrapUserFunction(t) {
        try {
            const e = t();
            return e instanceof P ? e : P.resolve(e)
        } catch (e) {
            return P.reject(e)
        }
    }
    wrapSuccess(t, e) {
        return t ? this.wrapUserFunction( () => t(e)) : P.resolve(e)
    }
    wrapFailure(t, e) {
        return t ? this.wrapUserFunction( () => t(e)) : P.reject(e)
    }
    static resolve(t) {
        return new P( (e, i) => {
            e(t)
        }
        )
    }
    static reject(t) {
        return new P( (e, i) => {
            i(t)
        }
        )
    }
    static waitFor(t) {
        return new P( (e, i) => {
            let s = 0
              , r = 0
              , a = !1;
            t.forEach(l => {
                ++s,
                l.next( () => {
                    ++r,
                    a && r === s && e()
                }
                , h => i(h))
            }
            ),
            a = !0,
            r === s && e()
        }
        )
    }
    static or(t) {
        let e = P.resolve(!1);
        for (const i of t)
            e = e.next(s => s ? P.resolve(s) : i());
        return e
    }
    static forEach(t, e) {
        const i = [];
        return t.forEach( (s, r) => {
            i.push(e.call(this, s, r))
        }
        ),
        this.waitFor(i)
    }
    static mapArray(t, e) {
        return new P( (i, s) => {
            const r = t.length
              , a = new Array(r);
            let l = 0;
            for (let h = 0; h < r; h++) {
                const d = h;
                e(t[d]).next(f => {
                    a[d] = f,
                    ++l,
                    l === r && i(a)
                }
                , f => s(f))
            }
        }
        )
    }
    static doWhile(t, e) {
        return new P( (i, s) => {
            const r = () => {
                t() === !0 ? e().next( () => {
                    r()
                }
                , s) : i()
            }
            ;
            r()
        }
        )
    }
}
function Oy(n) {
    const t = n.match(/Android ([\d.]+)/i)
      , e = t ? t[1].split(".").slice(0, 2).join(".") : "-1";
    return Number(e)
}
function Di(n) {
    return n.name === "IndexedDbTransactionError"
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ea {
    constructor(t, e) {
        this.previousValue = t,
        e && (e.sequenceNumberHandler = i => this.ie(i),
        this.se = i => e.writeSequenceNumber(i))
    }
    ie(t) {
        return this.previousValue = Math.max(t, this.previousValue),
        this.previousValue
    }
    next() {
        const t = ++this.previousValue;
        return this.se && this.se(t),
        t
    }
}
ea.oe = -1;
function js(n) {
    return n == null
}
function bs(n) {
    return n === 0 && 1 / n == -1 / 0
}
function My(n) {
    return typeof n == "number" && Number.isInteger(n) && !bs(n) && n <= Number.MAX_SAFE_INTEGER && n >= Number.MIN_SAFE_INTEGER
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ec(n) {
    let t = 0;
    for (const e in n)
        Object.prototype.hasOwnProperty.call(n, e) && t++;
    return t
}
function ki(n, t) {
    for (const e in n)
        Object.prototype.hasOwnProperty.call(n, e) && t(e, n[e])
}
function Gu(n) {
    for (const t in n)
        if (Object.prototype.hasOwnProperty.call(n, t))
            return !1;
    return !0
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class at {
    constructor(t, e) {
        this.comparator = t,
        this.root = e || Et.EMPTY
    }
    insert(t, e) {
        return new at(this.comparator,this.root.insert(t, e, this.comparator).copy(null, null, Et.BLACK, null, null))
    }
    remove(t) {
        return new at(this.comparator,this.root.remove(t, this.comparator).copy(null, null, Et.BLACK, null, null))
    }
    get(t) {
        let e = this.root;
        for (; !e.isEmpty(); ) {
            const i = this.comparator(t, e.key);
            if (i === 0)
                return e.value;
            i < 0 ? e = e.left : i > 0 && (e = e.right)
        }
        return null
    }
    indexOf(t) {
        let e = 0
          , i = this.root;
        for (; !i.isEmpty(); ) {
            const s = this.comparator(t, i.key);
            if (s === 0)
                return e + i.left.size;
            s < 0 ? i = i.left : (e += i.left.size + 1,
            i = i.right)
        }
        return -1
    }
    isEmpty() {
        return this.root.isEmpty()
    }
    get size() {
        return this.root.size
    }
    minKey() {
        return this.root.minKey()
    }
    maxKey() {
        return this.root.maxKey()
    }
    inorderTraversal(t) {
        return this.root.inorderTraversal(t)
    }
    forEach(t) {
        this.inorderTraversal( (e, i) => (t(e, i),
        !1))
    }
    toString() {
        const t = [];
        return this.inorderTraversal( (e, i) => (t.push(`${e}:${i}`),
        !1)),
        `{${t.join(", ")}}`
    }
    reverseTraversal(t) {
        return this.root.reverseTraversal(t)
    }
    getIterator() {
        return new ss(this.root,null,this.comparator,!1)
    }
    getIteratorFrom(t) {
        return new ss(this.root,t,this.comparator,!1)
    }
    getReverseIterator() {
        return new ss(this.root,null,this.comparator,!0)
    }
    getReverseIteratorFrom(t) {
        return new ss(this.root,t,this.comparator,!0)
    }
}
class ss {
    constructor(t, e, i, s) {
        this.isReverse = s,
        this.nodeStack = [];
        let r = 1;
        for (; !t.isEmpty(); )
            if (r = e ? i(t.key, e) : 1,
            e && s && (r *= -1),
            r < 0)
                t = this.isReverse ? t.left : t.right;
            else {
                if (r === 0) {
                    this.nodeStack.push(t);
                    break
                }
                this.nodeStack.push(t),
                t = this.isReverse ? t.right : t.left
            }
    }
    getNext() {
        let t = this.nodeStack.pop();
        const e = {
            key: t.key,
            value: t.value
        };
        if (this.isReverse)
            for (t = t.left; !t.isEmpty(); )
                this.nodeStack.push(t),
                t = t.right;
        else
            for (t = t.right; !t.isEmpty(); )
                this.nodeStack.push(t),
                t = t.left;
        return e
    }
    hasNext() {
        return this.nodeStack.length > 0
    }
    peek() {
        if (this.nodeStack.length === 0)
            return null;
        const t = this.nodeStack[this.nodeStack.length - 1];
        return {
            key: t.key,
            value: t.value
        }
    }
}
class Et {
    constructor(t, e, i, s, r) {
        this.key = t,
        this.value = e,
        this.color = i ?? Et.RED,
        this.left = s ?? Et.EMPTY,
        this.right = r ?? Et.EMPTY,
        this.size = this.left.size + 1 + this.right.size
    }
    copy(t, e, i, s, r) {
        return new Et(t ?? this.key,e ?? this.value,i ?? this.color,s ?? this.left,r ?? this.right)
    }
    isEmpty() {
        return !1
    }
    inorderTraversal(t) {
        return this.left.inorderTraversal(t) || t(this.key, this.value) || this.right.inorderTraversal(t)
    }
    reverseTraversal(t) {
        return this.right.reverseTraversal(t) || t(this.key, this.value) || this.left.reverseTraversal(t)
    }
    min() {
        return this.left.isEmpty() ? this : this.left.min()
    }
    minKey() {
        return this.min().key
    }
    maxKey() {
        return this.right.isEmpty() ? this.key : this.right.maxKey()
    }
    insert(t, e, i) {
        let s = this;
        const r = i(t, s.key);
        return s = r < 0 ? s.copy(null, null, null, s.left.insert(t, e, i), null) : r === 0 ? s.copy(null, e, null, null, null) : s.copy(null, null, null, null, s.right.insert(t, e, i)),
        s.fixUp()
    }
    removeMin() {
        if (this.left.isEmpty())
            return Et.EMPTY;
        let t = this;
        return t.left.isRed() || t.left.left.isRed() || (t = t.moveRedLeft()),
        t = t.copy(null, null, null, t.left.removeMin(), null),
        t.fixUp()
    }
    remove(t, e) {
        let i, s = this;
        if (e(t, s.key) < 0)
            s.left.isEmpty() || s.left.isRed() || s.left.left.isRed() || (s = s.moveRedLeft()),
            s = s.copy(null, null, null, s.left.remove(t, e), null);
        else {
            if (s.left.isRed() && (s = s.rotateRight()),
            s.right.isEmpty() || s.right.isRed() || s.right.left.isRed() || (s = s.moveRedRight()),
            e(t, s.key) === 0) {
                if (s.right.isEmpty())
                    return Et.EMPTY;
                i = s.right.min(),
                s = s.copy(i.key, i.value, null, null, s.right.removeMin())
            }
            s = s.copy(null, null, null, null, s.right.remove(t, e))
        }
        return s.fixUp()
    }
    isRed() {
        return this.color
    }
    fixUp() {
        let t = this;
        return t.right.isRed() && !t.left.isRed() && (t = t.rotateLeft()),
        t.left.isRed() && t.left.left.isRed() && (t = t.rotateRight()),
        t.left.isRed() && t.right.isRed() && (t = t.colorFlip()),
        t
    }
    moveRedLeft() {
        let t = this.colorFlip();
        return t.right.left.isRed() && (t = t.copy(null, null, null, null, t.right.rotateRight()),
        t = t.rotateLeft(),
        t = t.colorFlip()),
        t
    }
    moveRedRight() {
        let t = this.colorFlip();
        return t.left.left.isRed() && (t = t.rotateRight(),
        t = t.colorFlip()),
        t
    }
    rotateLeft() {
        const t = this.copy(null, null, Et.RED, null, this.right.left);
        return this.right.copy(null, null, this.color, t, null)
    }
    rotateRight() {
        const t = this.copy(null, null, Et.RED, this.left.right, null);
        return this.left.copy(null, null, this.color, null, t)
    }
    colorFlip() {
        const t = this.left.copy(null, null, !this.left.color, null, null)
          , e = this.right.copy(null, null, !this.right.color, null, null);
        return this.copy(null, null, !this.color, t, e)
    }
    checkMaxDepth() {
        const t = this.check();
        return Math.pow(2, t) <= this.size + 1
    }
    check() {
        if (this.isRed() && this.left.isRed() || this.right.isRed())
            throw U();
        const t = this.left.check();
        if (t !== this.right.check())
            throw U();
        return t + (this.isRed() ? 0 : 1)
    }
}
Et.EMPTY = null,
Et.RED = !0,
Et.BLACK = !1;
Et.EMPTY = new class {
    constructor() {
        this.size = 0
    }
    get key() {
        throw U()
    }
    get value() {
        throw U()
    }
    get color() {
        throw U()
    }
    get left() {
        throw U()
    }
    get right() {
        throw U()
    }
    copy(t, e, i, s, r) {
        return this
    }
    insert(t, e, i) {
        return new Et(t,e)
    }
    remove(t, e) {
        return this
    }
    isEmpty() {
        return !0
    }
    inorderTraversal(t) {
        return !1
    }
    reverseTraversal(t) {
        return !1
    }
    minKey() {
        return null
    }
    maxKey() {
        return null
    }
    isRed() {
        return !1
    }
    checkMaxDepth() {
        return !0
    }
    check() {
        return 0
    }
}
;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class It {
    constructor(t) {
        this.comparator = t,
        this.data = new at(this.comparator)
    }
    has(t) {
        return this.data.get(t) !== null
    }
    first() {
        return this.data.minKey()
    }
    last() {
        return this.data.maxKey()
    }
    get size() {
        return this.data.size
    }
    indexOf(t) {
        return this.data.indexOf(t)
    }
    forEach(t) {
        this.data.inorderTraversal( (e, i) => (t(e),
        !1))
    }
    forEachInRange(t, e) {
        const i = this.data.getIteratorFrom(t[0]);
        for (; i.hasNext(); ) {
            const s = i.getNext();
            if (this.comparator(s.key, t[1]) >= 0)
                return;
            e(s.key)
        }
    }
    forEachWhile(t, e) {
        let i;
        for (i = e !== void 0 ? this.data.getIteratorFrom(e) : this.data.getIterator(); i.hasNext(); )
            if (!t(i.getNext().key))
                return
    }
    firstAfterOrEqual(t) {
        const e = this.data.getIteratorFrom(t);
        return e.hasNext() ? e.getNext().key : null
    }
    getIterator() {
        return new Tc(this.data.getIterator())
    }
    getIteratorFrom(t) {
        return new Tc(this.data.getIteratorFrom(t))
    }
    add(t) {
        return this.copy(this.data.remove(t).insert(t, !0))
    }
    delete(t) {
        return this.has(t) ? this.copy(this.data.remove(t)) : this
    }
    isEmpty() {
        return this.data.isEmpty()
    }
    unionWith(t) {
        let e = this;
        return e.size < t.size && (e = t,
        t = this),
        t.forEach(i => {
            e = e.add(i)
        }
        ),
        e
    }
    isEqual(t) {
        if (!(t instanceof It) || this.size !== t.size)
            return !1;
        const e = this.data.getIterator()
          , i = t.data.getIterator();
        for (; e.hasNext(); ) {
            const s = e.getNext().key
              , r = i.getNext().key;
            if (this.comparator(s, r) !== 0)
                return !1
        }
        return !0
    }
    toArray() {
        const t = [];
        return this.forEach(e => {
            t.push(e)
        }
        ),
        t
    }
    toString() {
        const t = [];
        return this.forEach(e => t.push(e)),
        "SortedSet(" + t.toString() + ")"
    }
    copy(t) {
        const e = new It(this.comparator);
        return e.data = t,
        e
    }
}
class Tc {
    constructor(t) {
        this.iter = t
    }
    getNext() {
        return this.iter.getNext().key
    }
    hasNext() {
        return this.iter.hasNext()
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class de {
    constructor(t) {
        this.fields = t,
        t.sort(kt.comparator)
    }
    static empty() {
        return new de([])
    }
    unionWith(t) {
        let e = new It(kt.comparator);
        for (const i of this.fields)
            e = e.add(i);
        for (const i of t)
            e = e.add(i);
        return new de(e.toArray())
    }
    covers(t) {
        for (const e of this.fields)
            if (e.isPrefixOf(t))
                return !0;
        return !1
    }
    isEqual(t) {
        return fn(this.fields, t.fields, (e, i) => e.isEqual(i))
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hu extends Error {
    constructor() {
        super(...arguments),
        this.name = "Base64DecodeError"
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wt {
    constructor(t) {
        this.binaryString = t
    }
    static fromBase64String(t) {
        const e = function(s) {
            try {
                return atob(s)
            } catch (r) {
                throw typeof DOMException < "u" && r instanceof DOMException ? new Hu("Invalid base64 string: " + r) : r
            }
        }(t);
        return new wt(e)
    }
    static fromUint8Array(t) {
        const e = function(s) {
            let r = "";
            for (let a = 0; a < s.length; ++a)
                r += String.fromCharCode(s[a]);
            return r
        }(t);
        return new wt(e)
    }
    [Symbol.iterator]() {
        let t = 0;
        return {
            next: () => t < this.binaryString.length ? {
                value: this.binaryString.charCodeAt(t++),
                done: !1
            } : {
                value: void 0,
                done: !0
            }
        }
    }
    toBase64() {
        return function(e) {
            return btoa(e)
        }(this.binaryString)
    }
    toUint8Array() {
        return function(e) {
            const i = new Uint8Array(e.length);
            for (let s = 0; s < e.length; s++)
                i[s] = e.charCodeAt(s);
            return i
        }(this.binaryString)
    }
    approximateByteSize() {
        return 2 * this.binaryString.length
    }
    compareTo(t) {
        return Q(this.binaryString, t.binaryString)
    }
    isEqual(t) {
        return this.binaryString === t.binaryString
    }
}
wt.EMPTY_BYTE_STRING = new wt("");
const Ly = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function Ie(n) {
    if (dt(!!n),
    typeof n == "string") {
        let t = 0;
        const e = Ly.exec(n);
        if (dt(!!e),
        e[1]) {
            let s = e[1];
            s = (s + "000000000").substr(0, 9),
            t = Number(s)
        }
        const i = new Date(n);
        return {
            seconds: Math.floor(i.getTime() / 1e3),
            nanos: t
        }
    }
    return {
        seconds: ht(n.seconds),
        nanos: ht(n.nanos)
    }
}
function ht(n) {
    return typeof n == "number" ? n : typeof n == "string" ? Number(n) : 0
}
function je(n) {
    return typeof n == "string" ? wt.fromBase64String(n) : wt.fromUint8Array(n)
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function na(n) {
    var t, e;
    return ((e = (((t = n == null ? void 0 : n.mapValue) === null || t === void 0 ? void 0 : t.fields) || {}).__type__) === null || e === void 0 ? void 0 : e.stringValue) === "server_timestamp"
}
function ia(n) {
    const t = n.mapValue.fields.__previous_value__;
    return na(t) ? ia(t) : t
}
function Ti(n) {
    const t = Ie(n.mapValue.fields.__local_write_time__.timestampValue);
    return new mt(t.seconds,t.nanos)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fy {
    constructor(t, e, i, s, r, a, l, h, d) {
        this.databaseId = t,
        this.appId = e,
        this.persistenceKey = i,
        this.host = s,
        this.ssl = r,
        this.forceLongPolling = a,
        this.autoDetectLongPolling = l,
        this.longPollingOptions = h,
        this.useFetchStreams = d
    }
}
class Ii {
    constructor(t, e) {
        this.projectId = t,
        this.database = e || "(default)"
    }
    static empty() {
        return new Ii("","")
    }
    get isDefaultDatabase() {
        return this.database === "(default)"
    }
    isEqual(t) {
        return t instanceof Ii && t.projectId === this.projectId && t.database === this.database
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const rs = {
    mapValue: {
        fields: {
            __type__: {
                stringValue: "__max__"
            }
        }
    }
};
function $e(n) {
    return "nullValue"in n ? 0 : "booleanValue"in n ? 1 : "integerValue"in n || "doubleValue"in n ? 2 : "timestampValue"in n ? 3 : "stringValue"in n ? 5 : "bytesValue"in n ? 6 : "referenceValue"in n ? 7 : "geoPointValue"in n ? 8 : "arrayValue"in n ? 9 : "mapValue"in n ? na(n) ? 4 : Uy(n) ? 9007199254740991 : 10 : U()
}
function Qt(n, t) {
    if (n === t)
        return !0;
    const e = $e(n);
    if (e !== $e(t))
        return !1;
    switch (e) {
    case 0:
    case 9007199254740991:
        return !0;
    case 1:
        return n.booleanValue === t.booleanValue;
    case 4:
        return Ti(n).isEqual(Ti(t));
    case 3:
        return function(s, r) {
            if (typeof s.timestampValue == "string" && typeof r.timestampValue == "string" && s.timestampValue.length === r.timestampValue.length)
                return s.timestampValue === r.timestampValue;
            const a = Ie(s.timestampValue)
              , l = Ie(r.timestampValue);
            return a.seconds === l.seconds && a.nanos === l.nanos
        }(n, t);
    case 5:
        return n.stringValue === t.stringValue;
    case 6:
        return function(s, r) {
            return je(s.bytesValue).isEqual(je(r.bytesValue))
        }(n, t);
    case 7:
        return n.referenceValue === t.referenceValue;
    case 8:
        return function(s, r) {
            return ht(s.geoPointValue.latitude) === ht(r.geoPointValue.latitude) && ht(s.geoPointValue.longitude) === ht(r.geoPointValue.longitude)
        }(n, t);
    case 2:
        return function(s, r) {
            if ("integerValue"in s && "integerValue"in r)
                return ht(s.integerValue) === ht(r.integerValue);
            if ("doubleValue"in s && "doubleValue"in r) {
                const a = ht(s.doubleValue)
                  , l = ht(r.doubleValue);
                return a === l ? bs(a) === bs(l) : isNaN(a) && isNaN(l)
            }
            return !1
        }(n, t);
    case 9:
        return fn(n.arrayValue.values || [], t.arrayValue.values || [], Qt);
    case 10:
        return function(s, r) {
            const a = s.mapValue.fields || {}
              , l = r.mapValue.fields || {};
            if (Ec(a) !== Ec(l))
                return !1;
            for (const h in a)
                if (a.hasOwnProperty(h) && (l[h] === void 0 || !Qt(a[h], l[h])))
                    return !1;
            return !0
        }(n, t);
    default:
        return U()
    }
}
function wi(n, t) {
    return (n.values || []).find(e => Qt(e, t)) !== void 0
}
function pn(n, t) {
    if (n === t)
        return 0;
    const e = $e(n)
      , i = $e(t);
    if (e !== i)
        return Q(e, i);
    switch (e) {
    case 0:
    case 9007199254740991:
        return 0;
    case 1:
        return Q(n.booleanValue, t.booleanValue);
    case 2:
        return function(r, a) {
            const l = ht(r.integerValue || r.doubleValue)
              , h = ht(a.integerValue || a.doubleValue);
            return l < h ? -1 : l > h ? 1 : l === h ? 0 : isNaN(l) ? isNaN(h) ? 0 : -1 : 1
        }(n, t);
    case 3:
        return Ic(n.timestampValue, t.timestampValue);
    case 4:
        return Ic(Ti(n), Ti(t));
    case 5:
        return Q(n.stringValue, t.stringValue);
    case 6:
        return function(r, a) {
            const l = je(r)
              , h = je(a);
            return l.compareTo(h)
        }(n.bytesValue, t.bytesValue);
    case 7:
        return function(r, a) {
            const l = r.split("/")
              , h = a.split("/");
            for (let d = 0; d < l.length && d < h.length; d++) {
                const f = Q(l[d], h[d]);
                if (f !== 0)
                    return f
            }
            return Q(l.length, h.length)
        }(n.referenceValue, t.referenceValue);
    case 8:
        return function(r, a) {
            const l = Q(ht(r.latitude), ht(a.latitude));
            return l !== 0 ? l : Q(ht(r.longitude), ht(a.longitude))
        }(n.geoPointValue, t.geoPointValue);
    case 9:
        return function(r, a) {
            const l = r.values || []
              , h = a.values || [];
            for (let d = 0; d < l.length && d < h.length; ++d) {
                const f = pn(l[d], h[d]);
                if (f)
                    return f
            }
            return Q(l.length, h.length)
        }(n.arrayValue, t.arrayValue);
    case 10:
        return function(r, a) {
            if (r === rs.mapValue && a === rs.mapValue)
                return 0;
            if (r === rs.mapValue)
                return 1;
            if (a === rs.mapValue)
                return -1;
            const l = r.fields || {}
              , h = Object.keys(l)
              , d = a.fields || {}
              , f = Object.keys(d);
            h.sort(),
            f.sort();
            for (let _ = 0; _ < h.length && _ < f.length; ++_) {
                const m = Q(h[_], f[_]);
                if (m !== 0)
                    return m;
                const A = pn(l[h[_]], d[f[_]]);
                if (A !== 0)
                    return A
            }
            return Q(h.length, f.length)
        }(n.mapValue, t.mapValue);
    default:
        throw U()
    }
}
function Ic(n, t) {
    if (typeof n == "string" && typeof t == "string" && n.length === t.length)
        return Q(n, t);
    const e = Ie(n)
      , i = Ie(t)
      , s = Q(e.seconds, i.seconds);
    return s !== 0 ? s : Q(e.nanos, i.nanos)
}
function _n(n) {
    return io(n)
}
function io(n) {
    return "nullValue"in n ? "null" : "booleanValue"in n ? "" + n.booleanValue : "integerValue"in n ? "" + n.integerValue : "doubleValue"in n ? "" + n.doubleValue : "timestampValue"in n ? function(e) {
        const i = Ie(e);
        return `time(${i.seconds},${i.nanos})`
    }(n.timestampValue) : "stringValue"in n ? n.stringValue : "bytesValue"in n ? function(e) {
        return je(e).toBase64()
    }(n.bytesValue) : "referenceValue"in n ? function(e) {
        return M.fromName(e).toString()
    }(n.referenceValue) : "geoPointValue"in n ? function(e) {
        return `geo(${e.latitude},${e.longitude})`
    }(n.geoPointValue) : "arrayValue"in n ? function(e) {
        let i = "["
          , s = !0;
        for (const r of e.values || [])
            s ? s = !1 : i += ",",
            i += io(r);
        return i + "]"
    }(n.arrayValue) : "mapValue"in n ? function(e) {
        const i = Object.keys(e.fields || {}).sort();
        let s = "{"
          , r = !0;
        for (const a of i)
            r ? r = !1 : s += ",",
            s += `${a}:${io(e.fields[a])}`;
        return s + "}"
    }(n.mapValue) : U()
}
function wc(n, t) {
    return {
        referenceValue: `projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`
    }
}
function so(n) {
    return !!n && "integerValue"in n
}
function sa(n) {
    return !!n && "arrayValue"in n
}
function Cc(n) {
    return !!n && "nullValue"in n
}
function Ac(n) {
    return !!n && "doubleValue"in n && isNaN(Number(n.doubleValue))
}
function xr(n) {
    return !!n && "mapValue"in n
}
function ri(n) {
    if (n.geoPointValue)
        return {
            geoPointValue: Object.assign({}, n.geoPointValue)
        };
    if (n.timestampValue && typeof n.timestampValue == "object")
        return {
            timestampValue: Object.assign({}, n.timestampValue)
        };
    if (n.mapValue) {
        const t = {
            mapValue: {
                fields: {}
            }
        };
        return ki(n.mapValue.fields, (e, i) => t.mapValue.fields[e] = ri(i)),
        t
    }
    if (n.arrayValue) {
        const t = {
            arrayValue: {
                values: []
            }
        };
        for (let e = 0; e < (n.arrayValue.values || []).length; ++e)
            t.arrayValue.values[e] = ri(n.arrayValue.values[e]);
        return t
    }
    return Object.assign({}, n)
}
function Uy(n) {
    return (((n.mapValue || {}).fields || {}).__type__ || {}).stringValue === "__max__"
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Gt {
    constructor(t) {
        this.value = t
    }
    static empty() {
        return new Gt({
            mapValue: {}
        })
    }
    field(t) {
        if (t.isEmpty())
            return this.value;
        {
            let e = this.value;
            for (let i = 0; i < t.length - 1; ++i)
                if (e = (e.mapValue.fields || {})[t.get(i)],
                !xr(e))
                    return null;
            return e = (e.mapValue.fields || {})[t.lastSegment()],
            e || null
        }
    }
    set(t, e) {
        this.getFieldsMap(t.popLast())[t.lastSegment()] = ri(e)
    }
    setAll(t) {
        let e = kt.emptyPath()
          , i = {}
          , s = [];
        t.forEach( (a, l) => {
            if (!e.isImmediateParentOf(l)) {
                const h = this.getFieldsMap(e);
                this.applyChanges(h, i, s),
                i = {},
                s = [],
                e = l.popLast()
            }
            a ? i[l.lastSegment()] = ri(a) : s.push(l.lastSegment())
        }
        );
        const r = this.getFieldsMap(e);
        this.applyChanges(r, i, s)
    }
    delete(t) {
        const e = this.field(t.popLast());
        xr(e) && e.mapValue.fields && delete e.mapValue.fields[t.lastSegment()]
    }
    isEqual(t) {
        return Qt(this.value, t.value)
    }
    getFieldsMap(t) {
        let e = this.value;
        e.mapValue.fields || (e.mapValue = {
            fields: {}
        });
        for (let i = 0; i < t.length; ++i) {
            let s = e.mapValue.fields[t.get(i)];
            xr(s) && s.mapValue.fields || (s = {
                mapValue: {
                    fields: {}
                }
            },
            e.mapValue.fields[t.get(i)] = s),
            e = s
        }
        return e.mapValue.fields
    }
    applyChanges(t, e, i) {
        ki(e, (s, r) => t[s] = r);
        for (const s of i)
            delete t[s]
    }
    clone() {
        return new Gt(ri(this.value))
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Dt {
    constructor(t, e, i, s, r, a, l) {
        this.key = t,
        this.documentType = e,
        this.version = i,
        this.readTime = s,
        this.createTime = r,
        this.data = a,
        this.documentState = l
    }
    static newInvalidDocument(t) {
        return new Dt(t,0,F.min(),F.min(),F.min(),Gt.empty(),0)
    }
    static newFoundDocument(t, e, i, s) {
        return new Dt(t,1,e,F.min(),i,s,0)
    }
    static newNoDocument(t, e) {
        return new Dt(t,2,e,F.min(),F.min(),Gt.empty(),0)
    }
    static newUnknownDocument(t, e) {
        return new Dt(t,3,e,F.min(),F.min(),Gt.empty(),2)
    }
    convertToFoundDocument(t, e) {
        return !this.createTime.isEqual(F.min()) || this.documentType !== 2 && this.documentType !== 0 || (this.createTime = t),
        this.version = t,
        this.documentType = 1,
        this.data = e,
        this.documentState = 0,
        this
    }
    convertToNoDocument(t) {
        return this.version = t,
        this.documentType = 2,
        this.data = Gt.empty(),
        this.documentState = 0,
        this
    }
    convertToUnknownDocument(t) {
        return this.version = t,
        this.documentType = 3,
        this.data = Gt.empty(),
        this.documentState = 2,
        this
    }
    setHasCommittedMutations() {
        return this.documentState = 2,
        this
    }
    setHasLocalMutations() {
        return this.documentState = 1,
        this.version = F.min(),
        this
    }
    setReadTime(t) {
        return this.readTime = t,
        this
    }
    get hasLocalMutations() {
        return this.documentState === 1
    }
    get hasCommittedMutations() {
        return this.documentState === 2
    }
    get hasPendingWrites() {
        return this.hasLocalMutations || this.hasCommittedMutations
    }
    isValidDocument() {
        return this.documentType !== 0
    }
    isFoundDocument() {
        return this.documentType === 1
    }
    isNoDocument() {
        return this.documentType === 2
    }
    isUnknownDocument() {
        return this.documentType === 3
    }
    isEqual(t) {
        return t instanceof Dt && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.documentType === t.documentType && this.documentState === t.documentState && this.data.isEqual(t.data)
    }
    mutableCopy() {
        return new Dt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)
    }
    toString() {
        return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`
    }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ns {
    constructor(t, e) {
        this.position = t,
        this.inclusive = e
    }
}
function Rc(n, t, e) {
    let i = 0;
    for (let s = 0; s < n.position.length; s++) {
        const r = t[s]
          , a = n.position[s];
        if (r.field.isKeyField() ? i = M.comparator(M.fromName(a.referenceValue), e.key) : i = pn(a, e.data.field(r.field)),
        r.dir === "desc" && (i *= -1),
        i !== 0)
            break
    }
    return i
}
function Sc(n, t) {
    if (n === null)
        return t === null;
    if (t === null || n.inclusive !== t.inclusive || n.position.length !== t.position.length)
        return !1;
    for (let e = 0; e < n.position.length; e++)
        if (!Qt(n.position[e], t.position[e]))
            return !1;
    return !0
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ds {
    constructor(t, e="asc") {
        this.field = t,
        this.dir = e
    }
}
function By(n, t) {
    return n.dir === t.dir && n.field.isEqual(t.field)
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ku {
}
class ut extends Ku {
    constructor(t, e, i) {
        super(),
        this.field = t,
        this.op = e,
        this.value = i
    }
    static create(t, e, i) {
        return t.isKeyField() ? e === "in" || e === "not-in" ? this.createKeyFieldInFilter(t, e, i) : new jy(t,e,i) : e === "array-contains" ? new zy(t,i) : e === "in" ? new Gy(t,i) : e === "not-in" ? new Hy(t,i) : e === "array-contains-any" ? new Ky(t,i) : new ut(t,e,i)
    }
    static createKeyFieldInFilter(t, e, i) {
        return e === "in" ? new $y(t,i) : new Wy(t,i)
    }
    matches(t) {
        const e = t.data.field(this.field);
        return this.op === "!=" ? e !== null && this.matchesComparison(pn(e, this.value)) : e !== null && $e(this.value) === $e(e) && this.matchesComparison(pn(e, this.value))
    }
    matchesComparison(t) {
        switch (this.op) {
        case "<":
            return t < 0;
        case "<=":
            return t <= 0;
        case "==":
            return t === 0;
        case "!=":
            return t !== 0;
        case ">":
            return t > 0;
        case ">=":
            return t >= 0;
        default:
            return U()
        }
    }
    isInequality() {
        return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0
    }
    getFlattenedFilters() {
        return [this]
    }
    getFilters() {
        return [this]
    }
}
class zt extends Ku {
    constructor(t, e) {
        super(),
        this.filters = t,
        this.op = e,
        this.ae = null
    }
    static create(t, e) {
        return new zt(t,e)
    }
    matches(t) {
        return Qu(this) ? this.filters.find(e => !e.matches(t)) === void 0 : this.filters.find(e => e.matches(t)) !== void 0
    }
    getFlattenedFilters() {
        return this.ae !== null || (this.ae = this.filters.reduce( (t, e) => t.concat(e.getFlattenedFilters()), [])),
        this.ae
    }
    getFilters() {
        return Object.assign([], this.filters)
    }
}
function Qu(n) {
    return n.op === "and"
}
function Yu(n) {
    return qy(n) && Qu(n)
}
function qy(n) {
    for (const t of n.filters)
        if (t instanceof zt)
            return !1;
    return !0
}
function ro(n) {
    if (n instanceof ut)
        return n.field.canonicalString() + n.op.toString() + _n(n.value);
    if (Yu(n))
        return n.filters.map(t => ro(t)).join(",");
    {
        const t = n.filters.map(e => ro(e)).join(",");
        return `${n.op}(${t})`
    }
}
function Xu(n, t) {
    return n instanceof ut ? function(i, s) {
        return s instanceof ut && i.op === s.op && i.field.isEqual(s.field) && Qt(i.value, s.value)
    }(n, t) : n instanceof zt ? function(i, s) {
        return s instanceof zt && i.op === s.op && i.filters.length === s.filters.length ? i.filters.reduce( (r, a, l) => r && Xu(a, s.filters[l]), !0) : !1
    }(n, t) : void U()
}
function Ju(n) {
    return n instanceof ut ? function(e) {
        return `${e.field.canonicalString()} ${e.op} ${_n(e.value)}`
    }(n) : n instanceof zt ? function(e) {
        return e.op.toString() + " {" + e.getFilters().map(Ju).join(" ,") + "}"
    }(n) : "Filter"
}
class jy extends ut {
    constructor(t, e, i) {
        super(t, e, i),
        this.key = M.fromName(i.referenceValue)
    }
    matches(t) {
        const e = M.comparator(t.key, this.key);
        return this.matchesComparison(e)
    }
}
class $y extends ut {
    constructor(t, e) {
        super(t, "in", e),
        this.keys = Zu("in", e)
    }
    matches(t) {
        return this.keys.some(e => e.isEqual(t.key))
    }
}
class Wy extends ut {
    constructor(t, e) {
        super(t, "not-in", e),
        this.keys = Zu("not-in", e)
    }
    matches(t) {
        return !this.keys.some(e => e.isEqual(t.key))
    }
}
function Zu(n, t) {
    var e;
    return (((e = t.arrayValue) === null || e === void 0 ? void 0 : e.values) || []).map(i => M.fromName(i.referenceValue))
}
class zy extends ut {
    constructor(t, e) {
        super(t, "array-contains", e)
    }
    matches(t) {
        const e = t.data.field(this.field);
        return sa(e) && wi(e.arrayValue, this.value)
    }
}
class Gy extends ut {
    constructor(t, e) {
        super(t, "in", e)
    }
    matches(t) {
        const e = t.data.field(this.field);
        return e !== null && wi(this.value.arrayValue, e)
    }
}
class Hy extends ut {
    constructor(t, e) {
        super(t, "not-in", e)
    }
    matches(t) {
        if (wi(this.value.arrayValue, {
            nullValue: "NULL_VALUE"
        }))
            return !1;
        const e = t.data.field(this.field);
        return e !== null && !wi(this.value.arrayValue, e)
    }
}
class Ky extends ut {
    constructor(t, e) {
        super(t, "array-contains-any", e)
    }
    matches(t) {
        const e = t.data.field(this.field);
        return !(!sa(e) || !e.arrayValue.values) && e.arrayValue.values.some(i => wi(this.value.arrayValue, i))
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Qy {
    constructor(t, e=null, i=[], s=[], r=null, a=null, l=null) {
        this.path = t,
        this.collectionGroup = e,
        this.orderBy = i,
        this.filters = s,
        this.limit = r,
        this.startAt = a,
        this.endAt = l,
        this.ue = null
    }
}
function Pc(n, t=null, e=[], i=[], s=null, r=null, a=null) {
    return new Qy(n,t,e,i,s,r,a)
}
function ra(n) {
    const t = z(n);
    if (t.ue === null) {
        let e = t.path.canonicalString();
        t.collectionGroup !== null && (e += "|cg:" + t.collectionGroup),
        e += "|f:",
        e += t.filters.map(i => ro(i)).join(","),
        e += "|ob:",
        e += t.orderBy.map(i => function(r) {
            return r.field.canonicalString() + r.dir
        }(i)).join(","),
        js(t.limit) || (e += "|l:",
        e += t.limit),
        t.startAt && (e += "|lb:",
        e += t.startAt.inclusive ? "b:" : "a:",
        e += t.startAt.position.map(i => _n(i)).join(",")),
        t.endAt && (e += "|ub:",
        e += t.endAt.inclusive ? "a:" : "b:",
        e += t.endAt.position.map(i => _n(i)).join(",")),
        t.ue = e
    }
    return t.ue
}
function oa(n, t) {
    if (n.limit !== t.limit || n.orderBy.length !== t.orderBy.length)
        return !1;
    for (let e = 0; e < n.orderBy.length; e++)
        if (!By(n.orderBy[e], t.orderBy[e]))
            return !1;
    if (n.filters.length !== t.filters.length)
        return !1;
    for (let e = 0; e < n.filters.length; e++)
        if (!Xu(n.filters[e], t.filters[e]))
            return !1;
    return n.collectionGroup === t.collectionGroup && !!n.path.isEqual(t.path) && !!Sc(n.startAt, t.startAt) && Sc(n.endAt, t.endAt)
}
function oo(n) {
    return M.isDocumentKey(n.path) && n.collectionGroup === null && n.filters.length === 0
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xi {
    constructor(t, e=null, i=[], s=[], r=null, a="F", l=null, h=null) {
        this.path = t,
        this.collectionGroup = e,
        this.explicitOrderBy = i,
        this.filters = s,
        this.limit = r,
        this.limitType = a,
        this.startAt = l,
        this.endAt = h,
        this.ce = null,
        this.le = null,
        this.he = null,
        this.startAt,
        this.endAt
    }
}
function Yy(n, t, e, i, s, r, a, l) {
    return new xi(n,t,e,i,s,r,a,l)
}
function td(n) {
    return new xi(n)
}
function bc(n) {
    return n.filters.length === 0 && n.limit === null && n.startAt == null && n.endAt == null && (n.explicitOrderBy.length === 0 || n.explicitOrderBy.length === 1 && n.explicitOrderBy[0].field.isKeyField())
}
function ed(n) {
    return n.collectionGroup !== null
}
function oi(n) {
    const t = z(n);
    if (t.ce === null) {
        t.ce = [];
        const e = new Set;
        for (const r of t.explicitOrderBy)
            t.ce.push(r),
            e.add(r.field.canonicalString());
        const i = t.explicitOrderBy.length > 0 ? t.explicitOrderBy[t.explicitOrderBy.length - 1].dir : "asc";
        (function(a) {
            let l = new It(kt.comparator);
            return a.filters.forEach(h => {
                h.getFlattenedFilters().forEach(d => {
                    d.isInequality() && (l = l.add(d.field))
                }
                )
            }
            ),
            l
        }
        )(t).forEach(r => {
            e.has(r.canonicalString()) || r.isKeyField() || t.ce.push(new Ds(r,i))
        }
        ),
        e.has(kt.keyField().canonicalString()) || t.ce.push(new Ds(kt.keyField(),i))
    }
    return t.ce
}
function Kt(n) {
    const t = z(n);
    return t.le || (t.le = Xy(t, oi(n))),
    t.le
}
function Xy(n, t) {
    if (n.limitType === "F")
        return Pc(n.path, n.collectionGroup, t, n.filters, n.limit, n.startAt, n.endAt);
    {
        t = t.map(s => {
            const r = s.dir === "desc" ? "asc" : "desc";
            return new Ds(s.field,r)
        }
        );
        const e = n.endAt ? new Ns(n.endAt.position,n.endAt.inclusive) : null
          , i = n.startAt ? new Ns(n.startAt.position,n.startAt.inclusive) : null;
        return Pc(n.path, n.collectionGroup, t, n.filters, n.limit, e, i)
    }
}
function ao(n, t) {
    const e = n.filters.concat([t]);
    return new xi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)
}
function lo(n, t, e) {
    return new xi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)
}
function $s(n, t) {
    return oa(Kt(n), Kt(t)) && n.limitType === t.limitType
}
function nd(n) {
    return `${ra(Kt(n))}|lt:${n.limitType}`
}
function Ye(n) {
    return `Query(target=${function(e) {
        leti = e.path.canonicalString();
        return e.collectionGroup !== null && (i += " collectionGroup=" + e.collectionGroup),
        e.filters.length > 0 && (i += `, filters: [${e.filters.map(s => Ju(s)).join(", ")}]`),
        js(e.limit) || (i += ", limit: " + e.limit),
        e.orderBy.length > 0 && (i += `, orderBy: [${e.orderBy.map(s => function(a) {
            return `${a.field.canonicalString()} (${a.dir})`
        }(s)).join(", ")}]`),
        e.startAt && (i += ", startAt: ",
        i += e.startAt.inclusive ? "b:" : "a:",
        i += e.startAt.position.map(s => _n(s)).join(",")),
        e.endAt && (i += ", endAt: ",
        i += e.endAt.inclusive ? "a:" : "b:",
        i += e.endAt.position.map(s => _n(s)).join(",")),
        `Target(${i})`
    }(Kt(n))}; limitType=${n.limitType})`
}
function Ws(n, t) {
    return t.isFoundDocument() && function(i, s) {
        const r = s.key.path;
        return i.collectionGroup !== null ? s.key.hasCollectionId(i.collectionGroup) && i.path.isPrefixOf(r) : M.isDocumentKey(i.path) ? i.path.isEqual(r) : i.path.isImmediateParentOf(r)
    }(n, t) && function(i, s) {
        for (const r of oi(i))
            if (!r.field.isKeyField() && s.data.field(r.field) === null)
                return !1;
        return !0
    }(n, t) && function(i, s) {
        for (const r of i.filters)
            if (!r.matches(s))
                return !1;
        return !0
    }(n, t) && function(i, s) {
        return !(i.startAt && !function(a, l, h) {
            const d = Rc(a, l, h);
            return a.inclusive ? d <= 0 : d < 0
        }(i.startAt, oi(i), s) || i.endAt && !function(a, l, h) {
            const d = Rc(a, l, h);
            return a.inclusive ? d >= 0 : d > 0
        }(i.endAt, oi(i), s))
    }(n, t)
}
function Jy(n) {
    return n.collectionGroup || (n.path.length % 2 == 1 ? n.path.lastSegment() : n.path.get(n.path.length - 2))
}
function id(n) {
    return (t, e) => {
        let i = !1;
        for (const s of oi(n)) {
            const r = Zy(s, t, e);
            if (r !== 0)
                return r;
            i = i || s.field.isKeyField()
        }
        return 0
    }
}
function Zy(n, t, e) {
    const i = n.field.isKeyField() ? M.comparator(t.key, e.key) : function(r, a, l) {
        const h = a.data.field(r)
          , d = l.data.field(r);
        return h !== null && d !== null ? pn(h, d) : U()
    }(n.field, t, e);
    switch (n.dir) {
    case "asc":
        return i;
    case "desc":
        return -1 * i;
    default:
        return U()
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cn {
    constructor(t, e) {
        this.mapKeyFn = t,
        this.equalsFn = e,
        this.inner = {},
        this.innerSize = 0
    }
    get(t) {
        const e = this.mapKeyFn(t)
          , i = this.inner[e];
        if (i !== void 0) {
            for (const [s,r] of i)
                if (this.equalsFn(s, t))
                    return r
        }
    }
    has(t) {
        return this.get(t) !== void 0
    }
    set(t, e) {
        const i = this.mapKeyFn(t)
          , s = this.inner[i];
        if (s === void 0)
            return this.inner[i] = [[t, e]],
            void this.innerSize++;
        for (let r = 0; r < s.length; r++)
            if (this.equalsFn(s[r][0], t))
                return void (s[r] = [t, e]);
        s.push([t, e]),
        this.innerSize++
    }
    delete(t) {
        const e = this.mapKeyFn(t)
          , i = this.inner[e];
        if (i === void 0)
            return !1;
        for (let s = 0; s < i.length; s++)
            if (this.equalsFn(i[s][0], t))
                return i.length === 1 ? delete this.inner[e] : i.splice(s, 1),
                this.innerSize--,
                !0;
        return !1
    }
    forEach(t) {
        ki(this.inner, (e, i) => {
            for (const [s,r] of i)
                t(s, r)
        }
        )
    }
    isEmpty() {
        return Gu(this.inner)
    }
    size() {
        return this.innerSize
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const tv = new at(M.comparator);
function we() {
    return tv
}
const sd = new at(M.comparator);
function Jn(...n) {
    let t = sd;
    for (const e of n)
        t = t.insert(e.key, e);
    return t
}
function ev(n) {
    let t = sd;
    return n.forEach( (e, i) => t = t.insert(e, i.overlayedDocument)),
    t
}
function ke() {
    return ai()
}
function rd() {
    return ai()
}
function ai() {
    return new Cn(n => n.toString(), (n, t) => n.isEqual(t))
}
const nv = new It(M.comparator);
function G(...n) {
    let t = nv;
    for (const e of n)
        t = t.add(e);
    return t
}
const iv = new It(Q);
function sv() {
    return iv
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function od(n, t) {
    if (n.useProto3Json) {
        if (isNaN(t))
            return {
                doubleValue: "NaN"
            };
        if (t === 1 / 0)
            return {
                doubleValue: "Infinity"
            };
        if (t === -1 / 0)
            return {
                doubleValue: "-Infinity"
            }
    }
    return {
        doubleValue: bs(t) ? "-0" : t
    }
}
function ad(n) {
    return {
        integerValue: "" + n
    }
}
function rv(n, t) {
    return My(t) ? ad(t) : od(n, t)
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zs {
    constructor() {
        this._ = void 0
    }
}
function ov(n, t, e) {
    return n instanceof co ? function(s, r) {
        const a = {
            fields: {
                __type__: {
                    stringValue: "server_timestamp"
                },
                __local_write_time__: {
                    timestampValue: {
                        seconds: s.seconds,
                        nanos: s.nanoseconds
                    }
                }
            }
        };
        return r && na(r) && (r = ia(r)),
        r && (a.fields.__previous_value__ = r),
        {
            mapValue: a
        }
    }(e, t) : n instanceof ks ? ld(n, t) : n instanceof xs ? cd(n, t) : function(s, r) {
        const a = lv(s, r)
          , l = Nc(a) + Nc(s.Pe);
        return so(a) && so(s.Pe) ? ad(l) : od(s.serializer, l)
    }(n, t)
}
function av(n, t, e) {
    return n instanceof ks ? ld(n, t) : n instanceof xs ? cd(n, t) : e
}
function lv(n, t) {
    return n instanceof ho ? function(i) {
        return so(i) || function(r) {
            return !!r && "doubleValue"in r
        }(i)
    }(t) ? t : {
        integerValue: 0
    } : null
}
class co extends zs {
}
class ks extends zs {
    constructor(t) {
        super(),
        this.elements = t
    }
}
function ld(n, t) {
    const e = hd(t);
    for (const i of n.elements)
        e.some(s => Qt(s, i)) || e.push(i);
    return {
        arrayValue: {
            values: e
        }
    }
}
class xs extends zs {
    constructor(t) {
        super(),
        this.elements = t
    }
}
function cd(n, t) {
    let e = hd(t);
    for (const i of n.elements)
        e = e.filter(s => !Qt(s, i));
    return {
        arrayValue: {
            values: e
        }
    }
}
class ho extends zs {
    constructor(t, e) {
        super(),
        this.serializer = t,
        this.Pe = e
    }
}
function Nc(n) {
    return ht(n.integerValue || n.doubleValue)
}
function hd(n) {
    return sa(n) && n.arrayValue.values ? n.arrayValue.values.slice() : []
}
function cv(n, t) {
    return n.field.isEqual(t.field) && function(i, s) {
        return i instanceof ks && s instanceof ks || i instanceof xs && s instanceof xs ? fn(i.elements, s.elements, Qt) : i instanceof ho && s instanceof ho ? Qt(i.Pe, s.Pe) : i instanceof co && s instanceof co
    }(n.transform, t.transform)
}
class Me {
    constructor(t, e) {
        this.updateTime = t,
        this.exists = e
    }
    static none() {
        return new Me
    }
    static exists(t) {
        return new Me(void 0,t)
    }
    static updateTime(t) {
        return new Me(t)
    }
    get isNone() {
        return this.updateTime === void 0 && this.exists === void 0
    }
    isEqual(t) {
        return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime)
    }
}
function us(n, t) {
    return n.updateTime !== void 0 ? t.isFoundDocument() && t.version.isEqual(n.updateTime) : n.exists === void 0 || n.exists === t.isFoundDocument()
}
class aa {
}
function ud(n, t) {
    if (!n.hasLocalMutations || t && t.fields.length === 0)
        return null;
    if (t === null)
        return n.isNoDocument() ? new uv(n.key,Me.none()) : new la(n.key,n.data,Me.none());
    {
        const e = n.data
          , i = Gt.empty();
        let s = new It(kt.comparator);
        for (let r of t.fields)
            if (!s.has(r)) {
                let a = e.field(r);
                a === null && r.length > 1 && (r = r.popLast(),
                a = e.field(r)),
                a === null ? i.delete(r) : i.set(r, a),
                s = s.add(r)
            }
        return new Gs(n.key,i,new de(s.toArray()),Me.none())
    }
}
function hv(n, t, e) {
    n instanceof la ? function(s, r, a) {
        const l = s.value.clone()
          , h = kc(s.fieldTransforms, r, a.transformResults);
        l.setAll(h),
        r.convertToFoundDocument(a.version, l).setHasCommittedMutations()
    }(n, t, e) : n instanceof Gs ? function(s, r, a) {
        if (!us(s.precondition, r))
            return void r.convertToUnknownDocument(a.version);
        const l = kc(s.fieldTransforms, r, a.transformResults)
          , h = r.data;
        h.setAll(dd(s)),
        h.setAll(l),
        r.convertToFoundDocument(a.version, h).setHasCommittedMutations()
    }(n, t, e) : function(s, r, a) {
        r.convertToNoDocument(a.version).setHasCommittedMutations()
    }(0, t, e)
}
function li(n, t, e, i) {
    return n instanceof la ? function(r, a, l, h) {
        if (!us(r.precondition, a))
            return l;
        const d = r.value.clone()
          , f = xc(r.fieldTransforms, h, a);
        return d.setAll(f),
        a.convertToFoundDocument(a.version, d).setHasLocalMutations(),
        null
    }(n, t, e, i) : n instanceof Gs ? function(r, a, l, h) {
        if (!us(r.precondition, a))
            return l;
        const d = xc(r.fieldTransforms, h, a)
          , f = a.data;
        return f.setAll(dd(r)),
        f.setAll(d),
        a.convertToFoundDocument(a.version, f).setHasLocalMutations(),
        l === null ? null : l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(_ => _.field))
    }(n, t, e, i) : function(r, a, l) {
        return us(r.precondition, a) ? (a.convertToNoDocument(a.version).setHasLocalMutations(),
        null) : l
    }(n, t, e)
}
function Dc(n, t) {
    return n.type === t.type && !!n.key.isEqual(t.key) && !!n.precondition.isEqual(t.precondition) && !!function(i, s) {
        return i === void 0 && s === void 0 || !(!i || !s) && fn(i, s, (r, a) => cv(r, a))
    }(n.fieldTransforms, t.fieldTransforms) && (n.type === 0 ? n.value.isEqual(t.value) : n.type !== 1 || n.data.isEqual(t.data) && n.fieldMask.isEqual(t.fieldMask))
}
class la extends aa {
    constructor(t, e, i, s=[]) {
        super(),
        this.key = t,
        this.value = e,
        this.precondition = i,
        this.fieldTransforms = s,
        this.type = 0
    }
    getFieldMask() {
        return null
    }
}
class Gs extends aa {
    constructor(t, e, i, s, r=[]) {
        super(),
        this.key = t,
        this.data = e,
        this.fieldMask = i,
        this.precondition = s,
        this.fieldTransforms = r,
        this.type = 1
    }
    getFieldMask() {
        return this.fieldMask
    }
}
function dd(n) {
    const t = new Map;
    return n.fieldMask.fields.forEach(e => {
        if (!e.isEmpty()) {
            const i = n.data.field(e);
            t.set(e, i)
        }
    }
    ),
    t
}
function kc(n, t, e) {
    const i = new Map;
    dt(n.length === e.length);
    for (let s = 0; s < e.length; s++) {
        const r = n[s]
          , a = r.transform
          , l = t.data.field(r.field);
        i.set(r.field, av(a, l, e[s]))
    }
    return i
}
function xc(n, t, e) {
    const i = new Map;
    for (const s of n) {
        const r = s.transform
          , a = e.data.field(s.field);
        i.set(s.field, ov(r, a, t))
    }
    return i
}
class uv extends aa {
    constructor(t, e) {
        super(),
        this.key = t,
        this.precondition = e,
        this.type = 2,
        this.fieldTransforms = []
    }
    getFieldMask() {
        return null
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class dv {
    constructor(t, e, i, s) {
        this.batchId = t,
        this.localWriteTime = e,
        this.baseMutations = i,
        this.mutations = s
    }
    applyToRemoteDocument(t, e) {
        const i = e.mutationResults;
        for (let s = 0; s < this.mutations.length; s++) {
            const r = this.mutations[s];
            r.key.isEqual(t.key) && hv(r, t, i[s])
        }
    }
    applyToLocalView(t, e) {
        for (const i of this.baseMutations)
            i.key.isEqual(t.key) && (e = li(i, t, e, this.localWriteTime));
        for (const i of this.mutations)
            i.key.isEqual(t.key) && (e = li(i, t, e, this.localWriteTime));
        return e
    }
    applyToLocalDocumentSet(t, e) {
        const i = rd();
        return this.mutations.forEach(s => {
            const r = t.get(s.key)
              , a = r.overlayedDocument;
            let l = this.applyToLocalView(a, r.mutatedFields);
            l = e.has(s.key) ? null : l;
            const h = ud(a, l);
            h !== null && i.set(s.key, h),
            a.isValidDocument() || a.convertToNoDocument(F.min())
        }
        ),
        i
    }
    keys() {
        return this.mutations.reduce( (t, e) => t.add(e.key), G())
    }
    isEqual(t) {
        return this.batchId === t.batchId && fn(this.mutations, t.mutations, (e, i) => Dc(e, i)) && fn(this.baseMutations, t.baseMutations, (e, i) => Dc(e, i))
    }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fv {
    constructor(t, e) {
        this.largestBatchId = t,
        this.mutation = e
    }
    getKey() {
        return this.mutation.key
    }
    isEqual(t) {
        return t !== null && this.mutation === t.mutation
    }
    toString() {
        return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class pv {
    constructor(t, e) {
        this.count = t,
        this.unchangedNames = e
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ct, $;
function fd(n) {
    if (n === void 0)
        return se("GRPC error has no .code"),
        b.UNKNOWN;
    switch (n) {
    case ct.OK:
        return b.OK;
    case ct.CANCELLED:
        return b.CANCELLED;
    case ct.UNKNOWN:
        return b.UNKNOWN;
    case ct.DEADLINE_EXCEEDED:
        return b.DEADLINE_EXCEEDED;
    case ct.RESOURCE_EXHAUSTED:
        return b.RESOURCE_EXHAUSTED;
    case ct.INTERNAL:
        return b.INTERNAL;
    case ct.UNAVAILABLE:
        return b.UNAVAILABLE;
    case ct.UNAUTHENTICATED:
        return b.UNAUTHENTICATED;
    case ct.INVALID_ARGUMENT:
        return b.INVALID_ARGUMENT;
    case ct.NOT_FOUND:
        return b.NOT_FOUND;
    case ct.ALREADY_EXISTS:
        return b.ALREADY_EXISTS;
    case ct.PERMISSION_DENIED:
        return b.PERMISSION_DENIED;
    case ct.FAILED_PRECONDITION:
        return b.FAILED_PRECONDITION;
    case ct.ABORTED:
        return b.ABORTED;
    case ct.OUT_OF_RANGE:
        return b.OUT_OF_RANGE;
    case ct.UNIMPLEMENTED:
        return b.UNIMPLEMENTED;
    case ct.DATA_LOSS:
        return b.DATA_LOSS;
    default:
        return U()
    }
}
($ = ct || (ct = {}))[$.OK = 0] = "OK",
$[$.CANCELLED = 1] = "CANCELLED",
$[$.UNKNOWN = 2] = "UNKNOWN",
$[$.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT",
$[$.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED",
$[$.NOT_FOUND = 5] = "NOT_FOUND",
$[$.ALREADY_EXISTS = 6] = "ALREADY_EXISTS",
$[$.PERMISSION_DENIED = 7] = "PERMISSION_DENIED",
$[$.UNAUTHENTICATED = 16] = "UNAUTHENTICATED",
$[$.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED",
$[$.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION",
$[$.ABORTED = 10] = "ABORTED",
$[$.OUT_OF_RANGE = 11] = "OUT_OF_RANGE",
$[$.UNIMPLEMENTED = 12] = "UNIMPLEMENTED",
$[$.INTERNAL = 13] = "INTERNAL",
$[$.UNAVAILABLE = 14] = "UNAVAILABLE",
$[$.DATA_LOSS = 15] = "DATA_LOSS";
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _v() {
    return new TextEncoder
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gv = new Ve([4294967295, 4294967295],0);
function Vc(n) {
    const t = _v().encode(n)
      , e = new Fu;
    return e.update(t),
    new Uint8Array(e.digest())
}
function Oc(n) {
    const t = new DataView(n.buffer)
      , e = t.getUint32(0, !0)
      , i = t.getUint32(4, !0)
      , s = t.getUint32(8, !0)
      , r = t.getUint32(12, !0);
    return [new Ve([e, i],0), new Ve([s, r],0)]
}
class ca {
    constructor(t, e, i) {
        if (this.bitmap = t,
        this.padding = e,
        this.hashCount = i,
        e < 0 || e >= 8)
            throw new Zn(`Invalid padding: ${e}`);
        if (i < 0)
            throw new Zn(`Invalid hash count: ${i}`);
        if (t.length > 0 && this.hashCount === 0)
            throw new Zn(`Invalid hash count: ${i}`);
        if (t.length === 0 && e !== 0)
            throw new Zn(`Invalid padding when bitmap length is 0: ${e}`);
        this.Ie = 8 * t.length - e,
        this.Te = Ve.fromNumber(this.Ie)
    }
    Ee(t, e, i) {
        let s = t.add(e.multiply(Ve.fromNumber(i)));
        return s.compare(gv) === 1 && (s = new Ve([s.getBits(0), s.getBits(1)],0)),
        s.modulo(this.Te).toNumber()
    }
    de(t) {
        return (this.bitmap[Math.floor(t / 8)] & 1 << t % 8) != 0
    }
    mightContain(t) {
        if (this.Ie === 0)
            return !1;
        const e = Vc(t)
          , [i,s] = Oc(e);
        for (let r = 0; r < this.hashCount; r++) {
            const a = this.Ee(i, s, r);
            if (!this.de(a))
                return !1
        }
        return !0
    }
    static create(t, e, i) {
        const s = t % 8 == 0 ? 0 : 8 - t % 8
          , r = new Uint8Array(Math.ceil(t / 8))
          , a = new ca(r,s,e);
        return i.forEach(l => a.insert(l)),
        a
    }
    insert(t) {
        if (this.Ie === 0)
            return;
        const e = Vc(t)
          , [i,s] = Oc(e);
        for (let r = 0; r < this.hashCount; r++) {
            const a = this.Ee(i, s, r);
            this.Ae(a)
        }
    }
    Ae(t) {
        const e = Math.floor(t / 8)
          , i = t % 8;
        this.bitmap[e] |= 1 << i
    }
}
class Zn extends Error {
    constructor() {
        super(...arguments),
        this.name = "BloomFilterError"
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hs {
    constructor(t, e, i, s, r) {
        this.snapshotVersion = t,
        this.targetChanges = e,
        this.targetMismatches = i,
        this.documentUpdates = s,
        this.resolvedLimboDocuments = r
    }
    static createSynthesizedRemoteEventForCurrentChange(t, e, i) {
        const s = new Map;
        return s.set(t, Vi.createSynthesizedTargetChangeForCurrentChange(t, e, i)),
        new Hs(F.min(),s,new at(Q),we(),G())
    }
}
class Vi {
    constructor(t, e, i, s, r) {
        this.resumeToken = t,
        this.current = e,
        this.addedDocuments = i,
        this.modifiedDocuments = s,
        this.removedDocuments = r
    }
    static createSynthesizedTargetChangeForCurrentChange(t, e, i) {
        return new Vi(i,e,G(),G(),G())
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ds {
    constructor(t, e, i, s) {
        this.Re = t,
        this.removedTargetIds = e,
        this.key = i,
        this.Ve = s
    }
}
class pd {
    constructor(t, e) {
        this.targetId = t,
        this.me = e
    }
}
class _d {
    constructor(t, e, i=wt.EMPTY_BYTE_STRING, s=null) {
        this.state = t,
        this.targetIds = e,
        this.resumeToken = i,
        this.cause = s
    }
}
class Mc {
    constructor() {
        this.fe = 0,
        this.ge = Fc(),
        this.pe = wt.EMPTY_BYTE_STRING,
        this.ye = !1,
        this.we = !0
    }
    get current() {
        return this.ye
    }
    get resumeToken() {
        return this.pe
    }
    get Se() {
        return this.fe !== 0
    }
    get be() {
        return this.we
    }
    De(t) {
        t.approximateByteSize() > 0 && (this.we = !0,
        this.pe = t)
    }
    Ce() {
        let t = G()
          , e = G()
          , i = G();
        return this.ge.forEach( (s, r) => {
            switch (r) {
            case 0:
                t = t.add(s);
                break;
            case 2:
                e = e.add(s);
                break;
            case 1:
                i = i.add(s);
                break;
            default:
                U()
            }
        }
        ),
        new Vi(this.pe,this.ye,t,e,i)
    }
    ve() {
        this.we = !1,
        this.ge = Fc()
    }
    Fe(t, e) {
        this.we = !0,
        this.ge = this.ge.insert(t, e)
    }
    Me(t) {
        this.we = !0,
        this.ge = this.ge.remove(t)
    }
    xe() {
        this.fe += 1
    }
    Oe() {
        this.fe -= 1,
        dt(this.fe >= 0)
    }
    Ne() {
        this.we = !0,
        this.ye = !0
    }
}
class mv {
    constructor(t) {
        this.Le = t,
        this.Be = new Map,
        this.ke = we(),
        this.qe = Lc(),
        this.Qe = new at(Q)
    }
    Ke(t) {
        for (const e of t.Re)
            t.Ve && t.Ve.isFoundDocument() ? this.$e(e, t.Ve) : this.Ue(e, t.key, t.Ve);
        for (const e of t.removedTargetIds)
            this.Ue(e, t.key, t.Ve)
    }
    We(t) {
        this.forEachTarget(t, e => {
            const i = this.Ge(e);
            switch (t.state) {
            case 0:
                this.ze(e) && i.De(t.resumeToken);
                break;
            case 1:
                i.Oe(),
                i.Se || i.ve(),
                i.De(t.resumeToken);
                break;
            case 2:
                i.Oe(),
                i.Se || this.removeTarget(e);
                break;
            case 3:
                this.ze(e) && (i.Ne(),
                i.De(t.resumeToken));
                break;
            case 4:
                this.ze(e) && (this.je(e),
                i.De(t.resumeToken));
                break;
            default:
                U()
            }
        }
        )
    }
    forEachTarget(t, e) {
        t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.Be.forEach( (i, s) => {
            this.ze(s) && e(s)
        }
        )
    }
    He(t) {
        const e = t.targetId
          , i = t.me.count
          , s = this.Je(e);
        if (s) {
            const r = s.target;
            if (oo(r))
                if (i === 0) {
                    const a = new M(r.path);
                    this.Ue(e, a, Dt.newNoDocument(a, F.min()))
                } else
                    dt(i === 1);
            else {
                const a = this.Ye(e);
                if (a !== i) {
                    const l = this.Ze(t)
                      , h = l ? this.Xe(l, t, a) : 1;
                    if (h !== 0) {
                        this.je(e);
                        const d = h === 2 ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
                        this.Qe = this.Qe.insert(e, d)
                    }
                }
            }
        }
    }
    Ze(t) {
        const e = t.me.unchangedNames;
        if (!e || !e.bits)
            return null;
        const {bits: {bitmap: i="", padding: s=0}, hashCount: r=0} = e;
        let a, l;
        try {
            a = je(i).toUint8Array()
        } catch (h) {
            if (h instanceof Hu)
                return dn("Decoding the base64 bloom filter in existence filter failed (" + h.message + "); ignoring the bloom filter and falling back to full re-query."),
                null;
            throw h
        }
        try {
            l = new ca(a,s,r)
        } catch (h) {
            return dn(h instanceof Zn ? "BloomFilter error: " : "Applying bloom filter failed: ", h),
            null
        }
        return l.Ie === 0 ? null : l
    }
    Xe(t, e, i) {
        return e.me.count === i - this.nt(t, e.targetId) ? 0 : 2
    }
    nt(t, e) {
        const i = this.Le.getRemoteKeysForTarget(e);
        let s = 0;
        return i.forEach(r => {
            const a = this.Le.tt()
              , l = `projects/${a.projectId}/databases/${a.database}/documents/${r.path.canonicalString()}`;
            t.mightContain(l) || (this.Ue(e, r, null),
            s++)
        }
        ),
        s
    }
    rt(t) {
        const e = new Map;
        this.Be.forEach( (r, a) => {
            const l = this.Je(a);
            if (l) {
                if (r.current && oo(l.target)) {
                    const h = new M(l.target.path);
                    this.ke.get(h) !== null || this.it(a, h) || this.Ue(a, h, Dt.newNoDocument(h, t))
                }
                r.be && (e.set(a, r.Ce()),
                r.ve())
            }
        }
        );
        let i = G();
        this.qe.forEach( (r, a) => {
            let l = !0;
            a.forEachWhile(h => {
                const d = this.Je(h);
                return !d || d.purpose === "TargetPurposeLimboResolution" || (l = !1,
                !1)
            }
            ),
            l && (i = i.add(r))
        }
        ),
        this.ke.forEach( (r, a) => a.setReadTime(t));
        const s = new Hs(t,e,this.Qe,this.ke,i);
        return this.ke = we(),
        this.qe = Lc(),
        this.Qe = new at(Q),
        s
    }
    $e(t, e) {
        if (!this.ze(t))
            return;
        const i = this.it(t, e.key) ? 2 : 0;
        this.Ge(t).Fe(e.key, i),
        this.ke = this.ke.insert(e.key, e),
        this.qe = this.qe.insert(e.key, this.st(e.key).add(t))
    }
    Ue(t, e, i) {
        if (!this.ze(t))
            return;
        const s = this.Ge(t);
        this.it(t, e) ? s.Fe(e, 1) : s.Me(e),
        this.qe = this.qe.insert(e, this.st(e).delete(t)),
        i && (this.ke = this.ke.insert(e, i))
    }
    removeTarget(t) {
        this.Be.delete(t)
    }
    Ye(t) {
        const e = this.Ge(t).Ce();
        return this.Le.getRemoteKeysForTarget(t).size + e.addedDocuments.size - e.removedDocuments.size
    }
    xe(t) {
        this.Ge(t).xe()
    }
    Ge(t) {
        let e = this.Be.get(t);
        return e || (e = new Mc,
        this.Be.set(t, e)),
        e
    }
    st(t) {
        let e = this.qe.get(t);
        return e || (e = new It(Q),
        this.qe = this.qe.insert(t, e)),
        e
    }
    ze(t) {
        const e = this.Je(t) !== null;
        return e || V("WatchChangeAggregator", "Detected inactive target", t),
        e
    }
    Je(t) {
        const e = this.Be.get(t);
        return e && e.Se ? null : this.Le.ot(t)
    }
    je(t) {
        this.Be.set(t, new Mc),
        this.Le.getRemoteKeysForTarget(t).forEach(e => {
            this.Ue(t, e, null)
        }
        )
    }
    it(t, e) {
        return this.Le.getRemoteKeysForTarget(t).has(e)
    }
}
function Lc() {
    return new at(M.comparator)
}
function Fc() {
    return new at(M.comparator)
}
const yv = {
    asc: "ASCENDING",
    desc: "DESCENDING"
}
  , vv = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "not-in": "NOT_IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
}
  , Ev = {
    and: "AND",
    or: "OR"
};
class Tv {
    constructor(t, e) {
        this.databaseId = t,
        this.useProto3Json = e
    }
}
function uo(n, t) {
    return n.useProto3Json || js(t) ? t : {
        value: t
    }
}
function fo(n, t) {
    return n.useProto3Json ? `${new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z` : {
        seconds: "" + t.seconds,
        nanos: t.nanoseconds
    }
}
function gd(n, t) {
    return n.useProto3Json ? t.toBase64() : t.toUint8Array()
}
function sn(n) {
    return dt(!!n),
    F.fromTimestamp(function(e) {
        const i = Ie(e);
        return new mt(i.seconds,i.nanos)
    }(n))
}
function md(n, t) {
    return po(n, t).canonicalString()
}
function po(n, t) {
    const e = function(s) {
        return new st(["projects", s.projectId, "databases", s.database])
    }(n).child("documents");
    return t === void 0 ? e : e.child(t)
}
function yd(n) {
    const t = st.fromString(n);
    return dt(wd(t)),
    t
}
function Vr(n, t) {
    const e = yd(t);
    if (e.get(1) !== n.databaseId.projectId)
        throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: " + e.get(1) + " vs " + n.databaseId.projectId);
    if (e.get(3) !== n.databaseId.database)
        throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: " + e.get(3) + " vs " + n.databaseId.database);
    return new M(Ed(e))
}
function vd(n, t) {
    return md(n.databaseId, t)
}
function Iv(n) {
    const t = yd(n);
    return t.length === 4 ? st.emptyPath() : Ed(t)
}
function Uc(n) {
    return new st(["projects", n.databaseId.projectId, "databases", n.databaseId.database]).canonicalString()
}
function Ed(n) {
    return dt(n.length > 4 && n.get(4) === "documents"),
    n.popFirst(5)
}
function wv(n, t) {
    let e;
    if ("targetChange"in t) {
        t.targetChange;
        const i = function(d) {
            return d === "NO_CHANGE" ? 0 : d === "ADD" ? 1 : d === "REMOVE" ? 2 : d === "CURRENT" ? 3 : d === "RESET" ? 4 : U()
        }(t.targetChange.targetChangeType || "NO_CHANGE")
          , s = t.targetChange.targetIds || []
          , r = function(d, f) {
            return d.useProto3Json ? (dt(f === void 0 || typeof f == "string"),
            wt.fromBase64String(f || "")) : (dt(f === void 0 || f instanceof Buffer || f instanceof Uint8Array),
            wt.fromUint8Array(f || new Uint8Array))
        }(n, t.targetChange.resumeToken)
          , a = t.targetChange.cause
          , l = a && function(d) {
            const f = d.code === void 0 ? b.UNKNOWN : fd(d.code);
            return new O(f,d.message || "")
        }(a);
        e = new _d(i,s,r,l || null)
    } else if ("documentChange"in t) {
        t.documentChange;
        const i = t.documentChange;
        i.document,
        i.document.name,
        i.document.updateTime;
        const s = Vr(n, i.document.name)
          , r = sn(i.document.updateTime)
          , a = i.document.createTime ? sn(i.document.createTime) : F.min()
          , l = new Gt({
            mapValue: {
                fields: i.document.fields
            }
        })
          , h = Dt.newFoundDocument(s, r, a, l)
          , d = i.targetIds || []
          , f = i.removedTargetIds || [];
        e = new ds(d,f,h.key,h)
    } else if ("documentDelete"in t) {
        t.documentDelete;
        const i = t.documentDelete;
        i.document;
        const s = Vr(n, i.document)
          , r = i.readTime ? sn(i.readTime) : F.min()
          , a = Dt.newNoDocument(s, r)
          , l = i.removedTargetIds || [];
        e = new ds([],l,a.key,a)
    } else if ("documentRemove"in t) {
        t.documentRemove;
        const i = t.documentRemove;
        i.document;
        const s = Vr(n, i.document)
          , r = i.removedTargetIds || [];
        e = new ds([],r,s,null)
    } else {
        if (!("filter"in t))
            return U();
        {
            t.filter;
            const i = t.filter;
            i.targetId;
            const {count: s=0, unchangedNames: r} = i
              , a = new pv(s,r)
              , l = i.targetId;
            e = new pd(l,a)
        }
    }
    return e
}
function Cv(n, t) {
    return {
        documents: [vd(n, t.path)]
    }
}
function Av(n, t) {
    const e = {
        structuredQuery: {}
    }
      , i = t.path;
    let s;
    t.collectionGroup !== null ? (s = i,
    e.structuredQuery.from = [{
        collectionId: t.collectionGroup,
        allDescendants: !0
    }]) : (s = i.popLast(),
    e.structuredQuery.from = [{
        collectionId: i.lastSegment()
    }]),
    e.parent = vd(n, s);
    const r = function(d) {
        if (d.length !== 0)
            return Id(zt.create(d, "and"))
    }(t.filters);
    r && (e.structuredQuery.where = r);
    const a = function(d) {
        if (d.length !== 0)
            return d.map(f => function(m) {
                return {
                    field: Xe(m.field),
                    direction: Pv(m.dir)
                }
            }(f))
    }(t.orderBy);
    a && (e.structuredQuery.orderBy = a);
    const l = uo(n, t.limit);
    return l !== null && (e.structuredQuery.limit = l),
    t.startAt && (e.structuredQuery.startAt = function(d) {
        return {
            before: d.inclusive,
            values: d.position
        }
    }(t.startAt)),
    t.endAt && (e.structuredQuery.endAt = function(d) {
        return {
            before: !d.inclusive,
            values: d.position
        }
    }(t.endAt)),
    {
        _t: e,
        parent: s
    }
}
function Rv(n) {
    let t = Iv(n.parent);
    const e = n.structuredQuery
      , i = e.from ? e.from.length : 0;
    let s = null;
    if (i > 0) {
        dt(i === 1);
        const f = e.from[0];
        f.allDescendants ? s = f.collectionId : t = t.child(f.collectionId)
    }
    let r = [];
    e.where && (r = function(_) {
        const m = Td(_);
        return m instanceof zt && Yu(m) ? m.getFilters() : [m]
    }(e.where));
    let a = [];
    e.orderBy && (a = function(_) {
        return _.map(m => function(S) {
            return new Ds(Je(S.field),function(k) {
                switch (k) {
                case "ASCENDING":
                    return "asc";
                case "DESCENDING":
                    return "desc";
                default:
                    return
                }
            }(S.direction))
        }(m))
    }(e.orderBy));
    let l = null;
    e.limit && (l = function(_) {
        let m;
        return m = typeof _ == "object" ? _.value : _,
        js(m) ? null : m
    }(e.limit));
    let h = null;
    e.startAt && (h = function(_) {
        const m = !!_.before
          , A = _.values || [];
        return new Ns(A,m)
    }(e.startAt));
    let d = null;
    return e.endAt && (d = function(_) {
        const m = !_.before
          , A = _.values || [];
        return new Ns(A,m)
    }(e.endAt)),
    Yy(t, s, a, r, l, "F", h, d)
}
function Sv(n, t) {
    const e = function(s) {
        switch (s) {
        case "TargetPurposeListen":
            return null;
        case "TargetPurposeExistenceFilterMismatch":
            return "existence-filter-mismatch";
        case "TargetPurposeExistenceFilterMismatchBloom":
            return "existence-filter-mismatch-bloom";
        case "TargetPurposeLimboResolution":
            return "limbo-document";
        default:
            return U()
        }
    }(t.purpose);
    return e == null ? null : {
        "goog-listen-tags": e
    }
}
function Td(n) {
    return n.unaryFilter !== void 0 ? function(e) {
        switch (e.unaryFilter.op) {
        case "IS_NAN":
            const i = Je(e.unaryFilter.field);
            return ut.create(i, "==", {
                doubleValue: NaN
            });
        case "IS_NULL":
            const s = Je(e.unaryFilter.field);
            return ut.create(s, "==", {
                nullValue: "NULL_VALUE"
            });
        case "IS_NOT_NAN":
            const r = Je(e.unaryFilter.field);
            return ut.create(r, "!=", {
                doubleValue: NaN
            });
        case "IS_NOT_NULL":
            const a = Je(e.unaryFilter.field);
            return ut.create(a, "!=", {
                nullValue: "NULL_VALUE"
            });
        default:
            return U()
        }
    }(n) : n.fieldFilter !== void 0 ? function(e) {
        return ut.create(Je(e.fieldFilter.field), function(s) {
            switch (s) {
            case "EQUAL":
                return "==";
            case "NOT_EQUAL":
                return "!=";
            case "GREATER_THAN":
                return ">";
            case "GREATER_THAN_OR_EQUAL":
                return ">=";
            case "LESS_THAN":
                return "<";
            case "LESS_THAN_OR_EQUAL":
                return "<=";
            case "ARRAY_CONTAINS":
                return "array-contains";
            case "IN":
                return "in";
            case "NOT_IN":
                return "not-in";
            case "ARRAY_CONTAINS_ANY":
                return "array-contains-any";
            default:
                return U()
            }
        }(e.fieldFilter.op), e.fieldFilter.value)
    }(n) : n.compositeFilter !== void 0 ? function(e) {
        return zt.create(e.compositeFilter.filters.map(i => Td(i)), function(s) {
            switch (s) {
            case "AND":
                return "and";
            case "OR":
                return "or";
            default:
                return U()
            }
        }(e.compositeFilter.op))
    }(n) : U()
}
function Pv(n) {
    return yv[n]
}
function bv(n) {
    return vv[n]
}
function Nv(n) {
    return Ev[n]
}
function Xe(n) {
    return {
        fieldPath: n.canonicalString()
    }
}
function Je(n) {
    return kt.fromServerFormat(n.fieldPath)
}
function Id(n) {
    return n instanceof ut ? function(e) {
        if (e.op === "==") {
            if (Ac(e.value))
                return {
                    unaryFilter: {
                        field: Xe(e.field),
                        op: "IS_NAN"
                    }
                };
            if (Cc(e.value))
                return {
                    unaryFilter: {
                        field: Xe(e.field),
                        op: "IS_NULL"
                    }
                }
        } else if (e.op === "!=") {
            if (Ac(e.value))
                return {
                    unaryFilter: {
                        field: Xe(e.field),
                        op: "IS_NOT_NAN"
                    }
                };
            if (Cc(e.value))
                return {
                    unaryFilter: {
                        field: Xe(e.field),
                        op: "IS_NOT_NULL"
                    }
                }
        }
        return {
            fieldFilter: {
                field: Xe(e.field),
                op: bv(e.op),
                value: e.value
            }
        }
    }(n) : n instanceof zt ? function(e) {
        const i = e.getFilters().map(s => Id(s));
        return i.length === 1 ? i[0] : {
            compositeFilter: {
                op: Nv(e.op),
                filters: i
            }
        }
    }(n) : U()
}
function wd(n) {
    return n.length >= 4 && n.get(0) === "projects" && n.get(2) === "databases"
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fe {
    constructor(t, e, i, s, r=F.min(), a=F.min(), l=wt.EMPTY_BYTE_STRING, h=null) {
        this.target = t,
        this.targetId = e,
        this.purpose = i,
        this.sequenceNumber = s,
        this.snapshotVersion = r,
        this.lastLimboFreeSnapshotVersion = a,
        this.resumeToken = l,
        this.expectedCount = h
    }
    withSequenceNumber(t) {
        return new fe(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)
    }
    withResumeToken(t, e) {
        return new fe(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)
    }
    withExpectedCount(t) {
        return new fe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)
    }
    withLastLimboFreeSnapshotVersion(t) {
        return new fe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Dv {
    constructor(t) {
        this.ct = t
    }
}
function kv(n) {
    const t = Rv({
        parent: n.parent,
        structuredQuery: n.structuredQuery
    });
    return n.limitType === "LAST" ? lo(t, t.limit, "L") : t
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class xv {
    constructor() {
        this.an = new Vv
    }
    addToCollectionParentIndex(t, e) {
        return this.an.add(e),
        P.resolve()
    }
    getCollectionParents(t, e) {
        return P.resolve(this.an.getEntries(e))
    }
    addFieldIndex(t, e) {
        return P.resolve()
    }
    deleteFieldIndex(t, e) {
        return P.resolve()
    }
    deleteAllFieldIndexes(t) {
        return P.resolve()
    }
    createTargetIndexes(t, e) {
        return P.resolve()
    }
    getDocumentsMatchingTarget(t, e) {
        return P.resolve(null)
    }
    getIndexType(t, e) {
        return P.resolve(0)
    }
    getFieldIndexes(t, e) {
        return P.resolve([])
    }
    getNextCollectionGroupToUpdate(t) {
        return P.resolve(null)
    }
    getMinOffset(t, e) {
        return P.resolve(Te.min())
    }
    getMinOffsetFromCollectionGroup(t, e) {
        return P.resolve(Te.min())
    }
    updateCollectionGroup(t, e, i) {
        return P.resolve()
    }
    updateIndexEntries(t, e) {
        return P.resolve()
    }
}
class Vv {
    constructor() {
        this.index = {}
    }
    add(t) {
        const e = t.lastSegment()
          , i = t.popLast()
          , s = this.index[e] || new It(st.comparator)
          , r = !s.has(i);
        return this.index[e] = s.add(i),
        r
    }
    has(t) {
        const e = t.lastSegment()
          , i = t.popLast()
          , s = this.index[e];
        return s && s.has(i)
    }
    getEntries(t) {
        return (this.index[t] || new It(st.comparator)).toArray()
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gn {
    constructor(t) {
        this.Nn = t
    }
    next() {
        return this.Nn += 2,
        this.Nn
    }
    static Ln() {
        return new gn(0)
    }
    static Bn() {
        return new gn(-1)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ov {
    constructor() {
        this.changes = new Cn(t => t.toString(), (t, e) => t.isEqual(e)),
        this.changesApplied = !1
    }
    addEntry(t) {
        this.assertNotApplied(),
        this.changes.set(t.key, t)
    }
    removeEntry(t, e) {
        this.assertNotApplied(),
        this.changes.set(t, Dt.newInvalidDocument(t).setReadTime(e))
    }
    getEntry(t, e) {
        this.assertNotApplied();
        const i = this.changes.get(e);
        return i !== void 0 ? P.resolve(i) : this.getFromCache(t, e)
    }
    getEntries(t, e) {
        return this.getAllFromCache(t, e)
    }
    apply(t) {
        return this.assertNotApplied(),
        this.changesApplied = !0,
        this.applyChanges(t)
    }
    assertNotApplied() {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Mv {
    constructor(t, e) {
        this.overlayedDocument = t,
        this.mutatedFields = e
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lv {
    constructor(t, e, i, s) {
        this.remoteDocumentCache = t,
        this.mutationQueue = e,
        this.documentOverlayCache = i,
        this.indexManager = s
    }
    getDocument(t, e) {
        let i = null;
        return this.documentOverlayCache.getOverlay(t, e).next(s => (i = s,
        this.remoteDocumentCache.getEntry(t, e))).next(s => (i !== null && li(i.mutation, s, de.empty(), mt.now()),
        s))
    }
    getDocuments(t, e) {
        return this.remoteDocumentCache.getEntries(t, e).next(i => this.getLocalViewOfDocuments(t, i, G()).next( () => i))
    }
    getLocalViewOfDocuments(t, e, i=G()) {
        const s = ke();
        return this.populateOverlays(t, s, e).next( () => this.computeViews(t, e, s, i).next(r => {
            let a = Jn();
            return r.forEach( (l, h) => {
                a = a.insert(l, h.overlayedDocument)
            }
            ),
            a
        }
        ))
    }
    getOverlayedDocuments(t, e) {
        const i = ke();
        return this.populateOverlays(t, i, e).next( () => this.computeViews(t, e, i, G()))
    }
    populateOverlays(t, e, i) {
        const s = [];
        return i.forEach(r => {
            e.has(r) || s.push(r)
        }
        ),
        this.documentOverlayCache.getOverlays(t, s).next(r => {
            r.forEach( (a, l) => {
                e.set(a, l)
            }
            )
        }
        )
    }
    computeViews(t, e, i, s) {
        let r = we();
        const a = ai()
          , l = function() {
            return ai()
        }();
        return e.forEach( (h, d) => {
            const f = i.get(d.key);
            s.has(d.key) && (f === void 0 || f.mutation instanceof Gs) ? r = r.insert(d.key, d) : f !== void 0 ? (a.set(d.key, f.mutation.getFieldMask()),
            li(f.mutation, d, f.mutation.getFieldMask(), mt.now())) : a.set(d.key, de.empty())
        }
        ),
        this.recalculateAndSaveOverlays(t, r).next(h => (h.forEach( (d, f) => a.set(d, f)),
        e.forEach( (d, f) => {
            var _;
            return l.set(d, new Mv(f,(_ = a.get(d)) !== null && _ !== void 0 ? _ : null))
        }
        ),
        l))
    }
    recalculateAndSaveOverlays(t, e) {
        const i = ai();
        let s = new at( (a, l) => a - l)
          , r = G();
        return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t, e).next(a => {
            for (const l of a)
                l.keys().forEach(h => {
                    const d = e.get(h);
                    if (d === null)
                        return;
                    let f = i.get(h) || de.empty();
                    f = l.applyToLocalView(d, f),
                    i.set(h, f);
                    const _ = (s.get(l.batchId) || G()).add(h);
                    s = s.insert(l.batchId, _)
                }
                )
        }
        ).next( () => {
            const a = []
              , l = s.getReverseIterator();
            for (; l.hasNext(); ) {
                const h = l.getNext()
                  , d = h.key
                  , f = h.value
                  , _ = rd();
                f.forEach(m => {
                    if (!r.has(m)) {
                        const A = ud(e.get(m), i.get(m));
                        A !== null && _.set(m, A),
                        r = r.add(m)
                    }
                }
                ),
                a.push(this.documentOverlayCache.saveOverlays(t, d, _))
            }
            return P.waitFor(a)
        }
        ).next( () => i)
    }
    recalculateAndSaveOverlaysForDocumentKeys(t, e) {
        return this.remoteDocumentCache.getEntries(t, e).next(i => this.recalculateAndSaveOverlays(t, i))
    }
    getDocumentsMatchingQuery(t, e, i, s) {
        return function(a) {
            return M.isDocumentKey(a.path) && a.collectionGroup === null && a.filters.length === 0
        }(e) ? this.getDocumentsMatchingDocumentQuery(t, e.path) : ed(e) ? this.getDocumentsMatchingCollectionGroupQuery(t, e, i, s) : this.getDocumentsMatchingCollectionQuery(t, e, i, s)
    }
    getNextDocuments(t, e, i, s) {
        return this.remoteDocumentCache.getAllFromCollectionGroup(t, e, i, s).next(r => {
            const a = s - r.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(t, e, i.largestBatchId, s - r.size) : P.resolve(ke());
            let l = -1
              , h = r;
            return a.next(d => P.forEach(d, (f, _) => (l < _.largestBatchId && (l = _.largestBatchId),
            r.get(f) ? P.resolve() : this.remoteDocumentCache.getEntry(t, f).next(m => {
                h = h.insert(f, m)
            }
            ))).next( () => this.populateOverlays(t, d, r)).next( () => this.computeViews(t, h, d, G())).next(f => ({
                batchId: l,
                changes: ev(f)
            })))
        }
        )
    }
    getDocumentsMatchingDocumentQuery(t, e) {
        return this.getDocument(t, new M(e)).next(i => {
            let s = Jn();
            return i.isFoundDocument() && (s = s.insert(i.key, i)),
            s
        }
        )
    }
    getDocumentsMatchingCollectionGroupQuery(t, e, i, s) {
        const r = e.collectionGroup;
        let a = Jn();
        return this.indexManager.getCollectionParents(t, r).next(l => P.forEach(l, h => {
            const d = function(_, m) {
                return new xi(m,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)
            }(e, h.child(r));
            return this.getDocumentsMatchingCollectionQuery(t, d, i, s).next(f => {
                f.forEach( (_, m) => {
                    a = a.insert(_, m)
                }
                )
            }
            )
        }
        ).next( () => a))
    }
    getDocumentsMatchingCollectionQuery(t, e, i, s) {
        let r;
        return this.documentOverlayCache.getOverlaysForCollection(t, e.path, i.largestBatchId).next(a => (r = a,
        this.remoteDocumentCache.getDocumentsMatchingQuery(t, e, i, r, s))).next(a => {
            r.forEach( (h, d) => {
                const f = d.getKey();
                a.get(f) === null && (a = a.insert(f, Dt.newInvalidDocument(f)))
            }
            );
            let l = Jn();
            return a.forEach( (h, d) => {
                const f = r.get(h);
                f !== void 0 && li(f.mutation, d, de.empty(), mt.now()),
                Ws(e, d) && (l = l.insert(h, d))
            }
            ),
            l
        }
        )
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fv {
    constructor(t) {
        this.serializer = t,
        this.lr = new Map,
        this.hr = new Map
    }
    getBundleMetadata(t, e) {
        return P.resolve(this.lr.get(e))
    }
    saveBundleMetadata(t, e) {
        return this.lr.set(e.id, function(s) {
            return {
                id: s.id,
                version: s.version,
                createTime: sn(s.createTime)
            }
        }(e)),
        P.resolve()
    }
    getNamedQuery(t, e) {
        return P.resolve(this.hr.get(e))
    }
    saveNamedQuery(t, e) {
        return this.hr.set(e.name, function(s) {
            return {
                name: s.name,
                query: kv(s.bundledQuery),
                readTime: sn(s.readTime)
            }
        }(e)),
        P.resolve()
    }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Uv {
    constructor() {
        this.overlays = new at(M.comparator),
        this.Pr = new Map
    }
    getOverlay(t, e) {
        return P.resolve(this.overlays.get(e))
    }
    getOverlays(t, e) {
        const i = ke();
        return P.forEach(e, s => this.getOverlay(t, s).next(r => {
            r !== null && i.set(s, r)
        }
        )).next( () => i)
    }
    saveOverlays(t, e, i) {
        return i.forEach( (s, r) => {
            this.ht(t, e, r)
        }
        ),
        P.resolve()
    }
    removeOverlaysForBatchId(t, e, i) {
        const s = this.Pr.get(i);
        return s !== void 0 && (s.forEach(r => this.overlays = this.overlays.remove(r)),
        this.Pr.delete(i)),
        P.resolve()
    }
    getOverlaysForCollection(t, e, i) {
        const s = ke()
          , r = e.length + 1
          , a = new M(e.child(""))
          , l = this.overlays.getIteratorFrom(a);
        for (; l.hasNext(); ) {
            const h = l.getNext().value
              , d = h.getKey();
            if (!e.isPrefixOf(d.path))
                break;
            d.path.length === r && h.largestBatchId > i && s.set(h.getKey(), h)
        }
        return P.resolve(s)
    }
    getOverlaysForCollectionGroup(t, e, i, s) {
        let r = new at( (d, f) => d - f);
        const a = this.overlays.getIterator();
        for (; a.hasNext(); ) {
            const d = a.getNext().value;
            if (d.getKey().getCollectionGroup() === e && d.largestBatchId > i) {
                let f = r.get(d.largestBatchId);
                f === null && (f = ke(),
                r = r.insert(d.largestBatchId, f)),
                f.set(d.getKey(), d)
            }
        }
        const l = ke()
          , h = r.getIterator();
        for (; h.hasNext() && (h.getNext().value.forEach( (d, f) => l.set(d, f)),
        !(l.size() >= s)); )
            ;
        return P.resolve(l)
    }
    ht(t, e, i) {
        const s = this.overlays.get(i.key);
        if (s !== null) {
            const a = this.Pr.get(s.largestBatchId).delete(i.key);
            this.Pr.set(s.largestBatchId, a)
        }
        this.overlays = this.overlays.insert(i.key, new fv(e,i));
        let r = this.Pr.get(e);
        r === void 0 && (r = G(),
        this.Pr.set(e, r)),
        this.Pr.set(e, r.add(i.key))
    }
}
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bv {
    constructor() {
        this.sessionToken = wt.EMPTY_BYTE_STRING
    }
    getSessionToken(t) {
        return P.resolve(this.sessionToken)
    }
    setSessionToken(t, e) {
        return this.sessionToken = e,
        P.resolve()
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ha {
    constructor() {
        this.Ir = new It(gt.Tr),
        this.Er = new It(gt.dr)
    }
    isEmpty() {
        return this.Ir.isEmpty()
    }
    addReference(t, e) {
        const i = new gt(t,e);
        this.Ir = this.Ir.add(i),
        this.Er = this.Er.add(i)
    }
    Ar(t, e) {
        t.forEach(i => this.addReference(i, e))
    }
    removeReference(t, e) {
        this.Rr(new gt(t,e))
    }
    Vr(t, e) {
        t.forEach(i => this.removeReference(i, e))
    }
    mr(t) {
        const e = new M(new st([]))
          , i = new gt(e,t)
          , s = new gt(e,t + 1)
          , r = [];
        return this.Er.forEachInRange([i, s], a => {
            this.Rr(a),
            r.push(a.key)
        }
        ),
        r
    }
    gr() {
        this.Ir.forEach(t => this.Rr(t))
    }
    Rr(t) {
        this.Ir = this.Ir.delete(t),
        this.Er = this.Er.delete(t)
    }
    pr(t) {
        const e = new M(new st([]))
          , i = new gt(e,t)
          , s = new gt(e,t + 1);
        let r = G();
        return this.Er.forEachInRange([i, s], a => {
            r = r.add(a.key)
        }
        ),
        r
    }
    containsKey(t) {
        const e = new gt(t,0)
          , i = this.Ir.firstAfterOrEqual(e);
        return i !== null && t.isEqual(i.key)
    }
}
class gt {
    constructor(t, e) {
        this.key = t,
        this.yr = e
    }
    static Tr(t, e) {
        return M.comparator(t.key, e.key) || Q(t.yr, e.yr)
    }
    static dr(t, e) {
        return Q(t.yr, e.yr) || M.comparator(t.key, e.key)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qv {
    constructor(t, e) {
        this.indexManager = t,
        this.referenceDelegate = e,
        this.mutationQueue = [],
        this.wr = 1,
        this.Sr = new It(gt.Tr)
    }
    checkEmpty(t) {
        return P.resolve(this.mutationQueue.length === 0)
    }
    addMutationBatch(t, e, i, s) {
        const r = this.wr;
        this.wr++,
        this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
        const a = new dv(r,e,i,s);
        this.mutationQueue.push(a);
        for (const l of s)
            this.Sr = this.Sr.add(new gt(l.key,r)),
            this.indexManager.addToCollectionParentIndex(t, l.key.path.popLast());
        return P.resolve(a)
    }
    lookupMutationBatch(t, e) {
        return P.resolve(this.br(e))
    }
    getNextMutationBatchAfterBatchId(t, e) {
        const i = e + 1
          , s = this.Dr(i)
          , r = s < 0 ? 0 : s;
        return P.resolve(this.mutationQueue.length > r ? this.mutationQueue[r] : null)
    }
    getHighestUnacknowledgedBatchId() {
        return P.resolve(this.mutationQueue.length === 0 ? -1 : this.wr - 1)
    }
    getAllMutationBatches(t) {
        return P.resolve(this.mutationQueue.slice())
    }
    getAllMutationBatchesAffectingDocumentKey(t, e) {
        const i = new gt(e,0)
          , s = new gt(e,Number.POSITIVE_INFINITY)
          , r = [];
        return this.Sr.forEachInRange([i, s], a => {
            const l = this.br(a.yr);
            r.push(l)
        }
        ),
        P.resolve(r)
    }
    getAllMutationBatchesAffectingDocumentKeys(t, e) {
        let i = new It(Q);
        return e.forEach(s => {
            const r = new gt(s,0)
              , a = new gt(s,Number.POSITIVE_INFINITY);
            this.Sr.forEachInRange([r, a], l => {
                i = i.add(l.yr)
            }
            )
        }
        ),
        P.resolve(this.Cr(i))
    }
    getAllMutationBatchesAffectingQuery(t, e) {
        const i = e.path
          , s = i.length + 1;
        let r = i;
        M.isDocumentKey(r) || (r = r.child(""));
        const a = new gt(new M(r),0);
        let l = new It(Q);
        return this.Sr.forEachWhile(h => {
            const d = h.key.path;
            return !!i.isPrefixOf(d) && (d.length === s && (l = l.add(h.yr)),
            !0)
        }
        , a),
        P.resolve(this.Cr(l))
    }
    Cr(t) {
        const e = [];
        return t.forEach(i => {
            const s = this.br(i);
            s !== null && e.push(s)
        }
        ),
        e
    }
    removeMutationBatch(t, e) {
        dt(this.vr(e.batchId, "removed") === 0),
        this.mutationQueue.shift();
        let i = this.Sr;
        return P.forEach(e.mutations, s => {
            const r = new gt(s.key,e.batchId);
            return i = i.delete(r),
            this.referenceDelegate.markPotentiallyOrphaned(t, s.key)
        }
        ).next( () => {
            this.Sr = i
        }
        )
    }
    xn(t) {}
    containsKey(t, e) {
        const i = new gt(e,0)
          , s = this.Sr.firstAfterOrEqual(i);
        return P.resolve(e.isEqual(s && s.key))
    }
    performConsistencyCheck(t) {
        return this.mutationQueue.length,
        P.resolve()
    }
    vr(t, e) {
        return this.Dr(t)
    }
    Dr(t) {
        return this.mutationQueue.length === 0 ? 0 : t - this.mutationQueue[0].batchId
    }
    br(t) {
        const e = this.Dr(t);
        return e < 0 || e >= this.mutationQueue.length ? null : this.mutationQueue[e]
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jv {
    constructor(t) {
        this.Fr = t,
        this.docs = function() {
            return new at(M.comparator)
        }(),
        this.size = 0
    }
    setIndexManager(t) {
        this.indexManager = t
    }
    addEntry(t, e) {
        const i = e.key
          , s = this.docs.get(i)
          , r = s ? s.size : 0
          , a = this.Fr(e);
        return this.docs = this.docs.insert(i, {
            document: e.mutableCopy(),
            size: a
        }),
        this.size += a - r,
        this.indexManager.addToCollectionParentIndex(t, i.path.popLast())
    }
    removeEntry(t) {
        const e = this.docs.get(t);
        e && (this.docs = this.docs.remove(t),
        this.size -= e.size)
    }
    getEntry(t, e) {
        const i = this.docs.get(e);
        return P.resolve(i ? i.document.mutableCopy() : Dt.newInvalidDocument(e))
    }
    getEntries(t, e) {
        let i = we();
        return e.forEach(s => {
            const r = this.docs.get(s);
            i = i.insert(s, r ? r.document.mutableCopy() : Dt.newInvalidDocument(s))
        }
        ),
        P.resolve(i)
    }
    getDocumentsMatchingQuery(t, e, i, s) {
        let r = we();
        const a = e.path
          , l = new M(a.child(""))
          , h = this.docs.getIteratorFrom(l);
        for (; h.hasNext(); ) {
            const {key: d, value: {document: f}} = h.getNext();
            if (!a.isPrefixOf(d.path))
                break;
            d.path.length > a.length + 1 || ky(Dy(f), i) <= 0 || (s.has(f.key) || Ws(e, f)) && (r = r.insert(f.key, f.mutableCopy()))
        }
        return P.resolve(r)
    }
    getAllFromCollectionGroup(t, e, i, s) {
        U()
    }
    Mr(t, e) {
        return P.forEach(this.docs, i => e(i))
    }
    newChangeBuffer(t) {
        return new $v(this)
    }
    getSize(t) {
        return P.resolve(this.size)
    }
}
class $v extends Ov {
    constructor(t) {
        super(),
        this.ur = t
    }
    applyChanges(t) {
        const e = [];
        return this.changes.forEach( (i, s) => {
            s.isValidDocument() ? e.push(this.ur.addEntry(t, s)) : this.ur.removeEntry(i)
        }
        ),
        P.waitFor(e)
    }
    getFromCache(t, e) {
        return this.ur.getEntry(t, e)
    }
    getAllFromCache(t, e) {
        return this.ur.getEntries(t, e)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wv {
    constructor(t) {
        this.persistence = t,
        this.Or = new Cn(e => ra(e),oa),
        this.lastRemoteSnapshotVersion = F.min(),
        this.highestTargetId = 0,
        this.Nr = 0,
        this.Lr = new ha,
        this.targetCount = 0,
        this.Br = gn.Ln()
    }
    forEachTarget(t, e) {
        return this.Or.forEach( (i, s) => e(s)),
        P.resolve()
    }
    getLastRemoteSnapshotVersion(t) {
        return P.resolve(this.lastRemoteSnapshotVersion)
    }
    getHighestSequenceNumber(t) {
        return P.resolve(this.Nr)
    }
    allocateTargetId(t) {
        return this.highestTargetId = this.Br.next(),
        P.resolve(this.highestTargetId)
    }
    setTargetsMetadata(t, e, i) {
        return i && (this.lastRemoteSnapshotVersion = i),
        e > this.Nr && (this.Nr = e),
        P.resolve()
    }
    Qn(t) {
        this.Or.set(t.target, t);
        const e = t.targetId;
        e > this.highestTargetId && (this.Br = new gn(e),
        this.highestTargetId = e),
        t.sequenceNumber > this.Nr && (this.Nr = t.sequenceNumber)
    }
    addTargetData(t, e) {
        return this.Qn(e),
        this.targetCount += 1,
        P.resolve()
    }
    updateTargetData(t, e) {
        return this.Qn(e),
        P.resolve()
    }
    removeTargetData(t, e) {
        return this.Or.delete(e.target),
        this.Lr.mr(e.targetId),
        this.targetCount -= 1,
        P.resolve()
    }
    removeTargets(t, e, i) {
        let s = 0;
        const r = [];
        return this.Or.forEach( (a, l) => {
            l.sequenceNumber <= e && i.get(l.targetId) === null && (this.Or.delete(a),
            r.push(this.removeMatchingKeysForTargetId(t, l.targetId)),
            s++)
        }
        ),
        P.waitFor(r).next( () => s)
    }
    getTargetCount(t) {
        return P.resolve(this.targetCount)
    }
    getTargetData(t, e) {
        const i = this.Or.get(e) || null;
        return P.resolve(i)
    }
    addMatchingKeys(t, e, i) {
        return this.Lr.Ar(e, i),
        P.resolve()
    }
    removeMatchingKeys(t, e, i) {
        this.Lr.Vr(e, i);
        const s = this.persistence.referenceDelegate
          , r = [];
        return s && e.forEach(a => {
            r.push(s.markPotentiallyOrphaned(t, a))
        }
        ),
        P.waitFor(r)
    }
    removeMatchingKeysForTargetId(t, e) {
        return this.Lr.mr(e),
        P.resolve()
    }
    getMatchingKeysForTargetId(t, e) {
        const i = this.Lr.pr(e);
        return P.resolve(i)
    }
    containsKey(t, e) {
        return P.resolve(this.Lr.containsKey(e))
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zv {
    constructor(t, e) {
        this.kr = {},
        this.overlays = {},
        this.qr = new ea(0),
        this.Qr = !1,
        this.Qr = !0,
        this.Kr = new Bv,
        this.referenceDelegate = t(this),
        this.$r = new Wv(this),
        this.indexManager = new xv,
        this.remoteDocumentCache = function(s) {
            return new jv(s)
        }(i => this.referenceDelegate.Ur(i)),
        this.serializer = new Dv(e),
        this.Wr = new Fv(this.serializer)
    }
    start() {
        return Promise.resolve()
    }
    shutdown() {
        return this.Qr = !1,
        Promise.resolve()
    }
    get started() {
        return this.Qr
    }
    setDatabaseDeletedListener() {}
    setNetworkEnabled() {}
    getIndexManager(t) {
        return this.indexManager
    }
    getDocumentOverlayCache(t) {
        let e = this.overlays[t.toKey()];
        return e || (e = new Uv,
        this.overlays[t.toKey()] = e),
        e
    }
    getMutationQueue(t, e) {
        let i = this.kr[t.toKey()];
        return i || (i = new qv(e,this.referenceDelegate),
        this.kr[t.toKey()] = i),
        i
    }
    getGlobalsCache() {
        return this.Kr
    }
    getTargetCache() {
        return this.$r
    }
    getRemoteDocumentCache() {
        return this.remoteDocumentCache
    }
    getBundleCache() {
        return this.Wr
    }
    runTransaction(t, e, i) {
        V("MemoryPersistence", "Starting transaction:", t);
        const s = new Gv(this.qr.next());
        return this.referenceDelegate.Gr(),
        i(s).next(r => this.referenceDelegate.zr(s).next( () => r)).toPromise().then(r => (s.raiseOnCommittedEvent(),
        r))
    }
    jr(t, e) {
        return P.or(Object.values(this.kr).map(i => () => i.containsKey(t, e)))
    }
}
class Gv extends Vy {
    constructor(t) {
        super(),
        this.currentSequenceNumber = t
    }
}
class ua {
    constructor(t) {
        this.persistence = t,
        this.Hr = new ha,
        this.Jr = null
    }
    static Yr(t) {
        return new ua(t)
    }
    get Zr() {
        if (this.Jr)
            return this.Jr;
        throw U()
    }
    addReference(t, e, i) {
        return this.Hr.addReference(i, e),
        this.Zr.delete(i.toString()),
        P.resolve()
    }
    removeReference(t, e, i) {
        return this.Hr.removeReference(i, e),
        this.Zr.add(i.toString()),
        P.resolve()
    }
    markPotentiallyOrphaned(t, e) {
        return this.Zr.add(e.toString()),
        P.resolve()
    }
    removeTarget(t, e) {
        this.Hr.mr(e.targetId).forEach(s => this.Zr.add(s.toString()));
        const i = this.persistence.getTargetCache();
        return i.getMatchingKeysForTargetId(t, e.targetId).next(s => {
            s.forEach(r => this.Zr.add(r.toString()))
        }
        ).next( () => i.removeTargetData(t, e))
    }
    Gr() {
        this.Jr = new Set
    }
    zr(t) {
        const e = this.persistence.getRemoteDocumentCache().newChangeBuffer();
        return P.forEach(this.Zr, i => {
            const s = M.fromPath(i);
            return this.Xr(t, s).next(r => {
                r || e.removeEntry(s, F.min())
            }
            )
        }
        ).next( () => (this.Jr = null,
        e.apply(t)))
    }
    updateLimboDocument(t, e) {
        return this.Xr(t, e).next(i => {
            i ? this.Zr.delete(e.toString()) : this.Zr.add(e.toString())
        }
        )
    }
    Ur(t) {
        return 0
    }
    Xr(t, e) {
        return P.or([ () => P.resolve(this.Hr.containsKey(e)), () => this.persistence.getTargetCache().containsKey(t, e), () => this.persistence.jr(t, e)])
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class da {
    constructor(t, e, i, s) {
        this.targetId = t,
        this.fromCache = e,
        this.Ki = i,
        this.$i = s
    }
    static Ui(t, e) {
        let i = G()
          , s = G();
        for (const r of e.docChanges)
            switch (r.type) {
            case 0:
                i = i.add(r.doc.key);
                break;
            case 1:
                s = s.add(r.doc.key)
            }
        return new da(t,e.fromCache,i,s)
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hv {
    constructor() {
        this._documentReadCount = 0
    }
    get documentReadCount() {
        return this._documentReadCount
    }
    incrementDocumentReadCount(t) {
        this._documentReadCount += t
    }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Kv {
    constructor() {
        this.Wi = !1,
        this.Gi = !1,
        this.zi = 100,
        this.ji = function() {
            return Bf() ? 8 : Oy(hh()) > 0 ? 6 : 4
        }()
    }
    initialize(t, e) {
        this.Hi = t,
        this.indexManager = e,
        this.Wi = !0
    }
    getDocumentsMatchingQuery(t, e, i, s) {
        const r = {
            result: null
        };
        return this.Ji(t, e).next(a => {
            r.result = a
        }
        ).next( () => {
            if (!r.result)
                return this.Yi(t, e, s, i).next(a => {
                    r.result = a
                }
                )
        }
        ).next( () => {
            if (r.result)
                return;
            const a = new Hv;
            return this.Zi(t, e, a).next(l => {
                if (r.result = l,
                this.Gi)
                    return this.Xi(t, e, a, l.size)
            }
            )
        }
        ).next( () => r.result)
    }
    Xi(t, e, i, s) {
        return i.documentReadCount < this.zi ? (Qn() <= W.DEBUG && V("QueryEngine", "SDK will not create cache indexes for query:", Ye(e), "since it only creates cache indexes for collection contains", "more than or equal to", this.zi, "documents"),
        P.resolve()) : (Qn() <= W.DEBUG && V("QueryEngine", "Query:", Ye(e), "scans", i.documentReadCount, "local documents and returns", s, "documents as results."),
        i.documentReadCount > this.ji * s ? (Qn() <= W.DEBUG && V("QueryEngine", "The SDK decides to create cache indexes for query:", Ye(e), "as using cache indexes may help improve performance."),
        this.indexManager.createTargetIndexes(t, Kt(e))) : P.resolve())
    }
    Ji(t, e) {
        if (bc(e))
            return P.resolve(null);
        let i = Kt(e);
        return this.indexManager.getIndexType(t, i).next(s => s === 0 ? null : (e.limit !== null && s === 1 && (e = lo(e, null, "F"),
        i = Kt(e)),
        this.indexManager.getDocumentsMatchingTarget(t, i).next(r => {
            const a = G(...r);
            return this.Hi.getDocuments(t, a).next(l => this.indexManager.getMinOffset(t, i).next(h => {
                const d = this.es(e, l);
                return this.ts(e, d, a, h.readTime) ? this.Ji(t, lo(e, null, "F")) : this.ns(t, d, e, h)
            }
            ))
        }
        )))
    }
    Yi(t, e, i, s) {
        return bc(e) || s.isEqual(F.min()) ? P.resolve(null) : this.Hi.getDocuments(t, i).next(r => {
            const a = this.es(e, r);
            return this.ts(e, a, i, s) ? P.resolve(null) : (Qn() <= W.DEBUG && V("QueryEngine", "Re-using previous result from %s to execute query: %s", s.toString(), Ye(e)),
            this.ns(t, a, e, Ny(s, -1)).next(l => l))
        }
        )
    }
    es(t, e) {
        let i = new It(id(t));
        return e.forEach( (s, r) => {
            Ws(t, r) && (i = i.add(r))
        }
        ),
        i
    }
    ts(t, e, i, s) {
        if (t.limit === null)
            return !1;
        if (i.size !== e.size)
            return !0;
        const r = t.limitType === "F" ? e.last() : e.first();
        return !!r && (r.hasPendingWrites || r.version.compareTo(s) > 0)
    }
    Zi(t, e, i) {
        return Qn() <= W.DEBUG && V("QueryEngine", "Using full collection scan to execute query:", Ye(e)),
        this.Hi.getDocumentsMatchingQuery(t, e, Te.min(), i)
    }
    ns(t, e, i, s) {
        return this.Hi.getDocumentsMatchingQuery(t, i, s).next(r => (e.forEach(a => {
            r = r.insert(a.key, a)
        }
        ),
        r))
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Qv {
    constructor(t, e, i, s) {
        this.persistence = t,
        this.rs = e,
        this.serializer = s,
        this.ss = new at(Q),
        this.os = new Cn(r => ra(r),oa),
        this._s = new Map,
        this.us = t.getRemoteDocumentCache(),
        this.$r = t.getTargetCache(),
        this.Wr = t.getBundleCache(),
        this.cs(i)
    }
    cs(t) {
        this.documentOverlayCache = this.persistence.getDocumentOverlayCache(t),
        this.indexManager = this.persistence.getIndexManager(t),
        this.mutationQueue = this.persistence.getMutationQueue(t, this.indexManager),
        this.localDocuments = new Lv(this.us,this.mutationQueue,this.documentOverlayCache,this.indexManager),
        this.us.setIndexManager(this.indexManager),
        this.rs.initialize(this.localDocuments, this.indexManager)
    }
    collectGarbage(t) {
        return this.persistence.runTransaction("Collect garbage", "readwrite-primary", e => t.collect(e, this.ss))
    }
}
function Yv(n, t, e, i) {
    return new Qv(n,t,e,i)
}
async function Cd(n, t) {
    const e = z(n);
    return await e.persistence.runTransaction("Handle user change", "readonly", i => {
        let s;
        return e.mutationQueue.getAllMutationBatches(i).next(r => (s = r,
        e.cs(t),
        e.mutationQueue.getAllMutationBatches(i))).next(r => {
            const a = []
              , l = [];
            let h = G();
            for (const d of s) {
                a.push(d.batchId);
                for (const f of d.mutations)
                    h = h.add(f.key)
            }
            for (const d of r) {
                l.push(d.batchId);
                for (const f of d.mutations)
                    h = h.add(f.key)
            }
            return e.localDocuments.getDocuments(i, h).next(d => ({
                ls: d,
                removedBatchIds: a,
                addedBatchIds: l
            }))
        }
        )
    }
    )
}
function Ad(n) {
    const t = z(n);
    return t.persistence.runTransaction("Get last remote snapshot version", "readonly", e => t.$r.getLastRemoteSnapshotVersion(e))
}
function Xv(n, t) {
    const e = z(n)
      , i = t.snapshotVersion;
    let s = e.ss;
    return e.persistence.runTransaction("Apply remote event", "readwrite-primary", r => {
        const a = e.us.newChangeBuffer({
            trackRemovals: !0
        });
        s = e.ss;
        const l = [];
        t.targetChanges.forEach( (f, _) => {
            const m = s.get(_);
            if (!m)
                return;
            l.push(e.$r.removeMatchingKeys(r, f.removedDocuments, _).next( () => e.$r.addMatchingKeys(r, f.addedDocuments, _)));
            let A = m.withSequenceNumber(r.currentSequenceNumber);
            t.targetMismatches.get(_) !== null ? A = A.withResumeToken(wt.EMPTY_BYTE_STRING, F.min()).withLastLimboFreeSnapshotVersion(F.min()) : f.resumeToken.approximateByteSize() > 0 && (A = A.withResumeToken(f.resumeToken, i)),
            s = s.insert(_, A),
            function(x, k, Y) {
                return x.resumeToken.approximateByteSize() === 0 || k.snapshotVersion.toMicroseconds() - x.snapshotVersion.toMicroseconds() >= 3e8 ? !0 : Y.addedDocuments.size + Y.modifiedDocuments.size + Y.removedDocuments.size > 0
            }(m, A, f) && l.push(e.$r.updateTargetData(r, A))
        }
        );
        let h = we()
          , d = G();
        if (t.documentUpdates.forEach(f => {
            t.resolvedLimboDocuments.has(f) && l.push(e.persistence.referenceDelegate.updateLimboDocument(r, f))
        }
        ),
        l.push(Jv(r, a, t.documentUpdates).next(f => {
            h = f.hs,
            d = f.Ps
        }
        )),
        !i.isEqual(F.min())) {
            const f = e.$r.getLastRemoteSnapshotVersion(r).next(_ => e.$r.setTargetsMetadata(r, r.currentSequenceNumber, i));
            l.push(f)
        }
        return P.waitFor(l).next( () => a.apply(r)).next( () => e.localDocuments.getLocalViewOfDocuments(r, h, d)).next( () => h)
    }
    ).then(r => (e.ss = s,
    r))
}
function Jv(n, t, e) {
    let i = G()
      , s = G();
    return e.forEach(r => i = i.add(r)),
    t.getEntries(n, i).next(r => {
        let a = we();
        return e.forEach( (l, h) => {
            const d = r.get(l);
            h.isFoundDocument() !== d.isFoundDocument() && (s = s.add(l)),
            h.isNoDocument() && h.version.isEqual(F.min()) ? (t.removeEntry(l, h.readTime),
            a = a.insert(l, h)) : !d.isValidDocument() || h.version.compareTo(d.version) > 0 || h.version.compareTo(d.version) === 0 && d.hasPendingWrites ? (t.addEntry(h),
            a = a.insert(l, h)) : V("LocalStore", "Ignoring outdated watch update for ", l, ". Current version:", d.version, " Watch version:", h.version)
        }
        ),
        {
            hs: a,
            Ps: s
        }
    }
    )
}
function Zv(n, t) {
    const e = z(n);
    return e.persistence.runTransaction("Allocate target", "readwrite", i => {
        let s;
        return e.$r.getTargetData(i, t).next(r => r ? (s = r,
        P.resolve(s)) : e.$r.allocateTargetId(i).next(a => (s = new fe(t,a,"TargetPurposeListen",i.currentSequenceNumber),
        e.$r.addTargetData(i, s).next( () => s))))
    }
    ).then(i => {
        const s = e.ss.get(i.targetId);
        return (s === null || i.snapshotVersion.compareTo(s.snapshotVersion) > 0) && (e.ss = e.ss.insert(i.targetId, i),
        e.os.set(t, i.targetId)),
        i
    }
    )
}
async function _o(n, t, e) {
    const i = z(n)
      , s = i.ss.get(t)
      , r = e ? "readwrite" : "readwrite-primary";
    try {
        e || await i.persistence.runTransaction("Release target", r, a => i.persistence.referenceDelegate.removeTarget(a, s))
    } catch (a) {
        if (!Di(a))
            throw a;
        V("LocalStore", `Failed to update sequence numbers for target ${t}: ${a}`)
    }
    i.ss = i.ss.remove(t),
    i.os.delete(s.target)
}
function Bc(n, t, e) {
    const i = z(n);
    let s = F.min()
      , r = G();
    return i.persistence.runTransaction("Execute query", "readwrite", a => function(h, d, f) {
        const _ = z(h)
          , m = _.os.get(f);
        return m !== void 0 ? P.resolve(_.ss.get(m)) : _.$r.getTargetData(d, f)
    }(i, a, Kt(t)).next(l => {
        if (l)
            return s = l.lastLimboFreeSnapshotVersion,
            i.$r.getMatchingKeysForTargetId(a, l.targetId).next(h => {
                r = h
            }
            )
    }
    ).next( () => i.rs.getDocumentsMatchingQuery(a, t, e ? s : F.min(), e ? r : G())).next(l => (tE(i, Jy(t), l),
    {
        documents: l,
        Is: r
    })))
}
function tE(n, t, e) {
    let i = n._s.get(t) || F.min();
    e.forEach( (s, r) => {
        r.readTime.compareTo(i) > 0 && (i = r.readTime)
    }
    ),
    n._s.set(t, i)
}
class qc {
    constructor() {
        this.activeTargetIds = sv()
    }
    Vs(t) {
        this.activeTargetIds = this.activeTargetIds.add(t)
    }
    fs(t) {
        this.activeTargetIds = this.activeTargetIds.delete(t)
    }
    Rs() {
        const t = {
            activeTargetIds: this.activeTargetIds.toArray(),
            updateTimeMs: Date.now()
        };
        return JSON.stringify(t)
    }
}
class eE {
    constructor() {
        this.io = new qc,
        this.so = {},
        this.onlineStateHandler = null,
        this.sequenceNumberHandler = null
    }
    addPendingMutation(t) {}
    updateMutationState(t, e, i) {}
    addLocalQueryTarget(t) {
        return this.io.Vs(t),
        this.so[t] || "not-current"
    }
    updateQueryState(t, e, i) {
        this.so[t] = e
    }
    removeLocalQueryTarget(t) {
        this.io.fs(t)
    }
    isLocalQueryTarget(t) {
        return this.io.activeTargetIds.has(t)
    }
    clearQueryState(t) {
        delete this.so[t]
    }
    getAllActiveQueryTargets() {
        return this.io.activeTargetIds
    }
    isActiveQueryTarget(t) {
        return this.io.activeTargetIds.has(t)
    }
    start() {
        return this.io = new qc,
        Promise.resolve()
    }
    handleUserChange(t, e, i) {}
    setOnlineState(t) {}
    shutdown() {}
    writeSequenceNumber(t) {}
    notifyBundleLoaded(t) {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nE {
    oo(t) {}
    shutdown() {}
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jc {
    constructor() {
        this._o = () => this.ao(),
        this.uo = () => this.co(),
        this.lo = [],
        this.ho()
    }
    oo(t) {
        this.lo.push(t)
    }
    shutdown() {
        window.removeEventListener("online", this._o),
        window.removeEventListener("offline", this.uo)
    }
    ho() {
        window.addEventListener("online", this._o),
        window.addEventListener("offline", this.uo)
    }
    ao() {
        V("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
        for (const t of this.lo)
            t(0)
    }
    co() {
        V("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
        for (const t of this.lo)
            t(1)
    }
    static D() {
        return typeof window < "u" && window.addEventListener !== void 0 && window.removeEventListener !== void 0
    }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let os = null;
function Or() {
    return os === null ? os = function() {
        return 268435456 + Math.round(2147483648 * Math.random())
    }() : os++,
    "0x" + os.toString(16)
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const iE = {
    BatchGetDocuments: "batchGet",
    Commit: "commit",
    RunQuery: "runQuery",
    RunAggregationQuery: "runAggregationQuery"
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class sE {
    constructor(t) {
        this.Po = t.Po,
        this.Io = t.Io
    }
    To(t) {
        this.Eo = t
    }
    Ao(t) {
        this.Ro = t
    }
    Vo(t) {
        this.mo = t
    }
    onMessage(t) {
        this.fo = t
    }
    close() {
        this.Io()
    }
    send(t) {
        this.Po(t)
    }
    po() {
        this.Eo()
    }
    yo() {
        this.Ro()
    }
    wo(t) {
        this.mo(t)
    }
    So(t) {
        this.fo(t)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Pt = "WebChannelConnection";
class rE extends class {
    constructor(e) {
        this.databaseInfo = e,
        this.databaseId = e.databaseId;
        const i = e.ssl ? "https" : "http"
          , s = encodeURIComponent(this.databaseId.projectId)
          , r = encodeURIComponent(this.databaseId.database);
        this.bo = i + "://" + e.host,
        this.Do = `projects/${s}/databases/${r}`,
        this.Co = this.databaseId.database === "(default)" ? `project_id=${s}` : `project_id=${s}&database_id=${r}`
    }
    get vo() {
        return !1
    }
    Fo(e, i, s, r, a) {
        const l = Or()
          , h = this.Mo(e, i.toUriEncodedString());
        V("RestConnection", `Sending RPC '${e}' ${l}:`, h, s);
        const d = {
            "google-cloud-resource-prefix": this.Do,
            "x-goog-request-params": this.Co
        };
        return this.xo(d, r, a),
        this.Oo(e, h, d, s).then(f => (V("RestConnection", `Received RPC '${e}' ${l}: `, f),
        f), f => {
            throw dn("RestConnection", `RPC '${e}' ${l} failed with error: `, f, "url: ", h, "request:", s),
            f
        }
        )
    }
    No(e, i, s, r, a, l) {
        return this.Fo(e, i, s, r, a)
    }
    xo(e, i, s) {
        e["X-Goog-Api-Client"] = function() {
            return "gl-js/ fire/" + wn
        }(),
        e["Content-Type"] = "text/plain",
        this.databaseInfo.appId && (e["X-Firebase-GMPID"] = this.databaseInfo.appId),
        i && i.headers.forEach( (r, a) => e[a] = r),
        s && s.headers.forEach( (r, a) => e[a] = r)
    }
    Mo(e, i) {
        const s = iE[e];
        return `${this.bo}/v1/${i}:${s}`
    }
    terminate() {}
}
{
    constructor(t) {
        super(t),
        this.forceLongPolling = t.forceLongPolling,
        this.autoDetectLongPolling = t.autoDetectLongPolling,
        this.useFetchStreams = t.useFetchStreams,
        this.longPollingOptions = t.longPollingOptions
    }
    Oo(t, e, i, s) {
        const r = Or();
        return new Promise( (a, l) => {
            const h = new Uu;
            h.setWithCredentials(!0),
            h.listenOnce(qu.COMPLETE, () => {
                try {
                    switch (h.getLastErrorCode()) {
                    case hs.NO_ERROR:
                        const f = h.getResponseJson();
                        V(Pt, `XHR for RPC '${t}' ${r} received:`, JSON.stringify(f)),
                        a(f);
                        break;
                    case hs.TIMEOUT:
                        V(Pt, `RPC '${t}' ${r} timed out`),
                        l(new O(b.DEADLINE_EXCEEDED,"Request time out"));
                        break;
                    case hs.HTTP_ERROR:
                        const _ = h.getStatus();
                        if (V(Pt, `RPC '${t}' ${r} failed with status:`, _, "response text:", h.getResponseText()),
                        _ > 0) {
                            let m = h.getResponseJson();
                            Array.isArray(m) && (m = m[0]);
                            const A = m == null ? void 0 : m.error;
                            if (A && A.status && A.message) {
                                const S = function(k) {
                                    const Y = k.toLowerCase().replace(/_/g, "-");
                                    return Object.values(b).indexOf(Y) >= 0 ? Y : b.UNKNOWN
                                }(A.status);
                                l(new O(S,A.message))
                            } else
                                l(new O(b.UNKNOWN,"Server responded with status " + h.getStatus()))
                        } else
                            l(new O(b.UNAVAILABLE,"Connection failed."));
                        break;
                    default:
                        U()
                    }
                } finally {
                    V(Pt, `RPC '${t}' ${r} completed.`)
                }
            }
            );
            const d = JSON.stringify(s);
            V(Pt, `RPC '${t}' ${r} sending request:`, s),
            h.send(e, "POST", d, i, 15)
        }
        )
    }
    Lo(t, e, i) {
        const s = Or()
          , r = [this.bo, "/", "google.firestore.v1.Firestore", "/", t, "/channel"]
          , a = Wu()
          , l = $u()
          , h = {
            httpSessionIdParam: "gsessionid",
            initMessageHeaders: {},
            messageUrlParams: {
                database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
            },
            sendRawJson: !0,
            supportsCrossDomainXhr: !0,
            internalChannelParams: {
                forwardChannelRequestTimeoutMs: 6e5
            },
            forceLongPolling: this.forceLongPolling,
            detectBufferingProxy: this.autoDetectLongPolling
        }
          , d = this.longPollingOptions.timeoutSeconds;
        d !== void 0 && (h.longPollingTimeout = Math.round(1e3 * d)),
        this.useFetchStreams && (h.xmlHttpFactory = new Bu({})),
        this.xo(h.initMessageHeaders, e, i),
        h.encodeInitMessageHeaders = !0;
        const f = r.join("");
        V(Pt, `Creating RPC '${t}' stream ${s}: ${f}`, h);
        const _ = a.createWebChannel(f, h);
        let m = !1
          , A = !1;
        const S = new sE({
            Po: k => {
                A ? V(Pt, `Not sending because RPC '${t}' stream ${s} is closed:`, k) : (m || (V(Pt, `Opening RPC '${t}' stream ${s} transport.`),
                _.open(),
                m = !0),
                V(Pt, `RPC '${t}' stream ${s} sending:`, k),
                _.send(k))
            }
            ,
            Io: () => _.close()
        })
          , x = (k, Y, X) => {
            k.listen(Y, tt => {
                try {
                    X(tt)
                } catch (lt) {
                    setTimeout( () => {
                        throw lt
                    }
                    , 0)
                }
            }
            )
        }
        ;
        return x(_, Xn.EventType.OPEN, () => {
            A || (V(Pt, `RPC '${t}' stream ${s} transport opened.`),
            S.po())
        }
        ),
        x(_, Xn.EventType.CLOSE, () => {
            A || (A = !0,
            V(Pt, `RPC '${t}' stream ${s} transport closed`),
            S.wo())
        }
        ),
        x(_, Xn.EventType.ERROR, k => {
            A || (A = !0,
            dn(Pt, `RPC '${t}' stream ${s} transport errored:`, k),
            S.wo(new O(b.UNAVAILABLE,"The operation could not be completed")))
        }
        ),
        x(_, Xn.EventType.MESSAGE, k => {
            var Y;
            if (!A) {
                const X = k.data[0];
                dt(!!X);
                const tt = X
                  , lt = tt.error || ((Y = tt[0]) === null || Y === void 0 ? void 0 : Y.error);
                if (lt) {
                    V(Pt, `RPC '${t}' stream ${s} received error:`, lt);
                    const Yt = lt.status;
                    let yt = function(v) {
                        const E = ct[v];
                        if (E !== void 0)
                            return fd(E)
                    }(Yt)
                      , I = lt.message;
                    yt === void 0 && (yt = b.INTERNAL,
                    I = "Unknown error status: " + Yt + " with message " + lt.message),
                    A = !0,
                    S.wo(new O(yt,I)),
                    _.close()
                } else
                    V(Pt, `RPC '${t}' stream ${s} received:`, X),
                    S.So(X)
            }
        }
        ),
        x(l, ju.STAT_EVENT, k => {
            k.stat === no.PROXY ? V(Pt, `RPC '${t}' stream ${s} detected buffering proxy`) : k.stat === no.NOPROXY && V(Pt, `RPC '${t}' stream ${s} detected no buffering proxy`)
        }
        ),
        setTimeout( () => {
            S.yo()
        }
        , 0),
        S
    }
}
function Mr() {
    return typeof document < "u" ? document : null
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ks(n) {
    return new Tv(n,!0)
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rd {
    constructor(t, e, i=1e3, s=1.5, r=6e4) {
        this.ai = t,
        this.timerId = e,
        this.Bo = i,
        this.ko = s,
        this.qo = r,
        this.Qo = 0,
        this.Ko = null,
        this.$o = Date.now(),
        this.reset()
    }
    reset() {
        this.Qo = 0
    }
    Uo() {
        this.Qo = this.qo
    }
    Wo(t) {
        this.cancel();
        const e = Math.floor(this.Qo + this.Go())
          , i = Math.max(0, Date.now() - this.$o)
          , s = Math.max(0, e - i);
        s > 0 && V("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.Qo} ms, delay with jitter: ${e} ms, last attempt: ${i} ms ago)`),
        this.Ko = this.ai.enqueueAfterDelay(this.timerId, s, () => (this.$o = Date.now(),
        t())),
        this.Qo *= this.ko,
        this.Qo < this.Bo && (this.Qo = this.Bo),
        this.Qo > this.qo && (this.Qo = this.qo)
    }
    zo() {
        this.Ko !== null && (this.Ko.skipDelay(),
        this.Ko = null)
    }
    cancel() {
        this.Ko !== null && (this.Ko.cancel(),
        this.Ko = null)
    }
    Go() {
        return (Math.random() - .5) * this.Qo
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class oE {
    constructor(t, e, i, s, r, a, l, h) {
        this.ai = t,
        this.jo = i,
        this.Ho = s,
        this.connection = r,
        this.authCredentialsProvider = a,
        this.appCheckCredentialsProvider = l,
        this.listener = h,
        this.state = 0,
        this.Jo = 0,
        this.Yo = null,
        this.Zo = null,
        this.stream = null,
        this.Xo = 0,
        this.e_ = new Rd(t,e)
    }
    t_() {
        return this.state === 1 || this.state === 5 || this.n_()
    }
    n_() {
        return this.state === 2 || this.state === 3
    }
    start() {
        this.Xo = 0,
        this.state !== 4 ? this.auth() : this.r_()
    }
    async stop() {
        this.t_() && await this.close(0)
    }
    i_() {
        this.state = 0,
        this.e_.reset()
    }
    s_() {
        this.n_() && this.Yo === null && (this.Yo = this.ai.enqueueAfterDelay(this.jo, 6e4, () => this.o_()))
    }
    __(t) {
        this.a_(),
        this.stream.send(t)
    }
    async o_() {
        if (this.n_())
            return this.close(0)
    }
    a_() {
        this.Yo && (this.Yo.cancel(),
        this.Yo = null)
    }
    u_() {
        this.Zo && (this.Zo.cancel(),
        this.Zo = null)
    }
    async close(t, e) {
        this.a_(),
        this.u_(),
        this.e_.cancel(),
        this.Jo++,
        t !== 4 ? this.e_.reset() : e && e.code === b.RESOURCE_EXHAUSTED ? (se(e.toString()),
        se("Using maximum backoff delay to prevent overloading the backend."),
        this.e_.Uo()) : e && e.code === b.UNAUTHENTICATED && this.state !== 3 && (this.authCredentialsProvider.invalidateToken(),
        this.appCheckCredentialsProvider.invalidateToken()),
        this.stream !== null && (this.c_(),
        this.stream.close(),
        this.stream = null),
        this.state = t,
        await this.listener.Vo(e)
    }
    c_() {}
    auth() {
        this.state = 1;
        const t = this.l_(this.Jo)
          , e = this.Jo;
        Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then( ([i,s]) => {
            this.Jo === e && this.h_(i, s)
        }
        , i => {
            t( () => {
                const s = new O(b.UNKNOWN,"Fetching auth token failed: " + i.message);
                return this.P_(s)
            }
            )
        }
        )
    }
    h_(t, e) {
        const i = this.l_(this.Jo);
        this.stream = this.I_(t, e),
        this.stream.To( () => {
            i( () => this.listener.To())
        }
        ),
        this.stream.Ao( () => {
            i( () => (this.state = 2,
            this.Zo = this.ai.enqueueAfterDelay(this.Ho, 1e4, () => (this.n_() && (this.state = 3),
            Promise.resolve())),
            this.listener.Ao()))
        }
        ),
        this.stream.Vo(s => {
            i( () => this.P_(s))
        }
        ),
        this.stream.onMessage(s => {
            i( () => ++this.Xo == 1 ? this.T_(s) : this.onNext(s))
        }
        )
    }
    r_() {
        this.state = 5,
        this.e_.Wo(async () => {
            this.state = 0,
            this.start()
        }
        )
    }
    P_(t) {
        return V("PersistentStream", `close with error: ${t}`),
        this.stream = null,
        this.close(4, t)
    }
    l_(t) {
        return e => {
            this.ai.enqueueAndForget( () => this.Jo === t ? e() : (V("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."),
            Promise.resolve()))
        }
    }
}
class aE extends oE {
    constructor(t, e, i, s, r, a) {
        super(t, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", e, i, s, a),
        this.serializer = r
    }
    I_(t, e) {
        return this.connection.Lo("Listen", t, e)
    }
    T_(t) {
        return this.onNext(t)
    }
    onNext(t) {
        this.e_.reset();
        const e = wv(this.serializer, t)
          , i = function(r) {
            if (!("targetChange"in r))
                return F.min();
            const a = r.targetChange;
            return a.targetIds && a.targetIds.length ? F.min() : a.readTime ? sn(a.readTime) : F.min()
        }(t);
        return this.listener.E_(e, i)
    }
    d_(t) {
        const e = {};
        e.database = Uc(this.serializer),
        e.addTarget = function(r, a) {
            let l;
            const h = a.target;
            if (l = oo(h) ? {
                documents: Cv(r, h)
            } : {
                query: Av(r, h)._t
            },
            l.targetId = a.targetId,
            a.resumeToken.approximateByteSize() > 0) {
                l.resumeToken = gd(r, a.resumeToken);
                const d = uo(r, a.expectedCount);
                d !== null && (l.expectedCount = d)
            } else if (a.snapshotVersion.compareTo(F.min()) > 0) {
                l.readTime = fo(r, a.snapshotVersion.toTimestamp());
                const d = uo(r, a.expectedCount);
                d !== null && (l.expectedCount = d)
            }
            return l
        }(this.serializer, t);
        const i = Sv(this.serializer, t);
        i && (e.labels = i),
        this.__(e)
    }
    A_(t) {
        const e = {};
        e.database = Uc(this.serializer),
        e.removeTarget = t,
        this.__(e)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lE extends class {
}
{
    constructor(t, e, i, s) {
        super(),
        this.authCredentials = t,
        this.appCheckCredentials = e,
        this.connection = i,
        this.serializer = s,
        this.p_ = !1
    }
    y_() {
        if (this.p_)
            throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.")
    }
    Fo(t, e, i, s) {
        return this.y_(),
        Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then( ([r,a]) => this.connection.Fo(t, po(e, i), s, r, a)).catch(r => {
            throw r.name === "FirebaseError" ? (r.code === b.UNAUTHENTICATED && (this.authCredentials.invalidateToken(),
            this.appCheckCredentials.invalidateToken()),
            r) : new O(b.UNKNOWN,r.toString())
        }
        )
    }
    No(t, e, i, s, r) {
        return this.y_(),
        Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then( ([a,l]) => this.connection.No(t, po(e, i), s, a, l, r)).catch(a => {
            throw a.name === "FirebaseError" ? (a.code === b.UNAUTHENTICATED && (this.authCredentials.invalidateToken(),
            this.appCheckCredentials.invalidateToken()),
            a) : new O(b.UNKNOWN,a.toString())
        }
        )
    }
    terminate() {
        this.p_ = !0,
        this.connection.terminate()
    }
}
class cE {
    constructor(t, e) {
        this.asyncQueue = t,
        this.onlineStateHandler = e,
        this.state = "Unknown",
        this.w_ = 0,
        this.S_ = null,
        this.b_ = !0
    }
    D_() {
        this.w_ === 0 && (this.C_("Unknown"),
        this.S_ = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, () => (this.S_ = null,
        this.v_("Backend didn't respond within 10 seconds."),
        this.C_("Offline"),
        Promise.resolve())))
    }
    F_(t) {
        this.state === "Online" ? this.C_("Unknown") : (this.w_++,
        this.w_ >= 1 && (this.M_(),
        this.v_(`Connection failed 1 times. Most recent error: ${t.toString()}`),
        this.C_("Offline")))
    }
    set(t) {
        this.M_(),
        this.w_ = 0,
        t === "Online" && (this.b_ = !1),
        this.C_(t)
    }
    C_(t) {
        t !== this.state && (this.state = t,
        this.onlineStateHandler(t))
    }
    v_(t) {
        const e = `Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
        this.b_ ? (se(e),
        this.b_ = !1) : V("OnlineStateTracker", e)
    }
    M_() {
        this.S_ !== null && (this.S_.cancel(),
        this.S_ = null)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hE {
    constructor(t, e, i, s, r) {
        this.localStore = t,
        this.datastore = e,
        this.asyncQueue = i,
        this.remoteSyncer = {},
        this.x_ = [],
        this.O_ = new Map,
        this.N_ = new Set,
        this.L_ = [],
        this.B_ = r,
        this.B_.oo(a => {
            i.enqueueAndForget(async () => {
                Mi(this) && (V("RemoteStore", "Restarting streams for network reachability change."),
                await async function(h) {
                    const d = z(h);
                    d.N_.add(4),
                    await Oi(d),
                    d.k_.set("Unknown"),
                    d.N_.delete(4),
                    await Qs(d)
                }(this))
            }
            )
        }
        ),
        this.k_ = new cE(i,s)
    }
}
async function Qs(n) {
    if (Mi(n))
        for (const t of n.L_)
            await t(!0)
}
async function Oi(n) {
    for (const t of n.L_)
        await t(!1)
}
function Sd(n, t) {
    const e = z(n);
    e.O_.has(t.targetId) || (e.O_.set(t.targetId, t),
    ga(e) ? _a(e) : An(e).n_() && pa(e, t))
}
function fa(n, t) {
    const e = z(n)
      , i = An(e);
    e.O_.delete(t),
    i.n_() && Pd(e, t),
    e.O_.size === 0 && (i.n_() ? i.s_() : Mi(e) && e.k_.set("Unknown"))
}
function pa(n, t) {
    if (n.q_.xe(t.targetId),
    t.resumeToken.approximateByteSize() > 0 || t.snapshotVersion.compareTo(F.min()) > 0) {
        const e = n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;
        t = t.withExpectedCount(e)
    }
    An(n).d_(t)
}
function Pd(n, t) {
    n.q_.xe(t),
    An(n).A_(t)
}
function _a(n) {
    n.q_ = new mv({
        getRemoteKeysForTarget: t => n.remoteSyncer.getRemoteKeysForTarget(t),
        ot: t => n.O_.get(t) || null,
        tt: () => n.datastore.serializer.databaseId
    }),
    An(n).start(),
    n.k_.D_()
}
function ga(n) {
    return Mi(n) && !An(n).t_() && n.O_.size > 0
}
function Mi(n) {
    return z(n).N_.size === 0
}
function bd(n) {
    n.q_ = void 0
}
async function uE(n) {
    n.k_.set("Online")
}
async function dE(n) {
    n.O_.forEach( (t, e) => {
        pa(n, t)
    }
    )
}
async function fE(n, t) {
    bd(n),
    ga(n) ? (n.k_.F_(t),
    _a(n)) : n.k_.set("Unknown")
}
async function pE(n, t, e) {
    if (n.k_.set("Online"),
    t instanceof _d && t.state === 2 && t.cause)
        try {
            await async function(s, r) {
                const a = r.cause;
                for (const l of r.targetIds)
                    s.O_.has(l) && (await s.remoteSyncer.rejectListen(l, a),
                    s.O_.delete(l),
                    s.q_.removeTarget(l))
            }(n, t)
        } catch (i) {
            V("RemoteStore", "Failed to remove targets %s: %s ", t.targetIds.join(","), i),
            await $c(n, i)
        }
    else if (t instanceof ds ? n.q_.Ke(t) : t instanceof pd ? n.q_.He(t) : n.q_.We(t),
    !e.isEqual(F.min()))
        try {
            const i = await Ad(n.localStore);
            e.compareTo(i) >= 0 && await function(r, a) {
                const l = r.q_.rt(a);
                return l.targetChanges.forEach( (h, d) => {
                    if (h.resumeToken.approximateByteSize() > 0) {
                        const f = r.O_.get(d);
                        f && r.O_.set(d, f.withResumeToken(h.resumeToken, a))
                    }
                }
                ),
                l.targetMismatches.forEach( (h, d) => {
                    const f = r.O_.get(h);
                    if (!f)
                        return;
                    r.O_.set(h, f.withResumeToken(wt.EMPTY_BYTE_STRING, f.snapshotVersion)),
                    Pd(r, h);
                    const _ = new fe(f.target,h,d,f.sequenceNumber);
                    pa(r, _)
                }
                ),
                r.remoteSyncer.applyRemoteEvent(l)
            }(n, e)
        } catch (i) {
            V("RemoteStore", "Failed to raise snapshot:", i),
            await $c(n, i)
        }
}
async function $c(n, t, e) {
    if (!Di(t))
        throw t;
    n.N_.add(1),
    await Oi(n),
    n.k_.set("Offline"),
    e || (e = () => Ad(n.localStore)),
    n.asyncQueue.enqueueRetryable(async () => {
        V("RemoteStore", "Retrying IndexedDB access"),
        await e(),
        n.N_.delete(1),
        await Qs(n)
    }
    )
}
async function Wc(n, t) {
    const e = z(n);
    e.asyncQueue.verifyOperationInProgress(),
    V("RemoteStore", "RemoteStore received new credentials");
    const i = Mi(e);
    e.N_.add(3),
    await Oi(e),
    i && e.k_.set("Unknown"),
    await e.remoteSyncer.handleCredentialChange(t),
    e.N_.delete(3),
    await Qs(e)
}
async function _E(n, t) {
    const e = z(n);
    t ? (e.N_.delete(2),
    await Qs(e)) : t || (e.N_.add(2),
    await Oi(e),
    e.k_.set("Unknown"))
}
function An(n) {
    return n.Q_ || (n.Q_ = function(e, i, s) {
        const r = z(e);
        return r.y_(),
        new aE(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)
    }(n.datastore, n.asyncQueue, {
        To: uE.bind(null, n),
        Ao: dE.bind(null, n),
        Vo: fE.bind(null, n),
        E_: pE.bind(null, n)
    }),
    n.L_.push(async t => {
        t ? (n.Q_.i_(),
        ga(n) ? _a(n) : n.k_.set("Unknown")) : (await n.Q_.stop(),
        bd(n))
    }
    )),
    n.Q_
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ma {
    constructor(t, e, i, s, r) {
        this.asyncQueue = t,
        this.timerId = e,
        this.targetTimeMs = i,
        this.op = s,
        this.removalCallback = r,
        this.deferred = new Oe,
        this.then = this.deferred.promise.then.bind(this.deferred.promise),
        this.deferred.promise.catch(a => {}
        )
    }
    get promise() {
        return this.deferred.promise
    }
    static createAndSchedule(t, e, i, s, r) {
        const a = Date.now() + i
          , l = new ma(t,e,a,s,r);
        return l.start(i),
        l
    }
    start(t) {
        this.timerHandle = setTimeout( () => this.handleDelayElapsed(), t)
    }
    skipDelay() {
        return this.handleDelayElapsed()
    }
    cancel(t) {
        this.timerHandle !== null && (this.clearTimeout(),
        this.deferred.reject(new O(b.CANCELLED,"Operation cancelled" + (t ? ": " + t : ""))))
    }
    handleDelayElapsed() {
        this.asyncQueue.enqueueAndForget( () => this.timerHandle !== null ? (this.clearTimeout(),
        this.op().then(t => this.deferred.resolve(t))) : Promise.resolve())
    }
    clearTimeout() {
        this.timerHandle !== null && (this.removalCallback(this),
        clearTimeout(this.timerHandle),
        this.timerHandle = null)
    }
}
function Nd(n, t) {
    if (se("AsyncQueue", `${t}: ${n}`),
    Di(n))
        return new O(b.UNAVAILABLE,`${t}: ${n}`);
    throw n
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class rn {
    constructor(t) {
        this.comparator = t ? (e, i) => t(e, i) || M.comparator(e.key, i.key) : (e, i) => M.comparator(e.key, i.key),
        this.keyedMap = Jn(),
        this.sortedSet = new at(this.comparator)
    }
    static emptySet(t) {
        return new rn(t.comparator)
    }
    has(t) {
        return this.keyedMap.get(t) != null
    }
    get(t) {
        return this.keyedMap.get(t)
    }
    first() {
        return this.sortedSet.minKey()
    }
    last() {
        return this.sortedSet.maxKey()
    }
    isEmpty() {
        return this.sortedSet.isEmpty()
    }
    indexOf(t) {
        const e = this.keyedMap.get(t);
        return e ? this.sortedSet.indexOf(e) : -1
    }
    get size() {
        return this.sortedSet.size
    }
    forEach(t) {
        this.sortedSet.inorderTraversal( (e, i) => (t(e),
        !1))
    }
    add(t) {
        const e = this.delete(t.key);
        return e.copy(e.keyedMap.insert(t.key, t), e.sortedSet.insert(t, null))
    }
    delete(t) {
        const e = this.get(t);
        return e ? this.copy(this.keyedMap.remove(t), this.sortedSet.remove(e)) : this
    }
    isEqual(t) {
        if (!(t instanceof rn) || this.size !== t.size)
            return !1;
        const e = this.sortedSet.getIterator()
          , i = t.sortedSet.getIterator();
        for (; e.hasNext(); ) {
            const s = e.getNext().key
              , r = i.getNext().key;
            if (!s.isEqual(r))
                return !1
        }
        return !0
    }
    toString() {
        const t = [];
        return this.forEach(e => {
            t.push(e.toString())
        }
        ),
        t.length === 0 ? "DocumentSet ()" : `DocumentSet (
  ` + t.join(`
`) + `
)`
    }
    copy(t, e) {
        const i = new rn;
        return i.comparator = this.comparator,
        i.keyedMap = t,
        i.sortedSet = e,
        i
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zc {
    constructor() {
        this.U_ = new at(M.comparator)
    }
    track(t) {
        const e = t.doc.key
          , i = this.U_.get(e);
        i ? t.type !== 0 && i.type === 3 ? this.U_ = this.U_.insert(e, t) : t.type === 3 && i.type !== 1 ? this.U_ = this.U_.insert(e, {
            type: i.type,
            doc: t.doc
        }) : t.type === 2 && i.type === 2 ? this.U_ = this.U_.insert(e, {
            type: 2,
            doc: t.doc
        }) : t.type === 2 && i.type === 0 ? this.U_ = this.U_.insert(e, {
            type: 0,
            doc: t.doc
        }) : t.type === 1 && i.type === 0 ? this.U_ = this.U_.remove(e) : t.type === 1 && i.type === 2 ? this.U_ = this.U_.insert(e, {
            type: 1,
            doc: i.doc
        }) : t.type === 0 && i.type === 1 ? this.U_ = this.U_.insert(e, {
            type: 2,
            doc: t.doc
        }) : U() : this.U_ = this.U_.insert(e, t)
    }
    W_() {
        const t = [];
        return this.U_.inorderTraversal( (e, i) => {
            t.push(i)
        }
        ),
        t
    }
}
class mn {
    constructor(t, e, i, s, r, a, l, h, d) {
        this.query = t,
        this.docs = e,
        this.oldDocs = i,
        this.docChanges = s,
        this.mutatedKeys = r,
        this.fromCache = a,
        this.syncStateChanged = l,
        this.excludesMetadataChanges = h,
        this.hasCachedResults = d
    }
    static fromInitialDocuments(t, e, i, s, r) {
        const a = [];
        return e.forEach(l => {
            a.push({
                type: 0,
                doc: l
            })
        }
        ),
        new mn(t,e,rn.emptySet(e),a,i,s,!0,!1,r)
    }
    get hasPendingWrites() {
        return !this.mutatedKeys.isEmpty()
    }
    isEqual(t) {
        if (!(this.fromCache === t.fromCache && this.hasCachedResults === t.hasCachedResults && this.syncStateChanged === t.syncStateChanged && this.mutatedKeys.isEqual(t.mutatedKeys) && $s(this.query, t.query) && this.docs.isEqual(t.docs) && this.oldDocs.isEqual(t.oldDocs)))
            return !1;
        const e = this.docChanges
          , i = t.docChanges;
        if (e.length !== i.length)
            return !1;
        for (let s = 0; s < e.length; s++)
            if (e[s].type !== i[s].type || !e[s].doc.isEqual(i[s].doc))
                return !1;
        return !0
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gE {
    constructor() {
        this.G_ = void 0,
        this.z_ = []
    }
    j_() {
        return this.z_.some(t => t.H_())
    }
}
class mE {
    constructor() {
        this.queries = Gc(),
        this.onlineState = "Unknown",
        this.J_ = new Set
    }
    terminate() {
        (function(e, i) {
            const s = z(e)
              , r = s.queries;
            s.queries = Gc(),
            r.forEach( (a, l) => {
                for (const h of l.z_)
                    h.onError(i)
            }
            )
        }
        )(this, new O(b.ABORTED,"Firestore shutting down"))
    }
}
function Gc() {
    return new Cn(n => nd(n),$s)
}
async function yE(n, t) {
    const e = z(n);
    let i = 3;
    const s = t.query;
    let r = e.queries.get(s);
    r ? !r.j_() && t.H_() && (i = 2) : (r = new gE,
    i = t.H_() ? 0 : 1);
    try {
        switch (i) {
        case 0:
            r.G_ = await e.onListen(s, !0);
            break;
        case 1:
            r.G_ = await e.onListen(s, !1);
            break;
        case 2:
            await e.onFirstRemoteStoreListen(s)
        }
    } catch (a) {
        const l = Nd(a, `Initialization of query '${Ye(t.query)}' failed`);
        return void t.onError(l)
    }
    e.queries.set(s, r),
    r.z_.push(t),
    t.Y_(e.onlineState),
    r.G_ && t.Z_(r.G_) && ya(e)
}
async function vE(n, t) {
    const e = z(n)
      , i = t.query;
    let s = 3;
    const r = e.queries.get(i);
    if (r) {
        const a = r.z_.indexOf(t);
        a >= 0 && (r.z_.splice(a, 1),
        r.z_.length === 0 ? s = t.H_() ? 0 : 1 : !r.j_() && t.H_() && (s = 2))
    }
    switch (s) {
    case 0:
        return e.queries.delete(i),
        e.onUnlisten(i, !0);
    case 1:
        return e.queries.delete(i),
        e.onUnlisten(i, !1);
    case 2:
        return e.onLastRemoteStoreUnlisten(i);
    default:
        return
    }
}
function EE(n, t) {
    const e = z(n);
    let i = !1;
    for (const s of t) {
        const r = s.query
          , a = e.queries.get(r);
        if (a) {
            for (const l of a.z_)
                l.Z_(s) && (i = !0);
            a.G_ = s
        }
    }
    i && ya(e)
}
function TE(n, t, e) {
    const i = z(n)
      , s = i.queries.get(t);
    if (s)
        for (const r of s.z_)
            r.onError(e);
    i.queries.delete(t)
}
function ya(n) {
    n.J_.forEach(t => {
        t.next()
    }
    )
}
var go, Hc;
(Hc = go || (go = {})).X_ = "default",
Hc.Cache = "cache";
class IE {
    constructor(t, e, i) {
        this.query = t,
        this.ea = e,
        this.ta = !1,
        this.na = null,
        this.onlineState = "Unknown",
        this.options = i || {}
    }
    Z_(t) {
        if (!this.options.includeMetadataChanges) {
            const i = [];
            for (const s of t.docChanges)
                s.type !== 3 && i.push(s);
            t = new mn(t.query,t.docs,t.oldDocs,i,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)
        }
        let e = !1;
        return this.ta ? this.ra(t) && (this.ea.next(t),
        e = !0) : this.ia(t, this.onlineState) && (this.sa(t),
        e = !0),
        this.na = t,
        e
    }
    onError(t) {
        this.ea.error(t)
    }
    Y_(t) {
        this.onlineState = t;
        let e = !1;
        return this.na && !this.ta && this.ia(this.na, t) && (this.sa(this.na),
        e = !0),
        e
    }
    ia(t, e) {
        if (!t.fromCache || !this.H_())
            return !0;
        const i = e !== "Offline";
        return (!this.options.oa || !i) && (!t.docs.isEmpty() || t.hasCachedResults || e === "Offline")
    }
    ra(t) {
        if (t.docChanges.length > 0)
            return !0;
        const e = this.na && this.na.hasPendingWrites !== t.hasPendingWrites;
        return !(!t.syncStateChanged && !e) && this.options.includeMetadataChanges === !0
    }
    sa(t) {
        t = mn.fromInitialDocuments(t.query, t.docs, t.mutatedKeys, t.fromCache, t.hasCachedResults),
        this.ta = !0,
        this.ea.next(t)
    }
    H_() {
        return this.options.source !== go.Cache
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Dd {
    constructor(t) {
        this.key = t
    }
}
class kd {
    constructor(t) {
        this.key = t
    }
}
class wE {
    constructor(t, e) {
        this.query = t,
        this.Ia = e,
        this.Ta = null,
        this.hasCachedResults = !1,
        this.current = !1,
        this.Ea = G(),
        this.mutatedKeys = G(),
        this.da = id(t),
        this.Aa = new rn(this.da)
    }
    get Ra() {
        return this.Ia
    }
    Va(t, e) {
        const i = e ? e.ma : new zc
          , s = e ? e.Aa : this.Aa;
        let r = e ? e.mutatedKeys : this.mutatedKeys
          , a = s
          , l = !1;
        const h = this.query.limitType === "F" && s.size === this.query.limit ? s.last() : null
          , d = this.query.limitType === "L" && s.size === this.query.limit ? s.first() : null;
        if (t.inorderTraversal( (f, _) => {
            const m = s.get(f)
              , A = Ws(this.query, _) ? _ : null
              , S = !!m && this.mutatedKeys.has(m.key)
              , x = !!A && (A.hasLocalMutations || this.mutatedKeys.has(A.key) && A.hasCommittedMutations);
            let k = !1;
            m && A ? m.data.isEqual(A.data) ? S !== x && (i.track({
                type: 3,
                doc: A
            }),
            k = !0) : this.fa(m, A) || (i.track({
                type: 2,
                doc: A
            }),
            k = !0,
            (h && this.da(A, h) > 0 || d && this.da(A, d) < 0) && (l = !0)) : !m && A ? (i.track({
                type: 0,
                doc: A
            }),
            k = !0) : m && !A && (i.track({
                type: 1,
                doc: m
            }),
            k = !0,
            (h || d) && (l = !0)),
            k && (A ? (a = a.add(A),
            r = x ? r.add(f) : r.delete(f)) : (a = a.delete(f),
            r = r.delete(f)))
        }
        ),
        this.query.limit !== null)
            for (; a.size > this.query.limit; ) {
                const f = this.query.limitType === "F" ? a.last() : a.first();
                a = a.delete(f.key),
                r = r.delete(f.key),
                i.track({
                    type: 1,
                    doc: f
                })
            }
        return {
            Aa: a,
            ma: i,
            ts: l,
            mutatedKeys: r
        }
    }
    fa(t, e) {
        return t.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations
    }
    applyChanges(t, e, i, s) {
        const r = this.Aa;
        this.Aa = t.Aa,
        this.mutatedKeys = t.mutatedKeys;
        const a = t.ma.W_();
        a.sort( (f, _) => function(A, S) {
            const x = k => {
                switch (k) {
                case 0:
                    return 1;
                case 2:
                case 3:
                    return 2;
                case 1:
                    return 0;
                default:
                    return U()
                }
            }
            ;
            return x(A) - x(S)
        }(f.type, _.type) || this.da(f.doc, _.doc)),
        this.ga(i),
        s = s != null && s;
        const l = e && !s ? this.pa() : []
          , h = this.Ea.size === 0 && this.current && !s ? 1 : 0
          , d = h !== this.Ta;
        return this.Ta = h,
        a.length !== 0 || d ? {
            snapshot: new mn(this.query,t.Aa,r,a,t.mutatedKeys,h === 0,d,!1,!!i && i.resumeToken.approximateByteSize() > 0),
            ya: l
        } : {
            ya: l
        }
    }
    Y_(t) {
        return this.current && t === "Offline" ? (this.current = !1,
        this.applyChanges({
            Aa: this.Aa,
            ma: new zc,
            mutatedKeys: this.mutatedKeys,
            ts: !1
        }, !1)) : {
            ya: []
        }
    }
    wa(t) {
        return !this.Ia.has(t) && !!this.Aa.has(t) && !this.Aa.get(t).hasLocalMutations
    }
    ga(t) {
        t && (t.addedDocuments.forEach(e => this.Ia = this.Ia.add(e)),
        t.modifiedDocuments.forEach(e => {}
        ),
        t.removedDocuments.forEach(e => this.Ia = this.Ia.delete(e)),
        this.current = t.current)
    }
    pa() {
        if (!this.current)
            return [];
        const t = this.Ea;
        this.Ea = G(),
        this.Aa.forEach(i => {
            this.wa(i.key) && (this.Ea = this.Ea.add(i.key))
        }
        );
        const e = [];
        return t.forEach(i => {
            this.Ea.has(i) || e.push(new kd(i))
        }
        ),
        this.Ea.forEach(i => {
            t.has(i) || e.push(new Dd(i))
        }
        ),
        e
    }
    Sa(t) {
        this.Ia = t.Is,
        this.Ea = G();
        const e = this.Va(t.documents);
        return this.applyChanges(e, !0)
    }
    ba() {
        return mn.fromInitialDocuments(this.query, this.Aa, this.mutatedKeys, this.Ta === 0, this.hasCachedResults)
    }
}
class CE {
    constructor(t, e, i) {
        this.query = t,
        this.targetId = e,
        this.view = i
    }
}
class AE {
    constructor(t) {
        this.key = t,
        this.Da = !1
    }
}
class RE {
    constructor(t, e, i, s, r, a) {
        this.localStore = t,
        this.remoteStore = e,
        this.eventManager = i,
        this.sharedClientState = s,
        this.currentUser = r,
        this.maxConcurrentLimboResolutions = a,
        this.Ca = {},
        this.va = new Cn(l => nd(l),$s),
        this.Fa = new Map,
        this.Ma = new Set,
        this.xa = new at(M.comparator),
        this.Oa = new Map,
        this.Na = new ha,
        this.La = {},
        this.Ba = new Map,
        this.ka = gn.Bn(),
        this.onlineState = "Unknown",
        this.qa = void 0
    }
    get isPrimaryClient() {
        return this.qa === !0
    }
}
async function SE(n, t, e=!0) {
    const i = Ld(n);
    let s;
    const r = i.va.get(t);
    return r ? (i.sharedClientState.addLocalQueryTarget(r.targetId),
    s = r.view.ba()) : s = await xd(i, t, e, !0),
    s
}
async function PE(n, t) {
    const e = Ld(n);
    await xd(e, t, !0, !1)
}
async function xd(n, t, e, i) {
    const s = await Zv(n.localStore, Kt(t))
      , r = s.targetId
      , a = e ? n.sharedClientState.addLocalQueryTarget(r) : "not-current";
    let l;
    return i && (l = await bE(n, t, r, a === "current", s.resumeToken)),
    n.isPrimaryClient && e && Sd(n.remoteStore, s),
    l
}
async function bE(n, t, e, i, s) {
    n.Qa = (_, m, A) => async function(x, k, Y, X) {
        let tt = k.view.Va(Y);
        tt.ts && (tt = await Bc(x.localStore, k.query, !1).then( ({documents: I}) => k.view.Va(I, tt)));
        const lt = X && X.targetChanges.get(k.targetId)
          , Yt = X && X.targetMismatches.get(k.targetId) != null
          , yt = k.view.applyChanges(tt, x.isPrimaryClient, lt, Yt);
        return Qc(x, k.targetId, yt.ya),
        yt.snapshot
    }(n, _, m, A);
    const r = await Bc(n.localStore, t, !0)
      , a = new wE(t,r.Is)
      , l = a.Va(r.documents)
      , h = Vi.createSynthesizedTargetChangeForCurrentChange(e, i && n.onlineState !== "Offline", s)
      , d = a.applyChanges(l, n.isPrimaryClient, h);
    Qc(n, e, d.ya);
    const f = new CE(t,e,a);
    return n.va.set(t, f),
    n.Fa.has(e) ? n.Fa.get(e).push(t) : n.Fa.set(e, [t]),
    d.snapshot
}
async function NE(n, t, e) {
    const i = z(n)
      , s = i.va.get(t)
      , r = i.Fa.get(s.targetId);
    if (r.length > 1)
        return i.Fa.set(s.targetId, r.filter(a => !$s(a, t))),
        void i.va.delete(t);
    i.isPrimaryClient ? (i.sharedClientState.removeLocalQueryTarget(s.targetId),
    i.sharedClientState.isActiveQueryTarget(s.targetId) || await _o(i.localStore, s.targetId, !1).then( () => {
        i.sharedClientState.clearQueryState(s.targetId),
        e && fa(i.remoteStore, s.targetId),
        mo(i, s.targetId)
    }
    ).catch(ta)) : (mo(i, s.targetId),
    await _o(i.localStore, s.targetId, !0))
}
async function DE(n, t) {
    const e = z(n)
      , i = e.va.get(t)
      , s = e.Fa.get(i.targetId);
    e.isPrimaryClient && s.length === 1 && (e.sharedClientState.removeLocalQueryTarget(i.targetId),
    fa(e.remoteStore, i.targetId))
}
async function Vd(n, t) {
    const e = z(n);
    try {
        const i = await Xv(e.localStore, t);
        t.targetChanges.forEach( (s, r) => {
            const a = e.Oa.get(r);
            a && (dt(s.addedDocuments.size + s.modifiedDocuments.size + s.removedDocuments.size <= 1),
            s.addedDocuments.size > 0 ? a.Da = !0 : s.modifiedDocuments.size > 0 ? dt(a.Da) : s.removedDocuments.size > 0 && (dt(a.Da),
            a.Da = !1))
        }
        ),
        await Md(e, i, t)
    } catch (i) {
        await ta(i)
    }
}
function Kc(n, t, e) {
    const i = z(n);
    if (i.isPrimaryClient && e === 0 || !i.isPrimaryClient && e === 1) {
        const s = [];
        i.va.forEach( (r, a) => {
            const l = a.view.Y_(t);
            l.snapshot && s.push(l.snapshot)
        }
        ),
        function(a, l) {
            const h = z(a);
            h.onlineState = l;
            let d = !1;
            h.queries.forEach( (f, _) => {
                for (const m of _.z_)
                    m.Y_(l) && (d = !0)
            }
            ),
            d && ya(h)
        }(i.eventManager, t),
        s.length && i.Ca.E_(s),
        i.onlineState = t,
        i.isPrimaryClient && i.sharedClientState.setOnlineState(t)
    }
}
async function kE(n, t, e) {
    const i = z(n);
    i.sharedClientState.updateQueryState(t, "rejected", e);
    const s = i.Oa.get(t)
      , r = s && s.key;
    if (r) {
        let a = new at(M.comparator);
        a = a.insert(r, Dt.newNoDocument(r, F.min()));
        const l = G().add(r)
          , h = new Hs(F.min(),new Map,new at(Q),a,l);
        await Vd(i, h),
        i.xa = i.xa.remove(r),
        i.Oa.delete(t),
        va(i)
    } else
        await _o(i.localStore, t, !1).then( () => mo(i, t, e)).catch(ta)
}
function mo(n, t, e=null) {
    n.sharedClientState.removeLocalQueryTarget(t);
    for (const i of n.Fa.get(t))
        n.va.delete(i),
        e && n.Ca.Ka(i, e);
    n.Fa.delete(t),
    n.isPrimaryClient && n.Na.mr(t).forEach(i => {
        n.Na.containsKey(i) || Od(n, i)
    }
    )
}
function Od(n, t) {
    n.Ma.delete(t.path.canonicalString());
    const e = n.xa.get(t);
    e !== null && (fa(n.remoteStore, e),
    n.xa = n.xa.remove(t),
    n.Oa.delete(e),
    va(n))
}
function Qc(n, t, e) {
    for (const i of e)
        i instanceof Dd ? (n.Na.addReference(i.key, t),
        xE(n, i)) : i instanceof kd ? (V("SyncEngine", "Document no longer in limbo: " + i.key),
        n.Na.removeReference(i.key, t),
        n.Na.containsKey(i.key) || Od(n, i.key)) : U()
}
function xE(n, t) {
    const e = t.key
      , i = e.path.canonicalString();
    n.xa.get(e) || n.Ma.has(i) || (V("SyncEngine", "New document in limbo: " + e),
    n.Ma.add(i),
    va(n))
}
function va(n) {
    for (; n.Ma.size > 0 && n.xa.size < n.maxConcurrentLimboResolutions; ) {
        const t = n.Ma.values().next().value;
        n.Ma.delete(t);
        const e = new M(st.fromString(t))
          , i = n.ka.next();
        n.Oa.set(i, new AE(e)),
        n.xa = n.xa.insert(e, i),
        Sd(n.remoteStore, new fe(Kt(td(e.path)),i,"TargetPurposeLimboResolution",ea.oe))
    }
}
async function Md(n, t, e) {
    const i = z(n)
      , s = []
      , r = []
      , a = [];
    i.va.isEmpty() || (i.va.forEach( (l, h) => {
        a.push(i.Qa(h, t, e).then(d => {
            var f;
            if ((d || e) && i.isPrimaryClient) {
                const _ = d ? !d.fromCache : (f = e == null ? void 0 : e.targetChanges.get(h.targetId)) === null || f === void 0 ? void 0 : f.current;
                i.sharedClientState.updateQueryState(h.targetId, _ ? "current" : "not-current")
            }
            if (d) {
                s.push(d);
                const _ = da.Ui(h.targetId, d);
                r.push(_)
            }
        }
        ))
    }
    ),
    await Promise.all(a),
    i.Ca.E_(s),
    await async function(h, d) {
        const f = z(h);
        try {
            await f.persistence.runTransaction("notifyLocalViewChanges", "readwrite", _ => P.forEach(d, m => P.forEach(m.Ki, A => f.persistence.referenceDelegate.addReference(_, m.targetId, A)).next( () => P.forEach(m.$i, A => f.persistence.referenceDelegate.removeReference(_, m.targetId, A)))))
        } catch (_) {
            if (!Di(_))
                throw _;
            V("LocalStore", "Failed to update sequence numbers: " + _)
        }
        for (const _ of d) {
            const m = _.targetId;
            if (!_.fromCache) {
                const A = f.ss.get(m)
                  , S = A.snapshotVersion
                  , x = A.withLastLimboFreeSnapshotVersion(S);
                f.ss = f.ss.insert(m, x)
            }
        }
    }(i.localStore, r))
}
async function VE(n, t) {
    const e = z(n);
    if (!e.currentUser.isEqual(t)) {
        V("SyncEngine", "User change. New user:", t.toKey());
        const i = await Cd(e.localStore, t);
        e.currentUser = t,
        function(r, a) {
            r.Ba.forEach(l => {
                l.forEach(h => {
                    h.reject(new O(b.CANCELLED,a))
                }
                )
            }
            ),
            r.Ba.clear()
        }(e, "'waitForPendingWrites' promise is rejected due to a user change."),
        e.sharedClientState.handleUserChange(t, i.removedBatchIds, i.addedBatchIds),
        await Md(e, i.ls)
    }
}
function OE(n, t) {
    const e = z(n)
      , i = e.Oa.get(t);
    if (i && i.Da)
        return G().add(i.key);
    {
        let s = G();
        const r = e.Fa.get(t);
        if (!r)
            return s;
        for (const a of r) {
            const l = e.va.get(a);
            s = s.unionWith(l.view.Ra)
        }
        return s
    }
}
function Ld(n) {
    const t = z(n);
    return t.remoteStore.remoteSyncer.applyRemoteEvent = Vd.bind(null, t),
    t.remoteStore.remoteSyncer.getRemoteKeysForTarget = OE.bind(null, t),
    t.remoteStore.remoteSyncer.rejectListen = kE.bind(null, t),
    t.Ca.E_ = EE.bind(null, t.eventManager),
    t.Ca.Ka = TE.bind(null, t.eventManager),
    t
}
class Yc {
    constructor() {
        this.synchronizeTabs = !1
    }
    async initialize(t) {
        this.serializer = Ks(t.databaseInfo.databaseId),
        this.sharedClientState = this.createSharedClientState(t),
        this.persistence = this.createPersistence(t),
        await this.persistence.start(),
        this.localStore = this.createLocalStore(t),
        this.gcScheduler = this.createGarbageCollectionScheduler(t, this.localStore),
        this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(t, this.localStore)
    }
    createGarbageCollectionScheduler(t, e) {
        return null
    }
    createIndexBackfillerScheduler(t, e) {
        return null
    }
    createLocalStore(t) {
        return Yv(this.persistence, new Kv, t.initialUser, this.serializer)
    }
    createPersistence(t) {
        return new zv(ua.Yr,this.serializer)
    }
    createSharedClientState(t) {
        return new eE
    }
    async terminate() {
        var t, e;
        (t = this.gcScheduler) === null || t === void 0 || t.stop(),
        (e = this.indexBackfillerScheduler) === null || e === void 0 || e.stop(),
        this.sharedClientState.shutdown(),
        await this.persistence.shutdown()
    }
}
class ME {
    async initialize(t, e) {
        this.localStore || (this.localStore = t.localStore,
        this.sharedClientState = t.sharedClientState,
        this.datastore = this.createDatastore(e),
        this.remoteStore = this.createRemoteStore(e),
        this.eventManager = this.createEventManager(e),
        this.syncEngine = this.createSyncEngine(e, !t.synchronizeTabs),
        this.sharedClientState.onlineStateHandler = i => Kc(this.syncEngine, i, 1),
        this.remoteStore.remoteSyncer.handleCredentialChange = VE.bind(null, this.syncEngine),
        await _E(this.remoteStore, this.syncEngine.isPrimaryClient))
    }
    createEventManager(t) {
        return function() {
            return new mE
        }()
    }
    createDatastore(t) {
        const e = Ks(t.databaseInfo.databaseId)
          , i = function(r) {
            return new rE(r)
        }(t.databaseInfo);
        return function(r, a, l, h) {
            return new lE(r,a,l,h)
        }(t.authCredentials, t.appCheckCredentials, i, e)
    }
    createRemoteStore(t) {
        return function(i, s, r, a, l) {
            return new hE(i,s,r,a,l)
        }(this.localStore, this.datastore, t.asyncQueue, e => Kc(this.syncEngine, e, 0), function() {
            return jc.D() ? new jc : new nE
        }())
    }
    createSyncEngine(t, e) {
        return function(s, r, a, l, h, d, f) {
            const _ = new RE(s,r,a,l,h,d);
            return f && (_.qa = !0),
            _
        }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t.initialUser, t.maxConcurrentLimboResolutions, e)
    }
    async terminate() {
        var t, e;
        await async function(s) {
            const r = z(s);
            V("RemoteStore", "RemoteStore shutting down."),
            r.N_.add(5),
            await Oi(r),
            r.B_.shutdown(),
            r.k_.set("Unknown")
        }(this.remoteStore),
        (t = this.datastore) === null || t === void 0 || t.terminate(),
        (e = this.eventManager) === null || e === void 0 || e.terminate()
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class LE {
    constructor(t) {
        this.observer = t,
        this.muted = !1
    }
    next(t) {
        this.observer.next && this.Wa(this.observer.next, t)
    }
    error(t) {
        this.observer.error ? this.Wa(this.observer.error, t) : se("Uncaught Error in snapshot listener:", t.toString())
    }
    Ga() {
        this.muted = !0
    }
    Wa(t, e) {
        this.muted || setTimeout( () => {
            this.muted || t(e)
        }
        , 0)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FE {
    constructor(t, e, i, s) {
        this.authCredentials = t,
        this.appCheckCredentials = e,
        this.asyncQueue = i,
        this.databaseInfo = s,
        this.user = bt.UNAUTHENTICATED,
        this.clientId = Py.newId(),
        this.authCredentialListener = () => Promise.resolve(),
        this.appCheckCredentialListener = () => Promise.resolve(),
        this.authCredentials.start(i, async r => {
            V("FirestoreClient", "Received user=", r.uid),
            await this.authCredentialListener(r),
            this.user = r
        }
        ),
        this.appCheckCredentials.start(i, r => (V("FirestoreClient", "Received new app check token=", r),
        this.appCheckCredentialListener(r, this.user)))
    }
    get configuration() {
        return {
            asyncQueue: this.asyncQueue,
            databaseInfo: this.databaseInfo,
            clientId: this.clientId,
            authCredentials: this.authCredentials,
            appCheckCredentials: this.appCheckCredentials,
            initialUser: this.user,
            maxConcurrentLimboResolutions: 100
        }
    }
    setCredentialChangeListener(t) {
        this.authCredentialListener = t
    }
    setAppCheckTokenChangeListener(t) {
        this.appCheckCredentialListener = t
    }
    verifyNotTerminated() {
        if (this.asyncQueue.isShuttingDown)
            throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.")
    }
    terminate() {
        this.asyncQueue.enterRestrictedMode();
        const t = new Oe;
        return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
            try {
                this._onlineComponents && await this._onlineComponents.terminate(),
                this._offlineComponents && await this._offlineComponents.terminate(),
                this.authCredentials.shutdown(),
                this.appCheckCredentials.shutdown(),
                t.resolve()
            } catch (e) {
                const i = Nd(e, "Failed to shutdown persistence");
                t.reject(i)
            }
        }
        ),
        t.promise
    }
}
async function Lr(n, t) {
    n.asyncQueue.verifyOperationInProgress(),
    V("FirestoreClient", "Initializing OfflineComponentProvider");
    const e = n.configuration;
    await t.initialize(e);
    let i = e.initialUser;
    n.setCredentialChangeListener(async s => {
        i.isEqual(s) || (await Cd(t.localStore, s),
        i = s)
    }
    ),
    t.persistence.setDatabaseDeletedListener( () => n.terminate()),
    n._offlineComponents = t
}
async function Xc(n, t) {
    n.asyncQueue.verifyOperationInProgress();
    const e = await BE(n);
    V("FirestoreClient", "Initializing OnlineComponentProvider"),
    await t.initialize(e, n.configuration),
    n.setCredentialChangeListener(i => Wc(t.remoteStore, i)),
    n.setAppCheckTokenChangeListener( (i, s) => Wc(t.remoteStore, s)),
    n._onlineComponents = t
}
function UE(n) {
    return n.name === "FirebaseError" ? n.code === b.FAILED_PRECONDITION || n.code === b.UNIMPLEMENTED : !(typeof DOMException < "u" && n instanceof DOMException) || n.code === 22 || n.code === 20 || n.code === 11
}
async function BE(n) {
    if (!n._offlineComponents)
        if (n._uninitializedComponentsProvider) {
            V("FirestoreClient", "Using user provided OfflineComponentProvider");
            try {
                await Lr(n, n._uninitializedComponentsProvider._offline)
            } catch (t) {
                const e = t;
                if (!UE(e))
                    throw e;
                dn("Error using user provided cache. Falling back to memory cache: " + e),
                await Lr(n, new Yc)
            }
        } else
            V("FirestoreClient", "Using default OfflineComponentProvider"),
            await Lr(n, new Yc);
    return n._offlineComponents
}
async function qE(n) {
    return n._onlineComponents || (n._uninitializedComponentsProvider ? (V("FirestoreClient", "Using user provided OnlineComponentProvider"),
    await Xc(n, n._uninitializedComponentsProvider._online)) : (V("FirestoreClient", "Using default OnlineComponentProvider"),
    await Xc(n, new ME))),
    n._onlineComponents
}
async function jE(n) {
    const t = await qE(n)
      , e = t.eventManager;
    return e.onListen = SE.bind(null, t.syncEngine),
    e.onUnlisten = NE.bind(null, t.syncEngine),
    e.onFirstRemoteStoreListen = PE.bind(null, t.syncEngine),
    e.onLastRemoteStoreUnlisten = DE.bind(null, t.syncEngine),
    e
}
function $E(n, t, e={}) {
    const i = new Oe;
    return n.asyncQueue.enqueueAndForget(async () => function(r, a, l, h, d) {
        const f = new LE({
            next: m => {
                a.enqueueAndForget( () => vE(r, _)),
                m.fromCache && h.source === "server" ? d.reject(new O(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : d.resolve(m)
            }
            ,
            error: m => d.reject(m)
        })
          , _ = new IE(l,f,{
            includeMetadataChanges: !0,
            oa: !0
        });
        return yE(r, _)
    }(await jE(n), n.asyncQueue, t, e, i)),
    i.promise
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Fd(n) {
    const t = {};
    return n.timeoutSeconds !== void 0 && (t.timeoutSeconds = n.timeoutSeconds),
    t
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Jc = new Map;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function WE(n, t, e) {
    if (!e)
        throw new O(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)
}
function zE(n, t, e, i) {
    if (t === !0 && i === !0)
        throw new O(b.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)
}
function Zc(n) {
    if (M.isDocumentKey(n))
        throw new O(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)
}
function Ys(n) {
    if (n === void 0)
        return "undefined";
    if (n === null)
        return "null";
    if (typeof n == "string")
        return n.length > 20 && (n = `${n.substring(0, 20)}...`),
        JSON.stringify(n);
    if (typeof n == "number" || typeof n == "boolean")
        return "" + n;
    if (typeof n == "object") {
        if (n instanceof Array)
            return "an array";
        {
            const t = function(i) {
                return i.constructor ? i.constructor.name : null
            }(n);
            return t ? `a custom ${t} object` : "an object"
        }
    }
    return typeof n == "function" ? "a function" : U()
}
function yo(n, t) {
    if ("_delegate"in n && (n = n._delegate),
    !(n instanceof t)) {
        if (t.name === n.constructor.name)
            throw new O(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
        {
            const e = Ys(n);
            throw new O(b.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)
        }
    }
    return n
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class th {
    constructor(t) {
        var e, i;
        if (t.host === void 0) {
            if (t.ssl !== void 0)
                throw new O(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");
            this.host = "firestore.googleapis.com",
            this.ssl = !0
        } else
            this.host = t.host,
            this.ssl = (e = t.ssl) === null || e === void 0 || e;
        if (this.credentials = t.credentials,
        this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties,
        this.localCache = t.localCache,
        t.cacheSizeBytes === void 0)
            this.cacheSizeBytes = 41943040;
        else {
            if (t.cacheSizeBytes !== -1 && t.cacheSizeBytes < 1048576)
                throw new O(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");
            this.cacheSizeBytes = t.cacheSizeBytes
        }
        zE("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling),
        this.experimentalForceLongPolling = !!t.experimentalForceLongPolling,
        this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = !1 : t.experimentalAutoDetectLongPolling === void 0 ? this.experimentalAutoDetectLongPolling = !0 : this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling,
        this.experimentalLongPollingOptions = Fd((i = t.experimentalLongPollingOptions) !== null && i !== void 0 ? i : {}),
        function(r) {
            if (r.timeoutSeconds !== void 0) {
                if (isNaN(r.timeoutSeconds))
                    throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);
                if (r.timeoutSeconds < 5)
                    throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);
                if (r.timeoutSeconds > 30)
                    throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)
            }
        }(this.experimentalLongPollingOptions),
        this.useFetchStreams = !!t.useFetchStreams
    }
    isEqual(t) {
        return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && function(i, s) {
            return i.timeoutSeconds === s.timeoutSeconds
        }(this.experimentalLongPollingOptions, t.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams
    }
}
class Ea {
    constructor(t, e, i, s) {
        this._authCredentials = t,
        this._appCheckCredentials = e,
        this._databaseId = i,
        this._app = s,
        this.type = "firestore-lite",
        this._persistenceKey = "(lite)",
        this._settings = new th({}),
        this._settingsFrozen = !1
    }
    get app() {
        if (!this._app)
            throw new O(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");
        return this._app
    }
    get _initialized() {
        return this._settingsFrozen
    }
    get _terminated() {
        return this._terminateTask !== void 0
    }
    _setSettings(t) {
        if (this._settingsFrozen)
            throw new O(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
        this._settings = new th(t),
        t.credentials !== void 0 && (this._authCredentials = function(i) {
            if (!i)
                return new Ey;
            switch (i.type) {
            case "firstParty":
                return new Cy(i.sessionIndex || "0",i.iamToken || null,i.authTokenFactory || null);
            case "provider":
                return i.client;
            default:
                throw new O(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")
            }
        }(t.credentials))
    }
    _getSettings() {
        return this._settings
    }
    _freezeSettings() {
        return this._settingsFrozen = !0,
        this._settings
    }
    _delete() {
        return this._terminateTask || (this._terminateTask = this._terminate()),
        this._terminateTask
    }
    toJSON() {
        return {
            app: this._app,
            databaseId: this._databaseId,
            settings: this._settings
        }
    }
    _terminate() {
        return function(e) {
            const i = Jc.get(e);
            i && (V("ComponentProvider", "Removing Datastore"),
            Jc.delete(e),
            i.terminate())
        }(this),
        Promise.resolve()
    }
}
function GE(n, t, e, i={}) {
    var s;
    const r = (n = yo(n, Ea))._getSettings()
      , a = `${t}:${e}`;
    if (r.host !== "firestore.googleapis.com" && r.host !== a && dn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),
    n._setSettings(Object.assign(Object.assign({}, r), {
        host: a,
        ssl: !1
    })),
    i.mockUserToken) {
        let l, h;
        if (typeof i.mockUserToken == "string")
            l = i.mockUserToken,
            h = bt.MOCK_USER;
        else {
            l = ch(i.mockUserToken, (s = n._app) === null || s === void 0 ? void 0 : s.options.projectId);
            const d = i.mockUserToken.sub || i.mockUserToken.user_id;
            if (!d)
                throw new O(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");
            h = new bt(d)
        }
        n._authCredentials = new Ty(new zu(l,h))
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rn {
    constructor(t, e, i) {
        this.converter = e,
        this._query = i,
        this.type = "query",
        this.firestore = t
    }
    withConverter(t) {
        return new Rn(this.firestore,t,this._query)
    }
}
class ae {
    constructor(t, e, i) {
        this.converter = e,
        this._key = i,
        this.type = "document",
        this.firestore = t
    }
    get _path() {
        return this._key.path
    }
    get id() {
        return this._key.path.lastSegment()
    }
    get path() {
        return this._key.path.canonicalString()
    }
    get parent() {
        return new on(this.firestore,this.converter,this._key.path.popLast())
    }
    withConverter(t) {
        return new ae(this.firestore,t,this._key)
    }
}
class on extends Rn {
    constructor(t, e, i) {
        super(t, e, td(i)),
        this._path = i,
        this.type = "collection"
    }
    get id() {
        return this._query.path.lastSegment()
    }
    get path() {
        return this._query.path.canonicalString()
    }
    get parent() {
        const t = this._path.popLast();
        return t.isEmpty() ? null : new ae(this.firestore,null,new M(t))
    }
    withConverter(t) {
        return new on(this.firestore,t,this._path)
    }
}
function HE(n, t, ...e) {
    if (n = ne(n),
    WE("collection", "path", t),
    n instanceof Ea) {
        const i = st.fromString(t, ...e);
        return Zc(i),
        new on(n,null,i)
    }
    {
        if (!(n instanceof ae || n instanceof on))
            throw new O(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
        const i = n._path.child(st.fromString(t, ...e));
        return Zc(i),
        new on(n.firestore,null,i)
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class KE {
    constructor() {
        this._u = Promise.resolve(),
        this.au = [],
        this.uu = !1,
        this.cu = [],
        this.lu = null,
        this.hu = !1,
        this.Pu = !1,
        this.Iu = [],
        this.e_ = new Rd(this,"async_queue_retry"),
        this.Tu = () => {
            const e = Mr();
            e && V("AsyncQueue", "Visibility state changed to " + e.visibilityState),
            this.e_.zo()
        }
        ;
        const t = Mr();
        t && typeof t.addEventListener == "function" && t.addEventListener("visibilitychange", this.Tu)
    }
    get isShuttingDown() {
        return this.uu
    }
    enqueueAndForget(t) {
        this.enqueue(t)
    }
    enqueueAndForgetEvenWhileRestricted(t) {
        this.Eu(),
        this.du(t)
    }
    enterRestrictedMode(t) {
        if (!this.uu) {
            this.uu = !0,
            this.Pu = t || !1;
            const e = Mr();
            e && typeof e.removeEventListener == "function" && e.removeEventListener("visibilitychange", this.Tu)
        }
    }
    enqueue(t) {
        if (this.Eu(),
        this.uu)
            return new Promise( () => {}
            );
        const e = new Oe;
        return this.du( () => this.uu && this.Pu ? Promise.resolve() : (t().then(e.resolve, e.reject),
        e.promise)).then( () => e.promise)
    }
    enqueueRetryable(t) {
        this.enqueueAndForget( () => (this.au.push(t),
        this.Au()))
    }
    async Au() {
        if (this.au.length !== 0) {
            try {
                await this.au[0](),
                this.au.shift(),
                this.e_.reset()
            } catch (t) {
                if (!Di(t))
                    throw t;
                V("AsyncQueue", "Operation failed with retryable error: " + t)
            }
            this.au.length > 0 && this.e_.Wo( () => this.Au())
        }
    }
    du(t) {
        const e = this._u.then( () => (this.hu = !0,
        t().catch(i => {
            this.lu = i,
            this.hu = !1;
            const s = function(a) {
                let l = a.message || "";
                return a.stack && (l = a.stack.includes(a.message) ? a.stack : a.message + `
` + a.stack),
                l
            }(i);
            throw se("INTERNAL UNHANDLED ERROR: ", s),
            i
        }
        ).then(i => (this.hu = !1,
        i))));
        return this._u = e,
        e
    }
    enqueueAfterDelay(t, e, i) {
        this.Eu(),
        this.Iu.indexOf(t) > -1 && (e = 0);
        const s = ma.createAndSchedule(this, t, e, i, r => this.Ru(r));
        return this.cu.push(s),
        s
    }
    Eu() {
        this.lu && U()
    }
    verifyOperationInProgress() {}
    async Vu() {
        let t;
        do
            t = this._u,
            await t;
        while (t !== this._u)
    }
    mu(t) {
        for (const e of this.cu)
            if (e.timerId === t)
                return !0;
        return !1
    }
    fu(t) {
        return this.Vu().then( () => {
            this.cu.sort( (e, i) => e.targetTimeMs - i.targetTimeMs);
            for (const e of this.cu)
                if (e.skipDelay(),
                t !== "all" && e.timerId === t)
                    break;
            return this.Vu()
        }
        )
    }
    gu(t) {
        this.Iu.push(t)
    }
    Ru(t) {
        const e = this.cu.indexOf(t);
        this.cu.splice(e, 1)
    }
}
class Ud extends Ea {
    constructor(t, e, i, s) {
        super(t, e, i, s),
        this.type = "firestore",
        this._queue = function() {
            return new KE
        }(),
        this._persistenceKey = (s == null ? void 0 : s.name) || "[DEFAULT]"
    }
    _terminate() {
        return this._firestoreClient || Bd(this),
        this._firestoreClient.terminate()
    }
}
function QE(n, t) {
    const e = typeof n == "object" ? n : Eh()
      , i = typeof n == "string" ? n : "(default)"
      , s = yh(e, "firestore").getImmediate({
        identifier: i
    });
    if (!s._initialized) {
        const r = ah("firestore");
        r && GE(s, ...r)
    }
    return s
}
function YE(n) {
    return n._firestoreClient || Bd(n),
    n._firestoreClient.verifyNotTerminated(),
    n._firestoreClient
}
function Bd(n) {
    var t, e, i;
    const s = n._freezeSettings()
      , r = function(l, h, d, f) {
        return new Fy(l,h,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Fd(f.experimentalLongPollingOptions),f.useFetchStreams)
    }(n._databaseId, ((t = n._app) === null || t === void 0 ? void 0 : t.options.appId) || "", n._persistenceKey, s);
    n._firestoreClient = new FE(n._authCredentials,n._appCheckCredentials,n._queue,r),
    !((e = s.localCache) === null || e === void 0) && e._offlineComponentProvider && (!((i = s.localCache) === null || i === void 0) && i._onlineComponentProvider) && (n._firestoreClient._uninitializedComponentsProvider = {
        _offlineKind: s.localCache.kind,
        _offline: s.localCache._offlineComponentProvider,
        _online: s.localCache._onlineComponentProvider
    })
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yn {
    constructor(t) {
        this._byteString = t
    }
    static fromBase64String(t) {
        try {
            return new yn(wt.fromBase64String(t))
        } catch (e) {
            throw new O(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: " + e)
        }
    }
    static fromUint8Array(t) {
        return new yn(wt.fromUint8Array(t))
    }
    toBase64() {
        return this._byteString.toBase64()
    }
    toUint8Array() {
        return this._byteString.toUint8Array()
    }
    toString() {
        return "Bytes(base64: " + this.toBase64() + ")"
    }
    isEqual(t) {
        return this._byteString.isEqual(t._byteString)
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qd {
    constructor(...t) {
        for (let e = 0; e < t.length; ++e)
            if (t[e].length === 0)
                throw new O(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");
        this._internalPath = new kt(t)
    }
    isEqual(t) {
        return this._internalPath.isEqual(t._internalPath)
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jd {
    constructor(t) {
        this._methodName = t
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ta {
    constructor(t, e) {
        if (!isFinite(t) || t < -90 || t > 90)
            throw new O(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: " + t);
        if (!isFinite(e) || e < -180 || e > 180)
            throw new O(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: " + e);
        this._lat = t,
        this._long = e
    }
    get latitude() {
        return this._lat
    }
    get longitude() {
        return this._long
    }
    isEqual(t) {
        return this._lat === t._lat && this._long === t._long
    }
    toJSON() {
        return {
            latitude: this._lat,
            longitude: this._long
        }
    }
    _compareTo(t) {
        return Q(this._lat, t._lat) || Q(this._long, t._long)
    }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const XE = /^__.*__$/;
function $d(n) {
    switch (n) {
    case 0:
    case 2:
    case 1:
        return !0;
    case 3:
    case 4:
        return !1;
    default:
        throw U()
    }
}
class Ia {
    constructor(t, e, i, s, r, a) {
        this.settings = t,
        this.databaseId = e,
        this.serializer = i,
        this.ignoreUndefinedProperties = s,
        r === void 0 && this.pu(),
        this.fieldTransforms = r || [],
        this.fieldMask = a || []
    }
    get path() {
        return this.settings.path
    }
    get yu() {
        return this.settings.yu
    }
    wu(t) {
        return new Ia(Object.assign(Object.assign({}, this.settings), t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)
    }
    Su(t) {
        var e;
        const i = (e = this.path) === null || e === void 0 ? void 0 : e.child(t)
          , s = this.wu({
            path: i,
            bu: !1
        });
        return s.Du(t),
        s
    }
    Cu(t) {
        var e;
        const i = (e = this.path) === null || e === void 0 ? void 0 : e.child(t)
          , s = this.wu({
            path: i,
            bu: !1
        });
        return s.pu(),
        s
    }
    vu(t) {
        return this.wu({
            path: void 0,
            bu: !0
        })
    }
    Fu(t) {
        return vo(t, this.settings.methodName, this.settings.Mu || !1, this.path, this.settings.xu)
    }
    contains(t) {
        return this.fieldMask.find(e => t.isPrefixOf(e)) !== void 0 || this.fieldTransforms.find(e => t.isPrefixOf(e.field)) !== void 0
    }
    pu() {
        if (this.path)
            for (let t = 0; t < this.path.length; t++)
                this.Du(this.path.get(t))
    }
    Du(t) {
        if (t.length === 0)
            throw this.Fu("Document fields must not be empty");
        if ($d(this.yu) && XE.test(t))
            throw this.Fu('Document fields cannot begin and end with "__"')
    }
}
class JE {
    constructor(t, e, i) {
        this.databaseId = t,
        this.ignoreUndefinedProperties = e,
        this.serializer = i || Ks(t)
    }
    Ou(t, e, i, s=!1) {
        return new Ia({
            yu: t,
            methodName: e,
            xu: i,
            path: kt.emptyPath(),
            bu: !1,
            Mu: s
        },this.databaseId,this.serializer,this.ignoreUndefinedProperties)
    }
}
function ZE(n) {
    const t = n._freezeSettings()
      , e = Ks(n._databaseId);
    return new JE(n._databaseId,!!t.ignoreUndefinedProperties,e)
}
function tT(n, t, e, i=!1) {
    return wa(e, n.Ou(i ? 4 : 3, t))
}
function wa(n, t) {
    if (Wd(n = ne(n)))
        return nT("Unsupported field value:", t, n),
        eT(n, t);
    if (n instanceof jd)
        return function(i, s) {
            if (!$d(s.yu))
                throw s.Fu(`${i._methodName}() can only be used with update() and set()`);
            if (!s.path)
                throw s.Fu(`${i._methodName}() is not currently supported inside arrays`);
            const r = i._toFieldTransform(s);
            r && s.fieldTransforms.push(r)
        }(n, t),
        null;
    if (n === void 0 && t.ignoreUndefinedProperties)
        return null;
    if (t.path && t.fieldMask.push(t.path),
    n instanceof Array) {
        if (t.settings.bu && t.yu !== 4)
            throw t.Fu("Nested arrays are not supported");
        return function(i, s) {
            const r = [];
            let a = 0;
            for (const l of i) {
                let h = wa(l, s.vu(a));
                h == null && (h = {
                    nullValue: "NULL_VALUE"
                }),
                r.push(h),
                a++
            }
            return {
                arrayValue: {
                    values: r
                }
            }
        }(n, t)
    }
    return function(i, s) {
        if ((i = ne(i)) === null)
            return {
                nullValue: "NULL_VALUE"
            };
        if (typeof i == "number")
            return rv(s.serializer, i);
        if (typeof i == "boolean")
            return {
                booleanValue: i
            };
        if (typeof i == "string")
            return {
                stringValue: i
            };
        if (i instanceof Date) {
            const r = mt.fromDate(i);
            return {
                timestampValue: fo(s.serializer, r)
            }
        }
        if (i instanceof mt) {
            const r = new mt(i.seconds,1e3 * Math.floor(i.nanoseconds / 1e3));
            return {
                timestampValue: fo(s.serializer, r)
            }
        }
        if (i instanceof Ta)
            return {
                geoPointValue: {
                    latitude: i.latitude,
                    longitude: i.longitude
                }
            };
        if (i instanceof yn)
            return {
                bytesValue: gd(s.serializer, i._byteString)
            };
        if (i instanceof ae) {
            const r = s.databaseId
              , a = i.firestore._databaseId;
            if (!a.isEqual(r))
                throw s.Fu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${r.projectId}/${r.database}`);
            return {
                referenceValue: md(i.firestore._databaseId || s.databaseId, i._key.path)
            }
        }
        throw s.Fu(`Unsupported field value: ${Ys(i)}`)
    }(n, t)
}
function eT(n, t) {
    const e = {};
    return Gu(n) ? t.path && t.path.length > 0 && t.fieldMask.push(t.path) : ki(n, (i, s) => {
        const r = wa(s, t.Su(i));
        r != null && (e[i] = r)
    }
    ),
    {
        mapValue: {
            fields: e
        }
    }
}
function Wd(n) {
    return !(typeof n != "object" || n === null || n instanceof Array || n instanceof Date || n instanceof mt || n instanceof Ta || n instanceof yn || n instanceof ae || n instanceof jd)
}
function nT(n, t, e) {
    if (!Wd(e) || !function(s) {
        return typeof s == "object" && s !== null && (Object.getPrototypeOf(s) === Object.prototype || Object.getPrototypeOf(s) === null)
    }(e)) {
        const i = Ys(e);
        throw i === "an object" ? t.Fu(n + " a custom object") : t.Fu(n + " " + i)
    }
}
const iT = new RegExp("[~\\*/\\[\\]]");
function sT(n, t, e) {
    if (t.search(iT) >= 0)
        throw vo(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`, n, !1, void 0, e);
    try {
        return new qd(...t.split("."))._internalPath
    } catch {
        throw vo(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, n, !1, void 0, e)
    }
}
function vo(n, t, e, i, s) {
    const r = i && !i.isEmpty()
      , a = s !== void 0;
    let l = `Function ${t}() called with invalid data`;
    e && (l += " (via `toFirestore()`)"),
    l += ". ";
    let h = "";
    return (r || a) && (h += " (found",
    r && (h += ` in field ${i}`),
    a && (h += ` in document ${s}`),
    h += ")"),
    new O(b.INVALID_ARGUMENT,l + n + h)
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zd {
    constructor(t, e, i, s, r) {
        this._firestore = t,
        this._userDataWriter = e,
        this._key = i,
        this._document = s,
        this._converter = r
    }
    get id() {
        return this._key.path.lastSegment()
    }
    get ref() {
        return new ae(this._firestore,this._converter,this._key)
    }
    exists() {
        return this._document !== null
    }
    data() {
        if (this._document) {
            if (this._converter) {
                const t = new rT(this._firestore,this._userDataWriter,this._key,this._document,null);
                return this._converter.fromFirestore(t)
            }
            return this._userDataWriter.convertValue(this._document.data.value)
        }
    }
    get(t) {
        if (this._document) {
            const e = this._document.data.field(Ca("DocumentSnapshot.get", t));
            if (e !== null)
                return this._userDataWriter.convertValue(e)
        }
    }
}
class rT extends zd {
    data() {
        return super.data()
    }
}
function Ca(n, t) {
    return typeof t == "string" ? sT(n, t) : t instanceof qd ? t._internalPath : t._delegate._internalPath
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function oT(n) {
    if (n.limitType === "L" && n.explicitOrderBy.length === 0)
        throw new O(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")
}
class Aa {
}
class aT extends Aa {
}
function lT(n, t, ...e) {
    console.log('lT', {n}, {t}, {e})
    let i = [];
    t instanceof Aa && i.push(t),
    i = i.concat(e),
    function(r) {
        const a = r.filter(h => h instanceof Ra).length
          , l = r.filter(h => h instanceof Xs).length;
        if (a > 1 || a > 0 && l > 0)
            throw new O(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")
    }(i);
    for (const s of i)
        n = s._apply(n);
    return n
}
class Xs extends aT {
    constructor(t, e, i) {
        super(),
        this._field = t,
        this._op = e,
        this._value = i,
        this.type = "where"
    }
    static _create(t, e, i) {
        return new Xs(t,e,i)
    }
    _apply(t) {
        const e = this._parse(t);
        return Gd(t._query, e),
        new Rn(t.firestore,t.converter,ao(t._query, e))
    }
    _parse(t) {
        const e = ZE(t.firestore);
        return function(r, a, l, h, d, f, _) {
            let m;
            if (d.isKeyField()) {
                if (f === "array-contains" || f === "array-contains-any")
                    throw new O(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);
                if (f === "in" || f === "not-in") {
                    nh(_, f);
                    const A = [];
                    for (const S of _)
                        A.push(eh(h, r, S));
                    m = {
                        arrayValue: {
                            values: A
                        }
                    }
                } else
                    m = eh(h, r, _)
            } else
                f !== "in" && f !== "not-in" && f !== "array-contains-any" || nh(_, f),
                m = tT(l, a, _, f === "in" || f === "not-in");
            return ut.create(d, f, m)
        }(t._query, "where", e, t.firestore._databaseId, this._field, this._op, this._value)
    }
}
function cT(n, t, e) {
    const i = t
      , s = Ca("where", n);
    return Xs._create(s, i, e)
}
class Ra extends Aa {
    constructor(t, e) {
        super(),
        this.type = t,
        this._queryConstraints = e
    }
    static _create(t, e) {
        return new Ra(t,e)
    }
    _parse(t) {
        const e = this._queryConstraints.map(i => i._parse(t)).filter(i => i.getFilters().length > 0);
        return e.length === 1 ? e[0] : zt.create(e, this._getOperator())
    }
    _apply(t) {
        const e = this._parse(t);
        return e.getFilters().length === 0 ? t : (function(s, r) {
            let a = s;
            const l = r.getFlattenedFilters();
            for (const h of l)
                Gd(a, h),
                a = ao(a, h)
        }(t._query, e),
        new Rn(t.firestore,t.converter,ao(t._query, e)))
    }
    _getQueryConstraints() {
        return this._queryConstraints
    }
    _getOperator() {
        return this.type === "and" ? "and" : "or"
    }
}
function eh(n, t, e) {
    if (typeof (e = ne(e)) == "string") {
        if (e === "")
            throw new O(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
        if (!ed(t) && e.indexOf("/") !== -1)
            throw new O(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);
        const i = t.path.child(st.fromString(e));
        if (!M.isDocumentKey(i))
            throw new O(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);
        return wc(n, new M(i))
    }
    if (e instanceof ae)
        return wc(n, e._key);
    throw new O(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ys(e)}.`)
}
function nh(n, t) {
    if (!Array.isArray(n) || n.length === 0)
        throw new O(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)
}
function Gd(n, t) {
    const e = function(s, r) {
        for (const a of s)
            for (const l of a.getFlattenedFilters())
                if (r.indexOf(l.op) >= 0)
                    return l.op;
        return null
    }(n.filters, function(s) {
        switch (s) {
        case "!=":
            return ["!=", "not-in"];
        case "array-contains-any":
        case "in":
            return ["not-in"];
        case "not-in":
            return ["array-contains-any", "in", "not-in", "!="];
        default:
            return []
        }
    }(t.op));
    if (e !== null)
        throw e === t.op ? new O(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`) : new O(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)
}
class hT {
    convertValue(t, e="none") {
        switch ($e(t)) {
        case 0:
            return null;
        case 1:
            return t.booleanValue;
        case 2:
            return ht(t.integerValue || t.doubleValue);
        case 3:
            return this.convertTimestamp(t.timestampValue);
        case 4:
            return this.convertServerTimestamp(t, e);
        case 5:
            return t.stringValue;
        case 6:
            return this.convertBytes(je(t.bytesValue));
        case 7:
            return this.convertReference(t.referenceValue);
        case 8:
            return this.convertGeoPoint(t.geoPointValue);
        case 9:
            return this.convertArray(t.arrayValue, e);
        case 10:
            return this.convertObject(t.mapValue, e);
        default:
            throw U()
        }
    }
    convertObject(t, e) {
        return this.convertObjectMap(t.fields, e)
    }
    convertObjectMap(t, e="none") {
        const i = {};
        return ki(t, (s, r) => {
            i[s] = this.convertValue(r, e)
        }
        ),
        i
    }
    convertGeoPoint(t) {
        return new Ta(ht(t.latitude),ht(t.longitude))
    }
    convertArray(t, e) {
        return (t.values || []).map(i => this.convertValue(i, e))
    }
    convertServerTimestamp(t, e) {
        switch (e) {
        case "previous":
            const i = ia(t);
            return i == null ? null : this.convertValue(i, e);
        case "estimate":
            return this.convertTimestamp(Ti(t));
        default:
            return null
        }
    }
    convertTimestamp(t) {
        const e = Ie(t);
        return new mt(e.seconds,e.nanos)
    }
    convertDocumentKey(t, e) {
        const i = st.fromString(t);
        dt(wd(i));
        const s = new Ii(i.get(1),i.get(3))
          , r = new M(i.popFirst(5));
        return s.isEqual(e) || se(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),
        r
    }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class as {
    constructor(t, e) {
        this.hasPendingWrites = t,
        this.fromCache = e
    }
    isEqual(t) {
        return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache
    }
}
class uT extends zd {
    constructor(t, e, i, s, r, a) {
        super(t, e, i, s, a),
        this._firestore = t,
        this._firestoreImpl = t,
        this.metadata = r
    }
    exists() {
        return super.exists()
    }
    data(t={}) {
        if (this._document) {
            if (this._converter) {
                const e = new fs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);
                return this._converter.fromFirestore(e, t)
            }
            return this._userDataWriter.convertValue(this._document.data.value, t.serverTimestamps)
        }
    }
    get(t, e={}) {
        if (this._document) {
            const i = this._document.data.field(Ca("DocumentSnapshot.get", t));
            if (i !== null)
                return this._userDataWriter.convertValue(i, e.serverTimestamps)
        }
    }
}
class fs extends uT {
    data(t={}) {
        return super.data(t)
    }
}
class dT {
    constructor(t, e, i, s) {
        this._firestore = t,
        this._userDataWriter = e,
        this._snapshot = s,
        this.metadata = new as(s.hasPendingWrites,s.fromCache),
        this.query = i
    }
    get docs() {
        const t = [];
        return this.forEach(e => t.push(e)),
        t
    }
    get size() {
        return this._snapshot.docs.size
    }
    get empty() {
        return this.size === 0
    }
    forEach(t, e) {
        this._snapshot.docs.forEach(i => {
            t.call(e, new fs(this._firestore,this._userDataWriter,i.key,i,new as(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))
        }
        )
    }
    docChanges(t={}) {
        const e = !!t.includeMetadataChanges;
        if (e && this._snapshot.excludesMetadataChanges)
            throw new O(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
        return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = function(s, r) {
            if (s._snapshot.oldDocs.isEmpty()) {
                let a = 0;
                return s._snapshot.docChanges.map(l => {
                    const h = new fs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new as(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);
                    return l.doc,
                    {
                        type: "added",
                        doc: h,
                        oldIndex: -1,
                        newIndex: a++
                    }
                }
                )
            }
            {
                let a = s._snapshot.oldDocs;
                return s._snapshot.docChanges.filter(l => r || l.type !== 3).map(l => {
                    const h = new fs(s._firestore,s._userDataWriter,l.doc.key,l.doc,new as(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);
                    let d = -1
                      , f = -1;
                    return l.type !== 0 && (d = a.indexOf(l.doc.key),
                    a = a.delete(l.doc.key)),
                    l.type !== 1 && (a = a.add(l.doc),
                    f = a.indexOf(l.doc.key)),
                    {
                        type: fT(l.type),
                        doc: h,
                        oldIndex: d,
                        newIndex: f
                    }
                }
                )
            }
        }(this, e),
        this._cachedChangesIncludeMetadataChanges = e),
        this._cachedChanges
    }
}
function fT(n) {
    switch (n) {
    case 0:
        return "added";
    case 2:
    case 3:
        return "modified";
    case 1:
        return "removed";
    default:
        return U()
    }
}
class pT extends hT {
    constructor(t) {
        super(),
        this.firestore = t
    }
    convertBytes(t) {
        return new yn(t)
    }
    convertReference(t) {
        const e = this.convertDocumentKey(t, this.firestore._databaseId);
        return new ae(this.firestore,null,e)
    }
}
function _T(n) {
    n = yo(n, Rn);
    const t = yo(n.firestore, Ud)
      , e = YE(t)
      , i = new pT(t);
    return oT(n._query),
    $E(e, n._query).then(s => new dT(t,i,n,s))
}
(function(t, e=!0) {
    (function(s) {
        wn = s
    }
    )(vh),
    hi(new ln("firestore", (i, {instanceIdentifier: s, options: r}) => {
        const a = i.getProvider("app").getImmediate()
          , l = new Ud(new Iy(i.getProvider("auth-internal")),new Ry(i.getProvider("app-check-internal")),function(d, f) {
            if (!Object.prototype.hasOwnProperty.apply(d.options, ["projectId"]))
                throw new O(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');
            return new Ii(d.options.projectId,f)
        }(a, s),a);
        return r = Object.assign({
            useFetchStreams: e
        }, r),
        l._setSettings(r),
        l
    }
    ,"PUBLIC").setMultipleInstances(!0)),
    xe(vc, "4.6.5", t),
    xe(vc, "4.6.5", "esm2017")
}
)();
const IT = async (n, t) => {
    if (!n || !t) {
        console.error("App and/or locationsPath is not defined");
        return
    }
    const e = QE(n)
      , i = lT(HE(e, t), cT("origin", "==", "Clever"))
    //   , i = lT(HE(e, t), cT("publicAccess.visibility", "==", "Always"))
    //   , i = lT(HE(e, t), cT("name", "==", "Carlsbergvej 13"))
      , s = await _T(i);
    let r = {};
    return s.forEach(a => {
        r[a.id] = a.data()
    }
    ),
    r
}
  , wT = async n => {
    if (!n) {
        console.error("availabilityPath is not defined");
        return
    }
    const t = ly(my());
    return cy(to(t, n)).then(i => {
        if (i.exists())
            return i.val();
        console.log("No data available")
    }
    ).catch(i => {
        console.error(i)
    }
    )
}
;
export {ln as C, Io as D, fh as E, wo as L, hi as _, yh as a, Eh as b, xf as c, Eo as d, mT as e, Jp as f, ne as g, wT as h, qf as i, IT as j, xe as r, gT as u};
