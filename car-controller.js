function CarController() {
  let carService = new CarService()


  this.setup = function () {
    let template = `
    <form onsubmit="app.controllers.carController.makeCar(event)">
      <label for="make">Make</label>
      <input type="text" name="make">
      <label for="model">Model</label>
      <input type="text" name="model">
      <label for="imgUrl">Image Url</label>
      <input type="text" name="imgUrl">
      <label for="year">Year</label>
      <input type="number" name="year">
      <label for="price">Price</label>
      <input type="number" name="price">
      <label for="description">Description</label>
      <input type="text" name="description">
      <button type="submit">Make Car</button>
    </form>
    <div id="cars" class="row"></div>
    `
    document.getElementById('maker').innerHTML = template
    carService.loadCars(draw)
  }

  function draw() {
    let cars = carService.getCars()
    let template = ''

    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];
      template += `
      <div class="col-3">
        <p>${car.make}</p>
        <p>${car.model}</p>
        <p>${car.year}</p>
        <p>${car.price}</p>
        <p>${car.description}</p>
        <img src="${car.imgUrl}" alt="">
      </div>
      `
    }
    document.getElementById('cars').innerHTML = template
  }


  this.makeCar = function (event) {
    event.preventDefault()
    let formData = event.target
    carService.makeCar(formData, draw)
    formData.reset()
  }

}