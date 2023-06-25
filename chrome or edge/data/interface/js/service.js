var jsonText = `{"jsonText":[
  {"id": "2022/09/speaker-booster", "title": "How to increase volume by 600%." ,"des": "Easy way to increase volume."},
  {"id": "2022/10/dislike-add-youtube", "title": "dislikes a YouTube video has?","des":"The extension returns the ability to see.."},
  {"id": "2022/10/nonstopyoutube", "title": "Stream non stop music on YouTube","des":"removes ads from YouTube videos."},
  {"id": "2022/10/mapsearch", "title": "MapSearch is that possible?","des":"search method on Google Maps or Bing Maps."},
  {"id": "2022/10/colormaterialize", "title": "Smart Color Materialize","des":"customize any color code[HEX/RGB]."},
  {"id": "2022/11/adblock-for-youtube", "title": "Try to skip the video advertisements","des":"Learn easy ways to block youtube ads."},
  {"id": "2022/11/YouTubeTranslater", "title": "translate YouTube video subtitles","des":"It is now possible to change subtitles.."},
  {"id": "2022/12/drum-kit-easy", "title": "Drum kit Easy","des":"How to Play Drum Kit in Browser"},
  {"id": "2022/12/browser-allow-copy-right-click", "title": "Allow Copy& Right Click","des":"private websites does not open menu"},
  {"id": "2022/12/save-page-as-mht", "title": "Save Page as MHT","des":"web page in browser in MHTML format"},
  {"id": "2022/12/screenshot-in-page", "title": "Screenshot in Page","des":"you take a screenshot of a web page?"},
  {"id": "2022/12/little-synth-piano", "title": "Little synth Piano","des":"Piano/ Guitar/ Drum/ sound in one Extension"},
  {"id": "2022/12/ad-blocker", "title": "AD Blocker Potty","des":"the funniest ads blocker in the world ?"},
  {"id": "2023/01/yes-it-is-possible-to-play-no-video-on", "title": "Audio only on YouTube™","des":""},
  {"id": "2023/01/music-booster", "title": "Equalizer Music Booster","des":"Equalizer and how do you add"},
  {"id": "2023/01/html-beautifier", "title": "HTML Beautifier","des":" HTML, CSS, and JavaScript Minifiers & Compressors"},
  {"id": "2023/01/lights", "title": "The Lights Off","des":"light of YouTube or other websites"},
  {"id": "2022/09/sponsorblock-for-facebook", "title": "SponsorBlock for Facebook","des":"Hide Sponsored Posts on Facebook"}
]}`;

var obj = JSON.parse(jsonText);

domReady(() => {
 	codehemu1 = document.querySelector(".codehemu1");
 	if (codehemu1) {
 			codehemu1.addEventListener("mouseover", ()=>{
			  codehemu1.style.color = "#0045ff";
			  codehemu3.src = "../icons/32-blue.png";

			});
 	}

	codehemu3 = document.querySelector(".codehemu3");
	if (codehemu3) {
		codehemu1.addEventListener("mouseout", ()=>{
		  codehemu1.style.color = "transparent";
		  codehemu3.src = "../icons/32.png";
		});
	}
	explore();
	rate();
})


function rate(){
	const updateUrl = chrome.runtime.getManifest().update_url?.toLowerCase();
	const id = chrome.runtime.id;
	const storeUrl = (updateUrl && updateUrl.includes("microsoft")) ?
	    `https://microsoftedge.microsoft.com/addons/detail/` + id :
	    `https://chrome.google.com/webstore/detail/${id}/reviews`;
	document.querySelectorAll(".teaser").forEach(el => el.setAttribute("href", storeUrl));
}


function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}


function explore() {
	codehemu1005 = document.querySelector(".codehemu1005");
	codehemu1006 = document.querySelector(".codehemu1006");
	codehemu1007 = document.querySelector(".codehemu1007");
	codehemu1008 = document.querySelector(".codehemu1008");

	url1 = "https://www.downloadhub.cloud/";

	codehemu5 = document.querySelector(".codehemu5");
	if (codehemu5) {
		codehemu5.addEventListener("click",()=>{
		    		window.open(`${url1}2023/06/SiteBlock`+".html#report",'_blank');
		 });

	}

	codehemu44 = document.querySelector(".codehemu44");
	if (codehemu44) {
		codehemu44.addEventListener("click",()=>{
		    		window.open(`${url1}2023/06/SiteBlock`+".html",'_blank');
		 });

	}

	if (!localStorage.codehemu_explore_no) {
		localStorage.codehemu_explore_no = 0;
	}
	if(obj.jsonText.length<=localStorage.codehemu_explore_no){
		localStorage.codehemu_explore_no = 0;
	}


	if (localStorage.codehemu_explore_no) {
		if (codehemu1006) {
				codehemu1006.innerText = obj.jsonText[localStorage.codehemu_explore_no].title;
		}
		if (codehemu1007) {
		   codehemu1007.innerText = obj.jsonText[localStorage.codehemu_explore_no].des;			
		}
		if (codehemu1006) {
			   codehemu1006.addEventListener("click",()=>{
		    	  ng_number = localStorage.codehemu_explore_no - 1;
		    		window.open(url1+obj.jsonText[ng_number].id+".html",'_blank');
		    		localStorage.codehemu_explore_no ++;
		    });
		}

		if (codehemu1007) {
			  codehemu1007.addEventListener("click",()=>{
		    	  ng_number = localStorage.codehemu_explore_no - 1;
		    		window.open(url1+obj.jsonText[ng_number].id+".html",'_blank');
		    		localStorage.codehemu_explore_no ++;
		    });
		}
		if (codehemu1008) {
		    codehemu1008.addEventListener("click",()=>{
		    	codehemu1006.innerText = obj.jsonText[localStorage.codehemu_explore_no].title;
			  	codehemu1007.innerText = obj.jsonText[localStorage.codehemu_explore_no].des;
		    	localStorage.codehemu_explore_no ++;
		    });
		}

	}
	if (!localStorage.codehemu_explore_no == 0) {
		localStorage.codehemu_explore_no ++;
	}
}

setInterval(()=>{
		var img = document.querySelector('.codehemu213');
		var codehemu10 = document.querySelector(".codehemu10");
	    if (codehemu10) {
	    	if (codehemu10.innerText) {
	    		if (codehemu10.innerText == "google.com") {
		    		bgColor = `#4285f4`;
		    	}else if (codehemu10.innerText == "youtube.com") {
		    		bgColor = `#f51010`;
		    	}else if (codehemu10.innerText == "facebook.com" || codehemu10.innerText == "bing.com") {
		    		bgColor = `#1095f5`;
		    	}else if (codehemu10.innerText == "instagram.com") {
		    		bgColor = `linear-gradient(45deg, #a737ba, #e22f6d,#fecd67)`;
		    	}else if (codehemu10.innerText == "whatsapp.com") {
		    		bgColor = `#25d366`;
		    	}else if (codehemu10.innerText == "tiktok.com") {
		    		bgColor = `#ff57a0`;
		    	}else if (img.src){
		    		try {
		    			const max = 10;
					    const {naturalWidth: iw, naturalHeight: ih} = img;
					    const ctx = document.createElement`canvas`.getContext`2d`; 
					    const sr = Math.min(max / iw, max / ih); // Scale ratio
					    const w = Math.ceil(iw * sr); // Width
					    const h = Math.ceil(ih * sr); // Height
					    const a = w * h;              // Area

					    img.crossOrigin = 1;
					    ctx.canvas.width = w;
					    ctx.canvas.height = h;
					    ctx.drawImage(img, 0, 0, w, h);

					    const data = ctx.getImageData(0, 0, w, h).data;
					    let r = g = cooco = 0;

					    for (let i=0; i<data.length; i+=4) {
					      r += data[i];
					      g += data[i+1];
					      cooco += data[i+2];
					    }

					    r = ~~(r/a);
					    g = ~~(g/a);
					    cooco = ~~(cooco/a);

					    if (!r==0) {
					    	bgColor = `rgb(${r},${g},${cooco})`;
					    }else{}
						}
						catch(err) {}
						
				  }else{
				  	bgColor = "";
				  }
				  try {
				    document.querySelector(".codehemu89").style.background = bgColor;
				  }catch(err) {}
	    	}
	  } 
},500);










