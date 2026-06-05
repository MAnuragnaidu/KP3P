'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PatientWithUser } from '@/types/assessment-form';
import PatientDetailsView from '@/components/patient-detail/PatientDetailsView';
import PatientDetailsEditor from '@/components/patient-detail/PatientDetailsEditor';
import PatientDetailsActionBar from '@/components/patient-detail/PatientDetailsActionBar';

type Props = {
  patient: PatientWithUser;
};

export default function PatientDetailsShell({ patient }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [saveHandler, setSaveHandler] = useState<(() => Promise<void>) | null>(null);

  const handleSaved = useCallback(() => {
    setSavedAt(new Date());
    setEditing(false);
    router.refresh();
  }, [router]);

  const handleSaveReady = useCallback((save: () => Promise<void>, saving: boolean) => {
    setSaveHandler(() => save);
    setIsSaving(saving);
  }, []);

  return (
    <>
      <style>{`@media (max-width: 860px) { .pds-shell { padding-left: 16px !important; padding-right: 16px !important; } }`}</style>
    <div className="pds-shell" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px 80px' }}>
      <PatientDetailsActionBar
        mode={editing ? 'edit' : 'view'}
        patientId={patient.id}
        sticky={editing}
        onEdit={() => setEditing(true)}
        onSave={() => void saveHandler?.()}
        isSaving={isSaving}
        savedAt={savedAt}
      />

      {editing ? (
        <PatientDetailsEditor
          patient={patient}
          chromeless
          onSaveReady={handleSaveReady}
          onSaved={handleSaved}
        />
      ) : (
        <PatientDetailsView patient={patient} />
      )}

      <PatientDetailsActionBar
        mode={editing ? 'edit' : 'view'}
        patientId={patient.id}
        onEdit={() => setEditing(true)}
        onSave={() => void saveHandler?.()}
        isSaving={isSaving}
        savedAt={savedAt}
      />
    </div>
    </>
  );
}
