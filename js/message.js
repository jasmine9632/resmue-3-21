
!function(){
var model={
//获取数据
init:function(){
var APP_ID = 'gPl1TJOwEYnINAB3aigSiwpS-gzGzoHsz'
var APP_KEY = 'O57blVWUKa5Un1KRuOURiRFO'
AV.init({ appId: APP_ID, appKey: APP_KEY})
},
fetch:function(){
var query=new AV.Query('Message');
var now = new Date();
query.lessThanOrEqualTo('createdAt', now);//查询今天之前创建的 Todo
query.limit(10);// 最多返回 10 条结果
query.descending('createdAt');
// 按时间，降序排列
return query.find()//promise对象

},
//创建数据
save:function(name,content){
var Message = AV.Object.extend('Message');
var message=new Message();
return message.save({//promise对象
'name':name,
'content':content
})
}
}
var view=document.querySelector('section.message')



var controller={
view:null,
model:null,
messageList:null,
init:function(view,model){
    this.view=view
    this.model=model
    this.messageList=view.querySelector('#messageList')
    this.form=view.querySelector('form')
this.model.init()
this.loadMessages()
this.bindEvents()





},
loadMessages:function(){
this.model.fetch().then(
(messages)=>{
    let array=messages.map((item)=>item.attributes)
    array.forEach((item)=>{
        let li=document.createElement('li')
        
        li.innerHTML=`<span class="name">${item.name}:</span>
        <span class="message-body">${item.content}</span>
        <div class="message-time">1s</div>
        `
        this.messageList.appendChild(li)
    })
}
)
},
bindEvents:function(){
this.form.addEventListener('submit',(e)=>{
e.preventDefault()
this.saveMessage()
})
},
saveMessage:function(){
let myForm=this.form
let content=myForm.querySelector('textarea[name=content]').value
let name=myForm.querySelector('input[name=name]').value
this.model.save(name,content).then(function(object){
let li=document.createElement('li')
li.innerText=`${object.attributes.name}:${object.attributes.content}`
let messageList=document.querySelector('#messageList')
messageList.appendChild(li)
myForm.querySelector('input[name=content]').value=''
console.log(object)
})
}


}
controller.init(view,model)

}.call()







