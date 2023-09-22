const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/role',
        createProxyMiddleware({
            target: 'http://localhost:8090',
            changeOrigin: true,
        })
    );

    // app.use(
    //     '/api/member',
    //     createProxyMiddleware({
    //         target: 'http://localhost:8090',
    //         changeOrigin: true,
    //     })
    // );

    app.use(
        '/api/orgunits',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    );

    app.use(
        '/api/layout/configuration',
        createProxyMiddleware({
            //target: 'http://localhost:8080/beta/fintlabs-no',
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};