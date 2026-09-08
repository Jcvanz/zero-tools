// Configuração Centralizada do Google AdSense
// -------------------------------------------------------------
// Enquanto o site aguarda aprovação no AdSense, `enabled` permanece `false`.
// Isso garante que nenhuma caixa cinza, borda ou espaço vazio quebre o layout do site.
//
// Após receber o e-mail de aprovação do Google AdSense:
// 1. Altere `enabled: true`
// 2. Preencha os IDs dos blocos criados no painel (ou use os mesmos para todos)
// -------------------------------------------------------------

export const ADS_CONFIG = {
  // Alterne para `true` quando a conta for aprovada
  enabled: false,

  // ID da conta do AdSense (conforme seu ads.txt e index.html)
  client: 'ca-pub-2640010926468123',

  // IDs dos blocos de anúncios (data-ad-slot)
  slots: {
    responsive: '',     // Bloco responsivo padrão
    leaderboard: '',    // Banner horizontal superior
    inArticle: '',      // Bloco in-article entre seções e blog
  }
};
