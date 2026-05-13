import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '../../css/ImageCropper.css';
import ToolLayout from '../../components/ToolLayout';
import { tools } from '../../data/tools';

const tool = tools.find(t => t.id === 'image-cropper');

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      { unit: '%', width: 90 },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCropper() {
  const { t } = useTranslation();
  const [imgSrc, setImgSrc] = useState('');
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [aspect, setAspect] = useState(undefined);
  
  const [format, setFormat] = useState('image/jpeg');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); 
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function handleAspectChange(newAspect) {
    setAspect(newAspect);
    if (imgRef.current && newAspect) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, newAspect));
    } else {
      setCrop(undefined);
    }
  }

  useEffect(() => {
    if (completedCrop && imgRef.current) {
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      setCustomWidth(Math.round(completedCrop.width * scaleX));
      setCustomHeight(Math.round(completedCrop.height * scaleY));
    }
  }, [completedCrop]);

  async function handleDownload() {
    if (!completedCrop || !imgRef.current) return;
    
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    let outputWidth = customWidth ? parseInt(customWidth) : completedCrop.width * scaleX;
    let outputHeight = customHeight ? parseInt(customHeight) : completedCrop.height * scaleY;
    
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    ctx.imageSmoothingQuality = 'high';

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      outputWidth,
      outputHeight
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/png' ? 'png' : 'webp';
      a.download = `cropped-image.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    }, format, 1);
  }

  return (
    <ToolLayout tool={tool}>
      {!imgSrc ? (
        <div className="card text-center" style={{padding:'60px 20px'}}>
          <div style={{fontSize:'3rem',marginBottom:16}}>📐</div>
          <h2 style={{marginBottom:8}}>{t('img_crop.title', 'Upload Image to Crop')}</h2>
          <p style={{color:'var(--clr-text-2)',marginBottom:24}}>{t('img_crop.sub', 'Select an image to resize, crop and change its aspect ratio')}</p>
          <label className="btn btn-primary" style={{cursor:'pointer', display:'inline-block'}}>
            {t('img_crop.browse', 'Browse Image')}
            <input type="file" accept="image/*" onChange={onSelectFile} style={{display:'none'}} />
          </label>
        </div>
      ) : (
        <div className="crop-layout">
          
          {/* Main Cropper Area */}
          <div className="card crop-main-area">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                onLoad={onImageLoad}
                style={{maxHeight: '60vh', objectFit: 'contain', display: 'block'}}
              />
            </ReactCrop>
          </div>
          
          {/* Sidebar Properties */}
          <div className="card crop-sidebar">
            <div>
              <label className="form-label">{t('img_crop.aspect', 'Aspect Ratio')}</label>
              <div className="pill-tabs" style={{flexWrap:'wrap'}}>
                <button className={`pill-tab${aspect === undefined ? ' active' : ''}`} onClick={() => handleAspectChange(undefined)}>{t('img_crop.free', 'Free')}</button>
                <button className={`pill-tab${aspect === 1 ? ' active' : ''}`} onClick={() => handleAspectChange(1)}>1:1</button>
                <button className={`pill-tab${aspect === 16/9 ? ' active' : ''}`} onClick={() => handleAspectChange(16/9)}>16:9</button>
                <button className={`pill-tab${aspect === 4/3 ? ' active' : ''}`} onClick={() => handleAspectChange(4/3)}>4:3</button>
                <button className={`pill-tab${aspect === 9/16 ? ' active' : ''}`} onClick={() => handleAspectChange(9/16)}>9:16</button>
              </div>
            </div>

            <div style={{display:'flex',gap:12}}>
              <div style={{flex:1}}>
                <label className="form-label">{t('img_crop.width', 'Width (px)')}</label>
                <input type="number" className="form-input" value={customWidth} onChange={e => {
                  setCustomWidth(e.target.value);
                  if (aspect && e.target.value) setCustomHeight(Math.round(e.target.value / aspect));
                }} />
              </div>
              <div style={{flex:1}}>
                <label className="form-label">{t('img_crop.height', 'Height (px)')}</label>
                <input type="number" className="form-input" value={customHeight} onChange={e => {
                  setCustomHeight(e.target.value);
                  if (aspect && e.target.value) setCustomWidth(Math.round(e.target.value * aspect));
                }} />
              </div>
            </div>

            <div>
              <label className="form-label">{t('img_crop.format', 'Export Format')}</label>
              <select className="form-input" value={format} onChange={e => setFormat(e.target.value)}>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>

            <div style={{marginTop:'auto',display:'flex',flexDirection:'column',gap:12}}>
              <button className="btn btn-primary btn-full" onClick={handleDownload} disabled={!completedCrop?.width || !completedCrop?.height}>
                {t('img_crop.download', '⬇️ Crop & Download')}
              </button>
              <button className="btn btn-full" onClick={() => setImgSrc('')} style={{background:'var(--clr-bg)',border:'1px solid var(--clr-border)', color:'var(--clr-text-1)'}}>
                {t('img_crop.reset', 'Upload new image')}
              </button>
            </div>
          </div>

        </div>
      )}
    </ToolLayout>
  );
}