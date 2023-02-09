import supertest from 'supertest';
import httpStatus from 'http-status';

import app from 'app';
import { cleanDb } from '../helpers';
import { createConsole } from '../factories/consoles.factory';

const server = supertest(app);

beforeAll(async () => {
    await cleanDb();
});

describe('GET /consoles', () => {
    it('should respond with all consoles', async () => {
        await createConsole('Playstation 3');

        const response = await server.get('/consoles');

        expect(response.body).toEqual([
            {
                id: expect.any(Number),
                name: 'Playstation 3'
            }
        ]);
    })
});

describe('GET /consoles/:id', () => {
    it('should respond with status 404', async () => {
        const response = await server.get('/consoles/-1');

        expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with console data', async () => {
        const { id } = await createConsole('Playstation 4');

        const response = await server.get(`/consoles/${id}`);

        expect(response.body).toEqual({
            id: id,
            name: 'Playstation 4'
        });
    });
});

describe('POST /consoles', () => {
    it('should respond with status 409', async () => {
        const body = {
            "name": "Playstation 4"
        };

        const response = await server.post('/consoles').send(body);
        expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond with status 201', async () => {
        const body = {
            'name': 'Playstation 5'
        };

        const response = await server.post('/consoles').send(body);
        expect(response.status).toBe(httpStatus.CREATED);
    })
});