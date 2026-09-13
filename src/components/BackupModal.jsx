import React, { useState } from 'react';
import { Key, Copy, Check, Download, Upload, X, ShieldCheck, AlertCircle } from 'lucide-react';
import { generateBackupCode, restoreFromBackupCode } from '../utils/storage';

export default function BackupModal({ onClose, onStateRestored }) {
  const [activeTab, setActiveTab] = useState('export');
  const [backupCode] = useState(generateBackupCode());
  const [copied, setCopied] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [importStatus, setImportStatus] = useState(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(backupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (!importCode.trim()) return;
    const result = restoreFromBackupCode(importCode);
    if (result.success) {
      setImportStatus({ success: true, message: 'Progress successfully restored!' });
      setTimeout(() => { onStateRestored(result.state); onClose(); }, 1500);
    } else {
      setImportStatus({ success: false, message: 'Invalid backup code. Please check and try again.' });
    }
  };

  const tabBtn = (id, label, Icon) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        flex: 1,
        padding: '10px',
        borderRadius: '8px',
        border: 'none',
        background: activeTab === id
          ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
          : 'transparent',
        color: activeTab === id ? '#fff' : 'var(--text-muted)',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease'
      }}
    >
      <Icon size={15} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="modal-overlay">
      <div className="glass-card animate-fade-in" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '32px',
        borderRadius: '24px',
        position: 'relative'
      }}>

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '18px', right: '18px',
          background: 'none', border: 'none',
          color: 'var(--text-muted)', cursor: 'pointer'
        }}>
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Key size={22} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Backup &amp; Restore Progress
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-success)', fontWeight: 600 }}>
              100% Free · No Account Required
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-card)',
          padding: '4px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid var(--border-glass)'
        }}>
          {tabBtn('export', 'Export Code', Download)}
          {tabBtn('import', 'Restore Code', Upload)}
        </div>

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: 1.6 }}>
              Copy this Backup Code and save it somewhere safe. Paste it into the "Restore Code" tab to recover all your stars and unlocked levels on any device.
            </p>
            <div style={{
              background: 'var(--bg-input)',
              border: '1px dashed rgba(168,85,247,0.45)',
              padding: '14px',
              borderRadius: '12px',
              marginBottom: '16px',
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              fontSize: '0.78rem',
              maxHeight: '110px',
              overflowY: 'auto',
              color: 'var(--accent-secondary)'
            }}>
              {backupCode}
            </div>
            <button onClick={handleCopyCode} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {copied ? <Check size={17} /> : <Copy size={17} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Backup Code'}</span>
            </button>
          </div>
        )}

        {/* Import Tab */}
        {activeTab === 'import' && (
          <form onSubmit={handleImportSubmit}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: 1.6 }}>
              Paste your previously saved Backup Code below to restore all your unlocked levels and stars.
            </p>
            <textarea
              rows={3}
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              placeholder="Paste your IG-Backup code here…"
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-main)',
                padding: '12px',
                borderRadius: '12px',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                marginBottom: '16px',
                resize: 'none',
                outline: 'none'
              }}
            />
            {importStatus && (
              <div style={{
                padding: '10px 14px', borderRadius: '8px', marginBottom: '16px',
                fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px',
                background: importStatus.success ? 'rgba(16,185,129,0.14)' : 'rgba(239,68,68,0.14)',
                color: importStatus.success ? 'var(--accent-success)' : 'var(--accent-danger)'
              }}>
                {importStatus.success ? <ShieldCheck size={17} /> : <AlertCircle size={17} />}
                <span>{importStatus.message}</span>
              </div>
            )}
            <button type="submit" className="btn-success" style={{ width: '100%', justifyContent: 'center' }}>
              <Upload size={17} />
              <span>Restore My Progress</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
