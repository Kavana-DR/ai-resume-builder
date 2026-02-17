import React, { useMemo, useState } from 'react'

const steps = [
  '01-problem',
  '02-market',
  '03-architecture',
  '04-hld',
  '05-lld',
  '06-build',
  '07-test',
  '08-ship',
]

function storageKey(n) { return `rb_step_${n}_artifact` }

export default function ProofPage() {
  const statuses = useMemo(() => {
    return steps.map((s, i) => {
      const key = storageKey(i + 1)
      return { step: i + 1, done: !!localStorage.getItem(key) }
    })
  }, [])

  const [lovable, setLovable] = useState('')
  const [github, setGithub] = useState('')
  const [deploy, setDeploy] = useState('')

  function copyFinal() {
    const summary = [
      `AI Resume Builder — Build Track Final Submission`,
      `Lovable: ${lovable}`,
      `GitHub: ${github}`,
      `Deploy: ${deploy}`,
      `Steps:`,
      ...statuses.map(s => `Step ${s.step}: ${s.done ? 'Done' : 'Missing'}`),
    ].join('\n')
    navigator.clipboard.writeText(summary)
      .then(() => alert('Final submission copied to clipboard'))
  }

  return (
    <div>
      <h2>Proof / Final Submission</h2>

      <section>
        <h4>Steps status</h4>
        <ul>
          {statuses.map(s => (
            <li key={s.step}>Step {s.step}: {s.done ? 'Done' : 'Missing'}</li>
          ))}
        </ul>
      </section>

      <section>
        <label htmlFor="lovable-link">Lovable link</label>
        <input id="lovable-link" value={lovable} onChange={e => setLovable(e.target.value)} style={{ width: '100%' }} aria-label="Lovable link" />

        <label htmlFor="github-link">GitHub link</label>
        <input id="github-link" value={github} onChange={e => setGithub(e.target.value)} style={{ width: '100%' }} aria-label="GitHub link" />

        <label htmlFor="deploy-link">Deploy link</label>
        <input id="deploy-link" value={deploy} onChange={e => setDeploy(e.target.value)} style={{ width: '100%' }} aria-label="Deploy link" />

        <div style={{ marginTop: 12 }}>
          <button type="button" className="btn primary" onClick={copyFinal}>Copy Final Submission</button>
        </div>
      </section>
    </div>
  )
}
