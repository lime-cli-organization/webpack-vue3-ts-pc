export const setCookie:(name: string,value:any,iDay?:number)=>void = (name,value,iDay=1000*60*60*8) => {
	const oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = name + "=" + value + ";expires=" + oDate;
}

export const getCookie:(name: string)=>any = (name) => {
	const arr = document.cookie.split('; ');
	for(let i = 0 ;i < arr.length ; i++){
			const arr2 = arr[i].split("=");
			if(arr2[0] == name){
					return arr2[1];
			}
	}
	return null;
}

export const removeCookie: (name: string) => void = (name) => {
	setCookie(name, "1", -1)
}
