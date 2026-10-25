const WHATSAPP_NUMBER = "919876543210"; // Replace with your WhatsApp number: country code + digits only
const menuToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav nav');
menuToggle?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();
let cart=[];
const panel=document.getElementById('cartPanel'),overlay=document.getElementById('overlay');
function openCart(){panel.classList.add('open');overlay.classList.add('open')}
function closeCart(){panel.classList.remove('open');overlay.classList.remove('open')}
document.getElementById('cartBtn').addEventListener('click',openCart);document.getElementById('closeCart').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);
function renderCart(){document.getElementById('cartCount').textContent=cart.length;document.getElementById('cartCountPanel').textContent=`(${cart.length})`;document.getElementById('cartTotal').textContent='₹'+cart.reduce((sum,p)=>sum+p.price,0).toLocaleString('en-IN');const area=document.getElementById('cartItems');if(!cart.length){area.textContent='Your bag is currently empty.';return}area.innerHTML=cart.map((p,i)=>`<div class="cart-item"><span>${p.name}</span><span>₹${p.price.toLocaleString('en-IN')} <button data-remove="${i}" aria-label="Remove ${p.name}">Remove</button></span></div>`).join('');area.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>{cart.splice(Number(b.dataset.remove),1);renderCart()}))}
document.querySelectorAll('.quick-add').forEach(btn=>btn.addEventListener('click',()=>{const p=btn.closest('.product');cart.push({name:p.dataset.name,price:Number(p.dataset.price)});renderCart();openCart();btn.textContent='✓';setTimeout(()=>btn.textContent='+',700)}));
document.getElementById('checkoutBtn').addEventListener('click',()=>{if(!cart.length){alert('Your bag is empty. Add a product first.');return}const lines=cart.map(p=>`${p.name} - ₹${p.price}`).join('\n');const total=cart.reduce((s,p)=>s+p.price,0);const msg=`Hi FORME STUDIO, I would like to order:\n${lines}\nSubtotal: ₹${total}\nPlease confirm sizes and availability.`;window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank')});
document.getElementById('newsletterForm').addEventListener('submit',e=>{e.preventDefault();alert('Thanks! This is a demo signup. Connect an email marketing service to collect subscriptions.');e.target.reset()});
document.getElementById('searchBtn').addEventListener('click',()=>{const q=prompt('Search products (e.g. shirt, tee, pants, bag):');if(!q)return;const matches=[...document.querySelectorAll('.product')].filter(p=>p.dataset.name.toLowerCase().includes(q.toLowerCase()));document.querySelectorAll('.product').forEach(p=>p.style.display=matches.includes(p)?'':'none');document.getElementById('shop').scrollIntoView({behavior:'smooth'});if(!matches.length)alert('No matching demo products. Try shirt, tee, pants or bag.')});


// Premium polish: subtle scroll reveals; respects reduced-motion preferences.
document.querySelectorAll('.section-head,.product,.manifesto-copy,.newsletter,.final-cta').forEach(el=>el.classList.add('reveal'));
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}
 }),{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
