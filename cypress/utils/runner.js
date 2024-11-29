import { RequestManager } from "./requestManager";
import { ResponseManager } from "./responseManager";

export class Runner {
    constructor(test){
        this.test = test;
        this.requestManager = new RequestManager();
        this.responseManager = new ResponseManager();
    }

    runTest(){
        const { url, method, env, taskId, zod, expectedStatusCode} = this.test;
        const completeUrl = `${env}${url}`;
        const response = {
            "status": 200,
            "duration": 1000,
            "body": {
                "meta": {
                    "total": 11
                },
                "users": [
                    {
                        "avatar_url": "",
                        "email": "alex@gmail.com",
                        "name": "Alex",
                        "nickname": "alex",
                        "uuid": "e1191b18-e129-44af-bb4b-d4ac4e641891"
                    },
                    {
                        "avatar_url": "",
                        "email": "john@gmail.com",
                        "name": "John",
                        "nickname": "john",
                        "uuid": "1131311d-4fd9-420c-b988-55a34f3ade84"
                    },
                    {
                        "avatar_url": "",
                        "email": "kate@gmail.com",
                        "name": "Kate",
                        "nickname": "kate",
                        "uuid": "7d61a882-39a0-4562-a41a-98a43fd52634"
                    },
                    {
                        "avatar_url": "",
                        "email": "leona@gmail.com",
                        "name": "Leona",
                        "nickname": "leona",
                        "uuid": "3a7eeb9f-7ad3-4972-802c-fe1f38235ee3"
                    },
                    {
                        "avatar_url": "",
                        "email": "mario@gmail.com",
                        "name": "Mario",
                        "nickname": "mario",
                        "uuid": "4ee8e7b7-bf09-486e-a040-aba1e1ae82b1"
                    },
                    {
                        "avatar_url": "",
                        "email": "roman@gmail.com",
                        "name": "Roman",
                        "nickname": "roman",
                        "uuid": "7689f9fd-9de4-423f-a1c2-868bcfa0059b"
                    },
                    {
                        "avatar_url": "",
                        "email": "said@gmail.com",
                        "name": "Said",
                        "nickname": "said",
                        "uuid": "2c7f5167-df7f-41f4-b728-ce436e55799c"
                    },
                    {
                        "avatar_url": "",
                        "email": "sam@gmail.com",
                        "name": "Sam",
                        "nickname": "sam",
                        "uuid": "0a540c6c-2a2f-4792-8908-9e8df48ec5a3"
                    },
                    {
                        "avatar_url": "",
                        "email": "sasha@gmail.com",
                        "name": "Sasha",
                        "nickname": "sasha",
                        "uuid": "14bc7b47-384a-4a6c-b70d-54b4f65ca43a"
                    },
                    {
                        "avatar_url": "",
                        "email": "sergey@gmail.com",
                        "name": "Sergey",
                        "nickname": "sergey",
                        "uuid": "b6237d65-0e47-4685-a8d1-6f2f851b54be"
                    }
                ]
            },
            "headers": {
                "date": "Fri, 29 Nov 2024 19:47:58 GMT",
                "content-type": "application/json",
                "vary": "Accept-Encoding,Origin",
                "access-control-allow-origin": "*",
                "x-content-type-options": "nosniff",
                "x-request-id": "c5365755-1542-4b18-9410-ffc9ed75c65c",
                "x-serverless-gateway-id": "d5dejttqtidgetmg0g93",
                "x-serverless-gateway-path": "/api/v1/{proxy+}",
                "x-yf-remapped-date": "Fri, 29 Nov 2024 19:47:58 GMT",
                "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
                "content-encoding": "gzip",
                "x-server-trace-id": "76f56f9c1849eb59:66865531d76b134b:76f56f9c1849eb59:1",
                "server": "Yandex-API-Gateway/1.0",
                "transfer-encoding": "chunked"
            }
        }
       // this.requestManager.request({method, completeUrl, taskId}).then((response) => {
            this.responseManager.manageResponse({response, zod, expectedStatusCode});
       // });
    }
}