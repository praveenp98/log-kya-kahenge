(function(){
  var KEY='lkk-mode',mode='all';
  try{mode=localStorage.getItem(KEY)||'all';}catch(e){}
  var HINT={light:'The short version. Long lists and the hardest parts are hidden.',all:'All of it.',heavy:'Only the hard parts: costs, honest notes and what we don’t know.'};
  var pages=document.querySelector('.pages');
  if(!pages)return;
  var bar=document.createElement('div');bar.className='modes';bar.setAttribute('role','group');bar.setAttribute('aria-label','Reading mode');
  var lab=document.createElement('span');lab.className='label';lab.textContent='Reading';bar.appendChild(lab);
  var btns={};
  [['light','Light'],['all','Everything'],['heavy','Heavy']].forEach(function(p){
    var b=document.createElement('button');b.type='button';b.id='mode-'+p[0];b.textContent=p[1];
    b.addEventListener('click',function(){apply(p[0]);try{localStorage.setItem(KEY,p[0]);}catch(e){}});
    btns[p[0]]=b;bar.appendChild(b);
  });
  var hint=document.createElement('p');hint.className='gloss';bar.appendChild(hint);
  pages.parentNode.insertBefore(bar,pages.nextSibling);
  function apply(m){
    if(!HINT[m])m='all';
    document.body.setAttribute('data-mode',m);
    for(var k in btns){btns[k].setAttribute('aria-pressed',k===m?'true':'false');}
    hint.textContent=HINT[m];
    var links=document.querySelectorAll('nav.jump a[href^="#"]');
    for(var i=0;i<links.length;i++){
      var t=document.getElementById(links[i].getAttribute('href').slice(1));
      var r=t&&t.getAttribute('data-read');
      links[i].hidden=!!(r&&((m==='light'&&r==='heavy')||(m==='heavy'&&r==='light')));
    }
  }
  apply(mode);
})();
