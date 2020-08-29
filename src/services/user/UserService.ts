import { Service } from "@tsed/di";
import { Memory } from "../memory/Memory";
import { User } from "../../models/User";

@Service()
export class UserService {


    constructor(private memoryStorage: Memory) {
        this.memoryStorage.set('users', require('../../../resources/users.json').map((user) => {
            return Object.assign(new User, user);
        }))
    }

    async query(): Promise<User[]> {
        return this.memoryStorage.get('users');
    }

    async find(id: string): Promise<User> {
        const users: User[] = await this.query();

        return users.find(user => user.id == id);
    }

    async findAll(): Promise<User[]> {
        return await this.query();
    }
}