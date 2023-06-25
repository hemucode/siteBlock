class Popup {
    constructor() {
        this['isAppWorking'] = !![], this['whiteList'] = [], this['blockedDomains'] = [], this['blockedWords'] = [], this['scheduledDomains'] = [], this['domain'] = '', this['manageSite'] = '', this['editSite'] = '', this['extensionSwitcher'] = '', this['blockSite'] = '', this['enabled'] = !![], this['tabUrl'] = '', this['getCurrentTab']();
        var a = new Localize();
        a['init'](), a['localizeHtmlPage']();
    }
    ['getCurrentTab']() {
        chrome['tabs']['query']({
            'active': !![],
            'currentWindow': !![]
        }, b => {
            this['tabUrl'] = b[0]['url'], this['initStorage']();
        });
    }
    ['initStorage']() {
        chrome['storage']['local']['get'](a => {
            this['isAppWorking'] = a['isAppWorking'], this['whiteList'] = a['whiteList'], this['blockedDomains'] = a['blockedDomains'], this['scheduledDomains'] = a['scheduledDomains'], this['blockedWords'] = a['blockedWords'], this['buildPage']();
        });
    }
    ['initListeners']() {
        this['manageSite'] && this['manageSite']['addEventListener']('click', this['manageSiteHandler']), this['editSite'] && this['editSite']['addEventListener']('click', this['manageSiteHandler']), this['extensionSwitcher'] && this['extensionSwitcher']['addEventListener']('change', () => {
            return this['isAppWorking'] = event['currentTarget']['checked'], chrome['storage']['local']['set']({ 'isAppWorking': this['isAppWorking'] }), this['setSwitcher']();
        }), this['blockSite'] && this['blockSite']['addEventListener']('click', () => {
            return this['handleBlockButton']();
        });
    }
    ['manageSiteHandler']() {
        chrome['tabs']['create']({ 'url': '/data/interface/manage.html' });
    }
    ['setSwitcher']() {
        this['isAppWorking'] ? this['blockSite'] && this['blockSite']['removeAttribute']('disabled') : this['blockSite'] && !this['blockSite']['disabled'] && this['blockSite']['setAttribute']('disabled', !![]);
    }
    ['handleBlockButton']() {
        if (this['isAppWorking']) {
            if (!this['scheduledDomains']['length'])
                return this['blockedDomains']['push'](this['domain']), void chrome['storage']['local']['set']({ 'blockedDomains': this['blockedDomains'] }, () => {
                    chrome['tabs']['create']({ 'url': '/data/interface/manage.html' }, () => {
                    });
                });
            let a = this['getHostName'](this['tabUrl']);
            for (let b = 0; b < this['scheduledDomains']['length']; b++) {
                if (a === this['scheduledDomains'][b]['domain'])
                    return;
            }
            this['blockedDomains']['push'](this['domain']), chrome['storage']['local']['set']({ 'blockedDomains': this['blockedDomains'] }, () => {
                chrome['tabs']['create']({ 'url': '/data/interface/manage.html' }, () => {
                });
            });
        }
    }
    ['buildPage']() {
        chrome['tabs']['query']({
            'active': !![],
            'currentWindow': !![]
        }, a => {
            const d = this['isDomainCorrect'](a[0]['url']);
            this['extensionSwitcher'] = document['querySelector']('#block_app'), this['checkSwitchApp'](), this['manageSite'] = document['querySelector']('.manage-site'), this['editSite'] = document['querySelector']('.edit-site');
            if (d) {
                this['createValidPage'](), this['domain'] = this['getHostName'](a[0]['url']);
                var e = 'http://www.google.com/s2/favicons?domain=' + this['domain'];
                this['createBlockedItem'](this['domain'], e), this['blockSite'] = document['querySelector']('.block-site'), this['initListeners']();
            } else
                this['createInvalidPage'](), this['initListeners']();
            this['setSwitcher']();
        });
    }
    ['createBlockedItem'](a, b) {
        const d = document['querySelector']('.codehemu10');
        d && (d['textContent'] = a);
        const e = document['querySelector']('.codehemu213');
        e && (e['src'] = b);
    }
    ['checkSwitchApp']() {
        this['isAppWorking'] ? this['extensionSwitcher']['checked'] = !![] : this['extensionSwitcher']['checked'] = ![], this['setSwitcher']();
    }
    ['createValidPage']() {
        document['querySelector']('.codehemu404') && (document['querySelector']('.codehemu404')['style']['display'] = 'none'), document['querySelector']('.not_img') && (document['querySelector']('.not_img')['style']['display'] = 'none'), document['querySelector']('.codehemu213') && (document['querySelector']('.codehemu213')['style']['display'] = 'block'), document['querySelector']('.codehemu1000') && (document['querySelector']('.codehemu1000')['style']['display'] = 'block');
    }
    ['createInvalidPage']() {
        document['querySelector']('.codehemu404') && (document['querySelector']('.codehemu404')['style']['display'] = 'block'), document['querySelector']('.not_img') && (document['querySelector']('.not_img')['style']['display'] = 'block'), document['querySelector']('.codehemu213') && (document['querySelector']('.codehemu213')['style']['display'] = 'none'), document['querySelector']('.codehemu1000') && (document['querySelector']('.codehemu1000')['style']['display'] = 'none');
    }
    ['getHostName'](a) {
        a = a['replace']('www.', '');
        var d = a['indexOf']('//') + 2;
        if (1 < d) {
            var e = a['indexOf']('/', d);
            return 0 < e ? a['substring'](d, e) : (e = a['indexOf']('?', d), 0 < e ? a['substring'](d, e) : a['substring'](d));
        }
        return a;
    }
    ['isDomainCorrect'](a) {
        if (-1 !== a['indexOf']('chrome-extension://'))
            return ![];
        var d = /(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?([^:\/\n?]?)/gi;
        return d['test'](a);
    }
}
const c = new Popup();