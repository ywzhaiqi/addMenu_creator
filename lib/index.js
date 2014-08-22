
// 菜单类型
var menuStyles = [
    { name: '页面右键', value: 'page', title: 'page'},
    { name: '标签右键', value: 'tab', title: 'tab'},
    { name: '工具菜单', value: 'tool', title: 'tool'},
    { name: 'app菜单', value: 'app', title: 'ff28 以下为 firefox 橙菜单，以上为文件菜单'},

    { name: '页面右键二级', value: 'PageMenu', title: 'PageMenu' },
    { name: '标签右键二级', value: 'TabMenu', title: 'TabMenu' },
    { name: '工具菜单二级', value: 'ToolMenu', title: 'ToolMenu' },
    { name: 'app菜单二级', value: 'AppMenu', title: 'AppMenu' },
];

// 命令类型
var commandStyles = [
    { name: '所有', value: '' },
    { name: '复制', value: 'copy' },
    { name: '搜索', value: 'search' },
    { name: '打开', value: 'open' },
    { name: '左中右三建', value: 'click' },

    { name: '选取', value: 'select' },
    { name: '链接', value: 'link' },
    { name: '图像', value: 'image' },
    { name: '输入框', value: 'input' },
    { name: '粘贴', value: 'paste' },

    { name: 'uc脚本', value: 'ucjs' },
    // { name: '其它', value: 'OTHER' },
];

// 命令选择菜单
var commandsData = [];
$.each(Data, function(key, item){
    commandsData.push({
        name: item.label,
        value: key,
        title: item.tooltiptext || item.label,
    });
});


var checkSupport = (location.protocol !== 'chrome:');

var AddMenu = {
    styles: menuStyles,
    types: commandStyles,
    commands: commandsData,

    init: function() {
        var view = rivets.bind($('#ucjsAddmenu'), {menu: AddMenu} );
    },
    changeMenuCommand: function() {
        // 有些命令是 page 专用的 
        var isPage = $('#menuStyle').val().indexOf('page') === 0;
        var commandStyle = $('#commandStyle').val();

        this.commands = commandsData.filter(function(item){
            return (isPage ? true : item.value.toLowerCase().slice(0, 1) !== 'p') &&
                (commandStyle ? item.value.toLowerCase().indexOf(commandStyle) != -1 : true);
        });
    },
    doNotGenerate: function() {
        var menuStyle = $("#menuStyle").val();

        var script = '暂不支持';
        if (menuStyle.indexOf('Menu') === -1) {
            var item = Data[$('#menuCommand').val()];
            script = menuStyle + '(' + jsFormat(toString(item)) + ');';
        } else {
            
        }

        $('#AddMenuScript').val(script);
        $("#scriptLineNum").text("行数:" + ($("#AddMenuScript").val().match(/\n/g).length + 1));
    },
    generateScript: function() {
        this.selectedStyle[$("#menuStyle").val()] = "//" + this[$("#menuCommand").val()].name + "\n" +
            this[$("#menuCommand").val()].cmd.toString().split("\n").slice(1, -1).join("\n");

        var script = decodeURIComponent(escape(atob(this.quickDragTemplate)));
        for (i in this.selectedStyle) {
            script = script.replace("//" + i, this.selectedStyle[i]);
        }
        $("#MouseDragScript").val(js_beautify(script.replace(/.+[\t ]*\n[\t ]*\/\/...?\n.+\n.+/g, "").replace(/\/\/.\n/g, "")));
    },
    openChrome: function() {
        try {
            checkSupport && netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();
        } catch (e) {
            this.showNotSupport();
        }
    },
    showNotSupport: function() {
        alert("about:config中 signed.applets.codebase_principal_support 禁止了该行为");
    },
};

AddMenu.init();
