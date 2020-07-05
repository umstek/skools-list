export class Address {
  street: string;
  suburb: string;
  postcode: string;
  state: string;
}

export class School {
  name: string;
  address: Address;
  studentCount: number;
}
