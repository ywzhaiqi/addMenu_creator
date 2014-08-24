var Command = Class.extend({
    toString: function() {
        var data = {
            name: this.name,
            value: this.value,
            title: this.title
        };

        return jsFormat(toString(data));
    }
});

// 命令选择菜单
var allCommands = [];
$.each(Data, function(key, item){
    allCommands.push(new Command({
        name: item.label,
        value: key,
        title: item.tooltiptext || item.label,
    }));
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

var MenuCtrl = Class.extend({
    model: menu,
    text: '',
    tpl: {
        oneMenuItem: '{style}({value});',
        multiMenuItem: '{style}([{value}]);',
        menu: 'menu = {style}({ label: "自定义菜单", });\nmenu([{value}]);',
        menuGroup: 'menu = {style}({ _type: "group",});\nmenu([{ _type: "spacer", width: 30 }, {value}]);',
    },
    messages: [],
    selectedCommands: [],
    config: {
        preview: true,
    },

    init: function() {
        var self = this;
        this.type = this.model.types[0].value;
        this.style = this.model.styles[0].value;
        this.commands = this.model.commands;
        this.command = this.commands[0];

        rivets.bind($('#ucjsAddmenu')[0], this);

        $('#menuStyle, #menuType').on('change', function(e) {
            self.selectedChanged(e);
        });

        $('#menuCommand').on('change', function(e) {
            self.commandChanged(e);
        });
    },

    // watch style, type
    selectedChanged: function() {
        var isPage = this.style.toLowerCase().indexOf('page') === 0;
        var type = this.type.toLowerCase();

        this.commands = this.model.commands.filter(function(item){
            return (isPage ? true : item.value.toLowerCase().slice(0, 1) !== 'p') &&
                (type ? item.value.toLowerCase().indexOf(type) !== -1 : true);
        });

        this.command = this.commands[0];
    },

    commandChanged: function(e) {
        this.command = _.find(this.commands, function(v) { return v.value == e.target.value; });
        if (this.config.preview) {
            this.text = this.command.toString();
        }
    },

    previewBtnClicked: function(e) {
        if (e.target.checked) {

        } else {

        }
    },

    filterCommand: function(item) {

    },

    add: function(e) {
        this.messages.length = 0;

        if (_.contains(this.selectedCommands, this.command)) {
            this.command.active = false;
            _.pull(this.selectedCommands, this.command);
        } else {
            this.command.active = true;
            this.selectedCommands.push(this.command);
        }

        var scripts = this.addScripts(this.selectedCommands);
        this.text = this.addText(scripts);

        // set next command
        /*
        var selectedIndex = $("#menuCommand")[0].selectedIndex;
        this.command = this.commands[selectedIndex + 1];
        */
    },

    addScripts: function(selectedCommands) {
        // 获取所有选中的脚本内容
        var scripts = [];
        _.each(selectedCommands, function(item){
            if (item) {
                this.addMessages(item, scripts);
                scripts.push(item.toString());
            }
        }, this);

        return scripts;
    },


    addText: function(scripts) {
        var isMenuGroup = (this.style == 'menuGroup');
        var tplStr;
        if (this.style.toLowerCase().indexOf('menu') === -1) {
            var OnlyOne = scripts.length == 1;
            tplStr = OnlyOne ? this.tpl.oneMenuItem : this.tpl.multiMenuItem;
        } else {
            tplStr = isMenuGroup ? this.tpl.menuGroup : this.tpl.menu;
        }

        var script;
        if (scripts.length === 0) {
            script = '';
        } else {
            script = template(tplStr, {
                style: this.style,
                value: scripts.join(','),
            });
        }

        return jsFormat(script);
    },

    addMessages: function(item, scripts) {
        var newItem = _.cloneDeep(item);
        var msgName = '第 ' + (scripts.length + 1) + ' 条，label 为 "' + newItem.label + '" 中';

        if (newItem.keyword) {
            this.messages.push(msgName + '包含搜索关键字，请先检查自己的搜索中是否包含 <b>"' + newItem.keyword + '"</b> 关键字。');
        }
        if (newItem.exec && !newItem.exec.match(/^\\/i)) {
            this.messages.push(msgName + '包含自定义路径，请先检查 exec 中的 <b>"' + newItem.exec + '"</b> 路径是否存在。');
            delete newItem.exec;
        }

        var newItemStr = toString(newItem);
        var m = newItemStr.match(/["']([a-z]:\\[^"']+)["']/ig);  // 匹配 windows 路径
        if (m) {
            this.messages.push(msgName + '包含自定义路径，请先检查 <b>' + m.join('</b> 和 <b>') + '</b> 路径是否存在。');
        }
        // if (newItem._label) {
        //     delete newItem._label;
        // }
    },

    del: function(e) {
        if (this.command.value in this.selectedCommands) {
            this.selectedCommands[this.command.value] = null;
            this.add(e, true);
        }
    },

    clean: function(e) {
        this.commands.forEach(function(command){
            command.active = false;
        });

        this.messages = [];

        this.selectedCommands.length = 0;
        this.text = '';
    },

    // computed: text
    lineCount: function() {
        var match = this.text.match(/\n/g);
        return (match ? match.length : -1) + 1;
    },

    buttonName: function() {
        return this.command.active ? "删除" : "添加";
    }
});


// Main
rivets.configure({
    handler: function(target, event, binding) {
        this.call(binding.view.models, event);
    }
});
new MenuCtrl();

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
