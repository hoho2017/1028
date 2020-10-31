import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  antd: {},
  proxy: {
    '/sys/': {
      target: 'http://49.232.45.79:8280/renren-admin/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },
});
