export default class Recipe {
  constructor(data) {
    this._id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.ingredients = data.ingredients;
    this.directions = data.directions;
    this.createdBy = data.createdBy;
    this.creatorId = data.creatorId;
    this.creatorImage = data.creatorImage;
    this.closed = data.closed;
    this.like = data.like;
    this.imgUrl = data.imgUrl;
  }

  //TODO Add HTML Templates

  get Template() {
    return /* html */ `
      <div class="card shadow mb-3" style="max-width: 350px;">
        <div class="row no-gutters">
        <div class="col-md-4">
        <img src="${this.imgUrl}" class="card-img img-fluid img-pointer" alt="..." onclick="app.recipesController.activeRecipe('${this._id}')">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text">Submitted by: ${this.createdBy}</p>
          </div>
        </div>
      </div>
  </div>
    `;
  }

  //TODO instead of a button make it an icon that changes color
  get activeRecipeTemplate() {
    return /* html */ `
    <div class="card text-dark recipecard-font">
            <img src="assets/images/index card.jpg" class="card-img" alt="...">
            <div class="card-img-overlay">
              <h5 class="card-title mt-n3">${this.name}</h5>
              <img src="${this.imgUrl}" class="img-fluid img-sizing">
              <p class="card-text m-3">Description: ${this.description}</p>
              <p class="card-text m-3">Ingredients: ${this.ingredients}</p>
              <p class="card-text m-3">Directions: ${this.directions}</p>
              <p class="card-text m-3">Submitted By: <img src="${this.creatorImage}" class="img-fluid icon-sizing">  - ${this.createdBy}</p>
            </div>
            <div>
                 <button class="btn btn-info btn-success img-pointer ml-2 mb-2" onclick="app.recipesController.addToFavortites('${this._id}')"> 
                 Add to FAVS</button>
                 <button class="btn btn-info btn-warning img-pointer ml-2 mb-2" onclick="app.recipesController.editRecipe('${this._id}')"> 
                 Update Recipe</button>
                 <button class="btn btn-info btn-danger img-pointer ml-2 mb-2" onclick="app.recipesController.deleteRecipe('${this._id}')"> 
                 Delete Recipe</button>
            </div>
      </div>
            <div>
              <form id="update-form">
              <label for="test">Recipe Update Form:</label>
              <input name="test" type="text" class="form-control" />
              </form>
            </div>
    `;
  }

  get editRecipeTemplate() {
    return /* html */`

    `;
  }
}