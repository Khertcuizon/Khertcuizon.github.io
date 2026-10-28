import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { pageContent } from './pageContent.js';

const links = [
  ['Home','index.html'], ['About','about.html'], ['Skills','skills.html'], ['Services','services.html'], ['Contact','contact.html']
];
const serviceLinks = [
  ['Services Overview','services.html'], ['Web Development','web-development.html'],
  ['Mobile Development','mobile-development.html'], ['Graphic Design','graphic-design.html'],
  ['Budget Tracker','budget-tracker.html']
];
const titles = {
 'index.html':'Khert Cuizon — Home','about.html':'About — Khert Cuizon','skills.html':'Skills — Khert Cuizon',
 'services.html':'Services — Khert Cuizon','contact.html':'Contact — Khert Cuizon',
 'web-development.html':'Web Development — Khert Cuizon','mobile-development.html':'Mobile Development — Khert Cuizon',
 'graphic-design.html':'Graphic Design — Khert Cuizon','budget-tracker.html':'Budget Tracker — Khert Cuizon'
};
function Header({page,theme,setTheme}) {
 const [menuOpen,setMenuOpen]=useState(false), [dropOpen,setDropOpen]=useState(false);
 return <nav className="navbar" id="navbar"><div className="nav-inner">
  <a href="index.html" className="logo" aria-label="Khert Cuizon home"><img className="logo-image" src="/assets/kc-logo.png" alt="KC logo"/><span className="logo-text">Khert<span>Cuizon</span></span></a>
  <ul className={`nav-links ${menuOpen?'open':''}`}>
   {links.slice(0,3).map(([label,url])=><li key={url}><a href={url} className={`nav-link ${page===url?'active':''}`} onClick={()=>setMenuOpen(false)}>{label}</a></li>)}
   <li className="dropdown services-nav"><a href="services.html" className={`nav-link ${['services.html','web-development.html','mobile-development.html','graphic-design.html','budget-tracker.html'].includes(page)?'active':''}`} onClick={()=>setMenuOpen(false)}>Services</a>
    <button className="dropdown-caret" type="button" aria-label="Open services menu" aria-expanded={dropOpen} onClick={()=>setDropOpen(!dropOpen)}><span className="dropdown-arrow">{dropOpen?'▲':'▼'}</span></button>
    <ul className={`dropdown-menu ${dropOpen?'show':''}`}>{serviceLinks.map(([label,url])=><li key={url}><a href={url} onClick={()=>{setDropOpen(false);setMenuOpen(false)}}>{label}</a></li>)}</ul>
   </li>
   <li><a href="contact.html" className={`nav-link ${page==='contact.html'?'active':''}`} onClick={()=>setMenuOpen(false)}>Contact</a></li>
  </ul>
  <div className="nav-actions"><a href="contact.html" className="btn btn-glow nav-cta">Let's Connect</a>
   <button className="theme-toggle" type="button" aria-label="Switch theme" title="Light/Dark mode" onClick={setTheme}><span className="theme-icon">{theme==='dark'?'☀':'☾'}</span></button>
   <button className={`nav-toggle ${menuOpen?'open':''}`} aria-label="Toggle menu" aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}><span></span><span></span><span></span></button>
  </div>
 </div></nav>
}
function App(){
 const page=location.pathname.split('/').filter(Boolean).pop() || 'index.html';
 const activePage=pageContent[page]?page:'index.html';
 const [theme,setThemeState]=useState(()=>{try{return localStorage.getItem('portfolio-theme')||'dark'}catch{return 'dark'}});
 const setTheme=()=>setThemeState(t=>{const next=t==='dark'?'light':'dark';try{localStorage.setItem('portfolio-theme',next)}catch{}return next});
 const [progress,setProgress]=useState(0);
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.body.className=activePage==='index.html'?'page-home multi-page':'multi-page';document.title=titles[activePage]||titles['index.html'];},[theme,activePage]);
 useEffect(()=>{
  const onScroll=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?window.scrollY/max*100:0);document.getElementById('navbar')?.classList.toggle('scrolled',window.scrollY>40);document.getElementById('backToTop')?.classList.toggle('show',window.scrollY>500)};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  const reveal=()=>{document.querySelectorAll('.reveal-up').forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight*.9)el.classList.add('visible')})};
  reveal();window.addEventListener('scroll',reveal,{passive:true});
  const back=()=>window.scrollTo({top:0,behavior:'smooth'});document.getElementById('backToTop')?.addEventListener('click',back);
  return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('scroll',reveal);document.getElementById('backToTop')?.removeEventListener('click',back)};
 },[activePage]);
 useEffect(()=>{
  const files=['/legacy-script.js'];
  if(activePage==='budget-tracker.html') files.push('/legacy-budget-tracker.js');
  const added=[];
  files.forEach(src=>{const el=document.createElement('script');el.src=src;el.dataset.reactLegacy='true';document.body.appendChild(el);added.push(el)});
  return()=>added.forEach(el=>el.remove());
 },[activePage]);
 useEffect(()=>{
  const typed=document.getElementById('typedText');if(!typed)return;
  const phrases=['BSCS Student','Aspiring Software Developer','Web & Mobile Developer'];let phrase=0,char=0,deleting=false;
  const timer=setInterval(()=>{const text=phrases[phrase];char+=deleting?-1:1;typed.textContent=text.slice(0,char);if(!deleting&&char===text.length){deleting=true;setTimeout(()=>{},700)}else if(deleting&&char===0){deleting=false;phrase=(phrase+1)%phrases.length}},100);
  return()=>clearInterval(timer);
 },[activePage]);
 return <>
  <div className="scroll-progress" style={{width:`${progress}%`}}></div>
  <Header page={activePage} theme={theme} setTheme={setTheme}/>
  <main dangerouslySetInnerHTML={{__html:pageContent[activePage]}} />
  <button className="back-to-top" id="backToTop" aria-label="Back to top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}><svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
 </>;
}
createRoot(document.getElementById('root')).render(<App/>);
