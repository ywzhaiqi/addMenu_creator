var Style = Class.extend({
    isMenu: function() {
        
    }
});

var Command = Class.extend({
    toString: function() {
        return jsFormat(toString(this.data));
    }
});

var Store = Class.extend({
    name: 'addMenu',

    init: function() {
        this.data = JSON.parse(localStorage[this.name] || '{}')
    },

    get: function(key, defaultValue) {
        if (_.isUndefined(this.data[key])) {
            return defaultValue;
        }
        return this.data[key];
    },
    set: function(key, value) {
        this.data[key] = value;
        this.save();
    },

    save: function() {
        localStorage[this.name] = JSON.stringify(this.data)
    }
});