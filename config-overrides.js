
const path = require('path');

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve, // 保留原有配置
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  };

  return config;
};
