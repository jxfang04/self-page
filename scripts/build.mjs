import { mkdir, writeFile, copyFile, cp, access, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import profile from '../src/profile.mjs';
import { createHash } from 'node:crypto';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'dist');
const styleVersion = createHash('sha256').update(await readFile(resolve(root,'src/styles.css'))).digest('hex').slice(0,12);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
function safeUrl(value, base='./') {
  if (/^https?:\/\//i.test(value)) return esc(value);
  if (/^assets\/[\w./-]+$/.test(value) && !value.includes('..')) return base + esc(value);
  throw new Error(`Unsupported URL: ${value}`);
}
const mail = email => `mailto:${esc(email)}`;
const primaryEmail = mail(profile.email);
const arrow = '<span aria-hidden="true">↗</span>';
const pages = [
  {slug:'',label:'About me'},
  {slug:'research',label:'Research'},
  {slug:'publication',label:'Publication'},
  {slug:'robot-demos',label:'Robot Demos'},
  {slug:'hobbies',label:'Hobbies'},
  {slug:'post',label:'News'}
];
function navigation(page,base) {
  const emails = `<div class="nav-contact-emails">${[profile.email,profile.otherEmail].filter(Boolean).map(email=>`<a href="${mail(email)}">${esc(email)}</a>`).join('')}</div>`;
  return `<div class="page-header"><header id="site-header"><nav class="navbar" aria-label="Main navigation"><div class="brand-slot"><a class="navbar-brand" href="${base}" data-role="${esc(profile.sidebarRole ?? profile.role)}">${esc(profile.name.split(' ')[0])}</a></div><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Open menu"><svg class="open-icon" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg><svg class="close-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="m3 3 14 14M17 3 3 17" stroke="currentColor" stroke-width="2"/></svg></button><ul id="nav-menu">${pages.filter(p=>p.slug!=='post').map(p=>`<li><a class="nav-link${page.slug===p.slug?' active':''}" ${page.slug===p.slug?'aria-current="page"':''} href="${base}${p.slug?p.slug+'/':''}">${p.label}</a></li>`).join('')}<li class="mt-4"><a href="${primaryEmail}">Email me</a>${emails}</li></ul><div class="nav-contact"><a href="${primaryEmail}">Email me</a>${emails}</div></nav></header></div>`;
}
function socialLinks(base) {
 const names={github:'GitHub',openreview:'OpenReview',scholar:'Google Scholar',cv:'CV'};
 const icons={
  github:'<path fill="currentColor" d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.08c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.54 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.61 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.3-2.64 5.26-5.15 5.54.4.35.76 1.03.76 2.08v3.07c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/>',
  openreview:'<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 13h5m-5 4 2 2 5-5"/></g>',
  scholar:'<g fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m2 9 10-6 10 6-10 6L2 9Zm4 3v6c4 3 8 3 12 0v-6m4-3v9"/></g>'
 };
 return Object.entries(profile.links).filter(([,v])=>v).map(([k,v])=>{
  const label=esc(names[k]??k);
  const icon=icons[k]?`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[k]}</svg>`:'';
  return `<a href="${safeUrl(v,base)}" target="_blank" rel="noopener noreferrer">${icon}<span>${label}</span></a>`;
 }).join('');
}
function newsList(base) {
 if(!profile.news.length) return '<div class="news-list"><div class="news-item news-item--empty"><span>Updates will be added soon.</span></div></div>';
 return `<div class="news-list">${profile.news.map(n=>{const tag=n.url?'a':'div';return `<${tag} class="news-item" ${n.url?`href="${safeUrl(n.url,base)}" target="_blank" rel="noopener noreferrer"`:''}><time>${esc(n.date)}</time><span>${n.status?`<span class="news-status" role="img" aria-label="${esc(n.status)}">📤</span> `:''}${esc(n.text)}</span>${n.url?'<i aria-hidden="true">↗</i>':''}</${tag}>`;}).join('')}</div>`;
}
function home(base) {
 return `<div class="portfolio-about"><div class="portfolio-container portfolio-container--hero"><div class="home-hero"><figure class="home-hero__media" data-scroll-parallax><img src="${base}assets/home-palms-hd.png" width="1672" height="941" alt="AI-enhanced palm trees, green lawn and blue sky beside the sea at sunset" fetchpriority="high" decoding="async"><p class="home-banner-title" aria-hidden="true"><span class="home-banner-title__write" data-text="${esc(profile.name)}’s Homepage">${esc(profile.name)}’s Homepage</span></p><p class="home-banner-tagline" aria-hidden="true">“${esc(profile.bannerTagline ?? profile.tagline)}”</p></figure></div><header class="identity-strip" aria-labelledby="portfolio-title"><div class="identity-strip__person"><div><h1 id="portfolio-title">${esc(profile.name)}</h1><strong>${esc(profile.role)}</strong><p>${esc(profile.affiliation)}</p></div></div><div class="identity-strip__current"><span>Currently</span><strong class="current-role">${esc(profile.current)}</strong></div><div class="identity-strip__links"><a class="identity-email" href="${primaryEmail}">${esc(profile.email)}</a></div></header></div>
<section class="portfolio-chapter about-chapter" aria-labelledby="about-heading"><div class="portfolio-container"><div class="about-layout"><div class="about-gallery"><figure class="photo-frame biography-portrait">${profile.avatar?`<img src="${safeUrl(profile.avatar,base)}" width="1000" height="1000" alt="Portrait of ${esc(profile.name)}" loading="lazy" decoding="async">`:`<div class="portrait-placeholder" role="img" aria-label="Portrait placeholder for ${esc(profile.name)}"><span>${esc(profile.initials)}</span><small>Portrait coming soon</small></div>`}</figure><nav class="profile-icon-row biography-socials" aria-label="Academic and social profiles">${socialLinks(base)}</nav></div><div class="about-copy"><h2 id="about-heading">Biography</h2>${profile.biography.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="interest-list" aria-label="Research interests">${profile.interests.map(i=>`<span>${esc(i)}</span>`).join('')}</div></div><div class="availability-note"><span class="availability-dot" aria-hidden="true"></span><strong>${esc(profile.availability)}</strong><a href="${primaryEmail}">Email me</a></div></div></div></section>
<section class="portfolio-chapter news-chapter" id="news" aria-labelledby="news-heading"><div class="portfolio-container"><div class="about-news"><div class="subsection-heading"><div><p class="chapter-label">Updates</p><h2 id="news-heading">News</h2></div><a href="${base}post/">All news ${arrow}</a></div>${newsList(base)}</div></div></section></div>`;
}
function publicationList(base) {
 return `<div class="content-list">${profile.publications.map(p=>`<article class="paper-entry${p.image?' paper-entry--illustrated':''}${p.imageLayout==='wide'?' paper-entry--wide-image':''}${p.imageLayout==='balanced'?' paper-entry--balanced-image':''}">${p.image?`<a class="paper-teaser${p.overviewImage?' paper-teaser--stacked':''}" href="${safeUrl(p.imageUrl ?? p.image,base)}" target="_blank" rel="noopener noreferrer" aria-label="${p.imageUrl?'Read paper':'View full-size teaser'} for ${esc(p.title)}">${p.overviewImage?`<img src="${safeUrl(p.overviewImage,base)}" alt="${esc(p.overviewImageAlt ?? p.title)}" decoding="async">`:''}<img src="${safeUrl(p.image,base)}" alt="${esc(p.imageAlt ?? p.title)}" decoding="async"></a>`:''}<div class="paper-details"><p class="chapter-label">${esc(p.year)} · Preprint</p><h2>${esc(p.title)}</h2><p class="paper-authors">${p.authors.map(author=>author===profile.name?`<strong>${esc(author)}</strong>`:esc(author)).join(', ')}</p>${p.status?`<p class="paper-status">${esc(p.status)}</p>`:''}<a class="paper-link" href="${safeUrl(p.url,base)}" target="_blank" rel="noopener noreferrer">${esc(p.linkLabel ?? `arXiv:${p.arxiv}`)} ${arrow}</a></div></article>`).join('')}</div>`;
}
function demoList(base) {
 return `<div class="robot-demo-intro"><p class="chapter-label">BridgeWAM · Real-world demos</p><h2>Desk Cleanup</h2><p>Closing a laptop and putting away everyday objects with BridgeWAM.</p></div>${profile.demos.map((task,taskIndex)=>`<section class="robot-demo-group" aria-labelledby="demo-task-${taskIndex}"><h3 id="demo-task-${taskIndex}">${esc(task.title)}</h3><div class="robot-video-grid" tabindex="0" role="group" aria-label="${esc(task.title)} videos">${task.videos.map((video,index)=>`<figure class="robot-video-card"><video controls playsinline preload="metadata" aria-label="${esc(task.title)} — Demo ${index+1}" ${video.poster?`poster="${safeUrl(video.poster,base)}"`:''}><source src="${safeUrl(video.src,base)}" type="video/mp4"><p>Your browser does not support embedded video. <a href="${safeUrl(video.src,base)}">Open video</a>.</p></video><figcaption>Demo ${String(index+1).padStart(2,'0')}</figcaption></figure>`).join('')}</div></section>`).join('')}`;
}
function researchOverview() {
 return `<section class="research-section" aria-labelledby="research-directions"><h2 id="research-directions">Research Directions</h2><div class="research-area-grid">${profile.researchAreas.map(area=>`<article class="research-area"><p class="chapter-label">${esc(area.label)}</p><h3>${esc(area.title)}</h3>${area.description?`<p>${esc(area.description)}</p>`:''}<ul class="research-topics${typeof area.topics[0]==='object'?' research-topics--detailed':''}">${area.topics.map(topic=>typeof topic==='string'?`<li>${esc(topic)}</li>`:`<li><h4>${esc(topic.title)}</h4><p>${esc(topic.description)}</p></li>`).join('')}</ul></article>`).join('')}</div></section><section class="research-section" aria-labelledby="research-experience"><h2 id="research-experience">Research Experience</h2><ol class="experience-list">${profile.experience.map(job=>`<li class="experience-entry"><p class="experience-period"><time datetime="${esc(job.start)}">${esc(job.period.split(' — ')[0])}</time> — ${job.end?`<time datetime="${esc(job.end)}">${esc(job.period.split(' — ')[1])}</time>`:'Present'}</p><div><h3>${esc(job.organization)}</h3><p class="experience-role">${esc(job.role)}</p><p class="experience-mentors">Mentored by ${job.mentors.map(name=>job.mentorLinks?.[name]?`<a href="${safeUrl(job.mentorLinks[name])}" target="_blank" rel="noopener noreferrer">${esc(name)}</a>`:esc(name)).join(' and ')}${job.researchAdvisors?.length?`, with research guidance from ${job.researchAdvisors.map(esc).join(' and ')}.`:''}</p></div></li>`).join('')}</ol></section>`;
}
function hobbiesPage(base) {
 return `<div class="hobby-layout"><aside class="hobby-interests" aria-labelledby="hobby-interests-heading"><p class="chapter-label">Outside the lab</p><h2 id="hobby-interests-heading">Things I enjoy</h2><ul class="hobby-interest-list">${profile.hobbies.map(hobby=>`<li><span class="hobby-icon" aria-hidden="true">${esc(hobby.icon)}</span><span>${esc(hobby.title)}</span></li>`).join('')}</ul></aside><section class="hobby-moments" aria-labelledby="hobby-moments-heading"><h2 id="hobby-moments-heading">Moments outside research</h2>${profile.hobbyPhotos.length?`<div class="hobby-photo-wall">${profile.hobbyPhotos.map(photo=>`<figure class="hobby-photo"><a href="${safeUrl(photo.src,base)}" target="_blank" rel="noopener noreferrer" aria-label="${esc('View photo: '+photo.alt)}"><img src="${safeUrl(photo.src,base)}" alt="${esc(photo.alt)}" width="${esc(photo.width)}" height="${esc(photo.height)}" loading="lazy" decoding="async"></a>${photo.caption?`<figcaption>${esc(photo.caption)}</figcaption>`:''}</figure>`).join('')}</div>`:`<div class="hobby-photo-empty"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="5" y="8" width="38" height="32" rx="5"/><circle cx="16" cy="18" r="3"/><path d="m6 34 11-10 8 7 7-8 10 11"/></svg><p>Photos coming soon</p></div>`}</section></div>`;
}
function contentPage(page,base) {
 const items = page.slug==='research'?profile.projects:(profile[{'publication':'publications','robot-demos':'demos','hobbies':'hobbies'}[page.slug]]??[]);
 const content = page.slug==='hobbies'?hobbiesPage(base):page.slug==='post'?newsList(base):page.slug==='robot-demos'&&items.length?demoList(base):page.slug==='publication'&&items.length?publicationList(base):items.length?`<div class="content-list">${items.map(i=>`<article class="content-entry"><h2>${i.url?`<a href="${safeUrl(i.url,base)}" target="_blank" rel="noopener noreferrer">${esc(i.title)} ${arrow}</a>`:esc(i.title)}</h2><p>${esc(i.description)}</p>${i.image?`<img src="${safeUrl(i.image,base)}" alt="${esc(i.title)}" loading="lazy">`:''}</article>`).join('')}</div>`:`<p class="pending">${esc({research:'Research projects and interests will be added soon.',publication:'Publications will be added soon.','robot-demos':'Robot demonstrations will be added soon.',hobbies:'More about my interests outside research will be added soon.'}[page.slug])}</p>`;
 return `<section class="portfolio-chapter content-page${page.slug==='research'?' research-page':''}"><div class="portfolio-container"><p class="chapter-label">${esc(profile.name)}</p><h1>${page.label}</h1>${page.slug==='research'?researchOverview()+(items.length?content:''):content}</div></section>`;
}
const contact = `<aside id="contact" class="contact-strip" aria-labelledby="contact-title"><div class="portfolio-container contact-strip__inner"><div><p class="chapter-label">Research and collaboration</p><h2 id="contact-title">Let’s connect and explore ideas together.</h2></div><div><p>${esc(profile.contact)}</p><a href="${primaryEmail}">${esc(profile.email)} ${arrow}</a>${profile.otherEmail?`<a href="${mail(profile.otherEmail)}">${esc(profile.otherEmail)} ${arrow}</a>`:''}</div></div></aside>`;
function footer(base) {
 const links = Object.entries(profile.links).filter(([,v])=>v).map(([k,v])=>`<a href="${safeUrl(v,base)}" target="_blank" rel="noopener noreferrer">${esc({github:'GitHub',openreview:'OpenReview',scholar:'Scholar',cv:'CV'}[k]??k)}</a>`).join('');
 return `<div class="page-footer"><footer class="portfolio-footer"><div class="portfolio-footer__inner"><div class="portfolio-footer__brand"><strong>${esc(profile.name.toUpperCase())}</strong><span>${esc(profile.tagline)}</span></div><nav class="portfolio-footer__links" aria-label="Footer"><a href="${primaryEmail}">${esc(profile.email)}</a>${links}</nav><p class="portfolio-footer__copyright">© ${new Date().getFullYear()} ${esc(profile.name)}</p></div></footer></div>`;
}
await mkdir(out,{recursive:true});
await copyFile(resolve(root,'assets/favicon-beagle.ico'),resolve(out,'favicon.ico'));
await cp(resolve(root,'assets'),resolve(out,'assets'),{recursive:true});
await Promise.all(['styles.css','reference.css','app.js'].map(f=>copyFile(resolve(root,'src',f),resolve(out,f))));
for(const page of pages) {
 const base=page.slug?'../':'./';
 const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(profile.intro)}"><meta name="theme-color" content="#f1faf7"><title>${esc(profile.name)} — ${page.slug?page.label:'Personal Homepage'}</title><link rel="apple-touch-icon" href="${base}assets/apple-touch-icon-beagle.png" sizes="180x180"><link rel="icon" href="${base}assets/beagle-tab-v3.png" type="image/png" sizes="32x32"><link rel="shortcut icon" href="${base}assets/beagle-tab-v3.png" type="image/png"><link rel="stylesheet" href="${base}styles.css?v=${styleVersion}"><link rel="preload" href="${base}assets/fonts/cabinet-grotesk-700.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="${base}assets/fonts/allura-400.woff2" as="font" type="font/woff2" crossorigin><script src="${base}app.js" defer></script></head><body class="page-wrapper" id="top"><a class="skip-link" href="#portfolio-main">Skip to content</a>${navigation(page,base)}<div class="page-body"><main class="portfolio-site" id="portfolio-main" tabindex="-1">${page.slug?contentPage(page,base):home(base)}${contact}</main></div>${footer(base)}</body></html>`;
 const dir=resolve(out,page.slug);await mkdir(dir,{recursive:true});await writeFile(resolve(dir,'index.html'),html);
 // Verify every local resource and page link, including GitHub Pages subdirectory paths below.
}
await writeFile(resolve(out,'.nojekyll'),'');
for(const page of pages) {
 const dir=resolve(out,page.slug),html=await readFile(resolve(dir,'index.html'),'utf8');
 for(const [,url] of html.matchAll(/(?:src|href|poster)="([^"#]+)"/g)) {
  if(/^(https?:|mailto:)/.test(url)) continue;
  await access(resolve(dir,url.split('?')[0]));
 }
}
const css=await readFile(resolve(out,'reference.css'),'utf8');
for(const [,url] of css.matchAll(/url\(([^)]+)\)/g)) await access(resolve(out,url.replace(/["']/g,'')));
console.log(`Build successful → dist/ (${pages.length} static pages; all local links, images, fonts verified)`);
console.log(`Profile: ${profile.name}; projects: ${profile.projects.length}; news: ${profile.news.length}`);
