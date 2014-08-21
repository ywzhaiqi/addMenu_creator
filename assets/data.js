/*
    a 开头代表所有，例如 aCopyUrl
    p 开头代表 page 专有，例如 pCopyLinkTitle
 */
var Data = {
    aCopyUrl: {
        label: '复制当前页面URL',
        text: '%URL%'
    },
    aCopyTitle: {
        label: '复制当前页面标题',
        text: '%TITLE%'
    },
    aCopyTitleUrl: {
        label: '复制当前页面标题+地址',
        text: '%TITLE%\n%URL%',
    },
    aCopyTitleUrlMd: {
        label: '复制当前页面标题（MD）',
        accesskey: 'D',
        text: '[%TITLE%](%URL%)',
    },
    aCopyTitleUrlBBS: {
        label: '复制当前页面标题（BBS）',
        text: '[url=%URL%]%TITLE%[/url]',
    },
    aCopyTitleUrlHtml: {
        label: '复制当前页面标题（Html）',
        text: '<a href="%URL%">%TITLE%</a>',
    },
    aCopyTitleUrlClick: {
        label: "复制标题+地址（左中右三键）",
        tooltiptext: "复制标题+URL\n左键 MD，中键普通，右键 BBS",
        onclick: function(event) {
            var title = addMenu.convertText("%RLT_OR_UT%"),
                url = addMenu.convertText("%RLINK_OR_URL%");
            // 简化下标题
            // [/\s(·|::|-|\|)\s.*/i, /_[^\[\]【】]+$/].forEach(function(r){title = title.replace(r, "");});

            var formats = [
                "[" + title + "](" + url + ")",
                title + "\n" + url + "",
                "[url=" + url + "]" + title + "[/url]"
            ];

            var str = formats[event.button];
            addMenu.copy(str);

            if (event.button === 1) {  // 中键竟然不会自动关闭
                document.getElementById("contentAreaContextMenu").hidePopup();
            }
        },
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg=="
    },
    aCopyAllTabsTitleUrl: {
        label: '复制所有标签标题+地址',
        class: 'copy',
        oncommand: function () {
            var text = '';
            var tabs = gBrowser.mTabContainer.childNodes;
            for (var i = 0, l = tabs.length, doc; i < l; i++) {
                doc = tabs[i].linkedBrowser.contentDocument;
                text += doc.title + '\n' + doc.location.href + '\n';
            }
            Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper) .copyString(text);
        }
    },
    aCopyAllTabsTitleUrlClick: {
        label: "复制所有标签标题+地址（左中右三键）",
        tooltiptext: "左键：BBCode\n中键：MD 格式\n右键：HTML Code",
        class: "copy",
        onclick: function(e) {
            var text = "",
                tabs = gBrowser.mTabContainer.childNodes,
                title,
                url;
            for (var i = 0, l = tabs.length, win; i < l; i++) {
                win = tabs[i].linkedBrowser.contentWindow;
                title = trimTile(win.document.title);
                url = win.location.href;
                var formats = [
                    '[url=' + url + ']' + title + "[/url]" + "\n",
                    '[' + title + '](' + url + ")" + "\n",
                    '<a href="' + url + '">' + title + "</a><br>" + "\n"
                ];
                text += formats[event.button];
            }
            Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(text);
            XULBrowserWindow.statusTextField.label = "复制：" + text;

            function trimTile(title) {
                [/\s(·|::|-|—|»|\|)\s.*/i, /_[^\[\]【】]+$/].forEach(function(r) {
                    title = title.replace(r, "");
                });
                return title;
            }
        },
    },
    aCopyFaviconUrl: {
        label: '复制 Favicon 的 URL',
        text: '%FAVICON%',
    },
    aCopyFaviconBase64: {
        label: '复制 Favicon 的 Base64',
        text: '%FAVICON_BASE64%',
    },
    pCopyLinkTitle: {
        label: '复制链接文本',
        accesskey: 'C',
        text: '%LINK_TEXT%',
        insertAfter: 'context-copylink',
        condition: 'link noimage'
    },
    pCopyImageBase64: {
        label: '复制图像的 Base64',
        text: '%IMAGE_BASE64%',
        condition: 'image',
    },

    aGbk2Utf8: {
        label: '切换编码（gbk、utf-8）',
        accesskey: 'e',
        oncommand: function () {
            var charset = gBrowser.mCurrentBrowser._docShell.charset;
            BrowserSetForcedCharacterSet(charset == 'gbk' ? 'utf-8' : 'gbk');
        }
    },
    aSetCodeAs: {
        label: "设置编码",
        tooltiptext: "左键：UTF-8\n中键：Big5\n右键：GBK",
        onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);",
    },
    aCloseAllTabs: {
        label: '关闭所有标签页',
        oncommand: 'gBrowser.removeAllTabsBut(gBrowser.addTab(\'about:newtab\'));',
        insertAfter: 'context_closeOtherTabs',
        accesskey: 'Q'
    },
    aShortUrl: {
        label: '短网址（当前页面）',
        condition: 'nolink',
        url: 'javascript:function iprl5(l){var d=document,z=d.createElement("scr"+"ipt"),b=d.body;try{if(!b){throw (0)}if(!l){alert("请输入网址！");return}d.title="(Shortening...) "+d.title;z.setAttribute("src","http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl="+encodeURIComponent(l));b.appendChild(z)}catch(e){alert("请等待网页加载完毕！")}}iprl5("%URL%");void (0);'
    },
    pShortUrl: {
        label: '短网址（链接）',
        condition: 'link',
        url: 'javascript:function iprl5(l){if(l.startsWith("javascript:")){alert("该网址无效："+l);return;}var d=document,z=d.createElement("scr"+"ipt"),b=d.body;try{if(!b){throw (0)}if(!l){alert("请输入网址！");return}d.title="(Shortening...) "+d.title;z.setAttribute("src","http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl="+encodeURIComponent(l));b.appendChild(z)}catch(e){alert("请等待网页加载完毕！")}}iprl5("%RLINK%");void (0);'
    },
    aGoogleTranslateUrl: {
        label: 'Google 翻译（新标签）',
        url: 'http://translate.google.cn/translate?u=%u',
        accesskey: 't',
        where: 'tab',
    },
    aGoogleTranslate: {
        label: 'Google 翻译当前页面',
        insertAfter: 'context-selectall',
        image: 'moz-anno:favicon:http://translate.google.cn/favicon.ico',
        oncommand: function () {
            var tab = document.getElementById('content');
            var win = tab.selectedBrowser.contentWindow.top.window;
            var d, b, o, v, p,
                d = win.document;
                b = d.body;
            o = d.createElement('scri' + 'pt');
            o.setAttribute('src', 'https://translate.google.cn/translate_a/element.js?cb=googleTranslateElementInit');
            o.setAttribute('type', 'text/javascript');
            b.appendChild(o);
            v = b.insertBefore(d.createElement('div'), b.firstChild);
            v.id = 'google_translate_element';
            v.style.display = 'none';
            p = d.createElement('scri' + 'pt');
            p.text = 'function googleTranslateElementInit(){new google.translate.TranslateElement({pageLanguage:""},"google_translate_element");}';
            p.setAttribute('type', 'text/javascript');
            b.appendChild(p);
        }
    },
    pGoogleImageSearch: {
        label: 'Google 相似图片搜索',
        url: 'https://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
        insertAfter: 'context-viewimageinfo',
        condition: 'image',
        where: 'tab',
    },
    pFourImageSearch: {
        label: '四引擎搜图',
        condition: 'image',
        image: 'http://www.tineye.com/favicon.ico',
        oncommand: function() {
            var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
            gBrowser.addTab('https://www.google.com/searchbyimage?safe=off&image_url=' + url);
            gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
            gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
            gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
        }
    },

    /* ----------------------------------------------------------------以下以选取的------------------------------------------------------------------- */
    pCopySelectAsHTML: {
        label: "复制为HTML",
        oncommand: function(e) {
            var div = content.document.createElement('div');
            div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
            Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(div.innerHTML);
            XULBrowserWindow.statusTextField.label = "复制：" + div.innerHTML;
        },
        condition:'select noinput',
    },
    pCopySelectAsBBCode: {
        label:"复制为BBCode",
        oncommand: function() {
            var div = content.document.createElement('div');
            div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
            function HTMLtoBBCode(a){function b(k,g,j,h,f){this.pos=k;this.font=g;this.face=j;this.size=h;this.color=f}fl=new b(50);fc=new b(50);al=new b(50);function e(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<FONT",l);if(l!=-1){m=h.indexOf(">",l);fl[g]=new b(0,0,0,0,0);fl[g].pos=l;fl[g].font=1;k=h.substring(l,m);if(k.search(/FACE/)!=-1){fl[g].face=1}else{fl[g].face=0}if(k.search(/SIZE/)!=-1){fl[g].size=1}else{fl[g].size=0}if(k.search(/COLOR/)!=-1){fl[g].color=1}else{fl[g].color=0}l++;g++}}for(l=0;l!=-1;l){l=h.indexOf("</FONT>",l++);if(l!=-1){fc[f]=new b(0,0,0,0,0);fc[f].pos=l;fc[f].font=1;for(ii=g-1;ii>=0;ii--){if(fl[ii].pos<l){if(fl[ii].font==1){fl[ii].font=0;fc[f].color=fl[ii].color;fc[f].size=fl[ii].size;fc[f].face=fl[ii].face;ii=-1}}}l++;f++}else{fc[f]=new b(0,0,0,0,0);fc[f].font=0}}}function d(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<A HREF",l);if(l!=-1){m=h.indexOf(">",l);al[g]=new b(0,0,0,0,0);al[g].font=1;k=h.substring(l,m);if(k.search(/MAILTO:/)!=-1){k=k.replace(/<A HREF=MAILTO:/,"");k=k.replace(/\"/,"");k=k.replace(/\'/,"");al[g].pos=1;k=k.toLowerCase();al[g].face=k}else{al[g].pos=2}l++;g++}else{al[g]=new b(0,0,0,0,0);al[g].pos=0}}}e(a);a=a.replace(/<SCRIPT[^>]*>/gi,"<TEXTAREA>");a=a.replace(/<\/SCRIPT>/gi,"</TEXTAREA>");a=a.replace(/ = /gi,"=");a=a.replace(/=\"/gi,"=");a=a.replace(/=\'/gi,"=");a=a.replace(/<param name=movie[^>]*value=/gi,"<movie=");a=a.replace(/\s+BORDER=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TARGET=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASSID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+NAME=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+STYLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASS=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ALT=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TITLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+REL=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ONCLICK=[^\'\">]*[\'\">]/gi,"");a=a.replace(/<A\s*HREF/i,"<A HREF");d(a);a=a.replace(/<BR>/gi,"\r");a=a.replace(/<BR(.*?)\/>/gi,"\r");a=a.replace(/<P>/gi,"\r\r");a=a.replace(/<P [^>]*>/gi,"\r\r");a=a.replace(/<CODE>/gi,"[code]");a=a.replace(/<\/CODE>/gi,"[/code]");a=a.replace(/<BLOCKQUOTE>/gi,"[quote]");a=a.replace(/<\/BLOCKQUOTE>/gi,"[/quote]");a=a.replace(/<UL[^>]*>/gi,"[list]");a=a.replace(/<\/UL>/gi,"[/list]");a=a.replace(/<OL[^>]*>/gi,"[list=1]");a=a.replace(/<\/OL>/gi,"[/list]");a=a.replace(/<LI>/gi,"[*]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<BIG>/gi,"[b]");a=a.replace(/<\/BIG>/gi,"[/b]");a=a.replace(/<B>/gi,"[b]");a=a.replace(/<\/B>/gi,"[/b]");a=a.replace(/<U>/gi,"[u]");a=a.replace(/<\/U>/gi,"[/u]");a=a.replace(/<I>/gi,"[i]");a=a.replace(/<\/I>/gi,"[/i]");a=a.replace(/<EM>/gi,"[i]");a=a.replace(/<\/EM>/gi,"[/i]");a=a.replace(/<h\d>/gi,"\r\r[b]");a=a.replace(/<\/h\d>/gi,"[/b]");a=a.replace(/&nbsp;/gi," ");a=a.replace(/<FONT Face[^\'\">]*[\'\">]/gi,"<FONT");a=a.replace(/ FACE=[^\'\"]*[\'\"]/gi,"");a=a.replace(/<STRONG>/gi,"[b]");a=a.replace(/<\/STRONG>/gi,"[/b]");a=a.replace(/<TR[^>]*>/gi,"\r");a=a.replace(/<TD[^>]*>/gi," ");a=a.replace(/<TH[^>]*>/gi," ");a=a.replace(/<\/TR>/gi," ");a=a.replace(/<\/TD>/gi," ");a=a.replace(/<\/TH>/gi," ");a=a.replace(/<FONT SIZE=/gi,"[size=");a=a.replace(/<FONT color=/gi,"[color=");a=a.replace(/ color=/gi,"][color=");a=a.replace(/ size=/gi,"][size=");var c;for(i=0;fc[i].font!=0;i++){c="";if(fc[i].color==1){c=c+"[/color]"}if(fc[i].size==1){c=c+"[/size]"}a=a.replace(/<\/FONT>/i,c)}for(i=0;al[i].pos!=0;i++){if(al[i].pos==2){a=a.replace(/<A HREF/i,"[url");a=a.replace(/<\/A>/i,"[/url]")}if(al[i].pos==1){a=a.replace(/<A HREF[^<]*<\/A>/i,al[i].face)}}a=a.replace(/<[^>]*>/g,"");a=a.replace(/>/g,"]");a=a.replace(/\'>/g,"]");a=a.replace(/\">/g,"]");a=a.replace(/\']/g,"]");a=a.replace(/\"]/g,"]");a = a.replace(/\[url\=([^\]]+?)\]|\[img\](.+?)\[\/img\]/g, function($0,$1,$2){if($0.indexOf("http://")<0){var u = $1||$2,b="/";if(u){if(/^\.?\//.test(u)) b = "";return $0.replace(u,content.location.origin+b+u)}}else{return $0}});return a};
            Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(HTMLtoBBCode(div.innerHTML));
            XULBrowserWindow.statusTextField.label = "复制：" + HTMLtoBBCode(div.innerHTML);
        },
        condition:'select noinput',
    },
    pDeleteSelectedArea: {
        label: "删除选中部分网页",
        oncommand: "content.getSelection().deleteFromDocument(0);",
        condition:'select noinput',
    },
    pOpenSelectedAreaURL: {
        label: "打开选取范围内的URL",
        label_tw: "开启选取范围内的URL",
        oncommand: function(event) {
            var urls = {};
            var reg = /h?t?tps?\:\/\/(?:\w+\.wikipedia\.org\/wiki\/\S+|[^\s\\.]+?\.[\w#%&()=~^_?.;:+*/-]+)/g;
            var matched = addMenu.focusedWindow.getSelection().toString().match(reg) || [];
            matched.forEach(function(url) {
                url = url.replace(/^h?t?tp/, "http");
                if (!urls[url])
                    gBrowser.addTab(url);
                urls[url] = true;
            });
        },
        condition:'select noinput',
    },
    pOpenSelectedAreaLink: {
        label: "开启选取范围内的链结",
        oncommand: function(event) {
            var urls = {};
            addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
                if (!urls[a.href] && /^http|^file|^about/.test(a.href))
                    gBrowser.addTab(a.href);
                urls[a.href] = true;
            });
        },
        condition:'select noinput',
    },
    pCopySelectedAreaLink: {
        label: "复制选取范围内的链结",
        oncommand: function(event) {
            var urls = {};
            addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {urls[a.href] = true;});
            urls = Object.keys(urls);
            if (urls.length === 0) return;
            addMenu.copy(urls.join('\n'));
        },
        condition:'select noinput',
    },
    pOpenSelectedAreaImage: {
        label: "开启选取范围内的图片",
        oncommand: function() {
            var urls = [];
            addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
                if (/\.(jpe?g|png|gif|bmp)$/i.test(a.href) && urls.indexOf(a.href) === -1)
                    urls.push(a.href);
            });
            if (urls.length === 0) return;

            var htmlsrc = '<style> img {max-width: 100%; max-height: 100%;} </style>';
            htmlsrc += urls.map(function(u) '\n<img src="' + u + '">').join("");
            gBrowser.addTab("data:text/html;charset=utf-8," + encodeURIComponent(htmlsrc));
        },
        condition:'select noinput',
    },
    pTickSelectedAreaCheckbox: {
        label: "勾选选取范围内的选择框",
        icon: "checkbox",
        checked: true,
        oncommand: function(event) {
            addMenu.$$('input[type="checkbox"]:not(:disabled)', null, true).forEach(function(a) {
                a.checked = true;
            });
        },
        condition:'select noinput',
    },
    pCancelSelectedAreaCheckbox: {
        label: "取消勾选选取范围内的选择框",
        icon: "checkbox",
        oncommand: function(event) {
            addMenu.$$('input[type="checkbox"]:not(:disabled)', null, true).forEach(function(a) {
                a.checked = false;
            });
        },
        condition:'select noinput',
    },
    /* --------------------------------------------------------以下以链结 / 页面的------------------------------------------------------------------- */
    aOpenInSidebar: {
        label: "在侧边栏开启",
        tooltiptext: "当前链结 / 页面",
        oncommand: function(event) {
            var title = gContextMenu.onLink? gContextMenu.linkText() : gContextMenu.target.ownerDocument.title;
            var url = gContextMenu.linkURL || gContextMenu.target.ownerDocument.location.href;
            openWebPanel(title, url);
        }
    },
    aCopyTitleUrlOrLinkClick: {
        label:"以特定格式复制当前链结 / 页面",
        tooltiptext: "左键：BBCode\n中键：MD 格式\n右键：HTML Code",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg==",
        onclick: function(event) {
            var title = addMenu.convertText("%RLT_OR_UT%"),
                url = addMenu.convertText("%RLINK_OR_URL%");
            // 简化下标题
            [/\s(·|::|-|—|»|\|)\s.*/i, /_[^\[\]【】]+$/].forEach(function(r) {title = title.replace(r, "");});
            var formats = [
                "[url=" + url + "]" + title + "[/url]",
                "[" + title + "](" + url + ")",
                '<a href="' + url + '">' + title + '</a><br>'
            ];
            addMenu.copy(formats[event.button]);
        }
    },
    aOpenUrlInChrome: {
        label: "Chrome 开启当前链结 / 页面",
        text: "%RLINK_OR_URL%",
        exec: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        accesskey: "C",
    },
    aOpenUrlInIE: {
        label: "Internet Explorer 开启当前链结 / 页面",
        text: "%RLINK_OR_URL%",
        exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
        accesskey: "I",
    },
    aOpenUrlInWebcache: {
        label: "当前链结 / 页面的 Google 快照",
        url: "http://webcache.googleusercontent.com/search?q=cache:%RLINK_OR_URL%",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH7SURBVDhPhVI9a9tQFBUeO4YOwZTSH+Ch1I2esIdi10jvPYsMmTLkH5Sm9lI8FIsOHUsU+gOMKSGEBNwiB5K9xJbdQJYQYtWIYEonL82HBhNe7316LnbT2AcOsu5759xzr6zdB+FoibPlTPL6OJMUQkuo8nwEtvGsx/TtgOuXASci6hripkMuoy7ZufaXnqtr/0eP69UeI7coDBjpH7JseLKXDW+6RhgbGbdg9F5dj3FeNAryyck7KeR6GHCDYs2y6JZpss/4O+rq5oRRFWsS0PEXRD4G4QjFOLc6mjJAXPlLi2iCSa78zFNZhK6tuDMRMELwo0hWcYF49q8BIvINiimAcR2EW2MDxcO+nX5sWdYT06TnlsXOKKWP5GWFeBQylC89Tj6gEEa5gD2syCIAujdALJCQ4hRYi8lp1CENTPH7e/ohGqyhyU87/UBpJUC4O2mA4yAhDc81aSPfhPqBuaCu3wXGHu+Ac76oyhJ5j4U5j8UjIF59+pYsua2N8uaR/Hyz8HKf2dg936R1VdK0dbeTeuO2R6WN1uD1ZntqYZMofCkkofsAOHrhFVOqHKPktt8CBZqsu77tOOLv/99xnETOo1yKoTvsoKKOpgFjVGQSZQT0QPAVBBcyNnS+VzwGjgNGdTAaopHsCAsD1u7Enofyx6OFmZ9K07Q/7iAmIuxhVMIAAAAASUVORK5CYII=",
        accesskey: "W"
    },
    aViewSource: {
        label: "检视源代码",
        tooltiptext: "当前链结 / 页面",
        url: "view-source:%RLINK_OR_URL%",
    },
    aOpenLinkInGoogleTranslate: {
        label: "Google 翻译",
        tooltiptext: "当前链结 / 页面",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC",
        url: "http://translate.google.hk/translate?u=%RLINK_OR_URL%",
        accesskey: "T"
    },
    aOpenLinkInGoogleDocs: {
        label: "在 Google docs 开启",
        tooltiptext: "当前链结 / 页面",
        url: "http://docs.google.com/viewer?url=%RLINK_OR_URL%",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADrSURBVDhPnZO9CsIwFEb7cLY11fcxf66Ckz6FiIubiOKg0tzEQXFwVRCdfAARFU2kCvWKLf3gQIab890U6vksnpdYvCtETc08dwgYPApRi7cfAeF6GXHdJtK0/uFmQgErJIikHng5QwQMkSAQ+kCEmuWhzOGIBBVpOklBZuy2XbwBUyci9DoPbhYJnDUpyExFQg8JQqr2IVOTXNhZJCgLPUoKMkOkHiOBfZuJBDQyqUODcFggQcDVJilA8am6v2a+SX3Euun/aqxK0/QZ3NBlR2oDCteQwvkb235BF9+kBEV4Cewv6Q6FoDB9ApgI8l6APDOdAAAAAElFTkSuQmCC",
        accesskey: "D"
    },
    aOpenLinkInRelated: {
        label: "查找相似页面",
        tooltiptext: "当前链结 / 页面",
        url: "https://encrypted.google.com/search?q=related:%RLINK_OR_URL%",
        accesskey: "S"
    },
    aOpenLinkInRLink: {
        label: "检视反向链结",
        tooltiptext: "当前链结 / 页面",
        url: "https://encrypted.google.com/search?q=link:%RLINK_OR_URL%",
        accesskey: "R"
    },

    // Oos 自用功能2
    /* ----------------------------------------------------------------以下是其他的------------------------------------------------------------------- */
    aAddMenuPlusClick: {
        label: "addMenuPlus",
        tooltiptext: "左键：重载配置\n右键：编辑配置",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC0klEQVQ4jY3M70sTARzH8e8OZ8LccileaXjbpLbLzW535Fzt7lxuxjbnwNAS19QhlfQDQaQOSSVT+zGRQPuhPvBCRHoSFDmxgujns1L6d+I+PTBL64kPXo8+bz6UPn/+ZLarazqbTs/u1N2Zns10bOnu3L1l0+nZbCZzN93W5qbmWOxxayqFf/VcSqJ/OIH+4QR6Lif/21tTqZ+xSKSfGsNhPZlIYKdUSxz3VuJY/pHA8o8E7j+PI9US39U0x2KGKssaKaGQfiYaxbamxijOZSKY/xTD0mYCS5sJLHyOoaM7gqbGnV2jcSoY1ChQV6eHFQVhVUVYVaHKCq6MNkDfaMLDfBQP81E822jCtbEwVHlnJxsnJEkjSRD0YCCAbYoSwJ1lFfr3CK6Py7h6W8bitwgmnqtQG/529XV1huD1alTD87ooCBAFAYJPQKxVxMw7BY8/qGhulxA/K+HRexWz7xU0t4sQfL/b48cNz9GjGlVXV+u8xwPe44HH7UFW8+PJlxDGVurhl3gIfh6jSwE8/RrCxRERvHu7dRsuh0OjyspK3clxcHAc+BonhhZFzHyqR/aWD04HByfHIXPDi5mP9RhZllBT64SD4+CoqjIOsaxGpXa7fpBlwZaxOHmGw4NVEdNvJWgLXvRN8uib5HFzzovpNxJyayIaWhxgy1iw5eVGqd2ukdVi0UtsNpTYbOgYcGJqvRa5vIBc3o+ptS25vB+5vICp9Vp0Dblgt5dgv9VqWCwWjcxms15YWITyCgsG547gwZoX2dFq+GUWorLFL7O4oLlwP++FtuhGhbMYZvM+o6CgQCOGYXTGxMB/2obxVzzGXx6DL2SDiRgwpi0mYuCWijH2gsfkKo9g0g4TmQwi0oiIdCJCMHkAvRMutA8eRpGVARHtUljE4Gx/JXonXWhoKwMR/TmY/zfeo59ENEBElCKiF0S0SkSv92iViFaIKPALvt6gJtieLooAAAAASUVORK5CYII=",
        oncommand: "setTimeout(function() {addMenu.rebuild(true);}, 10);",
        onclick: "if (event.button == 2) {event.preventDefault(); addMenu.edit(addMenu.FILE);}",
    },
    aMouseGesturesClick: {
        label: "鼠标手势",
        tooltiptext: "左键：重载配置\n右键：编辑配置",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADQUlEQVQ4jZ3M708TBxzH8a9FXANhof5YUTZayo/C9dxaSn8ctBzNtcd6R+2Q1gktUCGYjC1LcVvY6dR1A0ONiBgqTHTrLdqMB2pwUnFj4qYZmXM/3Z9j7rMHZpo9W/bg9eTzTj6UPHiwLTUwNDvYl8z9I5VI5oaT/5ZKPO+Dfcnc8ODgdDIet5LUFV5IDOxD+qSM8Y9ljGdkDI9FsD8afaa3J4q3PujGeOZpf+doN+Lx6JNwMJimQEdAHXk3jC9/lXH1TxmFv2RMFyTsi0iIyDK6JRkH+iUs3pVQeCyj8FjGZ/ckxPpe1/h2v0I+j08dGgtCfSThyu8yrvwh48J6GD2xILqCIYhCCKm3g8j//Lwv3A3jjV5B4zycQm6nW+0f5fH5QxGXNkVc2Ajh8kMRicM8eF8HeH8H0lMBqL+JmP82hPwvIubXQ5Aifs1ldypkt9nV2BCHpU0Bue8COL7UgS8eCRjL+OB1eeBr9yCT57G0KeDYoh+XfxIwtxaAILo1lmEVaqprUiN9LVi8z+PcHT+GJ1xYvM/jo0scnC128IIDZ4t+zNzyY/SYCxd/5DFzyw9f52taY32jQuZXalVxP4v5e22YKXKQ3mSRXeFw+msv3O3NkA6wyP3QhomcC7HDe7HwwIfsihet3ibNXGNWqGrXbrWzux6z625kV13wdNbhyHkH5jY8EHoakDjCYP6BF/1pG6SEFee/92DyWitYh1kz7jIqVFlhULlQDc6steDUigOssxq9Yw2Y22jFwEQD0ucYnP3GiTbRBCFmxuy6E5llOxqZ3ZqhwqBQWWmZ6uSNyK7uxafXWNTbdqC1swrZ1Vdx/CqDyessThRsqLFsBx/dgzN3nu41FoOm31aukE5XqrKcAVM3GZxcbobJWgFjdTmUfBOyRRtO32YxesoCvV4PTt6JbNEGJW+FsbpM0+m2KkSkU62uckzdbMaJZSv2WPQo2VqCQxkTsmsMsrcZiENGbCEdXF2VmC4y+DBfj8qXSjUiUoiI1CrLNqQyZiSOmlCxswREBGfoRYxMWXDok1qYGD2ICHUOPUYmaxF//2W8ULbl2cESEeF/eEJE7xERRYnoBhEViWj1PyoS0VdE5PkbM4PG4kQUIjsAAAAASUVORK5CYII=",
        oncommand: 'ucjsMouseGestures.reload(true);',
        onclick: 'if (event.button == 2) {event.preventDefault(); closeMenus(event.currentTarget); ucjsMouseGestures.edit(ucjsMouseGestures.file);}'
    },
    aKeyChangerClick: {
        label: "KeyChanger",
        tooltiptext: "左键：重载配置\n右键：编辑配置",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADKUlEQVQ4jY3M4W8TBRgG8LfX9bbYta6O7G6MrDcK9NqNcrSj10J7XXdtl+t1rQymyErLUAgwXSYq5lCzKNNBE7YEHVUYjCNoNMZAIpsGNNHpdFESDH8PuccPM2N+0g+/5Mn7PHmpfOjQ3mPV6uzRcnmu8tKao+Xy3LEN/tWN/HOvVC6Uh4f9VNC0+lDpeRweKeK1d3WMv6ejXC1iqFRaUyzhcHmtm5jUcerNQRw8UMJQqfREy2QmSE2nzYKmY/S0BvOhjtt/6Th5VkNB01HI6zgwrGH6Cw2fP9axsFrA2Lk8BvU8CppmpZJJg5REwsypWRw5kcHNP/O49SiPV85kkU1nMVjM4P0bWdx+nMfC7wWcensAOTWDgWwWOVW19sXjBsnRqJlKKHhhNIX51RwWHuZQGeuDqio4N5eG+SiHa79pOP5WP1JJBX1KCulUCqlk0toTiRgUkSQztkfG/pEYrq70Y35VxZFX43j9YgLX/1Dx6XIGo2cUxKIy4vJTsWjUknp6DOoOBExppwT9YBhXflLw2a8pTH0VR31ZwfxqH8YvxLE7FMJuSUJ4A2nXLkvcscMgn89nittFqMVuXP5xL678kkB9JYH6ShL1lQSmvpaRUIMQ/SKC4lOi329tFQSDOjo6TO8WL5ID23DpfhSXf5ZRW5RxfDKM2qKMj5dljM+E4A8IELxedAkCugQBQmen1c5xBrV6PCa3iUM03YnaUhizP0Sw/4QfPMdjeEzE7INezNwPY+ikDzzHged48DwPrq3NavV4DHI5naa72Q1pH4fpb3eithRCLNcOl9ON9s3P4XQtgJkHEs5/04PeNA93sxstLS141uWynE6nQQ6Hw2RZFoHeFkzdCWL6Xjci/a1gHSxYloWv24N3zCBq3/dg4pNtaPc2g2Wb0NjYaDU0NBjEMIzJ2Bj4pGdw/q6Ij+4FEFJcYGwM7HY7GMaOWH4Tpu4GcfG7IF48uxlskx2MjbGIyCAiMokIbV4HKpMCRj/oQmeABRGtY+w25Ko8Xv5wK6qTAraITSCi9QfXNo7/k209PyGiN4iISkR0h4iWiGjxf1oioi+JSP4bgBShrHCwMCYAAAAASUVORK5CYII=",
        oncommand: 'KeyChanger.makeKeyset(true);',
        onclick: 'if (event.button == 2) {event.preventDefault(); KeyChanger.edit(KeyChanger.file);}'
    },
    aTestProfileClick: {
        label: '测试配置',
        tooltiptext: "左键：Fx 31\n右键：Fx Nightly",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeklEQVQ4jY3M70sTARzH8a+nm8LccijeRNmPbLrp1OVw58zdOTeV3W1dTiXTMXUP+vFEBOnBQVhUlBSaoEMqJA5JeyBWZCsKBCECIagQ/xu5Tw+kMVeRD14PvnzffCg5OtqVnph4kk4mM5NXkpnUf0yOJzPpZDKTTqXmkyMjjRSLRlcTsozhhIwbN2OYmZMw/Q8zcxKuz8YwNCgjIctH0UhkhsKhkBoXJQwmRKx8FLF5GMPGgYSNAwkvfx77fW8exrD0TsQlWYQUjWpCMKgQ392tDkT6IEkR3F4Vsbgdx8JWHCsfYlj/IWH9u4TlbAwLW3Esbsdxa1mEGI2gPxzWLgQCCnF+vxrieYQEHqHQsR6Bx+R0D15868fafj/GrgroyfuHBB5CMKh1+HwK+bxeNcBxyNfZwWHsWgBr+2E8+9qLoVQAnR0Fjd+veT0ehZrdbrXd60U+r8eLxJQPT78IWN3jEbvcDm9LQdPWprkaGhSqr69X3S4XmvK4nC7Ex1uQ2evC8m4X+gY9cDkLmsZG7azdrlBtba3qsNngsNtzbHU29A07sbTLYfGzH4J4Dra6k43datVqWFahSrNZtbAsLBZLDlvFQrhox8InHx5n28GFrWCrCprqaq3SbFbIaDCoFSYTcipMMJabEBiowaNsK+Z3WnA+yMJUnt9U4IzRqBkMBoV0Op1aVlaGfHqdHr7eSjzcacb9N01o5szQ6/QnmtLSUq2kpEQhhmHU4uJi5GOKGLTyRjzYcePeWzecPgOYIuZkwzAaESlERCoRoZDVrcfUXQcm7tjBOnR//IkoN/D8bwOncEREs0REMhG9JqIsEb0/pSwRvSIi7hdK9oRv83og6gAAAABJRU5ErkJggg==",
        onclick: function(event) {
            var txt = "-no-remote -profile E:\Profile";
            switch(event.button) {
                case 0:
                    var file = "Mozilla Firefox";
                break;
                case 2:
                    var file = "Nightly";
                break;
            }
            addMenu.exec("C:\\Program Files\\" + file + "\\firefox.exe", txt);
        }
    },
    aTestProfile: {
        label: '切换用户配置',
        text: "-no-remote -p",
        exec: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe'
    },
    aDownloadToSpecificLocation: {
        label: "下载链结 / 页面到指定位置 (不弹窗)",
        tooltiptext: "下载链结 / 页面到指定位置 (不弹窗)\nUC Script 下载到 chrome 资料夹\nUser Script 下载到 UserScriptLoader 资料夹\nUser Style 下载到 UserCSSLoader 资料夹\nJavaScript 下载到 local 资料夹",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCElEQVQ4jd2RsWoCURBFFwIJSUrFQuyUx8Luu+dCyAeIQmp/IB8k6bQx+UFLCxGirKZZQ7I+Y9Lmwq3ezJk787KsIUn3wMz21vah9haYSbpv1p+oLMs+sPzSfLB9AJZlWfYvAoBge9UE2F4B4b8CiqK4jjE+AENJz8A6ccR1/TYsiuJxMBjcfAJ6vd6tpCnwDuwT04+QfV3z0u12776lyPO8BSwa/9/0Fljked5KrnIB8nPzUSGEdgKyBRYhhHbq6hNJnTNJdrZ3qcmSOsAkAypJo1QSSVNJ09RkSSOgyoAqxjg+s9FV7RPFGMdAldneSHqVNPqtgSfbb7Y3GTC3vQGqP3hf98w/AHA+wuIFFjTgAAAAAElFTkSuQmCC",
        onclick: function(e) {
            var url = addMenu.convertText("%RLINK_OR_URL%"),
                uri = Components.classes["@mozilla.org/network/io-service;1"].
                      getService(Components.interfaces.nsIIOService).newURI(url, null, null)

            var file = Components.classes["@mozilla.org/file/directory_service;1"].
                       getService(Components.interfaces.nsIProperties).
                       get("ProfD", Components.interfaces.nsIFile);

            // 添加哪个文件夹名
            file.append("chrome");
            if (url.endsWith(".uc.js") || url.endsWith(".uc.xul")) {

            } else if (url.endsWith("user.js")) {
                file.append("UserScriptLoader");
            } else if (url.endsWith(".js")) {
                file.append("local");
            } else if (url.endsWith(".css")) {
                file.append("UserCSSLoader");
            }

            // 添加文件名
            file.append(getDefaultFileName(null, uri));
            internalSave(null, null, null, null, null, null, null, {
                file: file,
                uri: uri
            }, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
        },
    },
    aDownloadToSpecificLocationClick: {
        label: "下载链结到指定位置 (不弹窗)",
        tooltiptext: "左键：E:\n中键：F:\n右键：D:",
        onclick: function(e) {
            var url = addMenu.convertText("%RLINK_OR_URL%");
            var path = [
                "E:",
                "F:",
                "D:"
            ];
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            file.initWithPath(path[event.button]);
            file.append(getDefaultFileName(null, uri));
            internalSave(null, null, null, null, null, null, null, {
                file: file,
                uri: uri
            }, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
        },
    },
    /* ---------------------------------------------------------------以下是tab的------------------------------------------------------------------- */
    aAllReloadOrStopClick: {
        id: "context_reloadAllTabs",
        label: "重新 / 停止载入所有分页",
        tooltiptext: "左键：重新\n右键：停止",
        onclick: function() {
            if (event.button == 2) {
                var len = gBrowser.mPanelContainer.childNodes.length;
                for (var i = 0; i < len; i++) {
                    gBrowser.getBrowserAtIndex(i).stop();
                }
            }
        }
    },
    aCloseAllRightOrLeftClick: {
        label: "关闭左边 / 右边所有分页",
        tooltiptext: "左键：左边\n右键：右边",
        accesskey: "L",
        oncommand: function() {
            var tabs = gBrowser.mTabContainer.childNodes;
            for (var i = tabs.length - 1; tabs[i] != gBrowser.mCurrentTab; i--) {}
            for (i--; i >= 0; i--) {
                gBrowser.removeTab(tabs[i]);
            }
        },
        onclick: function() {
            if (event.button == 2) {
                var tabs = gBrowser.mTabContainer.childNodes;
                for (var i = tabs.length - 1; tabs[i] != gBrowser.selectedTab; i--) {
                    gBrowser.removeTab(tabs[i]);
                }
            }
        },
        insertBefore: "context_closeOtherTabs"
    },
    aCloseOtherClick: {
        id: "context_closeOtherTabs",
        label: "关闭其他 / 重复分页",
        tooltiptext: "左键：其他\n右键：重复",
        oncommand: "gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);",
        onclick: "if (event.button == 2) {CloseRepeatedTabs();}"
    },
    /* ---------------------------------------------------------------以下是Image的------------------------------------------------------------------- */
    pSevenEnginesSearch: {
        label: '七引擎搜图',
        oncommand: function() {
            var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
            var SEs = [
            'http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=',
            'http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=',
            'http://pic.sogou.com/ris?query=',
            'http://iqdb.org/?url=',
            'http://regex.info/exif.cgi/?url=',
            'http://saucenao.com/search.php?db=999&url=',
            'https://encrypted.google.com/searchbyimage?image_url=',
            ];
            var lastTab;
            for(var n = 0; n < SEs.length; n++) {
                lastTab = gBrowser.addTab(SEs[n] + url);
            }
            gBrowser.selectedTab = lastTab;
        }
    },
    pOpenImgRar: {
        label: "打开图像rar",
        image: "moz-icon://file:///c:/program%20files/WinRAR/WinRAR.exe?size=16",
        oncommand: function() {
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            try {
                var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
                file.initWithPath(path);
            } catch (e) {
                var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
            }
            file.initWithPath(path);
            Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
            setTimeout(function () {
                file.launch();
            }, 100);
        }
    },
    /* ---------------------------------------------------------------以下是Input的------------------------------------------------------------------- */
    pPasteAndEnter: {
        label: "贴上并确定",
        insertAfter: "context-paste",
        oncommand: function(event) {
            function $(id) document.getElementById(id)

            // 给原输入框增加空格
            var input = gContextMenu.target;
            input.value = input.value + " ";

            $('context-paste').doCommand();  // 粘贴

            // 回车键
            window.QueryInterface(Ci.nsIInterfaceRequestor)
                .getInterface(Ci.nsIDOMWindowUtils)
                .sendKeyEvent("keypress", KeyEvent.DOM_VK_RETURN, 0, 0);
        },
        condition:'input'
    },
    pPasteDateAndTime: {
        label: "当前日期 & 时间",
        oncommand: function() {
            var localnow = new Date().toLocaleFormat("%Y.%m.%d & %H:%M:%S");
            addMenu.copy(localnow);
            goDoCommand("cmd_paste");
        },
        condition:'input'
    },
};

var Funcs = {
    saveText: function(text, filename) {
        saveImageURL('data:text/plain;charset=UTF-8;base64,' +
            btoa(unescape(encodeURIComponent(text))), filename + ".txt", null, null, null, null, document);
    }
};