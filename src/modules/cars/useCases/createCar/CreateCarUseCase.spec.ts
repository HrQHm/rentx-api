import { CreateCarUseCase } from './CreateCarUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@sharederrors/AppError';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create a Car', () =>{
  beforeEach(() =>{
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Shoul be able to create a new car', async () => {
    const car = {
      name: 'CarTest',
      description: 'Car Test Description',
      daily_rate: 100,
      license_plate: '123456',
      fine_amount: 60,
      brand: 'Brand Test',
      category_id: 'category'
    }

    const createdCar = await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      daily_rate: car.daily_rate,
      license_plate: car.license_plate,
      fine_amount: car.fine_amount,
      brand: car.brand,
      category_id: car.category_id
    });

    expect(createdCar).toHaveProperty("id");
  });

  it('Shold not be able to create a car with exists license plate', async () => {
    const car = {
      name: 'CarTest',
      description: 'Car Test Description',
      daily_rate: 100,
      license_plate: '123456',
      fine_amount: 60,
      brand: 'Brand Test',
      category_id: 'category'
    }

    await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      daily_rate: car.daily_rate,
      license_plate: car.license_plate,
      fine_amount: car.fine_amount,
      brand: car.brand,
      category_id: car.category_id
    });

    await expect(createCarUseCase.execute({
        name: 'Car2',
        description: car.description,
        daily_rate: car.daily_rate,
        license_plate: car.license_plate,
        fine_amount: car.fine_amount,
        brand: car.brand,
        category_id: car.category_id
      })
    ).rejects.toEqual(new AppError("Car already exist"));
  });

  it("Shoul be able to a create a car with available true by default", async() => {
    const car = {
      name: 'CarTest Available',
      description: 'Car Test Description',
      daily_rate: 100,
      license_plate: 'ABCD-123',
      fine_amount: 60,
      brand: 'Brand Test',
      category_id: 'category'
    }

    const createdCar = await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      daily_rate: car.daily_rate,
      license_plate: car.license_plate,
      fine_amount: car.fine_amount,
      brand: car.brand,
      category_id: car.category_id
    });

    expect(createdCar.available).toBe(true);
  });
})