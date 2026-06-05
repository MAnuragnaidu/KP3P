import React from 'react';

export function patientContactEmail(p: { user: { email: string } | null; email?: string | null }): string {
  const fromUser = p.user?.email?.trim();
  const fromRecord = typeof p.email === 'string' ? p.email.trim() : '';
  return fromUser || fromRecord || 'N/A';
}

type VaccineDoseRow = { date?: string; dosage?: string };

export function renderVaccineCard(name: string, dataStr: string) {
  let status = 'unknown';
  let doses: VaccineDoseRow[] = [];
  try {
    if (dataStr) {
      const parsed = JSON.parse(dataStr);
      if (typeof parsed === 'object') {
        status = parsed.status || 'unknown';
        doses = Array.isArray(parsed.doses)
          ? (parsed.doses as unknown[]).filter(
              (x): x is VaccineDoseRow => x !== null && typeof x === 'object' && !Array.isArray(x),
            )
          : [];
      } else {
        status = dataStr;
      }
    }
  } catch {
    status = dataStr || 'unknown';
  }

  let badgeColor = '#94a3b8';
  let badgeBg = 'rgba(148,163,184,0.12)';
  let displayStatus = status.charAt(0).toUpperCase() + status.slice(1);
  const sLower = status.toLowerCase();
  if (sLower === 'given' || sLower === 'completed') {
    badgeColor = '#16a34a';
    badgeBg = 'rgba(22,163,74,0.1)';
    displayStatus = 'Completed';
  } else if (sLower === 'pending') {
    badgeColor = '#d97706';
    badgeBg = 'rgba(217,119,6,0.1)';
    displayStatus = 'Pending';
  } else if (sLower === 'never' || sLower === 'not taken' || sLower === 'unknown') {
    badgeColor = '#dc2626';
    badgeBg = 'rgba(220,38,38,0.1)';
    displayStatus = sLower === 'unknown' ? 'Unknown' : 'Not Taken';
  }

  return (
    <div
      key={name}
      style={{
        background: '#f8fafc',
        border: '0.5px solid #e2e8f0',
        borderRadius: 10,
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>{name}</span>
        <span
          style={{
            background: badgeBg,
            color: badgeColor,
            padding: '3px 9px',
            borderRadius: 100,
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}
        >
          {displayStatus}
        </span>
      </div>
      {doses.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {doses.map((d, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: '#f1f5f9',
                padding: '6px 10px',
                borderRadius: 6,
                fontSize: 11.5,
                color: '#475569',
              }}
            >
              <span>
                Dose {i + 1}: <span style={{ color: '#94a3b8' }}>{d.date || 'N/A'}</span>
              </span>
              {d.dosage && <span style={{ color: '#0891b2' }}>{d.dosage}</span>}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>No doses recorded</div>
      )}
    </div>
  );
}

export const patientDetailsViewStyles = `
  .pr-body {
    display: grid; grid-template-columns: 1fr 200px; gap: 14px; align-items: start;
  }
  @media (max-width: 860px) {
    .pr-body { grid-template-columns: 1fr; }
  }
  .pr-card { background: #fff; border: 0.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 10px; }
  .pr-card-head { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #f8fafc; border-bottom: 0.5px solid #e2e8f0; }
  .pr-card-icon { width: 25px; height: 25px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
  .pr-card-title { font-size: 10px; font-weight: 700; color: #374151; letter-spacing: 0.07em; text-transform: uppercase; flex: 1; }
  .pr-card-num { font-size: 10px; color: #cbd5e1; font-family: 'IBM Plex Mono', monospace; }
  .pr-field-grid { display: grid; grid-template-columns: 1fr 1fr; padding: 4px 8px 8px; }
  @media (max-width: 540px) { .pr-field-grid { grid-template-columns: 1fr; } }
  .pr-field-section { grid-column: 1 / -1; margin: 4px 8px 8px; padding: 12px 14px; border: 0.5px solid #e2e8f0; border-radius: 10px; background: #f8fafc; }
  .pr-field-section-title { font-size: 10px; font-weight: 700; color: #475569; letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 8px; padding: 0 8px; }
  .pr-field-section .pr-field-grid { padding: 0; }
  .pr-field { padding: 7px 8px; border-radius: 7px; transition: background 0.15s; }
  .pr-field:hover { background: #f8fafc; }
  .pr-field-label { font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 3px; }
  .pr-field-value { font-size: 12.5px; color: #0f172a; line-height: 1.4; word-break: break-word; }
  .pr-field-value.empty { color: #cbd5e1; font-style: italic; }
  .pr-tag-list { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 2px; }
  .pr-tag { background: rgba(59,130,246,0.08); border: 0.5px solid rgba(59,130,246,0.2); color: #3b82f6; font-size: 11px; padding: 2px 8px; border-radius: 5px; }
  .pr-serology-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; padding: 10px 12px 12px; }
  .pr-serology-pill { background: #f8fafc; border: 0.5px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; }
  .pr-serology-label { font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 4px; }
  .pr-serology-value { font-size: 12px; font-weight: 600; }
  .pr-vaccine-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; padding: 12px; }
  @media (max-width: 380px) { .pr-vaccine-grid { grid-template-columns: 1fr; } }
  .pr-status-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .pr-status-dot { width: 6px; height: 6px; border-radius: 50%; }
  .pr-sidebar-card { background: #fff; border: 0.5px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 8px; }
  .pr-sidebar-head { padding: 9px 12px; background: #f8fafc; border-bottom: 0.5px solid #e2e8f0; font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; }
  .pr-sidebar-big { padding: 14px; text-align: center; }
  .pr-sidebar-big-val { font-size: 20px; font-weight: 700; margin-bottom: 3px; }
  .pr-sidebar-big-label { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }
  .pr-srow { display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; border-bottom: 0.5px solid #f8fafc; }
  .pr-srow:last-child { border-bottom: none; }
  .pr-srow-label { font-size: 11px; color: #64748b; }
  .pr-srow-val { font-size: 11px; color: #94a3b8; font-weight: 500; font-family: 'IBM Plex Mono', monospace; }
  .pr-infection-row { display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; border-bottom: 0.5px solid #f8fafc; }
  .pr-infection-row:last-child { border-bottom: none; }
`;
