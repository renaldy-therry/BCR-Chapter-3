// Class App
class App {
  constructor() {
    this.containerCars = document.getElementById("container-cars");
    this.tombolCariMobil = document.getElementById("filter-button")
    this.mobilTidakTersedia = document.getElementById("car-unavailable")
    this.tombolSembunyi = document.getElementById("hidden-warning-button")
    this.form = document.forms["filter-form"];
  }

  // Async Await Button
  async init() {
    await this.load();
    this.form.onsubmit = this.run;
  }

  run = (e) => {
    e.preventDefault();
    this.clear();

    this.tombolCariMobil.setAttribute('hidden', 'true');
    this.tombolSembunyi.removeAttribute('hidden')
    this.tombolSembunyi.onclick = () => {
      this.mobilTidakTersedia.setAttribute('hidden', 'true');
    }

    const jumlahPenumpang = this.form["jumlah-penumpang"].value;
    const tanggalSewa = this.form["tanggal-sewa"].value;
    const waktuJemput = this.form["waktu-jemput"].value;
    const tipeDriver = this.form["tipe-driver"].value;
    const newDate = new Date(`${tanggalSewa}T${waktuJemput}Z`);

    if(!tanggalSewa || !waktuJemput || !tipeDriver) {
      alert("Isi semua form terlebih dahulu") 
    } else {
      this.clear();
    }
   
    this.clear();

  const filteredCar = [];
  Car.list.forEach((car) => {
    if (car.availableAt > newDate && car.capacity >= jumlahPenumpang && car.available) {
      filteredCar.push(car);
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.containerCars.append(node);
    }
  });

  if (!filteredCar.length) {
    this.mobilTidakTersedia.removeAttribute('hidden')
    this.mobilTidakTersedia.innerHTML = `
    <div class="alert alert-danger text-center" role="alert">
      Mobil yang anda cari tidak tersedia
    </div>
    `;
   }
 };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.containerCars.firstElementChild;
    while (child) {
      child.remove();
      child = this.containerCars.firstElementChild;
    }
  };
   
  }

