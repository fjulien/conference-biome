// npx eslint .\exemple-code\slide-3\linter.js
// npx @biomejs/biome lint .\exemple-code\slide-3\linter.js

var chocolat = new ChocolatChaud(['lait', 'chocolat', 'miel'], 5);

class ChocolatChaud {
  constructor(
    ingredients,
    prix,
  ) {
    this.ingredients = ingredients;
    this.prix = prix;
  }

  estBon() {
    return this.ingredients.find((i) => i == 'lait');
  }
}
