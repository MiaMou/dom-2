// const api = jQuery('.test')  // 不返回元素们，返回 api 对象
// // api.addClass('red').addClass('blue')   // 遍历所有刚才获取的元素 添加class , 通过 返回对象 链式操作
// api.addClass('red')
//    .addClass('blue')
//    .addClass('green') // 链式操作


// const api1 = jQuery('.test')
// api1.addClass('blue')
// const api2 = api1.find('.child').addClass('red')
// api1.addClass('green')

// jQuery('.test')
//   .find('.child')
//   .addClass('red')
//   .addClass('blue')
//   .addClass('green')


// const api1 = jQuery('.test')
// const api2 = api1.find('.child').addClass('red').addClass('blue').addClass('green')
// const oldApi = api2.end().addClass('yellow')

// const x = jQuery('.test').find('.child')
// x.each((div)=>console.log(div))


// const x = jQuery('.test')
// x.parent().print()
// x.children().print()

const $div = $('<div>1</div>')
$div.appendTo(document.body)
