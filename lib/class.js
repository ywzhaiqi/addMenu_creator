function Class(options) {
    $.extend(this, options)
}

Class.prototype.constructor = Class

Class.extend = function(options) {
    var constructor = this

    function Klass() {
        constructor.apply(this, arguments)
        if (this.init) {
            this.init(options)
        }
    }

    Klass.prototype = Object.create(constructor.prototype)
    $.extend(Klass.prototype, options)
    Klass.prototype.constructor = Klass

    return Klass
}