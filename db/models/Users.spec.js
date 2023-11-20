import UserModel from './Users'

describe('db/models/Users.js', () => {
    const createUserModel = (...params) => new UserModel(...params)

    it('should construct a valid instance', () => {
      expect(createUserModel({}).db).toEqual({})
    })
})