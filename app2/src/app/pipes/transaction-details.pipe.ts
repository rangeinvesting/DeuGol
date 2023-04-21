import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionDetails'
})
export class TransactionDetailsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
	if(args[0] == 'Status'){
		return this.getStatus(value, args[1]);
	}else if(args[0] == 'Type'){
		return this.getType(value, args[1]);
	}
    return null;
  }
	
  getStatus(status: any, filter: any){
	  
	  const statuses: any = {
		  'canceled':{'label':'Cancelada', color: '#f44336'},
		  'concluded':{'label':'Concluída', color: '#4caf50'},
		  'confirmed':{'label':'Confirmada', color: '#00bcd4'},
		  'pending':{'label':'Pendente', color: '#ff5722'}
	  }
	  if(!statuses[status]){
		  return;
	  }
	  return statuses[status][filter?filter:'label'];
  }
	
	getType(type: any, filter: any){
	  
	  const types: any = {
		  'deposit':{'label':'Depósito', color: '#fff'},
		  'withdraw':{'label':'Saque', color: '#fff'},
		  'transfer':{'label':'Transferência', color: '#fff'},
		  'payment':{'label':'Pagamento', color: '#fff'},
		  'award':{'label':'Prêmio', color: '#fff'},
		  'bonus':{'label':'Bônus', color: '#fff'},
		  'cashback':{'label':'Cashback', color: '#fff'},
		  'bonus_refferer':{'label':'Bônus', color: '#fff'}
	  }
	  if(!types[type]){
		  return;
	  }
	  return types[type][filter?filter:'label'];
  }

}
