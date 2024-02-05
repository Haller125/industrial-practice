import {makeAutoObservable} from "mobx";

export default class FilesStore {
    constructor() {
        this._files = [];
        this._isload = false
        makeAutoObservable(this);
    }

    setFiles(files) {
        this._files = files;
    }

    setIsLoad(isload) {
        this._isload = isload;
    }

    get files() {
        return this._files;
    }

    get isLoad() {
        return this._isload;
    }
}
