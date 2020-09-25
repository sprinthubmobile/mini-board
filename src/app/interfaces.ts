import { Url } from 'url';

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

type TGeo = {
  lat: number;
  lng: number;
};

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: TGeo;
}

export class Company implements ICompany {
  name: string = '';
  catchPhrase: string = '';
  bs: string = '';

  constructor(company?: ICompany) {
    if (!!company) { return; }
    Object.entries(company).forEach(([k, v]) => { this[k] = company[k]; });
  }
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: Url;
  company: ICompany;
}

export class Address implements IAddress {
  street: string = '';
  suite: string = '';
  city: string = '';
  zipcode: string = '';
  geo: TGeo;

  constructor(address?: IAddress) {
    if (!!address) { return; }
    Object.entries(address).forEach(([k, v]) => { this[k] = address[k]; });
  }
}
export class User implements IUser {
  id: number = null;
  username: string = '';
  email: string = '';
  address: IAddress = new Address();
  phone: string = '';
  website: Url;
  company: ICompany = new Company();

  constructor(statement?: IUser) {
    if (!!statement) { return; }
    Object.entries(statement).forEach(([k, v]) => { this[k] = statement[k]; });
  }
}
