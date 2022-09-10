import fs from 'fs';
import { parse } from 'csv-parse';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ){}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parsedFile = parse();
        
      stream.pipe(parsedFile);
      parsedFile.on("data", async (line) => {
        const [name, description] = line;
        categories.push({name, description}); 
      })
      .on("end", () =>{
        fs.promises.unlink(file.path);
        resolve(categories);
      })
      .on("error", (err)=>{
        reject(err) ;
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async(categories) =>{
      const { name, description } = categories;

      const existCategory = await this.categoriesRepository.findByName(name);

      if(!existCategory) {
        await this.categoriesRepository.create({
          name, description
        })
      }
    })
  }
}

export { ImportCategoryUseCase };