import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  antd: {},
  proxy: {
    '/sys/': {
      // target: 'http://49.232.45.79:8281/',
      target: 'http://17q34950a1.51mypc.cn',
      // target: 'http://localhost:8280/',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
  },
});
