module.exports = (function () {
    return {
        local: { // localhost
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'roehd007',
            database: 'injea'
        },
        real: { // real server db info
            host: '',
            port: '',
            user: '',
            password: '!',
            database: ''
        },
        dev: { // dev server db info
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();