var meta = "meta";

function OwM(serialized){

    if(serialized){
        return OwM.prototype.convert(serialized);
    }

    Object.defineProperty(this, meta, {
        writable: false,
        enumerable: true,
        value: {}
    });

    Object.defineProperty(this, "setMeta", {
        writable: false,
        enumerable: false,
        configurable:false,
        value: function(prop, value){
            if(typeof prop == "object" && typeof value == "undefined"){
                for(var p in prop){
                    this[meta][p] = prop[p];
                }
                return prop;
            }
            this[meta][prop] = value;
            return value;
        }
    });

    Object.defineProperty(this, "getMeta", {
        writable: false,
        value: function(prop){
            return this[meta][prop];
        }
    });
}

function testOwMSerialization(obj){
    let res = false;

    if(obj){
        res = typeof obj[meta] != "undefined" && !(obj instanceof OwM);
    }

    return res;
}

OwM.prototype.convert = function(serialized) {
    let owm = new OwM();

    for(var metaProp in serialized.meta){
        if(!testOwMSerialization(serialized[metaProp])) {
            owm.setMeta(metaProp, serialized.meta[metaProp]);
        } else {
            owm.setMeta(metaProp, OwM.prototype.convert(serialized.meta[metaProp]));
        }
    }

    for(var prop in serialized){
        if(prop === meta) {
            continue;
        }

        if(!testOwMSerialization(serialized[prop])){
            owm[prop] = serialized[prop];
        }else{
            owm[prop] = OwM.prototype.convert(serialized[prop]);
        }
    }

    return owm;
}

OwM.prototype.getMetaFrom = function(obj, name) {
    return (name ? obj[meta][name] : obj[meta])
}

OwM.prototype.setMetaFor = function(obj, name, value){
    return obj[meta][name] = value;
}

module.exports = OwM;