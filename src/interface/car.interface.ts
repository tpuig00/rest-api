export interface Car {
    id?: number; // id es opcional porque no se utiliza cuando se crea un nuevo Car
    name: string;
    color: string;
    brand: string;
    gas: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
    description: string;
    model: string;
    year: number;
    price: number;
    photo: string;
  }
  