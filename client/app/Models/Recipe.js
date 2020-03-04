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
    <div class="card shadow mt-2 m-auto" style="max-width: 400px;">
      <img src="${this.creatorImage}" class="card-img-top img-fluid">
      <div class="card-body">
        <h5 class="card-title"><span>${this.name} - </span>${this.description}</h5>
        <p>Ingredients: ${this.ingredients}</p>  
        <p class="card-text ml-n3">
         <p>Directions: ${this.directions}   
      <button class="btn btn-info img-pointer" onclick="app.recipesController.addToFavortites('${this._id}')"> 
      Add to FAVS</button>
        </div>
    </div>
    `;
  }
}