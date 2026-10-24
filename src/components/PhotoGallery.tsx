import { useEffect, useRef, useState } from 'react'

import type { Photo } from '../lib/content'

type PhotoGalleryProps = {
  photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!activePhoto) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null)
    }

    document.body.classList.add('dialog-open')
    window.addEventListener('keydown', closeOnEscape)
    closeButton.current?.focus()

    return () => {
      document.body.classList.remove('dialog-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [activePhoto])

  if (photos.length === 0) {
    return (
      <div className="photo-grid placeholder-grid" aria-hidden="true">
        {['01', '02', '03', '04', '05'].map((number, index) => (
          <div className={`photo-placeholder placeholder-${index + 1}`} key={number}>
            <span>{number}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="photo-grid">
        {photos.map((photo) => (
          <figure className={`photo-item ${photo.orientation ?? 'landscape'}`} key={photo.src}>
            <button type="button" onClick={() => setActivePhoto(photo)}>
              <img src={photo.src} alt={photo.alt ?? ''} loading="lazy" />
            </button>
            {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
          </figure>
        ))}
      </div>

      {activePhoto ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photograph">
          <button
            className="lightbox-backdrop"
            type="button"
            onClick={() => setActivePhoto(null)}
            aria-label="Close photograph"
          />
          <figure>
            <button
              className="lightbox-close"
              type="button"
              onClick={() => setActivePhoto(null)}
              ref={closeButton}
            >
              Close
            </button>
            <img src={activePhoto.src} alt={activePhoto.alt ?? ''} />
            {activePhoto.caption ? <figcaption>{activePhoto.caption}</figcaption> : null}
          </figure>
        </div>
      ) : null}
    </>
  )
}
