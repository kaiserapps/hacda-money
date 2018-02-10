export enum RoleType {
    User,
    Admin
}

export enum UserStatus {
    Inactive,
    Active,
    Locked
}

export class UserModel {
    private _id: string;
    public name: string;
    public roles: RoleType[];
    public status: UserStatus;
    public authId: string;
    public strategyId: string;
    public email: string;
    public profileUrl: string;
    public accessToken: string;
    public refreshToken: string;
    public sessionToken: string;
    public created: number;
    public updated: number;
    public createdBy: string;
    public updatedBy: string;

    public static copyUser(from: UserModel, to: UserModel): UserModel {
        if (!from) {
            return to;
        }
        if (!to) {
            to = new UserModel();
        }
        to.name = from.name;
        to.roles = from.roles;
        to.status = from.status;
        to.authId = from.authId;
        to.strategyId = from.strategyId;
        to.profileUrl = from.profileUrl;
        to.accessToken = from.accessToken;
        to.refreshToken = from.refreshToken;
        to.sessionToken = from.sessionToken;
        to.created = from.created;
        to.updated = from.updated;
        to.createdBy = from.createdBy;
        to.updatedBy = from.updatedBy;
        return to;
    }

    constructor(user?: UserModel) {
        if (user) {
            UserModel.copyUser(user, this);
        }
    }

    public get uniqueId(): string {
        return this._id;
    }

    public set uniqueId(id: string) {
        this._id = id;
    }

    public copyTo(user: UserModel): UserModel {
        return UserModel.copyUser(this, user);
    }
}
