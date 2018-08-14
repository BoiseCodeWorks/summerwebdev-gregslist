function CarController() {
  let carService = new CarService()


  this.setup = function () {
    let template = `
    <form onsubmit="app.controllers.carController.makeCar(event)">
      <label for="make">Make</label>
      <input type="text" name="make" required>
      <label for="model">Model</label>
      <input type="text" name="model" required>
      <label for="imgUrl">Image Url</label>
      <input type="text" name="imgUrl" required>
      <label for="year">Year</label>
      <input type="number" name="year" required>
      <label for="price">Price</label>
      <input type="number" name="price" required>
      <label for="description">Description</label>
      <input type="text" name="description" required>
      <button type="submit">Make Car</button>
    </form>
    <div id="cars" class="row"></div>
    `
    document.getElementById('maker').innerHTML = template
    carService.loadCars(draw)
  }

  this.drawEditForm = function (id) {
    let car = carService.getCar(id)
    let template = `
    <form onsubmit="app.controllers.carController.editCar(event)">
      <label for="make">Make</label>
      <input type="text" name="make" value="${car.make}" required>
      <label for="model">Model</label>
      <input type="text" name="model" value="${car.model}" required>
      <label for="imgUrl">Image Url</label>
      <input type="text" name="imgUrl" value="${car.imgUrl}" required>
      <label for="year">Year</label>
      <input type="number" name="year" value="${car.year}" required>
      <label for="price">Price</label>
      <input type="number" name="price" value="${car.price}" required>
      <label for="description">Description</label>
      <input type="text" name="description" value="${car.description}" required>
      <input type="text" name="id" value="${car._id}" hidden>
      <button type="submit">Edit Car</button>
    </form>
    `
    document.getElementById('edit').innerHTML = template

  }

  this.editCar = function (event) {
    event.preventDefault()
    let formData = event.target
    carService.editCar(formData, draw)
    formData.reset()
    document.getElementById('edit').innerHTML = ''
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
        <button onclick="app.controllers.carController.drawEditForm('${car._id}')"> Edit </button>
        <button onclick="app.controllers.carController.deleteCar('${car._id}')">Delete</button>
      
        </div>
      `
    }
    document.getElementById('cars').innerHTML = template
  }


  this.deleteCar = function (id) {
    carService.deleteCar(id, draw)
  }

  this.makeCar = function (event) {
    event.preventDefault()
    let formData = event.target
    carService.makeCar(formData, draw)
    formData.reset()
  }

}