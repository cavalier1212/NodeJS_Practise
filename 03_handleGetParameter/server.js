const http = require('http');
const fs = require('fs');// file System

const sendResponse = (fileName, statusCode, response) => {
    fs.readFile(`./html/${fileName}`, (error, data) => {
        if (error) {
            response.statusCode = 500;
            response.setHeader('Content-Type', 'text/plain');
            response.end('Sorry, internal error')
        } else {
            response.statusCode = statusCode;
            response.setHeader('Content-Type', 'text/html');
            response.end(data)
        }
    })
}


const server = http.createServer((request, response) => {
    const method = request.method;
    let url = request.url;
    console.log('url', url);// /about.html?lang=zh

    const requestUrl = new URL(url, `http://${ip}:${port}`);// node 官方建議
    url = requestUrl.pathname;
    console.log('requestUrl', requestUrl);
    // URL {
    //     href: 'http://127.0.0.1:3000/about.html?lang=zh',
    //     origin: 'http://127.0.0.1:3000',
    //     protocol: 'http:',
    //     username: '',
    //     password: '',
    //     host: '127.0.0.1:3000',
    //     hostname: '127.0.0.1',
    //     port: '3000',
    //     pathname: '/about.html',
    //     search: '?lang=zh',
    //     searchParams: URLSearchParams { 'lang' => 'zh' },
    //     hash: ''
    //   }
    console.log('pathname', url);// /about.html
    const lang = requestUrl.searchParams.get('lang') === 'zh' ? '-' + requestUrl.searchParams.get('lang') : '';
    console.log('lang', lang);// zh

    if (method === 'GET') {
        if (url === '/') {
            sendResponse(`index${lang}.html`, 200, response);
        } else if (url === '/about.html') {
            sendResponse(`about${lang}.html`, 200, response);
        } else {
            sendResponse(`404${lang}.html`, 404, response);
        }
    } else {

    }

});

const port = '3000';
const ip = '127.0.0.1';

server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`)
})