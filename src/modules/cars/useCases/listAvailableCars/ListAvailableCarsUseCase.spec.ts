import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory; 

describe('List Cars', () => {
  beforeEach(() =>{
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });


  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 50.00,
      license_plate: "GGK-9999",
      fine_amount: 25,
      brand: "Car_brand1",
      category_id: "category_id1"
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      daily_rate: 50.00,
      license_plate: "GGK-9999",
      fine_amount: 25,
      brand: "Car_brand2",
      category_id: "category_id1"
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_brand2'
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car3 description",
      daily_rate: 70.00,
      license_plate: "GGK-9999",
      fine_amount: 30,
      brand: "Car_brand3",
      category_id: "category_id3"
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car3'
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car4 description",
      daily_rate: 70.00,
      license_plate: "GGK-9999",
      fine_amount: 30,
      brand: "Car_brand4",
      category_id: "category_id4"
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_id4'
    });

    expect(cars).toEqual([car]);
  });
})