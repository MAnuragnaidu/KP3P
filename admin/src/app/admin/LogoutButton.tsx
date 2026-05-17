'use client';

import { useState } from 'react';
import { performLogout } from '@/lib/logout-client';

export default function LogoutButton() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setError('');
    setLoading(true);
    const result = await performLogout();
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .logout-btn {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 8px 16px;
          min-height: 44px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .logout-btn:hover:not(:disabled) {
          color: #b91c1c;
          border-color: #fecaca;
          background: #fff1f2;
        }
        .logout-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .logout-error {
          font-size: 12px;
          color: #b91c1c;
          margin-top: 4px;
          max-width: 200px;
          text-align: right;
        }
        .logout-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
      `}</style>
      <div className="logout-wrap">
        <button className="logout-btn" onClick={handleLogout} disabled={loading} type="button">
          {loading ? 'Logging out…' : 'Log out'}
        </button>
        {error ? (
          <p className="logout-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </>
  );
}
