export class Strategy {
    public static None = '';
    public static Basic = 'basic';
    public static Facebook = 'facebook';
    public static Github = 'github';
    public static Google = 'google';
}

export abstract class AbstractLoginModel {
    public strategy: string;
    public authHeader: string;
    constructor(
        public userId: string,
        public username: string
    ) { }
}

export class HttpLoginModel extends AbstractLoginModel {
    constructor(
        userId: string,
        username: string,
        public password: string
    ) {
        super(userId, username);
    }
}

export class OAuthLoginModel extends AbstractLoginModel {
    public refreshToken: string;
    constructor(
        userId: string,
        username: string,
        public authId: string,
        public accessToken: string
    ) {
        super(userId, username);
    }
}
