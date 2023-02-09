import { consoleSchema } from "schemas/console-schema";
import { faker } from "@faker-js/faker";

describe('createConsoleSchema', () => {
    const generateValidInput = () => ({
        name: faker.lorem.word()
    });

    it('should return error if name is not present', () => {
        const input = generateValidInput();
        delete input.name;

        const { error } = consoleSchema.validate(input);

        expect(error).toBeDefined();
    });
});