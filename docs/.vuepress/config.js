const head = require('./head');

module.exports = {
  title: 'Express + MongoDB',
  description: 'Treinamento: REST API com Express e MongoDB.',
  dest: './build',
  serviceWorker: true,
  head,
  themeConfig: {
    sidebar: {
      '/workshop/': [
        {
          title: 'Conteúdo',
          collapsable: true,
          children: ['']
        }
      ]
    },
    serviceWorker: {
      updatePopup: {
        message: 'Novo conteúdo disponível.',
        buttonText: 'Atualizar'
      }
    }
  }
};
