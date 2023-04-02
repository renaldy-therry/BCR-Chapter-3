class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(rentPerDay)
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {

    return `
    <div class="card my-2 mx-2">
    <img src="${this.image}" class="img-fluid" alt="${this.manufacture}">
    <div class="card-body">
      <p class="card-text">${this.manufacture}/${this.model}</p>
      <p class="card-rent">${this.rentPerDay} /hari</p>
      <p class="car-desc">${this.description}</p>
      <div class="d-flex my-2">
        <i class="fa-solid fa-user-group"></i>
        <p class="mx-2 my-0">${this.capacity} orang</p>
      </div>
      <div class="d-flex my-2">
        <i class="fa-solid fa-gear"></i>
        <p class="mx-2 my-0">${this.transmission}</p>
      </div>
      <div class="d-flex my-2">
        <i class="fa-solid fa-calendar"></i>
        <p class="mx-2 my-0">Tahun ${this.year}</p>
      </div>
      <button class="btn btn-success w-90 mt-2">Pilih Mobil</button>
    </div>
  </div>
`
  }
}
