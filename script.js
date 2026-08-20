  // Header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Mobile nav toggle
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  burger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  // Bike filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const bikeCards = document.querySelectorAll('.bike-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      bikeCards.forEach(card => {
        card.style.display = (f === 'all' || card.dataset.brand === f) ? '' : 'none';
      });
    });
  });

  // EMI calculator
  const priceRange = document.getElementById('priceRange');
  const downRange = document.getElementById('downRange');
  const tenureRange = document.getElementById('tenureRange');
  const rateRange = document.getElementById('rateRange');

  function fmt(n){ return 'LKR ' + Math.round(n).toLocaleString('en-US'); }

  function calcEMI(){
    const price = +priceRange.value;
    const downPct = +downRange.value;
    const months = +tenureRange.value;
    const annualRate = +rateRange.value;

    const down = price * (downPct/100);
    const loan = price - down;
    const monthlyRate = annualRate / 100 / 12;
    let emi;
    if(monthlyRate === 0){
      emi = loan / months;
    } else {
      emi = loan * monthlyRate * Math.pow(1+monthlyRate, months) / (Math.pow(1+monthlyRate, months) - 1);
    }
    const totalPaid = emi * months;
    const totalInterest = totalPaid - loan;

    document.getElementById('priceVal').textContent = price.toLocaleString('en-US');
    document.getElementById('downVal').textContent = downPct + '%';
    document.getElementById('tenureVal').textContent = months + ' months';
    document.getElementById('rateVal').textContent = annualRate + '%';
    document.getElementById('emiAmount').textContent = fmt(emi);
    document.getElementById('breakdownDown').textContent = fmt(down);
    document.getElementById('breakdownLoan').textContent = fmt(loan);
    document.getElementById('breakdownInterest').textContent = fmt(totalInterest);
  }
  [priceRange, downRange, tenureRange, rateRange].forEach(el => el.addEventListener('input', calcEMI));
  calcEMI();

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12});
  revealEls.forEach(el => io.observe(el));
