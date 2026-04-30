/**
 * BannerPress — app.js
 * Client-side image compression, resize, and WebP export.
 * Uses: HTML5 Canvas API (no external dependencies).
 */

'use strict';

// ─────────────────────────────────────────────
// DOM References
// ─────────────────────────────────────────────
const dropzone         = document.getElementById('dropzone');
const fileInput        = document.getElementById('file-input');
const settingsSection  = document.getElementById('settings-section');
const compressBtn      = document.getElementById('compress-btn');
const resultsSection   = document.getElementById('results-section');
const resultsGrid      = document.getElementById('results-grid');
const processingOverlay = document.getElementById('processing-overlay');
const resetBtn         = document.getElementById('reset-btn');
const qualitySlider    = document.getElementById('quality-slider');
const qualityValue     = document.getElementById('quality-value');
const adMid            = document.getElementById('ad-mid');
const footerYear       = document.getElementById('footer-year');

// ─────────────────────────────────────────────
// State
// ─────────────────────────────────────────────
let originalFile = null;
let originalImage = null;  // HTMLImageElement

// ─────────────────────────────────────────────
// Init
// ─────────────────────────────────────────────
footerYear.textContent = new Date().getFullYear();
updateSliderTrack();

// ─────────────────────────────────────────────
// Quality Slider
// ─────────────────────────────────────────────
qualitySlider.addEventListener('input', () => {
  qualityValue.textContent = qualitySlider.value;
  updateSliderTrack();
});

function updateSliderTrack() {
  const min = +qualitySlider.min;
  const max = +qualitySlider.max;
  const val = +qualitySlider.value;
  const pct = ((val - min) / (max - min)) * 100;
  qualitySlider.style.setProperty('--slider-pct', `${pct}%`);
}

// ─────────────────────────────────────────────
// Drag & Drop
// ─────────────────────────────────────────────
dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('is-hover');
});

['dragleave', 'dragend'].forEach(evt =>
  dropzone.addEventListener(evt, () => dropzone.classList.remove('is-hover'))
);

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('is-hover');
  const file = e.dataTransfer.files[0];
  if (file) handleFileSelection(file);
});

dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fileInput.click();
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) handleFileSelection(fileInput.files[0]);
});

// ─────────────────────────────────────────────
// File Selection & Validation
// ─────────────────────────────────────────────
function handleFileSelection(file) {
  if (!file.type.startsWith('image/')) {
    showToast('⚠️ Please upload a valid image file (JPG, PNG, GIF, WebP).', 'error');
    return;
  }

  const MAX_BYTES = 20 * 1024 * 1024; // 20 MB
  if (file.size > MAX_BYTES) {
    showToast('⚠️ File is too large. Maximum size is 20MB.', 'error');
    return;
  }

  originalFile = file;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      originalImage = img;
      revealSettings();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function revealSettings() {
  settingsSection.hidden = false;
  settingsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─────────────────────────────────────────────
// Compress Button
// ─────────────────────────────────────────────
compressBtn.addEventListener('click', async () => {
  if (!originalFile || !originalImage) return;

  const quality = +qualitySlider.value / 100;
  const resizeMode = document.querySelector('input[name="resize"]:checked').value;

  showProcessing(true);

  // Small delay so UI renders before heavy canvas work
  await sleep(80);

  try {
    const results = await buildResults(resizeMode, quality);
    renderResults(results);
    revealResults();
  } catch (err) {
    console.error('Compression error:', err);
    showToast('❌ Something went wrong during compression. Please try another image.', 'error');
  } finally {
    showProcessing(false);
  }
});

// ─────────────────────────────────────────────
// Core: Build compression results
// ─────────────────────────────────────────────
async function buildResults(resizeMode, quality) {
  const targets = getTargetWidths(resizeMode);
  return Promise.all(
    targets.map(({ label, width }) => compressImage(originalImage, width, quality, label))
  );
}

function getTargetWidths(mode) {
  if (mode === '2048') return [{ label: 'Desktop', width: 2048 }];
  if (mode === '1024') return [{ label: 'Mobile',  width: 1024 }];
  if (mode === 'both') return [
    { label: 'Desktop', width: 2048 },
    { label: 'Mobile',  width: 1024 },
  ];
}

/**
 * Compress and resize a single image to a target width.
 * Returns metadata + blob URL for download.
 */
function compressImage(img, targetWidth, quality, label) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx    = canvas.getContext('2d');

      // Compute new height preserving aspect ratio
      const scale  = Math.min(1, targetWidth / img.naturalWidth);
      const w      = Math.round(img.naturalWidth  * scale);
      const h      = Math.round(img.naturalHeight * scale);

      canvas.width  = w;
      canvas.height = h;

      // High-quality rendering
      ctx.imageSmoothingEnabled  = true;
      ctx.imageSmoothingQuality  = 'high';
      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
          const url = URL.createObjectURL(blob);
          resolve({
            label,
            width: w,
            height: h,
            originalSize: originalFile.size,
            compressedSize: blob.size,
            blob,
            url,
            filename: buildFilename(originalFile.name, label, w),
          });
        },
        'image/webp',
        quality
      );
    } catch (err) {
      reject(err);
    }
  });
}

function buildFilename(originalName, label, width) {
  const base = originalName.replace(/\.[^.]+$/, '').replace(/\s+/g, '-').toLowerCase();
  return `${base}-${label.toLowerCase()}-${width}px.webp`;
}

// ─────────────────────────────────────────────
// Render Results
// ─────────────────────────────────────────────
function renderResults(results) {
  resultsGrid.innerHTML = '';

  results.forEach((r) => {
    const saving     = ((1 - r.compressedSize / r.originalSize) * 100).toFixed(1);
    const savingSign = saving > 0 ? `↓ ${saving}% smaller` : `↑ ${Math.abs(saving)}% larger`;
    const savingClass = saving > 0 ? 'stat-pill--saving' : 'stat-pill--before';

    const item = document.createElement('div');
    item.className = 'result-item';
    item.innerHTML = `
      <img
        class="result-preview"
        src="${r.url}"
        alt="Compressed ${r.label} banner preview — ${r.width}×${r.height}px WebP"
        loading="lazy"
        width="${r.width}"
        height="${r.height}"
      />
      <div class="result-info">
        <div class="result-label">${r.label} Version</div>
        <div class="result-name">${r.filename}</div>
        <div class="result-stats">
          <span class="stat-pill stat-pill--before">
            Before: ${formatBytes(r.originalSize)}
          </span>
          <span class="stat-pill stat-pill--after">
            After: ${formatBytes(r.compressedSize)}
          </span>
          <span class="stat-pill ${savingClass}">
            ${savingSign}
          </span>
        </div>
        <div class="stat-dimensions">
          Dimensions: ${r.width} × ${r.height}px · Format: WebP
        </div>
        <a
          class="btn btn--success"
          href="${r.url}"
          download="${r.filename}"
          id="download-${r.label.toLowerCase()}"
          aria-label="Download ${r.label} compressed banner"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1v8M5 6l3 3 3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12v1.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          Download ${r.label} WebP
        </a>
      </div>
    `;
    resultsGrid.appendChild(item);
  });
}

function revealResults() {
  adMid.hidden = false;
  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─────────────────────────────────────────────
// Reset
// ─────────────────────────────────────────────
resetBtn.addEventListener('click', () => {
  // Revoke all object URLs to free memory
  resultsGrid.querySelectorAll('img').forEach((img) => {
    URL.revokeObjectURL(img.src);
  });

  // Reset state
  originalFile  = null;
  originalImage = null;
  fileInput.value = '';

  // Hide sections
  settingsSection.hidden = true;
  resultsSection.hidden  = true;
  adMid.hidden           = true;

  // Scroll back to top of dropzone
  dropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// ─────────────────────────────────────────────
// Processing Overlay
// ─────────────────────────────────────────────
function showProcessing(visible) {
  processingOverlay.hidden = !visible;
  compressBtn.disabled     = visible;
}

// ─────────────────────────────────────────────
// Toast Notification
// ─────────────────────────────────────────────
function showToast(message, type = 'info') {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.textContent = message;

  // Inline toast styles (keeps CSS clean)
  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '24px',
    left:         '50%',
    transform:    'translateX(-50%)',
    background:   type === 'error' ? '#fef2f2' : '#f0fdf4',
    color:        type === 'error' ? '#991b1b' : '#166534',
    border:       `1px solid ${type === 'error' ? '#fca5a5' : '#bbf7d0'}`,
    padding:      '12px 24px',
    borderRadius: '12px',
    fontWeight:   '600',
    fontSize:     '0.9rem',
    boxShadow:    '0 8px 24px rgba(0,0,0,.12)',
    zIndex:       '999',
    animation:    'toastIn 0.3s ease both',
    maxWidth:     '90vw',
    textAlign:    'center',
  });

  // Inject keyframes once
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      @keyframes toastIn {
        from { opacity: 0; transform: translateX(-50%) translateY(12px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes < 1024)       return `${bytes} B`;
  if (bytes < 1024 ** 2)  return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
