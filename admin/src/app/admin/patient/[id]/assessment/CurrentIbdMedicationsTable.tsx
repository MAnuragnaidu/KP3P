'use client';

import React from 'react';
import type { AssessmentFormState, AssessmentUpdateFn } from '@/types/assessment-form';
import {
  CURRENT_IBD_MEDICATION_CATALOG,
  CURRENTLY_TAKING_OPTIONS,
  REASON_FOR_STOPPING_OPTIONS,
  normalizeCurrentIbdMedications,
  parseCurrentIbdMedications,
  serializeCurrentIbdMedications,
  type CurrentIbdMedicationCatalogEntry,
  type CurrentIbdMedicationRow,
  type CurrentIbdMedicationsData,
  type MedicationPicklistField,
} from '@/lib/current-ibd-medications';

const inter = "'Inter', sans-serif";

const SECTION_HEADER = '#0e7490';

const headerCell: React.CSSProperties = {
  padding: '8px 6px',
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: '#ffffff',
  background: SECTION_HEADER,
  borderBottom: '1px solid #0c4a6e',
  textAlign: 'center',
  fontFamily: inter,
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
};

const labelCell = (alt: boolean): React.CSSProperties => ({
  padding: '6px 8px',
  fontSize: 11,
  fontWeight: 600,
  color: '#0f172a',
  background: alt ? '#f0fdfa' : '#ffffff',
  borderBottom: '1px solid #e2e8f0',
  borderRight: '1px solid #e2e8f0',
  fontFamily: inter,
  textAlign: 'left',
  verticalAlign: 'middle',
  lineHeight: 1.3,
});

const classCell = (alt: boolean): React.CSSProperties => ({
  ...labelCell(alt),
  fontSize: 10,
  fontWeight: 500,
  color: '#475569',
});

const valueCell: React.CSSProperties = {
  padding: '4px 5px',
  borderBottom: '1px solid #e2e8f0',
  borderRight: '1px solid #e2e8f0',
  verticalAlign: 'middle',
  background: '#ffffff',
};

const cellInputStyle: React.CSSProperties = {
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  padding: '6px 8px',
  fontSize: 12,
  lineHeight: 1.3,
  fontWeight: 500,
  fontFamily: inter,
  color: '#0f172a',
  background: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: 6,
  outline: 'none',
};

const cellSelectStyle: React.CSSProperties = {
  ...cellInputStyle,
  cursor: 'pointer',
};

type Props = {
  data: AssessmentFormState;
  updateData: AssessmentUpdateFn;
};

function readMedications(data: AssessmentFormState): CurrentIbdMedicationsData {
  return parseCurrentIbdMedications(
    (data as Record<string, unknown>).currentIbdMedicationsRows,
  );
}

function MedicationFieldInput({
  field,
  value,
  onChange,
  placeholder,
}: {
  field: MedicationPicklistField;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  if (field.mode === 'text') {
    return (
      <input
        type="text"
        style={cellInputStyle}
        value={value}
        placeholder={placeholder ?? 'Free text'}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => {
          e.target.style.borderColor = '#0891b2';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#cbd5e1';
        }}
      />
    );
  }

  return (
    <select
      style={cellSelectStyle}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">—</option>
      {field.options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function CurrentIbdMedicationsTable({ data, updateData }: Props) {
  const medications = readMedications(data);

  const persist = (next: CurrentIbdMedicationsData) => {
    updateData({
      currentIbdMedicationsRows: serializeCurrentIbdMedications(normalizeCurrentIbdMedications(next)),
    });
  };

  const updateRow = (drugId: string, patch: Partial<CurrentIbdMedicationRow>) => {
    const rows = medications.rows.map((row) =>
      row.drugId === drugId ? { ...row, ...patch } : row,
    );
    persist({ rows });
  };

  const rowById = Object.fromEntries(medications.rows.map((r) => [r.drugId, r]));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div
        style={{
          padding: '8px 12px',
          background: SECTION_HEADER,
          borderRadius: '8px 8px 0 0',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#ffffff',
            fontFamily: inter,
            lineHeight: 1.25,
          }}
        >
          CURRENT IBD MEDICATIONS
        </span>
      </div>

      <div
        style={{
          overflowX: 'auto',
          border: `1px solid ${SECTION_HEADER}`,
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1100 }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, minWidth: 160, textAlign: 'left' }}>DRUG NAME</th>
              <th style={{ ...headerCell, minWidth: 120, textAlign: 'left' }}>CLASS</th>
              <th style={{ ...headerCell, minWidth: 130 }}>CURRENTLY TAKING?</th>
              <th style={{ ...headerCell, minWidth: 88 }}>DOSE (mg)</th>
              <th style={{ ...headerCell, minWidth: 88 }}>DOSE UNIT</th>
              <th style={{ ...headerCell, minWidth: 140 }}>FREQUENCY</th>
              <th style={{ ...headerCell, minWidth: 120 }}>ROUTE</th>
              <th style={{ ...headerCell, minWidth: 120 }}>DURATION (free text)</th>
              <th style={{ ...headerCell, minWidth: 160 }}>REASON FOR STOPPING (if stopped)</th>
            </tr>
          </thead>
          <tbody>
            {CURRENT_IBD_MEDICATION_CATALOG.map((entry: CurrentIbdMedicationCatalogEntry, index) => {
              const row = rowById[entry.id];
              if (!row) return null;
              const alt = index % 2 === 1;

              return (
                <tr key={entry.id}>
                  <td style={labelCell(alt)}>
                    {entry.allowSpecify ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span>{entry.drugName}</span>
                        <input
                          type="text"
                          style={{ ...cellInputStyle, fontSize: 11 }}
                          value={row.otherSpecify ?? ''}
                          placeholder="Specify drug…"
                          onChange={(e) => updateRow(entry.id, { otherSpecify: e.target.value })}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0891b2';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#cbd5e1';
                          }}
                        />
                      </div>
                    ) : (
                      entry.drugName
                    )}
                  </td>
                  <td style={classCell(alt)}>{entry.drugClass}</td>
                  <td style={valueCell}>
                    <select
                      style={cellSelectStyle}
                      value={row.currentlyTaking}
                      onChange={(e) => updateRow(entry.id, { currentlyTaking: e.target.value })}
                    >
                      <option value="">—</option>
                      {CURRENTLY_TAKING_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={valueCell}>
                    <MedicationFieldInput
                      field={entry.doseMg}
                      value={row.doseMg}
                      onChange={(doseMg) => updateRow(entry.id, { doseMg })}
                    />
                  </td>
                  <td style={valueCell}>
                    <MedicationFieldInput
                      field={entry.doseUnit}
                      value={row.doseUnit}
                      onChange={(doseUnit) => updateRow(entry.id, { doseUnit })}
                    />
                  </td>
                  <td style={valueCell}>
                    <MedicationFieldInput
                      field={entry.frequency}
                      value={row.frequency}
                      onChange={(frequency) => updateRow(entry.id, { frequency })}
                    />
                  </td>
                  <td style={valueCell}>
                    <MedicationFieldInput
                      field={entry.route}
                      value={row.route}
                      onChange={(route) => updateRow(entry.id, { route })}
                    />
                  </td>
                  <td style={valueCell}>
                    <input
                      type="text"
                      style={cellInputStyle}
                      value={row.duration}
                      placeholder="Free text"
                      onChange={(e) => updateRow(entry.id, { duration: e.target.value })}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#0891b2';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#cbd5e1';
                      }}
                    />
                  </td>
                  <td style={valueCell}>
                    <select
                      style={cellSelectStyle}
                      value={row.reasonForStopping}
                      onChange={(e) => updateRow(entry.id, { reasonForStopping: e.target.value })}
                    >
                      <option value="">—</option>
                      {REASON_FOR_STOPPING_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
