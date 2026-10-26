import { useEffect, useState } from 'react'

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
  const [index, setIndex] = useState(0)
  const record = records[index]

  useEffect(() => {
    const timeout = window.setTimeout(() => setIndex(randomIndex(records.length)))
    return () => window.clearTimeout(timeout)
  }, [records.length])

  if (!record) return null

  return (
    <section className="record-section" aria-labelledby="record-heading">
      <div className="section-kicker">
        <span>My collection</span>
        <button type="button" onClick={() => setIndex(randomIndex(records.length, index))}>
          Spin another
          <svg aria-hidden="true" viewBox="0 0 20 20">
            <path d="M15.7 6.1A7 7 0 1 0 17 10M15.7 6.1V2.5m0 3.6h-3.6" />
          </svg>
        </button>
      </div>

      <div className="record-card">
        <div className="record-art">
          {record.cover ? (
            <img src={record.cover} alt={`${record.title} cover`} loading="lazy" />
          ) : (
            <span aria-hidden="true">33⅓</span>
          )}
        </div>

        <div className="record-copy">
          <p className="eyebrow" id="record-heading">
            Currently spinning
          </p>
          <h2 title={record.title}>{record.title}</h2>
          <p>{record.artist}</p>
          {record.year ? <p className="record-year">{record.year}</p> : null}
        </div>
      </div>
    </section>
  )
}
