export class CatBreedDTO {
  id!: number;
  name!: string;
  weight!: {imperial: string, metric: string};
  origin!: string;
  life_span!: string;
  breed_group!: string;
}
