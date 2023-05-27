interface AccountInterface {
	firstName: any;
  	email: any;
	profile: any;
	level: any;
	wallet: any;
}

const getFirstName = (fullname: any) =>{
		try{
			return fullname.split(' ')[0];
		}catch(e){
			return fullname;
		}
	}

class AccountInterface {
					
	constructor(useInfo: any) {
		if(!useInfo){
			return;
		}
		const accountInfo: AccountInterface = {
			firstName: getFirstName(useInfo.user.displayName),
			email: useInfo.user.email,
			profile: useInfo.user,
			level: useInfo.level?useInfo.level:'Varzea 1',
			wallet: useInfo.wallet
		}
		return accountInfo;
	}
	
}

export { AccountInterface }