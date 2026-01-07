async function loadData() {
  try {
    const res = await fetch('./data/data.json', { cache: 'no-store' });
    const data = await res.json();

    const { currency, goal, raised, lastUpdated, bank } = data;
    const pct = Math.min(100, Math.round((raised / goal) * 100));

    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('raised-label').textContent = `Raised: ₹${raised.toLocaleString('en-IN')} ${currency}`;
    document.getElementById('goal-label').textContent = `Goal: ₹${goal.toLocaleString('en-IN')} ${currency}`;
    document.getElementById('percent-label').textContent = `${pct}% reached`;
    document.getElementById('updated-label').textContent = `Last updated: ${lastUpdated}`;
    document.getElementById('upi').textContent = bank.upi;

    document.getElementById('copy-upi').addEventListener('click', () => {
      navigator.clipboard.writeText(bank.upi).then(() => {
        const btn = document.getElementById('copy-upi');
        btn.textContent = 'UPI copied!';
        setTimeout(() => (btn.textContent = 'Copy UPI'), 1200);
      });
    });
  } catch (e) {
    console.error('Failed to load data.json', e);
  }
}
loadData();
