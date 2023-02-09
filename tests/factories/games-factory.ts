import { faker } from '@faker-js/faker';

import prisma from 'config/database';
import { Game } from '@prisma/client';

export async function createGame(consoleId: number, title?: string): Promise<Game> {
    return await prisma.game.create({
        data: {
            title: title || faker.lorem.word(),
            consoleId: consoleId
        }
    })
};