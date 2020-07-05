interface Address {
  street: string;
  suburb: string;
  postcode: string;
  state: string;
}

export interface School {
  name: string;
  address: Address;
  studentCount: number;
}
