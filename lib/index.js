
// 命令选择菜单
var allCommands = [];
$.each(Data, function(key, item){
    allCommands.push(new Command({
        name: item.label,
        title: item.tooltiptext || item.label,
        value: key,
        data: item
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
        { name: '保存或下载', value: 'save' },
        { name: '视频下载', value: 'videodownload' },
        { name: '外部程序', value: '_app' },

        { name: 'ff内置功能', value: 'firefox' },
        { name: 'uc脚本', value: 'ucjs' },
        { name: '扩展', value: 'addon' },
        { name: '左中右三建', value: 'click' },
        // { name: '其它', value: 'OTHER' },
    ],
    commands: allCommands
};

var isFullSupport = location.protocol === 'chrome:';


var MenuCtrl = Class.extend({
    isFullSupport: isFullSupport,
    model: menu,
    text: '',
    previewText: '',
    scriptText: '',
    tpl: {
        oneMenuItem: '{style}({value});',
        multiMenuItem: '{style}([{value}]);',
        menu: 'menu = {style}({ label: "自定义菜单", });\nmenu([{value}]);',
        menuGroup: 'menu = {style}({ _type: "group",});\nmenu([{ _type: "spacer", width: 30 }, {value}]);',
    },
    messages: [],
    selectedCommands: [],
    classHidden: isFullSupport ? '' : 'hide',

    init: function() {
        var self = this;

        this.store = new Store();

        this.commands = this.model.commands;
        this.command = this.commands[0];

        this.style = this.store.get('style', this.model.styles[0].value);
        this.type = this.store.get('type', this.model.types[0].value);
        this.preview = this.store.get('preview', false);
        // this.isMenuGroup = this.store.get('isMenuGroup', false);
        this.isMenuGroup = false;

        // bind rivets
        rivets.bind($('#ucjsAddmenu')[0], this);

        self.styleChanged();

        $('#menuStyle').on('change', function(e) {
            self.styleChanged(e);
        });

        $('#menuType').on('change', function(e) {
            self.changeCommands(e);
        });

        $('#menuCommand').on('change', function(e) {
            self.commandChanged(e);
        });

        $('#configBtns').on('click', function(e){
            var funcName = $(e.target).attr('rv-checked') + 'Clicked';
            var func = self[funcName];
            if (func) {
                func.call(self, e);
            }
        });
    },

    save: function() {
        this.store.data = {
            style: this.style,
            type: this.type,
            preview: this.preview,
            // isMenuGroup: this.isMenuGroup,
        };
        this.store.save();
    },

    styleChanged: function(e) {
        this.changeCommands(e);

        var isMenu = this.style.toLowerCase().indexOf('menu') !== -1;
        $('#isMenuGroup')[isMenu ? 'show' : 'hide']();
    },

    // watch style, type
    changeCommands: function(e) {
        var isPage = this.style.toLowerCase().indexOf('page') === 0;
        var type = this.type.toLowerCase();

        this.commands = this.model.commands.filter(function(item){
            return (isPage ? true : item.value.toLowerCase().slice(0, 1) !== 'p') &&
                (type ? item.value.toLowerCase().indexOf(type) !== -1 : true);
        });

        // 不是第一个
        // if (!this.command) {
            this.command = this.commands[0];
        // }
    },

    commandChanged: function(e) {
        this.command = _.find(this.commands, function(v) { return v.value == e.target.value; });
        if (this.preview) {
            this.text = this.command.toString();
            this.previewText = this.text;
        }
    },

    previewClicked: function(e) {
        if (this.preview) {
            this.text = this.previewText || this.command.toString();
        } else {
            this.text = this.scriptText;
        }
    },


    filterCommand: function(item) {

    },

    add: function(e) {
        this.messages = [];

        var isDel = _.contains(this.selectedCommands, this.command);
        if (!isDel) {
            this.command.active = true;
            this.selectedCommands.push(this.command);
        } else {
            this.command.active = false;
            _.pull(this.selectedCommands, this.command);
        }

        var scripts = this.addScripts(this.selectedCommands);
        this.text = this.addText(scripts);
        this.scriptText = this.text;

        if (!isDel) {
            // 切换到下一个 command
            var nextIndex = this.commands.indexOf(this.command) + 1;
            this.command = this.commands[nextIndex] || this.command;
            $("#menuCommand").val(this.command.value);
        } else {
            // 删除后保持原状

            // // 切换到上一个 command
            // var nextIndex = this.commands.indexOf(this.command) - 1;
            // this.command = this.commands[nextIndex] || this.command;
            // $("#menuCommand").val(this.command.value);
        }
    },

    addScripts: function(selectedCommands) {
        // 获取所有选中的脚本内容
        var scripts = [];
        _.each(selectedCommands, function(item){
            if (item) {
                this.addMessages(item.data, scripts);
                scripts.push(item.toString());
            }
        }, this);

        return scripts;
    },

    addText: function(scripts) {
        var tplStr;
        if (this.style.toLowerCase().indexOf('menu') === -1) {
            var OnlyOne = scripts.length == 1;
            tplStr = OnlyOne ? this.tpl.oneMenuItem : this.tpl.multiMenuItem;
        } else {
            tplStr = this.isMenuGroup ? this.tpl.menuGroup : this.tpl.menu;
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

        if (this.isMenuGroup) {
            this.messages.push('当前是单图标行，一些没图标的子菜单需要自己手动加上。');
        }

        return jsFormat(script);
    },

    addMessages: function(item, selectedScripts) {
        var newItem = _.cloneDeep(item);
        var msgName = '第 ' + (selectedScripts.length + 1) + ' 条，label 为 "' + newItem.label + '"，';

        if (newItem._message) {
            this.messages.push(msgName + newItem._message);
            delete newItem._message;
        }

        if (newItem.keyword) {
            this.messages.push(msgName + '包含搜索关键字，请先检查自己的搜索中是否包含 <b>"' + newItem.keyword + '"</b> 关键字。');
        }

        var PATH_RE = /["']([a-z]:\\[^"']+)["']/ig;  // 匹配 windows 路径

        if (newItem.exec && newItem.exec.match(PATH_RE)) {
            this.messages.push(msgName + '包含自定义路径，请先检查 exec 中的 <b>"' + newItem.exec + '"</b> 路径是否存在。');
            delete newItem.exec;
        }

        var newItemStr = toString(newItem);
        var m = newItemStr.match(PATH_RE);
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
        this.selectedCommands = [];
        this.text = '';
    },

    // computed: text
    lineCount: function() {
        var match = this.text.match(/\n/g);
        return (match ? (match.length + 1) : 0);
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

var menuCtrl = new MenuCtrl();

window.addEventListener('unload', function(){
    menuCtrl.save();
}, false);


function editFile() {
    try {
        var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
        if (mainWin && mainWin.addMenu) {
            mainWin.addMenu.edit(mainWin.addMenu.FILE);
        }
    } catch (e) {}
}


function openChrome() {
    try {
        Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();
    } catch (e) {
        showNotSupport();
    }
}
function showNotSupport() {
    alert("不支持该行为");
}
