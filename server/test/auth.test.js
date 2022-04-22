const request = require('supertest');
const app = require('../index');

describe('/api/auth', () => {
	describe('POST /register', () => {
		it('should return error', async () => {
			const response = await request(app)
				.post('/api/auth/register')
			expect(response.statusCode).toBe(500);
		})
		it('should return the name, and email ', async () => {
			const newUser = {
				name: 'Test',
				password: 'testtest',
				email: 'test@supertest.js'
			};
			const response = await request(app)
				.post('/api/auth/register')
				.send(newUser)
			expect(response.statusCode).toBe(200);
			expect(response.body.name).toBe(newUser.name);
			expect(response.body.email).toBe(newUser.email);
		})
	})
	let accessToken;
	describe('POST /login', () => {
		it('should return error, wrong password', async () => {
			const newUser = {
				email: 'test@supertest.js',
				password: 'test'
			}
			const response = await request(app).post('/api/auth/login')
				.send(newUser)
			expect(response.statusCode).toBe(401);
			expect(response.body).toBe('Wrong Credentials.');
		})
		it('should successfully log and give a token', async () => {
			const newUser = {
				email: 'test@supertest.js',
				password: 'testtest'
			}
			const response = await request(app).post('/api/auth/login')
				.send(newUser)
			expect(response.statusCode).toBe(200);
			accessToken = response.body.accessToken;
		})

	})
	describe('DELETE /', () => {
		it('should return user deleted', async () => {
			const user = {
				email: 'test@supertest.js'
			}
			const userReq = {
				'id': 'test@supertest.js',
			}
			const response = await request(app).delete('/api/auth/')
				.send(user)
				.set('token', `Bearer ${accessToken}`)
				.set(userReq)
			console.log(response.body)
			expect(response.statusCode).toBe(200);
			expect(response.body).toBe(`${user.email} deleted.`)
		})
	})


})
