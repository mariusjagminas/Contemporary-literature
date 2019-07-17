const path = require("path")
const fs = require("fs-extra")
const yaml = require("js-yaml")
const flatten = require("flat")
const { createFilePath } = require(`gatsby-source-filesystem`)

/**
 * Creates JSON files from .yaml for gatsby-plugin-intl
 */

exports.onPreBootstrap = () => {
  const plTranslation = loadTranslationObject("pl")
  const frTranslation = loadTranslationObject("fr")

  // Create directory structure
  fs.existsSync(path.join(__dirname, "/public/intl")) ||
    fs.mkdirSync(path.join(__dirname, "/public/intl"))

  // Save bundled translation files
  fs.writeFileSync(
    path.join(__dirname, "/public/intl/pl.json"),
    JSON.stringify(flatten(plTranslation))
  )
  fs.writeFileSync(
    path.join(__dirname, "/public/intl/fr.json"),
    JSON.stringify(flatten(frTranslation))
  )

  function loadTranslationObject(languageCode) {
    const srcPath = path.join(
      __dirname,
      `/src/assets/translations/${languageCode}/`
    )
    const translationObjects = fs.readdirSync(srcPath).map(file =>
      yaml.load(fs.readFileSync(path.join(srcPath, file)), {
        encoding: "utf-8",
      })
    )
    return Object.assign({}, ...translationObjects)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    query MyQuery {
      allContentfulArticles {
        totalCount
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors)
    }

    // Create Polish-French article

    const articlesNodes = result.data.allContentfulArticles

    articlesNodes.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/article/article.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
        },
      })
    })

    // Create Polish-French articles list with pagination

    const articles = articlesNodes.totalCount
    const articlesPerPage = 3
    const numPages = Math.ceil(articles / articlesPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: `/articles/${i + 1}`,
        component: path.resolve(`./src/templates/articlesList/articlesList.js`),
        context: {
          limit: articlesPerPage,
          skip: i * articlesPerPage,
          currentPage: i + 1,
        },
      })
    })
  })
}
