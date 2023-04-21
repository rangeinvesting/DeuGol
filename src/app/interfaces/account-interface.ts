interface AccountInterface {
  	email: any;
	profile: any;
	level: any;
	wallet: any;
}

class AccountInterface {
					
	constructor(useInfo: any) {
		if(!useInfo){
			return;
		}
		const accountInfo: AccountInterface = {
			email: useInfo.user.email,
			profile: useInfo.user,
			level: useInfo.level?useInfo.level:'Varzea 1',
			wallet: useInfo.wallet
		}
		return accountInfo;
	}
	
}

export { AccountInterface }