window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }  
    // api 可以操作 elements
    return {
        find(selector){
            let array = []
            for(let i=0; i<elements.length; i++){
                array = array.concat(Array.from(elements[i].querySelectorAll(selector)))
            }
            array.oldApi = this  // this是api1          
            return jQuery(array)
        },
        each(fn){
            for(let i=0; i<elements.length; i++){
                fn.call(null, elements[i], i)
            }
            return this // this就是当前api
        },
        parent(){
            const array =[]
            this.each((node)=>{
                if(array.indexOf(node.parentNode) === -1){
                    array.push(node.parentNode)
                }            
            })
            return jQuery(array)
        },
        children(){
            const array =[]
            this.each((node)=>{
                array.push(...node.children)  // ... 就是把children放到一个数组里        
            })
            return jQuery(array)
        },
        print() {
            console.log(elements);
        },
        // 闭包：函数 addClass 访问了外部的变量 elements
        addClass(className){
            for(let i=0; i<elements.length; i++){
                elements[i].classList.add(className)
            }
            return this  // 同return api         
        },   
        oldApi: selectorOrArray.oldApi,
        end(){
            return this.oldApi // this 就是当前的api(api2)
        }

    }
}