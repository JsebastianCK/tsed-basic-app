import { Property } from "@tsed/common";

export class User {
    @Property()
    id: string;

    @Property()
    name: string;

    @Property()
    surname: string;
}