(function(){
  var root=document.querySelector('.site-bg-slider');if(!root)return;
  var N=12,list=[];for(var i=1;i<=N;i++)list.push('assets/img/photo/photo'+i+'.jpg');
  var start=0;try{start=Math.floor(Math.random()*N);}catch(e){}
  var order=list.slice(start).concat(list.slice(0,start));
  var a=document.createElement('div'),b=document.createElement('div');a.className=b.className='bg-slide';
  root.appendChild(a);root.appendChild(b);
  var layers=[a,b],cur=0,idx=0,timer=null,ready={};
  function preload(u,cb){if(ready[u]){cb&&cb();return;}var im=new Image();im.onload=function(){ready[u]=1;cb&&cb();};im.onerror=function(){ready[u]=2;cb&&cb();};im.src=u;}
  function show(u){var l=layers[cur];l.style.backgroundImage='url("'+u+'")';l.classList.add('on');layers[1-cur].classList.remove('on');cur=1-cur;}
  function next(){
    idx=(idx+1)%order.length;var u=order[idx];
    preload(u,function(){if(ready[u]===1)show(u);});
    preload(order[(idx+1)%order.length]);
  }
  preload(order[0],function(){if(ready[order[0]]===1)show(order[0]);});
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  function run(){if(!timer)timer=setInterval(next,7000);}
  function stop(){clearInterval(timer);timer=null;}
  function begin(){setTimeout(function(){preload(order[1]);run();},2500);}
  if(document.readyState==='complete')begin();else window.addEventListener('load',begin);
  document.addEventListener('visibilitychange',function(){document.hidden?stop():run();});
})();
