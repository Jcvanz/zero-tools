// Reusable AdSense placeholder / ad slot component
export default function AdSlot({ slot = 'Responsive', className = '' }) {
  const isLeaderboard = slot.toLowerCase().includes('leaderboard') || slot.toLowerCase().includes('728');
  const minHeight = isLeaderboard ? '90px' : '280px';

  return (
    <div className={`ad-slot ${className}`} style={{ minHeight }} aria-label="Advertisement">
      {/* Descomente e insira seus IDs quando o AdSense for aprovado:
      <ins className="adsbygoogle"
        style={{display:'block'}}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true" />
      */}
    </div>
  );
}
