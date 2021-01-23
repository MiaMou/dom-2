window.$ = window.jQuery = function(selectorOrArrayOrTemplate){
    let elements
    if(typeof selectorOrArrayOrTemplate === 'string'){
        if(selectorOrArrayOrTemplate[0] === '<'){
          // 创建 div
          elements=[createElement(selectorOrArrayOrTemplate)]
        }else{
          // 查找 div
          elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }
      }else if(selectorOrArrayOrTemplate instanceof Array){
        elements = selectorOrArrayOrTemplate
      }
    function createElement(string){
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    // api 可以操作 elements
    const api = Object.create(jQuery.prototype)    // 创建一个对象，这个对象的__proto__为jQuery.prototype
    // 相当于 const api = {__proto__: jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArray.oldApi
    })
    return api
}

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jquery: true,
    get(index) {
        return this.elements[index]
    },
    appendTo(node){
        if(node instanceof Element){
          this.each(el => node.appendChild(el)) // 遍历 elements，对每个 el 进行 node.appendChild 操作
        }else if(node.jquery === true){
          this.each(el => node.get(0).appendChild(el))  // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
        }
      },
    append(children){
        if(children instanceof Element){
          this.get(0).appendChild(children)
        }else if(children instanceof HTMLCollection){
          for(let i =0;i<children.length;i++){
            this.get(0).appendChild(children[i])
          }
        }else if(children.jquery === true){
          children.each(node => this.get(0).appendChild(node))
        }
    },
    find(selector){
        let array = []
        for(let i=0; i<this.elements.length; i++){
            array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)))
        }
        array.oldApi = this  // this是api1          
        return jQuery(array)
    },
    each(fn){
        for(let i=0; i<this.elements.length; i++){
            fn.call(null, this.elements[i], i)
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
        console.log(this.elements);
    },
    // 闭包：函数 addClass 访问了外部的变量 elements
    addClass(className){
        for(let i=0; i<this.elements.length; i++){
            this.elements[i].classList.add(className)
        }
        return this  // 同return api         
    },   
    end(){
        return this.oldApi // this 就是当前的api(api2)
    }
}

// window.$ = window.jQuery
