const EXPORT_STORAGE = {

    KEY_TOKEN_INFO: 'KEY_TOKEN_INFO',
    KEY_USER_INFO: 'KEY_USER_INFO',
    KEY_CART_INFO: 'KEY_CART_INFO',

    /** 向localStorage中存储 */
    save : function (key, value){
        localStorage.setItem(`${key}`, JSON.stringify(value))
    },

    /** 从localStorage中读取 */
    get : function (key){
        return JSON.parse(localStorage.getItem(`${key}`))
    }, 

    /** 删除 */
    remove : function (key){
        return localStorage.removeItem(`${key}`)
    }

}

export default EXPORT_STORAGE;
 
 