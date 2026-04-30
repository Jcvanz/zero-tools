// Reusable AdSense placeholder / ad slot component
export default function AdSlot({ slot = 'Responsive', className = '' }) {
  return (
    <div className={`ad-slot ${className}`} aria-label="Advertisement">
      {/* Uncomment and replace IDs when AdSense is approved:
      <ins className="adsbygoogle"
        style={{display:'block'}}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true" />
      */}
      <div className="ad-placeholder" data-slot={slot} style={{width:'100%'}} />
    </div>
  );
}
