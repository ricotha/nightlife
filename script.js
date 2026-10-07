 const venues = [
  {id:'skyline', name:'Skyline Lounge', cat:'Rooftop lounge', meta:'Sukhumvit · Table at 20:30', time:'20:30', sub:'Rooftop drinks · Sukhumvit', art:'art-skyline'},
  {id:'velvet', name:'The Velvet Room', cat:'Cocktail lounge', meta:'Silom · Walk-in from 21:00', time:'21:00', sub:'Cocktails · Silom', art:'art-bar'},
  {id:'afterhours', name:'After Hours Club', cat:'Late-night music', meta:'Thonglor · Guest list from 22:30', time:'22:30', sub:'Late-night music · Thonglor', art:'art-club'},
  {id:'ember', name:'Ember Dining', cat:'Modern dining', meta:'Chidlom · Dinner from 19:30', time:'19:30', sub:'Dinner · Chidlom', art:'art-dine'}
];
const grid = document.getElementById('venueGrid');
grid.innerHTML = venues.map(v => `
  <div class="venue-card">
    <div class="venue-photo ${v.art}">
      <button class="fave" data-fave="${v.id}" aria-label="Save ${v.name}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.35-9.5-8.8C.7 7.6 2.4 4 6 4c2 0 3.5 1.1 4 2.4C10.5 5.1 12 4 14 4c3.6 0 5.3 3.6 3.5 7.2C19 15.65 12 20 12 20Z"/></svg>
      </button>
    </div>
    <div class="venue-body">
      <h3>${v.name}</h3>
      <span class="venue-cat">${v.cat}</span>
      <span class="venue-meta">${v.meta}</span>
      <button class="venue-btn" data-add="${v.id}">Build tonight's plan</button>
    </div>
  </div>`).join('');

document.querySelectorAll('[data-fave]').forEach(btn=>{
  btn.addEventListener('click', ()=>btn.classList.toggle('active'));
});

const planList = document.getElementById('planList');
const added = new Set();
function renderPlan(){
  if(added.size===0){
    planList.innerHTML = "<p class=\"plan-empty\">Add a venue below to start building tonight's plan.</p>";
    return;
  }
  const items = venues.filter(v=>added.has(v.id)).sort((a,b)=>a.time.localeCompare(b.time));
  planList.innerHTML = items.map(v=>`
    <div class="plan-item">
      <span class="plan-time">${v.time}</span>
      <div><div class="plan-name">${v.name}</div><div class="plan-sub">${v.sub}</div></div>
    </div>`).join('');
}
document.querySelectorAll('[data-add]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-add');
    if(added.has(id)){ added.delete(id); btn.classList.remove('added'); btn.textContent = "Build tonight's plan"; }
    else{ added.add(id); btn.classList.add('added'); btn.textContent = 'Added to plan'; }
    renderPlan();
  });
});

document.querySelectorAll('.pill').forEach(p=>p.addEventListener('click', ()=>p.classList.toggle('active')));

const lightBtn = document.getElementById('lightBtn');
const darkBtn = document.getElementById('darkBtn');
function setTheme(mode){
  document.documentElement.setAttribute('data-theme', mode);
  lightBtn.classList.toggle('active', mode==='light');
  darkBtn.classList.toggle('active', mode==='dark');
}
lightBtn.addEventListener('click', ()=>setTheme('light'));
darkBtn.addEventListener('click', ()=>setTheme('dark'));

const tabs = document.querySelectorAll('.tab');
const previewBox = document.getElementById('previewBox');
const previewContent = {
  web: {eyebrow:'Desktop flow', title:'Shortlist, compare, and plan', body:'A clear path from discovery to an organized evening plan.'},
  mobile: {eyebrow:'Mobile flow', title:'Search, save, and go', body:'The same shortlist and plan, resized for one-handed use on the way out the door.'}
};
tabs.forEach(t=>t.addEventListener('click', ()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  const c = previewContent[t.dataset.tab];
  previewBox.innerHTML = `<span class="eyebrow3">${c.eyebrow}</span><h3>${c.title}</h3><p>${c.body}</p>`;
}));

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', ()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>navLinks.classList.remove('open')));

document.getElementById('searchBtn').addEventListener('click', ()=>{
  document.getElementById('venues').scrollIntoView({behavior:'smooth'});
});

renderPlan();