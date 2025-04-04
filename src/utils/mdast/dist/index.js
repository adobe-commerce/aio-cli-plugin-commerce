/** Added because we are running this in Node, not browser, so document references won't work */
import { JSDOM } from 'jsdom';
const { document } = (new JSDOM(`...`)).window;
/** replace above if you re-create the file! **/

var Vc = Object.create;
var ni = Object.defineProperty;
var Wc = Object.getOwnPropertyDescriptor;
var Qc = Object.getOwnPropertyNames;
var Gc = Object.getPrototypeOf,
    Xc = Object.prototype.hasOwnProperty;
var jc = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    jn = (e, t) => {
        for (var n in t) ni(e, n, { get: t[n], enumerable: !0 });
    },
    Kc = (e, t, n, r) => {
        if ((t && typeof t == "object") || typeof t == "function")
            for (let i of Qc(t))
                !Xc.call(e, i) &&
                    i !== n &&
                    ni(e, i, {
                        get: () => t[i],
                        enumerable: !(r = Wc(t, i)) || r.enumerable,
                    });
        return e;
    };
var $c = (e, t, n) => (
    (n = e != null ? Vc(Gc(e)) : {}),
    Kc(
        t || !e || !e.__esModule
            ? ni(n, "default", { value: e, enumerable: !0 })
            : n,
        e
    )
);
var oa = jc((Dp, sa) => {
    "use strict";
    var Kn = Object.prototype.hasOwnProperty,
        aa = Object.prototype.toString,
        ea = Object.defineProperty,
        ta = Object.getOwnPropertyDescriptor,
        na = function (t) {
            return typeof Array.isArray == "function"
                ? Array.isArray(t)
                : aa.call(t) === "[object Array]";
        },
        ra = function (t) {
            if (!t || aa.call(t) !== "[object Object]") return !1;
            var n = Kn.call(t, "constructor"),
                r =
                    t.constructor &&
                    t.constructor.prototype &&
                    Kn.call(t.constructor.prototype, "isPrototypeOf");
            if (t.constructor && !n && !r) return !1;
            var i;
            for (i in t);
            return typeof i > "u" || Kn.call(t, i);
        },
        ia = function (t, n) {
            ea && n.name === "__proto__"
                ? ea(t, n.name, {
                      enumerable: !0,
                      configurable: !0,
                      value: n.newValue,
                      writable: !0,
                  })
                : (t[n.name] = n.newValue);
        },
        ua = function (t, n) {
            if (n === "__proto__")
                if (Kn.call(t, n)) {
                    if (ta) return ta(t, n).value;
                } else return;
            return t[n];
        };
    sa.exports = function e() {
        var t,
            n,
            r,
            i,
            u,
            s,
            o = arguments[0],
            c = 1,
            l = arguments.length,
            f = !1;
        for (
            typeof o == "boolean" &&
                ((f = o), (o = arguments[1] || {}), (c = 2)),
                (o == null ||
                    (typeof o != "object" && typeof o != "function")) &&
                    (o = {});
            c < l;
            ++c
        )
            if (((t = arguments[c]), t != null))
                for (n in t)
                    (r = ua(o, n)),
                        (i = ua(t, n)),
                        o !== i &&
                            (f && i && (ra(i) || (u = na(i)))
                                ? (u
                                      ? ((u = !1), (s = r && na(r) ? r : []))
                                      : (s = r && ra(r) ? r : {}),
                                  ia(o, { name: n, newValue: e(f, s, i) }))
                                : typeof i < "u" &&
                                  ia(o, { name: n, newValue: i }));
        return o;
    };
});
function ri(e) {
    if (e) throw e;
}
var Jn = $c(oa(), 1);
function on(e) {
    if (typeof e != "object" || e === null) return !1;
    let t = Object.getPrototypeOf(e);
    return (
        (t === null ||
            t === Object.prototype ||
            Object.getPrototypeOf(t) === null) &&
        !(Symbol.toStringTag in e) &&
        !(Symbol.iterator in e)
    );
}
function ii() {
    let e = [],
        t = { run: n, use: r };
    return t;
    function n(...i) {
        let u = -1,
            s = i.pop();
        if (typeof s != "function")
            throw new TypeError("Expected function as last argument, not " + s);
        o(null, ...i);
        function o(c, ...l) {
            let f = e[++u],
                m = -1;
            if (c) {
                s(c);
                return;
            }
            for (; ++m < i.length; )
                (l[m] === null || l[m] === void 0) && (l[m] = i[m]);
            (i = l), f ? ca(f, o)(...l) : s(null, ...l);
        }
    }
    function r(i) {
        if (typeof i != "function")
            throw new TypeError(
                "Expected `middelware` to be a function, not " + i
            );
        return e.push(i), t;
    }
}
function ca(e, t) {
    let n;
    return r;
    function r(...s) {
        let o = e.length > s.length,
            c;
        o && s.push(i);
        try {
            c = e.apply(this, s);
        } catch (l) {
            let f = l;
            if (o && n) throw f;
            return i(f);
        }
        o ||
            (c && c.then && typeof c.then == "function"
                ? c.then(u, i)
                : c instanceof Error
                ? i(c)
                : u(c));
    }
    function i(s, ...o) {
        n || ((n = !0), t(s, ...o));
    }
    function u(s) {
        i(null, s);
    }
}
function gt(e) {
    return !e || typeof e != "object"
        ? ""
        : "position" in e || "type" in e
        ? la(e.position)
        : "start" in e || "end" in e
        ? la(e)
        : "line" in e || "column" in e
        ? ui(e)
        : "";
}
function ui(e) {
    return fa(e && e.line) + ":" + fa(e && e.column);
}
function la(e) {
    return ui(e && e.start) + "-" + ui(e && e.end);
}
function fa(e) {
    return e && typeof e == "number" ? e : 1;
}
var he = class extends Error {
    constructor(t, n, r) {
        super(), typeof n == "string" && ((r = n), (n = void 0));
        let i = "",
            u = {},
            s = !1;
        if (
            (n &&
                ("line" in n && "column" in n
                    ? (u = { place: n })
                    : "start" in n && "end" in n
                    ? (u = { place: n })
                    : "type" in n
                    ? (u = { ancestors: [n], place: n.position })
                    : (u = { ...n })),
            typeof t == "string"
                ? (i = t)
                : !u.cause && t && ((s = !0), (i = t.message), (u.cause = t)),
            !u.ruleId && !u.source && typeof r == "string")
        ) {
            let c = r.indexOf(":");
            c === -1
                ? (u.ruleId = r)
                : ((u.source = r.slice(0, c)), (u.ruleId = r.slice(c + 1)));
        }
        if (!u.place && u.ancestors && u.ancestors) {
            let c = u.ancestors[u.ancestors.length - 1];
            c && (u.place = c.position);
        }
        let o = u.place && "start" in u.place ? u.place.start : u.place;
        (this.ancestors = u.ancestors || void 0),
            (this.cause = u.cause || void 0),
            (this.column = o ? o.column : void 0),
            (this.fatal = void 0),
            this.file,
            (this.message = i),
            (this.line = o ? o.line : void 0),
            (this.name = gt(u.place) || "1:1"),
            (this.place = u.place || void 0),
            (this.reason = this.message),
            (this.ruleId = u.ruleId || void 0),
            (this.source = u.source || void 0),
            (this.stack =
                s && u.cause && typeof u.cause.stack == "string"
                    ? u.cause.stack
                    : ""),
            this.actual,
            this.expected,
            this.note,
            this.url;
    }
};
he.prototype.file = "";
he.prototype.name = "";
he.prototype.reason = "";
he.prototype.message = "";
he.prototype.stack = "";
he.prototype.column = void 0;
he.prototype.line = void 0;
he.prototype.ancestors = void 0;
he.prototype.cause = void 0;
he.prototype.fatal = void 0;
he.prototype.place = void 0;
he.prototype.ruleId = void 0;
he.prototype.source = void 0;
var je = { basename: Jc, dirname: Zc, extname: el, join: tl, sep: "/" };
function Jc(e, t) {
    if (t !== void 0 && typeof t != "string")
        throw new TypeError('"ext" argument must be a string');
    cn(e);
    let n = 0,
        r = -1,
        i = e.length,
        u;
    if (t === void 0 || t.length === 0 || t.length > e.length) {
        for (; i--; )
            if (e.codePointAt(i) === 47) {
                if (u) {
                    n = i + 1;
                    break;
                }
            } else r < 0 && ((u = !0), (r = i + 1));
        return r < 0 ? "" : e.slice(n, r);
    }
    if (t === e) return "";
    let s = -1,
        o = t.length - 1;
    for (; i--; )
        if (e.codePointAt(i) === 47) {
            if (u) {
                n = i + 1;
                break;
            }
        } else
            s < 0 && ((u = !0), (s = i + 1)),
                o > -1 &&
                    (e.codePointAt(i) === t.codePointAt(o--)
                        ? o < 0 && (r = i)
                        : ((o = -1), (r = s)));
    return n === r ? (r = s) : r < 0 && (r = e.length), e.slice(n, r);
}
function Zc(e) {
    if ((cn(e), e.length === 0)) return ".";
    let t = -1,
        n = e.length,
        r;
    for (; --n; )
        if (e.codePointAt(n) === 47) {
            if (r) {
                t = n;
                break;
            }
        } else r || (r = !0);
    return t < 0
        ? e.codePointAt(0) === 47
            ? "/"
            : "."
        : t === 1 && e.codePointAt(0) === 47
        ? "//"
        : e.slice(0, t);
}
function el(e) {
    cn(e);
    let t = e.length,
        n = -1,
        r = 0,
        i = -1,
        u = 0,
        s;
    for (; t--; ) {
        let o = e.codePointAt(t);
        if (o === 47) {
            if (s) {
                r = t + 1;
                break;
            }
            continue;
        }
        n < 0 && ((s = !0), (n = t + 1)),
            o === 46
                ? i < 0
                    ? (i = t)
                    : u !== 1 && (u = 1)
                : i > -1 && (u = -1);
    }
    return i < 0 || n < 0 || u === 0 || (u === 1 && i === n - 1 && i === r + 1)
        ? ""
        : e.slice(i, n);
}
function tl(...e) {
    let t = -1,
        n;
    for (; ++t < e.length; )
        cn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
    return n === void 0 ? "." : nl(n);
}
function nl(e) {
    cn(e);
    let t = e.codePointAt(0) === 47,
        n = rl(e, !t);
    return (
        n.length === 0 && !t && (n = "."),
        n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"),
        t ? "/" + n : n
    );
}
function rl(e, t) {
    let n = "",
        r = 0,
        i = -1,
        u = 0,
        s = -1,
        o,
        c;
    for (; ++s <= e.length; ) {
        if (s < e.length) o = e.codePointAt(s);
        else {
            if (o === 47) break;
            o = 47;
        }
        if (o === 47) {
            if (!(i === s - 1 || u === 1))
                if (i !== s - 1 && u === 2) {
                    if (
                        n.length < 2 ||
                        r !== 2 ||
                        n.codePointAt(n.length - 1) !== 46 ||
                        n.codePointAt(n.length - 2) !== 46
                    ) {
                        if (n.length > 2) {
                            if (
                                ((c = n.lastIndexOf("/")), c !== n.length - 1)
                            ) {
                                c < 0
                                    ? ((n = ""), (r = 0))
                                    : ((n = n.slice(0, c)),
                                      (r = n.length - 1 - n.lastIndexOf("/"))),
                                    (i = s),
                                    (u = 0);
                                continue;
                            }
                        } else if (n.length > 0) {
                            (n = ""), (r = 0), (i = s), (u = 0);
                            continue;
                        }
                    }
                    t && ((n = n.length > 0 ? n + "/.." : ".."), (r = 2));
                } else
                    n.length > 0
                        ? (n += "/" + e.slice(i + 1, s))
                        : (n = e.slice(i + 1, s)),
                        (r = s - i - 1);
            (i = s), (u = 0);
        } else o === 46 && u > -1 ? u++ : (u = -1);
    }
    return n;
}
function cn(e) {
    if (typeof e != "string")
        throw new TypeError(
            "Path must be a string. Received " + JSON.stringify(e)
        );
}
var da = { cwd: il };
function il() {
    return "/";
}
function Wt(e) {
    return !!(
        e !== null &&
        typeof e == "object" &&
        "href" in e &&
        e.href &&
        "protocol" in e &&
        e.protocol &&
        e.auth === void 0
    );
}
function ha(e) {
    if (typeof e == "string") e = new URL(e);
    else if (!Wt(e)) {
        let t = new TypeError(
            'The "path" argument must be of type string or an instance of URL. Received `' +
                e +
                "`"
        );
        throw ((t.code = "ERR_INVALID_ARG_TYPE"), t);
    }
    if (e.protocol !== "file:") {
        let t = new TypeError("The URL must be of scheme file");
        throw ((t.code = "ERR_INVALID_URL_SCHEME"), t);
    }
    return ul(e);
}
function ul(e) {
    if (e.hostname !== "") {
        let r = new TypeError(
            'File URL host must be "localhost" or empty on darwin'
        );
        throw ((r.code = "ERR_INVALID_FILE_URL_HOST"), r);
    }
    let t = e.pathname,
        n = -1;
    for (; ++n < t.length; )
        if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
            let r = t.codePointAt(n + 2);
            if (r === 70 || r === 102) {
                let i = new TypeError(
                    "File URL path must not include encoded / characters"
                );
                throw ((i.code = "ERR_INVALID_FILE_URL_PATH"), i);
            }
        }
    return decodeURIComponent(t);
}
var ai = ["history", "path", "basename", "stem", "extname", "dirname"],
    ln = class {
        constructor(t) {
            let n;
            t
                ? Wt(t)
                    ? (n = { path: t })
                    : typeof t == "string" || al(t)
                    ? (n = { value: t })
                    : (n = t)
                : (n = {}),
                (this.cwd = "cwd" in n ? "" : da.cwd()),
                (this.data = {}),
                (this.history = []),
                (this.messages = []),
                this.value,
                this.map,
                this.result,
                this.stored;
            let r = -1;
            for (; ++r < ai.length; ) {
                let u = ai[r];
                u in n &&
                    n[u] !== void 0 &&
                    n[u] !== null &&
                    (this[u] = u === "history" ? [...n[u]] : n[u]);
            }
            let i;
            for (i in n) ai.includes(i) || (this[i] = n[i]);
        }
        get basename() {
            return typeof this.path == "string"
                ? je.basename(this.path)
                : void 0;
        }
        set basename(t) {
            oi(t, "basename"),
                si(t, "basename"),
                (this.path = je.join(this.dirname || "", t));
        }
        get dirname() {
            return typeof this.path == "string"
                ? je.dirname(this.path)
                : void 0;
        }
        set dirname(t) {
            ma(this.basename, "dirname"),
                (this.path = je.join(t || "", this.basename));
        }
        get extname() {
            return typeof this.path == "string"
                ? je.extname(this.path)
                : void 0;
        }
        set extname(t) {
            if ((si(t, "extname"), ma(this.dirname, "extname"), t)) {
                if (t.codePointAt(0) !== 46)
                    throw new Error("`extname` must start with `.`");
                if (t.includes(".", 1))
                    throw new Error("`extname` cannot contain multiple dots");
            }
            this.path = je.join(this.dirname, this.stem + (t || ""));
        }
        get path() {
            return this.history[this.history.length - 1];
        }
        set path(t) {
            Wt(t) && (t = ha(t)),
                oi(t, "path"),
                this.path !== t && this.history.push(t);
        }
        get stem() {
            return typeof this.path == "string"
                ? je.basename(this.path, this.extname)
                : void 0;
        }
        set stem(t) {
            oi(t, "stem"),
                si(t, "stem"),
                (this.path = je.join(
                    this.dirname || "",
                    t + (this.extname || "")
                ));
        }
        fail(t, n, r) {
            let i = this.message(t, n, r);
            throw ((i.fatal = !0), i);
        }
        info(t, n, r) {
            let i = this.message(t, n, r);
            return (i.fatal = void 0), i;
        }
        message(t, n, r) {
            let i = new he(t, n, r);
            return (
                this.path &&
                    ((i.name = this.path + ":" + i.name), (i.file = this.path)),
                (i.fatal = !1),
                this.messages.push(i),
                i
            );
        }
        toString(t) {
            return this.value === void 0
                ? ""
                : typeof this.value == "string"
                ? this.value
                : new TextDecoder(t || void 0).decode(this.value);
        }
    };
function si(e, t) {
    if (e && e.includes(je.sep))
        throw new Error(
            "`" + t + "` cannot be a path: did not expect `" + je.sep + "`"
        );
}
function oi(e, t) {
    if (!e) throw new Error("`" + t + "` cannot be empty");
}
function ma(e, t) {
    if (!e)
        throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function al(e) {
    return !!(
        e &&
        typeof e == "object" &&
        "byteLength" in e &&
        "byteOffset" in e
    );
}
var pa = function (e) {
    let r = this.constructor.prototype,
        i = r[e],
        u = function () {
            return i.apply(u, arguments);
        };
    return Object.setPrototypeOf(u, r), u;
};
var sl = {}.hasOwnProperty,
    di = class e extends pa {
        constructor() {
            super("copy"),
                (this.Compiler = void 0),
                (this.Parser = void 0),
                (this.attachers = []),
                (this.compiler = void 0),
                (this.freezeIndex = -1),
                (this.frozen = void 0),
                (this.namespace = {}),
                (this.parser = void 0),
                (this.transformers = ii());
        }
        copy() {
            let t = new e(),
                n = -1;
            for (; ++n < this.attachers.length; ) {
                let r = this.attachers[n];
                t.use(...r);
            }
            return t.data((0, Jn.default)(!0, {}, this.namespace)), t;
        }
        data(t, n) {
            return typeof t == "string"
                ? arguments.length === 2
                    ? (fi("data", this.frozen), (this.namespace[t] = n), this)
                    : (sl.call(this.namespace, t) && this.namespace[t]) ||
                      void 0
                : t
                ? (fi("data", this.frozen), (this.namespace = t), this)
                : this.namespace;
        }
        freeze() {
            if (this.frozen) return this;
            let t = this;
            for (; ++this.freezeIndex < this.attachers.length; ) {
                let [n, ...r] = this.attachers[this.freezeIndex];
                if (r[0] === !1) continue;
                r[0] === !0 && (r[0] = void 0);
                let i = n.call(t, ...r);
                typeof i == "function" && this.transformers.use(i);
            }
            return (
                (this.frozen = !0),
                (this.freezeIndex = Number.POSITIVE_INFINITY),
                this
            );
        }
        parse(t) {
            this.freeze();
            let n = $n(t),
                r = this.parser || this.Parser;
            return ci("parse", r), r(String(n), n);
        }
        process(t, n) {
            let r = this;
            return (
                this.freeze(),
                ci("process", this.parser || this.Parser),
                li("process", this.compiler || this.Compiler),
                n ? i(void 0, n) : new Promise(i)
            );
            function i(u, s) {
                let o = $n(t),
                    c = r.parse(o);
                r.run(c, o, function (f, m, T) {
                    if (f || !m || !T) return l(f);
                    let p = m,
                        _ = r.stringify(p, T);
                    cl(_) ? (T.value = _) : (T.result = _), l(f, T);
                });
                function l(f, m) {
                    f || !m ? s(f) : u ? u(m) : n(void 0, m);
                }
            }
        }
        processSync(t) {
            let n = !1,
                r;
            return (
                this.freeze(),
                ci("processSync", this.parser || this.Parser),
                li("processSync", this.compiler || this.Compiler),
                this.process(t, i),
                Ta("processSync", "process", n),
                r
            );
            function i(u, s) {
                (n = !0), ri(u), (r = s);
            }
        }
        run(t, n, r) {
            Ea(t), this.freeze();
            let i = this.transformers;
            return (
                !r && typeof n == "function" && ((r = n), (n = void 0)),
                r ? u(void 0, r) : new Promise(u)
            );
            function u(s, o) {
                let c = $n(n);
                i.run(t, c, l);
                function l(f, m, T) {
                    let p = m || t;
                    f ? o(f) : s ? s(p) : r(void 0, p, T);
                }
            }
        }
        runSync(t, n) {
            let r = !1,
                i;
            return this.run(t, n, u), Ta("runSync", "run", r), i;
            function u(s, o) {
                ri(s), (i = o), (r = !0);
            }
        }
        stringify(t, n) {
            this.freeze();
            let r = $n(n),
                i = this.compiler || this.Compiler;
            return li("stringify", i), Ea(t), i(t, r);
        }
        use(t, ...n) {
            let r = this.attachers,
                i = this.namespace;
            if ((fi("use", this.frozen), t != null))
                if (typeof t == "function") c(t, n);
                else if (typeof t == "object") Array.isArray(t) ? o(t) : s(t);
                else
                    throw new TypeError(
                        "Expected usable value, not `" + t + "`"
                    );
            return this;
            function u(l) {
                if (typeof l == "function") c(l, []);
                else if (typeof l == "object")
                    if (Array.isArray(l)) {
                        let [f, ...m] = l;
                        c(f, m);
                    } else s(l);
                else
                    throw new TypeError(
                        "Expected usable value, not `" + l + "`"
                    );
            }
            function s(l) {
                if (!("plugins" in l) && !("settings" in l))
                    throw new Error(
                        "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
                    );
                o(l.plugins),
                    l.settings &&
                        (i.settings = (0, Jn.default)(
                            !0,
                            i.settings,
                            l.settings
                        ));
            }
            function o(l) {
                let f = -1;
                if (l != null)
                    if (Array.isArray(l))
                        for (; ++f < l.length; ) {
                            let m = l[f];
                            u(m);
                        }
                    else
                        throw new TypeError(
                            "Expected a list of plugins, not `" + l + "`"
                        );
            }
            function c(l, f) {
                let m = -1,
                    T = -1;
                for (; ++m < r.length; )
                    if (r[m][0] === l) {
                        T = m;
                        break;
                    }
                if (T === -1) r.push([l, ...f]);
                else if (f.length > 0) {
                    let [p, ..._] = f,
                        C = r[T][1];
                    on(C) && on(p) && (p = (0, Jn.default)(!0, C, p)),
                        (r[T] = [l, p, ..._]);
                }
            }
        }
    },
    ga = new di().freeze();
function ci(e, t) {
    if (typeof t != "function")
        throw new TypeError("Cannot `" + e + "` without `parser`");
}
function li(e, t) {
    if (typeof t != "function")
        throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function fi(e, t) {
    if (t)
        throw new Error(
            "Cannot call `" +
                e +
                "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
        );
}
function Ea(e) {
    if (!on(e) || typeof e.type != "string")
        throw new TypeError("Expected node, got `" + e + "`");
}
function Ta(e, t, n) {
    if (!n)
        throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function $n(e) {
    return ol(e) ? e : new ln(e);
}
function ol(e) {
    return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function cl(e) {
    return typeof e == "string" || ll(e);
}
function ll(e) {
    return !!(
        e &&
        typeof e == "object" &&
        "byteLength" in e &&
        "byteOffset" in e
    );
}
var fl = {};
function Ot(e, t) {
    let n = t || fl,
        r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0,
        i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
    return Aa(e, r, i);
}
function Aa(e, t, n) {
    if (dl(e)) {
        if ("value" in e) return e.type === "html" && !n ? "" : e.value;
        if (t && "alt" in e && e.alt) return e.alt;
        if ("children" in e) return ba(e.children, t, n);
    }
    return Array.isArray(e) ? ba(e, t, n) : "";
}
function ba(e, t, n) {
    let r = [],
        i = -1;
    for (; ++i < e.length; ) r[i] = Aa(e[i], t, n);
    return r.join("");
}
function dl(e) {
    return !!(e && typeof e == "object");
}
var _a = document.createElement("i");
function bt(e) {
    let t = "&" + e + ";";
    _a.innerHTML = t;
    let n = _a.textContent;
    return (n.charCodeAt(n.length - 1) === 59 && e !== "semi") || n === t
        ? !1
        : n;
}
function ge(e, t, n, r) {
    let i = e.length,
        u = 0,
        s;
    if (
        (t < 0 ? (t = -t > i ? 0 : i + t) : (t = t > i ? i : t),
        (n = n > 0 ? n : 0),
        r.length < 1e4)
    )
        (s = Array.from(r)), s.unshift(t, n), e.splice(...s);
    else
        for (n && e.splice(t, n); u < r.length; )
            (s = r.slice(u, u + 1e4)),
                s.unshift(t, 0),
                e.splice(...s),
                (u += 1e4),
                (t += 1e4);
}
function fe(e, t) {
    return e.length > 0 ? (ge(e, e.length, 0, t), e) : t;
}
var hi = {}.hasOwnProperty;
function xa(e) {
    let t = {},
        n = -1;
    for (; ++n < e.length; ) hl(t, e[n]);
    return t;
}
function hl(e, t) {
    let n;
    for (n in t) {
        let i = (hi.call(e, n) ? e[n] : void 0) || (e[n] = {}),
            u = t[n],
            s;
        if (u)
            for (s in u) {
                hi.call(i, s) || (i[s] = []);
                let o = u[s];
                ml(i[s], Array.isArray(o) ? o : o ? [o] : []);
            }
    }
}
function ml(e, t) {
    let n = -1,
        r = [];
    for (; ++n < t.length; ) (t[n].add === "after" ? e : r).push(t[n]);
    ge(e, 0, 0, r);
}
function Ca(e) {
    let t = {},
        n = -1;
    for (; ++n < e.length; ) pl(t, e[n]);
    return t;
}
function pl(e, t) {
    let n;
    for (n in t) {
        let i = (hi.call(e, n) ? e[n] : void 0) || (e[n] = {}),
            u = t[n],
            s;
        if (u) for (s in u) i[s] = u[s];
    }
}
function Qt(e, t) {
    let n = Number.parseInt(e, t);
    return n < 9 ||
        n === 11 ||
        (n > 13 && n < 32) ||
        (n > 126 && n < 160) ||
        (n > 55295 && n < 57344) ||
        (n > 64975 && n < 65008) ||
        (n & 65535) === 65535 ||
        (n & 65535) === 65534 ||
        n > 1114111
        ? "\uFFFD"
        : String.fromCodePoint(n);
}
var El = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function Zn(e) {
    return e.replace(/["&<>]/g, t);
    function t(n) {
        return "&" + El[n] + ";";
    }
}
function Ue(e) {
    return e
        .replace(/[\t\n\r ]+/g, " ")
        .replace(/^ | $/g, "")
        .toLowerCase()
        .toUpperCase();
}
var De = At(/[A-Za-z]/),
    me = At(/[\dA-Za-z]/),
    Ia = At(/[#-'*+\--9=?A-Z^-~]/);
function fn(e) {
    return e !== null && (e < 32 || e === 127);
}
var dn = At(/\d/),
    Na = At(/[\dA-Fa-f]/),
    Sa = At(/[!-/:-@[-`{-~]/);
function B(e) {
    return e !== null && e < -2;
}
function ce(e) {
    return e !== null && (e < 0 || e === 32);
}
function z(e) {
    return e === -2 || e === -1 || e === 32;
}
var Ra = At(/\p{P}|\p{S}/u),
    ka = At(/\s/);
function At(e) {
    return t;
    function t(n) {
        return n !== null && n > -1 && e.test(String.fromCharCode(n));
    }
}
function hn(e, t) {
    let n = Zn(Pe(e || ""));
    if (!t) return n;
    let r = n.indexOf(":"),
        i = n.indexOf("?"),
        u = n.indexOf("#"),
        s = n.indexOf("/");
    return r < 0 ||
        (s > -1 && r > s) ||
        (i > -1 && r > i) ||
        (u > -1 && r > u) ||
        t.test(n.slice(0, r))
        ? n
        : "";
}
function Pe(e) {
    let t = [],
        n = -1,
        r = 0,
        i = 0;
    for (; ++n < e.length; ) {
        let u = e.charCodeAt(n),
            s = "";
        if (u === 37 && me(e.charCodeAt(n + 1)) && me(e.charCodeAt(n + 2)))
            i = 2;
        else if (u < 128)
            /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(u)) ||
                (s = String.fromCharCode(u));
        else if (u > 55295 && u < 57344) {
            let o = e.charCodeAt(n + 1);
            u < 56320 && o > 56319 && o < 57344
                ? ((s = String.fromCharCode(u, o)), (i = 1))
                : (s = "\uFFFD");
        } else s = String.fromCharCode(u);
        s &&
            (t.push(e.slice(r, n), encodeURIComponent(s)),
            (r = n + i + 1),
            (s = "")),
            i && ((n += i), (i = 0));
    }
    return t.join("") + e.slice(r);
}
var La = {}.hasOwnProperty,
    Oa = /^(https?|ircs?|mailto|xmpp)$/i,
    Tl = /^https?$/i;
function ya(e) {
    let t = e || {},
        n = !0,
        r = {},
        i = [[]],
        u = [],
        s = [],
        c = Ca(
            [
                {
                    enter: {
                        blockQuote: X,
                        codeFenced: Fe,
                        codeFencedFenceInfo: k,
                        codeFencedFenceMeta: k,
                        codeIndented: We,
                        codeText: Ce,
                        content: Xn,
                        definition: jr,
                        definitionDestinationString: Wn,
                        definitionLabelString: k,
                        definitionTitleString: k,
                        emphasis: kt,
                        htmlFlow: ye,
                        htmlText: He,
                        image: xe,
                        label: k,
                        link: at,
                        listItemMarker: Z,
                        listItemValue: j,
                        listOrdered: ne,
                        listUnordered: S,
                        paragraph: oe,
                        reference: k,
                        resource: Rt,
                        resourceDestinationString: Qe,
                        resourceTitleString: k,
                        setextHeading: Jr,
                        strong: Lt,
                    },
                    exit: {
                        atxHeading: ei,
                        atxHeadingSequence: $r,
                        autolinkEmail: qc,
                        autolinkProtocol: zc,
                        blockQuote: ie,
                        characterEscapeValue: w,
                        characterReferenceMarkerHexadecimal: Ku,
                        characterReferenceMarkerNumeric: Ku,
                        characterReferenceValue: Yc,
                        codeFenced: b,
                        codeFencedFence: Se,
                        codeFencedFenceInfo: g,
                        codeFencedFenceMeta: G,
                        codeFlowValue: K,
                        codeIndented: b,
                        codeText: Tt,
                        codeTextData: w,
                        data: w,
                        definition: Gn,
                        definitionDestinationString: Qn,
                        definitionLabelString: Vn,
                        definitionTitleString: Kr,
                        emphasis: Ge,
                        hardBreakEscape: ee,
                        hardBreakTrailing: ee,
                        htmlFlow: Ze,
                        htmlFlowData: w,
                        htmlText: Ze,
                        htmlTextData: w,
                        image: Vt,
                        label: qt,
                        labelText: sn,
                        lineEnding: V,
                        link: Vt,
                        listOrdered: Y,
                        listUnordered: F,
                        paragraph: Oe,
                        reference: G,
                        referenceString: de,
                        resource: G,
                        resourceDestinationString: st,
                        resourceTitleString: Et,
                        setextHeading: R,
                        setextHeadingLineSequence: ti,
                        setextHeadingText: Zr,
                        strong: Uc,
                        thematicBreak: vc,
                    },
                },
            ].concat(t.htmlExtensions || [])
        ),
        l = { tightStack: s, definitions: r },
        f = {
            lineEndingIfNeeded: U,
            options: t,
            encode: L,
            raw: P,
            tag: O,
            buffer: k,
            resume: I,
            setData: _,
            getData: C,
        },
        m = t.defaultLineEnding;
    return T;
    function T(M) {
        let H = -1,
            Re = 0,
            Xe = [],
            et = [],
            ot = [];
        for (; ++H < M.length; )
            !m &&
                (M[H][1].type === "lineEnding" ||
                    M[H][1].type === "lineEndingBlank") &&
                (m = M[H][2].sliceSerialize(M[H][1])),
                (M[H][1].type === "listOrdered" ||
                    M[H][1].type === "listUnordered") &&
                    (M[H][0] === "enter"
                        ? Xe.push(H)
                        : p(M.slice(Xe.pop(), H))),
                M[H][1].type === "definition" &&
                    (M[H][0] === "enter"
                        ? ((ot = fe(ot, M.slice(Re, H))), (Re = H))
                        : ((et = fe(et, M.slice(Re, H + 1))), (Re = H + 1)));
        (et = fe(et, ot)), (et = fe(et, M.slice(Re))), (H = -1);
        let tt = et;
        for (c.enter.null && c.enter.null.call(f); ++H < M.length; ) {
            let $u = c[tt[H][0]],
                Ju = tt[H][1].type,
                Zu = $u[Ju];
            La.call($u, Ju) &&
                Zu &&
                Zu.call(
                    Object.assign(
                        { sliceSerialize: tt[H][2].sliceSerialize },
                        f
                    ),
                    tt[H][1]
                );
        }
        return c.exit.null && c.exit.null.call(f), i[0].join("");
    }
    function p(M) {
        let H = M.length,
            Re = 0,
            Xe = 0,
            et = !1,
            ot;
        for (; ++Re < H; ) {
            let tt = M[Re];
            if (tt[1]._container)
                (ot = void 0), tt[0] === "enter" ? Xe++ : Xe--;
            else
                switch (tt[1].type) {
                    case "listItemPrefix": {
                        tt[0] === "exit" && (ot = !0);
                        break;
                    }
                    case "linePrefix":
                        break;
                    case "lineEndingBlank": {
                        tt[0] === "enter" &&
                            !Xe &&
                            (ot ? (ot = void 0) : (et = !0));
                        break;
                    }
                    default:
                        ot = void 0;
                }
        }
        M[0][1]._loose = et;
    }
    function _(M, H) {
        l[M] = H;
    }
    function C(M) {
        return l[M];
    }
    function k() {
        i.push([]);
    }
    function I() {
        return i.pop().join("");
    }
    function O(M) {
        n && (_("lastWasTag", !0), i[i.length - 1].push(M));
    }
    function P(M) {
        _("lastWasTag"), i[i.length - 1].push(M);
    }
    function v() {
        P(
            m ||
                `
`
        );
    }
    function U() {
        let M = i[i.length - 1],
            H = M[M.length - 1],
            Re = H ? H.charCodeAt(H.length - 1) : null;
        Re === 10 || Re === 13 || Re === null || v();
    }
    function L(M) {
        return C("ignoreEncode") ? M : Zn(M);
    }
    function G() {
        I();
    }
    function ne(M) {
        s.push(!M._loose), U(), O("<ol"), _("expectFirstItem", !0);
    }
    function S(M) {
        s.push(!M._loose), U(), O("<ul"), _("expectFirstItem", !0);
    }
    function j(M) {
        if (C("expectFirstItem")) {
            let H = Number.parseInt(this.sliceSerialize(M), 10);
            H !== 1 && O(' start="' + L(String(H)) + '"');
        }
    }
    function Z() {
        C("expectFirstItem") ? O(">") : q(),
            U(),
            O("<li>"),
            _("expectFirstItem"),
            _("lastWasTag");
    }
    function Y() {
        q(), s.pop(), v(), O("</ol>");
    }
    function F() {
        q(), s.pop(), v(), O("</ul>");
    }
    function q() {
        C("lastWasTag") && !C("slurpAllLineEndings") && U(),
            O("</li>"),
            _("slurpAllLineEndings");
    }
    function X() {
        s.push(!1), U(), O("<blockquote>");
    }
    function ie() {
        s.pop(), U(), O("</blockquote>"), _("slurpAllLineEndings");
    }
    function oe() {
        s[s.length - 1] || (U(), O("<p>")), _("slurpAllLineEndings");
    }
    function Oe() {
        s[s.length - 1] ? _("slurpAllLineEndings", !0) : O("</p>");
    }
    function Fe() {
        U(), O("<pre><code"), _("fencesCount", 0);
    }
    function g() {
        let M = I();
        O(' class="language-' + M + '"');
    }
    function Se() {
        let M = C("fencesCount") || 0;
        M || (O(">"), _("slurpOneLineEnding", !0)), _("fencesCount", M + 1);
    }
    function We() {
        U(), O("<pre><code>");
    }
    function b() {
        let M = C("fencesCount");
        M !== void 0 &&
            M < 2 &&
            l.tightStack.length > 0 &&
            !C("lastWasTag") &&
            v(),
            C("flowCodeSeenData") && U(),
            O("</code></pre>"),
            M !== void 0 && M < 2 && U(),
            _("flowCodeSeenData"),
            _("fencesCount"),
            _("slurpOneLineEnding");
    }
    function xe() {
        u.push({ image: !0 }), (n = void 0);
    }
    function at() {
        u.push({});
    }
    function sn(M) {
        u[u.length - 1].labelId = this.sliceSerialize(M);
    }
    function qt() {
        u[u.length - 1].label = I();
    }
    function de(M) {
        u[u.length - 1].referenceId = this.sliceSerialize(M);
    }
    function Rt() {
        k(), (u[u.length - 1].destination = "");
    }
    function Qe() {
        k(), _("ignoreEncode", !0);
    }
    function st() {
        (u[u.length - 1].destination = I()), _("ignoreEncode");
    }
    function Et() {
        u[u.length - 1].title = I();
    }
    function Vt() {
        let M = u.length - 1,
            H = u[M],
            Re = H.referenceId || H.labelId,
            Xe = H.destination === void 0 ? r[Ue(Re)] : H;
        for (n = !0; M--; )
            if (u[M].image) {
                n = void 0;
                break;
            }
        H.image
            ? (O(
                  '<img src="' +
                      hn(
                          Xe.destination,
                          t.allowDangerousProtocol ? void 0 : Tl
                      ) +
                      '" alt="'
              ),
              P(H.label),
              O('"'))
            : O(
                  '<a href="' +
                      hn(
                          Xe.destination,
                          t.allowDangerousProtocol ? void 0 : Oa
                      ) +
                      '"'
              ),
            O(Xe.title ? ' title="' + Xe.title + '"' : ""),
            H.image ? O(" />") : (O(">"), P(H.label), O("</a>")),
            u.pop();
    }
    function jr() {
        k(), u.push({});
    }
    function Vn(M) {
        I(), (u[u.length - 1].labelId = this.sliceSerialize(M));
    }
    function Wn() {
        k(), _("ignoreEncode", !0);
    }
    function Qn() {
        (u[u.length - 1].destination = I()), _("ignoreEncode");
    }
    function Kr() {
        u[u.length - 1].title = I();
    }
    function Gn() {
        let M = u[u.length - 1],
            H = Ue(M.labelId);
        I(), La.call(r, H) || (r[H] = u[u.length - 1]), u.pop();
    }
    function Xn() {
        _("slurpAllLineEndings", !0);
    }
    function $r(M) {
        C("headingRank") ||
            (_("headingRank", this.sliceSerialize(M).length),
            U(),
            O("<h" + C("headingRank") + ">"));
    }
    function Jr() {
        k(), _("slurpAllLineEndings");
    }
    function Zr() {
        _("slurpAllLineEndings", !0);
    }
    function ei() {
        O("</h" + C("headingRank") + ">"), _("headingRank");
    }
    function ti(M) {
        _("headingRank", this.sliceSerialize(M).charCodeAt(0) === 61 ? 1 : 2);
    }
    function R() {
        let M = I();
        U(),
            O("<h" + C("headingRank") + ">"),
            P(M),
            O("</h" + C("headingRank") + ">"),
            _("slurpAllLineEndings"),
            _("headingRank");
    }
    function w(M) {
        P(L(this.sliceSerialize(M)));
    }
    function V(M) {
        if (!C("slurpAllLineEndings")) {
            if (C("slurpOneLineEnding")) {
                _("slurpOneLineEnding");
                return;
            }
            if (C("inCodeText")) {
                P(" ");
                return;
            }
            P(L(this.sliceSerialize(M)));
        }
    }
    function K(M) {
        P(L(this.sliceSerialize(M))), _("flowCodeSeenData", !0);
    }
    function ee() {
        O("<br />");
    }
    function ye() {
        U(), He();
    }
    function Ze() {
        _("ignoreEncode");
    }
    function He() {
        t.allowDangerousHtml && _("ignoreEncode", !0);
    }
    function kt() {
        O("<em>");
    }
    function Lt() {
        O("<strong>");
    }
    function Ce() {
        _("inCodeText", !0), O("<code>");
    }
    function Tt() {
        _("inCodeText"), O("</code>");
    }
    function Ge() {
        O("</em>");
    }
    function Uc() {
        O("</strong>");
    }
    function vc() {
        U(), O("<hr />");
    }
    function Ku(M) {
        _("characterReferenceType", M.type);
    }
    function Yc(M) {
        let H = this.sliceSerialize(M);
        (H = C("characterReferenceType")
            ? Qt(
                  H,
                  C("characterReferenceType") ===
                      "characterReferenceMarkerNumeric"
                      ? 10
                      : 16
              )
            : bt(H)),
            P(L(H)),
            _("characterReferenceType");
    }
    function zc(M) {
        let H = this.sliceSerialize(M);
        O('<a href="' + hn(H, t.allowDangerousProtocol ? void 0 : Oa) + '">'),
            P(L(H)),
            O("</a>");
    }
    function qc(M) {
        let H = this.sliceSerialize(M);
        O('<a href="' + hn("mailto:" + H) + '">'), P(L(H)), O("</a>");
    }
}
function Q(e, t, n, r) {
    let i = r ? r - 1 : Number.POSITIVE_INFINITY,
        u = 0;
    return s;
    function s(c) {
        return z(c) ? (e.enter(n), o(c)) : t(c);
    }
    function o(c) {
        return z(c) && u++ < i ? (e.consume(c), o) : (e.exit(n), t(c));
    }
}
var Da = { tokenize: gl };
function gl(e) {
    let t = e.attempt(this.parser.constructs.contentInitial, r, i),
        n;
    return t;
    function r(o) {
        if (o === null) {
            e.consume(o);
            return;
        }
        return (
            e.enter("lineEnding"),
            e.consume(o),
            e.exit("lineEnding"),
            Q(e, t, "linePrefix")
        );
    }
    function i(o) {
        return e.enter("paragraph"), u(o);
    }
    function u(o) {
        let c = e.enter("chunkText", { contentType: "text", previous: n });
        return n && (n.next = c), (n = c), s(o);
    }
    function s(o) {
        if (o === null) {
            e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
            return;
        }
        return B(o)
            ? (e.consume(o), e.exit("chunkText"), u)
            : (e.consume(o), s);
    }
}
var wa = { tokenize: bl },
    Pa = { tokenize: Al };
function bl(e) {
    let t = this,
        n = [],
        r = 0,
        i,
        u,
        s;
    return o;
    function o(P) {
        if (r < n.length) {
            let v = n[r];
            return (
                (t.containerState = v[1]), e.attempt(v[0].continuation, c, l)(P)
            );
        }
        return l(P);
    }
    function c(P) {
        if ((r++, t.containerState._closeFlow)) {
            (t.containerState._closeFlow = void 0), i && O();
            let v = t.events.length,
                U = v,
                L;
            for (; U--; )
                if (
                    t.events[U][0] === "exit" &&
                    t.events[U][1].type === "chunkFlow"
                ) {
                    L = t.events[U][1].end;
                    break;
                }
            I(r);
            let G = v;
            for (; G < t.events.length; )
                (t.events[G][1].end = Object.assign({}, L)), G++;
            return (
                ge(t.events, U + 1, 0, t.events.slice(v)),
                (t.events.length = G),
                l(P)
            );
        }
        return o(P);
    }
    function l(P) {
        if (r === n.length) {
            if (!i) return T(P);
            if (i.currentConstruct && i.currentConstruct.concrete) return _(P);
            t.interrupt = !!(
                i.currentConstruct && !i._gfmTableDynamicInterruptHack
            );
        }
        return (t.containerState = {}), e.check(Pa, f, m)(P);
    }
    function f(P) {
        return i && O(), I(r), T(P);
    }
    function m(P) {
        return (
            (t.parser.lazy[t.now().line] = r !== n.length),
            (s = t.now().offset),
            _(P)
        );
    }
    function T(P) {
        return (t.containerState = {}), e.attempt(Pa, p, _)(P);
    }
    function p(P) {
        return r++, n.push([t.currentConstruct, t.containerState]), T(P);
    }
    function _(P) {
        if (P === null) {
            i && O(), I(0), e.consume(P);
            return;
        }
        return (
            (i = i || t.parser.flow(t.now())),
            e.enter("chunkFlow", {
                contentType: "flow",
                previous: u,
                _tokenizer: i,
            }),
            C(P)
        );
    }
    function C(P) {
        if (P === null) {
            k(e.exit("chunkFlow"), !0), I(0), e.consume(P);
            return;
        }
        return B(P)
            ? (e.consume(P),
              k(e.exit("chunkFlow")),
              (r = 0),
              (t.interrupt = void 0),
              o)
            : (e.consume(P), C);
    }
    function k(P, v) {
        let U = t.sliceStream(P);
        if (
            (v && U.push(null),
            (P.previous = u),
            u && (u.next = P),
            (u = P),
            i.defineSkip(P.start),
            i.write(U),
            t.parser.lazy[P.start.line])
        ) {
            let L = i.events.length;
            for (; L--; )
                if (
                    i.events[L][1].start.offset < s &&
                    (!i.events[L][1].end || i.events[L][1].end.offset > s)
                )
                    return;
            let G = t.events.length,
                ne = G,
                S,
                j;
            for (; ne--; )
                if (
                    t.events[ne][0] === "exit" &&
                    t.events[ne][1].type === "chunkFlow"
                ) {
                    if (S) {
                        j = t.events[ne][1].end;
                        break;
                    }
                    S = !0;
                }
            for (I(r), L = G; L < t.events.length; )
                (t.events[L][1].end = Object.assign({}, j)), L++;
            ge(t.events, ne + 1, 0, t.events.slice(G)), (t.events.length = L);
        }
    }
    function I(P) {
        let v = n.length;
        for (; v-- > P; ) {
            let U = n[v];
            (t.containerState = U[1]), U[0].exit.call(t, e);
        }
        n.length = P;
    }
    function O() {
        i.write([null]),
            (u = void 0),
            (i = void 0),
            (t.containerState._closeFlow = void 0);
    }
}
function Al(e, t, n) {
    return Q(
        e,
        e.attempt(this.parser.constructs.document, t, n),
        "linePrefix",
        this.parser.constructs.disable.null.includes("codeIndented")
            ? void 0
            : 4
    );
}
function mi(e) {
    if (e === null || ce(e) || ka(e)) return 1;
    if (Ra(e)) return 2;
}
function Gt(e, t, n) {
    let r = [],
        i = -1;
    for (; ++i < e.length; ) {
        let u = e[i].resolveAll;
        u && !r.includes(u) && ((t = u(t, n)), r.push(u));
    }
    return t;
}
var mn = { name: "attention", tokenize: xl, resolveAll: _l };
function _l(e, t) {
    let n = -1,
        r,
        i,
        u,
        s,
        o,
        c,
        l,
        f;
    for (; ++n < e.length; )
        if (
            e[n][0] === "enter" &&
            e[n][1].type === "attentionSequence" &&
            e[n][1]._close
        ) {
            for (r = n; r--; )
                if (
                    e[r][0] === "exit" &&
                    e[r][1].type === "attentionSequence" &&
                    e[r][1]._open &&
                    t.sliceSerialize(e[r][1]).charCodeAt(0) ===
                        t.sliceSerialize(e[n][1]).charCodeAt(0)
                ) {
                    if (
                        (e[r][1]._close || e[n][1]._open) &&
                        (e[n][1].end.offset - e[n][1].start.offset) % 3 &&
                        !(
                            (e[r][1].end.offset -
                                e[r][1].start.offset +
                                e[n][1].end.offset -
                                e[n][1].start.offset) %
                            3
                        )
                    )
                        continue;
                    c =
                        e[r][1].end.offset - e[r][1].start.offset > 1 &&
                        e[n][1].end.offset - e[n][1].start.offset > 1
                            ? 2
                            : 1;
                    let m = Object.assign({}, e[r][1].end),
                        T = Object.assign({}, e[n][1].start);
                    Ma(m, -c),
                        Ma(T, c),
                        (s = {
                            type: c > 1 ? "strongSequence" : "emphasisSequence",
                            start: m,
                            end: Object.assign({}, e[r][1].end),
                        }),
                        (o = {
                            type: c > 1 ? "strongSequence" : "emphasisSequence",
                            start: Object.assign({}, e[n][1].start),
                            end: T,
                        }),
                        (u = {
                            type: c > 1 ? "strongText" : "emphasisText",
                            start: Object.assign({}, e[r][1].end),
                            end: Object.assign({}, e[n][1].start),
                        }),
                        (i = {
                            type: c > 1 ? "strong" : "emphasis",
                            start: Object.assign({}, s.start),
                            end: Object.assign({}, o.end),
                        }),
                        (e[r][1].end = Object.assign({}, s.start)),
                        (e[n][1].start = Object.assign({}, o.end)),
                        (l = []),
                        e[r][1].end.offset - e[r][1].start.offset &&
                            (l = fe(l, [
                                ["enter", e[r][1], t],
                                ["exit", e[r][1], t],
                            ])),
                        (l = fe(l, [
                            ["enter", i, t],
                            ["enter", s, t],
                            ["exit", s, t],
                            ["enter", u, t],
                        ])),
                        (l = fe(
                            l,
                            Gt(
                                t.parser.constructs.insideSpan.null,
                                e.slice(r + 1, n),
                                t
                            )
                        )),
                        (l = fe(l, [
                            ["exit", u, t],
                            ["enter", o, t],
                            ["exit", o, t],
                            ["exit", i, t],
                        ])),
                        e[n][1].end.offset - e[n][1].start.offset
                            ? ((f = 2),
                              (l = fe(l, [
                                  ["enter", e[n][1], t],
                                  ["exit", e[n][1], t],
                              ])))
                            : (f = 0),
                        ge(e, r - 1, n - r + 3, l),
                        (n = r + l.length - f - 2);
                    break;
                }
        }
    for (n = -1; ++n < e.length; )
        e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
    return e;
}
function xl(e, t) {
    let n = this.parser.constructs.attentionMarkers.null,
        r = this.previous,
        i = mi(r),
        u;
    return s;
    function s(c) {
        return (u = c), e.enter("attentionSequence"), o(c);
    }
    function o(c) {
        if (c === u) return e.consume(c), o;
        let l = e.exit("attentionSequence"),
            f = mi(c),
            m = !f || (f === 2 && i) || n.includes(c),
            T = !i || (i === 2 && f) || n.includes(r);
        return (
            (l._open = !!(u === 42 ? m : m && (i || !T))),
            (l._close = !!(u === 42 ? T : T && (f || !m))),
            t(c)
        );
    }
}
function Ma(e, t) {
    (e.column += t), (e.offset += t), (e._bufferIndex += t);
}
var pi = { name: "autolink", tokenize: Cl };
function Cl(e, t, n) {
    let r = 0;
    return i;
    function i(p) {
        return (
            e.enter("autolink"),
            e.enter("autolinkMarker"),
            e.consume(p),
            e.exit("autolinkMarker"),
            e.enter("autolinkProtocol"),
            u
        );
    }
    function u(p) {
        return De(p) ? (e.consume(p), s) : p === 64 ? n(p) : l(p);
    }
    function s(p) {
        return p === 43 || p === 45 || p === 46 || me(p)
            ? ((r = 1), o(p))
            : l(p);
    }
    function o(p) {
        return p === 58
            ? (e.consume(p), (r = 0), c)
            : (p === 43 || p === 45 || p === 46 || me(p)) && r++ < 32
            ? (e.consume(p), o)
            : ((r = 0), l(p));
    }
    function c(p) {
        return p === 62
            ? (e.exit("autolinkProtocol"),
              e.enter("autolinkMarker"),
              e.consume(p),
              e.exit("autolinkMarker"),
              e.exit("autolink"),
              t)
            : p === null || p === 32 || p === 60 || fn(p)
            ? n(p)
            : (e.consume(p), c);
    }
    function l(p) {
        return p === 64 ? (e.consume(p), f) : Ia(p) ? (e.consume(p), l) : n(p);
    }
    function f(p) {
        return me(p) ? m(p) : n(p);
    }
    function m(p) {
        return p === 46
            ? (e.consume(p), (r = 0), f)
            : p === 62
            ? ((e.exit("autolinkProtocol").type = "autolinkEmail"),
              e.enter("autolinkMarker"),
              e.consume(p),
              e.exit("autolinkMarker"),
              e.exit("autolink"),
              t)
            : T(p);
    }
    function T(p) {
        if ((p === 45 || me(p)) && r++ < 63) {
            let _ = p === 45 ? T : m;
            return e.consume(p), _;
        }
        return n(p);
    }
}
var _t = { tokenize: Il, partial: !0 };
function Il(e, t, n) {
    return r;
    function r(u) {
        return z(u) ? Q(e, i, "linePrefix")(u) : i(u);
    }
    function i(u) {
        return u === null || B(u) ? t(u) : n(u);
    }
}
var er = {
    name: "blockQuote",
    tokenize: Nl,
    continuation: { tokenize: Sl },
    exit: Rl,
};
function Nl(e, t, n) {
    let r = this;
    return i;
    function i(s) {
        if (s === 62) {
            let o = r.containerState;
            return (
                o.open ||
                    (e.enter("blockQuote", { _container: !0 }), (o.open = !0)),
                e.enter("blockQuotePrefix"),
                e.enter("blockQuoteMarker"),
                e.consume(s),
                e.exit("blockQuoteMarker"),
                u
            );
        }
        return n(s);
    }
    function u(s) {
        return z(s)
            ? (e.enter("blockQuotePrefixWhitespace"),
              e.consume(s),
              e.exit("blockQuotePrefixWhitespace"),
              e.exit("blockQuotePrefix"),
              t)
            : (e.exit("blockQuotePrefix"), t(s));
    }
}
function Sl(e, t, n) {
    let r = this;
    return i;
    function i(s) {
        return z(s)
            ? Q(
                  e,
                  u,
                  "linePrefix",
                  r.parser.constructs.disable.null.includes("codeIndented")
                      ? void 0
                      : 4
              )(s)
            : u(s);
    }
    function u(s) {
        return e.attempt(er, t, n)(s);
    }
}
function Rl(e) {
    e.exit("blockQuote");
}
var tr = { name: "characterEscape", tokenize: kl };
function kl(e, t, n) {
    return r;
    function r(u) {
        return (
            e.enter("characterEscape"),
            e.enter("escapeMarker"),
            e.consume(u),
            e.exit("escapeMarker"),
            i
        );
    }
    function i(u) {
        return Sa(u)
            ? (e.enter("characterEscapeValue"),
              e.consume(u),
              e.exit("characterEscapeValue"),
              e.exit("characterEscape"),
              t)
            : n(u);
    }
}
var nr = { name: "characterReference", tokenize: Ll };
function Ll(e, t, n) {
    let r = this,
        i = 0,
        u,
        s;
    return o;
    function o(m) {
        return (
            e.enter("characterReference"),
            e.enter("characterReferenceMarker"),
            e.consume(m),
            e.exit("characterReferenceMarker"),
            c
        );
    }
    function c(m) {
        return m === 35
            ? (e.enter("characterReferenceMarkerNumeric"),
              e.consume(m),
              e.exit("characterReferenceMarkerNumeric"),
              l)
            : (e.enter("characterReferenceValue"), (u = 31), (s = me), f(m));
    }
    function l(m) {
        return m === 88 || m === 120
            ? (e.enter("characterReferenceMarkerHexadecimal"),
              e.consume(m),
              e.exit("characterReferenceMarkerHexadecimal"),
              e.enter("characterReferenceValue"),
              (u = 6),
              (s = Na),
              f)
            : (e.enter("characterReferenceValue"), (u = 7), (s = dn), f(m));
    }
    function f(m) {
        if (m === 59 && i) {
            let T = e.exit("characterReferenceValue");
            return s === me && !bt(r.sliceSerialize(T))
                ? n(m)
                : (e.enter("characterReferenceMarker"),
                  e.consume(m),
                  e.exit("characterReferenceMarker"),
                  e.exit("characterReference"),
                  t);
        }
        return s(m) && i++ < u ? (e.consume(m), f) : n(m);
    }
}
var Ba = { tokenize: yl, partial: !0 },
    rr = { name: "codeFenced", tokenize: Ol, concrete: !0 };
function Ol(e, t, n) {
    let r = this,
        i = { tokenize: U, partial: !0 },
        u = 0,
        s = 0,
        o;
    return c;
    function c(L) {
        return l(L);
    }
    function l(L) {
        let G = r.events[r.events.length - 1];
        return (
            (u =
                G && G[1].type === "linePrefix"
                    ? G[2].sliceSerialize(G[1], !0).length
                    : 0),
            (o = L),
            e.enter("codeFenced"),
            e.enter("codeFencedFence"),
            e.enter("codeFencedFenceSequence"),
            f(L)
        );
    }
    function f(L) {
        return L === o
            ? (s++, e.consume(L), f)
            : s < 3
            ? n(L)
            : (e.exit("codeFencedFenceSequence"),
              z(L) ? Q(e, m, "whitespace")(L) : m(L));
    }
    function m(L) {
        return L === null || B(L)
            ? (e.exit("codeFencedFence"),
              r.interrupt ? t(L) : e.check(Ba, C, v)(L))
            : (e.enter("codeFencedFenceInfo"),
              e.enter("chunkString", { contentType: "string" }),
              T(L));
    }
    function T(L) {
        return L === null || B(L)
            ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), m(L))
            : z(L)
            ? (e.exit("chunkString"),
              e.exit("codeFencedFenceInfo"),
              Q(e, p, "whitespace")(L))
            : L === 96 && L === o
            ? n(L)
            : (e.consume(L), T);
    }
    function p(L) {
        return L === null || B(L)
            ? m(L)
            : (e.enter("codeFencedFenceMeta"),
              e.enter("chunkString", { contentType: "string" }),
              _(L));
    }
    function _(L) {
        return L === null || B(L)
            ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), m(L))
            : L === 96 && L === o
            ? n(L)
            : (e.consume(L), _);
    }
    function C(L) {
        return e.attempt(i, v, k)(L);
    }
    function k(L) {
        return e.enter("lineEnding"), e.consume(L), e.exit("lineEnding"), I;
    }
    function I(L) {
        return u > 0 && z(L) ? Q(e, O, "linePrefix", u + 1)(L) : O(L);
    }
    function O(L) {
        return L === null || B(L)
            ? e.check(Ba, C, v)(L)
            : (e.enter("codeFlowValue"), P(L));
    }
    function P(L) {
        return L === null || B(L)
            ? (e.exit("codeFlowValue"), O(L))
            : (e.consume(L), P);
    }
    function v(L) {
        return e.exit("codeFenced"), t(L);
    }
    function U(L, G, ne) {
        let S = 0;
        return j;
        function j(X) {
            return L.enter("lineEnding"), L.consume(X), L.exit("lineEnding"), Z;
        }
        function Z(X) {
            return (
                L.enter("codeFencedFence"),
                z(X)
                    ? Q(
                          L,
                          Y,
                          "linePrefix",
                          r.parser.constructs.disable.null.includes(
                              "codeIndented"
                          )
                              ? void 0
                              : 4
                      )(X)
                    : Y(X)
            );
        }
        function Y(X) {
            return X === o ? (L.enter("codeFencedFenceSequence"), F(X)) : ne(X);
        }
        function F(X) {
            return X === o
                ? (S++, L.consume(X), F)
                : S >= s
                ? (L.exit("codeFencedFenceSequence"),
                  z(X) ? Q(L, q, "whitespace")(X) : q(X))
                : ne(X);
        }
        function q(X) {
            return X === null || B(X)
                ? (L.exit("codeFencedFence"), G(X))
                : ne(X);
        }
    }
}
function yl(e, t, n) {
    let r = this;
    return i;
    function i(s) {
        return s === null
            ? n(s)
            : (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), u);
    }
    function u(s) {
        return r.parser.lazy[r.now().line] ? n(s) : t(s);
    }
}
var pn = { name: "codeIndented", tokenize: Pl },
    Dl = { tokenize: wl, partial: !0 };
function Pl(e, t, n) {
    let r = this;
    return i;
    function i(l) {
        return e.enter("codeIndented"), Q(e, u, "linePrefix", 5)(l);
    }
    function u(l) {
        let f = r.events[r.events.length - 1];
        return f &&
            f[1].type === "linePrefix" &&
            f[2].sliceSerialize(f[1], !0).length >= 4
            ? s(l)
            : n(l);
    }
    function s(l) {
        return l === null
            ? c(l)
            : B(l)
            ? e.attempt(Dl, s, c)(l)
            : (e.enter("codeFlowValue"), o(l));
    }
    function o(l) {
        return l === null || B(l)
            ? (e.exit("codeFlowValue"), s(l))
            : (e.consume(l), o);
    }
    function c(l) {
        return e.exit("codeIndented"), t(l);
    }
}
function wl(e, t, n) {
    let r = this;
    return i;
    function i(s) {
        return r.parser.lazy[r.now().line]
            ? n(s)
            : B(s)
            ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), i)
            : Q(e, u, "linePrefix", 5)(s);
    }
    function u(s) {
        let o = r.events[r.events.length - 1];
        return o &&
            o[1].type === "linePrefix" &&
            o[2].sliceSerialize(o[1], !0).length >= 4
            ? t(s)
            : B(s)
            ? i(s)
            : n(s);
    }
}
var Ei = { name: "codeText", tokenize: Fl, resolve: Ml, previous: Bl };
function Ml(e) {
    let t = e.length - 4,
        n = 3,
        r,
        i;
    if (
        (e[n][1].type === "lineEnding" || e[n][1].type === "space") &&
        (e[t][1].type === "lineEnding" || e[t][1].type === "space")
    ) {
        for (r = n; ++r < t; )
            if (e[r][1].type === "codeTextData") {
                (e[n][1].type = "codeTextPadding"),
                    (e[t][1].type = "codeTextPadding"),
                    (n += 2),
                    (t -= 2);
                break;
            }
    }
    for (r = n - 1, t++; ++r <= t; )
        i === void 0
            ? r !== t && e[r][1].type !== "lineEnding" && (i = r)
            : (r === t || e[r][1].type === "lineEnding") &&
              ((e[i][1].type = "codeTextData"),
              r !== i + 2 &&
                  ((e[i][1].end = e[r - 1][1].end),
                  e.splice(i + 2, r - i - 2),
                  (t -= r - i - 2),
                  (r = i + 2)),
              (i = void 0));
    return e;
}
function Bl(e) {
    return (
        e !== 96 ||
        this.events[this.events.length - 1][1].type === "characterEscape"
    );
}
function Fl(e, t, n) {
    let r = this,
        i = 0,
        u,
        s;
    return o;
    function o(T) {
        return e.enter("codeText"), e.enter("codeTextSequence"), c(T);
    }
    function c(T) {
        return T === 96
            ? (e.consume(T), i++, c)
            : (e.exit("codeTextSequence"), l(T));
    }
    function l(T) {
        return T === null
            ? n(T)
            : T === 32
            ? (e.enter("space"), e.consume(T), e.exit("space"), l)
            : T === 96
            ? ((s = e.enter("codeTextSequence")), (u = 0), m(T))
            : B(T)
            ? (e.enter("lineEnding"), e.consume(T), e.exit("lineEnding"), l)
            : (e.enter("codeTextData"), f(T));
    }
    function f(T) {
        return T === null || T === 32 || T === 96 || B(T)
            ? (e.exit("codeTextData"), l(T))
            : (e.consume(T), f);
    }
    function m(T) {
        return T === 96
            ? (e.consume(T), u++, m)
            : u === i
            ? (e.exit("codeTextSequence"), e.exit("codeText"), t(T))
            : ((s.type = "codeTextData"), f(T));
    }
}
var ir = class {
    constructor(t) {
        (this.left = t ? [...t] : []), (this.right = []);
    }
    get(t) {
        if (t < 0 || t >= this.left.length + this.right.length)
            throw new RangeError(
                "Cannot access index `" +
                    t +
                    "` in a splice buffer of size `" +
                    (this.left.length + this.right.length) +
                    "`"
            );
        return t < this.left.length
            ? this.left[t]
            : this.right[this.right.length - t + this.left.length - 1];
    }
    get length() {
        return this.left.length + this.right.length;
    }
    shift() {
        return this.setCursor(0), this.right.pop();
    }
    slice(t, n) {
        let r = n ?? Number.POSITIVE_INFINITY;
        return r < this.left.length
            ? this.left.slice(t, r)
            : t > this.left.length
            ? this.right
                  .slice(
                      this.right.length - r + this.left.length,
                      this.right.length - t + this.left.length
                  )
                  .reverse()
            : this.left
                  .slice(t)
                  .concat(
                      this.right
                          .slice(this.right.length - r + this.left.length)
                          .reverse()
                  );
    }
    splice(t, n, r) {
        let i = n || 0;
        this.setCursor(Math.trunc(t));
        let u = this.right.splice(
            this.right.length - i,
            Number.POSITIVE_INFINITY
        );
        return r && En(this.left, r), u.reverse();
    }
    pop() {
        return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
    }
    push(t) {
        this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
    }
    pushMany(t) {
        this.setCursor(Number.POSITIVE_INFINITY), En(this.left, t);
    }
    unshift(t) {
        this.setCursor(0), this.right.push(t);
    }
    unshiftMany(t) {
        this.setCursor(0), En(this.right, t.reverse());
    }
    setCursor(t) {
        if (
            !(
                t === this.left.length ||
                (t > this.left.length && this.right.length === 0) ||
                (t < 0 && this.left.length === 0)
            )
        )
            if (t < this.left.length) {
                let n = this.left.splice(t, Number.POSITIVE_INFINITY);
                En(this.right, n.reverse());
            } else {
                let n = this.right.splice(
                    this.left.length + this.right.length - t,
                    Number.POSITIVE_INFINITY
                );
                En(this.left, n.reverse());
            }
    }
};
function En(e, t) {
    let n = 0;
    if (t.length < 1e4) e.push(...t);
    else for (; n < t.length; ) e.push(...t.slice(n, n + 1e4)), (n += 1e4);
}
function ur(e) {
    let t = {},
        n = -1,
        r,
        i,
        u,
        s,
        o,
        c,
        l,
        f = new ir(e);
    for (; ++n < f.length; ) {
        for (; n in t; ) n = t[n];
        if (
            ((r = f.get(n)),
            n &&
                r[1].type === "chunkFlow" &&
                f.get(n - 1)[1].type === "listItemPrefix" &&
                ((c = r[1]._tokenizer.events),
                (u = 0),
                u < c.length && c[u][1].type === "lineEndingBlank" && (u += 2),
                u < c.length && c[u][1].type === "content"))
        )
            for (; ++u < c.length && c[u][1].type !== "content"; )
                c[u][1].type === "chunkText" &&
                    ((c[u][1]._isInFirstContentOfListItem = !0), u++);
        if (r[0] === "enter")
            r[1].contentType &&
                (Object.assign(t, Hl(f, n)), (n = t[n]), (l = !0));
        else if (r[1]._container) {
            for (
                u = n, i = void 0;
                u-- &&
                ((s = f.get(u)),
                s[1].type === "lineEnding" || s[1].type === "lineEndingBlank");

            )
                s[0] === "enter" &&
                    (i && (f.get(i)[1].type = "lineEndingBlank"),
                    (s[1].type = "lineEnding"),
                    (i = u));
            i &&
                ((r[1].end = Object.assign({}, f.get(i)[1].start)),
                (o = f.slice(i, n)),
                o.unshift(r),
                f.splice(i, n - i + 1, o));
        }
    }
    return ge(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !l;
}
function Hl(e, t) {
    let n = e.get(t)[1],
        r = e.get(t)[2],
        i = t - 1,
        u = [],
        s = n._tokenizer || r.parser[n.contentType](n.start),
        o = s.events,
        c = [],
        l = {},
        f,
        m,
        T = -1,
        p = n,
        _ = 0,
        C = 0,
        k = [C];
    for (; p; ) {
        for (; e.get(++i)[1] !== p; );
        u.push(i),
            p._tokenizer ||
                ((f = r.sliceStream(p)),
                p.next || f.push(null),
                m && s.defineSkip(p.start),
                p._isInFirstContentOfListItem &&
                    (s._gfmTasklistFirstContentOfListItem = !0),
                s.write(f),
                p._isInFirstContentOfListItem &&
                    (s._gfmTasklistFirstContentOfListItem = void 0)),
            (m = p),
            (p = p.next);
    }
    for (p = n; ++T < o.length; )
        o[T][0] === "exit" &&
            o[T - 1][0] === "enter" &&
            o[T][1].type === o[T - 1][1].type &&
            o[T][1].start.line !== o[T][1].end.line &&
            ((C = T + 1),
            k.push(C),
            (p._tokenizer = void 0),
            (p.previous = void 0),
            (p = p.next));
    for (
        s.events = [],
            p ? ((p._tokenizer = void 0), (p.previous = void 0)) : k.pop(),
            T = k.length;
        T--;

    ) {
        let I = o.slice(k[T], k[T + 1]),
            O = u.pop();
        c.push([O, O + I.length - 1]), e.splice(O, 2, I);
    }
    for (c.reverse(), T = -1; ++T < c.length; )
        (l[_ + c[T][0]] = _ + c[T][1]), (_ += c[T][1] - c[T][0] - 1);
    return l;
}
var Ti = { tokenize: Yl, resolve: vl },
    Ul = { tokenize: zl, partial: !0 };
function vl(e) {
    return ur(e), e;
}
function Yl(e, t) {
    let n;
    return r;
    function r(o) {
        return (
            e.enter("content"),
            (n = e.enter("chunkContent", { contentType: "content" })),
            i(o)
        );
    }
    function i(o) {
        return o === null
            ? u(o)
            : B(o)
            ? e.check(Ul, s, u)(o)
            : (e.consume(o), i);
    }
    function u(o) {
        return e.exit("chunkContent"), e.exit("content"), t(o);
    }
    function s(o) {
        return (
            e.consume(o),
            e.exit("chunkContent"),
            (n.next = e.enter("chunkContent", {
                contentType: "content",
                previous: n,
            })),
            (n = n.next),
            i
        );
    }
}
function zl(e, t, n) {
    let r = this;
    return i;
    function i(s) {
        return (
            e.exit("chunkContent"),
            e.enter("lineEnding"),
            e.consume(s),
            e.exit("lineEnding"),
            Q(e, u, "linePrefix")
        );
    }
    function u(s) {
        if (s === null || B(s)) return n(s);
        let o = r.events[r.events.length - 1];
        return !r.parser.constructs.disable.null.includes("codeIndented") &&
            o &&
            o[1].type === "linePrefix" &&
            o[2].sliceSerialize(o[1], !0).length >= 4
            ? t(s)
            : e.interrupt(r.parser.constructs.flow, n, t)(s);
    }
}
function ar(e, t, n, r, i, u, s, o, c) {
    let l = c || Number.POSITIVE_INFINITY,
        f = 0;
    return m;
    function m(I) {
        return I === 60
            ? (e.enter(r), e.enter(i), e.enter(u), e.consume(I), e.exit(u), T)
            : I === null || I === 32 || I === 41 || fn(I)
            ? n(I)
            : (e.enter(r),
              e.enter(s),
              e.enter(o),
              e.enter("chunkString", { contentType: "string" }),
              C(I));
    }
    function T(I) {
        return I === 62
            ? (e.enter(u), e.consume(I), e.exit(u), e.exit(i), e.exit(r), t)
            : (e.enter(o),
              e.enter("chunkString", { contentType: "string" }),
              p(I));
    }
    function p(I) {
        return I === 62
            ? (e.exit("chunkString"), e.exit(o), T(I))
            : I === null || I === 60 || B(I)
            ? n(I)
            : (e.consume(I), I === 92 ? _ : p);
    }
    function _(I) {
        return I === 60 || I === 62 || I === 92 ? (e.consume(I), p) : p(I);
    }
    function C(I) {
        return !f && (I === null || I === 41 || ce(I))
            ? (e.exit("chunkString"), e.exit(o), e.exit(s), e.exit(r), t(I))
            : f < l && I === 40
            ? (e.consume(I), f++, C)
            : I === 41
            ? (e.consume(I), f--, C)
            : I === null || I === 32 || I === 40 || fn(I)
            ? n(I)
            : (e.consume(I), I === 92 ? k : C);
    }
    function k(I) {
        return I === 40 || I === 41 || I === 92 ? (e.consume(I), C) : C(I);
    }
}
function sr(e, t, n, r, i, u) {
    let s = this,
        o = 0,
        c;
    return l;
    function l(p) {
        return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(u), f;
    }
    function f(p) {
        return o > 999 ||
            p === null ||
            p === 91 ||
            (p === 93 && !c) ||
            (p === 94 && !o && "_hiddenFootnoteSupport" in s.parser.constructs)
            ? n(p)
            : p === 93
            ? (e.exit(u), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t)
            : B(p)
            ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), f)
            : (e.enter("chunkString", { contentType: "string" }), m(p));
    }
    function m(p) {
        return p === null || p === 91 || p === 93 || B(p) || o++ > 999
            ? (e.exit("chunkString"), f(p))
            : (e.consume(p), c || (c = !z(p)), p === 92 ? T : m);
    }
    function T(p) {
        return p === 91 || p === 92 || p === 93 ? (e.consume(p), o++, m) : m(p);
    }
}
function or(e, t, n, r, i, u) {
    let s;
    return o;
    function o(T) {
        return T === 34 || T === 39 || T === 40
            ? (e.enter(r),
              e.enter(i),
              e.consume(T),
              e.exit(i),
              (s = T === 40 ? 41 : T),
              c)
            : n(T);
    }
    function c(T) {
        return T === s
            ? (e.enter(i), e.consume(T), e.exit(i), e.exit(r), t)
            : (e.enter(u), l(T));
    }
    function l(T) {
        return T === s
            ? (e.exit(u), c(s))
            : T === null
            ? n(T)
            : B(T)
            ? (e.enter("lineEnding"),
              e.consume(T),
              e.exit("lineEnding"),
              Q(e, l, "linePrefix"))
            : (e.enter("chunkString", { contentType: "string" }), f(T));
    }
    function f(T) {
        return T === s || T === null || B(T)
            ? (e.exit("chunkString"), l(T))
            : (e.consume(T), T === 92 ? m : f);
    }
    function m(T) {
        return T === s || T === 92 ? (e.consume(T), f) : f(T);
    }
}
function yt(e, t) {
    let n;
    return r;
    function r(i) {
        return B(i)
            ? (e.enter("lineEnding"),
              e.consume(i),
              e.exit("lineEnding"),
              (n = !0),
              r)
            : z(i)
            ? Q(e, r, n ? "linePrefix" : "lineSuffix")(i)
            : t(i);
    }
}
var gi = { name: "definition", tokenize: Vl },
    ql = { tokenize: Wl, partial: !0 };
function Vl(e, t, n) {
    let r = this,
        i;
    return u;
    function u(p) {
        return e.enter("definition"), s(p);
    }
    function s(p) {
        return sr.call(
            r,
            e,
            o,
            n,
            "definitionLabel",
            "definitionLabelMarker",
            "definitionLabelString"
        )(p);
    }
    function o(p) {
        return (
            (i = Ue(
                r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
            )),
            p === 58
                ? (e.enter("definitionMarker"),
                  e.consume(p),
                  e.exit("definitionMarker"),
                  c)
                : n(p)
        );
    }
    function c(p) {
        return ce(p) ? yt(e, l)(p) : l(p);
    }
    function l(p) {
        return ar(
            e,
            f,
            n,
            "definitionDestination",
            "definitionDestinationLiteral",
            "definitionDestinationLiteralMarker",
            "definitionDestinationRaw",
            "definitionDestinationString"
        )(p);
    }
    function f(p) {
        return e.attempt(ql, m, m)(p);
    }
    function m(p) {
        return z(p) ? Q(e, T, "whitespace")(p) : T(p);
    }
    function T(p) {
        return p === null || B(p)
            ? (e.exit("definition"), r.parser.defined.push(i), t(p))
            : n(p);
    }
}
function Wl(e, t, n) {
    return r;
    function r(o) {
        return ce(o) ? yt(e, i)(o) : n(o);
    }
    function i(o) {
        return or(
            e,
            u,
            n,
            "definitionTitle",
            "definitionTitleMarker",
            "definitionTitleString"
        )(o);
    }
    function u(o) {
        return z(o) ? Q(e, s, "whitespace")(o) : s(o);
    }
    function s(o) {
        return o === null || B(o) ? t(o) : n(o);
    }
}
var bi = { name: "hardBreakEscape", tokenize: Ql };
function Ql(e, t, n) {
    return r;
    function r(u) {
        return e.enter("hardBreakEscape"), e.consume(u), i;
    }
    function i(u) {
        return B(u) ? (e.exit("hardBreakEscape"), t(u)) : n(u);
    }
}
var Ai = { name: "headingAtx", tokenize: Xl, resolve: Gl };
function Gl(e, t) {
    let n = e.length - 2,
        r = 3,
        i,
        u;
    return (
        e[r][1].type === "whitespace" && (r += 2),
        n - 2 > r && e[n][1].type === "whitespace" && (n -= 2),
        e[n][1].type === "atxHeadingSequence" &&
            (r === n - 1 || (n - 4 > r && e[n - 2][1].type === "whitespace")) &&
            (n -= r + 1 === n ? 2 : 4),
        n > r &&
            ((i = {
                type: "atxHeadingText",
                start: e[r][1].start,
                end: e[n][1].end,
            }),
            (u = {
                type: "chunkText",
                start: e[r][1].start,
                end: e[n][1].end,
                contentType: "text",
            }),
            ge(e, r, n - r + 1, [
                ["enter", i, t],
                ["enter", u, t],
                ["exit", u, t],
                ["exit", i, t],
            ])),
        e
    );
}
function Xl(e, t, n) {
    let r = 0;
    return i;
    function i(f) {
        return e.enter("atxHeading"), u(f);
    }
    function u(f) {
        return e.enter("atxHeadingSequence"), s(f);
    }
    function s(f) {
        return f === 35 && r++ < 6
            ? (e.consume(f), s)
            : f === null || ce(f)
            ? (e.exit("atxHeadingSequence"), o(f))
            : n(f);
    }
    function o(f) {
        return f === 35
            ? (e.enter("atxHeadingSequence"), c(f))
            : f === null || B(f)
            ? (e.exit("atxHeading"), t(f))
            : z(f)
            ? Q(e, o, "whitespace")(f)
            : (e.enter("atxHeadingText"), l(f));
    }
    function c(f) {
        return f === 35
            ? (e.consume(f), c)
            : (e.exit("atxHeadingSequence"), o(f));
    }
    function l(f) {
        return f === null || f === 35 || ce(f)
            ? (e.exit("atxHeadingText"), o(f))
            : (e.consume(f), l);
    }
}
var Fa = [
        "address",
        "article",
        "aside",
        "base",
        "basefont",
        "blockquote",
        "body",
        "caption",
        "center",
        "col",
        "colgroup",
        "dd",
        "details",
        "dialog",
        "dir",
        "div",
        "dl",
        "dt",
        "fieldset",
        "figcaption",
        "figure",
        "footer",
        "form",
        "frame",
        "frameset",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hr",
        "html",
        "iframe",
        "legend",
        "li",
        "link",
        "main",
        "menu",
        "menuitem",
        "nav",
        "noframes",
        "ol",
        "optgroup",
        "option",
        "p",
        "param",
        "search",
        "section",
        "summary",
        "table",
        "tbody",
        "td",
        "tfoot",
        "th",
        "thead",
        "title",
        "tr",
        "track",
        "ul",
    ],
    _i = ["pre", "script", "style", "textarea"];
var xi = { name: "htmlFlow", tokenize: Jl, resolveTo: $l, concrete: !0 },
    jl = { tokenize: ef, partial: !0 },
    Kl = { tokenize: Zl, partial: !0 };
function $l(e) {
    let t = e.length;
    for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); );
    return (
        t > 1 &&
            e[t - 2][1].type === "linePrefix" &&
            ((e[t][1].start = e[t - 2][1].start),
            (e[t + 1][1].start = e[t - 2][1].start),
            e.splice(t - 2, 2)),
        e
    );
}
function Jl(e, t, n) {
    let r = this,
        i,
        u,
        s,
        o,
        c;
    return l;
    function l(b) {
        return f(b);
    }
    function f(b) {
        return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(b), m;
    }
    function m(b) {
        return b === 33
            ? (e.consume(b), T)
            : b === 47
            ? (e.consume(b), (u = !0), C)
            : b === 63
            ? (e.consume(b), (i = 3), r.interrupt ? t : g)
            : De(b)
            ? (e.consume(b), (s = String.fromCharCode(b)), k)
            : n(b);
    }
    function T(b) {
        return b === 45
            ? (e.consume(b), (i = 2), p)
            : b === 91
            ? (e.consume(b), (i = 5), (o = 0), _)
            : De(b)
            ? (e.consume(b), (i = 4), r.interrupt ? t : g)
            : n(b);
    }
    function p(b) {
        return b === 45 ? (e.consume(b), r.interrupt ? t : g) : n(b);
    }
    function _(b) {
        let xe = "CDATA[";
        return b === xe.charCodeAt(o++)
            ? (e.consume(b), o === xe.length ? (r.interrupt ? t : Y) : _)
            : n(b);
    }
    function C(b) {
        return De(b) ? (e.consume(b), (s = String.fromCharCode(b)), k) : n(b);
    }
    function k(b) {
        if (b === null || b === 47 || b === 62 || ce(b)) {
            let xe = b === 47,
                at = s.toLowerCase();
            return !xe && !u && _i.includes(at)
                ? ((i = 1), r.interrupt ? t(b) : Y(b))
                : Fa.includes(s.toLowerCase())
                ? ((i = 6), xe ? (e.consume(b), I) : r.interrupt ? t(b) : Y(b))
                : ((i = 7),
                  r.interrupt && !r.parser.lazy[r.now().line]
                      ? n(b)
                      : u
                      ? O(b)
                      : P(b));
        }
        return b === 45 || me(b)
            ? (e.consume(b), (s += String.fromCharCode(b)), k)
            : n(b);
    }
    function I(b) {
        return b === 62 ? (e.consume(b), r.interrupt ? t : Y) : n(b);
    }
    function O(b) {
        return z(b) ? (e.consume(b), O) : j(b);
    }
    function P(b) {
        return b === 47
            ? (e.consume(b), j)
            : b === 58 || b === 95 || De(b)
            ? (e.consume(b), v)
            : z(b)
            ? (e.consume(b), P)
            : j(b);
    }
    function v(b) {
        return b === 45 || b === 46 || b === 58 || b === 95 || me(b)
            ? (e.consume(b), v)
            : U(b);
    }
    function U(b) {
        return b === 61 ? (e.consume(b), L) : z(b) ? (e.consume(b), U) : P(b);
    }
    function L(b) {
        return b === null || b === 60 || b === 61 || b === 62 || b === 96
            ? n(b)
            : b === 34 || b === 39
            ? (e.consume(b), (c = b), G)
            : z(b)
            ? (e.consume(b), L)
            : ne(b);
    }
    function G(b) {
        return b === c
            ? (e.consume(b), (c = null), S)
            : b === null || B(b)
            ? n(b)
            : (e.consume(b), G);
    }
    function ne(b) {
        return b === null ||
            b === 34 ||
            b === 39 ||
            b === 47 ||
            b === 60 ||
            b === 61 ||
            b === 62 ||
            b === 96 ||
            ce(b)
            ? U(b)
            : (e.consume(b), ne);
    }
    function S(b) {
        return b === 47 || b === 62 || z(b) ? P(b) : n(b);
    }
    function j(b) {
        return b === 62 ? (e.consume(b), Z) : n(b);
    }
    function Z(b) {
        return b === null || B(b) ? Y(b) : z(b) ? (e.consume(b), Z) : n(b);
    }
    function Y(b) {
        return b === 45 && i === 2
            ? (e.consume(b), ie)
            : b === 60 && i === 1
            ? (e.consume(b), oe)
            : b === 62 && i === 4
            ? (e.consume(b), Se)
            : b === 63 && i === 3
            ? (e.consume(b), g)
            : b === 93 && i === 5
            ? (e.consume(b), Fe)
            : B(b) && (i === 6 || i === 7)
            ? (e.exit("htmlFlowData"), e.check(jl, We, F)(b))
            : b === null || B(b)
            ? (e.exit("htmlFlowData"), F(b))
            : (e.consume(b), Y);
    }
    function F(b) {
        return e.check(Kl, q, We)(b);
    }
    function q(b) {
        return e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), X;
    }
    function X(b) {
        return b === null || B(b) ? F(b) : (e.enter("htmlFlowData"), Y(b));
    }
    function ie(b) {
        return b === 45 ? (e.consume(b), g) : Y(b);
    }
    function oe(b) {
        return b === 47 ? (e.consume(b), (s = ""), Oe) : Y(b);
    }
    function Oe(b) {
        if (b === 62) {
            let xe = s.toLowerCase();
            return _i.includes(xe) ? (e.consume(b), Se) : Y(b);
        }
        return De(b) && s.length < 8
            ? (e.consume(b), (s += String.fromCharCode(b)), Oe)
            : Y(b);
    }
    function Fe(b) {
        return b === 93 ? (e.consume(b), g) : Y(b);
    }
    function g(b) {
        return b === 62
            ? (e.consume(b), Se)
            : b === 45 && i === 2
            ? (e.consume(b), g)
            : Y(b);
    }
    function Se(b) {
        return b === null || B(b)
            ? (e.exit("htmlFlowData"), We(b))
            : (e.consume(b), Se);
    }
    function We(b) {
        return e.exit("htmlFlow"), t(b);
    }
}
function Zl(e, t, n) {
    let r = this;
    return i;
    function i(s) {
        return B(s)
            ? (e.enter("lineEnding"), e.consume(s), e.exit("lineEnding"), u)
            : n(s);
    }
    function u(s) {
        return r.parser.lazy[r.now().line] ? n(s) : t(s);
    }
}
function ef(e, t, n) {
    return r;
    function r(i) {
        return (
            e.enter("lineEnding"),
            e.consume(i),
            e.exit("lineEnding"),
            e.attempt(_t, t, n)
        );
    }
}
var Ci = { name: "htmlText", tokenize: tf };
function tf(e, t, n) {
    let r = this,
        i,
        u,
        s;
    return o;
    function o(g) {
        return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), c;
    }
    function c(g) {
        return g === 33
            ? (e.consume(g), l)
            : g === 47
            ? (e.consume(g), U)
            : g === 63
            ? (e.consume(g), P)
            : De(g)
            ? (e.consume(g), ne)
            : n(g);
    }
    function l(g) {
        return g === 45
            ? (e.consume(g), f)
            : g === 91
            ? (e.consume(g), (u = 0), _)
            : De(g)
            ? (e.consume(g), O)
            : n(g);
    }
    function f(g) {
        return g === 45 ? (e.consume(g), p) : n(g);
    }
    function m(g) {
        return g === null
            ? n(g)
            : g === 45
            ? (e.consume(g), T)
            : B(g)
            ? ((s = m), oe(g))
            : (e.consume(g), m);
    }
    function T(g) {
        return g === 45 ? (e.consume(g), p) : m(g);
    }
    function p(g) {
        return g === 62 ? ie(g) : g === 45 ? T(g) : m(g);
    }
    function _(g) {
        let Se = "CDATA[";
        return g === Se.charCodeAt(u++)
            ? (e.consume(g), u === Se.length ? C : _)
            : n(g);
    }
    function C(g) {
        return g === null
            ? n(g)
            : g === 93
            ? (e.consume(g), k)
            : B(g)
            ? ((s = C), oe(g))
            : (e.consume(g), C);
    }
    function k(g) {
        return g === 93 ? (e.consume(g), I) : C(g);
    }
    function I(g) {
        return g === 62 ? ie(g) : g === 93 ? (e.consume(g), I) : C(g);
    }
    function O(g) {
        return g === null || g === 62
            ? ie(g)
            : B(g)
            ? ((s = O), oe(g))
            : (e.consume(g), O);
    }
    function P(g) {
        return g === null
            ? n(g)
            : g === 63
            ? (e.consume(g), v)
            : B(g)
            ? ((s = P), oe(g))
            : (e.consume(g), P);
    }
    function v(g) {
        return g === 62 ? ie(g) : P(g);
    }
    function U(g) {
        return De(g) ? (e.consume(g), L) : n(g);
    }
    function L(g) {
        return g === 45 || me(g) ? (e.consume(g), L) : G(g);
    }
    function G(g) {
        return B(g) ? ((s = G), oe(g)) : z(g) ? (e.consume(g), G) : ie(g);
    }
    function ne(g) {
        return g === 45 || me(g)
            ? (e.consume(g), ne)
            : g === 47 || g === 62 || ce(g)
            ? S(g)
            : n(g);
    }
    function S(g) {
        return g === 47
            ? (e.consume(g), ie)
            : g === 58 || g === 95 || De(g)
            ? (e.consume(g), j)
            : B(g)
            ? ((s = S), oe(g))
            : z(g)
            ? (e.consume(g), S)
            : ie(g);
    }
    function j(g) {
        return g === 45 || g === 46 || g === 58 || g === 95 || me(g)
            ? (e.consume(g), j)
            : Z(g);
    }
    function Z(g) {
        return g === 61
            ? (e.consume(g), Y)
            : B(g)
            ? ((s = Z), oe(g))
            : z(g)
            ? (e.consume(g), Z)
            : S(g);
    }
    function Y(g) {
        return g === null || g === 60 || g === 61 || g === 62 || g === 96
            ? n(g)
            : g === 34 || g === 39
            ? (e.consume(g), (i = g), F)
            : B(g)
            ? ((s = Y), oe(g))
            : z(g)
            ? (e.consume(g), Y)
            : (e.consume(g), q);
    }
    function F(g) {
        return g === i
            ? (e.consume(g), (i = void 0), X)
            : g === null
            ? n(g)
            : B(g)
            ? ((s = F), oe(g))
            : (e.consume(g), F);
    }
    function q(g) {
        return g === null ||
            g === 34 ||
            g === 39 ||
            g === 60 ||
            g === 61 ||
            g === 96
            ? n(g)
            : g === 47 || g === 62 || ce(g)
            ? S(g)
            : (e.consume(g), q);
    }
    function X(g) {
        return g === 47 || g === 62 || ce(g) ? S(g) : n(g);
    }
    function ie(g) {
        return g === 62
            ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), t)
            : n(g);
    }
    function oe(g) {
        return (
            e.exit("htmlTextData"),
            e.enter("lineEnding"),
            e.consume(g),
            e.exit("lineEnding"),
            Oe
        );
    }
    function Oe(g) {
        return z(g)
            ? Q(
                  e,
                  Fe,
                  "linePrefix",
                  r.parser.constructs.disable.null.includes("codeIndented")
                      ? void 0
                      : 4
              )(g)
            : Fe(g);
    }
    function Fe(g) {
        return e.enter("htmlTextData"), s(g);
    }
}
var Dt = { name: "labelEnd", tokenize: of, resolveTo: sf, resolveAll: af },
    nf = { tokenize: cf },
    rf = { tokenize: lf },
    uf = { tokenize: ff };
function af(e) {
    let t = -1;
    for (; ++t < e.length; ) {
        let n = e[t][1];
        (n.type === "labelImage" ||
            n.type === "labelLink" ||
            n.type === "labelEnd") &&
            (e.splice(t + 1, n.type === "labelImage" ? 4 : 2),
            (n.type = "data"),
            t++);
    }
    return e;
}
function sf(e, t) {
    let n = e.length,
        r = 0,
        i,
        u,
        s,
        o;
    for (; n--; )
        if (((i = e[n][1]), u)) {
            if (i.type === "link" || (i.type === "labelLink" && i._inactive))
                break;
            e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
        } else if (s) {
            if (
                e[n][0] === "enter" &&
                (i.type === "labelImage" || i.type === "labelLink") &&
                !i._balanced &&
                ((u = n), i.type !== "labelLink")
            ) {
                r = 2;
                break;
            }
        } else i.type === "labelEnd" && (s = n);
    let c = {
            type: e[u][1].type === "labelLink" ? "link" : "image",
            start: Object.assign({}, e[u][1].start),
            end: Object.assign({}, e[e.length - 1][1].end),
        },
        l = {
            type: "label",
            start: Object.assign({}, e[u][1].start),
            end: Object.assign({}, e[s][1].end),
        },
        f = {
            type: "labelText",
            start: Object.assign({}, e[u + r + 2][1].end),
            end: Object.assign({}, e[s - 2][1].start),
        };
    return (
        (o = [
            ["enter", c, t],
            ["enter", l, t],
        ]),
        (o = fe(o, e.slice(u + 1, u + r + 3))),
        (o = fe(o, [["enter", f, t]])),
        (o = fe(
            o,
            Gt(
                t.parser.constructs.insideSpan.null,
                e.slice(u + r + 4, s - 3),
                t
            )
        )),
        (o = fe(o, [["exit", f, t], e[s - 2], e[s - 1], ["exit", l, t]])),
        (o = fe(o, e.slice(s + 1))),
        (o = fe(o, [["exit", c, t]])),
        ge(e, u, e.length, o),
        e
    );
}
function of(e, t, n) {
    let r = this,
        i = r.events.length,
        u,
        s;
    for (; i--; )
        if (
            (r.events[i][1].type === "labelImage" ||
                r.events[i][1].type === "labelLink") &&
            !r.events[i][1]._balanced
        ) {
            u = r.events[i][1];
            break;
        }
    return o;
    function o(T) {
        return u
            ? u._inactive
                ? m(T)
                : ((s = r.parser.defined.includes(
                      Ue(r.sliceSerialize({ start: u.end, end: r.now() }))
                  )),
                  e.enter("labelEnd"),
                  e.enter("labelMarker"),
                  e.consume(T),
                  e.exit("labelMarker"),
                  e.exit("labelEnd"),
                  c)
            : n(T);
    }
    function c(T) {
        return T === 40
            ? e.attempt(nf, f, s ? f : m)(T)
            : T === 91
            ? e.attempt(rf, f, s ? l : m)(T)
            : s
            ? f(T)
            : m(T);
    }
    function l(T) {
        return e.attempt(uf, f, m)(T);
    }
    function f(T) {
        return t(T);
    }
    function m(T) {
        return (u._balanced = !0), n(T);
    }
}
function cf(e, t, n) {
    return r;
    function r(m) {
        return (
            e.enter("resource"),
            e.enter("resourceMarker"),
            e.consume(m),
            e.exit("resourceMarker"),
            i
        );
    }
    function i(m) {
        return ce(m) ? yt(e, u)(m) : u(m);
    }
    function u(m) {
        return m === 41
            ? f(m)
            : ar(
                  e,
                  s,
                  o,
                  "resourceDestination",
                  "resourceDestinationLiteral",
                  "resourceDestinationLiteralMarker",
                  "resourceDestinationRaw",
                  "resourceDestinationString",
                  32
              )(m);
    }
    function s(m) {
        return ce(m) ? yt(e, c)(m) : f(m);
    }
    function o(m) {
        return n(m);
    }
    function c(m) {
        return m === 34 || m === 39 || m === 40
            ? or(
                  e,
                  l,
                  n,
                  "resourceTitle",
                  "resourceTitleMarker",
                  "resourceTitleString"
              )(m)
            : f(m);
    }
    function l(m) {
        return ce(m) ? yt(e, f)(m) : f(m);
    }
    function f(m) {
        return m === 41
            ? (e.enter("resourceMarker"),
              e.consume(m),
              e.exit("resourceMarker"),
              e.exit("resource"),
              t)
            : n(m);
    }
}
function lf(e, t, n) {
    let r = this;
    return i;
    function i(o) {
        return sr.call(
            r,
            e,
            u,
            s,
            "reference",
            "referenceMarker",
            "referenceString"
        )(o);
    }
    function u(o) {
        return r.parser.defined.includes(
            Ue(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))
        )
            ? t(o)
            : n(o);
    }
    function s(o) {
        return n(o);
    }
}
function ff(e, t, n) {
    return r;
    function r(u) {
        return (
            e.enter("reference"),
            e.enter("referenceMarker"),
            e.consume(u),
            e.exit("referenceMarker"),
            i
        );
    }
    function i(u) {
        return u === 93
            ? (e.enter("referenceMarker"),
              e.consume(u),
              e.exit("referenceMarker"),
              e.exit("reference"),
              t)
            : n(u);
    }
}
var Ii = { name: "labelStartImage", tokenize: df, resolveAll: Dt.resolveAll };
function df(e, t, n) {
    let r = this;
    return i;
    function i(o) {
        return (
            e.enter("labelImage"),
            e.enter("labelImageMarker"),
            e.consume(o),
            e.exit("labelImageMarker"),
            u
        );
    }
    function u(o) {
        return o === 91
            ? (e.enter("labelMarker"),
              e.consume(o),
              e.exit("labelMarker"),
              e.exit("labelImage"),
              s)
            : n(o);
    }
    function s(o) {
        return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
            ? n(o)
            : t(o);
    }
}
var Ni = { name: "labelStartLink", tokenize: hf, resolveAll: Dt.resolveAll };
function hf(e, t, n) {
    let r = this;
    return i;
    function i(s) {
        return (
            e.enter("labelLink"),
            e.enter("labelMarker"),
            e.consume(s),
            e.exit("labelMarker"),
            e.exit("labelLink"),
            u
        );
    }
    function u(s) {
        return s === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
            ? n(s)
            : t(s);
    }
}
var Tn = { name: "lineEnding", tokenize: mf };
function mf(e, t) {
    return n;
    function n(r) {
        return (
            e.enter("lineEnding"),
            e.consume(r),
            e.exit("lineEnding"),
            Q(e, t, "linePrefix")
        );
    }
}
var Pt = { name: "thematicBreak", tokenize: pf };
function pf(e, t, n) {
    let r = 0,
        i;
    return u;
    function u(l) {
        return e.enter("thematicBreak"), s(l);
    }
    function s(l) {
        return (i = l), o(l);
    }
    function o(l) {
        return l === i
            ? (e.enter("thematicBreakSequence"), c(l))
            : r >= 3 && (l === null || B(l))
            ? (e.exit("thematicBreak"), t(l))
            : n(l);
    }
    function c(l) {
        return l === i
            ? (e.consume(l), r++, c)
            : (e.exit("thematicBreakSequence"),
              z(l) ? Q(e, o, "whitespace")(l) : o(l));
    }
}
var be = {
        name: "list",
        tokenize: gf,
        continuation: { tokenize: bf },
        exit: _f,
    },
    Ef = { tokenize: xf, partial: !0 },
    Tf = { tokenize: Af, partial: !0 };
function gf(e, t, n) {
    let r = this,
        i = r.events[r.events.length - 1],
        u =
            i && i[1].type === "linePrefix"
                ? i[2].sliceSerialize(i[1], !0).length
                : 0,
        s = 0;
    return o;
    function o(p) {
        let _ =
            r.containerState.type ||
            (p === 42 || p === 43 || p === 45
                ? "listUnordered"
                : "listOrdered");
        if (
            _ === "listUnordered"
                ? !r.containerState.marker || p === r.containerState.marker
                : dn(p)
        ) {
            if (
                (r.containerState.type ||
                    ((r.containerState.type = _),
                    e.enter(_, { _container: !0 })),
                _ === "listUnordered")
            )
                return (
                    e.enter("listItemPrefix"),
                    p === 42 || p === 45 ? e.check(Pt, n, l)(p) : l(p)
                );
            if (!r.interrupt || p === 49)
                return (
                    e.enter("listItemPrefix"), e.enter("listItemValue"), c(p)
                );
        }
        return n(p);
    }
    function c(p) {
        return dn(p) && ++s < 10
            ? (e.consume(p), c)
            : (!r.interrupt || s < 2) &&
              (r.containerState.marker
                  ? p === r.containerState.marker
                  : p === 41 || p === 46)
            ? (e.exit("listItemValue"), l(p))
            : n(p);
    }
    function l(p) {
        return (
            e.enter("listItemMarker"),
            e.consume(p),
            e.exit("listItemMarker"),
            (r.containerState.marker = r.containerState.marker || p),
            e.check(_t, r.interrupt ? n : f, e.attempt(Ef, T, m))
        );
    }
    function f(p) {
        return (r.containerState.initialBlankLine = !0), u++, T(p);
    }
    function m(p) {
        return z(p)
            ? (e.enter("listItemPrefixWhitespace"),
              e.consume(p),
              e.exit("listItemPrefixWhitespace"),
              T)
            : n(p);
    }
    function T(p) {
        return (
            (r.containerState.size =
                u + r.sliceSerialize(e.exit("listItemPrefix"), !0).length),
            t(p)
        );
    }
}
function bf(e, t, n) {
    let r = this;
    return (r.containerState._closeFlow = void 0), e.check(_t, i, u);
    function i(o) {
        return (
            (r.containerState.furtherBlankLines =
                r.containerState.furtherBlankLines ||
                r.containerState.initialBlankLine),
            Q(e, t, "listItemIndent", r.containerState.size + 1)(o)
        );
    }
    function u(o) {
        return r.containerState.furtherBlankLines || !z(o)
            ? ((r.containerState.furtherBlankLines = void 0),
              (r.containerState.initialBlankLine = void 0),
              s(o))
            : ((r.containerState.furtherBlankLines = void 0),
              (r.containerState.initialBlankLine = void 0),
              e.attempt(Tf, t, s)(o));
    }
    function s(o) {
        return (
            (r.containerState._closeFlow = !0),
            (r.interrupt = void 0),
            Q(
                e,
                e.attempt(be, t, n),
                "linePrefix",
                r.parser.constructs.disable.null.includes("codeIndented")
                    ? void 0
                    : 4
            )(o)
        );
    }
}
function Af(e, t, n) {
    let r = this;
    return Q(e, i, "listItemIndent", r.containerState.size + 1);
    function i(u) {
        let s = r.events[r.events.length - 1];
        return s &&
            s[1].type === "listItemIndent" &&
            s[2].sliceSerialize(s[1], !0).length === r.containerState.size
            ? t(u)
            : n(u);
    }
}
function _f(e) {
    e.exit(this.containerState.type);
}
function xf(e, t, n) {
    let r = this;
    return Q(
        e,
        i,
        "listItemPrefixWhitespace",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5
    );
    function i(u) {
        let s = r.events[r.events.length - 1];
        return !z(u) && s && s[1].type === "listItemPrefixWhitespace"
            ? t(u)
            : n(u);
    }
}
var cr = { name: "setextUnderline", tokenize: If, resolveTo: Cf };
function Cf(e, t) {
    let n = e.length,
        r,
        i,
        u;
    for (; n--; )
        if (e[n][0] === "enter") {
            if (e[n][1].type === "content") {
                r = n;
                break;
            }
            e[n][1].type === "paragraph" && (i = n);
        } else
            e[n][1].type === "content" && e.splice(n, 1),
                !u && e[n][1].type === "definition" && (u = n);
    let s = {
        type: "setextHeading",
        start: Object.assign({}, e[i][1].start),
        end: Object.assign({}, e[e.length - 1][1].end),
    };
    return (
        (e[i][1].type = "setextHeadingText"),
        u
            ? (e.splice(i, 0, ["enter", s, t]),
              e.splice(u + 1, 0, ["exit", e[r][1], t]),
              (e[r][1].end = Object.assign({}, e[u][1].end)))
            : (e[r][1] = s),
        e.push(["exit", s, t]),
        e
    );
}
function If(e, t, n) {
    let r = this,
        i;
    return u;
    function u(l) {
        let f = r.events.length,
            m;
        for (; f--; )
            if (
                r.events[f][1].type !== "lineEnding" &&
                r.events[f][1].type !== "linePrefix" &&
                r.events[f][1].type !== "content"
            ) {
                m = r.events[f][1].type === "paragraph";
                break;
            }
        return !r.parser.lazy[r.now().line] && (r.interrupt || m)
            ? (e.enter("setextHeadingLine"), (i = l), s(l))
            : n(l);
    }
    function s(l) {
        return e.enter("setextHeadingLineSequence"), o(l);
    }
    function o(l) {
        return l === i
            ? (e.consume(l), o)
            : (e.exit("setextHeadingLineSequence"),
              z(l) ? Q(e, c, "lineSuffix")(l) : c(l));
    }
    function c(l) {
        return l === null || B(l) ? (e.exit("setextHeadingLine"), t(l)) : n(l);
    }
}
var Ha = { tokenize: Nf };
function Nf(e) {
    let t = this,
        n = e.attempt(
            _t,
            r,
            e.attempt(
                this.parser.constructs.flowInitial,
                i,
                Q(
                    e,
                    e.attempt(this.parser.constructs.flow, i, e.attempt(Ti, i)),
                    "linePrefix"
                )
            )
        );
    return n;
    function r(u) {
        if (u === null) {
            e.consume(u);
            return;
        }
        return (
            e.enter("lineEndingBlank"),
            e.consume(u),
            e.exit("lineEndingBlank"),
            (t.currentConstruct = void 0),
            n
        );
    }
    function i(u) {
        if (u === null) {
            e.consume(u);
            return;
        }
        return (
            e.enter("lineEnding"),
            e.consume(u),
            e.exit("lineEnding"),
            (t.currentConstruct = void 0),
            n
        );
    }
}
var Ua = { resolveAll: qa() },
    va = za("string"),
    Ya = za("text");
function za(e) {
    return { tokenize: t, resolveAll: qa(e === "text" ? Sf : void 0) };
    function t(n) {
        let r = this,
            i = this.parser.constructs[e],
            u = n.attempt(i, s, o);
        return s;
        function s(f) {
            return l(f) ? u(f) : o(f);
        }
        function o(f) {
            if (f === null) {
                n.consume(f);
                return;
            }
            return n.enter("data"), n.consume(f), c;
        }
        function c(f) {
            return l(f) ? (n.exit("data"), u(f)) : (n.consume(f), c);
        }
        function l(f) {
            if (f === null) return !0;
            let m = i[f],
                T = -1;
            if (m)
                for (; ++T < m.length; ) {
                    let p = m[T];
                    if (!p.previous || p.previous.call(r, r.previous))
                        return !0;
                }
            return !1;
        }
    }
}
function qa(e) {
    return t;
    function t(n, r) {
        let i = -1,
            u;
        for (; ++i <= n.length; )
            u === void 0
                ? n[i] && n[i][1].type === "data" && ((u = i), i++)
                : (!n[i] || n[i][1].type !== "data") &&
                  (i !== u + 2 &&
                      ((n[u][1].end = n[i - 1][1].end),
                      n.splice(u + 2, i - u - 2),
                      (i = u + 2)),
                  (u = void 0));
        return e ? e(n, r) : n;
    }
}
function Sf(e, t) {
    let n = 0;
    for (; ++n <= e.length; )
        if (
            (n === e.length || e[n][1].type === "lineEnding") &&
            e[n - 1][1].type === "data"
        ) {
            let r = e[n - 1][1],
                i = t.sliceStream(r),
                u = i.length,
                s = -1,
                o = 0,
                c;
            for (; u--; ) {
                let l = i[u];
                if (typeof l == "string") {
                    for (s = l.length; l.charCodeAt(s - 1) === 32; ) o++, s--;
                    if (s) break;
                    s = -1;
                } else if (l === -2) (c = !0), o++;
                else if (l !== -1) {
                    u++;
                    break;
                }
            }
            if (o) {
                let l = {
                    type:
                        n === e.length || c || o < 2
                            ? "lineSuffix"
                            : "hardBreakTrailing",
                    start: {
                        line: r.end.line,
                        column: r.end.column - o,
                        offset: r.end.offset - o,
                        _index: r.start._index + u,
                        _bufferIndex: u ? s : r.start._bufferIndex + s,
                    },
                    end: Object.assign({}, r.end),
                };
                (r.end = Object.assign({}, l.start)),
                    r.start.offset === r.end.offset
                        ? Object.assign(r, l)
                        : (e.splice(n, 0, ["enter", l, t], ["exit", l, t]),
                          (n += 2));
            }
            n++;
        }
    return e;
}
function Va(e, t, n) {
    let r = Object.assign(
            n ? Object.assign({}, n) : { line: 1, column: 1, offset: 0 },
            { _index: 0, _bufferIndex: -1 }
        ),
        i = {},
        u = [],
        s = [],
        o = [],
        c = !0,
        l = {
            consume: v,
            enter: U,
            exit: L,
            attempt: S(G),
            check: S(ne),
            interrupt: S(ne, { interrupt: !0 }),
        },
        f = {
            previous: null,
            code: null,
            containerState: {},
            events: [],
            parser: e,
            sliceStream: C,
            sliceSerialize: _,
            now: k,
            defineSkip: I,
            write: p,
        },
        m = t.tokenize.call(f, l),
        T;
    return t.resolveAll && u.push(t), f;
    function p(F) {
        return (
            (s = fe(s, F)),
            O(),
            s[s.length - 1] !== null
                ? []
                : (j(t, 0), (f.events = Gt(u, f.events, f)), f.events)
        );
    }
    function _(F, q) {
        return kf(C(F), q);
    }
    function C(F) {
        return Rf(s, F);
    }
    function k() {
        let { line: F, column: q, offset: X, _index: ie, _bufferIndex: oe } = r;
        return { line: F, column: q, offset: X, _index: ie, _bufferIndex: oe };
    }
    function I(F) {
        (i[F.line] = F.column), Y();
    }
    function O() {
        let F;
        for (; r._index < s.length; ) {
            let q = s[r._index];
            if (typeof q == "string")
                for (
                    F = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
                    r._index === F && r._bufferIndex < q.length;

                )
                    P(q.charCodeAt(r._bufferIndex));
            else P(q);
        }
    }
    function P(F) {
        (c = void 0), (T = F), (m = m(F));
    }
    function v(F) {
        B(F)
            ? (r.line++, (r.column = 1), (r.offset += F === -3 ? 2 : 1), Y())
            : F !== -1 && (r.column++, r.offset++),
            r._bufferIndex < 0
                ? r._index++
                : (r._bufferIndex++,
                  r._bufferIndex === s[r._index].length &&
                      ((r._bufferIndex = -1), r._index++)),
            (f.previous = F),
            (c = !0);
    }
    function U(F, q) {
        let X = q || {};
        return (
            (X.type = F),
            (X.start = k()),
            f.events.push(["enter", X, f]),
            o.push(X),
            X
        );
    }
    function L(F) {
        let q = o.pop();
        return (q.end = k()), f.events.push(["exit", q, f]), q;
    }
    function G(F, q) {
        j(F, q.from);
    }
    function ne(F, q) {
        q.restore();
    }
    function S(F, q) {
        return X;
        function X(ie, oe, Oe) {
            let Fe, g, Se, We;
            return Array.isArray(ie)
                ? xe(ie)
                : "tokenize" in ie
                ? xe([ie])
                : b(ie);
            function b(de) {
                return Rt;
                function Rt(Qe) {
                    let st = Qe !== null && de[Qe],
                        Et = Qe !== null && de.null,
                        Vt = [
                            ...(Array.isArray(st) ? st : st ? [st] : []),
                            ...(Array.isArray(Et) ? Et : Et ? [Et] : []),
                        ];
                    return xe(Vt)(Qe);
                }
            }
            function xe(de) {
                return (Fe = de), (g = 0), de.length === 0 ? Oe : at(de[g]);
            }
            function at(de) {
                return Rt;
                function Rt(Qe) {
                    return (
                        (We = Z()),
                        (Se = de),
                        de.partial || (f.currentConstruct = de),
                        de.name &&
                        f.parser.constructs.disable.null.includes(de.name)
                            ? qt(Qe)
                            : de.tokenize.call(
                                  q ? Object.assign(Object.create(f), q) : f,
                                  l,
                                  sn,
                                  qt
                              )(Qe)
                    );
                }
            }
            function sn(de) {
                return (c = !0), F(Se, We), oe;
            }
            function qt(de) {
                return (c = !0), We.restore(), ++g < Fe.length ? at(Fe[g]) : Oe;
            }
        }
    }
    function j(F, q) {
        F.resolveAll && !u.includes(F) && u.push(F),
            F.resolve &&
                ge(
                    f.events,
                    q,
                    f.events.length - q,
                    F.resolve(f.events.slice(q), f)
                ),
            F.resolveTo && (f.events = F.resolveTo(f.events, f));
    }
    function Z() {
        let F = k(),
            q = f.previous,
            X = f.currentConstruct,
            ie = f.events.length,
            oe = Array.from(o);
        return { restore: Oe, from: ie };
        function Oe() {
            (r = F),
                (f.previous = q),
                (f.currentConstruct = X),
                (f.events.length = ie),
                (o = oe),
                Y();
        }
    }
    function Y() {
        r.line in i &&
            r.column < 2 &&
            ((r.column = i[r.line]), (r.offset += i[r.line] - 1));
    }
}
function Rf(e, t) {
    let n = t.start._index,
        r = t.start._bufferIndex,
        i = t.end._index,
        u = t.end._bufferIndex,
        s;
    if (n === i) s = [e[n].slice(r, u)];
    else {
        if (((s = e.slice(n, i)), r > -1)) {
            let o = s[0];
            typeof o == "string" ? (s[0] = o.slice(r)) : s.shift();
        }
        u > 0 && s.push(e[i].slice(0, u));
    }
    return s;
}
function kf(e, t) {
    let n = -1,
        r = [],
        i;
    for (; ++n < e.length; ) {
        let u = e[n],
            s;
        if (typeof u == "string") s = u;
        else
            switch (u) {
                case -5: {
                    s = "\r";
                    break;
                }
                case -4: {
                    s = `
`;
                    break;
                }
                case -3: {
                    s = `\r
`;
                    break;
                }
                case -2: {
                    s = t ? " " : "	";
                    break;
                }
                case -1: {
                    if (!t && i) continue;
                    s = " ";
                    break;
                }
                default:
                    s = String.fromCharCode(u);
            }
        (i = u === -2), r.push(s);
    }
    return r.join("");
}
var Si = {};
jn(Si, {
    attentionMarkers: () => Bf,
    contentInitial: () => Of,
    disable: () => Ff,
    document: () => Lf,
    flow: () => Df,
    flowInitial: () => yf,
    insideSpan: () => Mf,
    string: () => Pf,
    text: () => wf,
});
var Lf = {
        42: be,
        43: be,
        45: be,
        48: be,
        49: be,
        50: be,
        51: be,
        52: be,
        53: be,
        54: be,
        55: be,
        56: be,
        57: be,
        62: er,
    },
    Of = { 91: gi },
    yf = { [-2]: pn, [-1]: pn, 32: pn },
    Df = {
        35: Ai,
        42: Pt,
        45: [cr, Pt],
        60: xi,
        61: cr,
        95: Pt,
        96: rr,
        126: rr,
    },
    Pf = { 38: nr, 92: tr },
    wf = {
        [-5]: Tn,
        [-4]: Tn,
        [-3]: Tn,
        33: Ii,
        38: nr,
        42: mn,
        60: [pi, Ci],
        91: Ni,
        92: [bi, tr],
        93: Dt,
        95: mn,
        96: Ei,
    },
    Mf = { null: [mn, Ua] },
    Bf = { null: [42, 95] },
    Ff = { null: [] };
function gn(e) {
    let n = xa([Si, ...((e || {}).extensions || [])]),
        r = {
            defined: [],
            lazy: {},
            constructs: n,
            content: i(Da),
            document: i(wa),
            flow: i(Ha),
            string: i(va),
            text: i(Ya),
        };
    return r;
    function i(u) {
        return s;
        function s(o) {
            return Va(r, u, o);
        }
    }
}
function bn(e) {
    for (; !ur(e); );
    return e;
}
var Wa = /[\0\t\n\r]/g;
function An() {
    let e = 1,
        t = "",
        n = !0,
        r;
    return i;
    function i(u, s, o) {
        let c = [],
            l,
            f,
            m,
            T,
            p;
        for (
            u =
                t +
                (typeof u == "string"
                    ? u.toString()
                    : new TextDecoder(s || void 0).decode(u)),
                m = 0,
                t = "",
                n && (u.charCodeAt(0) === 65279 && m++, (n = void 0));
            m < u.length;

        ) {
            if (
                ((Wa.lastIndex = m),
                (l = Wa.exec(u)),
                (T = l && l.index !== void 0 ? l.index : u.length),
                (p = u.charCodeAt(T)),
                !l)
            ) {
                t = u.slice(m);
                break;
            }
            if (p === 10 && m === T && r) c.push(-3), (r = void 0);
            else
                switch (
                    (r && (c.push(-5), (r = void 0)),
                    m < T && (c.push(u.slice(m, T)), (e += T - m)),
                    p)
                ) {
                    case 0: {
                        c.push(65533), e++;
                        break;
                    }
                    case 9: {
                        for (f = Math.ceil(e / 4) * 4, c.push(-2); e++ < f; )
                            c.push(-1);
                        break;
                    }
                    case 10: {
                        c.push(-4), (e = 1);
                        break;
                    }
                    default:
                        (r = !0), (e = 1);
                }
            m = T + 1;
        }
        return o && (r && c.push(-5), t && c.push(t), c.push(null)), c;
    }
}
function Qa(e, t, n) {
    return (
        typeof t != "string" && ((n = t), (t = void 0)),
        ya(n)(bn(gn(n).document().write(An()(e, t, !0))))
    );
}
var Hf = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Ga(e) {
    return e.replace(Hf, Uf);
}
function Uf(e, t, n) {
    if (t) return t;
    if (n.charCodeAt(0) === 35) {
        let i = n.charCodeAt(1),
            u = i === 120 || i === 88;
        return Qt(n.slice(u ? 2 : 1), u ? 16 : 10);
    }
    return bt(n) || e;
}
var ja = {}.hasOwnProperty;
function _n(e, t, n) {
    return (
        typeof t != "string" && ((n = t), (t = void 0)),
        vf(n)(bn(gn(n).document().write(An()(e, t, !0))))
    );
}
function vf(e) {
    let t = {
        transforms: [],
        canContainEols: [
            "emphasis",
            "fragment",
            "heading",
            "paragraph",
            "strong",
        ],
        enter: {
            autolink: u(Gn),
            autolinkProtocol: S,
            autolinkEmail: S,
            atxHeading: u(Vn),
            blockQuote: u(Qe),
            characterEscape: S,
            characterReference: S,
            codeFenced: u(st),
            codeFencedFenceInfo: s,
            codeFencedFenceMeta: s,
            codeIndented: u(st, s),
            codeText: u(Et, s),
            codeTextData: S,
            data: S,
            codeFlowValue: S,
            definition: u(Vt),
            definitionDestinationString: s,
            definitionLabelString: s,
            definitionTitleString: s,
            emphasis: u(jr),
            hardBreakEscape: u(Wn),
            hardBreakTrailing: u(Wn),
            htmlFlow: u(Qn, s),
            htmlFlowData: S,
            htmlText: u(Qn, s),
            htmlTextData: S,
            image: u(Kr),
            label: s,
            link: u(Gn),
            listItem: u($r),
            listItemValue: T,
            listOrdered: u(Xn, m),
            listUnordered: u(Xn),
            paragraph: u(Jr),
            reference: b,
            referenceString: s,
            resourceDestinationString: s,
            resourceTitleString: s,
            setextHeading: u(Vn),
            strong: u(Zr),
            thematicBreak: u(ti),
        },
        exit: {
            atxHeading: c(),
            atxHeadingSequence: U,
            autolink: c(),
            autolinkEmail: Rt,
            autolinkProtocol: de,
            blockQuote: c(),
            characterEscapeValue: j,
            characterReferenceMarkerHexadecimal: at,
            characterReferenceMarkerNumeric: at,
            characterReferenceValue: sn,
            characterReference: qt,
            codeFenced: c(k),
            codeFencedFence: C,
            codeFencedFenceInfo: p,
            codeFencedFenceMeta: _,
            codeFlowValue: j,
            codeIndented: c(I),
            codeText: c(X),
            codeTextData: j,
            data: j,
            definition: c(),
            definitionDestinationString: v,
            definitionLabelString: O,
            definitionTitleString: P,
            emphasis: c(),
            hardBreakEscape: c(Y),
            hardBreakTrailing: c(Y),
            htmlFlow: c(F),
            htmlFlowData: j,
            htmlText: c(q),
            htmlTextData: j,
            image: c(oe),
            label: Fe,
            labelText: Oe,
            lineEnding: Z,
            link: c(ie),
            listItem: c(),
            listOrdered: c(),
            listUnordered: c(),
            paragraph: c(),
            referenceString: xe,
            resourceDestinationString: g,
            resourceTitleString: Se,
            resource: We,
            setextHeading: c(ne),
            setextHeadingLineSequence: G,
            setextHeadingText: L,
            strong: c(),
            thematicBreak: c(),
        },
    };
    Ka(t, (e || {}).mdastExtensions || []);
    let n = {};
    return r;
    function r(R) {
        let w = { type: "root", children: [] },
            V = {
                stack: [w],
                tokenStack: [],
                config: t,
                enter: o,
                exit: l,
                buffer: s,
                resume: f,
                data: n,
            },
            K = [],
            ee = -1;
        for (; ++ee < R.length; )
            if (
                R[ee][1].type === "listOrdered" ||
                R[ee][1].type === "listUnordered"
            )
                if (R[ee][0] === "enter") K.push(ee);
                else {
                    let ye = K.pop();
                    ee = i(R, ye, ee);
                }
        for (ee = -1; ++ee < R.length; ) {
            let ye = t[R[ee][0]];
            ja.call(ye, R[ee][1].type) &&
                ye[R[ee][1].type].call(
                    Object.assign(
                        { sliceSerialize: R[ee][2].sliceSerialize },
                        V
                    ),
                    R[ee][1]
                );
        }
        if (V.tokenStack.length > 0) {
            let ye = V.tokenStack[V.tokenStack.length - 1];
            (ye[1] || Xa).call(V, void 0, ye[0]);
        }
        for (
            w.position = {
                start: xt(
                    R.length > 0
                        ? R[0][1].start
                        : { line: 1, column: 1, offset: 0 }
                ),
                end: xt(
                    R.length > 0
                        ? R[R.length - 2][1].end
                        : { line: 1, column: 1, offset: 0 }
                ),
            },
                ee = -1;
            ++ee < t.transforms.length;

        )
            w = t.transforms[ee](w) || w;
        return w;
    }
    function i(R, w, V) {
        let K = w - 1,
            ee = -1,
            ye = !1,
            Ze,
            He,
            kt,
            Lt;
        for (; ++K <= V; ) {
            let Ce = R[K];
            switch (Ce[1].type) {
                case "listUnordered":
                case "listOrdered":
                case "blockQuote": {
                    Ce[0] === "enter" ? ee++ : ee--, (Lt = void 0);
                    break;
                }
                case "lineEndingBlank": {
                    Ce[0] === "enter" &&
                        (Ze && !Lt && !ee && !kt && (kt = K), (Lt = void 0));
                    break;
                }
                case "linePrefix":
                case "listItemValue":
                case "listItemMarker":
                case "listItemPrefix":
                case "listItemPrefixWhitespace":
                    break;
                default:
                    Lt = void 0;
            }
            if (
                (!ee && Ce[0] === "enter" && Ce[1].type === "listItemPrefix") ||
                (ee === -1 &&
                    Ce[0] === "exit" &&
                    (Ce[1].type === "listUnordered" ||
                        Ce[1].type === "listOrdered"))
            ) {
                if (Ze) {
                    let Tt = K;
                    for (He = void 0; Tt--; ) {
                        let Ge = R[Tt];
                        if (
                            Ge[1].type === "lineEnding" ||
                            Ge[1].type === "lineEndingBlank"
                        ) {
                            if (Ge[0] === "exit") continue;
                            He &&
                                ((R[He][1].type = "lineEndingBlank"),
                                (ye = !0)),
                                (Ge[1].type = "lineEnding"),
                                (He = Tt);
                        } else if (
                            !(
                                Ge[1].type === "linePrefix" ||
                                Ge[1].type === "blockQuotePrefix" ||
                                Ge[1].type === "blockQuotePrefixWhitespace" ||
                                Ge[1].type === "blockQuoteMarker" ||
                                Ge[1].type === "listItemIndent"
                            )
                        )
                            break;
                    }
                    kt && (!He || kt < He) && (Ze._spread = !0),
                        (Ze.end = Object.assign(
                            {},
                            He ? R[He][1].start : Ce[1].end
                        )),
                        R.splice(He || K, 0, ["exit", Ze, Ce[2]]),
                        K++,
                        V++;
                }
                if (Ce[1].type === "listItemPrefix") {
                    let Tt = {
                        type: "listItem",
                        _spread: !1,
                        start: Object.assign({}, Ce[1].start),
                        end: void 0,
                    };
                    (Ze = Tt),
                        R.splice(K, 0, ["enter", Tt, Ce[2]]),
                        K++,
                        V++,
                        (kt = void 0),
                        (Lt = !0);
                }
            }
        }
        return (R[w][1]._spread = ye), V;
    }
    function u(R, w) {
        return V;
        function V(K) {
            o.call(this, R(K), K), w && w.call(this, K);
        }
    }
    function s() {
        this.stack.push({ type: "fragment", children: [] });
    }
    function o(R, w, V) {
        this.stack[this.stack.length - 1].children.push(R),
            this.stack.push(R),
            this.tokenStack.push([w, V]),
            (R.position = { start: xt(w.start), end: void 0 });
    }
    function c(R) {
        return w;
        function w(V) {
            R && R.call(this, V), l.call(this, V);
        }
    }
    function l(R, w) {
        let V = this.stack.pop(),
            K = this.tokenStack.pop();
        if (K)
            K[0].type !== R.type &&
                (w ? w.call(this, R, K[0]) : (K[1] || Xa).call(this, R, K[0]));
        else
            throw new Error(
                "Cannot close `" +
                    R.type +
                    "` (" +
                    gt({ start: R.start, end: R.end }) +
                    "): it\u2019s not open"
            );
        V.position.end = xt(R.end);
    }
    function f() {
        return Ot(this.stack.pop());
    }
    function m() {
        this.data.expectingFirstListItemValue = !0;
    }
    function T(R) {
        if (this.data.expectingFirstListItemValue) {
            let w = this.stack[this.stack.length - 2];
            (w.start = Number.parseInt(this.sliceSerialize(R), 10)),
                (this.data.expectingFirstListItemValue = void 0);
        }
    }
    function p() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.lang = R;
    }
    function _() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.meta = R;
    }
    function C() {
        this.data.flowCodeInside ||
            (this.buffer(), (this.data.flowCodeInside = !0));
    }
    function k() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        (w.value = R.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")),
            (this.data.flowCodeInside = void 0);
    }
    function I() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.value = R.replace(/(\r?\n|\r)$/g, "");
    }
    function O(R) {
        let w = this.resume(),
            V = this.stack[this.stack.length - 1];
        (V.label = w),
            (V.identifier = Ue(this.sliceSerialize(R)).toLowerCase());
    }
    function P() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.title = R;
    }
    function v() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.url = R;
    }
    function U(R) {
        let w = this.stack[this.stack.length - 1];
        if (!w.depth) {
            let V = this.sliceSerialize(R).length;
            w.depth = V;
        }
    }
    function L() {
        this.data.setextHeadingSlurpLineEnding = !0;
    }
    function G(R) {
        let w = this.stack[this.stack.length - 1];
        w.depth = this.sliceSerialize(R).codePointAt(0) === 61 ? 1 : 2;
    }
    function ne() {
        this.data.setextHeadingSlurpLineEnding = void 0;
    }
    function S(R) {
        let V = this.stack[this.stack.length - 1].children,
            K = V[V.length - 1];
        (!K || K.type !== "text") &&
            ((K = ei()),
            (K.position = { start: xt(R.start), end: void 0 }),
            V.push(K)),
            this.stack.push(K);
    }
    function j(R) {
        let w = this.stack.pop();
        (w.value += this.sliceSerialize(R)), (w.position.end = xt(R.end));
    }
    function Z(R) {
        let w = this.stack[this.stack.length - 1];
        if (this.data.atHardBreak) {
            let V = w.children[w.children.length - 1];
            (V.position.end = xt(R.end)), (this.data.atHardBreak = void 0);
            return;
        }
        !this.data.setextHeadingSlurpLineEnding &&
            t.canContainEols.includes(w.type) &&
            (S.call(this, R), j.call(this, R));
    }
    function Y() {
        this.data.atHardBreak = !0;
    }
    function F() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.value = R;
    }
    function q() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.value = R;
    }
    function X() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.value = R;
    }
    function ie() {
        let R = this.stack[this.stack.length - 1];
        if (this.data.inReference) {
            let w = this.data.referenceType || "shortcut";
            (R.type += "Reference"),
                (R.referenceType = w),
                delete R.url,
                delete R.title;
        } else delete R.identifier, delete R.label;
        this.data.referenceType = void 0;
    }
    function oe() {
        let R = this.stack[this.stack.length - 1];
        if (this.data.inReference) {
            let w = this.data.referenceType || "shortcut";
            (R.type += "Reference"),
                (R.referenceType = w),
                delete R.url,
                delete R.title;
        } else delete R.identifier, delete R.label;
        this.data.referenceType = void 0;
    }
    function Oe(R) {
        let w = this.sliceSerialize(R),
            V = this.stack[this.stack.length - 2];
        (V.label = Ga(w)), (V.identifier = Ue(w).toLowerCase());
    }
    function Fe() {
        let R = this.stack[this.stack.length - 1],
            w = this.resume(),
            V = this.stack[this.stack.length - 1];
        if (((this.data.inReference = !0), V.type === "link")) {
            let K = R.children;
            V.children = K;
        } else V.alt = w;
    }
    function g() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.url = R;
    }
    function Se() {
        let R = this.resume(),
            w = this.stack[this.stack.length - 1];
        w.title = R;
    }
    function We() {
        this.data.inReference = void 0;
    }
    function b() {
        this.data.referenceType = "collapsed";
    }
    function xe(R) {
        let w = this.resume(),
            V = this.stack[this.stack.length - 1];
        (V.label = w),
            (V.identifier = Ue(this.sliceSerialize(R)).toLowerCase()),
            (this.data.referenceType = "full");
    }
    function at(R) {
        this.data.characterReferenceType = R.type;
    }
    function sn(R) {
        let w = this.sliceSerialize(R),
            V = this.data.characterReferenceType,
            K;
        V
            ? ((K = Qt(w, V === "characterReferenceMarkerNumeric" ? 10 : 16)),
              (this.data.characterReferenceType = void 0))
            : (K = bt(w));
        let ee = this.stack[this.stack.length - 1];
        ee.value += K;
    }
    function qt(R) {
        let w = this.stack.pop();
        w.position.end = xt(R.end);
    }
    function de(R) {
        j.call(this, R);
        let w = this.stack[this.stack.length - 1];
        w.url = this.sliceSerialize(R);
    }
    function Rt(R) {
        j.call(this, R);
        let w = this.stack[this.stack.length - 1];
        w.url = "mailto:" + this.sliceSerialize(R);
    }
    function Qe() {
        return { type: "blockquote", children: [] };
    }
    function st() {
        return { type: "code", lang: null, meta: null, value: "" };
    }
    function Et() {
        return { type: "inlineCode", value: "" };
    }
    function Vt() {
        return {
            type: "definition",
            identifier: "",
            label: null,
            title: null,
            url: "",
        };
    }
    function jr() {
        return { type: "emphasis", children: [] };
    }
    function Vn() {
        return { type: "heading", depth: 0, children: [] };
    }
    function Wn() {
        return { type: "break" };
    }
    function Qn() {
        return { type: "html", value: "" };
    }
    function Kr() {
        return { type: "image", title: null, url: "", alt: null };
    }
    function Gn() {
        return { type: "link", title: null, url: "", children: [] };
    }
    function Xn(R) {
        return {
            type: "list",
            ordered: R.type === "listOrdered",
            start: null,
            spread: R._spread,
            children: [],
        };
    }
    function $r(R) {
        return {
            type: "listItem",
            spread: R._spread,
            checked: null,
            children: [],
        };
    }
    function Jr() {
        return { type: "paragraph", children: [] };
    }
    function Zr() {
        return { type: "strong", children: [] };
    }
    function ei() {
        return { type: "text", value: "" };
    }
    function ti() {
        return { type: "thematicBreak" };
    }
}
function xt(e) {
    return { line: e.line, column: e.column, offset: e.offset };
}
function Ka(e, t) {
    let n = -1;
    for (; ++n < t.length; ) {
        let r = t[n];
        Array.isArray(r) ? Ka(e, r) : Yf(e, r);
    }
}
function Yf(e, t) {
    let n;
    for (n in t)
        if (ja.call(t, n))
            switch (n) {
                case "canContainEols": {
                    let r = t[n];
                    r && e[n].push(...r);
                    break;
                }
                case "transforms": {
                    let r = t[n];
                    r && e[n].push(...r);
                    break;
                }
                case "enter":
                case "exit": {
                    let r = t[n];
                    r && Object.assign(e[n], r);
                    break;
                }
            }
}
function Xa(e, t) {
    throw e
        ? new Error(
              "Cannot close `" +
                  e.type +
                  "` (" +
                  gt({ start: e.start, end: e.end }) +
                  "): a different token (`" +
                  t.type +
                  "`, " +
                  gt({ start: t.start, end: t.end }) +
                  ") is open"
          )
        : new Error(
              "Cannot close document, a token (`" +
                  t.type +
                  "`, " +
                  gt({ start: t.start, end: t.end }) +
                  ") is still open"
          );
}
function Ri(e) {
    let t = this;
    t.parser = n;
    function n(r) {
        return _n(r, {
            ...t.data("settings"),
            ...e,
            extensions: t.data("micromarkExtensions") || [],
            mdastExtensions: t.data("fromMarkdownExtensions") || [],
        });
    }
}
var ke = "gridTable",
    we = "gtHeader",
    Ie = "gtBody",
    Me = "gtFooter",
    ve = "gtRow",
    ae = "gtCell",
    nt = "gtRowLine",
    wt = "gtGridDivider";
var J = {
    carriageReturn: -5,
    lineFeed: -4,
    carriageReturnLineFeed: -3,
    horizontalTab: -2,
    virtualSpace: -1,
    eof: null,
    nul: 0,
    soh: 1,
    stx: 2,
    etx: 3,
    eot: 4,
    enq: 5,
    ack: 6,
    bel: 7,
    bs: 8,
    ht: 9,
    lf: 10,
    vt: 11,
    ff: 12,
    cr: 13,
    so: 14,
    si: 15,
    dle: 16,
    dc1: 17,
    dc2: 18,
    dc3: 19,
    dc4: 20,
    nak: 21,
    syn: 22,
    etb: 23,
    can: 24,
    em: 25,
    sub: 26,
    esc: 27,
    fs: 28,
    gs: 29,
    rs: 30,
    us: 31,
    space: 32,
    exclamationMark: 33,
    quotationMark: 34,
    numberSign: 35,
    dollarSign: 36,
    percentSign: 37,
    ampersand: 38,
    apostrophe: 39,
    leftParenthesis: 40,
    rightParenthesis: 41,
    asterisk: 42,
    plusSign: 43,
    comma: 44,
    dash: 45,
    dot: 46,
    slash: 47,
    digit0: 48,
    digit1: 49,
    digit2: 50,
    digit3: 51,
    digit4: 52,
    digit5: 53,
    digit6: 54,
    digit7: 55,
    digit8: 56,
    digit9: 57,
    colon: 58,
    semicolon: 59,
    lessThan: 60,
    equalsTo: 61,
    greaterThan: 62,
    questionMark: 63,
    atSign: 64,
    uppercaseA: 65,
    uppercaseB: 66,
    uppercaseC: 67,
    uppercaseD: 68,
    uppercaseE: 69,
    uppercaseF: 70,
    uppercaseG: 71,
    uppercaseH: 72,
    uppercaseI: 73,
    uppercaseJ: 74,
    uppercaseK: 75,
    uppercaseL: 76,
    uppercaseM: 77,
    uppercaseN: 78,
    uppercaseO: 79,
    uppercaseP: 80,
    uppercaseQ: 81,
    uppercaseR: 82,
    uppercaseS: 83,
    uppercaseT: 84,
    uppercaseU: 85,
    uppercaseV: 86,
    uppercaseW: 87,
    uppercaseX: 88,
    uppercaseY: 89,
    uppercaseZ: 90,
    leftSquareBracket: 91,
    backslash: 92,
    rightSquareBracket: 93,
    caret: 94,
    underscore: 95,
    graveAccent: 96,
    lowercaseA: 97,
    lowercaseB: 98,
    lowercaseC: 99,
    lowercaseD: 100,
    lowercaseE: 101,
    lowercaseF: 102,
    lowercaseG: 103,
    lowercaseH: 104,
    lowercaseI: 105,
    lowercaseJ: 106,
    lowercaseK: 107,
    lowercaseL: 108,
    lowercaseM: 109,
    lowercaseN: 110,
    lowercaseO: 111,
    lowercaseP: 112,
    lowercaseQ: 113,
    lowercaseR: 114,
    lowercaseS: 115,
    lowercaseT: 116,
    lowercaseU: 117,
    lowercaseV: 118,
    lowercaseW: 119,
    lowercaseX: 120,
    lowercaseY: 121,
    lowercaseZ: 122,
    leftCurlyBrace: 123,
    verticalBar: 124,
    rightCurlyBrace: 125,
    tilde: 126,
    del: 127,
    byteOrderMarker: 65279,
    replacementCharacter: 65533,
};
var Xt = {
    data: "data",
    whitespace: "whitespace",
    lineEnding: "lineEnding",
    lineEndingBlank: "lineEndingBlank",
    linePrefix: "linePrefix",
    lineSuffix: "lineSuffix",
    atxHeading: "atxHeading",
    atxHeadingSequence: "atxHeadingSequence",
    atxHeadingText: "atxHeadingText",
    autolink: "autolink",
    autolinkEmail: "autolinkEmail",
    autolinkMarker: "autolinkMarker",
    autolinkProtocol: "autolinkProtocol",
    characterEscape: "characterEscape",
    characterEscapeValue: "characterEscapeValue",
    characterReference: "characterReference",
    characterReferenceMarker: "characterReferenceMarker",
    characterReferenceMarkerNumeric: "characterReferenceMarkerNumeric",
    characterReferenceMarkerHexadecimal: "characterReferenceMarkerHexadecimal",
    characterReferenceValue: "characterReferenceValue",
    codeFenced: "codeFenced",
    codeFencedFence: "codeFencedFence",
    codeFencedFenceSequence: "codeFencedFenceSequence",
    codeFencedFenceInfo: "codeFencedFenceInfo",
    codeFencedFenceMeta: "codeFencedFenceMeta",
    codeFlowValue: "codeFlowValue",
    codeIndented: "codeIndented",
    codeText: "codeText",
    codeTextData: "codeTextData",
    codeTextPadding: "codeTextPadding",
    codeTextSequence: "codeTextSequence",
    content: "content",
    definition: "definition",
    definitionDestination: "definitionDestination",
    definitionDestinationLiteral: "definitionDestinationLiteral",
    definitionDestinationLiteralMarker: "definitionDestinationLiteralMarker",
    definitionDestinationRaw: "definitionDestinationRaw",
    definitionDestinationString: "definitionDestinationString",
    definitionLabel: "definitionLabel",
    definitionLabelMarker: "definitionLabelMarker",
    definitionLabelString: "definitionLabelString",
    definitionMarker: "definitionMarker",
    definitionTitle: "definitionTitle",
    definitionTitleMarker: "definitionTitleMarker",
    definitionTitleString: "definitionTitleString",
    emphasis: "emphasis",
    emphasisSequence: "emphasisSequence",
    emphasisText: "emphasisText",
    escapeMarker: "escapeMarker",
    hardBreakEscape: "hardBreakEscape",
    hardBreakTrailing: "hardBreakTrailing",
    htmlFlow: "htmlFlow",
    htmlFlowData: "htmlFlowData",
    htmlText: "htmlText",
    htmlTextData: "htmlTextData",
    image: "image",
    label: "label",
    labelText: "labelText",
    labelLink: "labelLink",
    labelImage: "labelImage",
    labelMarker: "labelMarker",
    labelImageMarker: "labelImageMarker",
    labelEnd: "labelEnd",
    link: "link",
    paragraph: "paragraph",
    reference: "reference",
    referenceMarker: "referenceMarker",
    referenceString: "referenceString",
    resource: "resource",
    resourceDestination: "resourceDestination",
    resourceDestinationLiteral: "resourceDestinationLiteral",
    resourceDestinationLiteralMarker: "resourceDestinationLiteralMarker",
    resourceDestinationRaw: "resourceDestinationRaw",
    resourceDestinationString: "resourceDestinationString",
    resourceMarker: "resourceMarker",
    resourceTitle: "resourceTitle",
    resourceTitleMarker: "resourceTitleMarker",
    resourceTitleString: "resourceTitleString",
    setextHeading: "setextHeading",
    setextHeadingText: "setextHeadingText",
    setextHeadingLine: "setextHeadingLine",
    setextHeadingLineSequence: "setextHeadingLineSequence",
    strong: "strong",
    strongSequence: "strongSequence",
    strongText: "strongText",
    thematicBreak: "thematicBreak",
    thematicBreakSequence: "thematicBreakSequence",
    blockQuote: "blockQuote",
    blockQuotePrefix: "blockQuotePrefix",
    blockQuoteMarker: "blockQuoteMarker",
    blockQuotePrefixWhitespace: "blockQuotePrefixWhitespace",
    listOrdered: "listOrdered",
    listUnordered: "listUnordered",
    listItemIndent: "listItemIndent",
    listItemMarker: "listItemMarker",
    listItemPrefix: "listItemPrefix",
    listItemPrefixWhitespace: "listItemPrefixWhitespace",
    listItemValue: "listItemValue",
    chunkDocument: "chunkDocument",
    chunkContent: "chunkContent",
    chunkFlow: "chunkFlow",
    chunkText: "chunkText",
    chunkString: "chunkString",
};
var jt = "cellDivider",
    $a = {
        [J.lowercaseV]: "bottom",
        [J.lowercaseX]: "middle",
        [J.caret]: "top",
    };
function zf() {
    return { tokenize: t, resolve: r, resolveAll: i, concrete: !0 };
    function e(u, s, o) {
        function c(f) {
            return f === J.plusSign || f === J.verticalBar ? s(f) : o(f);
        }
        function l(f) {
            return (
                u.enter(Xt.lineEnding), u.consume(f), u.exit(Xt.lineEnding), c
            );
        }
        return l;
    }
    function t(u, s, o) {
        let c = [0],
            l = 0,
            f = 0,
            m = 0,
            T = null,
            p = "",
            _ = "";
        return C;
        function C(S) {
            return (u.enter(ke)._cols = c), u.enter(Ie), k(S);
        }
        function k(S) {
            return (
                (T = u.enter(nt)),
                u.enter(jt),
                u.consume(S),
                u.exit(jt),
                (m = 0),
                (f = 0),
                I
            );
        }
        function I(S) {
            return (
                (p = ""),
                (_ = ""),
                S === J.dash ||
                S === J.equalsTo ||
                S === J.colon ||
                S === J.greaterThan
                    ? ((u.enter(wt)._colStart = m),
                      (m += 1),
                      S === J.colon
                          ? (p = "left")
                          : S === J.greaterThan && (p = "justify"),
                      u.consume(S),
                      U)
                    : S === J.eof || B(S)
                    ? v(S)
                    : ((u.enter(ae)._colStart = m),
                      (m += 1),
                      u.consume(S),
                      z(S) ? O : G)
            );
        }
        function O(S) {
            return S === J.eof || B(S)
                ? ((u.exit(ae)._discard = !0), v(S))
                : z(S)
                ? ((m += 1), u.consume(S), O)
                : G(S);
        }
        function P(S) {
            return l < 3 ? o(S) : (u.exit(Ie), u.exit(ke), s(S));
        }
        function v(S) {
            return f === 0
                ? o(S)
                : (u.exit(nt),
                  (l += 1),
                  S === J.eof
                      ? P(S)
                      : u.check(
                            { tokenize: e },
                            (j) => (
                                u.enter(Xt.lineEnding),
                                u.consume(j),
                                u.exit(Xt.lineEnding),
                                k
                            ),
                            P
                        )(S));
        }
        function U(S) {
            if (((m += 1), S === J.dash || S === J.equalsTo))
                return T._type || (T._type = S), u.consume(S), U;
            if (S === J.colon) {
                if (!p) p = "right";
                else if (p === "left") p = "center";
                else return o(S);
                return u.consume(S), L;
            }
            return S === J.lessThan
                ? p !== "justify"
                    ? o(S)
                    : (u.consume(S), L)
                : $a[S]
                ? _
                    ? o(S)
                    : ((_ = $a[S]), u.consume(S), U)
                : S === J.plusSign || S === J.verticalBar
                ? ((m -= 1), L(S))
                : o(S);
        }
        function L(S) {
            if (S !== J.plusSign && S !== J.verticalBar) return o(S);
            T._type || (T._type = S.dash),
                (m += 1),
                c.indexOf(m) < 0 && (c.push(m), c.sort((Y, F) => Y - F));
            let Z = u.exit(wt);
            return (
                (Z._colEnd = m),
                (Z._align = p),
                (Z._valign = _),
                u.enter(jt),
                u.consume(S),
                u.exit(jt),
                (f += 1),
                I
            );
        }
        function G(S) {
            return (
                (m += 1),
                S === J.verticalBar || S === J.plusSign
                    ? c.indexOf(m) >= 0
                        ? ((u.exit(ae)._colEnd = m),
                          u.enter(jt),
                          u.consume(S),
                          u.exit(jt),
                          (f += 1),
                          I)
                        : (u.consume(S), G)
                    : S === J.eof
                    ? o(S)
                    : (u.consume(S), S === J.backslash ? ne : G)
            );
        }
        function ne(S) {
            return S === J.backslash || S === J.verticalBar || S === J.plusSign
                ? ((m += 1), u.consume(S), G)
                : G(S);
        }
    }
    function n(u, s) {
        let o = [],
            c = -1;
        for (let l = 0; l < u.length; l += 1) {
            let [f, m] = u[l],
                { type: T } = m;
            if (T === Ie)
                if (f === "enter") c = l;
                else {
                    let [p, _] = o,
                        C = m;
                    if (p > c + 1) {
                        let k = { type: we, start: C.start, end: u[p][1].end };
                        (C.start = k.end),
                            (u[c][1] = k),
                            u.splice(p, 0, ["exit", k, s], ["enter", C, s]),
                            (l += 2),
                            (_ += 2);
                    }
                    if (_) {
                        let k = { type: Me, start: u[_][1].start, end: C.end };
                        (C.end = k.start),
                            u.splice(_, 0, ["exit", C, s], ["enter", k, s]),
                            (l += 2),
                            (u[l][1] = k);
                    }
                }
            else
                T === nt &&
                    f === "enter" &&
                    m._type === J.equalsTo &&
                    o.push(l);
        }
        return u;
    }
    function r(u, s) {
        return (u = u.filter(([, o]) => !o._discard)), (u = n(u, s)), u;
    }
    function i(u, s) {
        let { defined: o } = s.parser;
        for (let [c, l] of u)
            c === "enter" && l.type === ke && (l._definitions = o);
        return u;
    }
}
var ki = { flow: { [J.plusSign]: zf() } };
function qf(e) {
    for (; e.length > 0 && e[e.length - 1].match(/^\s*$/); ) e.pop();
    let t = e
        .filter((n) => !n.match(/^\s*$/))
        .map((n) => n.match(/^ */)[0].length)
        .reduce((n, r) => Math.min(r, n), 1 / 0);
    return e.map((n) => n.substring(t).trimEnd());
}
function Ja(e, t) {
    let n = e.cols.indexOf(t._colStart);
    return e.cols.indexOf(t._colEnd) - n;
}
function Vf(e) {
    this.lineEndingIfNeeded(),
        this.tag("<table>"),
        this.buffer(),
        this.setData("tableInfo", {
            cols: e._cols,
            colPos: 0,
            allCells: [],
            pendingCells: [],
            cells: [],
            dividers: [],
            definitions: e._definitions,
            rows: [],
            type: "tbody",
        });
}
var yi = {
    exit: {
        codeTextData(e) {
            let t = this.sliceSerialize(e);
            (t = t.replace(/\\([+|])/gm, "$1")), this.raw(this.encode(t));
        },
        codeFlowValue(e) {
            yi.exit.codeTextData.call(this, e),
                this.setData("flowCodeSeenData", !0);
        },
    },
};
function Wf() {
    this.resume();
    let e = this.getData("tableInfo");
    for (let r of e.allCells) {
        let i = qf(r.lines),
            u = this.getData("definitions");
        if (u)
            for (let m of Object.values(u)) {
                let T = `[${m.labelId}]`;
                if (i.find((p) => p.indexOf(T) >= 0)) {
                    let p = m.title ? ` ${JSON.stringify(m.title)}` : "";
                    i.push(""), i.push(`${T}: ${m.destination}${p}`);
                }
            }
        let s = i.join(`
`),
            { htmlExtensions: o } = this.options;
        o.indexOf(yi) < 0 && (o = [...this.options.htmlExtensions, yi]);
        let c = Qa(s, { ...this.options, htmlExtensions: o }).trim(),
            l = c.lastIndexOf("<p>"),
            f = c.indexOf("</p>");
        l === 0 && f === c.length - 4 && (c = c.substring(3, f)), (r.html = c);
    }
    let t = "",
        n = 4;
    for (let r of e.rows) {
        t !== r.type &&
            (t &&
                ((n -= 4),
                this.lineEndingIfNeeded(),
                this.raw(" ".repeat(n)),
                this.tag(`</${t}>`)),
            (t = r.type),
            this.lineEndingIfNeeded(),
            this.raw(" ".repeat(n)),
            this.tag(`<${t}>`),
            (n += 4)),
            this.lineEndingIfNeeded(),
            this.raw(" ".repeat(n)),
            this.tag("<tr>"),
            (n += 4);
        let i = r.type === "thead" ? "th" : "td";
        for (let u of r.cells) {
            let { colSpan: s, rowSpan: o, align: c, valign: l } = u,
                f = [];
            s > 1 && f.push(`colspan="${s}"`),
                o > 1 && f.push(`rowspan="${o}"`),
                c && f.push(`align="${c}"`),
                l && f.push(`valign="${l}"`);
            let m = f.length ? ` ${f.join(" ")}` : "";
            if (
                (this.lineEndingIfNeeded(),
                this.raw(" ".repeat(n)),
                this.tag(`<${i}${m}>`),
                u.html.startsWith("<") && u.html.indexOf("<pre>") < 0)
            ) {
                let T = u.html.split(`
`).join(`
${" ".repeat(n + 4)}`);
                this.lineEndingIfNeeded(),
                    this.raw(" ".repeat(n + 4)),
                    this.raw(T),
                    this.lineEndingIfNeeded(),
                    this.raw(" ".repeat(n));
            } else this.raw(u.html);
            this.tag(`</${i}>`);
        }
        this.lineEndingIfNeeded(),
            (n -= 4),
            this.raw(" ".repeat(n)),
            this.tag("</tr>");
    }
    t &&
        (this.lineEndingIfNeeded(),
        (n -= 4),
        this.raw(" ".repeat(n)),
        this.tag(`</${t}>`)),
        this.lineEndingIfNeeded(),
        this.tag("</table>");
}
function Li(e) {
    return function () {
        let n = this.getData("tableInfo");
        n.type = e;
    };
}
function Qf(e) {
    let t = this.sliceSerialize(e),
        n = this.getData("tableInfo"),
        r = Ja(n, e),
        i = n.pendingCells[n.colPos];
    if (
        (n.isDivider &&
            (i || ((i = n.cells[n.colPos]), (n.pendingCells[n.colPos] = i)),
            i && (i.rowSpan += 1)),
        i)
    ) {
        i.lines.push(t), (n.colPos += r);
        return;
    }
    if (((i = n.cells[n.colPos]), !i)) {
        let u = n.dividers[n.colPos];
        (i = {
            rowSpan: 1,
            colSpan: r,
            align: u?._align,
            valign: u?._valign,
            node: { type: ae },
            lines: [],
        }),
            (n.cells[n.colPos] = i),
            n.allCells.push(i);
    }
    i.lines.push(t), (n.colPos += r);
}
function Gf(e) {
    let t = this.getData("tableInfo"),
        n = Ja(t, e);
    for (; n > 0; )
        (n -= 1),
            (t.pendingCells[t.colPos] = null),
            (t.dividers[t.colPos] = e),
            (t.colPos += 1);
}
function Xf(e) {
    let t = this.getData("tableInfo");
    (t.isDivider = e._type), (t.colPos = 0), t.isDivider && (t.dividers = []);
}
function Za(e) {
    let t = { type: e.type, cells: [] };
    for (let n of e.cells) n && t.cells.push(n);
    this.getData("tableInfo").rows.push(t), (e.cells = []);
}
function Oi() {
    let e = this.getData("tableInfo");
    e.cells.length && (Za.call(this, e), (e.pendingCells = []));
}
function jf() {
    let e = this.getData("tableInfo");
    e.isDivider && e.cells.length && Za.call(this, e);
}
var Kf = {
    enter: {
        [ke]: Vf,
        [we]: Li("thead"),
        [Ie]: Li("tbody"),
        [Me]: Li("tfoot"),
        [wt]: Gf,
        [nt]: Xf,
    },
    exit: { [ke]: Wf, [we]: Oi, [Ie]: Oi, [Me]: Oi, [ae]: Qf, [nt]: jf },
};
var Kt = function (e) {
    if (e == null) return e0;
    if (typeof e == "function") return lr(e);
    if (typeof e == "object") return Array.isArray(e) ? $f(e) : Jf(e);
    if (typeof e == "string") return Zf(e);
    throw new Error("Expected function, string, or object as test");
};
function $f(e) {
    let t = [],
        n = -1;
    for (; ++n < e.length; ) t[n] = Kt(e[n]);
    return lr(r);
    function r(...i) {
        let u = -1;
        for (; ++u < t.length; ) if (t[u].apply(this, i)) return !0;
        return !1;
    }
}
function Jf(e) {
    let t = e;
    return lr(n);
    function n(r) {
        let i = r,
            u;
        for (u in e) if (i[u] !== t[u]) return !1;
        return !0;
    }
}
function Zf(e) {
    return lr(t);
    function t(n) {
        return n && n.type === e;
    }
}
function lr(e) {
    return t;
    function t(n, r, i) {
        return !!(
            t0(n) &&
            e.call(this, n, typeof r == "number" ? r : void 0, i || void 0)
        );
    }
}
function e0() {
    return !0;
}
function t0(e) {
    return e !== null && typeof e == "object" && "type" in e;
}
var es = [],
    rt = !0,
    Mt = !1,
    $t = "skip";
function Di(e, t, n, r) {
    let i;
    typeof t == "function" && typeof n != "function"
        ? ((r = n), (n = t))
        : (i = t);
    let u = Kt(i),
        s = r ? -1 : 1;
    o(e, void 0, [])();
    function o(c, l, f) {
        let m = c && typeof c == "object" ? c : {};
        if (typeof m.type == "string") {
            let p =
                typeof m.tagName == "string"
                    ? m.tagName
                    : typeof m.name == "string"
                    ? m.name
                    : void 0;
            Object.defineProperty(T, "name", {
                value: "node (" + (c.type + (p ? "<" + p + ">" : "")) + ")",
            });
        }
        return T;
        function T() {
            let p = es,
                _,
                C,
                k;
            if (
                (!t || u(c, l, f[f.length - 1] || void 0)) &&
                ((p = n0(n(c, f))), p[0] === Mt)
            )
                return p;
            if ("children" in c && c.children) {
                let I = c;
                if (I.children && p[0] !== $t)
                    for (
                        C = (r ? I.children.length : -1) + s, k = f.concat(I);
                        C > -1 && C < I.children.length;

                    ) {
                        let O = I.children[C];
                        if (((_ = o(O, C, k)()), _[0] === Mt)) return _;
                        C = typeof _[1] == "number" ? _[1] : C + s;
                    }
            }
            return p;
        }
    }
}
function n0(e) {
    return Array.isArray(e)
        ? e
        : typeof e == "number"
        ? [rt, e]
        : e == null
        ? es
        : [e];
}
function Be(e, t, n, r) {
    let i, u, s;
    typeof t == "function" && typeof n != "function"
        ? ((u = void 0), (s = t), (i = n))
        : ((u = t), (s = n), (i = r)),
        Di(e, u, o, i);
    function o(c, l) {
        let f = l[l.length - 1],
            m = f ? f.children.indexOf(c) : void 0;
        return s(c, m, f);
    }
}
function r0(e) {
    Be(
        e,
        (t) => (
            (t.type === "inlineCode" || t.type === "code") &&
                (t.value = t.value.replace(/\\([+|])/gm, "$1")),
            t.type === "code" &&
                (t.value = t.value.replace(/\u0083 ?\n/gmu, "")),
            rt
        )
    );
}
function i0(e) {
    for (; e.length > 0 && e[e.length - 1].match(/^\s*$/); ) e.pop();
    let t = e
        .filter((n) => !n.match(/^\s*$/))
        .map((n) => n.match(/^ */)[0].length)
        .reduce((n, r) => Math.min(r, n), 1 / 0);
    return e.map((n) => n.substring(t).trimEnd());
}
function ts(e, t) {
    let n = e.cols.indexOf(t._colStart);
    return e.cols.indexOf(t._colEnd) - n;
}
function u0(e) {
    this.enter({ type: ke, children: [] }, e),
        (this.data.tableInfo = {
            cols: e._cols,
            colPos: 0,
            allCells: [],
            pendingCells: [],
            cells: [],
            dividers: [],
            definitions: e._definitions,
        });
}
function a0(e) {
    let { processor: t } = e;
    return (
        t ||
            (t = {
                data(n) {
                    if (n === "micromarkExtensions") return e.extensions;
                    if (n === "fromMarkdownExtensions")
                        return e.mdastExtensions;
                },
            }),
        function (r) {
            let { tableInfo: i } = this.data;
            for (let u of i.allCells) {
                let {
                        node: s,
                        lines: o,
                        colSpan: c,
                        rowSpan: l,
                        align: f,
                        valign: m,
                    } = u,
                    T = i0(o),
                    p = new Set();
                for (let k of i.definitions) {
                    let I = `[${k.toLowerCase()}]`;
                    o.find((O) => O.indexOf(I) >= 0) &&
                        (T.push(""), T.push(`[${k}]: dummy`), p.add(k));
                }
                let _ = T.join(`
`),
                    C = _n(_, {
                        extensions: t.data("micromarkExtensions"),
                        mdastExtensions: t.data("fromMarkdownExtensions"),
                    });
                for (let k = 0; k < C.children.length; k += 1) {
                    let I = C.children[k];
                    I.type === "definition" &&
                        p.has(I.label) &&
                        (C.children.splice(k, 1), (k -= 1));
                }
                r0(C),
                    (s.children = C.children),
                    c > 1 && (s.colSpan = c),
                    l > 1 && (s.rowSpan = l),
                    f && (s.align = f),
                    m && (s.valign = m);
            }
            this.exit(r);
        }
    );
}
function Pi(e) {
    this.enter({ type: e.type, children: [] }, e);
}
function s0() {
    this.buffer();
}
function o0(e) {
    this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
    let t = this.resume(),
        { tableInfo: n } = this.data,
        r = ts(n, e),
        i = n.pendingCells[n.colPos];
    if (
        (n.isDivider &&
            (i || ((i = n.cells[n.colPos]), (n.pendingCells[n.colPos] = i)),
            i && (i.rowSpan += 1)),
        i)
    ) {
        i.lines.push(t), (n.colPos += r);
        return;
    }
    if (((i = n.cells[n.colPos]), !i)) {
        let u = n.dividers[n.colPos];
        (i = {
            rowSpan: 1,
            colSpan: r,
            align: u?._align,
            valign: u?._valign,
            node: { type: ae },
            lines: [],
        }),
            (n.cells[n.colPos] = i),
            n.allCells.push(i);
    }
    i.lines.push(t), (n.colPos += r);
}
function c0(e) {
    let { tableInfo: t } = this.data,
        n = ts(t, e);
    for (; n > 0; )
        (n -= 1),
            (t.pendingCells[t.colPos] = null),
            (t.dividers[t.colPos] = e),
            (t.colPos += 1);
}
function l0(e) {
    let t = this.data.tableInfo;
    (t.isDivider = e._type), (t.colPos = 0), t.isDivider && (t.dividers = []);
}
function ns(e) {
    let t = {
        type: ve,
        start: { line: 0, column: 0, offset: 0 },
        end: { line: 0, column: 0, offset: 0 },
    };
    this.enter({ type: ve, children: [] }, t);
    for (let n of e.cells)
        if (n) {
            let r = {
                type: ae,
                start: { line: 0, column: 0, offset: 0 },
                end: { line: 0, column: 0, offset: 0 },
            };
            this.enter(n.node, r), this.exit(r);
        }
    this.exit(t), (e.cells = []);
}
function wi(e) {
    let { tableInfo: t } = this.data;
    t.cells.length && (ns.call(this, t), (t.pendingCells = [])), this.exit(e);
}
function f0() {
    let { tableInfo: e } = this.data;
    e.isDivider && e.cells.length && ns.call(this, e);
}
function Mi(e = {}) {
    return {
        enter: {
            [ke]: u0,
            [we]: Pi,
            [Ie]: Pi,
            [Me]: Pi,
            [ae]: s0,
            [wt]: c0,
            [nt]: l0,
        },
        exit: { [ke]: a0(e), [we]: wi, [Ie]: wi, [Me]: wi, [ae]: o0, [nt]: f0 },
    };
}
var rs = {}.hasOwnProperty;
function Jt(e, t) {
    let n = t || {};
    function r(i, ...u) {
        let s = r.invalid,
            o = r.handlers;
        if (i && rs.call(i, e)) {
            let c = String(i[e]);
            s = rs.call(o, c) ? o[c] : r.unknown;
        }
        if (s) return s.call(this, i, ...u);
    }
    return (
        (r.handlers = n.handlers || {}),
        (r.invalid = n.invalid),
        (r.unknown = n.unknown),
        r
    );
}
function is(e, t, n, r) {
    let i = n.enter("blockquote"),
        u = n.createTracker(r);
    u.move("> "), u.shift(2);
    let s = n.indentLines(n.containerFlow(e, u.current()), d0);
    return i(), s;
}
function d0(e, t, n) {
    return ">" + (n ? "" : " ") + e;
}
function as(e, t) {
    return us(e, t.inConstruct, !0) && !us(e, t.notInConstruct, !1);
}
function us(e, t, n) {
    if ((typeof t == "string" && (t = [t]), !t || t.length === 0)) return n;
    let r = -1;
    for (; ++r < t.length; ) if (e.includes(t[r])) return !0;
    return !1;
}
function Bi(e, t, n, r) {
    let i = -1;
    for (; ++i < n.unsafe.length; )
        if (
            n.unsafe[i].character ===
                `
` &&
            as(n.stack, n.unsafe[i])
        )
            return /[ \t]/.test(r.before) ? "" : " ";
    return `\\
`;
}
function ss(e, t) {
    let n = String(e),
        r = n.indexOf(t),
        i = r,
        u = 0,
        s = 0;
    if (typeof t != "string") throw new TypeError("Expected substring");
    for (; r !== -1; )
        r === i ? ++u > s && (s = u) : (u = 1),
            (i = r + t.length),
            (r = n.indexOf(t, i));
    return s;
}
function os(e, t) {
    return !!(
        t.options.fences === !1 &&
        e.value &&
        !e.lang &&
        /[^ \r\n]/.test(e.value) &&
        !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value)
    );
}
function cs(e) {
    let t = e.options.fence || "`";
    if (t !== "`" && t !== "~")
        throw new Error(
            "Cannot serialize code with `" +
                t +
                "` for `options.fence`, expected `` ` `` or `~`"
        );
    return t;
}
function ls(e, t, n, r) {
    let i = cs(n),
        u = e.value || "",
        s = i === "`" ? "GraveAccent" : "Tilde";
    if (os(e, n)) {
        let m = n.enter("codeIndented"),
            T = n.indentLines(u, h0);
        return m(), T;
    }
    let o = n.createTracker(r),
        c = i.repeat(Math.max(ss(u, i) + 1, 3)),
        l = n.enter("codeFenced"),
        f = o.move(c);
    if (e.lang) {
        let m = n.enter(`codeFencedLang${s}`);
        (f += o.move(
            n.safe(e.lang, {
                before: f,
                after: " ",
                encode: ["`"],
                ...o.current(),
            })
        )),
            m();
    }
    if (e.lang && e.meta) {
        let m = n.enter(`codeFencedMeta${s}`);
        (f += o.move(" ")),
            (f += o.move(
                n.safe(e.meta, {
                    before: f,
                    after: `
`,
                    encode: ["`"],
                    ...o.current(),
                })
            )),
            m();
    }
    return (
        (f += o.move(`
`)),
        u &&
            (f += o.move(
                u +
                    `
`
            )),
        (f += o.move(c)),
        l(),
        f
    );
}
function h0(e, t, n) {
    return (n ? "" : "    ") + e;
}
function Zt(e) {
    let t = e.options.quote || '"';
    if (t !== '"' && t !== "'")
        throw new Error(
            "Cannot serialize title with `" +
                t +
                "` for `options.quote`, expected `\"`, or `'`"
        );
    return t;
}
function fs(e, t, n, r) {
    let i = Zt(n),
        u = i === '"' ? "Quote" : "Apostrophe",
        s = n.enter("definition"),
        o = n.enter("label"),
        c = n.createTracker(r),
        l = c.move("[");
    return (
        (l += c.move(
            n.safe(n.associationId(e), {
                before: l,
                after: "]",
                ...c.current(),
            })
        )),
        (l += c.move("]: ")),
        o(),
        !e.url || /[\0- \u007F]/.test(e.url)
            ? ((o = n.enter("destinationLiteral")),
              (l += c.move("<")),
              (l += c.move(
                  n.safe(e.url, { before: l, after: ">", ...c.current() })
              )),
              (l += c.move(">")))
            : ((o = n.enter("destinationRaw")),
              (l += c.move(
                  n.safe(e.url, {
                      before: l,
                      after: e.title
                          ? " "
                          : `
`,
                      ...c.current(),
                  })
              ))),
        o(),
        e.title &&
            ((o = n.enter(`title${u}`)),
            (l += c.move(" " + i)),
            (l += c.move(
                n.safe(e.title, { before: l, after: i, ...c.current() })
            )),
            (l += c.move(i)),
            o()),
        s(),
        l
    );
}
function ds(e) {
    let t = e.options.emphasis || "*";
    if (t !== "*" && t !== "_")
        throw new Error(
            "Cannot serialize emphasis with `" +
                t +
                "` for `options.emphasis`, expected `*`, or `_`"
        );
    return t;
}
Fi.peek = m0;
function Fi(e, t, n, r) {
    let i = ds(n),
        u = n.enter("emphasis"),
        s = n.createTracker(r),
        o = s.move(i);
    return (
        (o += s.move(
            n.containerPhrasing(e, { before: o, after: i, ...s.current() })
        )),
        (o += s.move(i)),
        u(),
        o
    );
}
function m0(e, t, n) {
    return n.options.emphasis || "*";
}
function hs(e, t) {
    let n = !1;
    return (
        Be(e, function (r) {
            if (
                ("value" in r && /\r?\n|\r/.test(r.value)) ||
                r.type === "break"
            )
                return (n = !0), Mt;
        }),
        !!((!e.depth || e.depth < 3) && Ot(e) && (t.options.setext || n))
    );
}
function ms(e, t, n, r) {
    let i = Math.max(Math.min(6, e.depth || 1), 1),
        u = n.createTracker(r);
    if (hs(e, n)) {
        let f = n.enter("headingSetext"),
            m = n.enter("phrasing"),
            T = n.containerPhrasing(e, {
                ...u.current(),
                before: `
`,
                after: `
`,
            });
        return (
            m(),
            f(),
            T +
                `
` +
                (i === 1 ? "=" : "-").repeat(
                    T.length -
                        (Math.max(
                            T.lastIndexOf("\r"),
                            T.lastIndexOf(`
`)
                        ) +
                            1)
                )
        );
    }
    let s = "#".repeat(i),
        o = n.enter("headingAtx"),
        c = n.enter("phrasing");
    u.move(s + " ");
    let l = n.containerPhrasing(e, {
        before: "# ",
        after: `
`,
        ...u.current(),
    });
    return (
        /^[\t ]/.test(l) &&
            (l =
                "&#x" +
                l.charCodeAt(0).toString(16).toUpperCase() +
                ";" +
                l.slice(1)),
        (l = l ? s + " " + l : s),
        n.options.closeAtx && (l += " " + s),
        c(),
        o(),
        l
    );
}
Hi.peek = p0;
function Hi(e) {
    return e.value || "";
}
function p0() {
    return "<";
}
Ui.peek = E0;
function Ui(e, t, n, r) {
    let i = Zt(n),
        u = i === '"' ? "Quote" : "Apostrophe",
        s = n.enter("image"),
        o = n.enter("label"),
        c = n.createTracker(r),
        l = c.move("![");
    return (
        (l += c.move(n.safe(e.alt, { before: l, after: "]", ...c.current() }))),
        (l += c.move("](")),
        o(),
        (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
            ? ((o = n.enter("destinationLiteral")),
              (l += c.move("<")),
              (l += c.move(
                  n.safe(e.url, { before: l, after: ">", ...c.current() })
              )),
              (l += c.move(">")))
            : ((o = n.enter("destinationRaw")),
              (l += c.move(
                  n.safe(e.url, {
                      before: l,
                      after: e.title ? " " : ")",
                      ...c.current(),
                  })
              ))),
        o(),
        e.title &&
            ((o = n.enter(`title${u}`)),
            (l += c.move(" " + i)),
            (l += c.move(
                n.safe(e.title, { before: l, after: i, ...c.current() })
            )),
            (l += c.move(i)),
            o()),
        (l += c.move(")")),
        s(),
        l
    );
}
function E0() {
    return "!";
}
vi.peek = T0;
function vi(e, t, n, r) {
    let i = e.referenceType,
        u = n.enter("imageReference"),
        s = n.enter("label"),
        o = n.createTracker(r),
        c = o.move("!["),
        l = n.safe(e.alt, { before: c, after: "]", ...o.current() });
    (c += o.move(l + "][")), s();
    let f = n.stack;
    (n.stack = []), (s = n.enter("reference"));
    let m = n.safe(n.associationId(e), {
        before: c,
        after: "]",
        ...o.current(),
    });
    return (
        s(),
        (n.stack = f),
        u(),
        i === "full" || !l || l !== m
            ? (c += o.move(m + "]"))
            : i === "shortcut"
            ? (c = c.slice(0, -1))
            : (c += o.move("]")),
        c
    );
}
function T0() {
    return "!";
}
Yi.peek = g0;
function Yi(e, t, n) {
    let r = e.value || "",
        i = "`",
        u = -1;
    for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); ) i += "`";
    for (
        /[^ \r\n]/.test(r) &&
        ((/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r)) || /^`|`$/.test(r)) &&
        (r = " " + r + " ");
        ++u < n.unsafe.length;

    ) {
        let s = n.unsafe[u],
            o = n.compilePattern(s),
            c;
        if (s.atBreak)
            for (; (c = o.exec(r)); ) {
                let l = c.index;
                r.charCodeAt(l) === 10 && r.charCodeAt(l - 1) === 13 && l--,
                    (r = r.slice(0, l) + " " + r.slice(c.index + 1));
            }
    }
    return i + r + i;
}
function g0() {
    return "`";
}
function zi(e, t) {
    let n = Ot(e);
    return !!(
        !t.options.resourceLink &&
        e.url &&
        !e.title &&
        e.children &&
        e.children.length === 1 &&
        e.children[0].type === "text" &&
        (n === e.url || "mailto:" + n === e.url) &&
        /^[a-z][a-z+.-]+:/i.test(e.url) &&
        !/[\0- <>\u007F]/.test(e.url)
    );
}
qi.peek = b0;
function qi(e, t, n, r) {
    let i = Zt(n),
        u = i === '"' ? "Quote" : "Apostrophe",
        s = n.createTracker(r),
        o,
        c;
    if (zi(e, n)) {
        let f = n.stack;
        (n.stack = []), (o = n.enter("autolink"));
        let m = s.move("<");
        return (
            (m += s.move(
                n.containerPhrasing(e, {
                    before: m,
                    after: ">",
                    ...s.current(),
                })
            )),
            (m += s.move(">")),
            o(),
            (n.stack = f),
            m
        );
    }
    (o = n.enter("link")), (c = n.enter("label"));
    let l = s.move("[");
    return (
        (l += s.move(
            n.containerPhrasing(e, { before: l, after: "](", ...s.current() })
        )),
        (l += s.move("](")),
        c(),
        (!e.url && e.title) || /[\0- \u007F]/.test(e.url)
            ? ((c = n.enter("destinationLiteral")),
              (l += s.move("<")),
              (l += s.move(
                  n.safe(e.url, { before: l, after: ">", ...s.current() })
              )),
              (l += s.move(">")))
            : ((c = n.enter("destinationRaw")),
              (l += s.move(
                  n.safe(e.url, {
                      before: l,
                      after: e.title ? " " : ")",
                      ...s.current(),
                  })
              ))),
        c(),
        e.title &&
            ((c = n.enter(`title${u}`)),
            (l += s.move(" " + i)),
            (l += s.move(
                n.safe(e.title, { before: l, after: i, ...s.current() })
            )),
            (l += s.move(i)),
            c()),
        (l += s.move(")")),
        o(),
        l
    );
}
function b0(e, t, n) {
    return zi(e, n) ? "<" : "[";
}
Vi.peek = A0;
function Vi(e, t, n, r) {
    let i = e.referenceType,
        u = n.enter("linkReference"),
        s = n.enter("label"),
        o = n.createTracker(r),
        c = o.move("["),
        l = n.containerPhrasing(e, { before: c, after: "]", ...o.current() });
    (c += o.move(l + "][")), s();
    let f = n.stack;
    (n.stack = []), (s = n.enter("reference"));
    let m = n.safe(n.associationId(e), {
        before: c,
        after: "]",
        ...o.current(),
    });
    return (
        s(),
        (n.stack = f),
        u(),
        i === "full" || !l || l !== m
            ? (c += o.move(m + "]"))
            : i === "shortcut"
            ? (c = c.slice(0, -1))
            : (c += o.move("]")),
        c
    );
}
function A0() {
    return "[";
}
function en(e) {
    let t = e.options.bullet || "*";
    if (t !== "*" && t !== "+" && t !== "-")
        throw new Error(
            "Cannot serialize items with `" +
                t +
                "` for `options.bullet`, expected `*`, `+`, or `-`"
        );
    return t;
}
function ps(e) {
    let t = en(e),
        n = e.options.bulletOther;
    if (!n) return t === "*" ? "-" : "*";
    if (n !== "*" && n !== "+" && n !== "-")
        throw new Error(
            "Cannot serialize items with `" +
                n +
                "` for `options.bulletOther`, expected `*`, `+`, or `-`"
        );
    if (n === t)
        throw new Error(
            "Expected `bullet` (`" +
                t +
                "`) and `bulletOther` (`" +
                n +
                "`) to be different"
        );
    return n;
}
function Es(e) {
    let t = e.options.bulletOrdered || ".";
    if (t !== "." && t !== ")")
        throw new Error(
            "Cannot serialize items with `" +
                t +
                "` for `options.bulletOrdered`, expected `.` or `)`"
        );
    return t;
}
function fr(e) {
    let t = e.options.rule || "*";
    if (t !== "*" && t !== "-" && t !== "_")
        throw new Error(
            "Cannot serialize rules with `" +
                t +
                "` for `options.rule`, expected `*`, `-`, or `_`"
        );
    return t;
}
function Ts(e, t, n, r) {
    let i = n.enter("list"),
        u = n.bulletCurrent,
        s = e.ordered ? Es(n) : en(n),
        o = e.ordered ? (s === "." ? ")" : ".") : ps(n),
        c = t && n.bulletLastUsed ? s === n.bulletLastUsed : !1;
    if (!e.ordered) {
        let f = e.children ? e.children[0] : void 0;
        if (
            ((s === "*" || s === "-") &&
                f &&
                (!f.children || !f.children[0]) &&
                n.stack[n.stack.length - 1] === "list" &&
                n.stack[n.stack.length - 2] === "listItem" &&
                n.stack[n.stack.length - 3] === "list" &&
                n.stack[n.stack.length - 4] === "listItem" &&
                n.indexStack[n.indexStack.length - 1] === 0 &&
                n.indexStack[n.indexStack.length - 2] === 0 &&
                n.indexStack[n.indexStack.length - 3] === 0 &&
                (c = !0),
            fr(n) === s && f)
        ) {
            let m = -1;
            for (; ++m < e.children.length; ) {
                let T = e.children[m];
                if (
                    T &&
                    T.type === "listItem" &&
                    T.children &&
                    T.children[0] &&
                    T.children[0].type === "thematicBreak"
                ) {
                    c = !0;
                    break;
                }
            }
        }
    }
    c && (s = o), (n.bulletCurrent = s);
    let l = n.containerFlow(e, r);
    return (n.bulletLastUsed = s), (n.bulletCurrent = u), i(), l;
}
function gs(e) {
    let t = e.options.listItemIndent || "one";
    if (t !== "tab" && t !== "one" && t !== "mixed")
        throw new Error(
            "Cannot serialize items with `" +
                t +
                "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
        );
    return t;
}
function bs(e, t, n, r) {
    let i = gs(n),
        u = n.bulletCurrent || en(n);
    t &&
        t.type === "list" &&
        t.ordered &&
        (u =
            (typeof t.start == "number" && t.start > -1 ? t.start : 1) +
            (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) +
            u);
    let s = u.length + 1;
    (i === "tab" ||
        (i === "mixed" &&
            ((t && t.type === "list" && t.spread) || e.spread))) &&
        (s = Math.ceil(s / 4) * 4);
    let o = n.createTracker(r);
    o.move(u + " ".repeat(s - u.length)), o.shift(s);
    let c = n.enter("listItem"),
        l = n.indentLines(n.containerFlow(e, o.current()), f);
    return c(), l;
    function f(m, T, p) {
        return T
            ? (p ? "" : " ".repeat(s)) + m
            : (p ? u : u + " ".repeat(s - u.length)) + m;
    }
}
function As(e, t, n, r) {
    let i = n.enter("paragraph"),
        u = n.enter("phrasing"),
        s = n.containerPhrasing(e, r);
    return u(), i(), s;
}
var Wi = Kt([
    "break",
    "delete",
    "emphasis",
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    "inlineMath",
    "link",
    "linkReference",
    "mdxJsxTextElement",
    "mdxTextExpression",
    "strong",
    "text",
    "textDirective",
]);
function _s(e, t, n, r) {
    return (
        e.children.some(function (s) {
            return Wi(s);
        })
            ? n.containerPhrasing
            : n.containerFlow
    ).call(n, e, r);
}
function xs(e) {
    let t = e.options.strong || "*";
    if (t !== "*" && t !== "_")
        throw new Error(
            "Cannot serialize strong with `" +
                t +
                "` for `options.strong`, expected `*`, or `_`"
        );
    return t;
}
Qi.peek = _0;
function Qi(e, t, n, r) {
    let i = xs(n),
        u = n.enter("strong"),
        s = n.createTracker(r),
        o = s.move(i + i);
    return (
        (o += s.move(
            n.containerPhrasing(e, { before: o, after: i, ...s.current() })
        )),
        (o += s.move(i + i)),
        u(),
        o
    );
}
function _0(e, t, n) {
    return n.options.strong || "*";
}
function Cs(e, t, n, r) {
    return n.safe(e.value, r);
}
function Is(e) {
    let t = e.options.ruleRepetition || 3;
    if (t < 3)
        throw new Error(
            "Cannot serialize rules with repetition `" +
                t +
                "` for `options.ruleRepetition`, expected `3` or more"
        );
    return t;
}
function Ns(e, t, n) {
    let r = (fr(n) + (n.options.ruleSpaces ? " " : "")).repeat(Is(n));
    return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
var Gi = {
    blockquote: is,
    break: Bi,
    code: ls,
    definition: fs,
    emphasis: Fi,
    hardBreak: Bi,
    heading: ms,
    html: Hi,
    image: Ui,
    imageReference: vi,
    inlineCode: Yi,
    link: qi,
    linkReference: Vi,
    list: Ts,
    listItem: bs,
    paragraph: As,
    root: _s,
    strong: Qi,
    text: Cs,
    thematicBreak: Ns,
};
var Ss = {
        break: !0,
        delete: !0,
        emphasis: !0,
        footnote: !0,
        footnoteReference: !0,
        image: !0,
        imageReference: !0,
        inlineCode: !0,
        inlineMath: !0,
        link: !0,
        linkReference: !0,
        strong: !0,
        subscript: !0,
        superscript: !0,
        text: !0,
        underline: !0,
    },
    x0 = {
        paragraph: !0,
        delete: !0,
        emphasis: !0,
        inlineCode: !0,
        strong: !0,
        subscript: !0,
        superscript: !0,
        underline: !0,
    };
function Xi(e) {
    Be(e, (n, r, i) => {
        let { children: u = [] } = i || {};
        if (
            n.type === "text" &&
            (r === u.length - 1 && (n.value = n.value.trimEnd()),
            u[r + 1]?.type === "break" && (n.value = n.value.trimEnd()),
            r === 0 &&
                i?.type === "paragraph" &&
                (n.value = n.value.trimStart()),
            !n.value)
        )
            return u.splice(r, 1), r - 1;
        if (n.type === "break") {
            if (r === u.length - 1) return u.splice(r, 1), r - 1;
            delete n.value;
        }
        return rt;
    });
    function t(n) {
        let { children: r, type: i } = n;
        if (i === "text") return !n.value;
        if (!r) return !1;
        for (let u = 0; u < r.length; u += 1)
            t(r[u]) && (r.splice(u, 1), (u -= 1));
        return x0[i] ? r.length === 0 : !1;
    }
    return t(e), e;
}
var { text: Rs, inlineCode: C0, code: ks } = Gi;
function* dr(e, t) {
    let n = e / t,
        r = n,
        i = 0;
    for (let u = 0; u < t - 1; u += 1)
        yield [Math.round(r - i), u], (i = Math.round(r)), (r += n);
    yield [Math.round(e - i), t - 1];
}
function ji(e, t, n) {
    let r = 0;
    for (let i = 0; i < n.colSpan; i += 1) r += e[t + i].width;
    return r;
}
function Ls(e, t, n, r) {
    let i = { ...e, value: e.value.replace(/[ \t\v\r\n]/g, " ") },
        u = Rs(i, t, n, r),
        { lineWidth: s } = n.options;
    if (s && u.length > s) {
        if (n.stack.includes("headingAtx")) return u;
        let o = [],
            c = u.split(" "),
            l = r.now.column - 1,
            f = [];
        for (let m of c) {
            let T = m.length;
            l + T > s &&
                f.length > 0 &&
                (o.push(f.join(" ")), (f = []), (l = 0)),
                f.length === 0 &&
                    m.match(/^\d+\./) &&
                    (m = m.replace(".", "\\.")),
                f.length === 0 && m === "-" && (m = "\\-"),
                f.push(m),
                (l += T + 1);
        }
        f.length && o.push(f.join(" ")),
            (u = o.join(`
`));
    }
    return u;
}
Ls.peek = Rs;
var Ki = class {
    constructor() {
        Object.assign(this, {
            lastRow: null,
            rows: [],
            headerSize: 0,
            footerSize: 0,
            opts: { width: 120, minCellWidth: 12 },
        });
    }
    addHeaderRow(t) {
        this.addRow(t, this.headerSize), (this.headerSize += 1);
    }
    addRow(t, n = this.rows.length - this.footerSize) {
        let r = { height: 0, cells: [] };
        this.rows.splice(n, 0, r),
            (this.lastRow = this.rows[this.rows.length - 1]);
        for (let i of t) this.addCell(i, r);
    }
    addFooterRow(t) {
        this.addRow(t, this.rows.length), (this.footerSize += 1);
    }
    addCell(t, n) {
        this.lastRow ||
            ((this.lastRow = { height: 0, cells: [] }),
            this.rows.push(this.lastRow)),
            (n = n || this.lastRow),
            n.cells.push(t);
        for (let r = 1; r < t.colSpan; r += 1) n.cells.push({ align: t.align });
    }
    renderCell(t, n, r) {
        let i = n.options.lineWidth;
        (n.options.lineWidth = r - 3),
            (n.options.minLineWidth = this.opts.minCellWidth);
        let u = n.enter(ae),
            s = n.enter("phrasing");
        Xi(t.tree),
            t.tree.children.every((l) => Ss[l.type]) &&
                (t.tree.children = [
                    { type: "paragraph", children: t.tree.children },
                ]);
        let o = n.containerFlow(t.tree, {
            before: `
`,
            after: `
`,
            now: { line: 1, column: 1 },
            lineShift: 0,
        }).split(`
`);
        delete n.bulletLastUsed,
            s(),
            u(),
            (n.options.lineWidth = i),
            (t.lines = o),
            (t.height = o.length),
            (t.width = 0);
        let c = ["    ", "   ", "  ", " "];
        for (let l = 0; l < o.length; l += 1) {
            let f = o[l],
                m = f.indexOf("	");
            if (m >= 0) {
                do
                    (f = f.substring(0, m) + c[m % 4] + f.substring(m + 1)),
                        (m = f.indexOf("	", m + 1));
                while (m >= 0);
                o[l] = f;
            }
            t.width = Math.max(t.width, f.length);
        }
        return (
            (t.value = o.join(`
`)),
            (t.width += 3),
            t
        );
    }
    toMarkdown(t) {
        let n = 0,
            r = [];
        for (let _ = 0; _ < this.rows.length; _ += 1) {
            let C = this.rows[_];
            for (let k = 0; k < C.cells.length; k += 1) {
                let I = r[k];
                I || ((I = { width: 3 }), (r[k] = I));
                let O = C.cells[k];
                if ((O.tree && (n = Math.max(n, k + 1)), O.rowSpan > 1))
                    for (let P = 1; P < O.rowSpan; P += 1) {
                        let v = P + _,
                            U = new Array(O.colSpan).fill({});
                        (U[0] = { linked: O }),
                            this.rows[v].cells.splice(k, 0, ...U);
                    }
            }
        }
        if (r.length > n) {
            r.length = n;
            for (let { cells: _ } of this.rows)
                if (_.length > n) {
                    _.length = n;
                    let C = _.length - 1;
                    for (; C >= 0 && !_[C].tree; ) C -= 1;
                    C >= 0 && (_[C].colSpan = n - C);
                }
        }
        if (r.length === 0) return "";
        let i = r.length;
        for (let _ of this.rows)
            for (let C = _.cells.length; C < i; C += 1)
                _.cells.push({
                    tree: { type: "root", children: [] },
                    colSpan: 1,
                    rowSpan: 1,
                });
        for (let [_, C] of dr(this.opts.width, i)) r[C].maxWidth = _;
        for (let _ of this.rows)
            for (let C = 0; C < _.cells.length; C += 1) {
                let k = _.cells[C];
                if (k.tree) {
                    let I = 0;
                    for (let O = 0; O < k.colSpan; O += 1)
                        I += r[C + O].maxWidth;
                    this.renderCell(k, t, I);
                    for (let [O, P] of dr(k.width, k.colSpan)) {
                        let v = r[C + P];
                        v.width = Math.max(v.width, O);
                    }
                    k.valign && (r[C].width = Math.max(4, r[C].width));
                }
            }
        for (let _ of this.rows) {
            (_.minHeight = 0), (_.height = 0);
            for (let C = 0; C < _.cells.length; C += 1) {
                let k = _.cells[C];
                if (k.tree) {
                    let I = ji(r, C, k);
                    if (I >= k.width)
                        if ((this.renderCell(k, t, I), k.width > I))
                            for (let [O, P] of dr(k.width, k.colSpan)) {
                                let v = r[C + P];
                                v.width = Math.max(v.width, O);
                            }
                        else k.width = I;
                    k.rowSpan === 1 &&
                        (_.height = Math.max(_.height, k.height));
                }
            }
        }
        for (let _ = 0; _ < this.rows.length; _ += 1) {
            let C = this.rows[_];
            for (let k = 0; k < C.cells.length; k += 1) {
                let I = C.cells[k];
                if (I.rowSpan > 1) {
                    let O = Math.max(I.rowSpan, I.height - I.rowSpan + 1);
                    for (let [P, v] of dr(O, I.rowSpan))
                        this.rows[_ + v].height = Math.max(
                            this.rows[_ + v].height,
                            P
                        );
                }
            }
        }
        let u = "+",
            s = "+",
            o = {
                left: { b: ":", e: "", len: 1 },
                right: { b: "", e: ":", len: 1 },
                center: { b: ":", e: ":", len: 2 },
                justify: { b: ">", e: "<", len: 2 },
                top: "^",
                bottom: "v",
                middle: "x",
            },
            c = [],
            l = this.headerSize ? this.headerSize : this.footerSize ? 0 : -1,
            f = this.rows.length - this.footerSize;
        for (let _ = 0; _ < this.rows.length; _ += 1) {
            let C = this.rows[_],
                k = [],
                I = _ === l || _ === f ? "=" : "-",
                O,
                P = 0,
                v = null,
                U = null,
                L = () => {
                    if (U) {
                        let S = Math.floor((P - 1) / 2);
                        k.push(I.repeat(S)),
                            k.push(U),
                            k.push(I.repeat(P - S - 1));
                    } else k.push(I.repeat(P));
                },
                G = () => {
                    P &&
                        (v
                            ? ((P -= v.len), k.push(v.b), L(), k.push(v.e))
                            : L(),
                        (P = 0));
                };
            for (let S = 0; S < C.cells.length; S += 1) {
                let j = "+";
                S === 0 && _ > 0 && (j = s), _ === 0 && S > 0 && (j = u);
                let Z = C.cells[S],
                    Y = r[S];
                if (Z.tree)
                    G(),
                        k.push(j),
                        (P = Y.width - 1),
                        (v = o[Z.align]),
                        (U = o[Z.valign]);
                else if (Z.linked) {
                    G();
                    let F = ji(r, S, Z.linked),
                        q = Z.linked.lines.shift() || "";
                    k.push(`| ${q.padEnd(F - 3, " ")} `),
                        (S += Z.linked.colSpan - 1);
                } else P += Y.width;
                O = Z;
            }
            G();
            let ne = O?.linked ? "|" : s;
            _ === 0 && (ne = "+"), c.push(`${k.join("")}${ne}`);
            for (let S = 0; S < C.height; S += 1) {
                let j = [];
                for (let Z = 0; Z < C.cells.length; Z += 1) {
                    let Y = C.cells[Z];
                    if ((Y.linked && (Y = Y.linked), Y.tree)) {
                        let F = ji(r, Z, Y),
                            q = "";
                        (!Y.valign ||
                            Y.valign === "top" ||
                            (Y.valign === "middle" &&
                                S >= Math.floor(C.height - Y.height) / 2) ||
                            (Y.valign === "bottom" &&
                                S >= C.height - Y.height)) &&
                            (q = Y.lines.shift() || ""),
                            j.push(`| ${q.padEnd(F - 3, " ")} `);
                    }
                }
                c.push(`${j.join("")}|`);
            }
        }
        let m = this.rows.length === this.headerSize ? "=" : "-",
            T = [],
            p = this.rows[this.rows.length - 1];
        for (let _ = 0; _ < r.length; _ += 1) {
            let C = r[_],
                k = p.cells[_],
                I = k.tree || k.linked ? u : m;
            _ === 0 && (I = "+"), T.push(`${I}${m.repeat(C.width - 1)}`);
        }
        return (
            c.push(`${T.join("")}+`),
            c.join(`
`)
        );
    }
};
function I0(e, t) {
    return e.gridTables || (e.gridTables = []), e.gridTables.push(t), t;
}
function N0(e) {
    return e.gridTables.pop();
}
function $i(e) {
    return e.gridTables[e.gridTables.length - 1];
}
function Os(e, t, n, r) {
    return {
        tree: { type: "root", children: e.children },
        colSpan: e.colSpan || 1,
        rowSpan: e.rowSpan || 1,
        align: e.align,
        valign: e.valign,
    };
}
function hr(e, t, n, r) {
    let i = [];
    for (let u of e.children) u.type === ae && i.push(Os(u, e, n, r));
    return i;
}
function S0(e, t, n, r) {
    let i = $i(n);
    for (let u of e.children) u.type === ve && i.addHeaderRow(hr(u, e, n, r));
}
function R0(e, t, n, r) {
    let i = $i(n);
    for (let u of e.children) u.type === ve && i.addRow(hr(u, e, n, r));
}
function k0(e, t, n, r) {
    let i = $i(n);
    for (let u of e.children) u.type === ve && i.addFooterRow(hr(u, e, n, r));
}
function L0(e, t, n, r) {
    let i = n.enter(ke),
        u = I0(n, new Ki());
    for (let s of e.children)
        s.type === we
            ? S0(s, e, n, r)
            : s.type === Ie
            ? R0(s, e, n, r)
            : s.type === Me
            ? k0(s, e, n, r)
            : s.type === ve
            ? u.addRow(hr(s, e, n, r))
            : s.type === ae && u.addCell(Os(s, e, n, r));
    return i(), N0(n).toMarkdown(n);
}
function ys(e, t, n) {
    let r = ks(e, t, n);
    if (n.stack.includes(ae)) {
        r = r.replace(/[|+]/gm, "\\$&");
        let i = Math.min(256, Math.max(150, n.options.lineWidth));
        if (r.length > i) {
            let u = [];
            for (let s of r.split(`
`)) {
                for (; s.length > i; )
                    u.push(`${s.substring(0, i)}\x83`), (s = s.substring(i));
                u.push(s);
            }
            r = u.join(`
`);
        }
    }
    return r;
}
ys.peek = ks;
function O0(e, t, n) {
    let r = C0(e, t, n);
    return n.stack.includes(ae) && (r = r.replace(/[|+]/g, "\\$&")), r;
}
function Ji() {
    return {
        unsafe: [
            { character: "|", inConstruct: ae },
            { character: "+", inConstruct: ae },
        ],
        handlers: { text: Ls, gridTable: L0, inlineCode: O0, code: ys },
    };
}
function Ds(e, t, n) {
    let r = [];
    for (let u of t.children)
        if (u.type === ae) {
            let s = {};
            for (let c of ["colSpan", "rowSpan", "align", "valign"])
                c in u && (s[c] = u[c]);
            u.children?.length === 1 &&
                u.children[0].type === "paragraph" &&
                (u.children = u.children[0].children);
            let o = {
                type: "element",
                tagName: n,
                properties: s,
                children: e.all(u),
            };
            e.patch(u, o),
                r.push(o),
                Be(o, (c) =>
                    c.tagName === "code"
                        ? $t
                        : (c.type === "text" &&
                              (c.value = c.value.replace(/\r?\n/gm, " ")),
                          rt)
                );
        }
    let i = { type: "element", tagName: "tr", children: r, properties: {} };
    return e.patch(t, i), i;
}
function Zi(e, t, n) {
    let r = [];
    for (let i of t.children) i.type === ve && r.push(Ds(e, i, n));
    return r;
}
function eu(e = {}) {
    let { noHeader: t } = e;
    return function (r, i) {
        let u = [],
            s = [],
            o = [];
        for (let f of i.children)
            f.type === we
                ? (u = Zi(r, f, "th"))
                : f.type === Ie
                ? (s = Zi(r, f, "td"))
                : f.type === Me
                ? (o = Zi(r, f, "td"))
                : f.type === ve && s.push(Ds(r, f, "td"));
        let c;
        t && o.length === 0
            ? (c = [...u, ...s])
            : ((c = []),
              u.length &&
                  c.push({
                      type: "element",
                      tagName: "thead",
                      children: u,
                      properties: {},
                  }),
              s.length &&
                  c.push({
                      type: "element",
                      tagName: "tbody",
                      children: s,
                      properties: {},
                  }),
              o.length &&
                  c.push({
                      type: "element",
                      tagName: "tfoot",
                      children: o,
                      properties: {},
                  }));
        let l = {
            type: "element",
            tagName: "table",
            children: c,
            properties: {},
        };
        return r.patch(i, l), l;
    };
}
function Ps(e = {}) {
    let t = this.data();
    function n(i, u) {
        t[i] ? t[i].push(u) : (t[i] = [u]);
    }
    let r = { processor: this, ...e };
    n("micromarkExtensions", ki),
        n("fromMarkdownExtensions", Mi(r)),
        n("toMarkdownExtensions", Ji(e));
}
function ws(e, t) {
    let n = {
        type: "element",
        tagName: "blockquote",
        properties: {},
        children: e.wrap(e.all(t), !0),
    };
    return e.patch(t, n), e.applyData(t, n);
}
function Ms(e, t) {
    let n = { type: "element", tagName: "br", properties: {}, children: [] };
    return (
        e.patch(t, n),
        [
            e.applyData(t, n),
            {
                type: "text",
                value: `
`,
            },
        ]
    );
}
function Bs(e, t) {
    let n = t.value
            ? t.value +
              `
`
            : "",
        r = {};
    t.lang && (r.className = ["language-" + t.lang]);
    let i = {
        type: "element",
        tagName: "code",
        properties: r,
        children: [{ type: "text", value: n }],
    };
    return (
        t.meta && (i.data = { meta: t.meta }),
        e.patch(t, i),
        (i = e.applyData(t, i)),
        (i = {
            type: "element",
            tagName: "pre",
            properties: {},
            children: [i],
        }),
        e.patch(t, i),
        i
    );
}
function Fs(e, t) {
    let n = {
        type: "element",
        tagName: "del",
        properties: {},
        children: e.all(t),
    };
    return e.patch(t, n), e.applyData(t, n);
}
function Hs(e, t) {
    let n = {
        type: "element",
        tagName: "em",
        properties: {},
        children: e.all(t),
    };
    return e.patch(t, n), e.applyData(t, n);
}
function Us(e, t) {
    let n =
            typeof e.options.clobberPrefix == "string"
                ? e.options.clobberPrefix
                : "user-content-",
        r = String(t.identifier).toUpperCase(),
        i = Pe(r.toLowerCase()),
        u = e.footnoteOrder.indexOf(r),
        s,
        o = e.footnoteCounts.get(r);
    o === void 0
        ? ((o = 0), e.footnoteOrder.push(r), (s = e.footnoteOrder.length))
        : (s = u + 1),
        (o += 1),
        e.footnoteCounts.set(r, o);
    let c = {
        type: "element",
        tagName: "a",
        properties: {
            href: "#" + n + "fn-" + i,
            id: n + "fnref-" + i + (o > 1 ? "-" + o : ""),
            dataFootnoteRef: !0,
            ariaDescribedBy: ["footnote-label"],
        },
        children: [{ type: "text", value: String(s) }],
    };
    e.patch(t, c);
    let l = { type: "element", tagName: "sup", properties: {}, children: [c] };
    return e.patch(t, l), e.applyData(t, l);
}
function vs(e, t) {
    let n = {
        type: "element",
        tagName: "h" + t.depth,
        properties: {},
        children: e.all(t),
    };
    return e.patch(t, n), e.applyData(t, n);
}
function Ys(e, t) {
    if (e.options.allowDangerousHtml) {
        let n = { type: "raw", value: t.value };
        return e.patch(t, n), e.applyData(t, n);
    }
}
function mr(e, t) {
    let n = t.referenceType,
        r = "]";
    if (
        (n === "collapsed"
            ? (r += "[]")
            : n === "full" && (r += "[" + (t.label || t.identifier) + "]"),
        t.type === "imageReference")
    )
        return [{ type: "text", value: "![" + t.alt + r }];
    let i = e.all(t),
        u = i[0];
    u && u.type === "text"
        ? (u.value = "[" + u.value)
        : i.unshift({ type: "text", value: "[" });
    let s = i[i.length - 1];
    return (
        s && s.type === "text"
            ? (s.value += r)
            : i.push({ type: "text", value: r }),
        i
    );
}
function zs(e, t) {
    let n = String(t.identifier).toUpperCase(),
        r = e.definitionById.get(n);
    if (!r) return mr(e, t);
    let i = { src: Pe(r.url || ""), alt: t.alt };
    r.title !== null && r.title !== void 0 && (i.title = r.title);
    let u = { type: "element", tagName: "img", properties: i, children: [] };
    return e.patch(t, u), e.applyData(t, u);
}
function qs(e, t) {
    let n = { src: Pe(t.url) };
    t.alt !== null && t.alt !== void 0 && (n.alt = t.alt),
        t.title !== null && t.title !== void 0 && (n.title = t.title);
    let r = { type: "element", tagName: "img", properties: n, children: [] };
    return e.patch(t, r), e.applyData(t, r);
}
function Vs(e, t) {
    let n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
    e.patch(t, n);
    let r = { type: "element", tagName: "code", properties: {}, children: [n] };
    return e.patch(t, r), e.applyData(t, r);
}
function Ws(e, t) {
    let n = String(t.identifier).toUpperCase(),
        r = e.definitionById.get(n);
    if (!r) return mr(e, t);
    let i = { href: Pe(r.url || "") };
    r.title !== null && r.title !== void 0 && (i.title = r.title);
    let u = {
        type: "element",
        tagName: "a",
        properties: i,
        children: e.all(t),
    };
    return e.patch(t, u), e.applyData(t, u);
}
function Qs(e, t) {
    let n = { href: Pe(t.url) };
    t.title !== null && t.title !== void 0 && (n.title = t.title);
    let r = {
        type: "element",
        tagName: "a",
        properties: n,
        children: e.all(t),
    };
    return e.patch(t, r), e.applyData(t, r);
}
function Gs(e, t, n) {
    let r = e.all(t),
        i = n ? y0(n) : Xs(t),
        u = {},
        s = [];
    if (typeof t.checked == "boolean") {
        let f = r[0],
            m;
        f && f.type === "element" && f.tagName === "p"
            ? (m = f)
            : ((m = {
                  type: "element",
                  tagName: "p",
                  properties: {},
                  children: [],
              }),
              r.unshift(m)),
            m.children.length > 0 &&
                m.children.unshift({ type: "text", value: " " }),
            m.children.unshift({
                type: "element",
                tagName: "input",
                properties: {
                    type: "checkbox",
                    checked: t.checked,
                    disabled: !0,
                },
                children: [],
            }),
            (u.className = ["task-list-item"]);
    }
    let o = -1;
    for (; ++o < r.length; ) {
        let f = r[o];
        (i || o !== 0 || f.type !== "element" || f.tagName !== "p") &&
            s.push({
                type: "text",
                value: `
`,
            }),
            f.type === "element" && f.tagName === "p" && !i
                ? s.push(...f.children)
                : s.push(f);
    }
    let c = r[r.length - 1];
    c &&
        (i || c.type !== "element" || c.tagName !== "p") &&
        s.push({
            type: "text",
            value: `
`,
        });
    let l = { type: "element", tagName: "li", properties: u, children: s };
    return e.patch(t, l), e.applyData(t, l);
}
function y0(e) {
    let t = !1;
    if (e.type === "list") {
        t = e.spread || !1;
        let n = e.children,
            r = -1;
        for (; !t && ++r < n.length; ) t = Xs(n[r]);
    }
    return t;
}
function Xs(e) {
    let t = e.spread;
    return t ?? e.children.length > 1;
}
function js(e, t) {
    let n = {},
        r = e.all(t),
        i = -1;
    for (
        typeof t.start == "number" && t.start !== 1 && (n.start = t.start);
        ++i < r.length;

    ) {
        let s = r[i];
        if (
            s.type === "element" &&
            s.tagName === "li" &&
            s.properties &&
            Array.isArray(s.properties.className) &&
            s.properties.className.includes("task-list-item")
        ) {
            n.className = ["contains-task-list"];
            break;
        }
    }
    let u = {
        type: "element",
        tagName: t.ordered ? "ol" : "ul",
        properties: n,
        children: e.wrap(r, !0),
    };
    return e.patch(t, u), e.applyData(t, u);
}
function Ks(e, t) {
    let n = {
        type: "element",
        tagName: "p",
        properties: {},
        children: e.all(t),
    };
    return e.patch(t, n), e.applyData(t, n);
}
function $s(e, t) {
    let n = { type: "root", children: e.wrap(e.all(t)) };
    return e.patch(t, n), e.applyData(t, n);
}
function Js(e, t) {
    let n = {
        type: "element",
        tagName: "strong",
        properties: {},
        children: e.all(t),
    };
    return e.patch(t, n), e.applyData(t, n);
}
var Bt = Zs("end"),
    Ye = Zs("start");
function Zs(e) {
    return t;
    function t(n) {
        let r = (n && n.position && n.position[e]) || {};
        if (
            typeof r.line == "number" &&
            r.line > 0 &&
            typeof r.column == "number" &&
            r.column > 0
        )
            return {
                line: r.line,
                column: r.column,
                offset:
                    typeof r.offset == "number" && r.offset > -1
                        ? r.offset
                        : void 0,
            };
    }
}
function tu(e) {
    let t = Ye(e),
        n = Bt(e);
    if (t && n) return { start: t, end: n };
}
function eo(e, t) {
    let n = e.all(t),
        r = n.shift(),
        i = [];
    if (r) {
        let s = {
            type: "element",
            tagName: "thead",
            properties: {},
            children: e.wrap([r], !0),
        };
        e.patch(t.children[0], s), i.push(s);
    }
    if (n.length > 0) {
        let s = {
                type: "element",
                tagName: "tbody",
                properties: {},
                children: e.wrap(n, !0),
            },
            o = Ye(t.children[1]),
            c = Bt(t.children[t.children.length - 1]);
        o && c && (s.position = { start: o, end: c }), i.push(s);
    }
    let u = {
        type: "element",
        tagName: "table",
        properties: {},
        children: e.wrap(i, !0),
    };
    return e.patch(t, u), e.applyData(t, u);
}
function to(e, t, n) {
    let r = n ? n.children : void 0,
        u = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td",
        s = n && n.type === "table" ? n.align : void 0,
        o = s ? s.length : t.children.length,
        c = -1,
        l = [];
    for (; ++c < o; ) {
        let m = t.children[c],
            T = {},
            p = s ? s[c] : void 0;
        p && (T.align = p);
        let _ = { type: "element", tagName: u, properties: T, children: [] };
        m && ((_.children = e.all(m)), e.patch(m, _), (_ = e.applyData(m, _))),
            l.push(_);
    }
    let f = {
        type: "element",
        tagName: "tr",
        properties: {},
        children: e.wrap(l, !0),
    };
    return e.patch(t, f), e.applyData(t, f);
}
function no(e, t) {
    let n = {
        type: "element",
        tagName: "td",
        properties: {},
        children: e.all(t),
    };
    return e.patch(t, n), e.applyData(t, n);
}
function io(e) {
    let t = String(e),
        n = /\r?\n|\r/g,
        r = n.exec(t),
        i = 0,
        u = [];
    for (; r; )
        u.push(ro(t.slice(i, r.index), i > 0, !0), r[0]),
            (i = r.index + r[0].length),
            (r = n.exec(t));
    return u.push(ro(t.slice(i), i > 0, !1)), u.join("");
}
function ro(e, t, n) {
    let r = 0,
        i = e.length;
    if (t) {
        let u = e.codePointAt(r);
        for (; u === 9 || u === 32; ) r++, (u = e.codePointAt(r));
    }
    if (n) {
        let u = e.codePointAt(i - 1);
        for (; u === 9 || u === 32; ) i--, (u = e.codePointAt(i - 1));
    }
    return i > r ? e.slice(r, i) : "";
}
function uo(e, t) {
    let n = { type: "text", value: io(String(t.value)) };
    return e.patch(t, n), e.applyData(t, n);
}
function ao(e, t) {
    let n = { type: "element", tagName: "hr", properties: {}, children: [] };
    return e.patch(t, n), e.applyData(t, n);
}
var Er = {
    blockquote: ws,
    break: Ms,
    code: Bs,
    delete: Fs,
    emphasis: Hs,
    footnoteReference: Us,
    heading: vs,
    html: Ys,
    imageReference: zs,
    image: qs,
    inlineCode: Vs,
    linkReference: Ws,
    link: Qs,
    listItem: Gs,
    list: js,
    paragraph: Ks,
    root: $s,
    strong: Js,
    table: eo,
    tableCell: no,
    tableRow: to,
    text: uo,
    thematicBreak: ao,
    toml: pr,
    yaml: pr,
    definition: pr,
    footnoteDefinition: pr,
};
function pr() {}
var so = typeof self == "object" ? self : globalThis,
    D0 = (e, t) => {
        let n = (i, u) => (e.set(u, i), i),
            r = (i) => {
                if (e.has(i)) return e.get(i);
                let [u, s] = t[i];
                switch (u) {
                    case 0:
                    case -1:
                        return n(s, i);
                    case 1: {
                        let o = n([], i);
                        for (let c of s) o.push(r(c));
                        return o;
                    }
                    case 2: {
                        let o = n({}, i);
                        for (let [c, l] of s) o[r(c)] = r(l);
                        return o;
                    }
                    case 3:
                        return n(new Date(s), i);
                    case 4: {
                        let { source: o, flags: c } = s;
                        return n(new RegExp(o, c), i);
                    }
                    case 5: {
                        let o = n(new Map(), i);
                        for (let [c, l] of s) o.set(r(c), r(l));
                        return o;
                    }
                    case 6: {
                        let o = n(new Set(), i);
                        for (let c of s) o.add(r(c));
                        return o;
                    }
                    case 7: {
                        let { name: o, message: c } = s;
                        return n(new so[o](c), i);
                    }
                    case 8:
                        return n(BigInt(s), i);
                    case "BigInt":
                        return n(Object(BigInt(s)), i);
                }
                return n(new so[u](s), i);
            };
        return r;
    },
    uu = (e) => D0(new Map(), e)(0);
var tn = "",
    { toString: P0 } = {},
    { keys: w0 } = Object,
    Nn = (e) => {
        let t = typeof e;
        if (t !== "object" || !e) return [0, t];
        let n = P0.call(e).slice(8, -1);
        switch (n) {
            case "Array":
                return [1, tn];
            case "Object":
                return [2, tn];
            case "Date":
                return [3, tn];
            case "RegExp":
                return [4, tn];
            case "Map":
                return [5, tn];
            case "Set":
                return [6, tn];
        }
        return n.includes("Array")
            ? [1, n]
            : n.includes("Error")
            ? [7, n]
            : [2, n];
    },
    _r = ([e, t]) => e === 0 && (t === "function" || t === "symbol"),
    M0 = (e, t, n, r) => {
        let i = (s, o) => {
                let c = r.push(s) - 1;
                return n.set(o, c), c;
            },
            u = (s) => {
                if (n.has(s)) return n.get(s);
                let [o, c] = Nn(s);
                switch (o) {
                    case 0: {
                        let f = s;
                        switch (c) {
                            case "bigint":
                                (o = 8), (f = s.toString());
                                break;
                            case "function":
                            case "symbol":
                                if (e)
                                    throw new TypeError(
                                        "unable to serialize " + c
                                    );
                                f = null;
                                break;
                            case "undefined":
                                return i([-1], s);
                        }
                        return i([o, f], s);
                    }
                    case 1: {
                        if (c) return i([c, [...s]], s);
                        let f = [],
                            m = i([o, f], s);
                        for (let T of s) f.push(u(T));
                        return m;
                    }
                    case 2: {
                        if (c)
                            switch (c) {
                                case "BigInt":
                                    return i([c, s.toString()], s);
                                case "Boolean":
                                case "Number":
                                case "String":
                                    return i([c, s.valueOf()], s);
                            }
                        if (t && "toJSON" in s) return u(s.toJSON());
                        let f = [],
                            m = i([o, f], s);
                        for (let T of w0(s))
                            (e || !_r(Nn(s[T]))) && f.push([u(T), u(s[T])]);
                        return m;
                    }
                    case 3:
                        return i([o, s.toISOString()], s);
                    case 4: {
                        let { source: f, flags: m } = s;
                        return i([o, { source: f, flags: m }], s);
                    }
                    case 5: {
                        let f = [],
                            m = i([o, f], s);
                        for (let [T, p] of s)
                            (e || !(_r(Nn(T)) || _r(Nn(p)))) &&
                                f.push([u(T), u(p)]);
                        return m;
                    }
                    case 6: {
                        let f = [],
                            m = i([o, f], s);
                        for (let T of s) (e || !_r(Nn(T))) && f.push(u(T));
                        return m;
                    }
                }
                let { message: l } = s;
                return i([o, { name: c, message: l }], s);
            };
        return u;
    },
    au = (e, { json: t, lossy: n } = {}) => {
        let r = [];
        return M0(!(t || n), !!t, new Map(), r)(e), r;
    };
var ct =
    typeof structuredClone == "function"
        ? (e, t) =>
              t && ("json" in t || "lossy" in t)
                  ? uu(au(e, t))
                  : structuredClone(e)
        : (e, t) => uu(au(e, t));
function B0(e, t) {
    let n = [{ type: "text", value: "\u21A9" }];
    return (
        t > 1 &&
            n.push({
                type: "element",
                tagName: "sup",
                properties: {},
                children: [{ type: "text", value: String(t) }],
            }),
        n
    );
}
function F0(e, t) {
    return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function oo(e) {
    let t =
            typeof e.options.clobberPrefix == "string"
                ? e.options.clobberPrefix
                : "user-content-",
        n = e.options.footnoteBackContent || B0,
        r = e.options.footnoteBackLabel || F0,
        i = e.options.footnoteLabel || "Footnotes",
        u = e.options.footnoteLabelTagName || "h2",
        s = e.options.footnoteLabelProperties || { className: ["sr-only"] },
        o = [],
        c = -1;
    for (; ++c < e.footnoteOrder.length; ) {
        let l = e.footnoteById.get(e.footnoteOrder[c]);
        if (!l) continue;
        let f = e.all(l),
            m = String(l.identifier).toUpperCase(),
            T = Pe(m.toLowerCase()),
            p = 0,
            _ = [],
            C = e.footnoteCounts.get(m);
        for (; C !== void 0 && ++p <= C; ) {
            _.length > 0 && _.push({ type: "text", value: " " });
            let O = typeof n == "string" ? n : n(c, p);
            typeof O == "string" && (O = { type: "text", value: O }),
                _.push({
                    type: "element",
                    tagName: "a",
                    properties: {
                        href: "#" + t + "fnref-" + T + (p > 1 ? "-" + p : ""),
                        dataFootnoteBackref: "",
                        ariaLabel: typeof r == "string" ? r : r(c, p),
                        className: ["data-footnote-backref"],
                    },
                    children: Array.isArray(O) ? O : [O],
                });
        }
        let k = f[f.length - 1];
        if (k && k.type === "element" && k.tagName === "p") {
            let O = k.children[k.children.length - 1];
            O && O.type === "text"
                ? (O.value += " ")
                : k.children.push({ type: "text", value: " " }),
                k.children.push(..._);
        } else f.push(..._);
        let I = {
            type: "element",
            tagName: "li",
            properties: { id: t + "fn-" + T },
            children: e.wrap(f, !0),
        };
        e.patch(l, I), o.push(I);
    }
    if (o.length !== 0)
        return {
            type: "element",
            tagName: "section",
            properties: { dataFootnotes: !0, className: ["footnotes"] },
            children: [
                {
                    type: "element",
                    tagName: u,
                    properties: { ...ct(s), id: "footnote-label" },
                    children: [{ type: "text", value: i }],
                },
                {
                    type: "text",
                    value: `
`,
                },
                {
                    type: "element",
                    tagName: "ol",
                    properties: {},
                    children: e.wrap(o, !0),
                },
                {
                    type: "text",
                    value: `
`,
                },
            ],
        };
}
var su = {}.hasOwnProperty,
    H0 = {};
function lo(e, t) {
    let n = t || H0,
        r = new Map(),
        i = new Map(),
        u = new Map(),
        s = { ...Er, ...n.handlers },
        o = {
            all: l,
            applyData: v0,
            definitionById: r,
            footnoteById: i,
            footnoteCounts: u,
            footnoteOrder: [],
            handlers: s,
            one: c,
            options: n,
            patch: U0,
            wrap: z0,
        };
    return (
        Be(e, function (f) {
            if (f.type === "definition" || f.type === "footnoteDefinition") {
                let m = f.type === "definition" ? r : i,
                    T = String(f.identifier).toUpperCase();
                m.has(T) || m.set(T, f);
            }
        }),
        o
    );
    function c(f, m) {
        let T = f.type,
            p = o.handlers[T];
        if (su.call(o.handlers, T) && p) return p(o, f, m);
        if (o.options.passThrough && o.options.passThrough.includes(T)) {
            if ("children" in f) {
                let { children: C, ...k } = f,
                    I = ct(k);
                return (I.children = o.all(f)), I;
            }
            return ct(f);
        }
        return (o.options.unknownHandler || Y0)(o, f, m);
    }
    function l(f) {
        let m = [];
        if ("children" in f) {
            let T = f.children,
                p = -1;
            for (; ++p < T.length; ) {
                let _ = o.one(T[p], f);
                if (_) {
                    if (
                        p &&
                        T[p - 1].type === "break" &&
                        (!Array.isArray(_) &&
                            _.type === "text" &&
                            (_.value = co(_.value)),
                        !Array.isArray(_) && _.type === "element")
                    ) {
                        let C = _.children[0];
                        C && C.type === "text" && (C.value = co(C.value));
                    }
                    Array.isArray(_) ? m.push(..._) : m.push(_);
                }
            }
        }
        return m;
    }
}
function U0(e, t) {
    e.position && (t.position = tu(e));
}
function v0(e, t) {
    let n = t;
    if (e && e.data) {
        let r = e.data.hName,
            i = e.data.hChildren,
            u = e.data.hProperties;
        if (typeof r == "string")
            if (n.type === "element") n.tagName = r;
            else {
                let s = "children" in n ? n.children : [n];
                n = {
                    type: "element",
                    tagName: r,
                    properties: {},
                    children: s,
                };
            }
        n.type === "element" && u && Object.assign(n.properties, ct(u)),
            "children" in n &&
                n.children &&
                i !== null &&
                i !== void 0 &&
                (n.children = i);
    }
    return n;
}
function Y0(e, t) {
    let n = t.data || {},
        r =
            "value" in t &&
            !(su.call(n, "hProperties") || su.call(n, "hChildren"))
                ? { type: "text", value: t.value }
                : {
                      type: "element",
                      tagName: "div",
                      properties: {},
                      children: e.all(t),
                  };
    return e.patch(t, r), e.applyData(t, r);
}
function z0(e, t) {
    let n = [],
        r = -1;
    for (
        t &&
        n.push({
            type: "text",
            value: `
`,
        });
        ++r < e.length;

    )
        r &&
            n.push({
                type: "text",
                value: `
`,
            }),
            n.push(e[r]);
    return (
        t &&
            e.length > 0 &&
            n.push({
                type: "text",
                value: `
`,
            }),
        n
    );
}
function co(e) {
    let t = 0,
        n = e.charCodeAt(t);
    for (; n === 9 || n === 32; ) t++, (n = e.charCodeAt(t));
    return e.slice(t);
}
function fo(e, t) {
    let n = lo(e, t),
        r = n.one(e, void 0),
        i = oo(n),
        u = Array.isArray(r)
            ? { type: "root", children: r }
            : r || { type: "root", children: [] };
    return (
        i &&
            ("children" in u,
            u.children.push(
                {
                    type: "text",
                    value: `
`,
                },
                i
            )),
        u
    );
}
var lt = class {
    constructor(t, n, r) {
        (this.property = t), (this.normal = n), r && (this.space = r);
    }
};
lt.prototype.property = {};
lt.prototype.normal = {};
lt.prototype.space = null;
function ou(e, t) {
    let n = {},
        r = {},
        i = -1;
    for (; ++i < e.length; )
        Object.assign(n, e[i].property), Object.assign(r, e[i].normal);
    return new lt(n, r, t);
}
function ft(e) {
    return e.toLowerCase();
}
var Ae = class {
    constructor(t, n) {
        (this.property = t), (this.attribute = n);
    }
};
Ae.prototype.space = null;
Ae.prototype.boolean = !1;
Ae.prototype.booleanish = !1;
Ae.prototype.overloadedBoolean = !1;
Ae.prototype.number = !1;
Ae.prototype.commaSeparated = !1;
Ae.prototype.spaceSeparated = !1;
Ae.prototype.commaOrSpaceSeparated = !1;
Ae.prototype.mustUseProperty = !1;
Ae.prototype.defined = !1;
var Sn = {};
jn(Sn, {
    boolean: () => W,
    booleanish: () => se,
    commaOrSpaceSeparated: () => Le,
    commaSeparated: () => Ct,
    number: () => D,
    overloadedBoolean: () => cu,
    spaceSeparated: () => te,
});
var q0 = 0,
    W = Ft(),
    se = Ft(),
    cu = Ft(),
    D = Ft(),
    te = Ft(),
    Ct = Ft(),
    Le = Ft();
function Ft() {
    return 2 ** ++q0;
}
var lu = Object.keys(Sn),
    Ht = class extends Ae {
        constructor(t, n, r, i) {
            let u = -1;
            if ((super(t, n), ho(this, "space", i), typeof r == "number"))
                for (; ++u < lu.length; ) {
                    let s = lu[u];
                    ho(this, lu[u], (r & Sn[s]) === Sn[s]);
                }
        }
    };
Ht.prototype.defined = !0;
function ho(e, t, n) {
    n && (e[t] = n);
}
var V0 = {}.hasOwnProperty;
function ze(e) {
    let t = {},
        n = {},
        r;
    for (r in e.properties)
        if (V0.call(e.properties, r)) {
            let i = e.properties[r],
                u = new Ht(r, e.transform(e.attributes || {}, r), i, e.space);
            e.mustUseProperty &&
                e.mustUseProperty.includes(r) &&
                (u.mustUseProperty = !0),
                (t[r] = u),
                (n[ft(r)] = r),
                (n[ft(u.attribute)] = r);
        }
    return new lt(t, n, e.space);
}
var fu = ze({
    space: "xlink",
    transform(e, t) {
        return "xlink:" + t.slice(5).toLowerCase();
    },
    properties: {
        xLinkActuate: null,
        xLinkArcRole: null,
        xLinkHref: null,
        xLinkRole: null,
        xLinkShow: null,
        xLinkTitle: null,
        xLinkType: null,
    },
});
var du = ze({
    space: "xml",
    transform(e, t) {
        return "xml:" + t.slice(3).toLowerCase();
    },
    properties: { xmlLang: null, xmlBase: null, xmlSpace: null },
});
function xr(e, t) {
    return t in e ? e[t] : t;
}
function Cr(e, t) {
    return xr(e, t.toLowerCase());
}
var hu = ze({
    space: "xmlns",
    attributes: { xmlnsxlink: "xmlns:xlink" },
    transform: Cr,
    properties: { xmlns: null, xmlnsXLink: null },
});
var mu = ze({
    transform(e, t) {
        return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
    },
    properties: {
        ariaActiveDescendant: null,
        ariaAtomic: se,
        ariaAutoComplete: null,
        ariaBusy: se,
        ariaChecked: se,
        ariaColCount: D,
        ariaColIndex: D,
        ariaColSpan: D,
        ariaControls: te,
        ariaCurrent: null,
        ariaDescribedBy: te,
        ariaDetails: null,
        ariaDisabled: se,
        ariaDropEffect: te,
        ariaErrorMessage: null,
        ariaExpanded: se,
        ariaFlowTo: te,
        ariaGrabbed: se,
        ariaHasPopup: null,
        ariaHidden: se,
        ariaInvalid: null,
        ariaKeyShortcuts: null,
        ariaLabel: null,
        ariaLabelledBy: te,
        ariaLevel: D,
        ariaLive: null,
        ariaModal: se,
        ariaMultiLine: se,
        ariaMultiSelectable: se,
        ariaOrientation: null,
        ariaOwns: te,
        ariaPlaceholder: null,
        ariaPosInSet: D,
        ariaPressed: se,
        ariaReadOnly: se,
        ariaRelevant: null,
        ariaRequired: se,
        ariaRoleDescription: te,
        ariaRowCount: D,
        ariaRowIndex: D,
        ariaRowSpan: D,
        ariaSelected: se,
        ariaSetSize: D,
        ariaSort: null,
        ariaValueMax: D,
        ariaValueMin: D,
        ariaValueNow: D,
        ariaValueText: null,
        role: null,
    },
});
var mo = ze({
    space: "html",
    attributes: {
        acceptcharset: "accept-charset",
        classname: "class",
        htmlfor: "for",
        httpequiv: "http-equiv",
    },
    transform: Cr,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
        abbr: null,
        accept: Ct,
        acceptCharset: te,
        accessKey: te,
        action: null,
        allow: null,
        allowFullScreen: W,
        allowPaymentRequest: W,
        allowUserMedia: W,
        alt: null,
        as: null,
        async: W,
        autoCapitalize: null,
        autoComplete: te,
        autoFocus: W,
        autoPlay: W,
        blocking: te,
        capture: null,
        charSet: null,
        checked: W,
        cite: null,
        className: te,
        cols: D,
        colSpan: null,
        content: null,
        contentEditable: se,
        controls: W,
        controlsList: te,
        coords: D | Ct,
        crossOrigin: null,
        data: null,
        dateTime: null,
        decoding: null,
        default: W,
        defer: W,
        dir: null,
        dirName: null,
        disabled: W,
        download: cu,
        draggable: se,
        encType: null,
        enterKeyHint: null,
        fetchPriority: null,
        form: null,
        formAction: null,
        formEncType: null,
        formMethod: null,
        formNoValidate: W,
        formTarget: null,
        headers: te,
        height: D,
        hidden: W,
        high: D,
        href: null,
        hrefLang: null,
        htmlFor: te,
        httpEquiv: te,
        id: null,
        imageSizes: null,
        imageSrcSet: null,
        inert: W,
        inputMode: null,
        integrity: null,
        is: null,
        isMap: W,
        itemId: null,
        itemProp: te,
        itemRef: te,
        itemScope: W,
        itemType: te,
        kind: null,
        label: null,
        lang: null,
        language: null,
        list: null,
        loading: null,
        loop: W,
        low: D,
        manifest: null,
        max: null,
        maxLength: D,
        media: null,
        method: null,
        min: null,
        minLength: D,
        multiple: W,
        muted: W,
        name: null,
        nonce: null,
        noModule: W,
        noValidate: W,
        onAbort: null,
        onAfterPrint: null,
        onAuxClick: null,
        onBeforeMatch: null,
        onBeforePrint: null,
        onBeforeToggle: null,
        onBeforeUnload: null,
        onBlur: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onContextLost: null,
        onContextMenu: null,
        onContextRestored: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFormData: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLanguageChange: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadEnd: null,
        onLoadStart: null,
        onMessage: null,
        onMessageError: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRejectionHandled: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onScrollEnd: null,
        onSecurityPolicyViolation: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onSlotChange: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnhandledRejection: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onWheel: null,
        open: W,
        optimum: D,
        pattern: null,
        ping: te,
        placeholder: null,
        playsInline: W,
        popover: null,
        popoverTarget: null,
        popoverTargetAction: null,
        poster: null,
        preload: null,
        readOnly: W,
        referrerPolicy: null,
        rel: te,
        required: W,
        reversed: W,
        rows: D,
        rowSpan: D,
        sandbox: te,
        scope: null,
        scoped: W,
        seamless: W,
        selected: W,
        shadowRootClonable: W,
        shadowRootDelegatesFocus: W,
        shadowRootMode: null,
        shape: null,
        size: D,
        sizes: null,
        slot: null,
        span: D,
        spellCheck: se,
        src: null,
        srcDoc: null,
        srcLang: null,
        srcSet: null,
        start: D,
        step: null,
        style: null,
        tabIndex: D,
        target: null,
        title: null,
        translate: null,
        type: null,
        typeMustMatch: W,
        useMap: null,
        value: se,
        width: D,
        wrap: null,
        writingSuggestions: null,
        align: null,
        aLink: null,
        archive: te,
        axis: null,
        background: null,
        bgColor: null,
        border: D,
        borderColor: null,
        bottomMargin: D,
        cellPadding: null,
        cellSpacing: null,
        char: null,
        charOff: null,
        classId: null,
        clear: null,
        code: null,
        codeBase: null,
        codeType: null,
        color: null,
        compact: W,
        declare: W,
        event: null,
        face: null,
        frame: null,
        frameBorder: null,
        hSpace: D,
        leftMargin: D,
        link: null,
        longDesc: null,
        lowSrc: null,
        marginHeight: D,
        marginWidth: D,
        noResize: W,
        noHref: W,
        noShade: W,
        noWrap: W,
        object: null,
        profile: null,
        prompt: null,
        rev: null,
        rightMargin: D,
        rules: null,
        scheme: null,
        scrolling: se,
        standby: null,
        summary: null,
        text: null,
        topMargin: D,
        valueType: null,
        version: null,
        vAlign: null,
        vLink: null,
        vSpace: D,
        allowTransparency: null,
        autoCorrect: null,
        autoSave: null,
        disablePictureInPicture: W,
        disableRemotePlayback: W,
        prefix: null,
        property: null,
        results: D,
        security: null,
        unselectable: null,
    },
});
var po = ze({
    space: "svg",
    attributes: {
        accentHeight: "accent-height",
        alignmentBaseline: "alignment-baseline",
        arabicForm: "arabic-form",
        baselineShift: "baseline-shift",
        capHeight: "cap-height",
        className: "class",
        clipPath: "clip-path",
        clipRule: "clip-rule",
        colorInterpolation: "color-interpolation",
        colorInterpolationFilters: "color-interpolation-filters",
        colorProfile: "color-profile",
        colorRendering: "color-rendering",
        crossOrigin: "crossorigin",
        dataType: "datatype",
        dominantBaseline: "dominant-baseline",
        enableBackground: "enable-background",
        fillOpacity: "fill-opacity",
        fillRule: "fill-rule",
        floodColor: "flood-color",
        floodOpacity: "flood-opacity",
        fontFamily: "font-family",
        fontSize: "font-size",
        fontSizeAdjust: "font-size-adjust",
        fontStretch: "font-stretch",
        fontStyle: "font-style",
        fontVariant: "font-variant",
        fontWeight: "font-weight",
        glyphName: "glyph-name",
        glyphOrientationHorizontal: "glyph-orientation-horizontal",
        glyphOrientationVertical: "glyph-orientation-vertical",
        hrefLang: "hreflang",
        horizAdvX: "horiz-adv-x",
        horizOriginX: "horiz-origin-x",
        horizOriginY: "horiz-origin-y",
        imageRendering: "image-rendering",
        letterSpacing: "letter-spacing",
        lightingColor: "lighting-color",
        markerEnd: "marker-end",
        markerMid: "marker-mid",
        markerStart: "marker-start",
        navDown: "nav-down",
        navDownLeft: "nav-down-left",
        navDownRight: "nav-down-right",
        navLeft: "nav-left",
        navNext: "nav-next",
        navPrev: "nav-prev",
        navRight: "nav-right",
        navUp: "nav-up",
        navUpLeft: "nav-up-left",
        navUpRight: "nav-up-right",
        onAbort: "onabort",
        onActivate: "onactivate",
        onAfterPrint: "onafterprint",
        onBeforePrint: "onbeforeprint",
        onBegin: "onbegin",
        onCancel: "oncancel",
        onCanPlay: "oncanplay",
        onCanPlayThrough: "oncanplaythrough",
        onChange: "onchange",
        onClick: "onclick",
        onClose: "onclose",
        onCopy: "oncopy",
        onCueChange: "oncuechange",
        onCut: "oncut",
        onDblClick: "ondblclick",
        onDrag: "ondrag",
        onDragEnd: "ondragend",
        onDragEnter: "ondragenter",
        onDragExit: "ondragexit",
        onDragLeave: "ondragleave",
        onDragOver: "ondragover",
        onDragStart: "ondragstart",
        onDrop: "ondrop",
        onDurationChange: "ondurationchange",
        onEmptied: "onemptied",
        onEnd: "onend",
        onEnded: "onended",
        onError: "onerror",
        onFocus: "onfocus",
        onFocusIn: "onfocusin",
        onFocusOut: "onfocusout",
        onHashChange: "onhashchange",
        onInput: "oninput",
        onInvalid: "oninvalid",
        onKeyDown: "onkeydown",
        onKeyPress: "onkeypress",
        onKeyUp: "onkeyup",
        onLoad: "onload",
        onLoadedData: "onloadeddata",
        onLoadedMetadata: "onloadedmetadata",
        onLoadStart: "onloadstart",
        onMessage: "onmessage",
        onMouseDown: "onmousedown",
        onMouseEnter: "onmouseenter",
        onMouseLeave: "onmouseleave",
        onMouseMove: "onmousemove",
        onMouseOut: "onmouseout",
        onMouseOver: "onmouseover",
        onMouseUp: "onmouseup",
        onMouseWheel: "onmousewheel",
        onOffline: "onoffline",
        onOnline: "ononline",
        onPageHide: "onpagehide",
        onPageShow: "onpageshow",
        onPaste: "onpaste",
        onPause: "onpause",
        onPlay: "onplay",
        onPlaying: "onplaying",
        onPopState: "onpopstate",
        onProgress: "onprogress",
        onRateChange: "onratechange",
        onRepeat: "onrepeat",
        onReset: "onreset",
        onResize: "onresize",
        onScroll: "onscroll",
        onSeeked: "onseeked",
        onSeeking: "onseeking",
        onSelect: "onselect",
        onShow: "onshow",
        onStalled: "onstalled",
        onStorage: "onstorage",
        onSubmit: "onsubmit",
        onSuspend: "onsuspend",
        onTimeUpdate: "ontimeupdate",
        onToggle: "ontoggle",
        onUnload: "onunload",
        onVolumeChange: "onvolumechange",
        onWaiting: "onwaiting",
        onZoom: "onzoom",
        overlinePosition: "overline-position",
        overlineThickness: "overline-thickness",
        paintOrder: "paint-order",
        panose1: "panose-1",
        pointerEvents: "pointer-events",
        referrerPolicy: "referrerpolicy",
        renderingIntent: "rendering-intent",
        shapeRendering: "shape-rendering",
        stopColor: "stop-color",
        stopOpacity: "stop-opacity",
        strikethroughPosition: "strikethrough-position",
        strikethroughThickness: "strikethrough-thickness",
        strokeDashArray: "stroke-dasharray",
        strokeDashOffset: "stroke-dashoffset",
        strokeLineCap: "stroke-linecap",
        strokeLineJoin: "stroke-linejoin",
        strokeMiterLimit: "stroke-miterlimit",
        strokeOpacity: "stroke-opacity",
        strokeWidth: "stroke-width",
        tabIndex: "tabindex",
        textAnchor: "text-anchor",
        textDecoration: "text-decoration",
        textRendering: "text-rendering",
        transformOrigin: "transform-origin",
        typeOf: "typeof",
        underlinePosition: "underline-position",
        underlineThickness: "underline-thickness",
        unicodeBidi: "unicode-bidi",
        unicodeRange: "unicode-range",
        unitsPerEm: "units-per-em",
        vAlphabetic: "v-alphabetic",
        vHanging: "v-hanging",
        vIdeographic: "v-ideographic",
        vMathematical: "v-mathematical",
        vectorEffect: "vector-effect",
        vertAdvY: "vert-adv-y",
        vertOriginX: "vert-origin-x",
        vertOriginY: "vert-origin-y",
        wordSpacing: "word-spacing",
        writingMode: "writing-mode",
        xHeight: "x-height",
        playbackOrder: "playbackorder",
        timelineBegin: "timelinebegin",
    },
    transform: xr,
    properties: {
        about: Le,
        accentHeight: D,
        accumulate: null,
        additive: null,
        alignmentBaseline: null,
        alphabetic: D,
        amplitude: D,
        arabicForm: null,
        ascent: D,
        attributeName: null,
        attributeType: null,
        azimuth: D,
        bandwidth: null,
        baselineShift: null,
        baseFrequency: null,
        baseProfile: null,
        bbox: null,
        begin: null,
        bias: D,
        by: null,
        calcMode: null,
        capHeight: D,
        className: te,
        clip: null,
        clipPath: null,
        clipPathUnits: null,
        clipRule: null,
        color: null,
        colorInterpolation: null,
        colorInterpolationFilters: null,
        colorProfile: null,
        colorRendering: null,
        content: null,
        contentScriptType: null,
        contentStyleType: null,
        crossOrigin: null,
        cursor: null,
        cx: null,
        cy: null,
        d: null,
        dataType: null,
        defaultAction: null,
        descent: D,
        diffuseConstant: D,
        direction: null,
        display: null,
        dur: null,
        divisor: D,
        dominantBaseline: null,
        download: W,
        dx: null,
        dy: null,
        edgeMode: null,
        editable: null,
        elevation: D,
        enableBackground: null,
        end: null,
        event: null,
        exponent: D,
        externalResourcesRequired: null,
        fill: null,
        fillOpacity: D,
        fillRule: null,
        filter: null,
        filterRes: null,
        filterUnits: null,
        floodColor: null,
        floodOpacity: null,
        focusable: null,
        focusHighlight: null,
        fontFamily: null,
        fontSize: null,
        fontSizeAdjust: null,
        fontStretch: null,
        fontStyle: null,
        fontVariant: null,
        fontWeight: null,
        format: null,
        fr: null,
        from: null,
        fx: null,
        fy: null,
        g1: Ct,
        g2: Ct,
        glyphName: Ct,
        glyphOrientationHorizontal: null,
        glyphOrientationVertical: null,
        glyphRef: null,
        gradientTransform: null,
        gradientUnits: null,
        handler: null,
        hanging: D,
        hatchContentUnits: null,
        hatchUnits: null,
        height: null,
        href: null,
        hrefLang: null,
        horizAdvX: D,
        horizOriginX: D,
        horizOriginY: D,
        id: null,
        ideographic: D,
        imageRendering: null,
        initialVisibility: null,
        in: null,
        in2: null,
        intercept: D,
        k: D,
        k1: D,
        k2: D,
        k3: D,
        k4: D,
        kernelMatrix: Le,
        kernelUnitLength: null,
        keyPoints: null,
        keySplines: null,
        keyTimes: null,
        kerning: null,
        lang: null,
        lengthAdjust: null,
        letterSpacing: null,
        lightingColor: null,
        limitingConeAngle: D,
        local: null,
        markerEnd: null,
        markerMid: null,
        markerStart: null,
        markerHeight: null,
        markerUnits: null,
        markerWidth: null,
        mask: null,
        maskContentUnits: null,
        maskUnits: null,
        mathematical: null,
        max: null,
        media: null,
        mediaCharacterEncoding: null,
        mediaContentEncodings: null,
        mediaSize: D,
        mediaTime: null,
        method: null,
        min: null,
        mode: null,
        name: null,
        navDown: null,
        navDownLeft: null,
        navDownRight: null,
        navLeft: null,
        navNext: null,
        navPrev: null,
        navRight: null,
        navUp: null,
        navUpLeft: null,
        navUpRight: null,
        numOctaves: null,
        observer: null,
        offset: null,
        onAbort: null,
        onActivate: null,
        onAfterPrint: null,
        onBeforePrint: null,
        onBegin: null,
        onCancel: null,
        onCanPlay: null,
        onCanPlayThrough: null,
        onChange: null,
        onClick: null,
        onClose: null,
        onCopy: null,
        onCueChange: null,
        onCut: null,
        onDblClick: null,
        onDrag: null,
        onDragEnd: null,
        onDragEnter: null,
        onDragExit: null,
        onDragLeave: null,
        onDragOver: null,
        onDragStart: null,
        onDrop: null,
        onDurationChange: null,
        onEmptied: null,
        onEnd: null,
        onEnded: null,
        onError: null,
        onFocus: null,
        onFocusIn: null,
        onFocusOut: null,
        onHashChange: null,
        onInput: null,
        onInvalid: null,
        onKeyDown: null,
        onKeyPress: null,
        onKeyUp: null,
        onLoad: null,
        onLoadedData: null,
        onLoadedMetadata: null,
        onLoadStart: null,
        onMessage: null,
        onMouseDown: null,
        onMouseEnter: null,
        onMouseLeave: null,
        onMouseMove: null,
        onMouseOut: null,
        onMouseOver: null,
        onMouseUp: null,
        onMouseWheel: null,
        onOffline: null,
        onOnline: null,
        onPageHide: null,
        onPageShow: null,
        onPaste: null,
        onPause: null,
        onPlay: null,
        onPlaying: null,
        onPopState: null,
        onProgress: null,
        onRateChange: null,
        onRepeat: null,
        onReset: null,
        onResize: null,
        onScroll: null,
        onSeeked: null,
        onSeeking: null,
        onSelect: null,
        onShow: null,
        onStalled: null,
        onStorage: null,
        onSubmit: null,
        onSuspend: null,
        onTimeUpdate: null,
        onToggle: null,
        onUnload: null,
        onVolumeChange: null,
        onWaiting: null,
        onZoom: null,
        opacity: null,
        operator: null,
        order: null,
        orient: null,
        orientation: null,
        origin: null,
        overflow: null,
        overlay: null,
        overlinePosition: D,
        overlineThickness: D,
        paintOrder: null,
        panose1: null,
        path: null,
        pathLength: D,
        patternContentUnits: null,
        patternTransform: null,
        patternUnits: null,
        phase: null,
        ping: te,
        pitch: null,
        playbackOrder: null,
        pointerEvents: null,
        points: null,
        pointsAtX: D,
        pointsAtY: D,
        pointsAtZ: D,
        preserveAlpha: null,
        preserveAspectRatio: null,
        primitiveUnits: null,
        propagate: null,
        property: Le,
        r: null,
        radius: null,
        referrerPolicy: null,
        refX: null,
        refY: null,
        rel: Le,
        rev: Le,
        renderingIntent: null,
        repeatCount: null,
        repeatDur: null,
        requiredExtensions: Le,
        requiredFeatures: Le,
        requiredFonts: Le,
        requiredFormats: Le,
        resource: null,
        restart: null,
        result: null,
        rotate: null,
        rx: null,
        ry: null,
        scale: null,
        seed: null,
        shapeRendering: null,
        side: null,
        slope: null,
        snapshotTime: null,
        specularConstant: D,
        specularExponent: D,
        spreadMethod: null,
        spacing: null,
        startOffset: null,
        stdDeviation: null,
        stemh: null,
        stemv: null,
        stitchTiles: null,
        stopColor: null,
        stopOpacity: null,
        strikethroughPosition: D,
        strikethroughThickness: D,
        string: null,
        stroke: null,
        strokeDashArray: Le,
        strokeDashOffset: null,
        strokeLineCap: null,
        strokeLineJoin: null,
        strokeMiterLimit: D,
        strokeOpacity: D,
        strokeWidth: null,
        style: null,
        surfaceScale: D,
        syncBehavior: null,
        syncBehaviorDefault: null,
        syncMaster: null,
        syncTolerance: null,
        syncToleranceDefault: null,
        systemLanguage: Le,
        tabIndex: D,
        tableValues: null,
        target: null,
        targetX: D,
        targetY: D,
        textAnchor: null,
        textDecoration: null,
        textRendering: null,
        textLength: null,
        timelineBegin: null,
        title: null,
        transformBehavior: null,
        type: null,
        typeOf: Le,
        to: null,
        transform: null,
        transformOrigin: null,
        u1: null,
        u2: null,
        underlinePosition: D,
        underlineThickness: D,
        unicode: null,
        unicodeBidi: null,
        unicodeRange: null,
        unitsPerEm: D,
        values: null,
        vAlphabetic: D,
        vMathematical: D,
        vectorEffect: null,
        vHanging: D,
        vIdeographic: D,
        version: null,
        vertAdvY: D,
        vertOriginX: D,
        vertOriginY: D,
        viewBox: null,
        viewTarget: null,
        visibility: null,
        width: null,
        widths: null,
        wordSpacing: null,
        writingMode: null,
        x: null,
        x1: null,
        x2: null,
        xChannelSelector: null,
        xHeight: D,
        y: null,
        y1: null,
        y2: null,
        yChannelSelector: null,
        z: null,
        zoomAndPan: null,
    },
});
var W0 = /^data[-\w.:]+$/i,
    Eo = /-[a-z]/g,
    Q0 = /[A-Z]/g;
function dt(e, t) {
    let n = ft(t),
        r = t,
        i = Ae;
    if (n in e.normal) return e.property[e.normal[n]];
    if (n.length > 4 && n.slice(0, 4) === "data" && W0.test(t)) {
        if (t.charAt(4) === "-") {
            let u = t.slice(5).replace(Eo, X0);
            r = "data" + u.charAt(0).toUpperCase() + u.slice(1);
        } else {
            let u = t.slice(4);
            if (!Eo.test(u)) {
                let s = u.replace(Q0, G0);
                s.charAt(0) !== "-" && (s = "-" + s), (t = "data" + s);
            }
        }
        i = Ht;
    }
    return new i(r, t);
}
function G0(e) {
    return "-" + e.toLowerCase();
}
function X0(e) {
    return e.charAt(1).toUpperCase();
}
var ht = ou([du, fu, hu, mu, mo], "html"),
    qe = ou([du, fu, hu, mu, po], "svg");
function pu(e) {
    let t = [],
        n = String(e || ""),
        r = n.indexOf(","),
        i = 0,
        u = !1;
    for (; !u; ) {
        r === -1 && ((r = n.length), (u = !0));
        let s = n.slice(i, r).trim();
        (s || !u) && t.push(s), (i = r + 1), (r = n.indexOf(",", i));
    }
    return t;
}
function Ir(e, t) {
    let n = t || {};
    return (e[e.length - 1] === "" ? [...e, ""] : e)
        .join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " "))
        .trim();
}
var To = /[#.]/g;
function Eu(e, t) {
    let n = e || "",
        r = {},
        i = 0,
        u,
        s;
    for (; i < n.length; ) {
        To.lastIndex = i;
        let o = To.exec(n),
            c = n.slice(i, o ? o.index : n.length);
        c &&
            (u
                ? u === "#"
                    ? (r.id = c)
                    : Array.isArray(r.className)
                    ? r.className.push(c)
                    : (r.className = [c])
                : (s = c),
            (i += c.length)),
            o && ((u = o[0]), i++);
    }
    return {
        type: "element",
        tagName: s || t || "div",
        properties: r,
        children: [],
    };
}
function Tu(e) {
    let t = String(e || "").trim();
    return t ? t.split(/[ \t\n\r\f]+/g) : [];
}
function Nr(e) {
    return e.join(" ").trim();
}
var j0 = new Set(["button", "menu", "reset", "submit"]),
    gu = {}.hasOwnProperty;
function Au(e, t, n) {
    let r = n && Z0(n);
    function i(u, s, ...o) {
        let c = -1,
            l;
        if (u == null) {
            l = { type: "root", children: [] };
            let f = s;
            o.unshift(f);
        } else if (
            ((l = Eu(u, t)),
            (l.tagName = l.tagName.toLowerCase()),
            r && gu.call(r, l.tagName) && (l.tagName = r[l.tagName]),
            K0(s, l.tagName))
        ) {
            let f;
            for (f in s) gu.call(s, f) && $0(e, l.properties, f, s[f]);
        } else o.unshift(s);
        for (; ++c < o.length; ) bu(l.children, o[c]);
        return (
            l.type === "element" &&
                l.tagName === "template" &&
                ((l.content = { type: "root", children: l.children }),
                (l.children = [])),
            l
        );
    }
    return i;
}
function K0(e, t) {
    return e == null || typeof e != "object" || Array.isArray(e)
        ? !1
        : t === "input" || !e.type || typeof e.type != "string"
        ? !0
        : "children" in e && Array.isArray(e.children)
        ? !1
        : t === "button"
        ? j0.has(e.type.toLowerCase())
        : !("value" in e);
}
function $0(e, t, n, r) {
    let i = dt(e, n),
        u = -1,
        s;
    if (r != null) {
        if (typeof r == "number") {
            if (Number.isNaN(r)) return;
            s = r;
        } else
            typeof r == "boolean"
                ? (s = r)
                : typeof r == "string"
                ? i.spaceSeparated
                    ? (s = Tu(r))
                    : i.commaSeparated
                    ? (s = pu(r))
                    : i.commaOrSpaceSeparated
                    ? (s = Tu(pu(r).join(" ")))
                    : (s = go(i, i.property, r))
                : Array.isArray(r)
                ? (s = r.concat())
                : (s = i.property === "style" ? J0(r) : String(r));
        if (Array.isArray(s)) {
            let o = [];
            for (; ++u < s.length; ) {
                let c = go(i, i.property, s[u]);
                o[u] = c;
            }
            s = o;
        }
        if (i.property === "className" && Array.isArray(t.className)) {
            let o = s;
            s = t.className.concat(o);
        }
        t[i.property] = s;
    }
}
function bu(e, t) {
    let n = -1;
    if (t != null)
        if (typeof t == "string" || typeof t == "number")
            e.push({ type: "text", value: String(t) });
        else if (Array.isArray(t)) for (; ++n < t.length; ) bu(e, t[n]);
        else if (typeof t == "object" && "type" in t)
            t.type === "root" ? bu(e, t.children) : e.push(t);
        else
            throw new Error("Expected node, nodes, or string, got `" + t + "`");
}
function go(e, t, n) {
    if (typeof n == "string") {
        if (e.number && n && !Number.isNaN(Number(n))) return Number(n);
        if ((e.boolean || e.overloadedBoolean) && (n === "" || ft(n) === ft(t)))
            return !0;
    }
    return n;
}
function J0(e) {
    let t = [],
        n;
    for (n in e) gu.call(e, n) && t.push([n, e[n]].join(": "));
    return t.join("; ");
}
function Z0(e) {
    let t = {},
        n = -1;
    for (; ++n < e.length; ) t[e[n].toLowerCase()] = e[n];
    return t;
}
var bo = [
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "solidColor",
    "textArea",
    "textPath",
];
var _u = Au(ht, "div"),
    xu = Au(qe, "g", bo);
function Cu(e) {
    let t = String(e),
        n = [];
    return { toOffset: i, toPoint: r };
    function r(u) {
        if (typeof u == "number" && u > -1 && u <= t.length) {
            let s = 0;
            for (;;) {
                let o = n[s];
                if (o === void 0) {
                    let c = Ao(t, n[s - 1]);
                    (o = c === -1 ? t.length + 1 : c + 1), (n[s] = o);
                }
                if (o > u)
                    return {
                        line: s + 1,
                        column: u - (s > 0 ? n[s - 1] : 0) + 1,
                        offset: u,
                    };
                s++;
            }
        }
    }
    function i(u) {
        if (
            u &&
            typeof u.line == "number" &&
            typeof u.column == "number" &&
            !Number.isNaN(u.line) &&
            !Number.isNaN(u.column)
        ) {
            for (; n.length < u.line; ) {
                let o = n[n.length - 1],
                    c = Ao(t, o),
                    l = c === -1 ? t.length + 1 : c + 1;
                if (o === l) break;
                n.push(l);
            }
            let s = (u.line > 1 ? n[u.line - 2] : 0) + u.column - 1;
            if (s < n[u.line - 1]) return s;
        }
    }
}
function Ao(e, t) {
    let n = e.indexOf("\r", t),
        r = e.indexOf(
            `
`,
            t
        );
    return r === -1 ? n : n === -1 || n + 1 === r ? r : n < r ? n : r;
}
var it = {
    html: "http://www.w3.org/1999/xhtml",
    mathml: "http://www.w3.org/1998/Math/MathML",
    svg: "http://www.w3.org/2000/svg",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
};
var xo = {}.hasOwnProperty,
    ed = Object.prototype;
function Iu(e, t) {
    let n = t || {};
    return Nu(
        {
            file: n.file || void 0,
            location: !1,
            schema: n.space === "svg" ? qe : ht,
            verbose: n.verbose || !1,
        },
        e
    );
}
function Nu(e, t) {
    let n;
    switch (t.nodeName) {
        case "#comment": {
            let r = t;
            return (n = { type: "comment", value: r.data }), Sr(e, r, n), n;
        }
        case "#document":
        case "#document-fragment": {
            let r = t,
                i =
                    "mode" in r
                        ? r.mode === "quirks" || r.mode === "limited-quirks"
                        : !1;
            if (
                ((n = {
                    type: "root",
                    children: Co(e, t.childNodes),
                    data: { quirksMode: i },
                }),
                e.file && e.location)
            ) {
                let u = String(e.file),
                    s = Cu(u),
                    o = s.toPoint(0),
                    c = s.toPoint(u.length);
                n.position = { start: o, end: c };
            }
            return n;
        }
        case "#documentType": {
            let r = t;
            return (n = { type: "doctype" }), Sr(e, r, n), n;
        }
        case "#text": {
            let r = t;
            return (n = { type: "text", value: r.value }), Sr(e, r, n), n;
        }
        default:
            return (n = td(e, t)), n;
    }
}
function Co(e, t) {
    let n = -1,
        r = [];
    for (; ++n < t.length; ) {
        let i = Nu(e, t[n]);
        r.push(i);
    }
    return r;
}
function td(e, t) {
    let n = e.schema;
    e.schema = t.namespaceURI === it.svg ? qe : ht;
    let r = -1,
        i = {};
    for (; ++r < t.attrs.length; ) {
        let o = t.attrs[r],
            c = (o.prefix ? o.prefix + ":" : "") + o.name;
        xo.call(ed, c) || (i[c] = o.value);
    }
    let s = (e.schema.space === "svg" ? xu : _u)(
        t.tagName,
        i,
        Co(e, t.childNodes)
    );
    if ((Sr(e, t, s), s.tagName === "template")) {
        let o = t,
            c = o.sourceCodeLocation,
            l = c && c.startTag && nn(c.startTag),
            f = c && c.endTag && nn(c.endTag),
            m = Nu(e, o.content);
        l && f && e.file && (m.position = { start: l.end, end: f.start }),
            (s.content = m);
    }
    return (e.schema = n), s;
}
function Sr(e, t, n) {
    if ("sourceCodeLocation" in t && t.sourceCodeLocation && e.file) {
        let r = nd(e, n, t.sourceCodeLocation);
        r && ((e.location = !0), (n.position = r));
    }
}
function nd(e, t, n) {
    let r = nn(n);
    if (t.type === "element") {
        let i = t.children[t.children.length - 1];
        if (
            (r &&
                !n.endTag &&
                i &&
                i.position &&
                i.position.end &&
                (r.end = Object.assign({}, i.position.end)),
            e.verbose)
        ) {
            let u = {},
                s;
            if (n.attrs)
                for (s in n.attrs)
                    xo.call(n.attrs, s) &&
                        (u[dt(e.schema, s).property] = nn(n.attrs[s]));
            n.startTag;
            let o = nn(n.startTag),
                c = n.endTag ? nn(n.endTag) : void 0,
                l = { opening: o };
            c && (l.closing = c),
                (l.properties = u),
                (t.data = { position: l });
        }
    }
    return r;
}
function nn(e) {
    let t = _o({
            line: e.startLine,
            column: e.startCol,
            offset: e.startOffset,
        }),
        n = _o({ line: e.endLine, column: e.endCol, offset: e.endOffset });
    return t || n ? { start: t, end: n } : void 0;
}
function _o(e) {
    return e.line && e.column ? e : void 0;
}
var rd = {},
    id = {}.hasOwnProperty,
    Io = Jt("type", {
        handlers: { root: ud, element: ld, text: od, comment: cd, doctype: sd },
    });
function Su(e, t) {
    let r = (t || rd).space;
    return Io(e, r === "svg" ? qe : ht);
}
function ud(e, t) {
    let n = {
        nodeName: "#document",
        mode: (e.data || {}).quirksMode ? "quirks" : "no-quirks",
        childNodes: [],
    };
    return (n.childNodes = Ru(e.children, n, t)), rn(e, n), n;
}
function ad(e, t) {
    let n = { nodeName: "#document-fragment", childNodes: [] };
    return (n.childNodes = Ru(e.children, n, t)), rn(e, n), n;
}
function sd(e) {
    let t = {
        nodeName: "#documentType",
        name: "html",
        publicId: "",
        systemId: "",
        parentNode: null,
    };
    return rn(e, t), t;
}
function od(e) {
    let t = { nodeName: "#text", value: e.value, parentNode: null };
    return rn(e, t), t;
}
function cd(e) {
    let t = { nodeName: "#comment", data: e.value, parentNode: null };
    return rn(e, t), t;
}
function ld(e, t) {
    let n = t,
        r = n;
    e.type === "element" &&
        e.tagName.toLowerCase() === "svg" &&
        n.space === "html" &&
        (r = qe);
    let i = [],
        u;
    if (e.properties) {
        for (u in e.properties)
            if (u !== "children" && id.call(e.properties, u)) {
                let c = fd(r, u, e.properties[u]);
                c && i.push(c);
            }
    }
    let s = r.space;
    let o = {
        nodeName: e.tagName,
        tagName: e.tagName,
        attrs: i,
        namespaceURI: it[s],
        childNodes: [],
        parentNode: null,
    };
    return (
        (o.childNodes = Ru(e.children, o, r)),
        rn(e, o),
        e.tagName === "template" && e.content && (o.content = ad(e.content, r)),
        o
    );
}
function fd(e, t, n) {
    let r = dt(e, t);
    if (
        n === !1 ||
        n === null ||
        n === void 0 ||
        (typeof n == "number" && Number.isNaN(n)) ||
        (!n && r.boolean)
    )
        return;
    Array.isArray(n) && (n = r.commaSeparated ? Ir(n) : Nr(n));
    let i = { name: r.attribute, value: n === !0 ? "" : String(n) };
    if (r.space && r.space !== "html" && r.space !== "svg") {
        let u = i.name.indexOf(":");
        u < 0
            ? (i.prefix = "")
            : ((i.name = i.name.slice(u + 1)),
              (i.prefix = r.attribute.slice(0, u))),
            (i.namespace = it[r.space]);
    }
    return i;
}
function Ru(e, t, n) {
    let r = -1,
        i = [];
    if (e)
        for (; ++r < e.length; ) {
            let u = Io(e[r], n);
            (u.parentNode = t), i.push(u);
        }
    return i;
}
function rn(e, t) {
    let n = e.position;
    n &&
        n.start &&
        n.end &&
        (n.start.offset,
        n.end.offset,
        (t.sourceCodeLocation = {
            startLine: n.start.line,
            startCol: n.start.column,
            startOffset: n.start.offset,
            endLine: n.end.line,
            endCol: n.end.column,
            endOffset: n.end.offset,
        }));
}
var Rr = [
    "area",
    "base",
    "basefont",
    "bgsound",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "image",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
];
var dd = new Set([
        65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678,
        327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823,
        655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502,
        917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111,
    ]),
    re = "\uFFFD",
    d;
(function (e) {
    (e[(e.EOF = -1)] = "EOF"),
        (e[(e.NULL = 0)] = "NULL"),
        (e[(e.TABULATION = 9)] = "TABULATION"),
        (e[(e.CARRIAGE_RETURN = 13)] = "CARRIAGE_RETURN"),
        (e[(e.LINE_FEED = 10)] = "LINE_FEED"),
        (e[(e.FORM_FEED = 12)] = "FORM_FEED"),
        (e[(e.SPACE = 32)] = "SPACE"),
        (e[(e.EXCLAMATION_MARK = 33)] = "EXCLAMATION_MARK"),
        (e[(e.QUOTATION_MARK = 34)] = "QUOTATION_MARK"),
        (e[(e.NUMBER_SIGN = 35)] = "NUMBER_SIGN"),
        (e[(e.AMPERSAND = 38)] = "AMPERSAND"),
        (e[(e.APOSTROPHE = 39)] = "APOSTROPHE"),
        (e[(e.HYPHEN_MINUS = 45)] = "HYPHEN_MINUS"),
        (e[(e.SOLIDUS = 47)] = "SOLIDUS"),
        (e[(e.DIGIT_0 = 48)] = "DIGIT_0"),
        (e[(e.DIGIT_9 = 57)] = "DIGIT_9"),
        (e[(e.SEMICOLON = 59)] = "SEMICOLON"),
        (e[(e.LESS_THAN_SIGN = 60)] = "LESS_THAN_SIGN"),
        (e[(e.EQUALS_SIGN = 61)] = "EQUALS_SIGN"),
        (e[(e.GREATER_THAN_SIGN = 62)] = "GREATER_THAN_SIGN"),
        (e[(e.QUESTION_MARK = 63)] = "QUESTION_MARK"),
        (e[(e.LATIN_CAPITAL_A = 65)] = "LATIN_CAPITAL_A"),
        (e[(e.LATIN_CAPITAL_F = 70)] = "LATIN_CAPITAL_F"),
        (e[(e.LATIN_CAPITAL_X = 88)] = "LATIN_CAPITAL_X"),
        (e[(e.LATIN_CAPITAL_Z = 90)] = "LATIN_CAPITAL_Z"),
        (e[(e.RIGHT_SQUARE_BRACKET = 93)] = "RIGHT_SQUARE_BRACKET"),
        (e[(e.GRAVE_ACCENT = 96)] = "GRAVE_ACCENT"),
        (e[(e.LATIN_SMALL_A = 97)] = "LATIN_SMALL_A"),
        (e[(e.LATIN_SMALL_F = 102)] = "LATIN_SMALL_F"),
        (e[(e.LATIN_SMALL_X = 120)] = "LATIN_SMALL_X"),
        (e[(e.LATIN_SMALL_Z = 122)] = "LATIN_SMALL_Z"),
        (e[(e.REPLACEMENT_CHARACTER = 65533)] = "REPLACEMENT_CHARACTER");
})((d = d || (d = {})));
var Ne = {
    DASH_DASH: "--",
    CDATA_START: "[CDATA[",
    DOCTYPE: "doctype",
    SCRIPT: "script",
    PUBLIC: "public",
    SYSTEM: "system",
};
function kr(e) {
    return e >= 55296 && e <= 57343;
}
function No(e) {
    return e >= 56320 && e <= 57343;
}
function So(e, t) {
    return (e - 55296) * 1024 + 9216 + t;
}
function Lr(e) {
    return (
        (e !== 32 &&
            e !== 10 &&
            e !== 13 &&
            e !== 9 &&
            e !== 12 &&
            e >= 1 &&
            e <= 31) ||
        (e >= 127 && e <= 159)
    );
}
function Or(e) {
    return (e >= 64976 && e <= 65007) || dd.has(e);
}
var x;
(function (e) {
    (e.controlCharacterInInputStream = "control-character-in-input-stream"),
        (e.noncharacterInInputStream = "noncharacter-in-input-stream"),
        (e.surrogateInInputStream = "surrogate-in-input-stream"),
        (e.nonVoidHtmlElementStartTagWithTrailingSolidus =
            "non-void-html-element-start-tag-with-trailing-solidus"),
        (e.endTagWithAttributes = "end-tag-with-attributes"),
        (e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus"),
        (e.unexpectedSolidusInTag = "unexpected-solidus-in-tag"),
        (e.unexpectedNullCharacter = "unexpected-null-character"),
        (e.unexpectedQuestionMarkInsteadOfTagName =
            "unexpected-question-mark-instead-of-tag-name"),
        (e.invalidFirstCharacterOfTagName =
            "invalid-first-character-of-tag-name"),
        (e.unexpectedEqualsSignBeforeAttributeName =
            "unexpected-equals-sign-before-attribute-name"),
        (e.missingEndTagName = "missing-end-tag-name"),
        (e.unexpectedCharacterInAttributeName =
            "unexpected-character-in-attribute-name"),
        (e.unknownNamedCharacterReference =
            "unknown-named-character-reference"),
        (e.missingSemicolonAfterCharacterReference =
            "missing-semicolon-after-character-reference"),
        (e.unexpectedCharacterAfterDoctypeSystemIdentifier =
            "unexpected-character-after-doctype-system-identifier"),
        (e.unexpectedCharacterInUnquotedAttributeValue =
            "unexpected-character-in-unquoted-attribute-value"),
        (e.eofBeforeTagName = "eof-before-tag-name"),
        (e.eofInTag = "eof-in-tag"),
        (e.missingAttributeValue = "missing-attribute-value"),
        (e.missingWhitespaceBetweenAttributes =
            "missing-whitespace-between-attributes"),
        (e.missingWhitespaceAfterDoctypePublicKeyword =
            "missing-whitespace-after-doctype-public-keyword"),
        (e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers =
            "missing-whitespace-between-doctype-public-and-system-identifiers"),
        (e.missingWhitespaceAfterDoctypeSystemKeyword =
            "missing-whitespace-after-doctype-system-keyword"),
        (e.missingQuoteBeforeDoctypePublicIdentifier =
            "missing-quote-before-doctype-public-identifier"),
        (e.missingQuoteBeforeDoctypeSystemIdentifier =
            "missing-quote-before-doctype-system-identifier"),
        (e.missingDoctypePublicIdentifier =
            "missing-doctype-public-identifier"),
        (e.missingDoctypeSystemIdentifier =
            "missing-doctype-system-identifier"),
        (e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier"),
        (e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier"),
        (e.cdataInHtmlContent = "cdata-in-html-content"),
        (e.incorrectlyOpenedComment = "incorrectly-opened-comment"),
        (e.eofInScriptHtmlCommentLikeText =
            "eof-in-script-html-comment-like-text"),
        (e.eofInDoctype = "eof-in-doctype"),
        (e.nestedComment = "nested-comment"),
        (e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment"),
        (e.eofInComment = "eof-in-comment"),
        (e.incorrectlyClosedComment = "incorrectly-closed-comment"),
        (e.eofInCdata = "eof-in-cdata"),
        (e.absenceOfDigitsInNumericCharacterReference =
            "absence-of-digits-in-numeric-character-reference"),
        (e.nullCharacterReference = "null-character-reference"),
        (e.surrogateCharacterReference = "surrogate-character-reference"),
        (e.characterReferenceOutsideUnicodeRange =
            "character-reference-outside-unicode-range"),
        (e.controlCharacterReference = "control-character-reference"),
        (e.noncharacterCharacterReference = "noncharacter-character-reference"),
        (e.missingWhitespaceBeforeDoctypeName =
            "missing-whitespace-before-doctype-name"),
        (e.missingDoctypeName = "missing-doctype-name"),
        (e.invalidCharacterSequenceAfterDoctypeName =
            "invalid-character-sequence-after-doctype-name"),
        (e.duplicateAttribute = "duplicate-attribute"),
        (e.nonConformingDoctype = "non-conforming-doctype"),
        (e.missingDoctype = "missing-doctype"),
        (e.misplacedDoctype = "misplaced-doctype"),
        (e.endTagWithoutMatchingOpenElement =
            "end-tag-without-matching-open-element"),
        (e.closingOfElementWithOpenChildElements =
            "closing-of-element-with-open-child-elements"),
        (e.disallowedContentInNoscriptInHead =
            "disallowed-content-in-noscript-in-head"),
        (e.openElementsLeftAfterEof = "open-elements-left-after-eof"),
        (e.abandonedHeadElementChild = "abandoned-head-element-child"),
        (e.misplacedStartTagForHeadElement =
            "misplaced-start-tag-for-head-element"),
        (e.nestedNoscriptInHead = "nested-noscript-in-head"),
        (e.eofInElementThatCanContainOnlyText =
            "eof-in-element-that-can-contain-only-text");
})((x = x || (x = {})));
var md = 65536,
    yr = class {
        constructor(t) {
            (this.handler = t),
                (this.html = ""),
                (this.pos = -1),
                (this.lastGapPos = -2),
                (this.gapStack = []),
                (this.skipNextNewLine = !1),
                (this.lastChunkWritten = !1),
                (this.endOfChunkHit = !1),
                (this.bufferWaterline = md),
                (this.isEol = !1),
                (this.lineStartPos = 0),
                (this.droppedBufferSize = 0),
                (this.line = 1),
                (this.lastErrOffset = -1);
        }
        get col() {
            return (
                this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos)
            );
        }
        get offset() {
            return this.droppedBufferSize + this.pos;
        }
        getError(t) {
            let { line: n, col: r, offset: i } = this;
            return {
                code: t,
                startLine: n,
                endLine: n,
                startCol: r,
                endCol: r,
                startOffset: i,
                endOffset: i,
            };
        }
        _err(t) {
            this.handler.onParseError &&
                this.lastErrOffset !== this.offset &&
                ((this.lastErrOffset = this.offset),
                this.handler.onParseError(this.getError(t)));
        }
        _addGap() {
            this.gapStack.push(this.lastGapPos), (this.lastGapPos = this.pos);
        }
        _processSurrogate(t) {
            if (this.pos !== this.html.length - 1) {
                let n = this.html.charCodeAt(this.pos + 1);
                if (No(n)) return this.pos++, this._addGap(), So(t, n);
            } else if (!this.lastChunkWritten)
                return (this.endOfChunkHit = !0), d.EOF;
            return this._err(x.surrogateInInputStream), t;
        }
        willDropParsedChunk() {
            return this.pos > this.bufferWaterline;
        }
        dropParsedChunk() {
            this.willDropParsedChunk() &&
                ((this.html = this.html.substring(this.pos)),
                (this.lineStartPos -= this.pos),
                (this.droppedBufferSize += this.pos),
                (this.pos = 0),
                (this.lastGapPos = -2),
                (this.gapStack.length = 0));
        }
        write(t, n) {
            this.html.length > 0 ? (this.html += t) : (this.html = t),
                (this.endOfChunkHit = !1),
                (this.lastChunkWritten = n);
        }
        insertHtmlAtCurrentPos(t) {
            (this.html =
                this.html.substring(0, this.pos + 1) +
                t +
                this.html.substring(this.pos + 1)),
                (this.endOfChunkHit = !1);
        }
        startsWith(t, n) {
            if (this.pos + t.length > this.html.length)
                return (this.endOfChunkHit = !this.lastChunkWritten), !1;
            if (n) return this.html.startsWith(t, this.pos);
            for (let r = 0; r < t.length; r++)
                if (
                    (this.html.charCodeAt(this.pos + r) | 32) !==
                    t.charCodeAt(r)
                )
                    return !1;
            return !0;
        }
        peek(t) {
            let n = this.pos + t;
            if (n >= this.html.length)
                return (this.endOfChunkHit = !this.lastChunkWritten), d.EOF;
            let r = this.html.charCodeAt(n);
            return r === d.CARRIAGE_RETURN ? d.LINE_FEED : r;
        }
        advance() {
            if (
                (this.pos++,
                this.isEol &&
                    ((this.isEol = !1),
                    this.line++,
                    (this.lineStartPos = this.pos)),
                this.pos >= this.html.length)
            )
                return (this.endOfChunkHit = !this.lastChunkWritten), d.EOF;
            let t = this.html.charCodeAt(this.pos);
            return t === d.CARRIAGE_RETURN
                ? ((this.isEol = !0), (this.skipNextNewLine = !0), d.LINE_FEED)
                : t === d.LINE_FEED && ((this.isEol = !0), this.skipNextNewLine)
                ? (this.line--,
                  (this.skipNextNewLine = !1),
                  this._addGap(),
                  this.advance())
                : ((this.skipNextNewLine = !1),
                  kr(t) && (t = this._processSurrogate(t)),
                  this.handler.onParseError === null ||
                      (t > 31 && t < 127) ||
                      t === d.LINE_FEED ||
                      t === d.CARRIAGE_RETURN ||
                      (t > 159 && t < 64976) ||
                      this._checkForProblematicCharacters(t),
                  t);
        }
        _checkForProblematicCharacters(t) {
            Lr(t)
                ? this._err(x.controlCharacterInInputStream)
                : Or(t) && this._err(x.noncharacterInInputStream);
        }
        retreat(t) {
            for (this.pos -= t; this.pos < this.lastGapPos; )
                (this.lastGapPos = this.gapStack.pop()), this.pos--;
            this.isEol = !1;
        }
    };
var It = {};
jn(It, { TokenType: () => $, getTokenAttr: () => Rn });
var $;
(function (e) {
    (e[(e.CHARACTER = 0)] = "CHARACTER"),
        (e[(e.NULL_CHARACTER = 1)] = "NULL_CHARACTER"),
        (e[(e.WHITESPACE_CHARACTER = 2)] = "WHITESPACE_CHARACTER"),
        (e[(e.START_TAG = 3)] = "START_TAG"),
        (e[(e.END_TAG = 4)] = "END_TAG"),
        (e[(e.COMMENT = 5)] = "COMMENT"),
        (e[(e.DOCTYPE = 6)] = "DOCTYPE"),
        (e[(e.EOF = 7)] = "EOF"),
        (e[(e.HIBERNATION = 8)] = "HIBERNATION");
})(($ = $ || ($ = {})));
function Rn(e, t) {
    for (let n = e.attrs.length - 1; n >= 0; n--)
        if (e.attrs[n].name === t) return e.attrs[n].value;
    return null;
}
var ut = new Uint16Array(
    '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'
        .split("")
        .map((e) => e.charCodeAt(0))
);
var Ro = new Uint16Array(
    "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022"
        .split("")
        .map((e) => e.charCodeAt(0))
);
var ku,
    pd = new Map([
        [0, 65533],
        [128, 8364],
        [130, 8218],
        [131, 402],
        [132, 8222],
        [133, 8230],
        [134, 8224],
        [135, 8225],
        [136, 710],
        [137, 8240],
        [138, 352],
        [139, 8249],
        [140, 338],
        [142, 381],
        [145, 8216],
        [146, 8217],
        [147, 8220],
        [148, 8221],
        [149, 8226],
        [150, 8211],
        [151, 8212],
        [152, 732],
        [153, 8482],
        [154, 353],
        [155, 8250],
        [156, 339],
        [158, 382],
        [159, 376],
    ]),
    Lu =
        (ku = String.fromCodePoint) !== null && ku !== void 0
            ? ku
            : function (e) {
                  let t = "";
                  return (
                      e > 65535 &&
                          ((e -= 65536),
                          (t += String.fromCharCode(
                              ((e >>> 10) & 1023) | 55296
                          )),
                          (e = 56320 | (e & 1023))),
                      (t += String.fromCharCode(e)),
                      t
                  );
              };
function Ou(e) {
    var t;
    return (e >= 55296 && e <= 57343) || e > 1114111
        ? 65533
        : (t = pd.get(e)) !== null && t !== void 0
        ? t
        : e;
}
var Ee;
(function (e) {
    (e[(e.NUM = 35)] = "NUM"),
        (e[(e.SEMI = 59)] = "SEMI"),
        (e[(e.EQUALS = 61)] = "EQUALS"),
        (e[(e.ZERO = 48)] = "ZERO"),
        (e[(e.NINE = 57)] = "NINE"),
        (e[(e.LOWER_A = 97)] = "LOWER_A"),
        (e[(e.LOWER_F = 102)] = "LOWER_F"),
        (e[(e.LOWER_X = 120)] = "LOWER_X"),
        (e[(e.LOWER_Z = 122)] = "LOWER_Z"),
        (e[(e.UPPER_A = 65)] = "UPPER_A"),
        (e[(e.UPPER_F = 70)] = "UPPER_F"),
        (e[(e.UPPER_Z = 90)] = "UPPER_Z");
})(Ee || (Ee = {}));
var Ed = 32,
    Ke;
(function (e) {
    (e[(e.VALUE_LENGTH = 49152)] = "VALUE_LENGTH"),
        (e[(e.BRANCH_LENGTH = 16256)] = "BRANCH_LENGTH"),
        (e[(e.JUMP_TABLE = 127)] = "JUMP_TABLE");
})(Ke || (Ke = {}));
function yu(e) {
    return e >= Ee.ZERO && e <= Ee.NINE;
}
function Td(e) {
    return (
        (e >= Ee.UPPER_A && e <= Ee.UPPER_F) ||
        (e >= Ee.LOWER_A && e <= Ee.LOWER_F)
    );
}
function gd(e) {
    return (
        (e >= Ee.UPPER_A && e <= Ee.UPPER_Z) ||
        (e >= Ee.LOWER_A && e <= Ee.LOWER_Z) ||
        yu(e)
    );
}
function bd(e) {
    return e === Ee.EQUALS || gd(e);
}
var pe;
(function (e) {
    (e[(e.EntityStart = 0)] = "EntityStart"),
        (e[(e.NumericStart = 1)] = "NumericStart"),
        (e[(e.NumericDecimal = 2)] = "NumericDecimal"),
        (e[(e.NumericHex = 3)] = "NumericHex"),
        (e[(e.NamedEntity = 4)] = "NamedEntity");
})(pe || (pe = {}));
var Ut;
(function (e) {
    (e[(e.Legacy = 0)] = "Legacy"),
        (e[(e.Strict = 1)] = "Strict"),
        (e[(e.Attribute = 2)] = "Attribute");
})(Ut || (Ut = {}));
var Du = class {
    constructor(t, n, r) {
        (this.decodeTree = t),
            (this.emitCodePoint = n),
            (this.errors = r),
            (this.state = pe.EntityStart),
            (this.consumed = 1),
            (this.result = 0),
            (this.treeIndex = 0),
            (this.excess = 1),
            (this.decodeMode = Ut.Strict);
    }
    startEntity(t) {
        (this.decodeMode = t),
            (this.state = pe.EntityStart),
            (this.result = 0),
            (this.treeIndex = 0),
            (this.excess = 1),
            (this.consumed = 1);
    }
    write(t, n) {
        switch (this.state) {
            case pe.EntityStart:
                return t.charCodeAt(n) === Ee.NUM
                    ? ((this.state = pe.NumericStart),
                      (this.consumed += 1),
                      this.stateNumericStart(t, n + 1))
                    : ((this.state = pe.NamedEntity),
                      this.stateNamedEntity(t, n));
            case pe.NumericStart:
                return this.stateNumericStart(t, n);
            case pe.NumericDecimal:
                return this.stateNumericDecimal(t, n);
            case pe.NumericHex:
                return this.stateNumericHex(t, n);
            case pe.NamedEntity:
                return this.stateNamedEntity(t, n);
        }
    }
    stateNumericStart(t, n) {
        return n >= t.length
            ? -1
            : (t.charCodeAt(n) | Ed) === Ee.LOWER_X
            ? ((this.state = pe.NumericHex),
              (this.consumed += 1),
              this.stateNumericHex(t, n + 1))
            : ((this.state = pe.NumericDecimal),
              this.stateNumericDecimal(t, n));
    }
    addToNumericResult(t, n, r, i) {
        if (n !== r) {
            let u = r - n;
            (this.result =
                this.result * Math.pow(i, u) + parseInt(t.substr(n, u), i)),
                (this.consumed += u);
        }
    }
    stateNumericHex(t, n) {
        let r = n;
        for (; n < t.length; ) {
            let i = t.charCodeAt(n);
            if (yu(i) || Td(i)) n += 1;
            else
                return (
                    this.addToNumericResult(t, r, n, 16),
                    this.emitNumericEntity(i, 3)
                );
        }
        return this.addToNumericResult(t, r, n, 16), -1;
    }
    stateNumericDecimal(t, n) {
        let r = n;
        for (; n < t.length; ) {
            let i = t.charCodeAt(n);
            if (yu(i)) n += 1;
            else
                return (
                    this.addToNumericResult(t, r, n, 10),
                    this.emitNumericEntity(i, 2)
                );
        }
        return this.addToNumericResult(t, r, n, 10), -1;
    }
    emitNumericEntity(t, n) {
        var r;
        if (this.consumed <= n)
            return (
                (r = this.errors) === null ||
                    r === void 0 ||
                    r.absenceOfDigitsInNumericCharacterReference(this.consumed),
                0
            );
        if (t === Ee.SEMI) this.consumed += 1;
        else if (this.decodeMode === Ut.Strict) return 0;
        return (
            this.emitCodePoint(Ou(this.result), this.consumed),
            this.errors &&
                (t !== Ee.SEMI &&
                    this.errors.missingSemicolonAfterCharacterReference(),
                this.errors.validateNumericCharacterReference(this.result)),
            this.consumed
        );
    }
    stateNamedEntity(t, n) {
        let { decodeTree: r } = this,
            i = r[this.treeIndex],
            u = (i & Ke.VALUE_LENGTH) >> 14;
        for (; n < t.length; n++, this.excess++) {
            let s = t.charCodeAt(n);
            if (
                ((this.treeIndex = Pu(
                    r,
                    i,
                    this.treeIndex + Math.max(1, u),
                    s
                )),
                this.treeIndex < 0)
            )
                return this.result === 0 ||
                    (this.decodeMode === Ut.Attribute && (u === 0 || bd(s)))
                    ? 0
                    : this.emitNotTerminatedNamedEntity();
            if (
                ((i = r[this.treeIndex]),
                (u = (i & Ke.VALUE_LENGTH) >> 14),
                u !== 0)
            ) {
                if (s === Ee.SEMI)
                    return this.emitNamedEntityData(
                        this.treeIndex,
                        u,
                        this.consumed + this.excess
                    );
                this.decodeMode !== Ut.Strict &&
                    ((this.result = this.treeIndex),
                    (this.consumed += this.excess),
                    (this.excess = 0));
            }
        }
        return -1;
    }
    emitNotTerminatedNamedEntity() {
        var t;
        let { result: n, decodeTree: r } = this,
            i = (r[n] & Ke.VALUE_LENGTH) >> 14;
        return (
            this.emitNamedEntityData(n, i, this.consumed),
            (t = this.errors) === null ||
                t === void 0 ||
                t.missingSemicolonAfterCharacterReference(),
            this.consumed
        );
    }
    emitNamedEntityData(t, n, r) {
        let { decodeTree: i } = this;
        return (
            this.emitCodePoint(n === 1 ? i[t] & ~Ke.VALUE_LENGTH : i[t + 1], r),
            n === 3 && this.emitCodePoint(i[t + 2], r),
            r
        );
    }
    end() {
        var t;
        switch (this.state) {
            case pe.NamedEntity:
                return this.result !== 0 &&
                    (this.decodeMode !== Ut.Attribute ||
                        this.result === this.treeIndex)
                    ? this.emitNotTerminatedNamedEntity()
                    : 0;
            case pe.NumericDecimal:
                return this.emitNumericEntity(0, 2);
            case pe.NumericHex:
                return this.emitNumericEntity(0, 3);
            case pe.NumericStart:
                return (
                    (t = this.errors) === null ||
                        t === void 0 ||
                        t.absenceOfDigitsInNumericCharacterReference(
                            this.consumed
                        ),
                    0
                );
            case pe.EntityStart:
                return 0;
        }
    }
};
function ko(e) {
    let t = "",
        n = new Du(e, (r) => (t += Lu(r)));
    return function (i, u) {
        let s = 0,
            o = 0;
        for (; (o = i.indexOf("&", o)) >= 0; ) {
            (t += i.slice(s, o)), n.startEntity(u);
            let l = n.write(i, o + 1);
            if (l < 0) {
                s = o + n.end();
                break;
            }
            (s = o + l), (o = l === 0 ? s + 1 : s);
        }
        let c = t + i.slice(s);
        return (t = ""), c;
    };
}
function Pu(e, t, n, r) {
    let i = (t & Ke.BRANCH_LENGTH) >> 7,
        u = t & Ke.JUMP_TABLE;
    if (i === 0) return u !== 0 && r === u ? n : -1;
    if (u) {
        let c = r - u;
        return c < 0 || c >= i ? -1 : e[n + c] - 1;
    }
    let s = n,
        o = s + i - 1;
    for (; s <= o; ) {
        let c = (s + o) >>> 1,
            l = e[c];
        if (l < r) s = c + 1;
        else if (l > r) o = c - 1;
        else return e[c + i];
    }
    return -1;
}
var B3 = ko(ut),
    F3 = ko(Ro);
var Ln = {};
jn(Ln, {
    ATTRS: () => $e,
    DOCUMENT_MODE: () => Te,
    NS: () => N,
    SPECIAL_ELEMENTS: () => wu,
    TAG_ID: () => a,
    TAG_NAMES: () => A,
    getTagID: () => Nt,
    hasUnescapedText: () => Lo,
    isNumberedHeader: () => kn,
});
var N;
(function (e) {
    (e.HTML = "http://www.w3.org/1999/xhtml"),
        (e.MATHML = "http://www.w3.org/1998/Math/MathML"),
        (e.SVG = "http://www.w3.org/2000/svg"),
        (e.XLINK = "http://www.w3.org/1999/xlink"),
        (e.XML = "http://www.w3.org/XML/1998/namespace"),
        (e.XMLNS = "http://www.w3.org/2000/xmlns/");
})((N = N || (N = {})));
var $e;
(function (e) {
    (e.TYPE = "type"),
        (e.ACTION = "action"),
        (e.ENCODING = "encoding"),
        (e.PROMPT = "prompt"),
        (e.NAME = "name"),
        (e.COLOR = "color"),
        (e.FACE = "face"),
        (e.SIZE = "size");
})(($e = $e || ($e = {})));
var Te;
(function (e) {
    (e.NO_QUIRKS = "no-quirks"),
        (e.QUIRKS = "quirks"),
        (e.LIMITED_QUIRKS = "limited-quirks");
})((Te = Te || (Te = {})));
var A;
(function (e) {
    (e.A = "a"),
        (e.ADDRESS = "address"),
        (e.ANNOTATION_XML = "annotation-xml"),
        (e.APPLET = "applet"),
        (e.AREA = "area"),
        (e.ARTICLE = "article"),
        (e.ASIDE = "aside"),
        (e.B = "b"),
        (e.BASE = "base"),
        (e.BASEFONT = "basefont"),
        (e.BGSOUND = "bgsound"),
        (e.BIG = "big"),
        (e.BLOCKQUOTE = "blockquote"),
        (e.BODY = "body"),
        (e.BR = "br"),
        (e.BUTTON = "button"),
        (e.CAPTION = "caption"),
        (e.CENTER = "center"),
        (e.CODE = "code"),
        (e.COL = "col"),
        (e.COLGROUP = "colgroup"),
        (e.DD = "dd"),
        (e.DESC = "desc"),
        (e.DETAILS = "details"),
        (e.DIALOG = "dialog"),
        (e.DIR = "dir"),
        (e.DIV = "div"),
        (e.DL = "dl"),
        (e.DT = "dt"),
        (e.EM = "em"),
        (e.EMBED = "embed"),
        (e.FIELDSET = "fieldset"),
        (e.FIGCAPTION = "figcaption"),
        (e.FIGURE = "figure"),
        (e.FONT = "font"),
        (e.FOOTER = "footer"),
        (e.FOREIGN_OBJECT = "foreignObject"),
        (e.FORM = "form"),
        (e.FRAME = "frame"),
        (e.FRAMESET = "frameset"),
        (e.H1 = "h1"),
        (e.H2 = "h2"),
        (e.H3 = "h3"),
        (e.H4 = "h4"),
        (e.H5 = "h5"),
        (e.H6 = "h6"),
        (e.HEAD = "head"),
        (e.HEADER = "header"),
        (e.HGROUP = "hgroup"),
        (e.HR = "hr"),
        (e.HTML = "html"),
        (e.I = "i"),
        (e.IMG = "img"),
        (e.IMAGE = "image"),
        (e.INPUT = "input"),
        (e.IFRAME = "iframe"),
        (e.KEYGEN = "keygen"),
        (e.LABEL = "label"),
        (e.LI = "li"),
        (e.LINK = "link"),
        (e.LISTING = "listing"),
        (e.MAIN = "main"),
        (e.MALIGNMARK = "malignmark"),
        (e.MARQUEE = "marquee"),
        (e.MATH = "math"),
        (e.MENU = "menu"),
        (e.META = "meta"),
        (e.MGLYPH = "mglyph"),
        (e.MI = "mi"),
        (e.MO = "mo"),
        (e.MN = "mn"),
        (e.MS = "ms"),
        (e.MTEXT = "mtext"),
        (e.NAV = "nav"),
        (e.NOBR = "nobr"),
        (e.NOFRAMES = "noframes"),
        (e.NOEMBED = "noembed"),
        (e.NOSCRIPT = "noscript"),
        (e.OBJECT = "object"),
        (e.OL = "ol"),
        (e.OPTGROUP = "optgroup"),
        (e.OPTION = "option"),
        (e.P = "p"),
        (e.PARAM = "param"),
        (e.PLAINTEXT = "plaintext"),
        (e.PRE = "pre"),
        (e.RB = "rb"),
        (e.RP = "rp"),
        (e.RT = "rt"),
        (e.RTC = "rtc"),
        (e.RUBY = "ruby"),
        (e.S = "s"),
        (e.SCRIPT = "script"),
        (e.SECTION = "section"),
        (e.SELECT = "select"),
        (e.SOURCE = "source"),
        (e.SMALL = "small"),
        (e.SPAN = "span"),
        (e.STRIKE = "strike"),
        (e.STRONG = "strong"),
        (e.STYLE = "style"),
        (e.SUB = "sub"),
        (e.SUMMARY = "summary"),
        (e.SUP = "sup"),
        (e.TABLE = "table"),
        (e.TBODY = "tbody"),
        (e.TEMPLATE = "template"),
        (e.TEXTAREA = "textarea"),
        (e.TFOOT = "tfoot"),
        (e.TD = "td"),
        (e.TH = "th"),
        (e.THEAD = "thead"),
        (e.TITLE = "title"),
        (e.TR = "tr"),
        (e.TRACK = "track"),
        (e.TT = "tt"),
        (e.U = "u"),
        (e.UL = "ul"),
        (e.SVG = "svg"),
        (e.VAR = "var"),
        (e.WBR = "wbr"),
        (e.XMP = "xmp");
})((A = A || (A = {})));
var a;
(function (e) {
    (e[(e.UNKNOWN = 0)] = "UNKNOWN"),
        (e[(e.A = 1)] = "A"),
        (e[(e.ADDRESS = 2)] = "ADDRESS"),
        (e[(e.ANNOTATION_XML = 3)] = "ANNOTATION_XML"),
        (e[(e.APPLET = 4)] = "APPLET"),
        (e[(e.AREA = 5)] = "AREA"),
        (e[(e.ARTICLE = 6)] = "ARTICLE"),
        (e[(e.ASIDE = 7)] = "ASIDE"),
        (e[(e.B = 8)] = "B"),
        (e[(e.BASE = 9)] = "BASE"),
        (e[(e.BASEFONT = 10)] = "BASEFONT"),
        (e[(e.BGSOUND = 11)] = "BGSOUND"),
        (e[(e.BIG = 12)] = "BIG"),
        (e[(e.BLOCKQUOTE = 13)] = "BLOCKQUOTE"),
        (e[(e.BODY = 14)] = "BODY"),
        (e[(e.BR = 15)] = "BR"),
        (e[(e.BUTTON = 16)] = "BUTTON"),
        (e[(e.CAPTION = 17)] = "CAPTION"),
        (e[(e.CENTER = 18)] = "CENTER"),
        (e[(e.CODE = 19)] = "CODE"),
        (e[(e.COL = 20)] = "COL"),
        (e[(e.COLGROUP = 21)] = "COLGROUP"),
        (e[(e.DD = 22)] = "DD"),
        (e[(e.DESC = 23)] = "DESC"),
        (e[(e.DETAILS = 24)] = "DETAILS"),
        (e[(e.DIALOG = 25)] = "DIALOG"),
        (e[(e.DIR = 26)] = "DIR"),
        (e[(e.DIV = 27)] = "DIV"),
        (e[(e.DL = 28)] = "DL"),
        (e[(e.DT = 29)] = "DT"),
        (e[(e.EM = 30)] = "EM"),
        (e[(e.EMBED = 31)] = "EMBED"),
        (e[(e.FIELDSET = 32)] = "FIELDSET"),
        (e[(e.FIGCAPTION = 33)] = "FIGCAPTION"),
        (e[(e.FIGURE = 34)] = "FIGURE"),
        (e[(e.FONT = 35)] = "FONT"),
        (e[(e.FOOTER = 36)] = "FOOTER"),
        (e[(e.FOREIGN_OBJECT = 37)] = "FOREIGN_OBJECT"),
        (e[(e.FORM = 38)] = "FORM"),
        (e[(e.FRAME = 39)] = "FRAME"),
        (e[(e.FRAMESET = 40)] = "FRAMESET"),
        (e[(e.H1 = 41)] = "H1"),
        (e[(e.H2 = 42)] = "H2"),
        (e[(e.H3 = 43)] = "H3"),
        (e[(e.H4 = 44)] = "H4"),
        (e[(e.H5 = 45)] = "H5"),
        (e[(e.H6 = 46)] = "H6"),
        (e[(e.HEAD = 47)] = "HEAD"),
        (e[(e.HEADER = 48)] = "HEADER"),
        (e[(e.HGROUP = 49)] = "HGROUP"),
        (e[(e.HR = 50)] = "HR"),
        (e[(e.HTML = 51)] = "HTML"),
        (e[(e.I = 52)] = "I"),
        (e[(e.IMG = 53)] = "IMG"),
        (e[(e.IMAGE = 54)] = "IMAGE"),
        (e[(e.INPUT = 55)] = "INPUT"),
        (e[(e.IFRAME = 56)] = "IFRAME"),
        (e[(e.KEYGEN = 57)] = "KEYGEN"),
        (e[(e.LABEL = 58)] = "LABEL"),
        (e[(e.LI = 59)] = "LI"),
        (e[(e.LINK = 60)] = "LINK"),
        (e[(e.LISTING = 61)] = "LISTING"),
        (e[(e.MAIN = 62)] = "MAIN"),
        (e[(e.MALIGNMARK = 63)] = "MALIGNMARK"),
        (e[(e.MARQUEE = 64)] = "MARQUEE"),
        (e[(e.MATH = 65)] = "MATH"),
        (e[(e.MENU = 66)] = "MENU"),
        (e[(e.META = 67)] = "META"),
        (e[(e.MGLYPH = 68)] = "MGLYPH"),
        (e[(e.MI = 69)] = "MI"),
        (e[(e.MO = 70)] = "MO"),
        (e[(e.MN = 71)] = "MN"),
        (e[(e.MS = 72)] = "MS"),
        (e[(e.MTEXT = 73)] = "MTEXT"),
        (e[(e.NAV = 74)] = "NAV"),
        (e[(e.NOBR = 75)] = "NOBR"),
        (e[(e.NOFRAMES = 76)] = "NOFRAMES"),
        (e[(e.NOEMBED = 77)] = "NOEMBED"),
        (e[(e.NOSCRIPT = 78)] = "NOSCRIPT"),
        (e[(e.OBJECT = 79)] = "OBJECT"),
        (e[(e.OL = 80)] = "OL"),
        (e[(e.OPTGROUP = 81)] = "OPTGROUP"),
        (e[(e.OPTION = 82)] = "OPTION"),
        (e[(e.P = 83)] = "P"),
        (e[(e.PARAM = 84)] = "PARAM"),
        (e[(e.PLAINTEXT = 85)] = "PLAINTEXT"),
        (e[(e.PRE = 86)] = "PRE"),
        (e[(e.RB = 87)] = "RB"),
        (e[(e.RP = 88)] = "RP"),
        (e[(e.RT = 89)] = "RT"),
        (e[(e.RTC = 90)] = "RTC"),
        (e[(e.RUBY = 91)] = "RUBY"),
        (e[(e.S = 92)] = "S"),
        (e[(e.SCRIPT = 93)] = "SCRIPT"),
        (e[(e.SECTION = 94)] = "SECTION"),
        (e[(e.SELECT = 95)] = "SELECT"),
        (e[(e.SOURCE = 96)] = "SOURCE"),
        (e[(e.SMALL = 97)] = "SMALL"),
        (e[(e.SPAN = 98)] = "SPAN"),
        (e[(e.STRIKE = 99)] = "STRIKE"),
        (e[(e.STRONG = 100)] = "STRONG"),
        (e[(e.STYLE = 101)] = "STYLE"),
        (e[(e.SUB = 102)] = "SUB"),
        (e[(e.SUMMARY = 103)] = "SUMMARY"),
        (e[(e.SUP = 104)] = "SUP"),
        (e[(e.TABLE = 105)] = "TABLE"),
        (e[(e.TBODY = 106)] = "TBODY"),
        (e[(e.TEMPLATE = 107)] = "TEMPLATE"),
        (e[(e.TEXTAREA = 108)] = "TEXTAREA"),
        (e[(e.TFOOT = 109)] = "TFOOT"),
        (e[(e.TD = 110)] = "TD"),
        (e[(e.TH = 111)] = "TH"),
        (e[(e.THEAD = 112)] = "THEAD"),
        (e[(e.TITLE = 113)] = "TITLE"),
        (e[(e.TR = 114)] = "TR"),
        (e[(e.TRACK = 115)] = "TRACK"),
        (e[(e.TT = 116)] = "TT"),
        (e[(e.U = 117)] = "U"),
        (e[(e.UL = 118)] = "UL"),
        (e[(e.SVG = 119)] = "SVG"),
        (e[(e.VAR = 120)] = "VAR"),
        (e[(e.WBR = 121)] = "WBR"),
        (e[(e.XMP = 122)] = "XMP");
})((a = a || (a = {})));
var Ad = new Map([
    [A.A, a.A],
    [A.ADDRESS, a.ADDRESS],
    [A.ANNOTATION_XML, a.ANNOTATION_XML],
    [A.APPLET, a.APPLET],
    [A.AREA, a.AREA],
    [A.ARTICLE, a.ARTICLE],
    [A.ASIDE, a.ASIDE],
    [A.B, a.B],
    [A.BASE, a.BASE],
    [A.BASEFONT, a.BASEFONT],
    [A.BGSOUND, a.BGSOUND],
    [A.BIG, a.BIG],
    [A.BLOCKQUOTE, a.BLOCKQUOTE],
    [A.BODY, a.BODY],
    [A.BR, a.BR],
    [A.BUTTON, a.BUTTON],
    [A.CAPTION, a.CAPTION],
    [A.CENTER, a.CENTER],
    [A.CODE, a.CODE],
    [A.COL, a.COL],
    [A.COLGROUP, a.COLGROUP],
    [A.DD, a.DD],
    [A.DESC, a.DESC],
    [A.DETAILS, a.DETAILS],
    [A.DIALOG, a.DIALOG],
    [A.DIR, a.DIR],
    [A.DIV, a.DIV],
    [A.DL, a.DL],
    [A.DT, a.DT],
    [A.EM, a.EM],
    [A.EMBED, a.EMBED],
    [A.FIELDSET, a.FIELDSET],
    [A.FIGCAPTION, a.FIGCAPTION],
    [A.FIGURE, a.FIGURE],
    [A.FONT, a.FONT],
    [A.FOOTER, a.FOOTER],
    [A.FOREIGN_OBJECT, a.FOREIGN_OBJECT],
    [A.FORM, a.FORM],
    [A.FRAME, a.FRAME],
    [A.FRAMESET, a.FRAMESET],
    [A.H1, a.H1],
    [A.H2, a.H2],
    [A.H3, a.H3],
    [A.H4, a.H4],
    [A.H5, a.H5],
    [A.H6, a.H6],
    [A.HEAD, a.HEAD],
    [A.HEADER, a.HEADER],
    [A.HGROUP, a.HGROUP],
    [A.HR, a.HR],
    [A.HTML, a.HTML],
    [A.I, a.I],
    [A.IMG, a.IMG],
    [A.IMAGE, a.IMAGE],
    [A.INPUT, a.INPUT],
    [A.IFRAME, a.IFRAME],
    [A.KEYGEN, a.KEYGEN],
    [A.LABEL, a.LABEL],
    [A.LI, a.LI],
    [A.LINK, a.LINK],
    [A.LISTING, a.LISTING],
    [A.MAIN, a.MAIN],
    [A.MALIGNMARK, a.MALIGNMARK],
    [A.MARQUEE, a.MARQUEE],
    [A.MATH, a.MATH],
    [A.MENU, a.MENU],
    [A.META, a.META],
    [A.MGLYPH, a.MGLYPH],
    [A.MI, a.MI],
    [A.MO, a.MO],
    [A.MN, a.MN],
    [A.MS, a.MS],
    [A.MTEXT, a.MTEXT],
    [A.NAV, a.NAV],
    [A.NOBR, a.NOBR],
    [A.NOFRAMES, a.NOFRAMES],
    [A.NOEMBED, a.NOEMBED],
    [A.NOSCRIPT, a.NOSCRIPT],
    [A.OBJECT, a.OBJECT],
    [A.OL, a.OL],
    [A.OPTGROUP, a.OPTGROUP],
    [A.OPTION, a.OPTION],
    [A.P, a.P],
    [A.PARAM, a.PARAM],
    [A.PLAINTEXT, a.PLAINTEXT],
    [A.PRE, a.PRE],
    [A.RB, a.RB],
    [A.RP, a.RP],
    [A.RT, a.RT],
    [A.RTC, a.RTC],
    [A.RUBY, a.RUBY],
    [A.S, a.S],
    [A.SCRIPT, a.SCRIPT],
    [A.SECTION, a.SECTION],
    [A.SELECT, a.SELECT],
    [A.SOURCE, a.SOURCE],
    [A.SMALL, a.SMALL],
    [A.SPAN, a.SPAN],
    [A.STRIKE, a.STRIKE],
    [A.STRONG, a.STRONG],
    [A.STYLE, a.STYLE],
    [A.SUB, a.SUB],
    [A.SUMMARY, a.SUMMARY],
    [A.SUP, a.SUP],
    [A.TABLE, a.TABLE],
    [A.TBODY, a.TBODY],
    [A.TEMPLATE, a.TEMPLATE],
    [A.TEXTAREA, a.TEXTAREA],
    [A.TFOOT, a.TFOOT],
    [A.TD, a.TD],
    [A.TH, a.TH],
    [A.THEAD, a.THEAD],
    [A.TITLE, a.TITLE],
    [A.TR, a.TR],
    [A.TRACK, a.TRACK],
    [A.TT, a.TT],
    [A.U, a.U],
    [A.UL, a.UL],
    [A.SVG, a.SVG],
    [A.VAR, a.VAR],
    [A.WBR, a.WBR],
    [A.XMP, a.XMP],
]);
function Nt(e) {
    var t;
    return (t = Ad.get(e)) !== null && t !== void 0 ? t : a.UNKNOWN;
}
var y = a,
    wu = {
        [N.HTML]: new Set([
            y.ADDRESS,
            y.APPLET,
            y.AREA,
            y.ARTICLE,
            y.ASIDE,
            y.BASE,
            y.BASEFONT,
            y.BGSOUND,
            y.BLOCKQUOTE,
            y.BODY,
            y.BR,
            y.BUTTON,
            y.CAPTION,
            y.CENTER,
            y.COL,
            y.COLGROUP,
            y.DD,
            y.DETAILS,
            y.DIR,
            y.DIV,
            y.DL,
            y.DT,
            y.EMBED,
            y.FIELDSET,
            y.FIGCAPTION,
            y.FIGURE,
            y.FOOTER,
            y.FORM,
            y.FRAME,
            y.FRAMESET,
            y.H1,
            y.H2,
            y.H3,
            y.H4,
            y.H5,
            y.H6,
            y.HEAD,
            y.HEADER,
            y.HGROUP,
            y.HR,
            y.HTML,
            y.IFRAME,
            y.IMG,
            y.INPUT,
            y.LI,
            y.LINK,
            y.LISTING,
            y.MAIN,
            y.MARQUEE,
            y.MENU,
            y.META,
            y.NAV,
            y.NOEMBED,
            y.NOFRAMES,
            y.NOSCRIPT,
            y.OBJECT,
            y.OL,
            y.P,
            y.PARAM,
            y.PLAINTEXT,
            y.PRE,
            y.SCRIPT,
            y.SECTION,
            y.SELECT,
            y.SOURCE,
            y.STYLE,
            y.SUMMARY,
            y.TABLE,
            y.TBODY,
            y.TD,
            y.TEMPLATE,
            y.TEXTAREA,
            y.TFOOT,
            y.TH,
            y.THEAD,
            y.TITLE,
            y.TR,
            y.TRACK,
            y.UL,
            y.WBR,
            y.XMP,
        ]),
        [N.MATHML]: new Set([
            y.MI,
            y.MO,
            y.MN,
            y.MS,
            y.MTEXT,
            y.ANNOTATION_XML,
        ]),
        [N.SVG]: new Set([y.TITLE, y.FOREIGN_OBJECT, y.DESC]),
        [N.XLINK]: new Set(),
        [N.XML]: new Set(),
        [N.XMLNS]: new Set(),
    };
function kn(e) {
    return (
        e === y.H1 ||
        e === y.H2 ||
        e === y.H3 ||
        e === y.H4 ||
        e === y.H5 ||
        e === y.H6
    );
}
var _d = new Set([
    A.STYLE,
    A.SCRIPT,
    A.XMP,
    A.IFRAME,
    A.NOEMBED,
    A.NOFRAMES,
    A.PLAINTEXT,
]);
function Lo(e, t) {
    return _d.has(e) || (t && e === A.NOSCRIPT);
}
var xd = new Map([
        [128, 8364],
        [130, 8218],
        [131, 402],
        [132, 8222],
        [133, 8230],
        [134, 8224],
        [135, 8225],
        [136, 710],
        [137, 8240],
        [138, 352],
        [139, 8249],
        [140, 338],
        [142, 381],
        [145, 8216],
        [146, 8217],
        [147, 8220],
        [148, 8221],
        [149, 8226],
        [150, 8211],
        [151, 8212],
        [152, 732],
        [153, 8482],
        [154, 353],
        [155, 8250],
        [156, 339],
        [158, 382],
        [159, 376],
    ]),
    h;
(function (e) {
    (e[(e.DATA = 0)] = "DATA"),
        (e[(e.RCDATA = 1)] = "RCDATA"),
        (e[(e.RAWTEXT = 2)] = "RAWTEXT"),
        (e[(e.SCRIPT_DATA = 3)] = "SCRIPT_DATA"),
        (e[(e.PLAINTEXT = 4)] = "PLAINTEXT"),
        (e[(e.TAG_OPEN = 5)] = "TAG_OPEN"),
        (e[(e.END_TAG_OPEN = 6)] = "END_TAG_OPEN"),
        (e[(e.TAG_NAME = 7)] = "TAG_NAME"),
        (e[(e.RCDATA_LESS_THAN_SIGN = 8)] = "RCDATA_LESS_THAN_SIGN"),
        (e[(e.RCDATA_END_TAG_OPEN = 9)] = "RCDATA_END_TAG_OPEN"),
        (e[(e.RCDATA_END_TAG_NAME = 10)] = "RCDATA_END_TAG_NAME"),
        (e[(e.RAWTEXT_LESS_THAN_SIGN = 11)] = "RAWTEXT_LESS_THAN_SIGN"),
        (e[(e.RAWTEXT_END_TAG_OPEN = 12)] = "RAWTEXT_END_TAG_OPEN"),
        (e[(e.RAWTEXT_END_TAG_NAME = 13)] = "RAWTEXT_END_TAG_NAME"),
        (e[(e.SCRIPT_DATA_LESS_THAN_SIGN = 14)] = "SCRIPT_DATA_LESS_THAN_SIGN"),
        (e[(e.SCRIPT_DATA_END_TAG_OPEN = 15)] = "SCRIPT_DATA_END_TAG_OPEN"),
        (e[(e.SCRIPT_DATA_END_TAG_NAME = 16)] = "SCRIPT_DATA_END_TAG_NAME"),
        (e[(e.SCRIPT_DATA_ESCAPE_START = 17)] = "SCRIPT_DATA_ESCAPE_START"),
        (e[(e.SCRIPT_DATA_ESCAPE_START_DASH = 18)] =
            "SCRIPT_DATA_ESCAPE_START_DASH"),
        (e[(e.SCRIPT_DATA_ESCAPED = 19)] = "SCRIPT_DATA_ESCAPED"),
        (e[(e.SCRIPT_DATA_ESCAPED_DASH = 20)] = "SCRIPT_DATA_ESCAPED_DASH"),
        (e[(e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21)] =
            "SCRIPT_DATA_ESCAPED_DASH_DASH"),
        (e[(e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22)] =
            "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"),
        (e[(e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23)] =
            "SCRIPT_DATA_ESCAPED_END_TAG_OPEN"),
        (e[(e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24)] =
            "SCRIPT_DATA_ESCAPED_END_TAG_NAME"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25)] =
            "SCRIPT_DATA_DOUBLE_ESCAPE_START"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED = 26)] = "SCRIPT_DATA_DOUBLE_ESCAPED"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27)] =
            "SCRIPT_DATA_DOUBLE_ESCAPED_DASH"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28)] =
            "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29)] =
            "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"),
        (e[(e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30)] =
            "SCRIPT_DATA_DOUBLE_ESCAPE_END"),
        (e[(e.BEFORE_ATTRIBUTE_NAME = 31)] = "BEFORE_ATTRIBUTE_NAME"),
        (e[(e.ATTRIBUTE_NAME = 32)] = "ATTRIBUTE_NAME"),
        (e[(e.AFTER_ATTRIBUTE_NAME = 33)] = "AFTER_ATTRIBUTE_NAME"),
        (e[(e.BEFORE_ATTRIBUTE_VALUE = 34)] = "BEFORE_ATTRIBUTE_VALUE"),
        (e[(e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35)] =
            "ATTRIBUTE_VALUE_DOUBLE_QUOTED"),
        (e[(e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36)] =
            "ATTRIBUTE_VALUE_SINGLE_QUOTED"),
        (e[(e.ATTRIBUTE_VALUE_UNQUOTED = 37)] = "ATTRIBUTE_VALUE_UNQUOTED"),
        (e[(e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38)] =
            "AFTER_ATTRIBUTE_VALUE_QUOTED"),
        (e[(e.SELF_CLOSING_START_TAG = 39)] = "SELF_CLOSING_START_TAG"),
        (e[(e.BOGUS_COMMENT = 40)] = "BOGUS_COMMENT"),
        (e[(e.MARKUP_DECLARATION_OPEN = 41)] = "MARKUP_DECLARATION_OPEN"),
        (e[(e.COMMENT_START = 42)] = "COMMENT_START"),
        (e[(e.COMMENT_START_DASH = 43)] = "COMMENT_START_DASH"),
        (e[(e.COMMENT = 44)] = "COMMENT"),
        (e[(e.COMMENT_LESS_THAN_SIGN = 45)] = "COMMENT_LESS_THAN_SIGN"),
        (e[(e.COMMENT_LESS_THAN_SIGN_BANG = 46)] =
            "COMMENT_LESS_THAN_SIGN_BANG"),
        (e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47)] =
            "COMMENT_LESS_THAN_SIGN_BANG_DASH"),
        (e[(e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48)] =
            "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"),
        (e[(e.COMMENT_END_DASH = 49)] = "COMMENT_END_DASH"),
        (e[(e.COMMENT_END = 50)] = "COMMENT_END"),
        (e[(e.COMMENT_END_BANG = 51)] = "COMMENT_END_BANG"),
        (e[(e.DOCTYPE = 52)] = "DOCTYPE"),
        (e[(e.BEFORE_DOCTYPE_NAME = 53)] = "BEFORE_DOCTYPE_NAME"),
        (e[(e.DOCTYPE_NAME = 54)] = "DOCTYPE_NAME"),
        (e[(e.AFTER_DOCTYPE_NAME = 55)] = "AFTER_DOCTYPE_NAME"),
        (e[(e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56)] =
            "AFTER_DOCTYPE_PUBLIC_KEYWORD"),
        (e[(e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57)] =
            "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"),
        (e[(e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58)] =
            "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"),
        (e[(e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59)] =
            "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"),
        (e[(e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60)] =
            "AFTER_DOCTYPE_PUBLIC_IDENTIFIER"),
        (e[(e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61)] =
            "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"),
        (e[(e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62)] =
            "AFTER_DOCTYPE_SYSTEM_KEYWORD"),
        (e[(e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63)] =
            "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"),
        (e[(e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64)] =
            "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"),
        (e[(e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65)] =
            "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"),
        (e[(e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66)] =
            "AFTER_DOCTYPE_SYSTEM_IDENTIFIER"),
        (e[(e.BOGUS_DOCTYPE = 67)] = "BOGUS_DOCTYPE"),
        (e[(e.CDATA_SECTION = 68)] = "CDATA_SECTION"),
        (e[(e.CDATA_SECTION_BRACKET = 69)] = "CDATA_SECTION_BRACKET"),
        (e[(e.CDATA_SECTION_END = 70)] = "CDATA_SECTION_END"),
        (e[(e.CHARACTER_REFERENCE = 71)] = "CHARACTER_REFERENCE"),
        (e[(e.NAMED_CHARACTER_REFERENCE = 72)] = "NAMED_CHARACTER_REFERENCE"),
        (e[(e.AMBIGUOUS_AMPERSAND = 73)] = "AMBIGUOUS_AMPERSAND"),
        (e[(e.NUMERIC_CHARACTER_REFERENCE = 74)] =
            "NUMERIC_CHARACTER_REFERENCE"),
        (e[(e.HEXADEMICAL_CHARACTER_REFERENCE_START = 75)] =
            "HEXADEMICAL_CHARACTER_REFERENCE_START"),
        (e[(e.HEXADEMICAL_CHARACTER_REFERENCE = 76)] =
            "HEXADEMICAL_CHARACTER_REFERENCE"),
        (e[(e.DECIMAL_CHARACTER_REFERENCE = 77)] =
            "DECIMAL_CHARACTER_REFERENCE"),
        (e[(e.NUMERIC_CHARACTER_REFERENCE_END = 78)] =
            "NUMERIC_CHARACTER_REFERENCE_END");
})(h || (h = {}));
var ue = {
    DATA: h.DATA,
    RCDATA: h.RCDATA,
    RAWTEXT: h.RAWTEXT,
    SCRIPT_DATA: h.SCRIPT_DATA,
    PLAINTEXT: h.PLAINTEXT,
    CDATA_SECTION: h.CDATA_SECTION,
};
function yn(e) {
    return e >= d.DIGIT_0 && e <= d.DIGIT_9;
}
function On(e) {
    return e >= d.LATIN_CAPITAL_A && e <= d.LATIN_CAPITAL_Z;
}
function Cd(e) {
    return e >= d.LATIN_SMALL_A && e <= d.LATIN_SMALL_Z;
}
function St(e) {
    return Cd(e) || On(e);
}
function Mu(e) {
    return St(e) || yn(e);
}
function yo(e) {
    return e >= d.LATIN_CAPITAL_A && e <= d.LATIN_CAPITAL_F;
}
function Do(e) {
    return e >= d.LATIN_SMALL_A && e <= d.LATIN_SMALL_F;
}
function Id(e) {
    return yn(e) || yo(e) || Do(e);
}
function Dr(e) {
    return e + 32;
}
function Po(e) {
    return (
        e === d.SPACE ||
        e === d.LINE_FEED ||
        e === d.TABULATION ||
        e === d.FORM_FEED
    );
}
function Nd(e) {
    return e === d.EQUALS_SIGN || Mu(e);
}
function Oo(e) {
    return Po(e) || e === d.SOLIDUS || e === d.GREATER_THAN_SIGN;
}
var Dn = class {
    constructor(t, n) {
        (this.options = t),
            (this.handler = n),
            (this.paused = !1),
            (this.inLoop = !1),
            (this.inForeignNode = !1),
            (this.lastStartTagName = ""),
            (this.active = !1),
            (this.state = h.DATA),
            (this.returnState = h.DATA),
            (this.charRefCode = -1),
            (this.consumedAfterSnapshot = -1),
            (this.currentCharacterToken = null),
            (this.currentToken = null),
            (this.currentAttr = { name: "", value: "" }),
            (this.preprocessor = new yr(n)),
            (this.currentLocation = this.getCurrentLocation(-1));
    }
    _err(t) {
        var n, r;
        (r = (n = this.handler).onParseError) === null ||
            r === void 0 ||
            r.call(n, this.preprocessor.getError(t));
    }
    getCurrentLocation(t) {
        return this.options.sourceCodeLocationInfo
            ? {
                  startLine: this.preprocessor.line,
                  startCol: this.preprocessor.col - t,
                  startOffset: this.preprocessor.offset - t,
                  endLine: -1,
                  endCol: -1,
                  endOffset: -1,
              }
            : null;
    }
    _runParsingLoop() {
        if (!this.inLoop) {
            for (this.inLoop = !0; this.active && !this.paused; ) {
                this.consumedAfterSnapshot = 0;
                let t = this._consume();
                this._ensureHibernation() || this._callState(t);
            }
            this.inLoop = !1;
        }
    }
    pause() {
        this.paused = !0;
    }
    resume(t) {
        if (!this.paused) throw new Error("Parser was already resumed");
        (this.paused = !1),
            !this.inLoop && (this._runParsingLoop(), this.paused || t?.());
    }
    write(t, n, r) {
        (this.active = !0),
            this.preprocessor.write(t, n),
            this._runParsingLoop(),
            this.paused || r?.();
    }
    insertHtmlAtCurrentPos(t) {
        (this.active = !0),
            this.preprocessor.insertHtmlAtCurrentPos(t),
            this._runParsingLoop();
    }
    _ensureHibernation() {
        return this.preprocessor.endOfChunkHit
            ? (this._unconsume(this.consumedAfterSnapshot),
              (this.active = !1),
              !0)
            : !1;
    }
    _consume() {
        return this.consumedAfterSnapshot++, this.preprocessor.advance();
    }
    _unconsume(t) {
        (this.consumedAfterSnapshot -= t), this.preprocessor.retreat(t);
    }
    _reconsumeInState(t, n) {
        (this.state = t), this._callState(n);
    }
    _advanceBy(t) {
        this.consumedAfterSnapshot += t;
        for (let n = 0; n < t; n++) this.preprocessor.advance();
    }
    _consumeSequenceIfMatch(t, n) {
        return this.preprocessor.startsWith(t, n)
            ? (this._advanceBy(t.length - 1), !0)
            : !1;
    }
    _createStartTagToken() {
        this.currentToken = {
            type: $.START_TAG,
            tagName: "",
            tagID: a.UNKNOWN,
            selfClosing: !1,
            ackSelfClosing: !1,
            attrs: [],
            location: this.getCurrentLocation(1),
        };
    }
    _createEndTagToken() {
        this.currentToken = {
            type: $.END_TAG,
            tagName: "",
            tagID: a.UNKNOWN,
            selfClosing: !1,
            ackSelfClosing: !1,
            attrs: [],
            location: this.getCurrentLocation(2),
        };
    }
    _createCommentToken(t) {
        this.currentToken = {
            type: $.COMMENT,
            data: "",
            location: this.getCurrentLocation(t),
        };
    }
    _createDoctypeToken(t) {
        this.currentToken = {
            type: $.DOCTYPE,
            name: t,
            forceQuirks: !1,
            publicId: null,
            systemId: null,
            location: this.currentLocation,
        };
    }
    _createCharacterToken(t, n) {
        this.currentCharacterToken = {
            type: t,
            chars: n,
            location: this.currentLocation,
        };
    }
    _createAttr(t) {
        (this.currentAttr = { name: t, value: "" }),
            (this.currentLocation = this.getCurrentLocation(0));
    }
    _leaveAttrName() {
        var t, n;
        let r = this.currentToken;
        if (Rn(r, this.currentAttr.name) === null) {
            if (
                (r.attrs.push(this.currentAttr),
                r.location && this.currentLocation)
            ) {
                let i =
                    (t = (n = r.location).attrs) !== null && t !== void 0
                        ? t
                        : (n.attrs = Object.create(null));
                (i[this.currentAttr.name] = this.currentLocation),
                    this._leaveAttrValue();
            }
        } else this._err(x.duplicateAttribute);
    }
    _leaveAttrValue() {
        this.currentLocation &&
            ((this.currentLocation.endLine = this.preprocessor.line),
            (this.currentLocation.endCol = this.preprocessor.col),
            (this.currentLocation.endOffset = this.preprocessor.offset));
    }
    prepareToken(t) {
        this._emitCurrentCharacterToken(t.location),
            (this.currentToken = null),
            t.location &&
                ((t.location.endLine = this.preprocessor.line),
                (t.location.endCol = this.preprocessor.col + 1),
                (t.location.endOffset = this.preprocessor.offset + 1)),
            (this.currentLocation = this.getCurrentLocation(-1));
    }
    emitCurrentTagToken() {
        let t = this.currentToken;
        this.prepareToken(t),
            (t.tagID = Nt(t.tagName)),
            t.type === $.START_TAG
                ? ((this.lastStartTagName = t.tagName),
                  this.handler.onStartTag(t))
                : (t.attrs.length > 0 && this._err(x.endTagWithAttributes),
                  t.selfClosing && this._err(x.endTagWithTrailingSolidus),
                  this.handler.onEndTag(t)),
            this.preprocessor.dropParsedChunk();
    }
    emitCurrentComment(t) {
        this.prepareToken(t),
            this.handler.onComment(t),
            this.preprocessor.dropParsedChunk();
    }
    emitCurrentDoctype(t) {
        this.prepareToken(t),
            this.handler.onDoctype(t),
            this.preprocessor.dropParsedChunk();
    }
    _emitCurrentCharacterToken(t) {
        if (this.currentCharacterToken) {
            switch (
                (t &&
                    this.currentCharacterToken.location &&
                    ((this.currentCharacterToken.location.endLine =
                        t.startLine),
                    (this.currentCharacterToken.location.endCol = t.startCol),
                    (this.currentCharacterToken.location.endOffset =
                        t.startOffset)),
                this.currentCharacterToken.type)
            ) {
                case $.CHARACTER: {
                    this.handler.onCharacter(this.currentCharacterToken);
                    break;
                }
                case $.NULL_CHARACTER: {
                    this.handler.onNullCharacter(this.currentCharacterToken);
                    break;
                }
                case $.WHITESPACE_CHARACTER: {
                    this.handler.onWhitespaceCharacter(
                        this.currentCharacterToken
                    );
                    break;
                }
            }
            this.currentCharacterToken = null;
        }
    }
    _emitEOFToken() {
        let t = this.getCurrentLocation(0);
        t &&
            ((t.endLine = t.startLine),
            (t.endCol = t.startCol),
            (t.endOffset = t.startOffset)),
            this._emitCurrentCharacterToken(t),
            this.handler.onEof({ type: $.EOF, location: t }),
            (this.active = !1);
    }
    _appendCharToCurrentCharacterToken(t, n) {
        if (this.currentCharacterToken)
            if (this.currentCharacterToken.type !== t)
                (this.currentLocation = this.getCurrentLocation(0)),
                    this._emitCurrentCharacterToken(this.currentLocation),
                    this.preprocessor.dropParsedChunk();
            else {
                this.currentCharacterToken.chars += n;
                return;
            }
        this._createCharacterToken(t, n);
    }
    _emitCodePoint(t) {
        let n = Po(t)
            ? $.WHITESPACE_CHARACTER
            : t === d.NULL
            ? $.NULL_CHARACTER
            : $.CHARACTER;
        this._appendCharToCurrentCharacterToken(n, String.fromCodePoint(t));
    }
    _emitChars(t) {
        this._appendCharToCurrentCharacterToken($.CHARACTER, t);
    }
    _matchNamedCharacterReference(t) {
        let n = null,
            r = 0,
            i = !1;
        for (
            let u = 0, s = ut[0];
            u >= 0 && ((u = Pu(ut, s, u + 1, t)), !(u < 0));
            t = this._consume()
        ) {
            (r += 1), (s = ut[u]);
            let o = s & Ke.VALUE_LENGTH;
            if (o) {
                let c = (o >> 14) - 1;
                if (
                    (t !== d.SEMICOLON &&
                    this._isCharacterReferenceInAttribute() &&
                    Nd(this.preprocessor.peek(1))
                        ? ((n = [d.AMPERSAND]), (u += c))
                        : ((n =
                              c === 0
                                  ? [ut[u] & ~Ke.VALUE_LENGTH]
                                  : c === 1
                                  ? [ut[++u]]
                                  : [ut[++u], ut[++u]]),
                          (r = 0),
                          (i = t !== d.SEMICOLON)),
                    c === 0)
                ) {
                    this._consume();
                    break;
                }
            }
        }
        return (
            this._unconsume(r),
            i &&
                !this.preprocessor.endOfChunkHit &&
                this._err(x.missingSemicolonAfterCharacterReference),
            this._unconsume(1),
            n
        );
    }
    _isCharacterReferenceInAttribute() {
        return (
            this.returnState === h.ATTRIBUTE_VALUE_DOUBLE_QUOTED ||
            this.returnState === h.ATTRIBUTE_VALUE_SINGLE_QUOTED ||
            this.returnState === h.ATTRIBUTE_VALUE_UNQUOTED
        );
    }
    _flushCodePointConsumedAsCharacterReference(t) {
        this._isCharacterReferenceInAttribute()
            ? (this.currentAttr.value += String.fromCodePoint(t))
            : this._emitCodePoint(t);
    }
    _callState(t) {
        switch (this.state) {
            case h.DATA: {
                this._stateData(t);
                break;
            }
            case h.RCDATA: {
                this._stateRcdata(t);
                break;
            }
            case h.RAWTEXT: {
                this._stateRawtext(t);
                break;
            }
            case h.SCRIPT_DATA: {
                this._stateScriptData(t);
                break;
            }
            case h.PLAINTEXT: {
                this._statePlaintext(t);
                break;
            }
            case h.TAG_OPEN: {
                this._stateTagOpen(t);
                break;
            }
            case h.END_TAG_OPEN: {
                this._stateEndTagOpen(t);
                break;
            }
            case h.TAG_NAME: {
                this._stateTagName(t);
                break;
            }
            case h.RCDATA_LESS_THAN_SIGN: {
                this._stateRcdataLessThanSign(t);
                break;
            }
            case h.RCDATA_END_TAG_OPEN: {
                this._stateRcdataEndTagOpen(t);
                break;
            }
            case h.RCDATA_END_TAG_NAME: {
                this._stateRcdataEndTagName(t);
                break;
            }
            case h.RAWTEXT_LESS_THAN_SIGN: {
                this._stateRawtextLessThanSign(t);
                break;
            }
            case h.RAWTEXT_END_TAG_OPEN: {
                this._stateRawtextEndTagOpen(t);
                break;
            }
            case h.RAWTEXT_END_TAG_NAME: {
                this._stateRawtextEndTagName(t);
                break;
            }
            case h.SCRIPT_DATA_LESS_THAN_SIGN: {
                this._stateScriptDataLessThanSign(t);
                break;
            }
            case h.SCRIPT_DATA_END_TAG_OPEN: {
                this._stateScriptDataEndTagOpen(t);
                break;
            }
            case h.SCRIPT_DATA_END_TAG_NAME: {
                this._stateScriptDataEndTagName(t);
                break;
            }
            case h.SCRIPT_DATA_ESCAPE_START: {
                this._stateScriptDataEscapeStart(t);
                break;
            }
            case h.SCRIPT_DATA_ESCAPE_START_DASH: {
                this._stateScriptDataEscapeStartDash(t);
                break;
            }
            case h.SCRIPT_DATA_ESCAPED: {
                this._stateScriptDataEscaped(t);
                break;
            }
            case h.SCRIPT_DATA_ESCAPED_DASH: {
                this._stateScriptDataEscapedDash(t);
                break;
            }
            case h.SCRIPT_DATA_ESCAPED_DASH_DASH: {
                this._stateScriptDataEscapedDashDash(t);
                break;
            }
            case h.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
                this._stateScriptDataEscapedLessThanSign(t);
                break;
            }
            case h.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
                this._stateScriptDataEscapedEndTagOpen(t);
                break;
            }
            case h.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
                this._stateScriptDataEscapedEndTagName(t);
                break;
            }
            case h.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
                this._stateScriptDataDoubleEscapeStart(t);
                break;
            }
            case h.SCRIPT_DATA_DOUBLE_ESCAPED: {
                this._stateScriptDataDoubleEscaped(t);
                break;
            }
            case h.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
                this._stateScriptDataDoubleEscapedDash(t);
                break;
            }
            case h.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
                this._stateScriptDataDoubleEscapedDashDash(t);
                break;
            }
            case h.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
                this._stateScriptDataDoubleEscapedLessThanSign(t);
                break;
            }
            case h.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
                this._stateScriptDataDoubleEscapeEnd(t);
                break;
            }
            case h.BEFORE_ATTRIBUTE_NAME: {
                this._stateBeforeAttributeName(t);
                break;
            }
            case h.ATTRIBUTE_NAME: {
                this._stateAttributeName(t);
                break;
            }
            case h.AFTER_ATTRIBUTE_NAME: {
                this._stateAfterAttributeName(t);
                break;
            }
            case h.BEFORE_ATTRIBUTE_VALUE: {
                this._stateBeforeAttributeValue(t);
                break;
            }
            case h.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
                this._stateAttributeValueDoubleQuoted(t);
                break;
            }
            case h.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
                this._stateAttributeValueSingleQuoted(t);
                break;
            }
            case h.ATTRIBUTE_VALUE_UNQUOTED: {
                this._stateAttributeValueUnquoted(t);
                break;
            }
            case h.AFTER_ATTRIBUTE_VALUE_QUOTED: {
                this._stateAfterAttributeValueQuoted(t);
                break;
            }
            case h.SELF_CLOSING_START_TAG: {
                this._stateSelfClosingStartTag(t);
                break;
            }
            case h.BOGUS_COMMENT: {
                this._stateBogusComment(t);
                break;
            }
            case h.MARKUP_DECLARATION_OPEN: {
                this._stateMarkupDeclarationOpen(t);
                break;
            }
            case h.COMMENT_START: {
                this._stateCommentStart(t);
                break;
            }
            case h.COMMENT_START_DASH: {
                this._stateCommentStartDash(t);
                break;
            }
            case h.COMMENT: {
                this._stateComment(t);
                break;
            }
            case h.COMMENT_LESS_THAN_SIGN: {
                this._stateCommentLessThanSign(t);
                break;
            }
            case h.COMMENT_LESS_THAN_SIGN_BANG: {
                this._stateCommentLessThanSignBang(t);
                break;
            }
            case h.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
                this._stateCommentLessThanSignBangDash(t);
                break;
            }
            case h.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
                this._stateCommentLessThanSignBangDashDash(t);
                break;
            }
            case h.COMMENT_END_DASH: {
                this._stateCommentEndDash(t);
                break;
            }
            case h.COMMENT_END: {
                this._stateCommentEnd(t);
                break;
            }
            case h.COMMENT_END_BANG: {
                this._stateCommentEndBang(t);
                break;
            }
            case h.DOCTYPE: {
                this._stateDoctype(t);
                break;
            }
            case h.BEFORE_DOCTYPE_NAME: {
                this._stateBeforeDoctypeName(t);
                break;
            }
            case h.DOCTYPE_NAME: {
                this._stateDoctypeName(t);
                break;
            }
            case h.AFTER_DOCTYPE_NAME: {
                this._stateAfterDoctypeName(t);
                break;
            }
            case h.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
                this._stateAfterDoctypePublicKeyword(t);
                break;
            }
            case h.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
                this._stateBeforeDoctypePublicIdentifier(t);
                break;
            }
            case h.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
                this._stateDoctypePublicIdentifierDoubleQuoted(t);
                break;
            }
            case h.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
                this._stateDoctypePublicIdentifierSingleQuoted(t);
                break;
            }
            case h.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
                this._stateAfterDoctypePublicIdentifier(t);
                break;
            }
            case h.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
                this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
                break;
            }
            case h.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
                this._stateAfterDoctypeSystemKeyword(t);
                break;
            }
            case h.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
                this._stateBeforeDoctypeSystemIdentifier(t);
                break;
            }
            case h.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
                this._stateDoctypeSystemIdentifierDoubleQuoted(t);
                break;
            }
            case h.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
                this._stateDoctypeSystemIdentifierSingleQuoted(t);
                break;
            }
            case h.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
                this._stateAfterDoctypeSystemIdentifier(t);
                break;
            }
            case h.BOGUS_DOCTYPE: {
                this._stateBogusDoctype(t);
                break;
            }
            case h.CDATA_SECTION: {
                this._stateCdataSection(t);
                break;
            }
            case h.CDATA_SECTION_BRACKET: {
                this._stateCdataSectionBracket(t);
                break;
            }
            case h.CDATA_SECTION_END: {
                this._stateCdataSectionEnd(t);
                break;
            }
            case h.CHARACTER_REFERENCE: {
                this._stateCharacterReference(t);
                break;
            }
            case h.NAMED_CHARACTER_REFERENCE: {
                this._stateNamedCharacterReference(t);
                break;
            }
            case h.AMBIGUOUS_AMPERSAND: {
                this._stateAmbiguousAmpersand(t);
                break;
            }
            case h.NUMERIC_CHARACTER_REFERENCE: {
                this._stateNumericCharacterReference(t);
                break;
            }
            case h.HEXADEMICAL_CHARACTER_REFERENCE_START: {
                this._stateHexademicalCharacterReferenceStart(t);
                break;
            }
            case h.HEXADEMICAL_CHARACTER_REFERENCE: {
                this._stateHexademicalCharacterReference(t);
                break;
            }
            case h.DECIMAL_CHARACTER_REFERENCE: {
                this._stateDecimalCharacterReference(t);
                break;
            }
            case h.NUMERIC_CHARACTER_REFERENCE_END: {
                this._stateNumericCharacterReferenceEnd(t);
                break;
            }
            default:
                throw new Error("Unknown state");
        }
    }
    _stateData(t) {
        switch (t) {
            case d.LESS_THAN_SIGN: {
                this.state = h.TAG_OPEN;
                break;
            }
            case d.AMPERSAND: {
                (this.returnState = h.DATA),
                    (this.state = h.CHARACTER_REFERENCE);
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), this._emitCodePoint(t);
                break;
            }
            case d.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateRcdata(t) {
        switch (t) {
            case d.AMPERSAND: {
                (this.returnState = h.RCDATA),
                    (this.state = h.CHARACTER_REFERENCE);
                break;
            }
            case d.LESS_THAN_SIGN: {
                this.state = h.RCDATA_LESS_THAN_SIGN;
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateRawtext(t) {
        switch (t) {
            case d.LESS_THAN_SIGN: {
                this.state = h.RAWTEXT_LESS_THAN_SIGN;
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateScriptData(t) {
        switch (t) {
            case d.LESS_THAN_SIGN: {
                this.state = h.SCRIPT_DATA_LESS_THAN_SIGN;
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _statePlaintext(t) {
        switch (t) {
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateTagOpen(t) {
        if (St(t))
            this._createStartTagToken(),
                (this.state = h.TAG_NAME),
                this._stateTagName(t);
        else
            switch (t) {
                case d.EXCLAMATION_MARK: {
                    this.state = h.MARKUP_DECLARATION_OPEN;
                    break;
                }
                case d.SOLIDUS: {
                    this.state = h.END_TAG_OPEN;
                    break;
                }
                case d.QUESTION_MARK: {
                    this._err(x.unexpectedQuestionMarkInsteadOfTagName),
                        this._createCommentToken(1),
                        (this.state = h.BOGUS_COMMENT),
                        this._stateBogusComment(t);
                    break;
                }
                case d.EOF: {
                    this._err(x.eofBeforeTagName),
                        this._emitChars("<"),
                        this._emitEOFToken();
                    break;
                }
                default:
                    this._err(x.invalidFirstCharacterOfTagName),
                        this._emitChars("<"),
                        (this.state = h.DATA),
                        this._stateData(t);
            }
    }
    _stateEndTagOpen(t) {
        if (St(t))
            this._createEndTagToken(),
                (this.state = h.TAG_NAME),
                this._stateTagName(t);
        else
            switch (t) {
                case d.GREATER_THAN_SIGN: {
                    this._err(x.missingEndTagName), (this.state = h.DATA);
                    break;
                }
                case d.EOF: {
                    this._err(x.eofBeforeTagName),
                        this._emitChars("</"),
                        this._emitEOFToken();
                    break;
                }
                default:
                    this._err(x.invalidFirstCharacterOfTagName),
                        this._createCommentToken(2),
                        (this.state = h.BOGUS_COMMENT),
                        this._stateBogusComment(t);
            }
    }
    _stateTagName(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED: {
                this.state = h.BEFORE_ATTRIBUTE_NAME;
                break;
            }
            case d.SOLIDUS: {
                this.state = h.SELF_CLOSING_START_TAG;
                break;
            }
            case d.GREATER_THAN_SIGN: {
                (this.state = h.DATA), this.emitCurrentTagToken();
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), (n.tagName += re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                n.tagName += String.fromCodePoint(On(t) ? Dr(t) : t);
        }
    }
    _stateRcdataLessThanSign(t) {
        t === d.SOLIDUS
            ? (this.state = h.RCDATA_END_TAG_OPEN)
            : (this._emitChars("<"),
              (this.state = h.RCDATA),
              this._stateRcdata(t));
    }
    _stateRcdataEndTagOpen(t) {
        St(t)
            ? ((this.state = h.RCDATA_END_TAG_NAME),
              this._stateRcdataEndTagName(t))
            : (this._emitChars("</"),
              (this.state = h.RCDATA),
              this._stateRcdata(t));
    }
    handleSpecialEndTag(t) {
        if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
            return !this._ensureHibernation();
        this._createEndTagToken();
        let n = this.currentToken;
        switch (
            ((n.tagName = this.lastStartTagName),
            this.preprocessor.peek(this.lastStartTagName.length))
        ) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
                return (
                    this._advanceBy(this.lastStartTagName.length),
                    (this.state = h.BEFORE_ATTRIBUTE_NAME),
                    !1
                );
            case d.SOLIDUS:
                return (
                    this._advanceBy(this.lastStartTagName.length),
                    (this.state = h.SELF_CLOSING_START_TAG),
                    !1
                );
            case d.GREATER_THAN_SIGN:
                return (
                    this._advanceBy(this.lastStartTagName.length),
                    this.emitCurrentTagToken(),
                    (this.state = h.DATA),
                    !1
                );
            default:
                return !this._ensureHibernation();
        }
    }
    _stateRcdataEndTagName(t) {
        this.handleSpecialEndTag(t) &&
            (this._emitChars("</"),
            (this.state = h.RCDATA),
            this._stateRcdata(t));
    }
    _stateRawtextLessThanSign(t) {
        t === d.SOLIDUS
            ? (this.state = h.RAWTEXT_END_TAG_OPEN)
            : (this._emitChars("<"),
              (this.state = h.RAWTEXT),
              this._stateRawtext(t));
    }
    _stateRawtextEndTagOpen(t) {
        St(t)
            ? ((this.state = h.RAWTEXT_END_TAG_NAME),
              this._stateRawtextEndTagName(t))
            : (this._emitChars("</"),
              (this.state = h.RAWTEXT),
              this._stateRawtext(t));
    }
    _stateRawtextEndTagName(t) {
        this.handleSpecialEndTag(t) &&
            (this._emitChars("</"),
            (this.state = h.RAWTEXT),
            this._stateRawtext(t));
    }
    _stateScriptDataLessThanSign(t) {
        switch (t) {
            case d.SOLIDUS: {
                this.state = h.SCRIPT_DATA_END_TAG_OPEN;
                break;
            }
            case d.EXCLAMATION_MARK: {
                (this.state = h.SCRIPT_DATA_ESCAPE_START),
                    this._emitChars("<!");
                break;
            }
            default:
                this._emitChars("<"),
                    (this.state = h.SCRIPT_DATA),
                    this._stateScriptData(t);
        }
    }
    _stateScriptDataEndTagOpen(t) {
        St(t)
            ? ((this.state = h.SCRIPT_DATA_END_TAG_NAME),
              this._stateScriptDataEndTagName(t))
            : (this._emitChars("</"),
              (this.state = h.SCRIPT_DATA),
              this._stateScriptData(t));
    }
    _stateScriptDataEndTagName(t) {
        this.handleSpecialEndTag(t) &&
            (this._emitChars("</"),
            (this.state = h.SCRIPT_DATA),
            this._stateScriptData(t));
    }
    _stateScriptDataEscapeStart(t) {
        t === d.HYPHEN_MINUS
            ? ((this.state = h.SCRIPT_DATA_ESCAPE_START_DASH),
              this._emitChars("-"))
            : ((this.state = h.SCRIPT_DATA), this._stateScriptData(t));
    }
    _stateScriptDataEscapeStartDash(t) {
        t === d.HYPHEN_MINUS
            ? ((this.state = h.SCRIPT_DATA_ESCAPED_DASH_DASH),
              this._emitChars("-"))
            : ((this.state = h.SCRIPT_DATA), this._stateScriptData(t));
    }
    _stateScriptDataEscaped(t) {
        switch (t) {
            case d.HYPHEN_MINUS: {
                (this.state = h.SCRIPT_DATA_ESCAPED_DASH), this._emitChars("-");
                break;
            }
            case d.LESS_THAN_SIGN: {
                this.state = h.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateScriptDataEscapedDash(t) {
        switch (t) {
            case d.HYPHEN_MINUS: {
                (this.state = h.SCRIPT_DATA_ESCAPED_DASH_DASH),
                    this._emitChars("-");
                break;
            }
            case d.LESS_THAN_SIGN: {
                this.state = h.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter),
                    (this.state = h.SCRIPT_DATA_ESCAPED),
                    this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                (this.state = h.SCRIPT_DATA_ESCAPED), this._emitCodePoint(t);
        }
    }
    _stateScriptDataEscapedDashDash(t) {
        switch (t) {
            case d.HYPHEN_MINUS: {
                this._emitChars("-");
                break;
            }
            case d.LESS_THAN_SIGN: {
                this.state = h.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
            }
            case d.GREATER_THAN_SIGN: {
                (this.state = h.SCRIPT_DATA), this._emitChars(">");
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter),
                    (this.state = h.SCRIPT_DATA_ESCAPED),
                    this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                (this.state = h.SCRIPT_DATA_ESCAPED), this._emitCodePoint(t);
        }
    }
    _stateScriptDataEscapedLessThanSign(t) {
        t === d.SOLIDUS
            ? (this.state = h.SCRIPT_DATA_ESCAPED_END_TAG_OPEN)
            : St(t)
            ? (this._emitChars("<"),
              (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPE_START),
              this._stateScriptDataDoubleEscapeStart(t))
            : (this._emitChars("<"),
              (this.state = h.SCRIPT_DATA_ESCAPED),
              this._stateScriptDataEscaped(t));
    }
    _stateScriptDataEscapedEndTagOpen(t) {
        St(t)
            ? ((this.state = h.SCRIPT_DATA_ESCAPED_END_TAG_NAME),
              this._stateScriptDataEscapedEndTagName(t))
            : (this._emitChars("</"),
              (this.state = h.SCRIPT_DATA_ESCAPED),
              this._stateScriptDataEscaped(t));
    }
    _stateScriptDataEscapedEndTagName(t) {
        this.handleSpecialEndTag(t) &&
            (this._emitChars("</"),
            (this.state = h.SCRIPT_DATA_ESCAPED),
            this._stateScriptDataEscaped(t));
    }
    _stateScriptDataDoubleEscapeStart(t) {
        if (
            this.preprocessor.startsWith(Ne.SCRIPT, !1) &&
            Oo(this.preprocessor.peek(Ne.SCRIPT.length))
        ) {
            this._emitCodePoint(t);
            for (let n = 0; n < Ne.SCRIPT.length; n++)
                this._emitCodePoint(this._consume());
            this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED;
        } else
            this._ensureHibernation() ||
                ((this.state = h.SCRIPT_DATA_ESCAPED),
                this._stateScriptDataEscaped(t));
    }
    _stateScriptDataDoubleEscaped(t) {
        switch (t) {
            case d.HYPHEN_MINUS: {
                (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED_DASH),
                    this._emitChars("-");
                break;
            }
            case d.LESS_THAN_SIGN: {
                (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
                    this._emitChars("<");
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateScriptDataDoubleEscapedDash(t) {
        switch (t) {
            case d.HYPHEN_MINUS: {
                (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH),
                    this._emitChars("-");
                break;
            }
            case d.LESS_THAN_SIGN: {
                (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
                    this._emitChars("<");
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter),
                    (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED),
                    this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED),
                    this._emitCodePoint(t);
        }
    }
    _stateScriptDataDoubleEscapedDashDash(t) {
        switch (t) {
            case d.HYPHEN_MINUS: {
                this._emitChars("-");
                break;
            }
            case d.LESS_THAN_SIGN: {
                (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN),
                    this._emitChars("<");
                break;
            }
            case d.GREATER_THAN_SIGN: {
                (this.state = h.SCRIPT_DATA), this._emitChars(">");
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter),
                    (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED),
                    this._emitChars(re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            }
            default:
                (this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED),
                    this._emitCodePoint(t);
        }
    }
    _stateScriptDataDoubleEscapedLessThanSign(t) {
        t === d.SOLIDUS
            ? ((this.state = h.SCRIPT_DATA_DOUBLE_ESCAPE_END),
              this._emitChars("/"))
            : ((this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED),
              this._stateScriptDataDoubleEscaped(t));
    }
    _stateScriptDataDoubleEscapeEnd(t) {
        if (
            this.preprocessor.startsWith(Ne.SCRIPT, !1) &&
            Oo(this.preprocessor.peek(Ne.SCRIPT.length))
        ) {
            this._emitCodePoint(t);
            for (let n = 0; n < Ne.SCRIPT.length; n++)
                this._emitCodePoint(this._consume());
            this.state = h.SCRIPT_DATA_ESCAPED;
        } else
            this._ensureHibernation() ||
                ((this.state = h.SCRIPT_DATA_DOUBLE_ESCAPED),
                this._stateScriptDataDoubleEscaped(t));
    }
    _stateBeforeAttributeName(t) {
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
                break;
            case d.SOLIDUS:
            case d.GREATER_THAN_SIGN:
            case d.EOF: {
                (this.state = h.AFTER_ATTRIBUTE_NAME),
                    this._stateAfterAttributeName(t);
                break;
            }
            case d.EQUALS_SIGN: {
                this._err(x.unexpectedEqualsSignBeforeAttributeName),
                    this._createAttr("="),
                    (this.state = h.ATTRIBUTE_NAME);
                break;
            }
            default:
                this._createAttr(""),
                    (this.state = h.ATTRIBUTE_NAME),
                    this._stateAttributeName(t);
        }
    }
    _stateAttributeName(t) {
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
            case d.SOLIDUS:
            case d.GREATER_THAN_SIGN:
            case d.EOF: {
                this._leaveAttrName(),
                    (this.state = h.AFTER_ATTRIBUTE_NAME),
                    this._stateAfterAttributeName(t);
                break;
            }
            case d.EQUALS_SIGN: {
                this._leaveAttrName(), (this.state = h.BEFORE_ATTRIBUTE_VALUE);
                break;
            }
            case d.QUOTATION_MARK:
            case d.APOSTROPHE:
            case d.LESS_THAN_SIGN: {
                this._err(x.unexpectedCharacterInAttributeName),
                    (this.currentAttr.name += String.fromCodePoint(t));
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter),
                    (this.currentAttr.name += re);
                break;
            }
            default:
                this.currentAttr.name += String.fromCodePoint(
                    On(t) ? Dr(t) : t
                );
        }
    }
    _stateAfterAttributeName(t) {
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
                break;
            case d.SOLIDUS: {
                this.state = h.SELF_CLOSING_START_TAG;
                break;
            }
            case d.EQUALS_SIGN: {
                this.state = h.BEFORE_ATTRIBUTE_VALUE;
                break;
            }
            case d.GREATER_THAN_SIGN: {
                (this.state = h.DATA), this.emitCurrentTagToken();
                break;
            }
            case d.EOF: {
                this._err(x.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this._createAttr(""),
                    (this.state = h.ATTRIBUTE_NAME),
                    this._stateAttributeName(t);
        }
    }
    _stateBeforeAttributeValue(t) {
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
                break;
            case d.QUOTATION_MARK: {
                this.state = h.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
                break;
            }
            case d.APOSTROPHE: {
                this.state = h.ATTRIBUTE_VALUE_SINGLE_QUOTED;
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.missingAttributeValue),
                    (this.state = h.DATA),
                    this.emitCurrentTagToken();
                break;
            }
            default:
                (this.state = h.ATTRIBUTE_VALUE_UNQUOTED),
                    this._stateAttributeValueUnquoted(t);
        }
    }
    _stateAttributeValueDoubleQuoted(t) {
        switch (t) {
            case d.QUOTATION_MARK: {
                this.state = h.AFTER_ATTRIBUTE_VALUE_QUOTED;
                break;
            }
            case d.AMPERSAND: {
                (this.returnState = h.ATTRIBUTE_VALUE_DOUBLE_QUOTED),
                    (this.state = h.CHARACTER_REFERENCE);
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter),
                    (this.currentAttr.value += re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this.currentAttr.value += String.fromCodePoint(t);
        }
    }
    _stateAttributeValueSingleQuoted(t) {
        switch (t) {
            case d.APOSTROPHE: {
                this.state = h.AFTER_ATTRIBUTE_VALUE_QUOTED;
                break;
            }
            case d.AMPERSAND: {
                (this.returnState = h.ATTRIBUTE_VALUE_SINGLE_QUOTED),
                    (this.state = h.CHARACTER_REFERENCE);
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter),
                    (this.currentAttr.value += re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this.currentAttr.value += String.fromCodePoint(t);
        }
    }
    _stateAttributeValueUnquoted(t) {
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED: {
                this._leaveAttrValue(), (this.state = h.BEFORE_ATTRIBUTE_NAME);
                break;
            }
            case d.AMPERSAND: {
                (this.returnState = h.ATTRIBUTE_VALUE_UNQUOTED),
                    (this.state = h.CHARACTER_REFERENCE);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._leaveAttrValue(),
                    (this.state = h.DATA),
                    this.emitCurrentTagToken();
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter),
                    (this.currentAttr.value += re);
                break;
            }
            case d.QUOTATION_MARK:
            case d.APOSTROPHE:
            case d.LESS_THAN_SIGN:
            case d.EQUALS_SIGN:
            case d.GRAVE_ACCENT: {
                this._err(x.unexpectedCharacterInUnquotedAttributeValue),
                    (this.currentAttr.value += String.fromCodePoint(t));
                break;
            }
            case d.EOF: {
                this._err(x.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this.currentAttr.value += String.fromCodePoint(t);
        }
    }
    _stateAfterAttributeValueQuoted(t) {
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED: {
                this._leaveAttrValue(), (this.state = h.BEFORE_ATTRIBUTE_NAME);
                break;
            }
            case d.SOLIDUS: {
                this._leaveAttrValue(), (this.state = h.SELF_CLOSING_START_TAG);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._leaveAttrValue(),
                    (this.state = h.DATA),
                    this.emitCurrentTagToken();
                break;
            }
            case d.EOF: {
                this._err(x.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this._err(x.missingWhitespaceBetweenAttributes),
                    (this.state = h.BEFORE_ATTRIBUTE_NAME),
                    this._stateBeforeAttributeName(t);
        }
    }
    _stateSelfClosingStartTag(t) {
        switch (t) {
            case d.GREATER_THAN_SIGN: {
                let n = this.currentToken;
                (n.selfClosing = !0),
                    (this.state = h.DATA),
                    this.emitCurrentTagToken();
                break;
            }
            case d.EOF: {
                this._err(x.eofInTag), this._emitEOFToken();
                break;
            }
            default:
                this._err(x.unexpectedSolidusInTag),
                    (this.state = h.BEFORE_ATTRIBUTE_NAME),
                    this._stateBeforeAttributeName(t);
        }
    }
    _stateBogusComment(t) {
        let n = this.currentToken;
        switch (t) {
            case d.GREATER_THAN_SIGN: {
                (this.state = h.DATA), this.emitCurrentComment(n);
                break;
            }
            case d.EOF: {
                this.emitCurrentComment(n), this._emitEOFToken();
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), (n.data += re);
                break;
            }
            default:
                n.data += String.fromCodePoint(t);
        }
    }
    _stateMarkupDeclarationOpen(t) {
        this._consumeSequenceIfMatch(Ne.DASH_DASH, !0)
            ? (this._createCommentToken(Ne.DASH_DASH.length + 1),
              (this.state = h.COMMENT_START))
            : this._consumeSequenceIfMatch(Ne.DOCTYPE, !1)
            ? ((this.currentLocation = this.getCurrentLocation(
                  Ne.DOCTYPE.length + 1
              )),
              (this.state = h.DOCTYPE))
            : this._consumeSequenceIfMatch(Ne.CDATA_START, !0)
            ? this.inForeignNode
                ? (this.state = h.CDATA_SECTION)
                : (this._err(x.cdataInHtmlContent),
                  this._createCommentToken(Ne.CDATA_START.length + 1),
                  (this.currentToken.data = "[CDATA["),
                  (this.state = h.BOGUS_COMMENT))
            : this._ensureHibernation() ||
              (this._err(x.incorrectlyOpenedComment),
              this._createCommentToken(2),
              (this.state = h.BOGUS_COMMENT),
              this._stateBogusComment(t));
    }
    _stateCommentStart(t) {
        switch (t) {
            case d.HYPHEN_MINUS: {
                this.state = h.COMMENT_START_DASH;
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.abruptClosingOfEmptyComment), (this.state = h.DATA);
                let n = this.currentToken;
                this.emitCurrentComment(n);
                break;
            }
            default:
                (this.state = h.COMMENT), this._stateComment(t);
        }
    }
    _stateCommentStartDash(t) {
        let n = this.currentToken;
        switch (t) {
            case d.HYPHEN_MINUS: {
                this.state = h.COMMENT_END;
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.abruptClosingOfEmptyComment),
                    (this.state = h.DATA),
                    this.emitCurrentComment(n);
                break;
            }
            case d.EOF: {
                this._err(x.eofInComment),
                    this.emitCurrentComment(n),
                    this._emitEOFToken();
                break;
            }
            default:
                (n.data += "-"),
                    (this.state = h.COMMENT),
                    this._stateComment(t);
        }
    }
    _stateComment(t) {
        let n = this.currentToken;
        switch (t) {
            case d.HYPHEN_MINUS: {
                this.state = h.COMMENT_END_DASH;
                break;
            }
            case d.LESS_THAN_SIGN: {
                (n.data += "<"), (this.state = h.COMMENT_LESS_THAN_SIGN);
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), (n.data += re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInComment),
                    this.emitCurrentComment(n),
                    this._emitEOFToken();
                break;
            }
            default:
                n.data += String.fromCodePoint(t);
        }
    }
    _stateCommentLessThanSign(t) {
        let n = this.currentToken;
        switch (t) {
            case d.EXCLAMATION_MARK: {
                (n.data += "!"), (this.state = h.COMMENT_LESS_THAN_SIGN_BANG);
                break;
            }
            case d.LESS_THAN_SIGN: {
                n.data += "<";
                break;
            }
            default:
                (this.state = h.COMMENT), this._stateComment(t);
        }
    }
    _stateCommentLessThanSignBang(t) {
        t === d.HYPHEN_MINUS
            ? (this.state = h.COMMENT_LESS_THAN_SIGN_BANG_DASH)
            : ((this.state = h.COMMENT), this._stateComment(t));
    }
    _stateCommentLessThanSignBangDash(t) {
        t === d.HYPHEN_MINUS
            ? (this.state = h.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH)
            : ((this.state = h.COMMENT_END_DASH), this._stateCommentEndDash(t));
    }
    _stateCommentLessThanSignBangDashDash(t) {
        t !== d.GREATER_THAN_SIGN && t !== d.EOF && this._err(x.nestedComment),
            (this.state = h.COMMENT_END),
            this._stateCommentEnd(t);
    }
    _stateCommentEndDash(t) {
        let n = this.currentToken;
        switch (t) {
            case d.HYPHEN_MINUS: {
                this.state = h.COMMENT_END;
                break;
            }
            case d.EOF: {
                this._err(x.eofInComment),
                    this.emitCurrentComment(n),
                    this._emitEOFToken();
                break;
            }
            default:
                (n.data += "-"),
                    (this.state = h.COMMENT),
                    this._stateComment(t);
        }
    }
    _stateCommentEnd(t) {
        let n = this.currentToken;
        switch (t) {
            case d.GREATER_THAN_SIGN: {
                (this.state = h.DATA), this.emitCurrentComment(n);
                break;
            }
            case d.EXCLAMATION_MARK: {
                this.state = h.COMMENT_END_BANG;
                break;
            }
            case d.HYPHEN_MINUS: {
                n.data += "-";
                break;
            }
            case d.EOF: {
                this._err(x.eofInComment),
                    this.emitCurrentComment(n),
                    this._emitEOFToken();
                break;
            }
            default:
                (n.data += "--"),
                    (this.state = h.COMMENT),
                    this._stateComment(t);
        }
    }
    _stateCommentEndBang(t) {
        let n = this.currentToken;
        switch (t) {
            case d.HYPHEN_MINUS: {
                (n.data += "--!"), (this.state = h.COMMENT_END_DASH);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.incorrectlyClosedComment),
                    (this.state = h.DATA),
                    this.emitCurrentComment(n);
                break;
            }
            case d.EOF: {
                this._err(x.eofInComment),
                    this.emitCurrentComment(n),
                    this._emitEOFToken();
                break;
            }
            default:
                (n.data += "--!"),
                    (this.state = h.COMMENT),
                    this._stateComment(t);
        }
    }
    _stateDoctype(t) {
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED: {
                this.state = h.BEFORE_DOCTYPE_NAME;
                break;
            }
            case d.GREATER_THAN_SIGN: {
                (this.state = h.BEFORE_DOCTYPE_NAME),
                    this._stateBeforeDoctypeName(t);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype), this._createDoctypeToken(null);
                let n = this.currentToken;
                (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(x.missingWhitespaceBeforeDoctypeName),
                    (this.state = h.BEFORE_DOCTYPE_NAME),
                    this._stateBeforeDoctypeName(t);
        }
    }
    _stateBeforeDoctypeName(t) {
        if (On(t))
            this._createDoctypeToken(String.fromCharCode(Dr(t))),
                (this.state = h.DOCTYPE_NAME);
        else
            switch (t) {
                case d.SPACE:
                case d.LINE_FEED:
                case d.TABULATION:
                case d.FORM_FEED:
                    break;
                case d.NULL: {
                    this._err(x.unexpectedNullCharacter),
                        this._createDoctypeToken(re),
                        (this.state = h.DOCTYPE_NAME);
                    break;
                }
                case d.GREATER_THAN_SIGN: {
                    this._err(x.missingDoctypeName),
                        this._createDoctypeToken(null);
                    let n = this.currentToken;
                    (n.forceQuirks = !0),
                        this.emitCurrentDoctype(n),
                        (this.state = h.DATA);
                    break;
                }
                case d.EOF: {
                    this._err(x.eofInDoctype), this._createDoctypeToken(null);
                    let n = this.currentToken;
                    (n.forceQuirks = !0),
                        this.emitCurrentDoctype(n),
                        this._emitEOFToken();
                    break;
                }
                default:
                    this._createDoctypeToken(String.fromCodePoint(t)),
                        (this.state = h.DOCTYPE_NAME);
            }
    }
    _stateDoctypeName(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED: {
                this.state = h.AFTER_DOCTYPE_NAME;
                break;
            }
            case d.GREATER_THAN_SIGN: {
                (this.state = h.DATA), this.emitCurrentDoctype(n);
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), (n.name += re);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                n.name += String.fromCodePoint(On(t) ? Dr(t) : t);
        }
    }
    _stateAfterDoctypeName(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
                break;
            case d.GREATER_THAN_SIGN: {
                (this.state = h.DATA), this.emitCurrentDoctype(n);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                this._consumeSequenceIfMatch(Ne.PUBLIC, !1)
                    ? (this.state = h.AFTER_DOCTYPE_PUBLIC_KEYWORD)
                    : this._consumeSequenceIfMatch(Ne.SYSTEM, !1)
                    ? (this.state = h.AFTER_DOCTYPE_SYSTEM_KEYWORD)
                    : this._ensureHibernation() ||
                      (this._err(x.invalidCharacterSequenceAfterDoctypeName),
                      (n.forceQuirks = !0),
                      (this.state = h.BOGUS_DOCTYPE),
                      this._stateBogusDoctype(t));
        }
    }
    _stateAfterDoctypePublicKeyword(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED: {
                this.state = h.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
            }
            case d.QUOTATION_MARK: {
                this._err(x.missingWhitespaceAfterDoctypePublicKeyword),
                    (n.publicId = ""),
                    (this.state = h.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case d.APOSTROPHE: {
                this._err(x.missingWhitespaceAfterDoctypePublicKeyword),
                    (n.publicId = ""),
                    (this.state = h.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.missingDoctypePublicIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.DATA),
                    this.emitCurrentDoctype(n);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(x.missingQuoteBeforeDoctypePublicIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateBeforeDoctypePublicIdentifier(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
                break;
            case d.QUOTATION_MARK: {
                (n.publicId = ""),
                    (this.state = h.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case d.APOSTROPHE: {
                (n.publicId = ""),
                    (this.state = h.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.missingDoctypePublicIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.DATA),
                    this.emitCurrentDoctype(n);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(x.missingQuoteBeforeDoctypePublicIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateDoctypePublicIdentifierDoubleQuoted(t) {
        let n = this.currentToken;
        switch (t) {
            case d.QUOTATION_MARK: {
                this.state = h.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), (n.publicId += re);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.abruptDoctypePublicIdentifier),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    (this.state = h.DATA);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                n.publicId += String.fromCodePoint(t);
        }
    }
    _stateDoctypePublicIdentifierSingleQuoted(t) {
        let n = this.currentToken;
        switch (t) {
            case d.APOSTROPHE: {
                this.state = h.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), (n.publicId += re);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.abruptDoctypePublicIdentifier),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    (this.state = h.DATA);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                n.publicId += String.fromCodePoint(t);
        }
    }
    _stateAfterDoctypePublicIdentifier(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED: {
                this.state = h.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
                break;
            }
            case d.GREATER_THAN_SIGN: {
                (this.state = h.DATA), this.emitCurrentDoctype(n);
                break;
            }
            case d.QUOTATION_MARK: {
                this._err(
                    x.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
                ),
                    (n.systemId = ""),
                    (this.state = h.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case d.APOSTROPHE: {
                this._err(
                    x.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
                ),
                    (n.systemId = ""),
                    (this.state = h.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(x.missingQuoteBeforeDoctypeSystemIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
                break;
            case d.GREATER_THAN_SIGN: {
                this.emitCurrentDoctype(n), (this.state = h.DATA);
                break;
            }
            case d.QUOTATION_MARK: {
                (n.systemId = ""),
                    (this.state = h.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case d.APOSTROPHE: {
                (n.systemId = ""),
                    (this.state = h.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(x.missingQuoteBeforeDoctypeSystemIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateAfterDoctypeSystemKeyword(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED: {
                this.state = h.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
            }
            case d.QUOTATION_MARK: {
                this._err(x.missingWhitespaceAfterDoctypeSystemKeyword),
                    (n.systemId = ""),
                    (this.state = h.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case d.APOSTROPHE: {
                this._err(x.missingWhitespaceAfterDoctypeSystemKeyword),
                    (n.systemId = ""),
                    (this.state = h.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.missingDoctypeSystemIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.DATA),
                    this.emitCurrentDoctype(n);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(x.missingQuoteBeforeDoctypeSystemIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateBeforeDoctypeSystemIdentifier(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
                break;
            case d.QUOTATION_MARK: {
                (n.systemId = ""),
                    (this.state = h.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED);
                break;
            }
            case d.APOSTROPHE: {
                (n.systemId = ""),
                    (this.state = h.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.missingDoctypeSystemIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.DATA),
                    this.emitCurrentDoctype(n);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(x.missingQuoteBeforeDoctypeSystemIdentifier),
                    (n.forceQuirks = !0),
                    (this.state = h.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateDoctypeSystemIdentifierDoubleQuoted(t) {
        let n = this.currentToken;
        switch (t) {
            case d.QUOTATION_MARK: {
                this.state = h.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), (n.systemId += re);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.abruptDoctypeSystemIdentifier),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    (this.state = h.DATA);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                n.systemId += String.fromCodePoint(t);
        }
    }
    _stateDoctypeSystemIdentifierSingleQuoted(t) {
        let n = this.currentToken;
        switch (t) {
            case d.APOSTROPHE: {
                this.state = h.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter), (n.systemId += re);
                break;
            }
            case d.GREATER_THAN_SIGN: {
                this._err(x.abruptDoctypeSystemIdentifier),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    (this.state = h.DATA);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                n.systemId += String.fromCodePoint(t);
        }
    }
    _stateAfterDoctypeSystemIdentifier(t) {
        let n = this.currentToken;
        switch (t) {
            case d.SPACE:
            case d.LINE_FEED:
            case d.TABULATION:
            case d.FORM_FEED:
                break;
            case d.GREATER_THAN_SIGN: {
                this.emitCurrentDoctype(n), (this.state = h.DATA);
                break;
            }
            case d.EOF: {
                this._err(x.eofInDoctype),
                    (n.forceQuirks = !0),
                    this.emitCurrentDoctype(n),
                    this._emitEOFToken();
                break;
            }
            default:
                this._err(x.unexpectedCharacterAfterDoctypeSystemIdentifier),
                    (this.state = h.BOGUS_DOCTYPE),
                    this._stateBogusDoctype(t);
        }
    }
    _stateBogusDoctype(t) {
        let n = this.currentToken;
        switch (t) {
            case d.GREATER_THAN_SIGN: {
                this.emitCurrentDoctype(n), (this.state = h.DATA);
                break;
            }
            case d.NULL: {
                this._err(x.unexpectedNullCharacter);
                break;
            }
            case d.EOF: {
                this.emitCurrentDoctype(n), this._emitEOFToken();
                break;
            }
            default:
        }
    }
    _stateCdataSection(t) {
        switch (t) {
            case d.RIGHT_SQUARE_BRACKET: {
                this.state = h.CDATA_SECTION_BRACKET;
                break;
            }
            case d.EOF: {
                this._err(x.eofInCdata), this._emitEOFToken();
                break;
            }
            default:
                this._emitCodePoint(t);
        }
    }
    _stateCdataSectionBracket(t) {
        t === d.RIGHT_SQUARE_BRACKET
            ? (this.state = h.CDATA_SECTION_END)
            : (this._emitChars("]"),
              (this.state = h.CDATA_SECTION),
              this._stateCdataSection(t));
    }
    _stateCdataSectionEnd(t) {
        switch (t) {
            case d.GREATER_THAN_SIGN: {
                this.state = h.DATA;
                break;
            }
            case d.RIGHT_SQUARE_BRACKET: {
                this._emitChars("]");
                break;
            }
            default:
                this._emitChars("]]"),
                    (this.state = h.CDATA_SECTION),
                    this._stateCdataSection(t);
        }
    }
    _stateCharacterReference(t) {
        t === d.NUMBER_SIGN
            ? (this.state = h.NUMERIC_CHARACTER_REFERENCE)
            : Mu(t)
            ? ((this.state = h.NAMED_CHARACTER_REFERENCE),
              this._stateNamedCharacterReference(t))
            : (this._flushCodePointConsumedAsCharacterReference(d.AMPERSAND),
              this._reconsumeInState(this.returnState, t));
    }
    _stateNamedCharacterReference(t) {
        let n = this._matchNamedCharacterReference(t);
        if (!this._ensureHibernation())
            if (n) {
                for (let r = 0; r < n.length; r++)
                    this._flushCodePointConsumedAsCharacterReference(n[r]);
                this.state = this.returnState;
            } else
                this._flushCodePointConsumedAsCharacterReference(d.AMPERSAND),
                    (this.state = h.AMBIGUOUS_AMPERSAND);
    }
    _stateAmbiguousAmpersand(t) {
        Mu(t)
            ? this._flushCodePointConsumedAsCharacterReference(t)
            : (t === d.SEMICOLON && this._err(x.unknownNamedCharacterReference),
              this._reconsumeInState(this.returnState, t));
    }
    _stateNumericCharacterReference(t) {
        (this.charRefCode = 0),
            t === d.LATIN_SMALL_X || t === d.LATIN_CAPITAL_X
                ? (this.state = h.HEXADEMICAL_CHARACTER_REFERENCE_START)
                : yn(t)
                ? ((this.state = h.DECIMAL_CHARACTER_REFERENCE),
                  this._stateDecimalCharacterReference(t))
                : (this._err(x.absenceOfDigitsInNumericCharacterReference),
                  this._flushCodePointConsumedAsCharacterReference(d.AMPERSAND),
                  this._flushCodePointConsumedAsCharacterReference(
                      d.NUMBER_SIGN
                  ),
                  this._reconsumeInState(this.returnState, t));
    }
    _stateHexademicalCharacterReferenceStart(t) {
        Id(t)
            ? ((this.state = h.HEXADEMICAL_CHARACTER_REFERENCE),
              this._stateHexademicalCharacterReference(t))
            : (this._err(x.absenceOfDigitsInNumericCharacterReference),
              this._flushCodePointConsumedAsCharacterReference(d.AMPERSAND),
              this._flushCodePointConsumedAsCharacterReference(d.NUMBER_SIGN),
              this._unconsume(2),
              (this.state = this.returnState));
    }
    _stateHexademicalCharacterReference(t) {
        yo(t)
            ? (this.charRefCode = this.charRefCode * 16 + t - 55)
            : Do(t)
            ? (this.charRefCode = this.charRefCode * 16 + t - 87)
            : yn(t)
            ? (this.charRefCode = this.charRefCode * 16 + t - 48)
            : t === d.SEMICOLON
            ? (this.state = h.NUMERIC_CHARACTER_REFERENCE_END)
            : (this._err(x.missingSemicolonAfterCharacterReference),
              (this.state = h.NUMERIC_CHARACTER_REFERENCE_END),
              this._stateNumericCharacterReferenceEnd(t));
    }
    _stateDecimalCharacterReference(t) {
        yn(t)
            ? (this.charRefCode = this.charRefCode * 10 + t - 48)
            : t === d.SEMICOLON
            ? (this.state = h.NUMERIC_CHARACTER_REFERENCE_END)
            : (this._err(x.missingSemicolonAfterCharacterReference),
              (this.state = h.NUMERIC_CHARACTER_REFERENCE_END),
              this._stateNumericCharacterReferenceEnd(t));
    }
    _stateNumericCharacterReferenceEnd(t) {
        if (this.charRefCode === d.NULL)
            this._err(x.nullCharacterReference),
                (this.charRefCode = d.REPLACEMENT_CHARACTER);
        else if (this.charRefCode > 1114111)
            this._err(x.characterReferenceOutsideUnicodeRange),
                (this.charRefCode = d.REPLACEMENT_CHARACTER);
        else if (kr(this.charRefCode))
            this._err(x.surrogateCharacterReference),
                (this.charRefCode = d.REPLACEMENT_CHARACTER);
        else if (Or(this.charRefCode))
            this._err(x.noncharacterCharacterReference);
        else if (
            Lr(this.charRefCode) ||
            this.charRefCode === d.CARRIAGE_RETURN
        ) {
            this._err(x.controlCharacterReference);
            let n = xd.get(this.charRefCode);
            n !== void 0 && (this.charRefCode = n);
        }
        this._flushCodePointConsumedAsCharacterReference(this.charRefCode),
            this._reconsumeInState(this.returnState, t);
    }
};
var Mo = new Set([
        a.DD,
        a.DT,
        a.LI,
        a.OPTGROUP,
        a.OPTION,
        a.P,
        a.RB,
        a.RP,
        a.RT,
        a.RTC,
    ]),
    wo = new Set([
        ...Mo,
        a.CAPTION,
        a.COLGROUP,
        a.TBODY,
        a.TD,
        a.TFOOT,
        a.TH,
        a.THEAD,
        a.TR,
    ]),
    Pr = new Map([
        [a.APPLET, N.HTML],
        [a.CAPTION, N.HTML],
        [a.HTML, N.HTML],
        [a.MARQUEE, N.HTML],
        [a.OBJECT, N.HTML],
        [a.TABLE, N.HTML],
        [a.TD, N.HTML],
        [a.TEMPLATE, N.HTML],
        [a.TH, N.HTML],
        [a.ANNOTATION_XML, N.MATHML],
        [a.MI, N.MATHML],
        [a.MN, N.MATHML],
        [a.MO, N.MATHML],
        [a.MS, N.MATHML],
        [a.MTEXT, N.MATHML],
        [a.DESC, N.SVG],
        [a.FOREIGN_OBJECT, N.SVG],
        [a.TITLE, N.SVG],
    ]),
    Sd = [a.H1, a.H2, a.H3, a.H4, a.H5, a.H6],
    Rd = [a.TR, a.TEMPLATE, a.HTML],
    kd = [a.TBODY, a.TFOOT, a.THEAD, a.TEMPLATE, a.HTML],
    Ld = [a.TABLE, a.TEMPLATE, a.HTML],
    Od = [a.TD, a.TH],
    wr = class {
        get currentTmplContentOrNode() {
            return this._isInTemplate()
                ? this.treeAdapter.getTemplateContent(this.current)
                : this.current;
        }
        constructor(t, n, r) {
            (this.treeAdapter = n),
                (this.handler = r),
                (this.items = []),
                (this.tagIDs = []),
                (this.stackTop = -1),
                (this.tmplCount = 0),
                (this.currentTagId = a.UNKNOWN),
                (this.current = t);
        }
        _indexOf(t) {
            return this.items.lastIndexOf(t, this.stackTop);
        }
        _isInTemplate() {
            return (
                this.currentTagId === a.TEMPLATE &&
                this.treeAdapter.getNamespaceURI(this.current) === N.HTML
            );
        }
        _updateCurrentElement() {
            (this.current = this.items[this.stackTop]),
                (this.currentTagId = this.tagIDs[this.stackTop]);
        }
        push(t, n) {
            this.stackTop++,
                (this.items[this.stackTop] = t),
                (this.current = t),
                (this.tagIDs[this.stackTop] = n),
                (this.currentTagId = n),
                this._isInTemplate() && this.tmplCount++,
                this.handler.onItemPush(t, n, !0);
        }
        pop() {
            let t = this.current;
            this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--,
                this.stackTop--,
                this._updateCurrentElement(),
                this.handler.onItemPop(t, !0);
        }
        replace(t, n) {
            let r = this._indexOf(t);
            (this.items[r] = n), r === this.stackTop && (this.current = n);
        }
        insertAfter(t, n, r) {
            let i = this._indexOf(t) + 1;
            this.items.splice(i, 0, n),
                this.tagIDs.splice(i, 0, r),
                this.stackTop++,
                i === this.stackTop && this._updateCurrentElement(),
                this.handler.onItemPush(
                    this.current,
                    this.currentTagId,
                    i === this.stackTop
                );
        }
        popUntilTagNamePopped(t) {
            let n = this.stackTop + 1;
            do n = this.tagIDs.lastIndexOf(t, n - 1);
            while (
                n > 0 &&
                this.treeAdapter.getNamespaceURI(this.items[n]) !== N.HTML
            );
            this.shortenToLength(n < 0 ? 0 : n);
        }
        shortenToLength(t) {
            for (; this.stackTop >= t; ) {
                let n = this.current;
                this.tmplCount > 0 &&
                    this._isInTemplate() &&
                    (this.tmplCount -= 1),
                    this.stackTop--,
                    this._updateCurrentElement(),
                    this.handler.onItemPop(n, this.stackTop < t);
            }
        }
        popUntilElementPopped(t) {
            let n = this._indexOf(t);
            this.shortenToLength(n < 0 ? 0 : n);
        }
        popUntilPopped(t, n) {
            let r = this._indexOfTagNames(t, n);
            this.shortenToLength(r < 0 ? 0 : r);
        }
        popUntilNumberedHeaderPopped() {
            this.popUntilPopped(Sd, N.HTML);
        }
        popUntilTableCellPopped() {
            this.popUntilPopped(Od, N.HTML);
        }
        popAllUpToHtmlElement() {
            (this.tmplCount = 0), this.shortenToLength(1);
        }
        _indexOfTagNames(t, n) {
            for (let r = this.stackTop; r >= 0; r--)
                if (
                    t.includes(this.tagIDs[r]) &&
                    this.treeAdapter.getNamespaceURI(this.items[r]) === n
                )
                    return r;
            return -1;
        }
        clearBackTo(t, n) {
            let r = this._indexOfTagNames(t, n);
            this.shortenToLength(r + 1);
        }
        clearBackToTableContext() {
            this.clearBackTo(Ld, N.HTML);
        }
        clearBackToTableBodyContext() {
            this.clearBackTo(kd, N.HTML);
        }
        clearBackToTableRowContext() {
            this.clearBackTo(Rd, N.HTML);
        }
        remove(t) {
            let n = this._indexOf(t);
            n >= 0 &&
                (n === this.stackTop
                    ? this.pop()
                    : (this.items.splice(n, 1),
                      this.tagIDs.splice(n, 1),
                      this.stackTop--,
                      this._updateCurrentElement(),
                      this.handler.onItemPop(t, !1)));
        }
        tryPeekProperlyNestedBodyElement() {
            return this.stackTop >= 1 && this.tagIDs[1] === a.BODY
                ? this.items[1]
                : null;
        }
        contains(t) {
            return this._indexOf(t) > -1;
        }
        getCommonAncestor(t) {
            let n = this._indexOf(t) - 1;
            return n >= 0 ? this.items[n] : null;
        }
        isRootHtmlElementCurrent() {
            return this.stackTop === 0 && this.tagIDs[0] === a.HTML;
        }
        hasInScope(t) {
            for (let n = this.stackTop; n >= 0; n--) {
                let r = this.tagIDs[n],
                    i = this.treeAdapter.getNamespaceURI(this.items[n]);
                if (r === t && i === N.HTML) return !0;
                if (Pr.get(r) === i) return !1;
            }
            return !0;
        }
        hasNumberedHeaderInScope() {
            for (let t = this.stackTop; t >= 0; t--) {
                let n = this.tagIDs[t],
                    r = this.treeAdapter.getNamespaceURI(this.items[t]);
                if (kn(n) && r === N.HTML) return !0;
                if (Pr.get(n) === r) return !1;
            }
            return !0;
        }
        hasInListItemScope(t) {
            for (let n = this.stackTop; n >= 0; n--) {
                let r = this.tagIDs[n],
                    i = this.treeAdapter.getNamespaceURI(this.items[n]);
                if (r === t && i === N.HTML) return !0;
                if (
                    ((r === a.UL || r === a.OL) && i === N.HTML) ||
                    Pr.get(r) === i
                )
                    return !1;
            }
            return !0;
        }
        hasInButtonScope(t) {
            for (let n = this.stackTop; n >= 0; n--) {
                let r = this.tagIDs[n],
                    i = this.treeAdapter.getNamespaceURI(this.items[n]);
                if (r === t && i === N.HTML) return !0;
                if ((r === a.BUTTON && i === N.HTML) || Pr.get(r) === i)
                    return !1;
            }
            return !0;
        }
        hasInTableScope(t) {
            for (let n = this.stackTop; n >= 0; n--) {
                let r = this.tagIDs[n];
                if (
                    this.treeAdapter.getNamespaceURI(this.items[n]) === N.HTML
                ) {
                    if (r === t) return !0;
                    if (r === a.TABLE || r === a.TEMPLATE || r === a.HTML)
                        return !1;
                }
            }
            return !0;
        }
        hasTableBodyContextInTableScope() {
            for (let t = this.stackTop; t >= 0; t--) {
                let n = this.tagIDs[t];
                if (
                    this.treeAdapter.getNamespaceURI(this.items[t]) === N.HTML
                ) {
                    if (n === a.TBODY || n === a.THEAD || n === a.TFOOT)
                        return !0;
                    if (n === a.TABLE || n === a.HTML) return !1;
                }
            }
            return !0;
        }
        hasInSelectScope(t) {
            for (let n = this.stackTop; n >= 0; n--) {
                let r = this.tagIDs[n];
                if (
                    this.treeAdapter.getNamespaceURI(this.items[n]) === N.HTML
                ) {
                    if (r === t) return !0;
                    if (r !== a.OPTION && r !== a.OPTGROUP) return !1;
                }
            }
            return !0;
        }
        generateImpliedEndTags() {
            for (; Mo.has(this.currentTagId); ) this.pop();
        }
        generateImpliedEndTagsThoroughly() {
            for (; wo.has(this.currentTagId); ) this.pop();
        }
        generateImpliedEndTagsWithExclusion(t) {
            for (; this.currentTagId !== t && wo.has(this.currentTagId); )
                this.pop();
        }
    };
var Ve;
(function (e) {
    (e[(e.Marker = 0)] = "Marker"), (e[(e.Element = 1)] = "Element");
})((Ve = Ve || (Ve = {})));
var Bo = { type: Ve.Marker },
    Mr = class {
        constructor(t) {
            (this.treeAdapter = t), (this.entries = []), (this.bookmark = null);
        }
        _getNoahArkConditionCandidates(t, n) {
            let r = [],
                i = n.length,
                u = this.treeAdapter.getTagName(t),
                s = this.treeAdapter.getNamespaceURI(t);
            for (let o = 0; o < this.entries.length; o++) {
                let c = this.entries[o];
                if (c.type === Ve.Marker) break;
                let { element: l } = c;
                if (
                    this.treeAdapter.getTagName(l) === u &&
                    this.treeAdapter.getNamespaceURI(l) === s
                ) {
                    let f = this.treeAdapter.getAttrList(l);
                    f.length === i && r.push({ idx: o, attrs: f });
                }
            }
            return r;
        }
        _ensureNoahArkCondition(t) {
            if (this.entries.length < 3) return;
            let n = this.treeAdapter.getAttrList(t),
                r = this._getNoahArkConditionCandidates(t, n);
            if (r.length < 3) return;
            let i = new Map(n.map((s) => [s.name, s.value])),
                u = 0;
            for (let s = 0; s < r.length; s++) {
                let o = r[s];
                o.attrs.every((c) => i.get(c.name) === c.value) &&
                    ((u += 1), u >= 3 && this.entries.splice(o.idx, 1));
            }
        }
        insertMarker() {
            this.entries.unshift(Bo);
        }
        pushElement(t, n) {
            this._ensureNoahArkCondition(t),
                this.entries.unshift({
                    type: Ve.Element,
                    element: t,
                    token: n,
                });
        }
        insertElementAfterBookmark(t, n) {
            let r = this.entries.indexOf(this.bookmark);
            this.entries.splice(r, 0, {
                type: Ve.Element,
                element: t,
                token: n,
            });
        }
        removeEntry(t) {
            let n = this.entries.indexOf(t);
            n >= 0 && this.entries.splice(n, 1);
        }
        clearToLastMarker() {
            let t = this.entries.indexOf(Bo);
            t >= 0 ? this.entries.splice(0, t + 1) : (this.entries.length = 0);
        }
        getElementEntryInScopeWithTagName(t) {
            let n = this.entries.find(
                (r) =>
                    r.type === Ve.Marker ||
                    this.treeAdapter.getTagName(r.element) === t
            );
            return n && n.type === Ve.Element ? n : null;
        }
        getElementEntry(t) {
            return this.entries.find(
                (n) => n.type === Ve.Element && n.element === t
            );
        }
    };
function Fo(e) {
    return { nodeName: "#text", value: e, parentNode: null };
}
var mt = {
    createDocument() {
        return { nodeName: "#document", mode: Te.NO_QUIRKS, childNodes: [] };
    },
    createDocumentFragment() {
        return { nodeName: "#document-fragment", childNodes: [] };
    },
    createElement(e, t, n) {
        return {
            nodeName: e,
            tagName: e,
            attrs: n,
            namespaceURI: t,
            childNodes: [],
            parentNode: null,
        };
    },
    createCommentNode(e) {
        return { nodeName: "#comment", data: e, parentNode: null };
    },
    appendChild(e, t) {
        e.childNodes.push(t), (t.parentNode = e);
    },
    insertBefore(e, t, n) {
        let r = e.childNodes.indexOf(n);
        e.childNodes.splice(r, 0, t), (t.parentNode = e);
    },
    setTemplateContent(e, t) {
        e.content = t;
    },
    getTemplateContent(e) {
        return e.content;
    },
    setDocumentType(e, t, n, r) {
        let i = e.childNodes.find((u) => u.nodeName === "#documentType");
        if (i) (i.name = t), (i.publicId = n), (i.systemId = r);
        else {
            let u = {
                nodeName: "#documentType",
                name: t,
                publicId: n,
                systemId: r,
                parentNode: null,
            };
            mt.appendChild(e, u);
        }
    },
    setDocumentMode(e, t) {
        e.mode = t;
    },
    getDocumentMode(e) {
        return e.mode;
    },
    detachNode(e) {
        if (e.parentNode) {
            let t = e.parentNode.childNodes.indexOf(e);
            e.parentNode.childNodes.splice(t, 1), (e.parentNode = null);
        }
    },
    insertText(e, t) {
        if (e.childNodes.length > 0) {
            let n = e.childNodes[e.childNodes.length - 1];
            if (mt.isTextNode(n)) {
                n.value += t;
                return;
            }
        }
        mt.appendChild(e, Fo(t));
    },
    insertTextBefore(e, t, n) {
        let r = e.childNodes[e.childNodes.indexOf(n) - 1];
        r && mt.isTextNode(r) ? (r.value += t) : mt.insertBefore(e, Fo(t), n);
    },
    adoptAttributes(e, t) {
        let n = new Set(e.attrs.map((r) => r.name));
        for (let r = 0; r < t.length; r++)
            n.has(t[r].name) || e.attrs.push(t[r]);
    },
    getFirstChild(e) {
        return e.childNodes[0];
    },
    getChildNodes(e) {
        return e.childNodes;
    },
    getParentNode(e) {
        return e.parentNode;
    },
    getAttrList(e) {
        return e.attrs;
    },
    getTagName(e) {
        return e.tagName;
    },
    getNamespaceURI(e) {
        return e.namespaceURI;
    },
    getTextNodeContent(e) {
        return e.value;
    },
    getCommentNodeContent(e) {
        return e.data;
    },
    getDocumentTypeNodeName(e) {
        return e.name;
    },
    getDocumentTypeNodePublicId(e) {
        return e.publicId;
    },
    getDocumentTypeNodeSystemId(e) {
        return e.systemId;
    },
    isTextNode(e) {
        return e.nodeName === "#text";
    },
    isCommentNode(e) {
        return e.nodeName === "#comment";
    },
    isDocumentTypeNode(e) {
        return e.nodeName === "#documentType";
    },
    isElementNode(e) {
        return Object.prototype.hasOwnProperty.call(e, "tagName");
    },
    setNodeSourceCodeLocation(e, t) {
        e.sourceCodeLocation = t;
    },
    getNodeSourceCodeLocation(e) {
        return e.sourceCodeLocation;
    },
    updateNodeSourceCodeLocation(e, t) {
        e.sourceCodeLocation = { ...e.sourceCodeLocation, ...t };
    },
};
var Uo = "html",
    yd = "about:legacy-compat",
    Dd = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
    vo = [
        "+//silmaril//dtd html pro v0r11 19970101//",
        "-//as//dtd html 3.0 aswedit + extensions//",
        "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
        "-//ietf//dtd html 2.0 level 1//",
        "-//ietf//dtd html 2.0 level 2//",
        "-//ietf//dtd html 2.0 strict level 1//",
        "-//ietf//dtd html 2.0 strict level 2//",
        "-//ietf//dtd html 2.0 strict//",
        "-//ietf//dtd html 2.0//",
        "-//ietf//dtd html 2.1e//",
        "-//ietf//dtd html 3.0//",
        "-//ietf//dtd html 3.2 final//",
        "-//ietf//dtd html 3.2//",
        "-//ietf//dtd html 3//",
        "-//ietf//dtd html level 0//",
        "-//ietf//dtd html level 1//",
        "-//ietf//dtd html level 2//",
        "-//ietf//dtd html level 3//",
        "-//ietf//dtd html strict level 0//",
        "-//ietf//dtd html strict level 1//",
        "-//ietf//dtd html strict level 2//",
        "-//ietf//dtd html strict level 3//",
        "-//ietf//dtd html strict//",
        "-//ietf//dtd html//",
        "-//metrius//dtd metrius presentational//",
        "-//microsoft//dtd internet explorer 2.0 html strict//",
        "-//microsoft//dtd internet explorer 2.0 html//",
        "-//microsoft//dtd internet explorer 2.0 tables//",
        "-//microsoft//dtd internet explorer 3.0 html strict//",
        "-//microsoft//dtd internet explorer 3.0 html//",
        "-//microsoft//dtd internet explorer 3.0 tables//",
        "-//netscape comm. corp.//dtd html//",
        "-//netscape comm. corp.//dtd strict html//",
        "-//o'reilly and associates//dtd html 2.0//",
        "-//o'reilly and associates//dtd html extended 1.0//",
        "-//o'reilly and associates//dtd html extended relaxed 1.0//",
        "-//sq//dtd html 2.0 hotmetal + extensions//",
        "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
        "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
        "-//spyglass//dtd html 2.0 extended//",
        "-//sun microsystems corp.//dtd hotjava html//",
        "-//sun microsystems corp.//dtd hotjava strict html//",
        "-//w3c//dtd html 3 1995-03-24//",
        "-//w3c//dtd html 3.2 draft//",
        "-//w3c//dtd html 3.2 final//",
        "-//w3c//dtd html 3.2//",
        "-//w3c//dtd html 3.2s draft//",
        "-//w3c//dtd html 4.0 frameset//",
        "-//w3c//dtd html 4.0 transitional//",
        "-//w3c//dtd html experimental 19960712//",
        "-//w3c//dtd html experimental 970421//",
        "-//w3c//dtd w3 html//",
        "-//w3o//dtd w3 html 3.0//",
        "-//webtechs//dtd mozilla html 2.0//",
        "-//webtechs//dtd mozilla html//",
    ],
    Pd = [
        ...vo,
        "-//w3c//dtd html 4.01 frameset//",
        "-//w3c//dtd html 4.01 transitional//",
    ],
    wd = new Set([
        "-//w3o//dtd w3 html strict 3.0//en//",
        "-/w3c/dtd html 4.0 transitional/en",
        "html",
    ]),
    Yo = [
        "-//w3c//dtd xhtml 1.0 frameset//",
        "-//w3c//dtd xhtml 1.0 transitional//",
    ],
    Md = [
        ...Yo,
        "-//w3c//dtd html 4.01 frameset//",
        "-//w3c//dtd html 4.01 transitional//",
    ];
function Ho(e, t) {
    return t.some((n) => e.startsWith(n));
}
function zo(e) {
    return (
        e.name === Uo &&
        e.publicId === null &&
        (e.systemId === null || e.systemId === yd)
    );
}
function qo(e) {
    if (e.name !== Uo) return Te.QUIRKS;
    let { systemId: t } = e;
    if (t && t.toLowerCase() === Dd) return Te.QUIRKS;
    let { publicId: n } = e;
    if (n !== null) {
        if (((n = n.toLowerCase()), wd.has(n))) return Te.QUIRKS;
        let r = t === null ? Pd : vo;
        if (Ho(n, r)) return Te.QUIRKS;
        if (((r = t === null ? Yo : Md), Ho(n, r))) return Te.LIMITED_QUIRKS;
    }
    return Te.NO_QUIRKS;
}
var Vo = { TEXT_HTML: "text/html", APPLICATION_XML: "application/xhtml+xml" },
    Fd = "definitionurl",
    Hd = "definitionURL",
    Ud = new Map(
        [
            "attributeName",
            "attributeType",
            "baseFrequency",
            "baseProfile",
            "calcMode",
            "clipPathUnits",
            "diffuseConstant",
            "edgeMode",
            "filterUnits",
            "glyphRef",
            "gradientTransform",
            "gradientUnits",
            "kernelMatrix",
            "kernelUnitLength",
            "keyPoints",
            "keySplines",
            "keyTimes",
            "lengthAdjust",
            "limitingConeAngle",
            "markerHeight",
            "markerUnits",
            "markerWidth",
            "maskContentUnits",
            "maskUnits",
            "numOctaves",
            "pathLength",
            "patternContentUnits",
            "patternTransform",
            "patternUnits",
            "pointsAtX",
            "pointsAtY",
            "pointsAtZ",
            "preserveAlpha",
            "preserveAspectRatio",
            "primitiveUnits",
            "refX",
            "refY",
            "repeatCount",
            "repeatDur",
            "requiredExtensions",
            "requiredFeatures",
            "specularConstant",
            "specularExponent",
            "spreadMethod",
            "startOffset",
            "stdDeviation",
            "stitchTiles",
            "surfaceScale",
            "systemLanguage",
            "tableValues",
            "targetX",
            "targetY",
            "textLength",
            "viewBox",
            "viewTarget",
            "xChannelSelector",
            "yChannelSelector",
            "zoomAndPan",
        ].map((e) => [e.toLowerCase(), e])
    ),
    vd = new Map([
        [
            "xlink:actuate",
            { prefix: "xlink", name: "actuate", namespace: N.XLINK },
        ],
        [
            "xlink:arcrole",
            { prefix: "xlink", name: "arcrole", namespace: N.XLINK },
        ],
        ["xlink:href", { prefix: "xlink", name: "href", namespace: N.XLINK }],
        ["xlink:role", { prefix: "xlink", name: "role", namespace: N.XLINK }],
        ["xlink:show", { prefix: "xlink", name: "show", namespace: N.XLINK }],
        ["xlink:title", { prefix: "xlink", name: "title", namespace: N.XLINK }],
        ["xlink:type", { prefix: "xlink", name: "type", namespace: N.XLINK }],
        ["xml:base", { prefix: "xml", name: "base", namespace: N.XML }],
        ["xml:lang", { prefix: "xml", name: "lang", namespace: N.XML }],
        ["xml:space", { prefix: "xml", name: "space", namespace: N.XML }],
        ["xmlns", { prefix: "", name: "xmlns", namespace: N.XMLNS }],
        ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: N.XMLNS }],
    ]),
    Yd = new Map(
        [
            "altGlyph",
            "altGlyphDef",
            "altGlyphItem",
            "animateColor",
            "animateMotion",
            "animateTransform",
            "clipPath",
            "feBlend",
            "feColorMatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDistantLight",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feImage",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
            "foreignObject",
            "glyphRef",
            "linearGradient",
            "radialGradient",
            "textPath",
        ].map((e) => [e.toLowerCase(), e])
    ),
    zd = new Set([
        a.B,
        a.BIG,
        a.BLOCKQUOTE,
        a.BODY,
        a.BR,
        a.CENTER,
        a.CODE,
        a.DD,
        a.DIV,
        a.DL,
        a.DT,
        a.EM,
        a.EMBED,
        a.H1,
        a.H2,
        a.H3,
        a.H4,
        a.H5,
        a.H6,
        a.HEAD,
        a.HR,
        a.I,
        a.IMG,
        a.LI,
        a.LISTING,
        a.MENU,
        a.META,
        a.NOBR,
        a.OL,
        a.P,
        a.PRE,
        a.RUBY,
        a.S,
        a.SMALL,
        a.SPAN,
        a.STRONG,
        a.STRIKE,
        a.SUB,
        a.SUP,
        a.TABLE,
        a.TT,
        a.U,
        a.UL,
        a.VAR,
    ]);
function Wo(e) {
    let t = e.tagID;
    return (
        (t === a.FONT &&
            e.attrs.some(
                ({ name: r }) =>
                    r === $e.COLOR || r === $e.SIZE || r === $e.FACE
            )) ||
        zd.has(t)
    );
}
function Bu(e) {
    for (let t = 0; t < e.attrs.length; t++)
        if (e.attrs[t].name === Fd) {
            e.attrs[t].name = Hd;
            break;
        }
}
function Fu(e) {
    for (let t = 0; t < e.attrs.length; t++) {
        let n = Ud.get(e.attrs[t].name);
        n != null && (e.attrs[t].name = n);
    }
}
function Br(e) {
    for (let t = 0; t < e.attrs.length; t++) {
        let n = vd.get(e.attrs[t].name);
        n &&
            ((e.attrs[t].prefix = n.prefix),
            (e.attrs[t].name = n.name),
            (e.attrs[t].namespace = n.namespace));
    }
}
function Qo(e) {
    let t = Yd.get(e.tagName);
    t != null && ((e.tagName = t), (e.tagID = Nt(e.tagName)));
}
function qd(e, t) {
    return (
        t === N.MATHML &&
        (e === a.MI || e === a.MO || e === a.MN || e === a.MS || e === a.MTEXT)
    );
}
function Vd(e, t, n) {
    if (t === N.MATHML && e === a.ANNOTATION_XML) {
        for (let r = 0; r < n.length; r++)
            if (n[r].name === $e.ENCODING) {
                let i = n[r].value.toLowerCase();
                return i === Vo.TEXT_HTML || i === Vo.APPLICATION_XML;
            }
    }
    return (
        t === N.SVG && (e === a.FOREIGN_OBJECT || e === a.DESC || e === a.TITLE)
    );
}
function Go(e, t, n, r) {
    return (
        ((!r || r === N.HTML) && Vd(e, t, n)) ||
        ((!r || r === N.MATHML) && qd(e, t))
    );
}
var Wd = "hidden",
    Qd = 8,
    Gd = 3,
    E;
(function (e) {
    (e[(e.INITIAL = 0)] = "INITIAL"),
        (e[(e.BEFORE_HTML = 1)] = "BEFORE_HTML"),
        (e[(e.BEFORE_HEAD = 2)] = "BEFORE_HEAD"),
        (e[(e.IN_HEAD = 3)] = "IN_HEAD"),
        (e[(e.IN_HEAD_NO_SCRIPT = 4)] = "IN_HEAD_NO_SCRIPT"),
        (e[(e.AFTER_HEAD = 5)] = "AFTER_HEAD"),
        (e[(e.IN_BODY = 6)] = "IN_BODY"),
        (e[(e.TEXT = 7)] = "TEXT"),
        (e[(e.IN_TABLE = 8)] = "IN_TABLE"),
        (e[(e.IN_TABLE_TEXT = 9)] = "IN_TABLE_TEXT"),
        (e[(e.IN_CAPTION = 10)] = "IN_CAPTION"),
        (e[(e.IN_COLUMN_GROUP = 11)] = "IN_COLUMN_GROUP"),
        (e[(e.IN_TABLE_BODY = 12)] = "IN_TABLE_BODY"),
        (e[(e.IN_ROW = 13)] = "IN_ROW"),
        (e[(e.IN_CELL = 14)] = "IN_CELL"),
        (e[(e.IN_SELECT = 15)] = "IN_SELECT"),
        (e[(e.IN_SELECT_IN_TABLE = 16)] = "IN_SELECT_IN_TABLE"),
        (e[(e.IN_TEMPLATE = 17)] = "IN_TEMPLATE"),
        (e[(e.AFTER_BODY = 18)] = "AFTER_BODY"),
        (e[(e.IN_FRAMESET = 19)] = "IN_FRAMESET"),
        (e[(e.AFTER_FRAMESET = 20)] = "AFTER_FRAMESET"),
        (e[(e.AFTER_AFTER_BODY = 21)] = "AFTER_AFTER_BODY"),
        (e[(e.AFTER_AFTER_FRAMESET = 22)] = "AFTER_AFTER_FRAMESET");
})(E || (E = {}));
var Xd = {
        startLine: -1,
        startCol: -1,
        startOffset: -1,
        endLine: -1,
        endCol: -1,
        endOffset: -1,
    },
    Jo = new Set([a.TABLE, a.TBODY, a.TFOOT, a.THEAD, a.TR]),
    jo = {
        scriptingEnabled: !0,
        sourceCodeLocationInfo: !1,
        treeAdapter: mt,
        onParseError: null,
    },
    vt = class {
        constructor(t, n, r = null, i = null) {
            (this.fragmentContext = r),
                (this.scriptHandler = i),
                (this.currentToken = null),
                (this.stopped = !1),
                (this.insertionMode = E.INITIAL),
                (this.originalInsertionMode = E.INITIAL),
                (this.headElement = null),
                (this.formElement = null),
                (this.currentNotInHTML = !1),
                (this.tmplInsertionModeStack = []),
                (this.pendingCharacterTokens = []),
                (this.hasNonWhitespacePendingCharacterToken = !1),
                (this.framesetOk = !0),
                (this.skipNextNewLine = !1),
                (this.fosterParentingEnabled = !1),
                (this.options = { ...jo, ...t }),
                (this.treeAdapter = this.options.treeAdapter),
                (this.onParseError = this.options.onParseError),
                this.onParseError && (this.options.sourceCodeLocationInfo = !0),
                (this.document = n ?? this.treeAdapter.createDocument()),
                (this.tokenizer = new Dn(this.options, this)),
                (this.activeFormattingElements = new Mr(this.treeAdapter)),
                (this.fragmentContextID = r
                    ? Nt(this.treeAdapter.getTagName(r))
                    : a.UNKNOWN),
                this._setContextModes(
                    r ?? this.document,
                    this.fragmentContextID
                ),
                (this.openElements = new wr(
                    this.document,
                    this.treeAdapter,
                    this
                ));
        }
        static parse(t, n) {
            let r = new this(n);
            return r.tokenizer.write(t, !0), r.document;
        }
        static getFragmentParser(t, n) {
            let r = { ...jo, ...n };
            t ?? (t = r.treeAdapter.createElement(A.TEMPLATE, N.HTML, []));
            let i = r.treeAdapter.createElement("documentmock", N.HTML, []),
                u = new this(r, i, t);
            return (
                u.fragmentContextID === a.TEMPLATE &&
                    u.tmplInsertionModeStack.unshift(E.IN_TEMPLATE),
                u._initTokenizerForFragmentParsing(),
                u._insertFakeRootElement(),
                u._resetInsertionMode(),
                u._findFormInFragmentContext(),
                u
            );
        }
        getFragment() {
            let t = this.treeAdapter.getFirstChild(this.document),
                n = this.treeAdapter.createDocumentFragment();
            return this._adoptNodes(t, n), n;
        }
        _err(t, n, r) {
            var i;
            if (!this.onParseError) return;
            let u = (i = t.location) !== null && i !== void 0 ? i : Xd,
                s = {
                    code: n,
                    startLine: u.startLine,
                    startCol: u.startCol,
                    startOffset: u.startOffset,
                    endLine: r ? u.startLine : u.endLine,
                    endCol: r ? u.startCol : u.endCol,
                    endOffset: r ? u.startOffset : u.endOffset,
                };
            this.onParseError(s);
        }
        onItemPush(t, n, r) {
            var i, u;
            (u = (i = this.treeAdapter).onItemPush) === null ||
                u === void 0 ||
                u.call(i, t),
                r &&
                    this.openElements.stackTop > 0 &&
                    this._setContextModes(t, n);
        }
        onItemPop(t, n) {
            var r, i;
            if (
                (this.options.sourceCodeLocationInfo &&
                    this._setEndLocation(t, this.currentToken),
                (i = (r = this.treeAdapter).onItemPop) === null ||
                    i === void 0 ||
                    i.call(r, t, this.openElements.current),
                n)
            ) {
                let u, s;
                this.openElements.stackTop === 0 && this.fragmentContext
                    ? ((u = this.fragmentContext), (s = this.fragmentContextID))
                    : ({ current: u, currentTagId: s } = this.openElements),
                    this._setContextModes(u, s);
            }
        }
        _setContextModes(t, n) {
            let r =
                t === this.document ||
                this.treeAdapter.getNamespaceURI(t) === N.HTML;
            (this.currentNotInHTML = !r),
                (this.tokenizer.inForeignNode =
                    !r && !this._isIntegrationPoint(n, t));
        }
        _switchToTextParsing(t, n) {
            this._insertElement(t, N.HTML),
                (this.tokenizer.state = n),
                (this.originalInsertionMode = this.insertionMode),
                (this.insertionMode = E.TEXT);
        }
        switchToPlaintextParsing() {
            (this.insertionMode = E.TEXT),
                (this.originalInsertionMode = E.IN_BODY),
                (this.tokenizer.state = ue.PLAINTEXT);
        }
        _getAdjustedCurrentElement() {
            return this.openElements.stackTop === 0 && this.fragmentContext
                ? this.fragmentContext
                : this.openElements.current;
        }
        _findFormInFragmentContext() {
            let t = this.fragmentContext;
            for (; t; ) {
                if (this.treeAdapter.getTagName(t) === A.FORM) {
                    this.formElement = t;
                    break;
                }
                t = this.treeAdapter.getParentNode(t);
            }
        }
        _initTokenizerForFragmentParsing() {
            if (
                !(
                    !this.fragmentContext ||
                    this.treeAdapter.getNamespaceURI(this.fragmentContext) !==
                        N.HTML
                )
            )
                switch (this.fragmentContextID) {
                    case a.TITLE:
                    case a.TEXTAREA: {
                        this.tokenizer.state = ue.RCDATA;
                        break;
                    }
                    case a.STYLE:
                    case a.XMP:
                    case a.IFRAME:
                    case a.NOEMBED:
                    case a.NOFRAMES:
                    case a.NOSCRIPT: {
                        this.tokenizer.state = ue.RAWTEXT;
                        break;
                    }
                    case a.SCRIPT: {
                        this.tokenizer.state = ue.SCRIPT_DATA;
                        break;
                    }
                    case a.PLAINTEXT: {
                        this.tokenizer.state = ue.PLAINTEXT;
                        break;
                    }
                    default:
                }
        }
        _setDocumentType(t) {
            let n = t.name || "",
                r = t.publicId || "",
                i = t.systemId || "";
            if (
                (this.treeAdapter.setDocumentType(this.document, n, r, i),
                t.location)
            ) {
                let s = this.treeAdapter
                    .getChildNodes(this.document)
                    .find((o) => this.treeAdapter.isDocumentTypeNode(o));
                s && this.treeAdapter.setNodeSourceCodeLocation(s, t.location);
            }
        }
        _attachElementToTree(t, n) {
            if (this.options.sourceCodeLocationInfo) {
                let r = n && { ...n, startTag: n };
                this.treeAdapter.setNodeSourceCodeLocation(t, r);
            }
            if (this._shouldFosterParentOnInsertion())
                this._fosterParentElement(t);
            else {
                let r = this.openElements.currentTmplContentOrNode;
                this.treeAdapter.appendChild(r, t);
            }
        }
        _appendElement(t, n) {
            let r = this.treeAdapter.createElement(t.tagName, n, t.attrs);
            this._attachElementToTree(r, t.location);
        }
        _insertElement(t, n) {
            let r = this.treeAdapter.createElement(t.tagName, n, t.attrs);
            this._attachElementToTree(r, t.location),
                this.openElements.push(r, t.tagID);
        }
        _insertFakeElement(t, n) {
            let r = this.treeAdapter.createElement(t, N.HTML, []);
            this._attachElementToTree(r, null), this.openElements.push(r, n);
        }
        _insertTemplate(t) {
            let n = this.treeAdapter.createElement(t.tagName, N.HTML, t.attrs),
                r = this.treeAdapter.createDocumentFragment();
            this.treeAdapter.setTemplateContent(n, r),
                this._attachElementToTree(n, t.location),
                this.openElements.push(n, t.tagID),
                this.options.sourceCodeLocationInfo &&
                    this.treeAdapter.setNodeSourceCodeLocation(r, null);
        }
        _insertFakeRootElement() {
            let t = this.treeAdapter.createElement(A.HTML, N.HTML, []);
            this.options.sourceCodeLocationInfo &&
                this.treeAdapter.setNodeSourceCodeLocation(t, null),
                this.treeAdapter.appendChild(this.openElements.current, t),
                this.openElements.push(t, a.HTML);
        }
        _appendCommentNode(t, n) {
            let r = this.treeAdapter.createCommentNode(t.data);
            this.treeAdapter.appendChild(n, r),
                this.options.sourceCodeLocationInfo &&
                    this.treeAdapter.setNodeSourceCodeLocation(r, t.location);
        }
        _insertCharacters(t) {
            let n, r;
            if (
                (this._shouldFosterParentOnInsertion()
                    ? (({ parent: n, beforeElement: r } =
                          this._findFosterParentingLocation()),
                      r
                          ? this.treeAdapter.insertTextBefore(n, t.chars, r)
                          : this.treeAdapter.insertText(n, t.chars))
                    : ((n = this.openElements.currentTmplContentOrNode),
                      this.treeAdapter.insertText(n, t.chars)),
                !t.location)
            )
                return;
            let i = this.treeAdapter.getChildNodes(n),
                u = r ? i.lastIndexOf(r) : i.length,
                s = i[u - 1];
            if (this.treeAdapter.getNodeSourceCodeLocation(s)) {
                let { endLine: c, endCol: l, endOffset: f } = t.location;
                this.treeAdapter.updateNodeSourceCodeLocation(s, {
                    endLine: c,
                    endCol: l,
                    endOffset: f,
                });
            } else
                this.options.sourceCodeLocationInfo &&
                    this.treeAdapter.setNodeSourceCodeLocation(s, t.location);
        }
        _adoptNodes(t, n) {
            for (
                let r = this.treeAdapter.getFirstChild(t);
                r;
                r = this.treeAdapter.getFirstChild(t)
            )
                this.treeAdapter.detachNode(r),
                    this.treeAdapter.appendChild(n, r);
        }
        _setEndLocation(t, n) {
            if (this.treeAdapter.getNodeSourceCodeLocation(t) && n.location) {
                let r = n.location,
                    i = this.treeAdapter.getTagName(t),
                    u =
                        n.type === $.END_TAG && i === n.tagName
                            ? {
                                  endTag: { ...r },
                                  endLine: r.endLine,
                                  endCol: r.endCol,
                                  endOffset: r.endOffset,
                              }
                            : {
                                  endLine: r.startLine,
                                  endCol: r.startCol,
                                  endOffset: r.startOffset,
                              };
                this.treeAdapter.updateNodeSourceCodeLocation(t, u);
            }
        }
        shouldProcessStartTagTokenInForeignContent(t) {
            if (!this.currentNotInHTML) return !1;
            let n, r;
            return (
                this.openElements.stackTop === 0 && this.fragmentContext
                    ? ((n = this.fragmentContext), (r = this.fragmentContextID))
                    : ({ current: n, currentTagId: r } = this.openElements),
                t.tagID === a.SVG &&
                this.treeAdapter.getTagName(n) === A.ANNOTATION_XML &&
                this.treeAdapter.getNamespaceURI(n) === N.MATHML
                    ? !1
                    : this.tokenizer.inForeignNode ||
                      ((t.tagID === a.MGLYPH || t.tagID === a.MALIGNMARK) &&
                          !this._isIntegrationPoint(r, n, N.HTML))
            );
        }
        _processToken(t) {
            switch (t.type) {
                case $.CHARACTER: {
                    this.onCharacter(t);
                    break;
                }
                case $.NULL_CHARACTER: {
                    this.onNullCharacter(t);
                    break;
                }
                case $.COMMENT: {
                    this.onComment(t);
                    break;
                }
                case $.DOCTYPE: {
                    this.onDoctype(t);
                    break;
                }
                case $.START_TAG: {
                    this._processStartTag(t);
                    break;
                }
                case $.END_TAG: {
                    this.onEndTag(t);
                    break;
                }
                case $.EOF: {
                    this.onEof(t);
                    break;
                }
                case $.WHITESPACE_CHARACTER: {
                    this.onWhitespaceCharacter(t);
                    break;
                }
            }
        }
        _isIntegrationPoint(t, n, r) {
            let i = this.treeAdapter.getNamespaceURI(n),
                u = this.treeAdapter.getAttrList(n);
            return Go(t, i, u, r);
        }
        _reconstructActiveFormattingElements() {
            let t = this.activeFormattingElements.entries.length;
            if (t) {
                let n = this.activeFormattingElements.entries.findIndex(
                        (i) =>
                            i.type === Ve.Marker ||
                            this.openElements.contains(i.element)
                    ),
                    r = n < 0 ? t - 1 : n - 1;
                for (let i = r; i >= 0; i--) {
                    let u = this.activeFormattingElements.entries[i];
                    this._insertElement(
                        u.token,
                        this.treeAdapter.getNamespaceURI(u.element)
                    ),
                        (u.element = this.openElements.current);
                }
            }
        }
        _closeTableCell() {
            this.openElements.generateImpliedEndTags(),
                this.openElements.popUntilTableCellPopped(),
                this.activeFormattingElements.clearToLastMarker(),
                (this.insertionMode = E.IN_ROW);
        }
        _closePElement() {
            this.openElements.generateImpliedEndTagsWithExclusion(a.P),
                this.openElements.popUntilTagNamePopped(a.P);
        }
        _resetInsertionMode() {
            for (let t = this.openElements.stackTop; t >= 0; t--)
                switch (
                    t === 0 && this.fragmentContext
                        ? this.fragmentContextID
                        : this.openElements.tagIDs[t]
                ) {
                    case a.TR: {
                        this.insertionMode = E.IN_ROW;
                        return;
                    }
                    case a.TBODY:
                    case a.THEAD:
                    case a.TFOOT: {
                        this.insertionMode = E.IN_TABLE_BODY;
                        return;
                    }
                    case a.CAPTION: {
                        this.insertionMode = E.IN_CAPTION;
                        return;
                    }
                    case a.COLGROUP: {
                        this.insertionMode = E.IN_COLUMN_GROUP;
                        return;
                    }
                    case a.TABLE: {
                        this.insertionMode = E.IN_TABLE;
                        return;
                    }
                    case a.BODY: {
                        this.insertionMode = E.IN_BODY;
                        return;
                    }
                    case a.FRAMESET: {
                        this.insertionMode = E.IN_FRAMESET;
                        return;
                    }
                    case a.SELECT: {
                        this._resetInsertionModeForSelect(t);
                        return;
                    }
                    case a.TEMPLATE: {
                        this.insertionMode = this.tmplInsertionModeStack[0];
                        return;
                    }
                    case a.HTML: {
                        this.insertionMode = this.headElement
                            ? E.AFTER_HEAD
                            : E.BEFORE_HEAD;
                        return;
                    }
                    case a.TD:
                    case a.TH: {
                        if (t > 0) {
                            this.insertionMode = E.IN_CELL;
                            return;
                        }
                        break;
                    }
                    case a.HEAD: {
                        if (t > 0) {
                            this.insertionMode = E.IN_HEAD;
                            return;
                        }
                        break;
                    }
                }
            this.insertionMode = E.IN_BODY;
        }
        _resetInsertionModeForSelect(t) {
            if (t > 0)
                for (let n = t - 1; n > 0; n--) {
                    let r = this.openElements.tagIDs[n];
                    if (r === a.TEMPLATE) break;
                    if (r === a.TABLE) {
                        this.insertionMode = E.IN_SELECT_IN_TABLE;
                        return;
                    }
                }
            this.insertionMode = E.IN_SELECT;
        }
        _isElementCausesFosterParenting(t) {
            return Jo.has(t);
        }
        _shouldFosterParentOnInsertion() {
            return (
                this.fosterParentingEnabled &&
                this._isElementCausesFosterParenting(
                    this.openElements.currentTagId
                )
            );
        }
        _findFosterParentingLocation() {
            for (let t = this.openElements.stackTop; t >= 0; t--) {
                let n = this.openElements.items[t];
                switch (this.openElements.tagIDs[t]) {
                    case a.TEMPLATE: {
                        if (this.treeAdapter.getNamespaceURI(n) === N.HTML)
                            return {
                                parent: this.treeAdapter.getTemplateContent(n),
                                beforeElement: null,
                            };
                        break;
                    }
                    case a.TABLE: {
                        let r = this.treeAdapter.getParentNode(n);
                        return r
                            ? { parent: r, beforeElement: n }
                            : {
                                  parent: this.openElements.items[t - 1],
                                  beforeElement: null,
                              };
                    }
                    default:
                }
            }
            return { parent: this.openElements.items[0], beforeElement: null };
        }
        _fosterParentElement(t) {
            let n = this._findFosterParentingLocation();
            n.beforeElement
                ? this.treeAdapter.insertBefore(n.parent, t, n.beforeElement)
                : this.treeAdapter.appendChild(n.parent, t);
        }
        _isSpecialElement(t, n) {
            let r = this.treeAdapter.getNamespaceURI(t);
            return wu[r].has(n);
        }
        onCharacter(t) {
            if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
                Im(this, t);
                return;
            }
            switch (this.insertionMode) {
                case E.INITIAL: {
                    Pn(this, t);
                    break;
                }
                case E.BEFORE_HTML: {
                    Mn(this, t);
                    break;
                }
                case E.BEFORE_HEAD: {
                    Bn(this, t);
                    break;
                }
                case E.IN_HEAD: {
                    Fn(this, t);
                    break;
                }
                case E.IN_HEAD_NO_SCRIPT: {
                    Hn(this, t);
                    break;
                }
                case E.AFTER_HEAD: {
                    Un(this, t);
                    break;
                }
                case E.IN_BODY:
                case E.IN_CAPTION:
                case E.IN_CELL:
                case E.IN_TEMPLATE: {
                    ec(this, t);
                    break;
                }
                case E.TEXT:
                case E.IN_SELECT:
                case E.IN_SELECT_IN_TABLE: {
                    this._insertCharacters(t);
                    break;
                }
                case E.IN_TABLE:
                case E.IN_TABLE_BODY:
                case E.IN_ROW: {
                    Hu(this, t);
                    break;
                }
                case E.IN_TABLE_TEXT: {
                    ac(this, t);
                    break;
                }
                case E.IN_COLUMN_GROUP: {
                    Hr(this, t);
                    break;
                }
                case E.AFTER_BODY: {
                    Ur(this, t);
                    break;
                }
                case E.AFTER_AFTER_BODY: {
                    Fr(this, t);
                    break;
                }
                default:
            }
        }
        onNullCharacter(t) {
            if (((this.skipNextNewLine = !1), this.tokenizer.inForeignNode)) {
                Cm(this, t);
                return;
            }
            switch (this.insertionMode) {
                case E.INITIAL: {
                    Pn(this, t);
                    break;
                }
                case E.BEFORE_HTML: {
                    Mn(this, t);
                    break;
                }
                case E.BEFORE_HEAD: {
                    Bn(this, t);
                    break;
                }
                case E.IN_HEAD: {
                    Fn(this, t);
                    break;
                }
                case E.IN_HEAD_NO_SCRIPT: {
                    Hn(this, t);
                    break;
                }
                case E.AFTER_HEAD: {
                    Un(this, t);
                    break;
                }
                case E.TEXT: {
                    this._insertCharacters(t);
                    break;
                }
                case E.IN_TABLE:
                case E.IN_TABLE_BODY:
                case E.IN_ROW: {
                    Hu(this, t);
                    break;
                }
                case E.IN_COLUMN_GROUP: {
                    Hr(this, t);
                    break;
                }
                case E.AFTER_BODY: {
                    Ur(this, t);
                    break;
                }
                case E.AFTER_AFTER_BODY: {
                    Fr(this, t);
                    break;
                }
                default:
            }
        }
        onComment(t) {
            if (((this.skipNextNewLine = !1), this.currentNotInHTML)) {
                Uu(this, t);
                return;
            }
            switch (this.insertionMode) {
                case E.INITIAL:
                case E.BEFORE_HTML:
                case E.BEFORE_HEAD:
                case E.IN_HEAD:
                case E.IN_HEAD_NO_SCRIPT:
                case E.AFTER_HEAD:
                case E.IN_BODY:
                case E.IN_TABLE:
                case E.IN_CAPTION:
                case E.IN_COLUMN_GROUP:
                case E.IN_TABLE_BODY:
                case E.IN_ROW:
                case E.IN_CELL:
                case E.IN_SELECT:
                case E.IN_SELECT_IN_TABLE:
                case E.IN_TEMPLATE:
                case E.IN_FRAMESET:
                case E.AFTER_FRAMESET: {
                    Uu(this, t);
                    break;
                }
                case E.IN_TABLE_TEXT: {
                    wn(this, t);
                    break;
                }
                case E.AFTER_BODY: {
                    th(this, t);
                    break;
                }
                case E.AFTER_AFTER_BODY:
                case E.AFTER_AFTER_FRAMESET: {
                    nh(this, t);
                    break;
                }
                default:
            }
        }
        onDoctype(t) {
            switch (((this.skipNextNewLine = !1), this.insertionMode)) {
                case E.INITIAL: {
                    rh(this, t);
                    break;
                }
                case E.BEFORE_HEAD:
                case E.IN_HEAD:
                case E.IN_HEAD_NO_SCRIPT:
                case E.AFTER_HEAD: {
                    this._err(t, x.misplacedDoctype);
                    break;
                }
                case E.IN_TABLE_TEXT: {
                    wn(this, t);
                    break;
                }
                default:
            }
        }
        onStartTag(t) {
            (this.skipNextNewLine = !1),
                (this.currentToken = t),
                this._processStartTag(t),
                t.selfClosing &&
                    !t.ackSelfClosing &&
                    this._err(
                        t,
                        x.nonVoidHtmlElementStartTagWithTrailingSolidus
                    );
        }
        _processStartTag(t) {
            this.shouldProcessStartTagTokenInForeignContent(t)
                ? Nm(this, t)
                : this._startTagOutsideForeignContent(t);
        }
        _startTagOutsideForeignContent(t) {
            switch (this.insertionMode) {
                case E.INITIAL: {
                    Pn(this, t);
                    break;
                }
                case E.BEFORE_HTML: {
                    ih(this, t);
                    break;
                }
                case E.BEFORE_HEAD: {
                    ah(this, t);
                    break;
                }
                case E.IN_HEAD: {
                    Je(this, t);
                    break;
                }
                case E.IN_HEAD_NO_SCRIPT: {
                    ch(this, t);
                    break;
                }
                case E.AFTER_HEAD: {
                    fh(this, t);
                    break;
                }
                case E.IN_BODY: {
                    _e(this, t);
                    break;
                }
                case E.IN_TABLE: {
                    un(this, t);
                    break;
                }
                case E.IN_TABLE_TEXT: {
                    wn(this, t);
                    break;
                }
                case E.IN_CAPTION: {
                    sm(this, t);
                    break;
                }
                case E.IN_COLUMN_GROUP: {
                    qu(this, t);
                    break;
                }
                case E.IN_TABLE_BODY: {
                    zr(this, t);
                    break;
                }
                case E.IN_ROW: {
                    qr(this, t);
                    break;
                }
                case E.IN_CELL: {
                    lm(this, t);
                    break;
                }
                case E.IN_SELECT: {
                    cc(this, t);
                    break;
                }
                case E.IN_SELECT_IN_TABLE: {
                    dm(this, t);
                    break;
                }
                case E.IN_TEMPLATE: {
                    mm(this, t);
                    break;
                }
                case E.AFTER_BODY: {
                    Em(this, t);
                    break;
                }
                case E.IN_FRAMESET: {
                    Tm(this, t);
                    break;
                }
                case E.AFTER_FRAMESET: {
                    bm(this, t);
                    break;
                }
                case E.AFTER_AFTER_BODY: {
                    _m(this, t);
                    break;
                }
                case E.AFTER_AFTER_FRAMESET: {
                    xm(this, t);
                    break;
                }
                default:
            }
        }
        onEndTag(t) {
            (this.skipNextNewLine = !1),
                (this.currentToken = t),
                this.currentNotInHTML
                    ? Sm(this, t)
                    : this._endTagOutsideForeignContent(t);
        }
        _endTagOutsideForeignContent(t) {
            switch (this.insertionMode) {
                case E.INITIAL: {
                    Pn(this, t);
                    break;
                }
                case E.BEFORE_HTML: {
                    uh(this, t);
                    break;
                }
                case E.BEFORE_HEAD: {
                    sh(this, t);
                    break;
                }
                case E.IN_HEAD: {
                    oh(this, t);
                    break;
                }
                case E.IN_HEAD_NO_SCRIPT: {
                    lh(this, t);
                    break;
                }
                case E.AFTER_HEAD: {
                    dh(this, t);
                    break;
                }
                case E.IN_BODY: {
                    Yr(this, t);
                    break;
                }
                case E.TEXT: {
                    $h(this, t);
                    break;
                }
                case E.IN_TABLE: {
                    vn(this, t);
                    break;
                }
                case E.IN_TABLE_TEXT: {
                    wn(this, t);
                    break;
                }
                case E.IN_CAPTION: {
                    om(this, t);
                    break;
                }
                case E.IN_COLUMN_GROUP: {
                    cm(this, t);
                    break;
                }
                case E.IN_TABLE_BODY: {
                    vu(this, t);
                    break;
                }
                case E.IN_ROW: {
                    oc(this, t);
                    break;
                }
                case E.IN_CELL: {
                    fm(this, t);
                    break;
                }
                case E.IN_SELECT: {
                    lc(this, t);
                    break;
                }
                case E.IN_SELECT_IN_TABLE: {
                    hm(this, t);
                    break;
                }
                case E.IN_TEMPLATE: {
                    pm(this, t);
                    break;
                }
                case E.AFTER_BODY: {
                    dc(this, t);
                    break;
                }
                case E.IN_FRAMESET: {
                    gm(this, t);
                    break;
                }
                case E.AFTER_FRAMESET: {
                    Am(this, t);
                    break;
                }
                case E.AFTER_AFTER_BODY: {
                    Fr(this, t);
                    break;
                }
                default:
            }
        }
        onEof(t) {
            switch (this.insertionMode) {
                case E.INITIAL: {
                    Pn(this, t);
                    break;
                }
                case E.BEFORE_HTML: {
                    Mn(this, t);
                    break;
                }
                case E.BEFORE_HEAD: {
                    Bn(this, t);
                    break;
                }
                case E.IN_HEAD: {
                    Fn(this, t);
                    break;
                }
                case E.IN_HEAD_NO_SCRIPT: {
                    Hn(this, t);
                    break;
                }
                case E.AFTER_HEAD: {
                    Un(this, t);
                    break;
                }
                case E.IN_BODY:
                case E.IN_TABLE:
                case E.IN_CAPTION:
                case E.IN_COLUMN_GROUP:
                case E.IN_TABLE_BODY:
                case E.IN_ROW:
                case E.IN_CELL:
                case E.IN_SELECT:
                case E.IN_SELECT_IN_TABLE: {
                    ic(this, t);
                    break;
                }
                case E.TEXT: {
                    Jh(this, t);
                    break;
                }
                case E.IN_TABLE_TEXT: {
                    wn(this, t);
                    break;
                }
                case E.IN_TEMPLATE: {
                    fc(this, t);
                    break;
                }
                case E.AFTER_BODY:
                case E.IN_FRAMESET:
                case E.AFTER_FRAMESET:
                case E.AFTER_AFTER_BODY:
                case E.AFTER_AFTER_FRAMESET: {
                    zu(this, t);
                    break;
                }
                default:
            }
        }
        onWhitespaceCharacter(t) {
            if (
                this.skipNextNewLine &&
                ((this.skipNextNewLine = !1),
                t.chars.charCodeAt(0) === d.LINE_FEED)
            ) {
                if (t.chars.length === 1) return;
                t.chars = t.chars.substr(1);
            }
            if (this.tokenizer.inForeignNode) {
                this._insertCharacters(t);
                return;
            }
            switch (this.insertionMode) {
                case E.IN_HEAD:
                case E.IN_HEAD_NO_SCRIPT:
                case E.AFTER_HEAD:
                case E.TEXT:
                case E.IN_COLUMN_GROUP:
                case E.IN_SELECT:
                case E.IN_SELECT_IN_TABLE:
                case E.IN_FRAMESET:
                case E.AFTER_FRAMESET: {
                    this._insertCharacters(t);
                    break;
                }
                case E.IN_BODY:
                case E.IN_CAPTION:
                case E.IN_CELL:
                case E.IN_TEMPLATE:
                case E.AFTER_BODY:
                case E.AFTER_AFTER_BODY:
                case E.AFTER_AFTER_FRAMESET: {
                    Zo(this, t);
                    break;
                }
                case E.IN_TABLE:
                case E.IN_TABLE_BODY:
                case E.IN_ROW: {
                    Hu(this, t);
                    break;
                }
                case E.IN_TABLE_TEXT: {
                    uc(this, t);
                    break;
                }
                default:
            }
        }
    };
function jd(e, t) {
    let n = e.activeFormattingElements.getElementEntryInScopeWithTagName(
        t.tagName
    );
    return (
        n
            ? e.openElements.contains(n.element)
                ? e.openElements.hasInScope(t.tagID) || (n = null)
                : (e.activeFormattingElements.removeEntry(n), (n = null))
            : rc(e, t),
        n
    );
}
function Kd(e, t) {
    let n = null,
        r = e.openElements.stackTop;
    for (; r >= 0; r--) {
        let i = e.openElements.items[r];
        if (i === t.element) break;
        e._isSpecialElement(i, e.openElements.tagIDs[r]) && (n = i);
    }
    return (
        n ||
            (e.openElements.shortenToLength(r < 0 ? 0 : r),
            e.activeFormattingElements.removeEntry(t)),
        n
    );
}
function $d(e, t, n) {
    let r = t,
        i = e.openElements.getCommonAncestor(t);
    for (let u = 0, s = i; s !== n; u++, s = i) {
        i = e.openElements.getCommonAncestor(s);
        let o = e.activeFormattingElements.getElementEntry(s),
            c = o && u >= Gd;
        !o || c
            ? (c && e.activeFormattingElements.removeEntry(o),
              e.openElements.remove(s))
            : ((s = Jd(e, o)),
              r === t && (e.activeFormattingElements.bookmark = o),
              e.treeAdapter.detachNode(r),
              e.treeAdapter.appendChild(s, r),
              (r = s));
    }
    return r;
}
function Jd(e, t) {
    let n = e.treeAdapter.getNamespaceURI(t.element),
        r = e.treeAdapter.createElement(t.token.tagName, n, t.token.attrs);
    return e.openElements.replace(t.element, r), (t.element = r), r;
}
function Zd(e, t, n) {
    let r = e.treeAdapter.getTagName(t),
        i = Nt(r);
    if (e._isElementCausesFosterParenting(i)) e._fosterParentElement(n);
    else {
        let u = e.treeAdapter.getNamespaceURI(t);
        i === a.TEMPLATE &&
            u === N.HTML &&
            (t = e.treeAdapter.getTemplateContent(t)),
            e.treeAdapter.appendChild(t, n);
    }
}
function eh(e, t, n) {
    let r = e.treeAdapter.getNamespaceURI(n.element),
        { token: i } = n,
        u = e.treeAdapter.createElement(i.tagName, r, i.attrs);
    e._adoptNodes(t, u),
        e.treeAdapter.appendChild(t, u),
        e.activeFormattingElements.insertElementAfterBookmark(u, i),
        e.activeFormattingElements.removeEntry(n),
        e.openElements.remove(n.element),
        e.openElements.insertAfter(t, u, i.tagID);
}
function Yu(e, t) {
    for (let n = 0; n < Qd; n++) {
        let r = jd(e, t);
        if (!r) break;
        let i = Kd(e, r);
        if (!i) break;
        e.activeFormattingElements.bookmark = r;
        let u = $d(e, i, r.element),
            s = e.openElements.getCommonAncestor(r.element);
        e.treeAdapter.detachNode(u), s && Zd(e, s, u), eh(e, i, r);
    }
}
function Uu(e, t) {
    e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function th(e, t) {
    e._appendCommentNode(t, e.openElements.items[0]);
}
function nh(e, t) {
    e._appendCommentNode(t, e.document);
}
function zu(e, t) {
    if (((e.stopped = !0), t.location)) {
        let n = e.fragmentContext ? 0 : 2;
        for (let r = e.openElements.stackTop; r >= n; r--)
            e._setEndLocation(e.openElements.items[r], t);
        if (!e.fragmentContext && e.openElements.stackTop >= 0) {
            let r = e.openElements.items[0],
                i = e.treeAdapter.getNodeSourceCodeLocation(r);
            if (
                i &&
                !i.endTag &&
                (e._setEndLocation(r, t), e.openElements.stackTop >= 1)
            ) {
                let u = e.openElements.items[1],
                    s = e.treeAdapter.getNodeSourceCodeLocation(u);
                s && !s.endTag && e._setEndLocation(u, t);
            }
        }
    }
}
function rh(e, t) {
    e._setDocumentType(t);
    let n = t.forceQuirks ? Te.QUIRKS : qo(t);
    zo(t) || e._err(t, x.nonConformingDoctype),
        e.treeAdapter.setDocumentMode(e.document, n),
        (e.insertionMode = E.BEFORE_HTML);
}
function Pn(e, t) {
    e._err(t, x.missingDoctype, !0),
        e.treeAdapter.setDocumentMode(e.document, Te.QUIRKS),
        (e.insertionMode = E.BEFORE_HTML),
        e._processToken(t);
}
function ih(e, t) {
    t.tagID === a.HTML
        ? (e._insertElement(t, N.HTML), (e.insertionMode = E.BEFORE_HEAD))
        : Mn(e, t);
}
function uh(e, t) {
    let n = t.tagID;
    (n === a.HTML || n === a.HEAD || n === a.BODY || n === a.BR) && Mn(e, t);
}
function Mn(e, t) {
    e._insertFakeRootElement(),
        (e.insertionMode = E.BEFORE_HEAD),
        e._processToken(t);
}
function ah(e, t) {
    switch (t.tagID) {
        case a.HTML: {
            _e(e, t);
            break;
        }
        case a.HEAD: {
            e._insertElement(t, N.HTML),
                (e.headElement = e.openElements.current),
                (e.insertionMode = E.IN_HEAD);
            break;
        }
        default:
            Bn(e, t);
    }
}
function sh(e, t) {
    let n = t.tagID;
    n === a.HEAD || n === a.BODY || n === a.HTML || n === a.BR
        ? Bn(e, t)
        : e._err(t, x.endTagWithoutMatchingOpenElement);
}
function Bn(e, t) {
    e._insertFakeElement(A.HEAD, a.HEAD),
        (e.headElement = e.openElements.current),
        (e.insertionMode = E.IN_HEAD),
        e._processToken(t);
}
function Je(e, t) {
    switch (t.tagID) {
        case a.HTML: {
            _e(e, t);
            break;
        }
        case a.BASE:
        case a.BASEFONT:
        case a.BGSOUND:
        case a.LINK:
        case a.META: {
            e._appendElement(t, N.HTML), (t.ackSelfClosing = !0);
            break;
        }
        case a.TITLE: {
            e._switchToTextParsing(t, ue.RCDATA);
            break;
        }
        case a.NOSCRIPT: {
            e.options.scriptingEnabled
                ? e._switchToTextParsing(t, ue.RAWTEXT)
                : (e._insertElement(t, N.HTML),
                  (e.insertionMode = E.IN_HEAD_NO_SCRIPT));
            break;
        }
        case a.NOFRAMES:
        case a.STYLE: {
            e._switchToTextParsing(t, ue.RAWTEXT);
            break;
        }
        case a.SCRIPT: {
            e._switchToTextParsing(t, ue.SCRIPT_DATA);
            break;
        }
        case a.TEMPLATE: {
            e._insertTemplate(t),
                e.activeFormattingElements.insertMarker(),
                (e.framesetOk = !1),
                (e.insertionMode = E.IN_TEMPLATE),
                e.tmplInsertionModeStack.unshift(E.IN_TEMPLATE);
            break;
        }
        case a.HEAD: {
            e._err(t, x.misplacedStartTagForHeadElement);
            break;
        }
        default:
            Fn(e, t);
    }
}
function oh(e, t) {
    switch (t.tagID) {
        case a.HEAD: {
            e.openElements.pop(), (e.insertionMode = E.AFTER_HEAD);
            break;
        }
        case a.BODY:
        case a.BR:
        case a.HTML: {
            Fn(e, t);
            break;
        }
        case a.TEMPLATE: {
            Yt(e, t);
            break;
        }
        default:
            e._err(t, x.endTagWithoutMatchingOpenElement);
    }
}
function Yt(e, t) {
    e.openElements.tmplCount > 0
        ? (e.openElements.generateImpliedEndTagsThoroughly(),
          e.openElements.currentTagId !== a.TEMPLATE &&
              e._err(t, x.closingOfElementWithOpenChildElements),
          e.openElements.popUntilTagNamePopped(a.TEMPLATE),
          e.activeFormattingElements.clearToLastMarker(),
          e.tmplInsertionModeStack.shift(),
          e._resetInsertionMode())
        : e._err(t, x.endTagWithoutMatchingOpenElement);
}
function Fn(e, t) {
    e.openElements.pop(), (e.insertionMode = E.AFTER_HEAD), e._processToken(t);
}
function ch(e, t) {
    switch (t.tagID) {
        case a.HTML: {
            _e(e, t);
            break;
        }
        case a.BASEFONT:
        case a.BGSOUND:
        case a.HEAD:
        case a.LINK:
        case a.META:
        case a.NOFRAMES:
        case a.STYLE: {
            Je(e, t);
            break;
        }
        case a.NOSCRIPT: {
            e._err(t, x.nestedNoscriptInHead);
            break;
        }
        default:
            Hn(e, t);
    }
}
function lh(e, t) {
    switch (t.tagID) {
        case a.NOSCRIPT: {
            e.openElements.pop(), (e.insertionMode = E.IN_HEAD);
            break;
        }
        case a.BR: {
            Hn(e, t);
            break;
        }
        default:
            e._err(t, x.endTagWithoutMatchingOpenElement);
    }
}
function Hn(e, t) {
    let n =
        t.type === $.EOF
            ? x.openElementsLeftAfterEof
            : x.disallowedContentInNoscriptInHead;
    e._err(t, n),
        e.openElements.pop(),
        (e.insertionMode = E.IN_HEAD),
        e._processToken(t);
}
function fh(e, t) {
    switch (t.tagID) {
        case a.HTML: {
            _e(e, t);
            break;
        }
        case a.BODY: {
            e._insertElement(t, N.HTML),
                (e.framesetOk = !1),
                (e.insertionMode = E.IN_BODY);
            break;
        }
        case a.FRAMESET: {
            e._insertElement(t, N.HTML), (e.insertionMode = E.IN_FRAMESET);
            break;
        }
        case a.BASE:
        case a.BASEFONT:
        case a.BGSOUND:
        case a.LINK:
        case a.META:
        case a.NOFRAMES:
        case a.SCRIPT:
        case a.STYLE:
        case a.TEMPLATE:
        case a.TITLE: {
            e._err(t, x.abandonedHeadElementChild),
                e.openElements.push(e.headElement, a.HEAD),
                Je(e, t),
                e.openElements.remove(e.headElement);
            break;
        }
        case a.HEAD: {
            e._err(t, x.misplacedStartTagForHeadElement);
            break;
        }
        default:
            Un(e, t);
    }
}
function dh(e, t) {
    switch (t.tagID) {
        case a.BODY:
        case a.HTML:
        case a.BR: {
            Un(e, t);
            break;
        }
        case a.TEMPLATE: {
            Yt(e, t);
            break;
        }
        default:
            e._err(t, x.endTagWithoutMatchingOpenElement);
    }
}
function Un(e, t) {
    e._insertFakeElement(A.BODY, a.BODY),
        (e.insertionMode = E.IN_BODY),
        vr(e, t);
}
function vr(e, t) {
    switch (t.type) {
        case $.CHARACTER: {
            ec(e, t);
            break;
        }
        case $.WHITESPACE_CHARACTER: {
            Zo(e, t);
            break;
        }
        case $.COMMENT: {
            Uu(e, t);
            break;
        }
        case $.START_TAG: {
            _e(e, t);
            break;
        }
        case $.END_TAG: {
            Yr(e, t);
            break;
        }
        case $.EOF: {
            ic(e, t);
            break;
        }
        default:
    }
}
function Zo(e, t) {
    e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function ec(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertCharacters(t),
        (e.framesetOk = !1);
}
function hh(e, t) {
    e.openElements.tmplCount === 0 &&
        e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function mh(e, t) {
    let n = e.openElements.tryPeekProperlyNestedBodyElement();
    n &&
        e.openElements.tmplCount === 0 &&
        ((e.framesetOk = !1), e.treeAdapter.adoptAttributes(n, t.attrs));
}
function ph(e, t) {
    let n = e.openElements.tryPeekProperlyNestedBodyElement();
    e.framesetOk &&
        n &&
        (e.treeAdapter.detachNode(n),
        e.openElements.popAllUpToHtmlElement(),
        e._insertElement(t, N.HTML),
        (e.insertionMode = E.IN_FRAMESET));
}
function Eh(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(),
        e._insertElement(t, N.HTML);
}
function Th(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(),
        kn(e.openElements.currentTagId) && e.openElements.pop(),
        e._insertElement(t, N.HTML);
}
function gh(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(),
        e._insertElement(t, N.HTML),
        (e.skipNextNewLine = !0),
        (e.framesetOk = !1);
}
function bh(e, t) {
    let n = e.openElements.tmplCount > 0;
    (!e.formElement || n) &&
        (e.openElements.hasInButtonScope(a.P) && e._closePElement(),
        e._insertElement(t, N.HTML),
        n || (e.formElement = e.openElements.current));
}
function Ah(e, t) {
    e.framesetOk = !1;
    let n = t.tagID;
    for (let r = e.openElements.stackTop; r >= 0; r--) {
        let i = e.openElements.tagIDs[r];
        if (
            (n === a.LI && i === a.LI) ||
            ((n === a.DD || n === a.DT) && (i === a.DD || i === a.DT))
        ) {
            e.openElements.generateImpliedEndTagsWithExclusion(i),
                e.openElements.popUntilTagNamePopped(i);
            break;
        }
        if (
            i !== a.ADDRESS &&
            i !== a.DIV &&
            i !== a.P &&
            e._isSpecialElement(e.openElements.items[r], i)
        )
            break;
    }
    e.openElements.hasInButtonScope(a.P) && e._closePElement(),
        e._insertElement(t, N.HTML);
}
function _h(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(),
        e._insertElement(t, N.HTML),
        (e.tokenizer.state = ue.PLAINTEXT);
}
function xh(e, t) {
    e.openElements.hasInScope(a.BUTTON) &&
        (e.openElements.generateImpliedEndTags(),
        e.openElements.popUntilTagNamePopped(a.BUTTON)),
        e._reconstructActiveFormattingElements(),
        e._insertElement(t, N.HTML),
        (e.framesetOk = !1);
}
function Ch(e, t) {
    let n = e.activeFormattingElements.getElementEntryInScopeWithTagName(A.A);
    n &&
        (Yu(e, t),
        e.openElements.remove(n.element),
        e.activeFormattingElements.removeEntry(n)),
        e._reconstructActiveFormattingElements(),
        e._insertElement(t, N.HTML),
        e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Ih(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertElement(t, N.HTML),
        e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Nh(e, t) {
    e._reconstructActiveFormattingElements(),
        e.openElements.hasInScope(a.NOBR) &&
            (Yu(e, t), e._reconstructActiveFormattingElements()),
        e._insertElement(t, N.HTML),
        e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function Sh(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertElement(t, N.HTML),
        e.activeFormattingElements.insertMarker(),
        (e.framesetOk = !1);
}
function Rh(e, t) {
    e.treeAdapter.getDocumentMode(e.document) !== Te.QUIRKS &&
        e.openElements.hasInButtonScope(a.P) &&
        e._closePElement(),
        e._insertElement(t, N.HTML),
        (e.framesetOk = !1),
        (e.insertionMode = E.IN_TABLE);
}
function tc(e, t) {
    e._reconstructActiveFormattingElements(),
        e._appendElement(t, N.HTML),
        (e.framesetOk = !1),
        (t.ackSelfClosing = !0);
}
function nc(e) {
    let t = Rn(e, $e.TYPE);
    return t != null && t.toLowerCase() === Wd;
}
function kh(e, t) {
    e._reconstructActiveFormattingElements(),
        e._appendElement(t, N.HTML),
        nc(t) || (e.framesetOk = !1),
        (t.ackSelfClosing = !0);
}
function Lh(e, t) {
    e._appendElement(t, N.HTML), (t.ackSelfClosing = !0);
}
function Oh(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(),
        e._appendElement(t, N.HTML),
        (e.framesetOk = !1),
        (t.ackSelfClosing = !0);
}
function yh(e, t) {
    (t.tagName = A.IMG), (t.tagID = a.IMG), tc(e, t);
}
function Dh(e, t) {
    e._insertElement(t, N.HTML),
        (e.skipNextNewLine = !0),
        (e.tokenizer.state = ue.RCDATA),
        (e.originalInsertionMode = e.insertionMode),
        (e.framesetOk = !1),
        (e.insertionMode = E.TEXT);
}
function Ph(e, t) {
    e.openElements.hasInButtonScope(a.P) && e._closePElement(),
        e._reconstructActiveFormattingElements(),
        (e.framesetOk = !1),
        e._switchToTextParsing(t, ue.RAWTEXT);
}
function wh(e, t) {
    (e.framesetOk = !1), e._switchToTextParsing(t, ue.RAWTEXT);
}
function Ko(e, t) {
    e._switchToTextParsing(t, ue.RAWTEXT);
}
function Mh(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertElement(t, N.HTML),
        (e.framesetOk = !1),
        (e.insertionMode =
            e.insertionMode === E.IN_TABLE ||
            e.insertionMode === E.IN_CAPTION ||
            e.insertionMode === E.IN_TABLE_BODY ||
            e.insertionMode === E.IN_ROW ||
            e.insertionMode === E.IN_CELL
                ? E.IN_SELECT_IN_TABLE
                : E.IN_SELECT);
}
function Bh(e, t) {
    e.openElements.currentTagId === a.OPTION && e.openElements.pop(),
        e._reconstructActiveFormattingElements(),
        e._insertElement(t, N.HTML);
}
function Fh(e, t) {
    e.openElements.hasInScope(a.RUBY) &&
        e.openElements.generateImpliedEndTags(),
        e._insertElement(t, N.HTML);
}
function Hh(e, t) {
    e.openElements.hasInScope(a.RUBY) &&
        e.openElements.generateImpliedEndTagsWithExclusion(a.RTC),
        e._insertElement(t, N.HTML);
}
function Uh(e, t) {
    e._reconstructActiveFormattingElements(),
        Bu(t),
        Br(t),
        t.selfClosing
            ? e._appendElement(t, N.MATHML)
            : e._insertElement(t, N.MATHML),
        (t.ackSelfClosing = !0);
}
function vh(e, t) {
    e._reconstructActiveFormattingElements(),
        Fu(t),
        Br(t),
        t.selfClosing ? e._appendElement(t, N.SVG) : e._insertElement(t, N.SVG),
        (t.ackSelfClosing = !0);
}
function $o(e, t) {
    e._reconstructActiveFormattingElements(), e._insertElement(t, N.HTML);
}
function _e(e, t) {
    switch (t.tagID) {
        case a.I:
        case a.S:
        case a.B:
        case a.U:
        case a.EM:
        case a.TT:
        case a.BIG:
        case a.CODE:
        case a.FONT:
        case a.SMALL:
        case a.STRIKE:
        case a.STRONG: {
            Ih(e, t);
            break;
        }
        case a.A: {
            Ch(e, t);
            break;
        }
        case a.H1:
        case a.H2:
        case a.H3:
        case a.H4:
        case a.H5:
        case a.H6: {
            Th(e, t);
            break;
        }
        case a.P:
        case a.DL:
        case a.OL:
        case a.UL:
        case a.DIV:
        case a.DIR:
        case a.NAV:
        case a.MAIN:
        case a.MENU:
        case a.ASIDE:
        case a.CENTER:
        case a.FIGURE:
        case a.FOOTER:
        case a.HEADER:
        case a.HGROUP:
        case a.DIALOG:
        case a.DETAILS:
        case a.ADDRESS:
        case a.ARTICLE:
        case a.SECTION:
        case a.SUMMARY:
        case a.FIELDSET:
        case a.BLOCKQUOTE:
        case a.FIGCAPTION: {
            Eh(e, t);
            break;
        }
        case a.LI:
        case a.DD:
        case a.DT: {
            Ah(e, t);
            break;
        }
        case a.BR:
        case a.IMG:
        case a.WBR:
        case a.AREA:
        case a.EMBED:
        case a.KEYGEN: {
            tc(e, t);
            break;
        }
        case a.HR: {
            Oh(e, t);
            break;
        }
        case a.RB:
        case a.RTC: {
            Fh(e, t);
            break;
        }
        case a.RT:
        case a.RP: {
            Hh(e, t);
            break;
        }
        case a.PRE:
        case a.LISTING: {
            gh(e, t);
            break;
        }
        case a.XMP: {
            Ph(e, t);
            break;
        }
        case a.SVG: {
            vh(e, t);
            break;
        }
        case a.HTML: {
            hh(e, t);
            break;
        }
        case a.BASE:
        case a.LINK:
        case a.META:
        case a.STYLE:
        case a.TITLE:
        case a.SCRIPT:
        case a.BGSOUND:
        case a.BASEFONT:
        case a.TEMPLATE: {
            Je(e, t);
            break;
        }
        case a.BODY: {
            mh(e, t);
            break;
        }
        case a.FORM: {
            bh(e, t);
            break;
        }
        case a.NOBR: {
            Nh(e, t);
            break;
        }
        case a.MATH: {
            Uh(e, t);
            break;
        }
        case a.TABLE: {
            Rh(e, t);
            break;
        }
        case a.INPUT: {
            kh(e, t);
            break;
        }
        case a.PARAM:
        case a.TRACK:
        case a.SOURCE: {
            Lh(e, t);
            break;
        }
        case a.IMAGE: {
            yh(e, t);
            break;
        }
        case a.BUTTON: {
            xh(e, t);
            break;
        }
        case a.APPLET:
        case a.OBJECT:
        case a.MARQUEE: {
            Sh(e, t);
            break;
        }
        case a.IFRAME: {
            wh(e, t);
            break;
        }
        case a.SELECT: {
            Mh(e, t);
            break;
        }
        case a.OPTION:
        case a.OPTGROUP: {
            Bh(e, t);
            break;
        }
        case a.NOEMBED: {
            Ko(e, t);
            break;
        }
        case a.FRAMESET: {
            ph(e, t);
            break;
        }
        case a.TEXTAREA: {
            Dh(e, t);
            break;
        }
        case a.NOSCRIPT: {
            e.options.scriptingEnabled ? Ko(e, t) : $o(e, t);
            break;
        }
        case a.PLAINTEXT: {
            _h(e, t);
            break;
        }
        case a.COL:
        case a.TH:
        case a.TD:
        case a.TR:
        case a.HEAD:
        case a.FRAME:
        case a.TBODY:
        case a.TFOOT:
        case a.THEAD:
        case a.CAPTION:
        case a.COLGROUP:
            break;
        default:
            $o(e, t);
    }
}
function Yh(e, t) {
    if (
        e.openElements.hasInScope(a.BODY) &&
        ((e.insertionMode = E.AFTER_BODY), e.options.sourceCodeLocationInfo)
    ) {
        let n = e.openElements.tryPeekProperlyNestedBodyElement();
        n && e._setEndLocation(n, t);
    }
}
function zh(e, t) {
    e.openElements.hasInScope(a.BODY) &&
        ((e.insertionMode = E.AFTER_BODY), dc(e, t));
}
function qh(e, t) {
    let n = t.tagID;
    e.openElements.hasInScope(n) &&
        (e.openElements.generateImpliedEndTags(),
        e.openElements.popUntilTagNamePopped(n));
}
function Vh(e) {
    let t = e.openElements.tmplCount > 0,
        { formElement: n } = e;
    t || (e.formElement = null),
        (n || t) &&
            e.openElements.hasInScope(a.FORM) &&
            (e.openElements.generateImpliedEndTags(),
            t
                ? e.openElements.popUntilTagNamePopped(a.FORM)
                : n && e.openElements.remove(n));
}
function Wh(e) {
    e.openElements.hasInButtonScope(a.P) || e._insertFakeElement(A.P, a.P),
        e._closePElement();
}
function Qh(e) {
    e.openElements.hasInListItemScope(a.LI) &&
        (e.openElements.generateImpliedEndTagsWithExclusion(a.LI),
        e.openElements.popUntilTagNamePopped(a.LI));
}
function Gh(e, t) {
    let n = t.tagID;
    e.openElements.hasInScope(n) &&
        (e.openElements.generateImpliedEndTagsWithExclusion(n),
        e.openElements.popUntilTagNamePopped(n));
}
function Xh(e) {
    e.openElements.hasNumberedHeaderInScope() &&
        (e.openElements.generateImpliedEndTags(),
        e.openElements.popUntilNumberedHeaderPopped());
}
function jh(e, t) {
    let n = t.tagID;
    e.openElements.hasInScope(n) &&
        (e.openElements.generateImpliedEndTags(),
        e.openElements.popUntilTagNamePopped(n),
        e.activeFormattingElements.clearToLastMarker());
}
function Kh(e) {
    e._reconstructActiveFormattingElements(),
        e._insertFakeElement(A.BR, a.BR),
        e.openElements.pop(),
        (e.framesetOk = !1);
}
function rc(e, t) {
    let n = t.tagName,
        r = t.tagID;
    for (let i = e.openElements.stackTop; i > 0; i--) {
        let u = e.openElements.items[i],
            s = e.openElements.tagIDs[i];
        if (r === s && (r !== a.UNKNOWN || e.treeAdapter.getTagName(u) === n)) {
            e.openElements.generateImpliedEndTagsWithExclusion(r),
                e.openElements.stackTop >= i &&
                    e.openElements.shortenToLength(i);
            break;
        }
        if (e._isSpecialElement(u, s)) break;
    }
}
function Yr(e, t) {
    switch (t.tagID) {
        case a.A:
        case a.B:
        case a.I:
        case a.S:
        case a.U:
        case a.EM:
        case a.TT:
        case a.BIG:
        case a.CODE:
        case a.FONT:
        case a.NOBR:
        case a.SMALL:
        case a.STRIKE:
        case a.STRONG: {
            Yu(e, t);
            break;
        }
        case a.P: {
            Wh(e);
            break;
        }
        case a.DL:
        case a.UL:
        case a.OL:
        case a.DIR:
        case a.DIV:
        case a.NAV:
        case a.PRE:
        case a.MAIN:
        case a.MENU:
        case a.ASIDE:
        case a.BUTTON:
        case a.CENTER:
        case a.FIGURE:
        case a.FOOTER:
        case a.HEADER:
        case a.HGROUP:
        case a.DIALOG:
        case a.ADDRESS:
        case a.ARTICLE:
        case a.DETAILS:
        case a.SECTION:
        case a.SUMMARY:
        case a.LISTING:
        case a.FIELDSET:
        case a.BLOCKQUOTE:
        case a.FIGCAPTION: {
            qh(e, t);
            break;
        }
        case a.LI: {
            Qh(e);
            break;
        }
        case a.DD:
        case a.DT: {
            Gh(e, t);
            break;
        }
        case a.H1:
        case a.H2:
        case a.H3:
        case a.H4:
        case a.H5:
        case a.H6: {
            Xh(e);
            break;
        }
        case a.BR: {
            Kh(e);
            break;
        }
        case a.BODY: {
            Yh(e, t);
            break;
        }
        case a.HTML: {
            zh(e, t);
            break;
        }
        case a.FORM: {
            Vh(e);
            break;
        }
        case a.APPLET:
        case a.OBJECT:
        case a.MARQUEE: {
            jh(e, t);
            break;
        }
        case a.TEMPLATE: {
            Yt(e, t);
            break;
        }
        default:
            rc(e, t);
    }
}
function ic(e, t) {
    e.tmplInsertionModeStack.length > 0 ? fc(e, t) : zu(e, t);
}
function $h(e, t) {
    var n;
    t.tagID === a.SCRIPT &&
        ((n = e.scriptHandler) === null ||
            n === void 0 ||
            n.call(e, e.openElements.current)),
        e.openElements.pop(),
        (e.insertionMode = e.originalInsertionMode);
}
function Jh(e, t) {
    e._err(t, x.eofInElementThatCanContainOnlyText),
        e.openElements.pop(),
        (e.insertionMode = e.originalInsertionMode),
        e.onEof(t);
}
function Hu(e, t) {
    if (Jo.has(e.openElements.currentTagId))
        switch (
            ((e.pendingCharacterTokens.length = 0),
            (e.hasNonWhitespacePendingCharacterToken = !1),
            (e.originalInsertionMode = e.insertionMode),
            (e.insertionMode = E.IN_TABLE_TEXT),
            t.type)
        ) {
            case $.CHARACTER: {
                ac(e, t);
                break;
            }
            case $.WHITESPACE_CHARACTER: {
                uc(e, t);
                break;
            }
        }
    else Yn(e, t);
}
function Zh(e, t) {
    e.openElements.clearBackToTableContext(),
        e.activeFormattingElements.insertMarker(),
        e._insertElement(t, N.HTML),
        (e.insertionMode = E.IN_CAPTION);
}
function em(e, t) {
    e.openElements.clearBackToTableContext(),
        e._insertElement(t, N.HTML),
        (e.insertionMode = E.IN_COLUMN_GROUP);
}
function tm(e, t) {
    e.openElements.clearBackToTableContext(),
        e._insertFakeElement(A.COLGROUP, a.COLGROUP),
        (e.insertionMode = E.IN_COLUMN_GROUP),
        qu(e, t);
}
function nm(e, t) {
    e.openElements.clearBackToTableContext(),
        e._insertElement(t, N.HTML),
        (e.insertionMode = E.IN_TABLE_BODY);
}
function rm(e, t) {
    e.openElements.clearBackToTableContext(),
        e._insertFakeElement(A.TBODY, a.TBODY),
        (e.insertionMode = E.IN_TABLE_BODY),
        zr(e, t);
}
function im(e, t) {
    e.openElements.hasInTableScope(a.TABLE) &&
        (e.openElements.popUntilTagNamePopped(a.TABLE),
        e._resetInsertionMode(),
        e._processStartTag(t));
}
function um(e, t) {
    nc(t) ? e._appendElement(t, N.HTML) : Yn(e, t), (t.ackSelfClosing = !0);
}
function am(e, t) {
    !e.formElement &&
        e.openElements.tmplCount === 0 &&
        (e._insertElement(t, N.HTML),
        (e.formElement = e.openElements.current),
        e.openElements.pop());
}
function un(e, t) {
    switch (t.tagID) {
        case a.TD:
        case a.TH:
        case a.TR: {
            rm(e, t);
            break;
        }
        case a.STYLE:
        case a.SCRIPT:
        case a.TEMPLATE: {
            Je(e, t);
            break;
        }
        case a.COL: {
            tm(e, t);
            break;
        }
        case a.FORM: {
            am(e, t);
            break;
        }
        case a.TABLE: {
            im(e, t);
            break;
        }
        case a.TBODY:
        case a.TFOOT:
        case a.THEAD: {
            nm(e, t);
            break;
        }
        case a.INPUT: {
            um(e, t);
            break;
        }
        case a.CAPTION: {
            Zh(e, t);
            break;
        }
        case a.COLGROUP: {
            em(e, t);
            break;
        }
        default:
            Yn(e, t);
    }
}
function vn(e, t) {
    switch (t.tagID) {
        case a.TABLE: {
            e.openElements.hasInTableScope(a.TABLE) &&
                (e.openElements.popUntilTagNamePopped(a.TABLE),
                e._resetInsertionMode());
            break;
        }
        case a.TEMPLATE: {
            Yt(e, t);
            break;
        }
        case a.BODY:
        case a.CAPTION:
        case a.COL:
        case a.COLGROUP:
        case a.HTML:
        case a.TBODY:
        case a.TD:
        case a.TFOOT:
        case a.TH:
        case a.THEAD:
        case a.TR:
            break;
        default:
            Yn(e, t);
    }
}
function Yn(e, t) {
    let n = e.fosterParentingEnabled;
    (e.fosterParentingEnabled = !0), vr(e, t), (e.fosterParentingEnabled = n);
}
function uc(e, t) {
    e.pendingCharacterTokens.push(t);
}
function ac(e, t) {
    e.pendingCharacterTokens.push(t),
        (e.hasNonWhitespacePendingCharacterToken = !0);
}
function wn(e, t) {
    let n = 0;
    if (e.hasNonWhitespacePendingCharacterToken)
        for (; n < e.pendingCharacterTokens.length; n++)
            Yn(e, e.pendingCharacterTokens[n]);
    else
        for (; n < e.pendingCharacterTokens.length; n++)
            e._insertCharacters(e.pendingCharacterTokens[n]);
    (e.insertionMode = e.originalInsertionMode), e._processToken(t);
}
var sc = new Set([
    a.CAPTION,
    a.COL,
    a.COLGROUP,
    a.TBODY,
    a.TD,
    a.TFOOT,
    a.TH,
    a.THEAD,
    a.TR,
]);
function sm(e, t) {
    let n = t.tagID;
    sc.has(n)
        ? e.openElements.hasInTableScope(a.CAPTION) &&
          (e.openElements.generateImpliedEndTags(),
          e.openElements.popUntilTagNamePopped(a.CAPTION),
          e.activeFormattingElements.clearToLastMarker(),
          (e.insertionMode = E.IN_TABLE),
          un(e, t))
        : _e(e, t);
}
function om(e, t) {
    let n = t.tagID;
    switch (n) {
        case a.CAPTION:
        case a.TABLE: {
            e.openElements.hasInTableScope(a.CAPTION) &&
                (e.openElements.generateImpliedEndTags(),
                e.openElements.popUntilTagNamePopped(a.CAPTION),
                e.activeFormattingElements.clearToLastMarker(),
                (e.insertionMode = E.IN_TABLE),
                n === a.TABLE && vn(e, t));
            break;
        }
        case a.BODY:
        case a.COL:
        case a.COLGROUP:
        case a.HTML:
        case a.TBODY:
        case a.TD:
        case a.TFOOT:
        case a.TH:
        case a.THEAD:
        case a.TR:
            break;
        default:
            Yr(e, t);
    }
}
function qu(e, t) {
    switch (t.tagID) {
        case a.HTML: {
            _e(e, t);
            break;
        }
        case a.COL: {
            e._appendElement(t, N.HTML), (t.ackSelfClosing = !0);
            break;
        }
        case a.TEMPLATE: {
            Je(e, t);
            break;
        }
        default:
            Hr(e, t);
    }
}
function cm(e, t) {
    switch (t.tagID) {
        case a.COLGROUP: {
            e.openElements.currentTagId === a.COLGROUP &&
                (e.openElements.pop(), (e.insertionMode = E.IN_TABLE));
            break;
        }
        case a.TEMPLATE: {
            Yt(e, t);
            break;
        }
        case a.COL:
            break;
        default:
            Hr(e, t);
    }
}
function Hr(e, t) {
    e.openElements.currentTagId === a.COLGROUP &&
        (e.openElements.pop(),
        (e.insertionMode = E.IN_TABLE),
        e._processToken(t));
}
function zr(e, t) {
    switch (t.tagID) {
        case a.TR: {
            e.openElements.clearBackToTableBodyContext(),
                e._insertElement(t, N.HTML),
                (e.insertionMode = E.IN_ROW);
            break;
        }
        case a.TH:
        case a.TD: {
            e.openElements.clearBackToTableBodyContext(),
                e._insertFakeElement(A.TR, a.TR),
                (e.insertionMode = E.IN_ROW),
                qr(e, t);
            break;
        }
        case a.CAPTION:
        case a.COL:
        case a.COLGROUP:
        case a.TBODY:
        case a.TFOOT:
        case a.THEAD: {
            e.openElements.hasTableBodyContextInTableScope() &&
                (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                (e.insertionMode = E.IN_TABLE),
                un(e, t));
            break;
        }
        default:
            un(e, t);
    }
}
function vu(e, t) {
    let n = t.tagID;
    switch (t.tagID) {
        case a.TBODY:
        case a.TFOOT:
        case a.THEAD: {
            e.openElements.hasInTableScope(n) &&
                (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                (e.insertionMode = E.IN_TABLE));
            break;
        }
        case a.TABLE: {
            e.openElements.hasTableBodyContextInTableScope() &&
                (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                (e.insertionMode = E.IN_TABLE),
                vn(e, t));
            break;
        }
        case a.BODY:
        case a.CAPTION:
        case a.COL:
        case a.COLGROUP:
        case a.HTML:
        case a.TD:
        case a.TH:
        case a.TR:
            break;
        default:
            vn(e, t);
    }
}
function qr(e, t) {
    switch (t.tagID) {
        case a.TH:
        case a.TD: {
            e.openElements.clearBackToTableRowContext(),
                e._insertElement(t, N.HTML),
                (e.insertionMode = E.IN_CELL),
                e.activeFormattingElements.insertMarker();
            break;
        }
        case a.CAPTION:
        case a.COL:
        case a.COLGROUP:
        case a.TBODY:
        case a.TFOOT:
        case a.THEAD:
        case a.TR: {
            e.openElements.hasInTableScope(a.TR) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = E.IN_TABLE_BODY),
                zr(e, t));
            break;
        }
        default:
            un(e, t);
    }
}
function oc(e, t) {
    switch (t.tagID) {
        case a.TR: {
            e.openElements.hasInTableScope(a.TR) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = E.IN_TABLE_BODY));
            break;
        }
        case a.TABLE: {
            e.openElements.hasInTableScope(a.TR) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = E.IN_TABLE_BODY),
                vu(e, t));
            break;
        }
        case a.TBODY:
        case a.TFOOT:
        case a.THEAD: {
            (e.openElements.hasInTableScope(t.tagID) ||
                e.openElements.hasInTableScope(a.TR)) &&
                (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                (e.insertionMode = E.IN_TABLE_BODY),
                vu(e, t));
            break;
        }
        case a.BODY:
        case a.CAPTION:
        case a.COL:
        case a.COLGROUP:
        case a.HTML:
        case a.TD:
        case a.TH:
            break;
        default:
            vn(e, t);
    }
}
function lm(e, t) {
    let n = t.tagID;
    sc.has(n)
        ? (e.openElements.hasInTableScope(a.TD) ||
              e.openElements.hasInTableScope(a.TH)) &&
          (e._closeTableCell(), qr(e, t))
        : _e(e, t);
}
function fm(e, t) {
    let n = t.tagID;
    switch (n) {
        case a.TD:
        case a.TH: {
            e.openElements.hasInTableScope(n) &&
                (e.openElements.generateImpliedEndTags(),
                e.openElements.popUntilTagNamePopped(n),
                e.activeFormattingElements.clearToLastMarker(),
                (e.insertionMode = E.IN_ROW));
            break;
        }
        case a.TABLE:
        case a.TBODY:
        case a.TFOOT:
        case a.THEAD:
        case a.TR: {
            e.openElements.hasInTableScope(n) &&
                (e._closeTableCell(), oc(e, t));
            break;
        }
        case a.BODY:
        case a.CAPTION:
        case a.COL:
        case a.COLGROUP:
        case a.HTML:
            break;
        default:
            Yr(e, t);
    }
}
function cc(e, t) {
    switch (t.tagID) {
        case a.HTML: {
            _e(e, t);
            break;
        }
        case a.OPTION: {
            e.openElements.currentTagId === a.OPTION && e.openElements.pop(),
                e._insertElement(t, N.HTML);
            break;
        }
        case a.OPTGROUP: {
            e.openElements.currentTagId === a.OPTION && e.openElements.pop(),
                e.openElements.currentTagId === a.OPTGROUP &&
                    e.openElements.pop(),
                e._insertElement(t, N.HTML);
            break;
        }
        case a.INPUT:
        case a.KEYGEN:
        case a.TEXTAREA:
        case a.SELECT: {
            e.openElements.hasInSelectScope(a.SELECT) &&
                (e.openElements.popUntilTagNamePopped(a.SELECT),
                e._resetInsertionMode(),
                t.tagID !== a.SELECT && e._processStartTag(t));
            break;
        }
        case a.SCRIPT:
        case a.TEMPLATE: {
            Je(e, t);
            break;
        }
        default:
    }
}
function lc(e, t) {
    switch (t.tagID) {
        case a.OPTGROUP: {
            e.openElements.stackTop > 0 &&
                e.openElements.currentTagId === a.OPTION &&
                e.openElements.tagIDs[e.openElements.stackTop - 1] ===
                    a.OPTGROUP &&
                e.openElements.pop(),
                e.openElements.currentTagId === a.OPTGROUP &&
                    e.openElements.pop();
            break;
        }
        case a.OPTION: {
            e.openElements.currentTagId === a.OPTION && e.openElements.pop();
            break;
        }
        case a.SELECT: {
            e.openElements.hasInSelectScope(a.SELECT) &&
                (e.openElements.popUntilTagNamePopped(a.SELECT),
                e._resetInsertionMode());
            break;
        }
        case a.TEMPLATE: {
            Yt(e, t);
            break;
        }
        default:
    }
}
function dm(e, t) {
    let n = t.tagID;
    n === a.CAPTION ||
    n === a.TABLE ||
    n === a.TBODY ||
    n === a.TFOOT ||
    n === a.THEAD ||
    n === a.TR ||
    n === a.TD ||
    n === a.TH
        ? (e.openElements.popUntilTagNamePopped(a.SELECT),
          e._resetInsertionMode(),
          e._processStartTag(t))
        : cc(e, t);
}
function hm(e, t) {
    let n = t.tagID;
    n === a.CAPTION ||
    n === a.TABLE ||
    n === a.TBODY ||
    n === a.TFOOT ||
    n === a.THEAD ||
    n === a.TR ||
    n === a.TD ||
    n === a.TH
        ? e.openElements.hasInTableScope(n) &&
          (e.openElements.popUntilTagNamePopped(a.SELECT),
          e._resetInsertionMode(),
          e.onEndTag(t))
        : lc(e, t);
}
function mm(e, t) {
    switch (t.tagID) {
        case a.BASE:
        case a.BASEFONT:
        case a.BGSOUND:
        case a.LINK:
        case a.META:
        case a.NOFRAMES:
        case a.SCRIPT:
        case a.STYLE:
        case a.TEMPLATE:
        case a.TITLE: {
            Je(e, t);
            break;
        }
        case a.CAPTION:
        case a.COLGROUP:
        case a.TBODY:
        case a.TFOOT:
        case a.THEAD: {
            (e.tmplInsertionModeStack[0] = E.IN_TABLE),
                (e.insertionMode = E.IN_TABLE),
                un(e, t);
            break;
        }
        case a.COL: {
            (e.tmplInsertionModeStack[0] = E.IN_COLUMN_GROUP),
                (e.insertionMode = E.IN_COLUMN_GROUP),
                qu(e, t);
            break;
        }
        case a.TR: {
            (e.tmplInsertionModeStack[0] = E.IN_TABLE_BODY),
                (e.insertionMode = E.IN_TABLE_BODY),
                zr(e, t);
            break;
        }
        case a.TD:
        case a.TH: {
            (e.tmplInsertionModeStack[0] = E.IN_ROW),
                (e.insertionMode = E.IN_ROW),
                qr(e, t);
            break;
        }
        default:
            (e.tmplInsertionModeStack[0] = E.IN_BODY),
                (e.insertionMode = E.IN_BODY),
                _e(e, t);
    }
}
function pm(e, t) {
    t.tagID === a.TEMPLATE && Yt(e, t);
}
function fc(e, t) {
    e.openElements.tmplCount > 0
        ? (e.openElements.popUntilTagNamePopped(a.TEMPLATE),
          e.activeFormattingElements.clearToLastMarker(),
          e.tmplInsertionModeStack.shift(),
          e._resetInsertionMode(),
          e.onEof(t))
        : zu(e, t);
}
function Em(e, t) {
    t.tagID === a.HTML ? _e(e, t) : Ur(e, t);
}
function dc(e, t) {
    var n;
    if (t.tagID === a.HTML) {
        if (
            (e.fragmentContext || (e.insertionMode = E.AFTER_AFTER_BODY),
            e.options.sourceCodeLocationInfo &&
                e.openElements.tagIDs[0] === a.HTML)
        ) {
            e._setEndLocation(e.openElements.items[0], t);
            let r = e.openElements.items[1];
            r &&
                !(
                    !(
                        (n = e.treeAdapter.getNodeSourceCodeLocation(r)) ===
                            null || n === void 0
                    ) && n.endTag
                ) &&
                e._setEndLocation(r, t);
        }
    } else Ur(e, t);
}
function Ur(e, t) {
    (e.insertionMode = E.IN_BODY), vr(e, t);
}
function Tm(e, t) {
    switch (t.tagID) {
        case a.HTML: {
            _e(e, t);
            break;
        }
        case a.FRAMESET: {
            e._insertElement(t, N.HTML);
            break;
        }
        case a.FRAME: {
            e._appendElement(t, N.HTML), (t.ackSelfClosing = !0);
            break;
        }
        case a.NOFRAMES: {
            Je(e, t);
            break;
        }
        default:
    }
}
function gm(e, t) {
    t.tagID === a.FRAMESET &&
        !e.openElements.isRootHtmlElementCurrent() &&
        (e.openElements.pop(),
        !e.fragmentContext &&
            e.openElements.currentTagId !== a.FRAMESET &&
            (e.insertionMode = E.AFTER_FRAMESET));
}
function bm(e, t) {
    switch (t.tagID) {
        case a.HTML: {
            _e(e, t);
            break;
        }
        case a.NOFRAMES: {
            Je(e, t);
            break;
        }
        default:
    }
}
function Am(e, t) {
    t.tagID === a.HTML && (e.insertionMode = E.AFTER_AFTER_FRAMESET);
}
function _m(e, t) {
    t.tagID === a.HTML ? _e(e, t) : Fr(e, t);
}
function Fr(e, t) {
    (e.insertionMode = E.IN_BODY), vr(e, t);
}
function xm(e, t) {
    switch (t.tagID) {
        case a.HTML: {
            _e(e, t);
            break;
        }
        case a.NOFRAMES: {
            Je(e, t);
            break;
        }
        default:
    }
}
function Cm(e, t) {
    (t.chars = re), e._insertCharacters(t);
}
function Im(e, t) {
    e._insertCharacters(t), (e.framesetOk = !1);
}
function hc(e) {
    for (
        ;
        e.treeAdapter.getNamespaceURI(e.openElements.current) !== N.HTML &&
        !e._isIntegrationPoint(
            e.openElements.currentTagId,
            e.openElements.current
        );

    )
        e.openElements.pop();
}
function Nm(e, t) {
    if (Wo(t)) hc(e), e._startTagOutsideForeignContent(t);
    else {
        let n = e._getAdjustedCurrentElement(),
            r = e.treeAdapter.getNamespaceURI(n);
        r === N.MATHML ? Bu(t) : r === N.SVG && (Qo(t), Fu(t)),
            Br(t),
            t.selfClosing ? e._appendElement(t, r) : e._insertElement(t, r),
            (t.ackSelfClosing = !0);
    }
}
function Sm(e, t) {
    if (t.tagID === a.P || t.tagID === a.BR) {
        hc(e), e._endTagOutsideForeignContent(t);
        return;
    }
    for (let n = e.openElements.stackTop; n > 0; n--) {
        let r = e.openElements.items[n];
        if (e.treeAdapter.getNamespaceURI(r) === N.HTML) {
            e._endTagOutsideForeignContent(t);
            break;
        }
        let i = e.treeAdapter.getTagName(r);
        if (i.toLowerCase() === t.tagName) {
            (t.tagName = i), e.openElements.shortenToLength(n);
            break;
        }
    }
}
var Rm = new Map([
        [34, "&quot;"],
        [38, "&amp;"],
        [39, "&apos;"],
        [60, "&lt;"],
        [62, "&gt;"],
    ]),
    oC =
        String.prototype.codePointAt != null
            ? (e, t) => e.codePointAt(t)
            : (e, t) =>
                  (e.charCodeAt(t) & 64512) === 55296
                      ? (e.charCodeAt(t) - 55296) * 1024 +
                        e.charCodeAt(t + 1) -
                        56320 +
                        65536
                      : e.charCodeAt(t);
function Vu(e, t) {
    return function (r) {
        let i,
            u = 0,
            s = "";
        for (; (i = e.exec(r)); )
            u !== i.index && (s += r.substring(u, i.index)),
                (s += t.get(i[0].charCodeAt(0))),
                (u = i.index + 1);
        return s + r.substring(u);
    };
}
var cC = Vu(/[&<>'"]/g, Rm),
    km = Vu(
        /["&\u00A0]/g,
        new Map([
            [34, "&quot;"],
            [38, "&amp;"],
            [160, "&nbsp;"],
        ])
    ),
    Lm = Vu(
        /[&<>\u00A0]/g,
        new Map([
            [38, "&amp;"],
            [60, "&lt;"],
            [62, "&gt;"],
            [160, "&nbsp;"],
        ])
    );
var mC = new Set([
    A.AREA,
    A.BASE,
    A.BASEFONT,
    A.BGSOUND,
    A.BR,
    A.COL,
    A.EMBED,
    A.FRAME,
    A.HR,
    A.IMG,
    A.INPUT,
    A.KEYGEN,
    A.LINK,
    A.META,
    A.PARAM,
    A.SOURCE,
    A.TRACK,
    A.WBR,
]);
var Om = new Set([
        "mdxFlowExpression",
        "mdxJsxFlowElement",
        "mdxJsxTextElement",
        "mdxTextExpression",
        "mdxjsEsm",
    ]),
    mc = { sourceCodeLocationInfo: !0, scriptingEnabled: !1 };
function Wu(e, t) {
    let n = vm(e),
        r = Jt("type", {
            handlers: {
                root: ym,
                element: Dm,
                text: Pm,
                comment: Ec,
                doctype: wm,
                raw: Bm,
            },
            unknown: Fm,
        }),
        i = {
            parser: n ? new vt(mc) : vt.getFragmentParser(void 0, mc),
            handle(o) {
                r(o, i);
            },
            stitches: !1,
            options: t || {},
        };
    r(e, i), an(i, Ye());
    let u = n ? i.parser.document : i.parser.getFragment(),
        s = Iu(u, { file: i.options.file });
    return (
        i.stitches &&
            Be(s, "comment", function (o, c, l) {
                let f = o;
                if (f.value.stitch && l && c !== void 0) {
                    let m = l.children;
                    return (m[c] = f.value.stitch), c;
                }
            }),
        s.type === "root" &&
        s.children.length === 1 &&
        s.children[0].type === e.type
            ? s.children[0]
            : s
    );
}
function pc(e, t) {
    let n = -1;
    if (e) for (; ++n < e.length; ) t.handle(e[n]);
}
function ym(e, t) {
    pc(e.children, t);
}
function Dm(e, t) {
    Hm(e, t), pc(e.children, t), Um(e, t);
}
function Pm(e, t) {
    t.parser.tokenizer.state > 4 && (t.parser.tokenizer.state = 0);
    let n = { type: It.TokenType.CHARACTER, chars: e.value, location: zn(e) };
    an(t, Ye(e)),
        (t.parser.currentToken = n),
        t.parser._processToken(t.parser.currentToken);
}
function wm(e, t) {
    let n = {
        type: It.TokenType.DOCTYPE,
        name: "html",
        forceQuirks: !1,
        publicId: "",
        systemId: "",
        location: zn(e),
    };
    an(t, Ye(e)),
        (t.parser.currentToken = n),
        t.parser._processToken(t.parser.currentToken);
}
function Mm(e, t) {
    t.stitches = !0;
    let n = Ym(e);
    if ("children" in e && "children" in n) {
        let r = Wu({ type: "root", children: e.children }, t.options);
        n.children = r.children;
    }
    Ec({ type: "comment", value: { stitch: n } }, t);
}
function Ec(e, t) {
    let n = e.value,
        r = { type: It.TokenType.COMMENT, data: n, location: zn(e) };
    an(t, Ye(e)),
        (t.parser.currentToken = r),
        t.parser._processToken(t.parser.currentToken);
}
function Bm(e, t) {
    if (
        ((t.parser.tokenizer.preprocessor.html = ""),
        (t.parser.tokenizer.preprocessor.pos = -1),
        (t.parser.tokenizer.preprocessor.lastGapPos = -2),
        (t.parser.tokenizer.preprocessor.gapStack = []),
        (t.parser.tokenizer.preprocessor.skipNextNewLine = !1),
        (t.parser.tokenizer.preprocessor.lastChunkWritten = !1),
        (t.parser.tokenizer.preprocessor.endOfChunkHit = !1),
        (t.parser.tokenizer.preprocessor.isEol = !1),
        Tc(t, Ye(e)),
        t.parser.tokenizer.write(e.value, !1),
        t.parser.tokenizer._runParsingLoop(),
        t.parser.tokenizer.state === 72 || t.parser.tokenizer.state === 78)
    ) {
        t.parser.tokenizer.preprocessor.lastChunkWritten = !0;
        let n = t.parser.tokenizer._consume();
        t.parser.tokenizer._callState(n);
    }
}
function Fm(e, t) {
    let n = e;
    if (t.options.passThrough && t.options.passThrough.includes(n.type))
        Mm(n, t);
    else {
        let r = "";
        throw (
            (Om.has(n.type) &&
                (r =
                    ". It looks like you are using MDX nodes with `hast-util-raw` (or `rehype-raw`). If you use this because you are using remark or rehype plugins that inject `'html'` nodes, then please raise an issue with that plugin, as its a bad and slow idea. If you use this because you are using markdown syntax, then you have to configure this utility (or plugin) to pass through these nodes (see `passThrough` in docs), but you can also migrate to use the MDX syntax"),
            new Error("Cannot compile `" + n.type + "` node" + r))
        );
    }
}
function an(e, t) {
    Tc(e, t);
    let n = e.parser.tokenizer.currentCharacterToken;
    n &&
        n.location &&
        ((n.location.endLine = e.parser.tokenizer.preprocessor.line),
        (n.location.endCol = e.parser.tokenizer.preprocessor.col + 1),
        (n.location.endOffset = e.parser.tokenizer.preprocessor.offset + 1),
        (e.parser.currentToken = n),
        e.parser._processToken(e.parser.currentToken)),
        (e.parser.tokenizer.paused = !1),
        (e.parser.tokenizer.inLoop = !1),
        (e.parser.tokenizer.active = !1),
        (e.parser.tokenizer.returnState = ue.DATA),
        (e.parser.tokenizer.charRefCode = -1),
        (e.parser.tokenizer.consumedAfterSnapshot = -1),
        (e.parser.tokenizer.currentLocation = null),
        (e.parser.tokenizer.currentCharacterToken = null),
        (e.parser.tokenizer.currentToken = null),
        (e.parser.tokenizer.currentAttr = { name: "", value: "" });
}
function Tc(e, t) {
    if (t && t.offset !== void 0) {
        let n = {
            startLine: t.line,
            startCol: t.column,
            startOffset: t.offset,
            endLine: -1,
            endCol: -1,
            endOffset: -1,
        };
        (e.parser.tokenizer.preprocessor.lineStartPos = -t.column + 1),
            (e.parser.tokenizer.preprocessor.droppedBufferSize = t.offset),
            (e.parser.tokenizer.preprocessor.line = t.line),
            (e.parser.tokenizer.currentLocation = n);
    }
}
function Hm(e, t) {
    let n = e.tagName.toLowerCase();
    if (t.parser.tokenizer.state === ue.PLAINTEXT) return;
    an(t, Ye(e));
    let r = t.parser.openElements.current,
        i = "namespaceURI" in r ? r.namespaceURI : it.html;
    i === it.html && n === "svg" && (i = it.svg);
    let u = Su(
            { ...e, children: [] },
            { space: i === it.svg ? "svg" : "html" }
        ),
        s = {
            type: It.TokenType.START_TAG,
            tagName: n,
            tagID: Ln.getTagID(n),
            selfClosing: !1,
            ackSelfClosing: !1,
            attrs: "attrs" in u ? u.attrs : [],
            location: zn(e),
        };
    (t.parser.currentToken = s),
        t.parser._processToken(t.parser.currentToken),
        (t.parser.tokenizer.lastStartTagName = n);
}
function Um(e, t) {
    let n = e.tagName.toLowerCase();
    if (
        (!t.parser.tokenizer.inForeignNode && Rr.includes(n)) ||
        t.parser.tokenizer.state === ue.PLAINTEXT
    )
        return;
    an(t, Bt(e));
    let r = {
        type: It.TokenType.END_TAG,
        tagName: n,
        tagID: Ln.getTagID(n),
        selfClosing: !1,
        ackSelfClosing: !1,
        attrs: [],
        location: zn(e),
    };
    (t.parser.currentToken = r),
        t.parser._processToken(t.parser.currentToken),
        n === t.parser.tokenizer.lastStartTagName &&
            (t.parser.tokenizer.state === ue.RCDATA ||
                t.parser.tokenizer.state === ue.RAWTEXT ||
                t.parser.tokenizer.state === ue.SCRIPT_DATA) &&
            (t.parser.tokenizer.state = ue.DATA);
}
function vm(e) {
    let t = e.type === "root" ? e.children[0] : e;
    return !!(
        t &&
        (t.type === "doctype" ||
            (t.type === "element" && t.tagName.toLowerCase() === "html"))
    );
}
function zn(e) {
    let t = Ye(e) || { line: void 0, column: void 0, offset: void 0 },
        n = Bt(e) || { line: void 0, column: void 0, offset: void 0 };
    return {
        startLine: t.line,
        startCol: t.column,
        startOffset: t.offset,
        endLine: n.line,
        endCol: n.column,
        endOffset: n.offset,
    };
}
function Ym(e) {
    return "children" in e ? ct({ ...e, children: [] }) : ct(e);
}
var zm = /["&'<>`]/g,
    qm = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    Vm = /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
    Wm = /[|\\{}()[\]^$+*?.]/g,
    gc = new WeakMap();
function bc(e, t) {
    if (
        ((e = e.replace(t.subset ? Qm(t.subset) : zm, r)),
        t.subset || t.escapeOnly)
    )
        return e;
    return e.replace(qm, n).replace(Vm, r);
    function n(i, u, s) {
        return t.format(
            (i.charCodeAt(0) - 55296) * 1024 + i.charCodeAt(1) - 56320 + 65536,
            s.charCodeAt(u + 2),
            t
        );
    }
    function r(i, u, s) {
        return t.format(i.charCodeAt(0), s.charCodeAt(u + 1), t);
    }
}
function Qm(e) {
    let t = gc.get(e);
    return t || ((t = Gm(e)), gc.set(e, t)), t;
}
function Gm(e) {
    let t = [],
        n = -1;
    for (; ++n < e.length; ) t.push(e[n].replace(Wm, "\\$&"));
    return new RegExp("(?:" + t.join("|") + ")", "g");
}
var Xm = /[\dA-Fa-f]/;
function Ac(e, t, n) {
    let r = "&#x" + e.toString(16).toUpperCase();
    return n && t && !Xm.test(String.fromCharCode(t)) ? r : r + ";";
}
var jm = /\d/;
function _c(e, t, n) {
    let r = "&#" + String(e);
    return n && t && !jm.test(String.fromCharCode(t)) ? r : r + ";";
}
var xc = [
    "AElig",
    "AMP",
    "Aacute",
    "Acirc",
    "Agrave",
    "Aring",
    "Atilde",
    "Auml",
    "COPY",
    "Ccedil",
    "ETH",
    "Eacute",
    "Ecirc",
    "Egrave",
    "Euml",
    "GT",
    "Iacute",
    "Icirc",
    "Igrave",
    "Iuml",
    "LT",
    "Ntilde",
    "Oacute",
    "Ocirc",
    "Ograve",
    "Oslash",
    "Otilde",
    "Ouml",
    "QUOT",
    "REG",
    "THORN",
    "Uacute",
    "Ucirc",
    "Ugrave",
    "Uuml",
    "Yacute",
    "aacute",
    "acirc",
    "acute",
    "aelig",
    "agrave",
    "amp",
    "aring",
    "atilde",
    "auml",
    "brvbar",
    "ccedil",
    "cedil",
    "cent",
    "copy",
    "curren",
    "deg",
    "divide",
    "eacute",
    "ecirc",
    "egrave",
    "eth",
    "euml",
    "frac12",
    "frac14",
    "frac34",
    "gt",
    "iacute",
    "icirc",
    "iexcl",
    "igrave",
    "iquest",
    "iuml",
    "laquo",
    "lt",
    "macr",
    "micro",
    "middot",
    "nbsp",
    "not",
    "ntilde",
    "oacute",
    "ocirc",
    "ograve",
    "ordf",
    "ordm",
    "oslash",
    "otilde",
    "ouml",
    "para",
    "plusmn",
    "pound",
    "quot",
    "raquo",
    "reg",
    "sect",
    "shy",
    "sup1",
    "sup2",
    "sup3",
    "szlig",
    "thorn",
    "times",
    "uacute",
    "ucirc",
    "ugrave",
    "uml",
    "uuml",
    "yacute",
    "yen",
    "yuml",
];
var Vr = {
    nbsp: "\xA0",
    iexcl: "\xA1",
    cent: "\xA2",
    pound: "\xA3",
    curren: "\xA4",
    yen: "\xA5",
    brvbar: "\xA6",
    sect: "\xA7",
    uml: "\xA8",
    copy: "\xA9",
    ordf: "\xAA",
    laquo: "\xAB",
    not: "\xAC",
    shy: "\xAD",
    reg: "\xAE",
    macr: "\xAF",
    deg: "\xB0",
    plusmn: "\xB1",
    sup2: "\xB2",
    sup3: "\xB3",
    acute: "\xB4",
    micro: "\xB5",
    para: "\xB6",
    middot: "\xB7",
    cedil: "\xB8",
    sup1: "\xB9",
    ordm: "\xBA",
    raquo: "\xBB",
    frac14: "\xBC",
    frac12: "\xBD",
    frac34: "\xBE",
    iquest: "\xBF",
    Agrave: "\xC0",
    Aacute: "\xC1",
    Acirc: "\xC2",
    Atilde: "\xC3",
    Auml: "\xC4",
    Aring: "\xC5",
    AElig: "\xC6",
    Ccedil: "\xC7",
    Egrave: "\xC8",
    Eacute: "\xC9",
    Ecirc: "\xCA",
    Euml: "\xCB",
    Igrave: "\xCC",
    Iacute: "\xCD",
    Icirc: "\xCE",
    Iuml: "\xCF",
    ETH: "\xD0",
    Ntilde: "\xD1",
    Ograve: "\xD2",
    Oacute: "\xD3",
    Ocirc: "\xD4",
    Otilde: "\xD5",
    Ouml: "\xD6",
    times: "\xD7",
    Oslash: "\xD8",
    Ugrave: "\xD9",
    Uacute: "\xDA",
    Ucirc: "\xDB",
    Uuml: "\xDC",
    Yacute: "\xDD",
    THORN: "\xDE",
    szlig: "\xDF",
    agrave: "\xE0",
    aacute: "\xE1",
    acirc: "\xE2",
    atilde: "\xE3",
    auml: "\xE4",
    aring: "\xE5",
    aelig: "\xE6",
    ccedil: "\xE7",
    egrave: "\xE8",
    eacute: "\xE9",
    ecirc: "\xEA",
    euml: "\xEB",
    igrave: "\xEC",
    iacute: "\xED",
    icirc: "\xEE",
    iuml: "\xEF",
    eth: "\xF0",
    ntilde: "\xF1",
    ograve: "\xF2",
    oacute: "\xF3",
    ocirc: "\xF4",
    otilde: "\xF5",
    ouml: "\xF6",
    divide: "\xF7",
    oslash: "\xF8",
    ugrave: "\xF9",
    uacute: "\xFA",
    ucirc: "\xFB",
    uuml: "\xFC",
    yacute: "\xFD",
    thorn: "\xFE",
    yuml: "\xFF",
    fnof: "\u0192",
    Alpha: "\u0391",
    Beta: "\u0392",
    Gamma: "\u0393",
    Delta: "\u0394",
    Epsilon: "\u0395",
    Zeta: "\u0396",
    Eta: "\u0397",
    Theta: "\u0398",
    Iota: "\u0399",
    Kappa: "\u039A",
    Lambda: "\u039B",
    Mu: "\u039C",
    Nu: "\u039D",
    Xi: "\u039E",
    Omicron: "\u039F",
    Pi: "\u03A0",
    Rho: "\u03A1",
    Sigma: "\u03A3",
    Tau: "\u03A4",
    Upsilon: "\u03A5",
    Phi: "\u03A6",
    Chi: "\u03A7",
    Psi: "\u03A8",
    Omega: "\u03A9",
    alpha: "\u03B1",
    beta: "\u03B2",
    gamma: "\u03B3",
    delta: "\u03B4",
    epsilon: "\u03B5",
    zeta: "\u03B6",
    eta: "\u03B7",
    theta: "\u03B8",
    iota: "\u03B9",
    kappa: "\u03BA",
    lambda: "\u03BB",
    mu: "\u03BC",
    nu: "\u03BD",
    xi: "\u03BE",
    omicron: "\u03BF",
    pi: "\u03C0",
    rho: "\u03C1",
    sigmaf: "\u03C2",
    sigma: "\u03C3",
    tau: "\u03C4",
    upsilon: "\u03C5",
    phi: "\u03C6",
    chi: "\u03C7",
    psi: "\u03C8",
    omega: "\u03C9",
    thetasym: "\u03D1",
    upsih: "\u03D2",
    piv: "\u03D6",
    bull: "\u2022",
    hellip: "\u2026",
    prime: "\u2032",
    Prime: "\u2033",
    oline: "\u203E",
    frasl: "\u2044",
    weierp: "\u2118",
    image: "\u2111",
    real: "\u211C",
    trade: "\u2122",
    alefsym: "\u2135",
    larr: "\u2190",
    uarr: "\u2191",
    rarr: "\u2192",
    darr: "\u2193",
    harr: "\u2194",
    crarr: "\u21B5",
    lArr: "\u21D0",
    uArr: "\u21D1",
    rArr: "\u21D2",
    dArr: "\u21D3",
    hArr: "\u21D4",
    forall: "\u2200",
    part: "\u2202",
    exist: "\u2203",
    empty: "\u2205",
    nabla: "\u2207",
    isin: "\u2208",
    notin: "\u2209",
    ni: "\u220B",
    prod: "\u220F",
    sum: "\u2211",
    minus: "\u2212",
    lowast: "\u2217",
    radic: "\u221A",
    prop: "\u221D",
    infin: "\u221E",
    ang: "\u2220",
    and: "\u2227",
    or: "\u2228",
    cap: "\u2229",
    cup: "\u222A",
    int: "\u222B",
    there4: "\u2234",
    sim: "\u223C",
    cong: "\u2245",
    asymp: "\u2248",
    ne: "\u2260",
    equiv: "\u2261",
    le: "\u2264",
    ge: "\u2265",
    sub: "\u2282",
    sup: "\u2283",
    nsub: "\u2284",
    sube: "\u2286",
    supe: "\u2287",
    oplus: "\u2295",
    otimes: "\u2297",
    perp: "\u22A5",
    sdot: "\u22C5",
    lceil: "\u2308",
    rceil: "\u2309",
    lfloor: "\u230A",
    rfloor: "\u230B",
    lang: "\u2329",
    rang: "\u232A",
    loz: "\u25CA",
    spades: "\u2660",
    clubs: "\u2663",
    hearts: "\u2665",
    diams: "\u2666",
    quot: '"',
    amp: "&",
    lt: "<",
    gt: ">",
    OElig: "\u0152",
    oelig: "\u0153",
    Scaron: "\u0160",
    scaron: "\u0161",
    Yuml: "\u0178",
    circ: "\u02C6",
    tilde: "\u02DC",
    ensp: "\u2002",
    emsp: "\u2003",
    thinsp: "\u2009",
    zwnj: "\u200C",
    zwj: "\u200D",
    lrm: "\u200E",
    rlm: "\u200F",
    ndash: "\u2013",
    mdash: "\u2014",
    lsquo: "\u2018",
    rsquo: "\u2019",
    sbquo: "\u201A",
    ldquo: "\u201C",
    rdquo: "\u201D",
    bdquo: "\u201E",
    dagger: "\u2020",
    Dagger: "\u2021",
    permil: "\u2030",
    lsaquo: "\u2039",
    rsaquo: "\u203A",
    euro: "\u20AC",
};
var Cc = ["cent", "copy", "divide", "gt", "lt", "not", "para", "times"];
var Ic = {}.hasOwnProperty,
    Qu = {},
    Wr;
for (Wr in Vr) Ic.call(Vr, Wr) && (Qu[Vr[Wr]] = Wr);
var Km = /[^\dA-Za-z]/;
function Nc(e, t, n, r) {
    let i = String.fromCharCode(e);
    if (Ic.call(Qu, i)) {
        let u = Qu[i],
            s = "&" + u;
        return n &&
            xc.includes(u) &&
            !Cc.includes(u) &&
            (!r || (t && t !== 61 && Km.test(String.fromCharCode(t))))
            ? s
            : s + ";";
    }
    return "";
}
function Sc(e, t, n) {
    let r = Ac(e, t, n.omitOptionalSemicolons),
        i;
    if (
        ((n.useNamedReferences || n.useShortestReferences) &&
            (i = Nc(e, t, n.omitOptionalSemicolons, n.attribute)),
        (n.useShortestReferences || !i) && n.useShortestReferences)
    ) {
        let u = _c(e, t, n.omitOptionalSemicolons);
        u.length < r.length && (r = u);
    }
    return i && (!n.useShortestReferences || i.length < r.length) ? i : r;
}
function pt(e, t) {
    return bc(e, Object.assign({ format: Sc }, t));
}
var $m = /^>|^->|<!--|-->|--!>|<!-$/g,
    Jm = [">"],
    Zm = ["<", ">"];
function Rc(e, t, n, r) {
    return r.settings.bogusComments
        ? "<?" +
              pt(
                  e.value,
                  Object.assign({}, r.settings.characterReferences, {
                      subset: Jm,
                  })
              ) +
              ">"
        : "<!--" + e.value.replace($m, i) + "-->";
    function i(u) {
        return pt(
            u,
            Object.assign({}, r.settings.characterReferences, { subset: Zm })
        );
    }
}
function kc(e, t, n, r) {
    return (
        "<!" +
        (r.settings.upperDoctype ? "DOCTYPE" : "doctype") +
        (r.settings.tightDoctype ? "" : " ") +
        "html>"
    );
}
function Gu(e, t) {
    let n = String(e);
    if (typeof t != "string") throw new TypeError("Expected character");
    let r = 0,
        i = n.indexOf(t);
    for (; i !== -1; ) r++, (i = n.indexOf(t, i + t.length));
    return r;
}
var ep = /[ \t\n\f\r]/g;
function zt(e) {
    return typeof e == "object"
        ? e.type === "text"
            ? Lc(e.value)
            : !1
        : Lc(e);
}
function Lc(e) {
    return e.replace(ep, "") === "";
}
var le = Oc(1),
    Xu = Oc(-1),
    tp = [];
function Oc(e) {
    return t;
    function t(n, r, i) {
        let u = n ? n.children : tp,
            s = (r || 0) + e,
            o = u[s];
        if (!i) for (; o && zt(o); ) (s += e), (o = u[s]);
        return o;
    }
}
var np = {}.hasOwnProperty;
function Qr(e) {
    return t;
    function t(n, r, i) {
        return np.call(e, n.tagName) && e[n.tagName](n, r, i);
    }
}
var qn = Qr({
    body: ip,
    caption: ju,
    colgroup: ju,
    dd: op,
    dt: sp,
    head: ju,
    html: rp,
    li: ap,
    optgroup: cp,
    option: lp,
    p: up,
    rp: yc,
    rt: yc,
    tbody: dp,
    td: Dc,
    tfoot: hp,
    th: Dc,
    thead: fp,
    tr: mp,
});
function ju(e, t, n) {
    let r = le(n, t, !0);
    return (
        !r ||
        (r.type !== "comment" && !(r.type === "text" && zt(r.value.charAt(0))))
    );
}
function rp(e, t, n) {
    let r = le(n, t);
    return !r || r.type !== "comment";
}
function ip(e, t, n) {
    let r = le(n, t);
    return !r || r.type !== "comment";
}
function up(e, t, n) {
    let r = le(n, t);
    return r
        ? r.type === "element" &&
              (r.tagName === "address" ||
                  r.tagName === "article" ||
                  r.tagName === "aside" ||
                  r.tagName === "blockquote" ||
                  r.tagName === "details" ||
                  r.tagName === "div" ||
                  r.tagName === "dl" ||
                  r.tagName === "fieldset" ||
                  r.tagName === "figcaption" ||
                  r.tagName === "figure" ||
                  r.tagName === "footer" ||
                  r.tagName === "form" ||
                  r.tagName === "h1" ||
                  r.tagName === "h2" ||
                  r.tagName === "h3" ||
                  r.tagName === "h4" ||
                  r.tagName === "h5" ||
                  r.tagName === "h6" ||
                  r.tagName === "header" ||
                  r.tagName === "hgroup" ||
                  r.tagName === "hr" ||
                  r.tagName === "main" ||
                  r.tagName === "menu" ||
                  r.tagName === "nav" ||
                  r.tagName === "ol" ||
                  r.tagName === "p" ||
                  r.tagName === "pre" ||
                  r.tagName === "section" ||
                  r.tagName === "table" ||
                  r.tagName === "ul")
        : !n ||
              !(
                  n.type === "element" &&
                  (n.tagName === "a" ||
                      n.tagName === "audio" ||
                      n.tagName === "del" ||
                      n.tagName === "ins" ||
                      n.tagName === "map" ||
                      n.tagName === "noscript" ||
                      n.tagName === "video")
              );
}
function ap(e, t, n) {
    let r = le(n, t);
    return !r || (r.type === "element" && r.tagName === "li");
}
function sp(e, t, n) {
    let r = le(n, t);
    return !!(
        r &&
        r.type === "element" &&
        (r.tagName === "dt" || r.tagName === "dd")
    );
}
function op(e, t, n) {
    let r = le(n, t);
    return (
        !r ||
        (r.type === "element" && (r.tagName === "dt" || r.tagName === "dd"))
    );
}
function yc(e, t, n) {
    let r = le(n, t);
    return (
        !r ||
        (r.type === "element" && (r.tagName === "rp" || r.tagName === "rt"))
    );
}
function cp(e, t, n) {
    let r = le(n, t);
    return !r || (r.type === "element" && r.tagName === "optgroup");
}
function lp(e, t, n) {
    let r = le(n, t);
    return (
        !r ||
        (r.type === "element" &&
            (r.tagName === "option" || r.tagName === "optgroup"))
    );
}
function fp(e, t, n) {
    let r = le(n, t);
    return !!(
        r &&
        r.type === "element" &&
        (r.tagName === "tbody" || r.tagName === "tfoot")
    );
}
function dp(e, t, n) {
    let r = le(n, t);
    return (
        !r ||
        (r.type === "element" &&
            (r.tagName === "tbody" || r.tagName === "tfoot"))
    );
}
function hp(e, t, n) {
    return !le(n, t);
}
function mp(e, t, n) {
    let r = le(n, t);
    return !r || (r.type === "element" && r.tagName === "tr");
}
function Dc(e, t, n) {
    let r = le(n, t);
    return (
        !r ||
        (r.type === "element" && (r.tagName === "td" || r.tagName === "th"))
    );
}
var Pc = Qr({ body: Tp, colgroup: gp, head: Ep, html: pp, tbody: bp });
function pp(e) {
    let t = le(e, -1);
    return !t || t.type !== "comment";
}
function Ep(e) {
    let t = new Set();
    for (let r of e.children)
        if (
            r.type === "element" &&
            (r.tagName === "base" || r.tagName === "title")
        ) {
            if (t.has(r.tagName)) return !1;
            t.add(r.tagName);
        }
    let n = e.children[0];
    return !n || n.type === "element";
}
function Tp(e) {
    let t = le(e, -1, !0);
    return (
        !t ||
        (t.type !== "comment" &&
            !(t.type === "text" && zt(t.value.charAt(0))) &&
            !(
                t.type === "element" &&
                (t.tagName === "meta" ||
                    t.tagName === "link" ||
                    t.tagName === "script" ||
                    t.tagName === "style" ||
                    t.tagName === "template")
            ))
    );
}
function gp(e, t, n) {
    let r = Xu(n, t),
        i = le(e, -1, !0);
    return n &&
        r &&
        r.type === "element" &&
        r.tagName === "colgroup" &&
        qn(r, n.children.indexOf(r), n)
        ? !1
        : !!(i && i.type === "element" && i.tagName === "col");
}
function bp(e, t, n) {
    let r = Xu(n, t),
        i = le(e, -1);
    return n &&
        r &&
        r.type === "element" &&
        (r.tagName === "thead" || r.tagName === "tbody") &&
        qn(r, n.children.indexOf(r), n)
        ? !1
        : !!(i && i.type === "element" && i.tagName === "tr");
}
var Gr = {
    name: [
        [
            `
\f\r &/=>`.split(""),
            `
\f\r "&'/=>\``.split(""),
        ],
        [
            `\0
\f\r "&'/<=>`.split(""),
            `\0
\f\r "&'/<=>\``.split(""),
        ],
    ],
    unquoted: [
        [
            `
\f\r &>`.split(""),
            `\0
\f\r "&'<=>\``.split(""),
        ],
        [
            `\0
\f\r "&'<=>\``.split(""),
            `\0
\f\r "&'<=>\``.split(""),
        ],
    ],
    single: [
        ["&'".split(""), "\"&'`".split("")],
        ["\0&'".split(""), "\0\"&'`".split("")],
    ],
    double: [
        ['"&'.split(""), "\"&'`".split("")],
        ['\0"&'.split(""), "\0\"&'`".split("")],
    ],
};
function wc(e, t, n, r) {
    let i = r.schema,
        u = i.space === "svg" ? !1 : r.settings.omitOptionalTags,
        s =
            i.space === "svg"
                ? r.settings.closeEmptyElements
                : r.settings.voids.includes(e.tagName.toLowerCase()),
        o = [],
        c;
    i.space === "html" && e.tagName === "svg" && (r.schema = qe);
    let l = Ap(r, e.properties),
        f = r.all(
            i.space === "html" && e.tagName === "template" ? e.content : e
        );
    return (
        (r.schema = i),
        f && (s = !1),
        (l || !u || !Pc(e, t, n)) &&
            (o.push("<", e.tagName, l ? " " + l : ""),
            s &&
                (i.space === "svg" || r.settings.closeSelfClosing) &&
                ((c = l.charAt(l.length - 1)),
                (!r.settings.tightSelfClosing ||
                    c === "/" ||
                    (c && c !== '"' && c !== "'")) &&
                    o.push(" "),
                o.push("/")),
            o.push(">")),
        o.push(f),
        !s && (!u || !qn(e, t, n)) && o.push("</" + e.tagName + ">"),
        o.join("")
    );
}
function Ap(e, t) {
    let n = [],
        r = -1,
        i;
    if (t) {
        for (i in t)
            if (t[i] !== null && t[i] !== void 0) {
                let u = _p(e, i, t[i]);
                u && n.push(u);
            }
    }
    for (; ++r < n.length; ) {
        let u = e.settings.tightAttributes
            ? n[r].charAt(n[r].length - 1)
            : void 0;
        r !== n.length - 1 && u !== '"' && u !== "'" && (n[r] += " ");
    }
    return n.join("");
}
function _p(e, t, n) {
    let r = dt(e.schema, t),
        i = e.settings.allowParseErrors && e.schema.space === "html" ? 0 : 1,
        u = e.settings.allowDangerousCharacters ? 0 : 1,
        s = e.quote,
        o;
    if (
        (r.overloadedBoolean && (n === r.attribute || n === "")
            ? (n = !0)
            : (r.boolean || (r.overloadedBoolean && typeof n != "string")) &&
              (n = !!n),
        n == null || n === !1 || (typeof n == "number" && Number.isNaN(n)))
    )
        return "";
    let c = pt(
        r.attribute,
        Object.assign({}, e.settings.characterReferences, {
            subset: Gr.name[i][u],
        })
    );
    return n === !0 ||
        ((n = Array.isArray(n)
            ? (r.commaSeparated ? Ir : Nr)(n, {
                  padLeft: !e.settings.tightCommaSeparatedLists,
              })
            : String(n)),
        e.settings.collapseEmptyAttributes && !n)
        ? c
        : (e.settings.preferUnquoted &&
              (o = pt(
                  n,
                  Object.assign({}, e.settings.characterReferences, {
                      attribute: !0,
                      subset: Gr.unquoted[i][u],
                  })
              )),
          o !== n &&
              (e.settings.quoteSmart &&
                  Gu(n, s) > Gu(n, e.alternative) &&
                  (s = e.alternative),
              (o =
                  s +
                  pt(
                      n,
                      Object.assign({}, e.settings.characterReferences, {
                          subset: (s === "'" ? Gr.single : Gr.double)[i][u],
                          attribute: !0,
                      })
                  ) +
                  s)),
          c + (o && "=" + o));
}
var xp = ["<", "&"];
function Xr(e, t, n, r) {
    return n &&
        n.type === "element" &&
        (n.tagName === "script" || n.tagName === "style")
        ? e.value
        : pt(
              e.value,
              Object.assign({}, r.settings.characterReferences, { subset: xp })
          );
}
function Mc(e, t, n, r) {
    return r.settings.allowDangerousHtml ? e.value : Xr(e, t, n, r);
}
function Bc(e, t, n, r) {
    return r.all(e);
}
var Fc = Jt("type", {
    invalid: Cp,
    unknown: Ip,
    handlers: {
        comment: Rc,
        doctype: kc,
        element: wc,
        raw: Mc,
        root: Bc,
        text: Xr,
    },
});
function Cp(e) {
    throw new Error("Expected node, not `" + e + "`");
}
function Ip(e) {
    let t = e;
    throw new Error("Cannot compile unknown node `" + t.type + "`");
}
var Np = {},
    Sp = {},
    Rp = [];
function Hc(e, t) {
    let n = t || Np,
        r = n.quote || '"',
        i = r === '"' ? "'" : '"';
    if (r !== '"' && r !== "'")
        throw new Error("Invalid quote `" + r + "`, expected `'` or `\"`");
    return {
        one: kp,
        all: Lp,
        settings: {
            omitOptionalTags: n.omitOptionalTags || !1,
            allowParseErrors: n.allowParseErrors || !1,
            allowDangerousCharacters: n.allowDangerousCharacters || !1,
            quoteSmart: n.quoteSmart || !1,
            preferUnquoted: n.preferUnquoted || !1,
            tightAttributes: n.tightAttributes || !1,
            upperDoctype: n.upperDoctype || !1,
            tightDoctype: n.tightDoctype || !1,
            bogusComments: n.bogusComments || !1,
            tightCommaSeparatedLists: n.tightCommaSeparatedLists || !1,
            tightSelfClosing: n.tightSelfClosing || !1,
            collapseEmptyAttributes: n.collapseEmptyAttributes || !1,
            allowDangerousHtml: n.allowDangerousHtml || !1,
            voids: n.voids || Rr,
            characterReferences: n.characterReferences || Sp,
            closeSelfClosing: n.closeSelfClosing || !1,
            closeEmptyElements: n.closeEmptyElements || !1,
        },
        schema: n.space === "svg" ? qe : ht,
        quote: r,
        alternative: i,
    }.one(Array.isArray(e) ? { type: "root", children: e } : e, void 0, void 0);
}
function kp(e, t, n) {
    return Fc(e, t, n, this);
}
function Lp(e) {
    let t = [],
        n = (e && e.children) || Rp,
        r = -1;
    for (; ++r < n.length; ) t[r] = this.one(n[r], r, e);
    return t.join("");
}
export {
    Er as defaultHandlers,
    fo as mdast2hast,
    eu as mdast2hastGridTablesHandler,
    Wu as raw,
    Ps as remarkGridTable,
    Ri as remarkParse,
    Hc as toHtml,
    ga as unified,
};
