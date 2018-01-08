const jwt = require('jwt-simple');
const { JWT_SECRET_KEY } = require("../config/index");
const { tokenGenrator } = require('./helper');

describe('test the helper functions', () => {
    describe('test the token generator', () => {
        test('should return a valid token based on received user', () => {
            const user = { id: '1234' };
            const token = tokenGenrator(user);
            expect(typeof token).toBe('string');
            const decodedUser = jwt.decode(token, JWT_SECRET_KEY);
            expect(decodedUser).toHaveProperty('sub', '1234');
            expect(decodedUser).toHaveProperty('iat');
        });
    });
});