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

MenuCtrl = Class.extend({
    model: menu,
    style: 'page',
    type: '',
    command: menu.commands[0].value,
    text: '',
    lineCount: 0,
    selectedCommands: {},

    init: function() {
        rivets.bind($('#ucjsAddmenu'), this);
    },

    selectedChanged: function(e, self) {
        var isPage = self.style.toLowerCase().indexOf('page') === 0;
        // 有 bug？firefox 下为上一个值
        // var type = self.type;
        var type = $('#menuType').val().toLowerCase();

        self.model.commands = allCommands.filter(function(item){
            return (isPage ? true : item.value.toLowerCase().slice(0, 1) !== 'p') &&
                (type ? item.value.toLowerCase().indexOf(type) !== -1 : true);
        });

        var firstCommand = self.model.commands[0];
        self.command = firstCommand && firstCommand.value;
    },
    filterCommand: function(item) {

    },

    add: function(e, self, del) {
        if (!del) {
            var item = Data[self.command];
            self.selectedCommands[self.command] = toString(item);
            if (item.keyword) {
                setTimeout(function(){
                    alert('本条目包含搜索关键字，请先检查自己的搜索中是否包含 "' + item.keyword + '" 关键字');
                });
            }
        }

        // 获取所有选中的脚本内容
        var scripts = [];
        $.each(self.selectedCommands, function(key, value){
            if (value)
                scripts.push(value);
        });

        var script = '暂不支持\n';
        if (self.style.indexOf('Menu') === -1) {
            var OnlyOne = scripts.length == 1;
            script = [
                self.style,
                (OnlyOne ? '(' : '(['),
                scripts.join(','),
                (OnlyOne ? ')' : ']);')
            ].join('');
        } else {
            
        }

        if (scripts.length == 0) {
            script = '';
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