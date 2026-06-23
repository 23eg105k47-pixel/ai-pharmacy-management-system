import { useState, useRef } from 'react';
import { recognizeMedicine } from '../../api/aiApi';

const MedicineRecognition = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleRecognize = async () => {
    setLoading(true);
    try {
      const res = await recognizeMedicine(image);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h4><i className="bi bi-robot me-2" style={{ color: 'var(--primary-light)' }}></i>AI Medicine Recognition</h4>
        <p>Upload a medicine image to identify it using AI-powered recognition</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="content-card">
            <div className="content-card-header">
              <h6><i className="bi bi-cloud-arrow-up me-2"></i>Upload Image</h6>
            </div>
            <div className="content-card-body">
              {!preview ? (
                <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                  <i className="bi bi-image d-block"></i>
                  <h6 style={{ color: 'var(--text-primary)' }}>Click to upload image</h6>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Supports JPG, PNG, WEBP (Max 5MB)</p>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="d-none" />
                </div>
              ) : (
                <div className="text-center">
                  <img src={preview} alt="Preview" className="img-preview mb-3" />
                  <div className="d-flex gap-2 justify-content-center">
                    <button className="btn-primary-custom" onClick={handleRecognize} disabled={loading}>
                      {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Analyzing...</> : <><i className="bi bi-cpu"></i> Recognize Medicine</>}
                    </button>
                    <button className="btn-outline-custom" onClick={handleReset}>
                      <i className="bi bi-arrow-counterclockwise"></i> Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="content-card h-100">
            <div className="content-card-header">
              <h6><i className="bi bi-stars me-2"></i>Recognition Result</h6>
            </div>
            <div className="content-card-body">
              {!result && !loading ? (
                <div className="text-center py-5">
                  <i className="bi bi-robot d-block" style={{ fontSize: '3rem', color: 'var(--text-muted)', opacity: 0.3 }}></i>
                  <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>Upload and analyze an image to see results</p>
                </div>
              ) : loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border" style={{ color: 'var(--primary)', width: '3rem', height: '3rem' }}></div>
                  <p className="mt-3" style={{ color: 'var(--text-muted)' }}>AI is analyzing the medicine...</p>
                </div>
              ) : result && (
                <div className="ai-result-card">
                  <div className="result-header">
                    <i className="bi bi-check-circle-fill"></i>
                    <div>
                      <h6>{result.name}</h6>
                      <small style={{ color: 'var(--text-muted)' }}>Confidence: <strong style={{ color: 'var(--success)' }}>{result.confidence}%</strong></small>
                    </div>
                  </div>
                  <div className="row g-3 mb-3">
                    {[
                      ['Manufacturer', result.manufacturer],
                      ['Category', result.category],
                      ['Dosage Form', result.dosageForm],
                      ['Strength', result.strength]
                    ].map(([label, val]) => (
                      <div className="col-6" key={label}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Common Uses</div>
                    <div className="d-flex flex-wrap gap-1">
                      {result.uses.map((use, i) => (
                        <span key={i} className="badge-custom badge-success">{use}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Side Effects</div>
                    <div className="d-flex flex-wrap gap-1">
                      {result.sideEffects.map((se, i) => (
                        <span key={i} className="badge-custom badge-warning">{se}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 mt-2" style={{ background: 'rgba(245, 158, 11, 0.08)', borderRadius: 8, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--warning)', fontWeight: 600, marginBottom: 4 }}>
                      <i className="bi bi-exclamation-triangle me-1"></i>Warning
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{result.warnings}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineRecognition;
