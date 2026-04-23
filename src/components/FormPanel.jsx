import React from 'react'
import { LOKASI_OPTIONS, SKILLS_LIST, URGENSI_OPTIONS, DURASI_OPTIONS, BAHAYA_OPTIONS } from '../data/options'
import styles from './FormPanel.module.css'

export default function FormPanel({ data, onChange }) {
  function handleChange(field, value) {
    onChange({ ...data, [field]: value })
  }

  function toggleSkill(label) {
    const current = data.skills || []
    if (current.includes(label)) {
      handleChange('skills', current.filter(s => s !== label))
    } else {
      handleChange('skills', [...current, label])
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelIcon}>☠</span>
        <h2 className={styles.panelTitle}>Detail Kontrak</h2>
        <span className={styles.panelSub}>Isi semua kolom dengan hati-hati, mercenary.</span>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Nama Jabatan / Posisi</label>
        <input
          type="text"
          className={styles.input}
          placeholder="cth: Kepala Divisi Kekacauan"
          value={data.namaJabatan || ''}
          onChange={e => handleChange('namaJabatan', e.target.value)}
          maxLength={48}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Kode Nama / Alias</label>
        <input
          type="text"
          className={styles.input}
          placeholder="cth: SI MULUT MESIN"
          value={data.aliasKode || ''}
          onChange={e => handleChange('aliasKode', e.target.value)}
          maxLength={36}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.section}>
          <label className={styles.label}>Bayaran per Misi (Rp)</label>
          <input
            type="number"
            className={styles.input}
            placeholder="50000000"
            value={data.bayaran || ''}
            onChange={e => handleChange('bayaran', e.target.value)}
            min={0}
          />
        </div>
        <div className={styles.section}>
          <label className={styles.label}>Durasi Kontrak</label>
          <select
            className={styles.input}
            value={data.durasi || ''}
            onChange={e => handleChange('durasi', e.target.value)}
          >
            <option value="">-- Pilih --</option>
            {DURASI_OPTIONS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Lokasi Operasi</label>
        <select
          className={styles.input}
          value={data.lokasi || ''}
          onChange={e => handleChange('lokasi', e.target.value)}
        >
          <option value="">-- Pilih Lokasi --</option>
          {LOKASI_OPTIONS.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Tingkat Urgensi</label>
        <div className={styles.urgensiRow}>
          {URGENSI_OPTIONS.map(u => (
            <button
              key={u.value}
              className={`${styles.urgensiBtn} ${data.urgensi === u.value ? styles.urgensiActive : ''}`}
              style={data.urgensi === u.value ? { borderColor: u.color, color: u.color, background: `${u.color}18` } : {}}
              onClick={() => handleChange('urgensi', u.value)}
              type="button"
            >
              {u.label}
              <span className={styles.urgDesc}>{u.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Tingkat Bahaya</label>
        <div className={styles.bahayaRow}>
          {BAHAYA_OPTIONS.map(b => (
            <button
              key={b.value}
              className={`${styles.bahayaBtn} ${data.tingkatBahaya === b.value ? styles.bahayaActive : ''}`}
              style={data.tingkatBahaya === b.value ? { borderColor: b.color, color: b.color, background: `${b.color}22` } : {}}
              onClick={() => handleChange('tingkatBahaya', b.value)}
              type="button"
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>
          Keahlian yang Dibutuhkan
          <span className={styles.labelCount}>{(data.skills || []).length} / 10 dipilih</span>
        </label>
        <div className={styles.skillGrid}>
          {SKILLS_LIST.map(sk => {
            const active = (data.skills || []).includes(sk.label)
            return (
              <button
                key={sk.id}
                type="button"
                className={`${styles.skillBtn} ${active ? styles.skillActive : ''}`}
                onClick={() => toggleSkill(sk.label)}
                disabled={!active && (data.skills || []).length >= 10}
              >
                <span className={styles.skillDot} />
                {sk.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>
          Keterangan Tambahan
          <span className={styles.labelCount}>opsional</span>
        </label>
        <textarea
          className={styles.textarea}
          placeholder="Jelaskan detail misi, syarat khusus, atau hal absurd lainnya..."
          value={data.deskripsi || ''}
          onChange={e => handleChange('deskripsi', e.target.value)}
          rows={3}
          maxLength={180}
        />
      </div>
    </div>
  )
}