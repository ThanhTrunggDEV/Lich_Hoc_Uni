export function fetchAndShowQuote() {
  const quoteDiv = document.getElementById('quote');
  const defaultQuote = {
    quote: 'Tôi là bò sáng phải rống, bạn là người sống phải ráng.',
    author: 'Ẩn danh'
  };
  fetch('https://api.nguyenthanhtrung.online/random_quote')
    .then(res => res.json())
    .then(data => {
      const quote = data && data.quote ? data.quote : defaultQuote.quote;
      const author = data && data.author ? data.author : defaultQuote.author;
      quoteDiv.innerHTML = `
        <div class="quote-box">
          <span class="quote-icon"><i></i></span>
          <span class="quote-content">❝ ${quote} ❞</span>
          <span class="quote-author">— ${author}</span>
        </div>
      `;
    })
    .catch(() => {
      quoteDiv.innerHTML = `
        <div class="quote-box">
          <span class="quote-icon"><i class="fas fa-quote-left"></i></span>
          <span class="quote-content">❝ ${defaultQuote.quote} ❞</span>
          <span class="quote-author">— ${defaultQuote.author}</span>
        </div>
      `;
    });
}
