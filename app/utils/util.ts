export function formatTime(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('.');
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export function getIndex(arr: any[], key: string, value: any): any {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] == value) {
      return i;
    }
  }
}


export function getUrl() {
  const pages = getCurrentPages();
  const currPage = pages[pages.length - 1];
  return currPage.route;
}

export function getOptions(){
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;
  return options;
}
