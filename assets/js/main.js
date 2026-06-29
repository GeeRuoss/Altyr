/* ALTYR — comportements partagés : nav au scroll, menu mobile, reveal */
(function(){
  var nav=document.getElementById('nav');
  var toggle=document.getElementById('navToggle');
  var links=document.getElementById('navLinks');
  var isSub=document.body.classList.contains('page-sub');

  // Nav : fond blanc au scroll (uniquement sur la home, sous-pages déjà solides)
  if(nav && !isSub){
    var onScroll=function(){ nav.classList.toggle('scrolled', window.scrollY>40); };
    window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }

  // Menu mobile
  if(toggle && links){
    toggle.addEventListener('click',function(){
      var open=toggle.classList.toggle('open'); links.classList.toggle('open');
      if(nav) nav.classList.toggle('menu-open', open);
      document.body.style.overflow=open?'hidden':'';
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        toggle.classList.remove('open');links.classList.remove('open');
        if(nav) nav.classList.remove('menu-open');
        document.body.style.overflow='';
      });
    });
  }

  // Reveal au scroll
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
})();
