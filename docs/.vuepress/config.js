const head = require('./head');

module.exports = {
  title: 'Express + MongoDB',
  description: 'Treinamento: REST API com Express e MongoDB.',
  dest: './build',
  head,
  themeConfig: {
    sidebar: [
      {
        title: 'Módulo 01: Visão Geral',
        collapsable: false,
        children: [
          '/overview/intro',
          '/overview/environment',
          '/overview/starter-files'
        ]
      },
      {
        title: 'Módulo 02: Configurações iniciais',
        collapsable: false,
        children: [
          // '/config/intro',
          '/config/nodemon',
          '/config/logs',
          '/config/config',
          '/config/database'
        ]
      },
      {
        title: 'Módulo 03: Servidor Web',
        collapsable: false,
        children: [
          // '/webserver/intro',
          '/webserver/webserver',
          '/webserver/webserver-middleware',
          '/webserver/webserver-error',
          '/webserver/webserver-router',
          '/webserver/webserver-healthz'
        ]
      },
      {
        title: 'Sumário',
        collapsable: false,
        children: ['/summary/next-steps']
      }
      // {
      //   title: 'Módulo Final',
      //   collapsable: false,
      //   children: ['/docs/intro', '/deploy/intro', '/final/troubleshooting']
      // }
    ],
    serviceWorker: true,
    serviceWorker: {
      updatePopup: {
        message: 'Novo conteúdo disponível.',
        buttonText: 'Atualizar'
      }
    }
  }
};
