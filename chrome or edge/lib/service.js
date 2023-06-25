'use strict';
const CATEGORIES = [
        'aggressive',
        'alcohol',
        'dating',
        'downloads',
        'drugs',
        'gamble',
        'hacking',
        'movies',
        'music',
        'politics',
        'shopping',
        'socialnet',
        'spyware',
        'violence',
        'weapons',
        'porn'
    ], INITIAL_STORAGE = {
        'isAppWorking': !![],
        'categories': [],
        'whiteList': [],
        'blockedDomains': [],
        'blockedWords': [],
        'scheduledDomains': [],
        'cache': {}
    };
class Background {
    constructor() {
        this['isAppWorking'] = !![], this['categories'] = [], this['whiteList'] = null, this['blockedDomains'] = null, this['blockedWords'] = null, this['scheduledDomains'] = null, this['cache'] = null, this['initStorage']();
    }
    ['initStorage']() {
        chrome['storage']['local']['get'](a => {
            this['scheduledDomains'] = null == a['scheduledDomains'] ? INITIAL_STORAGE['scheduledDomains'] : a['scheduledDomains'], this['categories'] = null == a['categories'] ? INITIAL_STORAGE['categories'] : a['categories'], this['isAppWorking'] = null == a['isAppWorking'] ? INITIAL_STORAGE['isAppWorking'] : a['isAppWorking'], this['whiteList'] = null == a['whiteList'] ? INITIAL_STORAGE['whiteList'] : a['whiteList'], this['blockedDomains'] = null == a['blockedDomains'] ? INITIAL_STORAGE['blockedDomains'] : a['blockedDomains'], this['cache'] = null == a['cache'] ? INITIAL_STORAGE['cache'] : a['cache'], null == a['blockedWords'] ? (this['blockedWords'] = INITIAL_STORAGE['blockedWords'], chrome['storage']['local']['set']({
                'scheduledDomains': this['scheduledDomains'],
                'categories': this['categories'],
                'isAppWorking': this['isAppWorking'],
                'whiteList': this['whiteList'],
                'blockedDomains': this['blockedDomains'],
                'blockedWords': this['blockedWords']
            }, function () {
            })) : this['blockedWords'] = a['blockedWords'], this['initListeners'](), this['initWebRequestListeners']();
        });
    }
    ['initListeners']() {
        chrome['storage']['onChanged']['addListener'](a => {
            let c = Object['keys'](a)[0];
            this[c] = a[c]['newValue'];
        });
    }
    async ['redirect'](a) {
        chrome['tabs']['remove'](a), chrome['tabs']['create']({ 'url': '/data/interface/redirect.html' });
    }
    ['initWebRequestListeners']() {
        chrome['webRequest']['onBeforeRequest']['addListener'](d => {
            const g = d['tabId'];
            if (!g)
                return;
            if ('main_frame' != d['type'])
                return;
            if (d['url'] == chrome['runtime']['getURL']('/data/interface/redirect.html'))
                return;
            if (!this['isAppWorking'])
                return;
            let h = ![];
            if (this['whiteList']['forEach'](m => {
                    -1 != d['url']['indexOf'](m) && (h = !![]);
                }), h)
                return;
            let i = ![];
            if (this['blockedWords']['forEach'](m => {
                    -1 != d['url']['indexOf'](m) && (i = !![]);
                }), i)
                return void this['redirect'](g);
            let j, k = ![];
            if (this['scheduledDomains']['forEach']((m, n) => {
                    -1 != d['url']['indexOf'](m['domain']) && (k = !![], j = n);
                }), k) {
                const m = this['blockScheduledDomain'](this['scheduledDomains'][j]);
                return m ? void this['redirect'](g) : void 0;
            }
            let l = ![];
            if (this['blockedDomains']['forEach'](n => {
                    -1 != d['url']['indexOf'](n) && (l = !![]);
                }), l)
                return void this['redirect'](g);
            return { 'cancel': ![] };
        }, { 'urls': ['<all_urls>'] }, []);
    }
    ['blockScheduledDomain'](a) {
        let c = new Date(), f = c['getDay'](), h = c['getHours'](), i = c['getMinutes'](), j = new Intl['DateTimeFormat']('default', {
                'hour': 'numeric',
                'minute': 'numeric'
            })['format'](c), k = ![];
        if (a['days']['forEach'](l => {
                if (parseInt(l) === f)
                    return void (k = !![]);
            }), !k)
            return ![];
        return !!(a['startTime'] <= j && a['endTime'] >= j) || !!(a['secondStartTime'] && a['secondStartTime'] <= j && a['secondEndTime'] >= j);
    }
    ['isCategoryBlocked'](a, c) {
        if (!this['categories']['length'])
            return ![];
        for (let d = 0; d < this['categories']['length']; d++) {
            for (let e = 0; e < a['length']; e++) {
                if (this['categories'][d] === a[e])
                    return this['cache'][c] || (this['cache'][c] = a, chrome['storage']['local']['set']({ 'cache': this['cache'] }, () => {
                        return console['log']('site add to cache');
                    })), !![];
            }
        }
        return ![];
    }
    ['getHostname'](a) {
        a = a['replace']('www.', '');
        var c = a['indexOf']('//') + 2;
        if (1 < c) {
            var d = a['indexOf']('/', c);
            return 0 < d ? a['substring'](c, d) : (d = a['indexOf']('?', c), 0 < d ? a['substring'](c, d) : a['substring'](c));
        }
        return a;
    }
}
const b = new Background();