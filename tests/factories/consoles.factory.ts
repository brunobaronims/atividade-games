import { faker } from '@faker-js/faker';

import prisma from 'config/database';
import { Console } from '@prisma/client';

export async function createConsole(name?: string): Promise<Console> {
    return await prisma.console.create({
        data: {
            name: name || faker.lorem.word()
        }
    })
};