function CarService() {

  let carService = this

  let cars = []
  cars.push(new Car("Ford", "Aspire", "http://placehold.it/200x200", 1970, 200, "It is NOT aspiring to be anything"))

  function Car(make, model, imgUrl, year, price, description, id) {

    this.make = make

    this.model = model

    this.imgUrl = imgUrl

    this.year = year

    this.price = price

    this.description = description

    this._id = id

  }

  this.getCars = function () {
    let carsCopy = []
    for (let i = 0; i < cars.length; i++) {
      const car = cars[i];
      let carCopy = new Car(car.make, car.model, car.imgUrl, car.year, car.price, car.description, car._id)
      carsCopy.push(carCopy)
    }
    return carsCopy
  }

  this.loadCars = function (draw) {
    $.get('https://bcw-gregslist.herokuapp.com/api/cars').then(res => {
      cars = res.data
      console.log(cars)
      draw()
    })
  }

  this.getCar = function (id) {
    let car = {}
    cars.forEach(currentCar => {
      if (currentCar._id == id) {
        car = currentCar
      }
    })
    return car

  }

  this.editCar = function (formData, draw) {
    let editedCar = new Car(
      formData.make.value,
      formData.model.value,
      formData.imgUrl.value,
      formData.year.value,
      formData.price.value,
      formData.description.value,
      formData.id.value
    )
    $.ajax({
      url: 'https://bcw-gregslist.herokuapp.com/api/cars/' + editedCar._id,
      method: 'PUT',
      data: editedCar
    }).then(res => {
      this.loadCars(draw)
      console.log(res)
    })


  }

  this.deleteCar = function (id, draw) {
    $.ajax({
      url: 'https://bcw-gregslist.herokuapp.com/api/cars/' + id,
      method: 'DELETE'
    }).then(res => {
      console.log(res)
      this.loadCars(draw)
    }).catch(err => {
      console.error(err.responseJSON.message)
    })
  }


  this.makeCar = function (data, draw) {
    let newCar = new Car(
      data.make.value,
      data.model.value,
      data.imgUrl.value,
      data.year.value,
      data.price.value,
      data.description.value
    )
    delete newCar._id
    console.log(newCar)
    $.post('https://bcw-gregslist.herokuapp.com/api/cars', newCar).then(res => {
      console.log(res)
      cars.push(newCar)
      carService.loadCars(draw)
    }).catch(err => {
      console.error(err.responseJSON.message)
    })

  }

}