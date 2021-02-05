import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  antd: {},
  proxy: {
    '/sys/': {
      target: 'http://localhost:8280/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },
});
