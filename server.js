import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';


const port = 80;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = http.createServer(async (req, res) => {
    


    if(req.method === "GET"){
        console.log(req.url);

        if(req.url === '/' || req.url === '/?'){
            await sendIndex(res);
            return;
        }

        const filePath = path.join(__dirname, 'public', req.url);
        const data = await fs.readFile(filePath);

        const extension = req.url.split('.')[1];
        switch(extension){
            case 'html':
                res.writeHead( 200, {'Content-Type' : 'text/html'});
            break;
            case 'css':
                res.writeHead( 200, {'Content-Type' : 'text/css'});
            break;
            case 'js':
                res.writeHead( 200, {'Content-Type' : 'application/javascript'});
            break;
            default:
                res.writeHead( 200, {'Content-Type' : 'text/plain'});
            break;
        }

        res.end(data);
    }else if(req.method === 'POST'){
        console.log(req.url);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
        });
      
        await sendIndex(res);
        return;
    }


})

server.listen(port, () => {
    console.log('Server running on port ' + port);
})

async function sendIndex(res){
    const indexPath = path.join(__dirname, 'public', 'index.html');
    const indexData = await fs.readFile(indexPath);

    res.writeHead( 200, {'Content-Type' : 'text/html'});
    res.end(indexData);
}