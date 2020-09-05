export function getDate() {
  const date = new Date();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  let str = m + '-' + d;
  return str;
}