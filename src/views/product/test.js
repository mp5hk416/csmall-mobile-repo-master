const pathList = ['/a/b', '/a/2/c', '/d']

function strToObj(path){
    let r = {}
    path.split('/').splice(1).forEach(subPath=>{
        r[subPath] = {}
    })
}

function pathFormat(pathList){
    // let r = {}
    pathList.forEach(path=>{
        
    })
}
console.log(pathFormat(pathList))