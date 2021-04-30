var config = require("./src/data/website.json");

module.exports = {
  pathPrefix: '',
  siteUrl: config.siteUrl,
  siteName: config.siteName,
  siteDescription: config.siteDescription,
  title: 'Ramses Garate',
  metadata: {
    title: config.siteName,
    twitter: {
      site: config.twitterUser,
      creator: config.twitterUser,
    },
    keywords: [
      'Front End',
      'Developer',
      'Software Engineer',
      'Full Stack Engineer',
    ],
    canonicalUrl: config.siteUrl,
    image: config.siteLogo,
    author: {
      name: config.author,
    },
    organization: {
      name: config.siteName,
      url: config.siteUrl,
      logo: config.siteLogo,
    },
  },
  templates: {
    Post: '/:slug',
    Tag: '/tag/:id'
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Ramses Garate | RSS Feed',
          description: config.siteDescription,
          feed_url: config.siteUrl + '/rss.xml',
          site_url: config.siteUrl
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://ramsesgarate.com' + node.path,
          date: node.date
        }),
        output: {
          dir: './static',
          name: 'rss.xml'
        }
      }
    }, {
      "use": "@gridsome/plugin-google-analytics",
      "options": {
        "id": "UA-172467274-1"
      }
    }, {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/blog/**/index.md',
        remark: {
          autolinkHeadings: {
            content: {
              type: 'text',
              value: '#'
            }
          },

        },
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        }
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        exclude: ['/tag/*'],
        config: {
          '/*': {
            changefreq: 'daily',
            priority: 0.7,
          },
          '/about': {
            changefreq: 'daily',
            priority: 0.7,
          }
        }
      }
    }, {
      use: 'gridsome-plugin-pwa',
      options: {
        disableServiceWorker: false,
        manifestPath: 'manifest.json',
        title: 'Ramses Garate',
        startUrl: '/',
        display: 'standalone',
        statusBarStyle: 'default',
        themeColor: '#275efe',
        backgroundColor: '#fcfcfc',
        icon: './src/favicon.png',
        shortName: 'RG',
        description: 'Soy Ramses Garate, un desarrollador FrontEnd autodidacta de 23 años!',
        categories: ['education'],
        lang: 'es-419',
        dir: 'auto',
        maskableIcon: true,
        msTileColor: '#275efe',
        appleMaskIcon: './src/favicon.png',
        appleMaskIconColor: '#275efe',
      }
    }
  ],

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  }
}