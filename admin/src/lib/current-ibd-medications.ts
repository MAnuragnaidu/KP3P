export type MedicationFieldMode = 'select' | 'text';

export type MedicationPicklistField = {
  mode: MedicationFieldMode;
  options: readonly string[];
};

export type CurrentIbdMedicationCatalogEntry = {
  id: string;
  drugName: string;
  drugClass: string;
  currentlyTaking: MedicationPicklistField;
  doseMg: MedicationPicklistField;
  doseUnit: MedicationPicklistField;
  frequency: MedicationPicklistField;
  route: MedicationPicklistField;
  /** When true, drug name cell allows free-text specify (Others row). */
  allowSpecify?: boolean;
};

export type CurrentIbdMedicationRow = {
  drugId: string;
  drugName: string;
  drugClass: string;
  currentlyTaking: string;
  doseMg: string;
  doseUnit: string;
  frequency: string;
  route: string;
  duration: string;
  reasonForStopping: string;
  otherSpecify?: string;
};

export type CurrentIbdMedicationsData = {
  rows: CurrentIbdMedicationRow[];
};

export const CURRENTLY_TAKING_OPTIONS = ['Yes', 'No', 'Stopped', 'Never used'] as const;

/** Same options as currently taking — used for Reason for stopping column. */
export const REASON_FOR_STOPPING_OPTIONS = CURRENTLY_TAKING_OPTIONS;

const STATUS_OPTIONS: MedicationPicklistField = {
  mode: 'select',
  options: CURRENTLY_TAKING_OPTIONS,
};

const freeTextField = (): MedicationPicklistField => ({ mode: 'text', options: [] });

const selectField = (options: readonly string[]): MedicationPicklistField => ({
  mode: 'select',
  options,
});

export const CURRENT_IBD_MEDICATION_CATALOG: readonly CurrentIbdMedicationCatalogEntry[] = [
  {
    id: 'mesalazine',
    drugName: 'Mesalazine (5-ASA)',
    drugClass: '5-ASA',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['500', '800', '1000', '1200', '1500', '2000', '2400', '3000', '4000', '4800']),
    doseUnit: selectField(['mg', 'g']),
    frequency: selectField([
      'Once daily',
      'Twice daily',
      'Three times daily',
      'Four times daily',
      'Once daily (rectal)',
      'Every other day',
    ]),
    route: selectField(['Oral', 'Rectal enema', 'Rectal suppository', 'Rectal foam']),
  },
  {
    id: 'sulphasalazine',
    drugName: 'Sulphasalazine',
    drugClass: '5-ASA',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['500', '1000', '1500', '2000', '2500', '3000', '4000']),
    doseUnit: selectField(['mg']),
    frequency: selectField(['Twice daily', 'Three times daily', 'Four times daily']),
    route: selectField(['Oral']),
  },
  {
    id: 'azathioprine',
    drugName: 'Azathioprine',
    drugClass: 'Thiopurine / IMM',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['25', '50', '75', '100', '125', '150', '175', '200', '225', '250']),
    doseUnit: selectField(['mg']),
    frequency: selectField(['Once daily', 'Twice daily']),
    route: selectField(['Oral']),
  },
  {
    id: 'prednisolone',
    drugName: 'Prednisolone',
    drugClass: 'Corticosteroid',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['5', '10', '20', '30', '40', '50', '60']),
    doseUnit: selectField(['mg']),
    frequency: selectField(['Once daily (morning)', 'Twice daily', 'Every other day', 'Tapering']),
    route: selectField(['Oral', 'IV', 'Rectal']),
  },
  {
    id: 'budesonide',
    drugName: 'Budesonide',
    drugClass: 'Corticosteroid',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['3', '6', '9']),
    doseUnit: selectField(['mg']),
    frequency: selectField(['Once daily (morning)', 'Twice daily', 'Every other day', 'Tapering']),
    route: selectField(['Oral', 'IV', 'Rectal']),
  },
  {
    id: 'hydrocortisone',
    drugName: 'Hydrocortisone',
    drugClass: 'Corticosteroid',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: freeTextField(),
    doseUnit: selectField(['mg']),
    frequency: selectField(['Once daily (morning)', 'Twice daily', 'Every other day', 'Tapering']),
    route: selectField(['IV', 'Rectal']),
  },
  {
    id: 'methotrexate',
    drugName: 'Methotrexate',
    drugClass: 'Immunomodulator',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['7.5', '10', '12.5', '15', '20', '25']),
    doseUnit: selectField(['mg']),
    frequency: selectField(['Once weekly']),
    route: selectField(['Oral', 'Subcutaneous', 'Intramuscular']),
  },
  {
    id: 'infliximab',
    drugName: 'Infliximab',
    drugClass: 'Anti-TNF Biologic',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['100', '200', '300', '400', '500', '600']),
    doseUnit: selectField(['mg']),
    frequency: selectField([
      'Week 0, 2, 6 (Induction)',
      'Every 8 weeks (maintenance)',
      'Every 6 weeks',
      'Every 4 weeks',
    ]),
    route: selectField(['IV infusion']),
  },
  {
    id: 'adalimumab',
    drugName: 'Adalimumab',
    drugClass: 'Anti-TNF Biologic',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['40', '80', '160']),
    doseUnit: selectField(['mg']),
    frequency: selectField(['Every 2 weeks', 'Weekly', 'Induction (160/80/40)']),
    route: selectField(['Subcutaneous']),
  },
  {
    id: 'vedolizumab',
    drugName: 'Vedolizumab',
    drugClass: 'Anti-Integrin Biologic',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['300']),
    doseUnit: selectField(['mg']),
    frequency: selectField([
      'Week 0, 2, 6 (Induction)',
      'Every 8 weeks (maintenance)',
      'Every 4 weeks',
    ]),
    route: selectField(['IV infusion', 'Subcutaneous 108mg']),
  },
  {
    id: 'ustekinumab',
    drugName: 'Ustekinumab',
    drugClass: 'Anti-IL-12/23 Biologic',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['130', '260', '390', '520']),
    doseUnit: selectField(['mg']),
    frequency: selectField([
      'Single IV induction',
      'Every 8 weeks SC (maintenance)',
      'Every 12 weeks SC',
    ]),
    route: selectField(['IV (induction)', 'Subcutaneous (maintenance)']),
  },
  {
    id: 'tofacitinib',
    drugName: 'Tofacitinib',
    drugClass: 'JAK inhibitor (small molecule)',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['5', '10']),
    doseUnit: selectField(['mg']),
    frequency: selectField(['Twice daily']),
    route: selectField(['Oral']),
  },
  {
    id: 'upadacitinib',
    drugName: 'Upadacitinib',
    drugClass: 'JAK inhibitor (small molecule)',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: selectField(['15', '30', '45']),
    doseUnit: selectField(['mg']),
    frequency: selectField(['Once daily']),
    route: selectField(['Oral']),
  },
  {
    id: 'vitaminDCalcium',
    drugName: 'Current Vitamin D / Calcium Supplementation',
    drugClass: '—',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: freeTextField(),
    doseUnit: freeTextField(),
    frequency: freeTextField(),
    route: freeTextField(),
  },
  {
    id: 'ironSupplements',
    drugName: 'IRON Supplements',
    drugClass: '—',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: freeTextField(),
    doseUnit: freeTextField(),
    frequency: freeTextField(),
    route: freeTextField(),
  },
  {
    id: 'others',
    drugName: 'Others (specify)',
    drugClass: '—',
    currentlyTaking: STATUS_OPTIONS,
    doseMg: freeTextField(),
    doseUnit: freeTextField(),
    frequency: freeTextField(),
    route: freeTextField(),
    allowSpecify: true,
  },
] as const;

export type CurrentIbdMedicationId = (typeof CURRENT_IBD_MEDICATION_CATALOG)[number]['id'];

const CATALOG_BY_ID = Object.fromEntries(
  CURRENT_IBD_MEDICATION_CATALOG.map((entry) => [entry.id, entry]),
) as Record<string, CurrentIbdMedicationCatalogEntry>;

export function defaultMedicationRow(entry: CurrentIbdMedicationCatalogEntry): CurrentIbdMedicationRow {
  return {
    drugId: entry.id,
    drugName: entry.drugName,
    drugClass: entry.drugClass,
    currentlyTaking: '',
    doseMg: '',
    doseUnit: '',
    frequency: '',
    route: '',
    duration: '',
    reasonForStopping: '',
    otherSpecify: entry.allowSpecify ? '' : undefined,
  };
}

export function defaultCurrentIbdMedications(): CurrentIbdMedicationsData {
  return {
    rows: CURRENT_IBD_MEDICATION_CATALOG.map(defaultMedicationRow),
  };
}

function normalizeRow(raw: unknown, entry?: CurrentIbdMedicationCatalogEntry): CurrentIbdMedicationRow | null {
  const r = raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const drugId =
    typeof r.drugId === 'string' && r.drugId
      ? r.drugId
      : typeof r.drugName === 'string'
        ? CURRENT_IBD_MEDICATION_CATALOG.find((e) => e.drugName === r.drugName)?.id
        : undefined;

  const catalogEntry = entry ?? (drugId ? CATALOG_BY_ID[drugId] : undefined);
  if (!catalogEntry) return null;

  const base = defaultMedicationRow(catalogEntry);
  const str = (key: keyof CurrentIbdMedicationRow) =>
    typeof r[key] === 'string' ? (r[key] as string) : r[key] == null ? '' : String(r[key]);

  return {
    ...base,
    currentlyTaking: str('currentlyTaking'),
    doseMg: str('doseMg'),
    doseUnit: str('doseUnit'),
    frequency: str('frequency'),
    route: str('route'),
    duration: str('duration'),
    reasonForStopping: str('reasonForStopping'),
    otherSpecify: catalogEntry.allowSpecify ? str('otherSpecify' as keyof CurrentIbdMedicationRow) : undefined,
  };
}

export function normalizeCurrentIbdMedications(data: CurrentIbdMedicationsData): CurrentIbdMedicationsData {
  const savedById = new Map<string, CurrentIbdMedicationRow>();
  for (const row of data.rows ?? []) {
    const id = row.drugId || CURRENT_IBD_MEDICATION_CATALOG.find((e) => e.drugName === row.drugName)?.id;
    if (id) savedById.set(id, row);
  }

  return {
    rows: CURRENT_IBD_MEDICATION_CATALOG.map((entry) => {
      const saved = savedById.get(entry.id);
      return normalizeRow(saved ?? defaultMedicationRow(entry), entry) ?? defaultMedicationRow(entry);
    }),
  };
}

export function parseCurrentIbdMedications(raw: unknown): CurrentIbdMedicationsData {
  if (raw == null || raw === '') {
    return defaultCurrentIbdMedications();
  }

  if (typeof raw === 'string') {
    const t = raw.trim();
    if (!t) return defaultCurrentIbdMedications();
    try {
      return parseCurrentIbdMedications(JSON.parse(t) as unknown);
    } catch {
      return defaultCurrentIbdMedications();
    }
  }

  if (Array.isArray(raw)) {
    return normalizeCurrentIbdMedications({ rows: raw.map((r) => normalizeRow(r)).filter(Boolean) as CurrentIbdMedicationRow[] });
  }

  if (typeof raw === 'object' && raw !== null && 'rows' in raw) {
    const rowsRaw = (raw as { rows?: unknown }).rows;
    if (Array.isArray(rowsRaw)) {
      return normalizeCurrentIbdMedications({
        rows: rowsRaw.map((r) => normalizeRow(r)).filter(Boolean) as CurrentIbdMedicationRow[],
      });
    }
  }

  return defaultCurrentIbdMedications();
}

export function serializeCurrentIbdMedications(data: CurrentIbdMedicationsData): string {
  return JSON.stringify(normalizeCurrentIbdMedications(data));
}

/** @deprecated Legacy dynamic rows — use defaultCurrentIbdMedications(). */
export function emptyMedicationRow(): CurrentIbdMedicationRow {
  return defaultMedicationRow(CURRENT_IBD_MEDICATION_CATALOG[0]);
}
