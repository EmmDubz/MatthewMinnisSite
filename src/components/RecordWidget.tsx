import { useState } from 'react'

import collection from '../generated/discogs.json'

type Record = (typeof collection.records)[number]

function randomIndex(length: number, previous = -1) {
  if (length < 2) return 0

  let next = Math.floor(Math.random() * length)
  while (next === previous) next = Math.floor(Math.random() * length)
  return next
}

export function RecordWidget() {
  const records = collection.records as Record[]
  const [index, setIndex] = useState(() => randomIndex(records.length))
  const record = records[index]

  if (!record) return null

  return (
    <section className="record-section" aria-labelledby="record-heading">
      <div className="section-kicker">
        <span>Collection / {records.length}</span>
        <button type="button" onClick={() => setIndex(randomIndex(records.length, index))}>
          Spin another
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="M15.7 6.1A7 7 0 1 0 17 10M15.7 6.1V2.5m0 3.6h-3.6" />
          </svg>
        </button>
      </div>

      <div className="record-card">
        <a
          className="record-art"
          href={record.discogsUrl}
          rel="noreferrer"
          target="_blank"
          aria-label={`${record.title} on Discogs`}
        >
          {record.cover ? (
            <img src={record.cover} alt={`${record.title} cover`} loading="lazy" />
          ) : (
            <span aria-hidden="true">33⅓</span>
          )}
        </a>

        <div className="record-copy">
          <p className="eyebrow" id="record-heading">
            Currently spinning
          </p>
          <h2>{record.title}</h2>
          <p>{record.artist}</p>
          {record.year ? <p className="record-year">{record.year}</p> : null}
          <a href={record.discogsUrl} rel="noreferrer" target="_blank">
            View on Discogs
            <svg aria-hidden="true" viewBox="0 0 16 16">
              <path d="M3 13 13 3m0 0H5m8 0v8" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
