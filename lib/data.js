/*
    a 开头代表所有，例如 aCopyUrl
    p 开头代表 page 专有，例如 pCopyLinkTitle
 */
var Data = {

    aAddMenuPlusClick_ucjs: {
        label: "addMenuPlus",
        tooltiptext: "左键：重载配置\n右键：编辑配置",
        accesskey: "r",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC0klEQVQ4jY3M70sTARzH8e8OZ8LccileaXjbpLbLzW535Fzt7lxuxjbnwNAS19QhlfQDQaQOSSVT+zGRQPuhPvBCRHoSFDmxgujns1L6d+I+PTBL64kPXo8+bz6UPn/+ZLarazqbTs/u1N2Zns10bOnu3L1l0+nZbCZzN93W5qbmWOxxayqFf/VcSqJ/OIH+4QR6Lif/21tTqZ+xSKSfGsNhPZlIYKdUSxz3VuJY/pHA8o8E7j+PI9US39U0x2KGKssaKaGQfiYaxbamxijOZSKY/xTD0mYCS5sJLHyOoaM7gqbGnV2jcSoY1ChQV6eHFQVhVUVYVaHKCq6MNkDfaMLDfBQP81E822jCtbEwVHlnJxsnJEkjSRD0YCCAbYoSwJ1lFfr3CK6Py7h6W8bitwgmnqtQG/529XV1huD1alTD87ooCBAFAYJPQKxVxMw7BY8/qGhulxA/K+HRexWz7xU0t4sQfL/b48cNz9GjGlVXV+u8xwPe44HH7UFW8+PJlxDGVurhl3gIfh6jSwE8/RrCxRERvHu7dRsuh0OjyspK3clxcHAc+BonhhZFzHyqR/aWD04HByfHIXPDi5mP9RhZllBT64SD4+CoqjIOsaxGpXa7fpBlwZaxOHmGw4NVEdNvJWgLXvRN8uib5HFzzovpNxJyayIaWhxgy1iw5eVGqd2ukdVi0UtsNpTYbOgYcGJqvRa5vIBc3o+ptS25vB+5vICp9Vp0Dblgt5dgv9VqWCwWjcxms15YWITyCgsG547gwZoX2dFq+GUWorLFL7O4oLlwP++FtuhGhbMYZvM+o6CgQCOGYXTGxMB/2obxVzzGXx6DL2SDiRgwpi0mYuCWijH2gsfkKo9g0g4TmQwi0oiIdCJCMHkAvRMutA8eRpGVARHtUljE4Gx/JXonXWhoKwMR/TmY/zfeo59ENEBElCKiF0S0SkSv92iViFaIKPALvt6gJtieLooAAAAASUVORK5CYII=",
        oncommand: "setTimeout(function() {addMenu.rebuild(true);}, 10);",
        onclick: "if (event.button == 2) {event.preventDefault(); addMenu.edit(addMenu.FILE);}",
    },
    // 复制
    aCopyUrl: {
        label: '复制当前页面地址',
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
    aCopyTitleUrl_click: {
        label: "复制标题+URL（左中右三键）",
        class: "copy",
        tooltiptext: '左键标签+URL，右键标题，中键 URL',
        onclick: function(e) {
            addMenu.copy(addMenu.convertText(['%TITLE%\n%URL%', '%URL%' , '%TITLE%'][e.button]));
        },
    },
    aCopyTitleUrl_click_2: {
        label: "复制标题+地址（左中右三键）",
        tooltiptext: "复制标题+URL\n左键 MD，中键普通，右键 BBS\n包含链接、非链接 2 种情况",
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

    // 粘贴
    pPasteAndEnter_input: {
        label: "粘贴并确定",
        condition: "input",
        insertAfter: "context-paste",
        oncommand: function(event) {
            goDoCommand("cmd_paste");

             window.QueryInterface(Ci.nsIInterfaceRequestor)
                 .getInterface(Ci.nsIDOMWindowUtils)
                 .sendKeyEvent("keypress", KeyEvent.DOM_VK_RETURN, 0, 0);
        }
    },
    pPasteDateAndTime_input: {
        label: "当前日期 & 时间",
        oncommand: function() {
            var localnow = new Date().toLocaleFormat("%Y.%m.%d & %H:%M:%S");
            addMenu.copy(localnow);
            goDoCommand("cmd_paste");
        },
        condition:'input'
    },
    pInsertBBcode_input: {
        label: '插入 code 代码',
        condition:"input",
        insertBefore: "context-undo",
        oncommand: function() {
            var str = addMenu.convertText('[code]%P[/code]');
            addMenu.copy(str);
            goDoCommand('cmd_paste'); 
        },
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAr0lEQVQ4je3RsQ3EIAwF0GzFBp6AFcgKDJGGljYFm7DGL90SiQH+VYnQHRDl6nyJAmQ/W2JZ3vydPSWuzvG8r85xT4mzniEC4GoEwEdYD3mMxRhprSUA1lq7xQBorWWMsV+Tc6aIMOc8nVZr5W1tu9EIajc6jmM8dIa1yGzrK1sIFJGfXxMRbiHcI6UUqioB0HtPYwxVlapKYwy99wRAVWUpZQy20HlO6PttCr3p5gPILuEqlhjZQQAAAABJRU5ErkJggg==',
    },

    // link
    pCopyLinkTitle: {
        label: '复制链接文本',
        text: '%LINK_TEXT%',
        insertAfter: 'context-copylink',
        condition: 'link noimage'
    },
    pCopyLinkTitleUrl: {
        label: "复制链接文本+URL",
        text: "%LINK_TEXT%\n%l",
        accesskey: "u",
    },
    pCopyLinkTitleUrl_md: {
        label: "复制链接文本+URL (MD)",
        text: "[%LINK_TEXT%](%l)",
        accesskey: "d",
    },
    pCopyLinkTitleUrl_bbs: {
        label: "复制链接文本+URL (BBS)",
        text: "[url=%l]%LINK_TEXT%[/url]",
        accesskey: "f",
    },
    pCopyLinkTitleClick: {
        label:"复制链接文本（左中右三键）",
        tooltiptext: "左键:BBCode|中键:MD代码|右键:普通",
        onclick: function(event){
            var formats = [
                "[url=%RLINK_OR_URL%]%RLT_OR_UT%[/url]",
                "[%RLT_OR_UT%](%RLINK_OR_URL%)",
                "%RLT_OR_UT%\n%RLINK_OR_URL%",
            ];
            var str = addMenu.convertText(formats[event.button]);
            addMenu.copy(str);
            if (event.button === 1) {  // 中键点击后自动关闭菜单
                document.getElementById("contentAreaContextMenu").hidePopup();
            }
        },
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg=="
    },
    
    pCopySelect: {
        label:"复制",
        tooltiptext: "左:默认、右:纯文本",
        accesskey:"C",
        condition:"select",
        insertBefore: "context-copy",
        onclick: function(event){
            if (event.button === 0) 
                goDoCommand('cmd_copy');
            else if (event.button === 2) 
                addMenu.copy(addMenu.convertText('%SEL%'));
        },
        image:""
    },

    // 标签
    aCloseAllTabs: {
        label: '关闭所有标签页',
        oncommand: 'gBrowser.removeAllTabsBut(gBrowser.addTab("about:newtab"));',
        insertAfter: 'context_closeOtherTabs',
        accesskey: 'Q'
    },

    aGBK2UTF8: {
        label: "GBK <-> UTF-8",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC3SURBVDhPY6AKmGs//z85GKp9WBlwtP/Yf2RwY/PN/xeXX4Ly/v+/f/D+/9XRa7EbsDV/O1gRSNNCj8X/T886A+aDAEhuV+UeMBtkCFYD0DFMw/OLz+FiMACyAMSHakcYALL1/aMPUGW4wYbUTZgG7G8+CJYE2QhSAPMSspPRMVQ7xABYAILoZYErwAbBACjgQGIgw0AAqxdAgjAFIAAyABQOyAaB2CCXYXUBORiqfTAYQD5gYAAArhcq19H6/18AAAAASUVORK5CYII=",
        oncommand: function() {
            var charset = gBrowser.mCurrentBrowser._docShell.charset;
            BrowserSetForcedCharacterSet(charset == "UTF-8" ? "GBK" : "UTF-8");
        }
    },
    aGbkUtf8_click: {
        label: "切换编码（左中右三键）",
        tooltiptext: "左键：UTF-8\n中键：Big5\n右键：GBK",
        onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);",
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

    // image
    pCopyImageBase64: {
        label: '复制图像的 Base64',
        text: '%IMAGE_BASE64%',
        condition: 'image',
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
        image: 'moz-icon://http://www.tineye.com/favicon.ico',
        oncommand: function() {
            var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
            gBrowser.addTab('https://www.google.com/searchbyimage?safe=off&image_url=' + url);
            gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + url);
            gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + url);
            gBrowser.addTab('http://pic.sogou.com/ris?query=' + url);
        }
    },
    pOpenInRar_image_app: {
        label: "打开图像RAR",  // 替换 openImgRar.uc.js
        condition: "image",
        oncommand: function(){
            var imageUrl = (gContextMenu.mediaURL || gContextMenu.imageURL);
            imageUrl = imageUrl.replace(/\.jpg\.thumb\.jpg$/, '.jpg');

            var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
            var path;
            try {
                path = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getCharPref("browser.cache.disk.parent_directory");
            } catch (e) {
                path = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfLD", Ci.nsILocalFile).path;
            }
            path += "\\Cache\\" + new Date().getTime() + ".rar"
            file.initWithPath(path);

            Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist)
                    .saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService)
                        .newURI(imageUrl, null, null), null, null, null, null, file, null);
            setTimeout(function () {
                file.launch();
            }, 100);
        }
    },

    aShortUrl_bookmark: {
        label: '短网址（当前页面）',
        condition: 'nolink',
        url: 'javascript:function iprl5(l){var d=document,z=d.createElement("scr"+"ipt"),b=d.body;try{if(!b){throw (0)}if(!l){alert("请输入网址！");return}d.title="(Shortening...) "+d.title;z.setAttribute("src","http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl="+encodeURIComponent(l));b.appendChild(z)}catch(e){alert("请等待网页加载完毕！")}}iprl5("%URL%");void (0);'
    },
    pShortUrl_link_bookmark: {
        label: '短网址（链接）',
        condition: 'link',
        url: 'javascript:function iprl5(l){if(l.startsWith("javascript:")){alert("该网址无效："+l);return;}var d=document,z=d.createElement("scr"+"ipt"),b=d.body;try{if(!b){throw (0)}if(!l){alert("请输入网址！");return}d.title="(Shortening...) "+d.title;z.setAttribute("src","http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl="+encodeURIComponent(l));b.appendChild(z)}catch(e){alert("请等待网页加载完毕！")}}iprl5("%RLINK%");void (0);'
    },
    aOpenInPrivateWin: {
        label:"在隐私窗口打开",
        oncommand: "openLinkIn(addMenu.convertText('%RLINK_OR_URL%'), 'window',{private:true});",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKDSURBVDhPpY/PT5IBGMffWl76ceiS62/wlrc6uLmZM81MZ3noQik4NAWRVwXlVSbKDyEFcgoCyoshIvgCBpgS/siUhbnWDJrKVnaouS5tuTaX3wSxVrfGZ3sO3+/zPN89D5Ex7+dYWDLmIC1TsNnDWfcE1nNpeaS9Z5NeWv5NG4/aPgmorNSfr3s4LpHLmB2VwrdHSdzzkg7XnFw2tddNORL1XCtVWjpyIbVI4FRVlekOIWoxf9OrbTutLVN+Ra/747RrEevRGOKxBCJrb7EQjiL8PAqvZxljRgbdEttuC98alIrpN8Imy1dCKuRtzljb4PFE4A+sYdL5Cl7fOywuJ7C1vYf1jV3Q9ig02gUo+2ZgMc2ANnvAOLzoEo1uEWTTSCjgCYHqdO1z6wyb1dVKe3XNwCdZz1OsvExgdi6G+kYbbpdLP5RXiO13q+TxRsHYvscRAMk3LxKcmpHBee8c+Pwh6/FvBEFR1GkuVxN1Tm2AtkXAYqlepFspamuVTveoDZwHRjnRyeM8spscUPe5v3d1jTvb2x1ikcjWIBQ+DtH0KsasyyBJc0AgsDaQJH3UM3mUPU9+aLqNP0tKNFeIyMR1yNuaj35aQv/AM6jVfgz0B6HRzIJhXqdKqz32FQpfynfRDBo4en/qnN1wGZrvV3iFvNGVCQsDxrWEadcaBnU+hIIRzPtXYTYEwbgjmJ4MY9xgB9nYHyss1Fz+HWAWZyM3l53FZg2ppGLDZ73Scqjo0B1IWofjEnI4rujQHuh6DYedpPZLDUurLi7uvZhaTnISkJZEQYHqUlmJquhmkfJaXh51Jlm3bsivJr38fFl2euwP/wb8NxkH+HU5mQVkBkH8AgvRfy93EDdrAAAAAElFTkSuQmCC"
    },
    aOpenInGoogleCache: {
        label:"在谷歌缓存打开",
        url:"http://webcache.googleusercontent.com/search?q=cache:%RLINK_OR_URL%",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH7SURBVDhPhVI9a9tQFBUeO4YOwZTSH+Ch1I2esIdi10jvPYsMmTLkH5Sm9lI8FIsOHUsU+gOMKSGEBNwiB5K9xJbdQJYQYtWIYEonL82HBhNe7316LnbT2AcOsu5759xzr6zdB+FoibPlTPL6OJMUQkuo8nwEtvGsx/TtgOuXASci6hripkMuoy7ZufaXnqtr/0eP69UeI7coDBjpH7JseLKXDW+6RhgbGbdg9F5dj3FeNAryyck7KeR6GHCDYs2y6JZpss/4O+rq5oRRFWsS0PEXRD4G4QjFOLc6mjJAXPlLi2iCSa78zFNZhK6tuDMRMELwo0hWcYF49q8BIvINiimAcR2EW2MDxcO+nX5sWdYT06TnlsXOKKWP5GWFeBQylC89Tj6gEEa5gD2syCIAujdALJCQ4hRYi8lp1CENTPH7e/ohGqyhyU87/UBpJUC4O2mA4yAhDc81aSPfhPqBuaCu3wXGHu+Ac76oyhJ5j4U5j8UjIF59+pYsua2N8uaR/Hyz8HKf2dg936R1VdK0dbeTeuO2R6WN1uD1ZntqYZMofCkkofsAOHrhFVOqHKPktt8CBZqsu77tOOLv/99xnETOo1yKoTvsoKKOpgFjVGQSZQT0QPAVBBcyNnS+VzwGjgNGdTAaopHsCAsD1u7Enofyx6OFmZ9K07Q/7iAmIuxhVMIAAAAASUVORK5CYII="
    },
    aOpenInGoogleDoc: {
        label: "Google docs",
        url  : "http://docs.google.com/viewer?url=%l",
        accesskey: "d",
        where: "tab",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABfElEQVQ4ja2TP0vDUBTF8xH6EQJ2EJQmzUNEK5gmLoJDoZ0EoYMgCEKF0r63mAjN2FYQFHXo1KUiD7R54CARBItW6FRwyyfQgAaKdrhOrWmT/hG8cMffOZdzuBz33yNSzCcuNqHbVIdWcRxLDk0UQAxb8xc7UKPrPpHvZ6Uy3v0Gy4gRiFT3IFpIwvvjmk+k05DlkQISwzZiBKI0C2EtBUfVjYAr1FYwXCcZxAj0NqylIKylArJQ4etJ0YeCy4QkkzhegdniFsxoSavbVK2gQDsNmfecni97YcQIzJ1uA48TfKch80FXdJsK7dc2DCNGQGL5cs+AFiPluzME7asleLtfHQwUMWz5YJM4Is30O6/ofIiWBIeWBKAlAW5PJHipLoJtxmzOB9cxiAfnsLD7AMvZNiiGO3Ljhmtzkol1r4BYIVPBiuGCbHykBxqQrnMgZS+nguOGa/+2YOI0YgSE40OI5V4nwn137wi1/daKPtlZMVyIFz6tsT/xl/kByqC9TCzMcYYAAAAASUVORK5CYII="
    },
    aOpenInViewSource: {
        label : "View Source",
        url   : "view-source:%RLINK_OR_URL%",
        accesskey: "s",
        where : "tab"
    },
    aVideoDownload_flvcd :{
        label: "Flvcd 视频下载",
        url: "http://www.flvcd.com/parse.php?kw=%RLINK_OR_URL_ENCODE%&flag=&format=high",
        where: "tab"
    },
    aVideoDownload_flvxz :{
        label: "飞驴 视频下载",
        url: "http://flvxz.com/?url=%RLINK_OR_URL_ENCODE%&flag=&format=high",
        where: "tab"
    },
    aVideoDownload_youtube :{
        label: "YouTube 视频下载",
        url: "http://www.clipconverter.com/?url=%RLINK_OR_URL_ENCODE%",
        image: 'moz-anno:favicon:http://static.clipconverter.cc/images/favicon.ico',
        where: "tab"
    },

    // 书签小工具
    aTW2CN_bookmark: {
        label:"繁体转简体",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADlSURBVDhPrVPJDYQwDEwRroMKkPJLFUj8+NNBPjxSwn4ogBrogAq2hW3Cm8NOAgkR0m6kUWTkGQ9jEH85r/cHm1gnBADs9HF6TvSrwIFDDwi9wcUR7T2MtrYCARPO9wJEdo3jhMpPNf5OAoBqrQpk5AiathvsXO1cxWEVB4uWliRx2PP6LMrTqwKMnBiDq7gg+k2IJODhSVvIoilA64LeBmhF3HR2k8JsbYFsdnorXDwTIJvcnK9QrfQKTxy4pOfi42GBtCWilxnkq0rpy3A3BfwGUkMEi3g0M2iB80k/FNF/OUJ8Aad+5VEArUCmAAAAAElFTkSuQmCC",
        oncommand: function(){
            content.document.documentElement.appendChild(content.document.createElement("script")).src = "http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn2.js";
            content.document.documentElement.appendChild(content.document.createElement("style")).textContent = 'body { font-family: "微软雅黑" }';
        }
    }, 
    aAutoReload_bookmark: {
        label:"自动刷新",
        url: "javascript:(function(p)%7Bopen('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3E%E7%82%B9%E5%87%BB%E5%BC%BA%E5%88%B6%E5%88%B7%E6%96%B0%3C/a%3E%3Cscript%3Efunction%20i(n)%7Breturn%20d.getElementById(n)%7Dfunction%20z()%7Bc+=0.2;if(c%3E=t)%7Bc=0;e.location=u;r++%7Dx()%7Dfunction%20x()%7Bs=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0%7C%7Cc/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22%E5%88%B7%E6%96%B0%E8%AE%A1%E6%95%B0:%20%22+r;i(3).innerHTML=%22%E5%88%B7%E6%96%B0%E5%80%92%E8%AE%A1%E6%97%B6:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)%7Dc=r=0;d=document;e=opener.top;u=prompt(%22%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80%22,e.location.href);t=u?prompt(%22%E5%88%B7%E6%96%B0%E9%97%B4%E9%9A%94/%E7%A7%92%EF%BC%9A%22,300):0;setInterval(%22z()%22,200);if(!t)%7Bwindow.close()%7D%3C/script%3E%3C/body%3E')%7D)('status=0,scrollbars=0,width=240,height=160,left=1,top=1')",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK2SURBVDhPY0AGq/6HMs9/YFo794Hp8oUPrTIWP3Aymn/fXqC+noEJqoQwmHpT2nvybZlPU24p/pl0Tft130Xzox1n7YKg0vjBkmde8vMemkycekvu28Qb0v87Lyn8rzuu9q/ysG4DUJoRogoHWPLE3mD2PZ3DU27J/Zl8S+p/3zXZ/63nlP5XHtL4VLRP0xmqDDuY/9JUYvY97b2Tb0n/m3Jb6v+E69L/Oi/J/qg/qfKvdJ/WueKdemJQpWDwH+iaVaGhzFAuA8Os+zoZQH//mnRTCmTAvUk3ZTrazymmVB1Re160R2ti6CoGhGIgOCYjw3lYWVkbzJn535h1+h2lVZNuSnyfckNq6dS70nqr/jMw11/RYivZp92Wv0vPHawQCZy1sFA5qKraeMbYmJVh5lNJLmDIb5h8W7Jy4i0hPqgaMKifry+wONcMRey8u7vCUX39tfvl5HZukpTkYph5xph10i3J5CkvRXmgauDgsIGB/hETk/pjFhac++3tWU47OFgf1tU9sFdO7u9eaelVYBeAwJyH6lKrViEFChRsU1FJ2qqg8GafqWneAVPTtu1KSk+2SEn93ywp+WublFQmVBl2AAxppjVyctNXiIn9XyMl9XO1pOTfVUD2SjGxf2tERfevFRGRhCrFDlYpKfEvlpA4Ol9Y+D8ILwDihcLCfxeKiJxaKiJiDFWGG8yWl9ecLir6dKqg4P9pQDwdRAsJbZ8jLKwOlMafKoGAcaKoqHKvgMD+bn7+V718fD97+Pn/dfPwbAeyhaBqIGDlypWiixcvNl24cKH7okWLgoF0FJBOXrJwYeq87u7y2cXFk6bHx2+e7ONzo9/a+vn0zMxqkFqQHpBeBqBixSVLlgQB6WygYBWQ3QKkO4D0JKDYVBAGsRcvWNC5aN689oXz51eD1EL0LFIEAGnEJwptdKj6AAAAAElFTkSuQmCC"
    },
    aFitWidth_bookmark: {
        label: "宽度匹配",
        url: "javascript:(function(){function%20t(f){a=d.createNodeIterator(d,1,f,false);while(a.nextNode()){}}var%20d=document;t(function(e){x=e.offsetLeft;l=e.offsetParent;while(l!=null){x+=l.offsetLeft;l=l.offsetParent}var%20w=d.documentElement.clientWidth-x;var%20s=e.style;if(s.marginLeft)w-=s.marginLeft;if(s.marginRight)w-=s.marginRight;if(s.paddingLeft)w-=s.paddingLeft;if(s.paddingRight)w-=s.paddingRight;if(s.borderSize)w-=s.borderSize;w-=d.defaultView.innerWidth-d.documentElement.offsetWidth;if(e.tagName=='IMG'){h=e.clientHeight*w/e.clientWidth;s.maxHeight=h}s.maxWidth=w+'px'})})();",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGXSURBVDhPYxh4MHHiRPv///8zQrlEA5Ce/v5+B4aWlpZX9fX1TFBxogFIT3Nz8yu4AatWrWI+fPiwIFAOp2tAtoLUgNSiGLB//36WdevWuU2YMKEZKMECVY8BQHIgNRs2bHABscEGtLa2vt66dasrkHOdm5v77Zw5c3iBhhpkZ2ebAA0W2bZtmyiI3d7ert/Z2ckLUgNUew1kCFDda4a2trbP4uLi30RERP5zcXG9rays1BESEvouLCz8u66uLrampiYOyP8NEisrK9MGqQGpFRMT+wbSCzLgG5Dzi4+P7z8nJ+fb9PR0fUFBwV8CAgL/srKykjIyMlJAbCD+mZycrMfBwfGWl5cXZMAvoOu/gb2wePHilLS0tBcgA2bOnCkC9F8YUGPsmjVrVEE4NTU1FuiaUJAcyACgQc8XLVqUDPYCKCCAfuVYsGBBOtC50/AFItASVqA3pgPVpoH0gAMRRAA1MQEDi/3IkSPK+BIVSA6kBqQWpAfFAKgaogHcAGDUhJOblDs6OiIYQKkKKkYyoEQvFDAwAACRUudRsBI1mwAAAABJRU5ErkJggg==",
    }, 
    aCrackCopy_bookmark: {
        label: "破解右键防复制",
        url: "javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEZSURBVDhPjZExisJQEIYfrIW4HsBOq8VLLCoiKjYeQNAykHZBRQW9gPZewkJBiwVLL7B3sBRLC2c2M5mJL9FH/OEneZP//5L3Ykjj6Rxd5kCaXhVtS8wtDSb1NsQG2KWkJf4sDaQByFKJSx/aANjvEQYDnpFodqjVcdPuPEOSgNloglAoYJBEWK14vu71eX37yODS8+OQJIDvj8cQkM0i7HZ4/czzettoRhmpOwCBfr8r0VsZ1u3yXDNSdwNIUCyG5VwO8XLhmWak7gbovu8ECEyfT9KM1B8A23g+Pw7S98MrncfpFGWk/hoA1SqX/r7KvNbzgFIJFz9Dnkk9LnrAv9HzOKz7JhEUWq10gFqDrrVU4rIDaTbGmH8Vxu1dx2qGHAAAAABJRU5ErkJggg==",
    },
    aEditPage: {
        label:"编辑当前网页",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK1SURBVDhPY6AGYHn14fOqt2+/3MaHQWoYGCS5GLi5xRgY+BUYGHhEgXpZQQbwPH/z8Ty3pPIzRi6xx4w8oo9QMFCMTUju1cNnby4ANets3L53xa0HT3/NWLB6DgOPpAjIAKEnL9+dAip+6M8edguGmXhET/lHJYNpkEH7j5y6uGL1pi33n775f+LS7f9N05Z+YWDgUwYZIPz01bsTDFySd5i4xA5hYvHDIMNX7zrxY9aK7f93HTv/v2fu2v8dU2bvhhvw8NX7Y4xc4jcZeST2RgfIXYRhIH8/v1PM9aaeSV+Xbzn43zeu6H/HnDX/y5t6LzLxiKUC9cqADXj0/P0RBk7Rq4w84jsQWGIX0AUHW3snvoQ5G6RZN7f9NQOHRDUDt7gDMDAFwAY8fvHhEAOHyGVGLolNCUHKJ2ND5E/5ecpemDlr2nuYZpCzkyra7jDwSNUyMIu5MHBxSQD1soANePry436gqReA3ljLyC2+npFHbHvnxCnPkDU390//wsgp0YauGQSEH738sJeJX/IM0Nkrov0Uj02fNfN99+w1/5ds3AvWnJJT/S01p+QuA5tEELpmEBB+9OrdbiZu0ZMMfCKLgS5Y1zhh0S/v+ML/aX1L/2eUVL0HpYVpC5aeZWCQ0ASqR9EMAsKPX73bycgtcTwjp2QPv6z2Vp+E4v8xrbP/miRXfgJ65ywwgK+dOHPlAAMw5KB6UIDwk+fvtwMD8AQDn8R8bhGljVwSqkeBMXEOJAaKEZD3Hjx5vQOkFqIFFQg/ffF+q4SK/kURGY29glJqB3hEVU7xiiueAybvk3zSKodFFHSugNSA1EK0oAKhq3ceTnn17vOJd+8+nwQl68s37p69dP3uuXuPX5x5+e7dKZAcSA1ILUQLKuABJggloPe0GXiENbBiBh4tsBqwWmTAwAAAYo9bM5woFn0AAAAASUVORK5CYII=",
        oncommand: 'content.document.body.contentEditable = content.document.body.contentEditable == "true" ? "false" : "true";'
    },

    pGoogleImage_search_select: {label:"Google 搜索相关图片",url:"https://www.google.com/search?hl=zh-CN&site=imghp&tbm=isch&source=hp&q=%s",  where:'tab', image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH9SURBVDhPzVE7i5pREP1+gYWFIMKCIPgHfKyFoCkEwdbKQny/xbeCoCK4i6KfqCyCCGIlbGN+wgrCohAUY20TXEgXWEg7uWfwC0tIlSoDhzv3zpkzjyv9v2axWD4ZjUbv3d2dV6/X8wkYDAavzWbzqlQq9Y36d3t4eHgtlUqUTCYpk8kQ/EQiwVgsFiSE7pnocrme3G63bDKZZKEsW61W2Ww2yyLxLZfL0Wg0+sFEYcFg8HO326VarUYibwWeVC6XCUin01QoFPgURCoWi7TZbOh8Pv8Mh8PPgUDgWVQ+Hg4Hmk6n3Al4UiqVIuBWRPJ4PKtYLEar1Youlws9Pj6yWD6fp1arxaKn04mazSbF43GSIpEIAbd8yW63y9Vqle+z2ewNsWg0ytWQ0O/3OSbuX/AuifYIQEuohBHq9TqTRMVvSBLtswg4jUaDY8J/RadQYvVQKMQkPGazWXI6nZH5fP5dScQ7Cg2HQ/L5fHW/3/+VBZQRlKUo/nK5pOv1SpPJhLeOsTqdDm23W9rv91SpVLjg7xHw30oXEMK/r9dr2u1272gZNh6PX47HIw0GA+6IdwcHQKIygiKCzfd6vXeHwyGLf5dF7AU/ofBYoN1uE4C2P3aBIBYIIcSwF8ThA+DwN2q1WrtOp7tXq9UMjUbD+OgrAO/P+226fzVJ+gV+cHLx+IUV6AAAAABJRU5ErkJggg=="},
    pGoogleTranslator_search_select: {label:"Google 翻译所选文本",url:"http://translate.google.com/#auto/zh-CN/%s", where:'tab', image:"moz-icon://http://translate.google.com/favicon.ico"},
    pBaiduSearch_select: {label:"搜索所选文本",url:"http://www.baidu.com/s?wd=%s", where:'tab', image:"moz-icon://http://www.baidu.com/favicon.ico"},
    pBaiduYunSearch_select: {label:"百度云所选文本",url:"https://www.google.com/search?q=site:pan.baidu.com%20%s", where:'tab', image:"moz-icon://http://pan.baidu.com/res/static/images/favicon.ico"},
    pBingSearch_search_select: {label:"Bing 搜索所选文本",url:"http://www.bing.com/search?q=%s", where:'tab', image:"moz-icon://http://www.bing.com/s/a/bing_p.ico"},
    pSouku_search_select: {label:"搜库所选文本",url:"http://www.soku.com/search_video/q_%s", where:'tab', image:"moz-icon://http://www.soku.com/favicon.ico"},
    pYouTube_search_select: {label:"YouTube 所选文本",url:"https://www.youtube.com/results?search_query=%s", where:'tab', image:"moz-icon://https://s.ytimg.com/yts/img/favicon_32-vflWoMFGx.png"},
    pYYet_search_select: {label:"人人影视所选文本",url:"http://www.yyets.com/search/index?keyword=%s&type=resource", where:'tab', image:"moz-icon://http://www.yyets.com/favicon.ico"},
    pBooklink_search_select: {label:"BookLink 所选文本",keyword: 'bl', text:'%SEL%', where:'tab', image:"moz-icon://http://booklink.me/favicon.ico"},
    pZDIC_search_select: {label:"汉典所选文本",url:"http://www.zdic.net/search?lb=1&q=%s", where:'tab', image:"moz-icon://http://www.zdic.net/favicon.ico"},
    pWiKiEN_search_select: {label:"Wiki-EN 该词条",url:"https://en.wikipedia.org/wiki/%s", where:'tab', image:"moz-icon://http://bits.wikimedia.org/favicon/wikipedia.ico"},
    pWiKiCN_search_select: {label:"Wiki-CN 该词条",url:"https://zh.wikipedia.org/zh-cn/%s", where:'tab', image:"moz-icon://http://bits.wikimedia.org/favicon/wikipedia.ico"},

    // 外部程序
    aOpenDir_chrome_app: {
        label: "Chrome",
        tooltiptext: "打开 chrome 文件夹",
        exec: "\\chrome",
    },
    aOpenFile_chromeCss_app: {
        label: "userChrome.css",
        tooltiptext: "打开 userChrome.css 文件",
        exec: "\\chrome\\userChrome.css",
    },
    aOpenDir_gm_scripts_app: {
        label: "gm_scripts",
        tooltiptext: "打开 gm_scripts 文件夹",
        exec: "\\gm_scripts",
    },
    aOpenDir_userChromeJS_app: {
        label: "userChromeJS content",
        exec: "\\extensions\\userChromeJS@mozdev.org\\content",
    },
    pOpenWith_TW6_app: {
        label: "在 TW6 中打开",
        accesskey: "T",
        text: "%RLINK_OR_URL%",
        exec: "D:\\Program Files\\TheWorld6\\Application\\TheWorld.exe",
    },
    pOpenWith_IE_app: {
        label: "在 IE 中打开",
        accesskey: "I",
        text: "%RLINK_OR_URL%",
        exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
    },
    pOpenWith_chrome_app: {
        label: "在 Chrome 中打开",
        accesskey: "C",
        text: '%RLINK_OR_URL%',
        exec: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    },
    pOpenWith_7chrome_app: {
        label: "在 7Chrome 中打开",
        text: "%RLINK_OR_URL%",
        exec: "C:\\Users\\y\\AppData\\Local\\7Star\\7Star\\Application\\7chrome.exe"
    },
    pOpenWith_Maxthon_app: {
        label: "在 Maxthon 中打开",
        text: "%RLINK_OR_URL%",
        exec : "D:\\Program Files\\Maxthon\\Bin\\Maxthon.exe",
    },
    pOpenWith_Opera_app: {
        label: "在 Opera 中打开",
        text : "%RLINK_OR_URL%",
        exec : "D:\\Program Files\\Opera\\opera.exe",
    },
    aOpenWith_click_app: {
        label: "在其它浏览器中打开",
        tooltiptext: "左:IE、右:TWC",
        onclick: function(event){
            var url = addMenu.convertText("%RLINK_OR_URL%");
            if (event.button === 0) 
                addMenu.exec("C:\\Program Files\\Internet Explorer\\iexplore.exe", url);
            else if (event.button === 2) 
                addMenu.exec("D:\\Program Files\\TheWorld\\TheWorld.exe", url);
        },
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADjklEQVQ4jYWSfUzUdRzH34vL1h8aPhXHo4HLQYpjLBwjJyub669WhPWPuihrQopwd3AgwSAEjaFBgRFRPJjoqfcAHR4PcnHHhgh4xkND5OdxPw6Eu4Pzrt9N7hd9P/1RY7a1+d7ef7629157A09J0lndepdhc4Knb2OGn9vwwDe4TvB0QfQYMOnWI+L/GEm48pfU2JKu1rRGFXdz+NCKYzJWFEyB5O2UrCxrA6rnqpHmaEaGswWT/yG3pqu2Rxf3mFKax2Ybxx/6ZhaymWgPJEfrRqZp+cifV1+/GFOoLwMgAYC5GjjX4JeyrkdGF3ZOZvct+rvn7zPv0n5iHMh6KZl0v/VS6YSXDvfOs7gyk2NrxpVvAQTYa9C0NntHYVf/SeOCeNsxQv6lXcQGQObKpD9T6szLr1f2z32g4mz5o4L4mcnJ9tUOP9qSea2Wq8KbAIBwpS713R/vznbbx5joiiZmBA2eT1yuMHS/A+C5wIzrES8r9Yq939wayep3i0e65tnusm5OekITDwDYWWy4fHF0wicsJRIbBE2d27lA1PMKgGefdLS7tNtyrNP54OPeRUq+MLQQrtTVAQAOVN2c4uePMmYFjasO0YdNd1hMUddsVIGBjyow8JGnDPy2/A4+9oxp9tSQj31udtHbzWO+sBztMABAN1QhsLnnyVYfRzUTdirnRCrjRDrNiXR6WqTSaZG+vO+nkqkVKhrz0TGTi/b/NL4SlqMdB3lj9v5hj1h1X3yBVf9up+J7Kyzh3MDitvwO/p/q+fA8PR+mbOdDc9r4EIWWD5ZreKlMPRMkUzfiL+emisdDoJ+bTvoLxgRSWARvXHnf6NMeupbVaQw8bF7nPdxgnjuotzH5sLD6/tV77piSnqubj6sSAEiQ1rB+ywlVvFSuuSaVaazBMg0fJNNYpXL1UXh/hWe5LaAmpkg/EH/W7PvEuEgKi7D6ac+8J+G82Raa22bbUdgxk1jZZ03vdbkzb3tZapvNH5GjvQNAgkc3sPzvjYMic7STeypNwnttPEsfcJPM4iP5XR/JLD46PuSlgzdm2Vs/jDyOymvnNmVcehUA4OlEi6MJuQCQmFUasueLulu7ivTW1yqMzqTvR/z7WibYGw0WIbl20BVf3jMTmqs1bkhXbV9z4DRA6myF0f41yPYVprkzUMYqLqRI5ervQhTqwWCZeiJYpm6XZqurXsy8cgDAM086/Bu6p/mm80W+zQAAAABJRU5ErkJggg=="
    },
    pSendtoOneNote_app: {
        label:"发送到 OneNote",
        condition: "nomailto noimage nomedia noinput",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHCSURBVDhPrVNJL0NRFO7/EMTC/AvE1i+wsENjHn+A2JAYFhJaMeyI2IlFB68W5hZ92pKUV1NiClFp8Z56nuG1+dx71FyCOMmXfPe9c7977jnfNfxLOLIGwGFP64U1qQf2VDNsX4D+JZspP76dCWQPsI8mTOcPw1sjYKXMBk+5HZ6KBKi0w1fvgJDe9ypgSzFjrmAU+yN+BKf2cL0vQz2UcbUZJkR2znFzpBAPu0+w1bUMfmh8OxNgZUltToRcR+BxuRaEFrwmziP2EMXVVpi4rj1go2UeQmb/myvkDCLQuYh7+ZaSXIVjmMobQkyP0poLikYL8bsLDVLrwoceMAGpw4l75UnA3zQDT9UElcpD9p/BWycQ/1Ig0OF6qcDXMAn1QIa7xEKlq+z+vxLgk9BOI1BY00SjFZHdc6w2TtK/n1VQ44ASb9p2t5vGt948S+sfCYjFFshSiHgsGiN/LBWN0zqhgMBmKrU7Eb3TKUkJhGjjc9yeqWwSp8R1TU8wxtxBbJtEZpJjKOxk9ZCZhl2Bcw5uLG4kzsPLx5+NJGT0w1crQCy1QmSd/xYsx1s98d7KvBz+FujBMFt/i0SP6e9hMDwCEXZqhPWpJdgAAAAASUVORK5CYII=",
        insertBefore: "context-searchselect",
        oncommand: function(){
            var onenotePath = "C:\\Program Files\\Microsoft Office 15\\root\\office15\\Onenote.exe";
            var focusedWindow = document.commandDispatcher.focusedWindow;
            var selection = new String(focusedWindow.getSelection());
            if (selection.length == 0) {
                 goDoCommand('cmd_selectAll');
                 var allSelection = new String(focusedWindow.getSelection());
                 if (allSelection.length == 0)return;
                 goDoCommand('cmd_copy');
                 goDoCommand('cmd_selectNone');
            }
            else
            {
                 goDoCommand('cmd_copy');
            }
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            file.initWithPath(onenotePath);
            var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
            process.init(file);
            var args = ["/sidenote", "/paste"];
            process.run(false, args, args.length);
        }
    },
    pSearchInEverything_app: {
        label: "Everything 搜索",
        accesskey: 'E',
        oncommand: function(){
            var str = addMenu.convertText('%s');
            addMenu.exec("D:\\Program Files\\Everything\\Everything.exe", ['-search', str]);
        }
    },

    aSearchUserJS_addon: {
        label:"为此页搜索油侯脚本",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADSSURBVDhPnZK9DcIwEIXTsQBL0CAU15RQUtKwRAbIAlmCPuzADExAmwUyQHjPvrNs6zA/T/p0jvPe6Sy7MXQEE1ikXsBPWtzNRfD9DNvfqysadGH7s3RkMkh4kH2LLciUjW5Bj4prn0pkhlLoUXHtU1APHsAMpdAD9JixwSQ/r250cxlKgYesGYJ2UkODdmx9rQGvkkkn8JShEvGtQNQecPPMaoVSxLsBpv46xgGkP6pIE95ClNxsXfQVU0SJpS763jU4gTvgY9JHUjILGpY30DQvwsxGGOnZ9v8AAAAASUVORK5CYII=",
        oncommand: function () {
            var domain = content.location.hostname;
            gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/search?q=site:greasyfork.org%20' + domain);
        }
    },
    aCopyAddonList: {
        label: "复制扩展清单",
        image: "chrome://mozapps/skin/extensions/extensionGeneric-16.png",
        oncommand: function () {
            Application.getExtensions(function (extensions) {
                var actives = [], unActives = [];
                extensions.all.forEach(function(item){
                    var arr = item._item.isActive ? actives : unActives;
                    arr.push(item._item.name);
                });

                var str = '目前启用的：\n';
                str += actives.map(function(name, i) { return i + 1 + ": " + name;}).join('\n');
                str += '\n\n目前禁用的：\n';
                str += unActives.map(function(name, i) { return i + 1 + ": " + name;}).join('\n');

                addMenu.copy(str);
            });
        }
    },
    aCopyUserScriptList_addon: {
        label: "复制用户脚本清单",
        oncommand: function () {
            Cu.import("resource://gre/modules/AddonManager.jsm");

            AddonManager.getAddonsByTypes(['greasemonkey-user-script', 'userscript'], function (aAddons) {
                var downURLs = [];
                aAddons.forEach(function (aAddon) {
                    var name, downURL;
                    if (aAddon._script) {  // Greasemonkey
                        name = aAddon._script.name;
                        downURL = aAddon._script._downloadURL;
                    } else {  // Scriptish
                        name = aAddon._name;
                        downURL = aAddon._downloadURL;
                        if (!downURL && item._updateURL) {
                            downURL = item._updateURL.replace(/\.meta\.js$/, '.user.js');
                        }
                        if (!downURL && item._homepageURL) {
                            downURL = item._homepageURL;
                        }
                    }

                    downURLs.push(name + '\n' + downURL);
                });
                Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).
                    copyString(downURLs.join('\n\n'));
            });
        }
    },
    // aInstallAddons: {
    //     label: "批量安装扩展",
    //     oncommand: function() {
    //         var install = function (addonInstall) {
    //             addonInstall.install();
    //         };

    //         var data = readFromClipboard();
    //         var m = data.match(/(https?:\/\/.*?\.xpi)/g);
    //         if (m) {
    //             m.forEach(function(url) {
    //                 AddonManager.getInstallForURL(url, install, "application/x-xpinstall");
    //                 // AddonManager.getInstallForFile(file.file, install, "application/x-xpinstall");
    //             })
    //         }
    //     }
    // },
    aInstallGMScripts_addon: {
        label: "批量安装 GM 脚本",
        tooltiptext: "从剪贴板中的多个网址安装，是覆盖安装",
        oncommand: function() {
            if (!window.GM_BrowserUI) return;

            var scope = {};
            Cu.import('resource://greasemonkey/remoteScript.js', scope);

            var install_GM_script = function(url) {
                var rs = new scope.RemoteScript(url);
                rs.download(function(aSuccess, aType) {
                    if (aSuccess && 'dependencies' == aType) {
                        rs.install();
                    }
                });
            };

            var data = readFromClipboard();
            var m = data.match(/(https?:\/\/.*?\.user\.js)/g);
            if (m) {
                m.forEach(function(url) {
                    // 处理下 userscripts 的问题
                    // url = url.replace(/^https?:\/\/userscripts\.org\//, 'http://userscripts.org:8080/');
                    install_GM_script(url);
                })
            }
        }
    },

    // uc 脚本的菜单
    aMouseGesturesClick_ucjs: {
        label: "鼠标手势",
        tooltiptext: "左键：重载配置\n右键：编辑配置",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADQUlEQVQ4jZ3M708TBxzH8a9FXANhof5YUTZayo/C9dxaSn8ctBzNtcd6R+2Q1gktUCGYjC1LcVvY6dR1A0ONiBgqTHTrLdqMB2pwUnFj4qYZmXM/3Z9j7rMHZpo9W/bg9eTzTj6UPHiwLTUwNDvYl8z9I5VI5oaT/5ZKPO+Dfcnc8ODgdDIet5LUFV5IDOxD+qSM8Y9ljGdkDI9FsD8afaa3J4q3PujGeOZpf+doN+Lx6JNwMJimQEdAHXk3jC9/lXH1TxmFv2RMFyTsi0iIyDK6JRkH+iUs3pVQeCyj8FjGZ/ckxPpe1/h2v0I+j08dGgtCfSThyu8yrvwh48J6GD2xILqCIYhCCKm3g8j//Lwv3A3jjV5B4zycQm6nW+0f5fH5QxGXNkVc2Ajh8kMRicM8eF8HeH8H0lMBqL+JmP82hPwvIubXQ5Aifs1ldypkt9nV2BCHpU0Bue8COL7UgS8eCRjL+OB1eeBr9yCT57G0KeDYoh+XfxIwtxaAILo1lmEVaqprUiN9LVi8z+PcHT+GJ1xYvM/jo0scnC128IIDZ4t+zNzyY/SYCxd/5DFzyw9f52taY32jQuZXalVxP4v5e22YKXKQ3mSRXeFw+msv3O3NkA6wyP3QhomcC7HDe7HwwIfsihet3ibNXGNWqGrXbrWzux6z625kV13wdNbhyHkH5jY8EHoakDjCYP6BF/1pG6SEFee/92DyWitYh1kz7jIqVFlhULlQDc6steDUigOssxq9Yw2Y22jFwEQD0ucYnP3GiTbRBCFmxuy6E5llOxqZ3ZqhwqBQWWmZ6uSNyK7uxafXWNTbdqC1swrZ1Vdx/CqDyessThRsqLFsBx/dgzN3nu41FoOm31aukE5XqrKcAVM3GZxcbobJWgFjdTmUfBOyRRtO32YxesoCvV4PTt6JbNEGJW+FsbpM0+m2KkSkU62uckzdbMaJZSv2WPQo2VqCQxkTsmsMsrcZiENGbCEdXF2VmC4y+DBfj8qXSjUiUoiI1CrLNqQyZiSOmlCxswREBGfoRYxMWXDok1qYGD2ICHUOPUYmaxF//2W8ULbl2cESEeF/eEJE7xERRYnoBhEViWj1PyoS0VdE5PkbM4PG4kQUIjsAAAAASUVORK5CYII=",
        oncommand: 'ucjsMouseGestures.reload(true);',
        onclick: 'if (event.button == 2) {event.preventDefault(); closeMenus(event.currentTarget); ucjsMouseGestures.edit(ucjsMouseGestures.file);}'
    },
    aKeyChangerClick_ucjs: {
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

};

var Funcs = {
    saveText: function(text, filename) {
        saveImageURL('data:text/plain;charset=UTF-8;base64,' +
            btoa(unescape(encodeURIComponent(text))), filename + ".txt", null, null, null, null, document);
    }
};