export default class CalcUtil {
  static calcTotalAmount(currencyRate, currencyAmount) {
    return Math.round(currencyRate * currencyAmount)
  }
}
