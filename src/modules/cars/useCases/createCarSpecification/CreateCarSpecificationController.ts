import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);
    const { car_id } = request.params;
    const { specifications_id } = request.body;

    const carSpecifications = await createCarSpecificationUseCase.execute({car_id, specifications_id});
    return response.json(carSpecifications);
  };
}

export { CreateCarSpecificationController };