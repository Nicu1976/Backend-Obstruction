"use strict";
(self.webpackChunkobstruct = self.webpackChunkobstruct || []).push([
    [179], {
        91: () => {
            function se(e) {
                return "function" == typeof e
            }

            function Ro(e) {
                const t = e(r => {
                    Error.call(r), r.stack = (new Error).stack
                });
                return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t
            }
            const Yi = Ro(e => function (t) {
                e(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((r, o) => `${o + 1}) ${r.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t
            });

            function br(e, n) {
                if (e) {
                    const t = e.indexOf(n);
                    0 <= t && e.splice(t, 1)
                }
            }
            class dt {
                constructor(n) {
                    this.initialTeardown = n, this.closed = !1, this._parentage = null, this._finalizers = null
                }
                unsubscribe() {
                    let n;
                    if (!this.closed) {
                        this.closed = !0;
                        const {
                            _parentage: t
                        } = this;
                        if (t)
                            if (this._parentage = null, Array.isArray(t))
                                for (const i of t) i.remove(this);
                            else t.remove(this);
                        const {
                            initialTeardown: r
                        } = this;
                        if (se(r)) try {
                            r()
                        } catch (i) {
                            n = i instanceof Yi ? i.errors : [i]
                        }
                        const {
                            _finalizers: o
                        } = this;
                        if (o) {
                            this._finalizers = null;
                            for (const i of o) try {
                                $f(i)
                            } catch (s) {
                                n = n ?? [], s instanceof Yi ? n = [...n, ...s.errors] : n.push(s)
                            }
                        }
                        if (n) throw new Yi(n)
                    }
                }
                add(n) {
                    var t;
                    if (n && n !== this)
                        if (this.closed) $f(n);
                        else {
                            if (n instanceof dt) {
                                if (n.closed || n._hasParent(this)) return;
                                n._addParent(this)
                            } (this._finalizers = null !== (t = this._finalizers) && void 0 !== t ? t : []).push(n)
                        }
                }
                _hasParent(n) {
                    const {
                        _parentage: t
                    } = this;
                    return t === n || Array.isArray(t) && t.includes(n)
                }
                _addParent(n) {
                    const {
                        _parentage: t
                    } = this;
                    this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n
                }
                _removeParent(n) {
                    const {
                        _parentage: t
                    } = this;
                    t === n ? this._parentage = null : Array.isArray(t) && br(t, n)
                }
                remove(n) {
                    const {
                        _finalizers: t
                    } = this;
                    t && br(t, n), n instanceof dt && n._removeParent(this)
                }
            }
            dt.EMPTY = (() => {
                const e = new dt;
                return e.closed = !0, e
            })();
            const jf = dt.EMPTY;

            function Bf(e) {
                return e instanceof dt || e && "closed" in e && se(e.remove) && se(e.add) && se(e.unsubscribe)
            }

            function $f(e) {
                se(e) ? e() : e.unsubscribe()
            }
            const Qn = {
                onUnhandledError: null,
                onStoppedNotification: null,
                Promise: void 0,
                useDeprecatedSynchronousErrorHandling: !1,
                useDeprecatedNextContext: !1
            },
                Qi = {
                    setTimeout(e, n, ...t) {
                        const {
                            delegate: r
                        } = Qi;
                        return r?.setTimeout ? r.setTimeout(e, n, ...t) : setTimeout(e, n, ...t)
                    },
                    clearTimeout(e) {
                        const {
                            delegate: n
                        } = Qi;
                        return (n?.clearTimeout || clearTimeout)(e)
                    },
                    delegate: void 0
                };

            function Uf(e) {
                Qi.setTimeout(() => {
                    const {
                        onUnhandledError: n
                    } = Qn;
                    if (!n) throw e;
                    n(e)
                })
            }

            function Cl() { }
            const kw = Dl("C", void 0, void 0);

            function Dl(e, n, t) {
                return {
                    kind: e,
                    value: n,
                    error: t
                }
            }
            let er = null;

            function es(e) {
                if (Qn.useDeprecatedSynchronousErrorHandling) {
                    const n = !er;
                    if (n && (er = {
                        errorThrown: !1,
                        error: null
                    }), e(), n) {
                        const {
                            errorThrown: t,
                            error: r
                        } = er;
                        if (er = null, t) throw r
                    }
                } else e()
            }
            class wl extends dt {
                constructor(n) {
                    super(), this.isStopped = !1, n ? (this.destination = n, Bf(n) && n.add(this)) : this.destination = Hw
                }
                static create(n, t, r) {
                    return new Oo(n, t, r)
                }
                next(n) {
                    this.isStopped ? bl(function Vw(e) {
                        return Dl("N", e, void 0)
                    }(n), this) : this._next(n)
                }
                error(n) {
                    this.isStopped ? bl(function Lw(e) {
                        return Dl("E", void 0, e)
                    }(n), this) : (this.isStopped = !0, this._error(n))
                }
                complete() {
                    this.isStopped ? bl(kw, this) : (this.isStopped = !0, this._complete())
                }
                unsubscribe() {
                    this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
                }
                _next(n) {
                    this.destination.next(n)
                }
                _error(n) {
                    try {
                        this.destination.error(n)
                    } finally {
                        this.unsubscribe()
                    }
                }
                _complete() {
                    try {
                        this.destination.complete()
                    } finally {
                        this.unsubscribe()
                    }
                }
            }
            const Bw = Function.prototype.bind;

            function El(e, n) {
                return Bw.call(e, n)
            }
            class $w {
                constructor(n) {
                    this.partialObserver = n
                }
                next(n) {
                    const {
                        partialObserver: t
                    } = this;
                    if (t.next) try {
                        t.next(n)
                    } catch (r) {
                        ts(r)
                    }
                }
                error(n) {
                    const {
                        partialObserver: t
                    } = this;
                    if (t.error) try {
                        t.error(n)
                    } catch (r) {
                        ts(r)
                    } else ts(n)
                }
                complete() {
                    const {
                        partialObserver: n
                    } = this;
                    if (n.complete) try {
                        n.complete()
                    } catch (t) {
                        ts(t)
                    }
                }
            }
            class Oo extends wl {
                constructor(n, t, r) {
                    let o;
                    if (super(), se(n) || !n) o = {
                        next: n ?? void 0,
                        error: t ?? void 0,
                        complete: r ?? void 0
                    };
                    else {
                        let i;
                        this && Qn.useDeprecatedNextContext ? (i = Object.create(n), i.unsubscribe = () => this.unsubscribe(), o = {
                            next: n.next && El(n.next, i),
                            error: n.error && El(n.error, i),
                            complete: n.complete && El(n.complete, i)
                        }) : o = n
                    }
                    this.destination = new $w(o)
                }
            }

            function ts(e) {
                Qn.useDeprecatedSynchronousErrorHandling ? function jw(e) {
                    Qn.useDeprecatedSynchronousErrorHandling && er && (er.errorThrown = !0, er.error = e)
                }(e) : Uf(e)
            }

            function bl(e, n) {
                const {
                    onStoppedNotification: t
                } = Qn;
                t && Qi.setTimeout(() => t(e, n))
            }
            const Hw = {
                closed: !0,
                next: Cl,
                error: function Uw(e) {
                    throw e
                },
                complete: Cl
            },
                Sl = "function" == typeof Symbol && Symbol.observable || "@@observable";

            function Fn(e) {
                return e
            }

            function Hf(e) {
                return 0 === e.length ? Fn : 1 === e.length ? e[0] : function (t) {
                    return e.reduce((r, o) => o(r), t)
                }
            }
            let ye = (() => {
                class e {
                    constructor(t) {
                        t && (this._subscribe = t)
                    }
                    lift(t) {
                        const r = new e;
                        return r.source = this, r.operator = t, r
                    }
                    subscribe(t, r, o) {
                        const i = function Ww(e) {
                            return e && e instanceof wl || function zw(e) {
                                return e && se(e.next) && se(e.error) && se(e.complete)
                            }(e) && Bf(e)
                        }(t) ? t : new Oo(t, r, o);
                        return es(() => {
                            const {
                                operator: s,
                                source: a
                            } = this;
                            i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
                        }), i
                    }
                    _trySubscribe(t) {
                        try {
                            return this._subscribe(t)
                        } catch (r) {
                            t.error(r)
                        }
                    }
                    forEach(t, r) {
                        return new (r = Gf(r))((o, i) => {
                            const s = new Oo({
                                next: a => {
                                    try {
                                        t(a)
                                    } catch (l) {
                                        i(l), s.unsubscribe()
                                    }
                                },
                                error: i,
                                complete: o
                            });
                            this.subscribe(s)
                        })
                    }
                    _subscribe(t) {
                        var r;
                        return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(t)
                    } [Sl]() {
                        return this
                    }
                    pipe(...t) {
                        return Hf(t)(this)
                    }
                    toPromise(t) {
                        return new (t = Gf(t))((r, o) => {
                            let i;
                            this.subscribe(s => i = s, s => o(s), () => r(i))
                        })
                    }
                }
                return e.create = n => new e(n), e
            })();

            function Gf(e) {
                var n;
                return null !== (n = e ?? Qn.Promise) && void 0 !== n ? n : Promise
            }
            const qw = Ro(e => function () {
                e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
            });
            let fn = (() => {
                class e extends ye {
                    constructor() {
                        super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
                    }
                    lift(t) {
                        const r = new zf(this, this);
                        return r.operator = t, r
                    }
                    _throwIfClosed() {
                        if (this.closed) throw new qw
                    }
                    next(t) {
                        es(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                                for (const r of this.currentObservers) r.next(t)
                            }
                        })
                    }
                    error(t) {
                        es(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.hasError = this.isStopped = !0, this.thrownError = t;
                                const {
                                    observers: r
                                } = this;
                                for (; r.length;) r.shift().error(t)
                            }
                        })
                    }
                    complete() {
                        es(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.isStopped = !0;
                                const {
                                    observers: t
                                } = this;
                                for (; t.length;) t.shift().complete()
                            }
                        })
                    }
                    unsubscribe() {
                        this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
                    }
                    get observed() {
                        var t;
                        return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0
                    }
                    _trySubscribe(t) {
                        return this._throwIfClosed(), super._trySubscribe(t)
                    }
                    _subscribe(t) {
                        return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t)
                    }
                    _innerSubscribe(t) {
                        const {
                            hasError: r,
                            isStopped: o,
                            observers: i
                        } = this;
                        return r || o ? jf : (this.currentObservers = null, i.push(t), new dt(() => {
                            this.currentObservers = null, br(i, t)
                        }))
                    }
                    _checkFinalizedStatuses(t) {
                        const {
                            hasError: r,
                            thrownError: o,
                            isStopped: i
                        } = this;
                        r ? t.error(o) : i && t.complete()
                    }
                    asObservable() {
                        const t = new ye;
                        return t.source = this, t
                    }
                }
                return e.create = (n, t) => new zf(n, t), e
            })();
            class zf extends fn {
                constructor(n, t) {
                    super(), this.destination = n, this.source = t
                }
                next(n) {
                    var t, r;
                    null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === r || r.call(t, n)
                }
                error(n) {
                    var t, r;
                    null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === r || r.call(t, n)
                }
                complete() {
                    var n, t;
                    null === (t = null === (n = this.destination) || void 0 === n ? void 0 : n.complete) || void 0 === t || t.call(n)
                }
                _subscribe(n) {
                    var t, r;
                    return null !== (r = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(n)) && void 0 !== r ? r : jf
                }
            }

            function Wf(e) {
                return se(e?.lift)
            }

            function Ie(e) {
                return n => {
                    if (Wf(n)) return n.lift(function (t) {
                        try {
                            return e(t, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                    throw new TypeError("Unable to lift unknown Observable type")
                }
            }

            function ve(e, n, t, r, o) {
                return new Jw(e, n, t, r, o)
            }
            class Jw extends wl {
                constructor(n, t, r, o, i, s) {
                    super(n), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = t ? function (a) {
                        try {
                            t(a)
                        } catch (l) {
                            n.error(l)
                        }
                    } : super._next, this._error = o ? function (a) {
                        try {
                            o(a)
                        } catch (l) {
                            n.error(l)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._error, this._complete = r ? function () {
                        try {
                            r()
                        } catch (a) {
                            n.error(a)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._complete
                }
                unsubscribe() {
                    var n;
                    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                        const {
                            closed: t
                        } = this;
                        super.unsubscribe(), !t && (null === (n = this.onFinalize) || void 0 === n || n.call(this))
                    }
                }
            }

            function U(e, n) {
                return Ie((t, r) => {
                    let o = 0;
                    t.subscribe(ve(r, i => {
                        r.next(e.call(n, i, o++))
                    }))
                })
            }

            function tr(e) {
                return this instanceof tr ? (this.v = e, this) : new tr(e)
            }

            function Yw(e) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var t, n = e[Symbol.asyncIterator];
                return n ? n.call(e) : (e = function Xf(e) {
                    var n = "function" == typeof Symbol && Symbol.iterator,
                        t = n && e[n],
                        r = 0;
                    if (t) return t.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function () {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.")
                }(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function () {
                    return this
                }, t);

                function r(i) {
                    t[i] = e[i] && function (s) {
                        return new Promise(function (a, l) {
                            ! function o(i, s, a, l) {
                                Promise.resolve(l).then(function (u) {
                                    i({
                                        value: u,
                                        done: a
                                    })
                                }, s)
                            }(a, l, (s = e[i](s)).done, s.value)
                        })
                    }
                }
            }
            const Kf = e => e && "number" == typeof e.length && "function" != typeof e;

            function Zf(e) {
                return se(e?.then)
            }

            function Yf(e) {
                return se(e[Sl])
            }

            function Qf(e) {
                return Symbol.asyncIterator && se(e?.[Symbol.asyncIterator])
            }

            function eh(e) {
                return new TypeError(`You provided ${null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
            }
            const th = function eE() {
                return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
            }();

            function nh(e) {
                return se(e?.[th])
            }

            function rh(e) {
                return function Zw(e, n, t) {
                    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                    var o, r = t.apply(e, n || []),
                        i = [];
                    return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function () {
                        return this
                    }, o;

                    function s(f) {
                        r[f] && (o[f] = function (h) {
                            return new Promise(function (p, g) {
                                i.push([f, h, p, g]) > 1 || a(f, h)
                            })
                        })
                    }

                    function a(f, h) {
                        try {
                            ! function l(f) {
                                f.value instanceof tr ? Promise.resolve(f.value.v).then(u, c) : d(i[0][2], f)
                            }(r[f](h))
                        } catch (p) {
                            d(i[0][3], p)
                        }
                    }

                    function u(f) {
                        a("next", f)
                    }

                    function c(f) {
                        a("throw", f)
                    }

                    function d(f, h) {
                        f(h), i.shift(), i.length && a(i[0][0], i[0][1])
                    }
                }(this, arguments, function* () {
                    const t = e.getReader();
                    try {
                        for (; ;) {
                            const {
                                value: r,
                                done: o
                            } = yield tr(t.read());
                            if (o) return yield tr(void 0);
                            yield yield tr(r)
                        }
                    } finally {
                        t.releaseLock()
                    }
                })
            }

            function oh(e) {
                return se(e?.getReader)
            }

            function it(e) {
                if (e instanceof ye) return e;
                if (null != e) {
                    if (Yf(e)) return function tE(e) {
                        return new ye(n => {
                            const t = e[Sl]();
                            if (se(t.subscribe)) return t.subscribe(n);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        })
                    }(e);
                    if (Kf(e)) return function nE(e) {
                        return new ye(n => {
                            for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                            n.complete()
                        })
                    }(e);
                    if (Zf(e)) return function rE(e) {
                        return new ye(n => {
                            e.then(t => {
                                n.closed || (n.next(t), n.complete())
                            }, t => n.error(t)).then(null, Uf)
                        })
                    }(e);
                    if (Qf(e)) return ih(e);
                    if (nh(e)) return function oE(e) {
                        return new ye(n => {
                            for (const t of e)
                                if (n.next(t), n.closed) return;
                            n.complete()
                        })
                    }(e);
                    if (oh(e)) return function iE(e) {
                        return ih(rh(e))
                    }(e)
                }
                throw eh(e)
            }

            function ih(e) {
                return new ye(n => {
                    (function sE(e, n) {
                        var t, r, o, i;
                        return function Xw(e, n, t, r) {
                            return new (t || (t = Promise))(function (i, s) {
                                function a(c) {
                                    try {
                                        u(r.next(c))
                                    } catch (d) {
                                        s(d)
                                    }
                                }

                                function l(c) {
                                    try {
                                        u(r.throw(c))
                                    } catch (d) {
                                        s(d)
                                    }
                                }

                                function u(c) {
                                    c.done ? i(c.value) : function o(i) {
                                        return i instanceof t ? i : new t(function (s) {
                                            s(i)
                                        })
                                    }(c.value).then(a, l)
                                }
                                u((r = r.apply(e, n || [])).next())
                            })
                        }(this, void 0, void 0, function* () {
                            try {
                                for (t = Yw(e); !(r = yield t.next()).done;)
                                    if (n.next(r.value), n.closed) return
                            } catch (s) {
                                o = {
                                    error: s
                                }
                            } finally {
                                try {
                                    r && !r.done && (i = t.return) && (yield i.call(t))
                                } finally {
                                    if (o) throw o.error
                                }
                            }
                            n.complete()
                        })
                    })(e, n).catch(t => n.error(t))
                })
            }

            function hn(e, n, t, r = 0, o = !1) {
                const i = n.schedule(function () {
                    t(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
                }, r);
                if (e.add(i), !o) return i
            }

            function Le(e, n, t = 1 / 0) {
                return se(n) ? Le((r, o) => U((i, s) => n(r, i, o, s))(it(e(r, o))), t) : ("number" == typeof n && (t = n), Ie((r, o) => function aE(e, n, t, r, o, i, s, a) {
                    const l = [];
                    let u = 0,
                        c = 0,
                        d = !1;
                    const f = () => {
                        d && !l.length && !u && n.complete()
                    },
                        h = g => u < r ? p(g) : l.push(g),
                        p = g => {
                            i && n.next(g), u++;
                            let m = !1;
                            it(t(g, c++)).subscribe(ve(n, v => {
                                o?.(v), i ? h(v) : n.next(v)
                            }, () => {
                                m = !0
                            }, void 0, () => {
                                if (m) try {
                                    for (u--; l.length && u < r;) {
                                        const v = l.shift();
                                        s ? hn(n, s, () => p(v)) : p(v)
                                    }
                                    f()
                                } catch (v) {
                                    n.error(v)
                                }
                            }))
                        };
                    return e.subscribe(ve(n, h, () => {
                        d = !0, f()
                    })), () => {
                        a?.()
                    }
                }(r, o, e, t)))
            }

            function Sr(e = 1 / 0) {
                return Le(Fn, e)
            }
            const Kt = new ye(e => e.complete());

            function sh(e) {
                return e && se(e.schedule)
            }

            function Il(e) {
                return e[e.length - 1]
            }

            function ah(e) {
                return se(Il(e)) ? e.pop() : void 0
            }

            function No(e) {
                return sh(Il(e)) ? e.pop() : void 0
            }

            function lh(e, n = 0) {
                return Ie((t, r) => {
                    t.subscribe(ve(r, o => hn(r, e, () => r.next(o), n), () => hn(r, e, () => r.complete(), n), o => hn(r, e, () => r.error(o), n)))
                })
            }

            function uh(e, n = 0) {
                return Ie((t, r) => {
                    r.add(e.schedule(() => t.subscribe(r), n))
                })
            }

            function ch(e, n) {
                if (!e) throw new Error("Iterable cannot be null");
                return new ye(t => {
                    hn(t, n, () => {
                        const r = e[Symbol.asyncIterator]();
                        hn(t, n, () => {
                            r.next().then(o => {
                                o.done ? t.complete() : t.next(o.value)
                            })
                        }, 0, !0)
                    })
                })
            }

            function Ae(e, n) {
                return n ? function gE(e, n) {
                    if (null != e) {
                        if (Yf(e)) return function cE(e, n) {
                            return it(e).pipe(uh(n), lh(n))
                        }(e, n);
                        if (Kf(e)) return function fE(e, n) {
                            return new ye(t => {
                                let r = 0;
                                return n.schedule(function () {
                                    r === e.length ? t.complete() : (t.next(e[r++]), t.closed || this.schedule())
                                })
                            })
                        }(e, n);
                        if (Zf(e)) return function dE(e, n) {
                            return it(e).pipe(uh(n), lh(n))
                        }(e, n);
                        if (Qf(e)) return ch(e, n);
                        if (nh(e)) return function hE(e, n) {
                            return new ye(t => {
                                let r;
                                return hn(t, n, () => {
                                    r = e[th](), hn(t, n, () => {
                                        let o, i;
                                        try {
                                            ({
                                                value: o,
                                                done: i
                                            } = r.next())
                                        } catch (s) {
                                            return void t.error(s)
                                        }
                                        i ? t.complete() : t.next(o)
                                    }, 0, !0)
                                }), () => se(r?.return) && r.return()
                            })
                        }(e, n);
                        if (oh(e)) return function pE(e, n) {
                            return ch(rh(e), n)
                        }(e, n)
                    }
                    throw eh(e)
                }(e, n) : it(e)
            }

            function Al(e, n, ...t) {
                if (!0 === n) return void e();
                if (!1 === n) return;
                const r = new Oo({
                    next: () => {
                        r.unsubscribe(), e()
                    }
                });
                return it(n(...t)).subscribe(r)
            }

            function oe(e) {
                for (let n in e)
                    if (e[n] === oe) return n;
                throw Error("Could not find renamed property on target object.")
            }

            function Tl(e, n) {
                for (const t in n) n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t])
            }

            function ae(e) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) return "[" + e.map(ae).join(", ") + "]";
                if (null == e) return "" + e;
                if (e.overriddenName) return `${e.overriddenName}`;
                if (e.name) return `${e.name}`;
                const n = e.toString();
                if (null == n) return "" + n;
                const t = n.indexOf("\n");
                return -1 === t ? n : n.substring(0, t)
            }

            function xl(e, n) {
                return null == e || "" === e ? null === n ? "" : n : null == n || "" === n ? e : e + " " + n
            }
            const vE = oe({
                __forward_ref__: oe
            });

            function le(e) {
                return e.__forward_ref__ = le, e.toString = function () {
                    return ae(this())
                }, e
            }

            function F(e) {
                return Rl(e) ? e() : e
            }

            function Rl(e) {
                return "function" == typeof e && e.hasOwnProperty(vE) && e.__forward_ref__ === le
            }

            function Ol(e) {
                return e && !!e.\u0275providers
            }
            const dh = "https://g.co/ng/security#xss";
            class D extends Error {
                constructor(n, t) {
                    super(ns(n, t)), this.code = n
                }
            }

            function ns(e, n) {
                return `NG0${Math.abs(e)}${n ? ": " + n.trim() : ""}`
            }

            function V(e) {
                return "string" == typeof e ? e : null == e ? "" : String(e)
            }

            function rs(e, n) {
                throw new D(-201, !1)
            }

            function St(e, n) {
                null == e && function ee(e, n, t, r) {
                    throw new Error(`ASSERTION ERROR: ${e}` + (null == r ? "" : ` [Expected=> ${t} ${r} ${n} <=Actual]`))
                }(n, e, null, "!=")
            }

            function T(e) {
                return {
                    token: e.token,
                    providedIn: e.providedIn || null,
                    factory: e.factory,
                    value: void 0
                }
            }

            function Mt(e) {
                return {
                    providers: e.providers || [],
                    imports: e.imports || []
                }
            }

            function os(e) {
                return fh(e, is) || fh(e, ph)
            }

            function fh(e, n) {
                return e.hasOwnProperty(n) ? e[n] : null
            }

            function hh(e) {
                return e && (e.hasOwnProperty(Nl) || e.hasOwnProperty(IE)) ? e[Nl] : null
            }
            const is = oe({
                \u0275prov: oe
            }),
                Nl = oe({
                    \u0275inj: oe
                }),
                ph = oe({
                    ngInjectableDef: oe
                }),
                IE = oe({
                    ngInjectorDef: oe
                });
            var P = (() => ((P = P || {})[P.Default = 0] = "Default", P[P.Host = 1] = "Host", P[P.Self = 2] = "Self", P[P.SkipSelf = 4] = "SkipSelf", P[P.Optional = 8] = "Optional", P))();
            let Fl;

            function It(e) {
                const n = Fl;
                return Fl = e, n
            }

            function gh(e, n, t) {
                const r = os(e);
                return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : t & P.Optional ? null : void 0 !== n ? n : void rs(ae(e))
            }
            const fe = (() => typeof globalThis < "u" && globalThis || typeof global < "u" && global || typeof window < "u" && window || typeof self < "u" && typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && self)(),
                Fo = {},
                Pl = "__NG_DI_FLAG__",
                ss = "ngTempTokenPath",
                TE = "ngTokenPath",
                xE = /\n/gm,
                RE = "\u0275",
                mh = "__source";
            let Po;

            function Mr(e) {
                const n = Po;
                return Po = e, n
            }

            function OE(e, n = P.Default) {
                if (void 0 === Po) throw new D(-203, !1);
                return null === Po ? gh(e, void 0, n) : Po.get(e, n & P.Optional ? null : void 0, n)
            }

            function S(e, n = P.Default) {
                return (function AE() {
                    return Fl
                }() || OE)(F(e), n)
            }

            function W(e, n = P.Default) {
                return S(e, as(n))
            }

            function as(e) {
                return typeof e > "u" || "number" == typeof e ? e : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
            }

            function kl(e) {
                const n = [];
                for (let t = 0; t < e.length; t++) {
                    const r = F(e[t]);
                    if (Array.isArray(r)) {
                        if (0 === r.length) throw new D(900, !1);
                        let o, i = P.Default;
                        for (let s = 0; s < r.length; s++) {
                            const a = r[s],
                                l = NE(a);
                            "number" == typeof l ? -1 === l ? o = a.token : i |= l : o = a
                        }
                        n.push(S(o, i))
                    } else n.push(S(r))
                }
                return n
            }

            function ko(e, n) {
                return e[Pl] = n, e.prototype[Pl] = n, e
            }

            function NE(e) {
                return e[Pl]
            }

            function kn(e) {
                return {
                    toString: e
                }.toString()
            }
            var Zt = (() => ((Zt = Zt || {})[Zt.OnPush = 0] = "OnPush", Zt[Zt.Default = 1] = "Default", Zt))(),
                Yt = (() => {
                    return (e = Yt || (Yt = {}))[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", Yt;
                    var e
                })();
            const pn = {},
                Y = [],
                ls = oe({
                    \u0275cmp: oe
                }),
                Ll = oe({
                    \u0275dir: oe
                }),
                Vl = oe({
                    \u0275pipe: oe
                }),
                vh = oe({
                    \u0275mod: oe
                }),
                gn = oe({
                    \u0275fac: oe
                }),
                Lo = oe({
                    __NG_ELEMENT_ID__: oe
                });
            let kE = 0;

            function kt(e) {
                return kn(() => {
                    const t = !0 === e.standalone,
                        r = {},
                        o = {
                            type: e.type,
                            providersResolver: null,
                            decls: e.decls,
                            vars: e.vars,
                            factory: null,
                            template: e.template || null,
                            consts: e.consts || null,
                            ngContentSelectors: e.ngContentSelectors,
                            hostBindings: e.hostBindings || null,
                            hostVars: e.hostVars || 0,
                            hostAttrs: e.hostAttrs || null,
                            contentQueries: e.contentQueries || null,
                            declaredInputs: r,
                            inputs: null,
                            outputs: null,
                            exportAs: e.exportAs || null,
                            onPush: e.changeDetection === Zt.OnPush,
                            directiveDefs: null,
                            pipeDefs: null,
                            standalone: t,
                            dependencies: t && e.dependencies || null,
                            getStandaloneInjector: null,
                            selectors: e.selectors || Y,
                            viewQuery: e.viewQuery || null,
                            features: e.features || null,
                            data: e.data || {},
                            encapsulation: e.encapsulation || Yt.Emulated,
                            id: "c" + kE++,
                            styles: e.styles || Y,
                            _: null,
                            setInput: null,
                            schemas: e.schemas || null,
                            tView: null,
                            findHostDirectiveDefs: null,
                            hostDirectives: null
                        },
                        i = e.dependencies,
                        s = e.features;
                    return o.inputs = Dh(e.inputs, r), o.outputs = Dh(e.outputs), s && s.forEach(a => a(o)), o.directiveDefs = i ? () => ("function" == typeof i ? i() : i).map(_h).filter(Ch) : null, o.pipeDefs = i ? () => ("function" == typeof i ? i() : i).map(Ze).filter(Ch) : null, o
                })
            }

            function _h(e) {
                return te(e) || Ge(e)
            }

            function Ch(e) {
                return null !== e
            }

            function Lt(e) {
                return kn(() => ({
                    type: e.type,
                    bootstrap: e.bootstrap || Y,
                    declarations: e.declarations || Y,
                    imports: e.imports || Y,
                    exports: e.exports || Y,
                    transitiveCompileScopes: null,
                    schemas: e.schemas || null,
                    id: e.id || null
                }))
            }

            function Dh(e, n) {
                if (null == e) return pn;
                const t = {};
                for (const r in e)
                    if (e.hasOwnProperty(r)) {
                        let o = e[r],
                            i = o;
                        Array.isArray(o) && (i = o[1], o = o[0]), t[o] = r, n && (n[o] = i)
                    } return t
            }
            const L = kt;

            function st(e) {
                return {
                    type: e.type,
                    name: e.name,
                    factory: null,
                    pure: !1 !== e.pure,
                    standalone: !0 === e.standalone,
                    onDestroy: e.type.prototype.ngOnDestroy || null
                }
            }

            function te(e) {
                return e[ls] || null
            }

            function Ge(e) {
                return e[Ll] || null
            }

            function Ze(e) {
                return e[Vl] || null
            }

            function ht(e, n) {
                const t = e[vh] || null;
                if (!t && !0 === n) throw new Error(`Type ${ae(e)} does not have '\u0275mod' property.`);
                return t
            }
            const mn = 0,
                b = 1,
                H = 2,
                _e = 3,
                Vt = 4,
                nr = 5,
                ze = 6,
                Ar = 7,
                De = 8,
                us = 9,
                cs = 10,
                z = 11,
                jl = 12,
                Vo = 13,
                wh = 14,
                Tr = 15,
                We = 16,
                jo = 17,
                xr = 18,
                Qt = 19,
                Bo = 20,
                Eh = 21,
                he = 22,
                Bl = 1,
                bh = 2,
                ds = 7,
                fs = 8,
                Rr = 9,
                Ye = 10;

            function pt(e) {
                return Array.isArray(e) && "object" == typeof e[Bl]
            }

            function jt(e) {
                return Array.isArray(e) && !0 === e[Bl]
            }

            function $l(e) {
                return 0 != (4 & e.flags)
            }

            function $o(e) {
                return e.componentOffset > -1
            }

            function hs(e) {
                return 1 == (1 & e.flags)
            }

            function Bt(e) {
                return null !== e.template
            }

            function jE(e) {
                return 0 != (256 & e[H])
            }

            function rr(e, n) {
                return e.hasOwnProperty(gn) ? e[gn] : null
            }
            class UE {
                constructor(n, t, r) {
                    this.previousValue = n, this.currentValue = t, this.firstChange = r
                }
                isFirstChange() {
                    return this.firstChange
                }
            }

            function gt() {
                return Ih
            }

            function Ih(e) {
                return e.type.prototype.ngOnChanges && (e.setInput = GE), HE
            }

            function HE() {
                const e = Th(this),
                    n = e?.current;
                if (n) {
                    const t = e.previous;
                    if (t === pn) e.previous = n;
                    else
                        for (let r in n) t[r] = n[r];
                    e.current = null, this.ngOnChanges(n)
                }
            }

            function GE(e, n, t, r) {
                const o = this.declaredInputs[t],
                    i = Th(e) || function zE(e, n) {
                        return e[Ah] = n
                    }(e, {
                        previous: pn,
                        current: null
                    }),
                    s = i.current || (i.current = {}),
                    a = i.previous,
                    l = a[o];
                s[o] = new UE(l && l.currentValue, n, a === pn), e[r] = n
            }
            gt.ngInherit = !0;
            const Ah = "__ngSimpleChanges__";

            function Th(e) {
                return e[Ah] || null
            }
            const At = function (e, n, t) { };

            function je(e) {
                for (; Array.isArray(e);) e = e[mn];
                return e
            }

            function ps(e, n) {
                return je(n[e])
            }

            function mt(e, n) {
                return je(n[e.index])
            }

            function Oh(e, n) {
                return e.data[n]
            }

            function Or(e, n) {
                return e[n]
            }

            function yt(e, n) {
                const t = n[e];
                return pt(t) ? t : t[mn]
            }

            function gs(e) {
                return 64 == (64 & e[H])
            }

            function Ln(e, n) {
                return null == n ? null : e[n]
            }

            function Nh(e) {
                e[xr] = 0
            }

            function Hl(e, n) {
                e[nr] += n;
                let t = e,
                    r = e[_e];
                for (; null !== r && (1 === n && 1 === t[nr] || -1 === n && 0 === t[nr]);) r[nr] += n, t = r, r = r[_e]
            }
            const j = {
                lFrame: Hh(null),
                bindingsEnabled: !0
            };

            function Ph() {
                return j.bindingsEnabled
            }

            function _() {
                return j.lFrame.lView
            }

            function Z() {
                return j.lFrame.tView
            }

            function yn(e) {
                return j.lFrame.contextLView = e, e[De]
            }

            function vn(e) {
                return j.lFrame.contextLView = null, e
            }

            function Be() {
                let e = kh();
                for (; null !== e && 64 === e.type;) e = e.parent;
                return e
            }

            function kh() {
                return j.lFrame.currentTNode
            }

            function en(e, n) {
                const t = j.lFrame;
                t.currentTNode = e, t.isParent = n
            }

            function Gl() {
                return j.lFrame.isParent
            }

            function zl() {
                j.lFrame.isParent = !1
            }

            function Qe() {
                const e = j.lFrame;
                let n = e.bindingRootIndex;
                return -1 === n && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n
            }

            function Nr() {
                return j.lFrame.bindingIndex++
            }

            function ob(e, n) {
                const t = j.lFrame;
                t.bindingIndex = t.bindingRootIndex = e, Wl(n)
            }

            function Wl(e) {
                j.lFrame.currentDirectiveIndex = e
            }

            function Bh() {
                return j.lFrame.currentQueryIndex
            }

            function Jl(e) {
                j.lFrame.currentQueryIndex = e
            }

            function sb(e) {
                const n = e[b];
                return 2 === n.type ? n.declTNode : 1 === n.type ? e[ze] : null
            }

            function $h(e, n, t) {
                if (t & P.SkipSelf) {
                    let o = n,
                        i = e;
                    for (; !(o = o.parent, null !== o || t & P.Host || (o = sb(i), null === o || (i = i[Tr], 10 & o.type))););
                    if (null === o) return !1;
                    n = o, e = i
                }
                const r = j.lFrame = Uh();
                return r.currentTNode = n, r.lView = e, !0
            }

            function Xl(e) {
                const n = Uh(),
                    t = e[b];
                j.lFrame = n, n.currentTNode = t.firstChild, n.lView = e, n.tView = t, n.contextLView = e, n.bindingIndex = t.bindingStartIndex, n.inI18n = !1
            }

            function Uh() {
                const e = j.lFrame,
                    n = null === e ? null : e.child;
                return null === n ? Hh(e) : n
            }

            function Hh(e) {
                const n = {
                    currentTNode: null,
                    isParent: !0,
                    lView: null,
                    tView: null,
                    selectedIndex: -1,
                    contextLView: null,
                    elementDepthCount: 0,
                    currentNamespace: null,
                    currentDirectiveIndex: -1,
                    bindingRootIndex: -1,
                    bindingIndex: -1,
                    currentQueryIndex: 0,
                    parent: e,
                    child: null,
                    inI18n: !1
                };
                return null !== e && (e.child = n), n
            }

            function Gh() {
                const e = j.lFrame;
                return j.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
            }
            const zh = Gh;

            function Kl() {
                const e = Gh();
                e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
            }

            function et() {
                return j.lFrame.selectedIndex
            }

            function or(e) {
                j.lFrame.selectedIndex = e
            }

            function ge() {
                const e = j.lFrame;
                return Oh(e.tView, e.selectedIndex)
            }

            function ms(e, n) {
                for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
                    const i = e.data[t].type.prototype,
                        {
                            ngAfterContentInit: s,
                            ngAfterContentChecked: a,
                            ngAfterViewInit: l,
                            ngAfterViewChecked: u,
                            ngOnDestroy: c
                        } = i;
                    s && (e.contentHooks || (e.contentHooks = [])).push(-t, s), a && ((e.contentHooks || (e.contentHooks = [])).push(t, a), (e.contentCheckHooks || (e.contentCheckHooks = [])).push(t, a)), l && (e.viewHooks || (e.viewHooks = [])).push(-t, l), u && ((e.viewHooks || (e.viewHooks = [])).push(t, u), (e.viewCheckHooks || (e.viewCheckHooks = [])).push(t, u)), null != c && (e.destroyHooks || (e.destroyHooks = [])).push(t, c)
                }
            }

            function ys(e, n, t) {
                Wh(e, n, 3, t)
            }

            function vs(e, n, t, r) {
                (3 & e[H]) === t && Wh(e, n, t, r)
            }

            function Zl(e, n) {
                let t = e[H];
                (3 & t) === n && (t &= 2047, t += 1, e[H] = t)
            }

            function Wh(e, n, t, r) {
                const i = r ?? -1,
                    s = n.length - 1;
                let a = 0;
                for (let l = void 0 !== r ? 65535 & e[xr] : 0; l < s; l++)
                    if ("number" == typeof n[l + 1]) {
                        if (a = n[l], null != r && a >= r) break
                    } else n[l] < 0 && (e[xr] += 65536), (a < i || -1 == i) && (gb(e, t, n, l), e[xr] = (4294901760 & e[xr]) + l + 2), l++
            }

            function gb(e, n, t, r) {
                const o = t[r] < 0,
                    i = t[r + 1],
                    a = e[o ? -t[r] : t[r]];
                if (o) {
                    if (e[H] >> 11 < e[xr] >> 16 && (3 & e[H]) === n) {
                        e[H] += 2048, At(4, a, i);
                        try {
                            i.call(a)
                        } finally {
                            At(5, a, i)
                        }
                    }
                } else {
                    At(4, a, i);
                    try {
                        i.call(a)
                    } finally {
                        At(5, a, i)
                    }
                }
            }
            const Fr = -1;
            class Ho {
                constructor(n, t, r) {
                    this.factory = n, this.resolving = !1, this.canSeeViewProviders = t, this.injectImpl = r
                }
            }

            function Ql(e, n, t) {
                let r = 0;
                for (; r < t.length;) {
                    const o = t[r];
                    if ("number" == typeof o) {
                        if (0 !== o) break;
                        r++;
                        const i = t[r++],
                            s = t[r++],
                            a = t[r++];
                        e.setAttribute(n, s, a, i)
                    } else {
                        const i = o,
                            s = t[++r];
                        Jh(i) ? e.setProperty(n, i, s) : e.setAttribute(n, i, s), r++
                    }
                }
                return r
            }

            function qh(e) {
                return 3 === e || 4 === e || 6 === e
            }

            function Jh(e) {
                return 64 === e.charCodeAt(0)
            }

            function Go(e, n) {
                if (null !== n && 0 !== n.length)
                    if (null === e || 0 === e.length) e = n.slice();
                    else {
                        let t = -1;
                        for (let r = 0; r < n.length; r++) {
                            const o = n[r];
                            "number" == typeof o ? t = o : 0 === t || Xh(e, t, o, null, -1 === t || 2 === t ? n[++r] : null)
                        }
                    } return e
            }

            function Xh(e, n, t, r, o) {
                let i = 0,
                    s = e.length;
                if (-1 === n) s = -1;
                else
                    for (; i < e.length;) {
                        const a = e[i++];
                        if ("number" == typeof a) {
                            if (a === n) {
                                s = -1;
                                break
                            }
                            if (a > n) {
                                s = i - 1;
                                break
                            }
                        }
                    }
                for (; i < e.length;) {
                    const a = e[i];
                    if ("number" == typeof a) break;
                    if (a === t) {
                        if (null === r) return void (null !== o && (e[i + 1] = o));
                        if (r === e[i + 1]) return void (e[i + 2] = o)
                    }
                    i++, null !== r && i++, null !== o && i++
                } - 1 !== s && (e.splice(s, 0, n), i = s + 1), e.splice(i++, 0, t), null !== r && e.splice(i++, 0, r), null !== o && e.splice(i++, 0, o)
            }

            function Kh(e) {
                return e !== Fr
            }

            function _s(e) {
                return 32767 & e
            }

            function Cs(e, n) {
                let t = function _b(e) {
                    return e >> 16
                }(e),
                    r = n;
                for (; t > 0;) r = r[Tr], t--;
                return r
            }
            let eu = !0;

            function Ds(e) {
                const n = eu;
                return eu = e, n
            }
            const Zh = 255,
                Yh = 5;
            let Cb = 0;
            const tn = {};

            function ws(e, n) {
                const t = Qh(e, n);
                if (-1 !== t) return t;
                const r = n[b];
                r.firstCreatePass && (e.injectorIndex = n.length, tu(r.data, e), tu(n, null), tu(r.blueprint, null));
                const o = nu(e, n),
                    i = e.injectorIndex;
                if (Kh(o)) {
                    const s = _s(o),
                        a = Cs(o, n),
                        l = a[b].data;
                    for (let u = 0; u < 8; u++) n[i + u] = a[s + u] | l[s + u]
                }
                return n[i + 8] = o, i
            }

            function tu(e, n) {
                e.push(0, 0, 0, 0, 0, 0, 0, 0, n)
            }

            function Qh(e, n) {
                return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === n[e.injectorIndex + 8] ? -1 : e.injectorIndex
            }

            function nu(e, n) {
                if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
                let t = 0,
                    r = null,
                    o = n;
                for (; null !== o;) {
                    if (r = sp(o), null === r) return Fr;
                    if (t++, o = o[Tr], -1 !== r.injectorIndex) return r.injectorIndex | t << 16
                }
                return Fr
            }

            function ru(e, n, t) {
                ! function Db(e, n, t) {
                    let r;
                    "string" == typeof t ? r = t.charCodeAt(0) || 0 : t.hasOwnProperty(Lo) && (r = t[Lo]), null == r && (r = t[Lo] = Cb++);
                    const o = r & Zh;
                    n.data[e + (o >> Yh)] |= 1 << o
                }(e, n, t)
            }

            function ep(e, n, t) {
                if (t & P.Optional || void 0 !== e) return e;
                rs()
            }

            function tp(e, n, t, r) {
                if (t & P.Optional && void 0 === r && (r = null), !(t & (P.Self | P.Host))) {
                    const o = e[us],
                        i = It(void 0);
                    try {
                        return o ? o.get(n, r, t & P.Optional) : gh(n, r, t & P.Optional)
                    } finally {
                        It(i)
                    }
                }
                return ep(r, 0, t)
            }

            function np(e, n, t, r = P.Default, o) {
                if (null !== e) {
                    if (1024 & n[H]) {
                        const s = function Mb(e, n, t, r, o) {
                            let i = e,
                                s = n;
                            for (; null !== i && null !== s && 1024 & s[H] && !(256 & s[H]);) {
                                const a = rp(i, s, t, r | P.Self, tn);
                                if (a !== tn) return a;
                                let l = i.parent;
                                if (!l) {
                                    const u = s[Eh];
                                    if (u) {
                                        const c = u.get(t, tn, r);
                                        if (c !== tn) return c
                                    }
                                    l = sp(s), s = s[Tr]
                                }
                                i = l
                            }
                            return o
                        }(e, n, t, r, tn);
                        if (s !== tn) return s
                    }
                    const i = rp(e, n, t, r, tn);
                    if (i !== tn) return i
                }
                return tp(n, t, r, o)
            }

            function rp(e, n, t, r, o) {
                const i = function bb(e) {
                    if ("string" == typeof e) return e.charCodeAt(0) || 0;
                    const n = e.hasOwnProperty(Lo) ? e[Lo] : void 0;
                    return "number" == typeof n ? n >= 0 ? n & Zh : Sb : n
                }(t);
                if ("function" == typeof i) {
                    if (!$h(n, e, r)) return r & P.Host ? ep(o, 0, r) : tp(n, t, r, o);
                    try {
                        const s = i(r);
                        if (null != s || r & P.Optional) return s;
                        rs()
                    } finally {
                        zh()
                    }
                } else if ("number" == typeof i) {
                    let s = null,
                        a = Qh(e, n),
                        l = Fr,
                        u = r & P.Host ? n[We][ze] : null;
                    for ((-1 === a || r & P.SkipSelf) && (l = -1 === a ? nu(e, n) : n[a + 8], l !== Fr && ip(r, !1) ? (s = n[b], a = _s(l), n = Cs(l, n)) : a = -1); - 1 !== a;) {
                        const c = n[b];
                        if (op(i, a, c.data)) {
                            const d = Eb(a, n, t, s, r, u);
                            if (d !== tn) return d
                        }
                        l = n[a + 8], l !== Fr && ip(r, n[b].data[a + 8] === u) && op(i, a, n) ? (s = c, a = _s(l), n = Cs(l, n)) : a = -1
                    }
                }
                return o
            }

            function Eb(e, n, t, r, o, i) {
                const s = n[b],
                    a = s.data[e + 8],
                    c = Es(a, s, t, null == r ? $o(a) && eu : r != s && 0 != (3 & a.type), o & P.Host && i === a);
                return null !== c ? ir(n, s, c, a) : tn
            }

            function Es(e, n, t, r, o) {
                const i = e.providerIndexes,
                    s = n.data,
                    a = 1048575 & i,
                    l = e.directiveStart,
                    c = i >> 20,
                    f = o ? a + c : e.directiveEnd;
                for (let h = r ? a : a + c; h < f; h++) {
                    const p = s[h];
                    if (h < l && t === p || h >= l && p.type === t) return h
                }
                if (o) {
                    const h = s[l];
                    if (h && Bt(h) && h.type === t) return l
                }
                return null
            }

            function ir(e, n, t, r) {
                let o = e[t];
                const i = n.data;
                if (function mb(e) {
                    return e instanceof Ho
                }(o)) {
                    const s = o;
                    s.resolving && function _E(e, n) {
                        const t = n ? `. Dependency path: ${n.join(" > ")} > ${e}` : "";
                        throw new D(-200, `Circular dependency in DI detected for ${e}${t}`)
                    }(function Q(e) {
                        return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : V(e)
                    }(i[t]));
                    const a = Ds(s.canSeeViewProviders);
                    s.resolving = !0;
                    const l = s.injectImpl ? It(s.injectImpl) : null;
                    $h(e, r, P.Default);
                    try {
                        o = e[t] = s.factory(void 0, i, e, r), n.firstCreatePass && t >= r.directiveStart && function pb(e, n, t) {
                            const {
                                ngOnChanges: r,
                                ngOnInit: o,
                                ngDoCheck: i
                            } = n.type.prototype;
                            if (r) {
                                const s = Ih(n);
                                (t.preOrderHooks || (t.preOrderHooks = [])).push(e, s), (t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(e, s)
                            }
                            o && (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - e, o), i && ((t.preOrderHooks || (t.preOrderHooks = [])).push(e, i), (t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(e, i))
                        }(t, i[t], n)
                    } finally {
                        null !== l && It(l), Ds(a), s.resolving = !1, zh()
                    }
                }
                return o
            }

            function op(e, n, t) {
                return !!(t[n + (e >> Yh)] & 1 << e)
            }

            function ip(e, n) {
                return !(e & P.Self || e & P.Host && n)
            }
            class Pr {
                constructor(n, t) {
                    this._tNode = n, this._lView = t
                }
                get(n, t, r) {
                    return np(this._tNode, this._lView, n, as(r), t)
                }
            }

            function Sb() {
                return new Pr(Be(), _())
            }

            function $e(e) {
                return kn(() => {
                    const n = e.prototype.constructor,
                        t = n[gn] || ou(n),
                        r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r;) {
                        const i = o[gn] || ou(o);
                        if (i && i !== t) return i;
                        o = Object.getPrototypeOf(o)
                    }
                    return i => new i
                })
            }

            function ou(e) {
                return Rl(e) ? () => {
                    const n = ou(F(e));
                    return n && n()
                } : rr(e)
            }

            function sp(e) {
                const n = e[b],
                    t = n.type;
                return 2 === t ? n.declTNode : 1 === t ? e[ze] : null
            }
            const Lr = "__parameters__";

            function jr(e, n, t) {
                return kn(() => {
                    const r = function iu(e) {
                        return function (...t) {
                            if (e) {
                                const r = e(...t);
                                for (const o in r) this[o] = r[o]
                            }
                        }
                    }(n);

                    function o(...i) {
                        if (this instanceof o) return r.apply(this, i), this;
                        const s = new o(...i);
                        return a.annotation = s, a;

                        function a(l, u, c) {
                            const d = l.hasOwnProperty(Lr) ? l[Lr] : Object.defineProperty(l, Lr, {
                                value: []
                            })[Lr];
                            for (; d.length <= c;) d.push(null);
                            return (d[c] = d[c] || []).push(s), l
                        }
                    }
                    return t && (o.prototype = Object.create(t.prototype)), o.prototype.ngMetadataName = e, o.annotationCls = o, o
                })
            }
            class M {
                constructor(n, t) {
                    this._desc = n, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.\u0275prov = T({
                        token: this,
                        providedIn: t.providedIn || "root",
                        factory: t.factory
                    }))
                }
                get multi() {
                    return this
                }
                toString() {
                    return `InjectionToken ${this._desc}`
                }
            }

            function sr(e, n) {
                e.forEach(t => Array.isArray(t) ? sr(t, n) : n(t))
            }

            function lp(e, n, t) {
                n >= e.length ? e.push(t) : e.splice(n, 0, t)
            }

            function Ss(e, n) {
                return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0]
            }

            function vt(e, n, t) {
                let r = Br(e, n);
                return r >= 0 ? e[1 | r] = t : (r = ~r, function xb(e, n, t, r) {
                    let o = e.length;
                    if (o == n) e.push(t, r);
                    else if (1 === o) e.push(r, e[0]), e[0] = t;
                    else {
                        for (o--, e.push(e[o - 1], e[o]); o > n;) e[o] = e[o - 2], o--;
                        e[n] = t, e[n + 1] = r
                    }
                }(e, r, n, t)), r
            }

            function au(e, n) {
                const t = Br(e, n);
                if (t >= 0) return e[1 | t]
            }

            function Br(e, n) {
                return function up(e, n, t) {
                    let r = 0,
                        o = e.length >> t;
                    for (; o !== r;) {
                        const i = r + (o - r >> 1),
                            s = e[i << t];
                        if (n === s) return i << t;
                        s > n ? o = i : r = i + 1
                    }
                    return ~(o << t)
                }(e, n, 1)
            }
            const Jo = ko(jr("Optional"), 8),
                Xo = ko(jr("SkipSelf"), 4);
            var at = (() => ((at = at || {})[at.Important = 1] = "Important", at[at.DashCase = 2] = "DashCase", at))();
            const hu = new Map;
            let Yb = 0;
            const gu = "__ngContext__";

            function qe(e, n) {
                pt(n) ? (e[gu] = n[Bo], function e0(e) {
                    hu.set(e[Bo], e)
                }(n)) : e[gu] = n
            }
            let mu;

            function yu(e, n) {
                return mu(e, n)
            }

            function Qo(e) {
                const n = e[_e];
                return jt(n) ? n[_e] : n
            }

            function vu(e) {
                return Tp(e[Vo])
            }

            function _u(e) {
                return Tp(e[Vt])
            }

            function Tp(e) {
                for (; null !== e && !jt(e);) e = e[Vt];
                return e
            }

            function Ur(e, n, t, r, o) {
                if (null != r) {
                    let i, s = !1;
                    jt(r) ? i = r : pt(r) && (s = !0, r = r[mn]);
                    const a = je(r);
                    0 === e && null !== t ? null == o ? Pp(n, t, a) : ar(n, t, a, o || null, !0) : 1 === e && null !== t ? ar(n, t, a, o || null, !0) : 2 === e ? function Mu(e, n, t) {
                        const r = Ts(e, n);
                        r && function D0(e, n, t, r) {
                            e.removeChild(n, t, r)
                        }(e, r, n, t)
                    }(n, a, s) : 3 === e && n.destroyNode(a), null != i && function b0(e, n, t, r, o) {
                        const i = t[ds];
                        i !== je(t) && Ur(n, e, r, i, o);
                        for (let a = Ye; a < t.length; a++) {
                            const l = t[a];
                            ei(l[b], l, e, n, r, i)
                        }
                    }(n, e, i, t, o)
                }
            }

            function Du(e, n, t) {
                return e.createElement(n, t)
            }

            function Rp(e, n) {
                const t = e[Rr],
                    r = t.indexOf(n),
                    o = n[_e];
                512 & n[H] && (n[H] &= -513, Hl(o, -1)), t.splice(r, 1)
            }

            function wu(e, n) {
                if (e.length <= Ye) return;
                const t = Ye + n,
                    r = e[t];
                if (r) {
                    const o = r[jo];
                    null !== o && o !== e && Rp(o, r), n > 0 && (e[t - 1][Vt] = r[Vt]);
                    const i = Ss(e, Ye + n);
                    ! function h0(e, n) {
                        ei(e, n, n[z], 2, null, null), n[mn] = null, n[ze] = null
                    }(r[b], r);
                    const s = i[Qt];
                    null !== s && s.detachView(i[b]), r[_e] = null, r[Vt] = null, r[H] &= -65
                }
                return r
            }

            function Op(e, n) {
                if (!(128 & n[H])) {
                    const t = n[z];
                    t.destroyNode && ei(e, n, t, 3, null, null),
                        function m0(e) {
                            let n = e[Vo];
                            if (!n) return Eu(e[b], e);
                            for (; n;) {
                                let t = null;
                                if (pt(n)) t = n[Vo];
                                else {
                                    const r = n[Ye];
                                    r && (t = r)
                                }
                                if (!t) {
                                    for (; n && !n[Vt] && n !== e;) pt(n) && Eu(n[b], n), n = n[_e];
                                    null === n && (n = e), pt(n) && Eu(n[b], n), t = n && n[Vt]
                                }
                                n = t
                            }
                        }(n)
                }
            }

            function Eu(e, n) {
                if (!(128 & n[H])) {
                    n[H] &= -65, n[H] |= 128,
                        function C0(e, n) {
                            let t;
                            if (null != e && null != (t = e.destroyHooks))
                                for (let r = 0; r < t.length; r += 2) {
                                    const o = n[t[r]];
                                    if (!(o instanceof Ho)) {
                                        const i = t[r + 1];
                                        if (Array.isArray(i))
                                            for (let s = 0; s < i.length; s += 2) {
                                                const a = o[i[s]],
                                                    l = i[s + 1];
                                                At(4, a, l);
                                                try {
                                                    l.call(a)
                                                } finally {
                                                    At(5, a, l)
                                                }
                                            } else {
                                            At(4, o, i);
                                            try {
                                                i.call(o)
                                            } finally {
                                                At(5, o, i)
                                            }
                                        }
                                    }
                                }
                        }(e, n),
                        function _0(e, n) {
                            const t = e.cleanup,
                                r = n[Ar];
                            let o = -1;
                            if (null !== t)
                                for (let i = 0; i < t.length - 1; i += 2)
                                    if ("string" == typeof t[i]) {
                                        const s = t[i + 3];
                                        s >= 0 ? r[o = s]() : r[o = -s].unsubscribe(), i += 2
                                    } else {
                                        const s = r[o = t[i + 1]];
                                        t[i].call(s)
                                    } if (null !== r) {
                                        for (let i = o + 1; i < r.length; i++)(0, r[i])();
                                        n[Ar] = null
                                    }
                        }(e, n), 1 === n[b].type && n[z].destroy();
                    const t = n[jo];
                    if (null !== t && jt(n[_e])) {
                        t !== n[_e] && Rp(t, n);
                        const r = n[Qt];
                        null !== r && r.detachView(e)
                    } ! function t0(e) {
                        hu.delete(e[Bo])
                    }(n)
                }
            }

            function Np(e, n, t) {
                return function Fp(e, n, t) {
                    let r = n;
                    for (; null !== r && 40 & r.type;) r = (n = r).parent;
                    if (null === r) return t[mn];
                    {
                        const {
                            componentOffset: o
                        } = r;
                        if (o > -1) {
                            const {
                                encapsulation: i
                            } = e.data[r.directiveStart + o];
                            if (i === Yt.None || i === Yt.Emulated) return null
                        }
                        return mt(r, t)
                    }
                }(e, n.parent, t)
            }

            function ar(e, n, t, r, o) {
                e.insertBefore(n, t, r, o)
            }

            function Pp(e, n, t) {
                e.appendChild(n, t)
            }

            function kp(e, n, t, r, o) {
                null !== r ? ar(e, n, t, r, o) : Pp(e, n, t)
            }

            function Ts(e, n) {
                return e.parentNode(n)
            }
            let bu, Tu, Ns, jp = function Vp(e, n, t) {
                return 40 & e.type ? mt(e, t) : null
            };

            function xs(e, n, t, r) {
                const o = Np(e, r, n),
                    i = n[z],
                    a = function Lp(e, n, t) {
                        return jp(e, n, t)
                    }(r.parent || n[ze], r, n);
                if (null != o)
                    if (Array.isArray(t))
                        for (let l = 0; l < t.length; l++) kp(i, o, t[l], a, !1);
                    else kp(i, o, t, a, !1);
                void 0 !== bu && bu(i, r, n, t, o)
            }

            function Rs(e, n) {
                if (null !== n) {
                    const t = n.type;
                    if (3 & t) return mt(n, e);
                    if (4 & t) return Su(-1, e[n.index]);
                    if (8 & t) {
                        const r = n.child;
                        if (null !== r) return Rs(e, r);
                        {
                            const o = e[n.index];
                            return jt(o) ? Su(-1, o) : je(o)
                        }
                    }
                    if (32 & t) return yu(n, e)() || je(e[n.index]);
                    {
                        const r = $p(e, n);
                        return null !== r ? Array.isArray(r) ? r[0] : Rs(Qo(e[We]), r) : Rs(e, n.next)
                    }
                }
                return null
            }

            function $p(e, n) {
                return null !== n ? e[We][ze].projection[n.projection] : null
            }

            function Su(e, n) {
                const t = Ye + e + 1;
                if (t < n.length) {
                    const r = n[t],
                        o = r[b].firstChild;
                    if (null !== o) return Rs(r, o)
                }
                return n[ds]
            }

            function Iu(e, n, t, r, o, i, s) {
                for (; null != t;) {
                    const a = r[t.index],
                        l = t.type;
                    if (s && 0 === n && (a && qe(je(a), r), t.flags |= 2), 32 != (32 & t.flags))
                        if (8 & l) Iu(e, n, t.child, r, o, i, !1), Ur(n, e, o, a, i);
                        else if (32 & l) {
                            const u = yu(t, r);
                            let c;
                            for (; c = u();) Ur(n, e, o, c, i);
                            Ur(n, e, o, a, i)
                        } else 16 & l ? Up(e, n, r, t, o, i) : Ur(n, e, o, a, i);
                    t = s ? t.projectionNext : t.next
                }
            }

            function ei(e, n, t, r, o, i) {
                Iu(t, r, e.firstChild, n, o, i, !1)
            }

            function Up(e, n, t, r, o, i) {
                const s = t[We],
                    l = s[ze].projection[r.projection];
                if (Array.isArray(l))
                    for (let u = 0; u < l.length; u++) Ur(n, e, o, l[u], i);
                else Iu(e, n, l, s[_e], o, i, !0)
            }

            function Hp(e, n, t) {
                "" === t ? e.removeAttribute(n, "class") : e.setAttribute(n, "class", t)
            }

            function Gp(e, n, t) {
                const {
                    mergedAttrs: r,
                    classes: o,
                    styles: i
                } = t;
                null !== r && Ql(e, n, r), null !== o && Hp(e, n, o), null !== i && function M0(e, n, t) {
                    e.setAttribute(n, "style", t)
                }(e, n, i)
            }

            function Jp(e) {
                return function xu() {
                    if (void 0 === Ns && (Ns = null, fe.trustedTypes)) try {
                        Ns = fe.trustedTypes.createPolicy("angular#unsafe-bypass", {
                            createHTML: e => e,
                            createScript: e => e,
                            createScriptURL: e => e
                        })
                    } catch { }
                    return Ns
                }()?.createScriptURL(e) || e
            }
            class Xp {
                constructor(n) {
                    this.changingThisBreaksApplicationSecurity = n
                }
                toString() {
                    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${dh})`
                }
            }

            function Vn(e) {
                return e instanceof Xp ? e.changingThisBreaksApplicationSecurity : e
            }

            function ti(e, n) {
                const t = function k0(e) {
                    return e instanceof Xp && e.getTypeName() || null
                }(e);
                if (null != t && t !== n) {
                    if ("ResourceURL" === t && "URL" === n) return !0;
                    throw new Error(`Required a safe ${n}, got a ${t} (see ${dh})`)
                }
                return t === n
            }
            const B0 = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
            var Te = (() => ((Te = Te || {})[Te.NONE = 0] = "NONE", Te[Te.HTML = 1] = "HTML", Te[Te.STYLE = 2] = "STYLE", Te[Te.SCRIPT = 3] = "SCRIPT", Te[Te.URL = 4] = "URL", Te[Te.RESOURCE_URL = 5] = "RESOURCE_URL", Te))();

            function ng(e) {
                const n = ri();
                return n ? n.sanitize(Te.URL, e) || "" : ti(e, "URL") ? Vn(e) : function Ru(e) {
                    return (e = String(e)).match(B0) ? e : "unsafe:" + e
                }(V(e))
            }

            function rg(e) {
                const n = ri();
                if (n) return Jp(n.sanitize(Te.RESOURCE_URL, e) || "");
                if (ti(e, "ResourceURL")) return Jp(Vn(e));
                throw new D(904, !1)
            }

            function ri() {
                const e = _();
                return e && e[jl]
            }
            const Ps = new M("ENVIRONMENT_INITIALIZER"),
                ig = new M("INJECTOR", -1),
                sg = new M("INJECTOR_DEF_TYPES");
            class ag {
                get(n, t = Fo) {
                    if (t === Fo) {
                        const r = new Error(`NullInjectorError: No provider for ${ae(n)}!`);
                        throw r.name = "NullInjectorError", r
                    }
                    return t
                }
            }

            function eS(...e) {
                return {
                    \u0275providers: lg(0, e),
                    \u0275fromNgModule: !0
                }
            }

            function lg(e, ...n) {
                const t = [],
                    r = new Set;
                let o;
                return sr(n, i => {
                    const s = i;
                    Pu(s, t, [], r) && (o || (o = []), o.push(s))
                }), void 0 !== o && ug(o, t), t
            }

            function ug(e, n) {
                for (let t = 0; t < e.length; t++) {
                    const {
                        providers: o
                    } = e[t];
                    ku(o, i => {
                        n.push(i)
                    })
                }
            }

            function Pu(e, n, t, r) {
                if (!(e = F(e))) return !1;
                let o = null,
                    i = hh(e);
                const s = !i && te(e);
                if (i || s) {
                    if (s && !s.standalone) return !1;
                    o = e
                } else {
                    const l = e.ngModule;
                    if (i = hh(l), !i) return !1;
                    o = l
                }
                const a = r.has(o);
                if (s) {
                    if (a) return !1;
                    if (r.add(o), s.dependencies) {
                        const l = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                        for (const u of l) Pu(u, n, t, r)
                    }
                } else {
                    if (!i) return !1;
                    {
                        if (null != i.imports && !a) {
                            let u;
                            r.add(o);
                            try {
                                sr(i.imports, c => {
                                    Pu(c, n, t, r) && (u || (u = []), u.push(c))
                                })
                            } finally { }
                            void 0 !== u && ug(u, n)
                        }
                        if (!a) {
                            const u = rr(o) || (() => new o);
                            n.push({
                                provide: o,
                                useFactory: u,
                                deps: Y
                            }, {
                                provide: sg,
                                useValue: o,
                                multi: !0
                            }, {
                                provide: Ps,
                                useValue: () => S(o),
                                multi: !0
                            })
                        }
                        const l = i.providers;
                        null == l || a || ku(l, c => {
                            n.push(c)
                        })
                    }
                }
                return o !== e && void 0 !== e.providers
            }

            function ku(e, n) {
                for (let t of e) Ol(t) && (t = t.\u0275providers), Array.isArray(t) ? ku(t, n) : n(t)
            }
            const tS = oe({
                provide: String,
                useValue: oe
            });

            function Lu(e) {
                return null !== e && "object" == typeof e && tS in e
            }

            function lr(e) {
                return "function" == typeof e
            }
            const Vu = new M("Set Injector scope."),
                ks = {},
                rS = {};
            let ju;

            function Ls() {
                return void 0 === ju && (ju = new ag), ju
            }
            class nn { }
            class fg extends nn {
                get destroyed() {
                    return this._destroyed
                }
                constructor(n, t, r, o) {
                    super(), this.parent = t, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, $u(n, s => this.processProvider(s)), this.records.set(ig, Gr(void 0, this)), o.has("environment") && this.records.set(nn, Gr(void 0, this));
                    const i = this.records.get(Vu);
                    null != i && "string" == typeof i.value && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(sg.multi, Y, P.Self))
                }
                destroy() {
                    this.assertNotDestroyed(), this._destroyed = !0;
                    try {
                        for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
                        for (const n of this._onDestroyHooks) n()
                    } finally {
                        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), this._onDestroyHooks.length = 0
                    }
                }
                onDestroy(n) {
                    this._onDestroyHooks.push(n)
                }
                runInContext(n) {
                    this.assertNotDestroyed();
                    const t = Mr(this),
                        r = It(void 0);
                    try {
                        return n()
                    } finally {
                        Mr(t), It(r)
                    }
                }
                get(n, t = Fo, r = P.Default) {
                    this.assertNotDestroyed(), r = as(r);
                    const o = Mr(this),
                        i = It(void 0);
                    try {
                        if (!(r & P.SkipSelf)) {
                            let a = this.records.get(n);
                            if (void 0 === a) {
                                const l = function lS(e) {
                                    return "function" == typeof e || "object" == typeof e && e instanceof M
                                }(n) && os(n);
                                a = l && this.injectableDefInScope(l) ? Gr(Bu(n), ks) : null, this.records.set(n, a)
                            }
                            if (null != a) return this.hydrate(n, a)
                        }
                        return (r & P.Self ? Ls() : this.parent).get(n, t = r & P.Optional && t === Fo ? null : t)
                    } catch (s) {
                        if ("NullInjectorError" === s.name) {
                            if ((s[ss] = s[ss] || []).unshift(ae(n)), o) throw s;
                            return function FE(e, n, t, r) {
                                const o = e[ss];
                                throw n[mh] && o.unshift(n[mh]), e.message = function PE(e, n, t, r = null) {
                                    e = e && "\n" === e.charAt(0) && e.charAt(1) == RE ? e.slice(2) : e;
                                    let o = ae(n);
                                    if (Array.isArray(n)) o = n.map(ae).join(" -> ");
                                    else if ("object" == typeof n) {
                                        let i = [];
                                        for (let s in n)
                                            if (n.hasOwnProperty(s)) {
                                                let a = n[s];
                                                i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : ae(a)))
                                            } o = `{${i.join(", ")}}`
                                    }
                                    return `${t}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(xE, "\n  ")}`
                                }("\n" + e.message, o, t, r), e[TE] = o, e[ss] = null, e
                            }(s, n, "R3InjectorError", this.source)
                        }
                        throw s
                    } finally {
                        It(i), Mr(o)
                    }
                }
                resolveInjectorInitializers() {
                    const n = Mr(this),
                        t = It(void 0);
                    try {
                        const r = this.get(Ps.multi, Y, P.Self);
                        for (const o of r) o()
                    } finally {
                        Mr(n), It(t)
                    }
                }
                toString() {
                    const n = [],
                        t = this.records;
                    for (const r of t.keys()) n.push(ae(r));
                    return `R3Injector[${n.join(", ")}]`
                }
                assertNotDestroyed() {
                    if (this._destroyed) throw new D(205, !1)
                }
                processProvider(n) {
                    let t = lr(n = F(n)) ? n : F(n && n.provide);
                    const r = function iS(e) {
                        return Lu(e) ? Gr(void 0, e.useValue) : Gr(hg(e), ks)
                    }(n);
                    if (lr(n) || !0 !== n.multi) this.records.get(t);
                    else {
                        let o = this.records.get(t);
                        o || (o = Gr(void 0, ks, !0), o.factory = () => kl(o.multi), this.records.set(t, o)), t = n, o.multi.push(n)
                    }
                    this.records.set(t, r)
                }
                hydrate(n, t) {
                    return t.value === ks && (t.value = rS, t.value = t.factory()), "object" == typeof t.value && t.value && function aS(e) {
                        return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                    }(t.value) && this._ngOnDestroyHooks.add(t.value), t.value
                }
                injectableDefInScope(n) {
                    if (!n.providedIn) return !1;
                    const t = F(n.providedIn);
                    return "string" == typeof t ? "any" === t || this.scopes.has(t) : this.injectorDefTypes.has(t)
                }
            }

            function Bu(e) {
                const n = os(e),
                    t = null !== n ? n.factory : rr(e);
                if (null !== t) return t;
                if (e instanceof M) throw new D(204, !1);
                if (e instanceof Function) return function oS(e) {
                    const n = e.length;
                    if (n > 0) throw function qo(e, n) {
                        const t = [];
                        for (let r = 0; r < e; r++) t.push(n);
                        return t
                    }(n, "?"), new D(204, !1);
                    const t = function SE(e) {
                        const n = e && (e[is] || e[ph]);
                        return n ? (function ME(e) {
                            if (e.hasOwnProperty("name")) return e.name;
                            ("" + e).match(/^function\s*([^\s(]+)/)
                        }(e), n) : null
                    }(e);
                    return null !== t ? () => t.factory(e) : () => new e
                }(e);
                throw new D(204, !1)
            }

            function hg(e, n, t) {
                let r;
                if (lr(e)) {
                    const o = F(e);
                    return rr(o) || Bu(o)
                }
                if (Lu(e)) r = () => F(e.useValue);
                else if (function dg(e) {
                    return !(!e || !e.useFactory)
                }(e)) r = () => e.useFactory(...kl(e.deps || []));
                else if (function cg(e) {
                    return !(!e || !e.useExisting)
                }(e)) r = () => S(F(e.useExisting));
                else {
                    const o = F(e && (e.useClass || e.provide));
                    if (! function sS(e) {
                        return !!e.deps
                    }(e)) return rr(o) || Bu(o);
                    r = () => new o(...kl(e.deps))
                }
                return r
            }

            function Gr(e, n, t = !1) {
                return {
                    factory: e,
                    value: n,
                    multi: t ? [] : void 0
                }
            }

            function $u(e, n) {
                for (const t of e) Array.isArray(t) ? $u(t, n) : t && Ol(t) ? $u(t.\u0275providers, n) : n(t)
            }
            class uS { }
            class pg { }
            class dS {
                resolveComponentFactory(n) {
                    throw function cS(e) {
                        const n = Error(`No component factory found for ${ae(e)}. Did you add it to @NgModule.entryComponents?`);
                        return n.ngComponent = e, n
                    }(n)
                }
            }
            let oi = (() => {
                class e { }
                return e.NULL = new dS, e
            })();

            function fS() {
                return zr(Be(), _())
            }

            function zr(e, n) {
                return new _t(mt(e, n))
            }
            let _t = (() => {
                class e {
                    constructor(t) {
                        this.nativeElement = t
                    }
                }
                return e.__NG_ELEMENT_ID__ = fS, e
            })();

            function hS(e) {
                return e instanceof _t ? e.nativeElement : e
            }
            class mg { }
            let wn = (() => {
                class e { }
                return e.__NG_ELEMENT_ID__ = () => function pS() {
                    const e = _(),
                        t = yt(Be().index, e);
                    return (pt(t) ? t : e)[z]
                }(), e
            })(),
                gS = (() => {
                    class e { }
                    return e.\u0275prov = T({
                        token: e,
                        providedIn: "root",
                        factory: () => null
                    }), e
                })();
            class ii {
                constructor(n) {
                    this.full = n, this.major = n.split(".")[0], this.minor = n.split(".")[1], this.patch = n.split(".").slice(2).join(".")
                }
            }
            const mS = new ii("15.2.2"),
                Uu = {},
                Hu = "ngOriginalError";

            function Gu(e) {
                return e[Hu]
            }
            class Wr {
                constructor() {
                    this._console = console
                }
                handleError(n) {
                    const t = this._findOriginalError(n);
                    this._console.error("ERROR", n), t && this._console.error("ORIGINAL ERROR", t)
                }
                _findOriginalError(n) {
                    let t = n && Gu(n);
                    for (; t && Gu(t);) t = Gu(t);
                    return t || null
                }
            }

            function En(e) {
                return e instanceof Function ? e() : e
            }

            function vg(e, n, t) {
                let r = e.length;
                for (; ;) {
                    const o = e.indexOf(n, t);
                    if (-1 === o) return o;
                    if (0 === o || e.charCodeAt(o - 1) <= 32) {
                        const i = n.length;
                        if (o + i === r || e.charCodeAt(o + i) <= 32) return o
                    }
                    t = o + 1
                }
            }
            const _g = "ng-template";

            function IS(e, n, t) {
                let r = 0;
                for (; r < e.length;) {
                    let o = e[r++];
                    if (t && "class" === o) {
                        if (o = e[r], -1 !== vg(o.toLowerCase(), n, 0)) return !0
                    } else if (1 === o) {
                        for (; r < e.length && "string" == typeof (o = e[r++]);)
                            if (o.toLowerCase() === n) return !0;
                        return !1
                    }
                }
                return !1
            }

            function Cg(e) {
                return 4 === e.type && e.value !== _g
            }

            function AS(e, n, t) {
                return n === (4 !== e.type || t ? e.value : _g)
            }

            function TS(e, n, t) {
                let r = 4;
                const o = e.attrs || [],
                    i = function OS(e) {
                        for (let n = 0; n < e.length; n++)
                            if (qh(e[n])) return n;
                        return e.length
                    }(o);
                let s = !1;
                for (let a = 0; a < n.length; a++) {
                    const l = n[a];
                    if ("number" != typeof l) {
                        if (!s)
                            if (4 & r) {
                                if (r = 2 | 1 & r, "" !== l && !AS(e, l, t) || "" === l && 1 === n.length) {
                                    if ($t(r)) return !1;
                                    s = !0
                                }
                            } else {
                                const u = 8 & r ? l : n[++a];
                                if (8 & r && null !== e.attrs) {
                                    if (!IS(e.attrs, u, t)) {
                                        if ($t(r)) return !1;
                                        s = !0
                                    }
                                    continue
                                }
                                const d = xS(8 & r ? "class" : l, o, Cg(e), t);
                                if (-1 === d) {
                                    if ($t(r)) return !1;
                                    s = !0;
                                    continue
                                }
                                if ("" !== u) {
                                    let f;
                                    f = d > i ? "" : o[d + 1].toLowerCase();
                                    const h = 8 & r ? f : null;
                                    if (h && -1 !== vg(h, u, 0) || 2 & r && u !== f) {
                                        if ($t(r)) return !1;
                                        s = !0
                                    }
                                }
                            }
                    } else {
                        if (!s && !$t(r) && !$t(l)) return !1;
                        if (s && $t(l)) continue;
                        s = !1, r = l | 1 & r
                    }
                }
                return $t(r) || s
            }

            function $t(e) {
                return 0 == (1 & e)
            }

            function xS(e, n, t, r) {
                if (null === n) return -1;
                let o = 0;
                if (r || !t) {
                    let i = !1;
                    for (; o < n.length;) {
                        const s = n[o];
                        if (s === e) return o;
                        if (3 === s || 6 === s) i = !0;
                        else {
                            if (1 === s || 2 === s) {
                                let a = n[++o];
                                for (;
                                    "string" == typeof a;) a = n[++o];
                                continue
                            }
                            if (4 === s) break;
                            if (0 === s) {
                                o += 4;
                                continue
                            }
                        }
                        o += i ? 1 : 2
                    }
                    return -1
                }
                return function NS(e, n) {
                    let t = e.indexOf(4);
                    if (t > -1)
                        for (t++; t < e.length;) {
                            const r = e[t];
                            if ("number" == typeof r) return -1;
                            if (r === n) return t;
                            t++
                        }
                    return -1
                }(n, e)
            }

            function Dg(e, n, t = !1) {
                for (let r = 0; r < n.length; r++)
                    if (TS(e, n[r], t)) return !0;
                return !1
            }

            function wg(e, n) {
                return e ? ":not(" + n.trim() + ")" : n
            }

            function PS(e) {
                let n = e[0],
                    t = 1,
                    r = 2,
                    o = "",
                    i = !1;
                for (; t < e.length;) {
                    let s = e[t];
                    if ("string" == typeof s)
                        if (2 & r) {
                            const a = e[++t];
                            o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                        } else 8 & r ? o += "." + s : 4 & r && (o += " " + s);
                    else "" !== o && !$t(s) && (n += wg(i, o), o = ""), r = s, i = i || !$t(r);
                    t++
                }
                return "" !== o && (n += wg(i, o)), n
            }
            const B = {};

            function x(e) {
                Eg(Z(), _(), et() + e, !1)
            }

            function Eg(e, n, t, r) {
                if (!r)
                    if (3 == (3 & n[H])) {
                        const i = e.preOrderCheckHooks;
                        null !== i && ys(n, i, t)
                    } else {
                        const i = e.preOrderHooks;
                        null !== i && vs(n, i, 0, t)
                    } or(t)
            }

            function Ig(e, n = null, t = null, r) {
                const o = Ag(e, n, t, r);
                return o.resolveInjectorInitializers(), o
            }

            function Ag(e, n = null, t = null, r, o = new Set) {
                const i = [t || Y, eS(e)];
                return r = r || ("object" == typeof e ? void 0 : ae(e)), new fg(i, n || Ls(), r || null, o)
            }
            let Ut = (() => {
                class e {
                    static create(t, r) {
                        if (Array.isArray(t)) return Ig({
                            name: ""
                        }, r, t, "");
                        {
                            const o = t.name ?? "";
                            return Ig({
                                name: o
                            }, t.parent, t.providers, o)
                        }
                    }
                }
                return e.THROW_IF_NOT_FOUND = Fo, e.NULL = new ag, e.\u0275prov = T({
                    token: e,
                    providedIn: "any",
                    factory: () => S(ig)
                }), e.__NG_ELEMENT_ID__ = -1, e
            })();

            function C(e, n = P.Default) {
                const t = _();
                return null === t ? S(e, n) : np(Be(), t, F(e), n)
            }

            function kg(e, n) {
                const t = e.contentQueries;
                if (null !== t)
                    for (let r = 0; r < t.length; r += 2) {
                        const i = t[r + 1];
                        if (-1 !== i) {
                            const s = e.data[i];
                            Jl(t[r]), s.contentQueries(2, n[i], i)
                        }
                    }
            }

            function js(e, n, t, r, o, i, s, a, l, u, c) {
                const d = n.blueprint.slice();
                return d[mn] = o, d[H] = 76 | r, (null !== c || e && 1024 & e[H]) && (d[H] |= 1024), Nh(d), d[_e] = d[Tr] = e, d[De] = t, d[cs] = s || e && e[cs], d[z] = a || e && e[z], d[jl] = l || e && e[jl] || null, d[us] = u || e && e[us] || null, d[ze] = i, d[Bo] = function Qb() {
                    return Yb++
                }(), d[Eh] = c, d[We] = 2 == n.type ? e[We] : d, d
            }

            function Xr(e, n, t, r, o) {
                let i = e.data[n];
                if (null === i) i = function Xu(e, n, t, r, o) {
                    const i = kh(),
                        s = Gl(),
                        l = e.data[n] = function aM(e, n, t, r, o, i) {
                            return {
                                type: t,
                                index: r,
                                insertBeforeIndex: null,
                                injectorIndex: n ? n.injectorIndex : -1,
                                directiveStart: -1,
                                directiveEnd: -1,
                                directiveStylingLast: -1,
                                componentOffset: -1,
                                propertyBindings: null,
                                flags: 0,
                                providerIndexes: 0,
                                value: o,
                                attrs: i,
                                mergedAttrs: null,
                                localNames: null,
                                initialInputs: void 0,
                                inputs: null,
                                outputs: null,
                                tView: null,
                                next: null,
                                prev: null,
                                projectionNext: null,
                                child: null,
                                parent: n,
                                projection: null,
                                styles: null,
                                stylesWithoutHost: null,
                                residualStyles: void 0,
                                classes: null,
                                classesWithoutHost: null,
                                residualClasses: void 0,
                                classBindings: 0,
                                styleBindings: 0
                            }
                        }(0, s ? i : i && i.parent, t, n, r, o);
                    return null === e.firstChild && (e.firstChild = l), null !== i && (s ? null == i.child && null !== l.parent && (i.child = l) : null === i.next && (i.next = l, l.prev = i)), l
                }(e, n, t, r, o),
                    function rb() {
                        return j.lFrame.inI18n
                    }() && (i.flags |= 32);
                else if (64 & i.type) {
                    i.type = t, i.value = r, i.attrs = o;
                    const s = function Uo() {
                        const e = j.lFrame,
                            n = e.currentTNode;
                        return e.isParent ? n : n.parent
                    }();
                    i.injectorIndex = null === s ? -1 : s.injectorIndex
                }
                return en(i, !0), i
            }

            function si(e, n, t, r) {
                if (0 === t) return -1;
                const o = n.length;
                for (let i = 0; i < t; i++) n.push(r), e.blueprint.push(r), e.data.push(null);
                return o
            }

            function Ku(e, n, t) {
                Xl(n);
                try {
                    const r = e.viewQuery;
                    null !== r && sc(1, r, t);
                    const o = e.template;
                    null !== o && Lg(e, n, o, 1, t), e.firstCreatePass && (e.firstCreatePass = !1), e.staticContentQueries && kg(e, n), e.staticViewQueries && sc(2, e.viewQuery, t);
                    const i = e.components;
                    null !== i && function oM(e, n) {
                        for (let t = 0; t < n.length; t++) MM(e, n[t])
                    }(n, i)
                } catch (r) {
                    throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
                } finally {
                    n[H] &= -5, Kl()
                }
            }

            function Bs(e, n, t, r) {
                const o = n[H];
                if (128 != (128 & o)) {
                    Xl(n);
                    try {
                        Nh(n),
                            function Vh(e) {
                                return j.lFrame.bindingIndex = e
                            }(e.bindingStartIndex), null !== t && Lg(e, n, t, 2, r);
                        const s = 3 == (3 & o);
                        if (s) {
                            const u = e.preOrderCheckHooks;
                            null !== u && ys(n, u, null)
                        } else {
                            const u = e.preOrderHooks;
                            null !== u && vs(n, u, 0, null), Zl(n, 0)
                        }
                        if (function bM(e) {
                            for (let n = vu(e); null !== n; n = _u(n)) {
                                if (!n[bh]) continue;
                                const t = n[Rr];
                                for (let r = 0; r < t.length; r++) {
                                    const o = t[r];
                                    512 & o[H] || Hl(o[_e], 1), o[H] |= 512
                                }
                            }
                        }(n), function EM(e) {
                            for (let n = vu(e); null !== n; n = _u(n))
                                for (let t = Ye; t < n.length; t++) {
                                    const r = n[t],
                                        o = r[b];
                                    gs(r) && Bs(o, r, o.template, r[De])
                                }
                        }(n), null !== e.contentQueries && kg(e, n), s) {
                            const u = e.contentCheckHooks;
                            null !== u && ys(n, u)
                        } else {
                            const u = e.contentHooks;
                            null !== u && vs(n, u, 1), Zl(n, 1)
                        } ! function nM(e, n) {
                            const t = e.hostBindingOpCodes;
                            if (null !== t) try {
                                for (let r = 0; r < t.length; r++) {
                                    const o = t[r];
                                    if (o < 0) or(~o);
                                    else {
                                        const i = o,
                                            s = t[++r],
                                            a = t[++r];
                                        ob(s, i), a(2, n[i])
                                    }
                                }
                            } finally {
                                    or(-1)
                                }
                        }(e, n);
                        const a = e.components;
                        null !== a && function rM(e, n) {
                            for (let t = 0; t < n.length; t++) SM(e, n[t])
                        }(n, a);
                        const l = e.viewQuery;
                        if (null !== l && sc(2, l, r), s) {
                            const u = e.viewCheckHooks;
                            null !== u && ys(n, u)
                        } else {
                            const u = e.viewHooks;
                            null !== u && vs(n, u, 2), Zl(n, 2)
                        } !0 === e.firstUpdatePass && (e.firstUpdatePass = !1), n[H] &= -41, 512 & n[H] && (n[H] &= -513, Hl(n[_e], -1))
                    } finally {
                        Kl()
                    }
                }
            }

            function Lg(e, n, t, r, o) {
                const i = et(),
                    s = 2 & r;
                try {
                    or(-1), s && n.length > he && Eg(e, n, he, !1), At(s ? 2 : 0, o), t(r, o)
                } finally {
                    or(i), At(s ? 3 : 1, o)
                }
            }

            function Zu(e, n, t) {
                if ($l(n)) {
                    const o = n.directiveEnd;
                    for (let i = n.directiveStart; i < o; i++) {
                        const s = e.data[i];
                        s.contentQueries && s.contentQueries(1, t[i], i)
                    }
                }
            }

            function Yu(e, n, t) {
                Ph() && (function hM(e, n, t, r) {
                    const o = t.directiveStart,
                        i = t.directiveEnd;
                    $o(t) && function CM(e, n, t) {
                        const r = mt(n, e),
                            o = Vg(t),
                            i = e[cs],
                            s = $s(e, js(e, o, null, t.onPush ? 32 : 16, r, n, i, i.createRenderer(r, t), null, null, null));
                        e[n.index] = s
                    }(n, t, e.data[o + t.componentOffset]), e.firstCreatePass || ws(t, n), qe(r, n);
                    const s = t.initialInputs;
                    for (let a = o; a < i; a++) {
                        const l = e.data[a],
                            u = ir(n, e, a, t);
                        qe(u, n), null !== s && DM(0, a - o, u, l, 0, s), Bt(l) && (yt(t.index, n)[De] = ir(n, e, a, t))
                    }
                }(e, n, t, mt(t, n)), 64 == (64 & t.flags) && Gg(e, n, t))
            }

            function Qu(e, n, t = mt) {
                const r = n.localNames;
                if (null !== r) {
                    let o = n.index + 1;
                    for (let i = 0; i < r.length; i += 2) {
                        const s = r[i + 1],
                            a = -1 === s ? t(n, e) : e[s];
                        e[o++] = a
                    }
                }
            }

            function Vg(e) {
                const n = e.tView;
                return null === n || n.incompleteFirstPass ? e.tView = ec(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts) : n
            }

            function ec(e, n, t, r, o, i, s, a, l, u) {
                const c = he + r,
                    d = c + o,
                    f = function iM(e, n) {
                        const t = [];
                        for (let r = 0; r < n; r++) t.push(r < e ? null : B);
                        return t
                    }(c, d),
                    h = "function" == typeof u ? u() : u;
                return f[b] = {
                    type: e,
                    blueprint: f,
                    template: t,
                    queries: null,
                    viewQuery: a,
                    declTNode: n,
                    data: f.slice().fill(null, c),
                    bindingStartIndex: c,
                    expandoStartIndex: d,
                    hostBindingOpCodes: null,
                    firstCreatePass: !0,
                    firstUpdatePass: !0,
                    staticViewQueries: !1,
                    staticContentQueries: !1,
                    preOrderHooks: null,
                    preOrderCheckHooks: null,
                    contentHooks: null,
                    contentCheckHooks: null,
                    viewHooks: null,
                    viewCheckHooks: null,
                    destroyHooks: null,
                    cleanup: null,
                    contentQueries: null,
                    components: null,
                    directiveRegistry: "function" == typeof i ? i() : i,
                    pipeRegistry: "function" == typeof s ? s() : s,
                    firstChild: null,
                    schemas: l,
                    consts: h,
                    incompleteFirstPass: !1
                }
            }

            function jg(e, n, t, r) {
                const o = Wg(n);
                null === t ? o.push(r) : (o.push(t), e.firstCreatePass && qg(e).push(r, o.length - 1))
            }

            function Bg(e, n, t, r) {
                for (let o in e)
                    if (e.hasOwnProperty(o)) {
                        t = null === t ? {} : t;
                        const i = e[o];
                        null === r ? $g(t, n, o, i) : r.hasOwnProperty(o) && $g(t, n, r[o], i)
                    } return t
            }

            function $g(e, n, t, r) {
                e.hasOwnProperty(t) ? e[t].push(n, r) : e[t] = [n, r]
            }

            function Ug(e, n) {
                const t = yt(n, e);
                16 & t[H] || (t[H] |= 32)
            }

            function tc(e, n, t, r) {
                if (Ph()) {
                    const o = null === r ? null : {
                        "": -1
                    },
                        i = function gM(e, n) {
                            const t = e.directiveRegistry;
                            let r = null,
                                o = null;
                            if (t)
                                for (let i = 0; i < t.length; i++) {
                                    const s = t[i];
                                    if (Dg(n, s.selectors, !1))
                                        if (r || (r = []), Bt(s))
                                            if (null !== s.findHostDirectiveDefs) {
                                                const a = [];
                                                o = o || new Map, s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s), nc(e, n, a.length)
                                            } else r.unshift(s), nc(e, n, 0);
                                        else o = o || new Map, s.findHostDirectiveDefs?.(s, r, o), r.push(s)
                                }
                            return null === r ? null : [r, o]
                        }(e, t);
                    let s, a;
                    null === i ? s = a = null : [s, a] = i, null !== s && Hg(e, n, t, s, o, a), o && function mM(e, n, t) {
                        if (n) {
                            const r = e.localNames = [];
                            for (let o = 0; o < n.length; o += 2) {
                                const i = t[n[o + 1]];
                                if (null == i) throw new D(-301, !1);
                                r.push(n[o], i)
                            }
                        }
                    }(t, r, o)
                }
                t.mergedAttrs = Go(t.mergedAttrs, t.attrs)
            }

            function Hg(e, n, t, r, o, i) {
                for (let u = 0; u < r.length; u++) ru(ws(t, n), e, r[u].type);
                ! function vM(e, n, t) {
                    e.flags |= 1, e.directiveStart = n, e.directiveEnd = n + t, e.providerIndexes = n
                }(t, e.data.length, r.length);
                for (let u = 0; u < r.length; u++) {
                    const c = r[u];
                    c.providersResolver && c.providersResolver(c)
                }
                let s = !1,
                    a = !1,
                    l = si(e, n, r.length, null);
                for (let u = 0; u < r.length; u++) {
                    const c = r[u];
                    t.mergedAttrs = Go(t.mergedAttrs, c.hostAttrs), _M(e, t, n, l, c), yM(l, c, o), null !== c.contentQueries && (t.flags |= 4), (null !== c.hostBindings || null !== c.hostAttrs || 0 !== c.hostVars) && (t.flags |= 64);
                    const d = c.type.prototype;
                    !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks || (e.preOrderHooks = [])).push(t.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(t.index), a = !0), l++
                } ! function lM(e, n, t) {
                    const o = n.directiveEnd,
                        i = e.data,
                        s = n.attrs,
                        a = [];
                    let l = null,
                        u = null;
                    for (let c = n.directiveStart; c < o; c++) {
                        const d = i[c],
                            f = t ? t.get(d) : null,
                            p = f ? f.outputs : null;
                        l = Bg(d.inputs, c, l, f ? f.inputs : null), u = Bg(d.outputs, c, u, p);
                        const g = null === l || null === s || Cg(n) ? null : wM(l, c, s);
                        a.push(g)
                    }
                    null !== l && (l.hasOwnProperty("class") && (n.flags |= 8), l.hasOwnProperty("style") && (n.flags |= 16)), n.initialInputs = a, n.inputs = l, n.outputs = u
                }(e, t, i)
            }

            function Gg(e, n, t) {
                const r = t.directiveStart,
                    o = t.directiveEnd,
                    i = t.index,
                    s = function ib() {
                        return j.lFrame.currentDirectiveIndex
                    }();
                try {
                    or(i);
                    for (let a = r; a < o; a++) {
                        const l = e.data[a],
                            u = n[a];
                        Wl(a), (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && pM(l, u)
                    }
                } finally {
                    or(-1), Wl(s)
                }
            }

            function pM(e, n) {
                null !== e.hostBindings && e.hostBindings(1, n)
            }

            function nc(e, n, t) {
                n.componentOffset = t, (e.components || (e.components = [])).push(n.index)
            }

            function yM(e, n, t) {
                if (t) {
                    if (n.exportAs)
                        for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e;
                    Bt(n) && (t[""] = e)
                }
            }

            function _M(e, n, t, r, o) {
                e.data[r] = o;
                const i = o.factory || (o.factory = rr(o.type)),
                    s = new Ho(i, Bt(o), C);
                e.blueprint[r] = s, t[r] = s,
                    function dM(e, n, t, r, o) {
                        const i = o.hostBindings;
                        if (i) {
                            let s = e.hostBindingOpCodes;
                            null === s && (s = e.hostBindingOpCodes = []);
                            const a = ~n.index;
                            (function fM(e) {
                                let n = e.length;
                                for (; n > 0;) {
                                    const t = e[--n];
                                    if ("number" == typeof t && t < 0) return t
                                }
                                return 0
                            })(s) != a && s.push(a), s.push(t, r, i)
                        }
                    }(e, n, r, si(e, t, o.hostVars, B), o)
            }

            function rn(e, n, t, r, o, i) {
                const s = mt(e, n);
                ! function rc(e, n, t, r, o, i, s) {
                    if (null == i) e.removeAttribute(n, o, t);
                    else {
                        const a = null == s ? V(i) : s(i, r || "", o);
                        e.setAttribute(n, o, a, t)
                    }
                }(n[z], s, i, e.value, t, r, o)
            }

            function DM(e, n, t, r, o, i) {
                const s = i[n];
                if (null !== s) {
                    const a = r.setInput;
                    for (let l = 0; l < s.length;) {
                        const u = s[l++],
                            c = s[l++],
                            d = s[l++];
                        null !== a ? r.setInput(t, d, u, c) : t[c] = d
                    }
                }
            }

            function wM(e, n, t) {
                let r = null,
                    o = 0;
                for (; o < t.length;) {
                    const i = t[o];
                    if (0 !== i)
                        if (5 !== i) {
                            if ("number" == typeof i) break;
                            if (e.hasOwnProperty(i)) {
                                null === r && (r = []);
                                const s = e[i];
                                for (let a = 0; a < s.length; a += 2)
                                    if (s[a] === n) {
                                        r.push(i, s[a + 1], t[o + 1]);
                                        break
                                    }
                            }
                            o += 2
                        } else o += 2;
                    else o += 4
                }
                return r
            }

            function zg(e, n, t, r) {
                return [e, !0, !1, n, null, 0, r, t, null, null]
            }

            function SM(e, n) {
                const t = yt(n, e);
                if (gs(t)) {
                    const r = t[b];
                    48 & t[H] ? Bs(r, t, r.template, t[De]) : t[nr] > 0 && oc(t)
                }
            }

            function oc(e) {
                for (let r = vu(e); null !== r; r = _u(r))
                    for (let o = Ye; o < r.length; o++) {
                        const i = r[o];
                        if (gs(i))
                            if (512 & i[H]) {
                                const s = i[b];
                                Bs(s, i, s.template, i[De])
                            } else i[nr] > 0 && oc(i)
                    }
                const t = e[b].components;
                if (null !== t)
                    for (let r = 0; r < t.length; r++) {
                        const o = yt(t[r], e);
                        gs(o) && o[nr] > 0 && oc(o)
                    }
            }

            function MM(e, n) {
                const t = yt(n, e),
                    r = t[b];
                (function IM(e, n) {
                    for (let t = n.length; t < e.blueprint.length; t++) n.push(e.blueprint[t])
                })(r, t), Ku(r, t, t[De])
            }

            function $s(e, n) {
                return e[Vo] ? e[wh][Vt] = n : e[Vo] = n, e[wh] = n, n
            }

            function ic(e) {
                for (; e;) {
                    e[H] |= 32;
                    const n = Qo(e);
                    if (jE(e) && !n) return e;
                    e = n
                }
                return null
            }

            function Us(e, n, t, r = !0) {
                const o = n[cs];
                o.begin && o.begin();
                try {
                    Bs(e, n, e.template, t)
                } catch (s) {
                    throw r && Xg(n, s), s
                } finally {
                    o.end && o.end()
                }
            }

            function sc(e, n, t) {
                Jl(0), n(e, t)
            }

            function Wg(e) {
                return e[Ar] || (e[Ar] = [])
            }

            function qg(e) {
                return e.cleanup || (e.cleanup = [])
            }

            function Xg(e, n) {
                const t = e[us],
                    r = t ? t.get(Wr, null) : null;
                r && r.handleError(n)
            }

            function ac(e, n, t, r, o) {
                for (let i = 0; i < t.length;) {
                    const s = t[i++],
                        a = t[i++],
                        l = n[s],
                        u = e.data[s];
                    null !== u.setInput ? u.setInput(l, o, r, a) : l[a] = o
                }
            }

            function Hs(e, n, t) {
                let r = t ? e.styles : null,
                    o = t ? e.classes : null,
                    i = 0;
                if (null !== n)
                    for (let s = 0; s < n.length; s++) {
                        const a = n[s];
                        "number" == typeof a ? i = a : 1 == i ? o = xl(o, a) : 2 == i && (r = xl(r, a + ": " + n[++s] + ";"))
                    }
                t ? e.styles = r : e.stylesWithoutHost = r, t ? e.classes = o : e.classesWithoutHost = o
            }

            function Gs(e, n, t, r, o = !1) {
                for (; null !== t;) {
                    const i = n[t.index];
                    if (null !== i && r.push(je(i)), jt(i))
                        for (let a = Ye; a < i.length; a++) {
                            const l = i[a],
                                u = l[b].firstChild;
                            null !== u && Gs(l[b], l, u, r)
                        }
                    const s = t.type;
                    if (8 & s) Gs(e, n, t.child, r);
                    else if (32 & s) {
                        const a = yu(t, n);
                        let l;
                        for (; l = a();) r.push(l)
                    } else if (16 & s) {
                        const a = $p(n, t);
                        if (Array.isArray(a)) r.push(...a);
                        else {
                            const l = Qo(n[We]);
                            Gs(l[b], l, a, r, !0)
                        }
                    }
                    t = o ? t.projectionNext : t.next
                }
                return r
            }
            class ai {
                get rootNodes() {
                    const n = this._lView,
                        t = n[b];
                    return Gs(t, n, t.firstChild, [])
                }
                constructor(n, t) {
                    this._lView = n, this._cdRefInjectingView = t, this._appRef = null, this._attachedToViewContainer = !1
                }
                get context() {
                    return this._lView[De]
                }
                set context(n) {
                    this._lView[De] = n
                }
                get destroyed() {
                    return 128 == (128 & this._lView[H])
                }
                destroy() {
                    if (this._appRef) this._appRef.detachView(this);
                    else if (this._attachedToViewContainer) {
                        const n = this._lView[_e];
                        if (jt(n)) {
                            const t = n[fs],
                                r = t ? t.indexOf(this) : -1;
                            r > -1 && (wu(n, r), Ss(t, r))
                        }
                        this._attachedToViewContainer = !1
                    }
                    Op(this._lView[b], this._lView)
                }
                onDestroy(n) {
                    jg(this._lView[b], this._lView, null, n)
                }
                markForCheck() {
                    ic(this._cdRefInjectingView || this._lView)
                }
                detach() {
                    this._lView[H] &= -65
                }
                reattach() {
                    this._lView[H] |= 64
                }
                detectChanges() {
                    Us(this._lView[b], this._lView, this.context)
                }
                checkNoChanges() { }
                attachToViewContainerRef() {
                    if (this._appRef) throw new D(902, !1);
                    this._attachedToViewContainer = !0
                }
                detachFromAppRef() {
                    this._appRef = null,
                        function g0(e, n) {
                            ei(e, n, n[z], 2, null, null)
                        }(this._lView[b], this._lView)
                }
                attachToAppRef(n) {
                    if (this._attachedToViewContainer) throw new D(902, !1);
                    this._appRef = n
                }
            }
            class AM extends ai {
                constructor(n) {
                    super(n), this._view = n
                }
                detectChanges() {
                    const n = this._view;
                    Us(n[b], n, n[De], !1)
                }
                checkNoChanges() { }
                get context() {
                    return null
                }
            }
            class Kg extends oi {
                constructor(n) {
                    super(), this.ngModule = n
                }
                resolveComponentFactory(n) {
                    const t = te(n);
                    return new li(t, this.ngModule)
                }
            }

            function Zg(e) {
                const n = [];
                for (let t in e) e.hasOwnProperty(t) && n.push({
                    propName: e[t],
                    templateName: t
                });
                return n
            }
            class xM {
                constructor(n, t) {
                    this.injector = n, this.parentInjector = t
                }
                get(n, t, r) {
                    r = as(r);
                    const o = this.injector.get(n, Uu, r);
                    return o !== Uu || t === Uu ? o : this.parentInjector.get(n, t, r)
                }
            }
            class li extends pg {
                get inputs() {
                    return Zg(this.componentDef.inputs)
                }
                get outputs() {
                    return Zg(this.componentDef.outputs)
                }
                constructor(n, t) {
                    super(), this.componentDef = n, this.ngModule = t, this.componentType = n.type, this.selector = function kS(e) {
                        return e.map(PS).join(",")
                    }(n.selectors), this.ngContentSelectors = n.ngContentSelectors ? n.ngContentSelectors : [], this.isBoundToModule = !!t
                }
                create(n, t, r, o) {
                    let i = (o = o || this.ngModule) instanceof nn ? o : o?.injector;
                    i && null !== this.componentDef.getStandaloneInjector && (i = this.componentDef.getStandaloneInjector(i) || i);
                    const s = i ? new xM(n, i) : n,
                        a = s.get(mg, null);
                    if (null === a) throw new D(407, !1);
                    const l = s.get(gS, null),
                        u = a.createRenderer(null, this.componentDef),
                        c = this.componentDef.selectors[0][0] || "div",
                        d = r ? function sM(e, n, t) {
                            return e.selectRootElement(n, t === Yt.ShadowDom)
                        }(u, r, this.componentDef.encapsulation) : Du(u, c, function TM(e) {
                            const n = e.toLowerCase();
                            return "svg" === n ? "svg" : "math" === n ? "math" : null
                        }(c)),
                        f = this.componentDef.onPush ? 288 : 272,
                        h = ec(0, null, null, 1, 0, null, null, null, null, null),
                        p = js(null, h, null, f, null, null, a, u, l, s, null);
                    let g, m;
                    Xl(p);
                    try {
                        const v = this.componentDef;
                        let w, y = null;
                        v.findHostDirectiveDefs ? (w = [], y = new Map, v.findHostDirectiveDefs(v, w, y), w.push(v)) : w = [v];
                        const N = function OM(e, n) {
                            const t = e[b],
                                r = he;
                            return e[r] = n, Xr(t, r, 2, "#host", null)
                        }(p, d),
                            ie = function NM(e, n, t, r, o, i, s, a) {
                                const l = o[b];
                                ! function FM(e, n, t, r) {
                                    for (const o of e) n.mergedAttrs = Go(n.mergedAttrs, o.hostAttrs);
                                    null !== n.mergedAttrs && (Hs(n, n.mergedAttrs, !0), null !== t && Gp(r, t, n))
                                }(r, e, n, s);
                                const u = i.createRenderer(n, t),
                                    c = js(o, Vg(t), null, t.onPush ? 32 : 16, o[e.index], e, i, u, a || null, null, null);
                                return l.firstCreatePass && nc(l, e, r.length - 1), $s(o, c), o[e.index] = c
                            }(N, d, v, w, p, a, u);
                        m = Oh(h, he), d && function kM(e, n, t, r) {
                            if (r) Ql(e, t, ["ng-version", mS.full]);
                            else {
                                const {
                                    attrs: o,
                                    classes: i
                                } = function LS(e) {
                                    const n = [],
                                        t = [];
                                    let r = 1,
                                        o = 2;
                                    for (; r < e.length;) {
                                        let i = e[r];
                                        if ("string" == typeof i) 2 === o ? "" !== i && n.push(i, e[++r]) : 8 === o && t.push(i);
                                        else {
                                            if (!$t(o)) break;
                                            o = i
                                        }
                                        r++
                                    }
                                    return {
                                        attrs: n,
                                        classes: t
                                    }
                                }(n.selectors[0]);
                                o && Ql(e, t, o), i && i.length > 0 && Hp(e, t, i.join(" "))
                            }
                        }(u, v, d, r), void 0 !== t && function LM(e, n, t) {
                            const r = e.projection = [];
                            for (let o = 0; o < n.length; o++) {
                                const i = t[o];
                                r.push(null != i ? Array.from(i) : null)
                            }
                        }(m, this.ngContentSelectors, t), g = function PM(e, n, t, r, o, i) {
                            const s = Be(),
                                a = o[b],
                                l = mt(s, o);
                            Hg(a, o, s, t, null, r);
                            for (let c = 0; c < t.length; c++) qe(ir(o, a, s.directiveStart + c, s), o);
                            Gg(a, o, s), l && qe(l, o);
                            const u = ir(o, a, s.directiveStart + s.componentOffset, s);
                            if (e[De] = o[De] = u, null !== i)
                                for (const c of i) c(u, n);
                            return Zu(a, s, e), u
                        }(ie, v, w, y, p, [VM]), Ku(h, p, null)
                    } finally {
                        Kl()
                    }
                    return new RM(this.componentType, g, zr(m, p), p, m)
                }
            }
            class RM extends uS {
                constructor(n, t, r, o, i) {
                    super(), this.location = r, this._rootLView = o, this._tNode = i, this.instance = t, this.hostView = this.changeDetectorRef = new AM(o), this.componentType = n
                }
                setInput(n, t) {
                    const r = this._tNode.inputs;
                    let o;
                    if (null !== r && (o = r[n])) {
                        const i = this._rootLView;
                        ac(i[b], i, o, n, t), Ug(i, this._tNode.index)
                    }
                }
                get injector() {
                    return new Pr(this._tNode, this._rootLView)
                }
                destroy() {
                    this.hostView.destroy()
                }
                onDestroy(n) {
                    this.hostView.onDestroy(n)
                }
            }

            function VM() {
                const e = Be();
                ms(_()[b], e)
            }

            function ne(e) {
                let n = function Yg(e) {
                    return Object.getPrototypeOf(e.prototype).constructor
                }(e.type),
                    t = !0;
                const r = [e];
                for (; n;) {
                    let o;
                    if (Bt(e)) o = n.\u0275cmp || n.\u0275dir;
                    else {
                        if (n.\u0275cmp) throw new D(903, !1);
                        o = n.\u0275dir
                    }
                    if (o) {
                        if (t) {
                            r.push(o);
                            const s = e;
                            s.inputs = lc(e.inputs), s.declaredInputs = lc(e.declaredInputs), s.outputs = lc(e.outputs);
                            const a = o.hostBindings;
                            a && UM(e, a);
                            const l = o.viewQuery,
                                u = o.contentQueries;
                            if (l && BM(e, l), u && $M(e, u), Tl(e.inputs, o.inputs), Tl(e.declaredInputs, o.declaredInputs), Tl(e.outputs, o.outputs), Bt(o) && o.data.animation) {
                                const c = e.data;
                                c.animation = (c.animation || []).concat(o.data.animation)
                            }
                        }
                        const i = o.features;
                        if (i)
                            for (let s = 0; s < i.length; s++) {
                                const a = i[s];
                                a && a.ngInherit && a(e), a === ne && (t = !1)
                            }
                    }
                    n = Object.getPrototypeOf(n)
                } ! function jM(e) {
                    let n = 0,
                        t = null;
                    for (let r = e.length - 1; r >= 0; r--) {
                        const o = e[r];
                        o.hostVars = n += o.hostVars, o.hostAttrs = Go(o.hostAttrs, t = Go(t, o.hostAttrs))
                    }
                }(r)
            }

            function lc(e) {
                return e === pn ? {} : e === Y ? [] : e
            }

            function BM(e, n) {
                const t = e.viewQuery;
                e.viewQuery = t ? (r, o) => {
                    n(r, o), t(r, o)
                } : n
            }

            function $M(e, n) {
                const t = e.contentQueries;
                e.contentQueries = t ? (r, o, i) => {
                    n(r, o, i), t(r, o, i)
                } : n
            }

            function UM(e, n) {
                const t = e.hostBindings;
                e.hostBindings = t ? (r, o) => {
                    n(r, o), t(r, o)
                } : n
            }

            function zs(e) {
                return !!uc(e) && (Array.isArray(e) || !(e instanceof Map) && Symbol.iterator in e)
            }

            function uc(e) {
                return null !== e && ("function" == typeof e || "object" == typeof e)
            }

            function on(e, n, t) {
                return e[n] = t
            }

            function Je(e, n, t) {
                return !Object.is(e[n], t) && (e[n] = t, !0)
            }

            function Ht(e, n, t, r) {
                const o = _();
                return Je(o, Nr(), n) && (Z(), rn(ge(), o, e, n, t, r)), Ht
            }

            function Ve(e, n, t, r, o, i, s, a) {
                const l = _(),
                    u = Z(),
                    c = e + he,
                    d = u.firstCreatePass ? function YM(e, n, t, r, o, i, s, a, l) {
                        const u = n.consts,
                            c = Xr(n, e, 4, s || null, Ln(u, a));
                        tc(n, t, c, Ln(u, l)), ms(n, c);
                        const d = c.tView = ec(2, c, r, o, i, n.directiveRegistry, n.pipeRegistry, null, n.schemas, u);
                        return null !== n.queries && (n.queries.template(n, c), d.queries = n.queries.embeddedTView(c)), c
                    }(c, u, l, n, t, r, o, i, s) : u.data[c];
                en(d, !1);
                const f = l[z].createComment("");
                xs(u, l, f, d), qe(f, l), $s(l, l[c] = zg(f, l, f, d)), hs(d) && Yu(u, l, d), null != s && Qu(l, d, a)
            }

            function q(e, n, t) {
                const r = _();
                return Je(r, Nr(), n) && function Ct(e, n, t, r, o, i, s, a) {
                    const l = mt(n, t);
                    let c, u = n.inputs;
                    !a && null != u && (c = u[r]) ? (ac(e, t, c, r, o), $o(n) && Ug(t, n.index)) : 3 & n.type && (r = function uM(e) {
                        return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
                    }(r), o = null != s ? s(o, n.value || "", r) : o, i.setProperty(l, r, o))
                }(Z(), ge(), r, e, n, r[z], t, !1), q
            }

            function cc(e, n, t, r, o) {
                const s = o ? "class" : "style";
                ac(e, t, n.inputs[s], s, r)
            }

            function A(e, n, t, r) {
                const o = _(),
                    i = Z(),
                    s = he + e,
                    a = o[z],
                    l = i.firstCreatePass ? function eI(e, n, t, r, o, i) {
                        const s = n.consts,
                            l = Xr(n, e, 2, r, Ln(s, o));
                        return tc(n, t, l, Ln(s, i)), null !== l.attrs && Hs(l, l.attrs, !1), null !== l.mergedAttrs && Hs(l, l.mergedAttrs, !0), null !== n.queries && n.queries.elementStart(n, l), l
                    }(s, i, o, n, t, r) : i.data[s],
                    u = o[s] = Du(a, n, function hb() {
                        return j.lFrame.currentNamespace
                    }()),
                    c = hs(l);
                return en(l, !0), Gp(a, u, l), 32 != (32 & l.flags) && xs(i, o, u, l), 0 === function ZE() {
                    return j.lFrame.elementDepthCount
                }() && qe(u, o),
                    function YE() {
                        j.lFrame.elementDepthCount++
                    }(), c && (Yu(i, o, l), Zu(i, l, o)), null !== r && Qu(o, l), A
            }

            function I() {
                let e = Be();
                Gl() ? zl() : (e = e.parent, en(e, !1));
                const n = e;
                ! function QE() {
                    j.lFrame.elementDepthCount--
                }();
                const t = Z();
                return t.firstCreatePass && (ms(t, e), $l(e) && t.queries.elementEnd(e)), null != n.classesWithoutHost && function yb(e) {
                    return 0 != (8 & e.flags)
                }(n) && cc(t, n, _(), n.classesWithoutHost, !0), null != n.stylesWithoutHost && function vb(e) {
                    return 0 != (16 & e.flags)
                }(n) && cc(t, n, _(), n.stylesWithoutHost, !1), I
            }

            function jn(e, n, t, r) {
                return A(e, n, t, r), I(), jn
            }

            function dc(e, n, t) {
                const r = _(),
                    o = Z(),
                    i = e + he,
                    s = o.firstCreatePass ? function tI(e, n, t, r, o) {
                        const i = n.consts,
                            s = Ln(i, r),
                            a = Xr(n, e, 8, "ng-container", s);
                        return null !== s && Hs(a, s, !0), tc(n, t, a, Ln(i, o)), null !== n.queries && n.queries.elementStart(n, a), a
                    }(i, o, r, n, t) : o.data[i];
                en(s, !0);
                const a = r[i] = r[z].createComment("");
                return xs(o, r, a, s), qe(a, r), hs(s) && (Yu(o, r, s), Zu(o, s, r)), null != t && Qu(r, s), dc
            }

            function fc() {
                let e = Be();
                const n = Z();
                return Gl() ? zl() : (e = e.parent, en(e, !1)), n.firstCreatePass && (ms(n, e), $l(e) && n.queries.elementEnd(e)), fc
            }

            function io(e, n, t) {
                return dc(e, n, t), fc(), io
            }

            function cr() {
                return _()
            }

            function ci(e) {
                return !!e && "function" == typeof e.then
            }

            function fm(e) {
                return !!e && "function" == typeof e.subscribe
            }
            const hc = fm;

            function re(e, n, t, r) {
                const o = _(),
                    i = Z(),
                    s = Be();
                return function pm(e, n, t, r, o, i, s) {
                    const a = hs(r),
                        u = e.firstCreatePass && qg(e),
                        c = n[De],
                        d = Wg(n);
                    let f = !0;
                    if (3 & r.type || s) {
                        const g = mt(r, n),
                            m = s ? s(g) : g,
                            v = d.length,
                            w = s ? N => s(je(N[r.index])) : r.index;
                        let y = null;
                        if (!s && a && (y = function nI(e, n, t, r) {
                            const o = e.cleanup;
                            if (null != o)
                                for (let i = 0; i < o.length - 1; i += 2) {
                                    const s = o[i];
                                    if (s === t && o[i + 1] === r) {
                                        const a = n[Ar],
                                            l = o[i + 2];
                                        return a.length > l ? a[l] : null
                                    }
                                    "string" == typeof s && (i += 2)
                                }
                            return null
                        }(e, n, o, r.index)), null !== y) (y.__ngLastListenerFn__ || y).__ngNextListenerFn__ = i, y.__ngLastListenerFn__ = i, f = !1;
                        else {
                            i = mm(r, n, c, i, !1);
                            const N = t.listen(m, o, i);
                            d.push(i, N), u && u.push(o, w, v, v + 1)
                        }
                    } else i = mm(r, n, c, i, !1);
                    const h = r.outputs;
                    let p;
                    if (f && null !== h && (p = h[o])) {
                        const g = p.length;
                        if (g)
                            for (let m = 0; m < g; m += 2) {
                                const ie = n[p[m]][p[m + 1]].subscribe(i),
                                    Me = d.length;
                                d.push(i, ie), u && u.push(o, r.index, Me, -(Me + 1))
                            }
                    }
                }(i, o, o[z], s, e, n, r), re
            }

            function gm(e, n, t, r) {
                try {
                    return At(6, n, t), !1 !== t(r)
                } catch (o) {
                    return Xg(e, o), !1
                } finally {
                    At(7, n, t)
                }
            }

            function mm(e, n, t, r, o) {
                return function i(s) {
                    if (s === Function) return r;
                    ic(e.componentOffset > -1 ? yt(e.index, n) : n);
                    let l = gm(n, t, r, s),
                        u = i.__ngNextListenerFn__;
                    for (; u;) l = gm(n, t, u, s) && l, u = u.__ngNextListenerFn__;
                    return o && !1 === l && (s.preventDefault(), s.returnValue = !1), l
                }
            }

            function Fe(e = 1) {
                return function ab(e) {
                    return (j.lFrame.contextLView = function lb(e, n) {
                        for (; e > 0;) n = n[Tr], e--;
                        return n
                    }(e, j.lFrame.contextLView))[De]
                }(e)
            }

            function qs(e, n) {
                return e << 17 | n << 2
            }

            function Bn(e) {
                return e >> 17 & 32767
            }

            function gc(e) {
                return 2 | e
            }

            function dr(e) {
                return (131068 & e) >> 2
            }

            function mc(e, n) {
                return -131069 & e | n << 2
            }

            function yc(e) {
                return 1 | e
            }

            function Mm(e, n, t, r, o) {
                const i = e[t + 1],
                    s = null === n;
                let a = r ? Bn(i) : dr(i),
                    l = !1;
                for (; 0 !== a && (!1 === l || s);) {
                    const c = e[a + 1];
                    dI(e[a], n) && (l = !0, e[a + 1] = r ? yc(c) : gc(c)), a = r ? Bn(c) : dr(c)
                }
                l && (e[t + 1] = r ? gc(i) : yc(i))
            }

            function dI(e, n) {
                return null === e || null == n || (Array.isArray(e) ? e[1] : e) === n || !(!Array.isArray(e) || "string" != typeof n) && Br(e, n) >= 0
            }

            function Js(e, n) {
                return function Gt(e, n, t, r) {
                    const o = _(),
                        i = Z(),
                        s = function Cn(e) {
                            const n = j.lFrame,
                                t = n.bindingIndex;
                            return n.bindingIndex = n.bindingIndex + e, t
                        }(2);
                    i.firstUpdatePass && function Pm(e, n, t, r) {
                        const o = e.data;
                        if (null === o[t + 1]) {
                            const i = o[et()],
                                s = function Fm(e, n) {
                                    return n >= e.expandoStartIndex
                                }(e, t);
                            (function jm(e, n) {
                                return 0 != (e.flags & (n ? 8 : 16))
                            })(i, r) && null === n && !s && (n = !1), n = function CI(e, n, t, r) {
                                const o = function ql(e) {
                                    const n = j.lFrame.currentDirectiveIndex;
                                    return -1 === n ? null : e[n]
                                }(e);
                                let i = r ? n.residualClasses : n.residualStyles;
                                if (null === o) 0 === (r ? n.classBindings : n.styleBindings) && (t = di(t = vc(null, e, n, t, r), n.attrs, r), i = null);
                                else {
                                    const s = n.directiveStylingLast;
                                    if (-1 === s || e[s] !== o)
                                        if (t = vc(o, e, n, t, r), null === i) {
                                            let l = function DI(e, n, t) {
                                                const r = t ? n.classBindings : n.styleBindings;
                                                if (0 !== dr(r)) return e[Bn(r)]
                                            }(e, n, r);
                                            void 0 !== l && Array.isArray(l) && (l = vc(null, e, n, l[1], r), l = di(l, n.attrs, r), function wI(e, n, t, r) {
                                                e[Bn(t ? n.classBindings : n.styleBindings)] = r
                                            }(e, n, r, l))
                                        } else i = function EI(e, n, t) {
                                            let r;
                                            const o = n.directiveEnd;
                                            for (let i = 1 + n.directiveStylingLast; i < o; i++) r = di(r, e[i].hostAttrs, t);
                                            return di(r, n.attrs, t)
                                        }(e, n, r)
                                }
                                return void 0 !== i && (r ? n.residualClasses = i : n.residualStyles = i), t
                            }(o, i, n, r),
                                function uI(e, n, t, r, o, i) {
                                    let s = i ? n.classBindings : n.styleBindings,
                                        a = Bn(s),
                                        l = dr(s);
                                    e[r] = t;
                                    let c, u = !1;
                                    if (Array.isArray(t) ? (c = t[1], (null === c || Br(t, c) > 0) && (u = !0)) : c = t, o)
                                        if (0 !== l) {
                                            const f = Bn(e[a + 1]);
                                            e[r + 1] = qs(f, a), 0 !== f && (e[f + 1] = mc(e[f + 1], r)), e[a + 1] = function aI(e, n) {
                                                return 131071 & e | n << 17
                                            }(e[a + 1], r)
                                        } else e[r + 1] = qs(a, 0), 0 !== a && (e[a + 1] = mc(e[a + 1], r)), a = r;
                                    else e[r + 1] = qs(l, 0), 0 === a ? a = r : e[l + 1] = mc(e[l + 1], r), l = r;
                                    u && (e[r + 1] = gc(e[r + 1])), Mm(e, c, r, !0), Mm(e, c, r, !1),
                                        function cI(e, n, t, r, o) {
                                            const i = o ? e.residualClasses : e.residualStyles;
                                            null != i && "string" == typeof n && Br(i, n) >= 0 && (t[r + 1] = yc(t[r + 1]))
                                        }(n, c, e, r, i), s = qs(a, l), i ? n.classBindings = s : n.styleBindings = s
                                }(o, i, n, t, s, r)
                        }
                    }(i, e, s, r), n !== B && Je(o, s, n) && function Lm(e, n, t, r, o, i, s, a) {
                        if (!(3 & n.type)) return;
                        const l = e.data,
                            u = l[a + 1],
                            c = function lI(e) {
                                return 1 == (1 & e)
                            }(u) ? Vm(l, n, t, o, dr(u), s) : void 0;
                        Xs(c) || (Xs(i) || function sI(e) {
                            return 2 == (2 & e)
                        }(u) && (i = Vm(l, null, t, o, a, s)), function S0(e, n, t, r, o) {
                            if (n) o ? e.addClass(t, r) : e.removeClass(t, r);
                            else {
                                let i = -1 === r.indexOf("-") ? void 0 : at.DashCase;
                                null == o ? e.removeStyle(t, r, i) : ("string" == typeof o && o.endsWith("!important") && (o = o.slice(0, -10), i |= at.Important), e.setStyle(t, r, o, i))
                            }
                        }(r, s, ps(et(), t), o, i))
                    }(i, i.data[et()], o, o[z], e, o[s + 1] = function MI(e, n) {
                        return null == e || ("string" == typeof n ? e += n : "object" == typeof e && (e = ae(Vn(e)))), e
                    }(n, t), r, s)
                }(e, n, null, !0), Js
            }

            function vc(e, n, t, r, o) {
                let i = null;
                const s = t.directiveEnd;
                let a = t.directiveStylingLast;
                for (-1 === a ? a = t.directiveStart : a++; a < s && (i = n[a], r = di(r, i.hostAttrs, o), i !== e);) a++;
                return null !== e && (t.directiveStylingLast = a), r
            }

            function di(e, n, t) {
                const r = t ? 1 : 2;
                let o = -1;
                if (null !== n)
                    for (let i = 0; i < n.length; i++) {
                        const s = n[i];
                        "number" == typeof s ? o = s : o === r && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]), vt(e, s, !!t || n[++i]))
                    }
                return void 0 === e ? null : e
            }

            function Vm(e, n, t, r, o, i) {
                const s = null === n;
                let a;
                for (; o > 0;) {
                    const l = e[o],
                        u = Array.isArray(l),
                        c = u ? l[1] : l,
                        d = null === c;
                    let f = t[o + 1];
                    f === B && (f = d ? Y : void 0);
                    let h = d ? au(f, r) : c === r ? f : void 0;
                    if (u && !Xs(h) && (h = au(l, r)), Xs(h) && (a = h, s)) return a;
                    const p = e[o + 1];
                    o = s ? Bn(p) : dr(p)
                }
                if (null !== n) {
                    let l = i ? n.residualClasses : n.residualStyles;
                    null != l && (a = au(l, r))
                }
                return a
            }

            function Xs(e) {
                return void 0 !== e
            }

            function K(e, n = "") {
                const t = _(),
                    r = Z(),
                    o = e + he,
                    i = r.firstCreatePass ? Xr(r, o, 1, n, null) : r.data[o],
                    s = t[o] = function Cu(e, n) {
                        return e.createText(n)
                    }(t[z], n);
                xs(r, t, s, i), en(i, !1)
            }

            function Dt(e) {
                return Rt("", e, ""), Dt
            }

            function Rt(e, n, t) {
                const r = _(),
                    o = function Zr(e, n, t, r) {
                        return Je(e, Nr(), t) ? n + V(t) + r : B
                    }(r, e, n, t);
                return o !== B && function bn(e, n, t) {
                    const r = ps(n, e);
                    ! function xp(e, n, t) {
                        e.setValue(n, t)
                    }(e[z], r, t)
                }(r, et(), o), Rt
            }
            const lo = "en-US";
            let ay = lo;

            function Dc(e, n, t, r, o) {
                if (e = F(e), Array.isArray(e))
                    for (let i = 0; i < e.length; i++) Dc(e[i], n, t, r, o);
                else {
                    const i = Z(),
                        s = _();
                    let a = lr(e) ? e : F(e.provide),
                        l = hg(e);
                    const u = Be(),
                        c = 1048575 & u.providerIndexes,
                        d = u.directiveStart,
                        f = u.providerIndexes >> 20;
                    if (lr(e) || !e.multi) {
                        const h = new Ho(l, o, C),
                            p = Ec(a, n, o ? c : c + f, d); - 1 === p ? (ru(ws(u, s), i, a), wc(i, e, n.length), n.push(a), u.directiveStart++, u.directiveEnd++, o && (u.providerIndexes += 1048576), t.push(h), s.push(h)) : (t[p] = h, s[p] = h)
                    } else {
                        const h = Ec(a, n, c + f, d),
                            p = Ec(a, n, c, c + f),
                            m = p >= 0 && t[p];
                        if (o && !m || !o && !(h >= 0 && t[h])) {
                            ru(ws(u, s), i, a);
                            const v = function GA(e, n, t, r, o) {
                                const i = new Ho(e, t, C);
                                return i.multi = [], i.index = n, i.componentProviders = 0, Oy(i, o, r && !t), i
                            }(o ? HA : UA, t.length, o, r, l);
                            !o && m && (t[p].providerFactory = v), wc(i, e, n.length, 0), n.push(a), u.directiveStart++, u.directiveEnd++, o && (u.providerIndexes += 1048576), t.push(v), s.push(v)
                        } else wc(i, e, h > -1 ? h : p, Oy(t[o ? p : h], l, !o && r));
                        !o && r && m && t[p].componentProviders++
                    }
                }
            }

            function wc(e, n, t, r) {
                const o = lr(n),
                    i = function nS(e) {
                        return !!e.useClass
                    }(n);
                if (o || i) {
                    const l = (i ? F(n.useClass) : n).prototype.ngOnDestroy;
                    if (l) {
                        const u = e.destroyHooks || (e.destroyHooks = []);
                        if (!o && n.multi) {
                            const c = u.indexOf(t); - 1 === c ? u.push(t, [r, l]) : u[c + 1].push(r, l)
                        } else u.push(t, l)
                    }
                }
            }

            function Oy(e, n, t) {
                return t && e.componentProviders++, e.multi.push(n) - 1
            }

            function Ec(e, n, t, r) {
                for (let o = t; o < r; o++)
                    if (n[o] === e) return o;
                return -1
            }

            function UA(e, n, t, r) {
                return bc(this.multi, [])
            }

            function HA(e, n, t, r) {
                const o = this.multi;
                let i;
                if (this.providerFactory) {
                    const s = this.providerFactory.componentProviders,
                        a = ir(t, t[b], this.providerFactory.index, r);
                    i = a.slice(0, s), bc(o, i);
                    for (let l = s; l < a.length; l++) i.push(a[l])
                } else i = [], bc(o, i);
                return i
            }

            function bc(e, n) {
                for (let t = 0; t < e.length; t++) n.push((0, e[t])());
                return n
            }

            function pe(e, n = []) {
                return t => {
                    t.providersResolver = (r, o) => function $A(e, n, t) {
                        const r = Z();
                        if (r.firstCreatePass) {
                            const o = Bt(e);
                            Dc(t, r.data, r.blueprint, o, !0), Dc(n, r.data, r.blueprint, o, !1)
                        }
                    }(r, o ? o(e) : e, n)
                }
            }
            class uo { }
            class Ny { }
            class Fy extends uo {
                constructor(n, t) {
                    super(), this._parent = t, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new Kg(this);
                    const r = ht(n);
                    this._bootstrapComponents = En(r.bootstrap), this._r3Injector = Ag(n, t, [{
                        provide: uo,
                        useValue: this
                    }, {
                        provide: oi,
                        useValue: this.componentFactoryResolver
                    }], ae(n), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(n)
                }
                get injector() {
                    return this._r3Injector
                }
                destroy() {
                    const n = this._r3Injector;
                    !n.destroyed && n.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
                }
                onDestroy(n) {
                    this.destroyCbs.push(n)
                }
            }
            class Sc extends Ny {
                constructor(n) {
                    super(), this.moduleType = n
                }
                create(n) {
                    return new Fy(this.moduleType, n)
                }
            }
            class WA extends uo {
                constructor(n, t, r) {
                    super(), this.componentFactoryResolver = new Kg(this), this.instance = null;
                    const o = new fg([...n, {
                        provide: uo,
                        useValue: this
                    }, {
                        provide: oi,
                        useValue: this.componentFactoryResolver
                    }], t || Ls(), r, new Set(["environment"]));
                    this.injector = o, o.resolveInjectorInitializers()
                }
                destroy() {
                    this.injector.destroy()
                }
                onDestroy(n) {
                    this.injector.onDestroy(n)
                }
            }

            function ea(e, n, t = null) {
                return new WA(e, n, t).injector
            }
            let qA = (() => {
                class e {
                    constructor(t) {
                        this._injector = t, this.cachedInjectors = new Map
                    }
                    getOrCreateStandaloneInjector(t) {
                        if (!t.standalone) return null;
                        if (!this.cachedInjectors.has(t.id)) {
                            const r = lg(0, t.type),
                                o = r.length > 0 ? ea([r], this._injector, `Standalone[${t.type.name}]`) : null;
                            this.cachedInjectors.set(t.id, o)
                        }
                        return this.cachedInjectors.get(t.id)
                    }
                    ngOnDestroy() {
                        try {
                            for (const t of this.cachedInjectors.values()) null !== t && t.destroy()
                        } finally {
                            this.cachedInjectors.clear()
                        }
                    }
                }
                return e.\u0275prov = T({
                    token: e,
                    providedIn: "environment",
                    factory: () => new e(S(nn))
                }), e
            })();

            function Py(e) {
                e.getStandaloneInjector = n => n.get(qA).getOrCreateStandaloneInjector(e)
            }

            function Ic(e, n, t) {
                const r = Qe() + e,
                    o = _();
                return o[r] === B ? on(o, r, t ? n.call(t) : n()) : function ui(e, n) {
                    return e[n]
                }(o, r)
            }

            function yi(e, n, t, r) {
                return Uy(_(), Qe(), e, n, t, r)
            }

            function Uy(e, n, t, r, o, i) {
                const s = n + t;
                return Je(e, s, o) ? on(e, s + 1, i ? r.call(i, o) : r(o)) : function vi(e, n) {
                    const t = e[n];
                    return t === B ? void 0 : t
                }(e, s + 1)
            }

            function ta(e, n) {
                const t = Z();
                let r;
                const o = e + he;
                t.firstCreatePass ? (r = function cT(e, n) {
                    if (n)
                        for (let t = n.length - 1; t >= 0; t--) {
                            const r = n[t];
                            if (e === r.name) return r
                        }
                }(n, t.pipeRegistry), t.data[o] = r, r.onDestroy && (t.destroyHooks || (t.destroyHooks = [])).push(o, r.onDestroy)) : r = t.data[o];
                const i = r.factory || (r.factory = rr(r.type)),
                    s = It(C);
                try {
                    const a = Ds(!1),
                        l = i();
                    return Ds(a),
                        function QM(e, n, t, r) {
                            t >= e.data.length && (e.data[t] = null, e.blueprint[t] = null), n[t] = r
                        }(t, _(), o, l), l
                } finally {
                    It(s)
                }
            }

            function na(e, n, t) {
                const r = e + he,
                    o = _(),
                    i = Or(o, r);
                return function _i(e, n) {
                    return e[b].data[n].pure
                }(o, r) ? Uy(o, Qe(), n, i.transform, t, i) : i.transform(t)
            }

            function Ac(e) {
                return n => {
                    setTimeout(e, void 0, n)
                }
            }
            const ue = class gT extends fn {
                constructor(n = !1) {
                    super(), this.__isAsync = n
                }
                emit(n) {
                    super.next(n)
                }
                subscribe(n, t, r) {
                    let o = n,
                        i = t || (() => null),
                        s = r;
                    if (n && "object" == typeof n) {
                        const l = n;
                        o = l.next?.bind(l), i = l.error?.bind(l), s = l.complete?.bind(l)
                    }
                    this.__isAsync && (i = Ac(i), o && (o = Ac(o)), s && (s = Ac(s)));
                    const a = super.subscribe({
                        next: o,
                        error: i,
                        complete: s
                    });
                    return n instanceof dt && n.add(a), a
                }
            };

            function mT() {
                return this._results[Symbol.iterator]()
            }
            class Tc {
                get changes() {
                    return this._changes || (this._changes = new ue)
                }
                constructor(n = !1) {
                    this._emitDistinctChangesOnly = n, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = null, this.length = 0, this.first = void 0, this.last = void 0;
                    const t = Tc.prototype;
                    t[Symbol.iterator] || (t[Symbol.iterator] = mT)
                }
                get(n) {
                    return this._results[n]
                }
                map(n) {
                    return this._results.map(n)
                }
                filter(n) {
                    return this._results.filter(n)
                }
                find(n) {
                    return this._results.find(n)
                }
                reduce(n, t) {
                    return this._results.reduce(n, t)
                }
                forEach(n) {
                    this._results.forEach(n)
                }
                some(n) {
                    return this._results.some(n)
                }
                toArray() {
                    return this._results.slice()
                }
                toString() {
                    return this._results.toString()
                }
                reset(n, t) {
                    const r = this;
                    r.dirty = !1;
                    const o = function Tt(e) {
                        return e.flat(Number.POSITIVE_INFINITY)
                    }(n);
                    (this._changesDetected = ! function Ab(e, n, t) {
                        if (e.length !== n.length) return !1;
                        for (let r = 0; r < e.length; r++) {
                            let o = e[r],
                                i = n[r];
                            if (t && (o = t(o), i = t(i)), i !== o) return !1
                        }
                        return !0
                    }(r._results, o, t)) && (r._results = o, r.length = o.length, r.last = o[this.length - 1], r.first = o[0])
                }
                notifyOnChanges() {
                    this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
                }
                setDirty() {
                    this.dirty = !0
                }
                destroy() {
                    this.changes.complete(), this.changes.unsubscribe()
                }
            }
            let Sn = (() => {
                class e { }
                return e.__NG_ELEMENT_ID__ = _T, e
            })();
            const yT = Sn,
                vT = class extends yT {
                    constructor(n, t, r) {
                        super(), this._declarationLView = n, this._declarationTContainer = t, this.elementRef = r
                    }
                    createEmbeddedView(n, t) {
                        const r = this._declarationTContainer.tView,
                            o = js(this._declarationLView, r, n, 16, null, r.declTNode, null, null, null, null, t || null);
                        o[jo] = this._declarationLView[this._declarationTContainer.index];
                        const s = this._declarationLView[Qt];
                        return null !== s && (o[Qt] = s.createEmbeddedView(r)), Ku(r, o, n), new ai(o)
                    }
                };

            function _T() {
                return ra(Be(), _())
            }

            function ra(e, n) {
                return 4 & e.type ? new vT(n, e, zr(e, n)) : null
            }
            let Wt = (() => {
                class e { }
                return e.__NG_ELEMENT_ID__ = CT, e
            })();

            function CT() {
                return Xy(Be(), _())
            }
            const DT = Wt,
                qy = class extends DT {
                    constructor(n, t, r) {
                        super(), this._lContainer = n, this._hostTNode = t, this._hostLView = r
                    }
                    get element() {
                        return zr(this._hostTNode, this._hostLView)
                    }
                    get injector() {
                        return new Pr(this._hostTNode, this._hostLView)
                    }
                    get parentInjector() {
                        const n = nu(this._hostTNode, this._hostLView);
                        if (Kh(n)) {
                            const t = Cs(n, this._hostLView),
                                r = _s(n);
                            return new Pr(t[b].data[r + 8], t)
                        }
                        return new Pr(null, this._hostLView)
                    }
                    clear() {
                        for (; this.length > 0;) this.remove(this.length - 1)
                    }
                    get(n) {
                        const t = Jy(this._lContainer);
                        return null !== t && t[n] || null
                    }
                    get length() {
                        return this._lContainer.length - Ye
                    }
                    createEmbeddedView(n, t, r) {
                        let o, i;
                        "number" == typeof r ? o = r : null != r && (o = r.index, i = r.injector);
                        const s = n.createEmbeddedView(t || {}, i);
                        return this.insert(s, o), s
                    }
                    createComponent(n, t, r, o, i) {
                        const s = n && ! function Wo(e) {
                            return "function" == typeof e
                        }(n);
                        let a;
                        if (s) a = t;
                        else {
                            const d = t || {};
                            a = d.index, r = d.injector, o = d.projectableNodes, i = d.environmentInjector || d.ngModuleRef
                        }
                        const l = s ? n : new li(te(n)),
                            u = r || this.parentInjector;
                        if (!i && null == l.ngModule) {
                            const f = (s ? u : this.parentInjector).get(nn, null);
                            f && (i = f)
                        }
                        const c = l.create(u, o, void 0, i);
                        return this.insert(c.hostView, a), c
                    }
                    insert(n, t) {
                        const r = n._lView,
                            o = r[b];
                        if (function KE(e) {
                            return jt(e[_e])
                        }(r)) {
                            const c = this.indexOf(n);
                            if (-1 !== c) this.detach(c);
                            else {
                                const d = r[_e],
                                    f = new qy(d, d[ze], d[_e]);
                                f.detach(f.indexOf(n))
                            }
                        }
                        const i = this._adjustIndex(t),
                            s = this._lContainer;
                        ! function y0(e, n, t, r) {
                            const o = Ye + r,
                                i = t.length;
                            r > 0 && (t[o - 1][Vt] = n), r < i - Ye ? (n[Vt] = t[o], lp(t, Ye + r, n)) : (t.push(n), n[Vt] = null), n[_e] = t;
                            const s = n[jo];
                            null !== s && t !== s && function v0(e, n) {
                                const t = e[Rr];
                                n[We] !== n[_e][_e][We] && (e[bh] = !0), null === t ? e[Rr] = [n] : t.push(n)
                            }(s, n);
                            const a = n[Qt];
                            null !== a && a.insertView(e), n[H] |= 64
                        }(o, r, s, i);
                        const a = Su(i, s),
                            l = r[z],
                            u = Ts(l, s[ds]);
                        return null !== u && function p0(e, n, t, r, o, i) {
                            r[mn] = o, r[ze] = n, ei(e, r, t, 1, o, i)
                        }(o, s[ze], l, r, u, a), n.attachToViewContainerRef(), lp(xc(s), i, n), n
                    }
                    move(n, t) {
                        return this.insert(n, t)
                    }
                    indexOf(n) {
                        const t = Jy(this._lContainer);
                        return null !== t ? t.indexOf(n) : -1
                    }
                    remove(n) {
                        const t = this._adjustIndex(n, -1),
                            r = wu(this._lContainer, t);
                        r && (Ss(xc(this._lContainer), t), Op(r[b], r))
                    }
                    detach(n) {
                        const t = this._adjustIndex(n, -1),
                            r = wu(this._lContainer, t);
                        return r && null != Ss(xc(this._lContainer), t) ? new ai(r) : null
                    }
                    _adjustIndex(n, t = 0) {
                        return n ?? this.length + t
                    }
                };

            function Jy(e) {
                return e[fs]
            }

            function xc(e) {
                return e[fs] || (e[fs] = [])
            }

            function Xy(e, n) {
                let t;
                const r = n[e.index];
                if (jt(r)) t = r;
                else {
                    let o;
                    if (8 & e.type) o = je(r);
                    else {
                        const i = n[z];
                        o = i.createComment("");
                        const s = mt(e, n);
                        ar(i, Ts(i, s), o, function w0(e, n) {
                            return e.nextSibling(n)
                        }(i, s), !1)
                    }
                    n[e.index] = t = zg(r, n, o, e), $s(n, t)
                }
                return new qy(t, e, n)
            }
            class Rc {
                constructor(n) {
                    this.queryList = n, this.matches = null
                }
                clone() {
                    return new Rc(this.queryList)
                }
                setDirty() {
                    this.queryList.setDirty()
                }
            }
            class Oc {
                constructor(n = []) {
                    this.queries = n
                }
                createEmbeddedView(n) {
                    const t = n.queries;
                    if (null !== t) {
                        const r = null !== n.contentQueries ? n.contentQueries[0] : t.length,
                            o = [];
                        for (let i = 0; i < r; i++) {
                            const s = t.getByIndex(i);
                            o.push(this.queries[s.indexInDeclarationView].clone())
                        }
                        return new Oc(o)
                    }
                    return null
                }
                insertView(n) {
                    this.dirtyQueriesWithMatches(n)
                }
                detachView(n) {
                    this.dirtyQueriesWithMatches(n)
                }
                dirtyQueriesWithMatches(n) {
                    for (let t = 0; t < this.queries.length; t++) null !== tv(n, t).matches && this.queries[t].setDirty()
                }
            }
            class Ky {
                constructor(n, t, r = null) {
                    this.predicate = n, this.flags = t, this.read = r
                }
            }
            class Nc {
                constructor(n = []) {
                    this.queries = n
                }
                elementStart(n, t) {
                    for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(n, t)
                }
                elementEnd(n) {
                    for (let t = 0; t < this.queries.length; t++) this.queries[t].elementEnd(n)
                }
                embeddedTView(n) {
                    let t = null;
                    for (let r = 0; r < this.length; r++) {
                        const o = null !== t ? t.length : 0,
                            i = this.getByIndex(r).embeddedTView(n, o);
                        i && (i.indexInDeclarationView = r, null !== t ? t.push(i) : t = [i])
                    }
                    return null !== t ? new Nc(t) : null
                }
                template(n, t) {
                    for (let r = 0; r < this.queries.length; r++) this.queries[r].template(n, t)
                }
                getByIndex(n) {
                    return this.queries[n]
                }
                get length() {
                    return this.queries.length
                }
                track(n) {
                    this.queries.push(n)
                }
            }
            class Fc {
                constructor(n, t = -1) {
                    this.metadata = n, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = t
                }
                elementStart(n, t) {
                    this.isApplyingToNode(t) && this.matchTNode(n, t)
                }
                elementEnd(n) {
                    this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1)
                }
                template(n, t) {
                    this.elementStart(n, t)
                }
                embeddedTView(n, t) {
                    return this.isApplyingToNode(n) ? (this.crossesNgTemplate = !0, this.addMatch(-n.index, t), new Fc(this.metadata)) : null
                }
                isApplyingToNode(n) {
                    if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                        const t = this._declarationNodeIndex;
                        let r = n.parent;
                        for (; null !== r && 8 & r.type && r.index !== t;) r = r.parent;
                        return t === (null !== r ? r.index : -1)
                    }
                    return this._appliesToNextNode
                }
                matchTNode(n, t) {
                    const r = this.metadata.predicate;
                    if (Array.isArray(r))
                        for (let o = 0; o < r.length; o++) {
                            const i = r[o];
                            this.matchTNodeWithReadOption(n, t, wT(t, i)), this.matchTNodeWithReadOption(n, t, Es(t, n, i, !1, !1))
                        } else r === Sn ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1) : this.matchTNodeWithReadOption(n, t, Es(t, n, r, !1, !1))
                }
                matchTNodeWithReadOption(n, t, r) {
                    if (null !== r) {
                        const o = this.metadata.read;
                        if (null !== o)
                            if (o === _t || o === Wt || o === Sn && 4 & t.type) this.addMatch(t.index, -2);
                            else {
                                const i = Es(t, n, o, !1, !1);
                                null !== i && this.addMatch(t.index, i)
                            }
                        else this.addMatch(t.index, r)
                    }
                }
                addMatch(n, t) {
                    null === this.matches ? this.matches = [n, t] : this.matches.push(n, t)
                }
            }

            function wT(e, n) {
                const t = e.localNames;
                if (null !== t)
                    for (let r = 0; r < t.length; r += 2)
                        if (t[r] === n) return t[r + 1];
                return null
            }

            function bT(e, n, t, r) {
                return -1 === t ? function ET(e, n) {
                    return 11 & e.type ? zr(e, n) : 4 & e.type ? ra(e, n) : null
                }(n, e) : -2 === t ? function ST(e, n, t) {
                    return t === _t ? zr(n, e) : t === Sn ? ra(n, e) : t === Wt ? Xy(n, e) : void 0
                }(e, n, r) : ir(e, e[b], t, n)
            }

            function Zy(e, n, t, r) {
                const o = n[Qt].queries[r];
                if (null === o.matches) {
                    const i = e.data,
                        s = t.matches,
                        a = [];
                    for (let l = 0; l < s.length; l += 2) {
                        const u = s[l];
                        a.push(u < 0 ? null : bT(n, i[u], s[l + 1], t.metadata.read))
                    }
                    o.matches = a
                }
                return o.matches
            }

            function Pc(e, n, t, r) {
                const o = e.queries.getByIndex(t),
                    i = o.matches;
                if (null !== i) {
                    const s = Zy(e, n, o, t);
                    for (let a = 0; a < i.length; a += 2) {
                        const l = i[a];
                        if (l > 0) r.push(s[a / 2]);
                        else {
                            const u = i[a + 1],
                                c = n[-l];
                            for (let d = Ye; d < c.length; d++) {
                                const f = c[d];
                                f[jo] === f[_e] && Pc(f[b], f, u, r)
                            }
                            if (null !== c[Rr]) {
                                const d = c[Rr];
                                for (let f = 0; f < d.length; f++) {
                                    const h = d[f];
                                    Pc(h[b], h, u, r)
                                }
                            }
                        }
                    }
                }
                return r
            }

            function hr(e) {
                const n = _(),
                    t = Z(),
                    r = Bh();
                Jl(r + 1);
                const o = tv(t, r);
                if (e.dirty && function XE(e) {
                    return 4 == (4 & e[H])
                }(n) === (2 == (2 & o.metadata.flags))) {
                    if (null === o.matches) e.reset([]);
                    else {
                        const i = o.crossesNgTemplate ? Pc(t, n, r, []) : Zy(t, n, o, r);
                        e.reset(i, hS), e.notifyOnChanges()
                    }
                    return !0
                }
                return !1
            }

            function co(e, n, t) {
                const r = Z();
                r.firstCreatePass && (ev(r, new Ky(e, n, t), -1), 2 == (2 & n) && (r.staticViewQueries = !0)), Qy(r, _(), n)
            }

            function pr() {
                return function MT(e, n) {
                    return e[Qt].queries[n].queryList
                }(_(), Bh())
            }

            function Qy(e, n, t) {
                const r = new Tc(4 == (4 & t));
                jg(e, n, r, r.destroy), null === n[Qt] && (n[Qt] = new Oc), n[Qt].queries.push(new Rc(r))
            }

            function ev(e, n, t) {
                null === e.queries && (e.queries = new Nc), e.queries.track(new Fc(n, t))
            }

            function tv(e, n) {
                return e.queries.getByIndex(n)
            }

            function nv(e, n) {
                return ra(e, n)
            }

            function ia(...e) { }
            const sa = new M("Application Initializer");
            let aa = (() => {
                class e {
                    constructor(t) {
                        this.appInits = t, this.resolve = ia, this.reject = ia, this.initialized = !1, this.done = !1, this.donePromise = new Promise((r, o) => {
                            this.resolve = r, this.reject = o
                        })
                    }
                    runInitializers() {
                        if (this.initialized) return;
                        const t = [],
                            r = () => {
                                this.done = !0, this.resolve()
                            };
                        if (this.appInits)
                            for (let o = 0; o < this.appInits.length; o++) {
                                const i = this.appInits[o]();
                                if (ci(i)) t.push(i);
                                else if (hc(i)) {
                                    const s = new Promise((a, l) => {
                                        i.subscribe({
                                            complete: a,
                                            error: l
                                        })
                                    });
                                    t.push(s)
                                }
                            }
                        Promise.all(t).then(() => {
                            r()
                        }).catch(o => {
                            this.reject(o)
                        }), 0 === t.length && r(), this.initialized = !0
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(sa, 8))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const Di = new M("AppId", {
                providedIn: "root",
                factory: function Cv() {
                    return `${$c()}${$c()}${$c()}`
                }
            });

            function $c() {
                return String.fromCharCode(97 + Math.floor(25 * Math.random()))
            }
            const Dv = new M("Platform Initializer"),
                Uc = new M("Platform ID", {
                    providedIn: "platform",
                    factory: () => "unknown"
                });
            let qT = (() => {
                class e {
                    log(t) {
                        console.log(t)
                    }
                    warn(t) {
                        console.warn(t)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "platform"
                }), e
            })();
            const Mn = new M("LocaleId", {
                providedIn: "root",
                factory: () => W(Mn, P.Optional | P.SkipSelf) || function JT() {
                    return typeof $localize < "u" && $localize.locale || lo
                }()
            });
            class KT {
                constructor(n, t) {
                    this.ngModuleFactory = n, this.componentFactories = t
                }
            }
            let wv = (() => {
                class e {
                    compileModuleSync(t) {
                        return new Sc(t)
                    }
                    compileModuleAsync(t) {
                        return Promise.resolve(this.compileModuleSync(t))
                    }
                    compileModuleAndAllComponentsSync(t) {
                        const r = this.compileModuleSync(t),
                            i = En(ht(t).declarations).reduce((s, a) => {
                                const l = te(a);
                                return l && s.push(new li(l)), s
                            }, []);
                        return new KT(r, i)
                    }
                    compileModuleAndAllComponentsAsync(t) {
                        return Promise.resolve(this.compileModuleAndAllComponentsSync(t))
                    }
                    clearCache() { }
                    clearCacheFor(t) { }
                    getModuleId(t) { }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const QT = (() => Promise.resolve(0))();

            function Hc(e) {
                typeof Zone > "u" ? QT.then(() => {
                    e && e.apply(null, null)
                }) : Zone.current.scheduleMicroTask("scheduleMicrotask", e)
            }
            class we {
                constructor({
                    enableLongStackTrace: n = !1,
                    shouldCoalesceEventChangeDetection: t = !1,
                    shouldCoalesceRunChangeDetection: r = !1
                }) {
                    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new ue(!1), this.onMicrotaskEmpty = new ue(!1), this.onStable = new ue(!1), this.onError = new ue(!1), typeof Zone > "u") throw new D(908, !1);
                    Zone.assertZonePatched();
                    const o = this;
                    o._nesting = 0, o._outer = o._inner = Zone.current, Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)), n && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && t, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = function ex() {
                        let e = fe.requestAnimationFrame,
                            n = fe.cancelAnimationFrame;
                        if (typeof Zone < "u" && e && n) {
                            const t = e[Zone.__symbol__("OriginalDelegate")];
                            t && (e = t);
                            const r = n[Zone.__symbol__("OriginalDelegate")];
                            r && (n = r)
                        }
                        return {
                            nativeRequestAnimationFrame: e,
                            nativeCancelAnimationFrame: n
                        }
                    }().nativeRequestAnimationFrame,
                        function rx(e) {
                            const n = () => {
                                ! function nx(e) {
                                    e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(fe, () => {
                                        e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                            e.lastRequestAnimationFrameId = -1, zc(e), e.isCheckStableRunning = !0, Gc(e), e.isCheckStableRunning = !1
                                        }, void 0, () => { }, () => { })), e.fakeTopEventTask.invoke()
                                    }), zc(e))
                                }(e)
                            };
                            e._inner = e._inner.fork({
                                name: "angular",
                                properties: {
                                    isAngularZone: !0
                                },
                                onInvokeTask: (t, r, o, i, s, a) => {
                                    try {
                                        return Sv(e), t.invokeTask(o, i, s, a)
                                    } finally {
                                        (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && n(), Mv(e)
                                    }
                                },
                                onInvoke: (t, r, o, i, s, a, l) => {
                                    try {
                                        return Sv(e), t.invoke(o, i, s, a, l)
                                    } finally {
                                        e.shouldCoalesceRunChangeDetection && n(), Mv(e)
                                    }
                                },
                                onHasTask: (t, r, o, i) => {
                                    t.hasTask(o, i), r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask, zc(e), Gc(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                                },
                                onHandleError: (t, r, o, i) => (t.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1)
                            })
                        }(o)
                }
                static isInAngularZone() {
                    return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
                }
                static assertInAngularZone() {
                    if (!we.isInAngularZone()) throw new D(909, !1)
                }
                static assertNotInAngularZone() {
                    if (we.isInAngularZone()) throw new D(909, !1)
                }
                run(n, t, r) {
                    return this._inner.run(n, t, r)
                }
                runTask(n, t, r, o) {
                    const i = this._inner,
                        s = i.scheduleEventTask("NgZoneEvent: " + o, n, tx, ia, ia);
                    try {
                        return i.runTask(s, t, r)
                    } finally {
                        i.cancelTask(s)
                    }
                }
                runGuarded(n, t, r) {
                    return this._inner.runGuarded(n, t, r)
                }
                runOutsideAngular(n) {
                    return this._outer.run(n)
                }
            }
            const tx = {};

            function Gc(e) {
                if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
                    e._nesting++, e.onMicrotaskEmpty.emit(null)
                } finally {
                        if (e._nesting--, !e.hasPendingMicrotasks) try {
                            e.runOutsideAngular(() => e.onStable.emit(null))
                        } finally {
                                e.isStable = !0
                            }
                    }
            }

            function zc(e) {
                e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
            }

            function Sv(e) {
                e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
            }

            function Mv(e) {
                e._nesting--, Gc(e)
            }
            class ox {
                constructor() {
                    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new ue, this.onMicrotaskEmpty = new ue, this.onStable = new ue, this.onError = new ue
                }
                run(n, t, r) {
                    return n.apply(t, r)
                }
                runGuarded(n, t, r) {
                    return n.apply(t, r)
                }
                runOutsideAngular(n) {
                    return n()
                }
                runTask(n, t, r, o) {
                    return n.apply(t, r)
                }
            }
            const Iv = new M(""),
                la = new M("");
            let Jc, Wc = (() => {
                class e {
                    constructor(t, r, o) {
                        this._ngZone = t, this.registry = r, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, Jc || (function ix(e) {
                            Jc = e
                        }(o), o.addToWindow(r)), this._watchAngularEvents(), t.run(() => {
                            this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                        })
                    }
                    _watchAngularEvents() {
                        this._ngZone.onUnstable.subscribe({
                            next: () => {
                                this._didWork = !0, this._isZoneStable = !1
                            }
                        }), this._ngZone.runOutsideAngular(() => {
                            this._ngZone.onStable.subscribe({
                                next: () => {
                                    we.assertNotInAngularZone(), Hc(() => {
                                        this._isZoneStable = !0, this._runCallbacksIfReady()
                                    })
                                }
                            })
                        })
                    }
                    increasePendingRequestCount() {
                        return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                    }
                    decreasePendingRequestCount() {
                        if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                        return this._runCallbacksIfReady(), this._pendingCount
                    }
                    isStable() {
                        return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                    }
                    _runCallbacksIfReady() {
                        if (this.isStable()) Hc(() => {
                            for (; 0 !== this._callbacks.length;) {
                                let t = this._callbacks.pop();
                                clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                            }
                            this._didWork = !1
                        });
                        else {
                            let t = this.getPendingTasks();
                            this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(t) || (clearTimeout(r.timeoutId), !1)), this._didWork = !0
                        }
                    }
                    getPendingTasks() {
                        return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                            source: t.source,
                            creationLocation: t.creationLocation,
                            data: t.data
                        })) : []
                    }
                    addCallback(t, r, o) {
                        let i = -1;
                        r && r > 0 && (i = setTimeout(() => {
                            this._callbacks = this._callbacks.filter(s => s.timeoutId !== i), t(this._didWork, this.getPendingTasks())
                        }, r)), this._callbacks.push({
                            doneCb: t,
                            timeoutId: i,
                            updateCb: o
                        })
                    }
                    whenStable(t, r, o) {
                        if (o && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                        this.addCallback(t, r, o), this._runCallbacksIfReady()
                    }
                    getPendingRequestCount() {
                        return this._pendingCount
                    }
                    registerApplication(t) {
                        this.registry.registerApplication(t, this)
                    }
                    unregisterApplication(t) {
                        this.registry.unregisterApplication(t)
                    }
                    findProviders(t, r, o) {
                        return []
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(we), S(qc), S(la))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })(),
                qc = (() => {
                    class e {
                        constructor() {
                            this._applications = new Map
                        }
                        registerApplication(t, r) {
                            this._applications.set(t, r)
                        }
                        unregisterApplication(t) {
                            this._applications.delete(t)
                        }
                        unregisterAllApplications() {
                            this._applications.clear()
                        }
                        getTestability(t) {
                            return this._applications.get(t) || null
                        }
                        getAllTestabilities() {
                            return Array.from(this._applications.values())
                        }
                        getAllRootElements() {
                            return Array.from(this._applications.keys())
                        }
                        findTestabilityInTree(t, r = !0) {
                            return Jc?.findTestabilityInTree(this, t, r) ?? null
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275prov = T({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "platform"
                    }), e
                })();
            const In = !1;
            let $n = null;
            const Av = new M("AllowMultipleToken"),
                Xc = new M("PlatformDestroyListeners"),
                Tv = new M("appBootstrapListener");
            class xv {
                constructor(n, t) {
                    this.name = n, this.token = t
                }
            }

            function Ov(e, n, t = []) {
                const r = `Platform: ${n}`,
                    o = new M(r);
                return (i = []) => {
                    let s = Kc();
                    if (!s || s.injector.get(Av, !1)) {
                        const a = [...t, ...i, {
                            provide: o,
                            useValue: !0
                        }];
                        e ? e(a) : function lx(e) {
                            if ($n && !$n.get(Av, !1)) throw new D(400, !1);
                            $n = e;
                            const n = e.get(Fv);
                            (function Rv(e) {
                                const n = e.get(Dv, null);
                                n && n.forEach(t => t())
                            })(e)
                        }(function Nv(e = [], n) {
                            return Ut.create({
                                name: n,
                                providers: [{
                                    provide: Vu,
                                    useValue: "platform"
                                }, {
                                    provide: Xc,
                                    useValue: new Set([() => $n = null])
                                }, ...e]
                            })
                        }(a, r))
                    }
                    return function cx(e) {
                        const n = Kc();
                        if (!n) throw new D(401, !1);
                        return n
                    }()
                }
            }

            function Kc() {
                return $n?.get(Fv) ?? null
            }
            let Fv = (() => {
                class e {
                    constructor(t) {
                        this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                    }
                    bootstrapModuleFactory(t, r) {
                        const o = function kv(e, n) {
                            let t;
                            return t = "noop" === e ? new ox : ("zone.js" === e ? void 0 : e) || new we(n), t
                        }(r?.ngZone, function Pv(e) {
                            return {
                                enableLongStackTrace: !1,
                                shouldCoalesceEventChangeDetection: !(!e || !e.ngZoneEventCoalescing) || !1,
                                shouldCoalesceRunChangeDetection: !(!e || !e.ngZoneRunCoalescing) || !1
                            }
                        }(r)),
                            i = [{
                                provide: we,
                                useValue: o
                            }];
                        return o.run(() => {
                            const s = Ut.create({
                                providers: i,
                                parent: this.injector,
                                name: t.moduleType.name
                            }),
                                a = t.create(s),
                                l = a.injector.get(Wr, null);
                            if (!l) throw new D(402, !1);
                            return o.runOutsideAngular(() => {
                                const u = o.onError.subscribe({
                                    next: c => {
                                        l.handleError(c)
                                    }
                                });
                                a.onDestroy(() => {
                                    ca(this._modules, a), u.unsubscribe()
                                })
                            }),
                                function Lv(e, n, t) {
                                    try {
                                        const r = t();
                                        return ci(r) ? r.catch(o => {
                                            throw n.runOutsideAngular(() => e.handleError(o)), o
                                        }) : r
                                    } catch (r) {
                                        throw n.runOutsideAngular(() => e.handleError(r)), r
                                    }
                                }(l, o, () => {
                                    const u = a.injector.get(aa);
                                    return u.runInitializers(), u.donePromise.then(() => (function ly(e) {
                                        St(e, "Expected localeId to be defined"), "string" == typeof e && (ay = e.toLowerCase().replace(/_/g, "-"))
                                    }(a.injector.get(Mn, lo) || lo), this._moduleDoBootstrap(a), a))
                                })
                        })
                    }
                    bootstrapModule(t, r = []) {
                        const o = Vv({}, r);
                        return function sx(e, n, t) {
                            const r = new Sc(t);
                            return Promise.resolve(r)
                        }(0, 0, t).then(i => this.bootstrapModuleFactory(i, o))
                    }
                    _moduleDoBootstrap(t) {
                        const r = t.injector.get(ua);
                        if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(o => r.bootstrap(o));
                        else {
                            if (!t.instance.ngDoBootstrap) throw new D(-403, !1);
                            t.instance.ngDoBootstrap(r)
                        }
                        this._modules.push(t)
                    }
                    onDestroy(t) {
                        this._destroyListeners.push(t)
                    }
                    get injector() {
                        return this._injector
                    }
                    destroy() {
                        if (this._destroyed) throw new D(404, !1);
                        this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
                        const t = this._injector.get(Xc, null);
                        t && (t.forEach(r => r()), t.clear()), this._destroyed = !0
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(Ut))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "platform"
                }), e
            })();

            function Vv(e, n) {
                return Array.isArray(n) ? n.reduce(Vv, e) : {
                    ...e,
                    ...n
                }
            }
            let ua = (() => {
                class e {
                    get destroyed() {
                        return this._destroyed
                    }
                    get injector() {
                        return this._injector
                    }
                    constructor(t, r, o) {
                        this._zone = t, this._injector = r, this._exceptionHandler = o, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this._destroyed = !1, this._destroyListeners = [], this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                            next: () => {
                                this._zone.run(() => {
                                    this.tick()
                                })
                            }
                        });
                        const i = new ye(a => {
                            this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                                a.next(this._stable), a.complete()
                            })
                        }),
                            s = new ye(a => {
                                let l;
                                this._zone.runOutsideAngular(() => {
                                    l = this._zone.onStable.subscribe(() => {
                                        we.assertNotInAngularZone(), Hc(() => {
                                            !this._stable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks && (this._stable = !0, a.next(!0))
                                        })
                                    })
                                });
                                const u = this._zone.onUnstable.subscribe(() => {
                                    we.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                        a.next(!1)
                                    }))
                                });
                                return () => {
                                    l.unsubscribe(), u.unsubscribe()
                                }
                            });
                        this.isStable = function mE(...e) {
                            const n = No(e),
                                t = function uE(e, n) {
                                    return "number" == typeof Il(e) ? e.pop() : n
                                }(e, 1 / 0),
                                r = e;
                            return r.length ? 1 === r.length ? it(r[0]) : Sr(t)(Ae(r, n)) : Kt
                        }(i, s.pipe(function yE(e = {}) {
                            const {
                                connector: n = (() => new fn),
                                resetOnError: t = !0,
                                resetOnComplete: r = !0,
                                resetOnRefCountZero: o = !0
                            } = e;
                            return i => {
                                let s, a, l, u = 0,
                                    c = !1,
                                    d = !1;
                                const f = () => {
                                    a?.unsubscribe(), a = void 0
                                },
                                    h = () => {
                                        f(), s = l = void 0, c = d = !1
                                    },
                                    p = () => {
                                        const g = s;
                                        h(), g?.unsubscribe()
                                    };
                                return Ie((g, m) => {
                                    u++, !d && !c && f();
                                    const v = l = l ?? n();
                                    m.add(() => {
                                        u--, 0 === u && !d && !c && (a = Al(p, o))
                                    }), v.subscribe(m), !s && u > 0 && (s = new Oo({
                                        next: w => v.next(w),
                                        error: w => {
                                            d = !0, f(), a = Al(h, t, w), v.error(w)
                                        },
                                        complete: () => {
                                            c = !0, f(), a = Al(h, r), v.complete()
                                        }
                                    }), it(g).subscribe(s))
                                })(i)
                            }
                        }()))
                    }
                    bootstrap(t, r) {
                        const o = t instanceof pg;
                        if (!this._injector.get(aa).done) {
                            !o && function Ir(e) {
                                const n = te(e) || Ge(e) || Ze(e);
                                return null !== n && n.standalone
                            }(t);
                            throw new D(405, In)
                        }
                        let s;
                        s = o ? t : this._injector.get(oi).resolveComponentFactory(t), this.componentTypes.push(s.componentType);
                        const a = function ax(e) {
                            return e.isBoundToModule
                        }(s) ? void 0 : this._injector.get(uo),
                            u = s.create(Ut.NULL, [], r || s.selector, a),
                            c = u.location.nativeElement,
                            d = u.injector.get(Iv, null);
                        return d?.registerApplication(c), u.onDestroy(() => {
                            this.detachView(u.hostView), ca(this.components, u), d?.unregisterApplication(c)
                        }), this._loadComponent(u), u
                    }
                    tick() {
                        if (this._runningTick) throw new D(101, !1);
                        try {
                            this._runningTick = !0;
                            for (let t of this._views) t.detectChanges()
                        } catch (t) {
                            this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t))
                        } finally {
                            this._runningTick = !1
                        }
                    }
                    attachView(t) {
                        const r = t;
                        this._views.push(r), r.attachToAppRef(this)
                    }
                    detachView(t) {
                        const r = t;
                        ca(this._views, r), r.detachFromAppRef()
                    }
                    _loadComponent(t) {
                        this.attachView(t.hostView), this.tick(), this.components.push(t);
                        const r = this._injector.get(Tv, []);
                        r.push(...this._bootstrapListeners), r.forEach(o => o(t))
                    }
                    ngOnDestroy() {
                        if (!this._destroyed) try {
                            this._destroyListeners.forEach(t => t()), this._views.slice().forEach(t => t.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
                        } finally {
                                this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
                            }
                    }
                    onDestroy(t) {
                        return this._destroyListeners.push(t), () => ca(this._destroyListeners, t)
                    }
                    destroy() {
                        if (this._destroyed) throw new D(406, !1);
                        const t = this._injector;
                        t.destroy && !t.destroyed && t.destroy()
                    }
                    get viewCount() {
                        return this._views.length
                    }
                    warnIfDestroyed() { }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(we), S(nn), S(Wr))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();

            function ca(e, n) {
                const t = e.indexOf(n);
                t > -1 && e.splice(t, 1)
            }
            let da = (() => {
                class e { }
                return e.__NG_ELEMENT_ID__ = fx, e
            })();

            function fx(e) {
                return function hx(e, n, t) {
                    if ($o(e) && !t) {
                        const r = yt(e.index, n);
                        return new ai(r, r)
                    }
                    return 47 & e.type ? new ai(n[We], n) : null
                }(Be(), _(), 16 == (16 & e))
            }
            class Hv {
                constructor() { }
                supports(n) {
                    return zs(n)
                }
                create(n) {
                    return new _x(n)
                }
            }
            const vx = (e, n) => n;
            class _x {
                constructor(n) {
                    this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = n || vx
                }
                forEachItem(n) {
                    let t;
                    for (t = this._itHead; null !== t; t = t._next) n(t)
                }
                forEachOperation(n) {
                    let t = this._itHead,
                        r = this._removalsHead,
                        o = 0,
                        i = null;
                    for (; t || r;) {
                        const s = !r || t && t.currentIndex < zv(r, o, i) ? t : r,
                            a = zv(s, o, i),
                            l = s.currentIndex;
                        if (s === r) o--, r = r._nextRemoved;
                        else if (t = t._next, null == s.previousIndex) o++;
                        else {
                            i || (i = []);
                            const u = a - o,
                                c = l - o;
                            if (u != c) {
                                for (let f = 0; f < u; f++) {
                                    const h = f < i.length ? i[f] : i[f] = 0,
                                        p = h + f;
                                    c <= p && p < u && (i[f] = h + 1)
                                }
                                i[s.previousIndex] = c - u
                            }
                        }
                        a !== l && n(s, a, l)
                    }
                }
                forEachPreviousItem(n) {
                    let t;
                    for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t)
                }
                forEachAddedItem(n) {
                    let t;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
                }
                forEachMovedItem(n) {
                    let t;
                    for (t = this._movesHead; null !== t; t = t._nextMoved) n(t)
                }
                forEachRemovedItem(n) {
                    let t;
                    for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
                }
                forEachIdentityChange(n) {
                    let t;
                    for (t = this._identityChangesHead; null !== t; t = t._nextIdentityChange) n(t)
                }
                diff(n) {
                    if (null == n && (n = []), !zs(n)) throw new D(900, !1);
                    return this.check(n) ? this : null
                }
                onDestroy() { }
                check(n) {
                    this._reset();
                    let o, i, s, t = this._itHead,
                        r = !1;
                    if (Array.isArray(n)) {
                        this.length = n.length;
                        for (let a = 0; a < this.length; a++) i = n[a], s = this._trackByFn(a, i), null !== t && Object.is(t.trackById, s) ? (r && (t = this._verifyReinsertion(t, i, s, a)), Object.is(t.item, i) || this._addIdentityChange(t, i)) : (t = this._mismatch(t, i, s, a), r = !0), t = t._next
                    } else o = 0,
                        function XM(e, n) {
                            if (Array.isArray(e))
                                for (let t = 0; t < e.length; t++) n(e[t]);
                            else {
                                const t = e[Symbol.iterator]();
                                let r;
                                for (; !(r = t.next()).done;) n(r.value)
                            }
                        }(n, a => {
                            s = this._trackByFn(o, a), null !== t && Object.is(t.trackById, s) ? (r && (t = this._verifyReinsertion(t, a, s, o)), Object.is(t.item, a) || this._addIdentityChange(t, a)) : (t = this._mismatch(t, a, s, o), r = !0), t = t._next, o++
                        }), this.length = o;
                    return this._truncate(t), this.collection = n, this.isDirty
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
                }
                _reset() {
                    if (this.isDirty) {
                        let n;
                        for (n = this._previousItHead = this._itHead; null !== n; n = n._next) n._nextPrevious = n._next;
                        for (n = this._additionsHead; null !== n; n = n._nextAdded) n.previousIndex = n.currentIndex;
                        for (this._additionsHead = this._additionsTail = null, n = this._movesHead; null !== n; n = n._nextMoved) n.previousIndex = n.currentIndex;
                        this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                    }
                }
                _mismatch(n, t, r, o) {
                    let i;
                    return null === n ? i = this._itTail : (i = n._prev, this._remove(n)), null !== (n = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null)) ? (Object.is(n.item, t) || this._addIdentityChange(n, t), this._reinsertAfter(n, i, o)) : null !== (n = null === this._linkedRecords ? null : this._linkedRecords.get(r, o)) ? (Object.is(n.item, t) || this._addIdentityChange(n, t), this._moveAfter(n, i, o)) : n = this._addAfter(new Cx(t, r), i, o), n
                }
                _verifyReinsertion(n, t, r, o) {
                    let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
                    return null !== i ? n = this._reinsertAfter(i, n._prev, o) : n.currentIndex != o && (n.currentIndex = o, this._addToMoves(n, o)), n
                }
                _truncate(n) {
                    for (; null !== n;) {
                        const t = n._next;
                        this._addToRemovals(this._unlink(n)), n = t
                    }
                    null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
                }
                _reinsertAfter(n, t, r) {
                    null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
                    const o = n._prevRemoved,
                        i = n._nextRemoved;
                    return null === o ? this._removalsHead = i : o._nextRemoved = i, null === i ? this._removalsTail = o : i._prevRemoved = o, this._insertAfter(n, t, r), this._addToMoves(n, r), n
                }
                _moveAfter(n, t, r) {
                    return this._unlink(n), this._insertAfter(n, t, r), this._addToMoves(n, r), n
                }
                _addAfter(n, t, r) {
                    return this._insertAfter(n, t, r), this._additionsTail = null === this._additionsTail ? this._additionsHead = n : this._additionsTail._nextAdded = n, n
                }
                _insertAfter(n, t, r) {
                    const o = null === t ? this._itHead : t._next;
                    return n._next = o, n._prev = t, null === o ? this._itTail = n : o._prev = n, null === t ? this._itHead = n : t._next = n, null === this._linkedRecords && (this._linkedRecords = new Gv), this._linkedRecords.put(n), n.currentIndex = r, n
                }
                _remove(n) {
                    return this._addToRemovals(this._unlink(n))
                }
                _unlink(n) {
                    null !== this._linkedRecords && this._linkedRecords.remove(n);
                    const t = n._prev,
                        r = n._next;
                    return null === t ? this._itHead = r : t._next = r, null === r ? this._itTail = t : r._prev = t, n
                }
                _addToMoves(n, t) {
                    return n.previousIndex === t || (this._movesTail = null === this._movesTail ? this._movesHead = n : this._movesTail._nextMoved = n), n
                }
                _addToRemovals(n) {
                    return null === this._unlinkedRecords && (this._unlinkedRecords = new Gv), this._unlinkedRecords.put(n), n.currentIndex = null, n._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = n, n._prevRemoved = null) : (n._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = n), n
                }
                _addIdentityChange(n, t) {
                    return n.item = t, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = n : this._identityChangesTail._nextIdentityChange = n, n
                }
            }
            class Cx {
                constructor(n, t) {
                    this.item = n, this.trackById = t, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
                }
            }
            class Dx {
                constructor() {
                    this._head = null, this._tail = null
                }
                add(n) {
                    null === this._head ? (this._head = this._tail = n, n._nextDup = null, n._prevDup = null) : (this._tail._nextDup = n, n._prevDup = this._tail, n._nextDup = null, this._tail = n)
                }
                get(n, t) {
                    let r;
                    for (r = this._head; null !== r; r = r._nextDup)
                        if ((null === t || t <= r.currentIndex) && Object.is(r.trackById, n)) return r;
                    return null
                }
                remove(n) {
                    const t = n._prevDup,
                        r = n._nextDup;
                    return null === t ? this._head = r : t._nextDup = r, null === r ? this._tail = t : r._prevDup = t, null === this._head
                }
            }
            class Gv {
                constructor() {
                    this.map = new Map
                }
                put(n) {
                    const t = n.trackById;
                    let r = this.map.get(t);
                    r || (r = new Dx, this.map.set(t, r)), r.add(n)
                }
                get(n, t) {
                    const o = this.map.get(n);
                    return o ? o.get(n, t) : null
                }
                remove(n) {
                    const t = n.trackById;
                    return this.map.get(t).remove(n) && this.map.delete(t), n
                }
                get isEmpty() {
                    return 0 === this.map.size
                }
                clear() {
                    this.map.clear()
                }
            }

            function zv(e, n, t) {
                const r = e.previousIndex;
                if (null === r) return r;
                let o = 0;
                return t && r < t.length && (o = t[r]), r + n + o
            }
            class Wv {
                constructor() { }
                supports(n) {
                    return n instanceof Map || uc(n)
                }
                create() {
                    return new wx
                }
            }
            class wx {
                constructor() {
                    this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
                }
                forEachItem(n) {
                    let t;
                    for (t = this._mapHead; null !== t; t = t._next) n(t)
                }
                forEachPreviousItem(n) {
                    let t;
                    for (t = this._previousMapHead; null !== t; t = t._nextPrevious) n(t)
                }
                forEachChangedItem(n) {
                    let t;
                    for (t = this._changesHead; null !== t; t = t._nextChanged) n(t)
                }
                forEachAddedItem(n) {
                    let t;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
                }
                forEachRemovedItem(n) {
                    let t;
                    for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
                }
                diff(n) {
                    if (n) {
                        if (!(n instanceof Map || uc(n))) throw new D(900, !1)
                    } else n = new Map;
                    return this.check(n) ? this : null
                }
                onDestroy() { }
                check(n) {
                    this._reset();
                    let t = this._mapHead;
                    if (this._appendAfter = null, this._forEach(n, (r, o) => {
                        if (t && t.key === o) this._maybeAddToChanges(t, r), this._appendAfter = t, t = t._next;
                        else {
                            const i = this._getOrCreateRecordForKey(o, r);
                            t = this._insertBeforeOrAppend(t, i)
                        }
                    }), t) {
                        t._prev && (t._prev._next = null), this._removalsHead = t;
                        for (let r = t; null !== r; r = r._nextRemoved) r === this._mapHead && (this._mapHead = null), this._records.delete(r.key), r._nextRemoved = r._next, r.previousValue = r.currentValue, r.currentValue = null, r._prev = null, r._next = null
                    }
                    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
                }
                _insertBeforeOrAppend(n, t) {
                    if (n) {
                        const r = n._prev;
                        return t._next = n, t._prev = r, n._prev = t, r && (r._next = t), n === this._mapHead && (this._mapHead = t), this._appendAfter = n, n
                    }
                    return this._appendAfter ? (this._appendAfter._next = t, t._prev = this._appendAfter) : this._mapHead = t, this._appendAfter = t, null
                }
                _getOrCreateRecordForKey(n, t) {
                    if (this._records.has(n)) {
                        const o = this._records.get(n);
                        this._maybeAddToChanges(o, t);
                        const i = o._prev,
                            s = o._next;
                        return i && (i._next = s), s && (s._prev = i), o._next = null, o._prev = null, o
                    }
                    const r = new Ex(n);
                    return this._records.set(n, r), r.currentValue = t, this._addToAdditions(r), r
                }
                _reset() {
                    if (this.isDirty) {
                        let n;
                        for (this._previousMapHead = this._mapHead, n = this._previousMapHead; null !== n; n = n._next) n._nextPrevious = n._next;
                        for (n = this._changesHead; null !== n; n = n._nextChanged) n.previousValue = n.currentValue;
                        for (n = this._additionsHead; null != n; n = n._nextAdded) n.previousValue = n.currentValue;
                        this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                    }
                }
                _maybeAddToChanges(n, t) {
                    Object.is(t, n.currentValue) || (n.previousValue = n.currentValue, n.currentValue = t, this._addToChanges(n))
                }
                _addToAdditions(n) {
                    null === this._additionsHead ? this._additionsHead = this._additionsTail = n : (this._additionsTail._nextAdded = n, this._additionsTail = n)
                }
                _addToChanges(n) {
                    null === this._changesHead ? this._changesHead = this._changesTail = n : (this._changesTail._nextChanged = n, this._changesTail = n)
                }
                _forEach(n, t) {
                    n instanceof Map ? n.forEach(t) : Object.keys(n).forEach(r => t(n[r], r))
                }
            }
            class Ex {
                constructor(n) {
                    this.key = n, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
                }
            }

            function qv() {
                return new pa([new Hv])
            }
            let pa = (() => {
                class e {
                    constructor(t) {
                        this.factories = t
                    }
                    static create(t, r) {
                        if (null != r) {
                            const o = r.factories.slice();
                            t = t.concat(o)
                        }
                        return new e(t)
                    }
                    static extend(t) {
                        return {
                            provide: e,
                            useFactory: r => e.create(t, r || qv()),
                            deps: [
                                [e, new Xo, new Jo]
                            ]
                        }
                    }
                    find(t) {
                        const r = this.factories.find(o => o.supports(t));
                        if (null != r) return r;
                        throw new D(901, !1)
                    }
                }
                return e.\u0275prov = T({
                    token: e,
                    providedIn: "root",
                    factory: qv
                }), e
            })();

            function Jv() {
                return new wi([new Wv])
            }
            let wi = (() => {
                class e {
                    constructor(t) {
                        this.factories = t
                    }
                    static create(t, r) {
                        if (r) {
                            const o = r.factories.slice();
                            t = t.concat(o)
                        }
                        return new e(t)
                    }
                    static extend(t) {
                        return {
                            provide: e,
                            useFactory: r => e.create(t, r || Jv()),
                            deps: [
                                [e, new Xo, new Jo]
                            ]
                        }
                    }
                    find(t) {
                        const r = this.factories.find(o => o.supports(t));
                        if (r) return r;
                        throw new D(901, !1)
                    }
                }
                return e.\u0275prov = T({
                    token: e,
                    providedIn: "root",
                    factory: Jv
                }), e
            })();
            const Mx = Ov(null, "core", []);
            let Ix = (() => {
                class e {
                    constructor(t) { }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(ua))
                }, e.\u0275mod = Lt({
                    type: e
                }), e.\u0275inj = Mt({}), e
            })();

            function po(e) {
                return "boolean" == typeof e ? e : null != e && "false" !== e
            }
            let td = null;

            function An() {
                return td
            }
            class xx { }
            const rt = new M("DocumentToken");
            let nd = (() => {
                class e {
                    historyGo(t) {
                        throw new Error("Not implemented")
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: function () {
                        return function Rx() {
                            return S(Xv)
                        }()
                    },
                    providedIn: "platform"
                }), e
            })();
            const Ox = new M("Location Initialized");
            let Xv = (() => {
                class e extends nd {
                    constructor(t) {
                        super(), this._doc = t, this._location = window.location, this._history = window.history
                    }
                    getBaseHrefFromDOM() {
                        return An().getBaseHref(this._doc)
                    }
                    onPopState(t) {
                        const r = An().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("popstate", t, !1), () => r.removeEventListener("popstate", t)
                    }
                    onHashChange(t) {
                        const r = An().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("hashchange", t, !1), () => r.removeEventListener("hashchange", t)
                    }
                    get href() {
                        return this._location.href
                    }
                    get protocol() {
                        return this._location.protocol
                    }
                    get hostname() {
                        return this._location.hostname
                    }
                    get port() {
                        return this._location.port
                    }
                    get pathname() {
                        return this._location.pathname
                    }
                    get search() {
                        return this._location.search
                    }
                    get hash() {
                        return this._location.hash
                    }
                    set pathname(t) {
                        this._location.pathname = t
                    }
                    pushState(t, r, o) {
                        Kv() ? this._history.pushState(t, r, o) : this._location.hash = o
                    }
                    replaceState(t, r, o) {
                        Kv() ? this._history.replaceState(t, r, o) : this._location.hash = o
                    }
                    forward() {
                        this._history.forward()
                    }
                    back() {
                        this._history.back()
                    }
                    historyGo(t = 0) {
                        this._history.go(t)
                    }
                    getState() {
                        return this._history.state
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(rt))
                }, e.\u0275prov = T({
                    token: e,
                    factory: function () {
                        return function Nx() {
                            return new Xv(S(rt))
                        }()
                    },
                    providedIn: "platform"
                }), e
            })();

            function Kv() {
                return !!window.history.pushState
            }

            function rd(e, n) {
                if (0 == e.length) return n;
                if (0 == n.length) return e;
                let t = 0;
                return e.endsWith("/") && t++, n.startsWith("/") && t++, 2 == t ? e + n.substring(1) : 1 == t ? e + n : e + "/" + n
            }

            function Zv(e) {
                const n = e.match(/#|\?|$/),
                    t = n && n.index || e.length;
                return e.slice(0, t - ("/" === e[t - 1] ? 1 : 0)) + e.slice(t)
            }

            function Tn(e) {
                return e && "?" !== e[0] ? "?" + e : e
            }
            let mr = (() => {
                class e {
                    historyGo(t) {
                        throw new Error("Not implemented")
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: function () {
                        return W(Qv)
                    },
                    providedIn: "root"
                }), e
            })();
            const Yv = new M("appBaseHref");
            let Qv = (() => {
                class e extends mr {
                    constructor(t, r) {
                        super(), this._platformLocation = t, this._removeListenerFns = [], this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? W(rt).location?.origin ?? ""
                    }
                    ngOnDestroy() {
                        for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                    }
                    onPopState(t) {
                        this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                    }
                    getBaseHref() {
                        return this._baseHref
                    }
                    prepareExternalUrl(t) {
                        return rd(this._baseHref, t)
                    }
                    path(t = !1) {
                        const r = this._platformLocation.pathname + Tn(this._platformLocation.search),
                            o = this._platformLocation.hash;
                        return o && t ? `${r}${o}` : r
                    }
                    pushState(t, r, o, i) {
                        const s = this.prepareExternalUrl(o + Tn(i));
                        this._platformLocation.pushState(t, r, s)
                    }
                    replaceState(t, r, o, i) {
                        const s = this.prepareExternalUrl(o + Tn(i));
                        this._platformLocation.replaceState(t, r, s)
                    }
                    forward() {
                        this._platformLocation.forward()
                    }
                    back() {
                        this._platformLocation.back()
                    }
                    getState() {
                        return this._platformLocation.getState()
                    }
                    historyGo(t = 0) {
                        this._platformLocation.historyGo?.(t)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(nd), S(Yv, 8))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })(),
                Fx = (() => {
                    class e extends mr {
                        constructor(t, r) {
                            super(), this._platformLocation = t, this._baseHref = "", this._removeListenerFns = [], null != r && (this._baseHref = r)
                        }
                        ngOnDestroy() {
                            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                        }
                        onPopState(t) {
                            this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        path(t = !1) {
                            let r = this._platformLocation.hash;
                            return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r
                        }
                        prepareExternalUrl(t) {
                            const r = rd(this._baseHref, t);
                            return r.length > 0 ? "#" + r : r
                        }
                        pushState(t, r, o, i) {
                            let s = this.prepareExternalUrl(o + Tn(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(t, r, s)
                        }
                        replaceState(t, r, o, i) {
                            let s = this.prepareExternalUrl(o + Tn(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(t, r, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        historyGo(t = 0) {
                            this._platformLocation.historyGo?.(t)
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(S(nd), S(Yv, 8))
                    }, e.\u0275prov = T({
                        token: e,
                        factory: e.\u0275fac
                    }), e
                })(),
                od = (() => {
                    class e {
                        constructor(t) {
                            this._subject = new ue, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = t;
                            const r = this._locationStrategy.getBaseHref();
                            this._basePath = function Lx(e) {
                                if (new RegExp("^(https?:)?//").test(e)) {
                                    const [, t] = e.split(/\/\/[^\/]+/);
                                    return t
                                }
                                return e
                            }(Zv(e_(r))), this._locationStrategy.onPopState(o => {
                                this._subject.emit({
                                    url: this.path(!0),
                                    pop: !0,
                                    state: o.state,
                                    type: o.type
                                })
                            })
                        }
                        ngOnDestroy() {
                            this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = []
                        }
                        path(t = !1) {
                            return this.normalize(this._locationStrategy.path(t))
                        }
                        getState() {
                            return this._locationStrategy.getState()
                        }
                        isCurrentPathEqualTo(t, r = "") {
                            return this.path() == this.normalize(t + Tn(r))
                        }
                        normalize(t) {
                            return e.stripTrailingSlash(function kx(e, n) {
                                if (!e || !n.startsWith(e)) return n;
                                const t = n.substring(e.length);
                                return "" === t || ["/", ";", "?", "#"].includes(t[0]) ? t : n
                            }(this._basePath, e_(t)))
                        }
                        prepareExternalUrl(t) {
                            return t && "/" !== t[0] && (t = "/" + t), this._locationStrategy.prepareExternalUrl(t)
                        }
                        go(t, r = "", o = null) {
                            this._locationStrategy.pushState(o, "", t, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Tn(r)), o)
                        }
                        replaceState(t, r = "", o = null) {
                            this._locationStrategy.replaceState(o, "", t, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Tn(r)), o)
                        }
                        forward() {
                            this._locationStrategy.forward()
                        }
                        back() {
                            this._locationStrategy.back()
                        }
                        historyGo(t = 0) {
                            this._locationStrategy.historyGo?.(t)
                        }
                        onUrlChange(t) {
                            return this._urlChangeListeners.push(t), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(r => {
                                this._notifyUrlChangeListeners(r.url, r.state)
                            })), () => {
                                const r = this._urlChangeListeners.indexOf(t);
                                this._urlChangeListeners.splice(r, 1), 0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null)
                            }
                        }
                        _notifyUrlChangeListeners(t = "", r) {
                            this._urlChangeListeners.forEach(o => o(t, r))
                        }
                        subscribe(t, r, o) {
                            return this._subject.subscribe({
                                next: t,
                                error: r,
                                complete: o
                            })
                        }
                    }
                    return e.normalizeQueryParams = Tn, e.joinWithSlash = rd, e.stripTrailingSlash = Zv, e.\u0275fac = function (t) {
                        return new (t || e)(S(mr))
                    }, e.\u0275prov = T({
                        token: e,
                        factory: function () {
                            return function Px() {
                                return new od(S(mr))
                            }()
                        },
                        providedIn: "root"
                    }), e
                })();

            function e_(e) {
                return e.replace(/\/index.html$/, "")
            }

            function u_(e, n) {
                n = encodeURIComponent(n);
                for (const t of e.split(";")) {
                    const r = t.indexOf("="),
                        [o, i] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
                    if (o.trim() === n) return decodeURIComponent(i)
                }
                return null
            }
            const pd = /\s+/,
                c_ = [];
            let ba = (() => {
                class e {
                    constructor(t, r, o, i) {
                        this._iterableDiffers = t, this._keyValueDiffers = r, this._ngEl = o, this._renderer = i, this.initialClasses = c_, this.stateMap = new Map
                    }
                    set klass(t) {
                        this.initialClasses = null != t ? t.trim().split(pd) : c_
                    }
                    set ngClass(t) {
                        this.rawClass = "string" == typeof t ? t.trim().split(pd) : t
                    }
                    ngDoCheck() {
                        for (const r of this.initialClasses) this._updateState(r, !0);
                        const t = this.rawClass;
                        if (Array.isArray(t) || t instanceof Set)
                            for (const r of t) this._updateState(r, !0);
                        else if (null != t)
                            for (const r of Object.keys(t)) this._updateState(r, Boolean(t[r]));
                        this._applyStateDiff()
                    }
                    _updateState(t, r) {
                        const o = this.stateMap.get(t);
                        void 0 !== o ? (o.enabled !== r && (o.changed = !0, o.enabled = r), o.touched = !0) : this.stateMap.set(t, {
                            enabled: r,
                            changed: !0,
                            touched: !0
                        })
                    }
                    _applyStateDiff() {
                        for (const t of this.stateMap) {
                            const r = t[0],
                                o = t[1];
                            o.changed ? (this._toggleClass(r, o.enabled), o.changed = !1) : o.touched || (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)), o.touched = !1
                        }
                    }
                    _toggleClass(t, r) {
                        (t = t.trim()).length > 0 && t.split(pd).forEach(o => {
                            r ? this._renderer.addClass(this._ngEl.nativeElement, o) : this._renderer.removeClass(this._ngEl.nativeElement, o)
                        })
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(pa), C(wi), C(_t), C(wn))
                }, e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["", "ngClass", ""]
                    ],
                    inputs: {
                        klass: ["class", "klass"],
                        ngClass: "ngClass"
                    },
                    standalone: !0
                }), e
            })();
            class DR {
                constructor(n, t, r, o) {
                    this.$implicit = n, this.ngForOf = t, this.index = r, this.count = o
                }
                get first() {
                    return 0 === this.index
                }
                get last() {
                    return this.index === this.count - 1
                }
                get even() {
                    return this.index % 2 == 0
                }
                get odd() {
                    return !this.even
                }
            }
            let Sa = (() => {
                class e {
                    set ngForOf(t) {
                        this._ngForOf = t, this._ngForOfDirty = !0
                    }
                    set ngForTrackBy(t) {
                        this._trackByFn = t
                    }
                    get ngForTrackBy() {
                        return this._trackByFn
                    }
                    constructor(t, r, o) {
                        this._viewContainer = t, this._template = r, this._differs = o, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null
                    }
                    set ngForTemplate(t) {
                        t && (this._template = t)
                    }
                    ngDoCheck() {
                        if (this._ngForOfDirty) {
                            this._ngForOfDirty = !1;
                            const t = this._ngForOf;
                            !this._differ && t && (this._differ = this._differs.find(t).create(this.ngForTrackBy))
                        }
                        if (this._differ) {
                            const t = this._differ.diff(this._ngForOf);
                            t && this._applyChanges(t)
                        }
                    }
                    _applyChanges(t) {
                        const r = this._viewContainer;
                        t.forEachOperation((o, i, s) => {
                            if (null == o.previousIndex) r.createEmbeddedView(this._template, new DR(o.item, this._ngForOf, -1, -1), null === s ? void 0 : s);
                            else if (null == s) r.remove(null === i ? void 0 : i);
                            else if (null !== i) {
                                const a = r.get(i);
                                r.move(a, s), h_(a, o)
                            }
                        });
                        for (let o = 0, i = r.length; o < i; o++) {
                            const a = r.get(o).context;
                            a.index = o, a.count = i, a.ngForOf = this._ngForOf
                        }
                        t.forEachIdentityChange(o => {
                            h_(r.get(o.currentIndex), o)
                        })
                    }
                    static ngTemplateContextGuard(t, r) {
                        return !0
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(Wt), C(Sn), C(pa))
                }, e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["", "ngFor", "", "ngForOf", ""]
                    ],
                    inputs: {
                        ngForOf: "ngForOf",
                        ngForTrackBy: "ngForTrackBy",
                        ngForTemplate: "ngForTemplate"
                    },
                    standalone: !0
                }), e
            })();

            function h_(e, n) {
                e.context.$implicit = n.item
            }
            let Si = (() => {
                class e {
                    constructor(t, r) {
                        this._viewContainer = t, this._context = new ER, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = r
                    }
                    set ngIf(t) {
                        this._context.$implicit = this._context.ngIf = t, this._updateView()
                    }
                    set ngIfThen(t) {
                        p_("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView()
                    }
                    set ngIfElse(t) {
                        p_("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView()
                    }
                    _updateView() {
                        this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                    }
                    static ngTemplateContextGuard(t, r) {
                        return !0
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(Wt), C(Sn))
                }, e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["", "ngIf", ""]
                    ],
                    inputs: {
                        ngIf: "ngIf",
                        ngIfThen: "ngIfThen",
                        ngIfElse: "ngIfElse"
                    },
                    standalone: !0
                }), e
            })();
            class ER {
                constructor() {
                    this.$implicit = null, this.ngIf = null
                }
            }

            function p_(e, n) {
                if (n && !n.createEmbeddedView) throw new Error(`${e} must be a TemplateRef, but received '${ae(n)}'.`)
            }
            let m_ = (() => {
                class e {
                    constructor(t) {
                        this._viewContainerRef = t, this._viewRef = null, this.ngTemplateOutletContext = null, this.ngTemplateOutlet = null, this.ngTemplateOutletInjector = null
                    }
                    ngOnChanges(t) {
                        if (t.ngTemplateOutlet || t.ngTemplateOutletInjector) {
                            const r = this._viewContainerRef;
                            if (this._viewRef && r.remove(r.indexOf(this._viewRef)), this.ngTemplateOutlet) {
                                const {
                                    ngTemplateOutlet: o,
                                    ngTemplateOutletContext: i,
                                    ngTemplateOutletInjector: s
                                } = this;
                                this._viewRef = r.createEmbeddedView(o, i, s ? {
                                    injector: s
                                } : void 0)
                            } else this._viewRef = null
                        } else this._viewRef && t.ngTemplateOutletContext && this.ngTemplateOutletContext && (this._viewRef.context = this.ngTemplateOutletContext)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(Wt))
                }, e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["", "ngTemplateOutlet", ""]
                    ],
                    inputs: {
                        ngTemplateOutletContext: "ngTemplateOutletContext",
                        ngTemplateOutlet: "ngTemplateOutlet",
                        ngTemplateOutletInjector: "ngTemplateOutletInjector"
                    },
                    standalone: !0,
                    features: [gt]
                }), e
            })();
            class AR {
                createSubscription(n, t) {
                    return n.subscribe({
                        next: t,
                        error: r => {
                            throw r
                        }
                    })
                }
                dispose(n) {
                    n.unsubscribe()
                }
            }
            class TR {
                createSubscription(n, t) {
                    return n.then(t, r => {
                        throw r
                    })
                }
                dispose(n) { }
            }
            const xR = new TR,
                RR = new AR;
            let yd = (() => {
                class e {
                    constructor(t) {
                        this._latestValue = null, this._subscription = null, this._obj = null, this._strategy = null, this._ref = t
                    }
                    ngOnDestroy() {
                        this._subscription && this._dispose(), this._ref = null
                    }
                    transform(t) {
                        return this._obj ? t !== this._obj ? (this._dispose(), this.transform(t)) : this._latestValue : (t && this._subscribe(t), this._latestValue)
                    }
                    _subscribe(t) {
                        this._obj = t, this._strategy = this._selectStrategy(t), this._subscription = this._strategy.createSubscription(t, r => this._updateLatestValue(t, r))
                    }
                    _selectStrategy(t) {
                        if (ci(t)) return xR;
                        if (fm(t)) return RR;
                        throw function Xt(e, n) {
                            return new D(2100, !1)
                        }()
                    }
                    _dispose() {
                        this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null
                    }
                    _updateLatestValue(t, r) {
                        t === this._obj && (this._latestValue = r, this._ref.markForCheck())
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(da, 16))
                }, e.\u0275pipe = st({
                    name: "async",
                    type: e,
                    pure: !1,
                    standalone: !0
                }), e
            })(),
                XR = (() => {
                    class e { }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275mod = Lt({
                        type: e
                    }), e.\u0275inj = Mt({}), e
                })();
            let QR = (() => {
                class e { }
                return e.\u0275prov = T({
                    token: e,
                    providedIn: "root",
                    factory: () => new eO(S(rt), window)
                }), e
            })();
            class eO {
                constructor(n, t) {
                    this.document = n, this.window = t, this.offset = () => [0, 0]
                }
                setOffset(n) {
                    this.offset = Array.isArray(n) ? () => n : n
                }
                getScrollPosition() {
                    return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
                }
                scrollToPosition(n) {
                    this.supportsScrolling() && this.window.scrollTo(n[0], n[1])
                }
                scrollToAnchor(n) {
                    if (!this.supportsScrolling()) return;
                    const t = function tO(e, n) {
                        const t = e.getElementById(n) || e.getElementsByName(n)[0];
                        if (t) return t;
                        if ("function" == typeof e.createTreeWalker && e.body && (e.body.createShadowRoot || e.body.attachShadow)) {
                            const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
                            let o = r.currentNode;
                            for (; o;) {
                                const i = o.shadowRoot;
                                if (i) {
                                    const s = i.getElementById(n) || i.querySelector(`[name="${n}"]`);
                                    if (s) return s
                                }
                                o = r.nextNode()
                            }
                        }
                        return null
                    }(this.document, n);
                    t && (this.scrollToElement(t), t.focus())
                }
                setHistoryScrollRestoration(n) {
                    if (this.supportScrollRestoration()) {
                        const t = this.window.history;
                        t && t.scrollRestoration && (t.scrollRestoration = n)
                    }
                }
                scrollToElement(n) {
                    const t = n.getBoundingClientRect(),
                        r = t.left + this.window.pageXOffset,
                        o = t.top + this.window.pageYOffset,
                        i = this.offset();
                    this.window.scrollTo(r - i[0], o - i[1])
                }
                supportScrollRestoration() {
                    try {
                        if (!this.supportsScrolling()) return !1;
                        const n = __(this.window.history) || __(Object.getPrototypeOf(this.window.history));
                        return !(!n || !n.writable && !n.set)
                    } catch {
                        return !1
                    }
                }
                supportsScrolling() {
                    try {
                        return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window
                    } catch {
                        return !1
                    }
                }
            }

            function __(e) {
                return Object.getOwnPropertyDescriptor(e, "scrollRestoration")
            }
            class C_ { }
            class AO extends xx {
                constructor() {
                    super(...arguments), this.supportsDOMEvents = !0
                }
            }
            class wd extends AO {
                static makeCurrent() {
                    ! function Tx(e) {
                        td || (td = e)
                    }(new wd)
                }
                onAndCancel(n, t, r) {
                    return n.addEventListener(t, r, !1), () => {
                        n.removeEventListener(t, r, !1)
                    }
                }
                dispatchEvent(n, t) {
                    n.dispatchEvent(t)
                }
                remove(n) {
                    n.parentNode && n.parentNode.removeChild(n)
                }
                createElement(n, t) {
                    return (t = t || this.getDefaultDocument()).createElement(n)
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument("fakeTitle")
                }
                getDefaultDocument() {
                    return document
                }
                isElementNode(n) {
                    return n.nodeType === Node.ELEMENT_NODE
                }
                isShadowRoot(n) {
                    return n instanceof DocumentFragment
                }
                getGlobalEventTarget(n, t) {
                    return "window" === t ? window : "document" === t ? n : "body" === t ? n.body : null
                }
                getBaseHref(n) {
                    const t = function TO() {
                        return Ii = Ii || document.querySelector("base"), Ii ? Ii.getAttribute("href") : null
                    }();
                    return null == t ? null : function xO(e) {
                        Aa = Aa || document.createElement("a"), Aa.setAttribute("href", e);
                        const n = Aa.pathname;
                        return "/" === n.charAt(0) ? n : `/${n}`
                    }(t)
                }
                resetBaseElement() {
                    Ii = null
                }
                getUserAgent() {
                    return window.navigator.userAgent
                }
                getCookie(n) {
                    return u_(document.cookie, n)
                }
            }
            let Aa, Ii = null;
            const S_ = new M("TRANSITION_ID"),
                OO = [{
                    provide: sa,
                    useFactory: function RO(e, n, t) {
                        return () => {
                            t.get(aa).donePromise.then(() => {
                                const r = An(),
                                    o = n.querySelectorAll(`style[ng-transition="${e}"]`);
                                for (let i = 0; i < o.length; i++) r.remove(o[i])
                            })
                        }
                    },
                    deps: [S_, rt, Ut],
                    multi: !0
                }];
            let FO = (() => {
                class e {
                    build() {
                        return new XMLHttpRequest
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const Ta = new M("EventManagerPlugins");
            let xa = (() => {
                class e {
                    constructor(t, r) {
                        this._zone = r, this._eventNameToPlugin = new Map, t.forEach(o => {
                            o.manager = this
                        }), this._plugins = t.slice().reverse()
                    }
                    addEventListener(t, r, o) {
                        return this._findPluginFor(r).addEventListener(t, r, o)
                    }
                    addGlobalEventListener(t, r, o) {
                        return this._findPluginFor(r).addGlobalEventListener(t, r, o)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(t) {
                        const r = this._eventNameToPlugin.get(t);
                        if (r) return r;
                        const o = this._plugins;
                        for (let i = 0; i < o.length; i++) {
                            const s = o[i];
                            if (s.supports(t)) return this._eventNameToPlugin.set(t, s), s
                        }
                        throw new Error(`No event manager plugin found for event ${t}`)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(Ta), S(we))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            class M_ {
                constructor(n) {
                    this._doc = n
                }
                addGlobalEventListener(n, t, r) {
                    const o = An().getGlobalEventTarget(this._doc, n);
                    if (!o) throw new Error(`Unsupported event target ${o} for event ${t}`);
                    return this.addEventListener(o, t, r)
                }
            }
            let I_ = (() => {
                class e {
                    constructor() {
                        this.usageCount = new Map
                    }
                    addStyles(t) {
                        for (const r of t) 1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
                    }
                    removeStyles(t) {
                        for (const r of t) 0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r)
                    }
                    onStyleRemoved(t) { }
                    onStyleAdded(t) { }
                    getAllStyles() {
                        return this.usageCount.keys()
                    }
                    changeUsageCount(t, r) {
                        const o = this.usageCount;
                        let i = o.get(t) ?? 0;
                        return i += r, i > 0 ? o.set(t, i) : o.delete(t), i
                    }
                    ngOnDestroy() {
                        for (const t of this.getAllStyles()) this.onStyleRemoved(t);
                        this.usageCount.clear()
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })(),
                Ai = (() => {
                    class e extends I_ {
                        constructor(t) {
                            super(), this.doc = t, this.styleRef = new Map, this.hostNodes = new Set, this.resetHostNodes()
                        }
                        onStyleAdded(t) {
                            for (const r of this.hostNodes) this.addStyleToHost(r, t)
                        }
                        onStyleRemoved(t) {
                            const r = this.styleRef;
                            r.get(t)?.forEach(i => i.remove()), r.delete(t)
                        }
                        ngOnDestroy() {
                            super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes()
                        }
                        addHost(t) {
                            this.hostNodes.add(t);
                            for (const r of this.getAllStyles()) this.addStyleToHost(t, r)
                        }
                        removeHost(t) {
                            this.hostNodes.delete(t)
                        }
                        addStyleToHost(t, r) {
                            const o = this.doc.createElement("style");
                            o.textContent = r, t.appendChild(o);
                            const i = this.styleRef.get(r);
                            i ? i.push(o) : this.styleRef.set(r, [o])
                        }
                        resetHostNodes() {
                            const t = this.hostNodes;
                            t.clear(), t.add(this.doc.head)
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(S(rt))
                    }, e.\u0275prov = T({
                        token: e,
                        factory: e.\u0275fac
                    }), e
                })();
            const Ed = {
                svg: "http://www.w3.org/2000/svg",
                xhtml: "http://www.w3.org/1999/xhtml",
                xlink: "http://www.w3.org/1999/xlink",
                xml: "http://www.w3.org/XML/1998/namespace",
                xmlns: "http://www.w3.org/2000/xmlns/",
                math: "http://www.w3.org/1998/MathML/"
            },
                bd = /%COMP%/g,
                x_ = new M("RemoveStylesOnCompDestory", {
                    providedIn: "root",
                    factory: () => !1
                });

            function R_(e, n) {
                return n.flat(100).map(t => t.replace(bd, e))
            }

            function O_(e) {
                return n => {
                    if ("__ngUnwrap__" === n) return e;
                    !1 === e(n) && (n.preventDefault(), n.returnValue = !1)
                }
            }
            let Sd = (() => {
                class e {
                    constructor(t, r, o, i) {
                        this.eventManager = t, this.sharedStylesHost = r, this.appId = o, this.removeStylesOnCompDestory = i, this.rendererByCompId = new Map, this.defaultRenderer = new Md(t)
                    }
                    createRenderer(t, r) {
                        if (!t || !r) return this.defaultRenderer;
                        const o = this.getOrCreateRenderer(t, r);
                        return o instanceof P_ ? o.applyToHost(t) : o instanceof Id && o.applyStyles(), o
                    }
                    getOrCreateRenderer(t, r) {
                        const o = this.rendererByCompId;
                        let i = o.get(r.id);
                        if (!i) {
                            const s = this.eventManager,
                                a = this.sharedStylesHost,
                                l = this.removeStylesOnCompDestory;
                            switch (r.encapsulation) {
                                case Yt.Emulated:
                                    i = new P_(s, a, r, this.appId, l);
                                    break;
                                case Yt.ShadowDom:
                                    return new $O(s, a, t, r);
                                default:
                                    i = new Id(s, a, r, l)
                            }
                            i.onDestroy = () => o.delete(r.id), o.set(r.id, i)
                        }
                        return i
                    }
                    ngOnDestroy() {
                        this.rendererByCompId.clear()
                    }
                    begin() { }
                    end() { }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(xa), S(Ai), S(Di), S(x_))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            class Md {
                constructor(n) {
                    this.eventManager = n, this.data = Object.create(null), this.destroyNode = null
                }
                destroy() { }
                createElement(n, t) {
                    return t ? document.createElementNS(Ed[t] || t, n) : document.createElement(n)
                }
                createComment(n) {
                    return document.createComment(n)
                }
                createText(n) {
                    return document.createTextNode(n)
                }
                appendChild(n, t) {
                    (F_(n) ? n.content : n).appendChild(t)
                }
                insertBefore(n, t, r) {
                    n && (F_(n) ? n.content : n).insertBefore(t, r)
                }
                removeChild(n, t) {
                    n && n.removeChild(t)
                }
                selectRootElement(n, t) {
                    let r = "string" == typeof n ? document.querySelector(n) : n;
                    if (!r) throw new Error(`The selector "${n}" did not match any elements`);
                    return t || (r.textContent = ""), r
                }
                parentNode(n) {
                    return n.parentNode
                }
                nextSibling(n) {
                    return n.nextSibling
                }
                setAttribute(n, t, r, o) {
                    if (o) {
                        t = o + ":" + t;
                        const i = Ed[o];
                        i ? n.setAttributeNS(i, t, r) : n.setAttribute(t, r)
                    } else n.setAttribute(t, r)
                }
                removeAttribute(n, t, r) {
                    if (r) {
                        const o = Ed[r];
                        o ? n.removeAttributeNS(o, t) : n.removeAttribute(`${r}:${t}`)
                    } else n.removeAttribute(t)
                }
                addClass(n, t) {
                    n.classList.add(t)
                }
                removeClass(n, t) {
                    n.classList.remove(t)
                }
                setStyle(n, t, r, o) {
                    o & (at.DashCase | at.Important) ? n.style.setProperty(t, r, o & at.Important ? "important" : "") : n.style[t] = r
                }
                removeStyle(n, t, r) {
                    r & at.DashCase ? n.style.removeProperty(t) : n.style[t] = ""
                }
                setProperty(n, t, r) {
                    n[t] = r
                }
                setValue(n, t) {
                    n.nodeValue = t
                }
                listen(n, t, r) {
                    return "string" == typeof n ? this.eventManager.addGlobalEventListener(n, t, O_(r)) : this.eventManager.addEventListener(n, t, O_(r))
                }
            }

            function F_(e) {
                return "TEMPLATE" === e.tagName && void 0 !== e.content
            }
            class $O extends Md {
                constructor(n, t, r, o) {
                    super(n), this.sharedStylesHost = t, this.hostEl = r, this.shadowRoot = r.attachShadow({
                        mode: "open"
                    }), this.sharedStylesHost.addHost(this.shadowRoot);
                    const i = R_(o.id, o.styles);
                    for (const s of i) {
                        const a = document.createElement("style");
                        a.textContent = s, this.shadowRoot.appendChild(a)
                    }
                }
                nodeOrShadowRoot(n) {
                    return n === this.hostEl ? this.shadowRoot : n
                }
                appendChild(n, t) {
                    return super.appendChild(this.nodeOrShadowRoot(n), t)
                }
                insertBefore(n, t, r) {
                    return super.insertBefore(this.nodeOrShadowRoot(n), t, r)
                }
                removeChild(n, t) {
                    return super.removeChild(this.nodeOrShadowRoot(n), t)
                }
                parentNode(n) {
                    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot)
                }
            }
            class Id extends Md {
                constructor(n, t, r, o, i = r.id) {
                    super(n), this.sharedStylesHost = t, this.removeStylesOnCompDestory = o, this.rendererUsageCount = 0, this.styles = R_(i, r.styles)
                }
                applyStyles() {
                    this.sharedStylesHost.addStyles(this.styles), this.rendererUsageCount++
                }
                destroy() {
                    this.removeStylesOnCompDestory && (this.sharedStylesHost.removeStyles(this.styles), this.rendererUsageCount--, 0 === this.rendererUsageCount && this.onDestroy?.())
                }
            }
            class P_ extends Id {
                constructor(n, t, r, o, i) {
                    const s = o + "-" + r.id;
                    super(n, t, r, i, s), this.contentAttr = function VO(e) {
                        return "_ngcontent-%COMP%".replace(bd, e)
                    }(s), this.hostAttr = function jO(e) {
                        return "_nghost-%COMP%".replace(bd, e)
                    }(s)
                }
                applyToHost(n) {
                    this.applyStyles(), this.setAttribute(n, this.hostAttr, "")
                }
                createElement(n, t) {
                    const r = super.createElement(n, t);
                    return super.setAttribute(r, this.contentAttr, ""), r
                }
            }
            let UO = (() => {
                class e extends M_ {
                    constructor(t) {
                        super(t)
                    }
                    supports(t) {
                        return !0
                    }
                    addEventListener(t, r, o) {
                        return t.addEventListener(r, o, !1), () => this.removeEventListener(t, r, o)
                    }
                    removeEventListener(t, r, o) {
                        return t.removeEventListener(r, o)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(rt))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const k_ = ["alt", "control", "meta", "shift"],
                HO = {
                    "\b": "Backspace",
                    "\t": "Tab",
                    "\x7f": "Delete",
                    "\x1b": "Escape",
                    Del: "Delete",
                    Esc: "Escape",
                    Left: "ArrowLeft",
                    Right: "ArrowRight",
                    Up: "ArrowUp",
                    Down: "ArrowDown",
                    Menu: "ContextMenu",
                    Scroll: "ScrollLock",
                    Win: "OS"
                },
                GO = {
                    alt: e => e.altKey,
                    control: e => e.ctrlKey,
                    meta: e => e.metaKey,
                    shift: e => e.shiftKey
                };
            let zO = (() => {
                class e extends M_ {
                    constructor(t) {
                        super(t)
                    }
                    supports(t) {
                        return null != e.parseEventName(t)
                    }
                    addEventListener(t, r, o) {
                        const i = e.parseEventName(r),
                            s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                        return this.manager.getZone().runOutsideAngular(() => An().onAndCancel(t, i.domEventName, s))
                    }
                    static parseEventName(t) {
                        const r = t.toLowerCase().split("."),
                            o = r.shift();
                        if (0 === r.length || "keydown" !== o && "keyup" !== o) return null;
                        const i = e._normalizeKey(r.pop());
                        let s = "",
                            a = r.indexOf("code");
                        if (a > -1 && (r.splice(a, 1), s = "code."), k_.forEach(u => {
                            const c = r.indexOf(u);
                            c > -1 && (r.splice(c, 1), s += u + ".")
                        }), s += i, 0 != r.length || 0 === i.length) return null;
                        const l = {};
                        return l.domEventName = o, l.fullKey = s, l
                    }
                    static matchEventFullKeyCode(t, r) {
                        let o = HO[t.key] || t.key,
                            i = "";
                        return r.indexOf("code.") > -1 && (o = t.code, i = "code."), !(null == o || !o) && (o = o.toLowerCase(), " " === o ? o = "space" : "." === o && (o = "dot"), k_.forEach(s => {
                            s !== o && (0, GO[s])(t) && (i += s + ".")
                        }), i += o, i === r)
                    }
                    static eventCallback(t, r, o) {
                        return i => {
                            e.matchEventFullKeyCode(i, t) && o.runGuarded(() => r(i))
                        }
                    }
                    static _normalizeKey(t) {
                        return "esc" === t ? "escape" : t
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(rt))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const XO = Ov(Mx, "browser", [{
                provide: Uc,
                useValue: "browser"
            }, {
                provide: Dv,
                useValue: function WO() {
                    wd.makeCurrent()
                },
                multi: !0
            }, {
                provide: rt,
                useFactory: function JO() {
                    return function x0(e) {
                        Tu = e
                    }(document), document
                },
                deps: []
            }]),
                j_ = new M(""),
                B_ = [{
                    provide: la,
                    useClass: class NO {
                        addToWindow(n) {
                            fe.getAngularTestability = (r, o = !0) => {
                                const i = n.findTestabilityInTree(r, o);
                                if (null == i) throw new Error("Could not find testability for element.");
                                return i
                            }, fe.getAllAngularTestabilities = () => n.getAllTestabilities(), fe.getAllAngularRootElements = () => n.getAllRootElements(), fe.frameworkStabilizers || (fe.frameworkStabilizers = []), fe.frameworkStabilizers.push(r => {
                                const o = fe.getAllAngularTestabilities();
                                let i = o.length,
                                    s = !1;
                                const a = function (l) {
                                    s = s || l, i--, 0 == i && r(s)
                                };
                                o.forEach(function (l) {
                                    l.whenStable(a)
                                })
                            })
                        }
                        findTestabilityInTree(n, t, r) {
                            return null == t ? null : n.getTestability(t) ?? (r ? An().isShadowRoot(t) ? this.findTestabilityInTree(n, t.host, !0) : this.findTestabilityInTree(n, t.parentElement, !0) : null)
                        }
                    },
                    deps: []
                }, {
                    provide: Iv,
                    useClass: Wc,
                    deps: [we, qc, la]
                }, {
                    provide: Wc,
                    useClass: Wc,
                    deps: [we, qc, la]
                }],
                $_ = [{
                    provide: Vu,
                    useValue: "root"
                }, {
                    provide: Wr,
                    useFactory: function qO() {
                        return new Wr
                    },
                    deps: []
                }, {
                    provide: Ta,
                    useClass: UO,
                    multi: !0,
                    deps: [rt, we, Uc]
                }, {
                    provide: Ta,
                    useClass: zO,
                    multi: !0,
                    deps: [rt]
                }, {
                    provide: Sd,
                    useClass: Sd,
                    deps: [xa, Ai, Di, x_]
                }, {
                    provide: mg,
                    useExisting: Sd
                }, {
                    provide: I_,
                    useExisting: Ai
                }, {
                    provide: Ai,
                    useClass: Ai,
                    deps: [rt]
                }, {
                    provide: xa,
                    useClass: xa,
                    deps: [Ta, we]
                }, {
                    provide: C_,
                    useClass: FO,
                    deps: []
                },
                []
                ];
            let KO = (() => {
                class e {
                    constructor(t) { }
                    static withServerTransition(t) {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: Di,
                                useValue: t.appId
                            }, {
                                provide: S_,
                                useExisting: Di
                            }, OO]
                        }
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(j_, 12))
                }, e.\u0275mod = Lt({
                    type: e
                }), e.\u0275inj = Mt({
                    providers: [...$_, ...B_],
                    imports: [XR, Ix]
                }), e
            })(),
                U_ = (() => {
                    class e {
                        constructor(t) {
                            this._doc = t
                        }
                        getTitle() {
                            return this._doc.title
                        }
                        setTitle(t) {
                            this._doc.title = t || ""
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(S(rt))
                    }, e.\u0275prov = T({
                        token: e,
                        factory: function (t) {
                            let r = null;
                            return r = t ? new t : function YO() {
                                return new U_(S(rt))
                            }(), r
                        },
                        providedIn: "root"
                    }), e
                })();

            function R(...e) {
                return Ae(e, No(e))
            }
            typeof window < "u" && window;
            class ct extends fn {
                constructor(n) {
                    super(), this._value = n
                }
                get value() {
                    return this.getValue()
                }
                _subscribe(n) {
                    const t = super._subscribe(n);
                    return !t.closed && n.next(this._value), t
                }
                getValue() {
                    const {
                        hasError: n,
                        thrownError: t,
                        _value: r
                    } = this;
                    if (n) throw t;
                    return this._throwIfClosed(), r
                }
                next(n) {
                    super.next(this._value = n)
                }
            }
            const Ra = Ro(e => function () {
                e(this), this.name = "EmptyError", this.message = "no elements in sequence"
            }),
                {
                    isArray: oN
                } = Array,
                {
                    getPrototypeOf: iN,
                    prototype: sN,
                    keys: aN
                } = Object;

            function z_(e) {
                if (1 === e.length) {
                    const n = e[0];
                    if (oN(n)) return {
                        args: n,
                        keys: null
                    };
                    if (function lN(e) {
                        return e && "object" == typeof e && iN(e) === sN
                    }(n)) {
                        const t = aN(n);
                        return {
                            args: t.map(r => n[r]),
                            keys: t
                        }
                    }
                }
                return {
                    args: e,
                    keys: null
                }
            }
            const {
                isArray: uN
            } = Array;

            function W_(e) {
                return U(n => function cN(e, n) {
                    return uN(n) ? e(...n) : e(n)
                }(e, n))
            }

            function q_(e, n) {
                return e.reduce((t, r, o) => (t[r] = n[o], t), {})
            }

            function J_(...e) {
                const n = No(e),
                    t = ah(e),
                    {
                        args: r,
                        keys: o
                    } = z_(e);
                if (0 === r.length) return Ae([], n);
                const i = new ye(function dN(e, n, t = Fn) {
                    return r => {
                        X_(n, () => {
                            const {
                                length: o
                            } = e, i = new Array(o);
                            let s = o,
                                a = o;
                            for (let l = 0; l < o; l++) X_(n, () => {
                                const u = Ae(e[l], n);
                                let c = !1;
                                u.subscribe(ve(r, d => {
                                    i[l] = d, c || (c = !0, a--), a || r.next(t(i.slice()))
                                }, () => {
                                    --s || r.complete()
                                }))
                            }, r)
                        }, r)
                    }
                }(r, n, o ? s => q_(o, s) : Fn));
                return t ? i.pipe(W_(t)) : i
            }

            function X_(e, n, t) {
                e ? hn(t, e, n) : n()
            }

            function Oa(...e) {
                return function fN() {
                    return Sr(1)
                }()(Ae(e, No(e)))
            }

            function K_(e) {
                return new ye(n => {
                    it(e()).subscribe(n)
                })
            }

            function Ti(e, n) {
                const t = se(e) ? e : () => e,
                    r = o => o.error(t());
                return new ye(n ? o => n.schedule(r, 0, o) : r)
            }

            function xd() {
                return Ie((e, n) => {
                    let t = null;
                    e._refCount++;
                    const r = ve(n, void 0, void 0, void 0, () => {
                        if (!e || e._refCount <= 0 || 0 < --e._refCount) return void (t = null);
                        const o = e._connection,
                            i = t;
                        t = null, o && (!i || o === i) && o.unsubscribe(), n.unsubscribe()
                    });
                    e.subscribe(r), r.closed || (t = e.connect())
                })
            }
            class Z_ extends ye {
                constructor(n, t) {
                    super(), this.source = n, this.subjectFactory = t, this._subject = null, this._refCount = 0, this._connection = null, Wf(n) && (this.lift = n.lift)
                }
                _subscribe(n) {
                    return this.getSubject().subscribe(n)
                }
                getSubject() {
                    const n = this._subject;
                    return (!n || n.isStopped) && (this._subject = this.subjectFactory()), this._subject
                }
                _teardown() {
                    this._refCount = 0;
                    const {
                        _connection: n
                    } = this;
                    this._subject = this._connection = null, n?.unsubscribe()
                }
                connect() {
                    let n = this._connection;
                    if (!n) {
                        n = this._connection = new dt;
                        const t = this.getSubject();
                        n.add(this.source.subscribe(ve(t, void 0, () => {
                            this._teardown(), t.complete()
                        }, r => {
                            this._teardown(), t.error(r)
                        }, () => this._teardown()))), n.closed && (this._connection = null, n = dt.EMPTY)
                    }
                    return n
                }
                refCount() {
                    return xd()(this)
                }
            }

            function ln(e, n) {
                return Ie((t, r) => {
                    let o = null,
                        i = 0,
                        s = !1;
                    const a = () => s && !o && r.complete();
                    t.subscribe(ve(r, l => {
                        o?.unsubscribe();
                        let u = 0;
                        const c = i++;
                        it(e(l, c)).subscribe(o = ve(r, d => r.next(n ? n(l, d, c, u++) : d), () => {
                            o = null, a()
                        }))
                    }, () => {
                        s = !0, a()
                    }))
                })
            }

            function yr(e) {
                return e <= 0 ? () => Kt : Ie((n, t) => {
                    let r = 0;
                    n.subscribe(ve(t, o => {
                        ++r <= e && (t.next(o), e <= r && t.complete())
                    }))
                })
            }

            function Rn(e, n) {
                return Ie((t, r) => {
                    let o = 0;
                    t.subscribe(ve(r, i => e.call(n, i, o++) && r.next(i)))
                })
            }

            function Na(e) {
                return Ie((n, t) => {
                    let r = !1;
                    n.subscribe(ve(t, o => {
                        r = !0, t.next(o)
                    }, () => {
                        r || t.next(e), t.complete()
                    }))
                })
            }

            function Y_(e = pN) {
                return Ie((n, t) => {
                    let r = !1;
                    n.subscribe(ve(t, o => {
                        r = !0, t.next(o)
                    }, () => r ? t.complete() : t.error(e())))
                })
            }

            function pN() {
                return new Ra
            }

            function Hn(e, n) {
                const t = arguments.length >= 2;
                return r => r.pipe(e ? Rn((o, i) => e(o, i, r)) : Fn, yr(1), t ? Na(n) : Y_(() => new Ra))
            }

            function Gn(e, n) {
                return se(n) ? Le(e, n, 1) : Le(e, 1)
            }

            function Xe(e, n, t) {
                const r = se(e) || n || t ? {
                    next: e,
                    error: n,
                    complete: t
                } : e;
                return r ? Ie((o, i) => {
                    var s;
                    null === (s = r.subscribe) || void 0 === s || s.call(r);
                    let a = !0;
                    o.subscribe(ve(i, l => {
                        var u;
                        null === (u = r.next) || void 0 === u || u.call(r, l), i.next(l)
                    }, () => {
                        var l;
                        a = !1, null === (l = r.complete) || void 0 === l || l.call(r), i.complete()
                    }, l => {
                        var u;
                        a = !1, null === (u = r.error) || void 0 === u || u.call(r, l), i.error(l)
                    }, () => {
                        var l, u;
                        a && (null === (l = r.unsubscribe) || void 0 === l || l.call(r)), null === (u = r.finalize) || void 0 === u || u.call(r)
                    }))
                }) : Fn
            }

            function zn(e) {
                return Ie((n, t) => {
                    let i, r = null,
                        o = !1;
                    r = n.subscribe(ve(t, void 0, void 0, s => {
                        i = it(e(s, zn(e)(n))), r ? (r.unsubscribe(), r = null, i.subscribe(t)) : o = !0
                    })), o && (r.unsubscribe(), r = null, i.subscribe(t))
                })
            }

            function Q_(e, n) {
                return Ie(function gN(e, n, t, r, o) {
                    return (i, s) => {
                        let a = t,
                            l = n,
                            u = 0;
                        i.subscribe(ve(s, c => {
                            const d = u++;
                            l = a ? e(l, c, d) : (a = !0, c), r && s.next(l)
                        }, o && (() => {
                            a && s.next(l), s.complete()
                        })))
                    }
                }(e, n, arguments.length >= 2, !0))
            }

            function Rd(e) {
                return e <= 0 ? () => Kt : Ie((n, t) => {
                    let r = [];
                    n.subscribe(ve(t, o => {
                        r.push(o), e < r.length && r.shift()
                    }, () => {
                        for (const o of r) t.next(o);
                        t.complete()
                    }, void 0, () => {
                        r = null
                    }))
                })
            }

            function eC(e, n) {
                const t = arguments.length >= 2;
                return r => r.pipe(e ? Rn((o, i) => e(o, i, r)) : Fn, Rd(1), t ? Na(n) : Y_(() => new Ra))
            }

            function tC(e) {
                return U(() => e)
            }

            function Od(e) {
                return Ie((n, t) => {
                    try {
                        n.subscribe(t)
                    } finally {
                        t.add(e)
                    }
                })
            }
            const $ = "primary",
                xi = Symbol("RouteTitle");
            class yN {
                constructor(n) {
                    this.params = n || {}
                }
                has(n) {
                    return Object.prototype.hasOwnProperty.call(this.params, n)
                }
                get(n) {
                    if (this.has(n)) {
                        const t = this.params[n];
                        return Array.isArray(t) ? t[0] : t
                    }
                    return null
                }
                getAll(n) {
                    if (this.has(n)) {
                        const t = this.params[n];
                        return Array.isArray(t) ? t : [t]
                    }
                    return []
                }
                get keys() {
                    return Object.keys(this.params)
                }
            }

            function go(e) {
                return new yN(e)
            }

            function vN(e, n, t) {
                const r = t.path.split("/");
                if (r.length > e.length || "full" === t.pathMatch && (n.hasChildren() || r.length < e.length)) return null;
                const o = {};
                for (let i = 0; i < r.length; i++) {
                    const s = r[i],
                        a = e[i];
                    if (s.startsWith(":")) o[s.substring(1)] = a;
                    else if (s !== a.path) return null
                }
                return {
                    consumed: e.slice(0, r.length),
                    posParams: o
                }
            }

            function un(e, n) {
                const t = e ? Object.keys(e) : void 0,
                    r = n ? Object.keys(n) : void 0;
                if (!t || !r || t.length != r.length) return !1;
                let o;
                for (let i = 0; i < t.length; i++)
                    if (o = t[i], !nC(e[o], n[o])) return !1;
                return !0
            }

            function nC(e, n) {
                if (Array.isArray(e) && Array.isArray(n)) {
                    if (e.length !== n.length) return !1;
                    const t = [...e].sort(),
                        r = [...n].sort();
                    return t.every((o, i) => r[i] === o)
                }
                return e === n
            }

            function rC(e) {
                return Array.prototype.concat.apply([], e)
            }

            function oC(e) {
                return e.length > 0 ? e[e.length - 1] : null
            }

            function Ue(e, n) {
                for (const t in e) e.hasOwnProperty(t) && n(e[t], t)
            }

            function Wn(e) {
                return hc(e) ? e : ci(e) ? Ae(Promise.resolve(e)) : R(e)
            }
            const Fa = !1,
                CN = {
                    exact: function aC(e, n, t) {
                        if (!vr(e.segments, n.segments) || !Pa(e.segments, n.segments, t) || e.numberOfChildren !== n.numberOfChildren) return !1;
                        for (const r in n.children)
                            if (!e.children[r] || !aC(e.children[r], n.children[r], t)) return !1;
                        return !0
                    },
                    subset: lC
                },
                iC = {
                    exact: function DN(e, n) {
                        return un(e, n)
                    },
                    subset: function wN(e, n) {
                        return Object.keys(n).length <= Object.keys(e).length && Object.keys(n).every(t => nC(e[t], n[t]))
                    },
                    ignored: () => !0
                };

            function sC(e, n, t) {
                return CN[t.paths](e.root, n.root, t.matrixParams) && iC[t.queryParams](e.queryParams, n.queryParams) && !("exact" === t.fragment && e.fragment !== n.fragment)
            }

            function lC(e, n, t) {
                return uC(e, n, n.segments, t)
            }

            function uC(e, n, t, r) {
                if (e.segments.length > t.length) {
                    const o = e.segments.slice(0, t.length);
                    return !(!vr(o, t) || n.hasChildren() || !Pa(o, t, r))
                }
                if (e.segments.length === t.length) {
                    if (!vr(e.segments, t) || !Pa(e.segments, t, r)) return !1;
                    for (const o in n.children)
                        if (!e.children[o] || !lC(e.children[o], n.children[o], r)) return !1;
                    return !0
                } {
                    const o = t.slice(0, e.segments.length),
                        i = t.slice(e.segments.length);
                    return !!(vr(e.segments, o) && Pa(e.segments, o, r) && e.children[$]) && uC(e.children[$], n, i, r)
                }
            }

            function Pa(e, n, t) {
                return n.every((r, o) => iC[t](e[o].parameters, r.parameters))
            }
            class qn {
                constructor(n = new J([], {}), t = {}, r = null) {
                    this.root = n, this.queryParams = t, this.fragment = r
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = go(this.queryParams)), this._queryParamMap
                }
                toString() {
                    return SN.serialize(this)
                }
            }
            class J {
                constructor(n, t) {
                    this.segments = n, this.children = t, this.parent = null, Ue(t, (r, o) => r.parent = this)
                }
                hasChildren() {
                    return this.numberOfChildren > 0
                }
                get numberOfChildren() {
                    return Object.keys(this.children).length
                }
                toString() {
                    return ka(this)
                }
            }
            class Ri {
                constructor(n, t) {
                    this.path = n, this.parameters = t
                }
                get parameterMap() {
                    return this._parameterMap || (this._parameterMap = go(this.parameters)), this._parameterMap
                }
                toString() {
                    return fC(this)
                }
            }

            function vr(e, n) {
                return e.length === n.length && e.every((t, r) => t.path === n[r].path)
            }
            let Oi = (() => {
                class e { }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: function () {
                        return new Nd
                    },
                    providedIn: "root"
                }), e
            })();
            class Nd {
                parse(n) {
                    const t = new FN(n);
                    return new qn(t.parseRootSegment(), t.parseQueryParams(), t.parseFragment())
                }
                serialize(n) {
                    const t = `/${Ni(n.root, !0)}`,
                        r = function AN(e) {
                            const n = Object.keys(e).map(t => {
                                const r = e[t];
                                return Array.isArray(r) ? r.map(o => `${La(t)}=${La(o)}`).join("&") : `${La(t)}=${La(r)}`
                            }).filter(t => !!t);
                            return n.length ? `?${n.join("&")}` : ""
                        }(n.queryParams);
                    return `${t}${r}${"string" == typeof n.fragment ? `#${function MN(e) { return encodeURI(e) }(n.fragment)}` : ""}`
                }
            }
            const SN = new Nd;

            function ka(e) {
                return e.segments.map(n => fC(n)).join("/")
            }

            function Ni(e, n) {
                if (!e.hasChildren()) return ka(e);
                if (n) {
                    const t = e.children[$] ? Ni(e.children[$], !1) : "",
                        r = [];
                    return Ue(e.children, (o, i) => {
                        i !== $ && r.push(`${i}:${Ni(o, !1)}`)
                    }), r.length > 0 ? `${t}(${r.join("//")})` : t
                } {
                    const t = function bN(e, n) {
                        let t = [];
                        return Ue(e.children, (r, o) => {
                            o === $ && (t = t.concat(n(r, o)))
                        }), Ue(e.children, (r, o) => {
                            o !== $ && (t = t.concat(n(r, o)))
                        }), t
                    }(e, (r, o) => o === $ ? [Ni(e.children[$], !1)] : [`${o}:${Ni(r, !1)}`]);
                    return 1 === Object.keys(e.children).length && null != e.children[$] ? `${ka(e)}/${t[0]}` : `${ka(e)}/(${t.join("//")})`
                }
            }

            function cC(e) {
                return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
            }

            function La(e) {
                return cC(e).replace(/%3B/gi, ";")
            }

            function Fd(e) {
                return cC(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
            }

            function Va(e) {
                return decodeURIComponent(e)
            }

            function dC(e) {
                return Va(e.replace(/\+/g, "%20"))
            }

            function fC(e) {
                return `${Fd(e.path)}${function IN(e) { return Object.keys(e).map(n => `;${Fd(n)}=${Fd(e[n])}`).join("") }(e.parameters)}`
            }
            const TN = /^[^\/()?;=#]+/;

            function ja(e) {
                const n = e.match(TN);
                return n ? n[0] : ""
            }
            const xN = /^[^=?&#]+/,
                ON = /^[^&#]+/;
            class FN {
                constructor(n) {
                    this.url = n, this.remaining = n
                }
                parseRootSegment() {
                    return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new J([], {}) : new J([], this.parseChildren())
                }
                parseQueryParams() {
                    const n = {};
                    if (this.consumeOptional("?"))
                        do {
                            this.parseQueryParam(n)
                        } while (this.consumeOptional("&"));
                    return n
                }
                parseFragment() {
                    return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
                }
                parseChildren() {
                    if ("" === this.remaining) return {};
                    this.consumeOptional("/");
                    const n = [];
                    for (this.peekStartsWith("(") || n.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), n.push(this.parseSegment());
                    let t = {};
                    this.peekStartsWith("/(") && (this.capture("/"), t = this.parseParens(!0));
                    let r = {};
                    return this.peekStartsWith("(") && (r = this.parseParens(!1)), (n.length > 0 || Object.keys(t).length > 0) && (r[$] = new J(n, t)), r
                }
                parseSegment() {
                    const n = ja(this.remaining);
                    if ("" === n && this.peekStartsWith(";")) throw new D(4009, Fa);
                    return this.capture(n), new Ri(Va(n), this.parseMatrixParams())
                }
                parseMatrixParams() {
                    const n = {};
                    for (; this.consumeOptional(";");) this.parseParam(n);
                    return n
                }
                parseParam(n) {
                    const t = ja(this.remaining);
                    if (!t) return;
                    this.capture(t);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const o = ja(this.remaining);
                        o && (r = o, this.capture(r))
                    }
                    n[Va(t)] = Va(r)
                }
                parseQueryParam(n) {
                    const t = function RN(e) {
                        const n = e.match(xN);
                        return n ? n[0] : ""
                    }(this.remaining);
                    if (!t) return;
                    this.capture(t);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const s = function NN(e) {
                            const n = e.match(ON);
                            return n ? n[0] : ""
                        }(this.remaining);
                        s && (r = s, this.capture(r))
                    }
                    const o = dC(t),
                        i = dC(r);
                    if (n.hasOwnProperty(o)) {
                        let s = n[o];
                        Array.isArray(s) || (s = [s], n[o] = s), s.push(i)
                    } else n[o] = i
                }
                parseParens(n) {
                    const t = {};
                    for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
                        const r = ja(this.remaining),
                            o = this.remaining[r.length];
                        if ("/" !== o && ")" !== o && ";" !== o) throw new D(4010, Fa);
                        let i;
                        r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")), this.capture(i), this.capture(":")) : n && (i = $);
                        const s = this.parseChildren();
                        t[i] = 1 === Object.keys(s).length ? s[$] : new J([], s), this.consumeOptional("//")
                    }
                    return t
                }
                peekStartsWith(n) {
                    return this.remaining.startsWith(n)
                }
                consumeOptional(n) {
                    return !!this.peekStartsWith(n) && (this.remaining = this.remaining.substring(n.length), !0)
                }
                capture(n) {
                    if (!this.consumeOptional(n)) throw new D(4011, Fa)
                }
            }

            function Pd(e) {
                return e.segments.length > 0 ? new J([], {
                    [$]: e
                }) : e
            }

            function Ba(e) {
                const n = {};
                for (const r of Object.keys(e.children)) {
                    const i = Ba(e.children[r]);
                    (i.segments.length > 0 || i.hasChildren()) && (n[r] = i)
                }
                return function PN(e) {
                    if (1 === e.numberOfChildren && e.children[$]) {
                        const n = e.children[$];
                        return new J(e.segments.concat(n.segments), n.children)
                    }
                    return e
                }(new J(e.segments, n))
            }

            function _r(e) {
                return e instanceof qn
            }
            const kd = !1;

            function kN(e, n, t, r, o) {
                if (0 === t.length) return mo(n.root, n.root, n.root, r, o);
                const i = function yC(e) {
                    if ("string" == typeof e[0] && 1 === e.length && "/" === e[0]) return new mC(!0, 0, e);
                    let n = 0,
                        t = !1;
                    const r = e.reduce((o, i, s) => {
                        if ("object" == typeof i && null != i) {
                            if (i.outlets) {
                                const a = {};
                                return Ue(i.outlets, (l, u) => {
                                    a[u] = "string" == typeof l ? l.split("/") : l
                                }), [...o, {
                                    outlets: a
                                }]
                            }
                            if (i.segmentPath) return [...o, i.segmentPath]
                        }
                        return "string" != typeof i ? [...o, i] : 0 === s ? (i.split("/").forEach((a, l) => {
                            0 == l && "." === a || (0 == l && "" === a ? t = !0 : ".." === a ? n++ : "" != a && o.push(a))
                        }), o) : [...o, i]
                    }, []);
                    return new mC(t, n, r)
                }(t);
                return i.toRoot() ? mo(n.root, n.root, new J([], {}), r, o) : function s(l) {
                    const u = function VN(e, n, t, r) {
                        if (e.isAbsolute) return new yo(n.root, !0, 0);
                        if (-1 === r) return new yo(t, t === n.root, 0);
                        return function vC(e, n, t) {
                            let r = e,
                                o = n,
                                i = t;
                            for (; i > o;) {
                                if (i -= o, r = r.parent, !r) throw new D(4005, kd && "Invalid number of '../'");
                                o = r.segments.length
                            }
                            return new yo(r, !1, o - i)
                        }(t, r + (Fi(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots)
                    }(i, n, e.snapshot?._urlSegment, l),
                        c = u.processChildren ? vo(u.segmentGroup, u.index, i.commands) : Ld(u.segmentGroup, u.index, i.commands);
                    return mo(n.root, u.segmentGroup, c, r, o)
                }(e.snapshot?._lastPathIndex)
            }

            function Fi(e) {
                return "object" == typeof e && null != e && !e.outlets && !e.segmentPath
            }

            function Pi(e) {
                return "object" == typeof e && null != e && e.outlets
            }

            function mo(e, n, t, r, o) {
                let s, i = {};
                r && Ue(r, (l, u) => {
                    i[u] = Array.isArray(l) ? l.map(c => `${c}`) : `${l}`
                }), s = e === n ? t : gC(e, n, t);
                const a = Pd(Ba(s));
                return new qn(a, i, o)
            }

            function gC(e, n, t) {
                const r = {};
                return Ue(e.children, (o, i) => {
                    r[i] = o === n ? t : gC(o, n, t)
                }), new J(e.segments, r)
            }
            class mC {
                constructor(n, t, r) {
                    if (this.isAbsolute = n, this.numberOfDoubleDots = t, this.commands = r, n && r.length > 0 && Fi(r[0])) throw new D(4003, kd && "Root segment cannot have matrix parameters");
                    const o = r.find(Pi);
                    if (o && o !== oC(r)) throw new D(4004, kd && "{outlets:{}} has to be the last command")
                }
                toRoot() {
                    return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
                }
            }
            class yo {
                constructor(n, t, r) {
                    this.segmentGroup = n, this.processChildren = t, this.index = r
                }
            }

            function Ld(e, n, t) {
                if (e || (e = new J([], {})), 0 === e.segments.length && e.hasChildren()) return vo(e, n, t);
                const r = function BN(e, n, t) {
                    let r = 0,
                        o = n;
                    const i = {
                        match: !1,
                        pathIndex: 0,
                        commandIndex: 0
                    };
                    for (; o < e.segments.length;) {
                        if (r >= t.length) return i;
                        const s = e.segments[o],
                            a = t[r];
                        if (Pi(a)) break;
                        const l = `${a}`,
                            u = r < t.length - 1 ? t[r + 1] : null;
                        if (o > 0 && void 0 === l) break;
                        if (l && u && "object" == typeof u && void 0 === u.outlets) {
                            if (!CC(l, u, s)) return i;
                            r += 2
                        } else {
                            if (!CC(l, {}, s)) return i;
                            r++
                        }
                        o++
                    }
                    return {
                        match: !0,
                        pathIndex: o,
                        commandIndex: r
                    }
                }(e, n, t),
                    o = t.slice(r.commandIndex);
                if (r.match && r.pathIndex < e.segments.length) {
                    const i = new J(e.segments.slice(0, r.pathIndex), {});
                    return i.children[$] = new J(e.segments.slice(r.pathIndex), e.children), vo(i, 0, o)
                }
                return r.match && 0 === o.length ? new J(e.segments, {}) : r.match && !e.hasChildren() ? Vd(e, n, t) : r.match ? vo(e, 0, o) : Vd(e, n, t)
            }

            function vo(e, n, t) {
                if (0 === t.length) return new J(e.segments, {});
                {
                    const r = function jN(e) {
                        return Pi(e[0]) ? e[0].outlets : {
                            [$]: e
                        }
                    }(t),
                        o = {};
                    return !r[$] && e.children[$] && 1 === e.numberOfChildren && 0 === e.children[$].segments.length ? vo(e.children[$], n, t) : (Ue(r, (i, s) => {
                        "string" == typeof i && (i = [i]), null !== i && (o[s] = Ld(e.children[s], n, i))
                    }), Ue(e.children, (i, s) => {
                        void 0 === r[s] && (o[s] = i)
                    }), new J(e.segments, o))
                }
            }

            function Vd(e, n, t) {
                const r = e.segments.slice(0, n);
                let o = 0;
                for (; o < t.length;) {
                    const i = t[o];
                    if (Pi(i)) {
                        const l = $N(i.outlets);
                        return new J(r, l)
                    }
                    if (0 === o && Fi(t[0])) {
                        r.push(new Ri(e.segments[n].path, _C(t[0]))), o++;
                        continue
                    }
                    const s = Pi(i) ? i.outlets[$] : `${i}`,
                        a = o < t.length - 1 ? t[o + 1] : null;
                    s && a && Fi(a) ? (r.push(new Ri(s, _C(a))), o += 2) : (r.push(new Ri(s, {})), o++)
                }
                return new J(r, {})
            }

            function $N(e) {
                const n = {};
                return Ue(e, (t, r) => {
                    "string" == typeof t && (t = [t]), null !== t && (n[r] = Vd(new J([], {}), 0, t))
                }), n
            }

            function _C(e) {
                const n = {};
                return Ue(e, (t, r) => n[r] = `${t}`), n
            }

            function CC(e, n, t) {
                return e == t.path && un(n, t.parameters)
            }
            const ki = "imperative";
            class cn {
                constructor(n, t) {
                    this.id = n, this.url = t
                }
            }
            class jd extends cn {
                constructor(n, t, r = "imperative", o = null) {
                    super(n, t), this.type = 0, this.navigationTrigger = r, this.restoredState = o
                }
                toString() {
                    return `NavigationStart(id: ${this.id}, url: '${this.url}')`
                }
            }
            class Cr extends cn {
                constructor(n, t, r) {
                    super(n, t), this.urlAfterRedirects = r, this.type = 1
                }
                toString() {
                    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
                }
            }
            class $a extends cn {
                constructor(n, t, r, o) {
                    super(n, t), this.reason = r, this.code = o, this.type = 2
                }
                toString() {
                    return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
                }
            }
            class Ua extends cn {
                constructor(n, t, r, o) {
                    super(n, t), this.reason = r, this.code = o, this.type = 16
                }
            }
            class Bd extends cn {
                constructor(n, t, r, o) {
                    super(n, t), this.error = r, this.target = o, this.type = 3
                }
                toString() {
                    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
                }
            }
            class UN extends cn {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = 4
                }
                toString() {
                    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class HN extends cn {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = 7
                }
                toString() {
                    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class GN extends cn {
                constructor(n, t, r, o, i) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.shouldActivate = i, this.type = 8
                }
                toString() {
                    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
                }
            }
            class zN extends cn {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = 5
                }
                toString() {
                    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class WN extends cn {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = 6
                }
                toString() {
                    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class qN {
                constructor(n) {
                    this.route = n, this.type = 9
                }
                toString() {
                    return `RouteConfigLoadStart(path: ${this.route.path})`
                }
            }
            class JN {
                constructor(n) {
                    this.route = n, this.type = 10
                }
                toString() {
                    return `RouteConfigLoadEnd(path: ${this.route.path})`
                }
            }
            class XN {
                constructor(n) {
                    this.snapshot = n, this.type = 11
                }
                toString() {
                    return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
                }
            }
            class KN {
                constructor(n) {
                    this.snapshot = n, this.type = 12
                }
                toString() {
                    return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
                }
            }
            class ZN {
                constructor(n) {
                    this.snapshot = n, this.type = 13
                }
                toString() {
                    return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
                }
            }
            class YN {
                constructor(n) {
                    this.snapshot = n, this.type = 14
                }
                toString() {
                    return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
                }
            }
            class DC {
                constructor(n, t, r) {
                    this.routerEvent = n, this.position = t, this.anchor = r, this.type = 15
                }
                toString() {
                    return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`
                }
            }
            let tF = (() => {
                class e {
                    createUrlTree(t, r, o, i, s, a) {
                        return kN(t || r.root, o, i, s, a)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })(),
                rF = (() => {
                    class e { }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275prov = T({
                        token: e,
                        factory: function (n) {
                            return tF.\u0275fac(n)
                        },
                        providedIn: "root"
                    }), e
                })();
            class wC {
                constructor(n) {
                    this._root = n
                }
                get root() {
                    return this._root.value
                }
                parent(n) {
                    const t = this.pathFromRoot(n);
                    return t.length > 1 ? t[t.length - 2] : null
                }
                children(n) {
                    const t = $d(n, this._root);
                    return t ? t.children.map(r => r.value) : []
                }
                firstChild(n) {
                    const t = $d(n, this._root);
                    return t && t.children.length > 0 ? t.children[0].value : null
                }
                siblings(n) {
                    const t = Ud(n, this._root);
                    return t.length < 2 ? [] : t[t.length - 2].children.map(o => o.value).filter(o => o !== n)
                }
                pathFromRoot(n) {
                    return Ud(n, this._root).map(t => t.value)
                }
            }

            function $d(e, n) {
                if (e === n.value) return n;
                for (const t of n.children) {
                    const r = $d(e, t);
                    if (r) return r
                }
                return null
            }

            function Ud(e, n) {
                if (e === n.value) return [n];
                for (const t of n.children) {
                    const r = Ud(e, t);
                    if (r.length) return r.unshift(n), r
                }
                return []
            }
            class On {
                constructor(n, t) {
                    this.value = n, this.children = t
                }
                toString() {
                    return `TreeNode(${this.value})`
                }
            }

            function _o(e) {
                const n = {};
                return e && e.children.forEach(t => n[t.value.outlet] = t), n
            }
            class EC extends wC {
                constructor(n, t) {
                    super(n), this.snapshot = t, Hd(this, n)
                }
                toString() {
                    return this.snapshot.toString()
                }
            }

            function bC(e, n) {
                const t = function oF(e, n) {
                    const s = new Ha([], {}, {}, "", {}, $, n, null, e.root, -1, {});
                    return new MC("", new On(s, []))
                }(e, n),
                    r = new ct([new Ri("", {})]),
                    o = new ct({}),
                    i = new ct({}),
                    s = new ct({}),
                    a = new ct(""),
                    l = new Co(r, o, s, a, i, $, n, t.root);
                return l.snapshot = t.root, new EC(new On(l, []), t)
            }
            class Co {
                constructor(n, t, r, o, i, s, a, l) {
                    this.url = n, this.params = t, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.title = this.data?.pipe(U(u => u[xi])) ?? R(void 0), this._futureSnapshot = l
                }
                get routeConfig() {
                    return this._futureSnapshot.routeConfig
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap || (this._paramMap = this.params.pipe(U(n => go(n)))), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(U(n => go(n)))), this._queryParamMap
                }
                toString() {
                    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
                }
            }

            function SC(e, n = "emptyOnly") {
                const t = e.pathFromRoot;
                let r = 0;
                if ("always" !== n)
                    for (r = t.length - 1; r >= 1;) {
                        const o = t[r],
                            i = t[r - 1];
                        if (o.routeConfig && "" === o.routeConfig.path) r--;
                        else {
                            if (i.component) break;
                            r--
                        }
                    }
                return function iF(e) {
                    return e.reduce((n, t) => ({
                        params: {
                            ...n.params,
                            ...t.params
                        },
                        data: {
                            ...n.data,
                            ...t.data
                        },
                        resolve: {
                            ...t.data,
                            ...n.resolve,
                            ...t.routeConfig?.data,
                            ...t._resolvedData
                        }
                    }), {
                        params: {},
                        data: {},
                        resolve: {}
                    })
                }(t.slice(r))
            }
            class Ha {
                get title() {
                    return this.data?.[xi]
                }
                constructor(n, t, r, o, i, s, a, l, u, c, d) {
                    this.url = n, this.params = t, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.routeConfig = l, this._urlSegment = u, this._lastPathIndex = c, this._resolve = d
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap || (this._paramMap = go(this.params)), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap || (this._queryParamMap = go(this.queryParams)), this._queryParamMap
                }
                toString() {
                    return `Route(url:'${this.url.map(r => r.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`
                }
            }
            class MC extends wC {
                constructor(n, t) {
                    super(t), this.url = n, Hd(this, t)
                }
                toString() {
                    return IC(this._root)
                }
            }

            function Hd(e, n) {
                n.value._routerState = e, n.children.forEach(t => Hd(e, t))
            }

            function IC(e) {
                const n = e.children.length > 0 ? ` { ${e.children.map(IC).join(", ")} } ` : "";
                return `${e.value}${n}`
            }

            function Gd(e) {
                if (e.snapshot) {
                    const n = e.snapshot,
                        t = e._futureSnapshot;
                    e.snapshot = t, un(n.queryParams, t.queryParams) || e.queryParams.next(t.queryParams), n.fragment !== t.fragment && e.fragment.next(t.fragment), un(n.params, t.params) || e.params.next(t.params),
                        function _N(e, n) {
                            if (e.length !== n.length) return !1;
                            for (let t = 0; t < e.length; ++t)
                                if (!un(e[t], n[t])) return !1;
                            return !0
                        }(n.url, t.url) || e.url.next(t.url), un(n.data, t.data) || e.data.next(t.data)
                } else e.snapshot = e._futureSnapshot, e.data.next(e._futureSnapshot.data)
            }

            function zd(e, n) {
                const t = un(e.params, n.params) && function EN(e, n) {
                    return vr(e, n) && e.every((t, r) => un(t.parameters, n[r].parameters))
                }(e.url, n.url);
                return t && !(!e.parent != !n.parent) && (!e.parent || zd(e.parent, n.parent))
            }

            function Li(e, n, t) {
                if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
                    const r = t.value;
                    r._futureSnapshot = n.value;
                    const o = function aF(e, n, t) {
                        return n.children.map(r => {
                            for (const o of t.children)
                                if (e.shouldReuseRoute(r.value, o.value.snapshot)) return Li(e, r, o);
                            return Li(e, r)
                        })
                    }(e, n, t);
                    return new On(r, o)
                } {
                    if (e.shouldAttach(n.value)) {
                        const i = e.retrieve(n.value);
                        if (null !== i) {
                            const s = i.route;
                            return s.value._futureSnapshot = n.value, s.children = n.children.map(a => Li(e, a)), s
                        }
                    }
                    const r = function lF(e) {
                        return new Co(new ct(e.url), new ct(e.params), new ct(e.queryParams), new ct(e.fragment), new ct(e.data), e.outlet, e.component, e)
                    }(n.value),
                        o = n.children.map(i => Li(e, i));
                    return new On(r, o)
                }
            }
            const Wd = "ngNavigationCancelingError";

            function AC(e, n) {
                const {
                    redirectTo: t,
                    navigationBehaviorOptions: r
                } = _r(n) ? {
                    redirectTo: n,
                    navigationBehaviorOptions: void 0
                } : n, o = TC(!1, 0, n);
                return o.url = t, o.navigationBehaviorOptions = r, o
            }

            function TC(e, n, t) {
                const r = new Error("NavigationCancelingError: " + (e || ""));
                return r[Wd] = !0, r.cancellationCode = n, t && (r.url = t), r
            }

            function xC(e) {
                return RC(e) && _r(e.url)
            }

            function RC(e) {
                return e && e[Wd]
            }
            class uF {
                constructor() {
                    this.outlet = null, this.route = null, this.resolver = null, this.injector = null, this.children = new Vi, this.attachRef = null
                }
            }
            let Vi = (() => {
                class e {
                    constructor() {
                        this.contexts = new Map
                    }
                    onChildOutletCreated(t, r) {
                        const o = this.getOrCreateContext(t);
                        o.outlet = r, this.contexts.set(t, o)
                    }
                    onChildOutletDestroyed(t) {
                        const r = this.getContext(t);
                        r && (r.outlet = null, r.attachRef = null)
                    }
                    onOutletDeactivated() {
                        const t = this.contexts;
                        return this.contexts = new Map, t
                    }
                    onOutletReAttached(t) {
                        this.contexts = t
                    }
                    getOrCreateContext(t) {
                        let r = this.getContext(t);
                        return r || (r = new uF, this.contexts.set(t, r)), r
                    }
                    getContext(t) {
                        return this.contexts.get(t) || null
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const Ga = !1;
            let qd = (() => {
                class e {
                    constructor() {
                        this.activated = null, this._activatedRoute = null, this.name = $, this.activateEvents = new ue, this.deactivateEvents = new ue, this.attachEvents = new ue, this.detachEvents = new ue, this.parentContexts = W(Vi), this.location = W(Wt), this.changeDetector = W(da), this.environmentInjector = W(nn)
                    }
                    ngOnChanges(t) {
                        if (t.name) {
                            const {
                                firstChange: r,
                                previousValue: o
                            } = t.name;
                            if (r) return;
                            this.isTrackedInParentContexts(o) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)), this.initializeOutletWithName()
                        }
                    }
                    ngOnDestroy() {
                        this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name)
                    }
                    isTrackedInParentContexts(t) {
                        return this.parentContexts.getContext(t)?.outlet === this
                    }
                    ngOnInit() {
                        this.initializeOutletWithName()
                    }
                    initializeOutletWithName() {
                        if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated) return;
                        const t = this.parentContexts.getContext(this.name);
                        t?.route && (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.injector))
                    }
                    get isActivated() {
                        return !!this.activated
                    }
                    get component() {
                        if (!this.activated) throw new D(4012, Ga);
                        return this.activated.instance
                    }
                    get activatedRoute() {
                        if (!this.activated) throw new D(4012, Ga);
                        return this._activatedRoute
                    }
                    get activatedRouteData() {
                        return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                    }
                    detach() {
                        if (!this.activated) throw new D(4012, Ga);
                        this.location.detach();
                        const t = this.activated;
                        return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(t.instance), t
                    }
                    attach(t, r) {
                        this.activated = t, this._activatedRoute = r, this.location.insert(t.hostView), this.attachEvents.emit(t.instance)
                    }
                    deactivate() {
                        if (this.activated) {
                            const t = this.component;
                            this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(t)
                        }
                    }
                    activateWith(t, r) {
                        if (this.isActivated) throw new D(4013, Ga);
                        this._activatedRoute = t;
                        const o = this.location,
                            s = t.snapshot.component,
                            a = this.parentContexts.getOrCreateContext(this.name).children,
                            l = new cF(t, a, o.injector);
                        if (r && function dF(e) {
                            return !!e.resolveComponentFactory
                        }(r)) {
                            const u = r.resolveComponentFactory(s);
                            this.activated = o.createComponent(u, o.length, l)
                        } else this.activated = o.createComponent(s, {
                            index: o.length,
                            injector: l,
                            environmentInjector: r ?? this.environmentInjector
                        });
                        this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["router-outlet"]
                    ],
                    inputs: {
                        name: "name"
                    },
                    outputs: {
                        activateEvents: "activate",
                        deactivateEvents: "deactivate",
                        attachEvents: "attach",
                        detachEvents: "detach"
                    },
                    exportAs: ["outlet"],
                    standalone: !0,
                    features: [gt]
                }), e
            })();
            class cF {
                constructor(n, t, r) {
                    this.route = n, this.childContexts = t, this.parent = r
                }
                get(n, t) {
                    return n === Co ? this.route : n === Vi ? this.childContexts : this.parent.get(n, t)
                }
            }
            let Jd = (() => {
                class e { }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275cmp = kt({
                    type: e,
                    selectors: [
                        ["ng-component"]
                    ],
                    standalone: !0,
                    features: [Py],
                    decls: 1,
                    vars: 0,
                    template: function (t, r) {
                        1 & t && jn(0, "router-outlet")
                    },
                    dependencies: [qd],
                    encapsulation: 2
                }), e
            })();

            function OC(e, n) {
                return e.providers && !e._injector && (e._injector = ea(e.providers, n, `Route: ${e.path}`)), e._injector ?? n
            }

            function Kd(e) {
                const n = e.children && e.children.map(Kd),
                    t = n ? {
                        ...e,
                        children: n
                    } : {
                        ...e
                    };
                return !t.component && !t.loadComponent && (n || t.loadChildren) && t.outlet && t.outlet !== $ && (t.component = Jd), t
            }

            function Ft(e) {
                return e.outlet || $
            }

            function NC(e, n) {
                const t = e.filter(r => Ft(r) === n);
                return t.push(...e.filter(r => Ft(r) !== n)), t
            }

            function ji(e) {
                if (!e) return null;
                if (e.routeConfig?._injector) return e.routeConfig._injector;
                for (let n = e.parent; n; n = n.parent) {
                    const t = n.routeConfig;
                    if (t?._loadedInjector) return t._loadedInjector;
                    if (t?._injector) return t._injector
                }
                return null
            }
            class mF {
                constructor(n, t, r, o) {
                    this.routeReuseStrategy = n, this.futureState = t, this.currState = r, this.forwardEvent = o
                }
                activate(n) {
                    const t = this.futureState._root,
                        r = this.currState ? this.currState._root : null;
                    this.deactivateChildRoutes(t, r, n), Gd(this.futureState.root), this.activateChildRoutes(t, r, n)
                }
                deactivateChildRoutes(n, t, r) {
                    const o = _o(t);
                    n.children.forEach(i => {
                        const s = i.value.outlet;
                        this.deactivateRoutes(i, o[s], r), delete o[s]
                    }), Ue(o, (i, s) => {
                        this.deactivateRouteAndItsChildren(i, r)
                    })
                }
                deactivateRoutes(n, t, r) {
                    const o = n.value,
                        i = t ? t.value : null;
                    if (o === i)
                        if (o.component) {
                            const s = r.getContext(o.outlet);
                            s && this.deactivateChildRoutes(n, t, s.children)
                        } else this.deactivateChildRoutes(n, t, r);
                    else i && this.deactivateRouteAndItsChildren(t, r)
                }
                deactivateRouteAndItsChildren(n, t) {
                    n.value.component && this.routeReuseStrategy.shouldDetach(n.value.snapshot) ? this.detachAndStoreRouteSubtree(n, t) : this.deactivateRouteAndOutlet(n, t)
                }
                detachAndStoreRouteSubtree(n, t) {
                    const r = t.getContext(n.value.outlet),
                        o = r && n.value.component ? r.children : t,
                        i = _o(n);
                    for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
                    if (r && r.outlet) {
                        const s = r.outlet.detach(),
                            a = r.children.onOutletDeactivated();
                        this.routeReuseStrategy.store(n.value.snapshot, {
                            componentRef: s,
                            route: n,
                            contexts: a
                        })
                    }
                }
                deactivateRouteAndOutlet(n, t) {
                    const r = t.getContext(n.value.outlet),
                        o = r && n.value.component ? r.children : t,
                        i = _o(n);
                    for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
                    r && r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated(), r.attachRef = null, r.resolver = null, r.route = null)
                }
                activateChildRoutes(n, t, r) {
                    const o = _o(t);
                    n.children.forEach(i => {
                        this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new YN(i.value.snapshot))
                    }), n.children.length && this.forwardEvent(new KN(n.value.snapshot))
                }
                activateRoutes(n, t, r) {
                    const o = n.value,
                        i = t ? t.value : null;
                    if (Gd(o), o === i)
                        if (o.component) {
                            const s = r.getOrCreateContext(o.outlet);
                            this.activateChildRoutes(n, t, s.children)
                        } else this.activateChildRoutes(n, t, r);
                    else if (o.component) {
                        const s = r.getOrCreateContext(o.outlet);
                        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                            const a = this.routeReuseStrategy.retrieve(o.snapshot);
                            this.routeReuseStrategy.store(o.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), Gd(a.route.value), this.activateChildRoutes(n, null, s.children)
                        } else {
                            const a = ji(o.snapshot),
                                l = a?.get(oi) ?? null;
                            s.attachRef = null, s.route = o, s.resolver = l, s.injector = a, s.outlet && s.outlet.activateWith(o, s.injector), this.activateChildRoutes(n, null, s.children)
                        }
                    } else this.activateChildRoutes(n, null, r)
                }
            }
            class FC {
                constructor(n) {
                    this.path = n, this.route = this.path[this.path.length - 1]
                }
            }
            class za {
                constructor(n, t) {
                    this.component = n, this.route = t
                }
            }

            function yF(e, n, t) {
                const r = e._root;
                return Bi(r, n ? n._root : null, t, [r.value])
            }

            function Do(e, n) {
                const t = Symbol(),
                    r = n.get(e, t);
                return r === t ? "function" != typeof e || function bE(e) {
                    return null !== os(e)
                }(e) ? n.get(e) : e : r
            }

            function Bi(e, n, t, r, o = {
                canDeactivateChecks: [],
                canActivateChecks: []
            }) {
                const i = _o(n);
                return e.children.forEach(s => {
                    (function _F(e, n, t, r, o = {
                        canDeactivateChecks: [],
                        canActivateChecks: []
                    }) {
                        const i = e.value,
                            s = n ? n.value : null,
                            a = t ? t.getContext(e.value.outlet) : null;
                        if (s && i.routeConfig === s.routeConfig) {
                            const l = function CF(e, n, t) {
                                if ("function" == typeof t) return t(e, n);
                                switch (t) {
                                    case "pathParamsChange":
                                        return !vr(e.url, n.url);
                                    case "pathParamsOrQueryParamsChange":
                                        return !vr(e.url, n.url) || !un(e.queryParams, n.queryParams);
                                    case "always":
                                        return !0;
                                    case "paramsOrQueryParamsChange":
                                        return !zd(e, n) || !un(e.queryParams, n.queryParams);
                                    default:
                                        return !zd(e, n)
                                }
                            }(s, i, i.routeConfig.runGuardsAndResolvers);
                            l ? o.canActivateChecks.push(new FC(r)) : (i.data = s.data, i._resolvedData = s._resolvedData), Bi(e, n, i.component ? a ? a.children : null : t, r, o), l && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new za(a.outlet.component, s))
                        } else s && $i(n, a, o), o.canActivateChecks.push(new FC(r)), Bi(e, null, i.component ? a ? a.children : null : t, r, o)
                    })(s, i[s.value.outlet], t, r.concat([s.value]), o), delete i[s.value.outlet]
                }), Ue(i, (s, a) => $i(s, t.getContext(a), o)), o
            }

            function $i(e, n, t) {
                const r = _o(e),
                    o = e.value;
                Ue(r, (i, s) => {
                    $i(i, o.component ? n ? n.children.getContext(s) : null : n, t)
                }), t.canDeactivateChecks.push(new za(o.component && n && n.outlet && n.outlet.isActivated ? n.outlet.component : null, o))
            }

            function Ui(e) {
                return "function" == typeof e
            }

            function Zd(e) {
                return e instanceof Ra || "EmptyError" === e?.name
            }
            const Wa = Symbol("INITIAL_VALUE");

            function wo() {
                return ln(e => J_(e.map(n => n.pipe(yr(1), function hN(...e) {
                    const n = No(e);
                    return Ie((t, r) => {
                        (n ? Oa(e, t, n) : Oa(e, t)).subscribe(r)
                    })
                }(Wa)))).pipe(U(n => {
                    for (const t of n)
                        if (!0 !== t) {
                            if (t === Wa) return Wa;
                            if (!1 === t || t instanceof qn) return t
                        } return !0
                }), Rn(n => n !== Wa), yr(1)))
            }

            function PC(e) {
                return function Gw(...e) {
                    return Hf(e)
                }(Xe(n => {
                    if (_r(n)) throw AC(0, n)
                }), U(n => !0 === n))
            }
            const Yd = {
                matched: !1,
                consumedSegments: [],
                remainingSegments: [],
                parameters: {},
                positionalParamSegments: {}
            };

            function kC(e, n, t, r, o) {
                const i = Qd(e, n, t);
                return i.matched ? function LF(e, n, t, r) {
                    const o = n.canMatch;
                    return o && 0 !== o.length ? R(o.map(s => {
                        const a = Do(s, e);
                        return Wn(function MF(e) {
                            return e && Ui(e.canMatch)
                        }(a) ? a.canMatch(n, t) : e.runInContext(() => a(n, t)))
                    })).pipe(wo(), PC()) : R(!0)
                }(r = OC(n, r), n, t).pipe(U(s => !0 === s ? i : {
                    ...Yd
                })) : R(i)
            }

            function Qd(e, n, t) {
                if ("" === n.path) return "full" === n.pathMatch && (e.hasChildren() || t.length > 0) ? {
                    ...Yd
                } : {
                    matched: !0,
                    consumedSegments: [],
                    remainingSegments: t,
                    parameters: {},
                    positionalParamSegments: {}
                };
                const o = (n.matcher || vN)(t, e, n);
                if (!o) return {
                    ...Yd
                };
                const i = {};
                Ue(o.posParams, (a, l) => {
                    i[l] = a.path
                });
                const s = o.consumed.length > 0 ? {
                    ...i,
                    ...o.consumed[o.consumed.length - 1].parameters
                } : i;
                return {
                    matched: !0,
                    consumedSegments: o.consumed,
                    remainingSegments: t.slice(o.consumed.length),
                    parameters: s,
                    positionalParamSegments: o.posParams ?? {}
                }
            }

            function qa(e, n, t, r) {
                if (t.length > 0 && function BF(e, n, t) {
                    return t.some(r => Ja(e, n, r) && Ft(r) !== $)
                }(e, t, r)) {
                    const i = new J(n, function jF(e, n, t, r) {
                        const o = {};
                        o[$] = r, r._sourceSegment = e, r._segmentIndexShift = n.length;
                        for (const i of t)
                            if ("" === i.path && Ft(i) !== $) {
                                const s = new J([], {});
                                s._sourceSegment = e, s._segmentIndexShift = n.length, o[Ft(i)] = s
                            } return o
                    }(e, n, r, new J(t, e.children)));
                    return i._sourceSegment = e, i._segmentIndexShift = n.length, {
                        segmentGroup: i,
                        slicedSegments: []
                    }
                }
                if (0 === t.length && function $F(e, n, t) {
                    return t.some(r => Ja(e, n, r))
                }(e, t, r)) {
                    const i = new J(e.segments, function VF(e, n, t, r, o) {
                        const i = {};
                        for (const s of r)
                            if (Ja(e, t, s) && !o[Ft(s)]) {
                                const a = new J([], {});
                                a._sourceSegment = e, a._segmentIndexShift = n.length, i[Ft(s)] = a
                            } return {
                                ...o,
                                ...i
                            }
                    }(e, n, t, r, e.children));
                    return i._sourceSegment = e, i._segmentIndexShift = n.length, {
                        segmentGroup: i,
                        slicedSegments: t
                    }
                }
                const o = new J(e.segments, e.children);
                return o._sourceSegment = e, o._segmentIndexShift = n.length, {
                    segmentGroup: o,
                    slicedSegments: t
                }
            }

            function Ja(e, n, t) {
                return (!(e.hasChildren() || n.length > 0) || "full" !== t.pathMatch) && "" === t.path
            }

            function LC(e, n, t, r) {
                return !!(Ft(e) === r || r !== $ && Ja(n, t, e)) && ("**" === e.path || Qd(n, e, t).matched)
            }

            function VC(e, n, t) {
                return 0 === n.length && !e.children[t]
            }
            const Xa = !1;
            class Ka {
                constructor(n) {
                    this.segmentGroup = n || null
                }
            }
            class jC {
                constructor(n) {
                    this.urlTree = n
                }
            }

            function Hi(e) {
                return Ti(new Ka(e))
            }

            function BC(e) {
                return Ti(new jC(e))
            }
            class zF {
                constructor(n, t, r, o, i) {
                    this.injector = n, this.configLoader = t, this.urlSerializer = r, this.urlTree = o, this.config = i, this.allowRedirects = !0
                }
                apply() {
                    const n = qa(this.urlTree.root, [], [], this.config).segmentGroup,
                        t = new J(n.segments, n.children);
                    return this.expandSegmentGroup(this.injector, this.config, t, $).pipe(U(i => this.createUrlTree(Ba(i), this.urlTree.queryParams, this.urlTree.fragment))).pipe(zn(i => {
                        if (i instanceof jC) return this.allowRedirects = !1, this.match(i.urlTree);
                        throw i instanceof Ka ? this.noMatchError(i) : i
                    }))
                }
                match(n) {
                    return this.expandSegmentGroup(this.injector, this.config, n.root, $).pipe(U(o => this.createUrlTree(Ba(o), n.queryParams, n.fragment))).pipe(zn(o => {
                        throw o instanceof Ka ? this.noMatchError(o) : o
                    }))
                }
                noMatchError(n) {
                    return new D(4002, Xa)
                }
                createUrlTree(n, t, r) {
                    const o = Pd(n);
                    return new qn(o, t, r)
                }
                expandSegmentGroup(n, t, r, o) {
                    return 0 === r.segments.length && r.hasChildren() ? this.expandChildren(n, t, r).pipe(U(i => new J([], i))) : this.expandSegment(n, r, t, r.segments, o, !0)
                }
                expandChildren(n, t, r) {
                    const o = [];
                    for (const i of Object.keys(r.children)) "primary" === i ? o.unshift(i) : o.push(i);
                    return Ae(o).pipe(Gn(i => {
                        const s = r.children[i],
                            a = NC(t, i);
                        return this.expandSegmentGroup(n, a, s, i).pipe(U(l => ({
                            segment: l,
                            outlet: i
                        })))
                    }), Q_((i, s) => (i[s.outlet] = s.segment, i), {}), eC())
                }
                expandSegment(n, t, r, o, i, s) {
                    return Ae(r).pipe(Gn(a => this.expandSegmentAgainstRoute(n, t, r, a, o, i, s).pipe(zn(u => {
                        if (u instanceof Ka) return R(null);
                        throw u
                    }))), Hn(a => !!a), zn((a, l) => {
                        if (Zd(a)) return VC(t, o, i) ? R(new J([], {})) : Hi(t);
                        throw a
                    }))
                }
                expandSegmentAgainstRoute(n, t, r, o, i, s, a) {
                    return LC(o, t, i, s) ? void 0 === o.redirectTo ? this.matchSegmentAgainstRoute(n, t, o, i, s) : a && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) : Hi(t) : Hi(t)
                }
                expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
                    return "**" === o.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, r, o, s) : this.expandRegularSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s)
                }
                expandWildCardWithParamsAgainstRouteUsingRedirect(n, t, r, o) {
                    const i = this.applyRedirectCommands([], r.redirectTo, {});
                    return r.redirectTo.startsWith("/") ? BC(i) : this.lineralizeSegments(r, i).pipe(Le(s => {
                        const a = new J(s, {});
                        return this.expandSegment(n, a, t, s, o, !1)
                    }))
                }
                expandRegularSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
                    const {
                        matched: a,
                        consumedSegments: l,
                        remainingSegments: u,
                        positionalParamSegments: c
                    } = Qd(t, o, i);
                    if (!a) return Hi(t);
                    const d = this.applyRedirectCommands(l, o.redirectTo, c);
                    return o.redirectTo.startsWith("/") ? BC(d) : this.lineralizeSegments(o, d).pipe(Le(f => this.expandSegment(n, t, r, f.concat(u), s, !1)))
                }
                matchSegmentAgainstRoute(n, t, r, o, i) {
                    return "**" === r.path ? (n = OC(r, n), r.loadChildren ? (r._loadedRoutes ? R({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector
                    }) : this.configLoader.loadChildren(n, r)).pipe(U(a => (r._loadedRoutes = a.routes, r._loadedInjector = a.injector, new J(o, {})))) : R(new J(o, {}))) : kC(t, r, o, n).pipe(ln(({
                        matched: s,
                        consumedSegments: a,
                        remainingSegments: l
                    }) => s ? this.getChildConfig(n = r._injector ?? n, r, o).pipe(Le(c => {
                        const d = c.injector ?? n,
                            f = c.routes,
                            {
                                segmentGroup: h,
                                slicedSegments: p
                            } = qa(t, a, l, f),
                            g = new J(h.segments, h.children);
                        if (0 === p.length && g.hasChildren()) return this.expandChildren(d, f, g).pipe(U(y => new J(a, y)));
                        if (0 === f.length && 0 === p.length) return R(new J(a, {}));
                        const m = Ft(r) === i;
                        return this.expandSegment(d, g, f, p, m ? $ : i, !0).pipe(U(w => new J(a.concat(w.segments), w.children)))
                    })) : Hi(t)))
                }
                getChildConfig(n, t, r) {
                    return t.children ? R({
                        routes: t.children,
                        injector: n
                    }) : t.loadChildren ? void 0 !== t._loadedRoutes ? R({
                        routes: t._loadedRoutes,
                        injector: t._loadedInjector
                    }) : function kF(e, n, t, r) {
                        const o = n.canLoad;
                        return void 0 === o || 0 === o.length ? R(!0) : R(o.map(s => {
                            const a = Do(s, e);
                            return Wn(function wF(e) {
                                return e && Ui(e.canLoad)
                            }(a) ? a.canLoad(n, t) : e.runInContext(() => a(n, t)))
                        })).pipe(wo(), PC())
                    }(n, t, r).pipe(Le(o => o ? this.configLoader.loadChildren(n, t).pipe(Xe(i => {
                        t._loadedRoutes = i.routes, t._loadedInjector = i.injector
                    })) : function HF(e) {
                        return Ti(TC(Xa, 3))
                    }())) : R({
                        routes: [],
                        injector: n
                    })
                }
                lineralizeSegments(n, t) {
                    let r = [],
                        o = t.root;
                    for (; ;) {
                        if (r = r.concat(o.segments), 0 === o.numberOfChildren) return R(r);
                        if (o.numberOfChildren > 1 || !o.children[$]) return n.redirectTo, Ti(new D(4e3, Xa));
                        o = o.children[$]
                    }
                }
                applyRedirectCommands(n, t, r) {
                    return this.applyRedirectCreateUrlTree(t, this.urlSerializer.parse(t), n, r)
                }
                applyRedirectCreateUrlTree(n, t, r, o) {
                    const i = this.createSegmentGroup(n, t.root, r, o);
                    return new qn(i, this.createQueryParams(t.queryParams, this.urlTree.queryParams), t.fragment)
                }
                createQueryParams(n, t) {
                    const r = {};
                    return Ue(n, (o, i) => {
                        if ("string" == typeof o && o.startsWith(":")) {
                            const a = o.substring(1);
                            r[i] = t[a]
                        } else r[i] = o
                    }), r
                }
                createSegmentGroup(n, t, r, o) {
                    const i = this.createSegments(n, t.segments, r, o);
                    let s = {};
                    return Ue(t.children, (a, l) => {
                        s[l] = this.createSegmentGroup(n, a, r, o)
                    }), new J(i, s)
                }
                createSegments(n, t, r, o) {
                    return t.map(i => i.path.startsWith(":") ? this.findPosParam(n, i, o) : this.findOrReturn(i, r))
                }
                findPosParam(n, t, r) {
                    const o = r[t.path.substring(1)];
                    if (!o) throw new D(4001, Xa);
                    return o
                }
                findOrReturn(n, t) {
                    let r = 0;
                    for (const o of t) {
                        if (o.path === n.path) return t.splice(r), o;
                        r++
                    }
                    return n
                }
            }
            class qF { }
            class KF {
                constructor(n, t, r, o, i, s, a) {
                    this.injector = n, this.rootComponentType = t, this.config = r, this.urlTree = o, this.url = i, this.paramsInheritanceStrategy = s, this.urlSerializer = a
                }
                recognize() {
                    const n = qa(this.urlTree.root, [], [], this.config.filter(t => void 0 === t.redirectTo)).segmentGroup;
                    return this.processSegmentGroup(this.injector, this.config, n, $).pipe(U(t => {
                        if (null === t) return null;
                        const r = new Ha([], Object.freeze({}), Object.freeze({
                            ...this.urlTree.queryParams
                        }), this.urlTree.fragment, {}, $, this.rootComponentType, null, this.urlTree.root, -1, {}),
                            o = new On(r, t),
                            i = new MC(this.url, o);
                        return this.inheritParamsAndData(i._root), i
                    }))
                }
                inheritParamsAndData(n) {
                    const t = n.value,
                        r = SC(t, this.paramsInheritanceStrategy);
                    t.params = Object.freeze(r.params), t.data = Object.freeze(r.data), n.children.forEach(o => this.inheritParamsAndData(o))
                }
                processSegmentGroup(n, t, r, o) {
                    return 0 === r.segments.length && r.hasChildren() ? this.processChildren(n, t, r) : this.processSegment(n, t, r, r.segments, o)
                }
                processChildren(n, t, r) {
                    return Ae(Object.keys(r.children)).pipe(Gn(o => {
                        const i = r.children[o],
                            s = NC(t, o);
                        return this.processSegmentGroup(n, s, i, o)
                    }), Q_((o, i) => o && i ? (o.push(...i), o) : null), function mN(e, n = !1) {
                        return Ie((t, r) => {
                            let o = 0;
                            t.subscribe(ve(r, i => {
                                const s = e(i, o++);
                                (s || n) && r.next(i), !s && r.complete()
                            }))
                        })
                    }(o => null !== o), Na(null), eC(), U(o => {
                        if (null === o) return null;
                        const i = UC(o);
                        return function ZF(e) {
                            e.sort((n, t) => n.value.outlet === $ ? -1 : t.value.outlet === $ ? 1 : n.value.outlet.localeCompare(t.value.outlet))
                        }(i), i
                    }))
                }
                processSegment(n, t, r, o, i) {
                    return Ae(t).pipe(Gn(s => this.processSegmentAgainstRoute(s._injector ?? n, s, r, o, i)), Hn(s => !!s), zn(s => {
                        if (Zd(s)) return VC(r, o, i) ? R([]) : R(null);
                        throw s
                    }))
                }
                processSegmentAgainstRoute(n, t, r, o, i) {
                    if (t.redirectTo || !LC(t, r, o, i)) return R(null);
                    let s;
                    if ("**" === t.path) {
                        const a = o.length > 0 ? oC(o).parameters : {},
                            l = GC(r) + o.length;
                        s = R({
                            snapshot: new Ha(o, a, Object.freeze({
                                ...this.urlTree.queryParams
                            }), this.urlTree.fragment, zC(t), Ft(t), t.component ?? t._loadedComponent ?? null, t, HC(r), l, WC(t)),
                            consumedSegments: [],
                            remainingSegments: []
                        })
                    } else s = kC(r, t, o, n).pipe(U(({
                        matched: a,
                        consumedSegments: l,
                        remainingSegments: u,
                        parameters: c
                    }) => {
                        if (!a) return null;
                        const d = GC(r) + l.length;
                        return {
                            snapshot: new Ha(l, c, Object.freeze({
                                ...this.urlTree.queryParams
                            }), this.urlTree.fragment, zC(t), Ft(t), t.component ?? t._loadedComponent ?? null, t, HC(r), d, WC(t)),
                            consumedSegments: l,
                            remainingSegments: u
                        }
                    }));
                    return s.pipe(ln(a => {
                        if (null === a) return R(null);
                        const {
                            snapshot: l,
                            consumedSegments: u,
                            remainingSegments: c
                        } = a;
                        n = t._injector ?? n;
                        const d = t._loadedInjector ?? n,
                            f = function YF(e) {
                                return e.children ? e.children : e.loadChildren ? e._loadedRoutes : []
                            }(t),
                            {
                                segmentGroup: h,
                                slicedSegments: p
                            } = qa(r, u, c, f.filter(m => void 0 === m.redirectTo));
                        if (0 === p.length && h.hasChildren()) return this.processChildren(d, f, h).pipe(U(m => null === m ? null : [new On(l, m)]));
                        if (0 === f.length && 0 === p.length) return R([new On(l, [])]);
                        const g = Ft(t) === i;
                        return this.processSegment(d, f, h, p, g ? $ : i).pipe(U(m => null === m ? null : [new On(l, m)]))
                    }))
                }
            }

            function QF(e) {
                const n = e.value.routeConfig;
                return n && "" === n.path && void 0 === n.redirectTo
            }

            function UC(e) {
                const n = [],
                    t = new Set;
                for (const r of e) {
                    if (!QF(r)) {
                        n.push(r);
                        continue
                    }
                    const o = n.find(i => r.value.routeConfig === i.value.routeConfig);
                    void 0 !== o ? (o.children.push(...r.children), t.add(o)) : n.push(r)
                }
                for (const r of t) {
                    const o = UC(r.children);
                    n.push(new On(r.value, o))
                }
                return n.filter(r => !t.has(r))
            }

            function HC(e) {
                let n = e;
                for (; n._sourceSegment;) n = n._sourceSegment;
                return n
            }

            function GC(e) {
                let n = e,
                    t = n._segmentIndexShift ?? 0;
                for (; n._sourceSegment;) n = n._sourceSegment, t += n._segmentIndexShift ?? 0;
                return t - 1
            }

            function zC(e) {
                return e.data || {}
            }

            function WC(e) {
                return e.resolve || {}
            }

            function qC(e) {
                return "string" == typeof e.title || null === e.title
            }

            function ef(e) {
                return ln(n => {
                    const t = e(n);
                    return t ? Ae(t).pipe(U(() => n)) : R(n)
                })
            }
            const Eo = new M("ROUTES");
            let tf = (() => {
                class e {
                    constructor(t, r) {
                        this.injector = t, this.compiler = r, this.componentLoaders = new WeakMap, this.childrenLoaders = new WeakMap
                    }
                    loadComponent(t) {
                        if (this.componentLoaders.get(t)) return this.componentLoaders.get(t);
                        if (t._loadedComponent) return R(t._loadedComponent);
                        this.onLoadStartListener && this.onLoadStartListener(t);
                        const r = Wn(t.loadComponent()).pipe(U(XC), Xe(i => {
                            this.onLoadEndListener && this.onLoadEndListener(t), t._loadedComponent = i
                        }), Od(() => {
                            this.componentLoaders.delete(t)
                        })),
                            o = new Z_(r, () => new fn).pipe(xd());
                        return this.componentLoaders.set(t, o), o
                    }
                    loadChildren(t, r) {
                        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
                        if (r._loadedRoutes) return R({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector
                        });
                        this.onLoadStartListener && this.onLoadStartListener(r);
                        const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(U(a => {
                            this.onLoadEndListener && this.onLoadEndListener(r);
                            let l, u, c = !1;
                            Array.isArray(a) ? u = a : (l = a.create(t).injector, u = rC(l.get(Eo, [], P.Self | P.Optional)));
                            return {
                                routes: u.map(Kd),
                                injector: l
                            }
                        }), Od(() => {
                            this.childrenLoaders.delete(r)
                        })),
                            s = new Z_(i, () => new fn).pipe(xd());
                        return this.childrenLoaders.set(r, s), s
                    }
                    loadModuleFactoryOrRoutes(t) {
                        return Wn(t()).pipe(U(XC), Le(o => o instanceof Ny || Array.isArray(o) ? R(o) : Ae(this.compiler.compileModuleAsync(o))))
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(Ut), S(wv))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();

            function XC(e) {
                return function lP(e) {
                    return e && "object" == typeof e && "default" in e
                }(e) ? e.default : e
            }
            let Ya = (() => {
                class e {
                    get hasRequestedNavigation() {
                        return 0 !== this.navigationId
                    }
                    constructor() {
                        this.currentNavigation = null, this.lastSuccessfulNavigation = null, this.events = new fn, this.configLoader = W(tf), this.environmentInjector = W(nn), this.urlSerializer = W(Oi), this.rootContexts = W(Vi), this.navigationId = 0, this.afterPreactivation = () => R(void 0), this.rootComponentType = null, this.configLoader.onLoadEndListener = o => this.events.next(new JN(o)), this.configLoader.onLoadStartListener = o => this.events.next(new qN(o))
                    }
                    complete() {
                        this.transitions?.complete()
                    }
                    handleNavigationRequest(t) {
                        const r = ++this.navigationId;
                        this.transitions?.next({
                            ...this.transitions.value,
                            ...t,
                            id: r
                        })
                    }
                    setupNavigations(t) {
                        return this.transitions = new ct({
                            id: 0,
                            targetPageId: 0,
                            currentUrlTree: t.currentUrlTree,
                            currentRawUrl: t.currentUrlTree,
                            extractedUrl: t.urlHandlingStrategy.extract(t.currentUrlTree),
                            urlAfterRedirects: t.urlHandlingStrategy.extract(t.currentUrlTree),
                            rawUrl: t.currentUrlTree,
                            extras: {},
                            resolve: null,
                            reject: null,
                            promise: Promise.resolve(!0),
                            source: ki,
                            restoredState: null,
                            currentSnapshot: t.routerState.snapshot,
                            targetSnapshot: null,
                            currentRouterState: t.routerState,
                            targetRouterState: null,
                            guards: {
                                canActivateChecks: [],
                                canDeactivateChecks: []
                            },
                            guardsResult: null
                        }), this.transitions.pipe(Rn(r => 0 !== r.id), U(r => ({
                            ...r,
                            extractedUrl: t.urlHandlingStrategy.extract(r.rawUrl)
                        })), ln(r => {
                            let o = !1,
                                i = !1;
                            return R(r).pipe(Xe(s => {
                                this.currentNavigation = {
                                    id: s.id,
                                    initialUrl: s.rawUrl,
                                    extractedUrl: s.extractedUrl,
                                    trigger: s.source,
                                    extras: s.extras,
                                    previousNavigation: this.lastSuccessfulNavigation ? {
                                        ...this.lastSuccessfulNavigation,
                                        previousNavigation: null
                                    } : null
                                }
                            }), ln(s => {
                                const a = t.browserUrlTree.toString(),
                                    l = !t.navigated || s.extractedUrl.toString() !== a || a !== t.currentUrlTree.toString();
                                if (!l && "reload" !== (s.extras.onSameUrlNavigation ?? t.onSameUrlNavigation)) {
                                    const c = "";
                                    return this.events.next(new Ua(s.id, t.serializeUrl(r.rawUrl), c, 0)), t.rawUrlTree = s.rawUrl, s.resolve(null), Kt
                                }
                                if (t.urlHandlingStrategy.shouldProcessUrl(s.rawUrl)) return KC(s.source) && (t.browserUrlTree = s.extractedUrl), R(s).pipe(ln(c => {
                                    const d = this.transitions?.getValue();
                                    return this.events.next(new jd(c.id, this.urlSerializer.serialize(c.extractedUrl), c.source, c.restoredState)), d !== this.transitions?.getValue() ? Kt : Promise.resolve(c)
                                }), function WF(e, n, t, r) {
                                    return ln(o => function GF(e, n, t, r, o) {
                                        return new zF(e, n, t, r, o).apply()
                                    }(e, n, t, o.extractedUrl, r).pipe(U(i => ({
                                        ...o,
                                        urlAfterRedirects: i
                                    }))))
                                }(this.environmentInjector, this.configLoader, this.urlSerializer, t.config), Xe(c => {
                                    this.currentNavigation = {
                                        ...this.currentNavigation,
                                        finalUrl: c.urlAfterRedirects
                                    }, r.urlAfterRedirects = c.urlAfterRedirects
                                }), function tP(e, n, t, r, o) {
                                    return Le(i => function XF(e, n, t, r, o, i, s = "emptyOnly") {
                                        return new KF(e, n, t, r, o, s, i).recognize().pipe(ln(a => null === a ? function JF(e) {
                                            return new ye(n => n.error(e))
                                        }(new qF) : R(a)))
                                    }(e, n, t, i.urlAfterRedirects, r.serialize(i.urlAfterRedirects), r, o).pipe(U(s => ({
                                        ...i,
                                        targetSnapshot: s
                                    }))))
                                }(this.environmentInjector, this.rootComponentType, t.config, this.urlSerializer, t.paramsInheritanceStrategy), Xe(c => {
                                    if (r.targetSnapshot = c.targetSnapshot, "eager" === t.urlUpdateStrategy) {
                                        if (!c.extras.skipLocationChange) {
                                            const f = t.urlHandlingStrategy.merge(c.urlAfterRedirects, c.rawUrl);
                                            t.setBrowserUrl(f, c)
                                        }
                                        t.browserUrlTree = c.urlAfterRedirects
                                    }
                                    const d = new UN(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot);
                                    this.events.next(d)
                                }));
                                if (l && t.urlHandlingStrategy.shouldProcessUrl(t.rawUrlTree)) {
                                    const {
                                        id: c,
                                        extractedUrl: d,
                                        source: f,
                                        restoredState: h,
                                        extras: p
                                    } = s, g = new jd(c, this.urlSerializer.serialize(d), f, h);
                                    this.events.next(g);
                                    const m = bC(d, this.rootComponentType).snapshot;
                                    return R(r = {
                                        ...s,
                                        targetSnapshot: m,
                                        urlAfterRedirects: d,
                                        extras: {
                                            ...p,
                                            skipLocationChange: !1,
                                            replaceUrl: !1
                                        }
                                    })
                                } {
                                    const c = "";
                                    return this.events.next(new Ua(s.id, t.serializeUrl(r.extractedUrl), c, 1)), t.rawUrlTree = s.rawUrl, s.resolve(null), Kt
                                }
                            }), Xe(s => {
                                const a = new HN(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(s.urlAfterRedirects), s.targetSnapshot);
                                this.events.next(a)
                            }), U(s => r = {
                                ...s,
                                guards: yF(s.targetSnapshot, s.currentSnapshot, this.rootContexts)
                            }), function AF(e, n) {
                                return Le(t => {
                                    const {
                                        targetSnapshot: r,
                                        currentSnapshot: o,
                                        guards: {
                                            canActivateChecks: i,
                                            canDeactivateChecks: s
                                        }
                                    } = t;
                                    return 0 === s.length && 0 === i.length ? R({
                                        ...t,
                                        guardsResult: !0
                                    }) : function TF(e, n, t, r) {
                                        return Ae(e).pipe(Le(o => function PF(e, n, t, r, o) {
                                            const i = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
                                            return i && 0 !== i.length ? R(i.map(a => {
                                                const l = ji(n) ?? o,
                                                    u = Do(a, l);
                                                return Wn(function SF(e) {
                                                    return e && Ui(e.canDeactivate)
                                                }(u) ? u.canDeactivate(e, n, t, r) : l.runInContext(() => u(e, n, t, r))).pipe(Hn())
                                            })).pipe(wo()) : R(!0)
                                        }(o.component, o.route, t, n, r)), Hn(o => !0 !== o, !0))
                                    }(s, r, o, e).pipe(Le(a => a && function DF(e) {
                                        return "boolean" == typeof e
                                    }(a) ? function xF(e, n, t, r) {
                                        return Ae(n).pipe(Gn(o => Oa(function OF(e, n) {
                                            return null !== e && n && n(new XN(e)), R(!0)
                                        }(o.route.parent, r), function RF(e, n) {
                                            return null !== e && n && n(new ZN(e)), R(!0)
                                        }(o.route, r), function FF(e, n, t) {
                                            const r = n[n.length - 1],
                                                i = n.slice(0, n.length - 1).reverse().map(s => function vF(e) {
                                                    const n = e.routeConfig ? e.routeConfig.canActivateChild : null;
                                                    return n && 0 !== n.length ? {
                                                        node: e,
                                                        guards: n
                                                    } : null
                                                }(s)).filter(s => null !== s).map(s => K_(() => R(s.guards.map(l => {
                                                    const u = ji(s.node) ?? t,
                                                        c = Do(l, u);
                                                    return Wn(function bF(e) {
                                                        return e && Ui(e.canActivateChild)
                                                    }(c) ? c.canActivateChild(r, e) : u.runInContext(() => c(r, e))).pipe(Hn())
                                                })).pipe(wo())));
                                            return R(i).pipe(wo())
                                        }(e, o.path, t), function NF(e, n, t) {
                                            const r = n.routeConfig ? n.routeConfig.canActivate : null;
                                            if (!r || 0 === r.length) return R(!0);
                                            const o = r.map(i => K_(() => {
                                                const s = ji(n) ?? t,
                                                    a = Do(i, s);
                                                return Wn(function EF(e) {
                                                    return e && Ui(e.canActivate)
                                                }(a) ? a.canActivate(n, e) : s.runInContext(() => a(n, e))).pipe(Hn())
                                            }));
                                            return R(o).pipe(wo())
                                        }(e, o.route, t))), Hn(o => !0 !== o, !0))
                                    }(r, i, e, n) : R(a)), U(a => ({
                                        ...t,
                                        guardsResult: a
                                    })))
                                })
                            }(this.environmentInjector, s => this.events.next(s)), Xe(s => {
                                if (r.guardsResult = s.guardsResult, _r(s.guardsResult)) throw AC(0, s.guardsResult);
                                const a = new GN(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(s.urlAfterRedirects), s.targetSnapshot, !!s.guardsResult);
                                this.events.next(a)
                            }), Rn(s => !!s.guardsResult || (t.restoreHistory(s), this.cancelNavigationTransition(s, "", 3), !1)), ef(s => {
                                if (s.guards.canActivateChecks.length) return R(s).pipe(Xe(a => {
                                    const l = new zN(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot);
                                    this.events.next(l)
                                }), ln(a => {
                                    let l = !1;
                                    return R(a).pipe(function nP(e, n) {
                                        return Le(t => {
                                            const {
                                                targetSnapshot: r,
                                                guards: {
                                                    canActivateChecks: o
                                                }
                                            } = t;
                                            if (!o.length) return R(t);
                                            let i = 0;
                                            return Ae(o).pipe(Gn(s => function rP(e, n, t, r) {
                                                const o = e.routeConfig,
                                                    i = e._resolve;
                                                return void 0 !== o?.title && !qC(o) && (i[xi] = o.title),
                                                    function oP(e, n, t, r) {
                                                        const o = function iP(e) {
                                                            return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
                                                        }(e);
                                                        if (0 === o.length) return R({});
                                                        const i = {};
                                                        return Ae(o).pipe(Le(s => function sP(e, n, t, r) {
                                                            const o = ji(n) ?? r,
                                                                i = Do(e, o);
                                                            return Wn(i.resolve ? i.resolve(n, t) : o.runInContext(() => i(n, t)))
                                                        }(e[s], n, t, r).pipe(Hn(), Xe(a => {
                                                            i[s] = a
                                                        }))), Rd(1), tC(i), zn(s => Zd(s) ? Kt : Ti(s)))
                                                    }(i, e, n, r).pipe(U(s => (e._resolvedData = s, e.data = SC(e, t).resolve, o && qC(o) && (e.data[xi] = o.title), null)))
                                            }(s.route, r, e, n)), Xe(() => i++), Rd(1), Le(s => i === o.length ? R(t) : Kt))
                                        })
                                    }(t.paramsInheritanceStrategy, this.environmentInjector), Xe({
                                        next: () => l = !0,
                                        complete: () => {
                                            l || (t.restoreHistory(a), this.cancelNavigationTransition(a, "", 2))
                                        }
                                    }))
                                }), Xe(a => {
                                    const l = new WN(a.id, this.urlSerializer.serialize(a.extractedUrl), this.urlSerializer.serialize(a.urlAfterRedirects), a.targetSnapshot);
                                    this.events.next(l)
                                }))
                            }), ef(s => {
                                const a = l => {
                                    const u = [];
                                    l.routeConfig?.loadComponent && !l.routeConfig._loadedComponent && u.push(this.configLoader.loadComponent(l.routeConfig).pipe(Xe(c => {
                                        l.component = c
                                    }), U(() => { })));
                                    for (const c of l.children) u.push(...a(c));
                                    return u
                                };
                                return J_(a(s.targetSnapshot.root)).pipe(Na(), yr(1))
                            }), ef(() => this.afterPreactivation()), U(s => {
                                const a = function sF(e, n, t) {
                                    const r = Li(e, n._root, t ? t._root : void 0);
                                    return new EC(r, n)
                                }(t.routeReuseStrategy, s.targetSnapshot, s.currentRouterState);
                                return r = {
                                    ...s,
                                    targetRouterState: a
                                }
                            }), Xe(s => {
                                t.currentUrlTree = s.urlAfterRedirects, t.rawUrlTree = t.urlHandlingStrategy.merge(s.urlAfterRedirects, s.rawUrl), t.routerState = s.targetRouterState, "deferred" === t.urlUpdateStrategy && (s.extras.skipLocationChange || t.setBrowserUrl(t.rawUrlTree, s), t.browserUrlTree = s.urlAfterRedirects)
                            }), ((e, n, t) => U(r => (new mF(n, r.targetRouterState, r.currentRouterState, t).activate(e), r)))(this.rootContexts, t.routeReuseStrategy, s => this.events.next(s)), Xe({
                                next: s => {
                                    o = !0, this.lastSuccessfulNavigation = this.currentNavigation, t.navigated = !0, this.events.next(new Cr(s.id, this.urlSerializer.serialize(s.extractedUrl), this.urlSerializer.serialize(t.currentUrlTree))), t.titleStrategy?.updateTitle(s.targetRouterState.snapshot), s.resolve(!0)
                                },
                                complete: () => {
                                    o = !0
                                }
                            }), Od(() => {
                                o || i || this.cancelNavigationTransition(r, "", 1), this.currentNavigation?.id === r.id && (this.currentNavigation = null)
                            }), zn(s => {
                                if (i = !0, RC(s)) {
                                    xC(s) || (t.navigated = !0, t.restoreHistory(r, !0));
                                    const a = new $a(r.id, this.urlSerializer.serialize(r.extractedUrl), s.message, s.cancellationCode);
                                    if (this.events.next(a), xC(s)) {
                                        const l = t.urlHandlingStrategy.merge(s.url, t.rawUrlTree),
                                            u = {
                                                skipLocationChange: r.extras.skipLocationChange,
                                                replaceUrl: "eager" === t.urlUpdateStrategy || KC(r.source)
                                            };
                                        t.scheduleNavigation(l, ki, null, u, {
                                            resolve: r.resolve,
                                            reject: r.reject,
                                            promise: r.promise
                                        })
                                    } else r.resolve(!1)
                                } else {
                                    t.restoreHistory(r, !0);
                                    const a = new Bd(r.id, this.urlSerializer.serialize(r.extractedUrl), s, r.targetSnapshot ?? void 0);
                                    this.events.next(a);
                                    try {
                                        r.resolve(t.errorHandler(s))
                                    } catch (l) {
                                        r.reject(l)
                                    }
                                }
                                return Kt
                            }))
                        }))
                    }
                    cancelNavigationTransition(t, r, o) {
                        const i = new $a(t.id, this.urlSerializer.serialize(t.extractedUrl), r, o);
                        this.events.next(i), t.resolve(!1)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();

            function KC(e) {
                return e !== ki
            }
            let ZC = (() => {
                class e {
                    buildTitle(t) {
                        let r, o = t.root;
                        for (; void 0 !== o;) r = this.getResolvedTitleForRoute(o) ?? r, o = o.children.find(i => i.outlet === $);
                        return r
                    }
                    getResolvedTitleForRoute(t) {
                        return t.data[xi]
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: function () {
                        return W(uP)
                    },
                    providedIn: "root"
                }), e
            })(),
                uP = (() => {
                    class e extends ZC {
                        constructor(t) {
                            super(), this.title = t
                        }
                        updateTitle(t) {
                            const r = this.buildTitle(t);
                            void 0 !== r && this.title.setTitle(r)
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(S(U_))
                    }, e.\u0275prov = T({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }), e
                })(),
                cP = (() => {
                    class e { }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275prov = T({
                        token: e,
                        factory: function () {
                            return W(fP)
                        },
                        providedIn: "root"
                    }), e
                })();
            class dP {
                shouldDetach(n) {
                    return !1
                }
                store(n, t) { }
                shouldAttach(n) {
                    return !1
                }
                retrieve(n) {
                    return null
                }
                shouldReuseRoute(n, t) {
                    return n.routeConfig === t.routeConfig
                }
            }
            let fP = (() => {
                class e extends dP { }
                return e.\u0275fac = function () {
                    let n;
                    return function (r) {
                        return (n || (n = $e(e)))(r || e)
                    }
                }(), e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const Qa = new M("", {
                providedIn: "root",
                factory: () => ({})
            });
            let pP = (() => {
                class e { }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: function () {
                        return W(gP)
                    },
                    providedIn: "root"
                }), e
            })(),
                gP = (() => {
                    class e {
                        shouldProcessUrl(t) {
                            return !0
                        }
                        extract(t) {
                            return t
                        }
                        merge(t, r) {
                            return t
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275prov = T({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }), e
                })();

            function mP(e) {
                throw e
            }

            function yP(e, n, t) {
                return n.parse("/")
            }
            const vP = {
                paths: "exact",
                fragment: "ignored",
                matrixParams: "ignored",
                queryParams: "exact"
            },
                _P = {
                    paths: "subset",
                    fragment: "ignored",
                    matrixParams: "ignored",
                    queryParams: "subset"
                };
            let wt = (() => {
                class e {
                    get navigationId() {
                        return this.navigationTransitions.navigationId
                    }
                    get browserPageId() {
                        return this.location.getState()?.\u0275routerPageId
                    }
                    get events() {
                        return this.navigationTransitions.events
                    }
                    constructor() {
                        this.disposed = !1, this.currentPageId = 0, this.console = W(qT), this.isNgZoneEnabled = !1, this.options = W(Qa, {
                            optional: !0
                        }) || {}, this.errorHandler = this.options.errorHandler || mP, this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || yP, this.navigated = !1, this.lastSuccessfulId = -1, this.urlHandlingStrategy = W(pP), this.routeReuseStrategy = W(cP), this.urlCreationStrategy = W(rF), this.titleStrategy = W(ZC), this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore", this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly", this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace", this.config = rC(W(Eo, {
                            optional: !0
                        }) ?? []), this.navigationTransitions = W(Ya), this.urlSerializer = W(Oi), this.location = W(od), this.isNgZoneEnabled = W(we) instanceof we && we.isInAngularZone(), this.resetConfig(this.config), this.currentUrlTree = new qn, this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.routerState = bC(this.currentUrlTree, null), this.navigationTransitions.setupNavigations(this).subscribe(t => {
                            this.lastSuccessfulId = t.id, this.currentPageId = t.targetPageId
                        }, t => {
                            this.console.warn(`Unhandled Navigation Error: ${t}`)
                        })
                    }
                    resetRootComponentType(t) {
                        this.routerState.root.component = t, this.navigationTransitions.rootComponentType = t
                    }
                    initialNavigation() {
                        if (this.setUpLocationChangeListener(), !this.navigationTransitions.hasRequestedNavigation) {
                            const t = this.location.getState();
                            this.navigateToSyncWithBrowser(this.location.path(!0), ki, t)
                        }
                    }
                    setUpLocationChangeListener() {
                        this.locationSubscription || (this.locationSubscription = this.location.subscribe(t => {
                            const r = "popstate" === t.type ? "popstate" : "hashchange";
                            "popstate" === r && setTimeout(() => {
                                this.navigateToSyncWithBrowser(t.url, r, t.state)
                            }, 0)
                        }))
                    }
                    navigateToSyncWithBrowser(t, r, o) {
                        const i = {
                            replaceUrl: !0
                        },
                            s = o?.navigationId ? o : null;
                        if (o) {
                            const l = {
                                ...o
                            };
                            delete l.navigationId, delete l.\u0275routerPageId, 0 !== Object.keys(l).length && (i.state = l)
                        }
                        const a = this.parseUrl(t);
                        this.scheduleNavigation(a, r, s, i)
                    }
                    get url() {
                        return this.serializeUrl(this.currentUrlTree)
                    }
                    getCurrentNavigation() {
                        return this.navigationTransitions.currentNavigation
                    }
                    resetConfig(t) {
                        this.config = t.map(Kd), this.navigated = !1, this.lastSuccessfulId = -1
                    }
                    ngOnDestroy() {
                        this.dispose()
                    }
                    dispose() {
                        this.navigationTransitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0
                    }
                    createUrlTree(t, r = {}) {
                        const {
                            relativeTo: o,
                            queryParams: i,
                            fragment: s,
                            queryParamsHandling: a,
                            preserveFragment: l
                        } = r, u = l ? this.currentUrlTree.fragment : s;
                        let c = null;
                        switch (a) {
                            case "merge":
                                c = {
                                    ...this.currentUrlTree.queryParams,
                                    ...i
                                };
                                break;
                            case "preserve":
                                c = this.currentUrlTree.queryParams;
                                break;
                            default:
                                c = i || null
                        }
                        return null !== c && (c = this.removeEmptyProps(c)), this.urlCreationStrategy.createUrlTree(o, this.routerState, this.currentUrlTree, t, c, u ?? null)
                    }
                    navigateByUrl(t, r = {
                        skipLocationChange: !1
                    }) {
                        const o = _r(t) ? t : this.parseUrl(t),
                            i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                        return this.scheduleNavigation(i, ki, null, r)
                    }
                    navigate(t, r = {
                        skipLocationChange: !1
                    }) {
                        return function CP(e) {
                            for (let n = 0; n < e.length; n++) {
                                const t = e[n];
                                if (null == t) throw new D(4008, false)
                            }
                        }(t), this.navigateByUrl(this.createUrlTree(t, r), r)
                    }
                    serializeUrl(t) {
                        return this.urlSerializer.serialize(t)
                    }
                    parseUrl(t) {
                        let r;
                        try {
                            r = this.urlSerializer.parse(t)
                        } catch (o) {
                            r = this.malformedUriErrorHandler(o, this.urlSerializer, t)
                        }
                        return r
                    }
                    isActive(t, r) {
                        let o;
                        if (o = !0 === r ? {
                            ...vP
                        } : !1 === r ? {
                            ..._P
                        } : r, _r(t)) return sC(this.currentUrlTree, t, o);
                        const i = this.parseUrl(t);
                        return sC(this.currentUrlTree, i, o)
                    }
                    removeEmptyProps(t) {
                        return Object.keys(t).reduce((r, o) => {
                            const i = t[o];
                            return null != i && (r[o] = i), r
                        }, {})
                    }
                    scheduleNavigation(t, r, o, i, s) {
                        if (this.disposed) return Promise.resolve(!1);
                        let a, l, u, c;
                        return s ? (a = s.resolve, l = s.reject, u = s.promise) : u = new Promise((d, f) => {
                            a = d, l = f
                        }), c = "computed" === this.canceledNavigationResolution ? o && o.\u0275routerPageId ? o.\u0275routerPageId : i.replaceUrl || i.skipLocationChange ? this.browserPageId ?? 0 : (this.browserPageId ?? 0) + 1 : 0, this.navigationTransitions.handleNavigationRequest({
                            targetPageId: c,
                            source: r,
                            restoredState: o,
                            currentUrlTree: this.currentUrlTree,
                            currentRawUrl: this.currentUrlTree,
                            rawUrl: t,
                            extras: i,
                            resolve: a,
                            reject: l,
                            promise: u,
                            currentSnapshot: this.routerState.snapshot,
                            currentRouterState: this.routerState
                        }), u.catch(d => Promise.reject(d))
                    }
                    setBrowserUrl(t, r) {
                        const o = this.urlSerializer.serialize(t),
                            i = {
                                ...r.extras.state,
                                ...this.generateNgRouterState(r.id, r.targetPageId)
                            };
                        this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl ? this.location.replaceState(o, "", i) : this.location.go(o, "", i)
                    }
                    restoreHistory(t, r = !1) {
                        if ("computed" === this.canceledNavigationResolution) {
                            const o = this.currentPageId - t.targetPageId;
                            "popstate" !== t.source && "eager" !== this.urlUpdateStrategy && this.currentUrlTree !== this.getCurrentNavigation()?.finalUrl || 0 === o ? this.currentUrlTree === this.getCurrentNavigation()?.finalUrl && 0 === o && (this.resetState(t), this.browserUrlTree = t.currentUrlTree, this.resetUrlToCurrentUrlTree()) : this.location.historyGo(o)
                        } else "replace" === this.canceledNavigationResolution && (r && this.resetState(t), this.resetUrlToCurrentUrlTree())
                    }
                    resetState(t) {
                        this.routerState = t.currentRouterState, this.currentUrlTree = t.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl)
                    }
                    resetUrlToCurrentUrlTree() {
                        this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                    }
                    generateNgRouterState(t, r) {
                        return "computed" === this.canceledNavigationResolution ? {
                            navigationId: t,
                            \u0275routerPageId: r
                        } : {
                            navigationId: t
                        }
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })(),
                el = (() => {
                    class e {
                        constructor(t, r, o, i, s, a) {
                            this.router = t, this.route = r, this.tabIndexAttribute = o, this.renderer = i, this.el = s, this.locationStrategy = a, this._preserveFragment = !1, this._skipLocationChange = !1, this._replaceUrl = !1, this.href = null, this.commands = null, this.onChanges = new fn;
                            const l = s.nativeElement.tagName?.toLowerCase();
                            this.isAnchorElement = "a" === l || "area" === l, this.isAnchorElement ? this.subscription = t.events.subscribe(u => {
                                u instanceof Cr && this.updateHref()
                            }) : this.setTabIndexIfNotOnNativeEl("0")
                        }
                        set preserveFragment(t) {
                            this._preserveFragment = po(t)
                        }
                        get preserveFragment() {
                            return this._preserveFragment
                        }
                        set skipLocationChange(t) {
                            this._skipLocationChange = po(t)
                        }
                        get skipLocationChange() {
                            return this._skipLocationChange
                        }
                        set replaceUrl(t) {
                            this._replaceUrl = po(t)
                        }
                        get replaceUrl() {
                            return this._replaceUrl
                        }
                        setTabIndexIfNotOnNativeEl(t) {
                            null != this.tabIndexAttribute || this.isAnchorElement || this.applyAttributeValue("tabindex", t)
                        }
                        ngOnChanges(t) {
                            this.isAnchorElement && this.updateHref(), this.onChanges.next(this)
                        }
                        set routerLink(t) {
                            null != t ? (this.commands = Array.isArray(t) ? t : [t], this.setTabIndexIfNotOnNativeEl("0")) : (this.commands = null, this.setTabIndexIfNotOnNativeEl(null))
                        }
                        onClick(t, r, o, i, s) {
                            return !!(null === this.urlTree || this.isAnchorElement && (0 !== t || r || o || i || s || "string" == typeof this.target && "_self" != this.target)) || (this.router.navigateByUrl(this.urlTree, {
                                skipLocationChange: this.skipLocationChange,
                                replaceUrl: this.replaceUrl,
                                state: this.state
                            }), !this.isAnchorElement)
                        }
                        ngOnDestroy() {
                            this.subscription?.unsubscribe()
                        }
                        updateHref() {
                            this.href = null !== this.urlTree && this.locationStrategy ? this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(this.urlTree)) : null;
                            const t = null === this.href ? null : function og(e, n, t) {
                                return function Y0(e, n) {
                                    return "src" === n && ("embed" === e || "frame" === e || "iframe" === e || "media" === e || "script" === e) || "href" === n && ("base" === e || "link" === e) ? rg : ng
                                }(n, t)(e)
                            }(this.href, this.el.nativeElement.tagName.toLowerCase(), "href");
                            this.applyAttributeValue("href", t)
                        }
                        applyAttributeValue(t, r) {
                            const o = this.renderer,
                                i = this.el.nativeElement;
                            null !== r ? o.setAttribute(i, t, r) : o.removeAttribute(i, t)
                        }
                        get urlTree() {
                            return null === this.commands ? null : this.router.createUrlTree(this.commands, {
                                relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                                queryParams: this.queryParams,
                                fragment: this.fragment,
                                queryParamsHandling: this.queryParamsHandling,
                                preserveFragment: this.preserveFragment
                            })
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(C(wt), C(Co), function bs(e) {
                            return function wb(e, n) {
                                if ("class" === n) return e.classes;
                                if ("style" === n) return e.styles;
                                const t = e.attrs;
                                if (t) {
                                    const r = t.length;
                                    let o = 0;
                                    for (; o < r;) {
                                        const i = t[o];
                                        if (qh(i)) break;
                                        if (0 === i) o += 2;
                                        else if ("number" == typeof i)
                                            for (o++; o < r && "string" == typeof t[o];) o++;
                                        else {
                                            if (i === n) return t[o + 1];
                                            o += 2
                                        }
                                    }
                                }
                                return null
                            }(Be(), e)
                        }("tabindex"), C(wn), C(_t), C(mr))
                    }, e.\u0275dir = L({
                        type: e,
                        selectors: [
                            ["", "routerLink", ""]
                        ],
                        hostVars: 1,
                        hostBindings: function (t, r) {
                            1 & t && re("click", function (i) {
                                return r.onClick(i.button, i.ctrlKey, i.shiftKey, i.altKey, i.metaKey)
                            }), 2 & t && Ht("target", r.target)
                        },
                        inputs: {
                            target: "target",
                            queryParams: "queryParams",
                            fragment: "fragment",
                            queryParamsHandling: "queryParamsHandling",
                            state: "state",
                            relativeTo: "relativeTo",
                            preserveFragment: "preserveFragment",
                            skipLocationChange: "skipLocationChange",
                            replaceUrl: "replaceUrl",
                            routerLink: "routerLink"
                        },
                        standalone: !0,
                        features: [gt]
                    }), e
                })(),
                YC = (() => {
                    class e {
                        get isActive() {
                            return this._isActive
                        }
                        constructor(t, r, o, i, s) {
                            this.router = t, this.element = r, this.renderer = o, this.cdr = i, this.link = s, this.classes = [], this._isActive = !1, this.routerLinkActiveOptions = {
                                exact: !1
                            }, this.isActiveChange = new ue, this.routerEventsSubscription = t.events.subscribe(a => {
                                a instanceof Cr && this.update()
                            })
                        }
                        ngAfterContentInit() {
                            R(this.links.changes, R(null)).pipe(Sr()).subscribe(t => {
                                this.update(), this.subscribeToEachLinkOnChanges()
                            })
                        }
                        subscribeToEachLinkOnChanges() {
                            this.linkInputChangesSubscription?.unsubscribe();
                            const t = [...this.links.toArray(), this.link].filter(r => !!r).map(r => r.onChanges);
                            this.linkInputChangesSubscription = Ae(t).pipe(Sr()).subscribe(r => {
                                this._isActive !== this.isLinkActive(this.router)(r) && this.update()
                            })
                        }
                        set routerLinkActive(t) {
                            const r = Array.isArray(t) ? t : t.split(" ");
                            this.classes = r.filter(o => !!o)
                        }
                        ngOnChanges(t) {
                            this.update()
                        }
                        ngOnDestroy() {
                            this.routerEventsSubscription.unsubscribe(), this.linkInputChangesSubscription?.unsubscribe()
                        }
                        update() {
                            !this.links || !this.router.navigated || Promise.resolve().then(() => {
                                const t = this.hasActiveLinks();
                                this._isActive !== t && (this._isActive = t, this.cdr.markForCheck(), this.classes.forEach(r => {
                                    t ? this.renderer.addClass(this.element.nativeElement, r) : this.renderer.removeClass(this.element.nativeElement, r)
                                }), t && void 0 !== this.ariaCurrentWhenActive ? this.renderer.setAttribute(this.element.nativeElement, "aria-current", this.ariaCurrentWhenActive.toString()) : this.renderer.removeAttribute(this.element.nativeElement, "aria-current"), this.isActiveChange.emit(t))
                            })
                        }
                        isLinkActive(t) {
                            const r = function DP(e) {
                                return !!e.paths
                            }(this.routerLinkActiveOptions) ? this.routerLinkActiveOptions : this.routerLinkActiveOptions.exact || !1;
                            return o => !!o.urlTree && t.isActive(o.urlTree, r)
                        }
                        hasActiveLinks() {
                            const t = this.isLinkActive(this.router);
                            return this.link && t(this.link) || this.links.some(t)
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(C(wt), C(_t), C(wn), C(da), C(el, 8))
                    }, e.\u0275dir = L({
                        type: e,
                        selectors: [
                            ["", "routerLinkActive", ""]
                        ],
                        contentQueries: function (t, r, o) {
                            if (1 & t && function Yy(e, n, t, r) {
                                const o = Z();
                                if (o.firstCreatePass) {
                                    const i = Be();
                                    ev(o, new Ky(n, t, r), i.index),
                                        function IT(e, n) {
                                            const t = e.contentQueries || (e.contentQueries = []);
                                            n !== (t.length ? t[t.length - 1] : -1) && t.push(e.queries.length - 1, n)
                                        }(o, e), 2 == (2 & t) && (o.staticContentQueries = !0)
                                }
                                Qy(o, _(), t)
                            }(o, el, 5), 2 & t) {
                                let i;
                                hr(i = pr()) && (r.links = i)
                            }
                        },
                        inputs: {
                            routerLinkActiveOptions: "routerLinkActiveOptions",
                            ariaCurrentWhenActive: "ariaCurrentWhenActive",
                            routerLinkActive: "routerLinkActive"
                        },
                        outputs: {
                            isActiveChange: "isActiveChange"
                        },
                        exportAs: ["routerLinkActive"],
                        standalone: !0,
                        features: [gt]
                    }), e
                })();
            class QC { }
            let wP = (() => {
                class e {
                    constructor(t, r, o, i, s) {
                        this.router = t, this.injector = o, this.preloadingStrategy = i, this.loader = s
                    }
                    setUpPreloading() {
                        this.subscription = this.router.events.pipe(Rn(t => t instanceof Cr), Gn(() => this.preload())).subscribe(() => { })
                    }
                    preload() {
                        return this.processRoutes(this.injector, this.router.config)
                    }
                    ngOnDestroy() {
                        this.subscription && this.subscription.unsubscribe()
                    }
                    processRoutes(t, r) {
                        const o = [];
                        for (const i of r) {
                            i.providers && !i._injector && (i._injector = ea(i.providers, t, `Route: ${i.path}`));
                            const s = i._injector ?? t,
                                a = i._loadedInjector ?? s;
                            i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad || i.loadComponent && !i._loadedComponent ? o.push(this.preloadConfig(s, i)) : (i.children || i._loadedRoutes) && o.push(this.processRoutes(a, i.children ?? i._loadedRoutes))
                        }
                        return Ae(o).pipe(Sr())
                    }
                    preloadConfig(t, r) {
                        return this.preloadingStrategy.preload(r, () => {
                            let o;
                            o = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(t, r) : R(null);
                            const i = o.pipe(Le(s => null === s ? R(void 0) : (r._loadedRoutes = s.routes, r._loadedInjector = s.injector, this.processRoutes(s.injector ?? t, s.routes))));
                            return r.loadComponent && !r._loadedComponent ? Ae([i, this.loader.loadComponent(r)]).pipe(Sr()) : i
                        })
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(wt), S(wv), S(nn), S(QC), S(tf))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac,
                    providedIn: "root"
                }), e
            })();
            const rf = new M("");
            let eD = (() => {
                class e {
                    constructor(t, r, o, i, s = {}) {
                        this.urlSerializer = t, this.transitions = r, this.viewportScroller = o, this.zone = i, this.options = s, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, s.scrollPositionRestoration = s.scrollPositionRestoration || "disabled", s.anchorScrolling = s.anchorScrolling || "disabled"
                    }
                    init() {
                        "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
                    }
                    createScrollEvents() {
                        return this.transitions.events.subscribe(t => {
                            t instanceof jd ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = t.navigationTrigger, this.restoredId = t.restoredState ? t.restoredState.navigationId : 0) : t instanceof Cr && (this.lastId = t.id, this.scheduleScrollEvent(t, this.urlSerializer.parse(t.urlAfterRedirects).fragment))
                        })
                    }
                    consumeScrollEvents() {
                        return this.transitions.events.subscribe(t => {
                            t instanceof DC && (t.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(t.position) : t.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(t.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                        })
                    }
                    scheduleScrollEvent(t, r) {
                        this.zone.runOutsideAngular(() => {
                            setTimeout(() => {
                                this.zone.run(() => {
                                    this.transitions.events.next(new DC(t, "popstate" === this.lastSource ? this.store[this.restoredId] : null, r))
                                })
                            }, 0)
                        })
                    }
                    ngOnDestroy() {
                        this.routerEventsSubscription?.unsubscribe(), this.scrollEventsSubscription?.unsubscribe()
                    }
                }
                return e.\u0275fac = function (t) {
                    ! function Pg() {
                        throw new Error("invalid")
                    }()
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            var Et = (() => ((Et = Et || {})[Et.COMPLETE = 0] = "COMPLETE", Et[Et.FAILED = 1] = "FAILED", Et[Et.REDIRECTING = 2] = "REDIRECTING", Et))();
            const bo = !1;

            function Jn(e, n) {
                return {
                    \u0275kind: e,
                    \u0275providers: n
                }
            }
            const sf = new M("", {
                providedIn: "root",
                factory: () => !1
            });

            function nD() {
                const e = W(Ut);
                return n => {
                    const t = e.get(ua);
                    if (n !== t.components[0]) return;
                    const r = e.get(wt),
                        o = e.get(rD);
                    1 === e.get(af) && r.initialNavigation(), e.get(oD, null, P.Optional)?.setUpPreloading(), e.get(rf, null, P.Optional)?.init(), r.resetRootComponentType(t.componentTypes[0]), o.closed || (o.next(), o.unsubscribe())
                }
            }
            const rD = new M(bo ? "bootstrap done indicator" : "", {
                factory: () => new fn
            }),
                af = new M(bo ? "initial navigation" : "", {
                    providedIn: "root",
                    factory: () => 1
                });

            function IP() {
                let e = [];
                return e = bo ? [{
                    provide: Ps,
                    multi: !0,
                    useFactory: () => {
                        const n = W(wt);
                        return () => n.events.subscribe(t => {
                            console.group?.(`Router Event: ${t.constructor.name}`), console.log(function QN(e) {
                                if (!("type" in e)) return `Unknown Router Event: ${e.constructor.name}`;
                                switch (e.type) {
                                    case 14:
                                        return `ActivationEnd(path: '${e.snapshot.routeConfig?.path || ""}')`;
                                    case 13:
                                        return `ActivationStart(path: '${e.snapshot.routeConfig?.path || ""}')`;
                                    case 12:
                                        return `ChildActivationEnd(path: '${e.snapshot.routeConfig?.path || ""}')`;
                                    case 11:
                                        return `ChildActivationStart(path: '${e.snapshot.routeConfig?.path || ""}')`;
                                    case 8:
                                        return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                    case 7:
                                        return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                    case 2:
                                        return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                    case 16:
                                        return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                    case 1:
                                        return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                    case 3:
                                        return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                    case 0:
                                        return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                    case 6:
                                        return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                    case 5:
                                        return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                    case 10:
                                        return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                    case 9:
                                        return `RouteConfigLoadStart(path: ${e.route.path})`;
                                    case 4:
                                        return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                    case 15:
                                        return `Scroll(anchor: '${e.anchor}', position: '${e.position ? `${e.position[0]}, ${e.position[1]}` : null}')`
                                }
                            }(t)), console.log(t), console.groupEnd?.()
                        })
                    }
                }] : [], Jn(1, e)
            }
            const oD = new M(bo ? "router preloader" : "");

            function AP(e) {
                return Jn(0, [{
                    provide: oD,
                    useExisting: wP
                }, {
                    provide: QC,
                    useExisting: e
                }])
            }
            const Gi = !1,
                iD = new M(Gi ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"),
                TP = [od, {
                    provide: Oi,
                    useClass: Nd
                }, wt, Vi, {
                        provide: Co,
                        useFactory: function tD(e) {
                            return e.routerState.root
                        },
                        deps: [wt]
                    }, tf, Gi ? {
                        provide: sf,
                        useValue: !0
                    } : []];

            function xP() {
                return new xv("Router", wt)
            }
            let sD = (() => {
                class e {
                    constructor(t) { }
                    static forRoot(t, r) {
                        return {
                            ngModule: e,
                            providers: [TP, Gi && r?.enableTracing ? IP().\u0275providers : [], {
                                provide: Eo,
                                multi: !0,
                                useValue: t
                            }, {
                                    provide: iD,
                                    useFactory: FP,
                                    deps: [
                                        [wt, new Jo, new Xo]
                                    ]
                                }, {
                                    provide: Qa,
                                    useValue: r || {}
                                }, r?.useHash ? {
                                    provide: mr,
                                    useClass: Fx
                                } : {
                                    provide: mr,
                                    useClass: Qv
                                }, {
                                    provide: rf,
                                    useFactory: () => {
                                        const e = W(QR),
                                            n = W(we),
                                            t = W(Qa),
                                            r = W(Ya),
                                            o = W(Oi);
                                        return t.scrollOffset && e.setOffset(t.scrollOffset), new eD(o, r, e, n, t)
                                    }
                                }, r?.preloadingStrategy ? AP(r.preloadingStrategy).\u0275providers : [], {
                                    provide: xv,
                                    multi: !0,
                                    useFactory: xP
                                }, r?.initialNavigation ? PP(r) : [],
                                [{
                                    provide: aD,
                                    useFactory: nD
                                }, {
                                    provide: Tv,
                                    multi: !0,
                                    useExisting: aD
                                }]
                            ]
                        }
                    }
                    static forChild(t) {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: Eo,
                                multi: !0,
                                useValue: t
                            }]
                        }
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(iD, 8))
                }, e.\u0275mod = Lt({
                    type: e
                }), e.\u0275inj = Mt({
                    imports: [Jd]
                }), e
            })();

            function FP(e) {
                if (Gi && e) throw new D(4007, "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead.");
                return "guarded"
            }

            function PP(e) {
                return ["disabled" === e.initialNavigation ? Jn(3, [{
                    provide: sa,
                    multi: !0,
                    useFactory: () => {
                        const n = W(wt);
                        return () => {
                            n.setUpLocationChangeListener()
                        }
                    }
                }, {
                    provide: af,
                    useValue: 2
                }]).\u0275providers : [], "enabledBlocking" === e.initialNavigation ? Jn(2, [{
                    provide: af,
                    useValue: 0
                }, {
                    provide: sa,
                    multi: !0,
                    deps: [Ut],
                    useFactory: n => {
                        const t = n.get(Ox, Promise.resolve());
                        return () => t.then(() => new Promise(r => {
                            const o = n.get(wt),
                                i = n.get(rD);
                            (function EP(e, n) {
                                e.events.pipe(Rn(t => t instanceof Cr || t instanceof $a || t instanceof Bd || t instanceof Ua), U(t => t instanceof Cr || t instanceof Ua ? Et.COMPLETE : t instanceof $a && (0 === t.code || 1 === t.code) ? Et.REDIRECTING : Et.FAILED), Rn(t => t !== Et.REDIRECTING), yr(1)).subscribe(() => {
                                    n()
                                })
                            })(o, () => {
                                r(!0)
                            }), n.get(Ya).afterPreactivation = () => (r(!0), i.closed ? R(void 0) : i), o.initialNavigation()
                        }))
                    }
                }]).\u0275providers : []]
            }
            const aD = new M(Gi ? "Router Initializer" : "");
            let LP = (() => {
                class e { }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275cmp = kt({
                    type: e,
                    selectors: [
                        ["app-analiza"]
                    ],
                    decls: 2,
                    vars: 0,
                    template: function (t, r) {
                        1 & t && (A(0, "p"), K(1, "analiza works!"), I())
                    }
                }), e
            })();

            function lD(e, n, t, r, o, i, s) {
                try {
                    var a = e[i](s),
                        l = a.value
                } catch (u) {
                    return void t(u)
                }
                a.done ? n(l) : Promise.resolve(l).then(r, o)
            }

            function So(e) {
                return function () {
                    var n = this,
                        t = arguments;
                    return new Promise(function (r, o) {
                        var i = e.apply(n, t);

                        function s(l) {
                            lD(i, r, o, s, a, "next", l)
                        }

                        function a(l) {
                            lD(i, r, o, s, a, "throw", l)
                        }
                        s(void 0)
                    })
                }
            }
            var Io = (() => {
                return (e = Io || (Io = {})).NOT_EXIST = "NU_EXISTA", e.TABLE_ERROR = "EROARE_TABLA", e.FINAL = "FINAL", Io;
                var e
            })(),
                He = (() => {
                    return (e = He || (He = {}))[e.NOT_EXIST = 0] = "NOT_EXIST", e[e.TABLE_ERROR = 1] = "TABLE_ERROR", e[e.FINAL = 2] = "FINAL", e[e.MOVE = 3] = "MOVE", He;
                    var e
                })(),
                Dr = (() => {
                    return (e = Dr || (Dr = {}))[e.CELL_CLICK = 0] = "CELL_CLICK", e[e.FINAL_MOVE = 1] = "FINAL_MOVE", Dr;
                    var e
                })();
            const uD = [{
                text: "2 x 3",
                value: {
                    rows: 2,
                    cols: 3
                }
            }, {
                text: "3 x 2",
                value: {
                    rows: 3,
                    cols: 2
                }
            }, {
                text: "3 x 3",
                value: {
                    rows: 3,
                    cols: 3
                }
            }, {
                text: "4 x 4",
                value: {
                    rows: 4,
                    cols: 4
                }
            }, {
                text: "4 x 5",
                value: {
                    rows: 4,
                    cols: 5
                }
            }, {
                text: "5 x 5",
                value: {
                    rows: 5,
                    cols: 5
                }
            }],
                cD = [{
                    text: "Jucator",
                    value: "x"
                }, {
                    text: "Api",
                    value: "o"
                }];
            class VP extends dt {
                constructor(n, t) {
                    super()
                }
                schedule(n, t = 0) {
                    return this
                }
            }
            const nl = {
                setInterval(e, n, ...t) {
                    const {
                        delegate: r
                    } = nl;
                    return r?.setInterval ? r.setInterval(e, n, ...t) : setInterval(e, n, ...t)
                },
                clearInterval(e) {
                    const {
                        delegate: n
                    } = nl;
                    return (n?.clearInterval || clearInterval)(e)
                },
                delegate: void 0
            },
                dD = {
                    now: () => (dD.delegate || Date).now(),
                    delegate: void 0
                };
            class zi {
                constructor(n, t = zi.now) {
                    this.schedulerActionCtor = n, this.now = t
                }
                schedule(n, t = 0, r) {
                    return new this.schedulerActionCtor(this, n).schedule(r, t)
                }
            }
            zi.now = dD.now;
            const lf = new class BP extends zi {
                constructor(n, t = zi.now) {
                    super(n, t), this.actions = [], this._active = !1
                }
                flush(n) {
                    const {
                        actions: t
                    } = this;
                    if (this._active) return void t.push(n);
                    let r;
                    this._active = !0;
                    do {
                        if (r = n.execute(n.state, n.delay)) break
                    } while (n = t.shift());
                    if (this._active = !1, r) {
                        for (; n = t.shift();) n.unsubscribe();
                        throw r
                    }
                }
            }(class jP extends VP {
                constructor(n, t) {
                    super(n, t), this.scheduler = n, this.work = t, this.pending = !1
                }
                schedule(n, t = 0) {
                    var r;
                    if (this.closed) return this;
                    this.state = n;
                    const o = this.id,
                        i = this.scheduler;
                    return null != o && (this.id = this.recycleAsyncId(i, o, t)), this.pending = !0, this.delay = t, this.id = null !== (r = this.id) && void 0 !== r ? r : this.requestAsyncId(i, this.id, t), this
                }
                requestAsyncId(n, t, r = 0) {
                    return nl.setInterval(n.flush.bind(n, this), r)
                }
                recycleAsyncId(n, t, r = 0) {
                    if (null != r && this.delay === r && !1 === this.pending) return t;
                    null != t && nl.clearInterval(t)
                }
                execute(n, t) {
                    if (this.closed) return new Error("executing a cancelled action");
                    this.pending = !1;
                    const r = this._execute(n, t);
                    if (r) return r;
                    !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
                }
                _execute(n, t) {
                    let o, r = !1;
                    try {
                        this.work(n)
                    } catch (i) {
                        r = !0, o = i || new Error("Scheduled action threw falsy error")
                    }
                    if (r) return this.unsubscribe(), o
                }
                unsubscribe() {
                    if (!this.closed) {
                        const {
                            id: n,
                            scheduler: t
                        } = this, {
                            actions: r
                        } = t;
                        this.work = this.state = this.scheduler = null, this.pending = !1, br(r, this), null != n && (this.id = this.recycleAsyncId(t, n, null)), this.delay = null, super.unsubscribe()
                    }
                }
            }),
                $P = lf;

            function uf(e = 0, n, t = $P) {
                let r = -1;
                return null != n && (sh(n) ? t = n : r = n), new ye(o => {
                    let i = function UP(e) {
                        return e instanceof Date && !isNaN(e)
                    }(e) ? +e - t.now() : e;
                    i < 0 && (i = 0);
                    let s = 0;
                    return t.schedule(function () {
                        o.closed || (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete())
                    }, i)
                })
            }

            function fD(e, n) {
                return n ? t => Oa(n.pipe(yr(1), function zP() {
                    return Ie((e, n) => {
                        e.subscribe(ve(n, Cl))
                    })
                }()), t.pipe(fD(e))) : Le((t, r) => it(e(t, r)).pipe(yr(1), tC(t)))
            }

            function cf(e, n = lf) {
                const t = uf(e, n);
                return fD(() => t)
            }
            class rl { }
            class df { }
            class Nn {
                constructor(n) {
                    this.normalizedNames = new Map, this.lazyUpdate = null, n ? this.lazyInit = "string" == typeof n ? () => {
                        this.headers = new Map, n.split("\n").forEach(t => {
                            const r = t.indexOf(":");
                            if (r > 0) {
                                const o = t.slice(0, r),
                                    i = o.toLowerCase(),
                                    s = t.slice(r + 1).trim();
                                this.maybeSetNormalizedName(o, i), this.headers.has(i) ? this.headers.get(i).push(s) : this.headers.set(i, [s])
                            }
                        })
                    } : () => {
                        this.headers = new Map, Object.keys(n).forEach(t => {
                            let r = n[t];
                            const o = t.toLowerCase();
                            "string" == typeof r && (r = [r]), r.length > 0 && (this.headers.set(o, r), this.maybeSetNormalizedName(t, o))
                        })
                    } : this.headers = new Map
                }
                has(n) {
                    return this.init(), this.headers.has(n.toLowerCase())
                }
                get(n) {
                    this.init();
                    const t = this.headers.get(n.toLowerCase());
                    return t && t.length > 0 ? t[0] : null
                }
                keys() {
                    return this.init(), Array.from(this.normalizedNames.values())
                }
                getAll(n) {
                    return this.init(), this.headers.get(n.toLowerCase()) || null
                }
                append(n, t) {
                    return this.clone({
                        name: n,
                        value: t,
                        op: "a"
                    })
                }
                set(n, t) {
                    return this.clone({
                        name: n,
                        value: t,
                        op: "s"
                    })
                }
                delete(n, t) {
                    return this.clone({
                        name: n,
                        value: t,
                        op: "d"
                    })
                }
                maybeSetNormalizedName(n, t) {
                    this.normalizedNames.has(t) || this.normalizedNames.set(t, n)
                }
                init() {
                    this.lazyInit && (this.lazyInit instanceof Nn ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(n => this.applyUpdate(n)), this.lazyUpdate = null))
                }
                copyFrom(n) {
                    n.init(), Array.from(n.headers.keys()).forEach(t => {
                        this.headers.set(t, n.headers.get(t)), this.normalizedNames.set(t, n.normalizedNames.get(t))
                    })
                }
                clone(n) {
                    const t = new Nn;
                    return t.lazyInit = this.lazyInit && this.lazyInit instanceof Nn ? this.lazyInit : this, t.lazyUpdate = (this.lazyUpdate || []).concat([n]), t
                }
                applyUpdate(n) {
                    const t = n.name.toLowerCase();
                    switch (n.op) {
                        case "a":
                        case "s":
                            let r = n.value;
                            if ("string" == typeof r && (r = [r]), 0 === r.length) return;
                            this.maybeSetNormalizedName(n.name, t);
                            const o = ("a" === n.op ? this.headers.get(t) : void 0) || [];
                            o.push(...r), this.headers.set(t, o);
                            break;
                        case "d":
                            const i = n.value;
                            if (i) {
                                let s = this.headers.get(t);
                                if (!s) return;
                                s = s.filter(a => -1 === i.indexOf(a)), 0 === s.length ? (this.headers.delete(t), this.normalizedNames.delete(t)) : this.headers.set(t, s)
                            } else this.headers.delete(t), this.normalizedNames.delete(t)
                    }
                }
                forEach(n) {
                    this.init(), Array.from(this.normalizedNames.keys()).forEach(t => n(this.normalizedNames.get(t), this.headers.get(t)))
                }
            }
            class WP {
                encodeKey(n) {
                    return hD(n)
                }
                encodeValue(n) {
                    return hD(n)
                }
                decodeKey(n) {
                    return decodeURIComponent(n)
                }
                decodeValue(n) {
                    return decodeURIComponent(n)
                }
            }
            const JP = /%(\d[a-f0-9])/gi,
                XP = {
                    40: "@",
                    "3A": ":",
                    24: "$",
                    "2C": ",",
                    "3B": ";",
                    "3D": "=",
                    "3F": "?",
                    "2F": "/"
                };

            function hD(e) {
                return encodeURIComponent(e).replace(JP, (n, t) => XP[t] ?? n)
            }

            function ol(e) {
                return `${e}`
            }
            class Xn {
                constructor(n = {}) {
                    if (this.updates = null, this.cloneFrom = null, this.encoder = n.encoder || new WP, n.fromString) {
                        if (n.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                        this.map = function qP(e, n) {
                            const t = new Map;
                            return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(o => {
                                const i = o.indexOf("="),
                                    [s, a] = -1 == i ? [n.decodeKey(o), ""] : [n.decodeKey(o.slice(0, i)), n.decodeValue(o.slice(i + 1))],
                                    l = t.get(s) || [];
                                l.push(a), t.set(s, l)
                            }), t
                        }(n.fromString, this.encoder)
                    } else n.fromObject ? (this.map = new Map, Object.keys(n.fromObject).forEach(t => {
                        const r = n.fromObject[t],
                            o = Array.isArray(r) ? r.map(ol) : [ol(r)];
                        this.map.set(t, o)
                    })) : this.map = null
                }
                has(n) {
                    return this.init(), this.map.has(n)
                }
                get(n) {
                    this.init();
                    const t = this.map.get(n);
                    return t ? t[0] : null
                }
                getAll(n) {
                    return this.init(), this.map.get(n) || null
                }
                keys() {
                    return this.init(), Array.from(this.map.keys())
                }
                append(n, t) {
                    return this.clone({
                        param: n,
                        value: t,
                        op: "a"
                    })
                }
                appendAll(n) {
                    const t = [];
                    return Object.keys(n).forEach(r => {
                        const o = n[r];
                        Array.isArray(o) ? o.forEach(i => {
                            t.push({
                                param: r,
                                value: i,
                                op: "a"
                            })
                        }) : t.push({
                            param: r,
                            value: o,
                            op: "a"
                        })
                    }), this.clone(t)
                }
                set(n, t) {
                    return this.clone({
                        param: n,
                        value: t,
                        op: "s"
                    })
                }
                delete(n, t) {
                    return this.clone({
                        param: n,
                        value: t,
                        op: "d"
                    })
                }
                toString() {
                    return this.init(), this.keys().map(n => {
                        const t = this.encoder.encodeKey(n);
                        return this.map.get(n).map(r => t + "=" + this.encoder.encodeValue(r)).join("&")
                    }).filter(n => "" !== n).join("&")
                }
                clone(n) {
                    const t = new Xn({
                        encoder: this.encoder
                    });
                    return t.cloneFrom = this.cloneFrom || this, t.updates = (this.updates || []).concat(n), t
                }
                init() {
                    null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(n => this.map.set(n, this.cloneFrom.map.get(n))), this.updates.forEach(n => {
                        switch (n.op) {
                            case "a":
                            case "s":
                                const t = ("a" === n.op ? this.map.get(n.param) : void 0) || [];
                                t.push(ol(n.value)), this.map.set(n.param, t);
                                break;
                            case "d":
                                if (void 0 === n.value) {
                                    this.map.delete(n.param);
                                    break
                                } {
                                    let r = this.map.get(n.param) || [];
                                    const o = r.indexOf(ol(n.value)); - 1 !== o && r.splice(o, 1), r.length > 0 ? this.map.set(n.param, r) : this.map.delete(n.param)
                                }
                        }
                    }), this.cloneFrom = this.updates = null)
                }
            }
            class KP {
                constructor() {
                    this.map = new Map
                }
                set(n, t) {
                    return this.map.set(n, t), this
                }
                get(n) {
                    return this.map.has(n) || this.map.set(n, n.defaultValue()), this.map.get(n)
                }
                delete(n) {
                    return this.map.delete(n), this
                }
                has(n) {
                    return this.map.has(n)
                }
                keys() {
                    return this.map.keys()
                }
            }

            function pD(e) {
                return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer
            }

            function gD(e) {
                return typeof Blob < "u" && e instanceof Blob
            }

            function mD(e) {
                return typeof FormData < "u" && e instanceof FormData
            }
            class Wi {
                constructor(n, t, r, o) {
                    let i;
                    if (this.url = t, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = n.toUpperCase(), function ZP(e) {
                        switch (e) {
                            case "DELETE":
                            case "GET":
                            case "HEAD":
                            case "OPTIONS":
                            case "JSONP":
                                return !1;
                            default:
                                return !0
                        }
                    }(this.method) || o ? (this.body = void 0 !== r ? r : null, i = o) : i = r, i && (this.reportProgress = !!i.reportProgress, this.withCredentials = !!i.withCredentials, i.responseType && (this.responseType = i.responseType), i.headers && (this.headers = i.headers), i.context && (this.context = i.context), i.params && (this.params = i.params)), this.headers || (this.headers = new Nn), this.context || (this.context = new KP), this.params) {
                        const s = this.params.toString();
                        if (0 === s.length) this.urlWithParams = t;
                        else {
                            const a = t.indexOf("?");
                            this.urlWithParams = t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + s
                        }
                    } else this.params = new Xn, this.urlWithParams = t
                }
                serializeBody() {
                    return null === this.body ? null : pD(this.body) || gD(this.body) || mD(this.body) || function YP(e) {
                        return typeof URLSearchParams < "u" && e instanceof URLSearchParams
                    }(this.body) || "string" == typeof this.body ? this.body : this.body instanceof Xn ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
                }
                detectContentTypeHeader() {
                    return null === this.body || mD(this.body) ? null : gD(this.body) ? this.body.type || null : pD(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof Xn ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null
                }
                clone(n = {}) {
                    const t = n.method || this.method,
                        r = n.url || this.url,
                        o = n.responseType || this.responseType,
                        i = void 0 !== n.body ? n.body : this.body,
                        s = void 0 !== n.withCredentials ? n.withCredentials : this.withCredentials,
                        a = void 0 !== n.reportProgress ? n.reportProgress : this.reportProgress;
                    let l = n.headers || this.headers,
                        u = n.params || this.params;
                    const c = n.context ?? this.context;
                    return void 0 !== n.setHeaders && (l = Object.keys(n.setHeaders).reduce((d, f) => d.set(f, n.setHeaders[f]), l)), n.setParams && (u = Object.keys(n.setParams).reduce((d, f) => d.set(f, n.setParams[f]), u)), new Wi(t, r, i, {
                        params: u,
                        headers: l,
                        context: c,
                        reportProgress: a,
                        responseType: o,
                        withCredentials: s
                    })
                }
            }
            var Oe = (() => ((Oe = Oe || {})[Oe.Sent = 0] = "Sent", Oe[Oe.UploadProgress = 1] = "UploadProgress", Oe[Oe.ResponseHeader = 2] = "ResponseHeader", Oe[Oe.DownloadProgress = 3] = "DownloadProgress", Oe[Oe.Response = 4] = "Response", Oe[Oe.User = 5] = "User", Oe))();
            class ff {
                constructor(n, t = 200, r = "OK") {
                    this.headers = n.headers || new Nn, this.status = void 0 !== n.status ? n.status : t, this.statusText = n.statusText || r, this.url = n.url || null, this.ok = this.status >= 200 && this.status < 300
                }
            }
            class hf extends ff {
                constructor(n = {}) {
                    super(n), this.type = Oe.ResponseHeader
                }
                clone(n = {}) {
                    return new hf({
                        headers: n.headers || this.headers,
                        status: void 0 !== n.status ? n.status : this.status,
                        statusText: n.statusText || this.statusText,
                        url: n.url || this.url || void 0
                    })
                }
            }
            class il extends ff {
                constructor(n = {}) {
                    super(n), this.type = Oe.Response, this.body = void 0 !== n.body ? n.body : null
                }
                clone(n = {}) {
                    return new il({
                        body: void 0 !== n.body ? n.body : this.body,
                        headers: n.headers || this.headers,
                        status: void 0 !== n.status ? n.status : this.status,
                        statusText: n.statusText || this.statusText,
                        url: n.url || this.url || void 0
                    })
                }
            }
            class yD extends ff {
                constructor(n) {
                    super(n, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${n.url || "(unknown url)"}` : `Http failure response for ${n.url || "(unknown url)"}: ${n.status} ${n.statusText}`, this.error = n.error || null
                }
            }

            function pf(e, n) {
                return {
                    body: n,
                    headers: e.headers,
                    context: e.context,
                    observe: e.observe,
                    params: e.params,
                    reportProgress: e.reportProgress,
                    responseType: e.responseType,
                    withCredentials: e.withCredentials
                }
            }
            let gf = (() => {
                class e {
                    constructor(t) {
                        this.handler = t
                    }
                    request(t, r, o = {}) {
                        let i;
                        if (t instanceof Wi) i = t;
                        else {
                            let l, u;
                            l = o.headers instanceof Nn ? o.headers : new Nn(o.headers), o.params && (u = o.params instanceof Xn ? o.params : new Xn({
                                fromObject: o.params
                            })), i = new Wi(t, r, void 0 !== o.body ? o.body : null, {
                                headers: l,
                                context: o.context,
                                params: u,
                                reportProgress: o.reportProgress,
                                responseType: o.responseType || "json",
                                withCredentials: o.withCredentials
                            })
                        }
                        const s = R(i).pipe(Gn(l => this.handler.handle(l)));
                        if (t instanceof Wi || "events" === o.observe) return s;
                        const a = s.pipe(Rn(l => l instanceof il));
                        switch (o.observe || "body") {
                            case "body":
                                switch (i.responseType) {
                                    case "arraybuffer":
                                        return a.pipe(U(l => {
                                            if (null !== l.body && !(l.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                            return l.body
                                        }));
                                    case "blob":
                                        return a.pipe(U(l => {
                                            if (null !== l.body && !(l.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                            return l.body
                                        }));
                                    case "text":
                                        return a.pipe(U(l => {
                                            if (null !== l.body && "string" != typeof l.body) throw new Error("Response is not a string.");
                                            return l.body
                                        }));
                                    default:
                                        return a.pipe(U(l => l.body))
                                }
                            case "response":
                                return a;
                            default:
                                throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)
                        }
                    }
                    delete(t, r = {}) {
                        return this.request("DELETE", t, r)
                    }
                    get(t, r = {}) {
                        return this.request("GET", t, r)
                    }
                    head(t, r = {}) {
                        return this.request("HEAD", t, r)
                    }
                    jsonp(t, r) {
                        return this.request("JSONP", t, {
                            params: (new Xn).append(r, "JSONP_CALLBACK"),
                            observe: "body",
                            responseType: "json"
                        })
                    }
                    options(t, r = {}) {
                        return this.request("OPTIONS", t, r)
                    }
                    patch(t, r, o = {}) {
                        return this.request("PATCH", t, pf(o, r))
                    }
                    post(t, r, o = {}) {
                        return this.request("POST", t, pf(o, r))
                    }
                    put(t, r, o = {}) {
                        return this.request("PUT", t, pf(o, r))
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(rl))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();

            function vD(e, n) {
                return n(e)
            }

            function QP(e, n) {
                return (t, r) => n.intercept(t, {
                    handle: o => e(o, r)
                })
            }
            const t1 = new M("HTTP_INTERCEPTORS"),
                qi = new M("HTTP_INTERCEPTOR_FNS");

            function n1() {
                let e = null;
                return (n, t) => (null === e && (e = (W(t1, {
                    optional: !0
                }) ?? []).reduceRight(QP, vD)), e(n, t))
            }
            let _D = (() => {
                class e extends rl {
                    constructor(t, r) {
                        super(), this.backend = t, this.injector = r, this.chain = null
                    }
                    handle(t) {
                        if (null === this.chain) {
                            const r = Array.from(new Set(this.injector.get(qi)));
                            this.chain = r.reduceRight((o, i) => function e1(e, n, t) {
                                return (r, o) => t.runInContext(() => n(r, i => e(i, o)))
                            }(o, i, this.injector), vD)
                        }
                        return this.chain(t, r => this.backend.handle(r))
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(df), S(nn))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const s1 = /^\)\]\}',?\n/;
            let DD = (() => {
                class e {
                    constructor(t) {
                        this.xhrFactory = t
                    }
                    handle(t) {
                        if ("JSONP" === t.method) throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");
                        return new ye(r => {
                            const o = this.xhrFactory.build();
                            if (o.open(t.method, t.urlWithParams), t.withCredentials && (o.withCredentials = !0), t.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))), t.headers.has("Accept") || o.setRequestHeader("Accept", "application/json, text/plain, */*"), !t.headers.has("Content-Type")) {
                                const h = t.detectContentTypeHeader();
                                null !== h && o.setRequestHeader("Content-Type", h)
                            }
                            if (t.responseType) {
                                const h = t.responseType.toLowerCase();
                                o.responseType = "json" !== h ? h : "text"
                            }
                            const i = t.serializeBody();
                            let s = null;
                            const a = () => {
                                if (null !== s) return s;
                                const h = o.statusText || "OK",
                                    p = new Nn(o.getAllResponseHeaders()),
                                    g = function a1(e) {
                                        return "responseURL" in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null
                                    }(o) || t.url;
                                return s = new hf({
                                    headers: p,
                                    status: o.status,
                                    statusText: h,
                                    url: g
                                }), s
                            },
                                l = () => {
                                    let {
                                        headers: h,
                                        status: p,
                                        statusText: g,
                                        url: m
                                    } = a(), v = null;
                                    204 !== p && (v = typeof o.response > "u" ? o.responseText : o.response), 0 === p && (p = v ? 200 : 0);
                                    let w = p >= 200 && p < 300;
                                    if ("json" === t.responseType && "string" == typeof v) {
                                        const y = v;
                                        v = v.replace(s1, "");
                                        try {
                                            v = "" !== v ? JSON.parse(v) : null
                                        } catch (N) {
                                            v = y, w && (w = !1, v = {
                                                error: N,
                                                text: v
                                            })
                                        }
                                    }
                                    w ? (r.next(new il({
                                        body: v,
                                        headers: h,
                                        status: p,
                                        statusText: g,
                                        url: m || void 0
                                    })), r.complete()) : r.error(new yD({
                                        error: v,
                                        headers: h,
                                        status: p,
                                        statusText: g,
                                        url: m || void 0
                                    }))
                                },
                                u = h => {
                                    const {
                                        url: p
                                    } = a(), g = new yD({
                                        error: h,
                                        status: o.status || 0,
                                        statusText: o.statusText || "Unknown Error",
                                        url: p || void 0
                                    });
                                    r.error(g)
                                };
                            let c = !1;
                            const d = h => {
                                c || (r.next(a()), c = !0);
                                let p = {
                                    type: Oe.DownloadProgress,
                                    loaded: h.loaded
                                };
                                h.lengthComputable && (p.total = h.total), "text" === t.responseType && o.responseText && (p.partialText = o.responseText), r.next(p)
                            },
                                f = h => {
                                    let p = {
                                        type: Oe.UploadProgress,
                                        loaded: h.loaded
                                    };
                                    h.lengthComputable && (p.total = h.total), r.next(p)
                                };
                            return o.addEventListener("load", l), o.addEventListener("error", u), o.addEventListener("timeout", u), o.addEventListener("abort", u), t.reportProgress && (o.addEventListener("progress", d), null !== i && o.upload && o.upload.addEventListener("progress", f)), o.send(i), r.next({
                                type: Oe.Sent
                            }), () => {
                                o.removeEventListener("error", u), o.removeEventListener("abort", u), o.removeEventListener("load", l), o.removeEventListener("timeout", u), t.reportProgress && (o.removeEventListener("progress", d), null !== i && o.upload && o.upload.removeEventListener("progress", f)), o.readyState !== o.DONE && o.abort()
                            }
                        })
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(C_))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();
            const mf = new M("XSRF_ENABLED"),
                wD = new M("XSRF_COOKIE_NAME", {
                    providedIn: "root",
                    factory: () => "XSRF-TOKEN"
                }),
                ED = new M("XSRF_HEADER_NAME", {
                    providedIn: "root",
                    factory: () => "X-XSRF-TOKEN"
                });
            class bD { }
            let c1 = (() => {
                class e {
                    constructor(t, r, o) {
                        this.doc = t, this.platform = r, this.cookieName = o, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0
                    }
                    getToken() {
                        if ("server" === this.platform) return null;
                        const t = this.doc.cookie || "";
                        return t !== this.lastCookieString && (this.parseCount++, this.lastToken = u_(t, this.cookieName), this.lastCookieString = t), this.lastToken
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(S(rt), S(Uc), S(wD))
                }, e.\u0275prov = T({
                    token: e,
                    factory: e.\u0275fac
                }), e
            })();

            function d1(e, n) {
                const t = e.url.toLowerCase();
                if (!W(mf) || "GET" === e.method || "HEAD" === e.method || t.startsWith("http://") || t.startsWith("https://")) return n(e);
                const r = W(bD).getToken(),
                    o = W(ED);
                return null != r && !e.headers.has(o) && (e = e.clone({
                    headers: e.headers.set(o, r)
                })), n(e)
            }
            var Se = (() => ((Se = Se || {})[Se.Interceptors = 0] = "Interceptors", Se[Se.LegacyInterceptors = 1] = "LegacyInterceptors", Se[Se.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration", Se[Se.NoXsrfProtection = 3] = "NoXsrfProtection", Se[Se.JsonpSupport = 4] = "JsonpSupport", Se[Se.RequestsMadeViaParent = 5] = "RequestsMadeViaParent", Se))();

            function Ao(e, n) {
                return {
                    \u0275kind: e,
                    \u0275providers: n
                }
            }

            function f1(...e) {
                const n = [gf, DD, _D, {
                    provide: rl,
                    useExisting: _D
                }, {
                        provide: df,
                        useExisting: DD
                    }, {
                        provide: qi,
                        useValue: d1,
                        multi: !0
                    }, {
                        provide: mf,
                        useValue: !0
                    }, {
                        provide: bD,
                        useClass: c1
                    }];
                for (const t of e) n.push(...t.\u0275providers);
                return function Q0(e) {
                    return {
                        \u0275providers: e
                    }
                }(n)
            }
            const SD = new M("LEGACY_INTERCEPTOR_FN");
            let p1 = (() => {
                class e { }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275mod = Lt({
                    type: e
                }), e.\u0275inj = Mt({
                    providers: [f1(Ao(Se.LegacyInterceptors, [{
                        provide: SD,
                        useFactory: n1
                    }, {
                        provide: qi,
                        useExisting: SD,
                        multi: !0
                    }]))]
                }), e
            })(),
                MD = (() => {
                    class e {
                        constructor(t) {
                            this.httpClient = t
                        }
                        apiRequest(t, r) {
                            return this.httpClient.get(t, {
                                params: {
                                    formula: r
                                },
                                responseType: "text"
                            })
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(S(gf))
                    }, e.\u0275prov = T({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }), e
                })(),
                ID = (() => {
                    class e {
                        constructor(t, r) {
                            this.apiService = t, this.http = r, this.base_options = [{
                                text: "API Easy",
                                value: {
                                    endpoint: "https://obstruction.sediu.ro/api/Joc/MutareEasy"
                                }
                            }, {
                                text: "API Random",
                                value: {
                                    endpoint: "https://obstruction.sediu.ro/api/Joc/MutareRandom"
                                }
                            }], this.extra_options_arena = [{
                                text: "Random cu greseli",
                                value: {
                                    endpoint: "https://obstruction.sediu.ro/api/Joc/MutareRandomCuGreseli"
                                }
                            }], this.optiuni_din_api_localhost = new ct([]), this.api_options = new ct(this.base_options), this.api_options_arena = new ct(this.base_options.concat(this.extra_options_arena)), this.apiOptions$ = this.api_options.asObservable(), this.apiArenaOptions$ = this.api_options_arena.asObservable(), this.optiuni_din_api_localhost.subscribe(i => {
                                this.api_options.next(this.base_options.concat(i)), this.api_options_arena.next(this.base_options.concat(this.extra_options_arena).concat(i))
                            });
                            let o = window.location.origin;
                            o.endsWith(":4200") && (o = o.substring(0, o.length - 4) + "5086"), o += "/api/Joc/FelAlgoDisponibil", this.url_fel_algo_disponibil = o, console.log(o), this.VeziFelAlgoDisiponibil(99999).subscribe(i => {
                                this.optiuni_din_api_localhost.next(i),
                                    function HP(e = 0, n = lf) {
                                        return e < 0 && (e = 0), uf(e, e, n)
                                    }(1e4).subscribe(() => {
                                        this.VeziFelAlgoDisiponibil(2).subscribe(s => {
                                            this.optiuni_din_api_localhost.next(s)
                                        })
                                    })
                            })
                        }
                        VeziFelAlgoDisiponibil(t) {
                            return this.http.get(this.url_fel_algo_disponibil).pipe(function GP(e = 1 / 0) {
                                let n;
                                n = e && "object" == typeof e ? e : {
                                    count: e
                                };
                                const {
                                    count: t = 1 / 0,
                                    delay: r,
                                    resetOnSuccess: o = !1
                                } = n;
                                return t <= 0 ? Fn : Ie((i, s) => {
                                    let l, a = 0;
                                    const u = () => {
                                        let c = !1;
                                        l = i.subscribe(ve(s, d => {
                                            o && (a = 0), s.next(d)
                                        }, void 0, d => {
                                            if (a++ < t) {
                                                const f = () => {
                                                    l ? (l.unsubscribe(), l = null, u()) : c = !0
                                                };
                                                if (null != r) {
                                                    const h = "number" == typeof r ? uf(r) : it(r(d, a)),
                                                        p = ve(s, () => {
                                                            p.unsubscribe(), f()
                                                        }, () => {
                                                            s.complete()
                                                        });
                                                    h.subscribe(p)
                                                } else f()
                                            } else s.error(d)
                                        })), c && (l.unsubscribe(), l = null, u())
                                    };
                                    u()
                                })
                            }(t), cf(1e3), U(r => r.map(s => ({
                                text: s.descriere,
                                value: {
                                    endpoint: s.url
                                }
                            }))))
                        }
                        parseApiResponse(t) {
                            let r;
                            return -1 !== t.indexOf(Io.NOT_EXIST) && (r = He.NOT_EXIST), -1 !== t.indexOf(Io.TABLE_ERROR) && (r = He.TABLE_ERROR), -1 !== t.indexOf(Io.FINAL) && (r = He.FINAL), /^[0-9]+$/.test(t) && (r = He.MOVE), r
                        }
                        performAPIRequest(t, r) {
                            return new Promise((o, i) => {
                                this.apiService.apiRequest(t, r).pipe(cf(250)).subscribe({
                                    next: s => o(s),
                                    error: s => {
                                        console.log("api error", s), this.sendAlert("Conectarea la API a esuat."), i(s)
                                    }
                                })
                            })
                        }
                        extractNumber(t) {
                            const [r, o] = t.toUpperCase().split(":FINAL");
                            return r
                        }
                        sendAlert(t) {
                            setTimeout(() => {
                                alert(t)
                            }, 100)
                        }
                        declareWinClient() {
                            this.sendAlert("Felicitari, ai castigat!")
                        }
                        declareWinAPI() {
                            this.sendAlert("Ai pierdut - Incearca un joc nou!")
                        }
                        fakeDelay(t) {
                            return new Promise((r, o) => {
                                R("fake delay").pipe(cf(t)).subscribe({
                                    next: () => r(!0)
                                })
                            })
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(S(MD), S(gf))
                    }, e.\u0275prov = T({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    }), e
                })();

            function g1(e, n) {
                if (1 & e && (A(0, "div"), K(1), I()), 2 & e) {
                    const t = Fe();
                    x(1), Dt(t.subtitle)
                }
            }

            function m1(e, n) {
                if (1 & e) {
                    const t = cr();
                    A(0, "div", 6), re("click", function () {
                        const i = yn(t).index,
                            s = Fe().index;
                        return vn(Fe().onCellClick(s, i))
                    }), jn(1, "div", 7), I()
                }
                if (2 & e) {
                    const t = n.index,
                        r = Fe().index;
                    q("ngClass", Fe().cellsHash[r + "_" + t].state.styleClass), x(1), Ht("data-row-index", r)("data-column-index", t)
                }
            }
            const AD = function () {
                return []
            };

            function y1(e, n) {
                if (1 & e && (A(0, "div", 4), Ve(1, m1, 2, 3, "div", 5), I()), 2 & e) {
                    const t = Fe();
                    x(1), q("ngForOf", Ic(1, AD).constructor(t.columns))
                }
            }
            const de = {
                Free: {
                    text: "Liber",
                    code: 0,
                    styleClass: "cell-free"
                },
                TransitionX: {
                    text: "Tranzitie X",
                    code: 1,
                    styleClass: "cell-transition-x"
                },
                X: {
                    text: "X",
                    code: 2,
                    styleClass: "cell-x"
                },
                TransitionO: {
                    text: "Tranzitie O",
                    code: 3,
                    styleClass: "cell-transition-o"
                },
                O: {
                    text: "O",
                    code: 4,
                    styleClass: "cell-o"
                }
            },
                yf = [de.Free, de.TransitionX, de.X, de.TransitionO, de.O];
            let TD = (() => {
                class e {
                    constructor() {
                        this.rows = 0, this.columns = 0, this.styleClass = "", this.title = "", this.subtitle = "", this.tableEvent = new ue, this.isGameCompleted = !1, this.isLoading = !1, this.isClickDisabled = !1, this.cellsHash = {}, this.isClientFirst = !0
                    }
                    ngOnInit() {
                        this.initCells()
                    }
                    initCells() {
                        let t;
                        this.isGameCompleted = !1, this.isLoading = !1, this.isClientFirst = !0, this.cellsHash = {};
                        for (let r = 0; r < this.rows; r++)
                            for (let o = 0; o < this.columns; o++) {
                                t = {
                                    rowIndex: r,
                                    columnIndex: o,
                                    state: de.Free
                                };
                                const i = this.getHashKey(t.rowIndex, t.columnIndex);
                                this.cellsHash[i] = t
                            }
                    }
                    setClientFirst(t) {
                        this.isClientFirst = t
                    }
                    getHashKey(t, r) {
                        return `${t}_${r}`
                    }
                    getCell(t, r) {
                        return this.cellsHash[this.getHashKey(t, r)]
                    }
                    getCellNode(t, r) {
                        return document.querySelector(`[data-row-index="${t}"][data-column-index="${r}"]`)
                    }
                    getStateByCode(t) {
                        const r = Object.keys(de).find(i => de[i].code === t);
                        return de[r]
                    }
                    setCellNextState(t) {
                        const r = this.isClientFirst || t.state.code !== de.Free.code ? 1 : 3,
                            o = this.getStateByCode(t.state.code),
                            s = (yf.indexOf(o) + r) % yf.length;
                        t.state = yf[s]
                    }
                    onCellClick(t, r) {
                        if (this.isClickDisabled) return;
                        if (this.isLoading) return void console.log("In Loading state, click not permitted");
                        if (this.isGameCompleted) return void console.log("Game is completed, table is disabled, click not permitted");
                        if (this.getTransitionCells().length) return void console.log("Cells still in transition, click not permitted");
                        const i = this.getCell(t, r); - 1 === [de.X.code, de.O.code].indexOf(i.state.code) ? (this.setCellNextState(i), this.tableEvent.emit({
                            event: Dr.CELL_CLICK,
                            rowIndex: t,
                            columnIndex: r,
                            encoded: this.getEncoded()
                        })) : console.log("Cell is in final state, click not permitted")
                    }
                    getEncoded() {
                        const a = {
                            [de.X.code]: "X",
                            [de.TransitionX.code]: "X",
                            [de.O.code]: "O",
                            [de.TransitionO.code]: "O",
                            [de.Free.code]: "_"
                        };
                        let l = [];
                        for (let u = 0; u < this.rows; u++) {
                            let c = [];
                            for (let d = 0; d < this.columns; d++) {
                                const h = this.getCell(u, d).state.code;
                                c.push(a[h])
                            }
                            l.push(c.join(""))
                        }
                        return `${this.rows}${this.columns}${l.join("")}`
                    }
                    getTransitionCells() {
                        return Object.keys(this.cellsHash).filter(t => -1 !== [de.TransitionX.code, de.TransitionO.code].indexOf(this.cellsHash[t].state.code))
                    }
                    cancelTransitions() {
                        this.getTransitionCells().forEach(t => {
                            this.cellsHash[t].state = de.Free
                        })
                    }
                    completeTransitions() {
                        this.getTransitionCells().forEach(t => {
                            const r = this.cellsHash[t],
                                o = r.state.code;
                            o === de.TransitionX.code ? r.state = de.X : o === de.TransitionO.code && (r.state = de.O)
                        })
                    }
                    parsePos(t) {
                        const [r, o] = t.toString().split("");
                        return [parseInt(r), parseInt(o)]
                    }
                    move(t, r, o) {
                        const i = this.getCell(r, o);
                        switch (t) {
                            case "x":
                                i.state = de.X;
                                break;
                            case "o":
                                i.state = de.O
                        }
                        this.tableEvent.emit({
                            event: Dr.FINAL_MOVE,
                            rowIndex: r,
                            columnIndex: o,
                            encoded: this.getEncoded()
                        })
                    }
                    moveX(t) {
                        const [r, o] = this.parsePos(t);
                        this.move("x", r, o)
                    }
                    moveO(t) {
                        const [r, o] = this.parsePos(t);
                        this.move("o", r, o)
                    }
                    getCellNeighbours(t, r) {
                        const o = t,
                            i = r;
                        return [this.getCell(o, i - 1), this.getCell(o, i + 1), this.getCell(o + 1, i), this.getCell(o + 1, i - 1), this.getCell(o + 1, i + 1), this.getCell(o - 1, i), this.getCell(o - 1, i - 1), this.getCell(o - 1, i + 1)].filter(m => void 0 !== m)
                    }
                    animate(t, r, o, i = 2e3) {
                        const s = document.querySelector(`[data-row-index="${r}"][data-column-index="${o}"]`);
                        s && (s.classList.remove(t), s.classList.add(t), setTimeout(() => {
                            s.classList.remove(t)
                        }, i))
                    }
                    markTransitionStart(t, r) {
                        this.getCellNode(t, r)?.classList.add("cell-transition")
                    }
                    markTransitionEnd(t, r) {
                        this.getCellNode(t, r)?.classList.remove("cell-transition")
                    }
                    markTransitionCellStart(t, r) {
                        this.isClientFirst ? this.getCellNode(t, r)?.classList.add("cell-x-transition") : this.getCellNode(t, r)?.classList.add("cell-o-transition")
                    }
                    markTransitionCellEnd(t, r) {
                        this.isClientFirst ? this.getCellNode(t, r)?.classList.remove("cell-x-transition") : this.getCellNode(t, r)?.classList.remove("cell-o-transition")
                    }
                    markMoveError(t, r) {
                        this.animate("blink-error", t, r)
                    }
                    markMoveSuccess(t, r) {
                        this.animate("ease-light", t, r)
                    }
                    pauseAnimation(t, r) {
                        this.getCellNode(t, r)?.classList.add("paused")
                    }
                    continueAnimation(t, r) {
                        this.getCellNode(t, r)?.classList.remove("paused")
                    }
                    setGameCompleted() {
                        this.isGameCompleted = !0
                    }
                    setClickDisabled() {
                        this.isClickDisabled = !0
                    }
                    ngOnChanges() {
                        this.initCells()
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275cmp = kt({
                    type: e,
                    selectors: [
                        ["app-tabla-de-joc"]
                    ],
                    inputs: {
                        rows: "rows",
                        columns: "columns",
                        styleClass: "styleClass",
                        title: "title",
                        subtitle: "subtitle"
                    },
                    outputs: {
                        tableEvent: "tableEvent"
                    },
                    features: [gt],
                    decls: 6,
                    vars: 5,
                    consts: [
                        [1, "game-container", 3, "ngClass"],
                        [1, "heading"],
                        [4, "ngIf"],
                        ["class", "row", 4, "ngFor", "ngForOf"],
                        [1, "row"],
                        ["class", "column", 3, "ngClass", "click", 4, "ngFor", "ngForOf"],
                        [1, "column", 3, "ngClass", "click"],
                        [1, "icon-bg", "inner"]
                    ],
                    template: function (t, r) {
                        1 & t && (A(0, "div", 0)(1, "div", 1)(2, "div"), K(3), I(), Ve(4, g1, 2, 1, "div", 2), I(), Ve(5, y1, 2, 2, "div", 3), I()), 2 & t && (q("ngClass", r.styleClass), x(3), Dt(r.title), x(1), q("ngIf", r.subtitle.length), x(1), q("ngForOf", Ic(4, AD).constructor(r.rows)))
                    },
                    dependencies: [ba, Sa, Si],
                    styles: ['[_nghost-%COMP%]{width:80%;display:flex}.heading[_ngcontent-%COMP%]{margin:0;padding:0;text-align:center;font-size:medium;height:40px;white-space:nowrap}.row[_ngcontent-%COMP%]{display:flex;flex-grow:1;justify-content:center}.column[_ngcontent-%COMP%]{aspect-ratio:1;border:1px solid black;position:relative;cursor:default}.column[_ngcontent-%COMP%]   .inner[_ngcontent-%COMP%]{position:absolute}.game-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;width:100%;padding:10px}.is-horizontal.game-container[_ngcontent-%COMP%], .is-horizontal[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{width:100%;flex-grow:0}.is-horizontal[_ngcontent-%COMP%]   .column[_ngcontent-%COMP%]{width:100%}.cell-x[_ngcontent-%COMP%]   .inner[_ngcontent-%COMP%]{background-image:url(/assets/icon-x.png)}.cell-o[_ngcontent-%COMP%]   .inner[_ngcontent-%COMP%]{background-image:url(/assets/icon-o.png)}.icon-bg[_ngcontent-%COMP%]{background-size:cover;background-position:center center;content:" ";width:100%;height:100%;background-repeat:no-repeat}.cell-transition[_ngcontent-%COMP%]{background-color:#d3d3d3;animation-name:_ngcontent-%COMP%_shake;animation-duration:.7s;animation-iteration-count:infinite}.cell-x-transition[_ngcontent-%COMP%]{background-image:url(/assets/icon-x.png)}.cell-o-transition[_ngcontent-%COMP%]{background-image:url(/assets/icon-o.png)}.ease-light[_ngcontent-%COMP%]{animation-direction:normal;animation-duration:2s;animation-iteration-count:1;animation-name:_ngcontent-%COMP%_ease-light;animation-timing-function:ease-in-out}.blink-error[_ngcontent-%COMP%]{animation-direction:normal;animation-duration:.25s;animation-iteration-count:2;animation-name:_ngcontent-%COMP%_blink-error;animation-timing-function:linear}.paused[_ngcontent-%COMP%]{animation-play-state:paused}@keyframes _ngcontent-%COMP%_ease-light{50%{background-color:#6ef95580}}@keyframes _ngcontent-%COMP%_cell-transition{0%{background-color:gray}50%{background-color:#d3d3d3}to{background-color:gray}}@keyframes _ngcontent-%COMP%_blink-error{50%{background-color:#ff000080}}@keyframes _ngcontent-%COMP%_tilt-shaking{0%{transform:rotate(0)}25%{transform:rotate(5deg)}50%{transform:rotate(0)}75%{transform:rotate(-5deg)}to{transform:rotate(0)}}@keyframes _ngcontent-%COMP%_shake{0%{transform:translate(1px,1px) rotate(0)}10%{transform:translate(-1px,-2px) rotate(-1deg)}20%{transform:translate(-3px) rotate(1deg)}30%{transform:translate(3px,2px) rotate(0)}40%{transform:translate(1px,-1px) rotate(1deg)}50%{transform:translate(-1px,2px) rotate(-1deg)}60%{transform:translate(-3px,1px) rotate(0)}70%{transform:translate(3px,1px) rotate(-1deg)}80%{transform:translate(-1px,-1px) rotate(1deg)}90%{transform:translate(1px,2px) rotate(0)}to{transform:translate(1px,-2px) rotate(-1deg)}}']
                }), e
            })(),
                xD = (() => {
                    class e {
                        constructor(t, r) {
                            this._renderer = t, this._elementRef = r, this.onChange = o => { }, this.onTouched = () => { }
                        }
                        setProperty(t, r) {
                            this._renderer.setProperty(this._elementRef.nativeElement, t, r)
                        }
                        registerOnTouched(t) {
                            this.onTouched = t
                        }
                        registerOnChange(t) {
                            this.onChange = t
                        }
                        setDisabledState(t) {
                            this.setProperty("disabled", t)
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(C(wn), C(_t))
                    }, e.\u0275dir = L({
                        type: e
                    }), e
                })(),
                wr = (() => {
                    class e extends xD { }
                    return e.\u0275fac = function () {
                        let n;
                        return function (r) {
                            return (n || (n = $e(e)))(r || e)
                        }
                    }(), e.\u0275dir = L({
                        type: e,
                        features: [ne]
                    }), e
                })();
            const dn = new M("NgValueAccessor"),
                C1 = {
                    provide: dn,
                    useExisting: le(() => sl),
                    multi: !0
                },
                w1 = new M("CompositionEventMode");
            let sl = (() => {
                class e extends xD {
                    constructor(t, r, o) {
                        super(t, r), this._compositionMode = o, this._composing = !1, null == this._compositionMode && (this._compositionMode = ! function D1() {
                            const e = An() ? An().getUserAgent() : "";
                            return /android (\d+)/.test(e.toLowerCase())
                        }())
                    }
                    writeValue(t) {
                        this.setProperty("value", t ?? "")
                    }
                    _handleInput(t) {
                        (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(t)
                    }
                    _compositionStart() {
                        this._composing = !0
                    }
                    _compositionEnd(t) {
                        this._composing = !1, this._compositionMode && this.onChange(t)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(wn), C(_t), C(w1, 8))
                }, e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["input", "formControlName", "", 3, "type", "checkbox"],
                        ["textarea", "formControlName", ""],
                        ["input", "formControl", "", 3, "type", "checkbox"],
                        ["textarea", "formControl", ""],
                        ["input", "ngModel", "", 3, "type", "checkbox"],
                        ["textarea", "ngModel", ""],
                        ["", "ngDefaultControl", ""]
                    ],
                    hostBindings: function (t, r) {
                        1 & t && re("input", function (i) {
                            return r._handleInput(i.target.value)
                        })("blur", function () {
                            return r.onTouched()
                        })("compositionstart", function () {
                            return r._compositionStart()
                        })("compositionend", function (i) {
                            return r._compositionEnd(i.target.value)
                        })
                    },
                    features: [pe([C1]), ne]
                }), e
            })();
            const E1 = !1,
                Ke = new M("NgValidators"),
                Zn = new M("NgAsyncValidators");

            function $D(e) {
                return null != e
            }

            function UD(e) {
                const n = ci(e) ? Ae(e) : e;
                if (E1 && !hc(n)) {
                    let t = "Expected async validator to return Promise or Observable.";
                    throw "object" == typeof e && (t += " Are you using a synchronous validator where an async validator is expected?"), new D(-1101, t)
                }
                return n
            }

            function HD(e) {
                let n = {};
                return e.forEach(t => {
                    n = null != t ? {
                        ...n,
                        ...t
                    } : n
                }), 0 === Object.keys(n).length ? null : n
            }

            function GD(e, n) {
                return n.map(t => t(e))
            }

            function zD(e) {
                return e.map(n => function S1(e) {
                    return !e.validate
                }(n) ? n : t => n.validate(t))
            }

            function vf(e) {
                return null != e ? function WD(e) {
                    if (!e) return null;
                    const n = e.filter($D);
                    return 0 == n.length ? null : function (t) {
                        return HD(GD(t, n))
                    }
                }(zD(e)) : null
            }

            function _f(e) {
                return null != e ? function qD(e) {
                    if (!e) return null;
                    const n = e.filter($D);
                    return 0 == n.length ? null : function (t) {
                        return function v1(...e) {
                            const n = ah(e),
                                {
                                    args: t,
                                    keys: r
                                } = z_(e),
                                o = new ye(i => {
                                    const {
                                        length: s
                                    } = t;
                                    if (!s) return void i.complete();
                                    const a = new Array(s);
                                    let l = s,
                                        u = s;
                                    for (let c = 0; c < s; c++) {
                                        let d = !1;
                                        it(t[c]).subscribe(ve(i, f => {
                                            d || (d = !0, u--), a[c] = f
                                        }, () => l--, void 0, () => {
                                            (!l || !d) && (u || i.next(r ? q_(r, a) : a), i.complete())
                                        }))
                                    }
                                });
                            return n ? o.pipe(W_(n)) : o
                        }(GD(t, n).map(UD)).pipe(U(HD))
                    }
                }(zD(e)) : null
            }

            function JD(e, n) {
                return null === e ? [n] : Array.isArray(e) ? [...e, n] : [e, n]
            }

            function Cf(e) {
                return e ? Array.isArray(e) ? e : [e] : []
            }

            function ll(e, n) {
                return Array.isArray(e) ? e.includes(n) : e === n
            }

            function ZD(e, n) {
                const t = Cf(n);
                return Cf(e).forEach(o => {
                    ll(t, o) || t.push(o)
                }), t
            }

            function YD(e, n) {
                return Cf(n).filter(t => !ll(e, t))
            }
            class QD {
                constructor() {
                    this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
                }
                get value() {
                    return this.control ? this.control.value : null
                }
                get valid() {
                    return this.control ? this.control.valid : null
                }
                get invalid() {
                    return this.control ? this.control.invalid : null
                }
                get pending() {
                    return this.control ? this.control.pending : null
                }
                get disabled() {
                    return this.control ? this.control.disabled : null
                }
                get enabled() {
                    return this.control ? this.control.enabled : null
                }
                get errors() {
                    return this.control ? this.control.errors : null
                }
                get pristine() {
                    return this.control ? this.control.pristine : null
                }
                get dirty() {
                    return this.control ? this.control.dirty : null
                }
                get touched() {
                    return this.control ? this.control.touched : null
                }
                get status() {
                    return this.control ? this.control.status : null
                }
                get untouched() {
                    return this.control ? this.control.untouched : null
                }
                get statusChanges() {
                    return this.control ? this.control.statusChanges : null
                }
                get valueChanges() {
                    return this.control ? this.control.valueChanges : null
                }
                get path() {
                    return null
                }
                _setValidators(n) {
                    this._rawValidators = n || [], this._composedValidatorFn = vf(this._rawValidators)
                }
                _setAsyncValidators(n) {
                    this._rawAsyncValidators = n || [], this._composedAsyncValidatorFn = _f(this._rawAsyncValidators)
                }
                get validator() {
                    return this._composedValidatorFn || null
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn || null
                }
                _registerOnDestroy(n) {
                    this._onDestroyCallbacks.push(n)
                }
                _invokeOnDestroyCallbacks() {
                    this._onDestroyCallbacks.forEach(n => n()), this._onDestroyCallbacks = []
                }
                reset(n) {
                    this.control && this.control.reset(n)
                }
                hasError(n, t) {
                    return !!this.control && this.control.hasError(n, t)
                }
                getError(n, t) {
                    return this.control ? this.control.getError(n, t) : null
                }
            }
            class ot extends QD {
                get formDirective() {
                    return null
                }
                get path() {
                    return null
                }
            }
            class Yn extends QD {
                constructor() {
                    super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
                }
            }
            class ew {
                constructor(n) {
                    this._cd = n
                }
                get isTouched() {
                    return !!this._cd?.control?.touched
                }
                get isUntouched() {
                    return !!this._cd?.control?.untouched
                }
                get isPristine() {
                    return !!this._cd?.control?.pristine
                }
                get isDirty() {
                    return !!this._cd?.control?.dirty
                }
                get isValid() {
                    return !!this._cd?.control?.valid
                }
                get isInvalid() {
                    return !!this._cd?.control?.invalid
                }
                get isPending() {
                    return !!this._cd?.control?.pending
                }
                get isSubmitted() {
                    return !!this._cd?.submitted
                }
            }
            let Df = (() => {
                class e extends ew {
                    constructor(t) {
                        super(t)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(Yn, 2))
                }, e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["", "formControlName", ""],
                        ["", "ngModel", ""],
                        ["", "formControl", ""]
                    ],
                    hostVars: 14,
                    hostBindings: function (t, r) {
                        2 & t && Js("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)("ng-pristine", r.isPristine)("ng-dirty", r.isDirty)("ng-valid", r.isValid)("ng-invalid", r.isInvalid)("ng-pending", r.isPending)
                    },
                    features: [ne]
                }), e
            })();
            const Ji = "VALID",
                cl = "INVALID",
                To = "PENDING",
                Xi = "DISABLED";

            function dl(e) {
                return null != e && !Array.isArray(e) && "object" == typeof e
            }
            class ow {
                constructor(n, t) {
                    this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = !1, this._pendingTouched = !1, this._onCollectionChange = () => { }, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._assignValidators(n), this._assignAsyncValidators(t)
                }
                get validator() {
                    return this._composedValidatorFn
                }
                set validator(n) {
                    this._rawValidators = this._composedValidatorFn = n
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn
                }
                set asyncValidator(n) {
                    this._rawAsyncValidators = this._composedAsyncValidatorFn = n
                }
                get parent() {
                    return this._parent
                }
                get valid() {
                    return this.status === Ji
                }
                get invalid() {
                    return this.status === cl
                }
                get pending() {
                    return this.status == To
                }
                get disabled() {
                    return this.status === Xi
                }
                get enabled() {
                    return this.status !== Xi
                }
                get dirty() {
                    return !this.pristine
                }
                get untouched() {
                    return !this.touched
                }
                get updateOn() {
                    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
                }
                setValidators(n) {
                    this._assignValidators(n)
                }
                setAsyncValidators(n) {
                    this._assignAsyncValidators(n)
                }
                addValidators(n) {
                    this.setValidators(ZD(n, this._rawValidators))
                }
                addAsyncValidators(n) {
                    this.setAsyncValidators(ZD(n, this._rawAsyncValidators))
                }
                removeValidators(n) {
                    this.setValidators(YD(n, this._rawValidators))
                }
                removeAsyncValidators(n) {
                    this.setAsyncValidators(YD(n, this._rawAsyncValidators))
                }
                hasValidator(n) {
                    return ll(this._rawValidators, n)
                }
                hasAsyncValidator(n) {
                    return ll(this._rawAsyncValidators, n)
                }
                clearValidators() {
                    this.validator = null
                }
                clearAsyncValidators() {
                    this.asyncValidator = null
                }
                markAsTouched(n = {}) {
                    this.touched = !0, this._parent && !n.onlySelf && this._parent.markAsTouched(n)
                }
                markAllAsTouched() {
                    this.markAsTouched({
                        onlySelf: !0
                    }), this._forEachChild(n => n.markAllAsTouched())
                }
                markAsUntouched(n = {}) {
                    this.touched = !1, this._pendingTouched = !1, this._forEachChild(t => {
                        t.markAsUntouched({
                            onlySelf: !0
                        })
                    }), this._parent && !n.onlySelf && this._parent._updateTouched(n)
                }
                markAsDirty(n = {}) {
                    this.pristine = !1, this._parent && !n.onlySelf && this._parent.markAsDirty(n)
                }
                markAsPristine(n = {}) {
                    this.pristine = !0, this._pendingDirty = !1, this._forEachChild(t => {
                        t.markAsPristine({
                            onlySelf: !0
                        })
                    }), this._parent && !n.onlySelf && this._parent._updatePristine(n)
                }
                markAsPending(n = {}) {
                    this.status = To, !1 !== n.emitEvent && this.statusChanges.emit(this.status), this._parent && !n.onlySelf && this._parent.markAsPending(n)
                }
                disable(n = {}) {
                    const t = this._parentMarkedDirty(n.onlySelf);
                    this.status = Xi, this.errors = null, this._forEachChild(r => {
                        r.disable({
                            ...n,
                            onlySelf: !0
                        })
                    }), this._updateValue(), !1 !== n.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors({
                        ...n,
                        skipPristineCheck: t
                    }), this._onDisabledChange.forEach(r => r(!0))
                }
                enable(n = {}) {
                    const t = this._parentMarkedDirty(n.onlySelf);
                    this.status = Ji, this._forEachChild(r => {
                        r.enable({
                            ...n,
                            onlySelf: !0
                        })
                    }), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    }), this._updateAncestors({
                        ...n,
                        skipPristineCheck: t
                    }), this._onDisabledChange.forEach(r => r(!1))
                }
                _updateAncestors(n) {
                    this._parent && !n.onlySelf && (this._parent.updateValueAndValidity(n), n.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
                }
                setParent(n) {
                    this._parent = n
                }
                getRawValue() {
                    return this.value
                }
                updateValueAndValidity(n = {}) {
                    this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), (this.status === Ji || this.status === To) && this._runAsyncValidator(n.emitEvent)), !1 !== n.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !n.onlySelf && this._parent.updateValueAndValidity(n)
                }
                _updateTreeValidity(n = {
                    emitEvent: !0
                }) {
                    this._forEachChild(t => t._updateTreeValidity(n)), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    })
                }
                _setInitialStatus() {
                    this.status = this._allControlsDisabled() ? Xi : Ji
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null
                }
                _runAsyncValidator(n) {
                    if (this.asyncValidator) {
                        this.status = To, this._hasOwnPendingAsyncValidator = !0;
                        const t = UD(this.asyncValidator(this));
                        this._asyncValidationSubscription = t.subscribe(r => {
                            this._hasOwnPendingAsyncValidator = !1, this.setErrors(r, {
                                emitEvent: n
                            })
                        })
                    }
                }
                _cancelExistingSubscription() {
                    this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
                }
                setErrors(n, t = {}) {
                    this.errors = n, this._updateControlsErrors(!1 !== t.emitEvent)
                }
                get(n) {
                    let t = n;
                    return null == t || (Array.isArray(t) || (t = t.split(".")), 0 === t.length) ? null : t.reduce((r, o) => r && r._find(o), this)
                }
                getError(n, t) {
                    const r = t ? this.get(t) : this;
                    return r && r.errors ? r.errors[n] : null
                }
                hasError(n, t) {
                    return !!this.getError(n, t)
                }
                get root() {
                    let n = this;
                    for (; n._parent;) n = n._parent;
                    return n
                }
                _updateControlsErrors(n) {
                    this.status = this._calculateStatus(), n && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(n)
                }
                _initObservables() {
                    this.valueChanges = new ue, this.statusChanges = new ue
                }
                _calculateStatus() {
                    return this._allControlsDisabled() ? Xi : this.errors ? cl : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(To) ? To : this._anyControlsHaveStatus(cl) ? cl : Ji
                }
                _anyControlsHaveStatus(n) {
                    return this._anyControls(t => t.status === n)
                }
                _anyControlsDirty() {
                    return this._anyControls(n => n.dirty)
                }
                _anyControlsTouched() {
                    return this._anyControls(n => n.touched)
                }
                _updatePristine(n = {}) {
                    this.pristine = !this._anyControlsDirty(), this._parent && !n.onlySelf && this._parent._updatePristine(n)
                }
                _updateTouched(n = {}) {
                    this.touched = this._anyControlsTouched(), this._parent && !n.onlySelf && this._parent._updateTouched(n)
                }
                _registerOnCollectionChange(n) {
                    this._onCollectionChange = n
                }
                _setUpdateStrategy(n) {
                    dl(n) && null != n.updateOn && (this._updateOn = n.updateOn)
                }
                _parentMarkedDirty(n) {
                    return !n && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
                }
                _find(n) {
                    return null
                }
                _assignValidators(n) {
                    this._rawValidators = Array.isArray(n) ? n.slice() : n, this._composedValidatorFn = function N1(e) {
                        return Array.isArray(e) ? vf(e) : e || null
                    }(this._rawValidators)
                }
                _assignAsyncValidators(n) {
                    this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n, this._composedAsyncValidatorFn = function F1(e) {
                        return Array.isArray(e) ? _f(e) : e || null
                    }(this._rawAsyncValidators)
                }
            }
            const xo = new M("CallSetDisabledState", {
                providedIn: "root",
                factory: () => fl
            }),
                fl = "always";

            function Ki(e, n, t = fl) {
                (function Af(e, n) {
                    const t = function XD(e) {
                        return e._rawValidators
                    }(e);
                    null !== n.validator ? e.setValidators(JD(t, n.validator)) : "function" == typeof t && e.setValidators([t]);
                    const r = function KD(e) {
                        return e._rawAsyncValidators
                    }(e);
                    null !== n.asyncValidator ? e.setAsyncValidators(JD(r, n.asyncValidator)) : "function" == typeof r && e.setAsyncValidators([r]);
                    const o = () => e.updateValueAndValidity();
                    gl(n._rawValidators, o), gl(n._rawAsyncValidators, o)
                })(e, n), n.valueAccessor.writeValue(e.value), (e.disabled || "always" === t) && n.valueAccessor.setDisabledState?.(e.disabled),
                    function L1(e, n) {
                        n.valueAccessor.registerOnChange(t => {
                            e._pendingValue = t, e._pendingChange = !0, e._pendingDirty = !0, "change" === e.updateOn && iw(e, n)
                        })
                    }(e, n),
                    function j1(e, n) {
                        const t = (r, o) => {
                            n.valueAccessor.writeValue(r), o && n.viewToModelUpdate(r)
                        };
                        e.registerOnChange(t), n._registerOnDestroy(() => {
                            e._unregisterOnChange(t)
                        })
                    }(e, n),
                    function V1(e, n) {
                        n.valueAccessor.registerOnTouched(() => {
                            e._pendingTouched = !0, "blur" === e.updateOn && e._pendingChange && iw(e, n), "submit" !== e.updateOn && e.markAsTouched()
                        })
                    }(e, n),
                    function k1(e, n) {
                        if (n.valueAccessor.setDisabledState) {
                            const t = r => {
                                n.valueAccessor.setDisabledState(r)
                            };
                            e.registerOnDisabledChange(t), n._registerOnDestroy(() => {
                                e._unregisterOnDisabledChange(t)
                            })
                        }
                    }(e, n)
            }

            function gl(e, n) {
                e.forEach(t => {
                    t.registerOnValidatorChange && t.registerOnValidatorChange(n)
                })
            }

            function iw(e, n) {
                e._pendingDirty && e.markAsDirty(), e.setValue(e._pendingValue, {
                    emitModelToViewChange: !1
                }), n.viewToModelUpdate(e._pendingValue), e._pendingChange = !1
            }

            function lw(e, n) {
                const t = e.indexOf(n);
                t > -1 && e.splice(t, 1)
            }

            function uw(e) {
                return "object" == typeof e && null !== e && 2 === Object.keys(e).length && "value" in e && "disabled" in e
            }
            const cw = class extends ow {
                constructor(n = null, t, r) {
                    super(function Sf(e) {
                        return (dl(e) ? e.validators : e) || null
                    }(t), function Mf(e, n) {
                        return (dl(n) ? n.asyncValidators : e) || null
                    }(r, t)), this.defaultValue = null, this._onChange = [], this._pendingChange = !1, this._applyFormState(n), this._setUpdateStrategy(t), this._initObservables(), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: !!this.asyncValidator
                    }), dl(t) && (t.nonNullable || t.initialValueIsDefault) && (this.defaultValue = uw(n) ? n.value : n)
                }
                setValue(n, t = {}) {
                    this.value = this._pendingValue = n, this._onChange.length && !1 !== t.emitModelToViewChange && this._onChange.forEach(r => r(this.value, !1 !== t.emitViewToModelChange)), this.updateValueAndValidity(t)
                }
                patchValue(n, t = {}) {
                    this.setValue(n, t)
                }
                reset(n = this.defaultValue, t = {}) {
                    this._applyFormState(n), this.markAsPristine(t), this.markAsUntouched(t), this.setValue(this.value, t), this._pendingChange = !1
                }
                _updateValue() { }
                _anyControls(n) {
                    return !1
                }
                _allControlsDisabled() {
                    return this.disabled
                }
                registerOnChange(n) {
                    this._onChange.push(n)
                }
                _unregisterOnChange(n) {
                    lw(this._onChange, n)
                }
                registerOnDisabledChange(n) {
                    this._onDisabledChange.push(n)
                }
                _unregisterOnDisabledChange(n) {
                    lw(this._onDisabledChange, n)
                }
                _forEachChild(n) { }
                _syncPendingControls() {
                    return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                        onlySelf: !0,
                        emitModelToViewChange: !1
                    }), 0))
                }
                _applyFormState(n) {
                    uw(n) ? (this.value = this._pendingValue = n.value, n.disabled ? this.disable({
                        onlySelf: !0,
                        emitEvent: !1
                    }) : this.enable({
                        onlySelf: !0,
                        emitEvent: !1
                    })) : this.value = this._pendingValue = n
                }
            },
                q1 = {
                    provide: Yn,
                    useExisting: le(() => yl)
                },
                hw = (() => Promise.resolve())();
            let yl = (() => {
                class e extends Yn {
                    constructor(t, r, o, i, s, a) {
                        super(), this._changeDetectorRef = s, this.callSetDisabledState = a, this.control = new cw, this._registered = !1, this.update = new ue, this._parent = t, this._setValidators(r), this._setAsyncValidators(o), this.valueAccessor = function Rf(e, n) {
                            if (!n) return null;
                            let t, r, o;
                            return Array.isArray(n), n.forEach(i => {
                                i.constructor === sl ? t = i : function U1(e) {
                                    return Object.getPrototypeOf(e.constructor) === wr
                                }(i) ? r = i : o = i
                            }), o || r || t || null
                        }(0, i)
                    }
                    ngOnChanges(t) {
                        if (this._checkForErrors(), !this._registered || "name" in t) {
                            if (this._registered && (this._checkName(), this.formDirective)) {
                                const r = t.name.previousValue;
                                this.formDirective.removeControl({
                                    name: r,
                                    path: this._getPath(r)
                                })
                            }
                            this._setUpControl()
                        }
                        "isDisabled" in t && this._updateDisabled(t),
                            function xf(e, n) {
                                if (!e.hasOwnProperty("model")) return !1;
                                const t = e.model;
                                return !!t.isFirstChange() || !Object.is(n, t.currentValue)
                            }(t, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model)
                    }
                    ngOnDestroy() {
                        this.formDirective && this.formDirective.removeControl(this)
                    }
                    get path() {
                        return this._getPath(this.name)
                    }
                    get formDirective() {
                        return this._parent ? this._parent.formDirective : null
                    }
                    viewToModelUpdate(t) {
                        this.viewModel = t, this.update.emit(t)
                    }
                    _setUpControl() {
                        this._setUpdateStrategy(), this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this), this._registered = !0
                    }
                    _setUpdateStrategy() {
                        this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn)
                    }
                    _isStandalone() {
                        return !this._parent || !(!this.options || !this.options.standalone)
                    }
                    _setUpStandalone() {
                        Ki(this.control, this, this.callSetDisabledState), this.control.updateValueAndValidity({
                            emitEvent: !1
                        })
                    }
                    _checkForErrors() {
                        this._isStandalone() || this._checkParentType(), this._checkName()
                    }
                    _checkParentType() { }
                    _checkName() {
                        this.options && this.options.name && (this.name = this.options.name), this._isStandalone()
                    }
                    _updateValue(t) {
                        hw.then(() => {
                            this.control.setValue(t, {
                                emitViewToModelChange: !1
                            }), this._changeDetectorRef?.markForCheck()
                        })
                    }
                    _updateDisabled(t) {
                        const r = t.isDisabled.currentValue,
                            o = 0 !== r && po(r);
                        hw.then(() => {
                            o && !this.control.disabled ? this.control.disable() : !o && this.control.disabled && this.control.enable(), this._changeDetectorRef?.markForCheck()
                        })
                    }
                    _getPath(t) {
                        return this._parent ? function hl(e, n) {
                            return [...n.path, e]
                        }(t, this._parent) : [t]
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(ot, 9), C(Ke, 10), C(Zn, 10), C(dn, 10), C(da, 8), C(xo, 8))
                }, e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]
                    ],
                    inputs: {
                        name: "name",
                        isDisabled: ["disabled", "isDisabled"],
                        model: ["ngModel", "model"],
                        options: ["ngModelOptions", "options"]
                    },
                    outputs: {
                        update: "ngModelChange"
                    },
                    exportAs: ["ngModel"],
                    features: [pe([q1]), ne, gt]
                }), e
            })();
            const K1 = {
                provide: dn,
                useExisting: le(() => Nf),
                multi: !0
            };
            let gw = (() => {
                class e { }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275mod = Lt({
                    type: e
                }), e.\u0275inj = Mt({}), e
            })(),
                Z1 = (() => {
                    class e {
                        constructor() {
                            this._accessors = []
                        }
                        add(t, r) {
                            this._accessors.push([t, r])
                        }
                        remove(t) {
                            for (let r = this._accessors.length - 1; r >= 0; --r)
                                if (this._accessors[r][1] === t) return void this._accessors.splice(r, 1)
                        }
                        select(t) {
                            this._accessors.forEach(r => {
                                this._isSameGroup(r, t) && r[1] !== t && r[1].fireUncheck(t.value)
                            })
                        }
                        _isSameGroup(t, r) {
                            return !!t[0].control && t[0]._parent === r._control._parent && t[1].name === r.name
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275prov = T({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: gw
                    }), e
                })(),
                Nf = (() => {
                    class e extends wr {
                        constructor(t, r, o, i) {
                            super(t, r), this._registry = o, this._injector = i, this.setDisabledStateFired = !1, this.onChange = () => { }, this.callSetDisabledState = W(xo, {
                                optional: !0
                            }) ?? fl
                        }
                        ngOnInit() {
                            this._control = this._injector.get(Yn), this._checkName(), this._registry.add(this._control, this)
                        }
                        ngOnDestroy() {
                            this._registry.remove(this)
                        }
                        writeValue(t) {
                            this._state = t === this.value, this.setProperty("checked", this._state)
                        }
                        registerOnChange(t) {
                            this._fn = t, this.onChange = () => {
                                t(this.value), this._registry.select(this)
                            }
                        }
                        setDisabledState(t) {
                            (this.setDisabledStateFired || t || "whenDisabledForLegacyCode" === this.callSetDisabledState) && this.setProperty("disabled", t), this.setDisabledStateFired = !0
                        }
                        fireUncheck(t) {
                            this.writeValue(t)
                        }
                        _checkName() {
                            !this.name && this.formControlName && (this.name = this.formControlName)
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(C(wn), C(_t), C(Z1), C(Ut))
                    }, e.\u0275dir = L({
                        type: e,
                        selectors: [
                            ["input", "type", "radio", "formControlName", ""],
                            ["input", "type", "radio", "formControl", ""],
                            ["input", "type", "radio", "ngModel", ""]
                        ],
                        hostBindings: function (t, r) {
                            1 & t && re("change", function () {
                                return r.onChange()
                            })("blur", function () {
                                return r.onTouched()
                            })
                        },
                        inputs: {
                            name: "name",
                            formControlName: "formControlName",
                            value: "value"
                        },
                        features: [pe([K1]), ne]
                    }), e
                })();
            const ok = {
                provide: dn,
                useExisting: le(() => vl),
                multi: !0
            };

            function Dw(e, n) {
                return null == e ? `${n}` : (n && "object" == typeof n && (n = "Object"), `${e}: ${n}`.slice(0, 50))
            }
            let vl = (() => {
                class e extends wr {
                    constructor() {
                        super(...arguments), this._optionMap = new Map, this._idCounter = 0, this._compareWith = Object.is
                    }
                    set compareWith(t) {
                        this._compareWith = t
                    }
                    writeValue(t) {
                        this.value = t;
                        const o = Dw(this._getOptionId(t), t);
                        this.setProperty("value", o)
                    }
                    registerOnChange(t) {
                        this.onChange = r => {
                            this.value = this._getOptionValue(r), t(this.value)
                        }
                    }
                    _registerOption() {
                        return (this._idCounter++).toString()
                    }
                    _getOptionId(t) {
                        for (const r of Array.from(this._optionMap.keys()))
                            if (this._compareWith(this._optionMap.get(r), t)) return r;
                        return null
                    }
                    _getOptionValue(t) {
                        const r = function ik(e) {
                            return e.split(":")[0]
                        }(t);
                        return this._optionMap.has(r) ? this._optionMap.get(r) : t
                    }
                }
                return e.\u0275fac = function () {
                    let n;
                    return function (r) {
                        return (n || (n = $e(e)))(r || e)
                    }
                }(), e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["select", "formControlName", "", 3, "multiple", ""],
                        ["select", "formControl", "", 3, "multiple", ""],
                        ["select", "ngModel", "", 3, "multiple", ""]
                    ],
                    hostBindings: function (t, r) {
                        1 & t && re("change", function (i) {
                            return r.onChange(i.target.value)
                        })("blur", function () {
                            return r.onTouched()
                        })
                    },
                    inputs: {
                        compareWith: "compareWith"
                    },
                    features: [pe([ok]), ne]
                }), e
            })(),
                ww = (() => {
                    class e {
                        constructor(t, r, o) {
                            this._element = t, this._renderer = r, this._select = o, this._select && (this.id = this._select._registerOption())
                        }
                        set ngValue(t) {
                            null != this._select && (this._select._optionMap.set(this.id, t), this._setElementValue(Dw(this.id, t)), this._select.writeValue(this._select.value))
                        }
                        set value(t) {
                            this._setElementValue(t), this._select && this._select.writeValue(this._select.value)
                        }
                        _setElementValue(t) {
                            this._renderer.setProperty(this._element.nativeElement, "value", t)
                        }
                        ngOnDestroy() {
                            this._select && (this._select._optionMap.delete(this.id), this._select.writeValue(this._select.value))
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(C(_t), C(wn), C(vl, 9))
                    }, e.\u0275dir = L({
                        type: e,
                        selectors: [
                            ["option"]
                        ],
                        inputs: {
                            ngValue: "ngValue",
                            value: "value"
                        }
                    }), e
                })();
            const sk = {
                provide: dn,
                useExisting: le(() => Lf),
                multi: !0
            };

            function Ew(e, n) {
                return null == e ? `${n}` : ("string" == typeof n && (n = `'${n}'`), n && "object" == typeof n && (n = "Object"), `${e}: ${n}`.slice(0, 50))
            }
            let Lf = (() => {
                class e extends wr {
                    constructor() {
                        super(...arguments), this._optionMap = new Map, this._idCounter = 0, this._compareWith = Object.is
                    }
                    set compareWith(t) {
                        this._compareWith = t
                    }
                    writeValue(t) {
                        let r;
                        if (this.value = t, Array.isArray(t)) {
                            const o = t.map(i => this._getOptionId(i));
                            r = (i, s) => {
                                i._setSelected(o.indexOf(s.toString()) > -1)
                            }
                        } else r = (o, i) => {
                            o._setSelected(!1)
                        };
                        this._optionMap.forEach(r)
                    }
                    registerOnChange(t) {
                        this.onChange = r => {
                            const o = [],
                                i = r.selectedOptions;
                            if (void 0 !== i) {
                                const s = i;
                                for (let a = 0; a < s.length; a++) {
                                    const u = this._getOptionValue(s[a].value);
                                    o.push(u)
                                }
                            } else {
                                const s = r.options;
                                for (let a = 0; a < s.length; a++) {
                                    const l = s[a];
                                    if (l.selected) {
                                        const u = this._getOptionValue(l.value);
                                        o.push(u)
                                    }
                                }
                            }
                            this.value = o, t(o)
                        }
                    }
                    _registerOption(t) {
                        const r = (this._idCounter++).toString();
                        return this._optionMap.set(r, t), r
                    }
                    _getOptionId(t) {
                        for (const r of Array.from(this._optionMap.keys()))
                            if (this._compareWith(this._optionMap.get(r)._value, t)) return r;
                        return null
                    }
                    _getOptionValue(t) {
                        const r = function ak(e) {
                            return e.split(":")[0]
                        }(t);
                        return this._optionMap.has(r) ? this._optionMap.get(r)._value : t
                    }
                }
                return e.\u0275fac = function () {
                    let n;
                    return function (r) {
                        return (n || (n = $e(e)))(r || e)
                    }
                }(), e.\u0275dir = L({
                    type: e,
                    selectors: [
                        ["select", "multiple", "", "formControlName", ""],
                        ["select", "multiple", "", "formControl", ""],
                        ["select", "multiple", "", "ngModel", ""]
                    ],
                    hostBindings: function (t, r) {
                        1 & t && re("change", function (i) {
                            return r.onChange(i.target)
                        })("blur", function () {
                            return r.onTouched()
                        })
                    },
                    inputs: {
                        compareWith: "compareWith"
                    },
                    features: [pe([sk]), ne]
                }), e
            })(),
                bw = (() => {
                    class e {
                        constructor(t, r, o) {
                            this._element = t, this._renderer = r, this._select = o, this._select && (this.id = this._select._registerOption(this))
                        }
                        set ngValue(t) {
                            null != this._select && (this._value = t, this._setElementValue(Ew(this.id, t)), this._select.writeValue(this._select.value))
                        }
                        set value(t) {
                            this._select ? (this._value = t, this._setElementValue(Ew(this.id, t)), this._select.writeValue(this._select.value)) : this._setElementValue(t)
                        }
                        _setElementValue(t) {
                            this._renderer.setProperty(this._element.nativeElement, "value", t)
                        }
                        _setSelected(t) {
                            this._renderer.setProperty(this._element.nativeElement, "selected", t)
                        }
                        ngOnDestroy() {
                            this._select && (this._select._optionMap.delete(this.id), this._select.writeValue(this._select.value))
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)(C(_t), C(wn), C(Lf, 9))
                    }, e.\u0275dir = L({
                        type: e,
                        selectors: [
                            ["option"]
                        ],
                        inputs: {
                            ngValue: "ngValue",
                            value: "value"
                        }
                    }), e
                })(),
                mk = (() => {
                    class e { }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275mod = Lt({
                        type: e
                    }), e.\u0275inj = Mt({
                        imports: [gw]
                    }), e
                })(),
                vk = (() => {
                    class e {
                        static withConfig(t) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: xo,
                                    useValue: t.callSetDisabledState ?? fl
                                }]
                            }
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275mod = Lt({
                        type: e
                    }), e.\u0275inj = Mt({
                        imports: [mk]
                    }), e
                })();

            function _k(e, n) {
                if (1 & e && (A(0, "label"), K(1), I()), 2 & e) {
                    const t = Fe();
                    x(1), Dt(t.label)
                }
            }

            function Ck(e, n) {
                if (1 & e && (A(0, "option", 4), K(1), I()), 2 & e) {
                    const t = n.$implicit;
                    q("value", n.index), x(1), Dt(t.text)
                }
            }
            let Fw = (() => {
                class e {
                    constructor() {
                        this.options = [], this.label = "", this.selectFirst = !1, this.placeholder = "Choose option", this.optionChangeEvent = new ue, this.selectedValue = "", this.selectedObject = {
                            text: "",
                            value: {}
                        }
                    }
                    ngOnInit() {
                        this.options && this.selectFirst && (this.selectedValue = 0, this.onChange(this.selectedValue))
                    }
                    onChange(t) {
                        this.selectedObject = this.options[this.selectedValue], this.optionChangeEvent.emit(this.selectedObject)
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275cmp = kt({
                    type: e,
                    selectors: [
                        ["app-drop-down"]
                    ],
                    inputs: {
                        options: "options",
                        label: "label",
                        selectFirst: "selectFirst",
                        placeholder: "placeholder"
                    },
                    outputs: {
                        optionChangeEvent: "optionChangeEvent"
                    },
                    decls: 5,
                    vars: 4,
                    consts: [
                        [4, "ngIf"],
                        ["name", "options", 3, "ngModel", "ngModelChange"],
                        ["value", "", "selected", "", "disabled", ""],
                        [3, "value", 4, "ngFor", "ngForOf"],
                        [3, "value"]
                    ],
                    template: function (t, r) {
                        1 & t && (Ve(0, _k, 2, 1, "label", 0), A(1, "select", 1), re("ngModelChange", function (i) {
                            return r.selectedValue = i
                        })("ngModelChange", function (i) {
                            return r.onChange(i)
                        }), A(2, "option", 2), K(3), I(), Ve(4, Ck, 2, 2, "option", 3), I()), 2 & t && (q("ngIf", r.label.length), x(1), q("ngModel", r.selectedValue), x(2), Dt(r.placeholder), x(1), q("ngForOf", r.options))
                    },
                    dependencies: [Sa, Si, ww, bw, vl, Df, yl],
                    styles: ["label[_ngcontent-%COMP%]{margin-right:5px}select[_ngcontent-%COMP%]{margin-right:40px}"]
                }), e
            })();
            const Dk = ["tablaA1"],
                wk = ["tablaA2"],
                Ek = ["tablaB1"],
                bk = ["tablaB2"];

            function Sk(e, n) {
                if (1 & e) {
                    const t = cr();
                    A(0, "button", 14), re("click", function () {
                        return yn(t), vn(Fe().newGame())
                    }), K(1, "New Game"), I()
                }
            }

            function Mk(e, n) {
                if (1 & e) {
                    const t = cr();
                    A(0, "button", 14), re("click", function () {
                        return yn(t), vn(Fe().startGame())
                    }), K(1, "Start"), I()
                }
            }

            function Ik(e, n) {
                if (1 & e) {
                    const t = cr();
                    A(0, "button", 14), re("click", function () {
                        return yn(t), vn(Fe().stopGame())
                    }), K(1, "Stop"), I()
                }
            }

            function Ak(e, n) {
                1 & e && io(0)
            }

            function Tk(e, n) {
                1 & e && io(0)
            }

            function xk(e, n) {
                1 & e && io(0)
            }

            function Rk(e, n) {
                1 & e && io(0)
            }

            function Ok(e, n) {
                if (1 & e && (A(0, "div")(1, "table", 20)(2, "thead")(3, "th"), K(4, "Total Jocuri"), I(), A(5, "th"), K(6), I(), A(7, "th"), K(8), I()(), A(9, "tbody")(10, "tr")(11, "td"), K(12), I(), A(13, "td"), K(14), I(), A(15, "td"), K(16), I()()()()()), 2 & e) {
                    const t = Fe(2);
                    x(6), Rt("Castiga ", t.apiOptionA.text, ""), x(2), Rt("Castiga ", t.apiOptionB.text, ""), x(4), Rt(" ", t.games.A1.count + t.games.A2.count + t.games.B1.count + t.games.B2.count, " "), x(2), Rt(" ", t.apiWins.A, " "), x(2), Rt(" ", t.apiWins.B, " ")
                }
            }
            const _l = function (e) {
                return {
                    game: e
                }
            };

            function Nk(e, n) {
                if (1 & e && (A(0, "div", 15)(1, "div", 16)(2, "div", 17), Ve(3, Ak, 1, 0, "ng-container", 18), I(), A(4, "div", 17), Ve(5, Tk, 1, 0, "ng-container", 18), I(), A(6, "div", 17), Ve(7, xk, 1, 0, "ng-container", 18), I(), A(8, "div", 17), Ve(9, Rk, 1, 0, "ng-container", 18), I()(), Ve(10, Ok, 17, 5, "div", 19), I()), 2 & e) {
                    const t = Fe(),
                        r = function dm(e) {
                            return Or(function nb() {
                                return j.lFrame.contextLView
                            }(), he + e)
                        }(24);
                    x(3), q("ngTemplateOutlet", r)("ngTemplateOutletContext", yi(9, _l, t.games.A1)), x(2), q("ngTemplateOutlet", r)("ngTemplateOutletContext", yi(11, _l, t.games.A2)), x(2), q("ngTemplateOutlet", r)("ngTemplateOutletContext", yi(13, _l, t.games.B1)), x(2), q("ngTemplateOutlet", r)("ngTemplateOutletContext", yi(15, _l, t.games.B2)), x(1), q("ngIf", t.games.A1 && t.games.A2 && t.games.B1 && t.games.B2)
                }
            }

            function Fk(e, n) {
                if (1 & e && (A(0, "table", 21)(1, "thead")(2, "th"), K(3, "Total jocuri"), I(), A(4, "th"), K(5), I(), A(6, "th"), K(7), I(), A(8, "th"), K(9), I(), A(10, "th"), K(11), I()(), A(12, "tbody")(13, "tr")(14, "td"), K(15), I(), A(16, "td"), K(17), I(), A(18, "td"), K(19), I(), A(20, "td"), K(21), I(), A(22, "td"), K(23), I()()()()), 2 & e) {
                    const t = n.game;
                    x(5), Rt("Castiga ", t.x.text, " (X)"), x(2), Rt("Castiga ", t.o.text, " (O)"), x(2), Rt("Finalizate cu eroare (", t.x.text, " a mutat eronat)"), x(2), Rt("Finalizate cu eroare (", t.o.text, " a mutat eronat)"), x(4), Dt(t.count), x(2), Dt(t.win.x), x(2), Dt(t.win.o), x(2), Dt(t.error.x), x(2), Dt(t.error.o)
                }
            }
            var bt = (() => {
                return (e = bt || (bt = {}))[e.X_WIN = 0] = "X_WIN", e[e.O_WIN = 1] = "O_WIN", e[e.X_ERROR = 2] = "X_ERROR", e[e.O_ERROR = 3] = "O_ERROR", e[e.TABLE_ERROR = 4] = "TABLE_ERROR", bt;
                var e
            })(),
                Pt = (() => {
                    return (e = Pt || (Pt = {})).A1 = "A1", e.A2 = "A2", e.B1 = "B1", e.B2 = "B2", Pt;
                    var e
                })();
            let Pk = (() => {
                class e {
                    constructor(t) {
                        this.gameService = t, this.gameOptions = [], this.columns = 0, this.rows = 0, this.styleClass = "", this.tableTitleA = "", this.tableTitleB = "", this.isGameRunning = !1, this.isArenaVisible = !0, this.gameTableEnum = Pt, this.games = {}, this.apiWins = {
                            A: 0,
                            B: 0
                        }, this.gameOptions = uD, this.rows = 5, this.columns = 5
                    }
                    onChangeGameOption(t) {
                        this.columns = t.value.cols, this.rows = t.value.rows, this.initStyleClass()
                    }
                    onChangeApiOptionA(t) {
                        this.apiOptionA = t, this.showTableTitle()
                    }
                    onChangeApiOptionB(t) {
                        this.apiOptionB = t, this.showTableTitle()
                    }
                    showTableTitle() {
                        this.tableTitleA && this.tableTitleB ? (this.tableTitleA = "X=" + this.apiOptionA.text + ", O=" + this.apiOptionB.text, this.tableTitleB = "X=" + this.apiOptionB.text + ", O=" + this.apiOptionA.text) : (this.tableTitleA = " ", this.tableTitleB = " ")
                    }
                    createGame(t, r, o) {
                        const i = {
                            x: t,
                            o: r,
                            table: o,
                            count: 0,
                            win: {
                                x: 0,
                                o: 0
                            },
                            error: {
                                x: 0,
                                o: 0
                            },
                            get computedResult() {
                                return `Total=${this.count}, X=${this.win.x}, O=${this.win.o}, ErrX=${this.error.x}, ErrO=${this.error.o}`
                            }
                        };
                        return i.table.setClickDisabled(), i
                    }
                    startGame() {
                        var t = this;
                        return So(function* () {
                            if (!t.apiOptionA || !t.apiOptionB) return void t.gameService.sendAlert("Trebuie sa alegeti API-urile mai intai.");
                            t.isGameRunning = !0, t.isArenaVisible = !0, t.games = {};
                            const r = t.createGame(t.apiOptionA, t.apiOptionB, t.tablaDeJocComponentA1),
                                o = t.createGame(t.apiOptionA, t.apiOptionB, t.tablaDeJocComponentA2),
                                i = t.createGame(t.apiOptionB, t.apiOptionA, t.tablaDeJocComponentB1),
                                s = t.createGame(t.apiOptionB, t.apiOptionA, t.tablaDeJocComponentB2);
                            t.games[Pt.A1] = r, t.games[Pt.A2] = o, t.games[Pt.B1] = i, t.games[Pt.B2] = s, Object.keys(t.games).forEach(function () {
                                var a = So(function* (l, u) {
                                    let c = t.games[l];
                                    if (!c) return;
                                    const d = c;
                                    let f = 0;
                                    for (; t.isGameRunning;) try {
                                        f++;
                                        const h = "game-" + u;
                                        console.log(h, "mutarea " + f), console.log(h, "api moveX - start"), yield t.apiMoveX(d.table, d.x.value.endpoint), console.log(h, "api moveX - end"), console.log(h, "api moveO - start"), yield t.apiMoveO(d.table, d.o.value.endpoint), console.log(h, "api moveO - end")
                                    } catch (h) {
                                        switch (h) {
                                            case bt.X_WIN:
                                                console.log("X - win"), d.win.x += 1;
                                                break;
                                            case bt.O_WIN:
                                                console.log("O - win"), d.win.o += 1;
                                                break;
                                            case bt.X_ERROR:
                                                console.log("X - error"), d.error.x += 1;
                                                break;
                                            case bt.O_ERROR:
                                                console.log("O - error"), d.error.o += 1;
                                                break;
                                            default:
                                                console.log("other error", h)
                                        }
                                        d.count += 1, d.table.initCells()
                                    }
                                });
                                return function (l, u) {
                                    return a.apply(this, arguments)
                                }
                            }())
                        })()
                    }
                    stopGame() {
                        Object.keys(this.games).length && (console.log("jocul s-a terminat"), this.isGameRunning = !1, this.isArenaVisible = !1, this.calculateWinsPerAPI())
                    }
                    initStyleClass() {
                        this.rows === this.columns && (this.styleClass = "is-square"), this.rows > this.columns && (this.styleClass = "is-vertical"), this.rows < this.columns && (this.styleClass = "is-horizontal")
                    }
                    apiMove(t, r, o) {
                        var i = this;
                        return So(function* () {
                            const s = yield i.gameService.performAPIRequest(r, t.getEncoded());
                            let l;
                            switch (i.gameService.parseApiResponse(s)) {
                                case He.NOT_EXIST:
                                    throw console.log("APIResponseEvent.NOT_EXIST", s), l = "x" === o ? bt.O_WIN : bt.X_WIN, l;
                                case He.FINAL:
                                    const u = i.gameService.extractNumber(s);
                                    throw console.log("APIResponseEvent.FINAL", s, u), "x" == o ? t.moveX(u) : t.moveO(u), yield i.gameService.fakeDelay(150), l = "x" === o ? bt.X_WIN : bt.O_WIN, l;
                                case He.TABLE_ERROR:
                                    throw console.log("APIResponseEvent.TABLE_ERROR", s), l = "x" === o ? bt.O_ERROR : bt.X_ERROR, l;
                                case He.MOVE:
                                    console.log("APIResponseEvent.MOVE", s), "x" == o ? t.moveX(s) : t.moveO(s)
                            }
                        })()
                    }
                    apiMoveX(t, r) {
                        return this.apiMove(t, r, "x")
                    }
                    apiMoveO(t, r) {
                        return this.apiMove(t, r, "o")
                    }
                    newGame() {
                        this.games = {}, this.isArenaVisible = !0
                    }
                    calculateWinsPerAPI() {
                        var t = this;
                        let r = {
                            A: 0,
                            B: 0
                        };
                        Object.keys(this.games).forEach(function () {
                            var o = So(function* (i, s) {
                                let a = t.games[i];
                                if (!a) return;
                                const u = a.win.x,
                                    c = a.win.o;
                                switch (i) {
                                    case Pt.A1:
                                    case Pt.A2:
                                        r.A += u, r.B += c;
                                        break;
                                    case Pt.B1:
                                    case Pt.B2:
                                        r.A += c, r.B += u
                                }
                            });
                            return function (i, s) {
                                return o.apply(this, arguments)
                            }
                        }()), this.apiWins = r
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(ID))
                }, e.\u0275cmp = kt({
                    type: e,
                    selectors: [
                        ["app-arena"]
                    ],
                    viewQuery: function (t, r) {
                        if (1 & t && (co(Dk, 5), co(wk, 5), co(Ek, 5), co(bk, 5)), 2 & t) {
                            let o;
                            hr(o = pr()) && (r.tablaDeJocComponentA1 = o.first), hr(o = pr()) && (r.tablaDeJocComponentA2 = o.first), hr(o = pr()) && (r.tablaDeJocComponentB1 = o.first), hr(o = pr()) && (r.tablaDeJocComponentB2 = o.first)
                        }
                    },
                    decls: 25,
                    vars: 35,
                    consts: [
                        ["label", "Format tabela", "placeholder", "Alege format tabla", 3, "selectFirst", "options", "optionChangeEvent"],
                        ["label", "A", "placeholder", "Alege API", 3, "options", "optionChangeEvent"],
                        ["label", "B", "placeholder", "Alege API", 3, "options", "optionChangeEvent"],
                        [3, "click", 4, "ngIf"],
                        ["class", "results-container", 4, "ngIf"],
                        [1, "container", 3, "hidden"],
                        [1, "master-wrapper"],
                        [1, "wrapper-arena", 3, "ngClass"],
                        [3, "title", "subtitle", "columns", "rows", "styleClass"],
                        ["tablaA1", ""],
                        ["tablaA2", ""],
                        ["tablaB1", ""],
                        ["tablaB2", ""],
                        ["gameResults", ""],
                        [3, "click"],
                        [1, "results-container"],
                        [1, "results-block"],
                        [1, "result-item"],
                        [4, "ngTemplateOutlet", "ngTemplateOutletContext"],
                        [4, "ngIf"],
                        [1, "results", "margin-auto"],
                        [1, "results"]
                    ],
                    template: function (t, r) {
                        1 & t && (A(0, "p"), K(1, "Aici afisez Arena API-contra-API! Fie ca cel mai bun API sa castige!"), I(), A(2, "app-drop-down", 0), re("optionChangeEvent", function (i) {
                            return r.onChangeGameOption(i)
                        }), I(), A(3, "app-drop-down", 1), re("optionChangeEvent", function (i) {
                            return r.onChangeApiOptionA(i)
                        }), ta(4, "async"), I(), A(5, "app-drop-down", 2), re("optionChangeEvent", function (i) {
                            return r.onChangeApiOptionB(i)
                        }), ta(6, "async"), I(), Ve(7, Sk, 2, 0, "button", 3), Ve(8, Mk, 2, 0, "button", 3), Ve(9, Ik, 2, 0, "button", 3), Ve(10, Nk, 11, 17, "div", 4), A(11, "div", 5)(12, "div", 6)(13, "div", 7), jn(14, "app-tabla-de-joc", 8, 9)(16, "app-tabla-de-joc", 8, 10), I(), A(18, "div", 7), jn(19, "app-tabla-de-joc", 8, 11)(21, "app-tabla-de-joc", 8, 12), I()()(), Ve(23, Fk, 24, 9, "ng-template", null, 13, nv)), 2 & t && (x(2), q("selectFirst", !1)("options", r.gameOptions), x(1), q("options", na(4, 31, r.gameService.apiArenaOptions$)), x(2), q("options", na(6, 33, r.gameService.apiArenaOptions$)), x(2), q("ngIf", !r.isArenaVisible), x(1), q("ngIf", !r.isGameRunning && r.isArenaVisible), x(1), q("ngIf", r.isArenaVisible), x(1), q("ngIf", !r.isGameRunning && !r.isArenaVisible), x(1), q("hidden", !r.isArenaVisible), x(2), q("ngClass", r.styleClass), x(1), q("title", r.tableTitleA)("subtitle", r.games.A1 ? r.games.A1.computedResult : "")("columns", r.columns)("rows", r.rows)("styleClass", r.styleClass), x(2), q("title", r.tableTitleA)("subtitle", r.games.A2 ? r.games.A2.computedResult : "")("columns", r.columns)("rows", r.rows)("styleClass", r.styleClass), x(2), q("ngClass", r.styleClass), x(1), q("title", r.tableTitleB)("subtitle", r.games.B1 ? r.games.B1.computedResult : "")("columns", r.columns)("rows", r.rows)("styleClass", r.styleClass), x(2), q("title", r.tableTitleB)("subtitle", r.games.B2 ? r.games.B2.computedResult : "")("columns", r.columns)("rows", r.rows)("styleClass", r.styleClass))
                    },
                    dependencies: [ba, Si, m_, TD, Fw, yd],
                    styles: [".container[_ngcontent-%COMP%]{height:calc(100vh - 180px);max-width:calc(100vh - 40px);margin:0 auto}.master-wrapper[_ngcontent-%COMP%]{display:flex;height:100%;justify-content:center}.wrapper-arena[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin:0 auto;flex-grow:1;width:100%}.wrapper-arena.is-square[_ngcontent-%COMP%]{max-width:calc(100vh - 180px)}button[_ngcontent-%COMP%]{margin-left:10px}table.results[_ngcontent-%COMP%], .results[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .results[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid black;border-collapse:collapse;padding:5px}table.results[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#ebecf0}.results-container[_ngcontent-%COMP%]{display:flex;flex-direction:column}.results-block[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;padding:30px 30px 0;justify-content:space-around}.results-block[_ngcontent-%COMP%]   .result-item[_ngcontent-%COMP%]{width:40%;margin-bottom:50px}.margin-auto[_ngcontent-%COMP%]{margin:0 auto}"]
                }), e
            })();

            function kk(e, n) {
                if (1 & e) {
                    const t = cr();
                    A(0, "div")(1, "input", 5), re("ngModelChange", function (o) {
                        return yn(t), vn(Fe().selectedValue = o)
                    })("ngModelChange", function (o) {
                        return yn(t), vn(Fe().onItemChange(o))
                    }), I(), A(2, "label"), K(3), I()()
                }
                if (2 & e) {
                    const t = n.$implicit,
                        r = n.index,
                        o = Fe();
                    x(1), q("value", r)("ngModel", o.selectedValue), x(2), Dt(t.text)
                }
            }
            let Lk = (() => {
                class e {
                    constructor() {
                        this.closeModalEvent = new ue, this.optionChangeEvent = new ue, this.options = [], this.isVisible = !0, this.selectedValue = "", this.selectedObject = {
                            text: "",
                            value: ""
                        }
                    }
                    ngOnInit() {
                        this.options && (this.selectedValue = 0, this.onItemChange(this.selectedValue))
                    }
                    closeModal() {
                        this.closeModalEvent.emit(), this.optionChangeEvent.emit(this.selectedObject)
                    }
                    sendPlayer() {
                        this.closeModalEvent.emit(), this.optionChangeEvent.emit(this.selectedObject)
                    }
                    onItemChange(t) {
                        this.selectedObject = this.options[this.selectedValue]
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275cmp = kt({
                    type: e,
                    selectors: [
                        ["app-modal"]
                    ],
                    inputs: {
                        options: "options"
                    },
                    outputs: {
                        closeModalEvent: "closeModalEvent",
                        optionChangeEvent: "optionChangeEvent"
                    },
                    decls: 9,
                    vars: 1,
                    consts: [
                        [1, "modal-container"],
                        [1, "modal-content"],
                        [1, "close", 3, "click"],
                        [4, "ngFor", "ngForOf"],
                        [3, "click"],
                        ["type", "radio", "name", "first-move", 3, "value", "ngModel", "ngModelChange"]
                    ],
                    template: function (t, r) {
                        1 & t && (A(0, "div", 0)(1, "div", 1)(2, "span", 2), re("click", function () {
                            return r.closeModal()
                        }), K(3, "\xd7"), I(), A(4, "p"), K(5, "Cine muta primul?"), I(), Ve(6, kk, 4, 3, "div", 3), A(7, "button", 4), re("click", function () {
                            return r.sendPlayer()
                        }), K(8, "Trimite"), I()()()), 2 & t && (x(6), q("ngForOf", r.options))
                    },
                    dependencies: [Sa, sl, Nf, Df, yl],
                    styles: [".modal-container[_ngcontent-%COMP%]{position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;background-color:#000;background-color:#0006}.modal-content[_ngcontent-%COMP%]{background-color:#f0f0f5;margin:10% auto;padding:20px;border:2px solid cornflowerblue;width:30%}.close[_ngcontent-%COMP%]{color:#dc143c;float:right;font-size:28px;font-weight:700}.close[_ngcontent-%COMP%]:hover, .close[_ngcontent-%COMP%]:focus{color:#000;text-decoration:none;cursor:pointer}input[_ngcontent-%COMP%], label[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{margin:10px}"]
                }), e
            })();
            const Vk = ["tabla0"];

            function jk(e, n) {
                if (1 & e) {
                    const t = cr();
                    A(0, "div")(1, "app-modal", 9), re("closeModalEvent", function () {
                        return yn(t), vn(Fe().isModalVisible = !1)
                    })("optionChangeEvent", function (o) {
                        return yn(t), vn(Fe().onChangePlayerOption(o))
                    }), I()()
                }
                if (2 & e) {
                    const t = Fe();
                    x(1), q("options", t.playerOptions)
                }
            }
            let Pw = (() => {
                class e {
                    constructor(t, r) {
                        this.apiService = t, this.gameService = r, this.gameOptions = [], this.playerOptions = [], this.columns = 0, this.rows = 0, this.styleClass = "", this.apiEndpoint = "", this.isModalVisible = !1, this.gameOptions = uD, this.playerOptions = cD, this.rows = 5, this.columns = 5, this.firstPlayer = cD[0], this.initStyleClass()
                    }
                    onNewGame() {
                        this.tablaDeJocComponent.initCells(), this.isModalVisible = !0
                    }
                    onChangeGameOption(t) {
                        this.columns = t.value.cols, this.rows = t.value.rows, this.initStyleClass()
                    }
                    onChangePlayerOption(t) {
                        var r = this;
                        return So(function* () {
                            if (r.firstPlayer = t, console.log("cine muta primul: ", r.firstPlayer.text), "x" === t.value) r.tablaDeJocComponent.setClientFirst(!0);
                            else {
                                r.tablaDeJocComponent.setClientFirst(!1), r.tablaDeJocComponent.isLoading = !0;
                                const o = yield r.performAPIRequest(r.apiEndpoint, r.tablaDeJocComponent.getEncoded());
                                switch (r.gameService.parseApiResponse(o)) {
                                    case He.FINAL:
                                        const s = r.gameService.extractNumber(o);
                                        r.tablaDeJocComponent.moveX(s);
                                        const [a, l] = r.tablaDeJocComponent.parsePos(s);
                                        r.tablaDeJocComponent.markMoveSuccess(a, l), r.gameService.declareWinAPI(), r.tablaDeJocComponent.setGameCompleted();
                                        break;
                                    case He.MOVE:
                                        const u = r.gameService.extractNumber(o);
                                        r.tablaDeJocComponent.completeTransitions(), r.tablaDeJocComponent.moveX(u);
                                        const [c, d] = r.tablaDeJocComponent.parsePos(u);
                                        r.tablaDeJocComponent.markMoveSuccess(c, d), r.tablaDeJocComponent.isLoading = !1;
                                        break;
                                    default:
                                        r.gameService.sendAlert("Raspuns API invalid sau ambiguu.")
                                }
                            }
                        })()
                    }
                    onTableEvent(t) {
                        var r = this;
                        return So(function* () {
                            const o = t.event;
                            if (o === Dr.CELL_CLICK) {
                                console.log("TableEvents.CELL_CLICK"), r.tablaDeJocComponent.isLoading = !0, r.tablaDeJocComponent.markTransitionStart(t.rowIndex, t.columnIndex), r.tablaDeJocComponent.markTransitionCellStart(t.rowIndex, t.columnIndex);
                                const i = yield r.performAPIRequest(r.apiEndpoint, t.encoded);
                                switch (r.gameService.parseApiResponse(i)) {
                                    case He.NOT_EXIST:
                                        console.log("APIResponseEvent.NOT_EXIST", i), r.tablaDeJocComponent.completeTransitions(), r.tablaDeJocComponent.markTransitionEnd(t.rowIndex, t.columnIndex), r.tablaDeJocComponent.markTransitionCellEnd(t.rowIndex, t.columnIndex), r.gameService.declareWinClient(), r.tablaDeJocComponent.setGameCompleted();
                                        break;
                                    case He.FINAL:
                                        const a = r.gameService.extractNumber(i);
                                        console.log("APIResponseEvent.FINAL", i, a), r.tablaDeJocComponent.completeTransitions(), r.tablaDeJocComponent.markTransitionEnd(t.rowIndex, t.columnIndex), r.tablaDeJocComponent.markTransitionCellEnd(t.rowIndex, t.columnIndex), "x" === r.firstPlayer.value ? r.tablaDeJocComponent.moveO(a) : r.tablaDeJocComponent.moveX(a);
                                        const [l, u] = r.tablaDeJocComponent.parsePos(i);
                                        r.tablaDeJocComponent.markMoveSuccess(l, u), r.tablaDeJocComponent.pauseAnimation(l, u), r.tablaDeJocComponent.continueAnimation(l, u), r.gameService.declareWinAPI(), r.tablaDeJocComponent.setGameCompleted();
                                        break;
                                    case He.TABLE_ERROR:
                                        console.log("APIResponseEvent.TABLE_ERROR", i), r.tablaDeJocComponent.cancelTransitions(), r.tablaDeJocComponent.markMoveError(t.rowIndex, t.columnIndex);
                                        break;
                                    case He.MOVE:
                                        console.log("APIResponseEvent.MOVE", i), r.tablaDeJocComponent.completeTransitions(), r.tablaDeJocComponent.markTransitionEnd(t.rowIndex, t.columnIndex), r.tablaDeJocComponent.markTransitionCellEnd(t.rowIndex, t.columnIndex), "x" === r.firstPlayer.value ? r.tablaDeJocComponent.moveO(i) : r.tablaDeJocComponent.moveX(i);
                                        const [c, d] = r.tablaDeJocComponent.parsePos(i);
                                        r.tablaDeJocComponent.markMoveSuccess(c, d);
                                        break;
                                    default:
                                        r.gameService.sendAlert("Raspuns API invalid sau ambiguu.")
                                }
                                r.tablaDeJocComponent.markTransitionEnd(t.rowIndex, t.columnIndex), r.tablaDeJocComponent.markTransitionCellEnd(t.rowIndex, t.columnIndex), r.tablaDeJocComponent.isLoading = !1
                            } else o === Dr.FINAL_MOVE && console.log("TableEvents.FINAL_MOVE")
                        })()
                    }
                    onChangeAPIOption(t) {
                        console.log("api option change", t), this.apiEndpoint = t.value.endpoint
                    }
                    initStyleClass() {
                        this.rows === this.columns && (this.styleClass = "is-square"), this.rows > this.columns && (this.styleClass = "is-vertical"), this.rows < this.columns && (this.styleClass = "is-horizontal")
                    }
                    performAPIRequest(t, r) {
                        return new Promise((o, i) => {
                            this.apiService.apiRequest(t, r).pipe().subscribe({
                                next: s => o(s),
                                error: s => {
                                    console.log("api error", s), this.gameService.sendAlert("Conectarea la API a esuat."), i(s)
                                }
                            })
                        })
                    }
                }
                return e.\u0275fac = function (t) {
                    return new (t || e)(C(MD), C(ID))
                }, e.\u0275cmp = kt({
                    type: e,
                    selectors: [
                        ["app-joc"]
                    ],
                    viewQuery: function (t, r) {
                        if (1 & t && co(Vk, 5), 2 & t) {
                            let o;
                            hr(o = pr()) && (r.tablaDeJocComponent = o.first)
                        }
                    },
                    decls: 11,
                    vars: 11,
                    consts: [
                        ["label", "Format tabela", "placeholder", "Alege format tabla", 3, "selectFirst", "options", "optionChangeEvent"],
                        ["label", "API joc", "placeholder", "Alege API", 3, "selectFirst", "options", "optionChangeEvent"],
                        [3, "click"],
                        [4, "ngIf"],
                        [1, "container-joc"],
                        [1, "master-wrapper-joc"],
                        [1, "wrapper-joc", 3, "ngClass"],
                        [3, "columns", "rows", "styleClass", "tableEvent"],
                        ["tabla0", ""],
                        [3, "options", "closeModalEvent", "optionChangeEvent"]
                    ],
                    template: function (t, r) {
                        1 & t && (A(0, "app-drop-down", 0), re("optionChangeEvent", function (i) {
                            return r.onChangeGameOption(i)
                        }), I(), A(1, "app-drop-down", 1), re("optionChangeEvent", function (i) {
                            return r.onChangeAPIOption(i)
                        }), ta(2, "async"), I(), A(3, "button", 2), re("click", function () {
                            return r.onNewGame()
                        }), K(4, "Joc Nou"), I(), Ve(5, jk, 2, 1, "div", 3), A(6, "div", 4)(7, "div", 5)(8, "div", 6)(9, "app-tabla-de-joc", 7, 8), re("tableEvent", function (i) {
                            return r.onTableEvent(i)
                        }), I()()()()), 2 & t && (q("selectFirst", !1)("options", r.gameOptions), x(1), q("selectFirst", !0)("options", na(2, 9, r.gameService.apiOptions$)), x(4), q("ngIf", r.isModalVisible), x(3), q("ngClass", r.styleClass), x(1), q("columns", r.columns)("rows", r.rows)("styleClass", r.styleClass))
                    },
                    dependencies: [ba, Si, TD, Fw, Lk, yd],
                    styles: [".container-joc[_ngcontent-%COMP%]{height:calc(100vh - 180px);max-width:100vh;margin:0 auto}.master-wrapper-joc[_ngcontent-%COMP%]{display:flex;height:100%;justify-content:center}.wrapper-joc[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin:0 auto;flex-grow:1}"]
                }), e
            })();
            const Bk = [{
                path: "joc",
                component: Pw
            }, {
                path: "arena",
                component: Pk
            }, {
                path: "analiza",
                component: LP
            }, {
                path: "**",
                component: Pw
            }];
            let $k = (() => {
                class e { }
                return e.\u0275fac = function (t) {
                    return new (t || e)
                }, e.\u0275mod = Lt({
                    type: e
                }), e.\u0275inj = Mt({
                    imports: [sD.forRoot(Bk), sD]
                }), e
            })(),
                Uk = (() => {
                    class e { }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275cmp = kt({
                        type: e,
                        selectors: [
                            ["app-meniu-aplicatie"]
                        ],
                        decls: 12,
                        vars: 0,
                        consts: [
                            [1, "menu-container"],
                            [1, "title"],
                            ["routerLink", "joc", "routerLinkActive", "active"],
                            ["routerLink", "arena", "routerLinkActive", "active"],
                            ["routerLink", "analiza", "routerLinkActive", "active"],
                            [1, "component-container"]
                        ],
                        template: function (t, r) {
                            1 & t && (A(0, "div", 0)(1, "div", 1), K(2, "Obstruct!"), I(), A(3, "ul")(4, "li", 2), K(5, "Joc contra calculatorului"), I(), A(6, "li", 3), K(7, "Arena API-contra-API"), I(), A(8, "li", 4), K(9, "Analiza joc"), I()()(), A(10, "div", 5), jn(11, "router-outlet"), I())
                        },
                        dependencies: [qd, el, YC],
                        styles: [".menu-container[_ngcontent-%COMP%]{background-color:#6495ed;padding:10px}.title[_ngcontent-%COMP%]{font-size:30px;font-weight:700;margin-bottom:10px}ul[_ngcontent-%COMP%]{list-style-type:none;margin:0;padding:0}li[_ngcontent-%COMP%]{display:inline;font-size:20px;margin-right:20px}li[_ngcontent-%COMP%]:hover{cursor:pointer}.active[_ngcontent-%COMP%]{font-weight:700}.component-container[_ngcontent-%COMP%]{margin:10px}"]
                    }), e
                })(),
                Hk = (() => {
                    class e {
                        constructor() {
                            this.title = "obstruct"
                        }
                    }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275cmp = kt({
                        type: e,
                        selectors: [
                            ["app-root"]
                        ],
                        decls: 1,
                        vars: 0,
                        template: function (t, r) {
                            1 & t && jn(0, "app-meniu-aplicatie")
                        },
                        dependencies: [Uk]
                    }), e
                })(),
                Gk = (() => {
                    class e { }
                    return e.\u0275fac = function (t) {
                        return new (t || e)
                    }, e.\u0275mod = Lt({
                        type: e,
                        bootstrap: [Hk]
                    }), e.\u0275inj = Mt({
                        imports: [KO, $k, vk, p1]
                    }), e
                })();
            XO().bootstrapModule(Gk).catch(e => console.error(e))
        }
    },
    se => {
        se(se.s = 91)
    }
]);