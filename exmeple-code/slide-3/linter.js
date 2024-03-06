// npx eslint .\exmeple-code\slide-3\linter.js
// npx @biomejs/biome lint .\exmeple-code\slide-3\linter.js

class Officer {

    constructor(
        firstName,
        role
    ) {
        this.firstName = firstName;
        this.role = role;
    }

    get name() {
        return `Inspector ${this.firstName}`;
    }

    isInspector() {
        return this.role == 'Inspector';
    }

}

var newDetective = new Officer('Lestrade', 'Inspector');