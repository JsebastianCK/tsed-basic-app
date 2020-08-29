import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import {GlobalAcceptMimesMiddleware} from "@tsed/platform-express";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as dotenv from 'dotenv';

dotenv.config();

const rootDir = __dirname;

@Configuration({
    rootDir,
    acceptMimes: ['application/json'],
    mount: {
        "/": `${rootDir}/controllers/**/*.ts`
    },
    componentsScan: [
        "${rootDir}/services/**/*.ts",
    ],
    httpPort: process.env.PORT || 5000,
    httpsPort: process.env.HTTPS_PORT || 8000
})
export class Server {

    @Inject()
    app: PlatformApplication;

    @Configuration()
    settings: Configuration;

    /**
     * Configure express's middlewares required by the application
     */
    public $beforeRoutesInit(): void | Promise<any> {
        this.app
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));
    }
}