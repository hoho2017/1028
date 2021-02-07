import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  antd: {},
  proxy: {
    '/sys/': {
      target: 'http://49.232.45.79:8280/',
      // target: 'http://localhost:8280/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },
});
