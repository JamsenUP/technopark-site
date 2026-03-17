/** @type {import('next').NextConfig} */
const nextConfig = {
  // Важно: Visual Editing + /api/draft требуют серверного рантайма.
  // Поэтому не используем `output: "export"` (статический экспорт).
  // если сайт будет лежать не в корне домена, а в подпапке, добавьте basePath
  // basePath: '/subfolder',
  images: {
    unoptimized: true, // если используете компонент Image, иначе картинки могут не работать
  },
}

module.exports = nextConfig
