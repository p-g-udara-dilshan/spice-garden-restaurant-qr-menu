(() => {
  'use strict';
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
  const config=window.SPICE_CONFIG||{};
  const dishes=window.SPICE_MENU||[];
  const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=n=>`${config.currency||'Rs.'} ${Number(n).toLocaleString('en-LK')}`;
  let toastTimeout;
  function toast(message){const t=$('#toast');if(!t)return;t.textContent=message;t.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>t.classList.remove('show'),2900);}
  window.SpiceHelpers={toast,money,escapeHTML};

  const header=$('#site-header');
  if(header){
    const update=()=>header.classList.toggle('is-scrolled',window.scrollY>38);
    update();window.addEventListener('scroll',update,{passive:true});
    const toggle=$('#mobile-toggle'),nav=$('#mobile-navigation');
    const close=()=>{nav.hidden=true;toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open navigation');};
    toggle?.addEventListener('click',()=>{const open=nav.hidden;nav.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
    $$('#mobile-navigation a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
    document.addEventListener('click',e=>{if(nav&&!nav.hidden&&!header.contains(e.target))close();});
  }
  const year=$('#year');if(year)year.textContent=new Date().getFullYear();
  if(window.IntersectionObserver){document.documentElement.classList.add('js-ready');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08,rootMargin:'0px 0px -25px 0px'});$$('[data-reveal]').forEach(el=>observer.observe(el));}

  // Popular-dish slider: native scroll snapping is accessible on touch devices.
  const cards=$('#featured-cards');
  if(cards){
    const featured=dishes.filter(d=>d.featured).sort((a,b)=>a.featured-b.featured);
    cards.innerHTML=featured.map(d=>`<a class="food-card" href="menu.html" aria-label="View ${escapeHTML(d.name)} on the full menu"><div class="food-card-image"><img src="${escapeHTML(d.image)}" alt="${escapeHTML(d.name)}" width="810" height="700" loading="lazy"><span class="food-badge">${escapeHTML(d.badge||'Fresh favourite')}</span></div><div class="food-card-body"><h3>${escapeHTML(d.name)}</h3><span class="food-card-price">${money(d.price)}</span></div></a>`).join('');
    const move=direction=>cards.scrollBy({left:(cards.querySelector('.food-card')?.getBoundingClientRect().width||230)+17,behavior:'smooth'});
    $('#featured-prev')?.addEventListener('click',()=>cards.scrollBy({left:-((cards.querySelector('.food-card')?.getBoundingClientRect().width||230)+17),behavior:'smooth'}));
    $('#featured-next')?.addEventListener('click',()=>move(1));
  }

  // Generate a real QR code for the deployed menu URL, with no external service.
  const qrTarget=$('#qr-code');
  if(qrTarget){
    const menuURL=new URL('menu.html',window.location.href).href;
    function qrSVG(url){
      const qr=new window.RestaurantQRCode(0,1);
      qr.addData(url);qr.make();
      const cells=qr.getModuleCount(),margin=4,size=cells+margin*2;
      let squares='';
      for(let r=0;r<cells;r++)for(let c=0;c<cells;c++)if(qr.isDark(r,c))squares+=`<rect x="${c+margin}" y="${r+margin}" width="1" height="1"/>`;
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" role="img" aria-label="QR code to digital menu"><rect width="${size}" height="${size}" fill="#fff"/><g fill="#17120f">${squares}</g></svg>`;
    }
    try{qrTarget.innerHTML=qrSVG(menuURL);}catch(err){qrTarget.textContent='View digital menu';const btn=$('#download-qr');if(btn)btn.disabled=true;}
    const download=$('#download-qr');
    download?.addEventListener('click',()=>{
      const svg=$('#qr-code svg');if(!svg){toast('QR code is not available');return;}
      const data=new XMLSerializer().serializeToString(svg);
      const blob=new Blob([data],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),image=new Image();
      image.onload=()=>{const canvas=document.createElement('canvas');canvas.width=1000;canvas.height=1000;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,1000,1000);ctx.imageSmoothingEnabled=false;ctx.drawImage(image,0,0,1000,1000);URL.revokeObjectURL(url);const a=document.createElement('a');a.download='spice-garden-digital-menu-qr.png';a.href=canvas.toDataURL('image/png');a.click();toast('QR downloaded — ready for printing');};
      image.onerror=()=>{URL.revokeObjectURL(url);toast('Unable to download QR. Please try again.');};image.src=url;
    });
    const status=$('#qr-status');if(status&&location.protocol==='file:')status.textContent='Once published online, your QR code will point to the public menu URL.';
  }

  // Booking request: starts a WhatsApp conversation; does not promise availability.
  const booking=$('#reservation-form');
  if(booking){
    const date=$('#booking-date');const now=new Date();const localDate=new Date(now.getTime()-now.getTimezoneOffset()*60_000).toISOString().slice(0,10);if(date)date.min=localDate;
    booking.addEventListener('submit',e=>{
      e.preventDefault();if(!booking.reportValidity())return;
      const form=new FormData(booking);
      const preferred=String(form.get('date')||'');if(preferred<localDate){$('#booking-status').textContent='Please choose today or a future date.';return;}
      const message=`Hello! I would like to request a table at Spice Garden.\n\nName: ${form.get('name')}\nPhone: ${form.get('phone')}\nDate: ${preferred}\nTime: ${form.get('time')}\nParty size: ${form.get('guests')}\n\nPlease confirm availability. Thank you.`;
      const number=String(config.whatsappNumber||'').replace(/\D/g,'');
      if(!number){$('#booking-status').textContent='Please configure the restaurant WhatsApp number before taking enquiries.';return;}
      const link=`https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      window.open(link,'_blank','noopener,noreferrer');
      $('#booking-status').textContent='Your request is prepared in WhatsApp. Please tap Send to submit it; the table is not yet confirmed.';
      toast('WhatsApp reservation request prepared');
    });
  }

  // Photo gallery lightbox.
  const lightbox=$('#lightbox');if(lightbox){
    let previousFocus=null;
    const close=()=>{lightbox.hidden=true;document.body.classList.remove('locked');previousFocus?.focus();};
    $$('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>{previousFocus=b;$('#lightbox-image').src=b.dataset.lightbox;$('#lightbox-image').alt=b.querySelector('img')?.alt||'Restaurant photograph';lightbox.hidden=false;document.body.classList.add('locked');$('#close-lightbox').focus();}));
    $('#close-lightbox')?.addEventListener('click',close);
    lightbox.addEventListener('click',e=>{if(e.target===lightbox)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightbox.hidden)close();});
  }
})();
