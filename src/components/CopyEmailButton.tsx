import { useState } from 'react'

function emailAddress() {
  const user = String.fromCharCode(109, 97, 116, 116, 104, 101, 119, 46, 109, 105, 110, 110, 105, 115, 48, 51)
  const host = String.fromCharCode(103, 109, 97, 105, 108, 46, 99, 111, 109)
  return `${user}@${host}`
}

export function CopyEmailButton({ className = '' }: { className?: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copyEmail() {
    const address = emailAddress()

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address)
      } else {
        const input = document.createElement('textarea')
        input.value = address
        input.setAttribute('readonly', '')
        input.style.position = 'fixed'
        input.style.opacity = '0'
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        input.remove()
      }

      setStatus('copied')
      window.setTimeout(() => setStatus('idle'), 2200)
    } catch {
      setStatus('failed')
    }
  }

  return (
    <button
      className={`copy-email-button ${className}`.trim()}
      type="button"
      onClick={copyEmail}
      aria-label="Copy email address"
    >
      <span>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Email'}</span>
      <svg aria-hidden="true" viewBox="0 0 16 16">
        {status === 'copied' ? (
          <path d="m3 8 3 3 7-7" />
        ) : (
          <path d="M5 5V3.5A1.5 1.5 0 0 1 6.5 2h6A1.5 1.5 0 0 1 14 3.5v6a1.5 1.5 0 0 1-1.5 1.5H11M3.5 5h6A1.5 1.5 0 0 1 11 6.5v6A1.5 1.5 0 0 1 9.5 14h-6A1.5 1.5 0 0 1 2 12.5v-6A1.5 1.5 0 0 1 3.5 5Z" />
        )}
      </svg>
    </button>
  )
}
