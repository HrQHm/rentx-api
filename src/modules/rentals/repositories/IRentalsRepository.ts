import { Rental } from "../infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";

interface IRentalsRepository {
  create(data: ICreateRentalDTO):Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findByOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findAllRentalsByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };