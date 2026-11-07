import fs from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {chromium} from '@playwright/test';
const reference = process.env.CSS_REFERENCE_URL;
const candidate = process.env.CSS_CANDIDATE_URL;
if (!reference || !candidate) throw new Error('Set CSS_REFERENCE_URL and CSS_CANDIDATE_URL to the two running builds.');
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const cases=JSON.parse(process.env.CSS_CASES || '["/","/about","/work","/pricing","/resources","/locations","/contact","/services/website-design","/industries/electricians","/locations/perth","/insights/how-to-measure-ai-search-visibility","/insights/entity-trust-monitoring-search-ai-framework","/tools","/tools/color-converter","/tools/font-pairing","/tools/contrast-checker","/tools/color-palette","/tools/palette-preview","/tools/gradient-generator","/tools/brand-color-extractor","/tools/favicon-generator","/tools/svg-to-png","/insights/ai-content-disclosure-guide-business","/insights/citation-worthy-original-research-business-data","/archived-home"]');
const props=['display','position','width','height','min-width','max-width','min-height','max-height','margin-top','margin-right','margin-bottom','margin-left','padding-top','padding-right','padding-bottom','padding-left','gap','grid-template-columns','grid-template-rows','grid-column','grid-row','align-items','align-self','justify-content','justify-self','flex','flex-direction','flex-wrap','order','font-family','font-size','font-weight','font-style','line-height','letter-spacing','text-transform','text-align','text-decoration','white-space','word-break','overflow','overflow-x','overflow-y','visibility','opacity','color','background-color','background-image','background-size','background-position','border-top','border-right','border-bottom','border-left','border-radius','box-shadow','outline','outline-offset','top','right','bottom','left','transform','z-index','object-fit','object-position','content','scale','rotate','translate','font-feature-settings','text-shadow','filter','backdrop-filter','fill','stroke','stroke-width','mask-image','border-image','clip-path','cursor','pointer-events'];
const state = process.env.CSS_STATE || 'default';
const all=[];
try {
for(const width of JSON.parse(process.env.CSS_WIDTHS || '[390,768,1024,1440]'))for(const theme of ['dark','light']){
 const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
 await context.addInitScript(({theme,freeze})=>{
   try {localStorage.setItem('off-piste-duplicate-theme',theme)} catch {}
   Math.random=()=>0.5;
   window.setInterval=()=>0;
   if (freeze) {
     // Full-page screenshots can trigger scroll callbacks while being captured.
     // Freeze this incidental motion, plus the delayed rotating client logos.
     window.addEventListener('scroll',event=>event.stopImmediatePropagation(),true);
     const timeout=window.setTimeout;
     window.setTimeout=(callback,delay,...args)=>delay>=500?0:timeout(callback,delay,...args);
   }
 },{theme,freeze:Boolean(process.env.CSS_SCREENSHOTS_DIR)});
 const pages=await Promise.all([context.newPage(),context.newPage()]);
 for(const route of cases){
  const snapshots=await Promise.all(pages.map(async(page,index)=>{
   await page.goto(new URL(route,index===0?reference:candidate).href);
   await page.evaluate(async()=>{ await document.fonts.ready; await Promise.all([...document.images].map(img=>{img.loading='eager';return img.decode().catch(()=>{});})); });
   await page.addStyleTag({content:'html{scroll-behavior:auto!important}*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}.footer__brand-letter{opacity:1!important;transform:none!important}'});
   await page.evaluate(()=>{window.scrollTo(0,document.body.scrollHeight)});
   await page.waitForTimeout(150);
   await page.evaluate(async()=>{window.scrollTo(0,0); await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));window.dispatchEvent(new Event('scroll'));});
   if (state === 'menu') await page.locator('[data-duplicate-nav-toggle]').evaluate(element => element.click());
   if (state === 'lead') {
     const contact = page.locator('a[href="/contact"]');
     const dock = page.locator('[data-lara-toggle]');
     if (await contact.count()) await contact.first().evaluate(element => element.click());
     else if (await dock.count()) await dock.evaluate(element => element.click());
     else throw new Error(`No lead modal/dock on ${route}`);
   }
   if (state === 'faq') await page.locator('details.faq__item').first().evaluate(element => { element.open = true; });
   if (state === 'hover') await page.locator('[data-theme-toggle]').hover();
   if (state === 'focus') await page.locator('[data-theme-toggle]').focus();
   if (state === 'scrolled') await page.evaluate(async() => { window.scrollTo(0,500); await new Promise(resolve => requestAnimationFrame(()=>requestAnimationFrame(resolve))); window.dispatchEvent(new Event('scroll')); });
   if (state !== 'default') await page.waitForTimeout(180);
   if (process.env.CSS_SCREENSHOTS_DIR) {
     if (state === 'default') await page.evaluate(()=>document.querySelector('.duplicate-header')?.classList.remove('is-scrolled'));
     await page.evaluate(async()=>{await document.fonts.ready;window.dispatchEvent(new Event('resize'));await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
     fs.mkdirSync(process.env.CSS_SCREENSHOTS_DIR, {recursive:true});
     await page.screenshot({path:join(process.env.CSS_SCREENSHOTS_DIR,`${route.replaceAll('/', '_') || 'home'}-${width}-${theme}-${state}-${index}.png`),fullPage:true,animations:'disabled'});
   }
   return page.evaluate(props=>[...document.body.querySelectorAll('*')].filter(el=>!['SCRIPT','STYLE'].includes(el.tagName)).map((el,index)=>{
    const result={element:`${index} ${el.tagName}.${el.className?.baseVal??el.className}`};
    for(const pseudo of ['', '::before','::after']){const style=getComputedStyle(el,pseudo||null);result[pseudo||'self']=Object.fromEntries(props.map(p=>[p,style.getPropertyValue(p)]));}
    return result;
   }),props);
  }));
  const diffs=[];const [a,b]=snapshots;
  if(a.length!==b.length)diffs.push({dom:[a.length,b.length]});
  for(let index=0;index<Math.min(a.length,b.length);index++){
   const changes={};for(const pseudo of ['self','::before','::after'])for(const prop of props)if(a[index][pseudo][prop]!==b[index][pseudo][prop])changes[`${pseudo} ${prop}`]=[a[index][pseudo][prop],b[index][pseudo][prop]];
   if(Object.keys(changes).length)diffs.push({element:a[index].element,changes});
  }
  const result={route,width,theme,state,elements:a.length,differences:diffs.length,details:diffs.slice(0,20)};
  all.push(result);console.log(JSON.stringify({...result,details:undefined}));
 }
 await context.close();
}
} finally { await browser.close(); }
fs.writeFileSync(process.env.CSS_OUTPUT || join(tmpdir(),'off-piste-css-parity.json'),JSON.stringify(all,null,2));
console.log('Differing cases:',all.filter(r=>r.differences).length,'/',all.length);

if (all.some(result => result.differences)) process.exitCode = 1;
