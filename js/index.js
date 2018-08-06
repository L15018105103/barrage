(function () {
  //获取元素
  var aShowList = document.querySelectorAll('.s_show div'),//类似css选择器
    oSend = document.querySelector('.send'),
    oShow = document.querySelector('.s_show'),
    oBtn = document.querySelector('.btn'),
    oText = document.querySelector('.text');
  //点击发表弹幕事件
  oBtn.onclick = send;
  document.onkeydown = function(e){
    if(!e){
      e = window.event;
    }
    if((e.keyCode || e.which) == 13){
      send();
    }
  }
  //点击发送创建弹幕函数
  function send() {
    if(oText.value){
      var oDiv = document.createElement('div');
      oDiv.className = 'magictime twisterInUp';
      oDiv.innerText = oText.value;
      oShow.appendChild(oDiv);
      init(oDiv);
      oText.value = '';
    }else{
      alert("发送内容不能为空");
      oText.focus();
    }
  }
  /*for(var i = 0, obj; obj = aShowList[i++];){//O(n)的时间复杂度
    init(obj);
  }*/
  //初始化函数
  function init(obj) {//弹幕对象
    //求出可视区的高度
    var screenHeight = document.documentElement.clientHeight,
      screenWidth = document.documentElement.clientWidth,
      sendHeight = oSend.clientHeight,//获取send元素的高度
      maxTop = screenHeight - sendHeight - obj.clientHeight,
      left = screenWidth - obj.clientWidth;//最大的top值
    obj.style.top = Math.random()*maxTop + 'px';//[0, maxTop)
    obj.style.left = left + 'px';//[0, maxTop)
    obj.style.color = randomColor();
    move(obj, left);
  }
  //设置一个移动的函数
  function move(obj, left) {//弹幕对象
    var speed = 2;//速度变量
    if(left > -obj.clientWidth){
      left -= speed;//left值自减少
      obj.style.left = left + 'px';//设置一下当前的left值
      requestAnimationFrame(function () {
        move(obj, left)
      });//动画 参数function
    }else{
      oShow.removeChild(obj);
    }
  }
  //随机颜色函数
  function randomColor() {
    /*var str = '#';
    for(var i = 0; i < 6; i++){
      str += Math.round(Math.random() * 16).toString(16)//四舍五入并且变成十六进制字符串
    }
    return str;*/
    return '#' + Math.random().toString(16).slice(-6);//截取最后的六位
  }
})();