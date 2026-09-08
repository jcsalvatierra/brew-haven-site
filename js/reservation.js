document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('reservationForm');
  if (!form) return;

  const guestCountEl = document.getElementById('guestCount');
  const guestsInput = document.getElementById('guests');
  const minusBtn = document.getElementById('guestMinus');
  const plusBtn = document.getElementById('guestPlus');
  const statusEl = document.getElementById('formStatus');

  const MIN_GUESTS = 1;
  const MAX_GUESTS = 12;

  function setGuestCount(n) {
    n = Math.max(MIN_GUESTS, Math.min(MAX_GUESTS, n));
    guestCountEl.textContent = n;
    guestsInput.value = n;
  }

  minusBtn.addEventListener('click', function () {
    setGuestCount(parseInt(guestsInput.value, 10) - 1);
  });
  plusBtn.addEventListener('click', function () {
    setGuestCount(parseInt(guestsInput.value, 10) + 1);
  });

  // Prevent picking a date in the past
  const dateInput = document.getElementById('date');
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;

  function showError(fieldId, message) {
    const el = document.getElementById('err-' + fieldId);
    if (el) el.textContent = message || '';
  }

  function clearErrors() {
    form.querySelectorAll('.error-msg').forEach(function (el) { el.textContent = ''; });
    statusEl.className = 'form-status';
    statusEl.textContent = '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value) {
    const digits = value.replace(/[^0-9]/g, '');
    return digits.length >= 7;
  }

  function formatDate(isoDate) {
    const d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  function generateConfirmationCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'BH-';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = guestsInput.value;

    let hasError = false;

    if (!fullName) {
      showError('fullName', 'Please enter your full name.');
      hasError = true;
    }
    if (!email) {
      showError('email', 'Please enter your email address.');
      hasError = true;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      hasError = true;
    }
    if (!phone) {
      showError('phone', 'Please enter your phone number.');
      hasError = true;
    } else if (!isValidPhone(phone)) {
      showError('phone', 'Please enter a valid phone number.');
      hasError = true;
    }
    if (!date) {
      showError('date', 'Please choose a date.');
      hasError = true;
    }
    if (!time) {
      showError('time', 'Please choose a time.');
      hasError = true;
    }

    if (hasError) {
      statusEl.className = 'form-status error';
      statusEl.textContent = 'Please fix the highlighted fields and try again.';
      return;
    }

    // Success — build confirmation view
    document.getElementById('cName').textContent = fullName;
    document.getElementById('cDate').textContent = formatDate(date);
    document.getElementById('cTime').textContent = time;
    document.getElementById('cGuests').textContent = guests + (guests === '1' ? ' guest' : ' guests');
    document.getElementById('cCode').textContent = generateConfirmationCode();

    document.getElementById('bookingView').style.display = 'none';
    document.getElementById('confirmView').style.display = 'block';
    document.getElementById('confirmView').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
