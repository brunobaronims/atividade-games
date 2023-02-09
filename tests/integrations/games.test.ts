import supertest from 'supertest';
import httpStatus from 'http-status';

import app from 'app';
import { cleanDb } from '../helpers';
import { createGame } from '../factories/games-factory';
import { createConsole } from '../factories/consoles.factory';

const server = supertest(app);

beforeAll(async () => {
    await cleanDb();
});

describe('GET /games', () => {
    it('should respond with all games', async () => {
        const console = await createConsole();
        await createGame(console.id, 'God of War');

        const response = await server.get('/games');

        expect(response.body).toEqual([
            {
                Console: expect.objectContaining({
                    id: console.id,
                    name: console.name
                }),
                id: expect.any(Number),
                title: 'God of War',
                consoleId: console.id
            }
        ]);
    });
});

describe('GET /games/:id', () => {
    it('should respond with status 404', async () => {
        const response = await server.get('/games/-1');

        expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with game data', async () => {
        const console = await createConsole();
        const { id } = await createGame(console.id, 'Elden Ring');

        const response = await server.get(`/games/${id}`);

        expect(response.body).toEqual({
            id: id,
            title: 'Elden Ring',
            consoleId: console.id
        });
    });
});

describe('POST /games', () => {
    it('should respond with status 409', async () => {
        const { id } = await createConsole();
        await createGame(id, 'Hades');
        
        const body = {
            "title": "Hades",
            consoleId: id
        };

        const response = await server.post('/games').send(body);
        expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond with status 201', async () => {
        const { id } = await createConsole();
        
        const body = {
            'title': 'Dark Souls',
            consoleId: id
        };

        const response = await server.post('/games').send(body);
        expect(response.status).toBe(httpStatus.CREATED);
    })
});