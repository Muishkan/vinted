import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  page,
  description,
  creator,
  type,
  robots,
  keywords,
  link,
  image,
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='page' content={page} />
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='robots' content={robots} />
      <meta name='url' content={link} />
      <meta name='identifier-URL' content={link} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={link} />
      <meta property='og:image' content={image} />

      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name='twitter:creator' content={creator} />
      <meta name='twitter:card' content={`summary`} />
      <meta name='twitter:site' content={`@Masood`} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      {/* End Twitter tags */}
      <link rel='canonical' href={link} />
      <link rel='alternate' hreflang='en' href={link} />
    </Helmet>
  );
}
