import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoriInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoriInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoriInMemory;

describe("Create Category", () => {
  beforeEach(() =>{
    categoriesRepositoryInMemory = new CategoriesRepositoriInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  it("should create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description  
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exist", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description  
    });

    await expect(createCategoryUseCase.execute({
        name: category.name,
        description: category.description  
      })
    ).rejects.toEqual(new AppError('Category already exist'));
  });
});