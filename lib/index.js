// 命令选择菜单
var allCommands = [];
$.each(Data, function(key, item){
    allCommands.push({
        name: item.label,
        value: key,
        title: item.tooltiptext || item.label,
    });
});

var menu = {
    styles: [  // 菜单类型
        { name: '页面右键', value: 'page', title: 'page'},
        { name: '标签右键', value: 'tab', title: 'tab'},
        { name: '工具菜单', value: 'tool', title: 'tool'},
        { name: 'app菜单', value: 'app', title: 'ff28 以下为 firefox 橙菜单，以上为文件菜单'},

        { name: '页面右键二级', value: 'PageMenu', title: 'PageMenu' },
        { name: '标签右键二级', value: 'TabMenu', title: 'TabMenu' },
        { name: '工具菜单二级', value: 'ToolMenu', title: 'ToolMenu' },
        { name: 'app菜单二级', value: 'AppMenu', title: 'AppMenu' },
        { name: '单图标行', value: 'menuGroup', title: '类似 firefox 32 右键的前进后退图标菜单' },
    ],
    types: [  // 命令类型
        { name: '所有', value: '' },
        { name: '复制', value: 'copy' },
        { name: '搜索', value: 'search' },
        { name: '打开', value: 'open' },

        { name: '选取', value: 'select' },
        { name: '链接', value: 'link' },
        { name: '图像', value: 'image' },
        { name: '输入框', value: '_input' },
        { name: '标签', value: 'tab' },
        { name: '书签小工具', value: '_bookmark' },
        { name: '视频下载', value: 'videodownload' },
        { name: '外部程序', value: '_app' },

        { name: 'uc脚本', value: 'ucjs' },
        { name: '扩展', value: 'addon' },
        { name: '左中右三建', value: 'click' },
        // { name: '其它', value: 'OTHER' },
    ],
    commands: allCommands
};

var checkSupport = (location.protocol !== 'chrome:');

// var AddMenu = {

// };

MenuCtrl = Class.extend({
    model: menu,
    style: 'page',
    type: '',
    command: menu.commands[0].value,
    text: '',
    lineCount: 0,
    selectedCommands: {},
    tpl: {
        oneMenuItem: '{style}({value});',
        multiMenuItem: '{style}([{value}]);',
        menu: 'menu = {style}({ label: "自定义菜单", });\nmenu([{value}]);',
        menuGroup: 'menu = {style}({ _type: "group",});\nmenu([{ _type: "spacer", width: 30 }, {value}]);',
    },
    messages: [],
    config: {
        preview: true,
    },

    init: function() {
        rivets.bind($('#ucjsAddmenu')[0], this);
    },

    selectedChanged: function(e, self) {
        // 有 bug？firefox 下为上一个值
        // var isPage = self.style.toLowerCase().indexOf('page') === 0;
        // var type = self.type;
        // console.log(self.style, self.type)

        var isPage = $('#menuStyle').val().toLowerCase().indexOf('page') === 0;
        var type = $('#menuType').val().toLowerCase();
        
        self.model.commands = allCommands.filter(function(item){
            return (isPage ? true : item.value.toLowerCase().slice(0, 1) !== 'p') &&
                (type ? item.value.toLowerCase().indexOf(type) !== -1 : true);
        });

        var firstCommand = self.model.commands[0];
        self.command = firstCommand && firstCommand.value;
    },
    menuCommandChanged: function(e, self) {
        if (self.config.preview) {
            self.setText(jsFormat(toString(Data[$("#menuCommand").val()])), self);
        }
    },
    previewBtnClicked: function(e, self) {
        if (e.target.checked) {
            
        } else {

        }
    },
    filterCommand: function(item) {

    },

    add: function(e, self, del) {
        if (!del) {
            self.selectedCommands[self.command] = Data[self.command];
        }

        // 获取所有选中的脚本内容
        var scripts = [];
        var messages = [];
        $.each(self.selectedCommands, function(key, item){
            if (item) {
                var newItem = cloneObj(item);
                var msgName = '第 ' + (scripts.length + 1) + ' 条，label 为 "' + newItem.label + '" 中';

                if (newItem.keyword) {
                    messages.push(msgName + '包含搜索关键字，请先检查自己的搜索中是否包含 <b>"' + newItem.keyword + '"</b> 关键字。');
                }
                if (newItem.exec && !newItem.exec.match(/^\\/i)) {
                    messages.push(msgName + '包含自定义路径，请先检查 exec 中的 <b>"' + newItem.exec + '"</b> 路径是否存在。');
                    delete newItem.exec;
                }
                
                var newItemStr = toString(newItem);
                var m = newItemStr.match(/["']([a-z]:\\[^"']+)["']/ig);  // 匹配 windows 路径
                if (m) {
                    messages.push(msgName + '包含自定义路径，请先检查 <b>' + m.join('</b> 和 <b>') + '</b> 路径是否存在。');
                }
                // if (newItem._label) {
                //     delete newItem._label;
                // }
                scripts.push(toString(item));
            }
        });
        self.messages = messages;

        var isMenuGroup = (self.style == 'menuGroup');

        var tplStr;
        if (self.style.toLowerCase().indexOf('menu') === -1) {
            var OnlyOne = scripts.length == 1;
            tplStr = OnlyOne ? self.tpl.oneMenuItem : self.tpl.multiMenuItem;
        } else {
            tplStr = isMenuGroup ? self.tpl.menuGroup : self.tpl.menu;
        }

        var script;
        if (scripts.length == 0) {
            script = '';
        } else {
            script = template(tplStr, {
                style: self.style,
                value: scripts.join(','),
            });
        }

        var selectedIndex = $("#menuCommand")[0].selectedIndex;
        var curCommand = self.model.commands[selectedIndex];
        if (!del) {
            curCommand.active = true;
            // 激活下一个
            var next = self.model.commands[selectedIndex + 1];
            if (next) {
                self.command = next.value;
            }
        } else {
            curCommand.active = false;
        }

        script = jsFormat(script);
        self.setText(script, self);
    },
    del: function(e, self) {
        if (self.command in self.selectedCommands) {
            self.selectedCommands[self.command] = null;
            self.add(e, self, true);
        }
    },
    clean: function(e, self) {
        allCommands.forEach(function(command){
            command.active = false;
        });

        self.messages = [];

        self.selectedCommands = {};
        self.setText('', self);
    },

    // tools
    setText: function(text, self) {
        self.text = text;
        var match = text.match(/\n/g);
        self.lineCount = (match ? match.length : -1) + 1;
    }
});

new MenuCtrl()


function openChrome() {
    try {
        checkSupport && netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();
    } catch (e) {
        showNotSupport();
    }
}
function showNotSupport() {
    alert("about:config中 signed.applets.codebase_principal_support 禁止了该行为");
}

function cloneObj(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}