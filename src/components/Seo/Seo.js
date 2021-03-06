import React from "react"
import { Helmet } from "react-helmet"
import { injectIntl } from "gatsby-plugin-intl"
import { useStaticQuery, graphql } from "gatsby"
import truncate from "lodash/truncate"
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"

const Seo = ({ intl, intl: { locale }, seo }) => {
  const {
    site: {
      siteMetadata: { siteUrl, author, defaultImage },
    },
  } = useStaticQuery(query)
  // Default values
  const title = seo.hasOwnProperty("title")
    ? seo.title
    : intl.formatMessage({ id: "seo.title" })
  const imgPath = seo.hasOwnProperty("imgFixed") ? seo.imgFixed : defaultImage
  const locPrefix = locale === "pl" ? "" : "/" + locale
  const slug = seo.hasOwnProperty("slug") ? seo.slug : null
  const pageUrl = slug ? `${siteUrl}${locPrefix}/${seo.slug}` : siteUrl
  const description = seo.hasOwnProperty("contentJson")
    ? truncate(documentToPlainTextString(seo.contentJson), { length: 200 })
    : intl.formatMessage({ id: "seo.description" })
  const isPl = seo.hasPlContent ? true : false
  const isFr = seo.hasFrContent ? true : false
  const isEn = seo.hasEnContent ? true : false
  const isNoindex = seo.hasOwnProperty("isNoindex") ? seo.isNoindex : false
  // To add links metatags content must be available in more then one language.
  const isMoreThanOne =
    ((isFr || isEn) && isPl) ||
    ((isPl || isEn) && isFr) ||
    ((isPl || isFr) && isEn)

  const renderDefaultLink = () => {
    if (isEn)
      return (
        <link
          rel="alternate"
          href={`${siteUrl}/en${slug ? "/" + slug : "/"}`}
          hreflang="x-default"
        />
      )
    if (isFr)
      return (
        <link
          rel="alternate"
          href={`${siteUrl}/fr${slug ? "/" + slug : "/"}`}
          hreflang="x-default"
        />
      )
    if (isPl)
      return (
        <link
          rel="alternate"
          href={`${siteUrl}/pl${slug ? "/" + slug : "/"}`}
          hreflang="x-default"
        />
      )
  }

  return (
    <Helmet>
      <html lang={`${locale}`} />
      {isNoindex && <meta name="robots" content="noindex, follow" />}
      {/* Languages tags */}
      {isMoreThanOne && isPl ? (
        <link
          rel="alternate"
          href={`${siteUrl}${slug ? "/" + slug : "/"}`}
          hreflang="pl"
        />
      ) : null}
      {isMoreThanOne && isFr ? (
        <link
          rel="alternate"
          href={`${siteUrl}/fr${slug ? "/" + slug : "/"}`}
          hreflang="fr"
        />
      ) : null}
      {isMoreThanOne && isEn ? (
        <link
          rel="alternate"
          href={`${siteUrl}/en${slug ? "/" + slug : "/"}`}
          hreflang="en"
        />
      ) : null}
      {/* x-default language link */}
      {isMoreThanOne && renderDefaultLink()}
      {/* Esential tags */}
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="author" content={author} />
      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={`http:${imgPath}`} />
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`http:${imgPath}`} />
      {/* Google verification link */}
      <meta name="google-site-verification" content="Pq4pzo0x0rC2EP8AlM1dxy7VR4m5ucV3E__PcqG-N6Q" />
    </Helmet>
  )
}

export default injectIntl(Seo)

Seo.defaultProps = {
  seo: {},
}

const query = graphql`
  query Seo {
    site {
      siteMetadata {
        siteUrl
        author
        defaultImage
      }
    }
  }
`

// <link hreflang="" rel="alternate"/> metatags are shown only if a content exist at least in  two languages.
// To display those links var: hasPlContent, hasFrContent, hasEnContent must be set to 'true'
// acording to existing content.
// x-default language tag is not static. Its value depends on which languages are available.
//
// Props has to be delivered in seo{}, Any missing property will be overridden by the default value.
// Default values are:
//
// seo={{
//  title:                     //  about-us page title
// 	contentJson: contentJson,  //  about-us page description
// 	imgFixed: imgFixed,        //  defaultImage from gatsby-config.js
// 	slug: slug,                //  slug '/'
// 	hasPlContent:              //  false
// 	hasFrContent:              //  false
// 	hasEnContent:              //  false
//  isNoindex:                 //  false
// }}
//
//  link metatags are added to these pages:
//
//  1.about-us:
//  2.articles: only first pages '/', '/en/', '/fr/'
//  3.For every single post according to existing content. pl-fr, en-fr
//  4.about-me:
//  5.contact:
//
//-------- noindex FOLLOW ---------//
//
// Metatag noindex, follow will be added to pages with isNoindex: true, default: false
// Metatags are added to these pages:
//
// 1. Articles pages - for all empty pages in another language
// 2. Single article page - for all pages without content in another language
// 3. Archive - for all archive pages.
// 4. history-of-theater - for empty pages in another language
// 5. history-of-theater single article - for all pages without content in another language
// 6. 404 page - for all pages
