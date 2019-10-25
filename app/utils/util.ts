export const PREFIX_URL = 'http://lide.ai-fox.net/intf/call/?action=';
export function formatTime(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('/');
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export function getIndex(arr:any[], key:string, value:any):any {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == value) {
      return i;
    }
  }
}
