import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ADS_CONFIG } from '../config/ads';

// Reusable AdSense component with pre-approval safety guard
export default function AdSlot({ slot = 'Responsive', slotId = '', className = '' }) {
  const { t } = useTranslation();
  const isLoaded = useRef(false);

  // PRE-APPROVAL SAFETY: Enquanto o AdSense não estiver aprovado / ativado,
  // não renderiza absolutamente nada no DOM (evita caixas cinzas ou espaços vazios).
  if (!ADS_CONFIG.enabled) {
    return null;
  }

  const isLeaderboard = slot.toLowerCase().includes('leaderboard') || slot.toLowerCase().includes('728');
  const resolvedSlotId = slotId || (isLeaderboard ? ADS_CONFIG.slots.leaderboard : ADS_CONFIG.slots.responsive) || '';
  const minHeight = isLeaderboard ? '90px' : '280px';

  useEffect(() => {
    if (!ADS_CONFIG.enabled || isLoaded.current) return;
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      }
    } catch (err) {
      console.debug('AdSense request error:', err);
    }
  }, []);

  return (
    <aside className={`ad-slot-wrapper ${className}`} aria-label="Publicidade">
      <span className="ad-slot-label">{t('common.ad_label', 'Publicidade')}</span>
      <div className="ad-slot-inner" style={{ minHeight }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADS_CONFIG.client}
          {...(resolvedSlotId ? { 'data-ad-slot': resolvedSlotId } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}

