'use strict';
class ManageSites {
    constructor() {
        this['isAppWorking'] = !![], this['scheduledDomains'] = [], this['categories'] = [], this['whiteList'] = [], this['blockedDomains'] = [], this['blockedWords'] = [], this['popup'] = document['querySelector']('.popup'), this['extensionSwitcher'] = null, this['addSpans'] = document['querySelectorAll']('i.add'), this['blockDomainInput'] = document['querySelector']('#content1 #block-domain'), this['workScheduleInput'] = document['querySelector']('#content2 #work-schedule'), this['startTimeInputs'] = document['getElementsByClassName']('start-time'), this['endTimeInputs'] = document['getElementsByClassName']('end-time'), this['scheduleOptions'] = document['querySelector']('.schedule-options'), this['deleteInterval'] = document['querySelector']('#content2 .delete-interval'), this['days'] = document['querySelectorAll']('#content2 .schedule-days li'), this['addIntervalBtn'] = document['querySelector']('#content2 .schedule-range-container .add-interval'), this['setScheduleBtn'] = document['querySelector']('#content2 .set-schedule'), this['setScheduleAll'] = document['querySelector']('#content2 .set-schedule-all'), this['blockCategories'] = document['querySelectorAll']('#content3 .block-categories li'), this['saveCategoriesBtn'] = document['querySelector']('#content3 .save-categories'), this['blockWordInput'] = document['querySelector']('#block-word'), this['scheduledDomainsList'] = document['querySelector']('#content2 .scheduled-domains-list'), this['whiteListInput'] = document['querySelector']('#content5 #white-list'), this['blockedDomainsList'] = document['querySelector']('#content1 .blocked-domains-list'), this['blockedWordsList'] = document['querySelector']('#content4 .blocked-words'), this['whiteDomainsList'] = document['querySelector']('#content5 .white-list'), this['initStorage']();
        var a = new Localize();
        a['init'](), this['localizeAttributes']();
    }
    ['localizeAttributes']() {
        $(this['blockDomainInput'])['attr']('placeholder', chrome['i18n']['getMessage']('codehemu__block_input')), $(this['workScheduleInput'])['attr']('placeholder', chrome['i18n']['getMessage']('codehemu__schedule_input')), $(this['blockWordInput'])['attr']('placeholder', chrome['i18n']['getMessage']('codehemu__words_input')), $(this['whiteListInput'])['attr']('placeholder', chrome['i18n']['getMessage']('codehemu__white_input'));
    }
    ['initStorage']() {
        chrome['storage']['local']['get'](a => {
            this['isAppWorking'] = a['isAppWorking'], this['categories'] = a['categories'], this['scheduledDomains'] = a['scheduledDomains'], this['whiteList'] = a['whiteList'], this['blockedDomains'] = a['blockedDomains'], this['blockedWords'] = a['blockedWords'], this['buildPage'](), this['initListeners']();
        });
    }
    ['initListeners']() {
        this['extensionSwitcher']['addEventListener']('click', b => {
            return this['handleAppSwitch'](b);
        }), this['addSpans']['forEach'](b => {
            b['addEventListener']('click', d => {
                const e = d['target']['parentNode']['children'][0];
                switch (e['id']) {
                case 'block-domain':
                    this['handleInputInsert'](null, this['blockDomainInput'], 'blockedDomains', 'blockedDomainsList', 'renderBlockedDomain', 'plus');
                    break;
                case 'block-word':
                    this['handleWordInput'](null, 'plus');
                    break;
                case 'white-list':
                    this['handleInputInsert'](null, this['whiteListInput'], 'whiteList', 'whiteDomainsList', 'renderWhiteDomain', 'plus');
                }
            });
        }), this['blockDomainInput']['addEventListener']('keyup', b => {
            this['handleInputInsert'](b, this['blockDomainInput'], 'blockedDomains', 'blockedDomainsList', 'renderBlockedDomain');
        }), this['workScheduleInput']['addEventListener']('keyup', b => {
            this['handleScheduleInsert'](b);
        }), this['blockWordInput']['addEventListener']('keyup', b => {
            this['handleWordInput'](b);
        }), this['whiteListInput']['addEventListener']('keyup', b => {
            this['handleInputInsert'](b, this['whiteListInput'], 'whiteList', 'whiteDomainsList', 'renderWhiteDomain');
        }), document['addEventListener']('click', a => {
            if (!a['target']['disabled']) {
                let b = document['querySelector']('.focused-input');
                if (a['target']['closest']('.inputs-container input')) {
                    let d = a['target']['closest']('.focused-input');
                    if (!b)
                        return void a['target']['classList']['add']('focused-input');
                    if (b && d)
                        return;
                    if (b && !d)
                        return b['classList']['remove']('focused-input'), void a['target']['classList']['add']('focused-input');
                    b && b != d && (b['classList']['remove']('focused-input'), d['classList']['add']('focused-input'));
                }
                if (a['target']['closest']('.schedule-options')) {
                    b['value'] = a['target']['textContent'];
                    let f, g;
                    b['classList']['contains']('end-time') ? (g = b['value'], f = b['closest']('.inputs-container')['querySelector']('.start-time')['value']) : (f = b['value'], g = b['closest']('.inputs-container')['querySelector']('.end-time')['value']);
                    const h = this['isTimeRangeIssued'](f, g);
                    if (h) {
                        alert('issued');
                        let i = document['querySelector']('.end-time:not([disabled])');
                        i['value'] = '23:50';
                    }
                    b['classList']['remove']('.focused-input');
                }
                b && b['classList']['remove']('focused-input');
            }
        }), this['handleScheduledInputsChanges'](), this['addIntervalBtn']['addEventListener']('click', () => {
            this['startTimeInputs'][0]['disabled'] = !![], this['endTimeInputs'][0]['disabled'] = !![];
            let a = document['querySelector']('.schedule-range-container.hidden');
            a && a['classList']['remove']('hidden');
        }), this['deleteInterval']['addEventListener']('click', a => {
            a['target']['closest']('.schedule-range-container')['classList']['add']('hidden'), this['startTimeInputs'][0]['disabled'] = ![], this['endTimeInputs'][0]['disabled'] = ![];
        }), this['setScheduleBtn']['addEventListener']('click', () => {
            return this['handleSetSchedule']();
        }), this['setScheduleAll']['addEventListener']('click', () => {
            return this['handleSetScheduleAll']();
        }), this['days']['forEach'](b => {
            b['addEventListener']('click', d => {
                d['target']['classList']['toggle']('active');
            });
        }), this['blockCategories']['forEach'](b => {
            b['addEventListener']('click', d => {
                d['target']['classList']['toggle']('active');
            });
        }), this['saveCategoriesBtn']['addEventListener']('click', b => {
            return this['handleCategories'](b);
        });
    }
    ['buildPage']() {
        this['extensionSwitcher'] = document['querySelector']('.toggle-button'), this['checkSwitchApp'](), this['renderBlockedList'](), this['highlightSelectedCategories'](), this['renderScheduledDomainsList'](), this['renderBlockedWordsList'](), this['renderWhiteList'](), this['showContainer']();
    }
    ['handleAppSwitch']() {
        this['isAppWorking'] = !this['isAppWorking'], chrome['storage']['local']['set']({ 'isAppWorking': this['isAppWorking'] }, () => {
            this['toggleActive'](this['extensionSwitcher']);
        });
    }
    ['checkSwitchApp']() {
        this['isAppWorking'] && this['extensionSwitcher']['classList']['add']('active'), this['setSwitcher']();
    }
    ['highlightSelectedCategories']() {
        this['blockCategories']['forEach'](a => {
            -1 != this['categories']['indexOf'](a['textContent']) && a['classList']['add']('active');
        });
    }
    ['toggleActive'](a) {
        a['classList']['toggle']('active'), this['enabled'] = !![] !== this['enabled'], this['setSwitcher']();
    }
    ['showContainer']() {
        document['querySelector']('.container')['classList']['remove']('hidden');
    }
    ['handleScheduleInsert'](a) {
        if (13 === a['keyCode'] && this['workScheduleInput']['value']['length']) {
            if (!this['isDomainCorrect'](this['workScheduleInput']['value']))
                return;
            if (this['isDomainRepeated'](this['workScheduleInput']['value'], this['scheduleDomainsNames']))
                return;
        }
    }
    ['handleScheduledInputsChanges']() {
        for (let a = 0; a < this['startTimeInputs']['length']; a++) {
            this['startTimeInputs'][a]['addEventListener']('change', b => {
                return this['handleInputChange'](b);
            });
        }
        for (let b = 0; b < this['endTimeInputs']['length']; b++) {
            this['endTimeInputs'][b]['addEventListener']('change', d => {
                return this['handleInputChange'](d);
            });
        }
    }
    ['handleInputChange'](a) {
        let d = ![], e = a['target']['value']['trim']();
        for (let f = 0; f < this['scheduleOptions']['length']; f++) {
            if (e === this['scheduleOptions'][f]) {
                d = !![];
                break;
            }
        }
        if (d) {
            const g = a['target']['closest']('.inputs-container');
            let h = g['querySelector']('.end-time');
            this['isTimeRangeIssued'](a['target']['value'], h['value']);
        } else
            a['target']['value'] = a['target']['getAttribute']('data-time');
    }
    ['handleInputInsert'](a, b, d, e, f, g) {
        let h;
        if (h = a ? 13 === a['keyCode'] && b['value']['length'] : g && b['value']['length'], h) {
            if (!this['isDomainCorrect'](b['value']))
                return void this['createPopup']('Type the correct domain', 2000);
            if (this['isDomainRepeated'](b['value'], this[d]))
                return void this['createPopup']('This site has already been added', 2000);
            this[d]['push'](b['value']), this[e]['appendChild'](this[f](b['value'])), b['value'] = '', chrome['storage']['local']['set']({ [d]: this[d] }, () => {
            });
        }
    }
    ['handleCategories']() {
        const a = [];
        this['blockCategories']['forEach'](b => {
            b['classList']['contains']('active') && a['push'](b['textContent']);
        }), chrome['storage']['local']['set']({ 'categories': a }, () => {
            this['createPopup']('Selected categories were blocked!', 2000);
        });
    }
    ['handleWordInput'](a, b) {
        let d;
        if (d = a ? 13 === a['keyCode'] && this['blockWordInput']['value']['length'] : b && this['blockWordInput']['value']['length'], d) {
            if (-1 !== this['blockedWords']['indexOf'](this['blockWordInput']['value']))
                return void this['createPopup']('This word has already been added', 2000);
            this['blockedWords']['push'](this['blockWordInput']['value']), this['blockedWordsList']['appendChild'](this['renderBlockedWord'](this['blockWordInput']['value'])), this['blockWordInput']['value'] = '', chrome['storage']['local']['set']({ 'blockedWords': this['blockedWords'] }, () => {
            });
        }
    }
    ['handleSetSchedule']() {
        const a = this['workScheduleInput']['value'];
        return this['isDomainCorrect'](a) ? this['isScheduledDomainRepeated'](a) ? void this['createPopup']('This site has already been added', 2000) : void this['storeScheduledDomain'](null, a) : void this['createPopup']('Type correct domain', 2000);
    }
    ['handleSetScheduleAll']() {
        const a = [];
        for (let b = 0; b < this['scheduledDomains']['length']; b++) {
            a['push'](this['scheduledDomains'][b]['domain']);
        }
        for (let d = 0; d < this['blockedDomains']['length']; d++) {
            -1 === a['indexOf'](this['blockedDomains'][d]) && this['storeScheduledDomain'](this['blockedDomains'][d], null);
        }
        this['createPopup']('All blocked domains are scheduled', 2000);
    }
    ['storeScheduledDomain'](a, b) {
        const d = {};
        d['domain'] = a ? a : b, d['startTime'] = this['startTimeInputs'][0]['value'], d['endTime'] = this['endTimeInputs'][0]['value'], this['startTimeInputs'][1]['closest']('.set-time .schedule-range-container.hidden') ? (d['secondStartTime'] = null, d['secondEndTime'] = null) : (d['secondStartTime'] = this['startTimeInputs'][1]['value'], d['secondEndTime'] = this['endTimeInputs'][1]['value']), d['days'] = [], this['days']['forEach'](e => {
            e['classList']['contains']('active') && d['days']['push'](e['getAttribute']('name'));
        }), this['scheduledDomains']['push'](d), chrome['storage']['local']['set']({ 'scheduledDomains': this['scheduledDomains'] }, () => {
            a ? (this['scheduledDomainsList']['appendChild'](this['renderScheduledDomain'](a)), this['returnScheduleInitData']()) : (this['scheduledDomainsList']['appendChild'](this['renderScheduledDomain'](b)), this['returnScheduleInitData']());
        });
    }
    ['renderBlockedList']() {
        for (let a = 0; a < this['blockedDomains']['length']; a++) {
            this['blockedDomainsList']['appendChild'](this['renderBlockedDomain'](this['blockedDomains'][a]));
        }
    }
    ['renderScheduledDomainsList']() {
        for (let a = 0; a < this['scheduledDomains']['length']; a++) {
            this['scheduledDomainsList']['appendChild'](this['renderScheduledDomain'](this['scheduledDomains'][a]['domain']));
        }
    }
    ['renderBlockedWordsList']() {
        for (let a = 0; a < this['blockedWords']['length']; a++) {
            this['blockedWordsList']['appendChild'](this['renderBlockedWord'](this['blockedWords'][a]));
        }
    }
    ['renderWhiteList']() {
        for (let a = 0; a < this['whiteList']['length']; a++) {
            this['whiteDomainsList']['appendChild'](this['renderWhiteDomain'](this['whiteList'][a]));
        }
    }
    ['renderBlockedDomain'](a) {
        const b = document['createElement']('li');
        b['classList']['add']('domain'), b['textContent'] = a;
        const d = document['createElement']('img');
        return d['classList']['add']('delete-domain'), d['textContent'] = 'x', d['src'] = 'img/delete.svg', d['addEventListener']('click', e => {
            return this['handleDeleteDomain'](e, 'blockedDomains');
        }), b['appendChild'](d), b;
    }
    ['renderScheduledDomain'](a) {
        const b = document['createElement']('li');
        b['classList']['add']('domain'), b['textContent'] = a;
        const d = document['createElement']('img');
        return d['classList']['add']('delete-domain'), d['textContent'] = 'x', d['src'] = 'img/delete.svg', d['addEventListener']('click', e => {
            return this['handleDeleteScheduledDomain'](e);
        }), b['appendChild'](d), b['addEventListener']('click', e => {
            return this['showTimeRange'](e);
        }), b;
    }
    ['showTimeRange'](a) {
        const b = a['target']['textContent']['slice'](0, a['target']['textContent']['length'] - 1);
        this['scheduledDomains']['forEach'](d => {
            if (d['domain'] === b) {
                let e = 'From ' + d['startTime'] + ' to ' + d['endTime'];
                d['secondStartTime'] && (e = 'From ' + d['startTime'] + ' to ' + d['endTime'] + ' and from ' + d['secondStartTime'] + ' to ' + d['secondEndTime']), this['createPopup'](e, 3000);
            }
        });
    }
    ['renderBlockedWord'](a) {
        const b = document['createElement']('li');
        b['classList']['add']('domain'), b['textContent'] = a;
        const d = document['createElement']('img');
        return d['classList']['add']('delete-domain'), d['textContent'] = 'x', d['src'] = 'img/delete.svg', d['addEventListener']('click', e => {
            return this['handleDeleteDomain'](e, 'blockedWords');
        }), b['appendChild'](d), b;
    }
    ['renderWhiteDomain'](a) {
        const b = document['createElement']('li');
        b['classList']['add']('domain'), b['textContent'] = a;
        const d = document['createElement']('img');
        return d['classList']['add']('delete-domain'), d['textContent'] = 'x', d['src'] = 'img/delete.svg', d['addEventListener']('click', e => {
            return this['handleDeleteDomain'](e, 'whiteList');
        }), b['appendChild'](d), b;
    }
    ['handleDeleteDomain'](a, b) {
        const d = a['target']['closest']('.domain'), e = d['textContent']['slice'](0, d['textContent']['length'] - 1);
        this[b] = this[b]['filter'](f => {
            return f !== e;
        }), chrome['storage']['local']['set']({ [b]: this[b] }, () => {
            d['remove']();
        });
    }
    ['handleDeleteScheduledDomain'](a) {
        const d = a['target']['closest']('.domain'), e = d['textContent']['slice'](0, d['textContent']['length'] - 1);
        for (let f = 0; f < this['scheduledDomains']['length']; f++) {
            if (this['scheduledDomains'][f]['domain'] === e)
                return this['scheduledDomains']['splice'](f, 1), void chrome['storage']['local']['set']({ 'scheduledDomains': this['scheduledDomains'] }, () => {
                    d['remove']();
                });
        }
    }
    ['isTimeRangeIssued'](a, b) {
        let d, e;
        for (let f = 0; f < a['length']; f++) {
            if (':' !== a[f]) {
                if (d = parseInt(a[f]), e = parseInt(b[f]), d > e)
                    return !![];
                if (d < e)
                    return ![];
            }
        }
        return ![];
    }
    ['isDomainCorrect'](a) {
        var b = /(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?([^:\/\n?]?)/gi;
        return b['test'](a);
    }
    ['isDomainRepeated'](b, d) {
        let e = ![];
        return d['forEach'](f => {
            if (f === b)
                return void (e = !![]);
        }), e;
    }
    ['isScheduledDomainRepeated'](a) {
        let d = ![];
        return this['scheduledDomains']['forEach'](e => {
            if (e['domain'] === a)
                return void (d = !![]);
        }), d;
    }
    ['returnScheduleInitData']() {
        this['workScheduleInput']['value'] = '';
        for (let a = 0; 2 > a; a++) {
            this['startTimeInputs'][a]['value'] = this['startTimeInputs'][a]['getAttribute']('data-time'), this['endTimeInputs'][a]['value'] = this['endTimeInputs'][a]['getAttribute']('data-time');
        }
        this['days']['forEach'](b => {
            !b['classList']['contains']('active') && b['classList']['add']('active');
        });
    }
    ['createPopup'](a, b) {
        this['popup']['textContent'] = a, this['popup']['style']['opacity'] = 1, this['popup']['style']['zIndex'] = 9999999, setTimeout(() => {
            this['popup']['style']['opacity'] = 0, this['popup']['style']['zIndex'] = -1;
        }, b);
    }
    ['setSwitcher']() {
        var a = document['getElementById']('switch-label');
        a['innerHTML'] = this['isAppWorking'] ? 'On' : 'Off';
    }
}
const c = new ManageSites();