import { Body, Controller, Delete, Get, Param, Post, Put, Query, Redirect, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomerService } from "../service/customer.service";
import { createCustomerDTO } from "../dto/customer.dto";

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  public async getCustomers() {
    return await this.customerService.getCustomers();
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  public async getDocs() {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async addCustomers(@Body() customer: createCustomerDTO) {
    return await this.customerService.createCustomer(customer);
  }

  @Get(':id')
  public async getCustomer(@Param('id') id: string) {
    return await this.customerService.getCustomer(id);
  }

  @Delete(':id')
  public async removeCustomer(@Param('id') id: string) {
    return await this.customerService.removeCustomer(id);
  }

  @Put(':id')
  public async updateCustomer(@Query('id') id: string, @Req() req: Request) {
    return await this.customerService.updateCustomer(id);
  } 

  @Get(`:id/add.x.end/:pass`)
  public async example(@Param('id') id: string, @Param('pass') pass: string) {
    console.log(id);
    console.log(pass);
  } 

}