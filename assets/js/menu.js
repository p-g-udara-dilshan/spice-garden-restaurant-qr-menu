(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s);
  const menu=window.SPICE_MENU||[];
  const categories=window.SPICE_CATEGORIES||[];
  const config=window.SPICE_CONFIG||{};
  const {toast,money,escapeHTML}=window.SpiceHelpers||{};
  if(!$('#catalog-grid'))return;
  const storageKey='spice-garden-cart-v1';
  let cart={},activeCategory='All dishes',query='',previousFocus=null;
  try{const old=JSON.parse(sessionStorage.getItem(storageKey)||'{}');if(old&&typeof old==='object')for(const [id,n] of Object.entries(old))if(menu.some(d=>d.id===id)&&Number.isInteger(n)&&n>0&&n<=99)cart[id]=n;}catch{}
  const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
  const total=()=>menu.reduce((s,d)=>s+d.price*(cart[d.id]||0),0);
  const save=()=>{try{sessionStorage.setItem(storageKey,JSON.stringify(cart));}catch{}};
  function renderCategories(){
    $('#category-list').innerHTML=categories.map(c=>`<button type="button" class="category-chip${activeCategory===c?' active':''}" aria-pressed="${activeCategory===c}" data-category="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join('');
  }
  function renderMenu(){
    const shown=menu.filter(d=>(activeCategory==='All dishes'||d.category===activeCategory)&&(!query||(d.name+' '+d.category+' '+d.description).toLowerCase().includes(query)));
    $('#results-count').textContent=`${shown.length} ${shown.length===1?'dish':'dishes'} to discover`;
    $('#no-results').hidden=shown.length>0;
    $('#catalog-grid').innerHTML=shown.map(d=>`<article class="menu-item"><div class="menu-item-photo"><img src="${escapeHTML(d.image)}" alt="${escapeHTML(d.name)}" loading="lazy" width="810" height="700">${d.badge?`<span>${escapeHTML(d.badge)}</span>`:''}</div><div class="menu-item-info"><p class="menu-item-cat">${escapeHTML(d.category)}</p><h3>${escapeHTML(d.name)}</h3><p class="menu-item-desc">${escapeHTML(d.description)}</p><div class="menu-item-bottom"><strong>${money(d.price)}</strong><button class="add-button" type="button" data-add="${escapeHTML(d.id)}" aria-label="Add ${escapeHTML(d.name)} to selection">+ Add item</button></div></div></article>`).join('');
  }
  function renderCart(){
    const n=count();$('#cart-fab').hidden=n===0;
    $('#cart-fab-count').textContent=`${n} ${n===1?'item':'items'}`;$('#cart-fab-total').textContent=money(total());$('#cart-total').textContent=money(total());
    $('#cart-items').innerHTML=menu.filter(d=>cart[d.id]).map(d=>`<div class="cart-line"><div><h3>${escapeHTML(d.name)}</h3><small>${money(d.price)} each</small></div><div class="stepper"><button type="button" data-minus="${escapeHTML(d.id)}" aria-label="Remove one ${escapeHTML(d.name)}">−</button><span>${cart[d.id]}</span><button type="button" data-plus="${escapeHTML(d.id)}" aria-label="Add one ${escapeHTML(d.name)}">+</button></div></div>`).join('')||'<p class="cart-empty">Your selection is empty. Choose something delicious!</p>';
    save();
  }
  function change(id,amount){if(!menu.some(d=>d.id===id))return;cart[id]=Math.max(0,Math.min(99,(cart[id]||0)+amount));if(!cart[id])delete cart[id];renderCart();if(amount>0)toast('Added to your selection');if(count()===0)closeCart();}
  const drawer=$('#cart-panel'),overlay=$('#cart-overlay');
  function openCart(){previousFocus=document.activeElement;drawer.hidden=false;overlay.hidden=false;document.body.classList.add('locked');$('#close-cart').focus();}
  function closeCart(){drawer.hidden=true;overlay.hidden=true;document.body.classList.remove('locked');previousFocus?.focus();}
  async function copy(str){if(navigator.clipboard&&isSecureContext){await navigator.clipboard.writeText(str);return;}const t=document.createElement('textarea');t.value=str;t.style.position='fixed';t.style.left='-9999px';document.body.append(t);t.select();const ok=document.execCommand('copy');t.remove();if(!ok)throw Error('Copy failed');}
  async function placeEnquiry(){if(!count())return;const list=menu.filter(d=>cart[d.id]).map(d=>`• ${d.name} x ${cart[d.id]} — ${money(d.price*cart[d.id])}`).join('\n');const message=`Hello, I would like to enquire about the following dishes at Spice Garden:\n\n${list}\n\nEstimated total: ${money(total())}\n\nCould you please confirm availability, final pricing and takeaway/delivery options?`;
    const number=String(config.whatsappNumber||'').replace(/\D/g,'');if(number){window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');$('#order-message-status').textContent='The message is ready in WhatsApp. Tap Send to submit your enquiry.';toast('Your enquiry is ready in WhatsApp');return;}
    try{await copy(message);toast('Enquiry copied to clipboard');$('#order-message-status').textContent='Enquiry copied. Paste into a chat to send.';}catch{$('#order-message-status').textContent=message;}
  }
  $('#category-list').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;activeCategory=b.dataset.category;renderCategories();renderMenu();});
  $('#dish-search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();renderMenu();});
  $('#catalog-grid').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b)change(b.dataset.add,1);});
  $('#clear-filters').addEventListener('click',()=>{activeCategory='All dishes';query='';$('#dish-search').value='';renderCategories();renderMenu();});
  $('#cart-fab').addEventListener('click',openCart);$('#close-cart').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);
  $('#cart-items').addEventListener('click',e=>{const a=e.target.closest('[data-plus]'),b=e.target.closest('[data-minus]');if(a)change(a.dataset.plus,1);if(b)change(b.dataset.minus,-1);});
  $('#send-order').addEventListener('click',placeEnquiry);$('#clear-cart').addEventListener('click',()=>{cart={};renderCart();closeCart();toast('Selection cleared');});
  $('#share-menu').addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:document.title,url:location.href});return;}catch(e){if(e.name==='AbortError')return;}}try{await copy(location.href);toast('Menu link copied');}catch{toast('Copy the link from your browser address bar');}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!drawer.hidden)closeCart();if(e.key==='Tab'&&!drawer.hidden){const buttons=[...drawer.querySelectorAll('button:not(:disabled)')];if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons.at(-1).focus();}if(!e.shiftKey&&document.activeElement===buttons.at(-1)){e.preventDefault();buttons[0].focus();}}});
  renderCategories();renderMenu();renderCart();
})();
