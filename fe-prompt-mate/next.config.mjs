/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 외부 이미지 호스트 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "promptmate.s3.ap-northeast-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },

  // TurboPack 설정 (Next.js 15 개발 환경)
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // webpack 설정 (빌드 환경)
  webpack(config) {
    // SVG를 처리하는 기본 fileLoaderRule 찾기
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    // SVG를 처리하는 두 가지 규칙 추가
    config.module.rules.push(
      // URL 쿼리가 있을 때는 기본 fileLoader 사용 (예: import svgUrl from './icon.svg?url')
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // URL 쿼리가 없을 때는 SVGR 사용 (예: import Icon from './icon.svg')
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule?.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule?.resourceQuery?.not || []), /url/],
        },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              ext: "tsx",
            },
          },
        ],
      }
    );

    // 기본 fileLoaderRule에서 SVG 제외
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

  async rewrites() {
    return [
      {
        // 프론트엔드의 /api/.. 요청을 백엔드 서버의 /api/.. 로 전달
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;