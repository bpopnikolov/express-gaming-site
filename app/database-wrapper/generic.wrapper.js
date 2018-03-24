class Wrapper {
    constructor(Model, includes = []) {
        this.Model = Model;
        this.includes = includes;
    }

    create(obj) {
        this.Model.create(obj);
    }
}
