class GenericDbWrapper {
    constructor(Model, includes = []) {
        this.Model = Model;
        this.includes = includes;
    }

    getById(id) {
        return this.Model.findById(id, {
            include: this.includes,
        });
    }

    getAll(obj) {
        return this.Model.findAll();
    }

    create(obj) {
        return this.Model.create(obj);
    }

    bulkCreate(arr) {
        return this.Model.bulkCreate(arr);
    }

    hasRecord(obj) {
        const filterObj = obj.name ? {
            name: obj.name,
        } : {
            url: obj.url,
        };

        return this.Model.findOne({
            where: filterObj,
        });
    }

    findOrCreate(obj) {
        const filterObj = obj.name ? {
            name: obj.name,
        } : {
            url: obj.url,
        };

        if (filterObj.name !== '' && filterObj.url !== '') {
            return this.Model.findCreateFind({
                where: filterObj,
                defaults: obj,
            });
        }
        return null;
    }
}

module.exports = GenericDbWrapper;
