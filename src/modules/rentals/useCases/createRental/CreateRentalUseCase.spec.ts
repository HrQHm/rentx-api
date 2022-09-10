import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const tomorrow = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: '12345',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand test',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '1234',
      car_id: car.id,
      expected_return_date: tomorrow
    });


    expect(rental).toHaveProperty("id");
  });


  it("Should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '12334444',
      expected_return_date: tomorrow,
      user_id: '1234',
    });

    await expect(createRentalUseCase.execute({
      user_id: '1234',
      car_id: '1233',
      expected_return_date: tomorrow
    })
    ).rejects.toEqual(new AppError("There is a rental in progress for user"));
  });

  it("Should not be able to create a new rental if there is another open to the same car", async () => {
    /*await createRentalUseCase.execute({
      user_id: '1234',
      car_id: '12334',
      expected_return_date: tomorrow
    });*/

    await rentalsRepositoryInMemory.create({
      car_id: '12334',
      expected_return_date: tomorrow,
      user_id: '1234',
    });

    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '12334',
      expected_return_date: tomorrow
    })
    ).rejects.toEqual(new AppError('Car not available'));
  });

  it("Should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      user_id: '1234',
      car_id: '12334',
      expected_return_date: dayjs().toDate()
    })
    ).rejects.toEqual(new AppError('Invalid return time'));
  });
});