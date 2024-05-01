import { IsEmail, IsEmpty, Length } from "class-validator";

export class CreateCustomerInputs {
  @IsEmail()
  email: string;

  @Length(7, 12)
  phone: string;

  @Length(6, 12)
  password: string;
}

export interface customerPayload {
  email: string;
  id: string;
  verified: boolean;
}

export class CustomerLoginInputs {
  @IsEmail()
  email: string;

  @Length(6, 12)
  password: string;
}

export class EditCustomerInputs {
  @Length(2, 12)
  firstName: string;

  @Length(2, 12)
  lastName: string;

  @Length(7, 12)
  address: string;

  @Length(7, 12)
  phone: string;
}
