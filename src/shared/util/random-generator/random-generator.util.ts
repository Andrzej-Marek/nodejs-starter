import { v4 as uuidv4 } from "uuid";

export class RandomGenerator {
    static generateRandomStringKey(): string {
        return uuidv4();
    }
}
