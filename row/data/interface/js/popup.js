'use strict';
class Popup {
  constructor() {
    this.isAppWorking = true;
    this.whiteList = [];
    this.blockedDomains = [];
    this.blockedWords = [];
    this.scheduledDomains = [];
    this.domain = "";
    this.manageSite = "";
    this.editSite = "";
    this.extensionSwitcher = "";
    this.blockSite = "";
    this.enabled = true;
    this.tabUrl = "";
    this.getCurrentTab();
    var localize = new Localize();
    localize.init();  
    localize.localizeHtmlPage();  
  }
  getCurrentTab() {
    chrome.tabs.query({
      active : true,
      currentWindow : true
    }, (a) => {
      this.tabUrl = a[0].url;
      this.initStorage();
    });
  }
  initStorage() {
    chrome.storage.local.get((exports) => {
      this.isAppWorking = exports.isAppWorking;
      this.whiteList = exports.whiteList;
      this.blockedDomains = exports.blockedDomains;
      this.scheduledDomains = exports.scheduledDomains;
      this.blockedWords = exports.blockedWords;
      this.buildPage();
    });
  }
  initListeners() {
    if (this.manageSite) {
      this.manageSite.addEventListener("click", this.manageSiteHandler);
    }
    if (this.editSite) {
      this.editSite.addEventListener("click", this.manageSiteHandler);
    }
    if (this.extensionSwitcher) {
      this.extensionSwitcher.addEventListener("change", () => {
        this.isAppWorking = event.currentTarget.checked;
        chrome.storage.local.set({isAppWorking : this.isAppWorking});
        return this.setSwitcher();
      });
    }
    if (this.blockSite) {
      this.blockSite.addEventListener("click", () => {
        return this.handleBlockButton();
      });
    }
  }
  manageSiteHandler() {
    chrome.tabs.create({
      url : `/data/interface/manage.html`
    });
  }


  setSwitcher(){
    if(this.isAppWorking){
        if(this.blockSite){
            this.blockSite.removeAttribute("disabled");
        }
    }
    else{
        if(this.blockSite && !this.blockSite.disabled){
            this.blockSite.setAttribute("disabled", true);
        }

    }
    
  }

  handleBlockButton() {
    if (this.isAppWorking) {
      if (!this.scheduledDomains.length) {
        return this.blockedDomains.push(this.domain), void chrome.storage.local.set({
          blockedDomains : this.blockedDomains
        }, () => {
          chrome.tabs.create({
            url : `/data/interface/manage.html`
          }, () => {
          });
        });
      }
      let domainInstance = this.getHostName(this.tabUrl);
      for (let i = 0; i < this.scheduledDomains.length; i++) {
        if (domainInstance === this.scheduledDomains[i].domain) {
          return;
        }
      }
      this.blockedDomains.push(this.domain);
      chrome.storage.local.set({
        blockedDomains : this.blockedDomains
      }, () => {
        chrome.tabs.create({
          url : `/data/interface/manage.html`
        }, () => {
        });
      });
    }
  }

  buildPage() {
    chrome.tabs.query({
      active : true,
      currentWindow : true
    }, (tabs) => {
      const b = this.isDomainCorrect(tabs[0].url);
      this.extensionSwitcher = document.querySelector("#block_app");
      this.checkSwitchApp();
      this.manageSite = document.querySelector(".manage-site");
      this.editSite = document.querySelector(".edit-site");
      if (b) {
        this.createValidPage();
        this.domain = this.getHostName(tabs[0].url);
        var img = `http://www.google.com/s2/favicons?domain=${this.domain}`; 
        this.createBlockedItem(this.domain, img);
        this.blockSite = document.querySelector(".block-site");
        this.initListeners();
      } else {
        this.createInvalidPage();
        this.initListeners();
      }
      this.setSwitcher();
    });
  }

  createBlockedItem(html, map) {
    const codehemu10 = document.querySelector(".codehemu10");
    if (codehemu10) {
      codehemu10.textContent = html;
    }
    const codehemu213 = document.querySelector(".codehemu213");
    if (codehemu213) {
        codehemu213.src = map;
    }
  }

  checkSwitchApp() {
    if (this.isAppWorking) {
      this.extensionSwitcher.checked = true;
    }else{
      this.extensionSwitcher.checked = false;
    }
    this.setSwitcher()
  }

  createValidPage() {
    if (document.querySelector(".codehemu404")) {
        document.querySelector(".codehemu404").style.display="none";
    }
    if (document.querySelector(".not_img")) {
        document.querySelector(".not_img").style.display="none";
    }
    if (document.querySelector(".codehemu213")) {
        document.querySelector(".codehemu213").style.display="block";
    }
    if (document.querySelector(".codehemu1000")) {
        document.querySelector(".codehemu1000").style.display="block";
    }
  }

  createInvalidPage() {
    if (document.querySelector(".codehemu404")) {
        document.querySelector(".codehemu404").style.display="block";
    }
    if (document.querySelector(".not_img")) {
        document.querySelector(".not_img").style.display="block";
    }
    if (document.querySelector(".codehemu213")) {
        document.querySelector(".codehemu213").style.display="none";
    }
    if (document.querySelector(".codehemu1000")) {
        document.querySelector(".codehemu1000").style.display="none";
    }
  }

  getHostName(url) {
    url = url.replace("www.", "");
    var b = url.indexOf("//") + 2;
    if (1 < b) {
      var c = url.indexOf("/", b);
      return 0 < c ? url.substring(b, c) : (c = url.indexOf("?", b), 0 < c ? url.substring(b, c) : url.substring(b));
    }
    return url;
  }

  isDomainCorrect(html) {
    if (-1 !== html.indexOf("chrome-extension://")) {
      return false;
    }
    var b = /(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?([^:\/\n?]?)/gi;
    return b.test(html);
  }
}
const c = new Popup();
