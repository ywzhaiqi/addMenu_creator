
var jsFormat = function (str) {
    return js_beautify(str, {
        indent_size: 4,
        indent_char: ' ',
    });
};

var toString = function() {
    function fe(s) {
        return function(c) {
            return s + c.charCodeAt(0).toString(16);
        };
    }
    var es = [
    /(?=["\\])/g, '\\',
    /\n/g, '\\n',
    /\r/g, '\\r',
    /\t/g, '\\t',
    // /[\x00-\x0f]/g, fe('\\x0'),
    // /[\x10-\x1f\x7f-\xff]/g, fe('\\x'),
    // /[\u0100-\u0fff]/g, fe('\\u0'),
    // /[\u1000-\u4dff\u9fa6-\uffff]/g, fe('\\u')
    ];
    function encode_str(s) {
        for (var i = 0; i < es.length; i += 2)
            s = s.replace(es[i], es[i + 1]);
        return '"' + s + '"';
    }
    function encode(a) {
        var r, i;
        switch (typeof a) {
        case 'string':
            return encode_str(a);
        case 'number':
        case 'boolean':
            return a + '';
        case 'object':
            if (!a) return 'null';
            r = [];
            if (a instanceof Array) {
                if (a.length == 1 && a[0] == null)
                    return '[null]';
                for (i = 0; i < a.length; i++)
                    r[i] = a[i] == null ? '' : encode(a[i]);
                return '[' + r.join() + ']';
            }
            else {
                for (i in a)
                    // r[r.length] = encode_str(i) + ':' + encode(a[i]);
                    r[r.length] = i + ':' + encode(a[i]);
                return '{' + r.join() + '}';
            }
        case 'undefined':
            return 'null';
        case 'function':
        case 'regexp':
            return a.toString();
        default:
            throw Error(typeof a);
        }
    }
    return encode;
}();