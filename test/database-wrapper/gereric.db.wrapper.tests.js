const {
    expect,
} = require('chai');

const GenericDbWrapper =
    require('../../app/database-wrapper/generic.db.wrapper');

describe('Generic Db wrapper', () => {
    describe('findAll', () => {
        describe('When valid', () => {
            it('with empty Model, expect GetAll() to return empty array', async () => {
                const Model = {
                    findAll: () => [],
                    getById: (id) => {},
                };

                const data = new GenericDbWrapper(Model);

                const objects = await data.getAll();

                expect(objects).to.be.empty;
            });
            it('with objects in Model, expect GetAll() to return all objects', async () => {
                const objects = [1, 2, 3];
                const Model = {
                    findAll: () => objects,
                };

                const data = new GenericDbWrapper(Model);

                const result = await data.getAll();

                expect(result).deep.equal(objects);
            });
        });
    });

    describe('getById', () => {
        describe('When valid', () => {
            it('existing id, expect to return object', async () => {
                const id = 1;
                const object = {
                    id: 1,
                };
                const Model = {
                    findById: (id) => object,
                };

                const data = new GenericDbWrapper(Model);

                const result = await data.getById(id);

                expect(result).to.exist;
                expect(result.id).to.equal(id);
            });
        });

        describe('When invalid', () => {
            it('non-existing id, expect to return null', async () => {
                const id = 2;

                const Model = {
                    findById: (id) => null,
                };

                const data = new GenericDbWrapper(Model);

                const result = await data.getById(id);

                expect(result).to.be.null;
            });
        });

        describe('create', () => {
            describe('When valid', () => {
                it('expect to push object in array', async () => {
                    const object = {
                        id: 1,
                    };
                    const Model = {
                        create: (obj) => [obj],
                    };

                    const data = new GenericDbWrapper(Model);

                    const result = await data.create(object);

                    expect(result[0]).to.exist;
                    expect(result[0]).to.equal(object);
                });
            });

            describe('When invalid', () => {
                it('with invalid obj, expect empty array', async () => {
                    const object = {
                        id: 1,
                    };
                    const Model = {
                        create: (obj) => [],
                    };

                    const data = new GenericDbWrapper(Model);

                    const result = await data.create(object);

                    expect(result).to.be.empty;
                });
            });
        });

        describe('findOrCreate', () => {
            describe('When valid', () => {
                it('expect to push or find object in array', async () => {
                    const object = {
                        id: 1,
                    };
                    const Model = {
                        findOrCreate: (obj) => [obj],
                        findCreateFind: (obj) => [obj],
                    };

                    const data = new GenericDbWrapper(Model);

                    const result = await data.findOrCreate(object);

                    expect(result[0]).to.exist;
                });
            });
            describe('When invalid', () => {
                it('with invalid obj, expect empty array', async () => {
                    const object = {
                        id: 1,
                    };
                    const Model = {
                        findOrCreate: (obj) => [],
                        findCreateFind: (obj) => [],
                    };

                    const data = new GenericDbWrapper(Model);

                    const result = await data.findOrCreate(object);

                    expect(result).to.be.empty;
                });
            });
        });

        describe('bulkCreate', () => {
            describe('When valid', () => {
                it('expect return array', async () => {
                    const arr = [1, 2, 3];
                    const Model = {
                        bulkCreate: (inputArr) => inputArr,
                    };

                    const data = new GenericDbWrapper(Model);

                    const result = await data.bulkCreate(arr);

                    expect(result).to.exist;
                    expect(result).to.equal(arr);
                });
            });

            describe('When invalid', () => {
                it('with invalid array, expect return null', async () => {
                    const arr = [1, 2, 3];
                    const Model = {
                        bulkCreate: (inputArr) => null,
                    };

                    const data = new GenericDbWrapper(Model);

                    const result = await data.bulkCreate(arr);

                    expect(result).to.be.null;
                });
            });
        });
    });
});
