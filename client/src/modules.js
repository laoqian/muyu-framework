/**
 *
 *组件管理
 *
 */

class ModulesManager {

    constructor(){
        this.components ={};
    }

    reg(key,coponents){
        this.components[key] = coponents;
    }

    get(key){
        return this.components[key];
    }

    remove(key){
        delete this.components[key];
    }
}

let god = (function(){
    let unique;

    function getInstance(){

        if( unique === undefined ){
            unique = new ModulesManager();
        }
        return unique;
    }

    return {
        getInstance:getInstance
    }
})();

let moduleManager = god.getInstance();

export default moduleManager;