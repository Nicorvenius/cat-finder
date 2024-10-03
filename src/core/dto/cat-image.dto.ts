import { CatBreedDTO } from "./cat-breed.dto";

export class CatImageDTO {
  id!: string;
  url!: string;
  width!: number;
  height!: number;
  mime_type!: string;
  breeds!: CatBreedDTO[];
  categories!: any[];
}
