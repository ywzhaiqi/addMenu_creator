
var checkSupport = (location.protocol !== 'chrome:');

function jsFormat(str) {
    return js_beautify(str, {
        indent_size: 4,
        indent_char: ' ',
    });
}

var AddMenu = {
    selectedStyle: [],

    init: function() {
        var item, title;
        for (var name in Data) {
            item = Data[name];
            title = item.tooltiptext || item.label;
            $('#menuCommand').append('<option value="' + name + '" title="' + title + '">' + item.label + '</option>');
        }
    },
    changeMenuCommand: function() {
        // 有些命令是 page 专用的 
        var isPage = $("#menuStyle").val().toLowerCase().indexOf('page') === 0;

        Array.filter($("#menuCommand")[0].options, function(o) {
            o.style.display = isPage ? '' : 
                    (o.value.slice(0, 1) == 'p' ? 'none' : '');
        });

        $("#menuCommand")[0].options[0].selected = true;
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
