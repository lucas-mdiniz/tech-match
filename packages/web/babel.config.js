const config = require('@entria/babel');

module.exports = api => {
     // This caches the Babel config
     api.cache.using(() => process.env.NODE_ENV);
  
     if(api.env('development')){
       config.plugins.push('react-refresh/babel');
     }
     return config;
};

//module.exports = config;

