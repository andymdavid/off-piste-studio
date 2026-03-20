// Clipboard and export utilities for tools

/**
 * Copy text to clipboard and briefly update button text.
 */
export async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    if (button) {
      const original = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('is-copied');
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove('is-copied');
      }, 1500);
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Download a text string as a file.
 */
export function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
