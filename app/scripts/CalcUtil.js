export default class CalcUtil {
  static calcAmount(rate, amount) {
    if (rate > 0) {
      return Math.round(rate * amount);
    } else {
      return Math.round(amount)
    }
  }
}
