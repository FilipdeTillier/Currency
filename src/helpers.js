
const IIFE = (function(){
    String.prototype.firstUpperCase = function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
}())

export default IIFE;


