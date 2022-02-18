import { parseBoolean } from './config.helper';
import { Config } from './config.model';

export function configFactory(): Config {
    return {
        logger: {
            appName: process.env.npm_package_name,
            logLevel: process.env.LOG_LEVEL || 'info',
            logDir: process.env.LOG_DIR || 'logs',
            timestampFormat: { format: process.env.TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss.SSS' },
            printfTemplateFn: log => {
                const { timestamp, level, context, message, ...others } = log;
                return `${log.timestamp} ${log.level} [${log.context}] ${
                    log.message
                } - ${JSON.stringify(others)}`;
            },
        },
        app: {
            name: process.env.npm_package_name,
            version: process.env.npm_package_version,
        },
        server: {
            port: +process.env.PORT || 8080,
            contentSecurityPolicy: parseBoolean(process.env.CONTENT_SECURITY_POLICY, true),
            csrf: false,
            rateLimit: {
                windowMs: +process.env.RATE_LIMIT_WINDOW_MS || 60 * 1000,
                maxRequestsPerIpDuringWindow:
                    +process.env.RATE_LIMIT_MAX_REQUESTS_PER_IP_DURING_WINDOW || 60,
                trustProxyClientIpHeader: parseBoolean(
                    process.env.RATE_LIMIT_TRUST_PROXY_CLIENT_IP_HEADER,
                    true,
                ),
            },
        },
        jwt: {
            secret: 'secretKey',
            publicKey: process.env.JWT_PUBLIC_KEY,
            privateKey: process.env.JWT_PRIVATE_KEY,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
            },
        },
        db: {
            type: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'user',
            password: 'password',
            database: 'db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        },
    };
}
