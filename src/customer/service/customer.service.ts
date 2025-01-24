
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "../interface/customer.interface";
import { createCustomerDTO } from "../dto/customer.dto";


@Injectable()
export class CustomerService {
  constructor(@InjectModel('customer') private readonly customreModel: Model<Customer>) {}

  public async getCustomers(): Promise<Customer[]> {
    return await this.customreModel.find();
  }

  public async getCustomer(id: string): Promise<Customer> {
    return await this.customreModel.findById(id);
  }

  public async createCustomer(customer: createCustomerDTO): Promise<Customer> {
    const newCustomer = await new this.customreModel(customer);
    return  newCustomer.save();
  }
  
  public async updateCustomer(id): Promise<Customer> {
    return await this.customreModel.findByIdAndUpdate(id );
  }

  public async removeCustomer(id: string): Promise<Customer> {
    return await this.customreModel.findByIdAndRemove(id);
  }
}