/* eslint-disable */
// @ts-nocheck
"use client";
import { useEffect } from "react";

export default function Effects() {
  useEffect(() => {
    let dead = false, raf = 0, iv = 0;
    const off = [];
    const addEventListener = (e, f, o) => { window.addEventListener(e, f, o); off.push(() => window.removeEventListener(e, f, o)); };
    const on = (el, e, f, o) => { el.addEventListener(e, f, o); off.push(() => el.removeEventListener(e, f, o)); };

    const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
    const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
    let t=0;
    const ld=$('#ld'),cn=$('#cn'),br=$('#br');let p=0;
    const step=()=>{if(dead)return;p=Math.min(100,p+(rm?50:Math.random()*9+3));cn.textContent=String(Math.floor(p)).padStart(3,'0');br.style.width=p+'%';if(p<100)setTimeout(step,rm?30:70);else{ld.classList.add('off');setTimeout(()=>{ld.style.display='none'},700)}};step();
    const clk=()=>{$('#clk').textContent=new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})};clk();iv=setInterval(clk,30000);
    $$('.hs').forEach(h=>{let d=0,x=0,l=0;on(h,'pointerdown',e=>{if(e.pointerType!=='mouse')return;d=1;x=e.clientX;l=h.scrollLeft;h.classList.add('dg')});addEventListener('pointermove',e=>{if(d)h.scrollLeft=l-(e.clientX-x)});addEventListener('pointerup',()=>{d=0;h.classList.remove('dg')})});
    $$('.hs').forEach(h=>{const cs=[...h.children],f=()=>{const c=h.getBoundingClientRect();cs.forEach(k=>{const r=k.getBoundingClientRect(),w=r.width,o=Math.min(1,Math.max(0,Math.min((r.right-c.left)/w,(c.right-r.left)/w))),e=o*o;k.style.opacity=o>=.999?'':e.toFixed(3);k.style.transform=o>=.999?'':'scale('+(.9+.1*o).toFixed(3)+')'})};on(h,'scroll',f,{passive:true});addEventListener('resize',f);addEventListener('load',f);f()});
    const tk=$('#tk'),hl=$$('#news .n').map(e=>e.textContent.trim()).filter(Boolean);
    if(!hl.length)$('.tickr').style.display='none';else{tk.innerHTML='';[0,1].forEach(k=>{const g=document.createElement('span');g.className='tg';if(k)g.setAttribute('aria-hidden','true');hl.forEach(t=>{const a=document.createElement('a');a.href='#news';a.textContent=t;if(k)a.tabIndex=-1;g.appendChild(a)});tk.appendChild(g)});const sd=()=>{tk.style.animationDuration=Math.max(14,tk.scrollWidth/2/55)+'s'};sd();addEventListener('load',sd)}
    const pf=$('#pf'),sp=()=>{const m=document.documentElement.scrollHeight-innerHeight;pf.style.height=(m>0?scrollY/m*100:0)+'%'};addEventListener('scroll',sp,{passive:true});sp();
    $$('[data-f]').forEach(b=>b.onclick=()=>{$$('[data-f]').forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;$$('[data-s]').forEach(c=>c.style.display=(f==='all'||c.dataset.s===f)?'':'none')});
    const tr=$$('.hero,.sec'),clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
    const fx=()=>{const vh=innerHeight,end=scrollY+vh>=document.documentElement.scrollHeight-2;tr.forEach(el=>{const r=el.getBoundingClientRect(),w=Math.min(Math.max(r.height,vh*.6),vh*.85),ot=clamp(r.bottom/w,0,1),ob=end?1:clamp((vh-r.top)/w,0,1),o=Math.min(ot,ob);if(o>=.999){el.style.opacity=el.style.transform=el.style.filter='';return}el.style.opacity=(o*o).toFixed(3);el.style.filter=ot<.999?'grayscale('+(1-ot).toFixed(3)+')':'';el.style.transform='translateY('+((1-ob)*64).toFixed(1)+'px) scale('+(.9+.1*o).toFixed(3)+')'})};
    if(!rm){addEventListener('scroll',fx,{passive:true});addEventListener('resize',fx);fx()}
    const cv=$('#cv'),cx=cv.getContext('2d');let W,H;
    const rs=()=>{const d=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0)};rs();addEventListener('resize',rs);
    const draw=()=>{if(dead)return;cx.clearRect(0,0,W,H);const c=getComputedStyle(document.documentElement).getPropertyValue('--wave');
    for(let i=0;i<6;i++){cx.beginPath();const y0=H*(.25+i*.1);for(let x=0;x<=W;x+=8){let y=y0+Math.sin(x*.006+t*(.6+i*.08)+i)*(26+i*5);x?cx.lineTo(x,y):cx.moveTo(x,y)}cx.strokeStyle='rgba('+c+','+(.1+i*.02)+')';cx.lineWidth=1.2;cx.stroke()}
    t+=.012;if(!rm)raf=requestAnimationFrame(draw)};draw();

    return () => { dead = true; cancelAnimationFrame(raf); clearInterval(iv); off.forEach((f) => f()); };
  }, []);

  return null;
}
