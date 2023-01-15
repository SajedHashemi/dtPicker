const dtpicker = (function(selector, options){
  var elem = document.querySelector(selector);
  var distYr, distMn, distDy, distHr, distMi;
  var indexy=0, indexm=0, indexd=0, indexh=0, indexi=0;
  var elemy,elemm,elemd,elemh,elemi;
  var mDn=false;
  var tSt,tEd;
  
  if(elem!=null && elem!=undefined){
	elem.addEventListener('click',()=>{
      var dt = new Date();
      distYr = dt.getFullYear();
      distMn = (dt.getMonth()+1);
      distDy = dt.getDate();
      distHr = dt.getHours();
      distMi = dt.getMinutes();
      show();
    });
	
	function show(){
      var randomID = 'dtpicker_box';
      var pickerElem = document.getElementById(randomID);
	  var dtpickerBody = '<div class="dtpicker-btn-group">'
                      +'  <button class="dtpicker-btn ok">OK</button>'
                      +'  <button class="dtpicker-btn to">Today</button>'
                      +'  <button class="dtpicker-btn ca">Cancle</button>'
                      +'</div>'
                      +'<div class="dtpicker-container">';
      if(options.mode==0 || options.mode==2)
          dtpickerBody +='  <section id="dateSection">'
                      +'    <label for="dateSection">Date</label>'
                      +'    <div class="top-cover"></div>'
                      +'    <div class="bottom-cover"></div>'
                      +'    <div class="items">'
                      +'      <div class="dtpicker-col years"><ul></ul></div>'
                      +'      <div class="dtpicker-col months"><ul></ul></div>'
                      +'      <div class="dtpicker-col days"><ul></ul></div>'
                      +'    </div>'
                      +'  </section>';
        if(options.mode==1 || options.mode==2)
          dtpickerBody +='  <section id="timeSection">'
                      +'    <label for="timeSection">Time</label>'
                      +'    <div class="top-cover"></div>'
                      +'    <div class="bottom-cover"></div>'
                      +'    <div class="items">'
                      +'      <div class="dtpicker-col hours"><ul></ul></div>'
                      +'      <div class="dtpicker-col minutes"><ul></ul></div>'
                      +'    </div>'
                      +'  </section>';
          dtpickerBody +='</div>';
      if(pickerElem==null || pickerElem==undefined){
        pickerElem = document.createElement('div');
        pickerElem.classList.add('dtpicker-box');
        pickerElem.classList.add(options.template);
        pickerElem.setAttribute('id',randomID);
        document.body.appendChild(pickerElem);
      }
      pickerElem.innerHTML = dtpickerBody;
	
	  setTimeout(function(){
	    pickerElem.classList.add('active');
        var lis = '';
        if(options.mode==0 || options.mode==2){
          for(var i =options.startYear;i<=options.endYear;i++) lis += '<li style="transform:rotateX(0deg)">'+((i<10)?'0'+i:i)+'</li>';
          elemy = pickerElem.querySelector('.dtpicker-container .years>ul');
          elemy.innerHTML = lis;
          elemy.addEventListener('wheel', (ev) => {
            if(ev.deltaY<0) indexy = ((--indexy<0)?0:indexy);
            else if(ev.deltaY>0) indexy = ((++indexy>=elemy.children.length)?--indexy:indexy);
            goToIndex(elemy, indexy);
            distYr = elemy.children[indexy].innerHTML;
          });
          elemy.addEventListener('mousedown',()=>mDn=true);
          elemy.addEventListener('mousemove',(ev)=>{
            ev.preventDefault();
            if(mDn){
              if(ev.movementY>0) indexy = ((--indexy<0)?0:indexy);
              else if(ev.movementY<0) indexy = ((++indexy>=elemy.children.length)?--indexy:indexy);
              goToIndex(elemy, indexy);
              distYr = elemy.children[indexy].innerHTML;
              mDn=false;
            }
          });
          elemy.addEventListener('touchstart',(ev)=>{mDn=true;tSt=ev.changedTouches[0].screenY;});
          elemy.addEventListener('touchend',(ev)=>{
            ev.preventDefault();
            if(mDn){
              tEd = ev.changedTouches[0].screenY - tSt;
              if(tEd>0) indexy = ((--indexy<0)?0:indexy);
              else if(tEd<0) indexy = ((++indexy>=elemy.children.length)?--indexy:indexy);
              goToIndex(elemy, indexy);
              distYr = elemy.children[indexy].innerHTML;
              mDn=false;
            }
          });
      
          lis = '';
          for(var i =1;i<=12;i++) lis += '<li style="transform:rotateX(0deg)">'+((i<10)?'0'+i:i)+'</li>';
          elemm = pickerElem.querySelector('.dtpicker-container .months>ul');
          elemm.innerHTML = lis;
          elemm.addEventListener('wheel', (ev) => {
            if(ev.deltaY<0) indexm = ((--indexm<0)?0:indexm);
            else if(ev.deltaY>0) indexm = ((++indexm>=elemm.children.length)?--indexm:indexm);
            goToIndex(elemm, indexm);
            distMn = elemm.children[indexm].innerHTML;
          });
          elemm.addEventListener('mousedown',()=>mDn=true);
          elemm.addEventListener('mousemove',(ev)=>{
            if(mDn){
              if(ev.movementY>0) indexm = ((--indexm<0)?0:indexm);
              else if(ev.movementY<0) indexm = ((++indexm>=elemm.children.length)?--indexm:indexm);
              goToIndex(elemm, indexm);
              distMn = elemm.children[indexm].innerHTML;
              mDn=false;
            }
          });
          elemm.addEventListener('touchstart',(ev)=>{mDn=true;tSt=ev.changedTouches[0].screenY;});
          elemm.addEventListener('touchend',(ev)=>{
            ev.preventDefault();
            if(mDn){
              tEd = ev.changedTouches[0].screenY - tSt;
              if(tEd>0) indexm = ((--indexm<0)?0:indexm);
              else if(tEd<0) indexm = ((++indexm>=elemm.children.length)?--indexm:indexm);
              goToIndex(elemm, indexm);
              distMn = elemm.children[indexm].innerHTML;
              mDn=false;
            }
          });
      
          lis = '';
          for(var i =1;i<=31;i++) lis += '<li style="transform:rotateX(0deg)">'+((i<10)?'0'+i:i)+'</li>';
          elemd = pickerElem.querySelector('.dtpicker-container .days>ul');
          elemd.innerHTML = lis;
          elemd.addEventListener('wheel', (ev) => {
            if(ev.deltaY<0) indexd = ((--indexd<0)?0:indexd);
            else if(ev.deltaY>0) indexd = ((++indexd>=elemd.children.length)?--indexd:indexd);
            goToIndex(elemd, indexd);
            distDy = elemd.children[indexd].innerHTML;
          });
          elemd.addEventListener('mousedown',()=>mDn=true);
          elemd.addEventListener('mousemove',(ev)=>{
            if(mDn){
              if(ev.movementY>0) indexd = ((--indexd<0)?0:indexd);
              else if(ev.movementY<0) indexd = ((++indexd>=elemd.children.length)?--indexd:indexd);
              goToIndex(elemd, indexd);
              distDy = elemd.children[indexd].innerHTML;
              mDn=false;
            }
          });
          elemd.addEventListener('touchstart',(ev)=>{mDn=true;tSt=ev.changedTouches[0].screenY;});
          elemd.addEventListener('touchend',(ev)=>{
            ev.preventDefault();
            if(mDn){
              tEd = ev.changedTouches[0].screenY - tSt;
              if(tEd>0) indexd = ((--indexd<0)?0:indexd);
              else if(tEd<0) indexd = ((++indexd>=elemd.children.length)?--indexd:indexd);
              goToIndex(elemd, indexd);
              distDy = elemd.children[indexd].innerHTML;
              mDn=false;
            }
          });
        }
        if(options.mode==1 || options.mode==2){
          lis = '';
          for(var i =0;i<=23;i++) lis += '<li style="transform:rotateX(0deg)">'+((i<10)?'0'+i:i)+'</li>';
          elemh = pickerElem.querySelector('.dtpicker-container .hours>ul');
          elemh.innerHTML = lis;
          elemh.addEventListener('wheel', (ev) => {
            if(ev.deltaY<0) indexh = ((--indexh<0)?0:indexh);
            else if(ev.deltaY>0) indexh = ((++indexh>=elemh.children.length)?--indexh:indexh);
            goToIndex(elemh, indexh);
            distHr = elemh.children[indexh].innerHTML;
          });
          elemh.addEventListener('mousedown',()=>mDn=true);
          elemh.addEventListener('mousemove',(ev)=>{
            if(mDn){
              if(ev.movementY>0) indexh = ((--indexh<0)?0:indexh);
              else if(ev.movementY<0) indexh = ((++indexh>=elemh.children.length)?--indexh:indexh);
              goToIndex(elemh, indexh);
              distHr = elemh.children[indexh].innerHTML;
              mDn=false;
            }
          });
          elemh.addEventListener('touchstart',(ev)=>{mDn=true;tSt=ev.changedTouches[0].screenY;});
          elemh.addEventListener('touchend',(ev)=>{
            ev.preventDefault();
            if(mDn){
              tEd = ev.changedTouches[0].screenY - tSt;
              if(tEd>0) indexh = ((--indexh<0)?0:indexh);
              else if(tEd<0) indexh = ((++indexh>=elemh.children.length)?--indexh:indexh);
              goToIndex(elemh, indexh);
              distHr = elemh.children[indexh].innerHTML;
              mDn=false;
            }
          });
      
          lis = '';
          for(var i =0;i<=59;i++) lis += '<li style="transform:rotateX(0deg)">'+((i<10)?'0'+i:i)+'</li>';
          elemi = pickerElem.querySelector('.dtpicker-container .minutes>ul');
          elemi.innerHTML = lis;
          elemi.addEventListener('wheel', (ev) => {
            if(ev.deltaY<0) indexi = ((--indexi<0)?0:indexi);
            else if(ev.deltaY>0) indexi = ((++indexi>=elemi.children.length)?--indexi:indexi);
            goToIndex(elemi, indexi);
            distMi = elemi.children[indexi].innerHTML;
          });
          elemi.addEventListener('mousedown',()=>mDn=true);
          elemi.addEventListener('mousemove',(ev)=>{
            if(mDn){
              if(ev.movementY>0) indexi = ((--indexi<0)?0:indexi);
              else if(ev.movementY<0) indexi = ((++indexi>=elemi.children.length)?--indexi:indexi);
              goToIndex(elemi, indexi);
              distMi = elemi.children[indexi].innerHTML;
              mDn=false;
            }
          });
          elemi.addEventListener('touchstart',(ev)=>{mDn=true;tSt=ev.changedTouches[0].screenY;});
          elemi.addEventListener('touchend',(ev)=>{
            ev.preventDefault();
            if(mDn){
              tEd = ev.changedTouches[0].screenY - tSt;
              if(tEd>0) indexi = ((--indexi<0)?0:indexi);
              else if(tEd<0) indexi = ((++indexi>=elemi.children.length)?--indexi:indexi);
              goToIndex(elemi, indexi);
              distMi = elemi.children[indexi].innerHTML;
              mDn=false;
            }
          });
        }
      
        pickerElem.querySelector(".dtpicker-btn.ok").addEventListener('click',function(){
          var dNow = distYr+"/"+((distMn<10 && distMn[0]!='0')?"0"+distMn:distMn)+"/"+((distDy<10 && distDy[0]!='0')?"0"+distDy:distDy);
          var tNow = ((distHr<10 && distHr[0]!='0')?"0"+distHr:distHr)+":"+((distMi<10 && distMi[0]!='0')?"0"+distMi:distMi);
          if(options.mode==0)  
            if(elem.tagName=='INPUT') elem.value = dNow;
            else elem.innerHTML = dNow;
          else if(options.mode==1)
            if(elem.tagName=='INPUT') elem.value = tNow;
            else elem.innerHTML = tNow;
          else
            if(elem.tagName=='INPUT') elem.value = dNow+"~"+tNow;
            else elem.innerHTML = dNow+"~"+tNow;
          pickerElem.classList.remove('active');
          setTimeout(()=>pickerElem.remove(),500);
        });
      
        pickerElem.querySelector(".dtpicker-btn.ca").addEventListener('click',function(){
          pickerElem.classList.remove('active');
          setTimeout(()=>pickerElem.remove(),500);
        }); 
        
        pickerElem.querySelector(".dtpicker-btn.to").addEventListener('click',function(){
          var dt = new Date();
          distYr = dt.getFullYear();
          distMn = (dt.getMonth()+1);
          distDy = dt.getDate();
          distHr = dt.getHours();
          distMi = dt.getMinutes();
          if(options.mode==0 || options.mode==2){
            setTimeout(()=>{
              indexy = (distYr-options.startYear); goToIndex(elemy,indexy);
              indexm = distMn-1; goToIndex(elemm,indexm);
              indexd = distDy-1; goToIndex(elemd,indexd);
            },300);
          }
          if(options.mode==1 || options.mode==2){
            setTimeout(()=>{
              indexh = distHr; goToIndex(elemh,indexh);
              indexi = distMi; goToIndex(elemi,indexi);
            },300);
          }
        });
        pickerElem.querySelector(".dtpicker-btn.to").click();
      },10);
	}
    
    function goToIndex(el, index){
      var all = el.children;
      for(var i=index;i>=0;i--){
        all[i].style.transform = 'rotateX('+((index-i)*-30)+'deg)';
        if((index-i)==0){
          all[i].style.color='var(--bg-color)';
          all[i].style.fontWeight='bold';
          all[i].style.textShadow='0px 0px 10px var(--txt-color)';
        }else{
          all[i].style.color='var(--txt-color)';
          all[i].style.fontWeight='normal';
          all[i].style.textShadow='none';
        }
      }
      for(var i=index;i<all.length;i++){
        all[i].style.transform = 'rotateX('+((i-index)*30)+'deg)';
        if((i-index)==0){
          all[i].style.color='var(--bg-color)';
          all[i].style.fontWeight='bold';
          all[i].style.textShadow='0px 0px 10px var(--txt-color)';
        }else{
          all[i].style.color='var(--txt-color)';
          all[i].style.fontWeight='normal';
          all[i].style.textShadow='none';
        }
      }
      el.style.top=((index*-20)+20)+'px';
    }
  }else{
    console.log('undefined element!');
  }
});