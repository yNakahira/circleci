export default class CalcUtil {
  static calcAmount(rate, amount) {
    return Math.round(rate * amount);
  }
}
