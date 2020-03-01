export default class Car {
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
    }

    //TODO Add HTML Templates

    get Template() {
        return /* html */ `
      <div class="card shadow mb-3" style="max-width: 350px;">
        <div class="row no-gutters">
        <div class="col-md-4">
        <img src="${this.creatorImage}" class="card-img img-fluid img-pointer" alt="..." onclick="app.recipesController.activeRecipe('${this._id}')">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${this.createdBy}</h5>
          <p class="card-text">${this.name}</p>
          </div>
        </div>
      </div>
  </div>
    `;
    }
}