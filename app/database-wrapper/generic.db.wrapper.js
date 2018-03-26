class GenericDbWrapper {
    constructor(Model, includes = []) {
        this.Model = Model;
        this.includes = includes;
    }

    create(obj) {
        return this.Model.create(obj);
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
        return this.Model.findCreateFind({
            where: filterObj,
            defaults: obj,
        });
    }

    getAll(obj) {
        return this.Model.findAll();
    }
}
module.exports = GenericDbWrapper;